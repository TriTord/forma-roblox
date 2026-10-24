/**
 * Toutes les pages répondent 200 et aucun lien interne n'est mort
 * (pages, ancres #id, ressources). Liens externes : format seulement (pas de réseau).
 */
import { expect, test, type APIRequestContext } from '@playwright/test';
import { aucunProbleme, lectureDuPlan, pagesHtml } from './outils';

const ENTITES: Record<string, string> = { '&amp;': '&', '&quot;': '"', '&#39;': "'", '&lt;': '<', '&gt;': '>' };
const decoder = (s: string) =>
  s.replace(/&(?:amp|quot|#39|lt|gt);|&#x([0-9a-f]+);|&#(\d+);/gi, (e, hex: string | undefined, dec: string | undefined) =>
    hex ? String.fromCodePoint(parseInt(hex, 16)) : dec ? String.fromCodePoint(Number(dec)) : ENTITES[e] ?? e,
  );

/** Retire les blocs <script>, <style> et le JSON du catalogue avant l'analyse. */
const sansScripts = (html: string) => html.replace(/<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>/gi, '');

function attribut(balise: string, nom: string): string | undefined {
  const m = new RegExp(`\\s${nom}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i').exec(balise);
  return m ? decoder(m[1] ?? m[2] ?? m[3] ?? '') : undefined;
}

interface PageAnalysee {
  statut: number;
  ids: Set<string>;
  html: string;
}

test('toutes les pages HTML de dist/ répondent 200', async ({ request }) => {
  const pages = pagesHtml();
  expect(pages.length).toBeGreaterThan(5);
  const problemes: string[] = [];
  for (const url of pages) {
    const r = await request.get(url);
    if (r.status() !== 200 && url !== '/404.html') problemes.push(`${url} → HTTP ${r.status()}`);
  }
  aucunProbleme(problemes, 'Pages en erreur');
});

test('une URL inconnue renvoie la page 404 du site', async ({ request }) => {
  const r = await request.get('/cette-page-n-existe-pas/');
  expect(r.status()).toBe(404);
  expect(await r.text()).toContain('Cette page n’existe pas');
});

test('aucun lien interne mort ni ancre manquante ; liens externes bien formés', async ({ request, baseURL }) => {
  test.setTimeout(240_000);
  const origine = new URL(baseURL!).origin;
  const cache = new Map<string, Promise<PageAnalysee>>();
  const analyser = (req: APIRequestContext, chemin: string) => {
    let p = cache.get(chemin);
    if (!p) {
      p = req.get(chemin, { maxRedirects: 5 }).then(async (r) => {
        const type = r.headers()['content-type'] ?? '';
        const html = type.includes('html') ? await r.text() : '';
        const ids = new Set<string>();
        for (const m of sansScripts(html).matchAll(/\sid\s*=\s*"([^"]+)"/gi)) ids.add(decoder(m[1]));
        return { statut: r.status(), ids, html };
      });
      cache.set(chemin, p);
    }
    return p;
  };

  const problemes: string[] = [];
  const aVenir: string[] = [];
  const prevues = new Set([...lectureDuPlan().values()].flat());
  const pages = pagesHtml().filter((u) => u !== '/404.html');
  let nbLiens = 0;
  let nbExternes = 0;

  for (const url of pages) {
    const source = await analyser(request, url);
    const html = sansScripts(source.html);

    // Liens <a href> + ressources internes (<link href>, <script src>, <img src>).
    const cibles: { valeur: string; balise: string; ressource: boolean }[] = [];
    for (const m of html.matchAll(/<a\b[^>]*>/gi)) {
      const href = attribut(m[0], 'href');
      if (href !== undefined) cibles.push({ valeur: href, balise: m[0], ressource: false });
    }
    for (const m of source.html.matchAll(/<(?:link|script|img|source)\b[^>]*>/gi)) {
      const v = attribut(m[0], 'src') ?? (m[0].toLowerCase().startsWith('<link') ? attribut(m[0], 'href') : undefined);
      if (v && !/^(?:https?:)?\/\//i.test(v) && !v.startsWith('data:')) cibles.push({ valeur: v, balise: m[0], ressource: true });
    }

    for (const { valeur, balise, ressource } of cibles) {
      nbLiens++;
      const href = valeur.trim();
      if (href === '') {
        problemes.push(`${url} : lien vide dans ${balise.slice(0, 120)}`);
        continue;
      }
      // href="#" n'est admis que sur un lien rempli par JavaScript (ex. « Reprendre »).
      if (href === '#') {
        if (!/data-reprendre/.test(balise)) problemes.push(`${url} : lien href="#" sans destination (${balise.slice(0, 120)})`);
        continue;
      }
      if (/^(?:mailto|tel):/i.test(href)) {
        if (!/^(?:mailto:[^@\s]+@[^@\s]+\.[^@\s]+|tel:\+?[\d .-]+)$/i.test(href)) problemes.push(`${url} : lien mal formé « ${href} »`);
        continue;
      }
      if (/^javascript:/i.test(href)) {
        problemes.push(`${url} : lien javascript: « ${href} »`);
        continue;
      }
      let cible: URL;
      try {
        cible = new URL(href, origine + url);
      } catch {
        problemes.push(`${url} : URL invalide « ${href} »`);
        continue;
      }
      if (cible.origin !== origine) {
        nbExternes++;
        const ok =
          /^https?:$/.test(cible.protocol) &&
          cible.hostname.includes('.') &&
          !/\s/.test(href) &&
          /^https?:\/\//i.test(href);
        if (!ok) problemes.push(`${url} : lien externe mal formé « ${href} »`);
        else if (/^(?:localhost|127\.|0\.0\.0\.0)/.test(cible.hostname)) problemes.push(`${url} : lien vers une machine locale « ${href} »`);
        continue;
      }
      const chemin = decodeURI(cible.pathname);
      const cibleAnalysee = await analyser(request, cible.pathname);
      if (cibleAnalysee.statut !== 200 && prevues.has(cible.pathname)) {
        aVenir.push(`${url} → ${cible.pathname}`);
        continue;
      }
      if (cibleAnalysee.statut !== 200) {
        problemes.push(`${url} : ${ressource ? 'ressource' : 'lien'} mort « ${href} » → HTTP ${cibleAnalysee.statut}`);
        continue;
      }
      if (cible.hash && cible.hash !== '#') {
        const id = decodeURIComponent(cible.hash.slice(1));
        if (!cibleAnalysee.ids.has(id)) problemes.push(`${url} : ancre introuvable « ${href} » (aucun id="${id}" sur ${chemin})`);
      }
    }
  }

  test.info().annotations.push({ type: 'liens', description: `${pages.length} pages, ${nbLiens} liens/ressources dont ${nbExternes} externes` });
  // Liens vers des leçons de PLAN.md pas encore publiées : contenu en cours, vérifié par contenu-complet.spec.ts.
  if (aVenir.length) test.info().annotations.push({ type: 'liens vers des leçons à venir', description: aVenir.join('\n') });
  aucunProbleme(problemes, 'Liens morts ou mal formés');
});

test('les ids sont uniques sur chaque page (les ancres doivent être non ambiguës)', async ({ request }) => {
  const problemes: string[] = [];
  for (const url of pagesHtml()) {
    const html = sansScripts(await (await request.get(url)).text());
    const vus = new Map<string, number>();
    for (const m of html.matchAll(/\sid\s*=\s*"([^"]+)"/gi)) vus.set(m[1], (vus.get(m[1]) ?? 0) + 1);
    for (const [id, n] of vus) if (n > 1) problemes.push(`${url} : id="${id}" présent ${n} fois`);
  }
  aucunProbleme(problemes, 'Ids en double');
});
