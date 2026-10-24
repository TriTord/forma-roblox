# Veille factuelle Roblox × IA (fiche pour les rédacteurs)

Consultation : 2026-10-24 (dernières vérifications faites dans la nuit du 24 au 25). Sauf mention contraire, toutes les sources ont été lues ce jour-là. Pour create.roblox.com/docs, j'ai lu le Markdown source du dépôt `Roblox/creator-docs` (branche `main`) via raw.githubusercontent.com : c'est le même contenu que la page publiée. L'URL publique est indiquée dans chaque puce.

Règle de lecture : chaque puce donne « Fait — source ». Ce qui n'est pas sourcé de façon officielle est classé dans la dernière section.

---

## A. Assistant de Roblox Studio

- **Ce que c'est.** L'Assistant est l'aide IA de Roblox. Il « answer[s] questions, generat[es] content, and perform[s] actions directly in Studio ». Il combine « a large language model (LLM) with a run-command system that can act directly on your data model » — https://create.roblox.com/docs/assistant/guide (consultée le 2026-10-24)
- **Capacités documentées.** Répondre aux questions de développement Roblox, créer et modifier des objets et des scripts dans le data model, insérer des assets du Creator Store, expliquer le code sélectionné, générer des matériaux, des maillages 3D et des modèles procéduraux — https://create.roblox.com/docs/assistant/guide (2026-10-24)
- **Ouvrir l'Assistant.** Cliquer sur **Assistant** à droite de la barre « mezzanine » de Studio, puis saisir une requête. L'icône « redo » régénère la réponse, les pouces haut/bas servent à noter — https://create.roblox.com/docs/assistant/guide (2026-10-24)
- **Scripts.** L'Assistant peut créer plusieurs instances à la fois (exemple de la doc : un RemoteEvent, un LocalScript et un Script serveur). Le nouveau script va dans l'objet sélectionné ; sans sélection, l'Assistant choisit l'emplacement. La doc prévient : « The generated script might not function flawlessly » — https://create.roblox.com/docs/assistant/guide (2026-10-24)
- **Discussions.** Plusieurs fils de discussion par place. L'historique est stocké dans le cloud et rattaché à la **place**, pas à l'expérience. Pas de limite fixe au nombre de discussions. Une discussion supprimée est irrécupérable — https://create.roblox.com/docs/assistant/guide (2026-10-24)
- **Planning Mode (mode planification).** On l'active en choisissant **Plan** dans la liste déroulante du champ de saisie (la liste s'appelle **Agent** dans le guide « Build your first game ») ou avec la commande `/plan`. Les plans sont des documents Markdown modifiables, stockés dans le cloud et privés (invisibles des collaborateurs). Un plan ne s'exécute **jamais** tout seul : il faut cliquer sur **Build** — https://create.roblox.com/docs/assistant/guide et https://create.roblox.com/docs/ai/build-with-assistant (2026-10-24)
  - Annonce : « Announcing Planning Mode for Roblox Assistant », Rusi_002 (Roblox), 16 avril 2026. Elle présente le cadre « Plan, Build, and Test » et des checkpoints pour revenir en arrière — https://devforum.roblox.com/t/announcing-planning-mode-for-roblox-assistant/4580715 (2026-10-24)
  - Plans Markdown modifiables, commande `/insert_asset`, recherche dans les inventaires et dans le Creator Store gratuit et payant : annonce du 18 juin 2026 — https://devforum.roblox.com/t/assistant-update-editable-markdown-plans-improvements-to-searchinsert/4690993 (2026-10-24)
- **Réponse trop longue.** Le message « The current response exceeded the maximum output length » peut apparaître ; on clique alors sur **Continue** — https://create.roblox.com/docs/ai/build-with-assistant (2026-10-24)
- **Commandes slash documentées.** `/plan`, `/generate_mesh`, `/generate_procedural_model`, `/segment_mesh`, `/insert_asset`. La page Texture Generator ajoute `/generate_texture` — https://create.roblox.com/docs/assistant/guide et https://create.roblox.com/docs/studio/texture-generator (2026-10-24)
- **Limite chiffrée officielle.** « up to **50 procedural models within a 24-hour rolling window** » (fenêtre glissante de 24 h) — https://create.roblox.com/docs/assistant/guide (2026-10-24)
- **Maillages.** `/generate_mesh` accepte un texte **ou** une image, pas les deux à la fois. Une Part sélectionnée sert de boîte englobante. Nombre maximal de triangles réglable, 10 000 par défaut — https://create.roblox.com/docs/assistant/guide (2026-10-24)
- **Segmentation.** Jusqu'à 8 parties pour un modèle généré. `/segment_mesh` sur un MeshPart importé accepte jusqu'à 5 noms par passe et est en « early preview » — https://create.roblox.com/docs/assistant/guide (2026-10-24)
- **Sous-agent de capture d'écran.** L'Assistant peut capturer le viewport (en Edit et en Play) pour raisonner sur la scène — https://create.roblox.com/docs/assistant/guide (2026-10-24)
- **Skills.** Ce sont des documents Markdown avec un frontmatter `name` / `description` / `enabled`. Le préfixe `rbx-` est réservé à Roblox. Les skills sont rattachés au **compte** Roblox et valent pour toutes les places. On les gère via **… > Assistant Settings > Skills**. Skills Roblox intégrés : `rbx-create-skill`, `rbx-debug`, `rbx-device-simulator-lua`, `rbx-docs-search`, `rbx-perf-profiling`, `rbx-scene-analysis`, `rbx-unit-test` — https://create.roblox.com/docs/assistant/skills (2026-10-24)
  ```markdown
  ---
  name: luau-style
  description: Apply my Luau naming and formatting conventions when writing or editing scripts.
  enabled: true
  ---
  ```
