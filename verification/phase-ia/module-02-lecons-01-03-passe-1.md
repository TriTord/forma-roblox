# Module 02, leçons 01 à 03 — passe 1 (vérificateur V1) — 2026-10-24

Périmètre : `src/content/lecons/module-02/01-panorama-des-outils-ia.mdx`, `02-installer-un-workflow-pro.mdx`, `03-claude-code-de-a-a-z.mdx`. Sources relues le 2026-10-25 (date machine), `miseAJour: 2026-10-24` conservé. Tests dans `C:\tmp\phase-ia-v1\`.

## Résumé

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

## Détail

| Leçon | Affirmation / élément | Verdict (OK / CORRIGÉ / REFORMULÉ / SUPPRIMÉ) | Source | Commentaire |
|---|---|---|---|---|
| 01 | Claude Code « agentique » ; surfaces terminal, VS Code (et Cursor), JetBrains, bureau (onglet Code, macOS/Windows), web + mobile | OK | code.claude.com/docs/en/overview | « The full-featured CLI » justifie « la version la plus complète » |
| 01 | Sessions web dans le cloud, sans accès au Studio local | OK | code.claude.com/docs/en/data-usage (« Anthropic-managed virtual machines ») ; README roblox-studio-agent-plugin | |
| 01 | Free sans Claude Code ; Pro, Max, Team, Enterprise, Console | OK | code.claude.com/docs/en/setup (« The free claude.ai plan does not include Claude Code access ») | |
| 01 | Pro 20 $ / 17 $ annuel (200 $) ; Max « From $100 », 5x / 20x ; Team Standard 20/25 $, Premium 100/125 $ | OK | claude.com/pricing (relu le 25/10) | Pas de prix séparé pour Max 20x : la leçon n'en invente pas |
| 01 | Claude Code partage les limites de l'abonnement | OK | claude.com/pricing/max | Source ajoutée |
| 01 | Règle d'âge (encadré Attention) | OK | anthropic.com/legal/consumer-terms (« You must be at least 18 years old », 8 oct. 2025, aucune clause parentale) | Formulation commune de la décision 38, mot pour mot |
| 01 | Assistant : bouton à droite de la barre, capacités, scripts multiples, « might not function flawlessly » | OK | create.roblox.com/docs/assistant/guide (source creator-docs) | |
| 01 | Mode Plan de l'Assistant : liste déroulante **Plan** ou `/plan`, plan modifiable, **Build** | OK | assistant/guide | |
| 01 | Skills de l'Assistant (… › Assistant Settings › Skills, `rbx-debug`, `rbx-unit-test`) | OK | create.roblox.com/docs/assistant/skills | |
| 01 | Clé d'API (Manage API Keys, menu Model, Anthropic/OpenAI/Google) | REFORMULÉ | docs/ai/accelerated-workflows + annonce DevForum du 21/02/2026 | Ajout : un compte chez le fournisseur a ses propres conditions d'âge ; source DevForum ajoutée (le menu Model n'est que dans l'annonce) |
| 01 | Code Assist, `Tab` pour accepter | OK | create.roblox.com/docs/studio/script-editor | |
| 01 | Aucun prix ni quota publié ; 50 modèles procéduraux / 24 h glissantes | OK | assistant/guide | Quiz 5 juste |
| 01 | Discussions dans le cloud, rattachées au place | OK | assistant/guide (« chat history is saved in the cloud », « scoped to the place ») | |
| 01 | Conditions Roblox : pas de données personnelles/confidentielles dans les prompts, responsabilité | OK | en.help.roblox.com Terms of Use, section AI Features (« submit Prompts that include sensitive, confidential, or personally identifiable information ») | Page lue par curl (WebFetch 403) |
| 01 | Cursor Free 0, Plus 8 (Grok seulement), Premium 30, Super 100, Ultra 200, modèles tiers à l'usage dès Premium | OK | cursor.com/pricing (relu le 25/10) | |
| 01 | Copilot Free 0, Pro 10, Pro+ 39, Max 100 ; AI Credits, 1 = 0,01 $ ; CLI inclus | OK | github.com/features/copilot/plans | |
| 01 | Codex : ChatGPT Free 0, Go 8, Plus 20, Pro dès 100 ; Free = petites tâches | OK | learn.chatgpt.com/docs/pricing | |
| 01 | Antigravity « sans frais » ; Antigravity CLI remplace Gemini CLI le 18/06/2026 (gratuits, Google One) | OK | antigravity.google ; README google-gemini/gemini-cli | |
| 01 | « des outils remplacés (Gemini CLI) » | REFORMULÉ | README gemini-cli | Précisé « pour les comptes gratuits » |
| 01 | Quick connect : Antigravity, Codex CLI, Claude Code, Claude Desktop, Cursor, Gemini CLI, VS Code | OK | create.roblox.com/docs/studio/mcp | |
| 01 | Données envoyées (prompts, sorties), choix d'entraînement, 5 ans / 30 jours | OK | code.claude.com/docs/en/data-usage | |
| 01 | Quiz (6) | OK | — | Bonne réponse unique et justifiée partout |
| 02 | Ouvrir un terminal (PS / zsh `%`), `pwd`, `Ctrl+C`, flèche haut, terminal VS Code `Ctrl+`` ` | OK | test local ; doc VS Code | |
| 02 | Git Windows (installateur, options par défaut), Mac `xcode-select --install` | OK | git-scm.com/install/windows et /install/mac | |
| 02 | Exemple `git version 2.52.0.windows.1` | CORRIGÉ | git-scm.com/install/windows (2.56.0(3), 22/10/2026) | Remplacé par `2.56.0.windows.3` |
| 02 | Commandes d'installation de Rokit (Windows et Mac) | OK | README rojo-rbx/rokit | |
| 02 | `rokit init`, `rokit add …`, alias `stylua`, messages, `rokit install` | OK | test local + code source Rokit | |
| 02 | Sortie de `rokit list` | CORRIGÉ | test local | Ligne d'en-tête `🛠️  Found tools:` ajoutée |
| 02 | `rojo init` : sortie, `git init` automatique, gabarit avec Baseplate | OK | test local | |
| 02 | Commandes PowerShell `Remove-Item` / `mkdir` multiples ; équivalents Mac | OK (Windows testé) / OK d'après la syntaxe POSIX (Mac) | test local | |
| 02 | `default.project.json` de la leçon | OK | test `rojo build` ; identique à `projet-reference` | |
| 02 | `$path`, `$className`, Workspace non géré, `$ignoreUnknownInstances` | OK | rojo.space/docs/v7/project-format | |
| 02 | Suffixes `.server.luau` / `.client.luau` / `.luau` avec Rojo | OK | project-format (`emitLegacyScripts` vrai par défaut) + test | |
| 02 | `rojo plugin install`, plugin par version majeure, plugin sur le Creator Store | OK | rojo.space installation ; API toolbox Roblox (asset 13916111004 « Rojo », Rojo Foundation) | |
| 02 | Fenêtre « Sync changes for project … », Accept / Abort ; synchronisation inverse désactivée par défaut | OK | `plugin/src/App/StatusPages/Confirming.lua`, `plugin/src/Settings.lua` (twoWaySync = false) | |
| 02 | Sortie de `rojo serve` | CORRIGÉ | test local | Ligne `Visit http://localhost:34872/ in your browser for more information.` ajoutée |
| 02 | `rojo build -o …rbxlx` sans le niveau | OK | test | |
| 02 | luau-lsp (`JohnnyMorganz.luau-lsp`, « Luau Language Server », définitions Roblox par défaut, sourcemap auto) ; extensions selene et StyLua | OK | README luau-lsp ; API Marketplace VS Code | |
| 02 | `selene.toml` = `std = "roblox"` | CORRIGÉ | test local ; kampfkarren.github.io/selene/usage/std.html ; `projet-reference/selene.toml` | Remplacé par `std = "luau_recent"` + fichier `luau_recent.yml` du corrigé. Sinon selene signale `math.isfinite` (utilisé au module 04) comme une erreur, et le hook de la leçon 03 renverrait le code 2 à chaque modification |
| 02 | Phrase sur `math.isfinite` | REFORMULÉ | test local | Suit la nouvelle configuration |
| 02 | Défauts StyLua « coupe les lignes au-delà de 120 caractères, comme l'éditeur de Studio » | REFORMULÉ | README StyLua (Options) | 120 est indicatif (« approximate ») ; Studio ne coupe pas les lignes ; ajout des fins de ligne LF par défaut |
| 02 | `selene src` → 0/0/0 ; `stylua --check src` silencieux ; `stylua src` reformate | OK | tests | |
| 02 | Tableau « ce que chaque outil attrape » | OK | tests (selene : `unused_variable` seulement ; StyLua : l'espace ; luau-lsp : DeprecatedApi + LocalUnused) | |
| 02 | Fins de ligne Windows (aucune mention) | CORRIGÉ | test local ; README StyLua | Sous Windows, VS Code crée des fichiers CRLF et Git for Windows remet du CRLF : `stylua --check src` échouait (case de la checklist impossible à cocher). Ajout d'un `.gitattributes` (`* text=auto eol=lf`, étape 6) et d'un encadré `<Erreur>` placé sous les commandes de vérification de l'étape 5 (barre d'état CRLF → LF, réglage `files.eol`) |
| 02 | Avertissements `LF will be replaced by CRLF` | CORRIGÉ | test local | Avec `.gitattributes`, l'avertissement devient `CRLF will be replaced by LF` (testé) |
| 02 | Résultat du commit `[master (root-commit) …]` | REFORMULÉ | — | Ajout « (ou `main`) » |
| 02 | Dossiers vides non versionnés, message Rojo exact | OK | test | |
| 02 | Serveur MCP intégré depuis mars 2026 ; ancien dépôt archivé en avril 2026 | OK | annonce DevForum du 05/03/2026 ; github.com/Roblox/studio-rust-mcp-server (« archived … Apr 3, 2026 ») | Annonces ajoutées aux sources |
| 02 | Activation (… › Manage MCP Servers › Enable Studio as MCP server, indicateur vert), libellé variable | OK | docs/studio/mcp ; README roblox-studio-agent-plugin (« … → Settings → MCP Servers ») | |
| 02 | Quick connect : activer Claude Code, réinstaller + redémarrer Studio s'il manque | OK | docs/studio/mcp | |
| 02 | `claude mcp add --transport stdio --scope user Roblox_Studio -- cmd.exe /c %LOCALAPPDATA%\Roblox\mcp.bat` | OK (Windows testé, scope local) | docs/studio/mcp (commande du serveur) ; `claude mcp add --help` | Présenté à juste titre comme déduit ; Mac non testé |
| 02 | `claude mcp list` → `Roblox_Studio: cmd.exe /c %LOCALAPPDATA%\Roblox\mcp.bat - ✔ Connected` ; `/mcp` | OK | test ; code.claude.com/docs/en/commands | |
| 02 | Redémarrer le client après une mise à jour de Studio | OK | annonce DevForum du 19/08/2026 | Source ajoutée |
| 02 | Outils du serveur (lecture / action) | OK | docs/studio/mcp ; README roblox-studio-agent-plugin (classement) | Les 20 noms cités existent |
| 02 | Avertissements : lire et modifier, tout ne s'annule pas, données envoyées au fournisseur | OK | docs/studio/mcp ; README roblox-studio-agent-plugin | README ajouté aux sources (il manquait) |
| 02 | Règles `ask` `mcp__Roblox_Studio__…`, forcées même en mode auto | OK | code.claude.com/docs/en/permissions et /permission-modes (« Explicit ask rules still force a prompt ») ; noms d'outils vus dans cette session | Ajout : vérifier le nom du serveur dans `claude mcp list` et comment créer le dossier `.claude` |
| 02 | `rojo syncback` (Rojo 7.7+), `--dry-run --list`, `.rbxm` pour l'UI | OK | CHANGELOG Rojo (7.7.0-rc.1 puis 7.7.0) ; `rojo syncback --help` ; test | |
| 02 | Script Sync : version finale (17/06/2026), deux sens, `Sync to…`, types gérés, suffixes, Rojo conseillé pour tout le projet, guide « Build with a coding harness » | OK | docs/scripting/sync ; annonce DevForum ; docs/ai/coding-harness | |
| 02 | Script Sync et bêta | REFORMULÉ | docs/ai/coding-harness (« Script Sync is a beta feature ») vs annonce du 17/06/2026 | Ajout : si `Sync to…` n'apparaît pas, regarder File › Beta Features |
| 02 | Checklist « Ton poste est prêt » | REFORMULÉ | — | Ajout de `luau_recent.yml` et `.gitattributes` |
| 02 | Quiz (6) | OK | tests (messages d'erreur Rojo recopiés mot pour mot) | |
| 03 | Installeur natif `irm … \| iex` / `curl -fsSL … \| bash`, pas de progression, nouveau terminal, pas d'administrateur | OK | code.claude.com/docs/en/setup | |
| 03 | Configuration requise | CORRIGÉ (ajout) | setup (Windows 10 1809+, macOS 13+) | Information utile au débutant, absente |
| 03 | Git for Windows → Git Bash, « sinon PowerShell » | REFORMULÉ | setup ; tools-reference | Claude Code a aussi un outil PowerShell quand Git Bash est là |
| 03 | `claude --version` → `2.1.310 (Claude Code)` | OK | test | |
| 03 | `claude doctor` : « la dernière ligne indique `No installation issues found.` » | CORRIGÉ | test local | La dernière ligne est un conseil sur `/doctor`, et `No installation issues found.` s'affiche même avec `Invalid settings` : précisé |
| 03 | Erreurs `&&` / `irm`, page « Verify your PATH », npm ancien | OK | setup ; troubleshoot-install | |
| 03 | Confiance du dossier ; connexion (`c`, `Paste code here if prompted`, `Login successful`) | OK | security ; authentication | Sources ajoutées |
| 03 | Raccourcis : Esc, Esc Esc, `\`+Entrée, Ctrl+J, `@`, `!`, flèche haut, `/exit`, Ctrl+C deux fois | OK | interactive-mode | |
| 03 | CLAUDE.md : emplacements, `CLAUDE.local.md`, « under 200 lines », contexte et non configuration, `/init` améliore, `/memory` | OK | memory | |
| 03 | `#` supprimé (2.0.70) ; « souviens-toi » → mémoire automatique | OK | CHANGELOG 2.0.70 ; memory | |
| 03 | « Would removing this cause Claude to make mistakes? » ; « If you could describe the diff in one sentence, skip the plan » ; « fills up fast… » ; plus de deux corrections → `/clear` | OK | best-practices | |
| 03 | Modèle de CLAUDE.md (Luau, conventions, sécurité, DataStore, MarketplaceService, ProcessReceipt, mémoire, vérification) | OK | brief rédacteur ; create.roblox.com (API citées non dépréciées) | Cohérent avec PLAN et la phase IA |
| 03 | « Ce modèle fait une centaine de lignes » | CORRIGÉ | comptage (62 lignes) | « une soixantaine » |
| 03 | Mode plan : Shift+Tab, `⏸ plan mode on`, Alt+M, `/plan`, `--permission-mode plan`, trois choix, Ctrl+G | OK | permission-modes ; `claude --help` | |
| 03 | Tableau des 6 modes | OK | permission-modes | |
| 03 | Mode de départ `auto` depuis 2.1.283 ; Shift+Tab depuis auto → Manual | OK | permission-modes ; CHANGELOG 2.1.283/2.1.284 | |
| 03 | Réponses Yes / Don't ask again / No ; `.claude/settings.local.json` | OK | permissions | |
| 03 | Trois fichiers de réglages ; `Bash(git log *)` (avec et sans arguments) ; ordre deny → ask → allow ; « enforced by Claude Code » | OK | permissions ; settings | |
| 03 | JSON des deux `settings.json` + `$schema` | OK | test (`JSON.parse`, `claude doctor`) ; json.schemastore.org (HTTP 200) | |
| 03 | Astuce « doubler les interdictions pour PowerShell » | CORRIGÉ | tools-reference (« Bash deny rules also turn off the PowerShell tool ») + test local | L'ancien conseil (ajouter des `deny` PowerShell) **rallumait** l'outil PowerShell, qui échappait alors aux règles `allow`/`ask` en `Bash(…)`. Réécrit : rien à ajouter avec Git for Windows ; règles `PowerShell(…)` seulement sans Git for Windows, ou toutes doublées |
| 03 | Commandes slash (19, alias `/new`, `/reset`, `/undo`, `/checkpoint`, `/review`, `/cost`) | OK | commands | Toutes existent |
| 03 | Skills : chemin, champs facultatifs, `disable-model-invocation`, `allowed-tools` (le temps de l'appel), détection à chaud, `/reload-skills`, commandes fusionnées | OK | skills | |
| 03 | Sous-agents : `.claude/agents/`, `name` + `description` obligatoires, `tools`, `model: sonnet`, `@`, détection à chaud sauf nouveau dossier ; `/agents` sans assistant (2.1.198) | OK | sub-agents ; commands ; CHANGELOG 2.1.198 | |
| 03 | Hooks : citation « deterministic… », PostToolUse, matcher `Edit\|Write` exact, code 2 = « Shows stderr to Claude; the tool already ran », `sh -c` / Git Bash / PowerShell, champ `shell`, `/hooks` en lecture seule, exemple officiel avec `jq` | OK | hooks ; hooks-guide ; best-practices | |
| 03 | Commande du hook (Git Bash et PowerShell) | OK | tests réels (manuel + bout en bout) | |
| 03 | Étape 3 du test du hook : « Avec l'outil Edit, … crée le fichier » | CORRIGÉ | test bout en bout | Edit ne crée pas de fichier : remplacé par Write (testé) ; ajout : accepter la demande d'autorisation en mode Manual |
| 03 | Prérequis du hook | REFORMULÉ | — | Ajout de `luau_recent.yml` et `.gitattributes` |
| 03 | `/context`, `/compact [consigne]`, compaction automatique, `/clear` + `/resume`, `/btw` | OK | commands ; best-practices ; memory | |
| 03 | Checkpoints : un par prompt, `/rewind` ou Esc Esc, 6 actions, limites (Bash, sous-agents, externes), « quick, session-level recovery » | OK | checkpointing | |
| 03 | Push autorisé par défaut par le classifieur en mode auto | OK | permission-modes | |
| 03 | Git : `git restore`, `git restore .`, `git revert HEAD`, nouveaux fichiers non supprimés | OK | git-scm.com/docs ; test | |
| 03 | Quiz 4 (`/rewind` et Bash) | REFORMULÉ | checkpointing (« Once Claude has edited a file with its file editing tools…, `/rewind` undoes changes that Bash commands make to that file afterward ») | Précision ajoutée dans la question : Claude n'avait pas touché le fichier avec ses outils d'édition, sinon `/rewind` le suivrait |
| 03 | Autres questions du quiz (5) | OK | setup ; memory ; best-practices ; hooks | |
| 03 | Règle d'âge (encadré, connexion, défi, résumé) | OK | consumer-terms | Aucune mention d'un mineur utilisant Claude Code avec l'accord d'un parent |
| 01-03 | `<Sources>` | REFORMULÉ | toutes ouvertes (HTTP 200 ou WebFetch) | Ajouts : 01 (pricing/max, annonce DevForum API keys) ; 02 (README roblox-studio-agent-plugin, 2 annonces MCP, coding-harness, StyLua Options, selene std) ; 03 (authentication, security, tools-reference). Aucun lien mort trouvé |

## Désaccords avec la passe précédente

(passe 1 : sans objet)

## Erreurs restantes non corrigées

- **Hors périmètre, à traiter ailleurs** :
  - `exemples/lave-montante/rokit.toml` utilise la clé `StyLua = "JohnnyMorganz/StyLua@2.6.0"`, alors que la leçon 02, `projet-reference/rokit.toml` et la commande `stylua` des leçons 02/03 utilisent l'alias `stylua`. Testé : `stylua` fonctionne quand même sous Windows (et devrait fonctionner sur un Mac au système de fichiers insensible à la casse, non testé), mais le nom diffère et casserait sur un disque sensible à la casse. Je n'ai pas modifié `exemples/` (consigne).
  - `exemples/lave-montante/selene.toml` reste en `std = "roblox"` (sans `luau_recent`) ; sans conséquence tant que l'exemple n'utilise pas `math.isfinite` (vérifié : il ne l'utilise pas).
  - `projet-reference` et `exemples/lave-montante` n'ont pas de `.gitattributes` : après un clone sous Windows (`core.autocrlf=true`), `stylua --check src` y signalera tous les fichiers, alors que le README du corrigé annonce « aucune différence attendue ».
- **Non testable ici** : étapes Mac (installation de Git, Rokit, Claude Code, commande MCP `/Applications/RobloxStudio.app/Contents/MacOS/StudioMCP`, hook en `sh -c`), vérifiées seulement sur la documentation officielle ; Quick connect, plugin Rojo dans Studio, fenêtre de synchronisation et outils MCP en jeu réel (pas de Studio piloté pendant la vérification) ; `rojo plugin install` non lancé (il aurait écrasé le plugin de la machine).
- Le nom exact du serveur écrit par le Quick connect (`Roblox_Studio` sur cette machine) n'est documenté nulle part : la leçon 02 invite désormais à le vérifier avec `claude mcp list`.
