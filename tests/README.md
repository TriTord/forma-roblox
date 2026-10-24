# Tests automatisés

| Commande | Rôle |
|---|---|
| `npm run test:unit` | Vitest : logique pure (`progression.ts` dont la migration v1 → v2, `cours.ts`, `schemas.ts` dont les cas valides / invalides de `ameliore-le-prompt`, `texte.ts`) et validation des données réelles des quiz/examens (`donnees-quiz.test.ts`) — `tests/unit/` |
| `npm run test:e2e` | Playwright (Chromium) sur le site **déjà construit** (`dist/`, servi par `astro preview` sur le port 4322) — `tests/e2e/` |
| `npm test` | les deux |
| `npm run test:e2e:verrou` | e2e en tenant le verrou de build partagé (`bash tests/e2e-verrou.sh --build` reconstruit d’abord) |

Avant les e2e : `bash scripts/build-verrou.sh` (ou `npm run build`). Les tests ne lancent jamais de build eux-mêmes.
Pendant que d’autres agents écrivent du contenu, préférer `bash tests/e2e-verrou.sh` : aucun build ne peut alors effacer `dist/` en cours de test.

Première installation : `npm install` puis `npx playwright install chromium`.

Options utiles : `npx playwright test quiz` (un fichier), `--grep "examen"`, `--headed`, `npx playwright show-report` (rapport HTML, traces des échecs).

## Principes

- Les tests ne connaissent **aucune leçon précise** : tout est déduit du catalogue injecté dans `dist/index.html` (`script#catalogue-formation`) et de `PLAN.md`. Ils fonctionnent avec 1 ou 68 leçons.
- Les sélecteurs reposent sur les `data-testid` / `data-*` des composants (voir `src/components/`).
- Les tests qui parcourent toutes les pages (structure, liens, navigation) listent **toutes** les pages fautives dans leur message d’échec.
- `contenu-complet.spec.ts` (préfixe `[CONTENU]`) compare le site à `PLAN.md` : il échoue tant que la rédaction n’est pas finie ; ce n’est pas un bug du site.
- Les recommandations non bloquantes d’AUTHORING.md (2 sources, 3 à 6 puces de résumé, 4 à 6 questions…) apparaissent en annotations dans le rapport HTML.

