# Module 01 — passe 1 (vérificateur : faits + sources + quiz) — 2026-10-24

## Résumé
94 affirmations vérifiées (interface, menus, onglets, boutons, modes de test, raccourcis, API, publication, collaboration) : 81 OK, 12 corrigées ou reformulées, 0 supprimée ; 1 vérifiée sans pouvoir être testée (recherche `is:LuaSourceContainer`, Studio non disponible), reformulée avec une solution de repli.
Quiz : 30 questions de leçon et 15 questions d’examen relues ; 1 question d’examen reformulée (Q12, Transparency). Les 5 `trouve-le-bug` ont bien un seul bug réel, et les numéros de ligne sont corrects.
Code : `node scripts/verifier-luau.mjs 01` → 9 extraits, 0 diagnostic. Build `bash scripts/build-verrou.sh` : code de sortie 0.
Sources : toutes les pages create.roblox.com ont été lues dans leur version Markdown (`/docs/en-us/<chemin>.md`, `last_updated: 2026-10-23`). Les liens ont été vérifiés un par un avec curl : 200 partout, sauf les pages HTML de la référence API Instance, Players, SpawnLocation et Workspace, qui renvoient 502 à curl (pages très lourdes). Leurs versions `.md` répondent 200 et sont à jour : les liens sont donc gardés.

