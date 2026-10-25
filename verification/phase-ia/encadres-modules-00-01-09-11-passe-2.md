# Accueil, programme, données, README, PLAN (module 02 et fil rouge), projet-reference/README, modules 00, 01, 09, 10 et 11 (ajouts de la phase IA) — passe 2 (vérificateur W4) — 2026-10-24

Travail réalisé le 2026-10-25, sans faire confiance aux rédacteurs ni à la passe 1 (`encadres-modules-00-01-06-11-passe-1.md`).

Périmètre :
- les ajouts depuis `1ffeb8a` (`git diff 1ffeb8a`) dans `src/pages/index.astro`, `src/pages/programme.astro`, `src/data/site.ts` et `src/data/modules.ts` (modules 02 et 03) ;
- `README.md`, `PLAN.md` (section Module 02 et tableau du fil rouge) et `projet-reference/README.md` ;
- les leçons des modules 00, 01, 09, 10 et 11, et les examens 00, 01, 09, 10 et 11.

Pour la renumérotation, j'ai relu les fichiers **en entier**, pas seulement le diff : elle a été faite dans `1ffeb8a` lui-même, donc le diff ne la montre pas.

## Résumé

88 éléments vérifiés (regroupés en 62 lignes dans le détail) : 5 corrigés, 4 reformulés, 0 supprimé.

**Renumérotation**
- 1 erreur réelle, dans le tableau bilan de 11/05 : il gardait l'ancienne numérotation (modules 2 à 10, avec les liens nouveaux), et le module 02 et le module 11 y manquaient. Corrigé.
- Tout le reste est juste. J'ai contrôlé :
  - tous les « module N » et « leçon N » de mes fichiers ;
  - les 37 renvois « N.M » de `projet-reference/README.md`, comparés aux leçons où chaque script apparaît ;
  - le tableau du fil rouge de PLAN.md, de 00/05 et de 00/01 ;
  - les plages « modules 1 à 5 », « 3 à 5 », « 7 à 11 » et « 3 à 11 » ;
  - chaque lien `/modules/XX/slug/` du site, du README, de PLAN.md et de `projet-reference/README.md` : aucun lien mort.

**Quiz**
- 2 nouvelles questions corrigées (11/02, examen 11). Toutes les autres ont été refaites à la main : numéros de ligne recomptés, calculs refaits (09/04 : 87,5 contre 77,3).
- Les quiz de leçon comptent au plus 7 questions (le maximum est 8).
- Les examens 09 à 11 comptent 16 à 17 questions. Le schéma l'accepte, mais c'est au-dessus de la cible de 10 à 15 de PLAN.md. J'ai mis la règle de PLAN.md à jour plutôt que de supprimer des questions.

**Code**
- `node scripts/verifier-luau.mjs`, aucun diagnostic réel :

  | Module | Extraits | Diagnostics |
  |---|---|---|
  | 00 | 4 | 2, sur les défauts volontaires des q14 et q15 de l'examen (phase 1) |
  | 01 | 9 | 0 |
  | 09 | 11 | 0 |
  | 10 | 22 | 2 « Unknown require », car il n'y a pas de sourcemap (phase 1) |
  | 11 | 14 | 0, relancé après ma correction de l'examen |

- Extrait de l'accueil : 0 diagnostic avec luau-lsp en mode non strict, celui du site. En `--!strict`, 3 avertissements de typage sur `Instance?` ; ce n'est pas le niveau des extraits du site.

**Tests réels**
- Tous faits dans `C:\tmp\phase-ia-W4\`, sur une copie de `projet-reference/`.
- Outils installés par rokit : `selene 0.32.0`, `stylua 2.6.0`, `Rojo 7.7.1`.
- `selene src` affiche « 0 errors / 0 warnings / 0 parse errors ».
- `stylua --check src` se termine avec le code 0.
- Analyse luau-lsp :
  - `rojo sourcemap` produit une sourcemap identique à celle du dépôt ;
  - `luau-lsp analyze --sourcemap` ne renvoie aucun diagnostic.

  Les commandes et l'affirmation de `projet-reference/README.md` sont donc confirmées.
- Lien Talent : `curl -I https://create.roblox.com/talent` renvoie 301 vers `/talent/search/jobs`. Cette page a pour titre « Creator Hub - Talent » et pour description « Connect with other creators, find people to collaborate with ».
- `npx vitest run` : 58 tests passent.
- Aucun Studio n'était connecté : aucune exécution en jeu réel.
- Mac : rien de propre au Mac n'a été ajouté dans ce périmètre. « macOS 13.0+ » est confirmé sur la documentation officielle ; aucun test sur Mac n'était possible.

