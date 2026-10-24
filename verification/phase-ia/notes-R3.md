# Notes du rédacteur R3 (phase IA) — leçons 02/05 et 02/06 + exemple Lave Montante

Fichiers : `src/content/lecons/module-02/05-decouper-un-gros-projet.mdx`, `src/content/lecons/module-02/06-relire-et-tester-le-code-de-l-ia.mdx`, dossier `exemples/lave-montante/` (projet Rojo complet). Vérifications faites les 24-25/10/2026 (machine de l'orchestrateur).

## Ce qui a été testé réellement sur la machine

| Commande | Résultat |
|---|---|
| `rokit init` puis `rokit add rojo-rbx/rojo`, `Kampfkarren/selene`, `JohnnyMorganz/StyLua`, `lune-org/lune` dans `exemples/lave-montante/` | `rokit.toml` : rojo 7.7.1, selene 0.32.0, StyLua 2.6.0, lune 0.11.1. En non interactif, `rokit add lune-org/lune` refuse d'abord (« has not been marked as trusted ») ; `rokit trust lune-org/lune` puis `rokit add` passe. En terminal interactif, Rokit pose la question (d'où la phrase « réponds oui » dans la leçon). |
| `rojo build exemples/lave-montante -o C:\tmp\phase-ia-r3\lave.rbxlx` (depuis la racine, rojo global 7.7.0-rc.1) | « Built project to lave.rbxlx », code 0. Idem avec rojo 7.7.1 du projet. |
| `rojo sourcemap default.project.json -o C:/tmp/phase-ia-r3/sourcemap.json` puis `C:\tmp\luau-tools\luau-lsp.exe analyze --definitions=@roblox=C:/tmp/luau-tools/globalTypes.d.luau --sourcemap=C:/tmp/phase-ia-r3/sourcemap.json src` | **0 diagnostic**. Contrôle : un fichier piégé ajouté temporairement est bien signalé (TypeError), donc l'analyse tourne vraiment. |
| Même analyse avec `--!strict` ajouté en tête de chaque fichier (copie dans C:\tmp) | 1 seul diagnostic : `local ok, erreur = pcall(jouerUnCycle)` (« Function only returns 1 value, but 2 are required ») car `jouerUnCycle` ne renvoie rien. Le projet n'est donc PAS en mode strict ; la leçon ne prétend pas qu'il l'est. |
| `stylua --check src tests` | code 0 |
| `selene src` et `selene tests` | 0 errors, 0 warnings |
| `lune run tests/ReglesRound.spec.luau` | 12 OK, code de sortie 0 |
| Test avec une attente fausse (51 au lieu de 50) | « RATÉ … », message d'erreur Lune, code de sortie 1 |
| Module modifié (`if nombreSurvivants == 1 then`, bonus sans condition de participants) | « RATÉ  seul dans le round : pas de bonus : attendu 25, obtenu 50 », « 11 réussi(s), 1 raté(s) », code 1 : sortie recopiée dans la leçon 06 |
| selene 0.32.0 (std roblox) sur un script avec `wait`, `spawn`, `while true` sans attente, variable inutilisée | seules les variables inutilisées sont signalées (`warning[unused_variable]`, sortie recopiée). `wait`/`spawn`/boucle sans attente : rien. |
| luau-lsp 1.70.1 (mode non strict) sur `wait(1)`, `spawn(...)`, `Instance.new("BodyVelocity")`, `:connect`, `Humanoid:LoadAnimation` | `DeprecatedApi: Function 'wait' is deprecated, use 'task.wait' instead` et idem `spawn`. Rien pour BodyVelocity, `:connect`, `LoadAnimation`. |
| luau-lsp en `--!strict` sur le même fichier | en plus : `Key 'connect' not found … Did you mean 'Connect'?` et `DeprecatedApi: Member 'LoadAnimation' is deprecated`. Toujours rien pour BodyVelocity. |
| luau-lsp sur `magasin:SaveAsync(...)` et `Players:GetPlayerByName(...)` | non strict : rien ; strict : `TypeError: Key 'SaveAsync' not found in external type 'DataStore'` et idem `GetPlayerByName`. Sortie recopiée dans la leçon. |
| luau-lsp sur `while true do plateforme.CFrame *= … end` (sans task.wait) | rien (ni selene). |
| `node scripts/verifier-luau.mjs 02` | voir « Diagnostics attendus » plus bas. |