## Détail
| Leçon | Affirmation / élément | Verdict | Source | Commentaire |
|---|---|---|---|---|
| 01 | Studio gratuit, Windows/Mac ; configuration min./recommandée (Win10/macOS 10.14, 3 Go ; Win11/macOS 14+, 8 Go, 1600×900) | OK | studio/setup | |
| 01 | Download Studio, RobloxStudio.exe/.dmg, Launch Studio, connexion | OK | studio/setup | |
| 01 | Bouton Update en haut à droite, tous les jeux sur la dernière version du moteur | OK | studio/setup | |
| 01 | Baseplate = SpawnLocation + sol à grille alignée sur les studs ; Platformer, Racing, Classic Obby, Village | OK | resources/templates, publish-games-and-places | |
| 01 | 1 stud ≈ 28 cm | OK | tutorials/first-experience, greybox | |
| 01 | « experience » vs « game » | REFORMULÉ | publish-games-and-places (« game »), collaboration (File › Experience Settings, My Experiences), device-simulator (« your experience ») | Plus d’affirmation « Roblox a longtemps appelé… » sans source. Le texte constate que la doc dit surtout « game » et que « Experience » reste dans certains menus et pages, avec des exemples tirés des pages officielles. |
| 01 | Refonte de l’interface | REFORMULÉ | DevForum, annonce staff « Next Gen Studio UI Preview » (2024) | Ajout de la date et de la source officielle (commandes de test toujours visibles en haut à gauche). |
| 01 | Mezzanine : tests à gauche ; Home/Model/Avatar/UI/Script/Plugins au centre ; collaboration/partage/Assistant/notifications/compte à droite ; toolbar en dessous ; contenu de l’onglet Home | OK | studio/overview, explore-ui | |
| 01 | Menus File/Edit/Window en haut à gauche | CORRIGÉ | annonce Next Gen Studio UI | Ajout : sur Mac, ces menus sont dans la barre de menus du système. |
| 01 | Options de visualisation en haut à droite du viewport (contour des Parts ancrées) | OK | studio/overview, parts | |
| 01 | Clic droit : Manage tabs / Collapse toolbar / Compact toolbar / Show labels ; onglets personnalisés avec `+` | OK | studio/overview | |
| 01 | Explorer/Properties/Toolbox via Window ou Home ; Output via Window ou Script ; Command Bar via Script ou Window › Script | OK | studio/overview, explorer, properties, output, toolbox | |
| 01 | Toolbox : 4 onglets Creator Store/Inventory/Recent/Creations | OK | explore-ui, projects/assets/toolbox | |
| 01 | Caméra WASD, Q/E, Shift, clic droit, molette, clic molette, F | OK | studio/overview, explore-ui | |
| 01 | « Clique dans le viewport sinon la caméra ne bougera pas » | REFORMULÉ | explore-ui, work-with-parts | Reformulé comme dans le tutoriel officiel (« si la caméra ne bouge pas, clique dans le viewport et réessaie »). |
| 01 | AZERTY → ZQSD / A E | REFORMULÉ | DevForum 4070475 (réponse du staff « Paragraph3232 ») | Le fil du staff parle des KeyCodes dans les jeux, pas de la caméra de Studio. Texte et explication du quiz Q3 reformulés : « si Studio suit la même logique (non confirmé par la doc)… vérifie sur ton clavier ». |
| 01 | Souris 2 boutons + molette « strongly recommended » | OK | explore-ui | |
| 01 | Déplacer/grouper/épingler/flotter les fenêtres | OK | studio/overview (Layout customization) | |
| 01 | Studio Settings `Alt+S`, recherche `theme`, File › Customize Shortcuts, File › Beta Features | OK | studio/setup | |
| 01 | Save to File (.rbxl) ; Publish (File › Publish, `Alt+P`) lie le jeu au compte ; privé par défaut | OK | place-files, test-and-save, publish-games-and-places | |
| 01 | Auto-Recovery ; publier toutes les ~10 min | OK | place-files, test-and-save | |
| 02 | 5 formes ; TrussPart absente du menu, insertion via Explorer ⊕ / `Ctrl+I` | OK | parts, explorer | |
| 02 | Part insérée au centre de la vue ; bouton Part dans Home/Model ; petite flèche pour la forme | OK | work-with-parts, parts | |
| 02 | Move `2` / Scale `3` / Rotate `4` ; indicateur de distance ; `T`/`R` en glisser ; `Ctrl+L` local/monde (indicateur L) | OK | parts | |
| 02 | `Ctrl+R` axe Y, `Ctrl+T` axe X | CORRIGÉ | parts | La doc parle des axes de l’objet (« their X/Y axis ») : « axe vertical » nuancé en « son axe Y (vertical pour une Part posée à plat) ». |
| 02 | Paliers en studs/degrés dans la toolbar ; `Shift` inverse ; `Shift+2`, `Alt+R` | OK | parts | |
| 02 | Anchored / CanCollide / Transparency 0–1 (coût des Parts semi-transparentes) | OK | parts, BasePart.Transparency | |
| 02 | Anchor `Alt+A`, Lock `Alt+L`, Edit › Unlock All, Visualization « Anchored parts » | OK | parts | |
| 02 | Color (bouton, RVB dans Properties) ; Concrete plus dense que Plastic ; Neon lumineux | OK | parts | |
| 02 | Size/Position/Orientation dans Transform, « selon ta version… CFrame » | CORRIGÉ | studio/properties | La doc actuelle : la section Transform affiche Size et CFrame (qui regroupe position et orientation). Formulation vague remplacée. |
| 02 | Filter Properties `Ctrl+Shift+P` | OK | studio/properties | |
| 02 | `Ctrl+D` même branche, `Ctrl+V` dans Workspace, `Ctrl+Shift+V` Paste Into | OK | studio/explorer | |
| 02 | `Ctrl+G` Model, `Ctrl+Alt+G` Folder, `Ctrl+U` Ungroup | OK | parts, parts/models, explorer | |
| 02 | Union/Negate/Intersect/Separate (Shift+Ctrl+G/N/I/U), onglet Model | OK | parts/solid-modeling | |
| 02 | Toolbox : loupe → page de détails (distributeur, description, notes, nombre de scripts) ; filtre créateurs vérifiés ; clic ou glisser pour insérer | OK | creator-store, toolbox | |
| 02 | Restrictions du Creator Store (obfuscation, `require(assetId)`, `loadstring`, scripts démesurés) | OK | creator-store | |
| 02 | Disable Scripts (clic droit Explorer) | OK | toolbox, creator-store | |
| 02 | `is:LuaSourceContainer` | REFORMULÉ | studio/explorer (`is:[SubClass]`), projects/data-model (scripts = LuaSourceContainer) | Pas testable : aucune instance de Studio connectée. Ajout de l’explication documentée et d’un repli (`is:Script`, `is:LocalScript`, `is:ModuleScript`). Source data-model ajoutée. |
| 02 | « Signale-le sur le Creator Store » | CORRIGÉ | creator-store (« Report Item ») | Précision : option **Report Item** de la page de détails. |
| 03 | Data model, Instance, source de vérité | OK | projects/data-model | |
| 03 | Rôles des services (Workspace, Players, Lighting, ReplicatedStorage, ReplicatedFirst, ServerScriptService, ServerStorage : les scripts n’y tournent pas, StarterGui→PlayerGui, StarterPlayerScripts→PlayerScripts, StarterCharacterScripts→Character, StarterPack→Backpack) | OK | projects/data-model | |
| 03 | Shift+clic déplie tout, glisser-déposer, Hierarchy › Select Children, Show Services…, Group As a Folder | OK | studio/explorer, studio/overview | |
| 03 | Folder sans comportement ; Model pour objets physiques ; PrimaryPart en 3 étapes ; centre de la boîte englobante par défaut ; personnages = Models | OK | data-model, parts/models | |
| 03 | Noms sensibles à la casse | OK | greybox-a-playable-area | |
| 03 | Recherche Explorer : nom insensible à la casse, `is:Part`, `Anchored=false`, `Plateformes.*`, `Ctrl+Shift+X` | OK | studio/explorer | |
| 03 | FindFirstChild = premier enfant ; WaitForChild avertit après 5 s | OK | référence Instance | |
| 04 | Commandes de test à gauche du mezzanine, menu déroulant + Play ; Test `F5` (spawn ou ~(0,100,0)), Test Here, Run `F8` | OK | studio/testing-modes, test-and-save | |
| 04 | Pause/Resume (physique + animations, pas les scripts), Step Forward 1/60 s, Stop `Shift+F5`, Client/Server en solo | OK | testing-modes | |
| 04 | Deux simulations ; bordure bleue (client) / verte (serveur) ; Output étiquettes bleues/vertes ; Explorer différent selon la vue | OK | testing-modes | |
| 04 | Server & Clients : 1–2 clients suffisent, jusqu’à 8, Play ou `F7`, End Session | OK | testing-modes | |
| 04 | Team Test | OK | testing-modes, collaboration | |
| 04 | Anciens noms Play / Play Here / onglet Test | REFORMULÉ | annonce Next Gen Studio UI (staff, 2024) ; la page docs « studio/test-tab » n’existe plus (404) | Rattaché à la refonte annoncée officiellement ; source ajoutée. |
| 04 | Copier pendant un test puis coller après Stop | REFORMULÉ | studio/explorer (Paste Into At Original Location) | Le presse-papiers conservé après l’arrêt du test n’est pas documenté : le texte le présente maintenant comme une astuce de développeurs, avec un repli (noter la position). |
| 04 | Output : print, warn jaune, erreurs rouges, messages moteur ; filtres ; `Ctrl+K` ; Show Timestamp/Context/Source | OK | studio/output, RobloxGlobals (warn « yellow text »), create-a-script (« red error ») | |
| 04 | Nouveau script = `print("Hello world!")`, ⊕ sur ServerScriptService | OK | create-a-script | |
| 04 | Developer Console `F9` / `/console` | OK | studio/debugging, developer-console | |
| 04 | Command Bar : onglet Script / Window › Script, `Ctrl+9` ; multi-ligne en bêta (File › Beta Features › Multi-line Command Bar) | OK | studio/overview | |
| 04 | Device Simulator : la phrase sous-entendait une « ancienne version » stable | REFORMULÉ | studio/device-simulator, testing-modes | La page officielle décrit seulement la barre d’outils en bêta (redémarrage requis). Catégories alignées sur la doc (téléphone, ordinateur, console, casque). |
| 05 | SpawnLocation : Neutral, Duration (ForceField 10 s, 0 = aucun), Enabled, choix aléatoire, checkpoints via équipes | OK | référence SpawnLocation | |
| 05 | Chute → FallenPartsDestroyHeight → réapparition | REFORMULÉ | référence Workspace (parts + Models ancêtres retirés), parts/models, référence Players (CharacterAutoLoads = true, RespawnTime = 5 s) | Le raisonnement est maintenant explicite et sourcé : personnage = Model retiré, puis réapparition automatique. Deux sources ajoutées. |
| 05 | CharacterWalkSpeed 16, CharacterJumpPower 50, CharacterJumpHeight 7,2 ; CharacterUseJumpPower | OK | référence StarterPlayer | |
| 05 | Sauts trop durs → joueurs qui abandonnent | OK | work-with-parts | |
| 05 | File › Publish, fenêtre Game details (nom, genre, description, icône, miniature), Save, UniverseID ; Publish grisé pendant un test ; `Alt+P` | OK | publish-games-and-places, test-and-save | |
| 05 | Privé par défaut ; Invite early testers (10 amis d’âge proche, filigrane) | CORRIGÉ | publish-games-and-places | Ajout : Roblox demande une vérification d’âge (age check) à l’invitation si elle n’a pas encore été faite. |
| 05 | Conditions de sortie publique (compte en règle, age check, questionnaire) ; Kids and Select (vérification, 2FA, évaluation…) | OK | publish-games-and-places, kids-and-select | |
| 05 | Creator Dashboard › Creations | OK | collaboration, publish-games-and-places | |
| 05 | Save to Roblox vs Publish | REFORMULÉ | version-history (« version notes are required when publishing… changes released to your players » ; restaurer ne publie pas, il faut publier pour remplacer la version live), publish-games-and-places (« releasing a new version of a place »), projects/update-games | Différence confirmée par plusieurs passages. Ajout de la nuance sur les serveurs déjà ouverts, d’une phrase qui reconnaît que c’est déduit de plusieurs passages, et de la source update-games. |
| 05 | Version History : Window › Version History, filtres, Save to Roblox with Notes `Ctrl+Alt+S`, notes obligatoires à la publication, restauration (Open Local Copy › Save to Roblox As ; Dashboard Configurations › Places › Version History › Restore), restaurer ne publie pas | OK | projects/version-history | |
| 05 | Team Create : Collaborate (à droite du mezzanine), Edit réservé aux amis pour un jeu personnel, Play pour tous ; age check pour collaborer avec d’autres, pas seul ; tranches d’âge ; Comment (`C`) ; Team Test | OK | projects/collaboration, testing-modes | |
| 05 | Sauvegarde automatique en session collaborative | CORRIGÉ | projects/collaboration (« every four minutes ») | Fréquence précisée et datée. |
| Examen Q12 | « 50 rend la Part totalement invisible » | REFORMULÉ | BasePart.Transparency (plage 0–1, sans précision sur les valeurs > 1) | Le comportement à 50 n’est pas documenté. La question dit maintenant « le résultat n’est pas celui attendu », et le bug (ligne 5) reste le seul et le même. |
| Quiz/examen | Les 30 questions de leçon et les 15 questions d’examen | OK (sauf examen Q12 ci-dessus, et l’explication du quiz 01-Q3 reformulée pour AZERTY) | sources ci-dessus | Bonnes réponses justes, distracteurs faux, explications cohérentes. |
| trouve-le-bug | 03-Q5 (casse `checkpoints`, l. 3), 04-Q5 (`"true"`, l. 5), 05-Q5 (`not` manquant, l. 4), examen Q8 (ServerStorage au lieu de Workspace, l. 3), examen Q12 (Transparency 50, l. 5) | OK | référence Instance, BasePart | Un seul bug par extrait, bon numéro de ligne, le reste du code est correct. |

## Erreurs restantes non corrigées
- Aucune erreur connue. Deux points ne sont pas vérifiables sans Studio (aucune instance connectée au MCP) et sont formulés prudemment avec un repli : la recherche `is:LuaSourceContainer` (leçon 02) et les touches de la caméra sur clavier AZERTY (leçon 01).
- Les pages HTML de la référence API Instance, Players, SpawnLocation et Workspace renvoient 502 à curl, mais leurs versions `.md` officielles répondent 200 (`last_updated` 2026-10-23). Les liens sont gardés ; une passe suivante peut les recontrôler dans un navigateur.