**Sources ouvertes le 2026-10-25**
- claude.com/pricing :
  - Free : « No » pour Claude Code ;
  - Pro : « $20 if billed monthly », et 17 $ par mois en annuel avec « $200 billed up front » ;
  - Max : « From $100 ».
- code.claude.com/docs/en/setup : « macOS 13.0+ », « Windows 10 1809+ », « 4 GB+ RAM », « The free claude.ai plan does not include Claude Code access ».
- anthropic.com/legal/consumer-terms : « You must be at least 18 years old to use the Services », version du 8 octobre 2025, sans clause parentale.
- code.claude.com/docs/en/best-practices :
  - « Claude stops when the work looks done » ;
  - « If you can't verify it, don't ship it » ;
  - « CLAUDE.md is a special file that Claude reads at the start of every conversation ».
- code.claude.com/docs/en/overview.
- create.roblox.com/docs :
  - assistant/guide : aucun prix ni âge ; 50 modèles procéduraux par 24 h glissantes ;
  - référence AnalyticsService : signatures, méthodes `Fire*` dépréciées ;
  - analytics/funnel-events : « Events can only be sent from the server and in published games » ;
  - analytics/event-types : 100 étapes par entonnoir, 100 noms d'événements personnalisés ;
  - studio/testing-modes : « Server & Clients », jusqu'à 8 clients ;
  - studio/device-simulator : modes Physical size, Actual resolution et Fit to window.

**Build** : `bash scripts/build-verrou.sh` échoue sur 6 erreurs, toutes dans `src/components/layout/Header.astro`. Ce fichier n'est pas dans ma mission ; un autre agent le modifie en ce moment. Aucune erreur ne vient de mes fichiers.

## Détail

