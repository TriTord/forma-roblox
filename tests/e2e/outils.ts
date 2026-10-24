/**
 * Outils partagés des tests e2e. Tout est déduit du site construit (dist/) :
 * aucun test ne dépend du nombre ni du contenu précis des leçons.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, type Locator, type Page } from '@playwright/test';

export const RACINE = fileURLToPath(new URL('../../', import.meta.url));
export const DIST = join(RACINE, 'dist');
export const CLE_PROGRESSION = 'forma-roblox:progression:v1';
export const CLE_THEME = 'forma-roblox:theme';

export interface LeconCatalogue {
  id: string;
  titre: string;
  url: string;
}
export interface ModuleCatalogue {
  numero: string;
  titre: string;
  emoji: string;
  badge: { nom: string; emoji: string };
  aExamen: boolean;
  lecons: LeconCatalogue[];
}

let cacheCatalogue: ModuleCatalogue[] | undefined;

/** Catalogue injecté par BaseLayout dans chaque page (script#catalogue-formation de dist/index.html). */
export function catalogue(): ModuleCatalogue[] {
  if (cacheCatalogue) return cacheCatalogue;
  const fichier = join(DIST, 'index.html');
  if (!existsSync(fichier)) throw new Error('dist/index.html introuvable : lance `npm run build` avant les tests e2e.');
  const html = readFileSync(fichier, 'utf8');
  const m = /<script id="catalogue-formation" type="application\/json">([\s\S]*?)<\/script>/.exec(html);
  if (!m) throw new Error('Catalogue (script#catalogue-formation) introuvable dans dist/index.html.');
  cacheCatalogue = (JSON.parse(m[1]) as { modules: ModuleCatalogue[] }).modules;
  return cacheCatalogue;
}

/** Toutes les leçons publiées, dans l'ordre du parcours. */
export function lecons(): (LeconCatalogue & { module: string })[] {
  return catalogue().flatMap((m) => m.lecons.map((l) => ({ ...l, module: m.numero })));
}

export const modulesAvecLecons = () => catalogue().filter((m) => m.lecons.length > 0);
export const modulesAvecExamen = () => catalogue().filter((m) => m.aExamen);
export const urlExamen = (numero: string) => `/modules/${numero}/examen/`;

/** Chemins (URL) de toutes les pages HTML de dist/ (hors index Pagefind et ressources). */
export function pagesHtml(): string[] {
  const resultat: string[] = [];
  const parcourir = (dossier: string) => {
    for (const nom of readdirSync(dossier)) {
      const chemin = join(dossier, nom);
      const rel = relative(DIST, chemin).split(sep).join('/');
      if (rel === 'pagefind' || rel === '_astro') continue;
      if (statSync(chemin).isDirectory()) parcourir(chemin);
      else if (nom.endsWith('.html')) {
        resultat.push(nom === 'index.html' ? `/${rel.slice(0, -'index.html'.length)}` : `/${rel}`);
      }
    }
  };
  parcourir(DIST);
  return resultat.sort();
}

/** Supprime les ressources lourdes inutiles aux tests de structure (accélère le parcours de toutes les pages). */
export async function allegerPage(page: Page): Promise<void> {
  await page.route(/\.(?:png|jpe?g|webp|avif|gif|woff2?)$/, (route) => route.abort());
}

/** Leçons prévues par PLAN.md : « ## Module XX — … » puis « ### NN · `slug` — … ». */
export function lectureDuPlan(): Map<string, string[]> {
  const plan = new Map<string, string[]>();
  let module: string | undefined;
  for (const ligne of readFileSync(join(RACINE, 'PLAN.md'), 'utf8').split(/\r?\n/)) {
    const m = /^## Module (\d{2})\b/.exec(ligne);
    if (m) {
      module = m[1];
      plan.set(module, []);
      continue;
    }
    if (/^## /.test(ligne)) module = undefined;
    const l = /^### (\d{2}) · `([a-z0-9-]+)`/.exec(ligne);
    if (l && module) plan.get(module)!.push(`/modules/${module}/${l[2]}/`);
  }
  return plan;
}


/* ------------------------------------------------------------------ */
/* Quiz                                                                */
/* ------------------------------------------------------------------ */

/** Indices des bonnes réponses d'une question (attribut data-correct posé au build). */
export async function bonnesReponses(question: Locator): Promise<number[]> {
  const brut = (await question.getAttribute('data-correct')) ?? '';
  return brut.split(',').filter(Boolean).map(Number);
}

/** Coche les bonnes réponses (juste = true) ou une mauvaise réponse (juste = false). */
export async function repondre(question: Locator, juste: boolean): Promise<void> {
  const bonnes = await bonnesReponses(question);
  const inputs = question.locator('input[data-option-input]');
  const n = await inputs.count();
  if (juste) {
    for (const i of bonnes) await inputs.nth(i).check();
    return;
  }
  const fausse = Array.from({ length: n }, (_, i) => i).find((i) => !bonnes.includes(i));
  if (fausse === undefined) throw new Error('Question sans mauvaise réponse possible');
  await inputs.nth(fausse).check();
}

/** Lit l'état de progression stocké dans localStorage. */
export async function lireProgression(page: Page): Promise<{
  lecons: Record<string, string>;
  quiz: Record<string, { score: number; total: number; meilleurScore: number }>;
  examens: Record<string, { pct: number; reussi: boolean }>;
} | null> {
  const brut = await page.evaluate((cle) => localStorage.getItem(cle), CLE_PROGRESSION);
  return brut ? JSON.parse(brut) : null;
}

/** Pose un état de progression avant le chargement des pages (contexte neuf). */
export async function poserProgression(page: Page, lecons: string[], examens: Record<string, boolean> = {}): Promise<void> {
  const etat = {
    version: 2,
    lecons: Object.fromEntries(lecons.map((id) => [id, '2026-01-01T00:00:00.000Z'])),
    quiz: {},
    examens: Object.fromEntries(
      Object.entries(examens).map(([m, reussi]) => [
        m,
        { pct: reussi ? 100 : 0, meilleurPct: reussi ? 100 : 0, reussi, sansFaute: reussi, tentatives: 1, date: '2026-01-01T00:00:00.000Z' },
      ]),
    ),
  };
  await page.addInitScript(
    ([cle, valeur]) => {
      if (!sessionStorage.getItem('__progression_posee__')) {
        localStorage.setItem(cle, valeur);
        sessionStorage.setItem('__progression_posee__', '1');
      }
    },
    [CLE_PROGRESSION, JSON.stringify(etat)] as const,
  );
}

/** Valeur aria-valuenow d'une barre de progression. */
export async function valeurBarre(barre: Locator): Promise<number> {
  return Number(await barre.getAttribute('aria-valuenow'));
}

export const pct = (n: number, total: number) => (total ? Math.round((n / total) * 100) : 0);

/** Vérifie qu'une liste de problèmes est vide, avec un message lisible listant chaque problème. */
export function aucunProbleme(problemes: string[], intitule: string): void {
  expect(problemes, `${intitule} (${problemes.length}) :\n  - ${problemes.join('\n  - ')}`).toEqual([]);
}
