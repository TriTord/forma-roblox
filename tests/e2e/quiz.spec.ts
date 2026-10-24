/**
 * Quiz de leçon : correction, score, progression, explications, recommencer,
 * et types de questions particuliers (trouve-le-bug, vrai-faux, QCM à plusieurs réponses).
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test, type Locator, type Page } from '@playwright/test';
import { DIST, bonnesReponses, lecons, lireProgression, modulesAvecExamen, pct, repondre, urlExamen } from './outils';

/** Première page (leçon d'abord, sinon examen) contenant une question du type demandé, d'après le HTML construit. */
function pageAvecQuestion(motif: RegExp): { url: string; mode: 'lecon' | 'examen' } | undefined {
  const lire = (url: string) => readFileSync(join(DIST, url, 'index.html'), 'utf8');
  for (const l of lecons()) if (motif.test(lire(l.url))) return { url: l.url, mode: 'lecon' };
  for (const m of modulesAvecExamen()) if (motif.test(lire(urlExamen(m.numero)))) return { url: urlExamen(m.numero), mode: 'examen' };
  return undefined;
}

/** Répond à une question puis la corrige (bouton Valider en mode leçon). */
async function repondreEtValider(question: Locator, juste: boolean): Promise<void> {
  await repondre(question, juste);
  await question.getByTestId('quiz-valider').click();
}

/** En mode examen, répond juste à toutes les autres questions et corrige. */
async function corrigerExamen(page: Page): Promise<void> {
  const questions = page.locator('[data-question]');
  for (let i = 0; i < (await questions.count()); i++) {
    const q = questions.nth(i);
    if ((await q.locator('input:checked').count()) === 0) await repondre(q, true);
  }
  await page.locator('[data-action="corriger"]').click();
}

const premiereLecon = () => {
  const l = lecons()[0];
  test.skip(!l, 'Aucune leçon publiée');
  return l;
};

test('répondre juste à tout : 100 %, leçon terminée, progression mise à jour', async ({ page }) => {
  const lecon = premiereLecon();
  const total = lecons().length;
  const duModule = lecons().filter((l) => l.module === lecon.module).length;
  await page.goto(lecon.url);
  const quiz = page.getByTestId('quiz');
  const questions = quiz.locator('[data-question]');
  const n = await questions.count();
  expect(n).toBeGreaterThanOrEqual(3);
  await expect(page.getByTestId('lecon-terminer')).toHaveAttribute('aria-pressed', 'false');

  for (let i = 0; i < n; i++) {
    const q = questions.nth(i);
    await repondreEtValider(q, true);
    await expect(q).toHaveAttribute('data-etat', 'correct');
    await expect(q.locator('[data-verdict]')).toHaveText('Bonne réponse !');
    await expect(q.locator('[data-explication]')).toBeVisible();
    await expect(q.getByTestId('quiz-valider')).toBeHidden();
    await expect(q.locator('input[data-option-input]').first()).toBeDisabled();
    // Le score n'apparaît qu'une fois toutes les questions corrigées.
    if (i < n - 1) await expect(quiz.getByTestId('quiz-score')).toBeHidden();
  }

  const score = quiz.getByTestId('quiz-score');
  await expect(score).toBeVisible();
  await expect(score).toContainText(`${n} / ${n} (100 %)`);
  await expect(score).toBeFocused();
  await expect(quiz).toHaveAttribute('data-etat', 'reussi');
  await expect(page.getByTestId('lecon-terminer')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByTestId(`progress-module-${lecon.module}`).first()).toHaveAttribute('aria-valuenow', String(pct(1, duModule)));
  await expect(page.getByTestId('progress-global').first()).toHaveAttribute('aria-valuenow', String(pct(1, total)));
  await expect(page.locator(`[data-testid="sidebar"] [data-statut-lecon="${lecon.id}"]`)).toHaveAttribute('data-termine', 'true');

  const etat = await lireProgression(page);
  expect(etat?.lecons[lecon.id]).toBeTruthy();
  expect(etat?.quiz[lecon.id]).toMatchObject({ score: n, total: n, meilleurScore: n });
});

