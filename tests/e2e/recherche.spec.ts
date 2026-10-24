/** Recherche Pagefind (index généré au build). */
import { expect, test } from '@playwright/test';
import { catalogue, lecons } from './outils';

/** Un mot significatif tiré d'un titre de leçon (ou de module) publié. */
function motCle(): string {
  const titres = [...lecons().map((l) => l.titre), ...catalogue().map((m) => m.titre)];
  for (const titre of titres) {
    const mot = titre
      .split(/[^\p{L}\p{N}]+/u)
      .filter((m) => m.length >= 5)
      .sort((a, b) => b.length - a.length)[0];
    if (mot) return mot;
  }
  return 'Roblox';
}

test('une requête renvoie des résultats cliquables', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('search-open').click();
  const dialogue = page.getByTestId('search-dialog');
  await expect(dialogue).toBeVisible();
  const champ = dialogue.locator('#pagefind-ui input');
  await expect(champ).toBeVisible();
  await expect(champ).toBeFocused();

  const mot = motCle();
  await champ.fill(mot);
  const resultats = dialogue.locator('.pagefind-ui__result');
  await expect(resultats.first()).toBeVisible({ timeout: 10_000 });
  expect(await resultats.count()).toBeGreaterThan(0);
  await expect(dialogue.locator('[data-recherche-indisponible]')).toBeHidden();

  const lien = resultats.first().locator('a.pagefind-ui__result-link');
  const href = await lien.getAttribute('href');
  expect(href).toMatch(/^\/modules\//);
  await lien.click();
  await expect(page).toHaveURL(new RegExp(href!.split('#')[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});

test('raccourcis : Ctrl+K et « / » ouvrent la recherche, Échap la ferme', async ({ page }) => {
  await page.goto(lecons()[0]?.url ?? '/programme/');
  const dialogue = page.getByTestId('search-dialog');
  await page.keyboard.press('Control+k');
  await expect(dialogue).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialogue).toBeHidden();
  await page.locator('body').click({ position: { x: 5, y: 300 } });
  await page.keyboard.press('/');
  await expect(dialogue).toBeVisible();
  // « / » tapé dans le champ de recherche ne doit pas être intercepté.
  const champ = page.locator('#pagefind-ui input');
  await champ.fill('');
  await champ.press('/');
  await expect(champ).toHaveValue('/');
});

test('les pages hors contenu (accueil, progression) ne sont pas indexées', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('search-open').click();
  await page.locator('#pagefind-ui input').fill('badges');
  await page.waitForTimeout(1_000);
  const hrefs = await page.locator('a.pagefind-ui__result-link').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
  for (const h of hrefs) expect(h).toMatch(/^\/modules\//);
});
