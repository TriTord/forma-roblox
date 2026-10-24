# QA phase IA — tests automatisés (2026-10-25)

Testeur QA, phase IA. Aucun fichier de contenu (`src/content/**`) modifié. Aucun commit.
Site construit avec `bash scripts/build-verrou.sh` (astro check + build + Pagefind : 0 erreur, 80 pages indexées) ; e2e lancés avec `bash tests/e2e-verrou.sh`.

## Résultats

| Suite | Résultat |
|---|---|
| Vitest (`npx vitest run`) | **58 / 58** (5 fichiers ; 50 avant la phase, dont 1 en échec : « 58 leçons ») |
| Playwright, 1er passage complet | 151 réussis, 3 en échec : débordement mobile de l’accueil (bug de code, corrigé), délai dépassé pour la recette des modules 02 et 03 (bug de test, corrigé) |
| Playwright, passage final complet (après corrections, build du 2026-10-25) | **154 / 154 réussis** (12,3 min ; 120 en fin de phase 1), dont les 30 de `phase-ia.spec.ts` et le parcours complet (68 leçons + 12 examens → 100 %, 17 / 17 badges) |
| Liens externes (`node scripts/verifier-liens-externes.mjs --json C:\tmp\liens-phase-ia.json`) | 361 URL distinctes : 351 OK + 10 OK via la source officielle (Zendesk) ; **0 lien mort**, 0 non vérifiable, 14 / 14 ancres ; 4 redirections permanentes (voir plus bas) |

Chiffres vérifiés : 12 modules, 68 leçons (10 au module 02), 12 examens (`module-02.yaml` présent), 17 badges (12 de module + 5 de parcours) ; 4 types de questions présents en leçon et en examen ; 28 prompts dans la bibliothèque, qui pèse moins de 500 Ko.

## Tests ajoutés ou modifiés

### Unitaires
- `tests/unit/donnees-quiz.test.ts` : 58 / 11 → **68 leçons (12 modules, 10 au module 02) et 12 examens** `examen-00` … `examen-11` ; nouveau test : chaque examen déclare le `module` qui correspond au nom de son fichier ; nouveau test : chaque `ameliore-le-prompt` a un prompt non vide, 2 à 5 options, exactement 1 bonne réponse et pas de champ `code` ; cas fautifs de `problemesQuestion` pour ce type (prompt vide, 0 ou 2 bonnes réponses).
- `tests/unit/schemas.test.ts` : « 3 types » → 4 ; nouveau bloc `ameliore-le-prompt` (6 tests) : 2 et 5 options acceptées, retours à la ligne conservés, `correct: false` par défaut ; refus d’un prompt vide, fait d’espaces ou absent ; refus de 0 ou 2 bonnes réponses ; refus de 1 ou 6 options ; refus d’un champ `code` ou d’une option vide ; type accepté dans un quiz de leçon et dans un examen.
- `tests/contenu-quiz.ts` : il gérait déjà `ameliore-le-prompt` (type, `prompt`, contrôles), rien à changer.

