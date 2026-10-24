# Notes de l'adaptateur A2 (phase IA) — modules 04 et 05

Périmètre : `src/content/lecons/module-04/*.mdx` (5 leçons), `src/content/lecons/module-05/*.mdx` (6 leçons), `src/content/examens/module-04.yaml`, `src/content/examens/module-05.yaml`. Aucun autre fichier touché. Pas de commit.

## Principes suivis

- Le contenu vérifié en phase 1 n'a pas été modifié. Seuls ajouts : un encadré `<AvecClaudeCode>` par leçon, une phrase de méthode dans le `<Defi>` (ou dans la liste d'étapes pour 5.2), une question de quiz par leçon, deux questions par examen.
- Chaque prompt suit le gabarit en 8 rubriques du brief et reprend **exactement** les noms, emplacements, chiffres et règles de la leçon (aucune variante). Les prompts multi-fichiers commencent par « Commence par me proposer un plan (mode plan), sans modifier de fichier. »
- Les prompts renvoient à `CLAUDE.md` pour les conventions et à « selene et StyLua » sans citer leur syntaxe CLI exacte (la fiche de veille la marque « non vérifiée »).
- Remotes : dans le projet Rojo, `ReplicatedStorage.Remotes` est déclaré dans `default.project.json` ; chaque prompt qui crée un remote demande donc de l'y ajouter (cohérent avec `projet-reference/default.project.json`).
- Aucune nouvelle affirmation factuelle sur Roblox ou Claude Code hors celles déjà sourcées dans les leçons, sauf les deux points Rojo ci-dessous.

## Ce qui a été testé réellement

Dossier de test : `C:\tmp\phase-ia-A2\test` (copie de `projet-reference/`).

1. **Un nœud de projet Rojo peut avoir `$path` et des enfants déclarés** (utile pour un BindableEvent dans ServerScriptService ou une RemoteFunction dans Remotes) : ajout de `ServerScriptService.EtapeAtteinte` (`BindableEvent`) et `Remotes.ObtenirInventaire` (`RemoteFunction`) dans `default.project.json`, puis `~/.rokit/bin/rojo build default.project.json -o test.rbxlx` (Rojo 7.7.0-rc.1) → « Built project to test.rbxlx » ; le fichier contient bien `class="BindableEvent"` (EtapeAtteinte), `class="RemoteFunction"` (ObtenirInventaire) et le ModuleScript `Validation` venant de `$path`.
2. **Interface décrite par `init.meta.json` + `.model.json`** (encadré 5.4) : même build ; `InterfaceObby` → `class="ScreenGui"` avec `<bool name="ResetOnSpawn">false</bool>`, `CompteurPieces` → `Frame`, enfant `UIAspectRatioConstraint`. Remarque : la page https://rojo.space/docs/v7/sync-details/ (consultée le 2026-10-25) montre des clés `.model.json` en majuscules (`ClassName`, `Properties`, `Children`) alors que `projet-reference` utilise des minuscules (`className`, `properties`, `children`) et se construit sans erreur avec Rojo 7.7. L'encadré ne cite aucune clé, seulement les noms de fichiers.
3. `node scripts/verifier-luau.mjs 04` et `05` : comparaison avant/après (voir plus bas).

## Leçon par leçon

### 4.1 Le modèle client/serveur
- Encadré « Audit client/serveur », placé avant le `<Resume>`. **Décision** : la leçon est conceptuelle (pas de système du fil rouge) ; l'encadré demande un **audit en lecture seule** du projet selon les règles de la leçon (tableau type/emplacement/côté/verdict), sans modification. Vérifications : `git status` vide, `.client.luau` aux bons endroits, valeurs importantes modifiées seulement côté serveur.
- Quiz : +1 `ameliore-le-prompt` (audit). 6 questions.

