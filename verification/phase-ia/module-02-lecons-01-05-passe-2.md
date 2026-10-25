# Module 02, leçons 01 à 05 + exemples/lave-montante — passe 2 (vérificateur W1) — 2026-10-24

Périmètre : `src/content/lecons/module-02/01-panorama-des-outils-ia.mdx` à `05-decouper-un-gros-projet.mdx`, `exemples/lave-montante/`. Sources relues le 2026-10-25 (date machine), `miseAJour: 2026-10-24` conservé. Tests dans `C:\tmp\phase-ia-w1\`.

## Résumé

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

## Détail

| Leçon | Affirmation / élément | Verdict (OK / CORRIGÉ / REFORMULÉ / SUPPRIMÉ) | Source | Commentaire |
|---|---|---|---|---|
| 01 | Free sans Claude Code ; Pro 20 $ / 17 $ annuel (200 $ d'avance) ; Max « From $100 », 5x / 20x ; Team Standard 20/25 $, Premium 100/125 $ | OK | https://claude.com/pricing (relu le 25/10) | Citations : « $17 Per month with annual subscription discount ($200 billed up front). $20 if billed monthly », « Choose 5x or 20x more usage than Pro » |
| 01 | Claude Code partage les limites de l'abonnement | OK | https://claude.com/pricing (FAQ : « Claude Code is included in all paid plans. It shares the same usage limits as the rest of your plan ») | |
| 01 | Source `https://claude.com/pricing/max` | CORRIGÉ | `curl -I` : HTTP 308 vers `/pricing` | Lien supprimé ; le lien `claude.com/pricing` précise désormais « (et FAQ : Claude Code partage les limites d'usage de l'abonnement) » (demande du coordinateur traitée) |
| 01 | « bouton Assistant, à droite de la barre d'outils » | REFORMULÉ | create.roblox.com/docs/assistant/guide (« Click Assistant on the right side of the mezzanine bar ») | « à droite de la barre située tout en haut de Studio (la documentation l'appelle mezzanine bar) » |
| 01 | Mode Plan (liste déroulante ou `/plan`, plan modifiable, Build) ; 50 modèles procéduraux / 24 h glissantes ; discussions dans le cloud, rattachées au place ; « might not function flawlessly » | OK | assistant/guide (creator-docs) | |
| 01 | Skills : … › Assistant Settings › Skills, `rbx-debug`, `rbx-unit-test` | OK | assistant/skills | D'autres skills existent, la leçon dit « comme » |
| 01 | Cursor Free 0 / Plus 8 (Grok seulement) / Premium 30 / Super 100 / Ultra 200 ; tiers au prix API dès Premium | OK | cursor.com/pricing | |
| 01 | Copilot Free / Pro 10 / Pro+ 39 / Max 100 ; AI Credits 1 = 0,01 $ ; CLI inclus | OK | github.com/features/copilot/plans | |
| 01 | ChatGPT Free 0 / Go 8 / Plus 20 / Pro dès 100 $, Codex inclus | OK | learn.chatgpt.com/docs/pricing | |
| 01 | Antigravity « no charge » ; Antigravity CLI remplace Gemini CLI le 18/06/2026 (gratuit, Google One) | OK | antigravity.google ; README google-gemini/gemini-cli | |
| 01 | Quick connect : Antigravity, Codex CLI, Claude Code, Claude Desktop, Cursor, Gemini CLI, VS Code | OK | studio/mcp (creator-docs) | |
| 01 | Conservation 5 ans / 30 jours (Free, Pro, Max) | OK | code.claude.com/docs/en/data-usage | |
| 01 | 18 ans minimum, sans clause parentale | OK | anthropic.com/legal/consumer-terms (« You must be at least 18 years old to use the Services », Effective Oct 8, 2025) | Formulation de la décision 38 respectée |
| 01 | Quiz (6) | OK | — | |
| 02 | Ouvrir un terminal, `pwd`, coller, `Ctrl+C`, flèche Haut | OK | test PowerShell | |
| 02 | Exemple `git version 2.56.0.windows.3` ; `xcode-select --install` (Mac) | OK | git-scm.com/install/windows (« 2.56.0(3) … released on 2026-10-22 ») ; /install/mac | |
| 02 | Commandes d'installation de Rokit (Windows, Mac) | OK | README rojo-rbx/rokit | |
| 02 | Résultat de l'installation de Rokit (absent) | CORRIGÉ | `scripts/install.ps1`, `install.sh`, `src/cli/self_install.rs` de Rokit | Sous Windows, Rokit affiche « Please restart your **computer** » alors que la leçon disait seulement de rouvrir VS Code : un débutant ne savait pas quoi croire. Ajout des messages attendus (`[1 / 3]`…`[3 / 3]`, `Rokit has been installed successfully!`) et de l'explication (rouvrir VS Code suffit en général, le code de Rokit le précise ; redémarrer si `rokit --version` reste introuvable) |
| 02 | `rokit init` / `rokit add` / `Trust and install … ?` / `Added version … of tool …` / alias `stylua` | OK | test + `src/cli/add.rs`, `init.rs`, `util/prompts.rs` (« Trust and install {tool_id}? ») | Les messages ne s'affichent que dans un vrai terminal (Rokit vérifie `is_terminal`) |
| 02 | `rokit list` | OK | test | Sortie identique |
| 02 | `rojo init` | OK | test | Crée aussi un `README.md` : sans conséquence |
| 02 | `Remove-Item` / `mkdir` PowerShell | REFORMULÉ | test | Fonctionne, mais PowerShell affiche un tableau `Mode / LastWriteTime / Name` que la leçon n'annonçait pas : ajout du résultat attendu (Windows et Mac) |
| 02 | `default.project.json`, `$path`, `$className`, suffixes | OK | test `rojo build` ; rojo.space/docs/v7/project-format | |
| 02 | `rojo serve` (sortie), `--port`, erreurs des quiz 1 et 4 | OK | tests | Messages mot pour mot |
| 02 | `rojo plugin install`, plugin « Rojo » (Rojo Foundation) sur le Creator Store, twoWaySync désactivé | OK | `rojo --help` ; API Roblox de l'asset 13916111004 ; `plugin/src/Settings.lua` | |
| 02 | luau-lsp, selene, StyLua : ce que chacun signale ; LF par défaut, tabulations, 120 colonnes | OK | tests ; README StyLua | |
| 02 | `.gitignore`, `.gitattributes`, avertissement `CRLF will be replaced by LF` | OK | test avec `core.autocrlf=true` | |
| 02 | Dernières versions (Rojo 7.7.1, Rokit 1.2.0, selene 0.32.0, StyLua 2.6.0) | OK | `gh api` releases | |
| 02 | Activation MCP (… › Manage MCP Servers › Enable Studio as MCP server, indicateur vert) ; commandes du serveur Windows / Mac ; outils cités | OK | studio/mcp | |
| 02 | `claude mcp add … --scope user …`, `claude mcp list`, `claude mcp remove … -s user` | OK (Windows testé) | test ; `claude mcp add --help` | Mac non testé |
| 02 | « tout ne s'annule pas depuis Studio », données envoyées au fournisseur | OK | README Roblox/roblox-studio-agent-plugin (« Not every change can be undone from Studio ») | La doc studio/mcp ne le dit pas, le README officiel de Roblox si |
| 02 | Dépôt `studio-rust-mcp-server` archivé (avril 2026) ; MCP intégré (mars 2026) | OK | `gh api graphql` (archivedAt 2026-04-03) ; annonce DevForum du 05/03/2026 | |
| 02 | Règles `ask` `mcp__Roblox_Studio__…` | OK | permissions (« mcp__&lt;server&gt;__&lt;tool&gt; ») | Le serveur s'appelle bien `Roblox_Studio` sur cette machine |
| 02 | `rojo syncback --input … --dry-run --list` (7.7) | OK | `src/cli/syncback.rs` ; CHANGELOG | Stable depuis 7.7.0 |
| 02 | Script Sync : version finale 17/06/2026, `Sync to…`, deux sens, types gérés, `.client.luau` / `.local.luau`, Rojo conseillé ; guide coding-harness encore « beta » | OK | scripting/sync ; annonce DevForum ; ai/coding-harness | La leçon signale déjà la mention « bêta » |
| 02 | Quiz (6) | OK | tests | |
| 03 | `irm https://claude.ai/install.ps1 \| iex` / `curl -fsSL … \| bash`, pas d'administrateur, nouveau terminal, Windows 10 1809+ / macOS 13+, Git Bash sinon PowerShell | OK | code.claude.com/docs/en/setup | npm : « You can also install » face à « Native Install (Recommended) » : la formulation de la leçon reste juste |
| 03 | Messages `&&` / `irm`, « Verify your PATH » / « Fix your PATH » | OK | troubleshoot-install | Les deux titres existent (quiz 1 et Erreur cohérents) |
| 03 | `claude --version`, `claude doctor` (fin `No installation issues found.` + conseil `/doctor`, rubrique `Invalid settings` séparée) | OK | test | |
| 03 | Connexion (`c`, `Paste code here if prompted`, `Login successful`) ; confiance du dossier | OK | authentication ; security | |
| 03 | Raccourcis Esc, Esc Esc, `\`+Entrée, Ctrl+J, `@`, `!` | OK | interactive-mode | |
| 03 | « `Ctrl+C` deux fois » pour quitter | REFORMULÉ | interactive-mode (« If nothing is running, the first press clears the prompt input and a second press exits ») | Ajout « (quand Claude ne travaille pas) » |
| 03 | CLAUDE.md : emplacements, « target under 200 lines », contexte et non configuration, `/init` améliore, mémoire automatique ; `#` supprimé en 2.0.70 | OK | memory ; CHANGELOG 2.0.70 | Modèle : 62 lignes (« une soixantaine ») |
| 03 | Mode plan : `Shift+Tab`, `⏸ plan mode on`, `Alt+M` sous Windows, `/plan`, `--permission-mode plan`, trois choix, `Ctrl+G` | OK | permission-modes ; interactive-mode (Alt+M) | |
| 03 | « Depuis la version 2.1.283, une session interactive démarre en mode auto » | REFORMULÉ | permission-modes (« With Claude Code v2.1.283 or later… On earlier versions, … only on Pro, Max, and Team plans ») ; CHANGELOG (2.1.283 : fournisseurs tiers / télémétrie coupée ; 2.1.284 : « on every plan and provider ») | Les deux sources officielles se contredisent sur le numéro ; nouvelle formulation : « Dans les versions actuelles (2.1.283 et suivantes d'après la documentation des modes, et même avant sur les offres Pro, Max et Team) » |
| 03 | Tableau des 6 modes ; push autorisé par défaut en mode auto | OK | permission-modes | |
| 03 | « Yes, and don't ask again for… » → `.claude/settings.local.json` | OK | permissions ; settings (sous Windows, le fichier reste à côté de `.claude/settings.json` du dossier de lancement, ce qui revient au même ici) | |
| 03 | Ordre deny → ask → allow, `Bash(git log *)`, appliqué par Claude Code | OK | permissions | |
| 03 | Deux `settings.json` (JSON, mêmes permissions) | OK | test | |
| 03 | Astuce Bash / PowerShell (« Bash deny rules also turn off the PowerShell tool ») | OK | tools-reference | |
| 03 | 19 commandes slash et alias (`/new`, `/reset`, `/undo`, `/checkpoint`, `/cost`, `/review`), `/hooks` en lecture seule, `/reload-skills`, `/agents` (2.1.198) | OK | commands ; hooks ; CHANGELOG 2.1.198 | |
| 03 | Skills et sous-agents (champs, détection à chaud) | OK | skills ; sub-agents | |
| 03 | Hooks : « deterministic and guarantee the action happens », code 2 PostToolUse, `sh -c` / Git Bash / PowerShell, champ `shell` | OK | best-practices (la citation y figure, pas dans hooks-guide) ; hooks | |
| 03 | Commande du hook et test du hook | OK | tests manuel et bout en bout | |
| 03 | `git commit -m "Formatage initial avec StyLua"` quand rien n'a changé | CORRIGÉ | test Git (`nothing to commit, working tree clean`, code 1) | Ajout : que faire si Git répond `nothing to commit` |
| 03 | Contexte, `/compact`, `/clear` + `/resume`, `/btw`, checkpoints (6 actions, limites) | OK | commands ; best-practices ; checkpointing | |
| 03 | Quiz 3 : « après deux corrections ratées » | REFORMULÉ | best-practices (« corrected Claude more than twice ») | « au-delà de deux corrections ratées » |
| 03 | Autres questions du quiz (5) | OK | — | |
| 04 | Citations Anthropic (8) | OK | best-practices ; platform.claude.com prompting best practices (`.md`, grep exact) | |
| 04 | API des prompts (`Animator:LoadAnimation`, `Humanoid:LoadAnimation` déprécié, `GetPartBoundsInBox`, `TakeDamage`, `GetSortedAsync`, `GetNameFromUserIdAsync`) | OK | creator-docs (Humanoid.yaml, Players.yaml, OrderedDataStore.yaml) | |
| 04 | Prompts cohérents avec les modules 4 et 5 (corrigés en passe 1) | OK | — | |
| 04 | Quiz (6), `trouve-le-bug` lignes 8, 9, 9-12, 12 | OK | — | Lignes recomptées |
| 05 | Méthode, citations, mode plan, `!`, checkpoints ≠ Git | OK | best-practices ; permission-modes ; checkpointing | |
| 05 | Code : après une erreur en plein round, les survivants restaient dans l'arène (et y restaient indéfiniment s'il n'y avait plus assez de joueurs pour un nouveau round) | CORRIGÉ | simulation Lune (avant / après) | Le retour au lobby est déplacé de `terminerRound` vers `nettoyerRound`, appelé après le `pcall` même en cas d'erreur : lave détruite, connexions coupées, participants encore vivants (personnage présent, Health > 0) ramenés au lobby. Fichier `GestionRounds.server.luau` et bloc de la leçon identiques |
| 05 | Prompt de la tâche 7 et « À relire » | CORRIGÉ | — | Le prompt demande désormais ce comportement (« le retour au lobby se fait donc là… personne ne reste coincé dans l'arène ») ; « À relire » le fait vérifier |
| 05 | Téléportation serveur vers une arène lointaine avec l'instance streaming (activé par défaut dans les nouveaux places) | CORRIGÉ | workspace/streaming (« enabled by default for new places », « cannot be set in a script ») ; Player.yaml, RequestStreamAroundAsync (« Without providing the location… streaming pause or other undesirable behavior ») | Ajout d'une étape de décor (leçon et README) : décocher `Workspace.StreamingEnabled` pour ce petit mini-jeu ; sources ajoutées |
| 05 | Lave mise à jour 5 fois par seconde | REFORMULÉ (code inchangé) | performance-optimization/improve (« If TweenService is used to tween an object server side, the tweened property is replicated to each client every frame… jittery… unnecessary network traffic ») | TweenService côté serveur est explicitement déconseillé par Roblox ; chaque pas fait 40 / 55 / 5 ≈ 0,15 stud. Ajout d'un paragraphe après la tâche 6 (refuser le tween serveur, interpolation client hors v1) |
| 05 | Exécution réelle (raisonnement + simulation) : rounds d'affilée, mort, reset, départ, arrivée, nettoyage, sécurité, `task.wait`, ForceField (Health = 0 l'ignore), itération avec suppression, signaux différés | OK | simulation ; BasePart / Instance / PVInstance | |
| 05 | `default.project.json`, `GDD.md`, 6 scripts, test Lune de la leçon 06 identiques au dossier | OK | comparaison automatique | |
| 05 | Quiz (6), `trouve-le-bug` ligne 12 | OK | BasePart.yaml (Touched) | Lignes recomptées |
| 05 | Sources | REFORMULÉ | ouvertes (HTTP 200) | Ajout : Improve performance, Instance streaming, Player:RequestStreamAroundAsync |
| exemple | `README.md` | CORRIGÉ | — | Même consigne `StreamingEnabled` que la leçon |
| exemple | `rokit.toml` (alias `stylua`), `selene.toml` (`luau_recent`), `.gitattributes` | OK | — | Les trois remarques hors périmètre de la passe 1 ont déjà été traitées |
| exemple | build, sourcemap, luau-lsp, selene, StyLua, Lune | OK | tests (après correction) | 0 diagnostic, 0 avertissement, 12 OK |

## Désaccords avec la passe précédente

- **Défaut « mineur » (1) de la passe V2** (survivants laissés dans l'arène après une erreur) : pas mineur. Si l'erreur survient et qu'il n'y a plus assez de joueurs, les survivants restent dans l'arène sans limite de temps (la phase repasse en Attente). Corrigé ; la correction ne demandait qu'un déplacement de quelques lignes et une phrase dans le prompt de la tâche 7.
- **Défaut (2) de la passe V2** (lave saccadée) : je ne le considère pas comme un défaut à corriger par un tween serveur, solution que Roblox déconseille. Un pas de 0,15 stud toutes les 0,2 s reste régulier ; une explication a été ajoutée.
- **Streaming** : ni la passe 1 ni le rédacteur ne l'avaient pris en compte, alors que l'instance streaming est activée par défaut et que le serveur téléporte les joueurs vers une arène « loin du lobby ».
- **Passe V1, leçon 01** : la source `https://claude.com/pricing/max` était notée « OK » ; elle redirige aujourd'hui (308) vers `/pricing`.
- **Passe V1, leçon 03** : « mode de départ `auto` depuis 2.1.283 » noté OK avec le CHANGELOG 2.1.283/2.1.284 ; le CHANGELOG place la généralisation en 2.1.284 et la documentation en 2.1.283 (contradiction des sources officielles) : formulation assouplie.
- **Passe V1, leçon 03** : citation « deterministic and guarantee the action happens » attribuée à hooks / hooks-guide ; elle vient de best-practices (la leçon dit « la documentation » et cite best-practices dans ses sources : pas de changement).
- **Passe V1, leçon 02** : messages de Rokit « relus dans le code source », mais le message Windows « Please restart your computer » de l'installation n'avait pas été confronté à la consigne de la leçon.

## Erreurs restantes non corrigées

- Non testable ici : étapes Mac (installation de Git, Rokit, Claude Code, commande MCP Mac, hook en `sh -c`) ; plugin Rojo, fenêtre de synchronisation, Quick connect et outils MCP dans Studio ; le jeu Lave Montante en vrai (la simulation Lune reproduit la logique du serveur, pas le moteur : physique, réplication, streaming).
- Lave Montante : animation de la lave non interpolée côté client (choix expliqué dans la leçon) ; pendant les 5 s de répit, le bandeau affiche déjà « La lave monte ! » (texte fixé par le GDD, sans conséquence de jeu).
- Contradiction entre la documentation des modes (2.1.283) et le CHANGELOG (2.1.284) sur la version qui démarre en `auto` partout : signalée, la leçon ne donne plus de numéro unique.
