# Module 09 — Notes du rédacteur pour les vérificateurs

Rédigé le 2026-10-24. Sources principales : la documentation officielle (create.roblox.com/docs), consultée en ligne et via le dépôt officiel `github.com/Roblox/creator-docs` (branche `main`, dernier commit le 2026-10-24, donc à jour), ainsi que le DevForum (annonce officielle de l'équipe Studio).

## Leçon 01 — Penser mobile d'abord

| Affirmation | Source |
|---|---|
| « La majorité des sessions Roblox se jouent sur des appareils mobiles » (sans chiffre) | input/mobile : "The majority of Roblox sessions are played on mobile devices" |
| « La majorité des joueurs sont sur des appareils mobiles d'entrée de gamme » / tester seulement sur son PC = tester pour la minorité | performance-optimization/test-on-hardware |
| Roblox n'a pas accès à toute la mémoire de l'appareil | performance-optimization/design (encadré info) |
| Les jeux visent 60 FPS par défaut | performance-optimization (index) : "By default, Roblox games target 60 FPS" |
| Thermal throttling, test de 10 à 15 minutes | test-on-hardware |
| Coins inférieurs réservés aux contrôles par défaut ; zones du pouce ; exemple « 40 % du haut : OK sur téléphone, quasi inaccessible sur tablette » | ui/position-and-size, section Cross-platform factors |
| `ScreenInsets` : `CoreUISafeInsets` (défaut), `DeviceSafeInsets`, `TopbarSafeInsets`, `None` | include ui/screen-insets (affiché sur la page ScreenGui / position-and-size) |
| `GuiService.ViewportDisplaySize` : Small / Medium / Large | projects/cross-platform |
| `UserInputService.PreferredInput` et `Enum.PreferredInput` (Touch, KeyboardAndMouse, Gamepad…) | input (index), enum PreferredInput |
| Orientation par défaut `LandscapeSensor` | input/mobile |
| Device Simulator : barre d'outils au-dessus de la vue 3D, catégories Phone/Desktop/Console/Headset, téléphones Flagship/Mid-range/Entry level, Rotate, Display scaling (Physical size, Actual resolution, Fit to window), Calibrate physical scaling, raccourcis tactiles Alt+glisser / Alt+Shift+glisser | studio/device-simulator |
| Device Simulator « disponible pour tout le monde » (fin de bêta), ouverture via menu Test → Device Simulator, Network Simulator avec profils 3G/4G/Wi-Fi | DevForum https://devforum.roblox.com/t/studio-beta-new-device-simulator-toolbar-and-network-simulator/4861695 (post du 9 sept. 2026, mise à jour du 16 oct. 2026 signée The Roblox Studio Team) |
| Émulation pas fiable pour la mémoire (Studio = serveur + client) | performance-optimization/design et test-on-hardware |
| Performance Stats activable dans le menu Settings | test-on-hardware / identify |

Points d'incertitude :
- La page doc studio/device-simulator affiche encore un avertissement « beta » alors que l'annonce DevForum (16 oct. 2026) dit « now out of beta ». J'ai suivi l'annonce et ajouté une phrase de prudence (« l'interface évolue vite »).
- **Part du mobile : volontairement NON chiffrée.** La page test-on-hardware donne « Android ≈ 65 % du public d'un jeu typique » et des répartitions de RAM, mais la page n'est pas datée ; je n'ai trouvé aucun chiffre officiel daté (rapports investisseurs 2026 consultés via recherche : pas de répartition par appareil). Conformément au brief, aucun pourcentage n'est cité.
- Conseil « contraste en plein soleil / fond semi-opaque » : bon sens, la doc parle seulement de « sufficient contrast » (cross-platform, accessibility).

## Leçon 02 — Mesurer les performances

