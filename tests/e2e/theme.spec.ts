/** Thème clair / sombre : bascule, persistance, absence de flash, préférence système. */
import { expect, test, type Page } from '@playwright/test';
import { CLE_THEME, lecons } from './outils';

/**
 * Enregistre l'état de <html class="dark"> au moment exact où <body> est inséré dans le DOM,
 * c'est-à-dire avant tout rendu du contenu : s'il est déjà correct, il n'y a pas de flash.
 */
async function espionnerPremierRendu(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const w = window as unknown as { __sombreAuPremierRendu?: boolean };
    const obs = new MutationObserver(() => {
      if (document.body && w.__sombreAuPremierRendu === undefined) {
        w.__sombreAuPremierRendu = document.documentElement.classList.contains('dark');
        obs.disconnect();
      }
    });
    obs.observe(document, { childList: true, subtree: true });
  });
}
const sombreAuPremierRendu = (page: Page) =>
  page.evaluate(() => (window as unknown as { __sombreAuPremierRendu?: boolean }).__sombreAuPremierRendu);

const html = (page: Page) => page.locator('html');
const pageCours = () => lecons()[0]?.url ?? '/modules/00/';

test.describe('système en mode clair', () => {
  test.use({ colorScheme: 'light' });

  test('clair par défaut, bascule vers sombre puis clair, choix mémorisé', async ({ page }) => {
    await page.goto('/');
    await expect(html(page)).not.toHaveClass(/\bdark\b/);
    const bouton = page.getByTestId('theme-toggle');
    await expect(bouton).toHaveAttribute('aria-label', 'Activer le thème sombre');

    await bouton.click();
    await expect(html(page)).toHaveClass(/\bdark\b/);
    await expect(bouton).toHaveAttribute('aria-label', 'Activer le thème clair');
    expect(await page.evaluate((c) => localStorage.getItem(c), CLE_THEME)).toBe('sombre');
    // Le fond change réellement.
    const fondSombre = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);

    await page.reload();
    await expect(html(page)).toHaveClass(/\bdark\b/);
    await page.goto(pageCours());
    await expect(html(page)).toHaveClass(/\bdark\b/);

    await page.getByTestId('theme-toggle').click();
    await expect(html(page)).not.toHaveClass(/\bdark\b/);
    expect(await page.evaluate((c) => localStorage.getItem(c), CLE_THEME)).toBe('clair');
    const fondClair = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(fondClair).not.toBe(fondSombre);
  });

  test('pas de flash : thème sombre mémorisé appliqué avant le premier rendu', async ({ page }) => {
    await page.addInitScript((c) => localStorage.setItem(c, 'sombre'), CLE_THEME);
    await espionnerPremierRendu(page);
    for (const url of ['/', pageCours(), '/progression/']) {
      await page.goto(url);
      expect(await sombreAuPremierRendu(page), url).toBe(true);
    }
  });

  test('suit le système tant qu’aucun choix n’est mémorisé', async ({ page }) => {
    await page.goto('/');
    await expect(html(page)).not.toHaveClass(/\bdark\b/);
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(html(page)).toHaveClass(/\bdark\b/);
    await page.emulateMedia({ colorScheme: 'light' });
    await expect(html(page)).not.toHaveClass(/\bdark\b/);
  });
});

test.describe('système en mode sombre', () => {
  test.use({ colorScheme: 'dark' });

  test('respecte prefers-color-scheme dès le premier rendu', async ({ page }) => {
    await espionnerPremierRendu(page);
    await page.goto('/');
    expect(await sombreAuPremierRendu(page)).toBe(true);
    await expect(html(page)).toHaveClass(/\bdark\b/);
    await expect(page.getByTestId('theme-toggle')).toHaveAttribute('aria-label', 'Activer le thème clair');
  });

  test('un choix « clair » mémorisé l’emporte sur le système, sans flash', async ({ page }) => {
    await page.addInitScript((c) => localStorage.setItem(c, 'clair'), CLE_THEME);
    await espionnerPremierRendu(page);
    await page.goto(pageCours());
    expect(await sombreAuPremierRendu(page)).toBe(false);
    await expect(html(page)).not.toHaveClass(/\bdark\b/);
    // Le choix explicite n'est plus écrasé par un changement du système.
    await page.emulateMedia({ colorScheme: 'light' });
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(html(page)).not.toHaveClass(/\bdark\b/);
  });
});

test('le script anti-flash est inline, synchrone et placé dans <head>', async ({ request }) => {
  const source = await (await request.get('/')).text();
  const head = source.slice(0, source.indexOf('</head>'));
  const script = /<script(?![^>]*\b(?:src|type="module"|defer|async)\b)[^>]*>([\s\S]*?)<\/script>/g;
  const inline = [...head.matchAll(script)].map((m) => m[1]).find((s) => s.includes(CLE_THEME));
  expect(inline, 'script inline lisant la préférence de thème dans <head>').toBeTruthy();
  expect(inline).toContain('prefers-color-scheme');
});
