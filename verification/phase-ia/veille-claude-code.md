# Veille factuelle — Claude Code et autres IA de code

Fiche établie le **2026-10-24** pour les rédacteurs de la formation « créer un jeu Roblox en pilotant des IA de code ».
Toutes les puces « Fait » ont été vérifiées sur la source citée le 2026-10-24. Version la plus récente de Claude Code d'après le CHANGELOG officiel ce jour-là : **2.1.310** (https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md).
Les passages entre guillemets sont des extraits en anglais tels qu'ils apparaissent sur la source. Les blocs de code sont recopiés depuis la doc, sauf ceux marqués **ADAPTATION (non officielle)**.

---

## 1. Installation, vérification, connexion

### 1.1 Méthode recommandée (« Native Install (Recommended) »)
- Fait : macOS, Linux et WSL utilisent le script natif — source https://code.claude.com/docs/en/setup (consultée le 2026-10-24)
  ```bash
  curl -fsSL https://claude.ai/install.sh | bash
  ```
- Fait : Windows PowerShell — même source
  ```powershell
  irm https://claude.ai/install.ps1 | iex
  ```
- Fait : Windows CMD — même source
  ```batch
  curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
  ```
- Fait : diagnostic des erreurs courantes donné par la doc : « If you see `The token '&&' is not a valid statement separator`, you're in PowerShell, not CMD. If you see `'irm' is not recognized…`, you're in CMD, not PowerShell. » — même source
- Fait : l'installation se fait sans droits administrateur (« You do not need to run as Administrator ») ; l'installeur n'affiche aucune progression pendant le téléchargement ; il faut ensuite **ouvrir un nouveau terminal** — même source
- Fait : les installations natives se mettent à jour automatiquement en arrière-plan ; `claude update` force la mise à jour — même source

### 1.2 Windows : Git for Windows, natif ou WSL
- Fait : Git for Windows est **optionnel mais recommandé**. « Git for Windows is recommended on native Windows so Claude Code can use the Bash tool. If Git for Windows is not installed, Claude Code uses PowerShell as the shell tool instead. WSL setups do not need Git for Windows. » — https://code.claude.com/docs/en/setup (consultée le 2026-10-24)
- Fait : tableau des options : Windows natif (Git for Windows optionnel, **pas de sandboxing**), WSL 2 (sandboxing pris en charge), WSL 1 (pas de sandboxing) — même source
- Fait : si Claude Code ne trouve pas Git Bash — même source
  ```json
  {
    "env": {
      "CLAUDE_CODE_GIT_BASH_PATH": "C:\\Program Files\\Git\\bin\\bash.exe"
    }
  }
  ```
- Fait : sous WSL, on installe et lance `claude` **dans le terminal WSL**, pas depuis PowerShell ni CMD — même source
- Fait : configuration requise : Windows 10 1809+ ou Windows Server 2019+, macOS 13.0+, 4 Go de RAM ou plus, x64 ou ARM64, connexion Internet — même source

### 1.3 Autres méthodes
- Fait : Homebrew (macOS) : `brew install --cask claude-code` (canal stable, environ une semaine de retard) ou `claude-code@latest`. **Pas de mise à jour automatique** (`brew upgrade claude-code`) — même source
- Fait : WinGet : `winget install Anthropic.ClaudeCode`. **Pas de mise à jour automatique** (`winget upgrade Anthropic.ClaudeCode`) — même source
- Fait : npm reste documenté, dans « Advanced installation options » : `npm install -g @anthropic-ai/claude-code`, avec **Node.js 22 ou plus**. « Do NOT use `sudo npm install -g` » — même source
- Fait : le CHANGELOG v2.1.15 indique « Added deprecation notification for npm installations - run `claude install` or see https://code.claude.com/docs/en/setup for more options » — https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md (consultée le 2026-10-24). **À enseigner ainsi** : npm fonctionne encore mais n'est plus la méthode recommandée ; utiliser l'installeur natif.
- Fait : il existe aussi des dépôts apt/dnf/apk pour Linux — https://code.claude.com/docs/en/setup

### 1.4 Vérification
- Fait : `claude --version` affiche par exemple `2.1.211 (Claude Code)` — https://code.claude.com/docs/en/setup (consultée le 2026-10-24)
- Fait : `claude doctor` « prints read-only installation and settings diagnostics without starting a session » — même source
- Fait : il existe aussi `/doctor`, à lancer **dans** une session. C'est une skill fournie avec Claude Code qui propose des corrections et les applique après confirmation (alias `/checkup`) — https://code.claude.com/docs/en/commands (consultée le 2026-10-24)

### 1.5 Connexion
- Fait : « Claude Code requires a Pro, Max, Team, Enterprise, or Console account. The free claude.ai plan does not include Claude Code access. » — https://code.claude.com/docs/en/setup (consultée le 2026-10-24)
- Fait : au premier lancement de `claude`, un navigateur s'ouvre pour la connexion. Si le navigateur ne s'ouvre pas, appuyer sur `c` copie l'URL. Si le navigateur affiche un code, le coller à l'invite `Paste code here if prompted` (cas fréquent sous WSL2) — https://code.claude.com/docs/en/authentication (consultée le 2026-10-24)
- Fait : types de compte : abonnement Claude Pro ou Max (compte claude.ai), Team ou Enterprise, Claude Console (facturation API), fournisseurs cloud (Bedrock, etc.) — même source
- Fait : commandes de connexion : `/login`, `/logout`, `/status` en session ; `claude auth login` (option `--console` pour la Console API) et `claude auth status` dans le shell — https://code.claude.com/docs/en/authentication et https://code.claude.com/docs/en/cli-reference (consultées le 2026-10-24)
- Fait : **piège** : « If you have an active Claude subscription but also have `ANTHROPIC_API_KEY` set in your environment, Claude Code uses the API key once you approve it. » L'usage est alors facturé à l'API. Vérifier avec `/status` — https://code.claude.com/docs/en/authentication

