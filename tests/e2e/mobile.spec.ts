/** Affichage mobile (390 × 844) : pas de défilement horizontal, sommaire en tiroir. */
import { expect, test } from '@playwright/test';
import { aucunProbleme, debordements, lecons, modulesAvecExamen, modulesAvecLecons, urlExamen } from './outils';

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
  // Le contenu derrière ne défile plus et n'est plus atteignable (inert : ni focus, ni lecteur d'écran).
  await expect(page.locator('body')).toHaveClass(/overflow-hidden/);
  await expect(page.locator('header').first()).toHaveAttribute('inert', '');
  await expect(sommaire).not.toHaveAttribute('inert', '');

  await sommaire.getByRole('button', { name: 'Fermer le sommaire' }).click();
  await expect(sommaire).toBeHidden();
  await expect(bouton).toHaveAttribute('aria-expanded', 'false');
  await expect(bouton).toBeFocused();
  await expect(page.locator('body')).not.toHaveClass(/overflow-hidden/);
  await expect(page.locator('[inert]')).toHaveCount(0);

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
  for (let i = 0; i < nbFocusables + 3 && !sorties.length; i++) {
    await page.keyboard.press('Shift+Tab');
    const hors = await page.evaluate(() => {
      const el = document.activeElement;
      return el && el !== document.body && !el.closest('[data-testid="sidebar"]') ? `${el.tagName.toLowerCase()} (Maj+Tab)` : null;
    });
    if (hors) sorties.push(hors);
  }
  aucunProbleme(sorties, 'Le focus clavier sort du tiroir ouvert vers la page masquée');
  // Fermeture au clavier : retour du focus sur le bouton d'ouverture.
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('sidebar-toggle')).toBeFocused();
});
