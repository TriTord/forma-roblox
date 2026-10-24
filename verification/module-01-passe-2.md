# Module 01 — passe 2 (contre-vérification indépendante) — 2026-10-24

## Résumé
102 éléments revérifiés sur les pages officielles actuelles (versions `.md` de create.roblox.com, `last_updated: 2026-10-23`) : interface, menus, modes de test, raccourcis, propriétés, API, publication, collaboration. 93 OK, 8 corrigés ou reformulés, 1 supprimé (lien DevForum AZERTY).
Quiz : les 30 questions de leçon et les 15 questions d’examen ont été relues. 1 distracteur a été remplacé (03-Q3) et 1 explication ajustée (01-Q3). Les 5 `trouve-le-bug` ont été recomptés ligne par ligne : chacun contient un seul bug, et les numéros de ligne cités sont les bons.
Code : `node scripts/verifier-luau.mjs 01` analyse 9 extraits, sans aucun diagnostic. J’ai aussi raisonné sur l’exécution réelle : bons emplacements (Script dans ServerScriptService, Command Bar hors test), `FindFirstChild` protégé par `if`, aucune API dépréciée, avertissement « infinite yield » de `WaitForChild` après 5 s confirmé par la référence Instance.
Build : `bash scripts/build-verrou.sh` se termine avec le code de sortie 0.
Studio : le MCP Roblox Studio ne voyait aucune instance connectée, donc rien n’a pu être testé dans l’interface.