test('répondre faux : explication affichée, bonne réponse signalée, leçon non terminée', async ({ page }) => {
  const lecon = premiereLecon();
  await page.goto(lecon.url);
  const questions = page.locator('[data-testid="quiz"] [data-question]');
  const n = await questions.count();

  const q0 = questions.first();
  await repondreEtValider(q0, false);
  await expect(q0).toHaveAttribute('data-etat', 'incorrect');
  await expect(q0.getByTestId('quiz-feedback')).toBeVisible();
  await expect(q0.locator('[data-verdict]')).toContainText('Pas tout à fait');
  await expect(q0.locator('[data-explication]')).toBeVisible();
  await expect(q0.locator('[data-explication]')).not.toHaveText(/^\s*(Explication :)?\s*$/);
  await expect(q0.locator('[data-option][data-etat="fausse"]')).toHaveCount(1);
  const bonnes = await bonnesReponses(q0);
  await expect(q0.locator('[data-option][data-etat="bonne"]')).toHaveCount(bonnes.length);

  for (let i = 1; i < n; i++) await repondreEtValider(questions.nth(i), false);
  const score = page.getByTestId('quiz-score');
  await expect(score).toContainText(`0 / ${n} (0 %)`);
  await expect(score).toContainText('Il faut au moins');
  await expect(page.getByTestId('quiz')).toHaveAttribute('data-etat', 'echoue');
  await expect(page.getByTestId('lecon-terminer')).toHaveAttribute('aria-pressed', 'false');
  const etat = await lireProgression(page);
  expect(etat?.lecons[lecon.id]).toBeUndefined();
  expect(etat?.quiz[lecon.id]).toMatchObject({ score: 0, total: n });
});

test('valider sans réponse affiche une aide, qui disparaît quand on coche', async ({ page }) => {
  const lecon = premiereLecon();
  await page.goto(lecon.url);
  const q0 = page.locator('[data-testid="quiz"] [data-question]').first();
  await q0.getByTestId('quiz-valider').click();
  await expect(q0.getByTestId('quiz-feedback')).toBeVisible();
  await expect(q0.locator('[data-verdict]')).toHaveText('Choisis au moins une réponse avant de valider.');
  await expect(q0.locator('[data-explication]')).toBeHidden();
  await expect(q0).not.toHaveAttribute('data-etat', /.+/);
  await repondre(q0, true);
  await expect(q0.getByTestId('quiz-feedback')).toBeHidden();
});

test('le bouton Recommencer remet le quiz à zéro et permet un nouvel essai', async ({ page }) => {
  const lecon = premiereLecon();
  await page.goto(lecon.url);
  const quiz = page.getByTestId('quiz');
  const questions = quiz.locator('[data-question]');
  const n = await questions.count();
  for (let i = 0; i < n; i++) await repondreEtValider(questions.nth(i), false);
  await expect(quiz.getByTestId('quiz-score')).toBeVisible();

  await quiz.getByTestId('quiz-recommencer').click();
  await expect(quiz.getByTestId('quiz-score')).toBeHidden();
  await expect(quiz).not.toHaveAttribute('data-etat', /.+/);
  await expect(quiz.locator('input[data-option-input]:checked')).toHaveCount(0);
  await expect(quiz.locator('input[data-option-input]:disabled')).toHaveCount(0);
  await expect(quiz.locator('[data-option][data-etat]')).toHaveCount(0);
  await expect(quiz.getByTestId('quiz-feedback').first()).toBeHidden();
  await expect(quiz.getByTestId('quiz-valider')).toHaveCount(n);
  for (let i = 0; i < n; i++) await expect(questions.nth(i).getByTestId('quiz-valider')).toBeVisible();
  await expect(quiz.locator('input[data-option-input]').first()).toBeFocused();

  // Deuxième essai, tout juste : la leçon est validée, 2 tentatives enregistrées.
  for (let i = 0; i < n; i++) await repondreEtValider(questions.nth(i), true);
  await expect(quiz.getByTestId('quiz-score')).toContainText('(100 %)');
  await expect(page.getByTestId('lecon-terminer')).toHaveAttribute('aria-pressed', 'true');
  const etat = await lireProgression(page);
  expect(etat?.quiz[lecon.id]).toMatchObject({ meilleurScore: n, tentatives: 2 });
});

