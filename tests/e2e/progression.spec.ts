/** Progression : persistance, barres globale et par module, « Reprendre », badges, réinitialisation. */
import { expect, test } from '@playwright/test';
import { catalogue, lecons, lireProgression, modulesAvecLecons, pct, poserProgression, valeurBarre } from './outils';

test('« Marquer comme terminée » est persisté après rechargement et se défait', async ({ page }) => {
  const lecon = lecons()[0];
  test.skip(!lecon, 'Aucune leçon publiée');
  await page.goto(lecon.url);
  const bouton = page.getByTestId('lecon-terminer');
  await expect(bouton).toHaveAttribute('aria-pressed', 'false');
  await bouton.click();
  await expect(bouton).toHaveAttribute('aria-pressed', 'true');
  await expect(bouton).toContainText('Leçon terminée');

  await page.reload();
  await expect(bouton).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator(`header [data-statut-lecon="${lecon.id}"]`)).toBeVisible();
  await expect(page.locator(`[data-testid="sidebar"] [data-statut-lecon="${lecon.id}"]`)).toHaveAttribute('data-termine', 'true');

  await bouton.click();
  await expect(bouton).toHaveAttribute('aria-pressed', 'false');
  await page.reload();
  await expect(bouton).toHaveAttribute('aria-pressed', 'false');
  expect((await lireProgression(page))?.lecons[lecon.id]).toBeUndefined();
});

test('barres de progression globale et par module cohérentes avec les leçons terminées', async ({ page }) => {
  const modules = modulesAvecLecons();
  test.skip(modules.length === 0, 'Aucune leçon publiée');
  // Termine la première leçon de chaque module et toutes les leçons du premier module.
  const faites = new Set<string>([...modules[0].lecons.map((l) => l.id), ...modules.map((m) => m.lecons[0].id)]);
  await poserProgression(page, [...faites]);
  const total = lecons().length;

  await page.goto('/progression/');
  const globale = page.getByTestId('progress-global');
  await expect(globale).toHaveAttribute('aria-valuenow', String(pct(faites.size, total)));
  await expect(globale).toHaveAttribute('aria-valuetext', new RegExp(`${faites.size} / ${total} leçons terminées`));
  await expect(globale.locator('[data-progression-pct]')).toHaveText(`${pct(faites.size, total)} %`);

  for (const m of catalogue()) {
    const barre = page.getByTestId(`progress-module-${m.numero}`);
    const n = m.lecons.filter((l) => faites.has(l.id)).length;
    await expect(barre, `module ${m.numero}`).toHaveAttribute('aria-valuenow', String(pct(n, m.lecons.length)));
    if (m.lecons.length === 0) await expect(barre.locator('[data-progression-texte]')).toHaveText('Leçons en préparation');
    else await expect(barre.locator('[data-progression-texte]')).toHaveText(`${n} / ${m.lecons.length} leçons terminées`);
  }
  // La largeur visuelle suit la valeur.
  const largeur = await globale.evaluate((el) => getComputedStyle(el).getPropertyValue('--progression').trim());
  expect(largeur).toBe(`${pct(faites.size, total)}%`);

  // Même valeur dans la barre latérale d'une page de cours et sur /programme.
  await page.goto(modules[0].lecons[0].url);
  expect(await valeurBarre(page.locator('[data-testid="sidebar"] [data-testid="progress-global"]'))).toBe(pct(faites.size, total));
  await expect(page.getByTestId(`progress-module-${modules[0].numero}`)).toHaveAttribute('aria-valuenow', '100');
  await page.goto('/programme/');
  expect(await valeurBarre(page.getByTestId('progress-global'))).toBe(pct(faites.size, total));
});

