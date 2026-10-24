#!/usr/bin/env node
/**
 * Captures de recette visuelle (desktop 1280 px et mobile 390 px, thèmes clair et sombre).
 *
 *   npx astro preview --port 4323 &        (sur dist/ déjà construit)
 *   node scripts/captures-recette.mjs [dossier-de-sortie] [url-de-base]
 *
 * Par défaut : C:\tmp\captures-qa (hors dépôt) et http://127.0.0.1:4323.
 * Signale aussi, pour chaque capture, les débordements horizontaux et les erreurs console.
 */
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from '@playwright/test';

const SORTIE = process.argv[2] ?? 'C:\\tmp\\captures-qa';
const BASE = process.argv[3] ?? 'http://127.0.0.1:4323';
mkdirSync(SORTIE, { recursive: true });

const CLE_PROGRESSION = 'forma-roblox:progression:v1';
const CLE_THEME = 'forma-roblox:theme';

/** État « avec badges » : la moitié des leçons, 3 examens réussis dont un sans-faute. */
async function etatAvecBadges(page) {
  const catalogue = await page.evaluate(() => JSON.parse(document.getElementById('catalogue-formation').textContent));
  const toutes = catalogue.modules.flatMap((m) => m.lecons.map((l) => l.id));
  const lecons = Object.fromEntries(toutes.slice(0, Math.ceil(toutes.length / 2)).map((id) => [id, '2026-10-01T10:00:00.000Z']));
  const quiz = Object.fromEntries(Object.keys(lecons).map((id) => [id, { score: 5, total: 5, meilleurScore: 5, tentatives: 1, date: '2026-10-01T10:00:00.000Z' }]));
  const ex = (pct) => ({ pct, meilleurPct: pct, reussi: pct >= 70, sansFaute: pct === 100, tentatives: 1, date: '2026-10-01T10:00:00.000Z' });
  return { version: 1, lecons, quiz, examens: { '00': ex(100), '01': ex(85), '02': ex(73), '03': ex(40) } };
}

const PAGES = [
  { nom: 'accueil', url: '/' },
  { nom: 'programme', url: '/programme/' },
  { nom: 'module-03', url: '/modules/03/' },
  { nom: 'lecon-tableaux-08-05', url: '/modules/09/evenements-personnalises/' },
  { nom: 'lecon-checklist-10-04', url: '/modules/11/checklist-de-lancement/', action: 'cocher' },
  { nom: 'lecon-code-02-03', url: '/modules/03/boucles-et-fonctions/' },
  { nom: 'lecon-quiz-corrige-02-04', url: '/modules/03/tables/', action: 'quiz' },
  { nom: 'examen-03-avant', url: '/modules/04/examen/' },
  { nom: 'examen-03-apres', url: '/modules/04/examen/', action: 'examen' },
  { nom: 'progression-vide', url: '/progression/' },
  { nom: 'progression-badges', url: '/progression/', etat: true },
  { nom: '404', url: '/cette-page-n-existe-pas/' },
  { nom: 'recherche', url: '/modules/03/', action: 'recherche' },
];
const VUES = [
  { nom: 'desktop', viewport: { width: 1280, height: 800 } },
  { nom: 'mobile', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 },
];
const THEMES = ['clair', 'sombre'];
const seulement = process.env.CAPTURES ? new RegExp(process.env.CAPTURES) : undefined;

