# Module 09 — passe 1 (vérificateur : faits + sources + quiz) — 2026-10-24

> **Note (phase IA, 2026-10-24)** : ce rapport a été écrit quand ce module portait le numéro 09. Un module 02 « Scripter avec l'IA » a ensuite été inséré : dans le texte ci-dessous, les numéros de modules et les chemins suivent l'**ancienne** numérotation (ancien module N ≥ 2 = nouveau module N + 1).

## Résumé
Environ 110 affirmations vérifiées. 15 modifiées (8 corrigées, 7 reformulées), 0 supprimée, 1 source ajoutée.
Quiz : 29 questions de leçon et 14 questions d’examen relues. 2 corrigées : une question ambiguë (L3, `ModelStreamingMode`) et un `trouve-le-bug` qui contenait un second bug (L2).
Code : `node scripts/verifier-luau.mjs 09` → 20 extraits, 0 diagnostic (avant et après corrections). Exécution réelle relue : emplacements, streaming, `nil`, fuites et réplication sont corrects. Les trois avant/après de la leçon 4 sont de vraies optimisations, sans micro-optimisation mythique :
- passage du `Heartbeat` à `Changed` ;
- suppression d’un `SetAttribute` répliqué à chaque image et d’une fuite de connexion ;
- rotation décorative déplacée côté client, donc sans réplication.

Build : `bash scripts/build-verrou.sh` → code de sortie 0.

Méthode : comparaison avec le dépôt officiel `github.com/Roblox/creator-docs` (commit du 2026-10-24) et l’historique de ses commits (API GitHub), puis contrôle des pages en ligne sur create.roblox.com et de l’annonce DevForum. Tous les liens `<Sources>` répondent 200. Les grandes pages de référence (BasePart, Player, Workspace…) renvoient 502 à curl mais s’ouvrent normalement avec un navigateur ou WebFetch.

## Détail