Non testé (impossible ici) : une vraie session interactive de Claude Code produisant ces prompts, et le jeu dans Studio. Les prompts et le scénario « Touched » sont donc présentés comme une **référence** ; la leçon 05 dit explicitement que le résultat de l'élève sera formulé différemment (encadré « Ton résultat sera un peu différent ») et la première version « Touched » est introduite par « Claude choisira très probablement… ». Le code final est celui que j'ai écrit pour correspondre à ces prompts, vérifié par les outils ci-dessus, pas exécuté dans Studio.

## Affirmations factuelles et sources

### Claude Code (consultées le 25/10/2026)
- Sous-agents : fichier Markdown + frontmatter, `name` et `description` seuls obligatoires ; `tools` (Read, Grep, Glob), `model` (`sonnet`…) ; emplacements `.claude/agents/` ; invocation en langage naturel ou par mention `@` (« guarantees it runs ») ; fichiers ajoutés/modifiés détectés en quelques secondes, redémarrage nécessaire si le dossier `agents` n'existait pas au lancement — https://code.claude.com/docs/en/sub-agents. Exemple officiel `code-reviewer` avec `tools: Read, Glob, Grep`, `model: sonnet`.
- `/code-review` (alias `/review`) : sans cible, relit les commits de la branche en avance sur l'amont + les changements non commités ; cible possible (chemin, PR, branche, plage) ; `--fix` applique (via le mode de permission), sans option rapport seulement ; niveaux `low` (moins de faux positifs) à `max` ; tourne comme sous-agent en arrière-plan, résultats dans la conversation ; suit CLAUDE.md ; compte dans l'usage du forfait — https://code.claude.com/docs/en/code-review-local et https://code.claude.com/docs/en/commands.
- `/code-review ultra` / `/ultrareview` : « Includes 3 free runs on Pro and Max, then requires usage credits » — https://code.claude.com/docs/en/commands. La leçon dit « quelques essais gratuits » + accord de l'adulte.
- `/security-review` : diff entre la branche et la branche par défaut d'`origin`, « Needs an `origin` remote » — même page.
- Mode plan, `Shift+Tab`, `/plan`, `⏸ plan mode on` : fiche de veille + https://code.claude.com/docs/en/permission-modes (repris de la leçon 03, cohérent).
- Contexte qui se remplit, « If you could describe the diff in one sentence, skip the plan », « Give Claude a check it can run », « If you can't verify it, don't ship it » — https://code.claude.com/docs/en/best-practices (fiche de veille, citations reprises telles quelles).
- Checkpoints ≠ Git — https://code.claude.com/docs/en/checkpointing (fiche de veille).
- `!` en début de saisie = mode shell — fiche de veille (interactive-mode).
- « Tests are there to verify correctness, not to define the solution » — vérifié dans le HTML de https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices le 25/10.

### Roblox (sources primaires : dépôt Roblox/creator-docs, fichiers YAML de la référence, lus le 25/10)
- `BasePart.Touched` : « This event only fires as a result of physical movement, so it will not fire if the CFrame property was changed such that the part overlaps another part. » (BasePart.yaml) — base du scénario de la tâche 6 et d'une question de quiz. La leçon dit « pas toujours éliminé » (un joueur qui bouge peut déclencher le contact).
- `Instance:Destroy` : « disconnects all connections … the correct way to dispose of objects that are no longer required » (Instance.yaml).
- `DataModel:BindToClose` : le serveur attend 30 secondes (DataModel.yaml).
- `GlobalDataStore:UpdateAsync` : callback qui renvoie `nil` = écriture annulée (GlobalDataStore.yaml).
- `BodyVelocity` : « deprecated … Use LinearVelocity instead » (BodyVelocity.yaml).
- Open Cloud Luau Execution : « Run Luau scripts headlessly in a Roblox place via Open Cloud for automated testing », tâches de 5 min max — https://create.roblox.com/docs/cloud/reference/features/luau-execution.md.
- `LoadCharacter` → `LoadCharacterAsync` : repris de la leçon 04/02 (vérifiée en phase 1), non revérifié par moi.