const navigateur = await chromium.launch();
const rapport = [];
for (const vue of VUES) {
  for (const theme of THEMES) {
    for (const p of PAGES) {
      const nom = `${p.nom}--${vue.nom}--${theme}`;
      if (seulement && !seulement.test(nom)) continue;
      const contexte = await navigateur.newContext({ viewport: vue.viewport, isMobile: vue.isMobile, hasTouch: vue.hasTouch, deviceScaleFactor: vue.deviceScaleFactor ?? 1, locale: 'fr-FR', colorScheme: theme === 'sombre' ? 'dark' : 'light', reducedMotion: 'reduce' });
      const page = await contexte.newPage();
      const erreurs = [];
      page.on('console', (m) => {
        // La page 404 elle-même répond 404 : attendu, pas une erreur.
        if (m.type() === 'error' && !(p.nom === '404' && /status of 404/.test(m.text()))) erreurs.push(m.text());
      });
      page.on('pageerror', (e) => erreurs.push(e.message));
      await page.addInitScript(([cle, t]) => localStorage.setItem(cle, t), [CLE_THEME, theme]);
      if (p.etat) {
        await page.goto(BASE + '/');
        const etat = await etatAvecBadges(page);
        await page.evaluate(([cle, v]) => localStorage.setItem(cle, v), [CLE_PROGRESSION, JSON.stringify(etat)]);
      }
      await page.goto(BASE + p.url, { waitUntil: 'networkidle' });
      if (p.action === 'quiz') {
        const qs = page.locator('[data-testid="quiz"] [data-question]');
        const n = await qs.count();
        for (let i = 0; i < n; i++) {
          const q = qs.nth(i);
          const bonnes = ((await q.getAttribute('data-correct')) ?? '').split(',').map(Number);
          const inputs = q.locator('input[data-option-input]');
          const cible = i === 1 ? [[...Array(await inputs.count()).keys()].find((k) => !bonnes.includes(k))] : bonnes;
          for (const k of cible) await inputs.nth(k).check();
          await q.locator('[data-action="valider"]').click();
        }
        await page.getByTestId('quiz').scrollIntoViewIfNeeded();
      }
      if (p.action === 'examen') {
        const qs = page.locator('[data-testid="examen"] [data-question]');
        const n = await qs.count();
        for (let i = 0; i < n; i++) {
          const q = qs.nth(i);
          const bonnes = ((await q.getAttribute('data-correct')) ?? '').split(',').map(Number);
          const inputs = q.locator('input[data-option-input]');
          const cible = i % 4 === 1 ? [[...Array(await inputs.count()).keys()].find((k) => !bonnes.includes(k))] : bonnes;
          for (const k of cible) await inputs.nth(k).check();
        }
        await page.locator('[data-action="corriger"]').click();
        await page.waitForTimeout(300);
      }
      if (p.action === 'cocher') {
        const cases = page.locator('input.tache-case');
        for (let i = 0; i < Math.min(4, await cases.count()); i++) await cases.nth(i).check();
      }
      if (p.action === 'recherche') {
        await page.getByTestId('search-open').first().click();
        await page.locator('#pagefind-ui input').fill('DataStore');
        await page.waitForSelector('.pagefind-ui__result', { timeout: 10_000 }).catch(() => {});
        await page.waitForTimeout(800);
      }
      const debordement = await page.evaluate(() => {
        const largeur = document.documentElement.clientWidth;
        const fautifs = [];
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.right <= largeur + 1) continue;
          // Ignore ce qui est dans un conteneur défilant (code, tableaux) ou masqué.
          let parent = el.parentElement;
          let defile = false;
          while (parent && parent !== document.body) {
            const s = getComputedStyle(parent);
            if (/(auto|scroll|hidden|clip)/.test(s.overflowX) || s.position === 'fixed') {
              defile = true;
              break;
            }
            parent = parent.parentElement;
          }
          if (!defile) fautifs.push(`${el.tagName.toLowerCase()}.${String(el.className).split(' ').slice(0, 2).join('.')} (${Math.round(r.right)} px)`);
        }
        return { page: document.documentElement.scrollWidth > largeur, fautifs: fautifs.slice(0, 5) };
      });
      const chemin = join(SORTIE, `${nom}.png`);
      // Remonte en haut : sinon l'en-tête collant est dessiné au milieu des captures pleine page.
      if (p.nom !== 'recherche') await page.evaluate(() => window.scrollTo(0, 0));
      const pleinePage = p.nom !== 'recherche';
      if (p.action === 'quiz' || p.action === 'examen') {
        // Capture pleine page découpée sur le quiz (une capture d'élément superposerait l'en-tête collant).
        const clip = await page.locator(p.action === 'quiz' ? '[data-testid="quiz"]' : '[data-testid="examen"]').evaluate((el) => {
          const r = el.getBoundingClientRect();
          return { x: Math.max(0, r.left + scrollX - 16), y: Math.max(0, r.top + scrollY - 16), width: Math.min(r.width + 32, document.documentElement.clientWidth), height: r.height + 32 };
        });
        await page.screenshot({ path: chemin, fullPage: true, clip });
      } else {
        await page.screenshot({ path: chemin, fullPage: pleinePage });
      }
      if (p.nom.startsWith('lecon-code')) {
        // Page très longue : capture d'un bloc de code représentatif en plus de l'écran.
        const bloc = page.locator('article pre.astro-code').nth(2);
        await bloc.scrollIntoViewIfNeeded();
        await page.screenshot({ path: join(SORTIE, `${nom}--bloc.png`) });
      }
      rapport.push({ nom, debordement, erreurs });
      await contexte.close();
    }
  }
}
await navigateur.close();
for (const r of rapport) {
  const pb = [];
  if (r.debordement.page) pb.push('DÉFILEMENT HORIZONTAL');
  if (r.debordement.fautifs.length) pb.push(`dépassent : ${r.debordement.fautifs.join(', ')}`);
  if (r.erreurs.length) pb.push(`console : ${r.erreurs.join(' | ')}`);
  console.log(`${pb.length ? '✗' : '✓'} ${r.nom}${pb.length ? ' — ' + pb.join(' ; ') : ''}`);
}
console.log(`\n${rapport.length} captures dans ${SORTIE}`);