### 4.2 RemoteEvents
- Encadré « Retour au checkpoint (touche R) », après la section UnreliableRemoteEvent. Système : `DemanderReapparition` (déclaré dans `default.project.json`), `InputBegan` + `gameProcessedEvent`, `FireServer()` sans argument, cooldown serveur 5 s par joueur nettoyé à `PlayerRemoving`, `LoadCharacterAsync`. **Décision** : la leçon ne nomme pas les scripts → noms choisis `DemandeReapparition.client.luau` et `Reapparition.server.luau` (dit dans l'encadré). Le nom `gameProcessedEvent` est celui du paramètre dans la référence `UserInputService.InputBegan`.
- Phrase de méthode ajoutée à la fin du `<Defi>`.
- Quiz : +1 `trouve-le-bug` (faille : `cible` envoyé par le client, ligne 11). 6 questions.

### 4.3 RemoteFunctions et Bindables
- Encadré « RemoteFunction ObtenirInventaire », avant le `<Defi>`. Trois règles de la leçon (callback affecté avec `=`, réponse immédiate, strict nécessaire + `table.clone`), `pcall` + `typeof` côté client, interdiction d'`InvokeClient`. Noms choisis : `Inventaire.server.luau`, `LireInventaire.client.luau`. Le Bindable `EtapeAtteinte` n'est pas dans le prompt (exemple secondaire, hors Défi).
- Quiz : +1 `ameliore-le-prompt`. 6 questions.

### 4.4 Ne jamais faire confiance au client
- Encadré « Module Validation et retour au checkpoint », avant le `<Defi>`. API exacte du module (`estNombre` avec `math.isfinite`, `estEntier`, `estTexte` avec `utf8.len`, `racineVivante`, `estAPortee`, `creerCooldown` nettoyé à `PlayerRemoving`), puis `AllerAuCheckpoint` avec les 4 couches dans l'ordre de la leçon (type, débit 3 s, contexte), `PivotTo` côté serveur, refus par `return`. Nom choisi : `RetourCheckpoint.server.luau`. Test de la leçon (3, 2.5, 0/0, math.huge, "3", nil) repris comme critère.
- Quiz : +1 `trouve-le-bug` (`estNombre` écrit en « test de rejet » `valeur < min or valeur > max` : NaN passe ; `math.huge` est bien rejeté par `> max`, donc un seul défaut). 6 questions.

### 4.5 Sécuriser l'Obby des Nuages
- Encadré « Sécuriser checkpoints, pièces et boutique », juste avant « Tester ses protections » (le critère de vérification reprend les tests 1 à 3). Mode plan puis un script à la fois. Toutes les valeurs de la leçon : `Etape + 1`, distance 15 / 12 studs, 2 s journalisé, cooldowns 0,2 s / 1 s, réapparition 10 s, `estTexte(id, 50)`, prix du Catalogue, débit sans pause, `FireClient(player, succes, message)`. **Décision** : le LocalScript de démonstration (sans nom dans la leçon) s'appelle `DemoAchat.client.luau` ; l'encadré 5.3 le réutilise. Suppression de `Checkpoints.server.luau` (nom utilisé par l'adaptateur du module 3, voir `module-03/05-evenements.mdx`).
- Quiz : +1 `ameliore-le-prompt` (boutique). 6 questions.

### 5.1 Leaderstats
- Encadré « Script Leaderstats », avant le `<Defi>`. Création du Script `Leaderstats` (nom exact `leaderstats`, `IsPrimary` sur Etape, boucle sur `GetPlayers`) et remplacement de **la seule** fonction `initialiserJoueur` de Progression par `placerAuCheckpoint` (attente 60 s, Etape 0, entrée dans le Workspace + une image, `player.Character` inchangé). Le prompt interdit de toucher à `surContactCheckpoint` et demande le diff.
- Phrase de méthode dans l'étape 1 du `<Defi>`.
- Quiz : +1 `ameliore-le-prompt` (le piège : « réécris Progression en plus simple »). 6 questions.

### 5.2 DataStores fiables
- Encadré « Sauvegarde fiable (DonneesJoueurs) », après l'Astuce Data Stores Manager, avant « Les limites à connaître ». Exigences demandées par la mission, toutes reprises de la leçon : `UpdateAsync` (jamais `SetAsync`), fonction de transformation sans attente, `pcall` + 3 tentatives (`2 ^ tentative + math.random()`), échec ≠ nouveau joueur (pas de session, Kick), `BindToClose` → `SauvegarderTout` en parallèle sur les **sessions**, attente de `sauvegardesEnCours` limitée à **25 s** (30 s côté Roblox), `IsStudio` + `SAUVEGARDER_EN_STUDIO`, champ `version` + `completer` + annulation si version stockée plus grande, `{ player.UserId }`, `Sauvegarder` qui ne renvoie `true` que si l'écriture a eu lieu, sauvegarde automatique 180 s + `math.random(0, 30)`, DataStore `"DonneesJoueurs_v1"`, clé `"Joueur_" .. UserId`.
- Phrase de méthode ajoutée après la liste « Dans l'ordre, dans Studio ».
- Phrase « rien n'empêche l'IA d'utiliser `SetAsync`… » : formulation volontairement prudente (pas de statistique sur le comportement des IA).
- Quiz : +1 `trouve-le-bug` (`Sauvegarder` simplifiée qui renvoie `true` après un échec, ligne 14 ; la question précise « version simplifiée, sans le test de version » pour qu'il n'y ait qu'un défaut). 7 questions.

### 5.3 Inventaire
- Encadré « Inventaire de traînées », après le test en Command Bar, avant le `<Defi>`. Catalogue avec couleurs, `EquiperObjet` dans `default.project.json`, Boutique remplacée (données dans la session de `DonneesJoueurs`, attributs `Possede_<id>` / `TrailEquipe`, Attachments `TraineeHaut`/`TraineeBas`, Trail `TraineeObby`, Lifetime 0.6), `TestInventaire`, suppression de `DemoAchat`. Vérifications d'achat et d'équipement exactement comme la leçon (estTexte 50, cooldowns 1 s / 0,5 s, possession vérifiée dans `donnees.inventaire`). Point ajouté dans « Sécurité » : le serveur décide d'après la session, jamais d'après les attributs (cohérent avec le code de la leçon, qui ne fait que `SetAttribute`).
- Quiz : +1 `trouve-le-bug` (EquiperObjet qui vérifie l'existence dans le Catalogue mais pas la possession, ligne 9). 6 questions.

### 5.4 Interfaces UI
- Encadré « Interface de l'Obby (compteur et boutique) », avant le `<Defi>`. Réglages exacts de la leçon (AnchorPoint, Position, Size en Scale, contraintes, UIGridLayout), `ResetOnSpawn = false`, `ScreenInsets` par défaut, `Activated`, LocalScript qui n'envoie que des identifiants. Nouvelle affirmation : en Rojo, un `init.meta.json` donne la classe/propriétés d'un dossier et des `.model.json` décrivent des instances → testé (point 2 ci-dessus) et documenté sur https://rojo.space/docs/v7/sync-details/.
- Quiz : +1 `ameliore-le-prompt`. 6 questions.

### 5.5 Animations R6/R15
- Encadré « Animation de victoire », après l'Info sur le RemoteEvent, avant le `<Defi>`. L'encadré précise que la création/publication de l'animation reste manuelle. Prompt : RemoteEvent `Victoire`, Script `Victoire`, LocalScript `AnimationVictoire` dans StarterCharacterScripts, `Animator:LoadAnimation` une seule fois, priorité `Action`, `Looped = false`, victoire décidée par le serveur d'après `Etape`. L'ID d'animation n'est pas un secret (pas de conflit avec la règle « ne jamais coller de secret »).
- Quiz : +1 `ameliore-le-prompt`. 7 questions.

### 5.6 TweenService
- Encadré « Plateformes mobiles et interface animée », après l'Attention sur la durée des animations, avant le `<Defi>`. Ordre des paramètres de `TweenInfo.new`, ancrage, CFrame, valeurs par défaut 8 studs / 3 s, positions et durées de l'interface, `Completed` + `PlaybackState.Completed` + `not ouverte`, UIScale, suppression du bloc 2 de `ScriptInterface`.
- Quiz : +1 `trouve-le-bug` (handler `Completed` qui masque la fenêtre sans tester l'état, ligne 9). 6 questions.

## Examens
- `module-04.yaml` : 15 → 17 questions. +1 `ameliore-le-prompt` (AllerAuCheckpoint), +1 `trouve-le-bug` (Progression générée sans `Validation.estAPortee`, la faille est décrite par son symptôme pour qu'il n'y ait qu'une réponse ; l'absence de journalisation des passages rapides n'est pas une faille de sécurité).
- `module-05.yaml` : 15 → 17 questions. +1 `ameliore-le-prompt` (BindToClose / SauvegarderTout), +1 `trouve-le-bug` (bonus de victoire accordé sur `OnServerEvent` sans vérifier `Etape`).

## verifier-luau
Comparaison des sorties avant (`C:\tmp\a2-base-0X.txt`) et après (`C:\tmp\a2-new-0X.txt`) : voir la section « Résultat » ajoutée en bas de ce fichier.

## Points incertains
- Les prompts n'ont pas été exécutés dans une vraie session Claude Code (consigne : ne pas lancer de session interactive). Leur résultat n'est donc pas garanti mot pour mot ; les puces « À vérifier » servent justement à relire.
- Noms de scripts choisis là où la leçon n'en donne pas : `DemandeReapparition` / `Reapparition` (4.2), `Inventaire` / `LireInventaire` (4.3), `RetourCheckpoint` (4.4), `DemoAchat` (4.5, réutilisé en 5.3). Ces scripts pédagogiques ne figurent pas dans `projet-reference/` (sauf ceux qui y étaient déjà).
- Casse des clés `.model.json` : la doc Rojo affiche des majuscules, le corrigé des minuscules ; les deux semblent acceptées (corrigé construit avec Rojo 7.7.0-rc.1). Non affirmé dans le texte.

## Résultat de verifier-luau (2026-10-25)
- `node scripts/verifier-luau.mjs 04` : avant 34 extraits / 6 avec diagnostics ; après 37 / 7. Seul nouveau diagnostic : `examens/module-04.yaml#q17` (extrait volontairement partiel de `surContactCheckpoint` : `Unknown global` sur `Players`, `obtenirEtape`, `notification`, `FunctionUnused`). Les nouveaux quiz 4.2 et 4.4 n'ont aucun diagnostic.
- `node scripts/verifier-luau.mjs 05` : avant 26 / 10 ; après 30 / 13. Nouveaux diagnostics uniquement sur des extraits partiels de `trouve-le-bug` (`Unknown global` sur des variables définies ailleurs dans le script de la leçon, et un `GlobalUsedAsLocal` sur `ouverte` dans le quiz 5.6, même cause) : quiz 5.2 n°7, 5.3 n°6, 5.6 n°6. L'extrait de l'examen 05 n°17 (complet) n'a aucun diagnostic. Aucun diagnostic réel : les défauts sont ceux, volontaires, des questions (logiques, pas des erreurs de type).
- Les prompts sont dans des blocs ```text, non analysés par le script (c'est voulu).
- `bash scripts/build-verrou.sh` (lancé après toutes les modifications) : code de sortie 0.

## Consigne supplémentaire du chef d'orchestre : interface construite à la main et Rojo
- **5.4** : ajout d'un `<Attention titre="Si ton projet utilise Rojo (module 2)">` au début de la section « Construire l'interface de l'Obby des Nuages » : explication (StarterGui synchronisé par `$path` → objets inconnus supprimés), puis 3 étapes : (1) construire et régler dans Studio, Rojo déconnecté, avec une copie de secours d'`InterfaceObby` collée dans ServerStorage (non géré par Rojo dans `default.project.json`) ; (2) faire décrire l'interface en `init.meta.json` / `.model.json` par Claude Code via le serveur MCP de Studio, avec un `<Prompt>` précis (outils en lecture seule `list_roblox_studios`, `search_game_tree`, `inspect_instance`, `script_read` ; interdiction d'`execute_luau` / `multi_edit` ; vérification par `rojo build … -o test-interface.rbxlx`) ; (3) reconnecter, comparer à la copie, tester en Play, supprimer la copie, commit. L'autre voie (faire écrire les fichiers directement) renvoie à l'encadré « Avec Claude Code » déjà présent.
- **5.6** : court `<Attention>` du même titre : créer `AnimationsInterface.client.luau` comme fichier dans `src/StarterGui/InterfaceObby` et modifier `ScriptInterface.client.luau` dans son fichier, pas dans Studio.
- Sources consultées le 2026-10-25 :
  - https://rojo.space/docs/v7/project-format/ : `$ignoreUnknownInstances` « Whether instances that Rojo doesn't know about should be deleted » ; « Default is `false` if `$path` is specified, otherwise `true` ».
  - https://rojo.space/docs/v7/sync-details/ : `init.meta.json` (`className` « Usable only in `init.meta.json` files », `properties`, `ignoreUnknownInstances`) ; `.model.json` « can be used to describe simple models » (exemple avec clés en majuscules ; le corrigé utilise des minuscules et se construit sans erreur, voir plus haut).
  - Outils MCP (`list_roblox_studios`, `search_game_tree`, `inspect_instance`, `script_read`, lecture seule ; `studio_id` obligatoire) : fiche `verification/phase-ia/veille-roblox-ia.md` section B (https://create.roblox.com/docs/studio/mcp et README de `Roblox/roblox-studio-agent-plugin`). Non retesté ici (pas de session Studio + Claude Code lancée).
  - `rojo build <projet> -o <fichier>.rbxlx` : testé réellement (voir « Ce qui a été testé »).
- Non testé : la suppression réelle à la connexion (constat du rédacteur du module 02 + doc ci-dessus) ; le libellé exact du bouton **Disconnect** du plugin Rojo (l'alternative « arrête `rojo serve` » est donnée).
- Conséquence relevée, hors consigne : `ReplicatedStorage.Remotes` est déclaré dans `default.project.json` **sans** `$path`, donc `$ignoreUnknownInstances` vaut `true` : un RemoteEvent créé à la main dans Studio n'y est pas supprimé. Les prompts des encadrés le déclarent malgré tout dans `default.project.json` (source de vérité versionnée). En revanche, ServerScriptService, StarterPlayerScripts et StarterCharacterScripts ont un `$path` : un Script créé à la main y serait supprimé (règle déjà expliquée au module 3, leçon 1, par un autre adaptateur ; je n'ai pas ajouté d'encadré dans mes leçons pour ne pas répéter).
- Build relancé après ces ajouts (`bash scripts/build-verrou.sh`) : code de sortie 0.
