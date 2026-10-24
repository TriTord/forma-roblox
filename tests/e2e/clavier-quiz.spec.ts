/**
 * Quiz et examen entièrement au clavier (Tab / flèches / Espace / Entrée), focus visible à chaque étape,
 * et annonce des résultats aux lecteurs d'écran (zones role="status" / aria-live, alerte role="alert").
 */
import { expect, test, type Locator, type Page } from '@playwright/test';
import { bonnesReponses, lecons, modulesAvecExamen, urlExamen } from './outils';

/** Décrit l'élément actif et vérifie qu'il a un indicateur de focus visible (:focus-visible + contour non nul). */
async function focusActif(page: Page) {
  return page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null;
    if (!el || el === document.body) return { tag: 'body', visible: false, value: null, type: null, action: null, question: -1 };
    const style = getComputedStyle(el);
    const contour = style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 2;
    const ombre = style.boxShadow !== 'none';
    const question = el.closest('[data-question]');
    return {
      tag: el.tagName.toLowerCase(),
      type: el.getAttribute('type'),
      value: el.getAttribute('value'),
      action: el.getAttribute('data-action'),
      visible: el.matches(':focus-visible') && (contour || ombre),
      question: question ? Array.from(document.querySelectorAll('[data-question]')).indexOf(question) : -1,
    };
  });
}

/**
 * Tab vers l'élément suivant. Les blocs de code « trouve-le-bug » (<pre tabindex="0">, défilables) sont
 * volontairement focalisables : on vérifie que leur focus est visible, puis on continue.
 */
async function tabSuivant(page: Page) {
  await page.keyboard.press('Tab');
  let f = await focusActif(page);
  while (f.tag === 'pre') {
    expect(f.visible, 'focus visible sur le bloc de code').toBe(true);
    await page.keyboard.press('Tab');
    f = await focusActif(page);
  }
  return f;
}

/** Appuie sur Tab jusqu'à ce que `cible` ait le focus (au plus `max` fois). */
async function tabulerJusqua(page: Page, cible: Locator, max = 600): Promise<number> {
  for (let i = 1; i <= max; i++) {
    await page.keyboard.press('Tab');
    if (await cible.evaluate((el) => el === document.activeElement)) return i;
  }
  throw new Error(`Cible jamais atteinte après ${max} tabulations`);
}

/** Répond juste à la question i, au clavier, en partant du focus sur sa première option. */
async function repondreAuClavier(page: Page, question: Locator, i: number): Promise<void> {
  const bonnes = await bonnesReponses(question);
  const inputs = question.locator('input[data-option-input]');
  const n = await inputs.count();
  const multiple = (await inputs.first().getAttribute('type')) === 'checkbox';
  let f = await focusActif(page);
  expect(f, `Q${i + 1} : le focus doit arriver sur la 1re option`).toMatchObject({ tag: 'input', value: '0', question: i, visible: true });
  if (multiple) {
    for (let j = 0; j < n; j++) {
      if (bonnes.includes(j)) await page.keyboard.press('Space');
      if (j < n - 1) {
        await page.keyboard.press('Tab');
        f = await focusActif(page);
        expect(f, `Q${i + 1} : Tab passe à l’option ${j + 2}`).toMatchObject({ value: String(j + 1), visible: true });
      }
    }
  } else {
    const cible = bonnes[0];
    // Groupe de boutons radio : Espace coche l'option active, les flèches déplacent ET cochent.
    if (cible === 0) await page.keyboard.press('Space');
    for (let k = 0; k < cible; k++) await page.keyboard.press('ArrowDown');
    f = await focusActif(page);
    expect(f, `Q${i + 1} : focus sur l’option ${cible + 1}`).toMatchObject({ value: String(cible), visible: true });
  }
  for (const [j, input] of (await inputs.all()).entries()) {
    expect(await input.isChecked(), `Q${i + 1} option ${j + 1} cochée ?`).toBe(bonnes.includes(j));
  }
}

