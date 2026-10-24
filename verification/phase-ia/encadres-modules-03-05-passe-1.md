# Ajouts phase IA, modules 03 à 05 (leçons et examens) — passe 1 (vérificateur V3) — 2026-10-24

## Résumé
71 éléments vérifiés, 4 corrigés, 3 reformulés, 0 supprimés ; quiz : 30 nouvelles questions de quiz et d’examen relues (13 `ameliore-le-prompt`, 12 `trouve-le-bug`, 5 `qcm` ; numéros de ligne recomptés un par un), 1 explication corrigée ; code : 12 exercices de lecture du module 03 relus, dont 6 extraits de Luau pur exécutés avec `luau.exe` (sorties conformes aux réponses) ; code du fil rouge inchangé (diff relu, `KillBricks.server.luau` identique au corrigé) ; `verifier-luau` 03 / 04 / 05 : uniquement des diagnostics attendus (voir plus bas) ; tests réels effectués : `luau.exe` (6 scripts), `rojo build` (Rojo 7.7.1) de l'interface décrite en `init.meta.json` + `.model.json` (structure du corrigé, puis variante avec `Boutique.model.json` imbriqué), lecture du code source du plugin Rojo (boutons Disconnect / Accept / Abort, `confirmationBehavior = "Initial"`), schémas des outils MCP de Studio sur cette machine. Aucun Studio n'est connecté : rien n'a pu être exécuté en jeu réel (scripts Roblox, prompts dans une vraie session Claude Code, suppression effective par Rojo à la connexion).

Comptage : 17 encadrés `<AvecClaudeCode>` (6 + 5 + 6) + 1 `<Prompt>` hors encadré (5.4) + 2 `<Attention>` Rojo (5.4, 5.6) + 1 `<Attention>` Rojo (3.1) + 12 exercices de lecture + 30 questions + objectifs/descriptions/intros des 6 leçons du module 03 + phrases ajoutées dans les `<Defi>` (≈ 71).

