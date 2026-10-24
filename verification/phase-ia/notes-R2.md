# Notes du rédacteur R2 — leçons 02/03 et 02/04

Fichiers : `src/content/lecons/module-02/03-claude-code-de-a-a-z.mdx`, `src/content/lecons/module-02/04-l-art-du-prompt-precis.mdx`.
Sources consultées le 2026-10-24/25 (date de la machine : 25/10/2026, `miseAJour: 2026-10-24` conservé comme demandé par le brief).

## 1. Affirmations factuelles et sources (leçon 03)

| Affirmation | Source consultée |
|---|---|
| Installeur natif recommandé : `irm https://claude.ai/install.ps1 \| iex` (PowerShell), `curl -fsSL https://claude.ai/install.sh \| bash` (Mac) ; pas de progression affichée ; ouvrir un nouveau terminal ; pas besoin d'être administrateur ; mises à jour automatiques | https://code.claude.com/docs/en/setup |
| Messages d'erreur CMD/PowerShell (`The token '&&'…`, `'irm' is not recognized`) | idem |
| Git for Windows recommandé (Bash tool), sinon PowerShell | idem |
| `claude --version` → « 2.1.211 (Claude Code) » dans la doc ; sur la machine : `2.1.310 (Claude Code)` | setup + test local |
| `claude doctor` : diagnostics en lecture seule sans session, valide les fichiers de réglages | setup + **test local** (voir §3) |
| PATH : `%USERPROFILE%\.local\bin`, « Verify your PATH », terminal d'éditeur à relancer | https://code.claude.com/docs/en/troubleshoot-install |
| npm encore documenté mais plus recommandé (notification de dépréciation v2.1.15) | setup (« Advanced installation options ») + CHANGELOG |
| Free n'inclut pas Claude Code ; Pro/Max/Team/Enterprise/Console | setup (« Authenticate ») |
| Prix : Pro 20 $/mois mensuel, 17 $/mois annuel (200 $ d'avance), Max « From $100 », niveaux 5x/20x | https://claude.com/pricing (relu le 25/10) |
| 18 ans minimum : « You must be at least 18 years old to use the Services » (Consumer Terms, en vigueur le 8 oct. 2025) ; formulation commune de la décision 38 appliquée | https://www.anthropic.com/legal/consumer-terms |
| Connexion : navigateur, touche `c`, `Paste code here if prompted`, `Login successful` puis Entrée | https://code.claude.com/docs/en/authentication |
| Boîte de dialogue de confiance au premier lancement interactif dans un dossier | https://code.claude.com/docs/en/security (« Trust verification ») ; message réel observé en `-p` : « this workspace has not been trusted » |
| Raccourcis : Esc, Esc Esc, `\`+Entrée et Ctrl+J, `@`, `!`, Ctrl+C deux fois, Shift+Tab / Alt+M (Windows), Ctrl+G | https://code.claude.com/docs/en/interactive-mode |
| CLAUDE.md : emplacements, `CLAUDE.local.md`, « target under 200 lines », contexte et non configuration imposée, `/init` améliore sans écraser, `/memory` | https://code.claude.com/docs/en/memory |
| Raccourci `#` supprimé : CHANGELOG 2.0.70 « Removed # shortcut for quick memory entry » ; « add this to CLAUDE.md » ; « souviens-toi » → auto memory | CHANGELOG (téléchargé et grep) + memory |
| « Would removing this cause Claude to make mistakes? » | https://code.claude.com/docs/en/best-practices |
| Mode plan : Shift+Tab, `/plan`, `--permission-mode plan`, libellé `⏸ plan mode on`, 3 choix (Yes, and use auto mode / Yes, manually approve edits / No, keep planning), Ctrl+G | https://code.claude.com/docs/en/permission-modes |
| « If you could describe the diff in one sentence, skip the plan » | best-practices |
| Tableau des modes (default=Manual, acceptEdits, plan, auto, dontAsk, bypassPermissions) | permission-modes + permissions |
| Mode de départ `auto` depuis v2.1.283 (doc) ; le CHANGELOG place le passage « on every plan and provider » en 2.1.284. J'ai écrit « depuis la version 2.1.283 (d'après la documentation des modes) » | permission-modes + CHANGELOG |
| `defaultMode: "default"` accepté dans `.claude/settings.json` (seuls `auto` et `bypassPermissions` y sont ignorés) | permission-modes, section « Which mode a session starts in » |
| En mode auto, le classifieur autorise par défaut un push vers le dépôt courant ; bloque `git reset --hard`, `git restore .`, force push | permission-modes |
| Trois fichiers de réglages, syntaxe `Bash(cmd *)`, ordre deny → ask → allow, « enforced by Claude Code, not by the model », `Read(./.env)`, règles `PowerShell(...)`, « Yes, and don't ask again » → `.claude/settings.local.json` | https://code.claude.com/docs/en/permissions |
| Commandes slash (toutes celles du tableau, alias `/new` `/reset` `/undo` `/checkpoint` `/review` `/cost`) | https://code.claude.com/docs/en/commands |
| Skills : `.claude/skills/<nom>/SKILL.md`, champs facultatifs, `disable-model-invocation`, `allowed-tools`, commandes fusionnées, détection à chaud, `/reload-skills` si dossier absent au lancement | https://code.claude.com/docs/en/skills |
| Sous-agents : `.claude/agents/`, `name`+`description` obligatoires, `tools`, `model: sonnet`, contexte propre, invocation langage naturel / `@`, détection à chaud sauf premier dossier ; `/agents` sans assistant depuis 2.1.198 | https://code.claude.com/docs/en/sub-agents + CHANGELOG 2.1.198 |
| Hooks : « deterministic and guarantee the action happens » ; PostToolUse, matcher `Edit\|Write` ; exit 2 = « Shows stderr to Claude; the tool already ran » ; `sh -c` (Mac), Git Bash (Windows), PowerShell sans Git Bash, champ `"shell": "powershell"` ; `$CLAUDE_PROJECT_DIR` ; `/hooks` lecture seule ; ne se déclenche pas sur les modifications faites par Bash ; exemple officiel avec `jq` | hooks-guide + hooks (référence) + best-practices |
| Contexte : « fills up fast, and performance degrades as it fills » ; `/clear`, `/compact <instructions>`, `/context`, `/btw`, auto-compaction ; plus de deux corrections → `/clear` | best-practices + commands |
| Checkpoints : un par prompt, `/rewind` ou Esc Esc, 6 actions, limites (Bash, sous-agents, modifications externes), « quick, session-level recovery », pas un remplacement de Git | https://code.claude.com/docs/en/checkpointing |
| Git : `git restore`, `git revert HEAD` | git-scm.com/docs + **test local** |

