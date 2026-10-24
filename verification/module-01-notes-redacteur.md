# Module 01 — Notes du rédacteur pour les vérificateurs

Rédaction : 2026-10-24. Toutes les pages create.roblox.com ont été consultées dans leur version Markdown (`/docs/en-us/<chemin>.md`, champ `last_updated: 2026-10-23`). Fichiers : 5 leçons `src/content/lecons/module-01/*.mdx` + `src/content/examens/module-01.yaml`.

## Affirmations factuelles et sources

### Leçon 01 — installer-et-decouvrir-studio
| Affirmation | Source |
|---|---|
| Studio gratuit, Windows et Mac ; config min. Windows 10 / macOS 10.14, 3 Go RAM ; recommandé Windows 11 / macOS 14+, 8 Go, 1600×900 | https://create.roblox.com/docs/studio/setup |
| Installation : Download Studio, `RobloxStudio.exe` / `.dmg`, Launch Studio, connexion | idem + https://create.roblox.com/docs/tutorials/curriculums/studio/install-studio |
| Bouton **Update** en haut à droite ; tous les jeux tournent sur la dernière version du moteur | studio/setup |
| Modèle Baseplate = SpawnLocation + Baseplate (grille 4x4 alignée sur les studs) ; liste des modèles (Platformer, Racing, Classic Obby, Village…) | https://create.roblox.com/docs/resources/templates |
| 1 stud ≈ 28 cm | https://create.roblox.com/docs/tutorials/first-experience (et greybox-a-playable-area) |
| Mezzanine : tests à gauche, onglets Home/Model/Avatar/UI/Script/Plugins au centre, collaboration/partage/Assistant/notifications/compte à droite ; toolbar en dessous ; contenu de l’onglet Home (transform, Part, color, material, group, lock, anchor) | https://create.roblox.com/docs/studio/overview |
| Clic droit mezzanine : Manage tabs, Collapse toolbar, Compact toolbar, Show labels ; onglets personnalisés via `+` | studio/overview |
| Explorer / Properties / Toolbox via menu Window ou onglet Home ; Output via Window ou onglet Script ; Command Bar via onglet Script ou Window › Script | studio/overview, studio/explorer, studio/properties, studio/output |
| Caméra : WASD, Q/E, Shift vitesse, F focus, clic droit, molette, clic molette ; souris 2 boutons + molette « strongly recommended » | studio/overview, tutorials/curriculums/studio/explore-ui |
| Toolbox : onglets Creator Store, Inventory, Recent, Creations | explore-ui, projects/assets/toolbox |
| Disposition des fenêtres (déplacer, grouper, épingler, flotter) | studio/overview (Layout customization) |
| Studio Settings `Alt+S` ; File › Customize Shortcuts ; File › Beta Features | studio/setup |
| Save to File (.rbxl/.rbxlx) ; Publish (File › Publish, `Alt+P`) lie le jeu au compte ; publier toutes les 10 min environ | https://create.roblox.com/docs/projects/place-files ; https://create.roblox.com/docs/tutorials/curriculums/building/test-and-save |
| Jeu publié privé par défaut | https://create.roblox.com/docs/production/publishing/publish-games-and-places |
| Réglages Auto-Recovery | projects/place-files |

### Leçon 02 — construire-avec-des-parts
| Affirmation | Source |
|---|---|
| 5 formes (Block, Sphere, Cylinder, Wedge, Corner Wedge) ; TrussPart absente du menu, insertion via Explorer (⊕ / `Ctrl+I`) | https://create.roblox.com/docs/parts ; studio/explorer |
| Bouton Part dans Home/Model ; insertion au centre de la vue | parts ; tutorials/curriculums/building/work-with-parts |
| Move `2`, Scale `3`, Rotate `4` ; indicateur de distance ; cursor drag avec `T`/`R` ; `Ctrl+L` monde/local ; `Ctrl+T` (X) / `Ctrl+R` (Y) 90° | parts |
| Snapping en studs/degrés réglable dans la toolbar ; `Shift` bascule temporairement ; `Shift+2` / `Alt+R` | parts |
| Anchored, CanCollide, Transparency (0–1, beaucoup de Parts transparentes = coût perf) | parts |
| Anchor `Alt+A`, Lock `Alt+L`, Edit › Unlock All ; Visualization Options « Anchored parts » | parts |
| Material : Concrete plus dense que Plastic ; Neon lumineux | parts |
| Sections Appearance / Transform ; Filter Properties `Ctrl+Shift+P` | studio/properties |
| `Ctrl+D` duplique dans la même branche ; `Ctrl+V` colle dans Workspace ; `Ctrl+Shift+V` Paste Into | studio/explorer |
| Group `Ctrl+G`, Group as Folder `Alt+Ctrl+G`, Ungroup `Ctrl+U` | parts ; parts/models |
| Union `Shift+Ctrl+G`, Intersect `Shift+Ctrl+I`, Separate `Shift+Ctrl+U`, Negate `Shift+Ctrl+N` (onglet Model) | https://create.roblox.com/docs/parts/solid-modeling |
| Page de détails d’une ressource (distributeur, description, notes, nombre de scripts) ; filtre créateurs vérifiés ; Disable Scripts ; restrictions du Creator Store (obfuscation, `require(assetId)`, `loadstring`, scripts démesurés) | https://create.roblox.com/docs/production/creator-store ; projects/assets/toolbox |
| Signaler un modèle suspect sur le Creator Store (backdoor, code obfusqué) | projects/place-files (section Safety check) |
| Recherche Explorer `is:[SubClass]` | studio/explorer |

