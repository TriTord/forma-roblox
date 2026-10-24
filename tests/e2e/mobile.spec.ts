/** Affichage mobile (390 × 844) : pas de défilement horizontal, sommaire en tiroir. */
import { expect, test, type Page } from '@playwright/test';
import { aucunProbleme, lecons, modulesAvecExamen, modulesAvecLecons, urlExamen } from './outils';

test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });

/** Échantillon : pages fixes + une leçon par module (la plus longue en général : la 1re et la dernière) + examens. */
function echantillon(): string[] {
  const pages = ['/', '/programme/', '/progression/', '/404.html', '/modules/00/'];
  for (const m of modulesAvecLecons()) {
    pages.push(m.lecons[0].url);
    if (m.lecons.length > 1) pages.push(m.lecons[m.lecons.length - 1].url);
  }
  for (const m of modulesAvecExamen()) pages.push(urlExamen(m.numero));
  if (!modulesAvecExamen().length) pages.push(urlExamen('00'));
  return [...new Set(pages)];
}

/** Éléments qui dépassent à droite de l'écran (pour un message d'échec utile). */
async function debordements(page: Page): Promise<{ largeur: number; vue: number; coupables: string[] }> {
  return page.evaluate(() => {
    const vue = document.documentElement.clientWidth;
    const coupables: string[] = [];
    for (const el of Array.from(document.querySelectorAll<HTMLElement>('body *'))) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.right <= vue + 1) continue;
      // Ignore les éléments placés dans un conteneur à défilement horizontal (blocs de code) ou hors écran volontairement.
      let parent = el.parentElement;
      let dansDefilement = false;
      while (parent && parent !== document.body) {
        const s = getComputedStyle(parent);
        if (/(auto|scroll|hidden|clip)/.test(s.overflowX) || s.visibility === 'hidden' || s.position === 'fixed') {
          dansDefilement = true;
          break;
        }
        parent = parent.parentElement;
      }
      const s = getComputedStyle(el);
      if (dansDefilement || s.position === 'fixed' || s.visibility === 'hidden') continue;
      coupables.push(`${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ''}.${[...el.classList].slice(0, 3).join('.')} (droite ${Math.round(r.right)}px)`);
    }
    return { largeur: document.documentElement.scrollWidth, vue, coupables: coupables.slice(0, 5) };
  });
}

test('aucun défilement horizontal sur un échantillon de pages', async ({ page }) => {
  test.setTimeout(120_000);
  const problemes: string[] = [];
  for (const url of echantillon()) {
    await page.goto(url);
    // Ouvre les questions/explications pour mesurer la page « dépliée ».
    await page.evaluate(() => document.querySelectorAll<HTMLElement>('[data-feedback], [data-explication]').forEach((e) => (e.hidden = false)));
    const d = await debordements(page);
    if (d.largeur > d.vue) problemes.push(`${url} : largeur ${d.largeur}px > ${d.vue}px — ${d.coupables.join(', ') || 'élément inconnu'}`);
    const scrollX = await page.evaluate(() => {
      window.scrollTo(500, window.scrollY);
      return window.scrollX;
    });
    if (scrollX > 0 && d.largeur <= d.vue) problemes.push(`${url} : la page défile horizontalement de ${scrollX}px`);
  }
  aucunProbleme(problemes, 'Pages qui débordent en largeur sur mobile');
});