- **Modèles externes (BYOK, « bring your own key »).** On peut utiliser une clé d'API Anthropic, OpenAI ou Google Gemini : Assistant > **⋯ > Manage API Keys** > choisir le fournisseur > coller la clé > choisir le modèle dans **Model** — https://create.roblox.com/docs/assistant/mcp (2026-10-24). Annonce du 21 février 2026, mise à jour le 25 février : la clé « is masked in the UI and stored securely on your device » — https://devforum.roblox.com/t/studio-mcp-server-updates-and-external-llm-support-for-assistant/4415631 (2026-10-24)
- **Sous-agent de playtest (bêta).** Il s'active via **File > Beta Features > Playtest Agent**. Il a son propre plafond quotidien (valeur non publiée), un test s'arrête après 50 tours, et le résultat vaut Pass, Fail, Inconclusive ou Error. Il tourne sur un modèle opéré par Roblox — https://devforum.roblox.com/t/studio-beta-studio-assistant-mcp-playtest-agent/4566767 (annonce du 9 avril 2026, consultée le 2026-10-24)
- **Code Assist (distinct de l'Assistant).** Complétion de code dans l'éditeur de scripts, automatique ou manuelle avec `Alt+\` (Windows) / `⌥+\` (Mac). `Tab` accepte la suggestion — https://create.roblox.com/docs/studio/script-editor (2026-10-24)
- **Responsabilité.** L'annonce du 5 mars 2026 indique que l'Assistant refuse les demandes hors politique d'usage, que le créateur reste responsable de son jeu, et recommande de relire les scripts générés avant publication — https://devforum.roblox.com/t/assistant-updates-studio-built-in-mcp-server-and-playtest-automation/4474643 (2026-10-24)

## B. Serveur MCP de Roblox Studio

- **Le serveur MCP est intégré à Studio.** « The Roblox Studio MCP server is built into Roblox Studio. » Il tourne en local et utilise le transport **stdio** — https://create.roblox.com/docs/studio/mcp (2026-10-24)
- **Le dépôt `Roblox/studio-rust-mcp-server` est ARCHIVÉ** (lecture seule) depuis le **3 avril 2026**. Sa dernière release s'appelle `END` (3 avril 2026) ; la précédente est v0.2.365 (24 février 2026). Message officiel : « This MCP Server is no longer being actively developed… We've shifted ongoing engineering investment to the built-in MCP Server included with Roblox Studio » — https://github.com/Roblox/studio-rust-mcp-server et https://github.com/Roblox/studio-rust-mcp-server/releases (2026-10-24)
  - Les anciens outils de ce serveur (`run_code`, `insert_model`, `run_script_in_play_mode`, `get_studio_mode`) **ne sont pas** ceux du serveur intégré. Ne pas les enseigner.
- **Date du passage au serveur intégré.** Annonce du 5 mars 2026 (avienn_a, équipe Studio) : « moved the MCP Server into Studio », présenté comme la voie recommandée — https://devforum.roblox.com/t/assistant-updates-studio-built-in-mcp-server-and-playtest-automation/4474643 (2026-10-24)
- **Activer le serveur dans Studio.**
  1. Ouvrir **Assistant**.
  2. Cliquer sur **…** > **Manage MCP Servers**.
  3. Activer **Enable Studio as MCP server**.

  Un indicateur vert affiche le nombre de clients connectés — https://create.roblox.com/docs/studio/mcp (2026-10-24)
  - Le README du plugin officiel donne un autre libellé : **… → Settings → MCP Servers** (« **Manage MCP Servers** in older versions »). Selon la version de Studio, le libellé du menu peut donc changer — https://github.com/Roblox/roblox-studio-agent-plugin (2026-10-24)
- **Quick connect.** Clients pris en charge : Antigravity, Codex CLI, **Claude Code**, Claude Desktop, Cursor, Gemini CLI, Visual Studio Code. Chemin : **Assistant Settings > MCP Servers > Quick connect**, puis activer le client. Si un client manque dans la liste, l'installer puis redémarrer Studio — https://create.roblox.com/docs/studio/mcp (2026-10-24)
- **Configuration JSON officielle** (entrée nommée `Roblox_Studio`) — https://create.roblox.com/docs/studio/mcp (2026-10-24)
  ```json
  {
    "mcpServers": {
      "Roblox_Studio": {
        "command": "cmd.exe",
        "args": ["/c", "%LOCALAPPDATA%\\Roblox\\mcp.bat"]
      }
    }
  }
  ```
  (ci-dessus : Windows ; ci-dessous : macOS)
  ```json
  {
    "mcpServers": {
      "Roblox_Studio": {
        "command": "/Applications/RobloxStudio.app/Contents/MacOS/StudioMCP"
      }
    }
  }
  ```
- **Commande CLI officielle** (la commande à lancer, pas une commande `claude`) — https://create.roblox.com/docs/studio/mcp (2026-10-24)
  ```bash
  # Windows
  cmd.exe /c %LOCALAPPDATA%\Roblox\mcp.bat
  # macOS
  /Applications/RobloxStudio.app/Contents/MacOS/StudioMCP
  ```
- **Brancher Claude Code.** La doc officielle ne donne **aucune** commande `claude mcp add`. Pour Claude Code, elle recommande Quick connect. Sur la machine de l'auteur, la config utilisateur de Claude Code contient exactement l'entrée JSON Windows ci-dessus (`"type": "stdio"`, `cmd.exe /c %LOCALAPPDATA%\Roblox\mcp.bat`). La commande suivante en est **déduite** et n'a pas été testée ici (voir la section « Non confirmé ») :
  ```bash
  # Windows (déduit de la doc)
  claude mcp add --transport stdio Roblox_Studio -- cmd.exe /c %LOCALAPPDATA%\Roblox\mcp.bat
  # macOS (déduit de la doc)
  claude mcp add --transport stdio Roblox_Studio -- /Applications/RobloxStudio.app/Contents/MacOS/StudioMCP
  ```
- **Plugin officiel pour Claude Code et Codex** : `Roblox/roblox-studio-agent-plugin` (licence MIT, version 0.2.2 dans `.claude-plugin/plugin.json`). Installation pour Claude Code d'après le README : « run `/plugin`, search for **Roblox Studio**, and install it ». Dans `/mcp`, on voit alors `plugin:roblox-studio:macos` et `plugin:roblox-studio:windows` ; seule l'entrée de votre OS se connecte. Le plugin « contains no code of its own, only configuration and skill instructions » (skill `roblox-get-started`). claude.ai sur le web ne peut **pas** se connecter à Studio, car le serveur tourne en local — https://github.com/Roblox/roblox-studio-agent-plugin (2026-10-24)
- **Outils documentés sur la page MCP officielle.** Il y en a 26 : `script_read`, `multi_edit`, `script_search` (10 résultats max), `script_grep` (50 correspondances max), `generate_mesh`, `generate_material`, `generate_procedural_model`, `wait_job_finished`, `search_asset`, `insert_asset`, `upload_image`, `store_image`, `subagent` (types `explore` et `playtest`), `search_game_tree`, `inspect_instance`, `execute_luau` (exige `datamodel_type` : Edit, Client ou Server), `get_studio_state`, `start_stop_play`, `get_console_output`, `screen_capture`, `character_navigation`, `user_keyboard_input`, `user_mouse_input`, `http_get` (documentation Roblox autorisée uniquement), `skill`, `list_roblox_studios` — https://create.roblox.com/docs/studio/mcp (2026-10-24)
  - **Absents de la page MCP mais présents dans le README officiel du plugin** : `generate_texture` et `segment_mesh`. La page Texture Generator dit aussi qu'on peut générer des textures « through Roblox Studio MCP ». Les 28 outils de la liste fournie sont donc tous attestés par une source Roblox officielle, mais `generate_texture` et `segment_mesh` manquent sur la page de référence du MCP — https://github.com/Roblox/roblox-studio-agent-plugin et https://create.roblox.com/docs/studio/texture-generator (2026-10-24)
  - Classement du README du plugin. **Lecture seule** : `list_roblox_studios`, `get_studio_state`, `get_console_output`, `script_read`, `script_search`, `script_grep`, `search_game_tree`, `inspect_instance`, `screen_capture`, `http_get`, `skill`, `search_asset`, `wait_job_finished`, `store_image`. **Modifient la place ou le compte** : `execute_luau`, `multi_edit`, `insert_asset`, `generate_mesh`, `generate_material`, `generate_procedural_model`, `generate_texture`, `segment_mesh`, `upload_image`, `start_stop_play`, `character_navigation`, `user_keyboard_input`, `user_mouse_input`, `subagent` — même source.
- **`studio_id` obligatoire.** « Every tool call takes a `studio_id` parameter ». On obtient l'identifiant avec `list_roblox_studios`. L'outil `set_active_studio` a été **supprimé** (annonce du 19 août 2026) — https://create.roblox.com/docs/studio/mcp et https://devforum.roblox.com/t/studio-mcp-multi-agent-improvements-and-connected-ai-clients/4820583 (2026-10-24)
- **Après une mise à jour de Studio**, redémarrer une fois le client IA pour qu'il récupère les nouveaux outils — https://devforum.roblox.com/t/studio-mcp-multi-agent-improvements-and-connected-ai-clients/4820583 (2026-10-24)
- **Sécurité, position officielle.**
  - Doc : « MCP clients can read and modify content in your open Roblox places. Make sure to only connect clients you trust. » — https://create.roblox.com/docs/studio/mcp
  - README du plugin : « your assistant changes your place directly… Not every change can be undone from Studio, so save or publish a version of your place before asking for bigger changes ». Les résultats d'outils (scripts, propriétés, console, captures d'écran) sont envoyés au fournisseur d'IA — https://github.com/Roblox/roblox-studio-agent-plugin
  - Les agents externes peuvent désactiver l'outil `subagent` dans leurs réglages MCP (réponse du staff dans le fil du playtest agent) — https://devforum.roblox.com/t/studio-beta-studio-assistant-mcp-playtest-agent/4566767 (2026-10-24)
- **Dépannage officiel.** Redémarrer Studio et le client, vérifier que le chemin existe, vérifier la syntaxe JSON (une virgule manquante suffit à tout casser) — https://create.roblox.com/docs/studio/mcp (2026-10-24)
- **Page de doc obsolète.** https://create.roblox.com/docs/assistant/mcp pointe encore vers le dépôt archivé `studio-rust-mcp-server`. Ne pas s'en servir comme référence d'installation (consultée le 2026-10-24).
- **Tests multijoueurs.** `StudioTestService` (pour les plugins) complète `start_stop_play` : `ExecuteMultiplayerTestAsync` accepte jusqu'à 8 clients simulés — https://create.roblox.com/docs/reference/engine/classes/StudioTestService (2026-10-24)

## C. Rojo et synchronisation de fichiers

### Script Sync : la solution native de Roblox (point très important)

- **Script Sync est en version finale (« Full Release ») depuis le 17 juin 2026.** Annonce : « Following our beta, Studio Script Sync is now fully released » — https://devforum.roblox.com/t/full-release-studio-script-sync/4688454 (2026-10-24). Bêta publique : novembre 2025 — https://devforum.roblox.com/t/studio-script-sync-now-in-beta/4065468
- **Principe.** Les scripts du data model sont synchronisés avec des fichiers sur le disque **dans les deux sens** : « Changes made to the Luau files on disk are applied to the scripts in Studio, and vice versa » — https://create.roblox.com/docs/scripting/sync (2026-10-24)
- **Mise en place.**
  1. Dans l'Explorer, clic droit sur un dossier ou un service > **Sync to…**.
  2. Choisir un répertoire.
  3. Clic droit > **Script Sync > Reveal in Explorer** (Windows) ou **Reveal in Finder** (macOS).

  Roblox recommande fortement de synchroniser des **dossiers** plutôt que des scripts isolés. La synchronisation reprend automatiquement à la réouverture de la place — https://create.roblox.com/docs/scripting/sync (2026-10-24)
- **Conventions de nommage Script Sync** — https://create.roblox.com/docs/scripting/sync (2026-10-24)

  | Sur disque | Dans Studio |
  |---|---|
  | `name.luau` | ModuleScript |
  | `name.server.luau` | Script, RunContext `Server` |
  | `name.client.luau` | Script, RunContext `Client` |
  | `name.local.luau` | LocalScript |
  | `name.legacy.luau` | Script, RunContext `Legacy` |
  | `name.plugin.luau` | Script, RunContext `Plugin` |
  | `name/` | Folder |
  | `name/init.*.luau` | Script avec enfants |

- **Limites et pièges.**
  - Script Sync ne gère que les instances Script, LocalScript, ModuleScript et Folder ; tout le reste est ignoré.
  - Jusqu'à 10 000 scripts par instance racine, et 128 racines au maximum.
  - Ne pas synchroniser de scripts qui portent des attributs ou des tags : risque de perte de données.
  - Les noms doivent être compatibles avec le système de fichiers.
  - Fonctionne avec Team Create, mais éviter que plusieurs personnes modifient le même fichier.
  - Le débogueur de Studio ne se pilote pas depuis un éditeur externe.

  Source : https://create.roblox.com/docs/scripting/sync (2026-10-24)
- **Script Sync ou Rojo, d'après Roblox.** Pour garder le code sous Git mais tout le reste dans Studio : Script Sync. Pour versionner le projet entier ou faire du système de fichiers la source de vérité : un outil tiers comme Rojo — https://create.roblox.com/docs/scripting/sync et https://create.roblox.com/docs/projects/external-tools (2026-10-24)
- **Guide officiel « Build with a coding harness ».** Il associe Script Sync, le serveur MCP et Git, avec un projet de départ `WaveSurvival` (dossiers `ServerScriptService/`, `ReplicatedStorage/`, `StarterPlayerScripts/`). Le MCP « covers anything Script Sync cannot reach, such as StarterGui and StarterPack ». Pour vérifier l'état de synchronisation, le guide fait exécuter `game:GetService("InstanceFileSyncService"):GetStatus(instance)` — https://create.roblox.com/docs/ai/coding-harness (2026-10-24)
  - ⚠ Ce guide parle encore d'activer « Script Sync beta » via **File → Beta Features**, alors que l'annonce du 17 juin 2026 dit que la fonctionnalité est sortie. Voir la section « Non confirmé ».
- **API pour les plugins.** `InstanceFileSyncService` (« currently known as Script Sync ») : `GetStatus`, `GetAllInstances`, `GetSyncedInstance`, événement `StatusChanged`. Sécurité : `PluginSecurity` — https://create.roblox.com/docs/reference/engine/classes/InstanceFileSyncService (2026-10-24)

### Rojo

- **Version actuelle : v7.7.1, publiée le 2 octobre 2026** (le CHANGELOG indique « October 1st, 2026 »). v7.7.0 est sortie le 1er juillet 2026 — https://github.com/rojo-rbx/rojo/releases et https://github.com/rojo-rbx/rojo/blob/master/CHANGELOG.md (2026-10-24)
- **Installations officiellement prises en charge** (rojo.space) — https://rojo.space/docs/v7/getting-started/installation/, source https://github.com/rojo-rbx/rojo.space/blob/master/docs/getting-started/installation.mdx (2026-10-24) :
  - **Extension VS Code** `evaera.vscode-rojo`. Elle **n'ajoute pas** `rojo` au PATH, il faut installer la CLI à part.
  - **CLI via Rokit**, l'option par défaut et l'outil « in-house » de Rojo :
    ```bash
    rokit add rojo-rbx/rojo
    rokit install
    ```
  - **Binaires** depuis les GitHub Releases.
  - **Cargo** :
    ```bash
    cargo install rojo --version ^7
    ```
- **Plugin Studio.**
  ```bash
  rojo plugin install
  ```
  Autres sources : l'asset Creator Store 13916111004 (https://create.roblox.com/store/asset/13916111004/Rojo) ou le `.rbxm` des releases. « Rojo has a separate plugin for each major version » — https://rojo.space/docs/v7/getting-started/installation/ et https://create.roblox.com/docs/projects/external-tools (2026-10-24)
- **Commandes de la CLI.** Les sous-commandes présentes dans le code source sont `init`, `serve`, `build`, `upload`, `sourcemap`, `fmt-project`, `doc`, `plugin`, `syncback` — https://github.com/rojo-rbx/rojo/blob/master/src/cli/mod.rs (2026-10-24)
  ```bash
  rojo init my-new-game              # --kind place (défaut) | model | plugin ; --skip-git
  rojo build -o build.rbxlx          # ou .rbxl pour un fichier binaire
  rojo serve                         # « Rojo server listening » sur localhost:34872
  rojo sourcemap --watch default.project.json --output sourcemap.json
  rojo syncback [projet] --input [fichier.rbxl]   # depuis 7.7.0-rc.1
  ```
  Sources : https://github.com/rojo-rbx/rojo/blob/master/src/cli/init.rs, https://rojo.space/docs/v7/getting-started/new-game/ et le README de luau-lsp (2026-10-24). Options de `sourcemap` : `--output/-o`, `--include-non-scripts`, `--watch`, `--absolute` — https://github.com/rojo-rbx/rojo/blob/master/src/cli/sourcemap.rs
- **Structure générée par `rojo init`** (gabarit `place`) — https://github.com/rojo-rbx/rojo/tree/master/assets/project-templates/place (2026-10-24) :
  ```
  default.project.json
  README.md
  .gitignore                     (gitignore.txt dans le gabarit)
  src/shared/Hello.luau          -> ReplicatedStorage.Shared
  src/server/init.server.luau    -> ServerScriptService.Server
  src/client/init.client.luau    -> StarterPlayer.StarterPlayerScripts.Client
  ```
  Extrait de `default.project.json` :
  ```json
  {
    "name": "{project_name}",
    "tree": {
      "$className": "DataModel",
      "ReplicatedStorage": { "Shared": { "$path": "src/shared" } },
      "ServerScriptService": { "Server": { "$path": "src/server" } },
      "StarterPlayer": { "StarterPlayerScripts": { "Client": { "$path": "src/client" } } }
    }
  }
  ```
  (Le gabarit complet ajoute aussi une Baseplate dans Workspace, des réglages Lighting et SoundService.) Comme `server` et `client` contiennent un `init.*.luau`, `Server` et `Client` deviennent des **scripts**, pas des dossiers.
- **`.luau`.** Pris en charge depuis Rojo 7.2.0. Depuis 7.4.0, `rojo init` génère des `.luau` au lieu de `.lua`. `.plugin.lua(u)` (RunContext Plugin) est pris en charge depuis 7.5 — https://github.com/rojo-rbx/rojo/blob/master/CHANGELOG.md (2026-10-24)
- **⚠ Divergence Rojo / Script Sync sur `.client.luau`.** Le champ projet `emitLegacyScripts` vaut `true` par défaut, donc Rojo produit un **LocalScript** pour `*.client.lua(u)` et un Script en RunContext Legacy pour `*.server.lua(u)`. Script Sync, lui, produit un Script en RunContext Client pour `.client.luau` — https://rojo.space/docs/v7/project-format/ (source rojo.space `docs/project-format.md`) et https://create.roblox.com/docs/scripting/sync (2026-10-24)
  - La page « Sync Details » de rojo.space ne mentionne encore que les extensions `.lua`, alors que `.luau` fonctionne — https://github.com/rojo-rbx/rojo.space/blob/master/docs/sync-details.md
- **Synchronisation bidirectionnelle (two-way sync) dans Rojo.** « Rojo also has an optional two-way sync setting in the Studio plugin for syncing supported Studio edits back to the filesystem » — https://github.com/rojo-rbx/rojo (README, 2026-10-24). Le réglage du plugin `twoWaySync` vaut `false` par défaut — https://github.com/rojo-rbx/rojo/blob/master/plugin/src/Settings.lua. Le CHANGELOG l'a historiquement qualifié d'« EXPERIMENTAL ». Pour rapatrier depuis un fichier de place, l'outil officiel est désormais `rojo syncback`.
- **Sécurité de `rojo serve`** (7.7.0). Validation des en-têtes `Host` et `Origin` contre le DNS rebinding, avec l'option `--allowed-hosts` — CHANGELOG (2026-10-24)
- **Limites de la synchro en direct.** Certaines propriétés ne passent pas : données binaires (Terrain, CSG), `MeshPart.MeshId`, `HttpService.HttpEnabled` — https://rojo.space/docs/v7/sync-details/ (2026-10-24)
- **Avertissement Roblox.** « The tools on this page are not maintained by Roblox and can change or stop working at any time » — https://create.roblox.com/docs/projects/external-tools (2026-10-24)

## D. Rokit

- **Rokit est le gestionnaire de chaîne d'outils de l'organisation rojo-rbx.** Dépôt : `rojo-rbx/rokit` (l'URL `rokit-rs/rokit` n'existe pas). Dernière release : **v1.2.0 (30 septembre 2025)**, dépôt toujours actif (push du 27 septembre 2026) — https://github.com/rojo-rbx/rokit (2026-10-24)
- **Installation** — https://github.com/rojo-rbx/rokit#installation (2026-10-24) :
  ```sh
  # macOS & Linux
  curl -sSf https://raw.githubusercontent.com/rojo-rbx/rokit/main/scripts/install.sh | bash
  ```
  ```powershell
  # Windows (PowerShell)
  Invoke-RestMethod https://raw.githubusercontent.com/rojo-rbx/rokit/main/scripts/install.ps1 | Invoke-Expression
  ```
  Autre méthode pour Windows : télécharger `rokit.exe` et le lancer par **double-clic**. Depuis un terminal, il faut taper `rokit.exe self-install`.
- **Commandes** : `rokit init`, `rokit add`, `rokit list`, `rokit install`, `rokit update`, `rokit authenticate`, `rokit self-update`, `rokit self-install` — même source.
  ```bash
  rokit init
  rokit add rojo-rbx/rojo
  rokit install
  ```
- **Format de `rokit.toml`** (exemple tiré de la doc Roblox) — https://create.roblox.com/docs/projects/external-tools (2026-10-24)
  ```toml
  [tools]
  rojo = "rojo-rbx/rojo@7.6.1"
  wally = "upliftgames/wally@0.3.2"
  lune = "lune-org/lune@0.10.4"
  ```
  Les versions de cet exemple sont anciennes. En octobre 2026, les versions actuelles sont rojo 7.7.1, lune 0.11.1, selene 0.32.0 et stylua 2.6.0 (voir E et F).
- **Compatibilité.** Rokit fonctionne dans les projets qui utilisent `foreman.toml` ou `aftman.toml` — README Rokit.
- **Aftman est ARCHIVÉ** (`LPGhatguy/aftman`, dernière release v0.3.0 du 22 mai 2024). **Foreman** (`Roblox/foreman`) est maintenu (v1.7.0 du 1er mai 2026), mais le README de Rokit le décrit comme « angled itself towards internal uses at Roblox » — https://github.com/LPGhatguy/aftman, https://github.com/Roblox/foreman (2026-10-24)

## E. luau-lsp, selene, StyLua

- **luau-lsp.** Dernière release **1.70.1 (27 septembre 2026)**, dépôt actif. Extension VS Code `JohnnyMorganz.luau-lsp` (aussi sur OpenVSX). Les définitions de types Roblox sont préchargées par défaut (`luau-lsp.platform.type`) — https://github.com/JohnnyMorganz/luau-lsp (2026-10-24)
  - **Mode Rojo** (Rojo v7.3.0 ou plus). Le serveur suit un `sourcemap.json` à la racine, généré par :
    ```bash
    rojo sourcemap --watch default.project.json --output sourcemap.json
    ```
    Réglages : `luau-lsp.sourcemap.enabled` (activé), `luau-lsp.sourcemap.autogenerate` (activé), `luau-lsp.sourcemap.rojoProjectFile` (`default.project.json`), `luau-lsp.sourcemap.sourcemapFile`. Mettre `sourcemap.json` dans `.gitignore` (Rojo 7.6.1 l'y ajoute par défaut).
  - **Plugin compagnon Studio** « Luau Language Server Companion » (asset 10913122509). Roblox **recommande fortement** l'extension et ce plugin quand on utilise **Script Sync** — https://create.roblox.com/docs/scripting/sync (2026-10-24)
  - Analyse en ligne de commande (CI) : `luau-lsp analyze`. Configuration générale dans `.luaurc`.
- **selene.** Dernière release **0.32.0 (1er octobre 2026)** ; elle prend en charge la nouvelle syntaxe Luau `if local` / `if const`. selene reconnaît l'extension `.luau` par défaut — https://github.com/Kampfkarren/selene/blob/main/CHANGELOG.md (2026-10-24)
  ```toml
  # selene.toml
  std = "roblox"
  ```
  ```bash
  selene src
  ```
  La bibliothèque standard Roblox est générée automatiquement et se met à jour toutes les 6 h (`selene update-roblox-std` pour forcer). Pour TestEZ : `std = "roblox+testez"` avec un `testez.yml` — https://kampfkarren.github.io/selene/roblox.html (source `docs/src/roblox.md`, 2026-10-24). Extension VS Code : `Kampfkarren.selene-vscode`.
- **StyLua.** Dernière release **v2.6.0 (10 octobre 2026)**. Les binaires GitHub incluent toutes les syntaxes, Luau compris. Il cherche `stylua.toml` ou `.stylua.toml`. Par défaut : `indent_type = "Tabs"`, `column_width = 120`. Le tri des `require` existe mais est désactivé par défaut — https://github.com/JohnnyMorganz/StyLua (2026-10-24)
  ```toml
  # stylua.toml
  syntax = "Luau"   # optionnel, lève les ambiguïtés (ex. :: de Lua 5.2)
  ```
  ```bash
  stylua src            # formate
  stylua --check src    # vérifie sans écrire ; code de sortie 1 s'il reste du code à formater
  ```
  Extension VS Code : `JohnnyMorganz.stylua`. Dans les fichiers ignorés, `**/*.luau` n'est cherché que si la syntaxe Luau est active.

## F. Tests automatisés Luau

- **TestEZ (`Roblox/testez`) est ARCHIVÉ.** Dernière release v0.4.2 du 5 janvier 2022 — https://github.com/Roblox/testez (2026-10-24)
- **Jest Roblox (`Roblox/jest-roblox`) est actif** (push du 2 octobre 2026). Le README indique la version **3.20.0** (paquets Wally `roblox/jest@=3.20.0` et `roblox/jest-globals@=3.20.0`), plus un asset Creator Store (16031830738). Fichiers de test : `.spec.lua` ou `.spec.luau` dans des dossiers `__tests__/`. Il peut s'exécuter dans Roblox, « including via Roblox's OCALE (Open Cloud API for Luau Execution) for testing on CI systems » — https://github.com/Roblox/jest-roblox (README, branche master, 2026-10-24)
  ```toml
  [dev-dependencies]
  Jest = "roblox/jest@=3.20.0"
  JestGlobals = "roblox/jest-globals@=3.20.0"
  ```
- **`jsdotlua/jest-lua`** est un fork communautaire, sans activité depuis le 23 décembre 2024 (v3.10.0). Préférer `Roblox/jest-roblox` — https://github.com/jsdotlua/jest-lua (2026-10-24)
- **run-in-roblox (`rojo-rbx/run-in-roblox`)** n'est pas archivé, mais sa dernière release (v0.3.0) date du 20 juillet 2020. À considérer comme non maintenu — https://github.com/rojo-rbx/run-in-roblox (2026-10-24)
- **Lune (`lune-org/lune`)** est un runtime Luau autonome, actif, en **v0.11.1 (21 octobre 2026)**. Il propose une bibliothèque optionnelle pour manipuler les fichiers de place et de modèle, mais **ce n'est pas le moteur Roblox** : Jest Lua « can currently only run inside of Roblox » — https://github.com/lune-org/lune et https://github.com/jsdotlua/jest-lua (2026-10-24)
- **Ce que Roblox fournit officiellement.**
  - Le skill Assistant `rbx-unit-test` : écrire, lancer et déboguer des tests unitaires de ModuleScripts. Il détecte Jest-Lua ou TestEZ et se rabat sinon sur un harnais intégré ; il lance les tests en Play — https://create.roblox.com/docs/assistant/skills
  - `StudioTestService` pour automatiser Test et Run depuis un plugin, jusqu'à 8 clients — https://create.roblox.com/docs/reference/engine/classes/StudioTestService
  - Le sous-agent `playtest` du MCP — https://create.roblox.com/docs/studio/mcp
  - `TestService` existe, mais sa doc dit « used by Roblox to run controlled tests of the engine. It is available for developers to use, to a limited degree » — https://create.roblox.com/docs/reference/engine/classes/TestService (2026-10-24)
  - L'annonce du 18 juin 2026 cite « unit test generation » parmi les prochaines nouveautés — https://devforum.roblox.com/t/assistant-update-editable-markdown-plans-improvements-to-searchinsert/4690993

## G. Outils IA de Roblox pour les assets

- **Vue d'ensemble officielle** (page « AI on Roblox ») : mesh generation, procedural models, interactive 3D models, Avatar Auto-Setup, Material generator, Texture generator, Text-to-speech, Speech-to-text, Text generation, Code Assist, Assistant, Studio MCP server. Les fonctions en bêta s'activent via **File → Beta Features** — https://create.roblox.com/docs/ai/accelerated-workflows (2026-10-24)
- **Cube / GenerationService.** `GenerationService` génère des objets 3D « using Roblox's Cube 3D foundation model ». Méthodes : `GenerateMeshAsync` (appel côté serveur obligatoire, limite de débit par minute, refus par la modération possible), `LoadGeneratedMeshAsync`, `GenerateModelAsync` et `SegmentMeshAsync` — https://create.roblox.com/docs/reference/engine/classes/GenerationService (2026-10-24)
  - `GenerateModelAsync` ne prend en charge que deux schémas fixes : `Car5` (une carrosserie et 4 roues) et `Body1` (un seul MeshPart) — https://create.roblox.com/docs/parts/model-generation (2026-10-24)
  ```lua
  local GenerationService = game:GetService("GenerationService")
  local ok, result = pcall(function()
      return GenerationService:GenerateModelAsync({ TextPrompt = "green dragon car with 4 wheels" }, { PredefinedSchema = "Car5" })
  end)
  ```
- **Cube en open source.** Dépôt `Roblox/cube`, actif. Mises à jour : Cube 3D v0.5 (juillet 2025), **CubePart** (mai 2026, génération 3D contrôlable par parties). Poids publiés sur Hugging Face — https://github.com/Roblox/cube (2026-10-24)
- **Texture Generator.** Ouverture : sélectionner un mesh, puis onglet **Model > Texture**. Il accepte un texte ou une image comme prompt et renvoie 3 aperçus en environ 10 s. Deux modes :
  - **Fast** : texture diffuse 1K en moins de 30 s.
  - **Quality** : texture PBR 4K appliquée via `SurfaceAppearance`.

  Accessible aussi par `/generate_texture` et par le MCP — https://create.roblox.com/docs/studio/texture-generator (2026-10-24)
- **Material Generator.** Menu **Window > 3D**, ou bouton **Generate** dans le sélecteur de matériaux. Produit des MaterialVariants qui se répètent (« tiling ») — https://create.roblox.com/docs/studio/material-generator (2026-10-24)
- **Avatar Setup (Avatar Auto-Setup).** Rigging R15, skinning, animation faciale (FACS), cages, découpage en 15 parties, attachments. Les modèles importés passent en file de modération — https://create.roblox.com/docs/avatar-setup (2026-10-24)
- **Photo-to-avatar** (`AvatarCreationService`) est en **alpha** — https://create.roblox.com/docs/avatar/avatar-generation (2026-10-24)
- **TextGenerator (LLM en jeu).** Limite initiale de 100 requêtes par minute, qui augmente avec le nombre d'utilisateurs simultanés — https://create.roblox.com/docs/reference/engine/classes/TextGenerator (2026-10-24). La page « AI on Roblox » précise : « All generated text must be processed through the `TextService:FilterStringAsync()` method » — https://create.roblox.com/docs/ai/accelerated-workflows
- **Text-to-Speech (`AudioTextToSpeech`).** Limite : `1 + (6 * number_of_concurrent_users)` requêtes par minute et par expérience, plus 4 requêtes par seconde et par utilisateur côté client. On peut acheter du volume en plus via les Extended Services — https://create.roblox.com/docs/reference/engine/classes/AudioTextToSpeech (2026-10-24). Bêta Studio (récap du 19 au 23 octobre 2026) : `AssetService:CreateAssetAsync` accepte des `AudioTextToSpeech` pour générer des répliques vocales hors limites d'exécution — https://devforum.roblox.com/t/weekly-recap-october-19%E2%80%9323-2026/4953263
- **Speech-to-Text (`AudioSpeechToText`).** « Converts spoken audio into text » — https://create.roblox.com/docs/reference/engine/classes/AudioSpeechToText (2026-10-24)
- **Traduction automatique.**
  - Automatic Text Capture collecte les chaînes ; il faut ensuite activer **Use Translated Content** et choisir les langues (le français en fait partie).
  - Quotas : un quota initial puis un quota **mensuel**, comptés par caractère **et** par langue (« hello » vers 10 langues = 50 caractères).
  - La traduction automatique ne remplace jamais une traduction manuelle.

  Source : https://create.roblox.com/docs/production/localization/automatic-translations (2026-10-24)
- **Données d'entraînement.** Le partage de données est activé par défaut pour ce qui est publié depuis le 10 juillet 2024. Les assets **gratuits** du Creator Store sont toujours partagés, sans possibilité de refus. Réglage : Creator Hub > Settings > **Data Sharing** — https://create.roblox.com/docs/ai-data-sharing (2026-10-24)
- **Annonces RDC26 (11 septembre 2026), sans date précise :** « Scene Generation » et « NPC Dynamic Behavior », prévus pour fin 2026 — https://devforum.roblox.com/t/rdc26-what-we-announced/4865880 (2026-10-24)

## H. Règles de Roblox sur le contenu généré par IA

- **Conditions d'utilisation (Terms of Use), section « AI Features »** (article mis à jour le 7 octobre 2026) — https://en.help.roblox.com/hc/en-us/articles/115004647846-Roblox-Terms-of-Use (lu via l'API du Help Center le 2026-10-24) :
  - « You, not Roblox, are responsible for your use and interactions with AI Features, all Prompts you submit, and your use of Output. »
  - « As between you and Roblox, and to the extent permitted by applicable law, you retain any right, title, and interest that you have in the Prompts and Outputs. »
  - Vous accordez à Roblox une licence sur les prompts et les sorties, y compris « in connection with the training of models ». Cette licence ne change pas vos préférences de partage de données.
  - Usages interdits, entre autres : soumettre des données personnelles ou confidentielles ; faire croire qu'une sortie a été créée par un humain ; demander un avis professionnel (médical, juridique…) ; retirer les « provenance or metadata tags from any Output » ; contourner les filtres de sécurité.
  - Avertissement : les sorties « may be unreliable or incomplete, or contain errors » ; « You should evaluate and verify Outputs before using or sharing them ».
  - **Creator Terms, « AI Technologies & AI Tools ».** Le créateur doit informer clairement les joueurs : « AI is not human », la sortie est générée artificiellement et peut être inexacte, et le joueur doit savoir qu'il parle à un chatbot dès le début de l'échange. Il est interdit de « mislead Users into believing that AI output is human ». Roblox « may restrict your use of AI Tools in relation to specific age groups of Users ».
- **Nouvelles conditions au 1er novembre 2026** (annoncées le 1er octobre 2026). L'annonce ne mentionne pas l'IA. Elle porte sur la réorganisation du texte, le statut de « merchant of record », les créateurs et l'accord parental pour les mineurs — https://devforum.roblox.com/t/updates-to-the-roblox-terms-of-use-november-2026/4907620 (2026-10-24). Revérifier la section IA après le 1er novembre.
- **Page Roblox « Games with Generative AI »** — https://create.roblox.com/docs/generative-AI (2026-10-24) :
  - Tout contenu généré par IA doit respecter les Community Standards.
  - Avec les API Roblox (`GenerationService`, `TextGenerator`), les entrées et sorties sont modérées.
  - Avec des **outils tiers**, « You are responsible for the content delivered to users, even if it is AI-generated ». Le texte doit passer par `TextChatService`.
  - Toute interaction de joueurs avec un modèle génératif doit être déclarée dans le questionnaire **Content Maturity**. Les « extended interactions » (conversation continue, mémoire entre sessions) imposent le label **Restricted**, donc un accès réservé aux 18 ans et plus.
  - Mention obligatoire visible, par exemple : « This is an AI-powered conversation, not human. It may make mistakes. » Il faut aussi orienter vers une aide professionnelle en cas de détresse.
- **Community Standards.** Le texte des règles ne contient **aucun** passage propre à l'IA ou aux médias synthétiques. Il contient la règle sur la propriété intellectuelle : « We expect you to respect the intellectual property rights of others, and will remove infringing content » ; Roblox peut aussi supprimer de façon proactive des assets suspectés de contrefaçon — https://about.roblox.com/community-standards (2026-10-24)
- **Creator Store / Marketplace.** La politique du Marketplace et la page propriété intellectuelle (`marketplace/marketplace-policy.md`, `marketplace/intellectual-property.md`) ne contiennent **aucune** règle propre aux assets générés par IA. La FAQ du Creator Store traite seulement de l'usage des modèles payants pour l'entraînement (opt-in) — https://create.roblox.com/docs/production/creator-store (2026-10-24)
- **Bonne pratique Roblox pour l'Assistant et le MCP.** Relire les scripts générés avant de publier ; le créateur reste responsable — annonce du 5 mars 2026 (voir B).

## I. API souvent hallucinées ou dépréciées

Toutes les mentions viennent de la référence du moteur (`content/en-us/reference/engine/**.yaml`), lue le 2026-10-24. URL publique : `https://create.roblox.com/docs/reference/engine/...`.

| À éviter (tag Deprecated sauf mention) | À utiliser | Source (create.roblox.com/docs/reference/engine/…) |
|---|---|---|
| `wait()` | `task.wait()` (« superseded by `task.wait()` and should not be used for future work ») | globals/RobloxGlobals |
| `spawn()` | `task.spawn()` | globals/RobloxGlobals |
| `delay()` | `task.delay()` | globals/RobloxGlobals |
| `Player:LoadCharacter()` | `Player:LoadCharacterAsync()` | classes/Player |
| `Player:LoadCharacterWithHumanoidDescription()` | `…WithHumanoidDescriptionAsync()` | classes/Player |
| `Humanoid:LoadAnimation()` (et `AnimationController:LoadAnimation()`) | `Animator:LoadAnimation()` (l'Animator peut être créé à l'édition ou à l'exécution) | classes/Humanoid, classes/Animator |
| `BodyVelocity` | `LinearVelocity` | classes/BodyVelocity |
| `BodyPosition` | `AlignPosition` | classes/BodyPosition |
| `BodyGyro` | `AlignOrientation` | classes/BodyGyro |
| `BodyForce` | `VectorForce` | classes/BodyForce |
| `BodyAngularVelocity` | `AngularVelocity` | classes/BodyAngularVelocity |
| `BodyThrust`, `RocketPropulsion` | classes dépréciées (voir les notes de conversion) | classes/BodyThrust, classes/RocketPropulsion |
| `BasePart.Velocity` / `RotVelocity` | `AssemblyLinearVelocity` / `AssemblyAngularVelocity` | classes/BasePart |
| `MarketplaceService:GetProductInfo()` | `GetProductInfoAsync(assetId, infoType)` | classes/MarketplaceService |
| `MarketplaceService:PlayerOwnsAsset()` | `PlayerOwnsAssetAsync()` | classes/MarketplaceService |
| `Model:SetPrimaryPartCFrame()` | `PVInstance:PivotTo()` | classes/Model, classes/PVInstance |
| `Model:GetModelCFrame()` | (déprécié, « did not provide reliable results ») → `GetBoundingBox()` / `GetPivot()` | classes/Model |
| `Instance:Remove()` | `Instance:Destroy()` / `ClearAllChildren()` | classes/Instance |
| `InsertService:GetFreeModels()` | `GetFreeModelsAsync()` | classes/InsertService |
| `Player:GetRankInGroup()` / `GetRoleInGroup()` / `IsInGroup()` | les variantes `…Async()`. **Mais** `GetRankInGroupAsync` et `GetRoleInGroupAsync` sont elles aussi dépréciées → `GroupService:GetRolesInGroupAsync()` | classes/Player |
| `TeleportService:Teleport()` (sans tag, mais avec message) | `TeleportAsync()` côté serveur ; côté client, passer par un RemoteEvent | classes/TeleportService |
| Service `Chat` (« This class is deprecated ») | `TextChatService` (migration obligatoire en mai 2027 selon le récap du 19 au 23 octobre 2026) | classes/Chat |
| `game.workspace` (propriété en minuscule) | `game.Workspace` ou `game:GetService("Workspace")` | classes/DataModel |
| `Workspace.FilteringEnabled` | « This property is discontinued » (le gabarit Rojo l'écrit encore, c'est sans effet) | classes/Workspace |
| `BasePart:BreakJoints()` / `MakeJoints()` | dépréciés | classes/BasePart |
| `ypcall`, `elapsedTime`, `version`, `stats`, `printidentity` | dépréciés | globals/RobloxGlobals |
| `AssetService:PromptCreateAssetAsync` | `PromptCreatePlatformContentAsync` (récap du 19 au 23 octobre 2026) | https://devforum.roblox.com/t/weekly-recap-october-19%E2%80%9323-2026/4953263 |

- **`Instance.new(class, parent)`.** Pas déprécié, mais **déconseillé** : « it's recommended to set the instance's `Parent` property **last** … instead of specifying the second argument (`parent`) » — https://create.roblox.com/docs/reference/engine/datatypes/Instance (2026-10-24)
  ```lua
  local part = Instance.new("Part")
  part.Position = Vector3.new(0, 10, 0)
  part.Parent = workspace -- en dernier
  ```
- **`workspace` (global) et `game.Workspace`.** Le global `workspace` **n'est pas** déprécié (« A reference to the Workspace service ») — https://create.roblox.com/docs/reference/engine/globals/RobloxGlobals. Les exemples de la doc utilisent de préférence `game:GetService("Workspace")`. Seul `game.workspace`, en minuscule, est déprécié.
- **Toujours valides, sans aucune mention de dépréciation :**
  - `MarketplaceService:PromptProductPurchase(player, productId, equipIfPurchased=true, currencyType=Default)`
  - le callback `MarketplaceService.ProcessReceipt`
  - `PromptGamePassPurchase` et `UserOwnsGamePassAsync`
  - `RunService.Heartbeat`, `Stepped` et `RenderStepped` (non dépréciés ; `PreSimulation` existe aussi)
  - `Debris:AddItem`, `Humanoid:MoveTo`, `Model:MoveTo`

  Source : classes/MarketplaceService et classes/RunService (2026-10-24)
- **DataStores.**
  - Signature : `DataStoreService:GetDataStore(name: string, scope: string = "global", options: Instance = nil)`.
  - `DataStoreOptions` n'a qu'une propriété utile, `AllScopes`. `DataStoreOptions:SetExperimentalFeatures` « Currently has no observable effect » : la vieille astuce `SetExperimentalFeatures({v2 = true})` ne sert plus à rien.
  - Métadonnées via `DataStoreSetOptions:SetMetadata()`. `SetAsync(key, value, userIds, setOptions)`. `GetAsync`, `IncrementAsync` et `RemoveAsync` renvoient un `DataStoreKeyInfo` en second résultat.
  - Toujours entourer ces appels d'un `pcall`. Le callback d'`UpdateAsync` ne doit **pas** céder la main (pas de `task.wait`).
  - Accès depuis Studio : activer **Enable Studio Access to API Services**, de préférence sur une copie de test, jamais sur le jeu en production.

  Sources : https://create.roblox.com/docs/reference/engine/classes/DataStoreService, https://create.roblox.com/docs/reference/engine/classes/DataStoreOptions, https://create.roblox.com/docs/cloud-services/data-stores (2026-10-24)
  ```lua
  local DataStoreService = game:GetService("DataStoreService")
  local store = DataStoreService:GetDataStore("PlayerGame")
  local ok, err = pcall(function()
      store:SetAsync("User_1234", 50)
  end)
  ```
- **Incohérence dans la doc officielle.** Le guide de l'Assistant écrit encore que l'Assistant appelle `InsertService:GetFreeModels()`, qui est déprécié — https://create.roblox.com/docs/assistant/guide. Ne pas recopier.

---

## Non confirmé / changé récemment / à ne pas affirmer

**Non confirmé sur une source officielle**
- **Prix et gratuité de l'Assistant.** Aucune page ni annonce officielle consultée ne donne de prix ou de quota chiffré (hors les 50 modèles procéduraux par 24 h et le plafond quotidien non chiffré du Playtest Agent). Des demandes de fonctionnalité sur le DevForum (non officielles) se plaignent de limites d'usage atteintes vite. On peut écrire : « gratuit dans Studio à la date de rédaction, avec des limites d'usage non publiées ». Ne jamais citer de chiffre.
- **Modèle de langage de l'Assistant** (une rumeur parle de « GLM 5.2 ») : affirmation d'utilisateur, non officielle. Ne pas citer.
- **Langues de l'Assistant.** Aucune source officielle ne liste les langues prises en charge. La doc créateur existe en français (`/docs/fr-fr/…`), ce qui ne prouve rien sur l'Assistant.
- **Âge minimum ou vérification d'identité pour utiliser l'Assistant ou le MCP** : rien trouvé.
- **Commande `claude mcp add` exacte.** Absente de la doc Roblox ; celle de la section B est déduite. Seul le dépôt archivé donnait une commande `claude mcp add --transport stdio Roblox_Studio -- '<chemin>' --stdio`, et elle visait l'ANCIEN binaire. Méthodes recommandées pour Claude Code : Quick connect, ou le plugin `/plugin` > « Roblox Studio ».
- **Présence du plugin « Roblox Studio » dans le catalogue `/plugin` de Claude Code.** Le README officiel l'affirme, mais je ne l'ai pas vérifié : le cache local du catalogue ne le liste pas, et le dépôt n'a pas de `.claude-plugin/marketplace.json` à la racine. À tester avant d'enseigner.
- **Génération d'images 2D** (icônes, miniatures) et **génération de descriptions** par l'IA de Roblox : aucun outil officiel trouvé. Ne pas affirmer qu'ils existent.
- **Règles spécifiques aux assets générés par IA dans le Creator Store ou le Marketplace** (obligation de déclarer, interdiction…) : aucune trouvée. Seules s'appliquent les règles générales de propriété intellectuelle, les Terms et la page « Games with Generative AI ».
- **Gratuité et quotas chiffrés** du Texture Generator, du Material Generator et de la génération de maillages dans Studio : non publiés.

**Changé récemment (ne pas recopier d'anciens tutoriels)**
- `Roblox/studio-rust-mcp-server` : **archivé** le 3 avril 2026, à remplacer par le MCP intégré à Studio. Ses outils (`run_code`, `insert_model`, `get_studio_mode`, `run_script_in_play_mode`) ne sont plus ceux du serveur actuel.
- `set_active_studio` : **supprimé** le 19 août 2026. Chaque appel prend désormais un `studio_id`.
- Script Sync : **en version finale depuis le 17 juin 2026.** Le guide « Build with a coding harness » parle encore d'un toggle bêta dans File > Beta Features. Avant d'écrire « il faut activer la bêta », vérifier dans un Studio à jour.
- Libellé du menu MCP : « … > Manage MCP Servers » dans la doc, « … > Settings > MCP Servers » dans le README du plugin. Écrire : « menu … de l'Assistant, section MCP Servers ».
- Rojo 7.7 ajoute `rojo syncback` et passe aux websockets. Aftman est archivé ; Rokit est recommandé.
- TestEZ est archivé ; utiliser Jest Roblox (`Roblox/jest-roblox`).
- Luau : la syntaxe `if local` est en bêta Studio (récap du 5 au 9 octobre 2026, https://devforum.roblox.com/t/weekly-recap-october-5-october-9-2026/4924062, lu seulement via un résumé de recherche). selene 0.32.0 la prend en charge. Ne pas l'enseigner comme stable.
- Conditions d'utilisation : nouvelle version effective le **1er novembre 2026**. Revérifier la section « AI Features » après cette date.

**À ne pas affirmer**
- Que `.client.luau` donne un LocalScript **en général**. C'est vrai avec Rojo (`emitLegacyScripts` vaut true par défaut), **faux** avec Script Sync (Script en RunContext Client ; il faut `.local.luau` pour un LocalScript).
- Que la two-way sync de Rojo est fiable. C'est une option du plugin, désactivée par défaut, longtemps marquée expérimentale.
- Que `workspace` est déprécié (seul `game.workspace` en minuscule l'est), ou que `Instance.new(class, parent)` est déprécié (il est seulement déconseillé).
- Que `TeleportService:Teleport` porte le tag Deprecated. Il n'a pas le tag, seulement un message qui renvoie vers `TeleportAsync`.
- Que `rokit-rs/rokit` est le dépôt de Rokit. Le bon dépôt est `rojo-rbx/rokit`.
- Que les versions « actuelles » resteront valables. Au 24 octobre 2026 : Rojo 7.7.1, Rokit 1.2.0, luau-lsp 1.70.1, selene 0.32.0, StyLua 2.6.0, Lune 0.11.1, Jest Roblox 3.20.0, Foreman 1.7.0, Luau 0.744.