### Leçon 03 — organiser-son-jeu
| Affirmation | Source |
|---|---|
| Data model, Instance, source de vérité | https://create.roblox.com/docs/projects/data-model |
| Rôles de Workspace, Lighting, ReplicatedStorage, ReplicatedFirst, ServerScriptService, ServerStorage (scripts n’y tournent pas), StarterGui→PlayerGui, StarterPlayerScripts→PlayerScripts, StarterCharacterScripts→Character, StarterPack→Backpack, Players (ne pas ajouter de Player à la main) | projects/data-model |
| Shift+clic pour tout déplier, glisser-déposer pour reparenter, Hierarchy › Select Children, Show Services…, Group As a Folder | studio/explorer ; studio/overview |
| Folder vs Model ; PrimaryPart (réglage en 3 étapes) ; personnages = Models | projects/data-model ; https://create.roblox.com/docs/parts/models |
| « Always name your objects descriptively » | projects/data-model |
| Noms sensibles à la casse | https://create.roblox.com/docs/tutorials/curriculums/core/building/greybox-a-playable-area |
| Recherche Explorer : nom, `is:Part`, `Anchored=false`, `Plateformes.*`, `Ctrl+Shift+X` | studio/explorer |
| `FindFirstChild` renvoie le premier enfant trouvé ; `WaitForChild` avertit après 5 s sans timeout | https://create.roblox.com/docs/reference/engine/classes/Instance |

### Leçon 04 — tester-son-jeu
| Affirmation | Source |
|---|---|
| Commandes de test à gauche du mezzanine (menu déroulant + bouton Play) ; modes Test (`F5`), Test Here, Run (`F8`) ; spawn ou ~(0,100,0) | https://create.roblox.com/docs/studio/testing-modes |
| Pause/Resume (physique et animations, pas les scripts), Step Forward 1/60 s, Stop `Shift+F5` remet l’état d’avant test, toggle Client/Server en solo | testing-modes |
| Deux simulations en solo ; bordure bleue client / verte serveur ; Output étiquettes bleues/vertes | testing-modes |
| Server & Clients : 1–2 clients suffisent souvent, jusqu’à 8, Play ou `F7`, End Session | testing-modes |
| Team Test | testing-modes |
| Paste Options › Paste Into At Original Location | studio/explorer |
| Output : print, warn, erreurs, messages moteur ; filtres ; `Ctrl+K` ; Show Timestamp/Context/Source | https://create.roblox.com/docs/studio/output |
| `warn` en jaune | https://create.roblox.com/docs/reference/engine/globals/RobloxGlobals |
| Erreurs en rouge ; nouveau script contient `print("Hello world!")` ; ⊕ sur ServerScriptService | https://create.roblox.com/docs/tutorials/fundamentals/coding-1/create-a-script |
| Developer Console `F9` ou `/console` | https://create.roblox.com/docs/studio/debugging |
| Command Bar : onglet Script / Window › Script, `Ctrl+9` ; multi-ligne en bêta (File › Beta Features › Multi-line Command Bar) | studio/overview |
| Device Simulator : nouvelle barre en bêta (File › Beta Features › New Device Simulator) | https://create.roblox.com/docs/studio/device-simulator |
| ServerScriptService / ServerStorage jamais répliqués aux clients | projects/data-model |