| Leçon | Affirmation / élément | Verdict | Source | Commentaire |
|---|---|---|---|---|
| 01 | « La majorité des sessions Roblox se jouent sur des appareils mobiles » | REFORMULÉ | create.roblox.com/docs/input/mobile | Citation exacte : « The majority of Roblox sessions are played on mobile devices ». Page et citation anglaise ajoutées dans le texte. |
| 01 | « Une grande partie des joueurs ont des téléphones d’entrée de gamme » | REFORMULÉ | performance-optimization/test-on-hardware | La doc dit « The majority of Roblox players are on lower-spec mobile devices ». Texte et résumé alignés. |
| 01 | Encadré Info sur les pourcentages (« Roblox ne publie pas… ») | CORRIGÉ | test-on-hardware | La page donne des chiffres non datés (Android ≈ 65 %, ~60 % de ces joueurs avec 2–4 Go). Ajoutés avec « au moment de la rédaction (octobre 2026) » et une mise en garde (variables selon pays, âge, genre). |
| 01 | Tester sur son PC, c’est tester pour la minorité | OK | test-on-hardware | |
| 01 | Roblox n’a pas accès à toute la mémoire ; OOM | OK | performance-optimization/design | |
| 01 | Jeux visant 60 FPS par défaut | OK | performance-optimization (index) | |
| 01 | Thermal throttling, session de 10–15 min | OK | test-on-hardware | |
| 01 | Coins inférieurs réservés, zones du pouce, exemple des 40 % téléphone/tablette | OK | ui/position-and-size | |
| 01 | `ScreenInsets` : `CoreUISafeInsets` par défaut et recommandé, `DeviceSafeInsets`, `None` réservé aux fonds | OK | include ui/screen-insets, ScreenGui | |
| 01 | `ViewportDisplaySize` Small/Medium/Large | OK | projects/cross-platform | |
| 01 | `PreferredInput` (Touch, KeyboardAndMouse, Gamepad), observable avec `GetPropertyChangedSignal` | OK | enum PreferredInput ; input (index) | |
| 01 | Input Action System | OK | projects/cross-platform | |
| 01 | Orientation par défaut `LandscapeSensor` | OK | input/mobile | |
| 01 | Device Simulator « sorti de bêta le 16/10/2026 » | CORRIGÉ (précisé) | DevForum 4861695 (catégorie Announcements, signé « The Roblox Studio Team ») ; studio/device-simulator | Confirmé : post du 9 sept. 2026, désormais intitulé « [Full Release] ». Mise à jour du 16 oct. 2026 : « now out of beta and available for everyone », ouverture via Test › Device Simulator. La page doc affiche encore l’avertissement beta et la procédure File › Beta Features › New Device Simulator : ajoutées comme solution de repli, datée. |
| 01 | Barre d’outils au-dessus de la vue 3D, catégories Phone/Desktop/Console/Headset, Flagship/Mid-range/Entry level, Rotate, Alt+glisser, Alt+Shift+glisser, Display scaling (Physical size…), Calibrate physical scaling (carte d’étudiant), changement d’appareil en cours de test | OK | studio/device-simulator | |
| 01 | Network Simulator : latence, jitter, pertes, profils 3G/4G/Wi-Fi | OK | studio/network-simulator ; annonce DevForum | Source network-simulator ajoutée. |
| 01 | Émulateur non fiable pour la mémoire (Studio = serveur + client) | OK | design ; test-on-hardware | Le staff le confirme aussi sur le DevForum (l’ancienne option mémoire était un « placeholder »). |
| 01 | Performance Stats depuis le menu Settings | OK | test-on-hardware | |
| 01 | Quiz (6 questions) et `trouve-le-bug` (ligne 6, Enum vs texte) | OK | | Numéros de ligne vérifiés (3, 6, 14). Un seul bug. |
| 02 | Tableau ms ↔ FPS, exemple 59 images + 410 ms | OK | microprofiler (index) | |
| 02 | Heartbeat serveur plafonné à 60, Server Jobs › Heartbeat › Steps Per Sec, Server Stats (ping) | OK | identify | |
| 02 | Ouverture de la Developer Console : F9, `/console`, Settings › Developer Console › Open | OK | include opening-developer-console | |
| 02 | Barre de raccourcis (erreurs, mémoire, ping), Client/Server, sortie serveur visible seulement par le propriétaire et les éditeurs | OK | studio/developer-console | |
| 02 | Outils Log, Memory, Luau heap, Network (appels web HttpService/DataStore, pas les remotes), Script Profiler | OK | studio/developer-console | |
| 02 | CoreMemory/PlaceMemory, LuaHeap, PlaceScriptMemory, GraphicsTexture, GraphicsMeshParts, Sounds, InstanceCount | OK | studio/optimization/memory-usage ; improve | |
| 02 | Mémoire mesurée dans le client plutôt que dans Studio | OK | identify | |
| 02 | Raccourcis Ctrl+Alt+F7, Shift+F5, Shift+F2, Shift+F3, Shift+Ctrl+F1…F5 dans Studio | OK | identify ; improve ; workspace/streaming | |
| 02 | Raccourci du MicroProfiler (Ctrl+Alt+F6 en principal, Ctrl+F6 en alternative) | CORRIGÉ | microprofiler (index) ; identify ; test-on-hardware ; use-microprofiler ; historique Git creator-docs | La page MicroProfiler est passée volontairement de Ctrl+Alt+F6 à Ctrl+F6 le 22/01/2026 (commit 5792590), puis a confirmé Ctrl+F6 dans ses mises à jour de juillet et du 22/10/2026 (page la plus à jour). identify, test-on-hardware, use-microprofiler et network gardent Ctrl+Alt+F6. La leçon donne maintenant Ctrl+F6 en principal et Ctrl+Alt+F6 comme ancien raccourci encore cité, avec ce contexte. |
| 02 | Mobile : Settings › MicroProfiler On, IP:port, même réseau, exemple 172.18.56.105:1338 ; mobile = meilleur endroit pour profiler | OK | microprofiler (index) | |
| 02 | Couleurs orange/bleu/rouge (GPU wait > 2,5 ms), pas de « bonne » couleur | OK | microprofiler (index) | |
| 02 | Ctrl+P met en pause et ouvre le mode détaillé ; navigation dans la timeline ; Dump dans `%LOCALAPPDATA%\Roblox\logs` | OK | use-microprofiler ; microprofiler (index) | |
| 02 | Profilage serveur : 60 images max, Begin server recording, chemin du fichier donné | OK | microprofiler (index) | La doc dit d’ouvrir la console avec Ctrl+F9 à cet endroit : la leçon écrit seulement « ouvre la Developer Console » (non faux). |
| 02 | Script Profiler : Client par défaut/Server, Freq 1 kHz par défaut/10 kHz, Time Manual par défaut/1/5/10 min, Callgraph/Functions, ne compte pas les fils en attente | OK | studio/optimization/scriptprofiler | |
| 02 | Scene Analysis (Window › Performance Summary › Scene Analysis), exemple des 25 000 émetteurs | OK | performance-optimization/scene-analysis | |
| 02 | Script de temps de chargement (ReplicatedFirst, os.clock, game.Loaded) et ses limites | OK | identify (Load times) | Garde `game:IsLoaded()` ajoutée par le rédacteur : correct. |
| 02 | Cycle identifier/améliorer/surveiller | OK | performance-optimization (index) | |
| 02 | Quiz `trouve-le-bug` `profilebegin`/`profileend` | CORRIGÉ | | Second bug involontaire : `calculerHauteur(Players:GetPlayers()[1])` passe `nil` quand aucun joueur n’est présent au lancement du Script, d’où une erreur ligne 5. Remplacé par un appel dans `Players.PlayerAdded`, qui passe d’ailleurs par le `return 0` fautif. La question précise maintenant « Script serveur ». Lignes 4/7/9 inchangées, explication ajustée. |
| 02 | Autres questions du quiz (5) | OK | | |
| 03 | Avantages du streaming ; `StreamingEnabled` activé par défaut pour les nouveaux places et non modifiable par script | OK | workspace/streaming ; référence Workspace | |
| 03 | Portée : uniquement Workspace (pas ReplicatedStorage/ReplicatedFirst) | OK | workspace/streaming (Scope) | |
| 03 | Exceptions à l’arrivée : BaseParts, modèles Atomic/Persistent, descendants | CORRIGÉ (complété) | workspace/streaming (Stream in) | Ajouté : les modèles Nonatomic (« normaux ») sont aussi différés quand `ModelStreamingBehavior = Improved`, le réglage que la leçon recommande. |
| 03 | Stream out : parent `nil`, changements locaux perdus possibles, zone < MinRadius jamais déchargée | OK | workspace/streaming | |
| 03 | MinRadius 64 / TargetRadius 1024 (défauts et recommandés), StreamOutBehavior LowMemory → Opportunistic, ModelStreamingBehavior Legacy → Improved, IntegrityMode recommandé PauseOutsideLoadedArea | OK | workspace/streaming (tableau Streaming properties) ; référence Workspace | |
| 03 | Valeur par défaut de `StreamingIntegrityMode` = `Default` | REFORMULÉ | enum StreamingIntegrityMode ; référence Workspace ; API dump Roblox-Client-Tracker | Ni la doc ni la référence n’affichent de valeur par défaut pour cette propriété. L’API dump ne la donne pas non plus (classe non créable). L’item d’enum `Default` (valeur 0) est décrit seulement comme « Default behavior (subject to change) ». D’anciennes versions de la référence le disaient équivalent à `Disabled`, la version actuelle ne le dit plus. Tableau : « `Default` (comportement non détaillé par la doc) ». Ajouté : ne pas compter dessus, choisir un mode explicitement. Aucun Studio n’était connecté au MCP pour vérifier l’affichage. |
| 03 | Valeurs de l’enum StreamingIntegrityMode, `GameplayPaused`, message par défaut | OK | enum StreamingIntegrityMode | |
| 03 | `PredictiveStreamingMode` : Default se comporte comme Disabled ; Enabled = opt-in ; préchargement des lieux de réapparition ; compatible avec RequestStreamAroundAsync | OK | référence Workspace ; workspace/streaming (Predictive streaming) | |
| 03 | `ModelStreamingMode` : Default/Nonatomic, Atomic, Persistent (`PersistentLoaded`), PersistentPerPlayer (`AddPersistentPlayer`) ; jamais depuis un LocalScript | OK | enum ModelStreamingMode ; référence Model ; workspace/streaming | |
| 03 | Erreur « Persistent revient à désactiver le streaming » | REFORMULÉ | workspace/streaming (Persistent) | Remplacé par la formulation officielle : pas fait pour contourner le streaming, l’abus peut nuire aux performances, réservé à de très rares cas. |
| 03 | Débogage Shift+F3 / Shift+Ctrl+F3, Shift+1, 4e panneau, CameraMaxZoomDistance 1000 | OK | workspace/streaming (Runtime debugging) | |
| 03 | Pièges : GetChildren/GetDescendants partiels, ChildAdded/Removed, Touched/ProximityPrompt/ClickDetector, objets envoyés par remote, `character.Humanoid` dans CharacterAdded | OK | workspace/streaming/techniques | |
| 03 | `RequestStreamAroundAsync` : yield, `timeOut` par défaut 0 = « effectivement infini », abandon en mémoire basse, effet temporaire sans garantie, appel côté serveur | OK | Player.yaml (référence) ; techniques (Proactive streaming) | |
| 03 | Test avec TargetRadius = 64 (minimum), erreurs `attempt to index nil with` | OK | techniques (Realistic test conditions) | |
| 03 | Code avant/après (surlignage du checkpoint) et module Teleportation | OK | | Logique vérifiée : `FindFirstChild` + `ChildAdded`, recoloration au retour, `pcall`, `PivotTo`. |
| 03 | Quiz : question `ModelStreamingMode` (Atomic) | CORRIGÉ | workspace/streaming | Ambiguë : l’explication admettait que `Persistent` « marcherait aussi ». La question exige maintenant que la porte puisse être déchargée, donc `Atomic` est la seule bonne réponse. Explication réécrite. |
| 03 | Autres questions du quiz (5), dont `trouve-le-bug` ligne 6 | OK | | Lignes vérifiées. |
| 04 | Événements RunService à chaque image (Heartbeat, PreRender, PreSimulation, PostSimulation, PreAnimation), « sparingly », `task.wait`, code piloté par événements | OK | improve ; design | |
| 04 | Fuites : connexions, Player/personnage non détruits par défaut, tables par joueur ; `Disconnect` ; `PlayerCharacterDestroyBehavior` | OK | improve (Script memory usage) ; référence Workspace | |
| 04 | LuaHeap/InstanceCount pour détecter une fuite | OK | improve | |
| 04 | Ancrer, CanCollide, CanTouch (false = pas d’événement, erreur à la connexion), CanQuery (effet seulement si CanCollide = false), petit gain CanTouch + CanCollide à false | OK | BasePart.yaml ; workspace/collisions | |
| 04 | CollisionFidelity : description de `Default` (« plus détaillée ») | CORRIGÉ | enum CollisionFidelity ; improve (Physics memory usage) | Précisé : décomposition voxel, imprécise sur les creux, nettement plus gourmande en mémoire que Box/Hull. |
| 04 | Conseils Box/Hull, géométrie stockée même sans collision, filtre Explorer, Visualization Options, non scriptable à l’exécution | OK | improve ; TriangleMeshPart.CollisionFidelity | |
| 04 | RenderFidelity : Automatic par défaut (< 250 / 250–500 / ≥ 500 studs), Precise, Performance | OK | MeshPart.RenderFidelity ; enum RenderFidelity | |
| 04 | Draw calls, instancing (même MeshContent + apparence), densité, transparence (0 et 1), particules, décalques | OK | improve (Rendering) ; design | |
| 04 | Ombres : CastShadow sur petites Parts, défauts visuels ; Roblox dégrade lui-même les ombres | REFORMULÉ | BasePart.CastShadow ; improve | Ajouté : la référence conseille de laisser CastShadow activé dans la plupart des cas ; ombres désactivées sous le niveau de qualité 4. |
| 04 | Textures 1024² = 4 × 512², ≤ 512 en général, ≤ 256 pour les petites, matériaux intégrés moins gourmands | OK | improve (Asset memory) ; design | |
| 04 | Réseau : remotes, effets côté client, ReplicatedStorage → ServerStorage | OK | improve (Networking, Load times) | |
| 04 | « TweenService ou une boucle » répliqués à chaque image | REFORMULÉ | improve (Server-side TweenService) | Ce qui vient de la doc (TweenService) est maintenant séparé de la déduction (boucle serveur qui modifie une propriété à chaque image). |
| 04 | Avant/après n° 3 : réplication « à tous les joueurs » | REFORMULÉ | workspace/streaming | « À tous les joueurs chez qui la pièce est chargée », pour rester cohérent avec le streaming. |
| 04 | Avant/après n° 1 (compteur), n° 2 (chrono `os.clock`), code de déconnexion, rotation côté client avec `PreRender` + `ChildAdded`/`ChildRemoved` | OK | improve ; design ; os.yaml (os.clock = temps écoulé, idéal pour mesurer une durée) | Optimisations réelles. `ChildRemoved` se déclenche bien sur le parent quand un objet est déchargé. |
| 04 | Quiz (6), dont `trouve-le-bug` `CanTouch` (lignes 6/7/10) | OK | | |
| 05 | Cycle, appareil de référence et limites déduites (draw calls) | OK | performance-optimization ; design | |
| 05 | Page Performance : Creations › expérience › Monitoring › Performance ; propriétaire ou permissions analytics ; ≥ 100 DAU pour les graphiques ; répartition par plateforme ; Place Version ; OOM | OK | production/analytics/performance | Formulation datée présente. |
| 05 | Plantages > 2–3 % ou hausse après une mise à jour | OK | identify (Client memory) | |
| 05 | Script d’audit (Command Bar) : `RenderFidelity` lisible (NotReplicated, sécurité None), `CollisionFidelity` volontairement non lue | OK | MeshPart.yaml ; TriangleMeshPart.yaml | |
| 05 | Quiz (5), dont `trouve-le-bug` GetChildren (ligne 4) | OK | | |
| Examen | 14 questions | OK | | Réponses, distracteurs, numéros de ligne des 2 `trouve-le-bug` (ligne 5 `personnage.Humanoid` ; ligne 9 `joueur.Name`) et explications vérifiés sur les mêmes sources. |

## Erreurs restantes non corrigées
- Valeur affichée par défaut de `Workspace.StreamingIntegrityMode` dans un nouveau place : invérifiable par la doc, et aucun Studio n’était connecté pour la vérifier. La leçon reste honnête (« `Default`, comportement non détaillé ») et recommande de régler le mode explicitement. À confirmer dans Studio lors d’une prochaine passe.
- Divergence persistante dans la doc officielle sur le raccourci du MicroProfiler (Ctrl+F6 contre Ctrl+Alt+F6) : les deux sont donnés dans la leçon, avec leur contexte.
