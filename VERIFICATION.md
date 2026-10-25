# VERIFICATION.md — Vérification du contenu

Ce fichier est généré par `node scripts/consolider-verification.mjs` à partir des rapports détaillés du dossier [`verification/`](verification/).

## Méthode

Chaque module a suivi la même boucle qualité :

1. **Rédaction** par un rédacteur dédié, qui a sourcé chaque affirmation et listé ses doutes dans `verification/module-XX-notes-redacteur.md`.
2. **Vérification passe 1** par un vérificateur indépendant du rédacteur : faits, chiffres, noms d'API et de fonctionnalités confrontés aux sources officielles (create.roblox.com/docs et son dépôt GitHub, annonces officielles du staff sur le DevForum, en.help.roblox.com, roblox.com/info, Newsroom / about.roblox.com, luau.org) ; quiz ; code Luau.
3. **Vérification passe 2** par un second vérificateur indépendant, qui ne fait pas confiance à la passe 1 : il refait la vérification, se concentre sur le code Luau à l'exécution, les quiz et la clarté, et consigne ses désaccords avec la passe 1.
4. **Cohérence inter-modules** : assemblage du code du fil rouge dans un projet de référence analysé par luau-lsp avec types Roblox, et harmonisation des faits répétés d'un module à l'autre.
5. **Relecture finale** comme un élève débutant.

Outils utilisés : `luau-lsp analyze` avec les définitions de types Roblox (`node scripts/verifier-luau.mjs`), interpréteur `luau` pour la sémantique du langage pur, WebFetch/WebSearch sur les sources officielles.

Règles appliquées : toute information fausse, obsolète ou invérifiable est corrigée, reformulée prudemment ou supprimée ; les chiffres qui évoluent sont datés (« au moment de la rédaction, octobre 2026 ») avec leur source ; aucun « secret de succès » : chaque conseil s'appuie sur une source, des données Roblox, ou est présenté comme un retour d'expérience de développeurs ou un choix de la formation.

**Limite connue commune à tous les modules** : aucune instance de Roblox Studio n'était connectée pendant la vérification. Le code a été vérifié par analyse statique (luau-lsp + types Roblox), exécution du Luau pur quand c'était possible, et raisonnement sur la documentation officielle (ordre de chargement des personnages, réplication…), mais pas exécuté dans un vrai serveur Roblox. Les points concernés sont signalés dans les rapports.

## Tableau de bord

Comptage automatique des lignes des tableaux « Détail » de chaque rapport (une ligne = un élément vérifié : affirmation, question de quiz, extrait de code ou source).

| Module | Passe | Lignes OK | Corrigées | Reformulées | Supprimées | Rapport |
|---|---|---|---|---|---|---|
| 00 | 1 | 56 | 7 | 13 | 0 | [module-00-passe-1.md](verification/module-00-passe-1.md) |
| 00 | 2 | 41 | 4 | 6 | 0 | [module-00-passe-2.md](verification/module-00-passe-2.md) |
| 01 | 1 | 56 | 6 | 11 | 0 | [module-01-passe-1.md](verification/module-01-passe-1.md) |
| 01 | 2 | 47 | 2 | 5 | 0 | [module-01-passe-2.md](verification/module-01-passe-2.md) |
| 03 | 1 | 45 | 4 | 6 | 0 | [module-03-passe-1.md](verification/module-03-passe-1.md) |
| 03 | 2 | 51 | 1 | 5 | 0 | [module-03-passe-2.md](verification/module-03-passe-2.md) |
| 04 | 1 | 41 | 6 | 4 | 0 | [module-04-passe-1.md](verification/module-04-passe-1.md) |
| 04 | 2 | 41 | 3 | 5 | 0 | [module-04-passe-2.md](verification/module-04-passe-2.md) |
| 05 | 1 | 46 | 6 | 6 | 1 | [module-05-passe-1.md](verification/module-05-passe-1.md) |
| 05 | 2 | 22 | 4 | 1 | 1 | [module-05-passe-2.md](verification/module-05-passe-2.md) |
| 06 | 1 | 52 | 14 | 14 | 2 | [module-06-passe-1.md](verification/module-06-passe-1.md) |
| 06 | 2 | 41 | 10 | 3 | 0 | [module-06-passe-2.md](verification/module-06-passe-2.md) |
| 07 | 1 | 49 | 8 | 4 | 0 | [module-07-passe-1.md](verification/module-07-passe-1.md) |
| 07 | 2 | 30 | 3 | 1 | 0 | [module-07-passe-2.md](verification/module-07-passe-2.md) |
| 08 | 1 | 71 | 5 | 7 | 0 | [module-08-passe-1.md](verification/module-08-passe-1.md) |
| 08 | 2 | 66 | 5 | 12 | 0 | [module-08-passe-2.md](verification/module-08-passe-2.md) |
| 09 | 1 | 71 | 7 | 4 | 0 | [module-09-passe-1.md](verification/module-09-passe-1.md) |
| 09 | 2 | 45 | 4 | 4 | 0 | [module-09-passe-2.md](verification/module-09-passe-2.md) |
| 10 | 1 | 62 | 7 | 7 | 0 | [module-10-passe-1.md](verification/module-10-passe-1.md) |
| 10 | 2 | 18 | 8 | 6 | 1 | [module-10-passe-2.md](verification/module-10-passe-2.md) |
| 11 | 1 | 50 | 9 | 7 | 0 | [module-11-passe-1.md](verification/module-11-passe-1.md) |
| 11 | 2 | 44 | 7 | 7 | 0 | [module-11-passe-2.md](verification/module-11-passe-2.md) |
| **Total** | | **1045** | **130** | **138** | **5** | |

## Suivi des signalements transverses (tous résolus)

Plusieurs rapports de passe 2 listent, dans « Erreurs restantes », des problèmes **situés dans un autre module** que le vérificateur n'avait pas le droit de modifier. Ils ont tous été transmis par le chef d'orchestre et corrigés ensuite :

| # | Signalé par | Problème | Résolution |
|---|---|---|---|
| 1 | Module 10, passe 1 | `BindToClose` du module 04 n'attendait pas les sauvegardes lancées par `PlayerRemoving` | Corrigé au module 04 (passe 1) : compteur commun `sauvegardesEnCours`, `SauvegarderTout()`, limite 25 s sous les 30 s officielles |
| 2 | Module 07, passe 2 | `completer()` (module 04) ne mettait pas à jour `version` | Corrigé au module 04 (passe 1) |
| 3 | Module 03, passe 2 | Module 04 : phrase fausse sur « l'attribut du module 3 » et script Checkpoints sans contrôle de distance | Corrigé au module 04 (passe 2) : le script « Progression » du module 03 est conservé et seulement complété |
| 4 | Module 09, passe 2 | `BoutonBoutique` (module 04) dans la zone du joystick mobile | Corrigé au module 04 (passe 2) : bord gauche, mi-hauteur ; modules 09 alignés (cohérence A) |
| 5 | Module 06, passe 2 | `DonneesJoueurs.Sauvegarder` renvoyait `true` quand l'écriture était annulée | Corrigé au module 04 (passe 2) : `true` seulement si écrit ; `ProcessReceipt` du module 06 donc fiable |
| 6 | Module 00, passe 2 | `src/data/modules.ts` présentait les Premium Payouts comme actuels | Corrigé par le chef d'orchestre (Creator Rewards) |
| 7 | Module 04, passe 2 | Module 07 (extrait `completer` « inchangé »), module 09 (bouton à déplacer), module 10 (sauvegarde simplifiée non alignée) | Corrigés par l'intégration code (cohérence A) |
| 8 | Module 05, passes 1-2 | `Config.Zones` inexistant au module 02 ; module `Recompenses` homonyme d'un script du module 03 | Corrigé au module 05 (passe 2) : `Config.Niveaux` + ajouts documentés ; `RecompensesEtapes` |
| 9 | Modules 03 et 10 | Format et identifiants du `Catalogue` différents du module 04 | Alignés sur le module 04 (`TrailNuage` / `TrailSoleil` / `TrailAurore`, 25 / 75 / 150) |
| 10 | Modules 06 et 08 | Désaccord sur la règle des Daily Engagement Rewards | Tranché par le chef d'orchestre sur la source officielle (`creator-rewards.md`, exemples 1 et 2) : parmi les jeux où l'Active Spender passe ≥ 10 min, les trois premiers dans l'ordre des visites ; formulation unique (cohérence B) |
| 11 | Modules 01, 07, 10 | Chiffres de Roblox Kids and Select présentés différemment | Harmonisés (cohérence B) : 500 au lancement (juin 2026), 250 depuis le 19/08/2026 ; détail au seul module 07, renvois ailleurs |
| 12 | Relecture 00-03 | FAQ de l'accueil non sourcée sur les revenus | Remplacée par les chiffres officiels publiés par Roblox (septembre 2026) |
| 13 | Relecture 07-10 | Quiz 09-04 : `Touched` sur une Part `CanTouch = false` lève-t-il une erreur ? | Confirmé par la référence officielle `BasePart.CanTouch` |

Le code des 58 leçons a en outre été assemblé dans un **projet de référence** (`projet-reference/`, format Rojo) reproduisant exactement ce qu'obtient un élève qui suit toutes les consignes ; `luau-lsp analyze` avec les types Roblox et le sourcemap y rapporte **0 diagnostic**.

**Bilan : aucune erreur factuelle connue n'est laissée sans correction.** Les points « à surveiller » qui subsistent dans les rapports ne sont pas des erreurs mais :
- des **contradictions dans la documentation officielle elle-même** (ex. 5 ou 10 monnaies pour AnalyticsService, raccourci du MicroProfiler Ctrl+F6 / Ctrl+Alt+F6, conditions de remboursement Kids and Select), que les leçons signalent honnêtement ;
- des **comportements de l'interface de Studio non testables sans Studio connecté** (touches AZERTY de la caméra, requête de recherche de l'Explorer, valeurs affichées par défaut de certaines propriétés de streaming), formulés prudemment ;
- des **chiffres datés** (octobre 2026) qui évolueront, tous assortis de leur source et du champ `miseAJour`.

Rapports transverses : [coherence-inter-modules.md](verification/coherence-inter-modules.md), [qa-recette-finale.md](verification/qa-recette-finale.md), [relecture-finale-00-03.md](verification/relecture-finale-00-03.md), [relecture-finale-04-06.md](verification/relecture-finale-04-06.md), [relecture-finale-07-10.md](verification/relecture-finale-07-10.md).

# Phase IA — « Scripter avec l'IA » (octobre 2026)

La phase IA a ajouté le module **02 « Scripter avec l'IA : piloter Claude Code »** (10 leçons + examen), réorienté le module 03 vers la lecture du code (« Lire et comprendre Luau (pour diriger l'IA) »), ajouté un encadré **« Avec Claude Code »** (prompt précis + points à vérifier) dans chaque leçon technique des modules 01 et 03 à 11, et mis à jour l'accueil, le programme et la FAQ. Les anciens modules 02 à 10 sont devenus 03 à 11.

## Méthode de la phase IA

1. **Veille factuelle** avant rédaction (deux fiches sourcées : [Claude Code et IA de code](verification/phase-ia/veille-claude-code.md), [outils Roblox, MCP, Rojo, tests, règles IA](verification/phase-ia/veille-roblox-ia.md)). Elle a établi notamment : serveur MCP intégré à Studio depuis mars 2026 (ancien dépôt archivé), Script Sync natif en version finale depuis juin 2026, Rojo 7.7.1 via Rokit, TestEZ archivé et Jest Roblox maintenu, raccourci `#` de Claude Code supprimé, mode de départ `auto`, `/agents` et `/hooks` en lecture seule.
2. **Rédaction** par 5 rédacteurs (module 02) et 5 adaptateurs (modules existants, accueil), avec un gabarit de prompt commun en 8 rubriques et des notes de sources (`verification/phase-ia/notes-*.md`).
3. **Vérification passe 1** (5 lots) puis **passe 2** (4 lots, découpage différent, sans faire confiance à la passe 1), sur les sources officielles : code.claude.com/docs, CHANGELOG de Claude Code, claude.com/pricing, conditions d'Anthropic, create.roblox.com/docs et `Roblox/creator-docs`, annonces du DevForum, dépôts officiels de Rojo, Rokit, selene, StyLua, luau-lsp, Jest Roblox, Lune, pages de prix officielles des autres outils.
4. **Tests réels sur la machine (Windows 11)** : tutoriels des leçons 02/02 et 02/03 suivis à la lettre plusieurs fois (Rokit, `rojo init/build/serve/sourcemap/syncback`, selene, StyLua, Git, fins de ligne) ; `claude mcp add/list/remove` (configurations de test retirées) ; validité JSON des `settings.json` ; hook StyLua + selene testé de bout en bout avec `claude -p` sous Git Bash et PowerShell ; sous-agent `relecteur-roblox` lancé avec `claude -p` ; mini-jeu `exemples/lave-montante/` : `rojo build`, luau-lsp avec sourcemap (0 diagnostic), selene, StyLua, 12 tests Lune + simulation multijoueur ; Luau pur des exercices du module 03 exécuté avec `luau.exe` ; `projet-reference/` : selene, StyLua et luau-lsp sans aucun diagnostic.
5. **Contrôle d'exécution dans Roblox Studio** : un Studio de l'utilisateur étant connecté au MCP, un script **non modifiant** a confirmé l'existence de 17 API utilisées par les prompts (et l'inexistence de l'API inventée citée en exemple) — [controle-studio.md](verification/phase-ia/controle-studio.md).
6. **QA** : build, 58 tests unitaires et 154 tests e2e (dont 30 nouveaux : prompts et bouton Copier, quiz « Améliore ce prompt », encadrés, migration de la progression, navigation renumérotée, mobile, accessibilité), 361 liens externes — [qa-phase-ia.md](verification/phase-ia/qa-phase-ia.md).
7. **Relecture finale** comme un débutant total qui n'a jamais utilisé d'IA de code (`verification/phase-ia/relecture-finale-*.md`).

## Signalements transverses de la phase IA (tous résolus)