test('sommaire mobile : ouverture, fermeture (bouton, fond, Échap), focus', async ({ page }) => {
  const url = lecons()[0]?.url ?? '/modules/00/';
  await page.goto(url);
  const sommaire = page.getByTestId('sidebar');
  const bouton = page.getByTestId('sidebar-toggle');
  await expect(bouton).toBeVisible();
  await expect(bouton).toHaveAttribute('aria-expanded', 'false');
  await expect(sommaire).not.toBeInViewport();
  await expect(sommaire).toBeHidden(); // visibility: hidden quand fermé (pas de focus clavier caché)

  await bouton.click();
  await expect(sommaire).toBeVisible();
  await expect(sommaire).toBeInViewport({ ratio: 0.9 });
  await expect(bouton).toHaveAttribute('aria-expanded', 'true');
  // Le focus va dans le tiroir (élément courant ou bouton Fermer).
  await expect.poll(() => page.evaluate(() => Boolean(document.activeElement?.closest('[data-testid="sidebar"]')))).toBe(true);
  // Le contenu derrière ne défile plus.
  await expect(page.locator('body')).toHaveClass(/overflow-hidden/);

  await sommaire.getByRole('button', { name: 'Fermer le sommaire' }).click();
  await expect(sommaire).toBeHidden();
  await expect(bouton).toHaveAttribute('aria-expanded', 'false');
  await expect(bouton).toBeFocused();
  await expect(page.locator('body')).not.toHaveClass(/overflow-hidden/);

  await bouton.click();
  await expect(sommaire).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(sommaire).toBeHidden();

  await bouton.click();
  await expect(sommaire).toBeVisible();
  await page.mouse.click(380, 600); // clic sur le fond assombri, à droite du tiroir
  await expect(sommaire).toBeHidden();

  // Naviguer depuis le tiroir.
  await bouton.click();
  const lienProgramme = sommaire.locator('a[href^="/modules/"]').first();
  await lienProgramme.click();
  await expect(page).toHaveURL(/\/modules\//);
});

test('table des matières mobile dépliable sur une leçon', async ({ page }) => {
  const url = lecons()[0]?.url;
  test.skip(!url, 'Aucune leçon publiée');
  await page.goto(url!);
  const toc = page.getByTestId('toc-mobile');
  await expect(toc).toBeVisible();
  await expect(page.getByTestId('toc')).toBeHidden();
  await toc.locator('summary').click();
  const liens = toc.locator('a');
  await expect(liens.last()).toBeVisible();
  await liens.last().click();
  await expect(page).toHaveURL(/#quiz$/);
  await expect(page.getByTestId('quiz')).toBeInViewport();
});

test('en-tête mobile : recherche, progression et thème accessibles sans déborder', async ({ page }) => {
  await page.goto('/');
  for (const id of ['search-open', 'theme-toggle', 'logo']) await expect(page.getByTestId(id)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Ma progression' }).first()).toBeVisible();
  const tailles = await page.locator('header button, header a').evaluateAll((els) =>
    els
      .filter((e) => (e as HTMLElement).offsetParent !== null && !e.classList.contains('sr-only'))
      .map((e) => {
        const r = e.getBoundingClientRect();
        return { nom: e.getAttribute('aria-label') ?? e.textContent?.trim() ?? '', l: r.width, h: r.height };
      }),
  );
  const format = (t: { nom: string; l: number; h: number }) => `${t.nom} (${Math.round(t.l)}×${Math.round(t.h)})`;
  // WCAG 2.2 (2.5.8, niveau AA) : au moins 24 × 24 px. Recommandation mobile (Apple/Google) : 44 px, signalée seulement.
  const sous44 = tailles.filter((t) => t.h < 44 || t.l < 44).map(format);
  if (sous44.length) test.info().annotations.push({ type: 'cibles tactiles < 44 px', description: sous44.join(', ') });
  aucunProbleme(tailles.filter((t) => t.h < 24 || t.l < 24).map(format), 'Cibles tactiles sous 24 px dans l’en-tête');
});

test('sommaire mobile ouvert : la touche Tab reste dans le tiroir (contenu masqué derrière le fond)', async ({ page }) => {
  await page.goto(lecons()[0]?.url ?? '/modules/00/');
  await page.getByTestId('sidebar-toggle').click();
  await expect(page.getByTestId('sidebar')).toBeVisible();
  const sorties: string[] = [];
  // Assez de tabulations pour parcourir tout le tiroir et revenir.
  const nbFocusables = await page.locator('[data-testid="sidebar"] a:visible, [data-testid="sidebar"] button:visible, [data-testid="sidebar"] summary:visible').count();
  for (let i = 0; i < nbFocusables + 3; i++) {
    await page.keyboard.press('Tab');
    const hors = await page.evaluate(() => {
      const el = document.activeElement;
      return el && !el.closest('[data-testid="sidebar"]') ? `${el.tagName.toLowerCase()} « ${(el.textContent ?? '').trim().slice(0, 40)} »` : null;
    });
    if (hors) {
      sorties.push(hors);
      break;
    }
  }
  aucunProbleme(sorties, 'Le focus clavier sort du tiroir ouvert vers la page masquée');
});