### Leçon 05 — premier-niveau-et-publication
| Affirmation | Source |
|---|---|
| SpawnLocation : Neutral, Enabled, Duration (ForceField, 10 s par défaut, 0 = aucun), choix aléatoire entre spawns éligibles, usage possible comme checkpoints via équipes | https://create.roblox.com/docs/reference/engine/classes/SpawnLocation |
| FallenPartsDestroyHeight : les Parts qui tombent sous cette hauteur sont retirées | https://create.roblox.com/docs/reference/engine/classes/Workspace ; parts/models |
| CharacterWalkSpeed 16 ; CharacterJumpPower 50 ; CharacterJumpHeight 7,2 ; CharacterUseJumpPower détermine lequel est affiché | https://create.roblox.com/docs/reference/engine/classes/StarterPlayer |
| Sauts trop difficiles au départ → joueurs qui abandonnent | tutorials/curriculums/building/work-with-parts |
| File › Publish, fenêtre Game details (icône, miniature, nom, genre, description, Save, UniverseID) ; Publish grisé pendant un test ; `Alt+P` | publish-games-and-places ; tutorials/curriculums/building/test-and-save |
| Accès par défaut (créateur, Edit, membres de groupe autorisés) ; Invite early testers (10 amis, tranches d’âge, filigrane) ; conditions de sortie publique (compte ≥ 2 jours en règle, age check, questionnaire) | publish-games-and-places |
| Moins de 16 ans : cadre Roblox Kids and Select (compte vérifié, 2FA, frais remboursable ou abonnement, évaluation du jeu) — mention brève, renvoi au module 07 | https://create.roblox.com/docs/production/publishing/kids-and-select ; publish-games-and-places |
| Creator Dashboard › Creations | https://create.roblox.com/dashboard/creations (cité dans publish-games-and-places) |
| Version History : Window › Version History, filtres, Save to Roblox with Notes `Ctrl+Alt+S`, notes requises à la publication, restauration (Open Local Copy › Save to Roblox As, ou Dashboard Configurations › Places › Version History › Restore), restaurer ne publie pas | https://create.roblox.com/docs/projects/version-history |
| Team Create : bouton Collaborate, Edit seulement aux amis pour un jeu personnel, Play à tous ; age check pour collaborer avec d’autres (pas seul) ; tranches d’âge ; Comments (`C`) ; auto-save | https://create.roblox.com/docs/projects/collaboration |

## Points incertains / à vérifier en priorité

1. **AZERTY** (leçon 01) : la doc ne parle que de QWERTY. Je m’appuie sur une explication d’un membre du staff dans https://devforum.roblox.com/t/azerty-keyboard-binding-issue/4070475 (KeyCodes basés sur la position QWERTY) pour dire que les touches de caméra « devraient » être ZQSD / A E sur AZERTY. Ce fil concerne les jeux, pas explicitement la caméra de Studio : formulé au conditionnel avec invitation à tester.
2. **Terminologie experience / game** : la doc officielle actuelle dit « game » partout ; je n’ai pas trouvé d’annonce officielle du changement. J’écris seulement que les deux mots coexistent.
3. **Save to Roblox vs Publish** (leçon 05 et examen Q13) : déduit de la page Version History (versions « saved » vs « published », restaurer ne publie pas, il faut « publish » pour remplacer la version live). Pas de phrase officielle unique qui l’énonce exactement.
4. **Chute dans le vide** (leçon 05) : la doc dit que les Parts sous `FallenPartsDestroyHeight` sont retirées ; j’en déduis que le personnage est détruit et que le joueur réapparaît (comportement standard, mais la page ne le dit pas mot pour mot).
5. **Copier pendant un test puis coller après Stop** (astuce leçon 04) : Paste Into At Original Location est documenté ; la persistance du presse-papiers entre test et édition est une pratique courante, non documentée explicitement.
6. **`is:LuaSourceContainer`** (leçon 02) : déduit de la règle documentée `is:[SubClass]` et du fait que Script/LocalScript/ModuleScript héritent de LuaSourceContainer ; non testé dans Studio.
7. **Anciens noms « Play » / « Play Here » et onglet « Test »** (leçon 04) : souvenir de l’ancienne interface ; la doc greybox mentionne encore un « Test tab », ce qui confirme que des pages plus anciennes utilisent cette disposition.
8. **Valeur > 1 pour Transparency** (examen Q12) : la doc donne la plage 0–1 ; l’affirmation « 50 rend la Part invisible » repose sur le comportement habituel (valeur ≥ 1 = invisible), non vérifiée sur une page officielle.
9. Le **Device Simulator** stable (hors bêta) n’est plus décrit sur la page officielle, qui ne présente que la nouvelle barre en bêta : formulation prudente, renvoi au module 9.
10. Interface Studio en évolution rapide : plusieurs pages officielles se contredisent légèrement (ex. « Experience Settings » vs « Game Settings », « Test tab » vs mezzanine). J’ai suivi les pages Studio interface / testing modes (`last_updated` 2026-10-23).

## Code
- `node scripts/verifier-luau.mjs 01` : 9 extraits analysés, 0 diagnostic (les extraits `trouve-le-bug` passent aussi l’analyse car leurs bugs sont logiques ou de type à l’exécution).
