/**
 * Régressions visuelles corrigées pendant la recette finale (QA phase 2), vérifiées par styles calculés :
 *  - l'option cochée garde la couleur de correction (vert / rouge) au lieu du style « cochée » (indigo) ;
 *  - l'indentation par tabulations reste visible dans les extraits numérotés « trouve-le-bug » ;
 *  - l'énoncé d'une question ne touche pas la première option ;
 *  - dans un tableau, un identifiant `code` n'est pas coupé au milieu d'un mot.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test, type Page } from '@playwright/test';
import { DIST, bonnesReponses, lecons, pagesHtml } from './outils';

const lire = (url: string) => readFileSync(join(DIST, url.endsWith('.html') ? url : join(url, 'index.html')), 'utf8');

async function couleurs(page: Page, selecteur: string) {
  return page.locator(selecteur).first().evaluate((el) => {
    const s = getComputedStyle(el);
    return { fond: s.backgroundColor, bord: s.borderTopColor };
  });
}

for (const theme of ['light', 'dark'] as const) {
  test(`option cochée puis corrigée : couleurs de correction (${theme})`, async ({ page }) => {
    // Sans animation : les transitions de bordure fausseraient la lecture des couleurs.
    await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
    const lecon = lecons()[0];
    await page.goto(lecon.url);
    const questions = page.locator('[data-testid="quiz"] [data-question]');
    // Q1 juste, Q2 fausse.
    const q1 = questions.nth(0);
    for (const b of await bonnesReponses(q1)) await q1.locator('input[data-option-input]').nth(b).check();
    const cochee = await couleurs(page, '[data-testid="quiz"] [data-question] [data-option]:has(input:checked)');
    await q1.getByTestId('quiz-valider').click();
    const q2 = questions.nth(1);
    const bonnes2 = await bonnesReponses(q2);
    const n2 = await q2.locator('input[data-option-input]').count();
    await q2.locator('input[data-option-input]').nth([...Array(n2).keys()].find((i) => !bonnes2.includes(i))!).check();
    await q2.getByTestId('quiz-valider').click();

    const bonneCochee = await couleurs(page, '[data-option][data-etat="bonne"]:has(input:checked)');
    const fausseCochee = await couleurs(page, '[data-option][data-etat="fausse"]');
    const bonneNonCochee = await couleurs(page, '[data-option][data-etat="bonne"]:not(:has(input:checked))');
    expect(bonneCochee.bord, 'bonne réponse cochée : bordure verte, pas indigo').not.toBe(cochee.bord);
    expect(bonneCochee.fond).not.toBe(cochee.fond);
    expect(fausseCochee.bord, 'mauvaise réponse cochée : bordure rouge, pas indigo').not.toBe(cochee.bord);
    expect(fausseCochee.bord).not.toBe(bonneCochee.bord);
    // Bonne réponse cochée ou non : même vert.
    expect(bonneCochee.bord).toBe(bonneNonCochee.bord);
  });
}

test('extraits numérotés « trouve-le-bug » : l’indentation par tabulation reste visible', async ({ page }) => {
  // Première page avec un extrait dont une ligne commence par une tabulation.
  const url = lecons().map((l) => l.url).find((u) => /data-testid="quiz-code"[\s\S]*?<span class="line"><span[^>]*>\t/.test(lire(u)));
  test.skip(!url, 'Aucun extrait indenté');
  await page.goto(url!);
  const decalages = await page.locator('[data-testid="quiz-code"]').first().evaluate((bloc) => {
    const lignes = Array.from(bloc.querySelectorAll<HTMLElement>('.line'));
    const debutTexte = (ligne: HTMLElement) => {
      const marcheur = document.createTreeWalker(ligne, NodeFilter.SHOW_TEXT);
      for (let n = marcheur.nextNode(); n; n = marcheur.nextNode()) {
        const texte = n.textContent ?? '';
        const i = texte.search(/\S/);
        if (i >= 0) {
          const r = document.createRange();
          r.setStart(n, i);
          r.setEnd(n, i + 1);
          return r.getBoundingClientRect().left;
        }
      }
      return undefined;
    };
    const car = parseFloat(getComputedStyle(bloc.querySelector('code')!).fontSize) * 0.6;
    const reference = debutTexte(lignes.find((l) => /^\S/.test(l.textContent ?? ''))!)!;
    const indentee = lignes.find((l) => /^\t\S/.test(l.textContent ?? ''));
    const gaucheCode = bloc.querySelector('code')!.getBoundingClientRect().left;
    return { indentation: indentee ? (debutTexte(indentee)! - reference) / car : NaN, margeNumeros: (reference - gaucheCode) / car };
  });
  // Une tabulation = 4 caractères (tab-size: 4) ; on tolère 3 à 5.
  expect(decalages.indentation).toBeGreaterThanOrEqual(3);
  expect(decalages.indentation).toBeLessThanOrEqual(5);
  // Le code commence après la colonne des numéros (2 caractères + marge) : pas de chevauchement.
  expect(decalages.margeNumeros).toBeGreaterThanOrEqual(3);
});

test('énoncé de question séparé des options (pas d’énoncé collé)', async ({ page }) => {
  await page.goto(lecons()[0].url);
  const ecarts = await page.locator('[data-testid="quiz"] [data-question]').evaluateAll((qs) =>
    qs.map((q) => {
      const texte = q.querySelector('.question-texte')!.getBoundingClientRect();
      const suivant = q.querySelector('.code-lignes, .question-aide, .options')!.getBoundingClientRect();
      return suivant.top - texte.bottom;
    }),
  );
  for (const e of ecarts) expect(e).toBeGreaterThanOrEqual(8);
});

test('tableaux : les identifiants `code` ne sont pas coupés au milieu (desktop)', async ({ page }) => {
  const urls = pagesHtml().filter((u) => /<td[^>]*>[^<]*<code>[A-Za-z]{18,}<\/code>/.test(lire(u)));
  test.skip(urls.length === 0, 'Aucun tableau avec identifiant long');
  const coupes: string[] = [];
  for (const url of urls) {
    await page.goto(url);
    const fautifs = await page.locator('.tableau-defilement td code').evaluateAll((els) =>
      els.filter((el) => /^[A-Za-z]{18,}$/.test(el.textContent ?? '') && el.getClientRects().length > 1).map((el) => el.textContent),
    );
    for (const f of fautifs) coupes.push(`${url} : ${f}`);
  }
  expect(coupes, coupes.join('\n')).toEqual([]);
});