## 2. Affirmations factuelles (leçon 04)

| Affirmation | Source |
|---|---|
| « Claude can infer intent, but it can't read your mind… », « The more precise your instructions… », vague prompts utiles pour explorer, « Give Claude a check it can run », « Have Claude show evidence rather than asserting success », « If you can't verify it, don't ship it » | https://code.claude.com/docs/en/best-practices |
| « Think of Claude as a brilliant but new employee… », test du collègue, « If you want Claude to do more than the task strictly requires, explicitly request it », « Providing context or motivation… » | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices |
| API Roblox citées dans les prompts : `UpdateAsync`, `BindToClose`, `GetOrderedDataStore`/`GetSortedAsync(ascending, pagesize)`, `GetNameFromUserIdAsync`, `WorldRoot:GetPartBoundsInBox(cframe, size, overlapParams)`, `Humanoid:TakeDamage`, `Animator:LoadAnimation`, `GetAttributeChangedSignal`, `UIAspectRatioConstraint`, `UIGridLayout` | create.roblox.com/docs (OrderedDataStore et WorldRoot relus ; les autres sont déjà utilisées et vérifiées dans les modules 3 à 5) |
| Les « ce que l'IA produit typiquement » : description honnête de ce que j'écrirais moi-même avec le prompt vague, sans aucune statistique | décision de rédaction (consigne du brief) |

## 3. Tests réels sur la machine (dossier `C:\tmp\phase-ia-r2\`)

