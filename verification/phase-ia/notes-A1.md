# Notes pour les vérificateurs — Adaptateur A1 (module 03 « Lire et comprendre Luau »)

Date de travail : 2026-10-24 / 2026-10-25. Aucun commit. Fichiers touchés : les 6 leçons `src/content/lecons/module-03/*.mdx` et `src/content/examens/module-03.yaml`, plus ce fichier.

## Principe de l’adaptation

- **Aucun code du fil rouge n’a été modifié** (kill brick dans la Part, pièce qui tourne, `KillBricks`, `PiecesTournantes`, `Checkpoints`, `Config`, `PieceTournante`, versions typées). Les noms et emplacements restent ceux de `projet-reference/` (`KillBricks.server.luau` est identique au bloc de la leçon 4 ; `Config.luau` du corrigé est la version de la leçon 6 complétée au module 6).
- Chaque leçon : intro réorientée (lire / relire le code de l’IA, rappel du module 2), passages « crée / tape » transformés en « voici le code, tape-le ou demande-le à Claude Code », section **« Lire ce code comme un relecteur »** (2 exercices, réponses dans `<Info titre="Réponse">`), encadré **`<AvecClaudeCode>`** au format du brief (gabarit en rubriques + 4 à 6 puces « À vérifier »), objectifs et description reformulés vers la lecture, `duree` +5 min, une puce de résumé ajoutée ou complétée. `miseAJour` était déjà `2026-10-24` partout : inchangée.
- **Décision Rojo / Workspace** : dans `projet-reference/default.project.json`, le Workspace n’est pas synchronisé. Les scripts placés DANS une Part (leçons 1 à 3 : démonstration, kill brick, pièce qui tourne) se créent donc dans Studio ; leurs prompts demandent « donne le code dans ta réponse, ne crée aucun fichier ». Les scripts de ServerScriptService et `ReplicatedStorage.Modules` (leçons 4 à 6) sont créés comme fichiers `src/...` par Claude Code.
- Les prompts renvoient au `CLAUDE.md` (« voir CLAUDE.md ») pour l’arborescence, et citent `selene src` / `stylua --check src` comme commandes de vérification (conformes au brief commun).

## Changements par leçon

| Fichier | Changements | Quiz |
|---|---|---|
| `01-premier-script.mdx` | Intro ; Info éditeur (VS Code + luau-lsp) ; nouvelle sous-section « Dans Studio ou dans ton projet Rojo ? » (tableau des suffixes + Attention sur la suppression des objets inconnus) ; « Ton premier script » en deux variantes (fichier Rojo / Studio sans Rojo) ; Astuce renommage (nom = nom du fichier) ; exercices de lecture (prévoir l’Output avec commentaires, `script.Parent` déplacé dans ServerScriptService) ; encadré « Script de bienvenue » (version simple) ; Défi 1 ; résumé ; 2 sources Rojo. | 7 (+1 `qcm` suffixe `.client.luau`, +1 `ameliore-le-prompt`) |
| `02-variables-types-et-conditions.mdx` | Intro ; phrase avant le code de la kill brick ; exercices (piège `0` truthy + `or` ; kill brick IA avec `autrePart.Parent.Humanoid` et variable inutile) ; encadré « Kill brick (script dans la Part) » ; résumé. | 7 (+1 `qcm` priorité `+` / `..`, +1 `ameliore-le-prompt`) |
| `03-boucles-et-fonctions.mdx` | Intro ; précision « script créé dans Studio » + phrase avant le code ; exercices (déroulé `continue`/`break` → `4` ; script IA de clignotement : `wait`, attente manquante, ligne après boucle infinie) ; encadré « Pièce qui tourne » ; 2 puces de résumé. | 7 (+1 `qcm` shadowing, +1 `trouve-le-bug` IA `wait(1)`) |
| `04-tables.mdx` | Intro ; noms de fichiers Rojo pour `KillBricks` et `PiecesTournantes` ; exercices (référence vs `table.clone` ; suppression vers l’avant qui saute un élément) ; encadré « KillBricks et PiecesTournantes » ; résumé. | 7 (+1 `qcm` clé absente → `nil`, +1 `trouve-le-bug` IA sans `IsA`) |
| `05-evenements.mdx` | Intro ; paragraphe avant le code des checkpoints (fichier `Checkpoints.server.luau`) ; exercices (ordre `task.delay` / `task.spawn` ; `WaitForChild` sur un nom faux + joueur déjà présent) ; encadré « Checkpoints basiques » ; puce de résumé. | 7 (+1 `trouve-le-bug` IA connexion créée dans `Touched`, +1 `ameliore-le-prompt`) |
| `06-modulescripts-et-poo.mdx` | Intro ; équivalent Rojo de la création de `Config` (`src/ReplicatedStorage/Modules/Config.luau`) et de `PieceTournante` ; exercices (classe `Compteur` + appel avec un point ; `PiecesTournantes` IA qui garde une constante en double et un service inutile) ; encadré « Module Config » (commence par le mode plan) ; puce de résumé. | 8 (+1 `trouve-le-bug` IA secret dans ReplicatedStorage, +1 `ameliore-le-prompt`) |
| `examens/module-03.yaml` | Titre « Examen du module 3 — Lire et comprendre Luau » ; +3 questions : `qcm` (retour `nil` de `obtenirNiveau` non testé), `trouve-le-bug` IA (pièce ramassable plusieurs fois, sans verrou), `ameliore-le-prompt` (KillBricks). | 17 (14 + 3) |