## Détail
| Leçon | Affirmation / élément | Verdict (OK / CORRIGÉ / REFORMULÉ / SUPPRIMÉ) | Source | Commentaire |
|---|---|---|---|---|
| 03/01 | Tableau des suffixes Rojo (`.server.luau` → Script, `.client.luau` → LocalScript, `.luau` → ModuleScript) | OK | rojo.space/docs/v7/sync-details ; `emitLegacyScripts` (project-format) | `.luau` testé par `rojo build` du corrigé |
| 03/01 | `<Attention>` : Rojo peut supprimer les objets inconnus des dossiers qu'il gère | REFORMULÉ | rojo.space/docs/v7/project-format (« Default is `false` if `$path` is specified ») ; `projet-reference/default.project.json` | La liste ne citait que ServerScriptService et `ReplicatedStorage.Modules` ; StarterGui, StarterPlayerScripts et StarterCharacterScripts ont aussi un `$path` : ajoutés |
| 03/01 | Exercice « Nuage » : Output `Début`, `Je suis : Nuage`, avertissement ; lignes 5 et 8-10 commentées ; erreur ligne 7 si déplacé | OK | `luau.exe` (sorties identiques) | |
| 03/01 | Encadré « Script de bienvenue » (gabarit, nom, emplacement, puces) | OK | leçon | |
| 03/01 | Quiz `.client.luau` dans ServerScriptService ; `ameliore-le-prompt` bienvenue | OK | leçon, Rojo | une seule bonne réponse |
| 03/02 | Exercice 1 (`0` vrai, `or "Invité"`) → `Invité a des pièces` / `Invité : 5 pièces` | OK | `luau.exe` | |
| 03/02 | Exercice 2 : ligne 6 dangereuse, ligne 3 inutile | OK | recomptage | |
| 03/02 | Quiz `"Étape " .. 3 + 1` → `Étape 4` | OK | `luau.exe` | |
| 03/02 | Encadré « Kill brick » (code dans la réponse, Workspace non synchronisé, `FindFirstChildOfClass`, `Health > 0`) | OK | leçon, `default.project.json` | conforme au code de la leçon |
| 03/02 | `ameliore-le-prompt` kill brick (TakeDamage sans effet sous ForceField) | OK | Info de la leçon (phase 1) | |
| 03/03 | Exercice 1 (`continue`/`break`) → `4` | OK | `luau.exe` | |
| 03/03 | Exercice 2 clignotement (lignes 7, 8, 13) | OK | recomptage, raisonnement moteur | non testé en jeu |
| 03/03 | Quiz shadowing → `1` ; `trouve-le-bug` `wait(1)` ligne 5 | OK | `luau.exe` ; RobloxGlobals (`wait` dépréciée) | un seul défaut |
| 03/03 | Encadré « Pièce qui tourne » (VITESSE_ROTATION 90, `tourner`, `task.wait()` renvoyé) | OK | code de la leçon | |
| 03/04 | Exercice 1 → `2 2 3`, `2`, `nil` ; exercice 2 → `2 TraineeRouge` | OK | `luau.exe` | renvoi à l'encadré « Retirer des éléments… vers l'avant » vérifié (ligne 209) |
| 03/04 | Quiz clé absente → `nil` ; `trouve-le-bug` sans `IsA` ligne 14 | OK | `luau.exe` ; recomptage | |
| 03/04 | Encadré « KillBricks et PiecesTournantes » | OK | `projet-reference/src/ServerScriptService/KillBricks.server.luau` (identique au bloc de la leçon) | |
| 03/05 | Exercice 1 ordre `A C E B D` ; exercice 2 (`WaitForChild` faux nom, joueur déjà présent, ligne 9) | OK | référence `task` ; leçon | |
| 03/05 | `trouve-le-bug` connexion créée dans `Touched` (ligne 8) ; `ameliore-le-prompt` checkpoints | OK | recomptage | `GetAttributeChangedSignal` ne passe aucun argument : exact |
| 03/05 | Encadré « Checkpoints basiques » | OK | code de la leçon | toutes les règles reprises (Etape + 1, AncestryChanged, IsDescendantOf, HAUTEUR_REAPPARITION) |
| 03/06 | Exercice 1 `Compteur` → `15 0`, `2` ; `a.ajouter(5)` → « attempt to index number with 'valeur' » ligne 11 | OK | `luau.exe` (message identique) | |
| 03/06 | Exercice 2 (constante en double ligne 8, `Players` ligne 4, LocalUnused/ImportUnused) | OK | `verifier-luau` (diagnostics réels) | |
| 03/06 | `trouve-le-bug` secret dans ReplicatedStorage ligne 7 ; `ameliore-le-prompt` Config | OK | recomptage | |
| 03/06 | Encadré « Module Config » (mode plan, champs, Niveaux, `obtenirNiveau`) | OK | code de la leçon | |
| 03 (toutes) | Objectifs, descriptions, intros réorientés lecture ; code du fil rouge | OK | `git diff 1ffeb8a` | aucune ligne de code de la leçon modifiée |
| Examen 03 | `obtenirNiveau(15)` → erreur « attempt to index nil with 'nom' » | OK | `luau.exe` | |
| Examen 03 | `trouve-le-bug` pièce ramassable plusieurs fois (lignes 9-11) ; `ameliore-le-prompt` KillBricks | OK | recomptage | un seul défaut |
| 04/01 | Encadré « Audit client/serveur » (lecture seule, grille de la leçon) | OK | tableau « Qui exécute quel script ? » et section « Ce qui part du client » | |
| 04/01 | `ameliore-le-prompt` audit | OK | | |
| 04/02 | Encadré « Retour au checkpoint » (DemanderReapparition, `gameProcessedEvent`, `LoadCharacterAsync`, cooldown 5 s serveur) | OK | code de la leçon ; référence Player | noms de scripts choisis par l'adaptateur, signalés dans l'encadré |
| 04/02 | `trouve-le-bug` `cible` envoyé par le client (ligne 11) | CORRIGÉ | recomptage | L'explication disait « un par seconde suffit » alors que le cooldown du code est de 5 s : reformulée (« même une fois toutes les 5 secondes ») |
| 04/03 | Encadré « RemoteFunction ObtenirInventaire » ; `ameliore-le-prompt` | OK | code et trois règles de la leçon | |
| 04/04 | Encadré « Module Validation » : API du module | OK | `projet-reference/src/ServerScriptService/Validation.luau` (identique) | |
| 04/04 | Encadré : « l'étape atteinte est dans leaderstats.Etape » | CORRIGÉ | leçon (« tu la créeras dans la leçon 5 ») | Les leaderstats n'existent qu'à la leçon 4.5 : le prompt disait qu'elles existaient (Claude Code aurait pu les créer de lui-même). Remplacé par « sera rangée… créée à la leçon suivante : ne la crée pas ici ; tant qu'elle n'existe pas, toute demande est refusée » |
| 04/04 | `trouve-le-bug` NaN (ligne 9) | OK | raisonnement IEEE : `math.huge` est bien rejeté par `> max` | un seul défaut |
| 04/05 | Encadré « Sécuriser checkpoints, pièces et boutique » (valeurs 15 / 12 studs, 2 s, 0,2 s / 1 s, 10 s, estTexte 50, ordre des vérifications, TestTriche) | OK | code de la leçon | |
| 04/05 | Encadré : envoi de `Notification` par Progression | CORRIGÉ | code de Progression (`notification:FireClient(player, "Étape " .. numero .. " atteinte !")`) | Le prompt citait le remote sans dire de l'utiliser : ajouté |
| 04/05 | `ameliore-le-prompt` boutique | OK | | |
| Examen 04 | `ameliore-le-prompt` AllerAuCheckpoint ; `trouve-le-bug` sans `estAPortee` (ligne 11) | OK | recomptage | |
| 05/01 | Encadré « Script Leaderstats » (placerAuCheckpoint, WaitForChild 60, IsPrimary) ; `ameliore-le-prompt` | OK | code de la leçon | |
| 05/02 | Encadré « Sauvegarde fiable » (UpdateAsync, avecTentatives 3 × `2 ^ t + random`, Charger sans session en cas d'échec, version/completer, `{ player.UserId }`, sauvegardesEnCours, 25 s, IsStudio + SAUVEGARDER_EN_STUDIO, 180 + random(0, 30)) | OK | code de la leçon | |
| 05/02 | `trouve-le-bug` `return true` ligne 14 | OK | recomptage | question bornée à la promesse du `return` : un seul défaut |
| 05/03 | Encadré « Inventaire de traînées » (attributs, Attachments, Trail, Lifetime 0.6, vérifications) ; `trouve-le-bug` possession (ligne 9) | OK | code de la leçon | |
| 05/04 | `<Attention>` Rojo : `$path` → `$ignoreUnknownInstances = false` → suppression | OK | rojo.space/docs/v7/project-format | |
| 05/04 | `<Attention>` : « disparaît dès que tu connectes Rojo » | REFORMULÉ | code du plugin Rojo (`Confirming.lua` : Abort / Reject / Accept ; `Settings.lua` : `confirmationBehavior = "Initial"`) ; leçon 02/02 (fenêtre « Sync changes ») | Précisé : la suppression a lieu quand on accepte la fenêtre « Sync changes » ; à l'étape 3, consigne ajoutée : Abort si la fenêtre annonce des suppressions dans l'interface, sinon Accept |
| 05/04 | Bouton **Disconnect** du plugin | OK | `plugin/src/App/StatusPages/Connected.lua` (`text = "Disconnect"`) | non confirmé par A2, confirmé ici |
| 05/04 | Prompt MCP : outils `list_roblox_studios`, `search_game_tree`, `inspect_instance`, `script_read` (lecture), `execute_luau`, `multi_edit` (modification), `studio_id` | OK | create.roblox.com/docs/studio/mcp ; schémas des outils exposés sur cette machine | `search_game_tree` exige aussi `datamodel_type` : l'IA le gère seule, inutile dans le prompt |
| 05/04 | `rojo build default.project.json -o test-interface.rbxlx` | OK | test réel, Rojo 7.7.1 | ScreenGui `ResetOnSpawn=false`, Frames, UIGridLayout, LocalScript présents |
| 05/04 | Encadré « Interface de l'Obby » : arborescence des fichiers | REFORMULÉ | `projet-reference/src/StarterGui/InterfaceObby/` | Le prompt demandait un `Boutique.model.json` ; le corrigé utilise un sous-dossier `Boutique/` (init.meta.json, UICorner, UIPadding) avec `Liste/` (init.meta.json, UIGridLayout), indispensable au module 7 (boutons avec scripts dans `Liste`). Les deux se construisent (testé), prompt aligné sur le corrigé ; phrase d'introduction et puce « À vérifier » ajustées |
| 05/04 | `<Sources>` | CORRIGÉ | | Ajout des pages Rojo Project Format, Sync Details et Studio MCP, citées par les ajouts mais absentes |
| 05/04 | Réglages du prompt (AnchorPoint, Position, Size, contraintes, UIGridLayout, Activated) ; `ameliore-le-prompt` | OK | réglages de la leçon et corrigé | |
| 05/05 | Encadré « Animation de victoire » (Animator:LoadAnimation une fois, Action, Looped false, victoire décidée par le serveur) ; `ameliore-le-prompt` | OK | code de la leçon ; `Humanoid:LoadAnimation` déprécié (référence API) | |
| 05/06 | `<Attention>` Rojo (créer `AnimationsInterface.client.luau` en fichier) | OK | `projet-reference/src/StarterGui/InterfaceObby/AnimationsInterface.client.luau` | |
| 05/06 | Encadré « Plateformes mobiles et interface animée » (ordre de `TweenInfo.new`, CFrame, défauts 8 studs / 3 s, 0,35 s Back Out / 0,25 s Quad In, `Completed` + état + `not ouverte`) ; `trouve-le-bug` ligne 9 | OK | code de la leçon ; référence TweenService (phase 1) | |
| Examen 05 | `ameliore-le-prompt` BindToClose ; `trouve-le-bug` bonus de victoire (ligne 6) | OK | code de la leçon | |
| 03-05 | Gabarit en 8 rubriques (Objectif et Vérification toujours présents, ordre respecté), aucun `wait`/`spawn`/`delay`, prix client, `SetAsync`, absence de `pcall` demandés | OK | brief | aucune case `- [ ]` dans les encadrés |

### verifier-luau
- `node scripts/verifier-luau.mjs 03` : 78 extraits, 8 avec diagnostics, tous attendus (bugs volontaires des `trouve-le-bug`, `require` non résolus hors sourcemap, exercice 2 de 3.6 dont les `LocalUnused`/`ImportUnused` sont justement l'objet de l'exercice).
- `04` : 37 extraits, 7 avec diagnostics ; `05` : 30 extraits, 13 avec diagnostics. Tous attendus : `require` non résolus hors sourcemap, `Unknown global` sur des extraits partiels de `trouve-le-bug` (variables définies ailleurs dans le script de la leçon : quiz 5.2 n°7, 5.3 n°6, 5.6 n°6, examens 04 n°17), bugs volontaires de questions de phase 1 (ordre des paramètres de `TweenInfo.new` en 5.6 n°2, `Instance?` en 5.4 n°4). Aucun diagnostic dans un extrait complet ajouté par la phase IA. Les prompts sont en blocs `text`, non analysés.
- `bash scripts/build-verrou.sh` (après corrections) : code de sortie 0, 80 pages indexées.

## Désaccords avec la passe précédente
(passe 1 : sans objet)

## Erreurs restantes non corrigées
- Non testable ici : exécution des scripts dans Studio, exécution réelle des prompts dans Claude Code, suppression effective des objets par Rojo à la connexion (le comportement est confirmé par la documentation et par le code du plugin, pas observé).
- Mac : aucune différence de commande dans ces ajouts, à part les raccourcis copier/coller déjà donnés pour Windows et Mac en 5.4 (non testables ici).
- Le prompt MCP de 5.4 laisse Claude Code choisir `init.meta.json` (dossier) pour toute Frame avec enfants, alors que le corrigé décrit `CompteurPieces` par un `.model.json` imbriqué : les deux formes sont valides avec Rojo 7.7.1 (testé), ce n'est pas une erreur.
