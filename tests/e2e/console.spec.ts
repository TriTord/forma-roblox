/** Aucune erreur JavaScript, aucun avertissement console, aucune ressource en échec sur les pages clés. */
import { expect, test } from '@playwright/test';
import { lecons, modulesAvecExamen, urlExamen } from './outils';

const pagesCles = () => {
  const l = lecons();
  const ex = modulesAvecExamen()[0];
  return [
    '/',
    '/programme/',
    '/progression/',
    '/modules/00/',
    ...(l[0] ? [l[0].url] : []),
    ...(l.length > 1 ? [l[l.length - 1].url] : []),
    ex ? urlExamen(ex.numero) : urlExamen('00'),
    '/404.html',
  ];
};

for (const theme of ['light', 'dark'] as const) {
  test.describe(`thème système ${theme}`, () => {
    test.use({ colorScheme: theme });
    for (const url of pagesCles()) {
      test(`pas d’erreur console sur ${url}`, async ({ page }) => {
        const erreurs: string[] = [];
        page.on('pageerror', (e) => erreurs.push(`exception : ${e.message}`));
        page.on('console', (m) => {
          if (m.type() === 'error' || m.type() === 'warning') erreurs.push(`console.${m.type()} : ${m.text()}`);
        });
        page.on('requestfailed', (r) => erreurs.push(`requête en échec : ${r.url()} (${r.failure()?.errorText})`));
        page.on('response', (r) => {
          if (r.status() >= 400 && !r.url().endsWith('/404.html')) erreurs.push(`HTTP ${r.status()} : ${r.url()}`);
        });
        await page.goto(url, { waitUntil: 'networkidle' });
        // Interactions qui chargent du code : recherche, thème.
        await page.getByTestId('search-open').click();
        await expect(page.locator('#pagefind-ui input')).toBeVisible();
        await page.keyboard.press('Escape');
        await page.getByTestId('theme-toggle').click();
        await page.waitForLoadState('networkidle');
        expect(erreurs, erreurs.join('\n')).toEqual([]);
      });
    }
  });
}
