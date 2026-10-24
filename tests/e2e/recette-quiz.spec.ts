/**
 * Recette exhaustive des quiz et examens (QA phase 2) :
 *  - CHAQUE leçon : bonnes réponses (lues dans le DOM, recoupées avec le frontmatter source) → 100 % et leçon terminée ;
 *  - CHAQUE examen : bonnes réponses → réussite et badge du module sur /progression ;
 *  - parcours complet : toutes les leçons + tous les examens → 100 % et tous les badges (dont « Formation complète »).
 * Les échecs listent toutes les leçons / examens fautifs.
 */
import { expect, test, type Page } from '@playwright/test';
import { indicesCorrects, questionsDesExamens, quizDesLecons, type QuizSource } from '../contenu-quiz';
import { aucunProbleme, bonnesReponses, catalogue, lecons, lireProgression, modulesAvecExamen, urlExamen } from './outils';

const sourcesLecons = new Map(quizDesLecons().map((q) => [q.id, q]));
const sourcesExamens = new Map(questionsDesExamens().map((q) => [q.id, q]));
const COURT = { timeout: 5_000 };

/** Vérifie que le quiz affiché correspond aux données sources (nombre, type et bonnes réponses de chaque question). */
async function recouperAvecSource(page: Page, racine: string, source: QuizSource | undefined): Promise<string[]> {
  if (!source) return ['données sources introuvables'];
  const dom = await page.locator(`${racine} [data-question]`).evaluateAll((els) =>
    els.map((el) => ({ type: el.getAttribute('data-type'), correct: el.getAttribute('data-correct'), options: el.querySelectorAll('input[data-option-input]').length })),
  );
  const p: string[] = [];
  if (dom.length !== source.questions.length) p.push(`${dom.length} questions affichées, ${source.questions.length} dans la source`);
  source.questions.forEach((q, i) => {
    const d = dom[i];
    if (!d) return;
    if (d.type !== q.type) p.push(`Q${i + 1} : type ${d.type} ≠ ${q.type}`);
    if (d.correct !== indicesCorrects(q)) p.push(`Q${i + 1} : data-correct « ${d.correct} » ≠ source « ${indicesCorrects(q)} »`);
    const nOptions = q.type === 'vrai-faux' ? 2 : (q.options?.length ?? 0);
    if (d.options !== nOptions) p.push(`Q${i + 1} : ${d.options} options affichées, ${nOptions} dans la source`);
  });
  return p;
}

/** Coche les bonnes réponses d'une question (indices lus dans data-correct). */
async function cocherBonnes(page: Page, racine: string, i: number): Promise<number[]> {
  const q = page.locator(`${racine} [data-question]`).nth(i);
  const bonnes = await bonnesReponses(q);
  if (bonnes.length === 0) throw new Error(`Q${i + 1} : aucune bonne réponse dans data-correct`);
  const inputs = q.locator('input[data-option-input]');
  for (const b of bonnes) await inputs.nth(b).check(COURT);
  return bonnes;
}

/** Quiz de leçon tout juste. Renvoie la liste des problèmes (vide = OK). */
async function reussirLecon(page: Page, lecon: { id: string; url: string }): Promise<string[]> {
  const p: string[] = [];
  const reponse = await page.goto(lecon.url);
  if (!reponse?.ok()) return [`HTTP ${reponse?.status()}`];
  p.push(...(await recouperAvecSource(page, '[data-testid="quiz"]', sourcesLecons.get(lecon.id))));
  const quiz = page.getByTestId('quiz');
  const questions = quiz.locator('[data-question]');
  const n = await questions.count();
  if (n === 0) return [...p, 'aucune question'];
  for (let i = 0; i < n; i++) {
    const q = questions.nth(i);
    await cocherBonnes(page, '[data-testid="quiz"]', i);
    await q.getByTestId('quiz-valider').click(COURT);
    if ((await q.getAttribute('data-etat')) !== 'correct') p.push(`Q${i + 1} : bonne réponse non reconnue (état ${await q.getAttribute('data-etat')})`);
    if (!(await q.locator('[data-explication]').isVisible())) p.push(`Q${i + 1} : explication non affichée`);
  }
  const score = quiz.getByTestId('quiz-score');
  try {
    await expect(score).toContainText(`${n} / ${n} (100 %)`, COURT);
    await expect(quiz).toHaveAttribute('data-etat', 'reussi', COURT);
    await expect(page.getByTestId('lecon-terminer')).toHaveAttribute('aria-pressed', 'true', COURT);
  } catch (e) {
    p.push(`score / terminée : ${(e as Error).message.split('\n')[0]}`);
  }
  const etat = await lireProgression(page);
  if (!etat?.lecons[lecon.id]) p.push('leçon absente de la progression enregistrée');
  if (etat?.quiz[lecon.id]?.meilleurScore !== n) p.push(`meilleur score enregistré ${etat?.quiz[lecon.id]?.meilleurScore} ≠ ${n}`);
  return p;
}

