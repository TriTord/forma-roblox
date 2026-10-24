# Module 04 — passe 1 (vérificateur faits + sources + quiz + code) — 2026-10-24

> **Note (phase IA, 2026-10-24)** : ce rapport a été écrit quand ce module portait le numéro 04. Un module 02 « Scripter avec l'IA » a ensuite été inséré : dans le texte ci-dessous, les numéros de modules et les chemins suivent l'**ancienne** numérotation (ancien module N ≥ 2 = nouveau module N + 1).

## Résumé
Environ 110 affirmations vérifiées, dont 13 corrigées ou reformulées et 1 supprimée. Les sources sont les pages create.roblox.com, lues via WebFetch et via leur source officielle `github.com/Roblox/creator-docs` (branche main, octobre 2026), plus les annonces du staff sur le DevForum.
Quiz : 32 questions de quiz et 15 questions d'examen vérifiées. Toutes sont correctes ; 1 explication a été reformulée (tween / plateforme). Les 6 `trouve-le-bug` ont un bug unique, et les numéros de ligne sont exacts.
Code : `node scripts/verifier-luau.mjs 04` analyse 26 extraits. Il reste 9 extraits avec des diagnostics, tous attendus : `require` de modules définis dans d'autres blocs, extraits de quiz volontairement partiels (`UnknownGlobal`), bug volontaire de `TweenInfo.new` dans le quiz 06, et `script.Parent` typé `Instance?`. Une correction de logique a été faite dans le code DataStore (voir plus bas).
Build : `bash scripts/build-verrou.sh` → code de sortie 0.

