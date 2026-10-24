/** Accessibilité : axe-core sans violation « serious » ou « critical », en thème clair ET sombre. */
import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { CLE_THEME, lecons, modulesAvecExamen, repondre, urlExamen } from './outils';

const pages = () => {
  const l = lecons();
  const ex = modulesAvecExamen()[0];
  return [
    { nom: 'accueil', url: '/' },
    { nom: 'programme', url: '/programme/' },
    { nom: 'module', url: '/modules/00/' },
    { nom: 'leçon', url: l[0]?.url ?? '/modules/00/' },
    ...(l.length > 1 ? [{ nom: 'leçon (dernière)', url: l[l.length - 1].url }] : []),
    { nom: 'examen', url: ex ? urlExamen(ex.numero) : urlExamen('00') },
    { nom: 'progression', url: '/progression/' },
    { nom: '404', url: '/404.html' },
  ];
};

async function analyser(page: Page): Promise<string[]> {
  const resultat = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
  return resultat.violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .map(
      (v) =>
        `[${v.impact}] ${v.id} : ${v.help} (${v.nodes.length} élément(s))\n      ${v.nodes
          .slice(0, 4)
          .map((n) => `${n.target.join(' ')} — ${n.failureSummary?.split('\n').slice(1, 2).join('').trim() ?? ''}`)
          .join('\n      ')}`,
    );
}

for (const theme of ['clair', 'sombre'] as const) {
  test.describe(`thème ${theme}`, () => {
    test.use({ colorScheme: theme === 'sombre' ? 'dark' : 'light' });

    test.beforeEach(async ({ page }) => {
      await page.addInitScript(([cle, valeur]) => localStorage.setItem(cle, valeur), [CLE_THEME, theme] as const);
      // Neutralise les transitions pour mesurer les contrastes définitifs.
      await page.addInitScript(() => {
        document.addEventListener('DOMContentLoaded', () => {
          const s = document.createElement('style');
          s.textContent = '*,*::before,*::after{transition:none!important;animation:none!important}';
          document.head.append(s);
        });
      });
    });

    for (const p of pages()) {
      test(`${p.nom} (${p.url})`, async ({ page }) => {
        await page.goto(p.url);
        await expect(page.locator('html')).toHaveClass(theme === 'sombre' ? /\bdark\b/ : /^(?!.*\bdark\b)/);
        const violations = await analyser(page);
        expect(violations, `Violations axe (${theme}) sur ${p.url} :\n  ${violations.join('\n  ')}`).toEqual([]);
      });
    }

    test('quiz corrigé (bonnes/mauvaises réponses, score) et sommaire mobile ouvert', async ({ page }) => {
      const l = lecons()[0];
      test.skip(!l, 'Aucune leçon publiée');
      await page.goto(l.url);
      const questions = page.locator('[data-testid="quiz"] [data-question]');
      const n = await questions.count();
      for (let i = 0; i < n; i++) {
        await repondre(questions.nth(i), i % 2 === 0);
        await questions.nth(i).getByTestId('quiz-valider').click();
      }
      await expect(page.getByTestId('quiz-score')).toBeVisible();
      let violations = await analyser(page);
      expect(violations, `Quiz corrigé (${theme}) :\n  ${violations.join('\n  ')}`).toEqual([]);

      await page.setViewportSize({ width: 390, height: 844 });
      await page.getByTestId('sidebar-toggle').click();
      await expect(page.getByTestId('sidebar')).toBeVisible();
      violations = await analyser(page);
      expect(violations, `Sommaire mobile (${theme}) :\n  ${violations.join('\n  ')}`).toEqual([]);
    });

    test('boîte de recherche avec résultats', async ({ page }) => {
      await page.goto('/');
      await page.getByTestId('search-open').click();
      await page.locator('#pagefind-ui input').fill('Roblox');
      await expect(page.locator('.pagefind-ui__result').first()).toBeVisible({ timeout: 10_000 });
      const violations = await analyser(page);
      expect(violations, `Recherche (${theme}) :\n  ${violations.join('\n  ')}`).toEqual([]);
    });
  });
}
