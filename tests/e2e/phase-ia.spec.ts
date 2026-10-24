/**
 * Phase IA : module 02 « Scripter avec l'IA », composants <Prompt> (bouton Copier) et <AvecClaudeCode>,
 * questions « ameliore-le-prompt », migration de la progression v1 → v2 (renumérotation 02-10 → 03-11),
 * navigation renumérotée, affichage mobile et accessibilité des nouveaux éléments.
 * Tout est déduit du site construit (dist/) et des sources (src/content) : les échecs listent toutes les pages fautives.
 */
import AxeBuilder from '@axe-core/playwright';
import { expect, test, type BrowserContext, type Page } from '@playwright/test';
import { questionsDesExamens, quizDesLecons } from '../contenu-quiz';
import {
  CLE_PROGRESSION,
  CLE_THEME,
  aucunProbleme,
  allegerPage,
  catalogue,
  debordements,
  lecons,
  pagesContenant,
  repondre,
  urlExamen,
} from './outils';

const BIBLIOTHEQUE = '/modules/02/bibliotheque-de-prompts/';
const PROMPT = '[data-testid="prompt"]';
const pagesAvecPrompt = () => pagesContenant(/data-testid="prompt"/);
const module02 = () => catalogue().find((m) => m.numero === '02');

/** Texte que le bouton doit copier : contenu du premier <pre> du bloc, sans les retours à la ligne finaux. */
const texteAttendu = (bloc: ReturnType<Page['locator']>) => bloc.locator('pre').first().evaluate((pre) => (pre.textContent ?? '').replace(/\n+$/, ''));

/** Texte lu dans le presse-papiers, fins de ligne normalisées (Windows renvoie des CRLF). */
const lirePressePapiers = (texte: string) => texte.replace(/\r\n?/g, '\n');
/** Espace insécable, espace de largeur nulle, BOM : invisibles mais gênants dans un prompt collé. */
const INVISIBLES = new RegExp(`[${String.fromCharCode(0xa0, 0x200b, 0xfeff)}]`);

async function autoriserPressePapiers(context: BrowserContext): Promise<void> {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
}

/** Erreurs console et exceptions de la page (pour vérifier qu'une action n'en produit aucune). */
function erreursDe(page: Page): string[] {
  const erreurs: string[] = [];
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') erreurs.push(`console.${m.type()} : ${m.text()}`);
  });
  page.on('pageerror', (e) => erreurs.push(`exception : ${e.message}`));
  return erreurs;
}

/* ------------------------------------------------------------------ */
/* Composant <Prompt>                                                  */
/* ------------------------------------------------------------------ */