| Leçon | Affirmation / élément | Verdict (OK / CORRIGÉ / REFORMULÉ / SUPPRIMÉ) | Source | Commentaire |
|---|---|---|---|---|
| Accueil | Héros : « diriger, lire, vérifier », aucune promesse ; méthode en 3 cartes | OK | — | Message clair et honnête ; l'engagement d'honnêteté précise que l'IA « se trompe aussi » |
| Accueil | Prompt du héros ↔ extrait `Progression.server.luau` | OK | projet-reference `Progression.server.luau` (`numero ~= etape.Value + 1`) ; luau-lsp | Même convention (`leaderstats.Etape`, Parts « 1 », « 2 »… de `Workspace.Checkpoints`, étape suivante seulement) ; l'extrait ne fait que ce que le prompt demande |
| Accueil | Prompt vague / précis des pièces (`Config.VALEUR_PIECE`, 10 s, `GestionJoueurs`) | OK | projet-reference `Config.luau` l.7, `Pieces.server.luau` l.14 | |
| Accueil (FAQ) | Prix Pro 20 $ / 17 $ (200 $ d'avance), Max à partir de 100 $, offre gratuite sans Claude Code | OK | claude.com/pricing ; code.claude.com/docs/en/setup | Revérifiés le 2026-10-25 |
| Accueil (FAQ), 00/01, 01/05, examen 00 | Règle d'âge (décision 38) et ses 3 options | OK | consumer-terms ; DECISIONS.md n° 38 | Formulation identique à la décision partout |
| Accueil (FAQ) | Assistant de Studio : ni prix ni abonnement indiqués, quelques limites d'usage | OK | create.roblox.com/docs/assistant/guide | |
| Accueil (FAQ) | « module 2 … module 3 … module 4 … module 5 » (systèmes de jeu : sauvegarde, inventaire, interface) | OK | `src/data/modules.ts` | Chaque renvoi désigne le bon module |
| Accueil | Badge « Gardien » dans la vignette décorative | OK | modules.ts (module 04) | |
| Accueil, programme | Nombre de modules et de leçons calculés ; liens vers le module 02 et la bibliothèque calculés | OK | `src/lib/cours.ts` | 68 leçons, aucun nombre écrit en dur |
| Programme, site.ts, README | Description, paragraphe « La méthode », 12 modules (0 à 11), composants MDX | OK | `src/components/mdx/` | |
| modules.ts | Description et objectifs du module 02 (Rojo, Git, MCP, prompts, découpage, relecture) | OK | titres et objectifs des leçons 02/01-10 | Cohérents avec les leçons |
| modules.ts | Module 03 « Lire et comprendre Luau » : description et objectifs | OK | leçons 03/01-06 | |
| PLAN.md | Section Module 02 : 10 leçons, slugs, notions (dont « au moins 8 exemples » en 02/04) | OK | fichiers `module-02/` ; 02/04 (Exemples 1 à 8) | |
| PLAN.md | Tableau du fil rouge, lignes 0 à 11 | OK | grep des leçons 03/02, 03/03, 03/05, 03/06, 04/05, 05/05, 05/06 | Chaque brique est bien dans le module indiqué |
| PLAN.md | Règles communes : « 3 types possibles », « 4 à 6 questions », « 10 à 15 questions » | CORRIGÉ | AUTHORING.md §3 et §5 ; `src/lib/schemas.ts` | Passe à 4 types (avec `ameliore-le-prompt`) et 8 questions au plus par leçon ; examen : « 10 à 15 visées », le schéma acceptant 5 à 30 |
| projet-reference/README | 37 renvois « script (N.M) » et « modules 3 à 11 », « module 5, leçon 4 », « module 5, leçon 2 », « Outils qualité (module 2) » | OK | grep des noms de scripts dans les leçons | Tous conformes à la nouvelle numérotation |
| projet-reference/README | Commandes `rokit install`, `selene src`, `stylua --check src`, sourcemap, luau-lsp, « aucun diagnostic » | OK | tests réels | 0 erreur, code de sortie 0, 0 diagnostic |
| projet-reference/README | `luau_recent` complète `math.isfinite` | OK | `selene.toml`, `luau_recent.yml` ; test réel | |
| 00/01 | Tableau des modules 0 à 11 ; quiz « 12 modules » | OK | modules.ts | |
| 00/01 | « anti-rebond au module 3 », « sauvegarde et boutique au module 5 », « modules 3 à 5 » | OK | 03/05 (13 mentions de debounce) ; 05/02 et 05/03 | |
| 00/01 | Configuration requise de Claude Code, offres, âge | OK | setup ; pricing ; consumer-terms | |
| 00/01 | Exemple vague / précis des checkpoints ; lien vers la bibliothèque | OK | | Le lien existe |
| 00/01 | Quatre types de quiz | OK | AUTHORING.md §3 | |
| 00/03 | Section « Ton état d'esprit face à l'IA » ; citation « If you can't verify it, don't ship it » | OK | best-practices | Citation exacte |
| 00/03 | Nouveau qcm « bon état d'esprit » | OK | | Une seule bonne réponse |
| 00/05 | Tableau 0 à 11 ; « À partir du module 3 » ; étapes 1 à 3 (modules 1 à 5, 6, 7 à 11) | OK | modules.ts | |
| 00/05 | « CLAUDE.md, lu au début de chaque session » | OK | best-practices | |
| 00/05 | qcm « Au module 2, juste après le premier niveau » | OK | 01/05, 02/02 | |
| Examen 00 | Nouvelle `ameliore-le-prompt` (kill bricks) ; Q1 (abonnement, 18 ans) | OK | | Une seule meilleure version. La réapparition au dernier checkpoint est l'objectif vu du joueur, cohérent avec `Progression` |
| Examen 00 | 15 questions (une vrai-faux retirée) | OK | | Les leçons restent toutes couvertes |
| 01/03 | Encadré « Compter les plateformes » et puce sur le `nil` de `WaitForChild` avec délai | OK | référence Instance:WaitForChild ; code de la leçon | |
| 01/03 | `ameliore-le-prompt` (compter les plateformes) | OK | | |
| 01/04 | Encadré « Comprendre une erreur de l'Output » (F5, Server & Clients à 2 clients, « Point de départ trouvé ») | OK | code de la leçon l.176-180 ; testing-modes (« Server & Clients ») | |
| 01/04 | `ameliore-le-prompt` (erreur de l'Output) | OK | | |
| 01/05 | Encadré « Vérifier l'ancrage » (GetDescendants, IsA, `not Anchored`, GetFullName, FindFirstChild) | OK | code de la leçon | Le prompt décrit exactement le code enseigné |
| 01/05 | `ameliore-le-prompt` et son explication corrigée en passe 1 (ancrage d'office) | OK | `PlateformesMobiles.server.luau` | D'accord avec la correction de la passe 1 |
| 01/05 | « La suite : scripter avec l'IA », encadré « Avant le module 2 », lien vers 00/bienvenue | OK | setup ; consumer-terms | |
| 09/04 | Prompt « Calculatrice de monétisation » : formules, totaux, `outils/` hors de `src/`, « 2.0 %, 75.0 Robux et 1.50 Robux » | OK | code de la leçon (`%.1f`, `%.2f`) | |
| 09/04 | `trouve-le-bug` « moyenne des ARPPU » (ligne 11) | OK | calcul à la main | (75 + 100) ÷ 2 = 87,5 contre 1 700 ÷ 22 ≈ 77,3 ; lignes 6, 7, 11 et 12 recomptées |
| 09/05 | Prompt « Entonnoirs » : étapes 1 à 5, `ProgressionObby`, `funnelSessionId` nil, `LogCustomEvent` « Mort » + CustomField01, `pcall`, `IsStudio`, aucune méthode `Fire*` | OK | référence AnalyticsService ; funnel-events ; projet-reference `AnalytiqueObby.server.luau` | Ordre des messages de la rubrique Vérification conforme au script (onboarding puis progression à chaque checkpoint, temps du checkpoint 1 juste après) |
| 09/05 | `ameliore-le-prompt` : « événements serveur uniquement », « limite de 100 noms » | OK | funnel-events (« only be sent from the server ») ; event-types (eventNames 100) | |
| Examen 09 | `trouve-le-bug` `LogEconomyEvent` avant le test du solde (lignes 5 à 8) | OK | référence (ordre des paramètres) ; décompte à la main | Un seul défaut |
| Examen 09 | `ameliore-le-prompt` entonnoir de boutique (`GenerateGUID`, serveur, étapes 1 ou 2 validées) | OK | funnel-events | |
| 10/01 | Prompt « Audit mobile et AdaptationMobile » : tailles 0,2 × 0,12 et 0,15 × 0,08, `PreferredInput`, `ScreenInsets` | OK | projet-reference `AdaptationMobile.client.luau`, `BoutonBoutique.model.json` (0,15 × 0,08) ; device-simulator (Physical size) | |
| 10/01 | `ameliore-le-prompt` (mobile) | OK | | |
| 10/02 | Prompt « Repérer et étiqueter » : fiche de mesure vide, mesure faite par l'élève, étiquette `ObbyRotationPieces` | OK | code de la leçon l.184-204 ; 03/06 (`VITESSE_ROTATION_PIECES`) | Mesure avant / après respectée, aucune optimisation à l'aveugle |
| 10/02 | Explication de l'`ameliore-le-prompt` : « « Optimise tout » change dix choses à l'aveugle » | REFORMULÉ | brief (résultat plausible, pas une certitude) | Devient « risque de changer », comme la reformulation de la passe 1 en 10/04 |
| 10/03 | Prompt « Audit streaming » (64 = rayon minimal, aucun `Persistent`, `ChildAdded`) | OK | leçon l.132 et l.359 | |
| 10/03 | `trouve-le-bug` `GetChildren` sans `ChildAdded` (ligne 7) | OK | décompte à la main | |
| 10/03 | « téléportation sécurisée … du module 4 (leçon 4) » | OK | 04/04 (contient la téléportation) | |
| 10/04 | Prompt « Rotation des pièces côté client » (`PreRender`, `deltaTime`, `ChildAdded`/`ChildRemoved`, mesure avant / après, `Pieces` du module 4 intact) | OK | projet-reference `PiecesTournantesClient.client.luau`, `Pieces.server.luau` | |
| 10/04 | `ameliore-le-prompt` (lag) | OK | | |
| 10/05 | Prompt « Audit de performance du code » et `ameliore-le-prompt` | OK | leçon 10/05 | Le prompt n'invente aucun chiffre et fait une correction à la fois |
| Examen 10 | `trouve-le-bug` MeshParts (ligne 5) ; `ameliore-le-prompt` « l'IA propose, tu mesures » | OK | décompte à la main | |
| 11/02 | Encadré « Audit des erreurs techniques » (6 parties) | OK | titres « Erreur 1 à 6 » de la leçon ; fichiers présents dans projet-reference | |
| 11/02 | `trouve-le-bug` `EquiperObjet` : « Un tricheur porte la traînée du Game Pass sans l'avoir achetée » | CORRIGÉ | projet-reference `GamePassTrail.server.luau` (attribut `PossedeTrailDore`), `Catalogue.luau`, `Boutique.server.luau` l.130 | La traînée du Game Pass ne passe ni par `inventaire` ni par `EquiperObjet` : la correction proposée (`donnees.inventaire[idObjet]`) ne la concernerait pas. Devient « la traînée Aurore de la boutique sans l'avoir jamais achetée ». Lignes 6, 7, 11 et 13 recomptées |
| 11/04 | Prompt de la checklist (dont le point Monétisation corrigé en passe 1, `DonneesJoueurs_v1`, `Joueur_`, `BindToClose`, sauvegarde périodique, `Humanoid:LoadAnimation` déprécié) | OK | `DonneesJoueurs.luau` l.5, 84 et 118 ; `GestionJoueurs.server.luau` l.68 et 79 ; `Achats.server.luau` | |
| 11/04 | 5 nouvelles cases « Si tu as écrit une partie du code avec Claude Code » : pertinence, liens 02/06, 02/02 et 02/08 | OK | les 3 leçons existent | |
| 11/04 | Cases « Aucun secret dans le dépôt Git » et « Tout est commité » sans renvoi, alors que « chaque case renvoie à la leçon » | REFORMULÉ | 02/08 (`.ROBLOSECURITY`, l.287 et 386) ; 02/02 (`git status`, l.495-500) | Liens ajoutés vers « Les pièges de l'IA » et « Installer un workflow pro » |
| 11/04 | « Les cases se cochent sur cette page et restent cochées dans ce navigateur » ; `ameliore-le-prompt` | OK | `src/scripts/taches.ts` | |
| 11/05 | Tableau « Le bilan » : modules numérotés 0 à 10 (ancienne numérotation, liens nouveaux), sans le module 02 ni le module 11 | CORRIGÉ | modules.ts | Renumérotation 3 à 11, nouvelle ligne 2 « Piloter Claude Code » avec un lien vers 02/04, ligne 3 « Lire et comprendre Luau » |
| 11/05 | Intro « Tu sais maintenant construire, programmer… » | REFORMULÉ | méthode de la formation | « construire un jeu Roblox en pilotant une IA de code, le lire, le sécuriser… » |
| 11/05 | « Où continuer à apprendre » : aucune ressource sur l'IA de code | REFORMULÉ | code.claude.com/docs/en/overview (« Overview - Claude Code Docs ») | Sous-section ajoutée (documentation officielle, bibliothèque de prompts) et source ajoutée |
| 11/05 | Lien `create.roblox.com/talent` (mission QA du coordinateur) | CORRIGÉ | `curl -I` : 301 vers `/talent/search/jobs` ; og:title « Creator Hub - Talent » | Remplacé par l'URL finale |
| Examen 11 | qcm « revue du code généré » (4 bonnes réponses sur 5) | OK | | |
| Examen 11 | `trouve-le-bug` texte filtré jeté : le code ne limitait pas la fréquence de `NommerFamilier` | CORRIGÉ | checklist 11/04 §3 (« fréquence limitée ») ; `Validation.creerCooldown` | Sans limite de fréquence, le code avait un second défaut selon la propre règle de la formation. Ajout de `Validation.creerCooldown(2)` et du test `peutNommer(player)`. Options renumérotées (lignes 8, 9, 13, 16 ; bonne réponse ligne 16), explication complétée. `verifier-luau 11` : 0 diagnostic |
| Toutes | Encadré `<AvecClaudeCode>` dans chaque leçon des modules 03 à 11 qui contient du Luau | OK | décompte (grep) | |
| Toutes | Liens internes `/modules/XX/slug/` (site, README, PLAN, projet-reference) | OK | script de comparaison avec les fichiers | Aucun lien mort |

## Désaccords avec la passe précédente

1. **Examen 11, `trouve-le-bug` du texte filtré.** La passe 1 dit « Un seul défaut, les lignes 5, 6 et 10 sont correctes ». Je ne suis pas d'accord : le RemoteEvent n'avait aucune limite de fréquence par joueur, et la checklist 11/04 (§3), comme les leçons 04/04 et 04/05, en font une règle. C'était donc un second défaut. Corrigé en ajoutant le délai.
2. **11/02, `trouve-le-bug` `EquiperObjet`.** La passe 1 l'a marqué OK. Or le scénario (« la traînée du Game Pass ») ne correspond pas à `projet-reference/` : le Game Pass est géré par un attribut, pas par l'inventaire. Énoncé corrigé.
3. **Renumérotation.** La passe 1 n'a vérifié que le diff. Elle n'a donc pas vu le tableau bilan de 11/05, qui était resté à l'ancienne numérotation sans le module 02. Je ne suis pas d'accord avec son « Liens internes … aucun ne manque » pris comme garantie de la renumérotation : les liens étaient justes, mais les numéros de la colonne Module ne l'étaient pas.
4. **PLAN.md.** Elle ne l'a pas relu (hors de son périmètre). Les règles communes ignoraient encore le type `ameliore-le-prompt`.

Sur tout le reste, je suis d'accord avec la passe 1, y compris avec ses corrections de l'accueil, de 01/03, 01/05, 09/04, 09/05 et 11/04.

## Signalements hors périmètre (pour information, non corrigés)

- `grep -rnE "modules? [0-9]+" src/content` : 410 occurrences sur tout le site. J'ai relu celles des modules 02 à 08 et des examens 02 à 08 : je n'ai trouvé **aucun renvoi suspect**. Exemples contrôlés :
  - 04/02 « au module 6, un LocalScript l'affichera » (MessagesProgression, 06/01) ;
  - 06/03 « Script d'exemple « Recompenses » du module 4 (leçon 3) » (présent en 04/03) ;
  - 06/03 « Au module 3 (leçon 6), `Config.Niveaux` » (présent en 03/06) ;
  - 02/05 « (module 2, leçon 6) » (Lune) ;
  - 02/10 « module 3, leçon 2 » (kill brick).
- Le seul tableau numéroté par module resté à l'ancienne numérotation était celui de 11/05 (corrigé ci-dessus). C'est le seul du site, d'après `grep -rnE "^\| *[0-9]{1,2} *\|" src/content`.
- Commentaires des scripts de `projet-reference/src/` (hors mission) : renvois « module N » relus en passant, sans incohérence repérée.
- `src/components/layout/Header.astro` (autre agent) bloque actuellement le build : 6 erreurs de balises JSX.

## Erreurs restantes non corrigées

- **Build bloqué par `Header.astro`**, hors de ma mission : à relancer quand l'agent concerné aura terminé. Mes fichiers ne provoquent aucune erreur. `vitest` passe et `verifier-luau` ne signale rien.
- **Examens 09 à 11 à 16-17 questions**, au-dessus de la cible de 10 à 15 (le maximum du schéma est 30). Je n'ai rien supprimé : toutes les questions sont justes. La règle de PLAN.md le mentionne désormais.