## Détail
| Leçon | Affirmation / élément | Verdict | Source | Commentaire |
|---|---|---|---|---|
| 01 | Config. min./recommandée, Download Studio, `.exe`/`.dmg`, Launch Studio, bouton Update, `Alt+S`, `theme`, Customize Shortcuts, Beta Features | OK | studio/setup | |
| 01 | Baseplate = SpawnLocation + sol à grille 4×4 alignée sur les studs ; stud ≈ 28 cm ; modèles Platformer/Racing/Classic Obby/Village ; Classic Obby = checkpoints, tremplins, pièges | OK | tutorials/first-experience, resources/templates | |
| 01 | « Pendant plusieurs années, Roblox a appelé les jeux des experiences » | REFORMULÉ | collaboration (File › Experience Settings, My Experiences) | Le rapport de passe 1 dit avoir retiré cette affirmation historique, mais elle était toujours dans le texte. Aucune source officielle trouvée (seulement la presse de 2021). Le texte constate maintenant que les deux mots coexistent dans les tutoriels et certains menus. |
| 01 | Mezzanine : tests à gauche ; Home/Model/Avatar/UI/Script/Plugins au centre ; collaboration/partage/Assistant/notifications/compte à droite ; contenu de l’onglet Home | OK | studio/overview, explore-ui | |
| 01 | Menus File/Edit/Window en haut à gauche ; sur Mac, dans la barre de menus du système | OK | annonce staff Next Gen Studio UI (2024), publish-games-and-places (« top-left corner ») | |
| 01 | Next Gen Studio UI présentée en 2024, en bêta, commandes de test toujours en haut à gauche | OK | DevForum 3075390 (MeshOfPaul, Roblox Staff, 18/07/2024) | |
| 01 | Options de visualisation en haut à droite du viewport ; « Anchored parts » | OK | studio/overview, parts | |
| 01 | Toolbox : 4 onglets ; Output ; Command Bar (Script / Window › Script) ; tableau « Où l’ouvrir » | OK | studio/overview, toolbox, output | |
| 01 | Caméra : WASD, Q/E, Shift, clic droit, molette, clic molette, `F` ; cliquer dans le viewport | OK | studio/overview, explore-ui, work-with-parts | |
| 01 | AZERTY (texte + explication du quiz Q3) | REFORMULÉ, source SUPPRIMÉE | aucune source officielle | Le fil DevForum 4070475 (staff « Paragraph3232 ») parle de `GetStringForKeyCode` dans les jeux, pas de la caméra de Studio : il ne prouvait rien ici et ajoutait du jargon. Remplacé par un encadré Info simple et pratique : essayer ZQSD (A/E), sinon WASD. Lien retiré des sources. |
| 01 | Souris 2 boutons + molette « strongly recommended » | OK | explore-ui | |
| 01 | Épingler « sur le bord de l’écran » | CORRIGÉ | studio/overview (« pin windows to the edges of the overall Studio window ») | Corrigé en « sur le bord de la fenêtre de Studio ». |
| 01 | Déplacer, grouper, flotter ; Manage tabs / Collapse / Compact / Show labels ; onglets `+` | OK | studio/overview | |
| 01 | Save to File (.rbxl) ; Publish (`Alt+P`) lie au compte ; privé par défaut ; Auto-Recovery ; publier toutes les ~10 min | OK | place-files, test-and-save, publish-games-and-places | |
| 01 | Quiz Q1–Q6 | OK | ci-dessus | L’explication de Q3 est alignée sur le nouvel encadré AZERTY. |
| 02 | 5 formes, TrussPart via l’Explorer (⊕ / `Ctrl+I`), Part insérée au centre de la vue, petite flèche | OK | parts, explorer, work-with-parts | |
| 02 | Move `2` / Scale `3` / Rotate `4`, indicateur de distance, `R`/`T` en glisser, `Ctrl+R` axe Y, `Ctrl+T` axe X, `Ctrl+L` + indicateur L | OK | parts | |
| 02 | Snapping (studs/degrés), `Shift` inverse, `Shift+2`, `Alt+R` | OK | parts | |
| 02 | Anchored, CanCollide, Transparency 0–1 et coût des Parts semi-transparentes, Anchor `Alt+A`, Lock `Alt+L`, Unlock All, Color, Concrete plus dense, Neon | OK | parts, BasePart.Transparency | |
| 02 | Section Transform : Size et CFrame ; Filter Properties `Ctrl+Shift+P` | OK | studio/properties | |
| 02 | `Ctrl+D`, `Ctrl+V` (Workspace), `Ctrl+Shift+V`, `Ctrl+G`, `Ctrl+Alt+G`, `Ctrl+U` | OK | explorer, parts, models | |
| 02 | Union/Negate/Intersect/Separate, `Shift+Ctrl+G/N/I/U`, onglet Model | OK | solid-modeling, overview | |
| 02 | Toolbox (onglets, loupe, page de détails avec nombre de scripts, filtre « créateurs vérifiés », clic ou glisser) ; restrictions du Creator Store ; Disable Scripts ; Report Item | OK | toolbox, creator-store | |
| 02 | `is:LuaSourceContainer` | REFORMULÉ | studio/explorer (`is:[SubClass]`, conjonction `or`), référence LocalScript (`inherits: Script`), data-model | LuaSourceContainer est une classe NotBrowsable : rien ne garantit que la recherche l’accepte, et c’est du jargon inutile pour un débutant. Remplacé par `is:Script or is:ModuleScript`, qui repose seulement sur la syntaxe documentée (`is:` couvre aussi les sous-classes ; LocalScript hérite de Script). Sources mises à jour : description data-model reformulée, référence LocalScript ajoutée (HTTP 200). |
| 02 | Quiz Q1–Q6 | OK | parts, creator-store | |
| 03 | Data model, Instance, source de vérité, rôles des services, ServerStorage (scripts inactifs), copies Starter* → PlayerGui/Backpack/PlayerScripts/Character | OK | projects/data-model | |
| 03 | Tableau des services : « ModuleScripts partagés, RemoteEvents » | REFORMULÉ (clarté) | data-model | Le jargon est maintenant expliqué : « code partagé (ModuleScripts, module 2), objets de communication (RemoteEvents, module 3) ». |
| 03 | Explorer : Shift+clic, glisser-déposer, Hierarchy › Select Children, Show Services…, Group As a Folder, recherche (nom insensible à la casse, `is:Part`, `Anchored=false`, `Plateformes.*`, `Ctrl+Shift+X`) | OK | explorer, overview | |
| 03 | Model/Folder, Group (clic droit) `Ctrl+G`, PrimaryPart en 3 étapes, centre de la boîte englobante, personnages = Models | OK | parts/models, data-model | |
| 03 | Casse des noms ; FindFirstChild = premier enfant ; WaitForChild avertit après 5 s | OK | greybox-a-playable-area, référence Instance | |
| 03 | Quiz Q3, distracteur « Un Folder, car il déplace ses enfants ensemble » | CORRIGÉ | data-model (« Folder… doesn’t define any behavior »), models | Ce distracteur s’appuie sur un comportement de Studio non documenté (sélectionner un Folder puis le déplacer), donc on ne pouvait pas affirmer qu’il est faux. Remplacé par « Un Folder, car il peut avoir une PrimaryPart », clairement faux d’après la doc. L’explication a été complétée. |
| 03 | `trouve-le-bug` Q5 (ligne 3, casse `checkpoints`) | OK | référence Instance | Lignes recomptées : 1 GetService, 2 vide, 3 WaitForChild, 4 GetChildren, 5 print. Un seul bug. |
| 04 | Modes Test `F5` (spawn ou ~(0,100,0)), Test Here, Run `F8` ; Pause/Resume (physique et animations, pas les scripts) ; Step Forward 1/60 s ; Stop `Shift+F5` ; bascule Client/Server | OK | studio/testing-modes, test-and-save | |
| 04 | Info « anciens noms Play / Play Here / onglet Test » | REFORMULÉ (prudence) | ancienne page officielle studio/test-tab (aujourd’hui 404, contenu encore visible dans l’index du moteur de recherche : Play, Play Here, Run) + annonce Next Gen UI | « tu verras souvent » remplacé par « tu verras peut-être ». |
| 04 | Bordure bleue (client) / verte (serveur), étiquettes bleues/vertes dans l’Output, Explorer selon la vue | OK | testing-modes | |
| 04 | Server & Clients : 1–2 clients suffisent, jusqu’à 8, Play ou `F7`, End Session ; Team Test | OK | testing-modes | |
| 04 | Astuce copier/coller après Stop | OK (présentée comme astuce de développeurs) | explorer (Paste Into At Original Location) | |
| 04 | Output : print, warn en jaune, erreurs en rouge, filtres, `Ctrl+K`, Show Timestamp/Context/Source | OK | output, RobloxGlobals (« yellow text »), create-a-script (« red error ») | |
| 04 | Nouveau script = `print("Hello world!")` via ⊕ (« + ») sur ServerScriptService | OK | create-a-script | |
| 04 | Developer Console `F9` / `/console` | OK | debugging | |
| 04 | Command Bar (Script / Window › Script, `Ctrl+9`), multi-ligne en bêta | OK | studio/overview | |
| 04 | Device Simulator : barre d’outils en bêta (File › Beta Features › New Device Simulator, redémarrage), catégories | OK | device-simulator | |
| 04 | `trouve-le-bug` Q5 (ligne 5, `"true"`) | OK | — | Lignes recomptées. Affecter une chaîne à une propriété booléenne provoque une erreur d’exécution. Un seul bug. |
| 05 | SpawnLocation : Neutral, Duration (10 s par défaut, 0 = aucun), Enabled, choix aléatoire, checkpoints via équipes | OK | référence SpawnLocation (`.md` 200 ; HTML 502 à curl mais chargée par WebFetch) | |
| 05 | FallenPartsDestroyHeight (parts + Models ancêtres retirés), CharacterAutoLoads = true, RespawnTime = 5 s | OK | référence Workspace, Players, parts/models | |
| 05 | CharacterWalkSpeed 16, CharacterJumpPower 50 / CharacterJumpHeight 7,2 selon CharacterUseJumpPower | OK | référence StarterPlayer | |
| 05 | Publication : File › Publish, Game details, Save, UniverseID, Publish grisé pendant un test, `Alt+P`, Creator Dashboard › Creations | OK | publish-games-and-places, test-and-save | |
| 05 | Privé par défaut ; Invite early testers (10 amis d’âge proche, age check demandé, filigrane) ; conditions de sortie publique ; Kids and Select (vérification, 2FA, évaluation) | OK | publish-games-and-places, kids-and-select | |
| 05 | Save to Roblox / Publish ; anciens serveurs | OK (déduction annoncée comme telle) | version-history, update-games, test-and-save | |
| 05 | Version History (Window › Version History, filtres, `Ctrl+Alt+S`, notes obligatoires à la publication, restauration Studio et Dashboard, restaurer ne publie pas) | OK | projects/version-history | |
| 05 | Team Create : Collaborate, Edit réservé aux amis, Play pour tous, age check pour collaborer avec d’autres (pas seul), Comment `C`, Team Test | OK | projects/collaboration, testing-modes | |
| 05 | Sauvegarde auto « toutes les quatre minutes » | REFORMULÉ | projects/collaboration | La page se contredit : « every four minutes » (session collaborative) et « every 5 minutes just like place edits » (live scripting). Remplacé par « toutes les quelques minutes (quatre ou cinq minutes selon les passages) ». |
| 05 | `trouve-le-bug` Q5 (ligne 4, `not` manquant) | OK | — | Lignes recomptées, un seul bug. |
| Examen | Q1–Q15 | OK | sources ci-dessus | Q8 (ligne 3) et Q12 (ligne 5) recomptés : un seul bug, bon numéro. Distracteurs de Q12 faux (`IsA("BasePart")` couvre toutes les formes). |
| Sources | Tous les liens `<Sources>` | OK | curl + WebFetch | 200 partout. Les pages HTML Instance/Players/SpawnLocation/Workspace renvoient 502 à curl, mais elles se chargent avec WebFetch et leurs `.md` répondent 200 : liens gardés. Lien AZERTY retiré, lien LocalScript ajouté. |