| Fichier | Couvre |
|---|---|
| `liens.spec.ts` | pages 200, page 404, liens internes / ancres / ressources, format des liens externes, ids uniques |
| `structure.spec.ts` | structure de chaque leçon (h1, Astuce, Erreur, Résumé, Sources, quiz), examens, pages module |
| `quiz.spec.ts` | quiz de leçon : 100 %, faux + explication, aide, recommencer, trouve-le-bug, vrai-faux, QCM multiple (ameliore-le-prompt : voir `phase-ia.spec.ts`) |
| `examen.spec.ts` | examens : alerte réponses manquantes, réussite + badges, échec |
| `progression.spec.ts` | persistance, barres globale / module, Reprendre, badges, réinitialisation, onglets, stockage bloqué |
| `theme.spec.ts` | bascule, persistance, absence de flash, `prefers-color-scheme` |
| `navigation.spec.ts` | précédent / suivant sur toutes les leçons, fil d’Ariane, sommaire, modules voisins |
| `recherche.spec.ts` | Pagefind : résultats, raccourcis clavier, pages indexées |
| `mobile.spec.ts` | 390 × 844 : pas de défilement horizontal, sommaire en tiroir, table des matières, en-tête |
| `accessibilite.spec.ts` | axe-core (serious / critical) en clair et en sombre, quiz corrigé, recherche ouverte |
| `taches.spec.ts` | listes de tâches « - [ ] » : cases étiquetées et actives, compteur, persistance, « Tout décocher », stockage bloqué, axe |
| `console.spec.ts` | aucune erreur / avertissement console ni requête en échec sur les pages clés |
| `contenu-complet.spec.ts` | `[CONTENU]` leçons et examens prévus par PLAN.md |
| `recette-quiz.spec.ts` | **recette exhaustive** : quiz de CHAQUE leçon tout juste → 100 % + leçon terminée (bonnes réponses lues dans `data-correct` et recoupées avec le frontmatter source) ; CHAQUE examen → réussite + badge du module ; parcours complet (toutes les leçons + tous les examens) → 100 % et les 17 badges (12 modules + 5 de parcours) dont « Formation complète » ; vérifie aussi que les sources contiennent les 4 types de questions (dont `ameliore-le-prompt`) en leçon et en examen, donc que la recette les couvre tous. Les échecs listent les leçons / examens fautifs |
| `clavier-quiz.spec.ts` | quiz de leçon et examen entièrement au clavier (Tab, flèches, Espace, Entrée), focus visible à chaque étape, annonces `role="status"` / `aria-live` / `role="alert"` |
| `qualite.spec.ts` | toutes les pages : poids HTML + JS + CSS < 500 Ko (test dédié pour la bibliothèque de prompts), `<title>` / meta description présents et uniques, `lang="fr"`, favicon, un seul `<h1>`, sitemap complet sans la 404, 404 servie en preview, aucune erreur console |
| `visuel.spec.ts` | régressions visuelles de la recette (styles calculés) : couleurs de correction des options cochées, indentation des extraits numérotés, espacement énoncé / options, identifiants non coupés dans les tableaux |
| `phase-ia.spec.ts` | **phase IA** : chaque bloc `<Prompt>` du site (`pre` non vide, un bouton « Copier » au nom accessible contenant le libellé visible, statut `role=status`/`aria-live`) ; copie de TOUS les prompts comparée au `pre` (presse-papiers Chromium, CRLF de Windows normalisés), « Copié ! » puis retour à « Copier » après 2 s, statut vidé ; clavier (Tab, focus visible, Entrée, Espace) ; repli sans `navigator.clipboard` et `writeText` refusé, sans erreur console ; bibliothèque `/modules/02/bibliotheque-de-prompts/` (≥ 20 prompts) et lien « Prompts » de l’en-tête ; questions `ameliore-le-prompt` (prompt de départ identique à la source, consigne, 2-5 options radio, bonne / mauvaise réponse, score) ; leçons des modules 01 et 03-11 avec du code Luau sans encadré `encadre-ia` ; encadrés IA complets ; module 02 (10 leçons + examen) ; migration progression v1 → v2 (`module-02/04-tables` → `/modules/03/tables/`, examen 02 → 03, pas de double décalage) ; navigation 01 → 02 → 03, fil d’Ariane et sommaire « Module 02 » ; mobile 390 px (module 02 + bibliothèque sans défilement horizontal, prompts et versions de prompt qui passent à la ligne, boutons Copier visibles, ≥ 24 px, non recouverts) ; axe-core clair / sombre (leçons du module 02, bibliothèque, leçon avec encadré IA, examen 02, états « Copié ! » / « Échec », quiz ameliore-le-prompt corrigé) |

### Données des quiz (`tests/contenu-quiz.ts`, `tests/unit/donnees-quiz.test.ts`)

`tests/contenu-quiz.ts` lit directement le frontmatter des leçons et les YAML d’examens (paquet `yaml`), sans Astro. Le test unitaire vérifie : 68 leçons (12 modules, dont 10 au module 02) et 12 examens (`examen-00` à `examen-11`, module déclaré = nom du fichier), nombre de questions, chaque `qcm` a ≥ 1 bonne réponse (et pas toutes), chaque `trouve-le-bug` et chaque `ameliore-le-prompt` exactement 1 (et un `prompt` de départ non vide, 2 à 5 options), aucune option en double (casse ignorée hors `code`), explications non vides (≥ 20 caractères), pas de question répétée, extraits ≤ 20 lignes (les extraits de plus de 15 lignes sont signalés par un avertissement `[CONTENU]`).

## Outils de recette (hors tests)

| Commande | Rôle |
|---|---|
| `node scripts/verifier-liens-externes.mjs [--json rapport.json]` | extrait tous les liens externes (MDX/YAML hors code + `<a href>` de `dist/`) et les teste : GET avec User-Agent navigateur, redirections suivies une à une (301/308 signalées), 2 essais, 6 requêtes en parallèle. Replis : source Markdown/YAML officielle (`Roblox/creator-docs`) pour create.roblox.com/docs, API Zendesk (`/api/v2/help_center/…/articles/<id>.json`) pour en.help.roblox.com et support.discord.com (défi Cloudflare 403). Ancres `#…` des pages de la doc vérifiées dans la source. Code de sortie 1 si un lien est mort (404/410) |
| `node scripts/captures-recette.mjs [dossier] [url]` | captures desktop 1280 px / mobile 390 px, thèmes clair et sombre, des pages clés (accueil, programme, module, leçons, quiz corrigé, examen avant/après, progression vide/avec badges, 404, recherche) + détection des débordements horizontaux et erreurs console. Nécessite `npx astro preview --port 4323` ; sortie par défaut `C:\tmp\captures-qa` (hors dépôt) |
