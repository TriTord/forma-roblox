# Module 04 — Notes du rédacteur pour les vérificateurs

Date de vérification des faits : 2026-10-24. Sources principales : pages create.roblox.com/docs, vérifiées via WebFetch et via le dépôt officiel `github.com/Roblox/creator-docs` (source des pages create.roblox.com ; dernier commit sur error-codes-and-limits.md : 2026-10-06, sur leaderboards.md : 2026-09-23).

Convention fil rouge appliquée (consigne du chef d'orchestre) : `leaderstats.Etape` = numéro du dernier checkpoint validé, 0 au départ ; checkpoint N accepté seulement si N == Etape + 1.

## 01 — leaderstats
| Affirmation | Source |
|---|---|
| Dossier `leaderstats` obligatoirement en minuscules, sinon le joueur n'apparaît pas | https://create.roblox.com/docs/players/leaderboards |
| Vues Here / Friends / Global ; Friends et Global en **bêta**, adossées à un OrderedDataStore enregistré dans le Creator Hub | idem |
| Ordre des colonnes : ordre de création, `BoolValue` `IsPrimary`, `NumberValue` `Priority` (plus haut = plus tôt) | idem |
| Masquer : `StarterGui:SetCoreGuiEnabled(Enum.CoreGuiType.PlayerList, false)` depuis un client | idem |
| Changements client non répliqués au serveur | notion du module 3 (non re-sourcée ici) |

## 02 — DataStores (leçon critique)
| Affirmation | Source |
|---|---|
| Activation Studio : File ⟩ Experience Settings ⟩ Security ⟩ « Enable Studio Access to API Services » ⟩ Save ; expérience publiée ; ne pas activer sur un jeu en ligne, utiliser une version de test | https://create.roblox.com/docs/cloud-services/data-stores |
| Erreur `StudioAccessToApisNotAllowed` si accès non activé | https://create.roblox.com/docs/cloud-services/data-stores/error-codes-and-limits |
| DataStores accessibles uniquement via Scripts serveur ; erreur en LocalScript | data-stores (index) |
| SetAsync : écrase sans lire, incohérence possible si 2 serveurs, compte en écriture seulement ; UpdateAsync : lit la valeur la plus récente, plus lent, compte en lecture ET écriture | data-stores (index) + référence GlobalDataStore:UpdateAsync |
| Callback UpdateAsync : ne doit pas yield ; renvoyer nil annule l'écriture ; peut être rappelé plusieurs fois ; renvoie (valeur, userIds, metadata) | https://create.roblox.com/docs/reference/engine/classes/GlobalDataStore#UpdateAsync |
| Limites serveur par défaut / minute : lecture 60 + numPlayers × 40 ; écriture 60 + numPlayers × 40 ; liste 5 + numPlayers × 2 ; suppression 60 + numPlayers × 40 ; configurables via SetRateLimitForRequestType | error-codes-and-limits (« Server limits ») |
| Limites expérience : lecture 300 + CCU × 40 ; écriture 300 + CCU × 20 (non chiffrées dans la leçon, seulement mentionnées) | idem |
| Débit par clé : 25 Mo/min lecture, 4 Mo/min écriture | idem |
| Nom de DataStore / clé / scope : 50 caractères ; valeur : 4 194 304 caractères (sérialisée) | idem |
| Métadonnées perso : clé 50, valeur 250, total 300 caractères | idem |
| Stockage : 500 Mo + 1 Mo × utilisateurs « lifetime » ; seule la dernière version compte | idem |
| BindToClose : le serveur attend 30 s puis s'arrête ; plusieurs fonctions possibles, exécutées en parallèle ; recommandé avec DataStoreService | https://create.roblox.com/docs/reference/engine/classes/DataModel#BindToClose |
| Versions conservées 30 jours après remplacement ; dernière version n'expire jamais ; ListVersionsAsync / GetVersionAsync | https://create.roblox.com/docs/cloud-services/data-stores/versioning-listing-and-caching |
| Métadonnées : userIds (3e arg. SetAsync, recommandé RGPD), DataStoreSetOptions:SetMetadata, DataStoreKeyInfo (Version, CreatedTime, UpdatedTime) ; métadonnées à renvoyer à chaque écriture sinon perdues | data-stores (index) + référence SetAsync |
| Bonnes pratiques : peu de DataStores, une clé par joueur, clés stables (UserId, pas le nom), buffer en mémoire, sauvegarde périodique/au départ/à la fermeture/aux achats, intervalle d'exemple 180 s, retry avec backoff exponentiel + jitter, étaler les requêtes, préférer UpdateAsync | https://create.roblox.com/docs/cloud-services/data-stores/best-practices |
| DataStore2 = bibliothèque legacy à ne pas utiliser pour un nouveau projet ; modules tiers « always an option » | best-practices |
| Verrouillage de session : scénarios (sauvegarde lente/retry/throttling, joueur qui rejoint un autre serveur), lock dans les métadonnées via UpdateAsync, expiration du lock ; code de référence Roblox « pour référence, à ne pas utiliser tel quel sans tests » | https://create.roblox.com/docs/cloud-services/data-stores/player-data-purchasing |
| ProfileStore : de loleris (MadStudioRoblox), successeur de ProfileService, gère session locking + autosave, autosave par défaut 300 s, pas conçu pour leaderboards/état global | https://devforum.roblox.com/t/profilestore-save-your-player-data-easy-datastore-module/3190543 |
| Data Stores Manager : Creator Dashboard ⟩ expérience ⟩ Configurations ⟩ Data stores manager | https://create.roblox.com/docs/cloud-services/data-stores/data-stores-manager |

Points incertains / à surveiller :
- « Les valeurs sont stockées en JSON ; une Part ou un Color3 ne se stocke pas tel quel » : la doc dit que la valeur est sérialisée (JSON) et l'erreur 104 `CantStoreValue` couvre les types non sérialisables ; la liste exacte des types refusés n'est pas donnée explicitement par la doc.
- Info « en test Studio, PlayerRemoving et BindToClose peuvent tous deux sauvegarder ; Studio peut sembler figé quelques secondes » : comportement observé/rapporté sur le DevForum (ex. https://devforum.roblox.com/t/bindtoclose-causes-studio-to-freeze-until-it-finishes/3978463), pas une doc officielle. La référence BindToClose suggère `RunService:IsStudio()` pour éviter les sauvegardes en test ; j'ai choisi de NE PAS sauter la sauvegarde en Studio (pour que l'élève puisse tester sa sauvegarde), et d'utiliser une copie de test de l'expérience. À valider.
- Le code n'implémente pas le session locking (choix pédagogique, explicité dans la leçon).

## 03 — Inventaire
| Affirmation | Source |
|---|---|
| Attributs : types acceptés (string, boolean, number, UDim, UDim2, BrickColor, Color3, Vector2, Vector3, CFrame, NumberSequence, ColorSequence, NumberRange, Rect, Font) — pas de tables | https://create.roblox.com/docs/studio/properties |
| Noms d'attributs : alphanumériques + `. - / _`, ≤ 100 caractères, pas de préfixe RBX | référence Instance:SetAttribute |
| Réplication des changements serveur vers clients ; ordre non garanti entre propriété et RemoteEvent | https://create.roblox.com/docs/scripting/attributes |
| Trail entre Attachment0/Attachment1, Lifetime défaut 2 s (0,01–20) | https://create.roblox.com/docs/reference/engine/classes/Trail |
- Non vérifié par source dédiée : « les attributs d'un Player sont visibles par tous les clients » (déduit du fait que les objets Player sont répliqués à tous les clients).
- Le code combiné (module DonneesJoueurs + Catalogue + Boutique, client) a été vérifié avec luau-lsp en recollant les modules (aucun diagnostic hors variables inutilisées dues au recollage). Non testé dans Studio (aucune instance Studio connectée).

## 04 — Interfaces
| Affirmation | Source |
|---|---|
| Scale = fraction du parent, Offset = pixels, additifs ; saisie raccourcie dans Properties (0.5 → Scale, 20 → Offset) ; AnchorPoint | https://create.roblox.com/docs/ui/position-and-size |
| ScreenGui de StarterGui cloné dans PlayerGui au premier spawn ; ResetOnSpawn (défaut true) | https://create.roblox.com/docs/ui/on-screen-containers |
| `ScreenInsets` : CoreUISafeInsets (défaut, recommandé pour l'UI interactive), DeviceSafeInsets, TopbarSafeInsets, None (contenu non interactif) | on-screen-containers + référence ScreenGui / Enum.ScreenInsets |
| `ClipToDeviceSafeArea` défaut true ; `SafeAreaCompatibility` défaut FullscreenExtension, à éviter pour les nouveaux projets au profit de ScreenInsets ; `IgnoreGuiInset` | https://create.roblox.com/docs/reference/engine/classes/ScreenGui |
| UITextSizeConstraint, ne pas descendre MinTextSize sous 9 ; UIAspectRatioConstraint | https://create.roblox.com/docs/ui/size-modifiers |
| Boutons : événement `Activated` | https://create.roblox.com/docs/ui/buttons |
| Device Simulator (nouvelle barre en bêta, à activer via File ⟩ Beta Features) | https://create.roblox.com/docs/studio/device-simulator |
- Incertain : l'emplacement exact de l'outil de simulation d'appareils dans l'interface Studio change selon la version (ancien « Device emulator » vs nouveau « Device Simulator » en bêta). La leçon reste volontairement générale.

## 05 — Animations
| Affirmation | Source |
|---|---|
| R6 = 6 parties (legacy), R15 = 15 parties ; vêtements superposables seulement en R15 | https://create.roblox.com/docs/studio/rig-builder |
| Avatar Settings (menu File ou onglet Avatar), bouton ⋯ : R6 / R15 / R15 & R6 ; avertissement sur les réglages invisibles | https://create.roblox.com/docs/studio/avatar-settings |
| Animation Editor (onglet Avatar) ; Save = KeyframeSequence dans ServerStorage ; Publish to Roblox via ⋯ ; choisir le groupe dans Creator si jeu de groupe | https://create.roblox.com/docs/animation/editor |
| Animations « Restricted » depuis le 31/07/2025 ; permission auto si la personne peut partager l'animation (insertion, playtest, copier-coller) ; pas d'Open Use ; permission d'expérience non révocable | https://devforum.roblox.com/t/improving-animation-asset-permissions/3852101 (annonce staff, BobaMuncher) |
| Partage avec connexions et groupes depuis le 21/08/2025 (Permissions ⟩ Collaborators / Experiences) | https://devforum.roblox.com/t/sharing-animation-assets-with-connections-and-groups/3892540 |
| Animator:LoadAnimation : réplication si lancé par le client sur son personnage ; sinon, serveur ; Animator doit être dans Workspace ; LoadAnimation crée toujours une nouvelle piste ; GetTrackByAnimationId | https://create.roblox.com/docs/reference/engine/classes/Animator |
| Humanoid:LoadAnimation dépréciée | référence Humanoid (tag Deprecated) |
| Play(fadeTime=0.1, weight=1, speed=1) ; Looped ; Priority ; Ended | https://create.roblox.com/docs/reference/engine/classes/AnimationTrack |
| Priorités Action4 > Action3 > Action2 > Action > Movement > Idle > Core ; animations par défaut et bundles en Core | https://create.roblox.com/docs/reference/engine/enums/AnimationPriority |
- Incertain : « une animation faite pour un R15 est prévue pour des personnages R15 » (logique, non citée mot pour mot dans la doc).
- Incertain : affirmation que les connexions d'un LocalScript détruit avec le personnage sont déconnectées (comportement standard du moteur, non re-sourcé).
- Le placeholder `rbxassetid://0000000000` est volontaire (l'élève remplace par son ID).

## 06 — TweenService
| Affirmation | Source |
|---|---|
| `TweenInfo.new(time=1, easingStyle=Quad, easingDirection=Out, repeatCount=0, reverses=false, delayTime=0)`, -1 = infini, propriétés non modifiables après création | https://create.roblox.com/docs/reference/engine/datatypes/TweenInfo |
| Types tweenables (number, boolean, CFrame, Rect, Color3, UDim, UDim2, Vector2, Vector2int16, Vector3, EnumItem) ; 2 tweens sur même propriété → le premier est annulé | https://create.roblox.com/docs/reference/engine/classes/TweenService |
| Completed : fin ou Cancel, reçoit PlaybackState ; Pause ne le déclenche pas ; Play sans effet si déjà en cours | https://create.roblox.com/docs/reference/engine/classes/TweenBase |
| EasingDirection : In, Out, InOut | référence Enum.EasingDirection |
| PrismaticConstraint motorisée (Servo, TargetPosition) citée pour plateformes d'ascenseur | https://create.roblox.com/docs/physics/constraints/prismatic |
- Présenté comme retour de développeurs (DevForum), pas comme doc officielle : une Part ancrée tweenée horizontalement n'entraîne pas le personnage. Fil consulté : https://devforum.roblox.com/t/platform-moves-while-character-doesnt/1051218 (2021 ; les solutions BodyPosition/BodyGyro qui y sont proposées sont anciennes, je ne les ai pas reprises).
- Incertain : « une plateforme qui monte pousse en général le personnage vers le haut » (formulé avec prudence).
- Note : la doc TweenInfo mentionne une erreur si easingStyle vaut `Bezier` ou `Spring` ; ces valeurs n'apparaissent pas dans le YAML de l'enum EasingStyle consulté. Non évoqué dans la leçon.

## Besoins / remarques
- Nouveaux objets introduits par ce module (à connaître des modules suivants) : ModuleScript `ServerScriptService.DonneesJoueurs` (API `Charger`, `Obtenir`, `Sauvegarder`, `Liberer`), Script `GestionJoueurs` (remplace `Leaderstats`), Script `Boutique`, RemoteEvents `ReplicatedStorage.Remotes.EquiperObjet` et `Victoire`, ModuleScript `ReplicatedStorage.Modules.Catalogue` (objets `TrailNuage`, `TrailSoleil`, `TrailAurore` avec `nom`, `prix`, `couleurDebut`, `couleurFin`), attributs joueur `Possede_<id>` et `TrailEquipe`, Folder `Workspace.PlateformesMobiles`, ScreenGui `StarterGui.InterfaceObby`.
- Structure de sauvegarde : `{ version = 1, etape = 0, pieces = 0, inventaire = {}, equipe = "" }` (module 6 pourra y ajouter un historique des PurchaseId).
