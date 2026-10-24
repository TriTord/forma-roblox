/** Listes de tâches Markdown (« - [ ] ») : cases interactives, étiquetées, mémorisées par page. */
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';
import { DIST, aucunProbleme, pagesHtml } from './outils';

/** Pages du site construit qui contiennent au moins une liste de tâches. */
function pagesAvecTaches(): string[] {
  return pagesHtml().filter((url) => {
    const fichier = url.endsWith('.html') ? join(DIST, url) : join(DIST, url, 'index.html');
    return /class="[^"]*contains-task-list/.test(readFileSync(fichier, 'utf8'));
  });
}

const cle = (url: string) => `forma-roblox:taches:${url}`;

test('toutes les cases à cocher des listes de tâches sont actives et reliées à leur texte', async ({ page }) => {
  const urls = pagesAvecTaches();
  test.skip(!urls.length, 'Aucune liste de tâches publiée');
  const problemes: string[] = [];
  for (const url of urls) {
    await page.goto(url);
    const infos = await page.locator('.contains-task-list input[type="checkbox"]').evaluateAll((cases) =>
      cases.map((c) => {
        const input = c as HTMLInputElement;
        const texte = Array.from(input.labels ?? [])
          .map((l) => l.textContent ?? '')
          .join(' ')
          .trim();
        return { id: input.id, desactivee: input.disabled, texte };
      }),
    );
    if (!infos.length) problemes.push(`${url} : liste de tâches sans case`);
    for (const [i, c] of infos.entries()) {
      if (c.desactivee) problemes.push(`${url} : case n°${i + 1} désactivée`);
      if (!c.texte) problemes.push(`${url} : case n°${i + 1} (#${c.id}) sans étiquette`);
    }
    const ids = infos.map((c) => c.id);
    if (new Set(ids).size !== ids.length) problemes.push(`${url} : ids de cases en double`);
  }
  aucunProbleme(problemes, 'Cases de listes de tâches inaccessibles');
});

test('cocher, compteur, persistance après rechargement, « Tout décocher »', async ({ page }) => {
  const url = pagesAvecTaches()[0];
  test.skip(!url, 'Aucune liste de tâches publiée');
  await page.goto(url);
  const barre = page.getByTestId('taches-barre').first();
  const compteur = barre.getByTestId('taches-compteur');
  const reset = barre.getByTestId('taches-reset');
  const liste = page.locator('.contains-task-list').first();
  const cases = liste.locator('input.tache-case');
  const total = await cases.count();
  expect(total).toBeGreaterThan(0);
  await expect(compteur).toHaveText(`0 / ${total} cochée`);
  await expect(reset).toBeDisabled();

  // Clic sur le texte (label) → coche la case.
  const premiere = cases.first();
  const id = await premiere.getAttribute('id');
  await page.locator(`label[for="${id}"]`).click({ position: { x: 5, y: 5 } });
  await expect(premiere).toBeChecked();
  // Clavier : Espace sur la 2e case (si elle existe).
  if (total > 1) {
    await cases.nth(1).focus();
    await page.keyboard.press('Space');
    await expect(cases.nth(1)).toBeChecked();
  }
  const attendu = Math.min(total, 2);
  await expect(compteur).toHaveText(`${attendu} / ${total} cochée${attendu > 1 ? 's' : ''}`);
  await expect(reset).toBeEnabled();
  const stocke = await page.evaluate((k) => localStorage.getItem(k), cle(url));
  expect(JSON.parse(stocke ?? '[]')).toHaveLength(attendu);

  await page.reload();
  await expect(cases.first()).toBeChecked();
  await expect(compteur).toHaveText(`${attendu} / ${total} cochée${attendu > 1 ? 's' : ''}`);

  await reset.click();
  await expect(cases.first()).not.toBeChecked();
  await expect(compteur).toHaveText(`0 / ${total} cochée`);
  expect(await page.evaluate((k) => localStorage.getItem(k), cle(url))).toBeNull();
});

test('stockage bloqué : les cases restent cochables, sans erreur', async ({ page }) => {
  const url = pagesAvecTaches()[0];
  test.skip(!url, 'Aucune liste de tâches publiée');
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('Accès refusé', 'SecurityError');
      },
    });
  });
  const erreurs: string[] = [];
  page.on('pageerror', (e) => erreurs.push(e.message));
  await page.goto(url);
  const premiere = page.locator('input.tache-case').first();
  await premiere.check();
  await expect(premiere).toBeChecked();
  await expect(page.getByTestId('taches-compteur').first()).toContainText('1 /');
  expect(erreurs).toEqual([]);
});

test('listes de tâches : aucune violation axe serious / critical', async ({ page }) => {
  const url = pagesAvecTaches()[0];
  test.skip(!url, 'Aucune liste de tâches publiée');
  await page.goto(url);
  await page.locator('input.tache-case').first().check();
  const r = await new AxeBuilder({ page }).include('.contains-task-list').include('[data-testid="taches-barre"]').analyze();
  aucunProbleme(
    r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical').map((v) => `[${v.impact}] ${v.id} : ${v.help} (${v.nodes.length})`),
    'Violations axe dans les listes de tâches',
  );
});
