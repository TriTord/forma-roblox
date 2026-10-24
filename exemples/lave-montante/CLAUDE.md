# Lave Montante — consignes pour Claude Code

Mini-jeu Roblox en rounds (voir @GDD.md). Projet Rojo : le code vit dans `src/`, Studio se synchronise avec `rojo serve`.

## Architecture
- `src/ReplicatedStorage/Modules/` : ModuleScripts partagés (`Config`, `ReglesRound`).
- `src/ServerScriptService/` : Scripts serveur `Nom.server.luau`, ModuleScripts serveur `Nom.luau`.
- `src/StarterPlayer/StarterPlayerScripts/` : LocalScripts `Nom.client.luau`.
- `src/StarterGui/InterfaceLave/` : ScreenGui (fichiers `.model.json`).
- `ReplicatedStorage.Remotes` (RemoteEvents) et `ReplicatedStorage.EtatRound` (Folder à attributs) sont déclarés dans `default.project.json`.
- Construits à la main dans Studio, ne jamais les créer par script : `Workspace.Lobby` (avec la SpawnLocation `ApparitionLobby`), `Workspace.Arene` (avec le Folder `PointsApparition` et la Part `DepartLave`).

## Conventions
- Identifiants en français sans accents ; PascalCase pour scripts et instances, camelCase pour les variables, MAJUSCULES pour les constantes de `Config`.
- Commentaires en français. Tabulations. Services via `game:GetService`.
- Tous les réglages chiffrés vont dans `Config`, jamais en dur dans les scripts.
- `ReglesRound` reste PUR : aucun service Roblox, aucune instance (il est testé avec Lune).

## Sécurité et fiabilité
- Le serveur décide de tout (phases, élimination, récompenses). Le client affiche, il ne décide rien.
- Tout RemoteEvent client → serveur doit être validé côté serveur (type, valeur, fréquence).
- Toujours `task.wait`, `task.spawn`, `task.delay` ; jamais `wait`, `spawn`, `delay`.
- Chaque connexion créée pour un round est coupée à la fin du round ; chaque instance créée est détruite avec `Destroy`.
- Pas de `while true` sans `task.wait` dans la boucle.

## Méthode de travail
- Une tâche à la fois. Ne modifie que les fichiers cités dans ma demande.
- Après chaque modification : `stylua src tests`, puis `selene src`, puis `lune run tests/ReglesRound.spec.luau`. Corrige tout avertissement.
- Termine chaque tâche par la liste de ce que je dois tester dans Studio.
