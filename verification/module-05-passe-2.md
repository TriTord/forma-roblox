# Module 04 — passe 2 (contre-vérification indépendante) — 2026-10-24

> **Note (phase IA, 2026-10-24)** : ce rapport a été écrit quand ce module portait le numéro 04. Un module 02 « Scripter avec l'IA » a ensuite été inséré : dans le texte ci-dessous, les numéros de modules et les chemins suivent l'**ancienne** numérotation (ancien module N ≥ 2 = nouveau module N + 1).

## Résumé
Environ 120 éléments vérifiés : affirmations, code, quiz, examen et liens. 16 ont été corrigés ou reformulés, 1 extrait de code a été supprimé (le Script « Checkpoints » affaibli de la leçon 01), et 2 sources ont été ajoutées.

Sources : pages create.roblox.com, lues dans leur source officielle `github.com/Roblox/creator-docs` (branche main ; dernier commit de error-codes-and-limits.md le 2026-10-06, de leaderboards.md le 2026-09-23) et par WebFetch, plus les annonces du staff sur le DevForum.

Quiz : 32 questions de quiz et 15 d'examen revérifiées. Elles sont toutes justes. Les 6 `trouve-le-bug` ont chacun un seul bug, aux bons numéros de ligne. Une question d'examen a été précisée (Q2 : on y signale que la vérification de distance a été retirée de l'extrait).

Code : `node scripts/verifier-luau.mjs 04` analyse 26 extraits, dont 10 ont des diagnostics. Ils sont tous attendus :
- `require` de modules définis dans d'autres blocs ;
- extraits de quiz volontairement partiels ;
- bug volontaire de `TweenInfo.new` ;
- `script.Parent` typé `Instance?` ;
- le nouvel extrait partiel de « Progression » (leçon 01), qui utilise `obtenirEtape`, `dossierCheckpoints` et `Workspace` du script du module 3.

Le ModuleScript `DonneesJoueurs` passe sans aucun diagnostic.

Build : `bash scripts/build-verrou.sh` se termine avec le code 0.

## Revue ligne par ligne de `DonneesJoueurs` / `GestionJoueurs` (leçon 02)
| Point | Verdict | Commentaire |
|---|---|---|
| `pcall` + nouvelles tentatives (`avecTentatives`, 3 essais, environ 2-3 s puis 4-5 s, avec aléa) | OK | Conforme à best-practices (« exponential backoff », « jitter », « Cap the delay and number of attempts »). Le texte dit honnêtement que le code réessaie tout, sans trier les erreurs |
| Échec de chargement : aucune session, expulsion, `PlayerRemoving` → `Sauvegarder` renvoie `false` sans rien écrire | OK + REFORMULÉ | Le texte et le code disent la même chose. Ajout de la section « Et si le chargement échoue ? », qui suit le déroulé étape par étape. Le code de référence Roblox recommande plutôt de laisser jouer avec des données « errored » qui ne sont jamais sauvegardées (player-data-purchasing : « we recommend letting the player play with default data… rather than removing them ») : c'est déjà dit dans l'Erreur |
| Expulsion à chaque test si l'accès Studio n'est pas activé | AJOUTÉ | Effet direct du code (`StudioAccessToApisNotAllowed` → échec de chargement → `Kick`). Sans cette précision, un débutant serait perdu |
| **`Sauvegarder` renvoyait `true` même quand `UpdateAsync` était annulé** (sauvegarde d'une version plus récente) | CORRIGÉ | Ajout de l'indicateur `ecritureAnnulee`, remis à jour à chaque appel de la fonction de transformation (elle peut être rappelée). `Sauvegarder` renvoie maintenant `true` seulement si l'écriture a eu lieu, avec un avertissement en cas d'annulation. La signature ne change pas. L'usage du module 06 (`if DonneesJoueurs.Sauvegarder(player) then PurchaseGranted`) est maintenant correct (signalement du chef d'orchestre / module 06) |
| `UpdateAsync` : la fonction ne cède pas la main, renvoyer `nil` annule, elle peut être rappelée, elle renvoie `(valeur, userIds)` | OK | Référence GlobalDataStore:UpdateAsync. Les UserIds non renvoyés sont effacés, et notre code les renvoie à chaque fois |
| Double sauvegarde simultanée (départ pendant une sauvegarde automatique, ou départ + fermeture) | OK + EXPLIQUÉ | Les deux `UpdateAsync` écrivent la même table en mémoire, toujours à jour. `Liberer` oublie la table sans la vider, et chaque appel est compté dans `sauvegardesEnCours`. Le texte l'explique désormais |
| `BindToClose` : 30 s, fonctions en parallèle, `IsStudio()` | OK | Référence DataModel. L'exemple officiel saute la sauvegarde dans Studio (vérifié par WebFetch : « skips saving when RunService:IsStudio() ») |
| `SauvegarderTout` : `task.spawn` sur les sessions, puis attente que le compteur revienne à 0, limitée à 25 s | OK | `Sauvegarder` incrémente le compteur avant sa première attente, donc le compteur est complet à la fin de la boucle |
| `SAUVEGARDER_EN_STUDIO = false` | OK + PRÉCISÉ | Ajout : la sauvegarde de `PlayerRemoving` écrit quand même dans les données réelles si l'accès est activé, d'où l'intérêt d'une copie de test |
| `completer()` / `VERSION_DONNEES` (la version monte, ne baisse jamais ; une version plus récente est protégée) | OK | — |
| Sauvegarde automatique toutes les 180 s + 0 à 30 s d'aléa | OK | best-practices (« uses 180 seconds », « Stagger recurring requests ») |
| Joueur parti pendant son chargement | OK | `player.Parent ~= Players` → `Liberer` |
| Clarté pour un débutant | AJOUTÉ | Tableau de l'API publique (`Charger`, `Obtenir`, `Sauvegarder`, `Liberer`, `SauvegarderTout`) avec leurs valeurs de retour ; une phrase sur les annotations de type ; une sur `task.spawn` ; un avertissement sur les doubles dossiers `leaderstats` |

## Détail
| Leçon | Affirmation / élément | Verdict | Source | Commentaire |
|---|---|---|---|---|
| 01 | **Conflit avec le module 03** : le Script « Progression » (module 03, leçon 05) crée déjà les leaderstats. Le Script « Leaderstats » de la leçon 01 en créait un second dossier, et la leçon proposait un Script « Checkpoints » sans contrôle de distance ni journalisation (régression de sécurité) | CORRIGÉ | `module-03/05-securiser-l-obby.mdx` | Le Script « Checkpoints » est supprimé. Nouvelle section « Adapter le Script Progression du module 3 » : on remplace `initialiserJoueur` par `placerAuCheckpoint` + `initialiserJoueur`, qui ne créent plus les leaderstats et les attendent 60 s. Ainsi, un joueur qui revient est replacé sur son checkpoint une fois ses données chargées (leçon 02). On garde explicitement `surContactCheckpoint` (Etape + 1, `Validation.estAPortee`, journalisation). Intro, test, Défi et Résumé sont mis à jour (signalement du chef d'orchestre / module 03) |
| 01 | « Si, au module 3, tu avais rangé l'étape dans un attribut » | SUPPRIMÉ | module-03/05 (c'est le module 02 qui utilisait un attribut) | Remplacé par la description exacte des scripts du module 03 |
| 01 | `CharacterAdded` est déclenché avant l'entrée dans le Workspace | OK (source ajoutée) | https://create.roblox.com/docs/reference/engine/classes/Player#CharacterAdded (yaml creator-docs) | |
| 01 | Nom `leaderstats` en minuscules, vues Here / Friends / Global (en bêta), IsPrimary / Priority, SetCoreGuiEnabled | OK | https://create.roblox.com/docs/players/leaderboards | |
| 02 | Limites serveur : 60 + joueurs × 40 (lecture, écriture, suppression), 5 + joueurs × 2 (liste) ; quiz : 260 pour 5 joueurs | OK | https://create.roblox.com/docs/cloud-services/data-stores/error-codes-and-limits (commit du 2026-10-06) | |
| 02 | Débit par clé de 25 Mo/min en lecture et 4 Mo/min en écriture ; 50 caractères ; 4 194 304 ; métadonnées 300 ; 500 Mo + 1 Mo × utilisateurs | OK | idem | |
| 02 | SetAsync compte seulement en écriture ; UpdateAsync en lecture ET écriture | OK | référence GlobalDataStore (« only counts against the write limit » / « counts against both ») | |
| 02 | userIds « fortement recommandé » (RGPD) | OK | GlobalDataStore:SetAsync (« highly recommended to assist with GDPR ») | |
| 02 | Accès Studio (File ⟩ Experience Settings ⟩ Security), copie de test, DataStores uniquement depuis un Script | OK | https://create.roblox.com/docs/cloud-services/data-stores | |
| 02 | Clés `User_{UserId}`, une clé par joueur, modules tiers « always an option », DataStore2 legacy | OK | best-practices | |
| 02 | Versions conservées 30 jours, la dernière n'expire jamais | OK | versioning-listing-and-caching | |
| 02 | Data Stores Manager : Configurations ⟩ Data stores manager | OK | data-stores-manager | |
| 02 | Verrouillage de session (verrou dans les métadonnées via UpdateAsync, expiration) ; code de référence « à ne pas utiliser tel quel » | OK | player-data-purchasing | |
| 02 | ProfileStore : loleris / MadStudio, successeur de ProfileService, verrouillage, sauvegarde auto à 300 s, pas pour les classements | OK | https://madstudioroblox.github.io/ProfileStore/ + fil DevForum | Présenté comme module communautaire |
| 03 | **Le Script « Boutique » ne disait pas qu'il remplace celui du module 03, et il avait perdu `Validation.estTexte` et le cooldown** | CORRIGÉ | module-03/04 et 05 | Le texte dit maintenant qu'il remplace le script du module 03 (sinon chaque achat serait débité deux fois). Il réintègre `Validation.estTexte(idObjet, 50)` et `Validation.creerCooldown(1)`, et ajoute un cooldown de 0,5 s sur `EquiperObjet` (avec une vérification de longueur à la main, car `""` est accepté). La leçon demande de supprimer le LocalScript de démonstration du module 03 et mentionne le RemoteEvent `Notification` pour les messages. Les noms `idObjet`, `objet.prix` et `donnees.inventaire` restent inchangés (le module 08 s'y réfère) |
| 03 | Catalogue « à créer » | REFORMULÉ | module-03/05 | « Complète le Catalogue du module 3 » : mêmes identifiants et prix (TrailNuage 25, TrailSoleil 75, TrailAurore 150), couleurs en plus |
| 03 | Défi : la traînée est toujours équipée après un redémarrage | PRÉCISÉ | — | Ce n'est vrai dans Studio qu'avec `SAUVEGARDER_EN_STUDIO = true` sur une copie de test |
| 03 | Attributs (pas de tables), Trail entre deux Attachments | OK | properties, attributes, Trail | |
| 04 | **BoutonBoutique en bas à gauche, « facile à atteindre »** | CORRIGÉ | https://create.roblox.com/docs/ui/position-and-size (« Reserved zones ») | Le bouton passe à `AnchorPoint = (0, 0.5)`, `Position = {0.02, 0}, {0.5, 0}`, comme le propose le module 09, avec l'explication sur le joystick et le bouton de saut (signalement du chef d'orchestre / module 09) |
| 04 | Device Simulator « encore en bêta » | CORRIGÉ | https://devforum.roblox.com/t/studio-beta-new-device-simulator-toolbar-and-network-simulator/4861695 (annonce de l'équipe Studio, mise à jour du 16/10/2026 : « now out of beta ») + page de documentation (qui affiche encore l'avertissement bêta) | Le texte est aligné sur le module 09 : Test ⟩ Device Simulator, et File ⟩ Beta Features en solution de repli. Source ajoutée |
| 04 | ScreenInsets (4 valeurs, CoreUISafeInsets recommandé), ResetOnSpawn, MinTextSize ≥ 9, Scale / Offset | OK | Enum.ScreenInsets, on-screen-containers, size-modifiers | |
| 05 | Priorités Action4 > … > Core, animations par défaut en Core | OK | Enum.AnimationPriority | |
| 05 | Animator:LoadAnimation (réplication côté client sur son propre personnage, nouvelle piste à chaque appel, GetTrackByAnimationId) ; Humanoid:LoadAnimation dépréciée | OK | références Animator et Humanoid | |
| 05 | Animations « Restricted » (31/07/2025), pas d'Open Use, permission non révocable (réponse de BobaMuncher dans le fil) | OK | annonce DevForum | |
| 05 | Avatar Settings (File / onglet Avatar, bouton ⋯ : R6 / R15 / R15 & R6), Rig Builder (R6 legacy), Save → ServerStorage, Publish via ⋯, Creator pour un groupe | OK | avatar-settings, rig-builder, animation/editor | |
| 06 | `TweenInfo.new(time=1, Quad, Out, 0, false, 0)`, -1 = à l'infini, valeurs non modifiables | OK | TweenInfo | |
| 06 | Deux tweens sur la même propriété → le premier est annulé ; Completed après Cancel mais pas après Pause | OK | TweenService, TweenBase | |
| 06 | PrismaticConstraint Servo (« elevator platforms ») ; personnage non emporté (présenté comme un retour de développeurs) | OK | prismatic + fil DevForum | |
| Examen | Q2 `trouve-le-bug` : contrôle de distance absent | PRÉCISÉ | — | Ajout de la mention « raccourci : la vérification de distance du module 3 a été retirée », pour que l'extrait n'ait qu'un seul défaut |
| Sources | 41 liens testés | OK | — | 3 grandes pages de référence (DataModel, Players, AnimationTrack) renvoient 502 avec curl mais s'ouvrent par WebFetch. Elles sont conservées |

## Désaccords avec la passe 1
- La passe 1 affirmait que les noms étaient cohérents et que le code combiné était vérifié, mais elle n'a pas confronté le module 04 au **code réel du module 03**. Il y avait un double dossier `leaderstats` (Progression + Leaderstats / GestionJoueurs). Pendant la sauvegarde, `FindFirstChild("leaderstats")` pouvait lire le dossier resté à 0 : **risque de perte de pièces et d'étapes**. S'y ajoutaient une régression de sécurité sur les checkpoints (plus de contrôle de distance) et deux Scripts « Boutique » possibles (double débit), sans cooldown ni vérification de longueur.
- La passe 1 n'a pas vu que `Sauvegarder` renvoyait `true` quand l'écriture était annulée.
- La passe 1 présentait le Device Simulator comme étant en bêta. L'annonce du staff du 16/10/2026 le déclare sorti de bêta.
- La passe 1 avait validé le BoutonBoutique en bas à gauche. Or la documentation réserve cette zone aux contrôles tactiles.

## Incohérences détectées dans d'autres modules (non modifiés)
- **Module 07, leçon 04** (`04-mises-a-jour-et-evenements.mdx`, lignes 103-133) :
  - l'extrait de `completer` présenté comme « Inchangée depuis le module 4 » n'a pas la montée de `donnees.version` vers `VERSION_DONNEES`, ajoutée en passe 1 du module 04 ;
  - le texte dit « il suffit de l'ajouter dans `donneesParDefaut()` », sans augmenter `VERSION_DONNEES`, alors que le module 04 le demande.
- **Module 09, leçon 01** (`01-penser-mobile-d-abord.mdx`, l'Attention vers la ligne 106 et le Résumé vers la ligne 220) et **leçon 05** (vers la ligne 141) : ils disent qu'au module 4 le BoutonBoutique est en bas à gauche et qu'il faut le déplacer. Le module 04 utilise désormais directement la position recommandée (`(0, 0.5)`, `{0.02, 0}, {0.5, 0}`). Ces passages sont à reformuler, par exemple « vérifie que ton bouton n'est pas dans un coin inférieur ».
- **Module 10, leçon 02** (`02-erreurs-techniques.mdx`, code corrigé vers les lignes 128-220) : cette version « autonome et simplifiée » n'a pas de champ `version`, ne renvoie pas les `userIds`, attend sans limite dans `BindToClose` (sur `GetPlayers()`) et ne teste pas `IsStudio()`. C'est acceptable, car le code est présenté comme simplifié et il est dit de ne pas l'ajouter, mais ce n'est pas aligné avec le module 04. La « Boutique corrigée » de cette leçon n'utilise pas `Validation.estTexte` (elle a son propre cooldown) et ne dit pas qu'elle remplace celle du module 04.
- **Module 06, leçon 03** : rien à corriger. Il appelle `DonneesJoueurs.Obtenir` et `DonneesJoueurs.Sauvegarder`, ajoute `achats = {}` à `donneesParDefaut()` et compte sur le `true` / `false` de `Sauvegarder`, dont la sémantique est maintenant stricte.
- **Module 05, leçon 04** (`DonneesJoueurs.Obtenir`, champs ajoutés à la volée) et **module 08, leçon 05** (`idObjet`, `objet.prix`, leaderstats attendues 60 s) : compatibles.

## Erreurs restantes non corrigées
- Aucune erreur factuelle connue dans le module 04.
- Rien n'a été testé dans un Roblox Studio réel (aucune instance connectée). En particulier, le placement au checkpoint après un chargement tardif (`placerAuCheckpoint`) n'a été vérifié qu'en raisonnant sur la documentation de `CharacterAdded`.
