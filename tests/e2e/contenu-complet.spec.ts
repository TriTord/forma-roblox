/**
 * [CONTENU] Complétude de la formation par rapport à PLAN.md.
 * Ces tests échouent tant que la rédaction n'est pas terminée : ce ne sont pas des bugs du site.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from '@playwright/test';
import { aucunProbleme, catalogue, DIST, lectureDuPlan, lecons, pagesHtml } from './outils';


test.describe('[CONTENU] complétude par rapport à PLAN.md', () => {
  test('chaque module a toutes ses leçons publiées, dans l’ordre du plan', () => {
    const plan = lectureDuPlan();
    const problemes: string[] = [];
    for (const m of catalogue()) {
      const prevues = plan.get(m.numero) ?? [];
      const publiees = m.lecons.map((l) => l.url);
      const manquantes = prevues.filter((u) => !publiees.includes(u));
      const horsPlan = publiees.filter((u) => !prevues.includes(u));
      if (manquantes.length) problemes.push(`module ${m.numero} : ${manquantes.length}/${prevues.length} leçon(s) manquante(s) : ${manquantes.join(', ')}`);
      if (horsPlan.length) problemes.push(`module ${m.numero} : leçon(s) hors plan : ${horsPlan.join(', ')}`);
      const ordre = publiees.filter((u) => prevues.includes(u));
      const attendu = prevues.filter((u) => publiees.includes(u));
      if (JSON.stringify(ordre) !== JSON.stringify(attendu)) problemes.push(`module ${m.numero} : ordre différent du plan`);
    }
    aucunProbleme(problemes, 'Leçons manquantes (contenu en cours de rédaction)');
  });

  test('chaque module a un examen publié', () => {
    const sans = catalogue().filter((m) => !m.aExamen).map((m) => `module ${m.numero}`);
    aucunProbleme(sans, 'Examens manquants (contenu en cours de rédaction)');
  });

  test('aucun lien vers une leçon prévue mais pas encore publiée', () => {
    const prevues = new Set([...lectureDuPlan().values()].flat());
    const publiees = new Set(lecons().map((l) => l.url));
    const problemes: string[] = [];
    for (const url of pagesHtml()) {
      const fichier = join(DIST, url.endsWith('/') ? `${url}index.html` : url);
      const html = readFileSync(fichier, 'utf8');
      for (const m of html.matchAll(/href="(\/modules\/\d{2}\/[a-z0-9-]+\/)(?:#[^"]*)?"/g)) {
        if (prevues.has(m[1]) && !publiees.has(m[1])) problemes.push(`${url} → ${m[1]}`);
      }
    }
    aucunProbleme([...new Set(problemes)], 'Liens vers des leçons pas encore rédigées');
  });
});