### Outils de test et qualité (API GitHub via `gh api`, le 25/10/2026)
- Roblox/testez : `archived: true` ; page GitHub : « archived by the owner on Sep 14, 2024 » ; dernière release v0.4.2 (2022-01-05).
- jsdotlua/jest-lua : non archivé ; dernière release v3.10.0 (2024-12-23) ; README : « Jest Lua can currently only run inside of Roblox », installation par Wally (`jsdotlua/jest-globals@3.10.0`).
- rojo-rbx/run-in-roblox : non archivé ; dernière release v0.3.0 (2020-07-20) ; dernier push 2024-03-06.
- lune-org/lune : non archivé ; v0.11.1 (2026-10-21). Doc : `rokit add lune` (j'ai utilisé et testé la forme complète `rokit add lune-org/lune`), `lune run script-name`.
- selene 0.32.0 (2026-10-01), StyLua v2.6.0 (2026-10-10), luau-lsp 1.70.1 (2026-09-27).
- Le lien Rokit du brief (github.com/rokit-rs/rokit) renvoie 404 ; l'en-tête de `rokit.toml` généré par Rokit 1.2.0 pointe vers https://github.com/rojo-rbx/rokit. Non cité dans les leçons.

## Décisions
- **Code complet dans la leçon** : le site ne publie pas `exemples/`, donc la leçon 05 contient les 6 scripts complets (Config, ReglesRound, Leaderstats, Lave, GestionRounds, AffichageRound) dans des blocs normaux (pas de composant repliable : AUTHORING interdit d'autres composants). Ils ont été insérés automatiquement depuis les fichiers du projet (copie exacte). L'interface (`.model.json`) est décrite en texte pour construction à la main. Le fichier de test complet est dans la leçon 06.
- **Pas de DataStore dans Lave Montante v1** : périmètre volontairement réduit (mentionné dans le GDD, défi de fin de leçon 05 pour l'ajouter).
- **Élimination par hauteur, pas par Touched** : plus fiable (doc officielle) et testable (fonction pure `estSousLaLave`).
- **État du round via attributs** sur `ReplicatedStorage.EtatRound` (répliqués, un joueur qui arrive en cours de round voit l'état) ; aucun RemoteEvent client → serveur.
- `stylua.toml` : `syntax = "Luau"` seul ; `selene.toml` : `std = "roblox"` — identiques à ceux de la leçon 02 (harmonisés après lecture de la leçon 02 ; `stylua --check` repasse à 0).
- Le sous-agent `relecteur-roblox` de la leçon 06 est la **version complète** du fichier court de la leçon 03 (même nom, même frontmatter), présentée comme remplacement.
- `miseAJour: 2026-10-24` comme demandé par le brief (vérifications faites les 24-25/10).
- Liens internes au format `/modules/02/slug/` comme la leçon 03.

## Diagnostics attendus de `verifier-luau.mjs 02` pour mes fichiers
- `05#bloc6` (GestionRounds), `05#bloc7` (AffichageRound) : « Unknown require » de `Config`, `ReglesRound`, `Lave` — modules définis dans d'autres blocs (cas accepté en phase 1). Le projet complet, lui, passe à 0 diagnostic avec la sourcemap.
- `06` bloc du fichier de test : « Unknown require: …ReglesRound » — `require("../src/…")` relatif au fichier de test, résolu par Lune mais pas depuis le dossier temporaire du vérificateur ; la leçon le signale à l'élève.
- Les 3 `trouve-le-bug` de la leçon 06 et celui de la leçon 05 contiennent volontairement un défaut.

## Points incertains
- Le message exact affiché par Studio pour une boucle sans attente (« Script timeout… ») : la leçon reste générale (« Roblox finit par arrêter le script avec une erreur de délai dépassé »).
- Comportement réel de `Touched` sur un personnage immobile quand la lave est redimensionnée : la doc dit qu'il ne se déclenche pas sur un changement de CFrame ; en pratique l'animation idle peut parfois provoquer un contact, d'où la formulation « pas toujours éliminé ».
- Textes des boutons Studio « Server & Clients », « Reset Character » : repris de la leçon 01/04 et de l'interface anglaise.
