/**
 * Qualité et performance (QA phase 2) sur TOUTES les pages construites :
 * poids HTML + JS + CSS (alerte > 500 Ko hors images), <title> et meta description présents et uniques,
 * lang="fr", favicon, sitemap, page 404 servie en preview, aucune erreur console.
 */
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';
import { DIST, aucunProbleme, pagesHtml } from './outils';

const LIMITE_OCTETS = 500 * 1024;
const fichierDe = (url: string) => join(DIST, url.endsWith('.html') ? url : join(url, 'index.html'));
const html = (url: string) => readFileSync(fichierDe(url), 'utf8');
const attribut = (source: string, motif: RegExp) => motif.exec(source)?.[1]?.trim();

/** Ressources JS / CSS locales chargées par une page (balises + imports statiques des modules, récursivement). */
function ressources(source: string): Set<string> {
  const vues = new Set<string>();
  const aVisiter = [
    ...[...source.matchAll(/<script[^>]+src="(\/[^"]+\.m?js)"/g)].map((m) => m[1]),
    ...[...source.matchAll(/<link[^>]+href="(\/[^"]+\.css)"/g)].map((m) => m[1]),
    ...[...source.matchAll(/<link[^>]+rel="modulepreload"[^>]+href="(\/[^"]+)"/g)].map((m) => m[1]),
    // Scripts inline de type module qui importent un fichier.
    ...[...source.matchAll(/import\s*(?:[^'"]*from\s*)?["'](\/[^"']+\.js)["']/g)].map((m) => m[1]),
  ];
  while (aVisiter.length) {
    const r = aVisiter.pop()!;
    if (vues.has(r)) continue;
    const chemin = join(DIST, r);
    if (!existsSync(chemin)) continue;
    vues.add(r);
    if (r.endsWith('.js')) {
      const js = readFileSync(chemin, 'utf8');
      for (const m of js.matchAll(/(?:import|from)\s*["'](\.{1,2}\/[^"']+\.js)["']/g)) {
        aVisiter.push(new URL(m[1], `http://x${r}`).pathname);
      }
    }
  }
  return vues;
}

test('poids des pages (HTML + JS + CSS, hors images et index de recherche chargé à la demande) < 500 Ko', () => {
  const lourdes: string[] = [];
  const poids: { url: string; ko: number }[] = [];
  for (const url of pagesHtml()) {
    const source = html(url);
    let total = Buffer.byteLength(source);
    for (const r of ressources(source)) total += statSync(join(DIST, r)).size;
    poids.push({ url, ko: Math.round(total / 1024) });
    if (total > LIMITE_OCTETS) lourdes.push(`${url} : ${Math.round(total / 1024)} Ko`);
  }
  poids.sort((a, b) => b.ko - a.ko);
  test.info().annotations.push({ type: 'pages les plus lourdes', description: poids.slice(0, 5).map((p) => `${p.url} ${p.ko} Ko`).join('\n') });
  aucunProbleme(lourdes, 'Pages de plus de 500 Ko');
});

test('chaque page : lang="fr", <title> et meta description présents et uniques, favicon, viewport', () => {
  const problemes: string[] = [];
  const titres = new Map<string, string>();
  const descriptions = new Map<string, string>();
  for (const url of pagesHtml()) {
    const s = html(url);
    if (!/<html[^>]*\blang="fr"/.test(s)) problemes.push(`${url} : lang="fr" absent`);
    const titre = attribut(s, /<title>([^<]*)<\/title>/);
    const description = attribut(s, /<meta name="description" content="([^"]*)"/);
    if (!titre) problemes.push(`${url} : <title> absent ou vide`);
    else if (titres.has(titre)) problemes.push(`${url} : <title> identique à ${titres.get(titre)} (« ${titre} »)`);
    else titres.set(titre, url);
    if (!description || description.length < 30) problemes.push(`${url} : meta description absente ou trop courte`);
    else if (descriptions.has(description) && !url.startsWith('/404')) problemes.push(`${url} : meta description identique à ${descriptions.get(description)}`);
    else descriptions.set(description, url);
    const icone = attribut(s, /<link rel="icon"[^>]*href="([^"]+)"/);
    if (!icone || !existsSync(join(DIST, icone))) problemes.push(`${url} : favicon absente (${icone})`);
    if (!/<meta name="viewport"/.test(s)) problemes.push(`${url} : meta viewport absente`);
    if ((s.match(/<h1[\s>]/g) ?? []).length !== 1) problemes.push(`${url} : ${(s.match(/<h1[\s>]/g) ?? []).length} balises <h1>`);
  }
  aucunProbleme(problemes, 'Pages non conformes');
});

test('sitemap généré : toutes les pages publiques, sans la 404', async ({ request }) => {
  const index = await request.get('/sitemap-index.xml');
  expect(index.ok()).toBe(true);
  const plans = [...(await index.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  expect(plans.length).toBeGreaterThan(0);
  const urls = new Set<string>();
  for (const p of plans) {
    const r = await request.get(p);
    expect(r.ok(), p).toBe(true);
    for (const m of (await r.text()).matchAll(/<loc>([^<]+)<\/loc>/g)) urls.add(new URL(m[1]).pathname);
  }
  const attendues = pagesHtml().filter((u) => !/^\/404/.test(u));
  aucunProbleme(attendues.filter((u) => !urls.has(u)), 'Pages absentes du sitemap');
  expect([...urls].some((u) => u.includes('404'))).toBe(false);
});

test('page 404 servie par la preview pour une URL inconnue', async ({ page }) => {
  const r = await page.goto('/cette-page-n-existe-vraiment-pas/');
  expect(r?.status()).toBe(404);
  await expect(page.locator('h1')).toContainText('n’existe pas');
  await expect(page.locator('main a[href="/"]').first()).toBeVisible();
  await expect(page).toHaveTitle(/Forma Roblox/);
});

test('aucune erreur console ni exception sur aucune page', async ({ page }) => {
  test.setTimeout(5 * 60_000);
  const problemes: string[] = [];
  let courante = '';
  page.on('pageerror', (e) => problemes.push(`${courante} : exception ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error' && !(courante.startsWith('/404') && /status of 404/.test(m.text()))) problemes.push(`${courante} : console.error ${m.text()}`);
  });
  page.on('response', (r) => {
    if (r.status() >= 400 && !courante.startsWith('/404')) problemes.push(`${courante} : HTTP ${r.status()} ${r.url()}`);
  });
  for (const url of pagesHtml()) {
    courante = url;
    await page.goto(url, { waitUntil: 'load' });
  }
  aucunProbleme(problemes, 'Erreurs console');
});