test('« Reprendre » pointe vers la première leçon non terminée', async ({ page }) => {
  const toutes = lecons();
  test.skip(toutes.length < 2, 'Il faut au moins 2 leçons');
  await page.goto('/');
  await expect(page.getByTestId('cta-reprendre')).toBeHidden();

  await poserProgression(page, [toutes[0].id]);
  await page.goto('/');
  const reprendre = page.getByTestId('cta-reprendre');
  await expect(reprendre).toBeVisible();
  await expect(reprendre).toHaveAttribute('href', toutes[1].url);
  await expect(reprendre).toContainText(toutes[1].titre);
  await reprendre.click();
  await expect(page).toHaveURL(new RegExp(`${toutes[1].url}$`));
});

test('badges de parcours sur /progression (premier pas, mi-parcours)', async ({ page }) => {
  const toutes = lecons();
  test.skip(toutes.length === 0, 'Aucune leçon publiée');
  await page.goto('/progression/');
  await expect(page.locator('[data-testid="badge-premier-pas"]')).toHaveAttribute('data-obtenu', 'false');
  await expect(page.locator('[data-compteur-badges]')).toHaveText(`0 / ${5 + catalogue().length}`);

  const moitie = toutes.slice(0, Math.ceil(toutes.length / 2)).map((l) => l.id);
  await poserProgression(page, moitie);
  await page.goto('/progression/');
  await expect(page.locator('[data-testid="badge-premier-pas"]')).toHaveAttribute('data-obtenu', 'true');
  await expect(page.locator('[data-testid="badge-mi-parcours"]')).toHaveAttribute('data-obtenu', 'true');
  await expect(page.locator('[data-testid="badges-modules"] li')).toHaveCount(catalogue().length);
});

test('réinitialisation : annuler conserve, confirmer efface tout', async ({ page }) => {
  const toutes = lecons();
  test.skip(toutes.length === 0, 'Aucune leçon publiée');
  await poserProgression(page, [toutes[0].id], { [catalogue()[0].numero]: true });
  await page.goto('/progression/');
  const globale = page.getByTestId('progress-global');
  await expect(globale).toHaveAttribute('aria-valuenow', String(pct(1, toutes.length)));

  page.once('dialog', (d) => d.dismiss());
  await page.getByTestId('progression-reset').click();
  await expect(globale).toHaveAttribute('aria-valuenow', String(pct(1, toutes.length)));
  expect(await lireProgression(page)).not.toBeNull();

  let message = '';
  page.once('dialog', (d) => {
    message = d.message();
    void d.accept();
  });
  await page.getByTestId('progression-reset').click();
  await expect(globale).toHaveAttribute('aria-valuenow', '0');
  expect(message).toContain('Effacer toute ta progression');
  expect(await lireProgression(page)).toBeNull();
  await expect(page.locator('[data-testid="badges-globaux"] [data-obtenu="true"]')).toHaveCount(0);
  await expect(page.locator('[data-testid="badges-modules"] [data-obtenu="true"]')).toHaveCount(0);

  await page.reload();
  await expect(globale).toHaveAttribute('aria-valuenow', '0');
  await expect(page.locator('[data-compteur-badges]')).toHaveText(`0 / ${5 + catalogue().length}`);
});

test('la progression est synchronisée entre deux onglets', async ({ context }) => {
  const lecon = lecons()[0];
  test.skip(!lecon, 'Aucune leçon publiée');
  const a = await context.newPage();
  const b = await context.newPage();
  await a.goto(lecon.url);
  await b.goto('/progression/');
  await a.getByTestId('lecon-terminer').click();
  await expect(b.getByTestId('progress-global')).toHaveAttribute('aria-valuenow', String(pct(1, lecons().length)));
});

test('stockage bloqué : alerte affichée sur /progression, le site reste utilisable', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('Accès refusé', 'SecurityError');
      },
    });
  });
  const erreurs: string[] = [];
  page.on('pageerror', (e) => erreurs.push(e.message));
  await page.goto('/progression/');
  await expect(page.getByTestId('alerte-stockage')).toBeVisible();
  const lecon = lecons()[0];
  if (lecon) {
    await page.goto(lecon.url);
    await page.getByTestId('lecon-terminer').click();
    await expect(page.getByTestId('lecon-terminer')).toHaveAttribute('aria-pressed', 'true');
  }
  expect(erreurs).toEqual([]);
});
