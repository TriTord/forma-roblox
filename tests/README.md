# Tests automatisés

| Commande | Rôle |
|---|---|
| `npm run test:unit` | Vitest : logique pure (`progression.ts`, `cours.ts`, `schemas.ts`, `texte.ts`) — `tests/unit/` |
| `npm run test:e2e` | Playwright (Chromium) sur le site **déjà construit** (`dist/`, servi par `astro preview` sur le port 4322) — `tests/e2e/` |
| `npm test` | les deux |
| `npm run test:e2e:verrou` | e2e en tenant le verrou de build partagé (`bash tests/e2e-verrou.sh --build` reconstruit d’abord) |

Avant les e2e : `bash scripts/build-verrou.sh` (ou `npm run build`). Les tests ne lancent jamais de build eux-mêmes.
Pendant que d’autres agents écrivent du contenu, préférer `bash tests/e2e-verrou.sh` : aucun build ne peut alors effacer `dist/` en cours de test.

Première installation : `npm install` puis `npx playwright install chromium`.

Options utiles : `npx playwright test quiz` (un fichier), `--grep "examen"`, `--headed`, `npx playwright show-report` (rapport HTML, traces des échecs).

## Principes

- Les tests ne connaissent **aucune leçon précise** : tout est déduit du catalogue injecté dans `dist/index.html` (`script#catalogue-formation`) et de `PLAN.md`. Ils fonctionnent avec 1 ou 58 leçons.
- Les sélecteurs reposent sur les `data-testid` / `data-*` des composants (voir `src/components/`).
- Les tests qui parcourent toutes les pages (structure, liens, navigation) listent **toutes** les pages fautives dans leur message d’échec.
- `contenu-complet.spec.ts` (préfixe `[CONTENU]`) compare le site à `PLAN.md` : il échoue tant que la rédaction n’est pas finie ; ce n’est pas un bug du site.
- Les recommandations non bloquantes d’AUTHORING.md (2 sources, 3 à 6 puces de résumé, 4 à 6 questions…) apparaissent en annotations dans le rapport HTML.

| Fichier | Couvre |
|---|---|
| `liens.spec.ts` | pages 200, page 404, liens internes / ancres / ressources, format des liens externes, ids uniques |
| `structure.spec.ts` | structure de chaque leçon (h1, Astuce, Erreur, Résumé, Sources, quiz), examens, pages module |
| `quiz.spec.ts` | quiz de leçon : 100 %, faux + explication, aide, recommencer, trouve-le-bug, vrai-faux, QCM multiple |
| `examen.spec.ts` | examens : alerte réponses manquantes, réussite + badges, échec |
| `progression.spec.ts` | persistance, barres globale / module, Reprendre, badges, réinitialisation, onglets, stockage bloqué |
| `theme.spec.ts` | bascule, persistance, absence de flash, `prefers-color-scheme` |
| `navigation.spec.ts` | précédent / suivant sur toutes les leçons, fil d’Ariane, sommaire, modules voisins |
| `recherche.spec.ts` | Pagefind : résultats, raccourcis clavier, pages indexées |
| `mobile.spec.ts` | 390 × 844 : pas de défilement horizontal, sommaire en tiroir, table des matières, en-tête |
| `accessibilite.spec.ts` | axe-core (serious / critical) en clair et en sombre, quiz corrigé, recherche ouverte |
| `console.spec.ts` | aucune erreur / avertissement console ni requête en échec sur les pages clés |
| `contenu-complet.spec.ts` | `[CONTENU]` leçons et examens prévus par PLAN.md |