| # | Signalé par | Problème | Résolution |
|---|---|---|---|
| 1 | Adaptateur A5 | Les conditions d'Anthropic exigent 18 ans (sans clause parentale) alors que le public a 12-16 ans | Décision 38 : formulation commune appliquée partout (accueil, FAQ, modules 00, 01, 02) ; vérifiée en passes 1 et 2 |
| 2 | Rédacteur R1 | Le corrigé `projet-reference/` échouait à `selene src` (`math.isfinite` inconnu de selene 0.32) et à `stylua --check` | Bibliothèque selene `luau_recent` (roblox + `math.isfinite`), corrigé reformaté, `rokit.toml`/`selene.toml`/`stylua.toml`/`.gitattributes` ajoutés ; `math.isfinite` confirmé dans Studio |
| 3 | Rédacteur R1 | Avec Rojo, une interface construite à la main dans StarterGui est supprimée à la connexion | Encadrés « Si ton projet utilise Rojo » en 05/04 et 05/06 (construire Rojo déconnecté, puis décrire l'UI en fichiers via Claude Code + MCP) ; vérifiés en passes 1 et 2 |
| 4 | Vérificateur V1 | Clé `StyLua` vs `stylua` dans `rokit.toml` ; pas de `.gitattributes` dans les exemples (StyLua échoue après un clone Windows) | Exemples alignés sur la leçon 02/02 |
| 5 | Vérificateur V1 | La configuration selene du tutoriel aurait fait échouer le hook à chaque modification (code utilisant `math.isfinite`) | Tutoriel passé à `std = "luau_recent"` |
| 6 | Vérificateur V2 | Lave Montante : après une erreur en plein round, les survivants restaient dans l'arène | Retour au lobby garanti dans `nettoyerRound()` (passe 2), confirmé par simulation Lune |
| 7 | QA | Bouton Copier : nom accessible incohérent, annonce non répétée ; débordements mobiles (options longues, accueil) | Corrigé dans le code (`Prompt.astro`, `prompt.ts`, CSS) ; tests ajoutés |
| 8 | QA | 4 liens redirigés | Remplacés par leur URL finale (passes 2) |
| 9 | Vérificateur W4 | Tableau « Le bilan » de 11/05 resté à l'ancienne numérotation | Renuméroté, module 02 ajouté |
| 10 | Vérificateur W3 | Démo `AnnonceVictoire` et Script `Victoire` : deux systèmes de victoire ; `VALEUR_PIECE` dupliqué entre `Pieces` et `Config` ; scripts de leçons absents du corrigé | Note de remplacement en 05/05 ; `Pieces` lit `Config.VALEUR_PIECE` (leçon + corrigé) ; scripts facultatifs listés dans `projet-reference/README.md` |

**Limites connues de la phase IA** : aucune étape n'a pu être testée sur Mac (vérifiée sur les documentations officielles) ; les prompts n'ont pas été exécutés un par un dans une vraie session interactive de Claude Code (seuls le hook, le sous-agent relecteur et la configuration MCP l'ont été, avec `claude -p`) ; aucun jeu n'a tourné en multijoueur réel dans Studio (le contrôle Studio s'est limité à l'existence des API, sans modifier les places de l'utilisateur). Les prix et fonctionnalités des outils d'IA sont datés du 24-25 octobre 2026 et évoluent vite.

### Tableau de bord de la phase IA

| Lot | Passe | Lignes OK | Corrigées | Reformulées | Supprimées | Rapport |
|---|---|---|---|---|---|---|
| encadres-modules-00-01-06-11 | 1 | 70 | 6 | 9 | 0 | [encadres-modules-00-01-06-11-passe-1.md](verification/phase-ia/encadres-modules-00-01-06-11-passe-1.md) |
| encadres-modules-00-01-09-11 | 2 | 59 | 5 | 4 | 0 | [encadres-modules-00-01-09-11-passe-2.md](verification/phase-ia/encadres-modules-00-01-09-11-passe-2.md) |
| encadres-modules-03-05 | 1 | 49 | 4 | 3 | 0 | [encadres-modules-03-05-passe-1.md](verification/phase-ia/encadres-modules-03-05-passe-1.md) |
| encadres-modules-03-08 | 2 | 55 | 4 | 8 | 0 | [encadres-modules-03-08-passe-2.md](verification/phase-ia/encadres-modules-03-08-passe-2.md) |
| module-02-lecons-01-03 | 1 | 74 | 11 | 11 | 0 | [module-02-lecons-01-03-passe-1.md](verification/phase-ia/module-02-lecons-01-03-passe-1.md) |
| module-02-lecons-01-05 | 2 | 60 | 7 | 7 | 0 | [module-02-lecons-01-05-passe-2.md](verification/phase-ia/module-02-lecons-01-05-passe-2.md) |
| module-02-lecons-04-06 | 1 | 24 | 12 | 3 | 0 | [module-02-lecons-04-06-passe-1.md](verification/phase-ia/module-02-lecons-04-06-passe-1.md) |
| module-02-lecons-06-10 | 2 | 56 | 8 | 6 | 0 | [module-02-lecons-06-10-passe-2.md](verification/phase-ia/module-02-lecons-06-10-passe-2.md) |
| module-02-lecons-07-10 | 1 | 50 | 9 | 6 | 0 | [module-02-lecons-07-10-passe-1.md](verification/phase-ia/module-02-lecons-07-10-passe-1.md) |
| **Total phase IA** | | **497** | **66** | **57** | **0** | |

## Résumés des rapports de la phase IA

### encadres-modules-00-01-06-11 — passe 1 ([rapport détaillé](verification/phase-ia/encadres-modules-00-01-06-11-passe-1.md))

97 éléments vérifiés, 6 corrigés, 9 reformulés, 0 supprimé.

**Quiz et examens** : 22 nouvelles questions de leçon et 15 nouvelles questions d'examen, dans les examens 00 et 06 à 11.
- Chaque `trouve-le-bug` a été recompté à la main : un seul défaut, à la bonne ligne.
- Chaque `ameliore-le-prompt` a une seule meilleure version.
- 1 explication fausse corrigée (01/05).
- 1 libellé reformulé (10/03).

**Code** :
- Extrait Luau de l'accueil réécrit, pour qu'il corresponde au prompt Rojo affiché juste au-dessus.
- `verifier-luau` : aucun diagnostic réel.
  - 00 : 4 extraits. 2 diagnostics sur les défauts volontaires des q14 et q15 de l'examen, inchangés depuis la phase 1.
  - 01 : 9 extraits, 0 diagnostic.
  - 06 : 19 extraits. 6 diagnostics : des « Unknown require » (pas de sourcemap) et des `ImportUnused`/`FunctionUnused` sur des extraits partiels.
  - 07 : 18 extraits. 1 « Unknown require ».
  - 08 : 12 extraits. 1 diagnostic sur le défaut volontaire du quiz 08/03.
  - 09 : 11 extraits, 0 diagnostic.
  - 10 : 22 extraits. 2 « Unknown require » de la phase 1.
  - 11 : 14 extraits, 0 diagnostic.
- Aucun Studio n'est connecté : aucune exécution en jeu réel.

**Tests réels** :
- **luau-lsp** sur le nouvel extrait de l'accueil, dans `C:\tmp\phase-ia-V4\` : 0 diagnostic en mode non strict, celui des autres extraits du site.
- **selene et StyLua**, sur une copie de `projet-reference/` :
  - `selene --version` affiche 0.32.0 et `stylua --version` 2.6.0 ;
  - `selene src` affiche `0 errors / 0 warnings / 0 parse errors` ;
  - `stylua --check src` se termine avec le code 0.
  
  Ce sont les commandes citées dans les prompts et dans la checklist 11/04.
- **Build** : `bash scripts/build-verrou.sh` se termine avec le code 0 (80 pages indexées). Le rendu de `dist/index.html` a été contrôlé.
- **Liens internes** : tous les liens `/modules/XX/slug/` du contenu et des pages ont été comparés aux fichiers existants, aucun ne manque.

**Sources ouvertes le 2026-10-25** :
- claude.com/pricing ;
- code.claude.com/docs/en/setup ;
- code.claude.com/docs/en/best-practices ;
- anthropic.com/legal/consumer-terms ;
- create.roblox.com/docs/assistant/guide ;
- référence MarketplaceService ;
- AnalyticsService ;
- creator-docs (`DataModel.yaml`, `GroupService.yaml`, `Player.yaml`, `PolicyService.yaml`, `MarketplaceService.yaml`).

**Mac** : rien de propre à Mac n'a été ajouté dans ce périmètre, hors configuration requise. « macOS 13.0+ » a été confirmé sur code.claude.com/docs/en/setup ; aucun test sur Mac n'était possible.

**Erreurs restantes non corrigées :**

Aucune.

Remarques sans correction :
- Les diagnostics de `verifier-luau` encore listés viennent tous de la phase 1, ou sont des défauts volontaires de `trouve-le-bug`.
- Les prix en dollars viennent d'une page sans date. Ils sont datés « octobre 2026 » et renvoient vers la page officielle.

### encadres-modules-00-01-09-11 — passe 2 ([rapport détaillé](verification/phase-ia/encadres-modules-00-01-09-11-passe-2.md))

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

**Désaccords avec la passe précédente :**

1. **Examen 11, `trouve-le-bug` du texte filtré.** La passe 1 dit « Un seul défaut, les lignes 5, 6 et 10 sont correctes ». Je ne suis pas d'accord : le RemoteEvent n'avait aucune limite de fréquence par joueur, et la checklist 11/04 (§3), comme les leçons 04/04 et 04/05, en font une règle. C'était donc un second défaut. Corrigé en ajoutant le délai.
2. **11/02, `trouve-le-bug` `EquiperObjet`.** La passe 1 l'a marqué OK. Or le scénario (« la traînée du Game Pass ») ne correspond pas à `projet-reference/` : le Game Pass est géré par un attribut, pas par l'inventaire. Énoncé corrigé.
3. **Renumérotation.** La passe 1 n'a vérifié que le diff. Elle n'a donc pas vu le tableau bilan de 11/05, qui était resté à l'ancienne numérotation sans le module 02. Je ne suis pas d'accord avec son « Liens internes … aucun ne manque » pris comme garantie de la renumérotation : les liens étaient justes, mais les numéros de la colonne Module ne l'étaient pas.
4. **PLAN.md.** Elle ne l'a pas relu (hors de son périmètre). Les règles communes ignoraient encore le type `ameliore-le-prompt`.

Sur tout le reste, je suis d'accord avec la passe 1, y compris avec ses corrections de l'accueil, de 01/03, 01/05, 09/04, 09/05 et 11/04.

**Erreurs restantes non corrigées :**

- **Build bloqué par `Header.astro`**, hors de ma mission : à relancer quand l'agent concerné aura terminé. Mes fichiers ne provoquent aucune erreur. `vitest` passe et `verifier-luau` ne signale rien.
- **Examens 09 à 11 à 16-17 questions**, au-dessus de la cible de 10 à 15 (le maximum du schéma est 30). Je n'ai rien supprimé : toutes les questions sont justes. La règle de PLAN.md le mentionne désormais.

### encadres-modules-03-05 — passe 1 ([rapport détaillé](verification/phase-ia/encadres-modules-03-05-passe-1.md))

71 éléments vérifiés, 4 corrigés, 3 reformulés, 0 supprimés ; quiz : 30 nouvelles questions de quiz et d’examen relues (13 `ameliore-le-prompt`, 12 `trouve-le-bug`, 5 `qcm` ; numéros de ligne recomptés un par un), 1 explication corrigée ; code : 12 exercices de lecture du module 03 relus, dont 6 extraits de Luau pur exécutés avec `luau.exe` (sorties conformes aux réponses) ; code du fil rouge inchangé (diff relu, `KillBricks.server.luau` identique au corrigé) ; `verifier-luau` 03 / 04 / 05 : uniquement des diagnostics attendus (voir plus bas) ; tests réels effectués : `luau.exe` (6 scripts), `rojo build` (Rojo 7.7.1) de l'interface décrite en `init.meta.json` + `.model.json` (structure du corrigé, puis variante avec `Boutique.model.json` imbriqué), lecture du code source du plugin Rojo (boutons Disconnect / Accept / Abort, `confirmationBehavior = "Initial"`), schémas des outils MCP de Studio sur cette machine. Aucun Studio n'est connecté : rien n'a pu être exécuté en jeu réel (scripts Roblox, prompts dans une vraie session Claude Code, suppression effective par Rojo à la connexion).

Comptage : 17 encadrés `<AvecClaudeCode>` (6 + 5 + 6) + 1 `<Prompt>` hors encadré (5.4) + 2 `<Attention>` Rojo (5.4, 5.6) + 1 `<Attention>` Rojo (3.1) + 12 exercices de lecture + 30 questions + objectifs/descriptions/intros des 6 leçons du module 03 + phrases ajoutées dans les `<Defi>` (≈ 71).

**Désaccords avec la passe précédente :**

(passe 1 : sans objet)

**Erreurs restantes non corrigées :**

- Non testable ici : exécution des scripts dans Studio, exécution réelle des prompts dans Claude Code, suppression effective des objets par Rojo à la connexion (le comportement est confirmé par la documentation et par le code du plugin, pas observé).
- Mac : aucune différence de commande dans ces ajouts, à part les raccourcis copier/coller déjà donnés pour Windows et Mac en 5.4 (non testables ici).
- Le prompt MCP de 5.4 laisse Claude Code choisir `init.meta.json` (dossier) pour toute Frame avec enfants, alors que le corrigé décrit `CompteurPieces` par un `.model.json` imbriqué : les deux formes sont valides avec Rojo 7.7.1 (testé), ce n'est pas une erreur.

### encadres-modules-03-08 — passe 2 ([rapport détaillé](verification/phase-ia/encadres-modules-03-08-passe-2.md))

97 éléments vérifiés, 4 corrigés, 8 reformulés, 0 supprimé ; quiz : 48 nouvelles questions relues (quiz et examens 03 à 08 : 22 `ameliore-le-prompt`, 18 `trouve-le-bug`, 8 `qcm`), numéros de ligne recomptés un par un, une seule bonne réponse et un seul défaut partout, aucune explication fausse ; code : `verifier-luau` 03 à 08 sans diagnostic réel (voir plus bas) ; tests réels effectués : 7 extraits de Luau pur du module 03 exécutés avec `C:\tmp\luau-tools\luau.exe` (exercices 3.1 à 3.6, quiz 3.2, 3.3, 3.4 et examen 03 ; `task` simulé par un petit ordonnanceur pour l'exercice 1 de 3.5, objet Roblox simulé pour l'exercice de 3.1), contrôle des API Roblox dans les fichiers YAML officiels de `github.com/Roblox/creator-docs` (Player, Players, GroupService, MarketplaceService, DataModel, PolicyService, Animator, Humanoid, RobloxGlobals), page Rojo Project Format. Aucun Studio n'est connecté : aucun script ni aucun prompt n'a pu être exécuté en jeu réel ou dans une vraie session Claude Code.

Cohérence d'ensemble (projet obtenu en exécutant les prompts dans l'ordre) : les remplacements sont tous explicites et justes — `Checkpoints.server.luau` supprimé par le prompt 4.5 (Progression), `Leaderstats.server.luau` par 5.2 (GestionJoueurs), `DemoAchat.client.luau` par 5.3, `TestInventaire.client.luau` par 5.4, le bloc 2 de `ScriptInterface` par 5.6, `PiecesTournantes.server.luau` par 10.4 (hors périmètre, vérifié). `DonneesJoueurs.luau` n'est modifié que là où la leçon le demande (7.3 : `achats` + version ; 8.4 : leçon), jamais en 5.3 ni en 6.4. Un seul script assigne `ProcessReceipt` (`Achats`). Les deux incohérences trouvées (démonstration `PieceTournante` en 3.6, inventaire d'exemple de 4.3 laissé en place) sont corrigées.

**Désaccords avec la passe précédente :**

- **03/01** (passe 1 : OK) : le prompt « crée uniquement Bienvenue.server.luau » visait un fichier que la leçon fait déjà créer ; corrigé.
- **03/06** (passe 1 : « aucune ligne de code de la leçon modifiée », OK) : l'ajout du nom de fichier `PieceTournante.luau` laissait le Script de démonstration sans fichier, une consigne « Enabled » fragile avec Rojo et aucun nettoyage, d'où deux systèmes de rotation des pièces dans le projet ; corrigé.
- **04/03** (passe 1 : OK) : la passe 1 n'a pas suivi le devenir des fichiers d'exemple ; `Inventaire.server.luau` / `ObtenirInventaire` restaient indéfiniment à côté de l'inventaire de `Boutique` ; corrigé.
- **05/02** (passe 1 : OK) : le prompt n'imposait pas les noms `VERSION_DONNEES` et `donneesParDefaut`, dont dépendent le prompt 7.3 et la leçon 8.4 ; corrigé.
- **04/02, 05/03, 05/05, 07/03, 08/04** (passe 1 : OK) : « ajoute le RemoteEvent … » alors que le `default.project.json` fourni en 02/02 déclare déjà ces remotes (et que le défi de 02/02 ajoute `DemanderReapparition`) ; reformulé en « ajoute-le seulement s'il manque ».
- **04/01** (passe 1 : OK) : la règle donnée à l'IA oubliait ReplicatedFirst ; reformulé.
- Aucun désaccord sur les quiz : je confirme les verdicts de la passe 1 et sa correction de l'explication de 04/02.

**Erreurs restantes non corrigées :**

Aucune erreur dans les ajouts de la phase IA. Remarques hors des ajouts (texte de la phase 1 ou corrigé, signalées sans modification) :
- 4.2 (schéma des remotes) et le `<Defi>` de 4.5 utilisent `AnnonceVictoire`, alors que le projet (02/02, 5.5, corrigé) utilise `Victoire` : un élève qui fait le défi de 4.5 puis le prompt de 5.5 aura deux scripts de victoire. À harmoniser dans le texte de la phase 1 (par exemple : défi de 4.5 sur `Victoire`, et 5.5 qui remplace ce script).
- `Pieces.server.luau` (leçon 4.5 et corrigé) garde une constante locale `VALEUR_PIECE` alors que `Config.VALEUR_PIECE` existe depuis 3.6 : c'est exactement le « réglage en double » que l'exercice 2 de 3.6 apprend à repérer. Sans effet tant que les deux valent 1.
- Le corrigé ne contient pas `Reapparition`/`DemandeReapparition` (4.2), `RetourCheckpoint` (4.4), `SourcesArrivee` (8.3) ni `RolesCommunaute` (8.5), que les leçons font créer ; le README du corrigé ne dit pas qu'ils sont facultatifs. Pas d'incohérence de fonctionnement (aucun conflit avec les autres scripts), mais l'élève qui compare son projet au corrigé verra ces fichiers en plus.
- Non testable ici : exécution des scripts dans Studio et des prompts dans Claude Code ; comportement de Rojo face à une propriété `Enabled` changée dans Studio (d'où le choix du commentaire `--[[ ]]` en 3.6). Mac : aucune commande propre à Mac dans ces ajouts.

### module-02-lecons-01-03 — passe 1 ([rapport détaillé](verification/phase-ia/module-02-lecons-01-03-passe-1.md))

162 éléments vérifiés, 12 corrigés, 9 reformulés, 0 supprimés (plus 11 sources ajoutées). Quiz : 18 questions relues (6 + 6 + 6), toutes justes ; 1 question reformulée pour lever une ambiguïté (03, `/rewind` et Bash). Code : `node scripts/verifier-luau.mjs 02` ne signale aucun diagnostic dans les leçons 01-03 (les diagnostics restants concernent 05 et 06) ; le script de démonstration imparfait de la 02 donne bien, avec luau-lsp lancé directement, `LocalUnused` et `DeprecatedApi: Function 'wait' is deprecated, use 'task.wait' instead` (voulu). Aucun Studio connecté : rien n'a été exécuté en jeu réel.

Tests réels effectués (Windows 11, Claude Code 2.1.310, Rokit 1.2.0, Rojo 7.7.1 via `rokit.toml`, selene 0.32.0, StyLua 2.6.0, Git 2.52.0.windows.1) :
- Tutoriel complet de la leçon 02, fait deux fois (`ObbyDesNuages`, puis `ObbyDesNuages2` avec les fichiers recopiés tels quels depuis la leçon corrigée) : `rokit init`, les 3 `rokit add`, `rokit list`, `rojo init` (crée bien `.git`), `Remove-Item` / `mkdir` PowerShell de la leçon, `default.project.json` de la leçon (identique au corrigé), `Bonjour.server.luau`, `rojo build` (2 Folders, 6 RemoteEvents, 1 Script), `selene src` (0/0/0), `stylua --check src` (code 0), `.gitignore` (`git check-ignore` OK), `git add .` / `git commit`.
- Messages de Rokit (`Initialized new Rokit project successfully!`, `Trust and install … ?`, `Added version … of tool …`) relus dans le code source de `rojo-rbx/rokit`.
- `rojo serve` (sortie complète, erreur de port occupé recopiée mot pour mot), `rojo syncback --input ../AncienJeu.rbxl --dry-run --list` (liste `Writing src/…`, rien d'écrit), erreur `$path` manquant et erreur `Error parsing Rojo project` (quiz 02).
- Fins de ligne : fichier CRLF → `stylua --check src` code 1 ; `git restore` avec `core.autocrlf=true` (défaut Git for Windows) recrée les fichiers en CRLF ; avec `.gitattributes` `* text=auto eol=lf` → fichiers LF, `stylua --check` code 0.
- `math.isfinite` : `std = "roblox"` → 1 erreur selene ; `std = "luau_recent"` + `luau_recent.yml` du corrigé → 0 erreur, les vrais avertissements (variable inutilisée) restent signalés.
- `rokit.toml` avec la clé `StyLua` (comme `exemples/lave-montante`) : `stylua --version` fonctionne quand même sous Windows.
- `claude mcp add --transport stdio Roblox_Studio_V1 -- cmd.exe /c %LOCALAPPDATA%\Roblox\mcp.bat` depuis PowerShell : `✔ Connected` dans `claude mcp get` et `claude mcp list` (format de ligne conforme à la leçon), puis `claude mcp remove … -s local` ; `claude mcp add --help`, `claude mcp remove --help`, `claude --help`.
- JSON : les 4 blocs (`settings.json` de la 02, les deux de la 03, l'objet hook PowerShell) passent `JSON.parse` ; `claude doctor` dans le projet de test : aucune rubrique `Invalid settings` (version Git Bash et version PowerShell du hook) ; contre-test volontairement faux → `Invalid settings … Expected array, but received string`, mais la ligne `No installation issues found.` s'affiche quand même (d'où une correction).
- Commande du hook exécutée sous Git Bash avec `CLAUDE_PROJECT_DIR` Windows, depuis un autre dossier : cas propre → 0 ; `local inutile=5` → 2, fichier reformaté en `local inutile = 5`, rapport selene sur stderr ; erreur de syntaxe → 2 + message StyLua. Variante PowerShell : mêmes trois résultats.
- Bout en bout : `claude -p … --model haiku --permission-mode acceptEdits --include-hook-events` dans le projet de test : Claude crée le fichier avec Write, `hook_response` avec `exit_code: 2`, stderr = rapport selene, fichier final reformaté, Claude rapporte l'avertissement.
- Outil PowerShell de Claude Code : avec `--setting-sources local` et une seule règle `deny` `Bash(git push *)`, la session n'a que `Bash` ; sans règle `deny`, elle a `Bash` et `PowerShell` (confirme la doc « Bash deny rules also turn off the PowerShell tool »).
- Mac : aucune machine disponible. Étapes Mac vérifiées uniquement sur les docs officielles (code.claude.com/docs/en/setup, README Rokit, git-scm.com/install/mac, create.roblox.com/docs/studio/mcp) et en raisonnant sur `sh -c` pour le hook.

Build : `bash scripts/build-verrou.sh` → code de sortie 0, relancé après la dernière modification (80 pages indexées).

**Désaccords avec la passe précédente :**

(passe 1 : sans objet)

**Erreurs restantes non corrigées :**

- **Hors périmètre, à traiter ailleurs** :
  - `exemples/lave-montante/rokit.toml` utilise la clé `StyLua = "JohnnyMorganz/StyLua@2.6.0"`, alors que la leçon 02, `projet-reference/rokit.toml` et la commande `stylua` des leçons 02/03 utilisent l'alias `stylua`. Testé : `stylua` fonctionne quand même sous Windows (et devrait fonctionner sur un Mac au système de fichiers insensible à la casse, non testé), mais le nom diffère et casserait sur un disque sensible à la casse. Je n'ai pas modifié `exemples/` (consigne).
  - `exemples/lave-montante/selene.toml` reste en `std = "roblox"` (sans `luau_recent`) ; sans conséquence tant que l'exemple n'utilise pas `math.isfinite` (vérifié : il ne l'utilise pas).
  - `projet-reference` et `exemples/lave-montante` n'ont pas de `.gitattributes` : après un clone sous Windows (`core.autocrlf=true`), `stylua --check src` y signalera tous les fichiers, alors que le README du corrigé annonce « aucune différence attendue ».
- **Non testable ici** : étapes Mac (installation de Git, Rokit, Claude Code, commande MCP `/Applications/RobloxStudio.app/Contents/MacOS/StudioMCP`, hook en `sh -c`), vérifiées seulement sur la documentation officielle ; Quick connect, plugin Rojo dans Studio, fenêtre de synchronisation et outils MCP en jeu réel (pas de Studio piloté pendant la vérification) ; `rojo plugin install` non lancé (il aurait écrasé le plugin de la machine).
- Le nom exact du serveur écrit par le Quick connect (`Roblox_Studio` sur cette machine) n'est documenté nulle part : la leçon 02 invite désormais à le vérifier avec `claude mcp list`.

### module-02-lecons-01-05 — passe 2 ([rapport détaillé](verification/phase-ia/module-02-lecons-01-05-passe-2.md))

152 éléments vérifiés, 6 corrigés, 7 reformulés, 0 supprimé (3 sources ajoutées, 1 remplacée). Quiz : 30 questions relues (6 par leçon), toutes justes ; 1 explication reformulée (03, question 3). Code : 1 vrai défaut multijoueur corrigé (survivants bloqués dans l'arène après une erreur), 1 risque de pause de streaming traité par une consigne de décor ; leçon 05 et `exemples/lave-montante/` restent identiques octet pour octet (6 scripts, `default.project.json`, `GDD.md`, et le test Lune de la leçon 06).

Tests réels effectués (Windows 11, PowerShell 5.1, Claude Code 2.1.310, Rokit 1.2.0, Rojo 7.7.1 via `rokit.toml`, selene 0.32.0, StyLua 2.6.0, Lune 0.11.1, luau-lsp 1.70.1, Git 2.52.0.windows.1 avec `core.autocrlf=true` système) :
- **Tutoriel de la leçon 02 suivi à la lettre** dans `C:\tmp\phase-ia-w1\ObbyDesNuages`, blocs extraits automatiquement de la leçon (aucune retouche) : `pwd`, `rokit init`, les 3 `rokit add`, `rokit list` (sortie identique à la leçon), `rojo init` (sortie identique, crée `.git`, plus un `README.md` non cité, sans conséquence), `Remove-Item` + `mkdir` PowerShell (fonctionne, mais affiche un tableau de dossiers non annoncé → corrigé), `default.project.json` de la leçon → `rojo build` (2 Folders, 6 RemoteEvents, Script `Bonjour`), `rojo serve` (sortie identique), fichiers de configuration créés en CRLF comme le ferait VS Code, `selene src` / `stylua --check src` (0/0/0, code 0), script imparfait (selene : `unused_variable` ; StyLua : diff sur tout le fichier en CRLF, conforme à l'encadré Erreur ; luau-lsp : `LocalUnused` + `DeprecatedApi … use 'task.wait'`), `stylua src` convertit bien en LF, `.gitignore` + `.gitattributes` → avertissements `CRLF will be replaced by LF` (identiques à la leçon), commit `[master (root-commit) …]`, `git check-ignore` OK.
- Quiz 02 : erreurs `Could not start the Rojo server on 127.0.0.1:34872. The address may already be in use or reserved.` (deux `rojo serve`) et `Rojo project referred to a file using $path that could not be turned into a Roblox Instance` (dossier `Modules` supprimé) reproduites mot pour mot ; option `--port` confirmée par `rojo serve --help`.
- MCP : `claude mcp add --transport stdio --scope user Roblox_Studio_W1 -- cmd.exe /c %LOCALAPPDATA%\Roblox\mcp.bat` tapé dans PowerShell → `Added stdio MCP server … to user config`, `claude mcp list` → `… - ✔ Connected` (format de la leçon), puis `claude mcp remove Roblox_Studio_W1 -s user` (configuration de test retirée).
- **Tutoriel de la leçon 03** : `claude --version` → `2.1.310 (Claude Code)` ; `claude doctor` → se termine bien par `No installation issues found.` puis le conseil `/doctor` ; CLAUDE.md du modèle (62 lignes), skill, sous-agent et les 4 blocs JSON (02 et 03) → `JSON.parse` OK ; les deux `settings.json` ont exactement les mêmes permissions ; commande du hook lancée sous Git Bash avec `CLAUDE_PROJECT_DIR` Windows : propre → 0 ; `local inutile=5` → code 2, fichier reformaté en `local inutile = 5`, rapport selene sur stderr ; **bout en bout** : `claude -p "Avec l'outil Write, crée … local inutile=5 …" --model haiku --permission-mode acceptEdits --include-hook-events` dans le projet de test → `exit_code: 2`, Claude rapporte le `warning[unused_variable]`, fichier final reformaté. Installation de Claude Code et de Rokit non relancée (déjà installés) : scripts `install.ps1` / `install.sh` de Rokit et code de `self-install` lus à la place.
- **Lave Montante** : script `C:\tmp\phase-ia-w1\verif-lave.sh` (copie du dossier, `rokit install`, `rojo build`, `rojo sourcemap`, `luau-lsp analyze` avec sourcemap et types Roblox sur `src` et `tests` : 0 diagnostic, `selene src` et `selene tests` : 0/0/0, `stylua --check src tests` : code 0, `lune run tests/ReglesRound.spec.luau` : 12 OK) avant et après correction.
- **Simulation multijoueur hors Studio** (`C:\tmp\phase-ia-w1\simu\simu.luau`, Lune) : les vrais `GestionRounds.server.luau`, `Leaderstats.server.luau`, `Lave.luau`, `Config.luau`, `ReglesRound.luau` chargés tels quels avec des instances, signaux (`Died`, `PlayerAdded`, `PlayerRemoving`), horloge et réapparition simulés. Scénario « base » (3 rounds, 2 puis 3 joueurs) : joueur immobile éliminé à 11 s de round (calcul attendu : 5 + 55 × 4,5/40 = 11,2 s), grimpeur survivant 50 pièces + 1 victoire par round, joueuse arrivée en plein round restée au lobby puis participante au round suivant, départ en plein round sans erreur, survivant ramené au lobby, aucune Part `Lave` entre les rounds, aucune connexion `Died` du script restée active. Scénario « erreur » (erreur levée dans `Lave.mettreAHauteur` au milieu du round) : **avant correction, le survivant restait à Y = 45 dans l'arène** ; après correction, il est ramené au lobby, la lave est détruite et le round suivant se joue normalement.
- `node scripts/verifier-luau.mjs 02` : seuls diagnostics des leçons 01-05 = `Unknown require` attendus (05, blocs 6 et 7 : modules définis dans d'autres blocs ; l'analyse du dossier avec sourcemap donne 0).
- Mac : aucune machine. Étapes Mac vérifiées sur les sources officielles uniquement : code.claude.com/docs/en/setup (`curl -fsSL https://claude.ai/install.sh | bash`, macOS 13+), README et `scripts/install.sh` de Rokit (ajoute `. "$HOME/.rokit/env"` à `~/.zshenv`, demande de redémarrer le terminal), git-scm.com/install/mac (`xcode-select --install`), support.apple.com (Spotlight `Cmd`+`Espace`), create.roblox.com/docs/studio/mcp (chemin `StudioMCP`).
- Aucun Studio connecté : plugin Rojo, fenêtre de synchronisation, Quick connect, outils MCP et le jeu Lave Montante n'ont pas été exécutés dans Studio.

Build : `bash scripts/build-verrou.sh` → code de sortie 0, relancé après la dernière modification (un premier essai avait échoué sur `src/components/layout/Header.astro`, fichier d'un autre agent, corrigé entre-temps).

**Désaccords avec la passe précédente :**

- **Défaut « mineur » (1) de la passe V2** (survivants laissés dans l'arène après une erreur) : pas mineur. Si l'erreur survient et qu'il n'y a plus assez de joueurs, les survivants restent dans l'arène sans limite de temps (la phase repasse en Attente). Corrigé ; la correction ne demandait qu'un déplacement de quelques lignes et une phrase dans le prompt de la tâche 7.
- **Défaut (2) de la passe V2** (lave saccadée) : je ne le considère pas comme un défaut à corriger par un tween serveur, solution que Roblox déconseille. Un pas de 0,15 stud toutes les 0,2 s reste régulier ; une explication a été ajoutée.
- **Streaming** : ni la passe 1 ni le rédacteur ne l'avaient pris en compte, alors que l'instance streaming est activée par défaut et que le serveur téléporte les joueurs vers une arène « loin du lobby ».
- **Passe V1, leçon 01** : la source `https://claude.com/pricing/max` était notée « OK » ; elle redirige aujourd'hui (308) vers `/pricing`.
- **Passe V1, leçon 03** : « mode de départ `auto` depuis 2.1.283 » noté OK avec le CHANGELOG 2.1.283/2.1.284 ; le CHANGELOG place la généralisation en 2.1.284 et la documentation en 2.1.283 (contradiction des sources officielles) : formulation assouplie.
- **Passe V1, leçon 03** : citation « deterministic and guarantee the action happens » attribuée à hooks / hooks-guide ; elle vient de best-practices (la leçon dit « la documentation » et cite best-practices dans ses sources : pas de changement).
- **Passe V1, leçon 02** : messages de Rokit « relus dans le code source », mais le message Windows « Please restart your computer » de l'installation n'avait pas été confronté à la consigne de la leçon.

**Erreurs restantes non corrigées :**

- Non testable ici : étapes Mac (installation de Git, Rokit, Claude Code, commande MCP Mac, hook en `sh -c`) ; plugin Rojo, fenêtre de synchronisation, Quick connect et outils MCP dans Studio ; le jeu Lave Montante en vrai (la simulation Lune reproduit la logique du serveur, pas le moteur : physique, réplication, streaming).
- Lave Montante : animation de la lave non interpolée côté client (choix expliqué dans la leçon) ; pendant les 5 s de répit, le bandeau affiche déjà « La lave monte ! » (texte fixé par le GDD, sans conséquence de jeu).
- Contradiction entre la documentation des modes (2.1.283) et le CHANGELOG (2.1.284) sur la version qui démarre en `auto` partout : signalée, la leçon ne donne plus de numéro unique.

### module-02-lecons-04-06 — passe 1 ([rapport détaillé](verification/phase-ia/module-02-lecons-04-06-passe-1.md))

71 éléments vérifiés, 12 corrigés, 5 reformulés, 0 supprimés ; quiz : 18 questions vérifiées (6 + 6 + 6), dont 5 `trouve-le-bug` (un seul défaut chacun, numéros de ligne recomptés : exacts) et 3 `ameliore-le-prompt`, aucune modification nécessaire ; code : les 6 scripts de la leçon 05 et le fichier de test de la leçon 06 sont identiques octet pour octet aux fichiers de `exemples/lave-montante/` (diff), le `default.project.json` ajouté à la leçon 05 aussi ; `GDD.md` resynchronisé avec la leçon. Tests réels effectués (dossier `C:\tmp\phase-ia-v2p1\`) : `rojo build` (7.7.1) OK, `rojo sourcemap` + `luau-lsp analyze` 1.70.1 avec types Roblox : 0 diagnostic (src et tests), `selene src` / `selene tests` 0 avertissement, `stylua --check src tests` code 0, `lune run tests/ReglesRound.spec.luau` 12 OK code 0, test volontairement cassé (`== 1`) : 11 OK / 1 RATÉ, code 1, sortie identique à la leçon ; sorties selene / luau-lsp citées dans la leçon 06 reproduites ; sous-agent `relecteur-roblox` (version complète de la leçon 06) réellement lancé avec `claude -p` (Claude Code 2.1.310, modèle haiku) sur une copie du projet : reconnu, lecture seule, rapport au format demandé (« Aucun problème critique ») ; `rojo build` sans les dossiers `src/...` : erreur « could not be turned into a Roblox Instance » (confirme l'ajout dans la leçon 05). `node scripts/verifier-luau.mjs 02` : seuls diagnostics de mes leçons = « Unknown require » attendus (modules définis dans d'autres blocs, `require("../src/…")` de Lune). Build : `bash scripts/build-verrou.sh` code 0. Aucun Studio connecté : l'exécution en jeu réel est impossible, le raisonnement d'exécution est fait à la lecture. Pas de Mac : rien de spécifique Mac dans ces trois leçons (les commandes `rokit`, `lune`, `git` sont identiques).

**Erreurs restantes non corrigées :**

- Limites mineures du code de Lave Montante, laissées volontairement (le code respecte le GDD et les prompts ; les changer imposerait de réécrire prompts, code et leçon) : (1) si une erreur survient au milieu d'un round, `nettoyerRound` vide la liste et détruit la lave mais ne ramène pas les survivants au lobby : ils attendent dans l'arène jusqu'au round suivant (le jeu continue, rien ne fuit) ; (2) la lave est redimensionnée 5 fois par seconde par le serveur, d'où un mouvement un peu saccadé côté client ; (3) pendant les 5 s de répit, le bandeau affiche déjà « La lave monte ! » ; (4) l'élimination se fait quand le dessus de la lave dépasse la HumanoidRootPart (environ 3 studs au-dessus des pieds), ce que la leçon dit bien (« centre du personnage »). Le sous-agent relecteur lancé pour le test n'a rien relevé de critique non plus.
- Jeu non exécuté dans Studio (aucun Studio connecté) : comportement de `Touched` sur un personnage immobile, téléportation `PivotTo` et affichage non observés en vrai.
- Les pages HTML de certaines classes de la référence Roblox (WorldRoot, BasePart, Instance, DataModel) renvoyaient 502 au moment du contrôle ; leur contenu a été vérifié via la variante `.md` et le dépôt creator-docs.

### module-02-lecons-06-10 — passe 2 ([rapport détaillé](verification/phase-ia/module-02-lecons-06-10-passe-2.md))

131 éléments vérifiés, 8 corrigés, 7 reformulés, 0 supprimés ; quiz : 30 questions de leçons relues (6 × 5) et les 18 questions de l'examen vérifiées une par une (première vérification de l'examen), 1 `trouve-le-bug` de l'examen réécrit (Q15 : second défaut), lignes recomptées et réponse unique confirmée partout ; code : `node scripts/verifier-luau.mjs 02` (49 extraits) sans diagnostic réel pour les leçons 06-10 et l'examen (seuls des « Unknown require » attendus : require relatif de Lune, modules définis ailleurs), tous les extraits `trouve-le-bug` des leçons 06, 07, 08, 10 et de l'examen repassés en `--!strict` avec luau-lsp 1.70.1 (seuls des rétrécissements de type `Instance`/`unknown` sans effet à l'exécution, plus le défaut voulu là où il s'agit d'une API : `SetWalkSpeed`, `LoadAnimation`, `SetPrimaryPartCFrame`), raisonnement d'exécution ligne par ligne ; tests réels effectués (dossier `C:\tmp\phase-ia-w2\`) : luau-lsp par défaut et strict sur un fichier d'API dépréciées, Lune 0.11.1 sur `exemples/lave-montante` (12 OK, puis règle `recompense` cassée : 11 OK / 1 RATÉ, sortie `…\tests/ReglesRound.spec:40: Des tests ont échoué` + `[Stack Begin]…[Stack End]` identique à la leçon), selene sur le nouvel extrait Q15 (0 avertissement), `git status --short` vs `--untracked-files=all` dans un dépôt jetable (git 2.52), `rojo syncback --help` (Rojo 7.7.0-rc.1), lecture des YAML de la référence de l'API (github.com/Roblox/creator-docs, branche main : tags `Deprecated` et `deprecation_message`), `.md` de la documentation Claude Code (sub-agents, code-review-local, ultrareview, commands, permission-modes, permissions, tools-reference, checkpointing, best-practices, skills) et des bonnes pratiques de prompt (platform.claude.com), textes des Terms of Use actuels et du 1er novembre 2026 via l'API du Help Center Roblox, `gh api` (REST + GraphQL `archivedAt`) pour les frameworks de test, api.wally.run. `npx vitest run tests/unit/donnees-quiz.test.ts` : 8 tests OK. Build `bash scripts/build-verrou.sh` : code 0. Aucun Studio connecté : aucune exécution en jeu réel ; pas de Mac (rien de propre au Mac dans ces leçons hors `Cmd+C`/`Cmd+Z`, vérifiés sur la documentation).

**Désaccords avec la passe précédente :**

- **Leçon 07 (passe 1 : OK)** : la phrase « les points de restauration ne suivent pas les fichiers modifiés par des commandes du terminal » est plus large que la documentation, qui ne vise que les fichiers modifiés **uniquement** par Bash. Reformulée (texte et explication du vrai-faux).
- **Leçon 10 (passe 1 : « cohérence avec 04/05, 05/02, 05/03… OK »)** : trois prompts s'écartaient des leçons techniques sur un point qui produit un vrai bug si Claude suit le prompt à la lettre : replacement de réapparition sans la précaution du module 4 (Checkpoints), débit et possession non localisés (Boutique), `SauvegarderTout` et compteur de sauvegardes absents (Sauvegarde). Et `git status --short` cache les fichiers d'un nouveau dossier (Lancer la revue). Corrigés.
- **Leçon 06 (passe 1 : Jest Roblox 3.20.0)** : la version publiée sur Wally est maintenant 3.20.1 (mise à jour récente probable, pas une erreur de la passe 1 à sa date).
- **Leçon 08 (passe 1 : `TeleportService:Teleport` et `Chat` « marqués Deprecated »)** : d'accord sur le fond (les pages de référence affichent « Deprecated », vérifié), mais les YAML sources n'ont pas le tag `Deprecated`, seulement un `deprecation_message`. Rien à changer dans la leçon.
- **Examen (notes du rédacteur, non vérifié en passe 1)** : Q15 affirmait « Il fonctionne » alors que le module 4 explique que ce placement est écrasé (second défaut) ; Q6 contredisait l'astuce PowerShell de la leçon 03 ; le rédacteur indiquait que luau-lsp signale `SetPrimaryPartCFrame` « en mode par défaut ET strict », ce qui ne vaut que si la variable est typée `Model`.

**Erreurs restantes non corrigées :**

- Aucune erreur connue dans le périmètre.
- Limites de la vérification : aucun Studio connecté (comportement réel de `Touched`, des piles d'appels de l'Output, du `PivotTo` différé et des prompts de la bibliothèque non exécutés en jeu) ; aucun Mac (raccourcis `Cmd+C`, `Cmd+Z`, `Ctrl+G` de VS Code vérifiés sur la documentation seulement) ; les prompts de la leçon 10 n'ont pas été envoyés à Claude Code (relecture seulement). Les pages HTML de certaines grosses classes de la référence Roblox répondent 502 et le Help Center 403 aux robots : contenu vérifié via les YAML de creator-docs et l'API du Help Center ; liens conservés.

### module-02-lecons-07-10 — passe 1 ([rapport détaillé](verification/phase-ia/module-02-lecons-07-10-passe-1.md))

152 éléments vérifiés, 11 corrigés, 11 reformulés, 1 supprimé ; quiz : 24 questions relues (6 + 6 + 6 + 6), 1 `trouve-le-bug` corrigé (second défaut retiré, leçon 10), lignes et réponses uniques confirmées ; code : `node scripts/verifier-luau.mjs 02` sans diagnostic réel dans les leçons 07-10 (seuls des « Unknown require » attendus sur deux extraits de la leçon 08, faute de sourcemap), extraits de la leçon 07 et quiz de combat relus aussi en `--!strict` ; tests réels effectués : luau-lsp 1.70.1 (mode par défaut et `--!strict`) sur 4 fichiers de test, selene 0.32.0 installé avec `rokit add Kampfkarren/selene`, `git status / diff / restore / stash / stash -u / stash pop / log` dans un dépôt jetable (`C:\tmp\phase-ia-v5\git`, git 2.52.0.windows.1), téléchargement des YAML de la référence de l'API (`github.com/Roblox/creator-docs`, branche main) et lecture des champs `tags` / `deprecation_message`, texte des Terms of Use actuels et du 1er novembre 2026 via l'API du Help Center. Aucun Studio n'a été utilisé : l'exécution en jeu réel n'a pas été testée (format exact des piles de l'Output repris du test du rédacteur R4 et du raisonnement sur les numéros de ligne). Mac : raccourcis vérifiés seulement sur la documentation (VS Code `Ctrl+G`, Claude Code `Shift+Tab`).

**Désaccords avec la passe précédente :**

(passe 1 : sans objet)

**Erreurs restantes non corrigées :**

- Format exact des piles d'appels de l'Output (`Script 'ServerScriptService.BonusVitesse', Line 7`) : non reproduit dans Studio par ce vérificateur (aucun Studio utilisé) ; il s'appuie sur le test MCP du rédacteur R4 et sur le format connu de Roblox. À confirmer en passe 2 si un Studio est disponible.
- Raccourcis Mac (`Ctrl+G` dans VS Code, `Shift+Tab` dans Claude Code) : vérifiés sur la documentation seulement, pas sur une machine Mac.

# Résumés par module (phase 1)

Les rapports de la phase 1 ont été écrits avant l'insertion du module 02 : à l'intérieur, l'ancien module N (N ≥ 2) correspond au nouveau module N + 1.

## Module 00

### Passe 1 — [rapport détaillé](verification/module-00-passe-1.md)

Environ 95 affirmations vérifiées (5 leçons + examen), 16 corrigées ou reformulées, 0 supprimée ; 8 sources ajoutées. Quiz : 26 questions de leçon + 15 d'examen relues, 0 réponse fausse, 3 explications corrigées (formulation). Code : `verifier-luau 00` → 4 extraits, diagnostics uniquement sur les 2 `trouve-le-bug` de l'examen (bugs volontaires, lignes correctes) ; l'extrait `+` de la leçon 01 provoque bien une erreur à l'exécution (arithmétique sur une chaîne non numérique).

Pages officielles lues en texte brut (curl des versions `.md` de create.roblox.com, `last_updated` 2026-10-23 ; API JSON du DevForum et du centre d'aide, car WebFetch reçoit des 403).

**Erreurs restantes non corrigées :**

- Aucune erreur de fond connue.
- À surveiller : la page create.roblox.com « Turn your creativity into income » affiche encore les chiffres DevEx 2025 (35 000 / 1 550 $) alors que le Newsroom de septembre 2026 donne > 42 000 / ≈ 1 500 $. La leçon cite les deux, avec leur date.
- Les Terms of Use lus sont la version « Effective Date: November 1, 2026 » (publiée, pas encore en vigueur au 24/10). Les points cités (accord parental, Robux contenu numérique, portée des Creator Terms) sont identiques ou décrits pour les deux versions.
- Build : `bash scripts/build-verrou.sh` passe (code 0, 69 pages indexées) après correction par un autre agent d'une erreur temporaire dans `module-05/01-core-loop.mdx`.

### Passe 2 — [rapport détaillé](verification/module-00-passe-2.md)

Environ 100 affirmations revérifiées sur source officielle (5 leçons + examen), 17 corrigées / reformulées / simplifiées, 0 supprimée sur le fond (2 passages chiffrés allégés). Quiz : 26 questions de leçon + 15 d'examen relues : 0 réponse fausse ; 1 question d'examen désambiguïsée, 1 explication simplifiée. Code : `verifier-luau 00` → 4 extraits, diagnostics uniquement sur les 2 `trouve-le-bug` de l'examen (bugs volontaires, numéros de ligne exacts) ; extrait d'aperçu de la leçon 01 complété d'une note sur l'absence d'anti-rebond. Sources : 1 lien mort remplacé, 1 lien redirigé mis à jour, 6 sources ajoutées. Build `build-verrou.sh` : code 0 (69 pages).

Méthode : versions `.md` de create.roblox.com (curl), API JSON du DevForum et du centre d'aide, texte des pages Newsroom ; contrôle du code HTTP de chaque lien de `<Sources>` (WebFetch confirme le 404 du lien mort).

**Désaccords avec la passe précédente (tranchés par la passe 2) :**

- **« Toutes les autres sources existantes ont été ouvertes… (aucun lien mort) »** : faux pour `https://create.roblox.com/docs/creator-hub`, dont la page HTML renvoie 404 (seule la version `.md` existe). Remplacé.
- **Lien « earning-on-roblox »** jugé OK : il fonctionne, mais par double redirection vers `docs/monetize` ; URL mise à jour.
- **Leçon 04, « mise à jour en octobre 2026 »** laissé tel quel : le `last_updated` est commun à toutes les pages (date de génération), ce n'est pas une preuve de mise à jour du contenu.
- **Leçon 04, « de tes amis »** non relevé : contresens sur la source « friends ».
- **Leçon 03, fréquence des témoignages DevForum** (« répondent souvent », « les plus cités ») jugée OK : un seul fil de 2020 ne permet pas d'affirmer une fréquence.
- **Examen Q5** : la passe 1 a introduit « participaient à DevEx sur les douze mois clos le 30 juin 2026 », attribution de période inexacte (elle porte sur la médiane).
- **Examen Q9** : ambiguïté sur la provenance des joueurs non relevée.
- **Clarté** : la passe 1 a ajouté des chiffres (double série DevEx 2025/2026, remplacement de QPTR, double description des Creator Terms) qui alourdissaient des leçons pour débutants ; allégés ici sans perte d'exactitude.
- **Roblox Plus** absent de la liste des revenus alors que docs/monetize le liste ; ajouté.

**Erreurs restantes non corrigées :**

- Aucune erreur de fond connue.
- À surveiller : les Terms of Use lus sont la version « Effective Date: November 1, 2026 » (pas encore en vigueur au 24/10/2026) ; les points cités sont généraux et identiques dans l'esprit.
- Hors périmètre (signalé, non modifié) : `src/data/modules.ts` décrit le module 6 avec « Premium Payouts », programme déprécié depuis le 24/07/2025 (remplacé par Creator Rewards).

## Module 01

### Passe 1 — [rapport détaillé](verification/module-01-passe-1.md)

94 affirmations vérifiées (interface, menus, onglets, boutons, modes de test, raccourcis, API, publication, collaboration) : 81 OK, 12 corrigées ou reformulées, 0 supprimée ; 1 vérifiée sans pouvoir être testée (recherche `is:LuaSourceContainer`, Studio non disponible), reformulée avec une solution de repli.
Quiz : 30 questions de leçon et 15 questions d’examen relues ; 1 question d’examen reformulée (Q12, Transparency). Les 5 `trouve-le-bug` ont bien un seul bug réel, et les numéros de ligne sont corrects.
Code : `node scripts/verifier-luau.mjs 01` → 9 extraits, 0 diagnostic. Build `bash scripts/build-verrou.sh` : code de sortie 0.
Sources : toutes les pages create.roblox.com ont été lues dans leur version Markdown (`/docs/en-us/<chemin>.md`, `last_updated: 2026-10-23`). Les liens ont été vérifiés un par un avec curl : 200 partout, sauf les pages HTML de la référence API Instance, Players, SpawnLocation et Workspace, qui renvoient 502 à curl (pages très lourdes). Leurs versions `.md` répondent 200 et sont à jour : les liens sont donc gardés.

**Erreurs restantes non corrigées :**

- Aucune erreur connue. Deux points ne sont pas vérifiables sans Studio (aucune instance connectée au MCP) et sont formulés prudemment avec un repli : la recherche `is:LuaSourceContainer` (leçon 02) et les touches de la caméra sur clavier AZERTY (leçon 01).
- Les pages HTML de la référence API Instance, Players, SpawnLocation et Workspace renvoient 502 à curl, mais leurs versions `.md` officielles répondent 200 (`last_updated` 2026-10-23). Les liens sont gardés ; une passe suivante peut les recontrôler dans un navigateur.

### Passe 2 — [rapport détaillé](verification/module-01-passe-2.md)

102 éléments revérifiés sur les pages officielles actuelles (versions `.md` de create.roblox.com, `last_updated: 2026-10-23`) : interface, menus, modes de test, raccourcis, propriétés, API, publication, collaboration. 93 OK, 8 corrigés ou reformulés, 1 supprimé (lien DevForum AZERTY).
Quiz : les 30 questions de leçon et les 15 questions d’examen ont été relues. 1 distracteur a été remplacé (03-Q3) et 1 explication ajustée (01-Q3). Les 5 `trouve-le-bug` ont été recomptés ligne par ligne : chacun contient un seul bug, et les numéros de ligne cités sont les bons.
Code : `node scripts/verifier-luau.mjs 01` analyse 9 extraits, sans aucun diagnostic. J’ai aussi raisonné sur l’exécution réelle : bons emplacements (Script dans ServerScriptService, Command Bar hors test), `FindFirstChild` protégé par `if`, aucune API dépréciée, avertissement « infinite yield » de `WaitForChild` après 5 s confirmé par la référence Instance.
Build : `bash scripts/build-verrou.sh` se termine avec le code de sortie 0.
Studio : le MCP Roblox Studio ne voyait aucune instance connectée, donc rien n’a pu être testé dans l’interface.

**Désaccords avec la passe précédente (tranchés par la passe 2) :**

- **« experiences »** : la passe 1 dit avoir retiré l’affirmation historique non sourcée (« Roblox a longtemps appelé… »). Elle était pourtant toujours dans le texte (« Pendant plusieurs années, Roblox a appelé… »). Je l’ai reformulée.
- **AZERTY** : la passe 1 gardait le fil DevForum du staff comme appui. Ce fil parle des KeyCodes en jeu (`GetStringForKeyCode`), pas de la caméra de Studio : il n’étaye rien ici. Lien retiré, texte simplifié et concret.
- **`is:LuaSourceContainer`** : la passe 1 le gardait avec une solution de repli. LuaSourceContainer est NotBrowsable, ce qui rend son support incertain, et c’est un détail inutile pour un débutant. J’ai remplacé par `is:Script or is:ModuleScript`, qui ne repose que sur la syntaxe documentée.
- **Sauvegarde auto « toutes les quatre minutes »** : la passe 1 a ajouté ce chiffre, mais la même page dit aussi 5 minutes. La formulation est maintenant prudente.
- **Quiz 03-Q3** : la passe 1 avait validé ce distracteur, alors qu’il reposait sur un comportement de Studio non documenté. Je l’ai remplacé.

**Erreurs restantes non corrigées :**

- Aucune erreur connue.
- Pas vérifiable sans Studio (aucune instance MCP connectée) : les touches réelles de la caméra sur AZERTY. Le texte reste prudent et propose de tester les deux jeux de touches.
- `is:Script or is:ModuleScript` découle de la documentation (`is:` couvre les sous-classes, et `or` est supporté) mais n’a pas été testé en direct.

## Module 03

### Passe 1 — [rapport détaillé](verification/module-03-passe-1.md)

94 affirmations ou éléments vérifiés, 14 corrigés ou reformulés, 0 supprimé, 7 compléments ajoutés (sources et précisions).
Quiz : 35 questions de leçon + 14 questions d’examen vérifiées. 1 erreur factuelle corrigée (message d’erreur de l’examen q13). 1 énoncé reformulé (leçon 03, quiz 5 : le message « Script timeout » n’est pas documenté officiellement). Les 9 `trouve-le-bug` contiennent chacun un seul bug, à la ligne indiquée.
Code : `node scripts/verifier-luau.mjs 02` donne 62 extraits et 7 diagnostics, tous attendus (bugs volontaires et `Unknown require` des extraits isolés). Les comportements de Luau pur ont été réexécutés avec `C:\tmp\luau-tools\luau.exe`. Studio n’était pas connecté (`list_roblox_studios` vide), donc pas de test du checkpoint en jeu. Build `bash scripts/build-verrou.sh` : code de sortie 0.

Méthode : les pages officielles ont été téléchargées en Markdown (`create.roblox.com/docs/…​.md`, mises à jour le 2026-10-23) et lues. luau.org/syntax et luau.org/types ont été lues avec WebFetch. Les 3 fils DevForum cités ont été ouverts.

**Erreurs restantes non corrigées :**

- Le checkpoint de la leçon 05 n’a pas pu être testé en jeu : aucune instance Studio n’est connectée. Le raisonnement repose sur l’ordre de chargement documenté. À tester en passe 2 si Studio est disponible.
- Le mode d’analyse par défaut réellement appliqué par Studio n’est pas précisé dans la doc Roblox (`LuauTypeCheckMode.Default` = « engine-default »). Le texte cite donc la doc Luau, sans affirmer le comportement de Studio.

### Passe 2 — [rapport détaillé](verification/module-03-passe-2.md)

102 affirmations ou éléments vérifiés. 12 corrigés, reformulés ou précisés, 0 supprimé.
Quiz : 31 questions de leçon et 14 questions d'examen revérifiées. Elles sont toutes justes. Les 6 `trouve-le-bug` de leçon et les 3 de l'examen contiennent chacun un seul bug, et les numéros de ligne ont été recomptés un par un.
Code : 22 comportements Luau ont été réexécutés avec `C:\tmp\luau-tools\luau.exe`, y compris tous les messages d'erreur cités. `node scripts/verifier-luau.mjs 02` analyse 62 extraits : 7 ont des diagnostics, tous attendus (bugs volontaires, variable hors de portée volontaire, `Unknown require` des extraits isolés).
Le mot-clé `const` est **conservé**. Il est documenté par Roblox (luau/variables, mise à jour le 2026-10-23) et par luau.org/syntax, et le RFC a le statut « Implemented ». L'annonce officielle « [Beta] if local Statements » (staff, 2026-10-06) le traite comme une syntaxe acquise.
Build `bash scripts/build-verrou.sh` : code de sortie 0.
Studio n'est pas connecté (`list_roblox_studios` vide). Le checkpoint n'a donc pas pu être testé en jeu.

Méthode : les pages create.roblox.com ont été lues en version `.md` (`last_updated` 2026-10-23), luau.org/syntax, /types et /library en HTML. Les fils DevForum ont été lus en JSON, ainsi que le RFC `const-keyword.md` sur GitHub (luau-lang/rfcs).

**Désaccords avec la passe précédente (tranchés par la passe 2) :**

- Aucun désaccord sur les faits. Les corrections de la passe 1 ont été revérifiées et sont justes : `#` en octets, `{{` et `\{`, message de q13, reformulation « Script timeout », test `IsDescendantOf`, et ajout de `const`, qui est bien en production.
- La passe 1 a laissé passer plusieurs points de **progressivité** pour un débutant : `task.spawn` utilisé avant d'être expliqué, syntaxe `{[cle] = true}` jamais présentée, `math.random` et `os.clock` non définis, étape `require` manquante pour brancher `Config` dans `Checkpoints`, exemple `Workspace`/`workspace` source de confusion.
- Elle a aussi laissé passer deux points de **cohérence entre modules** : l'Info sur les pièces « ramassées » retirées du dossier contredit le module 3, et rien ne demandait de réactiver `PiecesTournantes` après la démo POO, alors que les modules 3 et 9 le réutilisent.

**Erreurs restantes non corrigées :**

- Le retour au checkpoint (leçon 05) n'a toujours pas été testé en jeu : aucune instance Studio n'est connectée. Le raisonnement s'appuie sur l'ordre de chargement documenté et sur le même motif qu'au module 3.

## Module 04

### Passe 1 — [rapport détaillé](verification/module-04-passe-1.md)

71 affirmations ou éléments vérifiés (5 leçons, 25 questions de quiz de leçon, 15 questions d'examen, 34 extraits de code) : 8 corrigés ou reformulés, 0 supprimé. Quiz : 40 questions vérifiées, 1 extrait `trouve-le-bug` complété (sans décalage des numéros de ligne), 1 explication reformulée. Code : 1 API dépréciée remplacée (`LoadCharacter` → `LoadCharacterAsync`), 1 condition de course corrigée (réapparition au checkpoint), 1 script de test rendu déterministe. `verifier-luau 03` : 6 extraits avec diagnostics, tous attendus (require de ModuleScripts définis ailleurs, extrait d'examen volontairement partiel). Build : OK (code de sortie 0).

Pages consultées le 2026-10-24 (format `.md` de create.roblox.com, `last_updated` 2026-10-23), plus l'annonce officielle du DevForum sur Server Authority.

**Erreurs restantes non corrigées :**

- Aucune dans le module 03.
- Remarque hors périmètre (non modifiée) : `Player:LoadCharacter()` est dépréciée ; si d'autres modules l'utilisent, à signaler à leurs vérificateurs.
- La page officielle `scripting/security/network-ownership` dit encore que Server Authority est « currently in beta », alors que l'annonce officielle du 9 juillet 2026 indique le lancement pour tous les jeux : le texte suit l'annonce, plus récente.
- Les tests 2 et 3 de la leçon 05 et le motif de réapparition n'ont pas pu être exécutés dans Studio. Le raisonnement s'appuie sur l'ordre de chargement documenté dans la référence `Player`.

### Passe 2 — [rapport détaillé](verification/module-04-passe-2.md)

78 affirmations ou éléments vérifiés (5 leçons, 25 questions de quiz, 15 questions d'examen, 34 extraits de code, 24 liens `<Sources>`) : 9 corrigés ou reformulés, 0 supprimé. Quiz : 40 questions revérifiées, 1 option reformulée (ambiguïté sur InvokeClient) ; les 8 `trouve-le-bug` (1 par leçon, plus q6, q9 et q14 de l'examen) ont été recomptés ligne par ligne : tous corrects, aucun décalage introduit par mes modifications. Code : aucun bug d'exécution bloquant trouvé ; identifiants du `Catalogue` alignés sur le module 4 ; 4 indications ajoutées pour un débutant (remotes à créer, téléportations et détecteur). `verifier-luau 03` : 6 extraits avec diagnostics, tous attendus (require de ModuleScripts définis ailleurs ; q14 de l'examen volontairement partielle). Build : OK (code de sortie 0).

Méthode : pages `.md` de create.roblox.com téléchargées et lues directement (`last_updated` 2026-10-23), JSON de l'annonce DevForum lu en entier (auteur : `welblander`, titre « Roblox Staff », publié le 2026-07-09). Tous les liens `<Sources>` répondent (les 4 pages de référence très lourdes renvoient un 502 en curl, mais leur version `.md` répond en 200 et WebFetch les ouvre).

**Désaccords avec la passe précédente (tranchés par la passe 2) :**

- **« Aucune erreur restante »** : la passe 1 n'a pas vu deux incohérences entre modules. Les identifiants et les prix du `Catalogue` différaient du module 4. Et la leçon 05 décrivait mal ce que le module 2 avait fait construire (scripts « dans les Parts » au lieu du Script Checkpoints dans ServerScriptService, avec un attribut). Les deux sont corrigées.
- **Quatre couches « dans cet ordre »** : la passe 1 a validé le texte et le code, qui se contredisaient (débit avant contexte dans le code). Reformulé.
- **InvokeClient, quiz de la leçon 03** : l'option « si le client ne renvoie rien » était jugée OK. Elle est ambiguë, car un callback sans `return` renvoie `nil` et ne bloque pas. Reformulée en « ne répond jamais ».
- **Détecteur de vitesse** : le conseil de remettre `dernieresPositions[player]` à `nil` « juste après » une téléportation était impossible à suivre depuis un autre script. Précisé.
- Accord avec la passe 1 sur ces points, revérifiés à la source : `LoadCharacterAsync` et la dépréciation de `LoadCharacter`, la date et le caractère opt-in de Server Authority, la limite de 1 000 octets, et le motif de réapparition.

**Erreurs restantes non corrigées :**

- Aucune dans le module 03.
- Le motif de réapparition (attente du Workspace puis une image) et les tests 1 à 3 de la leçon 05 n'ont pas été exécutés dans Studio. Le raisonnement s'appuie sur l'ordre de chargement documenté (référence `Player`).
- Hors périmètre, à signaler au vérificateur du module 04 :
  - `module-04/01-leaderstats.mdx` (vers la ligne 212) dit « si, au module 3, tu avais rangé l'étape dans un attribut ou une variable ». Or le module 3 utilise déjà `leaderstats.Etape` : c'est le module 2 qui utilisait un attribut.
  - Le script Checkpoints de cette même leçon ne reprend pas la vérification de distance du module 3. C'est une régression de sécurité par rapport au script Progression.

## Module 05

### Passe 1 — [rapport détaillé](verification/module-05-passe-1.md)

Environ 110 affirmations vérifiées, dont 13 corrigées ou reformulées et 1 supprimée. Les sources sont les pages create.roblox.com, lues via WebFetch et via leur source officielle `github.com/Roblox/creator-docs` (branche main, octobre 2026), plus les annonces du staff sur le DevForum.
Quiz : 32 questions de quiz et 15 questions d'examen vérifiées. Toutes sont correctes ; 1 explication a été reformulée (tween / plateforme). Les 6 `trouve-le-bug` ont un bug unique, et les numéros de ligne sont exacts.
Code : `node scripts/verifier-luau.mjs 04` analyse 26 extraits. Il reste 9 extraits avec des diagnostics, tous attendus : `require` de modules définis dans d'autres blocs, extraits de quiz volontairement partiels (`UnknownGlobal`), bug volontaire de `TweenInfo.new` dans le quiz 06, et `script.Parent` typé `Instance?`. Une correction de logique a été faite dans le code DataStore (voir plus bas).
Build : `bash scripts/build-verrou.sh` → code de sortie 0.

**Erreurs restantes non corrigées :**

- Aucune erreur factuelle connue.
- Remarque : `curl` renvoie 502 sur certaines grosses pages de référence (DataModel, Players, AnimationTrack). Elles s'ouvrent bien via WebFetch (vérifié), donc les liens sont conservés.
- Non testé dans Roblox Studio (pas d'instance connectée). Le comportement exact de la sauvegarde `PlayerRemoving` au Stop d'un test Studio n'est pas documenté par Roblox : la leçon le présente comme non garanti.

### Passe 2 — [rapport détaillé](verification/module-05-passe-2.md)

Environ 120 éléments vérifiés : affirmations, code, quiz, examen et liens. 16 ont été corrigés ou reformulés, 1 extrait de code a été supprimé (le Script « Checkpoints » affaibli de la leçon 01), et 2 sources ont été ajoutées.

Sources : pages create.roblox.com, lues dans leur source officielle `github.com/Roblox/creator-docs` (branche main ; dernier commit de error-codes-and-limits.md le 2026-10-06, de leaderboards.md le 2026-09-23) et par WebFetch, plus les annonces du staff sur le DevForum.

Quiz : 32 questions de quiz et 15 d'examen revérifiées. Elles sont toutes justes. Les 6 `trouve-le-bug` ont chacun un seul bug, aux bons numéros de ligne. Une question d'examen a été précisée (Q2 : on y signale que la vérification de distance a été retirée de l'extrait).

Code : `node scripts/verifier-luau.mjs 04` analyse 26 extraits, dont 10 ont des diagnostics. Ils sont tous attendus :
- `require` de modules définis dans d'autres blocs ;
- extraits de quiz volontairement partiels ;
- bug volontaire de `TweenInfo.new` ;
- `script.Parent` typé `Instance?` ;
- le nouvel extrait partiel de « Progression » (leçon 01), qui utilise `obtenirEtape`, `dossierCheckpoints` et `Workspace` du script du module 3.

Le ModuleScript `DonneesJoueurs` passe sans aucun diagnostic.

Build : `bash scripts/build-verrou.sh` se termine avec le code 0.

**Désaccords avec la passe précédente (tranchés par la passe 2) :**

- La passe 1 affirmait que les noms étaient cohérents et que le code combiné était vérifié, mais elle n'a pas confronté le module 04 au **code réel du module 03**. Il y avait un double dossier `leaderstats` (Progression + Leaderstats / GestionJoueurs). Pendant la sauvegarde, `FindFirstChild("leaderstats")` pouvait lire le dossier resté à 0 : **risque de perte de pièces et d'étapes**. S'y ajoutaient une régression de sécurité sur les checkpoints (plus de contrôle de distance) et deux Scripts « Boutique » possibles (double débit), sans cooldown ni vérification de longueur.
- La passe 1 n'a pas vu que `Sauvegarder` renvoyait `true` quand l'écriture était annulée.
- La passe 1 présentait le Device Simulator comme étant en bêta. L'annonce du staff du 16/10/2026 le déclare sorti de bêta.
- La passe 1 avait validé le BoutonBoutique en bas à gauche. Or la documentation réserve cette zone aux contrôles tactiles.

**Erreurs restantes non corrigées :**

- Aucune erreur factuelle connue dans le module 04.
- Rien n'a été testé dans un Roblox Studio réel (aucune instance connectée). En particulier, le placement au checkpoint après un chargement tardif (`placerAuCheckpoint`) n'a été vérifié qu'en raisonnant sur la documentation de `CharacterAdded`.

## Module 06

### Passe 1 — [rapport détaillé](verification/module-06-passe-1.md)

72 affirmations ou éléments vérifiés sur les sources (27 pages ouvertes le 2026-10-24), dont 49 OK, 21 corrigés ou reformulés et 2 supprimés (remplacés). Quiz : 25 questions de leçon et 13 d'examen relues. 3 explications corrigées, 1 option corrigée, 1 extrait `trouve-le-bug` harmonisé (noms de champs) ; tous les numéros de ligne des 8 `trouve-le-bug` sont justes, avec un seul bug par extrait. Code : `verifier-luau 05` donne 16 extraits et 3 avec diagnostics, tous attendus (`Unknown require` sur des extraits isolés, `FunctionUnused` sur une fonction d'intégration). 3 corrections d'intégration avec les modules 3 et 4. Build `scripts/build-verrou.sh` : code 0.

Toutes les affirmations de « recette » restantes sont soit sourcées par la doc Roblox ou NN/g, soit présentées explicitement comme des choix de la formation : les 60 secondes, la formule action → récompense → progression, les zones, les prix, l'absence de perte à la mort, les séries sans punition, le rythme mensuel conseillé à un créateur seul et la checklist du spawn. Aucune statistique non sourcée ne reste.

**Erreurs restantes non corrigées :**

Aucune. À surveiller, sans que ce soit une erreur :
- Les chiffres datés (testeurs invités, badges, conditions des notifications) changent souvent ; ils sont formulés « au moment de la rédaction (octobre 2026) ».
- Le module 2, leçon 6 (création de `Config`), n'est pas encore écrit. La leçon 3 suppose un `Config` en table avec `return Config`, à harmoniser si le module 2 diffère.
- Les diagnostics `verifier-luau` restants sont attendus : `Unknown require` ×4 sur des extraits isolés, et `FunctionUnused` sur `verifierObjectifDuJour`, fonction d'intégration à appeler depuis le script « Pieces ».

### Passe 2 — [rapport détaillé](verification/module-06-passe-2.md)

68 affirmations ou éléments revérifiés sur 24 pages sources rouvertes le 2026-10-24 (create.roblox.com/docs, about.roblox.com, nngroup.com, deceptive.design). 57 OK, 9 corrigés ou reformulés, 0 supprimé. Quiz : 25 questions de leçon et 13 d'examen relues une à une (bonnes réponses, distracteurs, explications, numéros de ligne des 7 `trouve-le-bug`). 3 questions modifiées : leçon 3 Q4 (nouvelle configuration), leçon 5 Q3 (« 5 au plus »), examen Q9 (noms des champs alignés sur le module 2, mêmes numéros de ligne). Code : alignement complet sur `Config` du module 2 (leçon 6) et sur les scripts des modules 3 et 4, plus un conflit de nom corrigé (`Recompenses` → `RecompensesEtapes`). `verifier-luau 05` : 17 extraits, 4 avec diagnostics, tous attendus (`Unknown require` sur des extraits isolés, `ImportUnused` sur l'extrait d'intégration de 2 lignes, `FunctionUnused` sur `verifierObjectifDuJour`, à appeler depuis le script « Pieces »). Le module `Config` complet de la leçon 3 ne produit aucun diagnostic. Build `scripts/build-verrou.sh` : code 0.

Équilibre « secrets de succès » : chaque conseil reste sourcé ou signalé une seule fois comme choix de la formation. Deux conseils non sourcés sont maintenant signalés (badge « qui raconte quelque chose » : « Notre conseil » ; moment de l'opt-in : rattaché à la phrase officielle). Je n'ai pas ajouté d'autres précautions, pour garder le texte lisible.

**Désaccords avec la passe précédente (tranchés par la passe 2) :**

- **Cohérence avec le module 2** : la passe 1 avait laissé `Config.Zones` « à harmoniser » parce que la leçon 2.6 n'existait pas encore. Elle existe maintenant et définit `Config.Niveaux` avec d'autres noms de champs et d'autres bornes (12 étapes). Tout le module 05 a été réaligné (leçons 3 et 4, quiz, examen).
- **Conflit de nom `Recompenses`** : non détecté en passe 1. Le Script « Recompenses » du module 3 (leçon 3) rendait le `require` fragile.
- **Prix de la boutique** : la passe 1 a validé des prix (30 / 120 / 400) et des objets (« Traînée blanche »…) qui n'existent pas dans le `Catalogue` du module 4 (Nuage 25, Soleil 75, Aurore 150). Corrigé.
- **Bloc Config présenté comme « ajoute ces champs » mais écrit comme un module complet** : jugé OK en passe 1 ; dangereux pour un débutant, donc corrigé.
- **Définition de J1** : validée en passe 1 sans l'horizon d'un jour. Corrigée.
- **Placement de `verifierObjectifDuJour`** : la passe 1 indiquait où l'appeler, mais pas où la définir (au-dessus de `preparerPiece`). Précisé.

**Erreurs restantes non corrigées :**

Aucune. À surveiller, sans que ce soit une erreur :
- Les chiffres datés (testeurs invités, badges, notifications, seuil des Experiments) changent souvent ; ils sont formulés « au moment de la rédaction (octobre 2026) ».
- Si le module 2 (leçon 6) ou le Catalogue du module 4 change de noms de champs, de bornes d'étapes ou de prix, il faudra refaire le calcul de la leçon 3 (65 pièces de bonus, prix 25 / 75 / 150), la question 4 de la leçon 3 et la question 9 de l'examen.
- Le code n'a pas pu être exécuté dans Studio (aucune instance connectée au MCP Roblox Studio). Sa logique a été vérifiée à la main (`recompensePourEtape` pour les étapes 1 à 13, calendrier d'achat), en plus de l'analyse statique.

## Module 07

### Passe 1 — [rapport détaillé](verification/module-07-passe-1.md)

Environ 150 affirmations vérifiées (6 leçons + examen), 22 corrigées / reformulées / précisées, 0 supprimée ; 6 sources ajoutées, 0 lien mort (32 liens testés : HTTP 200, les 3 pages de référence API qui renvoyaient 502 à curl ont été ouvertes avec succès via WebFetch).
Quiz : 30 questions de leçon + 14 d’examen relues ; 0 bonne réponse fausse ; 1 question de leçon (L4 Q5) et 1 question d’examen (Q1) reformulées ; les numéros de ligne des 5 `trouve-le-bug` ont été vérifiés (un seul bug chacun).
Code : `node scripts/verifier-luau.mjs 06` → 16 extraits, 0 diagnostic (avant et après corrections). Correction importante de fiabilité dans `ProcessReceipt` (L3). Build `bash scripts/build-verrou.sh` : OK (code 0).

Méthode : sources lues directement dans le dépôt officiel `Roblox/creator-docs` (commit 4e795e6 du 2026-10-24, source de create.roblox.com/docs, YAML de la référence API compris), pages en ligne vérifiées (WebFetch/curl), help center (curl avec User-Agent navigateur), DevForum.

**Erreurs restantes non corrigées :**

- Aucune erreur factuelle connue.
- Limite assumée (documentée dans L3) : le `ProcessReceipt` « enregistrer puis donner » peut perdre un octroi si le joueur quitte pendant l’`UpdateAsync` ou si le serveur plante avant la sauvegarde suivante ; il ne double jamais un octroi. L’approche officielle « même sauvegarde » est citée comme solution robuste.
- Comportement des achats simulés dans Studio pour les Developer Products : seule source officielle = annonce staff de 2016 ; présenté comme tel, avec conseil de vérifier dans le jeu publié.
- Libellé exact de l’écran de mise en prix d’un pass dans le Creator Hub : non documenté (octobre 2026) ; formulation prudente.

### Passe 2 — [rapport détaillé](verification/module-07-passe-2.md)

Environ 160 affirmations revérifiées (6 leçons + examen), 14 corrigées / reformulées / précisées, 1 supprimée (DataStore séparé `AchatsTraites_v1`, remplacé) ; 1 question de quiz ajoutée (L3), 1 question d’examen réécrite (Q5) ; 32 liens testés (29 en HTTP 200 avec curl ; les 3 pages de référence API qui renvoient 502 à curl ont été confirmées par WebFetch et par leur YAML source).
Quiz : 31 questions de leçon + 14 d’examen relues ; 0 bonne réponse fausse trouvée ; lignes des `trouve-le-bug` revérifiées (L2 Q4 ligne 6 ; L3 Q6 ligne 9 ; L4 Q4 ligne 9 ; L5 Q4 ligne 8 ; examen Q3 ligne 7 et Q7 ligne 7), un seul bug chacun.
Code : `node scripts/verifier-luau.mjs 06` → 16 extraits, 1 diagnostic acceptable (`Unknown require: game/ServerScriptService/DonneesJoueurs` : `require` du ModuleScript du module 4, même cas que module 05 avec `Config`). Build `bash scripts/build-verrou.sh` : OK (code 0).

Méthode : sources lues dans le dépôt officiel `Roblox/creator-docs` (commit 4e795e6 du 2026-10-24, source de create.roblox.com/docs, YAML de la référence API compris), help center via l’API Zendesk publique (`/api/v2/help_center/.../articles/ID.json`), DevForum via JSON Discourse, WebFetch / curl pour les pages en ligne.

**Désaccords avec la passe précédente (tranchés par la passe 2) :**

1. **ProcessReceipt** : la passe 1 jugeait le motif « DataStore séparé, enregistrer puis donner » acceptable avec une limite connue de perte d’octroi. Désaccord : le guide officiel décrit un motif sans cette perte, accessible au niveau du cours puisque le module 4 fournit déjà une table de données en mémoire et une fonction de sauvegarde qui renvoie un booléen. Code réécrit, limite retirée ; seule reste la dépendance au verrouillage de session (documentée).
2. **Creator Rewards** : la passe 1 a validé « trois premiers jeux qu’il lance » ; les exemples officiels montrent que le décompte porte sur les trois premiers jeux où le joueur atteint 10 minutes. Reformulé.
3. **Suppression d’un abonnement** : validée « OK » par la passe 1, alors que la page officielle se contredit pour les abonnements en Robux (« Refunds are not available for subscriptions in Robux »). Reformulé prudemment.
4. **Pass promu** : la passe 1 n’a pas signalé que le pass promu est offert gratuitement aux acheteurs de Robux, information indispensable pour décider de l’activer.

**Erreurs restantes non corrigées :**

- Aucune erreur factuelle connue.
- Diagnostic `Unknown require` dans L3 (require du ModuleScript `DonneesJoueurs` du module 4) : attendu pour un extrait qui dépend d’un autre script.
- Cas très rare lié au module 4 (non modifiable ici) : `DonneesJoueurs.Sauvegarder` renvoie `true` quand l’écriture est annulée pour cause de version de données plus récente ; le module 4 pourrait renvoyer `false` dans ce cas (à transmettre au responsable du module 4).
- Studio et Developer Products : seule source officielle = annonce staff de 2016 ; présentée comme telle.

## Module 08

### Passe 1 — [rapport détaillé](verification/module-08-passe-1.md)

94 affirmations vérifiées (5 leçons + examen), 11 corrigées ou reformulées, 0 supprimée ; quiz : 25 questions de leçon et 14 questions d'examen vérifiées, toutes justes (bonnes réponses, distracteurs et numéros de ligne des 5 `trouve-le-bug` contrôlés) ; code : `node scripts/verifier-luau.mjs 07` donne 10 extraits analysés et 1 seul diagnostic, le bug volontaire du quiz 5 de la leçon 03 (`player.GetJoinData()`). Build `bash scripts/build-verrou.sh` : code de sortie 0.

Méthode : pages create.roblox.com ouvertes avec WebFetch, et sources YAML/MD du dépôt officiel github.com/Roblox/creator-docs (branche main) téléchargées pour l'API (`GroupService.yaml`, `Player.yaml`, `DataModel.yaml`, `CloseReason.yaml`, `production/promotion/index.md`, `experience-icons.md`, `thumbnails.md`).

**Erreurs restantes non corrigées :**

- Aucune erreur factuelle connue.
- Point à surveiller : les règles Kids & Select (seuil d'entrée, remboursement des frais de 1 000 Robux, examen accéléré) ont changé quatre fois entre juin et août 2026, et les deux pages officielles se contredisent encore sur le remboursement. Les deux versions sont citées dans la leçon 01, qui renvoie aux pages officielles. À revérifier à chaque mise à jour du site.
- La suppression effective des murs de communauté (prévue début 2026) n'est confirmée que par des médias tiers : la leçon garde la formulation « annoncée ».

### Passe 2 — [rapport détaillé](verification/module-08-passe-2.md)

102 affirmations vérifiées (5 leçons + examen), 14 corrigées ou reformulées, 0 supprimée ; quiz : 25 questions de leçon et 14 questions d'examen revérifiées (3 `trouve-le-bug` de leçon + 2 d'examen, numéros de ligne recomptés), 4 questions ou explications corrigées ; code : `node scripts/verifier-luau.mjs 07` → 10 extraits, 1 seul diagnostic = bug volontaire du quiz 5 de la leçon 03 (`player.GetJoinData()`). Correction de fond sur l'extrait de sauvegarde de la leçon 04 (incohérent avec le module 4). Build `bash scripts/build-verrou.sh` : code de sortie 0.

Méthode : pages create.roblox.com ouvertes avec WebFetch (live) et sources Markdown/YAML du dépôt officiel github.com/Roblox/creator-docs (main, `kids-and-select.md` avec `last_updated: 2026-10-23`) ; annonces DevForum ouvertes une à une (auteur, date, mises à jour en tête de post) ; about.roblox.com/community-standards ouvert ; chaque lien de `<Sources>` testé (curl + WebFetch).

**Désaccords avec la passe précédente (tranchés par la passe 2) :**

1. **Leçon 04, extrait de sauvegarde** : la passe 1 l'a jugé « OK ». Il ne compilait pas d'erreur, mais il contredisait le module 4 (fonction déjà existante, clés en majuscules contre minuscules, inventaire en liste au lieu de table `id → true`). Un élève qui suit le défi aurait créé des champs en double. Réécrit (voir tableau).
2. **« La communauté Roblox touche tous tes joueurs »** (leçon 05 et question d'examen) : la passe 1 n'a pas relevé la contradiction avec sa propre ligne « forums 13+ ». Corrigé.
3. **Content May Vary** : la passe 1 a validé « répondre seulement à la première question » ; il faut répondre **Non**. Précisé.
4. **Attribution 30 jours** : validée sans nuance par la passe 1 ; elle dépend du type de joueur. Précisé.

**Erreurs restantes non corrigées :**

- Aucune erreur factuelle connue.
- À surveiller : règles Kids & Select (seuil, frais, remboursement) et divergence entre les deux pages officielles sur le remboursement des 1 000 Robux ; accès des comptes Kids aux pages de communauté non documenté officiellement (la leçon ne s'appuie plus dessus).
- Hors périmètre (module 04) : `completer()` ne met pas à jour le champ `version` d'une ancienne sauvegarde, ce qui rend la protection `ancienne.version > VERSION_DONNEES` inopérante après une hausse de `VERSION_DONNEES`. À signaler au vérificateur du module 04 ; la leçon 07 ne demande pas d'augmenter `VERSION_DONNEES`.

## Module 09

### Passe 1 — [rapport détaillé](verification/module-09-passe-1.md)

94 affirmations / éléments vérifiés, 11 corrigés ou reformulés (dont 3 compléments : méthode `GetPlayerSegmentsAsync`, effet des anciens joueurs sur l’entonnoir de progression, 2 sources en leçon 02), 0 supprimé.
Quiz : 25 questions de leçon + 15 questions d’examen vérifiées (bonnes réponses, distracteurs, numéros de ligne des 4 `trouve-le-bug`, calculs) ; 1 question d’examen corrigée (base de calcul de la D1).
Code : `node scripts/verifier-luau.mjs 08` → 9 extraits, 0 diagnostic (avant et après corrections) ; relecture d’exécution du script `AnalytiqueObby` (Script serveur dans ServerScriptService, `pcall`, `RunService:IsStudio()`, pas d’API dépréciée, cohérent avec la convention `leaderstats.Etape` = dernier checkpoint validé, 0 au départ, +1 seulement ; vérifié dans les modules 03, 04 et 06) ; 1 délai d’attente rallongé.
Build : `bash scripts/build-verrou.sh` → code de sortie 0.

Méthode : pages lues en direct avec WebFetch sur create.roblox.com (event-types, référence AnalyticsService, economy-events, retention, analytics-dashboard, creator-rewards). Pour le texte exact, j’ai aussi lu les fichiers sources officiels de ces pages et des autres (dépôt `Roblox/creator-docs`, branche `main`, `content/en-us/...`, y compris `AnalyticsService.yaml`). Toutes les URL de `<Sources>` répondent en 200, sauf la référence AnalyticsService : 502 avec curl (protection anti-robots), mais elle s’affiche avec WebFetch.

**Erreurs restantes non corrigées :**

Aucune erreur restante.
- Contradiction de la doc officielle sur le nombre de monnaies (5 ou 10) : elle ne peut pas être tranchée ; la leçon la signale en citant les deux pages.
- La référence AnalyticsService renvoie 502 à curl, mais elle s’affiche avec WebFetch : le lien est conservé.
- Hors module (pour info) : le module 00 (leçon 04) parle d’un tableau « Home Recommendations » du Creator Dashboard, à vérifier par son vérificateur.

### Passe 2 — [rapport détaillé](verification/module-09-passe-2.md)

102 affirmations ou éléments vérifiés, 9 corrigés ou reformulés, 0 supprimé.
Quiz : 25 questions de leçon et 15 questions d’examen revérifiées une par une (bonne réponse, distracteurs, explication, calculs). Les 5 `trouve-le-bug` ont été recomptés ligne par ligne (leçon 04 : ligne 6 ; leçon 05 : ligne 8 ; examen : lignes 5, 7 et 6). Résultat : tous corrects, aucun changement.
Code : `node scripts/verifier-luau.mjs 08` → 9 extraits, 0 diagnostic (avant et après corrections). J’ai relu l’exécution réelle du script `AnalytiqueObby` et du ModuleScript `AnalytiqueEconomie` en les comparant au code des modules 03, 04 et 06 (`creerLeaderstats`, `avecTentatives`, script d’achat de la leçon Inventaire, Developer Product « passer l’étape » qui fait `etape.Value += 1`). J’ai corrigé 4 points de cohérence ou de clarté.
Build : `bash scripts/build-verrou.sh` → code de sortie 0.

Méthode : pour avoir le texte exact, j’ai téléchargé les fichiers sources officiels du dépôt `Roblox/creator-docs` (branche `main` ; derniers commits : `production/analytics` le 2026-10-14, `AnalyticsService.yaml` le 2026-10-21). Il y en a 20 pages `.md`, plus `AnalyticsService.yaml` et 3 enums. J’ai aussi lu en direct avec WebFetch les pages creator-rewards et la référence AnalyticsService. Les 23 URL de `<Sources>` ont été testées : 22 répondent 200. La référence AnalyticsService répond 502 à curl (protection anti-robots), mais WebFetch l’affiche bien. Deux WebSearch : pas de « DAU/MAU » ni de « stickiness » sur create.roblox.com, et aucune définition officielle d’« Average Playtime ».

**Désaccords avec la passe précédente (tranchés par la passe 2) :**

1. **Daily Engagement Rewards (leçon 04)** : la correction de la passe 1 (« trois premières expériences où il atteint ces 10 minutes ») est contredite par l’exemple 2 de la page officielle. La règle compatible avec les deux exemples, c’est l’ordre de **lancement** parmi les expériences où le joueur a passé au moins 10 minutes. C’est corrigé.
2. **Average Playtime (leçon 03)** : la passe 1 l’a validé comme le « temps par joueur toutes sessions confondues ». Aucune page officielle ne donne cette définition : j’ai reformulé.
3. **Délai d’attente des leaderstats (leçon 05)** : la passe 1 l’a passé à 30 s. J’ai aligné le délai sur les 60 s utilisées ailleurs dans le module 04, pour la cohérence du fil rouge.
4. **Commentaire du script (leçon 05)** : la passe 1 a reformulé la prose (un saut de valeur est une simple précaution), mais pas le commentaire du code, qui affirmait encore que le chargement fait sauter la valeur. Corrigé.
5. **Script d’achat (leçon 05)** : la passe 1 n’a pas relevé que le script d’achat de référence (avec inventaire) se trouve au module 04, pas au module 03. Corrigé.

**Erreurs restantes non corrigées :**

Aucune.
- La documentation officielle se contredit sur le nombre de monnaies (5 ou 10) et sur le nom de la page des événements personnalisés (« Custom » ou « Explore »). Je ne peux pas trancher : les deux points sont signalés honnêtement dans la leçon.
- La référence AnalyticsService répond 502 à curl, mais WebFetch l’affiche : le lien est conservé.

## Module 10

### Passe 1 — [rapport détaillé](verification/module-10-passe-1.md)

Environ 110 affirmations vérifiées. 15 modifiées (8 corrigées, 7 reformulées), 0 supprimée, 1 source ajoutée.
Quiz : 29 questions de leçon et 14 questions d’examen relues. 2 corrigées : une question ambiguë (L3, `ModelStreamingMode`) et un `trouve-le-bug` qui contenait un second bug (L2).
Code : `node scripts/verifier-luau.mjs 09` → 20 extraits, 0 diagnostic (avant et après corrections). Exécution réelle relue : emplacements, streaming, `nil`, fuites et réplication sont corrects. Les trois avant/après de la leçon 4 sont de vraies optimisations, sans micro-optimisation mythique :
- passage du `Heartbeat` à `Changed` ;
- suppression d’un `SetAttribute` répliqué à chaque image et d’une fuite de connexion ;
- rotation décorative déplacée côté client, donc sans réplication.

Build : `bash scripts/build-verrou.sh` → code de sortie 0.

Méthode : comparaison avec le dépôt officiel `github.com/Roblox/creator-docs` (commit du 2026-10-24) et l’historique de ses commits (API GitHub), puis contrôle des pages en ligne sur create.roblox.com et de l’annonce DevForum. Tous les liens `<Sources>` répondent 200. Les grandes pages de référence (BasePart, Player, Workspace…) renvoient 502 à curl mais s’ouvrent normalement avec un navigateur ou WebFetch.

**Erreurs restantes non corrigées :**

- Valeur affichée par défaut de `Workspace.StreamingIntegrityMode` dans un nouveau place : invérifiable par la doc, et aucun Studio n’était connecté pour la vérifier. La leçon reste honnête (« `Default`, comportement non détaillé ») et recommande de régler le mode explicitement. À confirmer dans Studio lors d’une prochaine passe.
- Divergence persistante dans la doc officielle sur le raccourci du MicroProfiler (Ctrl+F6 contre Ctrl+Alt+F6) : les deux sont donnés dans la leçon, avec leur contexte.

### Passe 2 — [rapport détaillé](verification/module-10-passe-2.md)

Environ 120 affirmations vérifiées, 11 éléments modifiés (6 corrigés, 4 reformulés, 1 supprimé). Aucune autre suppression.

Quiz : 29 questions de leçon et 14 questions d’examen relues. 1 `trouve-le-bug` d’examen corrigé : il contenait un second défaut (le personnage déjà présent au lancement n’était pas géré). Les 7 `trouve-le-bug` ont maintenant un seul bug chacun, et leurs numéros de ligne ont été recomptés.

Code : `node scripts/verifier-luau.mjs 09` donnait 0 diagnostic avant correction et en donne 2 après, tous deux acceptables. Il s’agit de `Unknown require: game/ReplicatedStorage/Modules/Config` : ce ModuleScript du fil rouge (module 2) est absent de l’environnement d’analyse, et le module 2 utilise le même motif.

L’analyse statique ne voyait pas un vrai bug d’exécution, corrigé : en leçon 4, `CompteurPieces` était typé `TextLabel`, alors qu’au module 4 c’est un `Frame` qui contient le TextLabel `Texte`. Ce code aurait planté à l’exécution.

Build : `bash scripts/build-verrou.sh` se termine avec le code 0.

Méthode : j’ai téléchargé les sources brutes du dépôt officiel `github.com/Roblox/creator-docs` (branche `main`, 39 fichiers de guides et de référence YAML) et consulté l’historique des commits par l’API GitHub. J’ai aussi ouvert l’annonce DevForum avec WebFetch et relu les modules 02, 03, 04 et 06 pour vérifier la cohérence. Aucun Studio n’était connecté au MCP Roblox (`list_roblox_studios` renvoie une liste vide), donc rien n’a été exécuté dans Studio.

**Désaccords avec la passe précédente (tranchés par la passe 2) :**

- **Chiffres Android (≈ 65 %, 2–4 Go)** : la passe 1 les avait ajoutés avec la mention « au moment de la rédaction ». Je les retire. La page ne date pas ses données, et la formulation « 65 % of a typical game's player base » est ambiguë : elle se lisait facilement comme une part des joueurs mobiles. C’est exactement le cas que la mission demande de supprimer.
- **« Code avant/après… OK », « Exécution réelle relue »** : la passe 1 n’a pas vu que `CompteurPieces` est un `Frame` au module 4. Le cast `:: TextLabel` masquait l’erreur à l’analyse statique, mais le code plantait à l’exécution. Elle n’a pas vu non plus que le `BoutonBoutique` du module 4 se trouve dans la zone réservée au joystick.
- **Script de rotation de la leçon 2** : la passe 1 l’a validé, mais il ne correspondait pas au fil rouge (le module 2 utilise `PiecesTournantes` avec `while true` / `task.wait()` et `Config`). Il est maintenant aligné.
- **`trouve-le-bug` de l’examen (« Died »)** : validé par la passe 1, mais il contenait un second défaut (personnage déjà présent au lancement). Corrigé.
- **Colonne « Défaut » du tableau de streaming** : la passe 1 a gardé `LowMemory` et `Legacy` comme valeurs par défaut affichées. Les enums ont pourtant tous un item `Default`. J’ai reformulé en « comportement par défaut », sans affirmer ce qu’affiche la fenêtre Properties.

**Erreurs restantes non corrigées :**

- Ce qu’affiche réellement la fenêtre Properties de Studio pour `StreamingIntegrityMode`, `StreamOutBehavior` et `ModelStreamingBehavior` dans un nouveau place n’a pas pu être vérifié : aucun Studio n’était connecté. La leçon ne l’affirme plus et recommande de régler ces propriétés explicitement.
- La documentation officielle reste incohérente sur le raccourci du MicroProfiler (Ctrl+F6 ou Ctrl+Alt+F6). La leçon donne les deux.
- Le module 4 (hors périmètre) décrit toujours la position en bas à gauche de `BoutonBoutique` comme « facile à atteindre avec le pouce ». Le module 9 corrige ce point pour le mobile ; il serait bon d’harmoniser le module 4 lors de sa propre vérification.

## Module 11

### Passe 1 — [rapport détaillé](verification/module-11-passe-1.md)

94 affirmations ou éléments vérifiés (faits, liens, questions de quiz et d’examen, extraits de code), 24 corrigés ou reformulés, 0 supprimé.
Quiz : 25 questions de leçon et 14 questions d’examen relues. 1 question réécrite (L03 Q3 : les règles « gameplay inexistant / Free UGC! / voix off » ne s’appliquent explicitement qu’aux **vidéos** de la page du jeu). 3 explications précisées (L03 Q1, L04 Q4, L05 Q2). Les 5 `trouve-le-bug` ont un seul bug et les bons numéros de ligne.
Code : `verifier-luau 10` = 12 extraits, 0 diagnostic (avant et après corrections). Le `BindToClose` de la leçon 02 a été rendu robuste et le format du `Catalogue` aligné sur le module 4.
Liens internes : 42 liens `/modules/XX/slug/`, tous présents dans PLAN.md et existants. Liens externes : tous testés (HTTP 200 ou redirection vers une page valide). Les URL redirigées ont été remplacées par l’URL finale.
Build : `bash scripts/build-verrou.sh` → code de sortie 0.

Méthode : pages officielles consultées en direct (curl ou WebFetch) et dans le dépôt source officiel de la documentation `github.com/Roblox/creator-docs`, cloné le 2026-10-24 (dernier commit le 2026-10-24). Les fils DevForum ont été vérifiés via l’API JSON du forum (auteur, statut staff, date, contenu).

**Erreurs restantes non corrigées :**

- Aucune dans le module 10.
- Signalement hors périmètre (module 4, non modifié) : le `BindToClose` de `module-04/02-datastores-fiables.mdx` utilise un compteur local à `BindToClose`. Il n’attend donc pas les sauvegardes déjà lancées par `PlayerRemoving` quand les joueurs sont déconnectés à la fermeture. Il vaudrait la peine d’appliquer la même correction qu’en module 10, leçon 02 (compteur global incrémenté dans la fonction de sauvegarde).
- Point à surveiller : les chiffres de l’évaluation Kids/Select. La doc (250 parties uniques en 60 jours) diverge des annonces DevForum (500 pour entrer, 25 pour rester), et les conditions de remboursement des frais de 1 000 Robux diffèrent entre `publish-games-and-places` et `kids-and-select`. La leçon cite la doc actuelle avec une formulation prudente et ne donne pas les conditions de remboursement.

### Passe 2 — [rapport détaillé](verification/module-11-passe-2.md)

Environ 105 éléments vérifiés (affirmations factuelles, chiffres, 25 questions de leçon, 14 questions d'examen, 12 extraits Luau, 42 liens internes, 53 liens externes). 21 corrigés ou reformulés, 0 supprimé.
Quiz : 1 question corrigée (L02 Q2 : l'extrait `trouve-le-bug` contenait un 2e bug), 3 explications précisées (L03 Q3, L04 Q3, examen Q13). Examen : extrait de la Q4 aligné sur la structure de données du module 4 (numéros de ligne inchangés).
Code : `node scripts/verifier-luau.mjs 10` → 12 extraits, 0 diagnostic (avant et après corrections). Deux extraits corrigés de la leçon 02 réalignés sur le module 4 (`DonneesJoueurs`, `Catalogue`, structure `etape`/`pieces`/`inventaire`/`equipe`).
Build : `bash scripts/build-verrou.sh` → code de sortie 0.

Méthode : sources officielles relues dans le dépôt `github.com/Roblox/creator-docs` (dernier commit du 2026-10-24, fichiers `.md` et `.yaml` de la référence API), pages en ligne testées (HTTP), Community Standards via WebFetch, fils DevForum via l'API JSON (auteur, titre « Roblox Staff », date, contenu, réponse acceptée), catégories DevForum via `categories.json`. Rien n'a été repris de la passe 1 sans revérification.

**Désaccords avec la passe précédente (tranchés par la passe 2) :**

- **L02 Q2 (`trouve-le-bug`)** : la passe 1 l'a jugée correcte. Or la ligne `Etape.Value = tonumber(checkpoint.Name)` était un 2e bug selon le module 3 lui-même (recul d'étape en retombant, sauts d'étapes acceptés, `nil` possible). Corrigé.
- **Cohérence avec le module 4** : la passe 1 a seulement aligné le format du `Catalogue`. Les deux codes corrigés de L02 restaient incohérents avec le module 4 : données par défaut `{ Etape = 1, Pieces = 0 }` (autres noms de champs, étape de départ différente) écrites dans le **même** DataStore avec la **même** clé que `DonneesJoueurs`, et inventaire de la boutique dans une table locale jamais sauvegardée. Les deux ont été réalignés, avec un avertissement pour ne pas doubler les scripts du module 4.
- **Fil DevForum « Datastore completely wiped »** : la passe 1 a gardé « des fils… décrivent exactement ce scénario ». Un seul fil est cité, et c'est la réponse acceptée (pas l'auteur) qui donne cette explication. Reformulé.
- **Social Links** : la passe 1 l'a validé sans la précision officielle « liens sur la page du jeu, jamais dans le jeu ». Pour la question de l'examen (panneau dans le jeu), c'est justement le point clé. Ajouté.
- **L04 Q3** : l'explication citait le « chat » comme réponse du questionnaire. Ce n'est pas une catégorie (il s'agit de « Social hangout »). Corrigé.
- **Formulations non sourcées** restées après la passe 1 (« erreur numéro un », « la cause la plus fréquente », « aussi fréquentes l'une que l'autre », « beaucoup de créateurs… », « ce qui est rare ») : reformulées.

**Erreurs restantes non corrigées :**

- Aucune dans le module 10.
- À surveiller : les chiffres de l'évaluation Kids/Select (doc : 250 parties uniques en 60 jours ; DevForum : 500 HEP pour entrer, 25 pour rester) et les conditions de remboursement des 1 000 Robux (25 HEP pendant 60 jours sur `publish-games-and-places`, 90 jours sur `kids-and-select`) divergent entre sources officielles. La leçon cite la doc avec une mise en garde et ne donne pas les conditions de remboursement : c'est volontaire.
- Hors périmètre : le module 4 a été modifié pendant cette vérification (`SauvegarderTout` avec compteur global). Le signalement de la passe 1 sur le `BindToClose` du module 4 semble donc traité. Non vérifié en détail, car ce module n'est pas le mien.
