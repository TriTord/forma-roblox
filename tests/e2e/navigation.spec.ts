/** Navigation précédent / suivant, fil d'Ariane, sommaire, liens vers l'examen. */
import { expect, test } from '@playwright/test';
import { aucunProbleme, allegerPage, catalogue, lecons, urlExamen } from './outils';

test('précédent / suivant cohérents sur toutes les leçons (y compris d’un module à l’autre)', async ({ page }) => {
  const toutes = lecons();
  test.skip(toutes.length === 0, 'Aucune leçon publiée');
  test.setTimeout(30_000 + toutes.length * 2_000);
  await allegerPage(page);
  const problemes: string[] = [];

  for (const [i, l] of toutes.entries()) {
    await page.goto(l.url, { waitUntil: 'domcontentloaded' });
    const precedente = toutes[i - 1];
    const suivante = toutes[i + 1];
    const infos = await page.evaluate(() => {
      const href = (sel: string) => document.querySelector(sel)?.getAttribute('href') ?? null;
      return {
        prec: href('[data-testid="lecon-precedente"]'),
        suiv: href('[data-testid="lecon-suivante"]'),
        precRel: document.querySelector('[data-testid="lecon-precedente"]')?.getAttribute('rel') ?? null,
        suivRel: document.querySelector('[data-testid="lecon-suivante"]')?.getAttribute('rel') ?? null,
        suivTexte: document.querySelector('[data-testid="lecon-suivante"]')?.textContent?.replace(/\s+/g, ' ').trim() ?? '',
        ariane: Array.from(document.querySelectorAll('[data-testid="fil-ariane"] a')).map((a) => a.getAttribute('href')),
        courant: Array.from(document.querySelectorAll('[data-testid="sidebar"] [aria-current="page"]')).map((a) => a.getAttribute('href')),
        moduleOuvert: Array.from(document.querySelectorAll<HTMLDetailsElement>('[data-testid="sidebar"] details'))
          .filter((d) => d.open)
          .map((d) => d.querySelector('a')?.getAttribute('href')),
        position: document.querySelector('[data-testid="lecon"] header p')?.textContent?.replace(/\s+/g, ' ') ?? '',
        lienExamen: href('[data-testid="lien-examen"]'),
        titre: document.title,
      };
    });

    const p: string[] = [];
    if (infos.prec !== (precedente?.url ?? null)) p.push(`précédente = ${infos.prec}, attendu ${precedente?.url ?? 'aucune'}`);
    if (infos.suiv !== (suivante?.url ?? null)) p.push(`suivante = ${infos.suiv}, attendu ${suivante?.url ?? 'aucune'}`);
    if (precedente && infos.precRel !== 'prev') p.push('rel="prev" absent');
    if (suivante && infos.suivRel !== 'next') p.push('rel="next" absent');
    if (suivante && !infos.suivTexte.includes(suivante.titre)) p.push(`le lien suivant n’affiche pas « ${suivante.titre} »`);
    if (JSON.stringify(infos.ariane) !== JSON.stringify(['/programme/', `/modules/${l.module}/`])) p.push(`fil d’Ariane ${JSON.stringify(infos.ariane)}`);
    if (JSON.stringify(infos.courant) !== JSON.stringify([l.url])) p.push(`sommaire : élément courant ${JSON.stringify(infos.courant)}`);
    if (JSON.stringify(infos.moduleOuvert) !== JSON.stringify([`/modules/${l.module}/`])) p.push(`sommaire : modules ouverts ${JSON.stringify(infos.moduleOuvert)}`);
    const duModule = toutes.filter((x) => x.module === l.module);
    const rang = duModule.findIndex((x) => x.id === l.id) + 1;
    if (!infos.position.includes(`Leçon ${rang} sur ${duModule.length}`)) p.push(`position affichée « ${infos.position.trim()} », attendu « Leçon ${rang} sur ${duModule.length} »`);
    const mod = catalogue().find((m) => m.numero === l.module)!;
    const derniere = rang === duModule.length;
    const examenAttendu = derniere && mod.aExamen ? urlExamen(l.module) : null;
    if (infos.lienExamen !== examenAttendu) p.push(`lien examen = ${infos.lienExamen}, attendu ${examenAttendu}`);
    if (!infos.titre.startsWith(l.titre)) p.push(`<title> « ${infos.titre} » ne commence pas par le titre de la leçon`);
    if (p.length) problemes.push(`${l.url} → ${p.join(' ; ')}`);
  }
  aucunProbleme(problemes, 'Navigation incohérente');
});

