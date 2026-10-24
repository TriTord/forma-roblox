# Notes du rédacteur R1 — module 02, leçons 01 et 02

Fichiers : `src/content/lecons/module-02/01-panorama-des-outils-ia.mdx` (6 questions), `src/content/lecons/module-02/02-installer-un-workflow-pro.mdx` (6 questions).
Sources consultées le **2026-10-25** (nuit du 24 au 25), `miseAJour: 2026-10-24` conformément au brief. Machine : Windows 11, Claude Code 2.1.310, Rokit 1.2.0, Rojo 7.7.1 (via rokit.toml du projet test), selene 0.32.0, StyLua 2.6.0, luau-lsp 1.70.1, Git 2.52.0.windows.1.

## Tests réels (dossier `C:\tmp\phase-ia-r1\`)

| Commande | Résultat observé |
|---|---|
| `rokit init` puis `rokit add rojo-rbx/rojo`, `rokit add Kampfkarren/selene`, `rokit add JohnnyMorganz/StyLua stylua` | `rokit.toml` : `rojo = "rojo-rbx/rojo@7.7.1"`, `selene = "Kampfkarren/selene@0.32.0"`, `stylua = "JohnnyMorganz/StyLua@2.6.0"`. Sans alias, la clé devient `StyLua` (d'où l'alias `stylua` explicite dans la leçon). Sortie silencieuse hors TTY ; les messages interactifs (`Initialized new Rokit project successfully!`, `Trust and install … ?`, `Added version … of tool …`) sont lus dans le code source de Rokit (`src/cli/init.rs`, `src/cli/add.rs`, `src/util/prompts.rs`, via `gh api`), les outils étant déjà « trusted » sur cette machine |
| `rokit list` | sortie recopiée telle quelle dans la leçon |
| `rojo init` (dans un dossier contenant déjà rokit.toml) | `Creating new Place project 'ObbyDesNuages'` / `Initialized empty Git repository in …/.git/` / `Created project successfully.` Le gabarit contient Workspace (Baseplate, `FilteringEnabled`), Lighting, SoundService → **à remplacer** (la leçon le dit) |
| Remplacement par `projet-reference/default.project.json` + `Remove-Item`/`mkdir` (PowerShell testé) | `rojo build -o ObbyDesNuages.rbxlx` : `Built project…` ; 2 Folders (Modules, Remotes), 6 RemoteEvents |
| `.client.luau` / `.server.luau` / `.luau` | `rojo build` → LocalScript / Script / ModuleScript (grep des classes dans le .rbxlx) |
| Dossier `$path` manquant (`src/ReplicatedStorage/Modules`, nœud sans `$className`) | `[ERROR rojo] Rojo project referred to a file using $path that could not be turned into a Roblox Instance by Rojo. … File $path: src/ReplicatedStorage/Modules` (quiz). Un dossier manquant pour un nœud qui a `$className` (StarterGui) ne provoque PAS d'erreur. Un `.gitkeep` est ignoré par Rojo |
| JSON cassé (`"ServerScriptService" {`) | `Error parsing Rojo project … Failed to parse JSONC`. NB : une **virgule manquante** n'a PAS provoqué d'erreur (parseur JSONC tolérant) |
| `rojo serve` | port 34872 déjà pris par un autre agent → `Could not start the Rojo server on 127.0.0.1:34872. The address may already be in use or reserved…` (quiz). `rojo serve --port 34999` → `Rojo server listening: Address: localhost Port: 34999` |
| Modification de `default.project.json` pendant `rojo serve` | le nouveau RemoteEvent apparaît dans l'arbre servi (`/api/read`, MessagePack) → le Défi est réaliste. Côté Studio non testé (prudence ajoutée : Disconnect/Connect) |
| `rojo sourcemap default.project.json --output sourcemap.json` | `Created sourcemap at sourcemap.json` |
| `rojo syncback --input ../AncienJeu.rbxl --dry-run --list` puis `-y` | liste `Writing src/…` (28 fichiers), puis scripts identiques au corrigé (diff). L'interface InterfaceObby a été écrite en `src/StarterGui/InterfaceObby.rbxm` |
| `selene src` sur le corrigé `projet-reference` | **1 erreur** : `incorrect_standard_library_use: standard library global math does not contain the field isfinite` (Validation.luau:11) — même après `selene update-roblox-std`. `math.isfinite` existe bien (testé avec `luau.exe` : `true false true`). **Signalement transverse** : le corrigé ne passe pas `selene src` sans configuration ; toute leçon qui promet « selene sans erreur » sur le corrigé doit en tenir compte |
| `stylua --check src` sur le corrigé | code 1, 3 fichiers à reformater (Config.luau, Redemarrage, Progression) |
| Script de démonstration (`wait`, variable inutilisée, `" ..player.Name"`) | selene : `warning[unused_variable]` seulement (ne signale PAS `wait`) ; StyLua : diff sur l'espace ; luau-lsp 1.70.1 : `LocalUnused` + `DeprecatedApi: Function 'wait' is deprecated, use 'task.wait' instead` |
| Script `Bonjour.server.luau` de la leçon | `selene src` : 0/0/0 ; `stylua --check src` : rien, code 0 |
| `.gitignore` de la leçon | `git check-ignore -v` : *.rbxl, *.rbxlx, *.rbxl.lock, sourcemap.json bien ignorés |
| `git add .` / `git commit -m` | `[master (root-commit) 7882bbd] Premier commit` / ` 1 file changed…` ; avertissements `LF will be replaced by CRLF` (mentionnés). Config Git passée en `-c` (aucune config globale modifiée) |
| `claude mcp add --help`, `claude mcp remove --help` | syntaxe `claude mcp add [options] <name> <commandOrUrl> [args...]`, `-s/--scope` (défaut local), `-t/--transport` (défaut stdio) |
| `claude mcp add --transport stdio Roblox_Studio_R1 -- cmd.exe /c %LOCALAPPDATA%\Roblox\mcp.bat` (PowerShell, scope local, dans le dossier test) | `Added stdio MCP server … to local config` ; `claude mcp get` → `Status: ✔ Connected`, `Args: /c %LOCALAPPDATA%\Roblox\mcp.bat` (PowerShell ne développe pas `%…%`, cmd.exe le fait au lancement) ; retiré avec `claude mcp remove Roblox_Studio_R1 -s local` |
| idem avec `--scope user` (nom `Roblox_Studio_R1u`) | `✔ Connected` ; retiré avec `claude mcp remove Roblox_Studio_R1u -s user`. `claude mcp list` final identique à l'initial |
| `.claude/settings.json` avec règles `ask` `mcp__Roblox_Studio__…` | `claude doctor` : aucun avertissement (le fonctionnement réel de la règle n'est pas testé, pas de session interactive) |

Non testé : `rojo plugin install` (aurait écrasé le plugin Rojo de la machine), connexion Studio/plugin (fenêtre « Sync changes… », Accept/Abort : libellés lus dans `plugin/src/App/StatusPages/Confirming.lua`), Quick connect (cliquer dans Studio), commande Mac MCP, installations Mac (Git, Rokit, VS Code) : **Mac d'après les docs officielles uniquement** (git-scm.com/install/mac, README Rokit, doc MCP Roblox). La configuration utilisateur existante `Roblox_Studio` (scope user, `cmd.exe /c %LOCALAPPDATA%\Roblox\mcp.bat`) est probablement l'œuvre du Quick connect, sans preuve. Avec Studio fermé, l'état `Connected` n'a pas été vérifié (Studio était ouvert).

## Faits et sources (leçon 01)

- Définition et surfaces de Claude Code (terminal, VS Code/Cursor, JetBrains, desktop onglet Code, web claude.ai/code + mobile) — https://code.claude.com/docs/en/overview
- Comptes acceptés (Pro, Max, Team, Enterprise, Console ; Free exclu) — https://code.claude.com/docs/en/setup (via veille) et https://claude.com/pricing
- Prix : Pro 17 $/mois annuel (200 $) ou 20 $ mensuel ; Max « From $100 » (5x, 20x) ; Team Standard 20/25 $, Premium 100/125 $ — https://claude.com/pricing (relu le 25/10). « shares the same usage limits » : veille (claude.com/pricing/max)
- Âge : « You must be at least 18 years old to use the Services » (consumer terms, Oct 8, 2025) — formulation commune de la décision 38 appliquée
- Sessions web dans des VM Anthropic (donc pas d'accès au Studio local) — https://code.claude.com/docs/en/data-usage (« Cloud sessions run in Anthropic-managed virtual machines »). Déduction raisonnable, formulée prudemment
- Données : « sends … all user prompts and model outputs » ; consommateurs : choix d'entraînement, 5 ans / 30 jours, claude.ai/settings/data-privacy-controls — https://code.claude.com/docs/en/data-usage
- Assistant : bouton à droite de la « mezzanine bar », scripts multiples, « might not function flawlessly », Plan (liste déroulante ou `/plan`, **Build**), 50 modèles procéduraux / 24 h, aucun prix — https://create.roblox.com/docs/assistant/guide
- Skills (… › Assistant Settings › Skills, `rbx-debug`, `rbx-unit-test`…) — https://create.roblox.com/docs/assistant/skills
- Clés d'API (… › Manage API Keys, Anthropic/OpenAI/Google, menu Model) — https://create.roblox.com/docs/ai/accelerated-workflows et annonce DevForum du 21/02/2026. NB : https://create.roblox.com/docs/assistant/mcp renvoie désormais **404**. « Une clé d'API se paie à l'usage chez son fournisseur » : principe général des API, non écrit par Roblox
- Code Assist, `Tab` — https://create.roblox.com/docs/studio/script-editor (via veille, non relu)
- Roblox Terms (données personnelles interdites, responsabilité) — veille §H (non relu)
- Cursor : Free 0, Plus 8 (Grok seulement), Premium 30 (4x, modèles tiers au prix API), Super 100 (15x), Ultra 200 (50x) — https://cursor.com/pricing (relu le 25/10, toujours Grok/SpaceXSI)
- Copilot : Free 0, Pro 10, Pro+ 39, Max 100 ; AI Credits (1 = 0,01 $) ; CLI inclus partout — https://github.com/features/copilot/plans (relu)
- Codex : ChatGPT Free 0, Go 8, Plus 20, Pro dès 100 ; Free = « explore Codex on quick coding tasks » — https://learn.chatgpt.com/docs/pricing (relu)
- Gemini CLI remplacé par Antigravity CLI le 18/06/2026 pour gratuits et Google One — README https://github.com/google-gemini/gemini-cli (relu) ; Antigravity « Available at no charge » — https://antigravity.google/ (relu)
- Clients Quick connect (Antigravity, Codex CLI, Claude Code, Claude Desktop, Cursor, Gemini CLI, VS Code) — https://create.roblox.com/docs/studio/mcp (relu)

## Faits et sources (leçon 02)

- Rokit : dépôt `rojo-rbx/rokit`, commandes d'installation Windows (`Invoke-RestMethod … | Invoke-Expression`) et Mac (`curl -sSf … | bash`) — README relu
- Rojo : installation via Rokit, `rojo plugin install`, plugin par version majeure, Creator Store (URL 13916111004, HTTP 200) — https://rojo.space/docs/v7/getting-started/installation/ (relu)
- `$path`, `$className`, `$ignoreUnknownInstances` (défaut false avec `$path` → suppression des instances inconnues), `emitLegacyScripts` true — https://rojo.space/docs/v7/project-format/ (relu)
- Plugin : `twoWaySync` false, `confirmationBehavior` "Initial" — `plugin/src/Settings.lua` ; textes « Sync changes for project '%s': », Accept/Abort — `plugin/src/App/StatusPages/Confirming.lua`
- `rojo syncback` : `--help` local (7.7.1), options `--input`, `--dry-run`, `--list`, `-y`
- Git : git-scm.com/install/windows (installateur 2.56.0(3)), /install/mac (`xcode-select --install`, Homebrew), book « First-Time Git Setup »
- luau-lsp : extension `JohnnyMorganz.luau-lsp`, définitions Roblox préchargées par défaut, sourcemap auto (`luau-lsp.sourcemap.autogenerate`) — README relu
- StyLua : `--check` (diff, code 1), `stylua.toml`, défauts Tabs/120, `syntax = "Luau"` — README relu. selene : `std = "roblox"` — veille + test
- MCP Studio : activation (… › Manage MCP Servers › Enable Studio as MCP server), Quick connect, JSON/commandes officielles Windows/Mac, avertissement sécurité, dépannage, outils — https://create.roblox.com/docs/studio/mcp (relu). Intégré depuis le 05/03/2026, dépôt archivé le 03/04/2026, redémarrer le client après mise à jour de Studio, données envoyées au fournisseur, « Not every change can be undone » — veille §B
- `claude mcp add` : `--` sépare les options de la commande du serveur ; scopes — https://code.claude.com/docs/en/mcp (relu) + `--help` local
- Règles `ask` pour outils MCP (`mcp__<server>__<tool>`) et « Explicit ask rules still force a prompt » en mode auto — https://code.claude.com/docs/en/permissions et /permission-modes (relus)
- Script Sync : version finale 17/06/2026 (annonce relue, aucun toggle bêta mentionné), conventions de nommage, limites, recommandation Rojo pour tout le projet, extensions recommandées — https://create.roblox.com/docs/scripting/sync (relu ; la page ne dit pas bêta/finale)

## Décisions

1. **`.rbxl` exclus de Git** (`*.rbxl`, `*.rbxlx`) : fichier binaire, verrous Studio ; sauvegarde du niveau par Save to Roblox (historique des versions) + copie datée hors du dossier. Le `.gitignore` de `rojo init` (`/ObbyDesNuages.rbxlx`) est remplacé.
2. **Ordre Git** : `rojo init` lance lui-même `git init` (testé) ; la leçon ne fait donc pas taper `git init` sauf si la ligne n'apparaît pas.
3. **Dossier du projet créé via VS Code (Open Folder)** plutôt qu'avec `cd`, pour éviter les chemins Documents/OneDrive sous Windows.
4. **Alias `stylua`** dans `rokit add JohnnyMorganz/StyLua stylua` (sans alias, la clé du TOML serait `StyLua`).
5. **`claude mcp add` avec `--scope user`** (comme l'entrée que le Quick connect semble produire) ; présentée comme **déduite** de la doc Roblox, testée sous Windows seulement.
6. Pas de mention du plugin `Roblox/roblox-studio-agent-plugin` (`/plugin`) : présence au catalogue non vérifiée (veille).
7. Leçon 02 renvoie à la leçon 03 pour l'installation de Claude Code et les permissions ; l'étape MCP est marquée « après la leçon 3 » dans la checklist.
8. Dossiers vides et Git : pas de `.gitkeep` imposé (complexité) ; encadré `<Erreur>` + question de quiz.
9. Longueur : leçon 02 nettement au-delà de 1 800 mots (tutoriel complet Windows + Mac exigé), durée 90 min (maximum autorisé). Leçon 01 ≈ 2 000 mots de prose.
10. Âge (décision 38) : formulation commune insérée dans la leçon 01 ; rappel « réservé aux 18 ans et plus » dans la leçon 02 (étape MCP). Aucune règle d'âge affirmée pour les autres outils (« lis leurs conditions »).

## Code Luau et verifier-luau

- `Bonjour.server.luau` : propre (selene/StyLua OK).
- Le bloc « Script serveur volontairement imparfait » contient **exprès** `wait(2)` et une variable inutilisée (démonstration des outils qualité). `node scripts/verifier-luau.mjs 02` : **aucun diagnostic** pour mes deux blocs (le script ne remonte que les sorties en échec ; les avertissements lint `DeprecatedApi`/`LocalUnused` sortent en code 0, je les ai obtenus en lançant luau-lsp directement). Les 5 extraits signalés par le script appartiennent à d'autres leçons du module.
- Build (`bash scripts/build-verrou.sh`) : code 0 ; les 10 cases de la checklist sont rendues en `type="checkbox"`.
- Code Assist, `Tab` et `Alt+\` : relu sur https://create.roblox.com/docs/studio/script-editor le 25/10.

## Points incertains / signalements transverses

- **Corrigé et selene** : `projet-reference` échoue à `selene src` (`math.isfinite` inconnu de la std Roblox de selene 0.32.0) et à `stylua --check src` (3 fichiers). Le CLAUDE.md type (« selene src sans erreur ») et les leçons qui le promettent doivent le savoir ; piste : reformater le corrigé avec StyLua et documenter/contourner `math.isfinite` (p. ex. `valeur == valeur and math.abs(valeur) ~= math.huge`) ou une config selene.
- **Rojo et UI construite à la main** : avec `StarterGui` en `$path`, Rojo supprime à la connexion toute interface créée dans Studio (`$ignoreUnknownInstances` false). Les leçons du module 05 qui font construire l'UI à la main doivent dire de la décrire en fichiers (ou de la rapatrier avec `rojo syncback`).
- Libellés de menus Studio (Manage MCP Servers vs Settings › MCP Servers) : variables selon la version, la leçon le dit.
- Quick connect : écrit-il en scope user ? Non vérifié.
- Commande Mac MCP et installations Mac : non testées (pas de Mac).