Taille : la prose ajoutée (hors blocs de code et prompts) est d’environ 430 à 690 mots par leçon ; la leçon 1 est au-dessus de la fourchette à cause de la sous-section Rojo, jugée indispensable (sinon les consignes « insère un Script dans ServerScriptService » entrent en conflit avec le projet Rojo du module 2).

## Affirmations factuelles nouvelles et sources

| Affirmation | Où | Source (consultée le 2026-10-25) |
|---|---|---|
| Rojo : `*.server.lua(u)` → Script, `*.client.lua(u)` → LocalScript, autre `.lua(u)` → ModuleScript | L1 (tableau, quiz), L6 (Config.luau) | https://rojo.space/docs/v7/sync-details/ (« Any file ending in `.server.lua` will turn into a `Script` »…) ; `.luau` pris en charge depuis 7.2.0 (CHANGELOG, voir veille-roblox-ia.md §C) ; `emitLegacyScripts` vaut `true` par défaut → LocalScript pour `.client` : https://rojo.space/docs/v7/project-format/ |
| Rojo peut supprimer les objets qu’il ne connaît pas dans un dossier qu’il gère | L1 (Attention) | https://rojo.space/docs/v7/project-format/ : `$ignoreUnknownInstances` = « Whether instances that Rojo doesn't know about should be deleted », « Default is `false` if `$path` is specified ». Dans le projet de référence, ServerScriptService et `ReplicatedStorage.Modules` ont un `$path`. J’écris « peut supprimer » (je n’ai pas testé le moment exact de la suppression dans Studio). |
| Le Workspace n’est pas synchronisé par Rojo « dans notre projet » | L1 à L5 | `projet-reference/default.project.json` (pas d’entrée Workspace) |
| `wait` dépréciée, remplacée par `task.wait` | L3 (quiz, exercice) | déjà sourcé en phase 1 (RobloxGlobals) ; veille-roblox-ia.md §I |
| Un LocalScript ne s’exécute pas dans ServerScriptService | L1 quiz | déjà sourcé (Script types and locations) |
| Lire une clé absente d’une table donne `nil` sans erreur ; `+` prioritaire sur `..` ; `local` dans une fonction crée une nouvelle variable | L2, L3, L4 quiz | documentation Luau déjà citée en sources (Operators, Scope, Tables) |
| luau-lsp signale les variables jamais utilisées | L6 exercice 2 | test réel : `luau-lsp analyze` renvoie `LocalUnused` sur ce genre de variable (voir plus bas) |

Messages d’erreur cités « du type … » (non reproduits dans Studio, formulés avec prudence) : `Transparency is not a valid member of ...`, `Humanoid is not a valid member of ...`, `Touched is not a valid member of Folder`, `attempt to index number with 'valeur'`, `attempt to index nil with 'nom'`. Ils suivent les formats déjà présentés dans la leçon 1 (tableau des messages fréquents).

## Tests réels

- `luau-lsp analyze` (via `node scripts/verifier-luau.mjs 03`) avant modification : 62 extraits, 7 avec diagnostics, tous attendus (bugs volontaires des `trouve-le-bug`, `require` non résolus hors sourcemap).
- Après modification : **78 extraits analysés, 8 avec diagnostics**, tous attendus : les 7 d’avant (inchangés) + `06-modulescripts-et-poo.mdx#bloc10` (exercice 2, volontairement mal organisé : `require` non résolu hors sourcemap, `LocalUnused` sur `Players` et `ImportUnused` sur `Config`, exactement ce que l’exercice fait repérer). Tous les nouveaux extraits non volontairement bogués sont sans diagnostic. Remarque : le script ne signale un extrait que si luau-lsp sort en erreur ; un extrait qui n’a que des avertissements de lint (ex. `degats` inutilisée en L2, `wait` en L3, extraits volontairement fautifs) n’apparaît pas dans la liste.
- `bash scripts/build-verrou.sh` : code de sortie 0, deux fois (la seconde après les dernières retouches de la leçon 1). Pages rendues vérifiées dans `dist/modules/03/*/` : encadrés « Avec Claude Code » et boutons « Copier » présents, titre d’examen « Lire et comprendre Luau ».
- Test ponctuel dans `C:\tmp\phase-ia-A1\t1.luau` : `luau-lsp analyze` en mode non strict accepte `Workspace:WaitForChild(...).Touched` et `script.Parent.Transparency`, et signale `LocalUnused` sur une variable inutilisée.

## Points incertains / décisions

- Les exercices « que se passe-t-il si » de L3 (clignotement : l’état opaque « ne dure pas le temps d’une image ») reposent sur le fonctionnement standard du moteur (aucune attente entre deux affectations dans le même fil = pas de rendu intermédiaire). Non testé dans Studio.
- L5, exercice 2 : le délai de 5 s avant « Infinite yield possible » était déjà affirmé dans la leçon (phase 1).
- Le module 02 n’existe pas encore dans le dépôt au moment de la rédaction : les renvois (« comme au module 2 », `rojo serve`, plugin Rojo, VS Code + luau-lsp, CLAUDE.md) suivent le plan figé de PLAN.md et le brief commun.
- L6 : la question `trouve-le-bug` sur le secret dans ReplicatedStorage renvoie au module 4 seulement pour « ne jamais se fier au client » (le module 4 n’enseigne pas de système d’administration ; je ne l’ai donc pas affirmé).