### E2E — nouveau fichier `tests/e2e/phase-ia.spec.ts` (30 tests)
- **`<Prompt>`** : (1) ≥ 20 prompts dans la bibliothèque, h1 correct ; (2) **chaque** bloc du site (48 pages, 28 dans la bibliothèque) : `pre` non vide, un seul bouton `type="button"`, libellé « Copier », nom accessible « Copier le prompt « titre » », pas d’`aria-label`, statut `role=status` / `aria-live=polite` ; (3) **chaque** bouton du site : clic → presse-papiers identique au texte du `pre` (fins de ligne CRLF de Windows ramenées à LF, aucun caractère invisible), « Copié ! » et `data-etat="copie"`, statut annoncé, aucune erreur console ; (4) retour à « Copier » après 2 s, un 2e clic relance le délai, nom accessible qui contient toujours le libellé visible, statut vidé au retour ; (5) clavier : Tab atteint le bouton juste après le contenu précédent, focus visible (`:focus-visible`, contour ≥ 2 px), Entrée puis Espace copient ; (6) repli sans `navigator.clipboard` (zone de texte temporaire retirée, contenu vérifié depuis un autre onglet, aucune erreur console) ; (7) `writeText` refusé (NotAllowedError) : état annoncé, aucune exception.
- **En-tête** : le lien « Prompts » (navigation principale) mène à `/modules/02/bibliotheque-de-prompts/` et y porte `aria-current="page"` ; la page est bien une leçon du module 02 du catalogue.
- **`ameliore-le-prompt`** : chaque question du site (leçons et examens) affiche le prompt de départ **identique à la source**, une légende, la consigne « meilleure version », le libellé de type, 2 à 5 options **radio**, aucune option vide (le nombre de questions vues doit égaler le nombre de questions dans les sources) ; parcours d’une leçon : mauvaise réponse → « incorrect » + explication, bonnes réponses → « correct » + explication, score, Recommencer puis 100 %.
- **Encadrés IA** : chaque leçon des modules 01 et 03 à 11 qui contient un bloc `pre[data-language="luau"]` dans `.prose` (hors quiz et prompts) a au moins un `[data-testid="encadre-ia"]` (liste des leçons fautives en cas d’échec) ; chaque encadré IA du site est un `aside` avec un nom accessible, un titre 🤖 et un contenu non vide.
- **Module 02** : 10 leçons, examen publié (≥ 5 questions), 12 modules numérotés 00 à 11, page module et fil d’Ariane « Module 02 ». Sources et quiz de chaque leçon : déjà couverts par `structure.spec.ts` (toutes les leçons, donc le module 02).
- **Migration v1 → v2** : progression v1 injectée (`forma-roblox:progression:v1`, `version: 1`, leçon `module-02/04-tables`, quiz, examen `"02"`) → `/modules/03/tables/` terminée (bouton et sommaire), rien d’attribué au nouveau module 02, examen 03 réussi, badge module 03 obtenu, barre du module 03 à 1 leçon ; après une action, l’état est réécrit en `version: 2` avec les clés décalées une seule fois (pas de 03 → 04 au rechargement).
- **Navigation renumérotée** : « suivant » de la dernière leçon du 01 → 1re du 02 (h1, fil d’Ariane avec lien « Module 02 », « Module 02 · Leçon 1 sur 10 », un seul module ouvert dans le sommaire, élément courant) ; dernière du 02 : lien vers l’examen 02, « suivant » → 1re du 03, « précédent » → retour.
- **Mobile 390 × 844** : page module 02, examen 02 et ses 10 leçons (dont la bibliothèque) sans défilement horizontal, explications dépliées ; les `pre` des prompts, des questions et les options `.option-longue` ne défilent pas en interne (retour à la ligne) ; dans la bibliothèque, les 28 boutons Copier sont dans l’écran, font au moins 24 × 24 px (WCAG 2.5.8), ne sont pas recouverts, et le dernier copie au toucher.
- **axe-core** (serious / critical, clair et sombre) : 1re leçon du module 02, leçon « L’art du prompt précis » (9 prompts + questions ameliore-le-prompt), bibliothèque, une leçon avec encadré IA (`/modules/01/organiser-son-jeu/`), examen 02 ; à chaque fois aussi **après copie** (bouton vert « Copié ! ») et en état « Échec » (bouton rose) ; quiz ameliore-le-prompt corrigé (réponses justes et fausses).

### E2E — compléments dans les fichiers existants
- `qualite.spec.ts` : test dédié « bibliothèque de prompts < 500 Ko » (HTML + JS + CSS, poids en annotation). Toutes les pages restaient déjà couvertes par le test global.
- `recette-quiz.spec.ts` : nouveau test « la recette couvre les 4 types de questions » (au moins une question de chaque type en leçon **et** en examen dans les sources : la recette exhaustive, qui lit `data-correct` et compte `q.options`, couvre donc `ameliore-le-prompt` sans autre changement ; décompte en annotation). Délai du test par module proportionnel au nombre de leçons (`30 s + 15 s × leçons`) : le module 02 (10 leçons) dépassait les 60 s par défaut.
- `outils.ts` : `debordements()` (déplacé depuis `mobile.spec.ts`, partagé) et `pagesContenant(motif)` (pages de `dist/` dont le HTML correspond à un motif).
- `mobile.spec.ts` : importe `debordements()` d’`outils.ts` (comportement inchangé).
- Pas de changement nécessaire : `progression.spec.ts`, `examen.spec.ts`, `recette-quiz.spec.ts` (parcours complet) calculent les badges à partir du catalogue (`5 + modules` = 17) ; `cours.test.ts` et `progression.test.ts` étaient déjà à 12 modules et testaient déjà la migration v1 → v2.
- `tests/README.md` mis à jour (68 leçons, 17 badges, ligne `phase-ia.spec.ts`, contrôles `ameliore-le-prompt`).

## Bugs de code corrigés

