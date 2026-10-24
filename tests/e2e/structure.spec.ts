/**
 * Structure imposée de chaque leçon et de chaque examen (voir AUTHORING.md §6).
 * Les échecs listent TOUTES les pages fautives.
 */
import { expect, test } from '@playwright/test';
import { aucunProbleme, allegerPage, catalogue, lecons, modulesAvecExamen, urlExamen } from './outils';

test('chaque leçon a h1, Astuce, Erreur, résumé, sources externes et quiz', async ({ page }) => {
  test.setTimeout(30_000 + lecons().length * 3_000);
  await allegerPage(page);
  const problemes: string[] = [];
  const conseils: string[] = [];

  for (const lecon of lecons()) {
    const reponse = await page.goto(lecon.url, { waitUntil: 'domcontentloaded' });
    if (reponse?.status() !== 200) {
      problemes.push(`${lecon.url} : HTTP ${reponse?.status()}`);
      continue;
    }
    const r = await page.evaluate(() => {
      const article = document.querySelector('[data-testid="lecon"]');
      const q = (sel: string) => Array.from(article?.querySelectorAll(sel) ?? []);
      const h1 = Array.from(document.querySelectorAll('h1'));
      const sources = q('[data-testid="sources"]');
      const resume = q('[data-testid="resume"]');
      const quiz = document.querySelector('[data-testid="quiz"]');
      const questions = Array.from(quiz?.querySelectorAll('[data-question]') ?? []);
      const blocsContenu = Array.from(article?.querySelector('.prose')?.children ?? []);
      return {
        article: Boolean(article),
        h1: h1.map((h) => h.textContent?.trim() ?? ''),
        astuces: q('[data-testid="encadre-astuce"]').length,
        erreurs: q('[data-testid="encadre-erreur"]').length,
        resumes: resume.length,
        pucesResume: resume[0]?.querySelectorAll('li').length ?? 0,
        sources: sources.length,
        liensExternes: sources.flatMap((s) => Array.from(s.querySelectorAll<HTMLAnchorElement>('a[href]'))).filter((a) =>
          /^https?:\/\//.test(a.getAttribute('href') ?? ''),
        ).length,
        sourcesEnDernier: sources.length > 0 && blocsContenu.at(-1) === sources[0],
        objectifs: document.querySelectorAll('[data-testid="objectifs"] li').length,
        quiz: Boolean(quiz),
        questions: questions.map((f) => ({
          type: f.getAttribute('data-type'),
          correct: f.getAttribute('data-correct') ?? '',
          options: f.querySelectorAll('input[data-option-input]').length,
          explication: f.querySelector('[data-explication]')?.textContent?.replace('Explication :', '').trim() ?? '',
        })),
        h2Contenu: Array.from(article?.querySelectorAll('.prose h2') ?? []).length,
      };
    });

    const p: string[] = [];
    if (!r.article) p.push('article [data-testid=lecon] absent');
    if (r.h1.length !== 1 || !r.h1[0]) p.push(`${r.h1.length} titre(s) h1 (attendu : exactement 1, non vide)`);
    if (r.astuces < 1) p.push('aucun encadré « Astuce pro » (<Astuce>)');
    if (r.erreurs < 1) p.push('aucun encadré « Erreur à éviter » (<Erreur>)');
    if (r.resumes !== 1) p.push(`${r.resumes} résumé(s) <Resume> (attendu : 1)`);
    else if (r.pucesResume < 1) p.push('résumé sans liste à puces');
    if (r.sources < 1) p.push('pas de section <Sources>');
    else if (r.liensExternes < 1) p.push('section Sources sans lien externe');
    if (r.objectifs < 2) p.push(`${r.objectifs} objectif(s) affiché(s)`);
    if (!r.quiz) p.push('pas de quiz');
    else if (r.questions.length < 3) p.push(`quiz de ${r.questions.length} question(s) (minimum 3)`);
    r.questions.forEach((q, i) => {
      if (!q.correct) p.push(`quiz Q${i + 1} : aucune bonne réponse`);
      if (q.options < 2) p.push(`quiz Q${i + 1} : ${q.options} option(s)`);
      if (!q.explication) p.push(`quiz Q${i + 1} : explication vide`);
    });
    if (p.length) problemes.push(`${lecon.url} → ${p.join(' ; ')}`);

    // Recommandations d'AUTHORING.md : signalées, sans faire échouer le test.
    const c: string[] = [];
    if (r.liensExternes < 2) c.push(`${r.liensExternes} lien(s) dans Sources (2 recommandés)`);
    if (r.resumes === 1 && (r.pucesResume < 3 || r.pucesResume > 6)) c.push(`résumé de ${r.pucesResume} puces (3 à 6)`);
    if (r.sources > 0 && !r.sourcesEnDernier) c.push('Sources pas en dernier');
    if (r.questions.length && (r.questions.length < 4 || r.questions.length > 6)) c.push(`quiz de ${r.questions.length} questions (4 à 6 visées)`);
    if (r.h2Contenu < 1) c.push('aucune section ## dans le contenu');
    if (c.length) conseils.push(`${lecon.url} → ${c.join(' ; ')}`);
  }

  if (conseils.length) test.info().annotations.push({ type: 'recommandations AUTHORING non suivies', description: conseils.join('\n') });
  aucunProbleme(problemes, 'Leçons non conformes');
});

test('chaque examen publié a un h1 et au moins 5 questions valides ; les autres affichent « en préparation »', async ({ page }) => {
  await allegerPage(page);
  const problemes: string[] = [];
  for (const m of catalogue()) {
    await page.goto(urlExamen(m.numero), { waitUntil: 'domcontentloaded' });
    const h1 = await page.locator('h1').count();
    if (h1 !== 1) problemes.push(`${urlExamen(m.numero)} : ${h1} h1`);
    if (m.aExamen) {
      const questions = page.locator('[data-testid="examen"] [data-question]');
      const n = await questions.count();
      if (n < 5) problemes.push(`${urlExamen(m.numero)} : ${n} question(s) (minimum 5)`);
      for (let i = 0; i < n; i++) {
        if (!(await questions.nth(i).getAttribute('data-correct'))) problemes.push(`${urlExamen(m.numero)} : Q${i + 1} sans bonne réponse`);
      }
      if ((await page.locator('[data-testid="examen"] [data-action="corriger"]').count()) !== 1)
        problemes.push(`${urlExamen(m.numero)} : bouton « Corriger » absent`);
    } else if ((await page.getByTestId('examen-vide').count()) !== 1) {
      problemes.push(`${urlExamen(m.numero)} : ni examen ni message « en préparation »`);
    }
  }
  aucunProbleme(problemes, 'Examens non conformes');
});

test('les pages module listent leurs leçons dans l’ordre du catalogue', async ({ page }) => {
  await allegerPage(page);
  const problemes: string[] = [];
  for (const m of catalogue()) {
    await page.goto(`/modules/${m.numero}/`, { waitUntil: 'domcontentloaded' });
    const liens = await page.locator('[data-testid="module-lecons"] a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    const attendus = m.lecons.map((l) => l.url);
    if (JSON.stringify(liens) !== JSON.stringify(attendus)) problemes.push(`/modules/${m.numero}/ : ${JSON.stringify(liens)} ≠ ${JSON.stringify(attendus)}`);
    if (m.lecons.length === 0) await expect(page.getByTestId('module-vide')).toBeVisible();
  }
  aucunProbleme(problemes, 'Pages module incohérentes');
});
