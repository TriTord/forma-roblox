# Obby des Nuages — corrigé final

Ce dossier contient **tout le code final de l’Obby des Nuages**, tel que tu l’obtiens en suivant les leçons de la formation dans l’ordre (modules 2 à 10, en appliquant chaque consigne « ajoute / remplace / modifie »). Les extraits purement pédagogiques (démonstrations, versions « avant », scripts de test temporaires, exemples « imaginons… ») n’en font pas partie.

Il est au format [Rojo](https://rojo.space/) : chaque fichier correspond à un script de Studio.

| Suffixe du fichier | Type dans Studio |
|---|---|
| `Nom.server.luau` | **Script** nommé `Nom` |
| `Nom.client.luau` | **LocalScript** nommé `Nom` |
| `Nom.luau` | **ModuleScript** nommé `Nom` |

## Ce qu’il contient

| Emplacement dans Studio | Contenu (leçon d’origine) |
|---|---|
| `ServerScriptService` | Scripts : `KillBricks` (2.4), `Progression` (3.5, modifié en 4.1 et 5.3), `Pieces` (3.5, modifié en 5.4), `GestionJoueurs` (4.2), `Boutique` (4.3, modifié en 8.5), `Victoire` (4.5), `PlateformesMobiles` (4.6), `GamePassTrail` (6.2), `DemandesAchat` et `Achats` (6.3), `Redemarrage` (7.4), `AnalytiqueObby` (8.5), `AutoVerification` (10.4). ModuleScripts : `Validation` (3.4), `DonneesJoueurs` (4.2, champs ajoutés en 6.3 et 7.4), `RecompensesEtapes` (5.3), `ObjectifsQuotidiens` (5.4), `AnalytiqueEconomie` (8.5) |
| `ReplicatedStorage › Modules` (Folder) | ModuleScripts `Config` (2.6, complété en 5.3) et `Catalogue` (3.5, complété en 4.3) |
| `ReplicatedStorage › Remotes` (Folder) | RemoteEvents `AcheterObjet`, `EquiperObjet`, `Notification`, `Victoire`, `DemanderPasserEtape`, `AnnonceRedemarrage` (déclarés dans `default.project.json`) |
| `StarterPlayer › StarterPlayerScripts` | LocalScripts `MessagesProgression` (5.1), `GuideCheckpoint` et `IndiceDepart` (5.2), `ProposerNotifications` (5.4), `AffichageRedemarrage` (7.4), `PiecesTournantesClient` (9.4, remplace le Script serveur `PiecesTournantes`) |
| `StarterPlayer › StarterCharacterScripts` | LocalScript `AnimationVictoire` (4.5) |
| `StarterGui › InterfaceObby` (ScreenGui) | L’interface du module 4 (voir plus bas) et ses LocalScripts `ScriptInterface` (4.4), `AnimationsInterface` (4.6), `AdaptationMobile` (9.1), plus les boutons `BoutonTrailDore` (6.2) et `BoutonPasserEtape` (6.5), chacun avec un LocalScript `ScriptBouton` |

## L’importer dans Studio

### Avec Rojo (recommandé)

1. Installe Rojo (outil en ligne de commande + plugin Studio, voir rojo.space).
2. **Travaille sur une copie de ton jeu** : Rojo remplace le contenu de `ServerScriptService`, `StarterGui`, `StarterPlayerScripts`, `StarterCharacterScripts` et `ReplicatedStorage.Modules` par celui de ce dossier.
3. Dans ce dossier, lance `rojo serve`, puis clique sur **Connect** dans le plugin Rojo de Studio. Tu peux aussi créer un fichier de lieu avec `rojo build -o ObbyDesNuages.rbxlx` et l’ouvrir dans Studio.

### À la main (copier-coller)

Pour chaque fichier `.luau`, crée dans Studio un objet du bon type (tableau du haut), **au même emplacement** que le dossier du fichier (`src/ServerScriptService/Pieces.server.luau` → Script `Pieces` dans ServerScriptService), donne-lui le nom du fichier sans suffixe, puis colle son contenu. Crée aussi les Folders `Modules` et `Remotes` dans ReplicatedStorage, et les six RemoteEvents listés plus haut dans `Remotes`.

## Ce que tu dois construire toi-même dans Studio

Rojo ne s’occupe que du code et de l’interface. Le niveau se construit à la main (modules 1 à 4) :

- **Workspace** : une `SpawnLocation` ; un Folder `Plateformes` (plateformes ancrées) ; un Folder `Checkpoints` avec des Parts ancrées nommées `1`, `2`, `3`… dans l’ordre du parcours, sans trou ; un Folder `KillBricks` ; un Folder `Pieces` avec des Parts ancrées nommées `Piece` ; un Folder `PlateformesMobiles` (attributs facultatifs `Deplacement` en Vector3 et `Duree` en number sur chaque plateforme).
- **Config** : garde `Config.Niveaux` cohérent avec ton nombre de checkpoints (l’exemple va jusqu’à l’étape 12) ; `Victoire` utilise le nombre de checkpoints, `ProposerNotifications` la dernière étape de `Config.Niveaux`.
- **Interface** (déjà décrite dans `src/StarterGui` si tu utilises Rojo) : `InterfaceObby` (ScreenGui, `ResetOnSpawn = false`) contient `CompteurPieces` (Frame + `UICorner` + `UIAspectRatioConstraint` 3 + TextLabel `Texte` avec `UITextSizeConstraint`), `BoutonBoutique` (TextButton au bord gauche, à mi-hauteur : `AnchorPoint = (0, 0.5)`, `Position = {0.02, 0}, {0.5, 0}`) et `Boutique` (Frame invisible au départ, avec `UICorner`, `UIPadding` et une Frame `Liste` qui contient un `UIGridLayout` et les deux boutons de la boutique en Robux). Réglages détaillés : module 4, leçon 4.
- **Valeurs à remplacer** : l’ID du Game Pass `ID_PASS_TRAIL_DORE` (`GamePassTrail` et `BoutonTrailDore`), l’ID du Developer Product `ID_PASSER_ETAPE` (`DemandesAchat`, `Achats`, `BoutonPasserEtape`), l’`AnimationId` de `AnimationVictoire`.
- **Paramètres du jeu** : pour tester la sauvegarde dans Studio, active **Enable Studio Access to API Services** sur une copie de test publiée (module 4, leçon 2).

## Vérifier le code

```bash
rojo sourcemap default.project.json -o sourcemap.json
luau-lsp analyze --definitions=@roblox=globalTypes.d.luau --sourcemap=sourcemap.json src
```

Le fichier `sourcemap.json` fourni permet à luau-lsp de résoudre les `require(ReplicatedStorage.Modules.X)` ; l’analyse ne renvoie aucun diagnostic.