/** Examen tout juste. Renvoie la liste des problèmes (vide = OK). */
async function reussirExamen(page: Page, numero: string): Promise<string[]> {
  const p: string[] = [];
  const reponse = await page.goto(urlExamen(numero));
  if (!reponse?.ok()) return [`HTTP ${reponse?.status()}`];
  const racine = '[data-testid="examen"]';
  p.push(...(await recouperAvecSource(page, racine, sourcesExamens.get(`examen-${numero}`))));
  const examen = page.getByTestId('examen');
  const n = await examen.locator('[data-question]').count();
  for (let i = 0; i < n; i++) await cocherBonnes(page, racine, i);
  await examen.locator('[data-action="corriger"]').click(COURT);
  try {
    await expect(examen).toHaveAttribute('data-etat', 'reussi', COURT);
    await expect(examen.getByTestId('quiz-score')).toContainText(`${n} / ${n} (100 %)`, COURT);
    await expect(examen.locator('[data-question][data-etat="correct"]')).toHaveCount(n, COURT);
    await expect(examen.locator('[data-alerte]')).toBeHidden(COURT);
  } catch (e) {
    p.push(`correction : ${(e as Error).message.split('\n')[0]}`);
  }
  const r = (await lireProgression(page))?.examens[numero];
  if (!r?.reussi || r.pct !== 100) p.push(`résultat enregistré incorrect : ${JSON.stringify(r)}`);
  return p;
}

test.describe('recette : quiz de chaque leçon', () => {
  for (const m of catalogue().filter((x) => x.lecons.length > 0)) {
    test(`module ${m.numero} : toutes les leçons à 100 % et terminées`, async ({ page }) => {
      const problemes: string[] = [];
      for (const l of m.lecons) {
        try {
          for (const p of await reussirLecon(page, l)) problemes.push(`${l.url} : ${p}`);
        } catch (e) {
          problemes.push(`${l.url} : ${(e as Error).message.split('\n')[0]}`);
        }
      }
      aucunProbleme(problemes, `Leçons fautives du module ${m.numero}`);
    });
  }
});

test.describe('recette : chaque examen', () => {
  for (const m of modulesAvecExamen()) {
    test(`examen du module ${m.numero} : réussi à 100 %, badge « ${m.badge.nom} » débloqué`, async ({ page }) => {
      aucunProbleme(await reussirExamen(page, m.numero), `Examen ${m.numero}`);
      await page.goto('/progression/');
      const badge = page.getByTestId(`badge-module-${m.numero}`);
      await expect(badge).toHaveAttribute('data-obtenu', 'true');
      await expect(badge).toContainText(m.badge.nom);
      await expect(badge).toContainText('Obtenu');
      await expect(page.locator(`[data-resultat-examen="${m.numero}"]`)).toHaveAttribute('data-reussi', 'true');
      await expect(page.locator('[data-testid^="badge-module-"][data-obtenu="true"]')).toHaveCount(1);
    });
  }
});

test('parcours complet : toutes les leçons et tous les examens → 100 % et tous les badges', async ({ page }) => {
  test.setTimeout(15 * 60_000);
  const toutes = lecons();
  const examens = modulesAvecExamen();
  expect(toutes.length).toBeGreaterThan(0);
  expect(examens.length).toBe(catalogue().length);

  const problemes: string[] = [];
  for (const l of toutes) {
    try {
      for (const p of await reussirLecon(page, l)) problemes.push(`${l.url} : ${p}`);
    } catch (e) {
      problemes.push(`${l.url} : ${(e as Error).message.split('\n')[0]}`);
    }
  }
  for (const m of examens) {
    try {
      for (const p of await reussirExamen(page, m.numero)) problemes.push(`${urlExamen(m.numero)} : ${p}`);
    } catch (e) {
      problemes.push(`${urlExamen(m.numero)} : ${(e as Error).message.split('\n')[0]}`);
    }
  }
  aucunProbleme(problemes, 'Parcours complet');

  await page.goto('/progression/');
  const globale = page.locator('main').getByTestId('progress-global');
  await expect(globale).toHaveAttribute('aria-valuenow', '100');
  await expect(globale).toContainText(`${toutes.length} / ${toutes.length} leçons terminées`);
  for (const m of catalogue()) {
    await expect(page.locator('main').getByTestId(`progress-module-${m.numero}`)).toHaveAttribute('aria-valuenow', '100');
    await expect(page.locator(`[data-resultat-examen="${m.numero}"]`)).toHaveAttribute('data-reussi', 'true');
  }
  const badges = page.locator('[data-testid^="badge-"][data-obtenu]');
  const nbBadges = 5 + catalogue().length;
  await expect(badges).toHaveCount(nbBadges);
  await expect(page.locator('[data-testid^="badge-"][data-obtenu="false"]')).toHaveCount(0);
  for (const id of ['premier-pas', 'mi-parcours', 'perfectionniste', 'sans-faute', 'formation-complete']) {
    await expect(page.getByTestId(`badge-${id}`)).toHaveAttribute('data-obtenu', 'true');
  }
  await expect(page.getByTestId('badge-formation-complete')).toContainText('Formation complète');
  await expect(page.locator('[data-compteur-badges]')).toHaveText(`${nbBadges} / ${nbBadges}`);
  // Plus rien à reprendre : le lien « Continuer » est masqué.
  await expect(page.locator('main [data-reprendre]')).toBeHidden();

  // La progression survit au rechargement.
  await page.reload();
  await expect(page.getByTestId('badge-formation-complete')).toHaveAttribute('data-obtenu', 'true');
});