| Affirmation | Source |
|---|---|
| Tableau temps d'image ↔ FPS (33,33 / 16,67 / 8,33 ms) ; exemple 59 images rapides + une à 410 ms | performance-optimization/microprofiler (index) |
| Heartbeat serveur plafonné à 60 ; Server Jobs → Heartbeat → Steps Per Sec ; Server Stats (ping moyen) | performance-optimization/identify |
| Ouvrir la Developer Console : F9, `/console`, menu Settings → Developer Console → Open | include developer-console/opening-developer-console |
| Outils de la console : Log (client/serveur, serveur visible seulement par propriétaire/éditeurs), Memory, Luau heap, Network (appels web HttpService/DataStore), Script Profiler | studio/developer-console |
| Catégories mémoire CoreMemory/PlaceMemory, LuaHeap, InstanceCount, PlaceScriptMemory, GraphicsTexture, GraphicsMeshParts, Sounds | studio/optimization/memory-usage ; performance-optimization/improve ; identify |
| Mesurer la mémoire dans le client plutôt que Studio | identify (« Use the client rather than Studio ») |
| Raccourcis : Performance Stats Ctrl+Alt+F7 ; debug stats Shift+Ctrl+F1…F5 dans Studio ; Shift+F5 résumé, Shift+F2 rendu, Shift+F3 réseau dans le client | identify ; improve (Render Stats Shift+F2) ; workspace/streaming (Shift+F3 / Shift+Ctrl+F3) |
| MicroProfiler : couleurs orange/bleu/rouge (rouge = render > jobs ET GPU wait > 2,5 ms), timeline, Ctrl+P pause → mode détaillé, Dump → `%LOCALAPPDATA%\Roblox\logs`, mobile via Settings + IP:port (ex. 172.18.56.105:1338), profilage serveur depuis la console (max 60 images), `debug.profilebegin/profileend` | performance-optimization/microprofiler, use-microprofiler |
| Script Profiler : Client (défaut)/Server, Freq 1 kHz (défaut)/10 kHz, Time 1/5/10 min/Manual (défaut), Callgraph/Functions, n'enregistre pas les fils qui attendent | studio/optimization/scriptprofiler |
| Scene Analysis : Window › Performance Summary › Scene Analysis ; modes script memory, instance composition, triangle composition… ; exemple « 25 000 particle emitters » | performance-optimization/scene-analysis |
| Script de mesure du temps de chargement dans ReplicatedFirst (os.clock + game.Loaded), limites (n'inclut ni connexion ni avatar) | identify, section Load times (adapté en français, avec garde `game:IsLoaded()`) |
| Cycle identifier → améliorer → surveiller | performance-optimization (index) |

Points d'incertitude :
- **Raccourci du MicroProfiler incohérent dans la doc** : identify.md, test-on-hardware.md et le walkthrough donnent Ctrl+Alt+F6 (⌘⌥F6) ; la page MicroProfiler (index) donne Ctrl+F6 (⌘F6) pour le client et Studio. La leçon cite Ctrl+Alt+F6 et mentionne l'alternative Ctrl+F6.
- Raccourci Performance Stats dans Studio : identify.md le classe « In-Game » mais avec environnement « Studio Testing » ; j'ai indiqué le même raccourci dans les deux colonnes.
- Le profilage serveur via la console : la doc dit d'ouvrir la console avec Ctrl+F9 à cet endroit (F9 ailleurs) ; la leçon dit simplement « ouvre la Developer Console ».

## Leçon 03 — Le streaming d'instances

| Affirmation | Source |
|---|---|
| Avantages (arrivée plus rapide, mémoire, performances) ; `StreamingEnabled` activé par défaut pour les nouveaux places, non modifiable par script | workspace/streaming ; référence Workspace.StreamingEnabled |
| Scope : uniquement les descendants de Workspace (pas ReplicatedStorage/ReplicatedFirst) | workspace/streaming, section Scope |
| À l'arrivée, tout le Workspace est envoyé sauf BaseParts, modèles Atomic/Persistent/PersistentPerPlayer (et Nonatomic en mode Improved), et leurs descendants | workspace/streaming, Stream in |
| Stream out : parent = nil, changements locaux perdus possibles ; zone < StreamingMinRadius jamais déchargée | workspace/streaming, Stream out |
| Valeurs : MinRadius 64, TargetRadius 1024 (défauts et recommandés), Target > Min (tampon) ; StreamOutBehavior LowMemory (défaut) / Opportunistic (recommandé) ; ModelStreamingBehavior Legacy (défaut) / Improved (recommandé) ; StreamingIntegrityMode recommandé PauseOutsideLoadedArea | workspace/streaming, tableau Streaming properties ; techniques |
| Valeurs de `Enum.StreamingIntegrityMode` : Default, Disabled, MinimumRadiusPause, PauseOutsideLoadedArea ; message par défaut affiché, `Player.GameplayPaused` | enum StreamingIntegrityMode (YAML du dépôt creator-docs) |
| `PredictiveStreamingMode` : Default se comporte comme Disabled ; Enabled = opt-in (préchargement des lieux de réapparition, etc.) | référence Workspace.PredictiveStreamingMode ; workspace/streaming |
| `ModelStreamingMode` : Default, Atomic, Persistent, PersistentPerPlayer, Nonatomic ; ne jamais le modifier dans un LocalScript ; PersistentLoaded à attendre côté client ; Persistent pour de « très rares cas » | enum ModelStreamingMode ; référence Model.ModelStreamingMode ; workspace/streaming |
| Débogage : Shift+F3 (Studio : Shift+Ctrl+F3), puis Shift+1, 4e panneau = Streaming ; astuce CameraMaxZoomDistance 1000 | workspace/streaming, Runtime debugging |
| Pièges : accès direct, FindFirstChild nil, GetChildren partiel, ChildAdded/Removed au streaming, Touched/ProximityPrompt/ClickDetector inactifs, instances envoyées par RemoteEvent, descendants du personnage dans CharacterAdded | workspace/streaming/techniques, Script patterns |
| `WaitForChild` avec délai (timeOut) renvoie nil ; avertissement après 5 s sans timeout | référence Instance:WaitForChild |
| `Player:RequestStreamAroundAsync(position, timeOut)` : yield, timeOut défaut 0 = « effectivement infini », abandon si mémoire basse, effet temporaire sans garantie ; appel côté serveur conseillé | référence Player (YAML) ; techniques, Proactive streaming |
| Tester avec StreamingTargetRadius = 64 (valeur minimale), surveiller « attempt to index nil with » | techniques, Realistic test conditions |

Points d'incertitude :
- **Valeur par défaut affichée de `StreamingIntegrityMode`** : la doc ne l'indique pas explicitement ; j'ai écrit `Default` (premier item de l'enum, « subject to change »). À confirmer dans Studio.
- Unité du paramètre `timeOut` de RequestStreamAroundAsync : la doc dit « maximum duration » sans unité ; j'ai évité de l'écrire dans le texte (commentaire « durée maximale du préchargement », valeur 5).
- `ModelStreamingMode` : la page guide dit « by default, models are Nonatomic » alors que l'enum a un item `Default` ; j'ai présenté `Default` et `Nonatomic` ensemble comme « comportement normal ».
- L'exemple « AVANT » utilise `etape.Changed` sur un IntValue : la convention leaderstats `Etape` vient du module 4.

## Leçon 04 — Réduire le lag

| Affirmation | Source |
|---|---|
| Événements RunService à chaque image (PreAnimation, PreRender, PreSimulation, PostSimulation, Heartbeat), à utiliser avec parcimonie ; task.wait pour étaler ; code piloté par événements ; mettre en cache les valeurs | improve (Script computation) ; design (Scripting) |
| PreRender remplace RenderStepped | référence RunService.PreRender |
| Fuites : connexions non déconnectées ; Player et personnage non détruits automatiquement au départ ; tables par joueur ; `Disconnect`, `Destroy` | improve (Script memory usage) |
| `Workspace.PlayerCharacterDestroyBehavior` (Default/Disabled/Enabled), non scriptable | référence Workspace + enum PlayerCharacterDestroyBehavior |
| Anchor des parts non simulées ; adaptive timestepping par défaut | improve (Physics computation) |
| CanCollide / CanTouch (false → Touched ne peut pas être mis en place, erreur à la connexion) / CanQuery (n'a d'effet que si CanCollide = false) ; petit gain si CanTouch et CanCollide à false | référence BasePart ; workspace/collisions (« set CanTouch to false for objects that don't require collisions ») |
| CollisionFidelity : Default, Hull, Box, PreciseConvexDecomposition (+ Tunable, non cité) ; Box = moins de mémoire ; conseils Box/Hull ; géométrie stockée même sans collision ; filtre Explorer `CollisionFidelity=PreciseConvexDecomposition` ; Visualization Options → Collision fidelity ; propriété non lisible/modifiable par script à l'exécution | improve (Physics computation + Physics memory usage) ; enum CollisionFidelity ; référence TriangleMeshPart.CollisionFidelity |
| RenderFidelity : Automatic (défaut ; < 250 studs max, 250–500 moyen, ≥ 500 min), Precise, Performance | enum RenderFidelity ; référence MeshPart.RenderFidelity |
| Draw calls, instancing (même MeshContent + même apparence), densité, transparence partielle (éviter autres que 0 et 1), ombres (Light.Shadows, CastShadow avec artefacts possibles, ombres désactivées sous qualité 4), particules, décalques | improve (Rendering) ; design (Transparency) ; référence BasePart.CastShadow |
| Textures : 1024² = 4 × 512² en mémoire ; ≤ 512 en général, ≤ 256 pour les petites ; matériaux intégrés moins gourmands | improve (Asset memory usage) ; design (Materials) |
| Réseau : remotes trop fréquents/trop gros, TweenService côté serveur répliqué à chaque image, effets côté client, ReplicatedStorage chargé par tous → ServerStorage | improve (Networking) ; design (Scripting) ; improve (Load times) |
| Crash rate > 2–3 % à investiguer (cité en leçon 5) | identify (Client memory) |

Points d'incertitude :
- Phrase « une propriété animée côté serveur, avec TweenService **ou une boucle**, est répliquée à chaque image » : la doc parle de TweenService ; l'extension aux boucles qui modifient `CFrame` à chaque Heartbeat découle de la réplication normale des propriétés (non citée mot pour mot).
- La doc improve.md mentionne `Enum.CollisionFidelity.Precise`, qui n'existe pas dans l'enum : j'ai utilisé le vrai nom `PreciseConvexDecomposition`.
- Les codes « AVANT » sont des versions typiques ; je ne connais pas le code exact écrit par les rédacteurs des modules 2 et 4 (rotation des pièces, compteur). Le texte évite d’affirmer que ce code est exactement celui des modules précédents (la rotation « avant » est celle étiquetée en leçon 2). À harmoniser éventuellement avec les noms réels (`InterfaceObby`, `CompteurPieces`, `BoutonBoutique` sont des noms choisis ici).

## Leçon 05 — Audit

| Affirmation | Source |
|---|---|
| Cycle identifier/améliorer/surveiller | performance-optimization (index) |
| Choisir un appareil de référence et en déduire ses limites (draw calls, triangles) | design (Low-end devices) |
| Page Performance : Creator Hub → Creations → expérience → Monitoring → Performance ; propriétaire ou permissions analytics ; graphiques si ≥ 100 DAU ; onglets Client/Server ; ventilation par plateforme et par Place Version ; FPS client, crash rate, unexpected out-of-memory exits, mémoire client | production/analytics/performance |
| Taux de plantage > 2–3 % ou hausse soudaine après une mise à jour = à investiguer | identify (Client memory) |
| Tester avec petit rayon de streaming, parcourir, surveiller les erreurs | workspace/streaming/techniques |
| Sauvegarder avant une conversion (Publish to Roblox As) | techniques (AI streaming conversion skill) — la leçon propose « File › Save to File As » ou l'historique des versions |

Points d'incertitude :
- Le seuil de 100 DAU pour les graphiques peut évoluer (formulé « au moment de la rédaction »).
- Le script d'audit lit `RenderFidelity` dans la Command Bar en mode édition : propriété NotReplicated mais de sécurité None, lecture normalement possible. `CollisionFidelity` n'est volontairement pas lue (non accessible par script à l'exécution selon la référence ; on passe par le filtre Explorer).
- Le tableau du journal de performance utilise des « … » à la place de chiffres pour ne pas inventer de résultats.

## Code

- `node scripts/verifier-luau.mjs 09` : 20 extraits analysés, 0 diagnostic.
- Les `trouve-le-bug` contiennent volontairement un seul bug chacun (comparaison Enum/texte ; `return` avant `profileend` ; accès direct sous streaming ; `CanTouch = false` sur kill brick ; `GetChildren` au lieu de `GetDescendants` ; examen : `personnage.Humanoid` sous streaming, clé de table `joueur.Name` vs `joueur`).