test.describe('composant <Prompt>', () => {
  test('le site contient des prompts, dont ≥ 20 dans la bibliothèque', async ({ page }) => {
    expect(pagesAvecPrompt().length).toBeGreaterThan(1);
    const reponse = await page.goto(BIBLIOTHEQUE);
    expect(reponse?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveText(/Bibliothèque de prompts/);
    expect(await page.locator(`[data-testid="lecon"] ${PROMPT}`).count()).toBeGreaterThanOrEqual(20);
  });

  test('chaque bloc prompt du site : un <pre> non vide et un bouton « Copier » étiqueté, statut aria-live', async ({ page }) => {
    test.setTimeout(30_000 + pagesAvecPrompt().length * 2_000);
    await allegerPage(page);
    const problemes: string[] = [];
    let total = 0;
    for (const url of pagesAvecPrompt()) {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      const blocs = await page.locator(PROMPT).evaluateAll((els) =>
        els.map((el, i) => {
          const pre = el.querySelector('pre');
          const boutons = el.querySelectorAll('button[data-testid="prompt-copier"]');
          const bouton = boutons[0] as HTMLButtonElement | undefined;
          const statut = el.querySelector('[data-prompt-statut]');
          return {
            i: i + 1,
            titre: el.querySelector('.prompt-titre')?.textContent?.trim() ?? '',
            pre: (pre?.textContent ?? '').trim().length,
            boutons: boutons.length,
            libelle: bouton?.querySelector('[data-libelle]')?.textContent?.trim() ?? '',
            // Nom accessible = texte du bouton (libellé visible + titre en sr-only) ; un aria-label le masquerait.
            nom: (bouton?.textContent ?? '').replace(/\s+/g, ' ').trim(),
            aria: bouton?.getAttribute('aria-label'),
            type: bouton?.getAttribute('type') ?? '',
            statut: statut ? `${statut.getAttribute('role')}/${statut.getAttribute('aria-live')}` : '',
          };
        }),
      );
      total += blocs.length;
      for (const b of blocs) {
        const p: string[] = [];
        if (b.pre === 0) p.push('<pre> absent ou vide');
        if (b.boutons !== 1) p.push(`${b.boutons} bouton(s) Copier`);
        else {
          if (b.libelle !== 'Copier') p.push(`libellé « ${b.libelle} »`);
          if (b.aria !== null) p.push(`aria-label « ${b.aria} » (le nom accessible doit contenir le libellé visible, qui change)`);
          if (!b.nom.startsWith('Copier le prompt') || b.nom.length <= 'Copier le prompt'.length + 3) p.push(`nom accessible « ${b.nom} »`);
          if (b.type !== 'button') p.push('bouton sans type="button"');
        }
        if (b.statut !== 'status/polite') p.push(`statut « ${b.statut} » (attendu role=status, aria-live=polite)`);
        if (p.length) problemes.push(`${url} prompt ${b.i} « ${b.titre} » : ${p.join(' ; ')}`);
      }
    }
    expect(total).toBeGreaterThan(0);
    aucunProbleme(problemes, 'Blocs prompt incomplets');
  });

  test('cliquer « Copier » copie exactement le texte du <pre> (tous les prompts du site), « Copié ! » puis retour à « Copier »', async ({ page, context }) => {
    test.setTimeout(60_000 + pagesAvecPrompt().length * 6_000);
    await autoriserPressePapiers(context);
    await allegerPage(page);
    const erreurs = erreursDe(page);
    const problemes: string[] = [];
    for (const url of pagesAvecPrompt()) {
      await page.goto(url);
      const blocs = page.locator(PROMPT);
      const n = await blocs.count();
      for (let i = 0; i < n; i++) {
        const bloc = blocs.nth(i);
        const bouton = bloc.getByTestId('prompt-copier');
        const attendu = await texteAttendu(bloc);
        await page.evaluate(() => navigator.clipboard.writeText('__vide__'));
        await bouton.click();
        try {
          await expect(bouton.locator('[data-libelle]')).toHaveText('Copié !', { timeout: 3_000 });
          await expect(bouton).toHaveAttribute('data-etat', 'copie');
          await expect(bloc.locator('[data-prompt-statut]')).toHaveText('Prompt copié dans le presse-papiers.');
        } catch (e) {
          problemes.push(`${url} prompt ${i + 1} : ${(e as Error).message.split('\n')[0]}`);
          continue;
        }
        // Le presse-papiers de Windows convertit les fins de ligne en CRLF : on les ramène à LF avant de comparer.
        const copie = lirePressePapiers(await page.evaluate(() => navigator.clipboard.readText()));
        if (copie !== attendu) {
          const k = [...copie].findIndex((c, j) => c !== attendu[j]);
          problemes.push(`${url} prompt ${i + 1} : texte copié différent du <pre> (${copie.length} / ${attendu.length} caractères, 1re différence au caractère ${k} : « ${copie.slice(Math.max(0, k - 15), k + 15)} »)`);
        }
        if (INVISIBLES.test(copie)) problemes.push(`${url} prompt ${i + 1} : caractère invisible (espace insécable ou largeur nulle) dans le texte copié`);
        if (!copie.trim()) problemes.push(`${url} prompt ${i + 1} : texte copié vide`);
      }
    }
    aucunProbleme(problemes, 'Copie des prompts');
    aucunProbleme(erreurs, 'Erreurs console pendant la copie');
  });

  test('le libellé revient à « Copier » après ~2 s ; deux clics de suite relancent le délai ; le statut reste annoncé', async ({ page, context }) => {
    await autoriserPressePapiers(context);
    await page.goto(BIBLIOTHEQUE);
    const bouton = page.locator(PROMPT).first().getByTestId('prompt-copier');
    await bouton.click();
    await expect(bouton.locator('[data-libelle]')).toHaveText('Copié !');
    await page.waitForTimeout(1_200);
    await bouton.click();
    await page.waitForTimeout(1_200);
    // 2,4 s après le 1er clic mais 1,2 s après le 2e : toujours « Copié ! ».
    await expect(bouton.locator('[data-libelle]')).toHaveText('Copié !', { timeout: 100 });
    await expect(bouton.locator('[data-libelle]')).toHaveText('Copier', { timeout: 3_000 });
    await expect(bouton).not.toHaveAttribute('data-etat', /.+/);
    // Le nom accessible contient toujours le libellé visible (WCAG 2.5.3) et le titre du prompt.
    await expect(bouton).toHaveAccessibleName(/^Copier le prompt « .+ »$/);
    await bouton.click();
    await expect(bouton).toHaveAccessibleName(/^Copié ! le prompt « .+ »$/);
    // Après le retour à « Copier », le statut est vidé pour qu'une nouvelle copie soit de nouveau annoncée.
    await expect(bouton.locator('[data-libelle]')).toHaveText('Copier', { timeout: 3_000 });
    await expect(page.locator(PROMPT).first().locator('[data-prompt-statut]')).toBeEmpty();
  });

  test('navigation clavier : Tab atteint le bouton (focus visible), Entrée et Espace copient', async ({ page, context }) => {
    await autoriserPressePapiers(context);
    await page.goto(BIBLIOTHEQUE);
    const bloc = page.locator(PROMPT).first();
    const bouton = bloc.getByTestId('prompt-copier');
    // Part de l'élément focalisable qui précède le premier prompt, puis Tab.
    await bloc.evaluate((el) => {
      const ancre = document.createElement('a');
      ancre.href = '#';
      ancre.textContent = 'ancre de test';
      ancre.id = 'ancre-test-clavier';
      el.before(ancre);
    });
    await page.locator('#ancre-test-clavier').focus();
    let atteint = false;
    for (let k = 0; k < 5 && !atteint; k++) {
      await page.keyboard.press('Tab');
      atteint = await bouton.evaluate((b) => b === document.activeElement);
    }
    expect(atteint, 'le bouton Copier n’est pas atteint au clavier juste après le contenu qui précède le prompt').toBe(true);
    const contour = await bouton.evaluate((b) => {
      const s = getComputedStyle(b);
      return { style: s.outlineStyle, largeur: parseFloat(s.outlineWidth), focusVisible: b.matches(':focus-visible') };
    });
    expect(contour.focusVisible).toBe(true);
    expect(contour.style).not.toBe('none');
    expect(contour.largeur).toBeGreaterThanOrEqual(2);

    const attendu = await texteAttendu(bloc);
    await page.evaluate(() => navigator.clipboard.writeText('__vide__'));
    await page.keyboard.press('Enter');
    await expect(bouton.locator('[data-libelle]')).toHaveText('Copié !');
    expect(lirePressePapiers(await page.evaluate(() => navigator.clipboard.readText()))).toBe(attendu);
    await expect(bouton).toBeFocused();

    await expect(bouton.locator('[data-libelle]')).toHaveText('Copier', { timeout: 3_000 });
    await page.evaluate(() => navigator.clipboard.writeText('__vide__'));
    await page.keyboard.press('Space');
    await expect(bouton.locator('[data-libelle]')).toHaveText('Copié !');
    expect(lirePressePapiers(await page.evaluate(() => navigator.clipboard.readText()))).toBe(attendu);
  });

  test('repli sans navigator.clipboard : la copie passe par la zone de texte temporaire, sans erreur console', async ({ page, context }) => {
    await autoriserPressePapiers(context);
    await page.addInitScript(() => {
      Object.defineProperty(Navigator.prototype, 'clipboard', { get: () => undefined, configurable: true });
    });
    const erreurs = erreursDe(page);
    await page.goto(BIBLIOTHEQUE);
    expect(await page.evaluate(() => navigator.clipboard === undefined)).toBe(true);
    const bloc = page.locator(PROMPT).first();
    const bouton = bloc.getByTestId('prompt-copier');
    const attendu = await texteAttendu(bloc);
    await bouton.click();
    // execCommand('copy') réussit dans Chromium après un vrai clic ; « Échec » reste un résultat acceptable s'il est annoncé.
    await expect(bouton.locator('[data-libelle]')).toHaveText(/^(Copié !|Échec)$/);
    const etat = await bouton.getAttribute('data-etat');
    const statut = bloc.locator('[data-prompt-statut]');
    if (etat === 'copie') {
      await expect(statut).toHaveText('Prompt copié dans le presse-papiers.');
      // Vérifie le contenu réel du presse-papiers depuis une autre page (qui a, elle, navigator.clipboard).
      const autre = await context.newPage();
      await autre.goto('/404.html');
      await autre.evaluate(() => Object.getOwnPropertyDescriptor(Navigator.prototype, 'clipboard'));
      const copie = await autre.evaluate(() => (navigator.clipboard ? navigator.clipboard.readText() : null));
      if (copie !== null) expect(lirePressePapiers(copie)).toBe(attendu);
      await autre.close();
    } else {
      await expect(statut).toContainText('La copie a échoué');
    }
    // La zone de texte temporaire est retirée et le focus n'est pas perdu dans la page.
    await expect(page.locator('body > textarea')).toHaveCount(0);
    await expect(bouton.locator('[data-libelle]')).toHaveText('Copier', { timeout: 3_000 });
    aucunProbleme(erreurs, 'Erreurs console (repli sans Clipboard API)');
  });

  test('repli quand writeText est refusé (permission refusée) : pas d’exception, état annoncé', async ({ page }) => {
    await page.addInitScript(() => {
      if (navigator.clipboard) navigator.clipboard.writeText = () => Promise.reject(new DOMException('refusé', 'NotAllowedError'));
    });
    const erreurs = erreursDe(page);
    await page.goto(BIBLIOTHEQUE);
    const bloc = page.locator(PROMPT).first();
    await bloc.getByTestId('prompt-copier').click();
    await expect(bloc.locator('[data-libelle]')).toHaveText(/^(Copié !|Échec)$/);
    await expect(bloc.locator('[data-prompt-statut]')).not.toBeEmpty();
    aucunProbleme(erreurs, 'Erreurs console (writeText refusé)');
  });
});

/* ------------------------------------------------------------------ */
/* Bibliothèque et en-tête                                             */
/* ------------------------------------------------------------------ */

test('le lien « Prompts » de l’en-tête mène à la bibliothèque (et y est marqué page courante)', async ({ page }) => {
  await page.goto('/');
  const lien = page.getByRole('navigation', { name: 'Navigation principale' }).getByRole('link', { name: 'Prompts', exact: true });
  await expect(lien).toBeVisible();
  await expect(lien).toHaveAttribute('href', BIBLIOTHEQUE);
  await lien.click();
  await expect(page).toHaveURL(new RegExp(`${BIBLIOTHEQUE}$`));
  await expect(page.locator('h1')).toHaveText(/Bibliothèque de prompts/);
  await expect(
    page.getByRole('navigation', { name: 'Navigation principale' }).getByRole('link', { name: 'Prompts', exact: true }),
  ).toHaveAttribute('aria-current', 'page');
  // La bibliothèque est une leçon du module 02 du catalogue (sommaire, progression).
  expect(module02()?.lecons.some((l) => l.url === BIBLIOTHEQUE)).toBe(true);
});

/* ------------------------------------------------------------------ */
/* Questions « ameliore-le-prompt »                                    */
/* ------------------------------------------------------------------ */

test.describe('questions « ameliore-le-prompt »', () => {
  const sources = [...quizDesLecons(), ...questionsDesExamens()];
  const nbQuestions = sources.reduce((n, s) => n + s.questions.filter((q) => q.type === 'ameliore-le-prompt').length, 0);
  const pages = () => pagesContenant(/data-type="ameliore-le-prompt"/);

  test('chaque question affiche le prompt de départ (identique à la source), une consigne et des options radio', async ({ page }) => {
    expect(nbQuestions, 'aucune question ameliore-le-prompt dans le contenu').toBeGreaterThan(0);
    test.setTimeout(30_000 + pages().length * 2_000);
    await allegerPage(page);
    const parUrl = new Map<string, string[]>();
    for (const l of lecons()) {
      const s = sources.find((x) => x.id === l.id);
      if (s) parUrl.set(l.url, s.questions.map((q) => (q.type === 'ameliore-le-prompt' ? (q.prompt ?? '') : '')));
    }
    for (const m of catalogue()) {
      const s = sources.find((x) => x.id === `examen-${m.numero}`);
      if (s) parUrl.set(urlExamen(m.numero), s.questions.map((q) => (q.type === 'ameliore-le-prompt' ? (q.prompt ?? '') : '')));
    }
    const problemes: string[] = [];
    let vues = 0;
    for (const url of pages()) {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      const questions = await page.locator('[data-question]').evaluateAll((els) =>
        els.map((q) => ({
          type: q.getAttribute('data-type'),
          prompt: q.querySelector('[data-testid="quiz-prompt"] pre')?.textContent ?? null,
          legende: q.querySelector('[data-testid="quiz-prompt"] figcaption')?.textContent?.trim() ?? '',
          aide: q.querySelector('.question-aide')?.textContent?.trim() ?? '',
          radios: q.querySelectorAll('input[data-option-input][type="radio"]').length,
          options: q.querySelectorAll('input[data-option-input]').length,
          textes: Array.from(q.querySelectorAll('.option-texte')).map((o) => (o.textContent ?? '').trim().length),
          libelleType: q.querySelector('.question-type')?.textContent?.trim() ?? '',
        })),
      );
      const attendus = parUrl.get(url) ?? [];
      questions.forEach((q, i) => {
        if (q.type !== 'ameliore-le-prompt') return;
        vues++;
        const p: string[] = [];
        if (q.prompt === null) p.push('bloc quiz-prompt absent');
        else if (!q.prompt.trim()) p.push('prompt de départ vide');
        else if (attendus[i] !== undefined && q.prompt.trim() !== attendus[i].trim()) p.push(`prompt affiché ≠ source (« ${q.prompt.slice(0, 40)} »)`);
        if (!q.legende) p.push('légende absente');
        if (!/meilleure version/.test(q.aide)) p.push(`consigne « ${q.aide} »`);
        if (q.libelleType !== 'Améliore ce prompt') p.push(`libellé de type « ${q.libelleType} »`);
        if (q.options < 2 || q.options > 5) p.push(`${q.options} options`);
        if (q.radios !== q.options) p.push('options non radio (une seule bonne réponse attendue)');
        if (q.textes.some((n) => n === 0)) p.push('option vide');
        if (p.length) problemes.push(`${url} Q${i + 1} : ${p.join(' ; ')}`);
      });
    }
    aucunProbleme(problemes, 'Questions ameliore-le-prompt mal affichées');
    expect(vues).toBe(nbQuestions);
  });

  test('leçon : bonne réponse → « correct » + explication ; mauvaise → « incorrect » + explication ; score final', async ({ page }) => {
    const url = pages().find((u) => lecons().some((l) => l.url === u));
    test.skip(!url, 'Aucune leçon avec une question ameliore-le-prompt');
    await page.goto(url!);
    const quiz = page.getByTestId('quiz');
    const questions = quiz.locator('[data-question]');
    const n = await questions.count();
    const indices = await questions.evaluateAll((els) => els.flatMap((e, i) => (e.getAttribute('data-type') === 'ameliore-le-prompt' ? [i] : [])));
    expect(indices.length).toBeGreaterThan(0);
    // 1re question ameliore-le-prompt : fausse puis (après « Recommencer ») juste.
    const premiere = indices[0];
    let juste = 0;
    for (let i = 0; i < n; i++) {
      const q = questions.nth(i);
      const bien = i !== premiere;
      await repondre(q, bien);
      await q.getByTestId('quiz-valider').click();
      await expect(q).toHaveAttribute('data-etat', bien ? 'correct' : 'incorrect');
      await expect(q.locator('[data-explication]')).toBeVisible();
      if (bien) juste++;
    }
    await expect(quiz.getByTestId('quiz-score')).toContainText(`${juste} / ${n}`);
    await quiz.getByTestId('quiz-recommencer').click();
    for (let i = 0; i < n; i++) {
      const q = questions.nth(i);
      await repondre(q, true);
      await q.getByTestId('quiz-valider').click();
      await expect(q).toHaveAttribute('data-etat', 'correct');
    }
    await expect(quiz.getByTestId('quiz-score')).toContainText(`${n} / ${n} (100 %)`);
    // L'explication de la question ameliore-le-prompt est visible et non vide.
    await expect(questions.nth(premiere).locator('[data-explication]')).toBeVisible();
    await expect(questions.nth(premiere).locator('[data-explication]')).not.toHaveText(/^\s*(Explication :)?\s*$/);
  });
});

/* ------------------------------------------------------------------ */
/* Encadrés « Avec Claude Code » et structure du module 02             */
/* ------------------------------------------------------------------ */

test('modules 01 et 03 à 11 : chaque leçon qui contient du code Luau a au moins un encadré « Avec Claude Code »', async ({ page }) => {
  const cibles = lecons().filter((l) => l.module === '01' || Number(l.module) >= 3);
  test.setTimeout(30_000 + cibles.length * 2_000);
  await allegerPage(page);
  const fautives: string[] = [];
  let avecCode = 0;
  for (const l of cibles) {
    await page.goto(l.url, { waitUntil: 'domcontentloaded' });
    const r = await page.evaluate(() => {
      const prose = document.querySelector('[data-testid="lecon"] .prose');
      // Blocs de code Luau du contenu (hors quiz, hors prompts en texte brut).
      const luau = Array.from(prose?.querySelectorAll('pre[data-language="luau"], pre[data-language="lua"]') ?? []).filter(
        (pre) => !pre.closest('[data-testid="prompt"]'),
      ).length;
      return { luau, ia: prose?.querySelectorAll('[data-testid="encadre-ia"]').length ?? 0 };
    });
    if (r.luau > 0) avecCode++;
    if (r.luau > 0 && r.ia === 0) fautives.push(`${l.url} (${l.id}) : ${r.luau} bloc(s) Luau, aucun encadré <AvecClaudeCode>`);
  }
  test.info().annotations.push({ type: 'leçons avec du code Luau', description: `${avecCode} / ${cibles.length} leçons des modules 01 et 03-11` });
  expect(avecCode, 'aucun bloc Luau détecté : le sélecteur pre[data-language] ne correspond plus au HTML construit').toBeGreaterThan(0);
  aucunProbleme(fautives, 'Leçons avec du code Luau sans encadré « Avec Claude Code »');
});

test('les encadrés « Avec Claude Code » ont un titre, un contenu et un nom accessible', async ({ page }) => {
  const urls = pagesContenant(/data-testid="encadre-ia"/);
  expect(urls.length).toBeGreaterThan(0);
  test.setTimeout(30_000 + urls.length * 1_500);
  await allegerPage(page);
  const problemes: string[] = [];
  for (const url of urls) {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const encadres = await page.locator('[data-testid="encadre-ia"]').evaluateAll((els) =>
      els.map((e) => ({
        balise: e.tagName.toLowerCase(),
        nom: e.getAttribute('aria-label') ?? '',
        titre: e.querySelector('.encadre-titre')?.textContent?.trim() ?? '',
        contenu: (e.querySelector('.encadre-contenu')?.textContent ?? '').trim().length,
      })),
    );
    encadres.forEach((e, i) => {
      const p: string[] = [];
      if (e.balise !== 'aside') p.push(`balise ${e.balise}`);
      if (!e.nom) p.push('aria-label vide');
      if (!/🤖/.test(e.titre) || e.titre.length < 4) p.push(`titre « ${e.titre} »`);
      if (e.contenu < 20) p.push('contenu vide ou trop court');
      if (p.length) problemes.push(`${url} encadré ${i + 1} : ${p.join(' ; ')}`);
    });
  }
  aucunProbleme(problemes, 'Encadrés « Avec Claude Code » incomplets');
});

test('module 02 : 10 leçons publiées, examen publié, page module et sommaire « Module 02 »', async ({ page }) => {
  const m = module02();
  expect(m, 'module 02 absent du catalogue').toBeTruthy();
  expect(m!.lecons).toHaveLength(10);
  expect(m!.aExamen).toBe(true);
  expect(catalogue().map((x) => x.numero)).toEqual(Array.from({ length: 12 }, (_, i) => String(i).padStart(2, '0')));
  await page.goto('/modules/02/');
  await expect(page.locator('h1')).toContainText(m!.titre);
  await expect(page.getByTestId('fil-ariane')).toContainText('Module 02');
  await expect(page.locator('[data-testid="module-lecons"] a')).toHaveCount(10);
  const ex = await page.goto(urlExamen('02'));
  expect(ex?.status()).toBe(200);
  expect(await page.locator('[data-testid="examen"] [data-question]').count()).toBeGreaterThanOrEqual(5);
});

/* ------------------------------------------------------------------ */
/* Migration de la progression v1 → v2                                 */
/* ------------------------------------------------------------------ */

test.describe('migration de la progression v1 (ancienne numérotation)', () => {
  const etatV1 = {
    version: 1,
    lecons: { 'module-02/04-tables': '2026-01-01T00:00:00.000Z', 'module-01/01-a-inexistante': '2026-01-01T00:00:00.000Z' },
    quiz: { 'module-02/04-tables': { score: 4, total: 4, meilleurScore: 4, tentatives: 1, date: '2026-01-01T00:00:00.000Z' } },
    examens: { '02': { pct: 100, meilleurPct: 100, reussi: true, sansFaute: true, tentatives: 1, date: '2026-01-01T00:00:00.000Z' } },
  };

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(
      ([cle, valeur]) => {
        if (!sessionStorage.getItem('__progression_v1_posee__')) {
          localStorage.setItem(cle, valeur);
          sessionStorage.setItem('__progression_v1_posee__', '1');
        }
      },
      [CLE_PROGRESSION, JSON.stringify(etatV1)] as const,
    );
  });

  test('l’ancienne leçon 02/04-tables apparaît terminée sur /modules/03/tables/, l’examen 02 devient l’examen 03 réussi', async ({ page }) => {
    const tables = lecons().find((l) => l.id === 'module-03/04-tables');
    expect(tables, 'leçon module-03/04-tables absente du catalogue').toBeTruthy();
    expect(tables!.url).toBe('/modules/03/tables/');

    await page.goto('/modules/03/tables/');
    await expect(page.getByTestId('lecon-terminer')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[data-testid="sidebar"] [data-statut-lecon="module-03/04-tables"]')).toHaveAttribute('data-termine', 'true');
    // Rien n'est attribué par erreur au nouveau module 02.
    await expect(page.locator('[data-testid="sidebar"] [data-statut-lecon^="module-02/"][data-termine="true"]')).toHaveCount(0);

    await page.goto('/progression/');
    await expect(page.locator('[data-resultat-examen="03"]')).toHaveAttribute('data-reussi', 'true');
    await expect(page.locator('[data-resultat-examen="02"]')).not.toHaveAttribute('data-reussi', 'true');
    await expect(page.getByTestId('badge-module-03')).toHaveAttribute('data-obtenu', 'true');
    await expect(page.getByTestId('badge-module-02')).toHaveAttribute('data-obtenu', 'false');
    const m03 = catalogue().find((m) => m.numero === '03')!;
    await expect(page.locator('main').getByTestId('progress-module-03').locator('[data-progression-texte]')).toHaveText(`1 / ${m03.lecons.length} leçons terminées`);
    await expect(page.locator('main').getByTestId('progress-module-02').locator('[data-progression-texte]')).toHaveText(/^0 \//);
  });

  test('après une nouvelle action, l’état est réécrit en v2 sans double décalage', async ({ page }) => {
    const premiere = lecons()[0];
    await page.goto(premiere.url);
    await page.getByTestId('lecon-terminer').click();
    await expect(page.getByTestId('lecon-terminer')).toHaveAttribute('aria-pressed', 'true');
    const brut = await page.evaluate((cle) => JSON.parse(localStorage.getItem(cle) ?? 'null'), CLE_PROGRESSION);
    expect(brut.version).toBe(2);
    expect(Object.keys(brut.lecons)).toContain('module-03/04-tables');
    expect(Object.keys(brut.lecons)).not.toContain('module-02/04-tables');
    expect(Object.keys(brut.quiz)).toEqual(['module-03/04-tables']);
    expect(Object.keys(brut.examens)).toEqual(['03']);
    // Rechargements successifs : la v2 n'est plus décalée (03 ne devient pas 04).
    await page.reload();
    await page.goto('/modules/03/tables/');
    await expect(page.getByTestId('lecon-terminer')).toHaveAttribute('aria-pressed', 'true');
    await page.goto('/progression/');
    await expect(page.locator('[data-resultat-examen="03"]')).toHaveAttribute('data-reussi', 'true');
    await expect(page.locator('[data-resultat-examen="04"]')).not.toHaveAttribute('data-reussi', 'true');
  });
});

/* ------------------------------------------------------------------ */
/* Navigation renumérotée                                              */
/* ------------------------------------------------------------------ */

test('navigation : « suivant » relie 01 → 02 → 03 ; fil d’Ariane et sommaire affichent « Module 02 »', async ({ page }) => {
  const parModule = (n: string) => catalogue().find((m) => m.numero === n)!.lecons;
  const [m01, m02, m03] = [parModule('01'), parModule('02'), parModule('03')];
  expect(m01.length && m02.length && m03.length).toBeTruthy();

  await page.goto(m01.at(-1)!.url);
  await page.getByTestId('lecon-suivante').click();
  await expect(page).toHaveURL(new RegExp(`${m02[0].url}$`));
  await expect(page.locator('h1')).toHaveText(m02[0].titre);
  await expect(page.getByTestId('fil-ariane')).toContainText('Module 02');
  await expect(page.getByTestId('fil-ariane').getByRole('link', { name: 'Module 02' })).toHaveAttribute('href', '/modules/02/');
  await expect(page.locator('[data-testid="lecon"] header p').first()).toContainText(`Module 02 · Leçon 1 sur ${m02.length}`);
  const ouvert = page.locator('[data-testid="sidebar"] details[open] summary');
  await expect(ouvert).toHaveCount(1);
  await expect(ouvert).toContainText('02');
  await expect(page.locator(`[data-testid="sidebar"] [aria-current="page"]`)).toHaveAttribute('href', m02[0].url);

  await page.goto(m02.at(-1)!.url);
  await expect(page.getByTestId('lien-examen')).toHaveAttribute('href', urlExamen('02'));
  await page.getByTestId('lecon-suivante').click();
  await expect(page).toHaveURL(new RegExp(`${m03[0].url}$`));
  await expect(page.getByTestId('fil-ariane')).toContainText('Module 03');
  await page.getByTestId('lecon-precedente').click();
  await expect(page).toHaveURL(new RegExp(`${m02.at(-1)!.url}$`));
});

/* ------------------------------------------------------------------ */
/* Mobile 390 px                                                       */
/* ------------------------------------------------------------------ */

test.describe('mobile 390 × 844', () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });

  test('module 02 et bibliothèque : aucun défilement horizontal, les prompts passent à la ligne', async ({ page }) => {
    const urls = ['/modules/02/', urlExamen('02'), ...(module02()?.lecons.map((l) => l.url) ?? [])];
    test.setTimeout(30_000 + urls.length * 4_000);
    await allegerPage(page);
    const problemes: string[] = [];
    for (const url of [...new Set(urls)]) {
      await page.goto(url);
      await page.evaluate(() => document.querySelectorAll<HTMLElement>('[data-feedback], [data-explication]').forEach((e) => (e.hidden = false)));
      const d = await debordements(page);
      if (d.largeur > d.vue) problemes.push(`${url} : largeur ${d.largeur}px > ${d.vue}px — ${d.coupables.join(', ') || 'élément inconnu'}`);
      const scrollX = await page.evaluate(() => {
        window.scrollTo(500, window.scrollY);
        return window.scrollX;
      });
      if (scrollX > 0 && d.largeur <= d.vue) problemes.push(`${url} : la page défile horizontalement de ${scrollX}px`);
      // Prompts (composant et quiz) : retour à la ligne, aucune barre de défilement interne.
      const prompts = await page.locator('[data-testid="prompt"] pre, [data-testid="quiz-prompt"] pre, .option-longue').evaluateAll((els) =>
        els.flatMap((el, i) => {
          const e = el as HTMLElement;
          return e.scrollWidth > e.clientWidth + 1 ? [`${e.closest('[data-testid]')?.getAttribute('data-testid')} n°${i + 1} (${e.scrollWidth}px > ${e.clientWidth}px)`] : [];
        }),
      );
      if (prompts.length) problemes.push(`${url} : prompt(s) qui défilent horizontalement — ${prompts.slice(0, 5).join(', ')}`);
    }
    aucunProbleme(problemes, 'Pages du module 02 qui débordent sur mobile');
  });

  test('bibliothèque : chaque bouton Copier est visible dans l’écran, assez grand et cliquable', async ({ page, context }) => {
    await autoriserPressePapiers(context);
    await page.goto(BIBLIOTHEQUE);
    const boutons = page.locator(`${PROMPT} [data-testid="prompt-copier"]`);
    const n = await boutons.count();
    expect(n).toBeGreaterThanOrEqual(20);
    const problemes: string[] = [];
    for (let i = 0; i < n; i++) {
      const b = boutons.nth(i);
      await b.scrollIntoViewIfNeeded();
      const boite = await b.boundingBox();
      if (!boite) {
        problemes.push(`bouton ${i + 1} : non affiché`);
        continue;
      }
      if (boite.x < 0 || boite.x + boite.width > 390) problemes.push(`bouton ${i + 1} : hors écran (x ${Math.round(boite.x)} → ${Math.round(boite.x + boite.width)})`);
      if (boite.height < 24 || boite.width < 24) problemes.push(`bouton ${i + 1} : cible trop petite (${Math.round(boite.width)} × ${Math.round(boite.height)} px, 24 px min. WCAG 2.5.8)`);
      // Rien ne recouvre le bouton en son centre.
      const dessus = await page.evaluate(
        ([x, y]) => {
          const el = document.elementFromPoint(x, y);
          return el?.closest('[data-testid="prompt-copier"]') ? null : `${el?.tagName.toLowerCase()}.${el?.className}`;
        },
        [boite.x + boite.width / 2, boite.y + boite.height / 2] as const,
      );
      if (dessus) problemes.push(`bouton ${i + 1} : recouvert par ${dessus}`);
    }
    aucunProbleme(problemes, 'Boutons Copier sur mobile');
    const dernier = boutons.last();
    await dernier.tap();
    await expect(dernier.locator('[data-libelle]')).toHaveText('Copié !');
  });
});