test('quiz de leçon complet au clavier, focus visible, résultats annoncés', async ({ page }) => {
  const lecon = lecons()[0];
  test.skip(!lecon, 'Aucune leçon publiée');
  await page.goto(lecon.url);
  const quiz = page.getByTestId('quiz');
  const questions = quiz.locator('[data-question]');
  const n = await questions.count();

  await tabulerJusqua(page, questions.first().locator('input').first());
  for (let i = 0; i < n; i++) {
    const q = questions.nth(i);
    await repondreAuClavier(page, q, i);
    // Tab sort du groupe d'options et atteint « Valider » ; Entrée corrige.
    await page.keyboard.press('Tab');
    expect(await focusActif(page), `Q${i + 1} : Tab → bouton Valider`).toMatchObject({ tag: 'button', action: 'valider', visible: true });
    await page.keyboard.press('Enter');
    await expect(q).toHaveAttribute('data-etat', 'correct');
    // Le verdict est dans une zone annoncée (role="status", aria-live="polite") reliée au fieldset.
    const feedback = q.getByTestId('quiz-feedback');
    await expect(feedback).toBeVisible();
    await expect(feedback).toHaveAttribute('role', 'status');
    await expect(feedback).toHaveAttribute('aria-live', 'polite');
    await expect(feedback).toContainText('Bonne réponse !');
    expect(await q.getAttribute('aria-describedby')).toBe(await feedback.getAttribute('id'));
    if (i < n - 1) {
      // Le bouton Valider disparaît : Tab mène directement à la question suivante.
      expect(await tabSuivant(page), `Q${i + 2} : Tab → 1re option`).toMatchObject({ tag: 'input', question: i + 1 });
    }
  }

  // Score : zone role="status" aria-live, focalisée pour être lue immédiatement, contour visible.
  const score = quiz.getByTestId('quiz-score');
  await expect(score).toBeVisible();
  await expect(score).toBeFocused();
  await expect(score).toHaveAttribute('role', 'status');
  await expect(score).toHaveAttribute('aria-live', 'polite');
  await expect(score).toContainText(`${n} / ${n} (100 %)`);
  await expect(page.getByTestId('lecon-terminer')).toHaveAttribute('aria-pressed', 'true');

  // « Recommencer » au clavier : Tab puis Entrée, le focus revient sur la 1re option.
  await page.keyboard.press('Tab');
  expect(await focusActif(page)).toMatchObject({ tag: 'button', action: 'recommencer', visible: true });
  await page.keyboard.press('Enter');
  await expect(score).toBeHidden();
  expect(await focusActif(page)).toMatchObject({ tag: 'input', question: 0, value: '0' });
});

test('examen complet au clavier : alerte annoncée si réponses manquantes, puis réussite', async ({ page }) => {
  const m = modulesAvecExamen()[0];
  test.skip(!m, 'Aucun examen publié');
  await page.goto(urlExamen(m.numero));
  const examen = page.getByTestId('examen');
  const questions = examen.locator('[data-question]');
  const n = await questions.count();
  const corriger = examen.locator('[data-action="corriger"]');

  // Atteindre « Corriger » directement au clavier sans répondre : alerte role="alert", focus renvoyé sur la 1re question.
  await tabulerJusqua(page, corriger);
  expect((await focusActif(page)).visible, 'focus visible sur « Corriger l’examen »').toBe(true);
  await page.keyboard.press('Enter');
  const alerte = examen.locator('[data-alerte]');
  await expect(alerte).toBeVisible();
  await expect(alerte).toHaveAttribute('role', 'alert');
  await expect(alerte).toContainText(`${n} questions sans réponse`);
  expect(await focusActif(page)).toMatchObject({ tag: 'input', question: 0, value: '0' });

  for (let i = 0; i < n; i++) {
    await repondreAuClavier(page, questions.nth(i), i);
    const f = await tabSuivant(page);
    if (i < n - 1) expect(f, `Q${i + 2} : Tab → 1re option`).toMatchObject({ tag: 'input', question: i + 1, visible: true });
    else expect(f, 'Tab → Corriger l’examen').toMatchObject({ tag: 'button', action: 'corriger', visible: true });
  }
  await page.keyboard.press('Enter');
  await expect(alerte).toBeHidden();
  await expect(examen).toHaveAttribute('data-etat', 'reussi');
  const score = examen.getByTestId('quiz-score');
  await expect(score).toBeFocused();
  await expect(score).toHaveAttribute('aria-live', 'polite');
  await expect(score).toContainText(`${n} / ${n} (100 %)`);
  await expect(score).toContainText('badge');
});