1. `rokit init`, `rokit add JohnnyMorganz/StyLua` (2.6.0), `rokit add Kampfkarren/selene` (0.32.0) dans `C:\tmp\phase-ia-r2\ObbyTest` ; `selene.toml` = `std = "roblox"` (la std Roblox est récupérée automatiquement), `stylua.toml` en tabulations.
2. Comportement des outils : `selene src` sort avec le code **1 sur un simple avertissement** (`unused_variable`) ; `selene --display-style quiet src` donne un rapport compact ; `stylua src` sort avec le code 2 sur une erreur de syntaxe et écrit sur stderr ; `stylua --check src` sort avec 1 s'il y a des différences.
3. JSON du `settings.json` complet (permissions + hook) : valide (`JSON.parse`), et `claude doctor` dans le dossier n'affiche aucune rubrique « Invalid settings ». Contre-test : un fichier volontairement faux (`"type": "commande"`, `allow` en chaîne) fait apparaître « Invalid settings » avec le champ et une correction suggérée → formulation de la leçon confirmée.
4. Commande du hook exécutée à la main sous **Git Bash** avec `CLAUDE_PROJECT_DIR` au format Windows (`C:\tmp\...`) et lancée depuis un autre dossier : cas OK → exit 0 ; avertissement selene → exit 2 + rapport sur stderr + fichier reformaté par StyLua ; erreur de syntaxe → exit 2 + message de StyLua. Même commande sous `sh -c` avec chemin POSIX : exit 0 (approximation du comportement Mac ; **pas de Mac disponible pour un test réel**).
5. Variante PowerShell (`"shell": "powershell"`) testée avec `powershell.exe -EncodedCommand` (PowerShell 5.1) : OK → 0, avertissement → 2 + rapport, syntaxe → 2 + message.
6. **Test de bout en bout dans Claude Code 2.1.310** (non interactif, `claude -p … --model haiku --permission-mode acceptEdits --include-hook-events --no-session-persistence`) : Claude a ajouté `local inutile=5` avec l'outil Edit ; l'événement `hook_response` montre `exit_code: 2`, stderr = rapport selene ; le fichier final contient `local inutile = 5` (reformaté par StyLua) ; Claude a reçu « PostToolUse:Edit hook blocking error from command … » plus une note « PostToolUse hook modified … after your edit (likely a formatter) ». Même test réussi avec la variante PowerShell. Les hooks du projet s'exécutent même dans un dossier non « trusted » en `-p` (les règles `allow` étaient ignorées, avec un avertissement).
7. Skill `/verifier` lancée en `-p` depuis PowerShell : exécutée, rapport conforme (selene/StyLua OK, git diff, contrôle des règles). Sous Git Bash, `claude -p "/verifier"` est transformé en chemin `C:/Program Files/Git/verifier` par la conversion de chemins MSYS : sans effet pour l'élève (en session interactive, on tape `/verifier` dans Claude Code, pas dans Bash).
8. Sous-agent `relecteur-roblox` : reconnu par Claude Code (listé comme type d'agent disponible).
9. Git : `git restore <fichier>`, `git revert --no-edit HEAD`, `git log --oneline` testés dans le dépôt de test.

## 4. Points incertains / à surveiller

- **Mac non testé** réellement (hook en `sh -c`, PATH de Rokit). Hypothèse raisonnable : Claude Code hérite du PATH du terminal, où Rokit s'est ajouté.
- **Fins de ligne** : avec `core.autocrlf=true` (défaut de Git for Windows), `git restore` réécrit les fichiers en CRLF. Si la leçon 02/02 met `line_endings = "Unix"` dans `stylua.toml`, le hook reconvertira ces fichiers (bruit dans `git diff`). À harmoniser par la leçon 02/02 (`.gitattributes` avec `* text=auto eol=lf`, ou `line_endings` absent). Je ne précise pas `line_endings` dans mes leçons.
- Le hook vérifie tout `src` (pas seulement le fichier modifié) pour se passer de `jq` : un avertissement préexistant dans un autre fichier fera répondre le hook en code 2 à chaque modification. Mitigation écrite dans la leçon : « formatage initial + commit » avant d'installer le hook.
- Cohérence avec la leçon 02/02 (relue en fin de rédaction) : dossier `ObbyDesNuages`, `selene.toml` (`std = "roblox"`), `stylua.toml` (`syntax = "Luau"`, fins de ligne par défaut), Rokit. La 02/02 crée déjà un `.claude/settings.json` avec 3 règles `ask` MCP (`mcp__Roblox_Studio__execute_luau`, `multi_edit`, `insert_asset`) : mes deux versions du fichier **reprennent ces 3 règles** et le texte dit de remplacer le fichier existant. Le fichier final (permissions + MCP + hook) a été revalidé avec `JSON.parse` et `claude doctor` (aucune rubrique Invalid settings).
- `Alt+M` : la doc précise « on Windows when the Node or Bun runtime doesn't enable VT input mode » ; j'ai écrit « si `Shift+Tab` ne fait rien, essaie `Alt+M` ».
- Règles `PowerShell(...)` sur Mac : je ne les ai **pas** mises dans le fichier principal (risque d'avertissement « matches no tool » sur Mac, non vérifiable ici) ; elles sont proposées dans une Astuce « si tu travailles uniquement sous Windows ».
- Le prompt « Épée de combat » suppose un dossier `src/StarterPack` déclaré dans `default.project.json` (pas présent dans le projet de référence : c'est un « autre jeu », je l'ai signalé dans le prompt).
- Âge minimum : formulation commune de la décision 38 appliquée dans l'encadré, la connexion, le défi et le résumé.

## 5. Décisions

- Le modèle de CLAUDE.md (~95 lignes) est dans un `<Prompt>` avec un bloc ` ```markdown ` (le bouton Copier copie le premier `<pre>`), sans triple backtick à l'intérieur.
- Réglage proposé : `defaultMode: "default"` (Manual) pour débutants, malgré le mode de départ `auto` ; `git push`, `git reset --hard`, `git clean` interdits ; commit/restore en `ask`.
- Leçon 04 : 2 extraits Luau « à NE PAS utiliser » (sauvegarde naïve, boutique qui croit le prix du client) pour rendre concrets les défauts ; ils sont syntaxiquement valides et passent luau-lsp (voir résultat `verifier-luau`), leurs défauts sont logiques.
- Quiz : leçon 03 = 6 questions (dont 1 `ameliore-le-prompt` et 1 mise en situation « 40 messages ») ; leçon 04 = 6 questions (2 `ameliore-le-prompt`, 1 `trouve-le-bug` « faille dans du code généré par IA »).