/* ------------------------------------------------------------------ */
/* Accessibilité (axe-core) des nouveaux éléments                      */
/* ------------------------------------------------------------------ */

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
  test.describe(`accessibilité phase IA, thème ${theme}`, () => {
    test.use({ colorScheme: theme === 'sombre' ? 'dark' : 'light' });

    test.beforeEach(async ({ page, context }) => {
      await autoriserPressePapiers(context);
      await page.addInitScript(([cle, valeur]) => localStorage.setItem(cle, valeur), [CLE_THEME, theme] as const);
      await page.addInitScript(() => {
        document.addEventListener('DOMContentLoaded', () => {
          const s = document.createElement('style');
          s.textContent = '*,*::before,*::after{transition:none!important;animation:none!important}';
          document.head.append(s);
        });
      });
    });

    const pages = () => {
      const m = module02();
      const avecPrompts = m?.lecons.find((l) => /prompt-precis/.test(l.url)) ?? m?.lecons[3];
      const avecIa = pagesContenant(/data-testid="encadre-ia"/).find((u) => !u.startsWith('/modules/02/'));
      return [
        { nom: 'leçon du module 02', url: m?.lecons[0]?.url ?? '/modules/02/' },
        ...(avecPrompts ? [{ nom: 'leçon du module 02 avec prompts', url: avecPrompts.url }] : []),
        { nom: 'bibliothèque de prompts', url: BIBLIOTHEQUE },
        ...(avecIa ? [{ nom: 'leçon avec encadré Avec Claude Code', url: avecIa }] : []),
        { nom: 'examen du module 02', url: urlExamen('02') },
      ];
    };

    for (const p of pages()) {
      test(`${p.nom} (${p.url})`, async ({ page }) => {
        await page.goto(p.url);
        await expect(page.locator('html')).toHaveClass(theme === 'sombre' ? /\bdark\b/ : /^(?!.*\bdark\b)/);
        let violations = await analyser(page);
        expect(violations, `Violations axe (${theme}) sur ${p.url} :\n  ${violations.join('\n  ')}`).toEqual([]);
        // État « Copié ! » des boutons (couleur verte) : contraste vérifié aussi.
        const boutons = page.locator('[data-testid="prompt-copier"]');
        if (await boutons.count()) {
          await boutons.first().click();
          await expect(boutons.first()).toHaveAttribute('data-etat', 'copie');
          await boutons.first().evaluate((b) => b.setAttribute('data-etat', 'echec'));
          if ((await boutons.count()) > 1) await boutons.nth(1).click();
          violations = await analyser(page);
          expect(violations, `Violations axe (${theme}) après copie sur ${p.url} :\n  ${violations.join('\n  ')}`).toEqual([]);
        }
      });
    }

    test('quiz corrigé avec questions ameliore-le-prompt', async ({ page }) => {
      const url = pagesContenant(/data-type="ameliore-le-prompt"/).find((u) => lecons().some((l) => l.url === u));
      test.skip(!url, 'Aucune leçon avec une question ameliore-le-prompt');
      await page.goto(url!);
      const questions = page.locator('[data-testid="quiz"] [data-question]');
      const n = await questions.count();
      for (let i = 0; i < n; i++) {
        await repondre(questions.nth(i), i % 2 === 0);
        await questions.nth(i).getByTestId('quiz-valider').click();
      }
      await expect(page.getByTestId('quiz-score')).toBeVisible();
      const violations = await analyser(page);
      expect(violations, `Quiz ameliore-le-prompt corrigé (${theme}) :\n  ${violations.join('\n  ')}`).toEqual([]);
    });
  });
}