## Détail
| Leçon | Affirmation / élément | Verdict | Source | Commentaire |
|---|---|---|---|---|
| 01 | Le dossier `leaderstats` doit être tout en minuscules, sinon le joueur n'apparaît pas | OK | https://create.roblox.com/docs/players/leaderboards | |
| 01 | Vues Here / Friends / Global ; Friends et Global en bêta, avec un OrderedDataStore enregistré dans le Creator Hub | OK | idem | |
| 01 | Ordre des colonnes : ordre de création, `IsPrimary`, `Priority` | OK | idem | |
| 01 | Masquer la liste avec `SetCoreGuiEnabled(PlayerList, false)` depuis un client | OK | idem | |
| 01 | Code Leaderstats / Checkpoints (N == Etape + 1, `FindFirstChild`, `GetPlayerFromCharacter`) | OK | — | Conforme aux conventions du fil rouge |
| 02 | **`completer()` ne mettait jamais à jour `version`** : quand `VERSION_DONNEES` augmente, une ancienne sauvegarde complétée était réécrite avec son ancien numéro. Un serveur encore sur l'ancienne version du jeu pouvait donc l'écraser (la protection `ancienne.version > VERSION_DONNEES` ne jouait plus) | CORRIGÉ | Raisonnement sur le code (signalement module 07 via le chef d'orchestre) | `completer` passe maintenant `donnees.version` à `VERSION_DONNEES` si elle est inférieure, sans jamais la baisser. Champs en minuscules et `donneesParDefaut()` inchangés. Explication et Défi bonus (passer `VERSION_DONNEES` à 2) mis à jour |
| 02 | Accès dans Studio : File ⟩ Experience Settings ⟩ Security ⟩ Enable Studio Access to API Services ⟩ Save ; jeu publié ; utiliser une version de test | OK | https://create.roblox.com/docs/cloud-services/data-stores | |
| 02 | Erreur `StudioAccessToApisNotAllowed` (403) | OK | https://create.roblox.com/docs/cloud-services/data-stores/error-codes-and-limits | |
| 02 | DataStores accessibles seulement depuis des Scripts ; erreur dans un LocalScript | OK | data-stores | |
| 02 | Valeur stockée sous forme de texte / JSON ; types non sérialisables refusés | OK | error-codes-and-limits (« stored as a string », erreur 104 `CantStoreValue`) | |
| 02 | `SetAsync` : écrit sans lire, compte seulement dans la limite d'écriture. `UpdateAsync` : lit puis écrit, plus lent, compte en lecture ET en écriture | OK | https://create.roblox.com/docs/reference/engine/classes/GlobalDataStore + best-practices | |
| 02 | Callback d'`UpdateAsync` : ne doit pas céder la main (yield) ; `nil` annule l'écriture ; peut être rappelé plusieurs fois | OK | GlobalDataStore:UpdateAsync | |
| 02 | Retries : backoff exponentiel + aléa, délai et nombre d'essais plafonnés, ne pas réessayer les requêtes invalides | REFORMULÉ | https://create.roblox.com/docs/cloud-services/data-stores/best-practices | Ajout des plafonds et de « ne pas réessayer une requête invalide ». Le code reste à 3 essais (≈ 2-3 s puis 4-5 s), ce qui est raisonnable |
| 02 | Échec de chargement → on expulse le joueur | REFORMULÉ | https://create.roblox.com/docs/cloud-services/data-stores/player-data-purchasing | Le code de référence Roblox recommande plutôt de laisser jouer avec des données par défaut marquées « ne jamais sauvegarder », avec un message clair. La leçon présente maintenant les deux choix et la règle commune : ne jamais écraser des données non chargées. Le code ne crée jamais de session en cas d'échec (vérifié) |
| 02 | Clé stable basée sur le UserId (`User_123456`) ; une clé par joueur | OK | best-practices | |
| 02 | `userIds` « fortement recommandé » (RGPD) | REFORMULÉ | GlobalDataStore (paramètre `userIds` de SetAsync ; UpdateAsync : IDs effacés s'ils ne sont pas renvoyés) | Formulation précisée |
| 02 | **BindToClose : le code n'attendait que ses propres sauvegardes** (sur `Players:GetPlayers()`), pas celles déjà lancées par `PlayerRemoving` | CORRIGÉ | https://create.roblox.com/docs/reference/engine/classes/DataModel#BindToClose (attente de 30 s) + signalement du chef d'orchestre / module 10 | Ajout d'un compteur commun `sauvegardesEnCours` dans `DonneesJoueurs.Sauvegarder` et d'une fonction `DonneesJoueurs.SauvegarderTout()`. Elle sauvegarde en parallèle les **sessions en mémoire** (pas `GetPlayers()`, que les joueurs ont pu quitter) puis attend que le compteur revienne à 0, avec une limite de 25 s. Même principe que `module-10/02-erreurs-techniques.mdx` (compteur commun, attente jusqu'à 0) |
| 02 | Faut-il sauter la sauvegarde de BindToClose dans Studio ? | CORRIGÉ (tranché) | DataModel:BindToClose (« To verify that the current session is not in Roblox Studio, use RunService:IsStudio() » ; l'exemple officiel fait `if RunService:IsStudio() then return end` avec le commentaire « Avoid writing studio data to production and stalling test session closing ») | La recommandation officielle existe, on la suit : `if RunService:IsStudio() and not SAUVEGARDER_EN_STUDIO then return end`, avec `SAUVEGARDER_EN_STUDIO = false` par défaut. La nouvelle section « Et dans Studio ? » explique pourquoi, ce que ça implique (la sauvegarde de PlayerRemoving n'est pas garantie au Stop) et comment tester (passer la constante à `true` sur une copie de test). Le Défi est mis à jour. L'ancienne Info, fondée sur un fil DevForum, est remplacée |
| 02 | Le serveur attend 30 s ; fonctions exécutées en parallèle ; BindToClose recommandé avec DataStoreService | OK | DataModel:BindToClose | |
| 02 | Sauvegarde automatique à 180 s (exemple officiel), décalage aléatoire entre serveurs | OK | best-practices (« uses 180 seconds », « Stagger recurring requests ») | |
| 02 | Data Stores Manager : Creator Hub ⟩ expérience ⟩ Configurations ⟩ Data stores manager | OK | https://create.roblox.com/docs/cloud-services/data-stores/data-stores-manager | |
| 02 | Limites par serveur : lecture / écriture / suppression 60 + joueurs × 40, liste 5 + joueurs × 2 | OK | error-codes-and-limits (consulté le 2026-10-24) | Formulation datée « octobre 2026 » présente ; `miseAJour: 2026-10-24` |
| 02 | Limite de l'expérience, débit par clé (25 Mo/min en lecture, 4 Mo/min en écriture), noms de 50 caractères, valeur de 4 194 304, stockage 500 Mo + 1 Mo × utilisateurs | OK | idem | |
| 02 | « Une écriture toutes les trois minutes » | CORRIGÉ | error-codes-and-limits / GlobalDataStore | Chaque `UpdateAsync` compte en lecture ET en écriture : précisé |
| 02 | Versions conservées 30 jours, la dernière n'expire jamais ; ListVersionsAsync / GetVersionAsync | OK | https://create.roblox.com/docs/cloud-services/data-stores/versioning-listing-and-caching | |
| 02 | Métadonnées : DataStoreKeyInfo, UserIds, SetMetadata (300 caractères), à renvoyer à chaque écriture | OK | data-stores (Metadata) + error-codes-and-limits | |
| 02 | Renommer le DataStore = DataStore vide | OK | data-stores (GetDataStore crée un store s'il n'existe pas) | |
| 02 | Verrouillage de session : scénario, verrou posé dans le même UpdateAsync | REFORMULÉ | player-data-purchasing | « Les autres serveurs attendent » devient « refusent de lire ou d'écrire » ; verrou dans les métadonnées ; expiration s'il n'est plus rafraîchi |
| 02 | Code de référence Roblox : « à ne pas utiliser tel quel sans tests » | OK | player-data-purchasing | |
| 02 | Modules tiers « always an option » ; DataStore2 legacy | OK | best-practices | |
| 02 | ProfileStore (loleris, successeur de ProfileService, verrouillage + autosave à 300 s, pas pour les classements) | CORRIGÉ | https://devforum.roblox.com/t/profilestore-save-your-player-data-easy-datastore-module/3190543 (11/10/2024) + https://madstudioroblox.github.io/ProfileStore/ | Présenté explicitement comme module **communautaire** (le « fil officiel » laissait croire à une source Roblox). Ajout du lien vers la documentation de l'auteur, dans le texte et dans les Sources |
| 03 | Les attributs n'acceptent pas les tables ; liste des types | OK | https://create.roblox.com/docs/studio/properties | |
| 03 | Noms d'attributs (alphanumériques + `. - / _`, ≤ 100 caractères, pas de RBX) : `Possede_TrailNuage` valide | OK | référence Instance:SetAttribute | |
| 03 | Ordre de réplication non garanti entre une propriété et un RemoteEvent | OK | https://create.roblox.com/docs/scripting/attributes | |
| 03 | Trail entre Attachment0 et Attachment1 ; Lifetime | OK | https://create.roblox.com/docs/reference/engine/classes/Trail | |
| 03 | Serveur source de vérité ; cohérence des noms `Catalogue`, `AcheterObjet`, `EquiperObjet`, `Possede_<id>`, `TrailEquipe`, `donnees.inventaire` / `donnees.equipe` | OK | — | Noms identiques dans 03, 04 et le quiz. Le serveur vérifie type, existence, possession et solde, et prend le prix dans son propre catalogue |
| 04 | Scale / Offset additifs ; saisie raccourcie 0.5 / 20 ; AnchorPoint | OK | https://create.roblox.com/docs/ui/position-and-size | |
| 04 | ScreenGui cloné dans PlayerGui au premier spawn ; ResetOnSpawn vaut true par défaut | OK | https://create.roblox.com/docs/ui/on-screen-containers | |
| 04 | `ScreenInsets` : CoreUISafeInsets (défaut, recommandé pour l'UI interactive), DeviceSafeInsets, TopbarSafeInsets, None | OK | on-screen-containers + Enum.ScreenInsets | Noms actuels vérifiés |
| 04 | `ClipToDeviceSafeArea` à true par défaut ; `SafeAreaCompatibility` à éviter pour les nouveaux projets | OK | https://create.roblox.com/docs/reference/engine/classes/ScreenGui | |
| 04 | MinTextSize pas en dessous de 9 | OK | https://create.roblox.com/docs/ui/size-modifiers | |
| 04 | `Activated` : clic, toucher, console | OK | https://create.roblox.com/docs/ui/buttons + GuiButton.Activated | |
| 04 | UIGridLayout / CellSize | OK (source ajoutée) | https://create.roblox.com/docs/ui/grid-table-layouts | |
| 04 | Device Simulator : « emplacement change selon la version » | CORRIGÉ | https://create.roblox.com/docs/studio/device-simulator | Précisé : barre d'outils en bêta, à activer via File ⟩ Beta Features ⟩ New Device Simulator |
| 05 | R6 legacy à 6 parties, R15 à 15 ; vêtements superposables seulement en R15 | OK | https://create.roblox.com/docs/studio/rig-builder | |
| 05 | Avatar Settings ⋯ : R6 / R15 / R15 & R6 « (le joueur garde son choix) » | SUPPRIMÉ (parenthèse) | https://create.roblox.com/docs/studio/avatar-settings | La doc dit seulement « default avatar type » |
| 05 | Save = KeyframeSequence dans ServerStorage ; Publish to Roblox via ⋯ ; champ Creator pour un jeu de groupe | OK | https://create.roblox.com/docs/animation/editor | |
| 05 | Animations « Restricted » (31/07/2025), permission automatique, pas d'Open Use, permission d'expérience non révocable | OK | https://devforum.roblox.com/t/improving-animation-asset-permissions/3852101 (annonce BobaMuncher, catégorie Announcements) | Aucune annonce plus récente qui change ces règles (recherche du 2026-10-24) |
| 05 | Partage avec connexions et groupes (21/08/2025), onglet Permissions (Collaborators / Experiences) | OK | https://devforum.roblox.com/t/sharing-animation-assets-with-connections-and-groups/3892540 | |
| 05 | `Animator:LoadAnimation` : réplication si l'animation est lancée par le client sur son propre personnage, sinon par le serveur ; crée toujours une nouvelle piste ; `GetTrackByAnimationId` | OK | https://create.roblox.com/docs/reference/engine/classes/Animator | |
| 05 | `Humanoid:LoadAnimation` dépréciée | OK | référence Humanoid (tag Deprecated) | |
| 05 | Play(0.1, 1, 1) ; Ended ; priorités Action4 > … > Core ; animations par défaut en Core | OK | AnimationTrack + Enum.AnimationPriority | |
| 05 | « L'ancien script est détruit avec ses connexions, pas de connexions en double » | REFORMULÉ | — | Comportement qui dépend du mode de destruction du personnage ; affirmation non sourcée remplacée par une formulation sûre |
| 06 | Signature `TweenInfo.new(time=1, easingStyle=Quad, easingDirection=Out, repeatCount=0, reverses=false, delayTime=0)`, -1 = infini, non modifiable | OK | https://create.roblox.com/docs/reference/engine/datatypes/TweenInfo | Ordre des paramètres exact (leçon, quiz, examen) |
| 06 | Types qu'on peut tweener ; 2 tweens sur la même propriété → le premier est annulé (Completed avec `Cancelled`) | OK | TweenService + exemple « Tween-Conflict » de TweenBase | |
| 06 | Completed à la fin ou après Cancel, pas après Pause | OK | https://create.roblox.com/docs/reference/engine/classes/TweenBase | |
| 06 | Une plateforme ancrée tweenée n'emporte pas le personnage (« de nombreux retours ») | REFORMULÉ | https://devforum.roblox.com/t/platform-moves-while-character-doesnt/1051218 (2021) | Aucune source officielle trouvée. La leçon, la question vrai-faux et le résumé le présentent comme un retour de développeurs, à vérifier en test |
| 06 | PrismaticConstraint en Servo, citée pour les plateformes d'ascenseur | OK | https://create.roblox.com/docs/physics/constraints/prismatic | |
| Examen | 15 questions (2 trouve-le-bug, lignes 9 et 2 exactes) | OK | — | Toutes les leçons sont couvertes |

## Erreurs restantes non corrigées
- Aucune erreur factuelle connue.
- Remarque : `curl` renvoie 502 sur certaines grosses pages de référence (DataModel, Players, AnimationTrack). Elles s'ouvrent bien via WebFetch (vérifié), donc les liens sont conservés.
- Non testé dans Roblox Studio (pas d'instance connectée). Le comportement exact de la sauvegarde `PlayerRemoving` au Stop d'un test Studio n'est pas documenté par Roblox : la leçon le présente comme non garanti.