1. **Bouton « Copier » : le nom accessible ne contenait pas le libellé visible** (axe `label-content-name-mismatch`, serious, WCAG 2.5.3) dès que le libellé passait à « Copié ! » ou « Échec », car `aria-label="Copier le prompt « … »"` remplaçait le texte. Un utilisateur de commande vocale qui dit « clique sur Copié » ne trouvait rien. — `src/components/mdx/Prompt.astro` : `aria-label` supprimé ; le titre est ajouté en `sr-only` après le libellé (`<span data-libelle>Copier</span><span class="sr-only"> le prompt « {titre} »</span>`). Le nom accessible devient « Copier le prompt « … » » puis « Copié ! le prompt « … » ».
2. **Statut `aria-live` jamais vidé** : après une 1re copie, une 2e copie du même prompt écrivait le même texte et les lecteurs d’écran ne l’annonçaient pas. — `src/scripts/prompt.ts` : le statut est vidé en même temps que le libellé revient à « Copier » (2 s).
3. **Débordement horizontal sur mobile des questions `ameliore-le-prompt`** : les options longues (chemins `src/ServerScriptService/…`) élargissaient la page à 394-485 px (`/modules/02/examen/`, `/modules/02/l-art-du-prompt-precis/`, `/modules/02/deboguer-avec-l-ia/`). Les `.option` sont des éléments de grille (`min-width: auto`) et `.option-texte` n’avait ni `min-width: 0` ni coupure des mots longs. — `src/styles/global.css` : `.options > .option { min-width: 0 }` ; `.option-longue .option-texte { flex: 1 1 12rem; min-width: 0; overflow-wrap: anywhere }`.
4. **Débordement horizontal de l’accueil sur mobile** (411 px) : les deux `figure` « Prompt vague / Prompt précis » sont dans une grille sans colonne explicite sous `lg` (colonne `auto` = largeur min-content du `pre`), et le prompt précis contient désormais un long chemin sans espace (`src/ServerScriptService/Progression.server.luau`, texte ajouté par la relecture en cours). — `src/pages/index.astro` (classes uniquement, aucun texte touché) : `grid-cols-1` ajouté à la grille, `[overflow-wrap:anywhere]` ajouté aux deux `pre`.
5. (test) délai de la recette par module, voir plus haut.

## Problèmes de contenu à transmettre (non corrigés)

Aucun bloquant : 0 lien mort ; aucune leçon des modules 01 et 03 à 11 avec du code Luau sans encadré « Avec Claude Code » ; toutes les questions `ameliore-le-prompt` sont valides (schéma et `donnees-quiz`) ; aucun débordement mobile causé par le texte seul une fois les corrections CSS faites.

À corriger (redirections permanentes, à remplacer par l’URL finale) :

| Fichier | Ligne | Problème |
|---|---|---|
| `src/content/lecons/module-02/01-panorama-des-outils-ia.mdx` | 211 | `https://claude.com/pricing/max` → 308 puis 307 vers `https://claude.com/fr/pricing` : la page dédiée à Max n’existe plus, le lien « Claude Max — limites d’usage partagées avec Claude Code » arrive sur la page générale des tarifs. Remplacer par une source qui parle vraiment des limites partagées (article du centre d’aide) ou renommer le lien. |
| `src/content/lecons/module-02/06-relire-et-tester-le-code-de-l-ia.mdx` | 686 | `https://lune-org.github.io/docs` → 301 vers `https://lune-org.github.io/docs/` (ajouter la barre oblique finale). |
| `src/content/lecons/module-02/08-les-pieges-de-l-ia.mdx` | 414 | `https://support.claude.com/en/articles/15171100` → 301 vers `…/15171100-age-assurance-on-claude` (URL complète). |
| `src/content/lecons/module-11/05-et-apres.mdx` | 149 | `https://create.roblox.com/talent` → 301 vers `https://create.roblox.com/talent/search/jobs` (déjà présent avant la phase IA). |

Pour information (redirections temporaires vers la version française, sans action nécessaire) : `about.roblox.com/community-standards` et 3 articles du newsroom, `claude.com/pricing` → `/fr/pricing`, `github.com/features/copilot/plans` → `?locale=fr-fr`, `www.roblox.com/info/terms` → article Zendesk.

Remarque d’ergonomie (décision à prendre, pas un bug) : sous 768 px, la navigation principale (Programme, **Prompts**) est masquée et l’en-tête n’affiche que la recherche, la progression et le thème : sur téléphone, la bibliothèque n’est accessible que par le sommaire du module 02, l’accueil ou la recherche.