---

## 2. Offres et prix (USD, relevés le 2026-10-24)

Source : https://claude.com/pricing (consultée le 2026-10-24). La page n'affiche aucune date de mise à jour : citer « prix relevés le 24/10/2026 ».

| Offre | Prix affiché | Claude Code inclus |
|---|---|---|
| Free | 0 $ | **Non** |
| Pro | 17 $/mois en facturation annuelle (200 $ payés d'avance) ou **20 $ en mensuel** | Oui |
| Max | « From $100 » par mois ; deux niveaux, 5x et 20x l'usage de Pro | Oui |
| Team, siège Standard | 20 $/siège/mois en annuel, 25 $ en mensuel | Oui |
| Team, siège Premium | 100 $/siège/mois en annuel, 125 $ en mensuel | Oui |
| Enterprise | « US$20/seat/month, billed annually, 20 seat minimum » + usage au tarif API | Oui |

- Fait : Claude Code « shares the same usage limits as the rest of your plan ». Max donne 5x ou 20x l'usage de Pro par session de 5 heures — https://claude.com/pricing/max (consultée le 2026-10-24)
- Fait : tarifs API par million de tokens (entrée / sortie) : Fable 5.1 10 $ / 50 $ ; Opus 5.5 4 $ / 20 $ ; Sonnet 5.5 2 $ / 10 $ ; Haiku 5.5 à partir de 0,10 $ / 0,50 $ — https://claude.com/pricing et https://platform.claude.com/docs/en/about-claude/models/overview (consultées le 2026-10-24)
- Fait : Fable peut être facturé en « usage credits » plutôt que sur les limites du forfait, selon l'offre et le type de siège ; le sélecteur `/model` affiche alors « Requires usage credits » — https://code.claude.com/docs/en/model-config (consultée le 2026-10-24)

---

## 3. CLAUDE.md et mémoire

- Fait : emplacements — https://code.claude.com/docs/en/memory (consultée le 2026-10-24)
  - Projet : `./CLAUDE.md` **ou** `./.claude/CLAUDE.md` (partagé via Git)
  - Utilisateur : `~/.claude/CLAUDE.md` (tous vos projets)
  - Local : `./CLAUDE.local.md` (personnel, « add to `.gitignore` »)
  - Politique gérée par l'organisation : sous Windows `C:\Program Files\ClaudeCode\CLAUDE.md`
  - Règles modulaires : `.claude/rules/*.md` (avec un frontmatter `paths:` optionnel pour cibler des fichiers) et `~/.claude/rules/`
- Fait : les CLAUDE.md du répertoire de travail et des répertoires parents sont chargés au lancement, puis concaténés (ils ne se remplacent pas). Ceux des sous-dossiers se chargent à la demande — même source
- Fait : `AGENTS.md` est lu **à la place** de CLAUDE.md s'il n'existe aucun CLAUDE.md (requiert v2.1.277+) — même source
- Fait : `/init` « Initialize project with a `CLAUDE.md` guide ». Si un CLAUDE.md existe déjà, `/init` propose des améliorations au lieu de l'écraser. Avec `CLAUDE_CODE_NEW_INIT=1`, le flux est interactif (CLAUDE.md, skills, hooks) — https://code.claude.com/docs/en/memory et https://code.claude.com/docs/en/commands
- Fait : imports avec la syntaxe `@chemin/vers/fichier`, en chemin relatif (par rapport au fichier qui importe) ou absolu, sur **4 niveaux maximum**. Un `@README` placé entre backticks n'est pas importé — https://code.claude.com/docs/en/memory
  ```markdown
  See @README for project overview and @package.json for available npm commands for this project.
  ```
- Fait : taille conseillée : « target under 200 lines per CLAUDE.md file » — même source
- Fait : `/memory` liste les fichiers CLAUDE.md, CLAUDE.local.md et de mémoire, les ouvre dans l'éditeur, et active ou désactive l'**auto memory** — même source
- Fait : l'**auto memory** est activée par défaut. Claude écrit lui-même ses notes dans `~/.claude/projects/<project>/memory/MEMORY.md`, dont les 200 premières lignes ou 25 Ko sont chargés à chaque session — même source
- Fait : `/context` permet de vérifier quels fichiers mémoire ont été chargés (rubrique « Memory files ») — même source
- Fait : **le raccourci `#` n'existe plus.** CHANGELOG v2.0.70 : « Removed # shortcut for quick memory entry (tell Claude to edit your CLAUDE.md instead) ». La doc actuelle dit : « To add instructions to CLAUDE.md instead, ask Claude directly, like "add this to CLAUDE.md," or edit the file yourself via `/memory`. » Si on demande à Claude de « se souvenir » de quelque chose, il l'enregistre dans l'auto memory, pas dans CLAUDE.md — https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md et https://code.claude.com/docs/en/memory (consultées le 2026-10-24)
- Fait : CLAUDE.md sert de contexte, ce n'est pas une contrainte : « Claude treats them as context, not enforced configuration. To block an action regardless of what Claude decides, use a PreToolUse hook » — https://code.claude.com/docs/en/memory

---

## 4. Mode plan et permissions

### 4.1 Modes de permission
Source : https://code.claude.com/docs/en/permissions (consultée le 2026-10-24)

| Mode | Rôle (résumé fidèle) |
|---|---|
| `default` | Demande la permission à la première utilisation de chaque outil. **Affiché « Manual »** ; alias `manual` |
| `acceptEdits` | Accepte automatiquement les modifications de fichiers et les commandes courantes (`mkdir`, `touch`, `mv`, `cp`) dans le répertoire de travail |
| `plan` | Claude lit et explore, mais ne modifie pas vos fichiers source |
| `auto` | Pas de demandes de routine ; un classifieur en arrière-plan vérifie les actions |
| `dontAsk` | Refuse automatiquement tout ce qui demanderait une permission, sauf les outils pré-autorisés |
| `bypassPermissions` | Saute les demandes (« Only use this mode in isolated environments like containers or VMs ») |

- Fait : **changement important** : depuis v2.1.283, le mode de départ intégré en terminal et dans VS Code est **`auto`**. C'était `default`/Manual avant, et ça le reste pour `claude -p`. Si `auto` n'est pas disponible, la session démarre en Manual — https://code.claude.com/docs/en/permission-modes (consultée le 2026-10-24)
- Fait : `Shift+Tab` fait défiler les modes : `default` → `acceptEdits` → `plan`, puis `bypassPermissions` et `auto` s'ils sont activés. Depuis `auto`, la première pression revient à `default`. Sous Windows, `Alt+M` sert d'alternative si le terminal n'active pas le mode VT — https://code.claude.com/docs/en/interactive-mode et https://code.claude.com/docs/en/permission-modes
- Fait : libellés de la barre d'état : `⏸ manual mode on`, `⏵⏵ accept edits on`, `⏸ plan mode on`, `⏵⏵ auto mode on` — https://code.claude.com/docs/en/permission-modes
- Fait : mode au démarrage et mode par défaut — même source
  ```bash
  claude --permission-mode plan
  ```
  ```json
  {
    "permissions": {
      "defaultMode": "plan"
    }
  }
  ```
- Fait : on entre en mode plan avec `Shift+Tab` ou en préfixant un prompt par `/plan` (ex. `/plan fix the auth bug`). Une fois le plan prêt, trois choix : « Yes, and use auto mode » (ou « Yes, auto-accept edits »), « Yes, manually approve edits », « No, keep planning ». `Ctrl+G` ouvre le plan dans l'éditeur de texte — https://code.claude.com/docs/en/permission-modes et https://code.claude.com/docs/en/commands

### 4.2 `/permissions` et `settings.json`
- Fait : `/permissions` ouvre une boîte de dialogue qui liste les règles allow / ask / deny et le fichier `settings.json` d'où chacune provient. Ordre d'évaluation : « deny, then ask, then allow » — https://code.claude.com/docs/en/permissions
- Fait : fichiers de réglages : `~/.claude/settings.json` (utilisateur), `.claude/settings.json` (projet, à commiter), `.claude/settings.local.json` (projet, ignoré par Git) — https://code.claude.com/docs/en/hooks-guide (tableau « Configure hook location »)
- Fait : syntaxe actuelle des règles : `Tool` ou `Tool(specifier)`, avec le joker `*` **séparé par une espace**. Exemple officiel — https://code.claude.com/docs/en/permissions
  ```json
  {
    "permissions": {
      "allow": [
        "Bash(npm run *)",
        "Bash(git commit *)"
      ],
      "deny": [
        "Bash(git push *)"
      ]
    }
  }
  ```
- Fait : l'ancienne forme `:*` est toujours reconnue : « The `:*` suffix is an equivalent way to write a trailing wildcard, so `Bash(ls:*)` matches the same commands as `Bash(ls *)`. » Elle ne marche qu'**en fin de motif**, et la boîte de dialogue écrit désormais la forme avec espace — même source
- Fait : `Bash(ls *)` ne correspond pas à `lsof`, mais `Bash(ls*)` oui (l'espace compte). Mettre le `*` **après la sous-commande** : `Bash(git log *)` plutôt que `Bash(git *)` — même source
- Fait : `Bash(safe-cmd *)` n'autorise pas `safe-cmd && other-cmd`, car chaque sous-commande doit correspondre à une règle — même source
- Fait : règles de fichiers : `Read(./.env)`, `Read(./secrets/**)`, `Edit(...)`. Un `.claudeignore` n'a **aucun effet** (utiliser des règles `Read` deny) — même source
- Fait : il existe aussi des règles `PowerShell(...)`, de même forme que les règles Bash — même source
- Fait : « Permission rules are enforced by Claude Code, not by the model. » — même source

---

## 5. Commandes slash intégrées (état au 2026-10-24)
Source : https://code.claude.com/docs/en/commands (consultée le 2026-10-24)

| Commande | Existe ? | Ce qu'elle fait (d'après la doc) |
|---|---|---|
| `/init` | Oui | Crée un guide `CLAUDE.md` pour le projet |
| `/clear` | Oui | « Start a new conversation with empty context ». Alias `/reset`, `/new`. La conversation précédente reste récupérable via `/resume` |
| `/compact [instructions]` | Oui | Résume la conversation pour libérer du contexte ; on peut ajouter des consignes de focus |
| `/context [all]` | Oui | Affiche l'utilisation du contexte sous forme de grille colorée, avec des suggestions |
| `/usage` | Oui | Coût de la session, limites du forfait, statistiques. **`/cost` et `/stats` sont des alias** |
| `/model [model]` | Oui | Change de modèle (et l'enregistre par défaut) ; flèches gauche/droite pour l'effort |
| `/rewind` | Oui | Revient en arrière dans la conversation et/ou le code. **Alias `/checkpoint`, `/undo`** |
| `/review` | Oui | **Alias de `/code-review`** (skill fournie) : relit le diff courant, une PR, une branche ou un chemin. Niveaux `low`…`max`, `ultra` (relecture cloud), `--fix`, `--comment` |
| `/security-review` | Oui | Analyse de sécurité du diff entre la branche et la branche par défaut d'`origin` (nécessite un remote `origin`) |
| `/agents` | **Oui, mais plus d'assistant** | « Print a reminder to ask Claude to create or manage subagents, or to edit `.claude/agents/` or `~/.claude/agents/` directly. On v2.1.197 and earlier, opens an interactive interface » |
| `/hooks` | Oui | « View hook configurations » : un **navigateur en lecture seule** (https://code.claude.com/docs/en/hooks) |
| `/mcp` | Oui | Gère les connexions aux serveurs MCP et l'authentification OAuth ; `reconnect`, `enable`, `disable` |
| `/help` | Oui | Aide et liste des commandes |
| `/resume [session]` | Oui | Reprend une conversation par ID ou par nom, ou ouvre le sélecteur de sessions |
| `/config` | Oui | Ouvre les Settings ; accepte `key=value` (ex. `/config model=sonnet`) |
| `/permissions` | Oui | Gère les règles allow / ask / deny |
| `/memory` | Oui | Édite les CLAUDE.md et règle l'auto memory |
| `/plan [description]` | Oui | Entre en mode plan |
| `/skills` | Oui | Liste les skills disponibles |
| `/doctor` | Oui | Skill fournie : bilan de configuration avec corrections. Alias `/checkup` |
| `/status` | Oui | Version, modèle, compte, connectivité |
| `/btw [question]` | Oui | Question annexe qui n'entre pas dans l'historique |
| `/export [filename]` | Oui | Exporte la conversation en texte |
| `/login`, `/logout` | Oui | Connexion et déconnexion |
| `/ide` | Oui | Intégrations IDE |
| `/add-dir <path>` | Oui | Ajoute un répertoire de travail |
| `/branch`, `/fork` | Oui | Crée une branche de la conversation ; `/fork` en fait une copie en session d'arrière-plan |
| `/simplify` | Oui | Skill fournie : nettoyage du code modifié (ne cherche pas les bugs) |
| `/autocompact` | Oui | Règle le seuil d'auto-compaction (ex. `/autocompact 500k`) — https://code.claude.com/docs/en/context-window |
| `/exit` | Oui | Quitte la session (alias `/quit`) |

- Fait : **les commandes personnalisées ont été fusionnées dans les skills**, mais `.claude/commands/*.md` fonctionne toujours. « A file at `.claude/commands/deploy.md` and a skill at `.claude/skills/deploy/SKILL.md` both create `/deploy` and work the same way. Your existing `.claude/commands/` files keep working. » La doc recommande les skills pour tout nouveau travail — https://code.claude.com/docs/en/skills. CHANGELOG v2.1.3 : « Merged slash commands and skills ».
- Fait : une commande n'est reconnue qu'**en début de message** — https://code.claude.com/docs/en/commands

---

## 6. Skills
Source : https://code.claude.com/docs/en/skills (consultée le 2026-10-24)

- Fait : emplacements : projet `.claude/skills/<skill-name>/SKILL.md` ; personnel `~/.claude/skills/<skill-name>/SKILL.md` ; plugin `<plugin>/skills/<skill-name>/SKILL.md` (invoquée en `/plugin-name:skill-name`)
- Fait : frontmatter **entièrement optionnel**. « All fields are optional. Only `description` is recommended ». `name` vaut par défaut le nom du dossier. `description` + `when_to_use` sont tronqués à 1 536 caractères dans la liste. Les noms de champs s'écrivent en minuscules avec des tirets, sauf `when_to_use`
- Fait : champs utiles : `name`, `description`, `when_to_use`, `argument-hint`, `arguments`, `disable-model-invocation` (true = seul l'utilisateur peut l'invoquer), `user-invocable` (false = seul Claude), `allowed-tools`, `disallowed-tools`, `model`, `effort`, `context: fork`, `agent`, `hooks`, `paths`, `shell` (`bash` ou `powershell`)
- Fait : `$ARGUMENTS`, `$ARGUMENTS[N]`, `$N`, et `` !`commande` `` pour injecter la sortie d'une commande
- Fait : exemple officiel (page best practices, https://code.claude.com/docs/en/best-practices) :
  ```markdown
  ---
  name: fix-issue
  description: Fix a GitHub issue
  disable-model-invocation: true
  ---
  Analyze and fix the GitHub issue: $ARGUMENTS.

  1. Use `gh issue view` to get the issue details
  ...
  ```
  « Run `/fix-issue 1234` to invoke it. Use `disable-model-invocation: true` for workflows with side effects that you want to trigger manually. »
- Fait : Claude peut charger une skill automatiquement quand elle est pertinente (d'après sa `description`), ou l'utilisateur l'invoque avec `/nom`

---

## 7. Sous-agents
Source : https://code.claude.com/docs/en/sub-agents (consultée le 2026-10-24)

- Fait : emplacements : `.claude/agents/` (projet), `~/.claude/agents/` (utilisateur), plus le flag `--agents`, les plugins et les réglages gérés par l'organisation
- Fait : fichier Markdown avec frontmatter YAML ; le corps du fichier devient le prompt système. **Seuls `name` et `description` sont obligatoires**
  ```markdown
  ---
  name: code-improver
  description: Scans files and suggests improvements for readability, performance, and best practices. Use after writing or modifying code.
  tools: Read, Grep, Glob
  model: sonnet
  ---

  You are a code improvement specialist. For each issue you find, explain
  the problem, show the current code, and provide an improved version.
  ```
- Fait : champs optionnels : `tools` (hérite de tout s'il est omis), `disallowedTools`, `model` (`sonnet`, `opus`, `haiku`, `fable`, ID complet ou `inherit`), `permissionMode`, `maxTurns`, `skills`, `mcpServers`, `hooks`, `memory`, `background`, `effort`, `isolation: worktree`, `color`, etc.
- Fait : `/agents` **n'ouvre plus d'assistant** depuis v2.1.198 (CHANGELOG : « Removed the `/agents` wizard; ask Claude to create or manage subagents, or edit `.claude/agents/` directly »). On crée un sous-agent en le demandant à Claude ou en écrivant le fichier soi-même
- Fait : invocation : en langage naturel (« Use the test-runner subagent to fix failing tests »), par mention `@"code-reviewer (agent)"` ou `@agent-code-reviewer` (ce qui garantit l'exécution), ou pour toute une session avec `claude --agent code-reviewer`

---

## 8. Hooks
Sources : https://code.claude.com/docs/en/hooks-guide et https://code.claude.com/docs/en/hooks (consultées le 2026-10-24)

- Fait : événements principaux : `SessionStart`, `UserPromptSubmit`, `PreToolUse` (peut bloquer), `PermissionRequest`, `PostToolUse`, `PostToolUseFailure`, `Notification`, `SubagentStart`, `SubagentStop`, `Stop`, `PreCompact`, `PostCompact`, `SessionEnd`, `FileChanged`, `InstructionsLoaded`, `ConfigChange`, `CwdChanged`, etc. (liste complète dans hooks-guide, « How hooks work »)
- Fait : structure à trois niveaux : événement → groupe avec `matcher` → liste de handlers (`type`, `command`, `timeout`…). Types possibles : `"command"`, `"http"`, `"mcp_tool"`, `"prompt"`, `"agent"`. Timeout par défaut de 600 s pour `command`
- Fait : `"Edit|Write"` correspond exactement à Edit ou Write ; `"Edit, Write"` est équivalent. Un matcher qui contient d'autres caractères est interprété comme une expression régulière JavaScript non ancrée
- Fait : **exemple officiel PostToolUse (formateur après modification)**, à placer dans `.claude/settings.json` :
  ```json
  {
    "hooks": {
      "PostToolUse": [
        {
          "matcher": "Edit|Write",
          "hooks": [
            {
              "type": "command",
              "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write"
            }
          ]
        }
      ]
    }
  }
  ```
  La doc précise : « The Bash examples on this page use `jq` for JSON parsing. »
- Fait : entrée JSON sur stdin pour PostToolUse : champs communs (`session_id`, `transcript_path`, `cwd`, `permission_mode`, `hook_event_name`), plus `tool_name`, `tool_input` (ex. `file_path`, `content`), `tool_response`, `tool_use_id`, `duration_ms`. **Sous Windows, `file_path` est absolu, avec des barres obliques inversées** (« always absolute, with the platform's native separators, so backslashes on Windows »)
- Fait : codes de sortie : 0 = pas d'objection ; 2 = blocage, et stderr est renvoyé selon l'événement. Pour `PostToolUse`, exit 2 « Shows stderr to Claude; the tool already ran » : c'est la bonne façon de renvoyer à Claude les erreurs du linter
- Fait : variable `${CLAUDE_PROJECT_DIR}` (« the project root where the session started »), également exportée dans l'environnement. Exemple officiel : `"command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/protect-files.sh"`
- Fait : **Windows** : « The `command` string is passed to a shell: `sh -c` on macOS and Linux, Git Bash on Windows, or PowerShell when Git Bash isn't installed. » Le champ `"shell": "powershell"` force PowerShell. La doc fournit un exemple PowerShell qui lit stdin avec `[Console]::In.ReadToEnd() | ConvertFrom-Json`
- Fait : un hook PostToolUse `Edit|Write` **ne se déclenche pas** quand une commande Bash ou un programme externe réécrit le fichier (pour ce cas, utiliser `FileChanged`)
- Fait : `/hooks` = navigateur en lecture seule. On édite les hooks dans les fichiers `settings.json`, ou on demande à Claude de les écrire. `"disableAllHooks": true` les désactive tous
- Fait : les hooks se placent dans `~/.claude/settings.json`, `.claude/settings.json`, `.claude/settings.local.json`, un plugin, ou le frontmatter d'une skill ou d'un sous-agent

**ADAPTATION (non officielle, non testée) pour StyLua + selene**, sur le modèle officiel. Elle suppose Git Bash et `jq` installés, ainsi que `stylua` et `selene` dans le PATH :
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "f=$(jq -r '.tool_input.file_path // empty'); case \"$f\" in *.lua|*.luau) stylua \"$f\" && selene \"$f\" 1>&2 || exit 2 ;; esac"
          }
        ]
      }
    ]
  }
}
```
À vérifier avant publication : syntaxe CLI exacte de StyLua et selene sur leurs docs officielles ; présence de `jq` sur Windows (non installé par défaut) ; traitement des chemins avec `\` par `stylua` et `selene` sous Git Bash ; éventuelle variante PowerShell avec `"shell": "powershell"` et `ConvertFrom-Json`.

---

## 9. MCP
Source : https://code.claude.com/docs/en/mcp (consultée le 2026-10-24)

- Fait : syntaxe
  ```bash
  # HTTP (recommandé pour les serveurs distants)
  claude mcp add --transport http <name> <url>
  claude mcp add --transport http notion https://mcp.notion.com/mcp

  # SSE (déprécié)
  claude mcp add --transport sse <name> <url>

  # stdio (processus local)
  claude mcp add [options] <name> -- <command> [args...]
  claude mcp add --env AIRTABLE_API_KEY=YOUR_KEY --transport stdio airtable -- npx -y airtable-mcp-server
  ```
- Fait : `--transport` accepte `http`, `sse` (déprécié) et `stdio` ; `ws` passe par `claude mcp add-json`. Formes courtes : `-t`, `-H` (`--header`), `-e` (`--env`). **Tout ce qui suit `--` est transmis tel quel au serveur**
- Fait : `--scope` / `-s` : `local` (**par défaut**, vous seul, projet courant, stocké dans `~/.claude.json`), `project` (partagé via `.mcp.json` à la racine), `user` (vous, tous projets, `~/.claude.json`)
- Fait : `.mcp.json`
  ```json
  {
    "mcpServers": {
      "shared-server": {
        "type": "http",
        "url": "https://example.com/mcp"
      }
    }
  }
  ```
  Les serveurs déclarés dans `.mcp.json` demandent une approbation en session interactive ; les variables `${VAR}` et `${VAR:-default}` y sont développées
- Fait : `claude mcp list`, `claude mcp get <name>`, `claude mcp remove <name>` ; `/mcp` en session (statut, OAuth, `reconnect`)

---

## 10. Gestion du contexte, sessions, checkpoints

- Fait : `/clear` repart d'un contexte vide ; `/compact [instructions]` résume en gardant la même conversation — https://code.claude.com/docs/en/commands
- Fait : auto-compaction : « Claude Code compacts automatically as you approach the limit ». Le seuil se règle avec `/autocompact 500k`, `autoCompactWindow` ou `CLAUDE_CODE_AUTO_COMPACT_WINDOW` — https://code.claude.com/docs/en/context-window et https://code.claude.com/docs/en/model-config
- Fait : après compaction, le CLAUDE.md à la racine du projet et les règles sans `paths` sont réinjectés depuis le disque ; les règles avec `paths:` et les CLAUDE.md imbriqués se rechargent à la demande ; Claude relit jusqu'à 5 fichiers récents — https://code.claude.com/docs/en/context-window
- Fait : `claude -c` / `--continue` reprend la conversation la plus récente du répertoire ; `claude -r` / `--resume` reprend une session par ID ou par nom, ou ouvre un sélecteur ; `--fork-session` crée un nouvel ID — https://code.claude.com/docs/en/cli-reference
- Fait : `Esc` « Stop the current response or tool call mid-turn so you can redirect. Claude keeps the work done so far. » — https://code.claude.com/docs/en/interactive-mode
- Fait : `Esc` + `Esc` : si la saisie contient du texte, elle est effacée ; si elle est vide, le menu rewind s'ouvre — même source
- Fait : checkpoints — https://code.claude.com/docs/en/checkpointing
  - un checkpoint est créé à chaque prompt qui démarre un tour ; Claude Code conserve les 100 plus récents ; on peut encore les utiliser après `--resume` ; ils sont purgés au bout d'environ 30 jours par défaut
  - actions possibles : « Restore code and conversation », « Restore conversation », « Restore code », « Summarize from here », « Summarize up to here », « Never mind »
  - limites : un fichier modifié **uniquement par des commandes Bash** n'est pas suivi ; les modifications des sous-agents ne sont généralement pas restaurées ; les modifications externes non plus ; les liens symboliques sont ignorés
  - « Checkpoints are designed for quick, session-level recovery. For permanent version history and collaboration, continue using version control, such as Git » ; page best practices : « This isn't a replacement for git. »
- Fait : autres raccourcis utiles : `!` en début de saisie = mode shell ; `@` = mention de fichier ; `Ctrl+O` = transcript détaillé ; `Ctrl+G` = éditeur externe ; `Ctrl+R` = recherche dans l'historique ; `Alt+P` (Windows/Linux) ou `Option+P` (macOS) = changement de modèle — https://code.claude.com/docs/en/interactive-mode

---

## 11. Mode non interactif et autres surfaces

- Fait : `claude -p "query"` (« Query via SDK, then exit ») ; `cat file | claude -p "query"` ; `--output-format text|json|stream-json` ; `--max-turns` (en mode print) ; `--allowedTools` ; `--permission-mode` (en `-p`, le mode par défaut est `default`) — https://code.claude.com/docs/en/cli-reference et https://code.claude.com/docs/en/best-practices
- Fait : avec `-p`, une `ANTHROPIC_API_KEY` présente est **toujours** utilisée — https://code.claude.com/docs/en/authentication
- Fait : surfaces existantes — https://code.claude.com/docs/en/overview (consultée le 2026-10-24)
  - **Extension VS Code** (fonctionne aussi dans Cursor) : ID `anthropic.claude-code`, à chercher sous « Claude Code » dans les extensions
  - **Plugin JetBrains** (requiert le CLI installé séparément)
  - **App Desktop** : macOS, Windows x64, Windows ARM64, Linux Ubuntu/Debian en bêta ; onglet **Code** ; inclut Claude Code (pas besoin du CLI) ; « A paid subscription is required »
  - **Web** : https://claude.ai/code, sans installation locale ; aussi dans l'app mobile iOS/Android
  - Également : Slack, GitHub Actions, Chrome, Remote Control, `claude --teleport`, `/desktop`

---

## 12. Modèles actuels
Sources : https://platform.claude.com/docs/en/about-claude/models/overview et https://code.claude.com/docs/en/model-config (consultées le 2026-10-24)

- Fait : gamme actuelle : **Claude Fable 5.1** (`claude-fable-5-1`), **Claude Opus 5.5** (`claude-opus-5-5`), **Claude Sonnet 5.5** (`claude-sonnet-5-5`), **Claude Haiku 5.5** (`claude-haiku-5-5`). Toutes ont un contexte de 1M tokens et une sortie maximale de 128K
- Fait : modèles hérités encore disponibles : Fable 5, Opus 5, Opus 4.8, Opus 4.7, Opus 4.6, Opus 4.5, Sonnet 5, Sonnet 4.6, Haiku 4.5
- Fait : alias dans Claude Code : `default`, `best`, `fable`, `opus`, `sonnet`, `haiku`, `sonnet[1m]`, `opus[1m]`, `opusplan` (Opus en mode plan, Sonnet pour l'exécution). Sur l'API Anthropic : `opus` → Opus 5.5, `sonnet` → Sonnet 5.5, `haiku` → Haiku 5.5, `fable` → Fable 5.1
- Fait : **modèle par défaut pour Pro, Max, Team, Enterprise et l'API : Opus 5.5**. Fable n'est le modèle par défaut d'aucune offre
- Fait : on change de modèle avec `/model <alias|nom>`, `claude --model <alias|nom>`, `ANTHROPIC_MODEL`, ou le champ `"model"` des settings
- Fait : niveaux d'effort `low`, `medium`, `high`, `xhigh`, `max` ; effort par défaut `medium` pour Opus 5.5, Sonnet 5.5 et Haiku 5.5 dans Claude Code

---

## 13. Bonnes pratiques officielles (extraits courts)

### Claude Code — https://code.claude.com/docs/en/best-practices (consultée le 2026-10-24)
- Contrainte de fond : « Claude's context window fills up fast, and performance degrades as it fills. »
- Vérification : « Give Claude a check it can run: tests, a build, a screenshot to compare. » / « Have Claude show evidence rather than asserting success »
  - Exemple de la doc : avant « implement a function that validates email addresses », après « write a validateEmail function. example test cases: … run the tests after implementing »
- Workflow en 4 phases : « Explore first, then plan, then code ». Les phases sont **1. Explore** (mode plan), **2. Plan**, **3. Implement**, **4. Commit** (« commit with a descriptive message and open a PR »). Nuance : « If you could describe the diff in one sentence, skip the plan. »
- Précision : « The more precise your instructions, the fewer corrections you'll need. » / « Claude can infer intent, but it can't read your mind. Reference specific files, mention constraints, and point to example patterns. »
- CLAUDE.md : « keep it short and human-readable » ; « For each line, ask: "Would removing this cause Claude to make mistakes?" If not, cut it. » ; « Bloated CLAUDE.md files cause Claude to ignore your actual instructions! »
- Hooks : « Unlike CLAUDE.md instructions which are advisory, hooks are deterministic and guarantee the action happens. »
- Corriger tôt : « If you've corrected Claude more than twice on the same issue in one session, the context is cluttered with failed approaches. Run `/clear` and start fresh with a more specific prompt »
- Contexte : « Use `/clear` frequently between tasks to reset the context window entirely »
- Échecs typiques (titres exacts) : « The kitchen sink session », « Correcting over and over », « The over-specified CLAUDE.md », « The trust-then-verify gap » (« If you can't verify it, don't ship it. »), « The infinite exploration »
- Interview : « For larger features, have Claude interview you first. » Écrire un SPEC.md puis repartir d'une session neuve pour l'implémenter

### Prompt engineering — https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices (consultée le 2026-10-24)
- « Be clear and direct » : « Claude responds well to clear, explicit instructions. » / « Think of Claude as a brilliant but new employee who lacks context on your norms and workflows. »
- Test clé : « Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they'd be confused, Claude will be too. »
- Donner le pourquoi : « Providing context or motivation behind your instructions … can give Claude more information about your goals »
- Exemples : « Include 3–5 examples for best results. »
- Tests et triche : section « Avoid focusing on passing tests and hardcoding » : « Tests are there to verify correctness, not to define the solution. »
- Hallucinations : « Never speculate about code you have not opened. »

---

## 14. Autres IA de code (état au 2026-10-24)

### Cursor — https://cursor.com/pricing (consultée le 2026-10-24)
- Fait : offres individuelles affichées (prix mensuels, sans prix annuel sur la page) : Free 0 $ ; **Plus 8 $** (« Only Grok models are available on this plan ») ; **Premium 30 $** (4x l'usage de Plus, cloud agents, modèles tiers au prix API) ; **Super 100 $** (15x) ; **Ultra 200 $** (50x). Teams « $30+/user/month », Enterprise sur devis
- Fait : la page met en avant les modèles **Grok** et mentionne des conditions « SpaceXSI » dans le pied de page ; elle ne cite ni Anthropic ni OpenAI (« third-party models » facturés à l'usage). **Changement majeur par rapport à 2025** : à revérifier juste avant publication
- Fait : l'extension Claude Code s'installe dans Cursor (`cursor:extension/anthropic.claude-code`) — https://code.claude.com/docs/en/overview

### GitHub Copilot — https://docs.github.com/en/copilot/get-started/plans et https://github.com/features/copilot/plans (consultées le 2026-10-24)
- Fait : la facturation se fait désormais en **« GitHub AI Credits »** (1 crédit = 0,01 $), et non plus en « premium requests »
- Fait : Free 0 $ (agent mode oui, cloud agent non) ; Student gratuit ; **Pro 10 $/mois** ; **Pro+ 39 $/mois** ; **Max 100 $/mois** (agent mode et Copilot cloud agent inclus à partir de Pro) ; Business 19 $/siège/mois ; Enterprise 39 $/siège/mois. « All plans include Copilot CLI and the Copilot app. »
- Fait : la doc parle désormais de « Copilot cloud agent » (et non plus de « coding agent »)

### OpenAI Codex — https://learn.chatgpt.com/docs/codex/cli et https://learn.chatgpt.com/docs/pricing (consultées le 2026-10-24 ; developers.openai.com/codex redirige vers ces pages)
- Fait : Codex CLI : « Inspect, edit, and run code from your terminal ». Installation macOS/Linux : `curl -fsSL https://chatgpt.com/codex/install.sh | sh` (des onglets npm et Homebrew existent, mais leur commande n'a pas été lue). Connexion : « Sign in with ChatGPT ». `/init` crée un `AGENTS.md`
- Fait : offres ChatGPT incluant Codex : Free 0 $, Go 8 $, Plus 20 $, Pro à partir de 100 $ (100, 200 ou 500 $), Business 20 $/utilisateur/mois en annuel ou 25 $ en mensuel, Enterprise/Edu sur devis. Utilisation possible avec une clé API (facturation au tarif API, sans les fonctions cloud)

### Google — https://github.com/google-gemini/gemini-cli et https://antigravity.google (consultées le 2026-10-24)
- Fait : README de Gemini CLI : « Unpaid tier and Google One users: Gemini CLI was replaced by Antigravity CLI on June 18th, 2026. » Gemini CLI reste open source (Apache 2.0) ; installation `npm install -g @google/gemini-cli`, `npx @google/gemini-cli` ou `brew install gemini-cli` ; fichier de contexte `GEMINI.md`
- Fait : Google Antigravity se présente comme « our agentic development platform », avec un IDE et un CLI ; pour les développeurs individuels, « Available at no charge »

### Windsurf / Devin — https://devin.ai/pricing (consultée le 2026-10-24)
- Fait : `windsurf.com/pricing` **redirige vers devin.ai/pricing**, qui ne mentionne pas Windsurf. Offres Devin : Free 0 $, Pro 20 $/mois, Max 200 $/mois, Teams 80 $/mois + 40 $ par siège développeur, Enterprise sur devis

---

## Non confirmé / changé récemment / à ne pas affirmer

**Ce qui a changé ou n'existe plus (à ne pas enseigner comme actuel)**
- Le raccourci `#` pour ajouter une mémoire : **supprimé** (CHANGELOG v2.0.70). Demander « add this to CLAUDE.md » ou passer par `/memory`.
- `/agents` comme assistant interactif : **supprimé** en v2.1.198. La commande n'affiche plus qu'un rappel.
- `/hooks` permettait autrefois d'éditer les hooks ; c'est maintenant un **navigateur en lecture seule**.
- Le mode de départ n'est plus systématiquement « default/Manual » : c'est **`auto`** en terminal et VS Code depuis v2.1.283 (sauf `-p`). Le mode `default` s'affiche « Manual ».
- La syntaxe de règle `Bash(npm run test:*)` reste valide, mais la forme documentée est `Bash(npm run test *)`.
- `/cost` n'est plus une commande à part : c'est un alias de `/usage` (de même que `/stats`).
- `/review` est désormais un alias de `/code-review`.
- npm n'est plus la méthode d'installation recommandée (une notification de dépréciation existe depuis v2.1.15). Node.js n'est plus un prérequis avec l'installeur natif.
- Les commandes personnalisées `.claude/commands/` fonctionnent encore, mais elles sont fusionnées dans les skills. Présenter les skills comme le format principal.
- GitHub Copilot : on ne parle plus de « premium requests » mais de « AI Credits », et « coding agent » est devenu « cloud agent ».
- Gemini CLI n'est plus disponible pour les comptes gratuits et Google One depuis le 18/06/2026 (remplacé par Antigravity CLI).
- Windsurf : son URL de tarifs redirige vers Devin. Ne pas présenter Windsurf comme un produit autonome sans revérifier.

**Non confirmé (pas trouvé sur une source officielle actuelle)**
- Prix exact de **Max 20x** : la page n'affiche que « From $100 » (le 5x correspond à 100 $). Ne pas écrire « 200 $ » sans revérifier.
- Note Windows de la doc MCP sur `cmd /c` pour lancer `npx` : absente de la page actuelle. Ne pas l'affirmer.
- Seuil chiffré de l'auto-compaction (ex. « 95 % ») : non relevé. La doc renvoie à « Default auto-compact thresholds », qui dépendent du modèle.
- Disponibilité de `jq` sous Windows : la doc n'en parle pas, et `jq` n'est probablement pas fourni avec Git for Windows. À vérifier, sinon proposer une variante PowerShell.
- Syntaxe CLI exacte de StyLua et selene : non vérifiée ici (hors périmètre des sources Anthropic).
- Commandes npm/Homebrew de Codex CLI et support natif de Windows par Codex : non lus sur la page officielle.
- Limites gratuites d'Antigravity, sa commande d'installation et ses modèles : non confirmés officiellement (seules des sources secondaires citent la commande `agy`).
- Gemini Code Assist (extensions IDE) pour les particuliers : des sources secondaires indiquent un arrêt au 18/06/2026 ; non vérifié sur une page Google officielle.
- Prix annuels de Cursor : non affichés sur la page.
- Prix de Max chez Cursor et Copilot : les noms « Max » et « Ultra » diffèrent selon l'éditeur ; ne pas mélanger.
- Le changement d'offre Cursor (Grok, SpaceX) est surprenant : relu deux fois sur la page le 2026-10-24, mais à revérifier juste avant publication.
