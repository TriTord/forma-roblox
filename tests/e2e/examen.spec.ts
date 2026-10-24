/** Examens de module : correction globale, alerte, badge sur /progression. */
import { expect, test, type Page } from '@playwright/test';
import { lireProgression, modulesAvecExamen, repondre, urlExamen } from './outils';

const premierExamen = () => {
  const m = modulesAvecExamen()[0];
  test.skip(!m, 'Aucun examen publié');
  return m;
};

async function repondreATout(page: Page, juste: boolean, sauf: number[] = []): Promise<number> {
  const questions = page.locator('[data-testid="examen"] [data-question]');
  const n = await questions.count();
  for (let i = 0; i < n; i++) if (!sauf.includes(i)) await repondre(questions.nth(i), juste);
  return n;
}

test('réponses manquantes : alerte avec le nombre de questions, rien n’est corrigé', async ({ page }) => {
  const m = premierExamen();
  await page.goto(urlExamen(m.numero));
  const examen = page.getByTestId('examen');
  const corriger = examen.locator('[data-action="corriger"]');
  const alerte = examen.locator('[data-alerte]');
  const n = await examen.locator('[data-question]').count();
  // L'examen n'a pas de bouton « Valider » par question.
  await expect(examen.locator('[data-action="valider"]')).toHaveCount(0);

  await corriger.click();
  await expect(alerte).toBeVisible();
  await expect(alerte).toHaveText(`Il reste ${n} questions sans réponse.`);
  await expect(examen.locator('input[data-option-input]').first()).toBeFocused();
  await expect(examen.getByTestId('quiz-score')).toBeHidden();

  await repondreATout(page, true, [n - 1]);
  await corriger.click();
  await expect(alerte).toHaveText('Il reste 1 question sans réponse.');
  await expect(examen.locator('[data-question][data-etat]')).toHaveCount(0);
  expect(await lireProgression(page)).toBeNull();
});

test('tout juste : examen réussi, badge du module et « Sans-faute » sur /progression', async ({ page }) => {
  const m = premierExamen();
  await page.goto(urlExamen(m.numero));
  const examen = page.getByTestId('examen');
  const n = await repondreATout(page, true);
  await examen.locator('[data-action="corriger"]').click();

  await expect(examen.locator('[data-alerte]')).toBeHidden();
  await expect(examen).toHaveAttribute('data-etat', 'reussi');
  await expect(examen.getByTestId('quiz-score')).toContainText(`${n} / ${n} (100 %)`);
  await expect(examen.getByTestId('quiz-score')).toContainText('Sans-faute');
  await expect(examen.locator('[data-question][data-etat="correct"]')).toHaveCount(n);
  await expect(examen.locator('[data-action="corriger"]')).toBeHidden();
  await expect(page.locator(`[data-resultat-examen="${m.numero}"]`).first()).toContainText('100 %');
  await expect(page.locator(`[data-testid="sidebar"] [data-statut-examen="${m.numero}"]`)).toHaveAttribute('data-termine', 'true');
  expect((await lireProgression(page))?.examens[m.numero]).toMatchObject({ pct: 100, reussi: true });

  await page.goto('/progression/');
  const badge = page.locator(`[data-testid="badge-module-${m.numero}"]`);
  await expect(badge).toHaveAttribute('data-obtenu', 'true');
  await expect(badge).toContainText(m.badge.nom);
  await expect(badge).toContainText('Obtenu');
  await expect(page.locator('[data-testid="badge-sans-faute"]')).toHaveAttribute('data-obtenu', 'true');
  await expect(page.locator(`[data-resultat-examen="${m.numero}"]`)).toHaveAttribute('data-reussi', 'true');
  // Les autres badges de module restent à débloquer.
  for (const autre of modulesAvecExamen().filter((x) => x.numero !== m.numero)) {
    await expect(page.locator(`[data-testid="badge-module-${autre.numero}"]`)).toHaveAttribute('data-obtenu', 'false');
  }
});

test('tout faux : examen échoué, pas de badge ; recommencer réinitialise', async ({ page }) => {
  const m = premierExamen();
  await page.goto(urlExamen(m.numero));
  const examen = page.getByTestId('examen');
  const n = await repondreATout(page, false);
  await examen.locator('[data-action="corriger"]').click();
  await expect(examen).toHaveAttribute('data-etat', 'echoue');
  await expect(examen.getByTestId('quiz-score')).toContainText(`0 / ${n} (0 %)`);
  await expect(examen.locator('[data-explication]:visible')).toHaveCount(n);

  await examen.getByTestId('quiz-recommencer').click();
  await expect(examen.locator('[data-action="corriger"]')).toBeVisible();
  await expect(examen.locator('input:checked')).toHaveCount(0);
  await expect(examen.getByTestId('quiz-score')).toBeHidden();

  await page.goto('/progression/');
  await expect(page.locator(`[data-testid="badge-module-${m.numero}"]`)).toHaveAttribute('data-obtenu', 'false');
  await expect(page.locator(`[data-resultat-examen="${m.numero}"]`)).toContainText('0 %');
});