test('cliquer « suivant » de la dernière leçon d’un module mène à la première du module suivant', async ({ page }) => {
  const toutes = lecons();
  const i = toutes.findIndex((l, k) => toutes[k + 1] && toutes[k + 1].module !== l.module);
  test.skip(i < 0, 'Il faut au moins deux modules avec des leçons');
  await page.goto(toutes[i].url);
  await page.getByTestId('lecon-suivante').click();
  await expect(page).toHaveURL(new RegExp(`${toutes[i + 1].url}$`));
  await expect(page.locator('h1')).toHaveText(toutes[i + 1].titre);
  await page.getByTestId('lecon-precedente').click();
  await expect(page).toHaveURL(new RegExp(`${toutes[i].url}$`));
});

test('pages module : liens vers les modules voisins, sommaire et examen', async ({ page }) => {
  await allegerPage(page);
  const modules = catalogue();
  const problemes: string[] = [];
  for (const [i, m] of modules.entries()) {
    await page.goto(`/modules/${m.numero}/`, { waitUntil: 'domcontentloaded' });
    const voisins = await page.locator('nav[aria-label="Modules voisins"] a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    const attendus = [modules[i - 1], modules[i + 1]].filter(Boolean).map((x) => `/modules/${x!.numero}/`);
    if (JSON.stringify(voisins) !== JSON.stringify(attendus)) problemes.push(`/modules/${m.numero}/ : voisins ${JSON.stringify(voisins)} ≠ ${JSON.stringify(attendus)}`);
    const lienExamen = await page.getByTestId('lien-examen').count();
    if (lienExamen !== (m.aExamen ? 1 : 0)) problemes.push(`/modules/${m.numero}/ : ${lienExamen} lien(s) vers l’examen`);
    const courant = await page.locator('[data-testid="sidebar"] [aria-current="page"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    if (JSON.stringify(courant) !== JSON.stringify([`/modules/${m.numero}/`])) problemes.push(`/modules/${m.numero}/ : sommaire courant ${JSON.stringify(courant)}`);
  }
  // Le sommaire de toutes les pages de cours liste toutes les leçons publiées et tous les examens.
  const nbLiens = await page.locator('[data-testid="sidebar"] [data-statut-lecon]').count();
  if (nbLiens !== lecons().length) problemes.push(`sommaire : ${nbLiens} leçons listées, ${lecons().length} publiées`);
  const nbExamens = await page.locator('[data-testid="sidebar"] [data-statut-examen]').count();
  const attendusExamens = modules.filter((m) => m.aExamen).length;
  if (nbExamens !== attendusExamens) problemes.push(`sommaire : ${nbExamens} examens listés, ${attendusExamens} publiés`);
  aucunProbleme(problemes, 'Navigation des modules incohérente');
});

test('accueil : « Commencer » mène à la première leçon ; programme : toutes les leçons listées', async ({ page }) => {
  const toutes = lecons();
  await page.goto('/');
  await expect(page.getByTestId('cta-commencer')).toHaveAttribute('href', toutes[0]?.url ?? '/modules/00/');
  await expect(page.locator('[data-testid="accueil-modules"] > li')).toHaveCount(catalogue().length);
  await page.goto('/programme/');
  const liens = await page.locator('[data-testid="programme-modules"] [data-statut-lecon]').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
  expect(liens).toEqual(toutes.map((l) => l.url));
});
