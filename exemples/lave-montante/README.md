# Lave Montante — exemple complet du module 2, leçon 5

Le mini-jeu construit prompt par prompt avec Claude Code dans la leçon « Découper un gros projet ». Format [Rojo](https://rojo.space/) : chaque fichier `.luau` devient un script dans Studio.

| Fichier | Dans Studio |
|---|---|
| `src/ReplicatedStorage/Modules/Config.luau` | ModuleScript `Config` (réglages) |
| `src/ReplicatedStorage/Modules/ReglesRound.luau` | ModuleScript `ReglesRound` (calculs purs, testés) |
| `src/ServerScriptService/Leaderstats.server.luau` | Script `Leaderstats` |
| `src/ServerScriptService/Lave.luau` | ModuleScript `Lave` |
| `src/ServerScriptService/GestionRounds.server.luau` | Script `GestionRounds` (la boucle du jeu) |
| `src/StarterPlayer/StarterPlayerScripts/AffichageRound.client.luau` | LocalScript `AffichageRound` |
| `src/StarterGui/InterfaceLave/` | ScreenGui `InterfaceLave` (TextLabels `Statut` et `Message`) |
| `default.project.json` | déclare aussi `ReplicatedStorage.Remotes.Notification` (RemoteEvent) et le Folder `ReplicatedStorage.EtatRound` |

`GDD.md` est le mini game design doc, `CLAUDE.md` les consignes données à Claude Code, `tests/` les tests automatiques.

## L'ouvrir avec Rojo

1. Dans ce dossier, installe les outils du projet : `rokit install` (Rojo, selene, StyLua et Lune, versions fixées dans `rokit.toml`). Si Rokit demande s'il doit faire confiance à un outil, réponds oui.
2. Ouvre une place **vide** dans Studio (modèle Baseplate), puis lance `rojo serve` dans ce dossier et clique sur **Connect** dans le plugin Rojo.
   Variante : `rojo build -o LaveMontante.rbxlx`, puis ouvre ce fichier dans Studio.

## À construire à la main dans Studio

Rojo ne gère que le code et l'interface. Dans `Workspace` :

- **Supprime la SpawnLocation du modèle Baseplate** (sinon les joueurs éliminés réapparaissent au mauvais endroit).
- Dans les propriétés de `Workspace`, **décoche `StreamingEnabled`** : le mini-jeu est petit, et chaque joueur a ainsi l'arène déjà chargée quand le serveur l'y téléporte (sinon, son jeu peut se mettre en pause le temps de la charger).
- Un Model ou Folder **`Lobby`** : un sol ancré et une **SpawnLocation** nommée **`ApparitionLobby`** (la seule SpawnLocation du jeu).
- Un Model ou Folder **`Arene`**, loin du lobby, contenant :
  - des plateformes ancrées à différentes hauteurs, jusqu'à au moins 45 studs au-dessus du sol de l'arène (la lave monte de 40 studs) ;
  - un Folder **`PointsApparition`** avec quelques Parts ancrées (`CanCollide` désactivé, `Transparency` 1) posées au sol de l'arène ;
  - une Part **`DepartLave`** ancrée, à plat (Orientation 0, 0, 0), `CanCollide` désactivé, `Transparency` 1, aussi large que l'arène et placée au niveau de son sol : la lave part de son centre et prend sa largeur.

Pour tester seul, mets `JOUEURS_MIN = 1` dans `Config`. Pour tester à plusieurs : dans le menu déroulant des tests, choisis **Server & Clients** avec 2 clients, puis **Play** (module 1, leçon 4).

## Vérifier le code

```bash
stylua --check src tests
selene src
lune run tests/ReglesRound.spec.luau
rojo sourcemap default.project.json -o sourcemap.json
luau-lsp analyze --definitions=@roblox=globalTypes.d.luau --sourcemap=sourcemap.json src
```

Pour l'analyse en ligne de commande, `luau-lsp` (exécutable des releases de github.com/JohnnyMorganz/luau-lsp) a besoin du fichier de types Roblox : https://raw.githubusercontent.com/JohnnyMorganz/luau-lsp/main/scripts/globalTypes.d.luau (dans VS Code, l'extension le charge toute seule). La v1 ne sauvegarde pas les pièces : c'est une tâche suivante possible (module 5, leçon 2).