## Désaccords avec la passe 1
- **« experiences »** : la passe 1 dit avoir retiré l’affirmation historique non sourcée (« Roblox a longtemps appelé… »). Elle était pourtant toujours dans le texte (« Pendant plusieurs années, Roblox a appelé… »). Je l’ai reformulée.
- **AZERTY** : la passe 1 gardait le fil DevForum du staff comme appui. Ce fil parle des KeyCodes en jeu (`GetStringForKeyCode`), pas de la caméra de Studio : il n’étaye rien ici. Lien retiré, texte simplifié et concret.
- **`is:LuaSourceContainer`** : la passe 1 le gardait avec une solution de repli. LuaSourceContainer est NotBrowsable, ce qui rend son support incertain, et c’est un détail inutile pour un débutant. J’ai remplacé par `is:Script or is:ModuleScript`, qui ne repose que sur la syntaxe documentée.
- **Sauvegarde auto « toutes les quatre minutes »** : la passe 1 a ajouté ce chiffre, mais la même page dit aussi 5 minutes. La formulation est maintenant prudente.
- **Quiz 03-Q3** : la passe 1 avait validé ce distracteur, alors qu’il reposait sur un comportement de Studio non documenté. Je l’ai remplacé.

## Erreurs restantes non corrigées
- Aucune erreur connue.
- Pas vérifiable sans Studio (aucune instance MCP connectée) : les touches réelles de la caméra sur AZERTY. Le texte reste prudent et propose de tester les deux jeux de touches.
- `is:Script or is:ModuleScript` découle de la documentation (`is:` couvre les sous-classes, et `or` est supporté) mais n’a pas été testé en direct.