test('question « trouve-le-bug » : code numéroté, bonne réponse reconnue', async ({ page }) => {
  const cible = pageAvecQuestion(/data-type="trouve-le-bug"/);
  test.skip(!cible, 'Aucune question trouve-le-bug publiée');
  await page.goto(cible!.url);
  const q = page.locator('[data-question][data-type="trouve-le-bug"]').first();
  await q.scrollIntoViewIfNeeded();

  const code = q.getByTestId('quiz-code');
  await expect(code).toBeVisible();
  await expect(code.locator('pre')).toHaveCount(1);
  const lignes = code.locator('.line');
  expect(await lignes.count()).toBeGreaterThan(0);
  // Numéros de ligne (compteur CSS) : la 1re ligne affiche « 1 ».
  const numero = await lignes.first().evaluate((el) => getComputedStyle(el, '::before').content);
  expect(numero).not.toBe('none');
  // Une seule bonne réponse, en boutons radio.
  expect(await bonnesReponses(q)).toHaveLength(1);
  await expect(q.locator('input[type="radio"]').first()).toBeVisible();

  await repondre(q, true);
  if (cible!.mode === 'lecon') await q.getByTestId('quiz-valider').click();
  else await corrigerExamen(page);
  await expect(q).toHaveAttribute('data-etat', 'correct');
  await expect(q.locator('[data-explication]')).toBeVisible();
});

test('question « vrai-faux » : deux options Vrai / Faux, correction juste et fausse', async ({ page }) => {
  const cible = pageAvecQuestion(/data-type="vrai-faux"/);
  test.skip(!cible, 'Aucune question vrai-faux publiée');
  await page.goto(cible!.url);
  const q = page.locator('[data-question][data-type="vrai-faux"]').first();
  const options = q.getByTestId('quiz-option');
  await expect(options).toHaveCount(2);
  await expect(options.nth(0)).toContainText('Vrai');
  await expect(options.nth(1)).toContainText('Faux');
  await expect(q.locator('input[type="radio"]')).toHaveCount(2);
  expect(await bonnesReponses(q)).toHaveLength(1);

  // Les deux options partagent le même name : cocher l'une décoche l'autre.
  await q.locator('input').nth(0).check();
  await q.locator('input').nth(1).check();
  await expect(q.locator('input:checked')).toHaveCount(1);

  await repondre(q, false);
  if (cible!.mode === 'lecon') {
    await q.getByTestId('quiz-valider').click();
    await expect(q).toHaveAttribute('data-etat', 'incorrect');
    await expect(q.locator('[data-explication]')).toBeVisible();
  } else {
    await corrigerExamen(page);
    await expect(q).toHaveAttribute('data-etat', 'incorrect');
  }
});

test('QCM à plusieurs bonnes réponses : cases à cocher, réponse partielle comptée fausse', async ({ page }) => {
  const cible = pageAvecQuestion(/data-type="qcm" data-correct="\d+,\d+/);
  test.skip(!cible, 'Aucun QCM à plusieurs réponses publié');
  await page.goto(cible!.url);
  const q = page.locator('[data-question][data-type="qcm"][data-correct*=","]').first();
  await expect(q.locator('.question-aide')).toBeVisible();
  await expect(q.locator('input[type="checkbox"]').first()).toBeVisible();
  const bonnes = await bonnesReponses(q);
  await q.locator('input[data-option-input]').nth(bonnes[0]).check();
  if (cible!.mode === 'lecon') await q.getByTestId('quiz-valider').click();
  else {
    // Les autres questions juste, celle-ci partielle.
    const toutes = page.locator('[data-question]');
    for (let i = 0; i < (await toutes.count()); i++) {
      const autre = toutes.nth(i);
      if ((await autre.locator('input:checked').count()) === 0) await repondre(autre, true);
    }
    await page.locator('[data-action="corriger"]').click();
  }
  await expect(q).toHaveAttribute('data-etat', 'incorrect');
  await expect(q.locator('[data-verdict]')).toContainText('toutes les bonnes réponses');
});
