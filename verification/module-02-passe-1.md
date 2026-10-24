# Module 02 — passe 1 (vérificateur : faits + sources + quiz + code) — 2026-10-24

## Résumé
94 affirmations ou éléments vérifiés, 14 corrigés ou reformulés, 0 supprimé, 7 compléments ajoutés (sources et précisions).
Quiz : 35 questions de leçon + 14 questions d’examen vérifiées. 1 erreur factuelle corrigée (message d’erreur de l’examen q13). 1 énoncé reformulé (leçon 03, quiz 5 : le message « Script timeout » n’est pas documenté officiellement). Les 9 `trouve-le-bug` contiennent chacun un seul bug, à la ligne indiquée.
Code : `node scripts/verifier-luau.mjs 02` donne 62 extraits et 7 diagnostics, tous attendus (bugs volontaires et `Unknown require` des extraits isolés). Les comportements de Luau pur ont été réexécutés avec `C:\tmp\luau-tools\luau.exe`. Studio n’était pas connecté (`list_roblox_studios` vide), donc pas de test du checkpoint en jeu. Build `bash scripts/build-verrou.sh` : code de sortie 0.

Méthode : les pages officielles ont été téléchargées en Markdown (`create.roblox.com/docs/…​.md`, mises à jour le 2026-10-23) et lues. luau.org/syntax et luau.org/types ont été lues avec WebFetch. Les 3 fils DevForum cités ont été ouverts.

## Détail
| Leçon | Affirmation / élément | Verdict | Source | Commentaire |
|---|---|---|---|---|
| 01 | Script (Legacy) dans ServerScriptService/Workspace ; LocalScript ne tourne pas dans SSS ni ReplicatedStorage ; ModuleScript inerte ; RunContext Legacy/Server/Client | OK | create.roblox.com/docs/scripting/locations | |
| 01 | Nouveau Script contient `print("Hello world!")` | OK | tutorials/fundamentals/coding-1/create-a-script | |
| 01 | Commentaires `--`, `--[[ ]]`, directives `--!`, TODO met en gras le mot suivant | OK | luau/comments | « Studio bolds any text following TODO (until broken by a space) » |
| 01 | Output : filtres, Ctrl+K / ⌘K | OK | studio/output | |
| 01 | `GetService` crée le service, nom inhabituel « Run Service » | OK | reference/engine/classes/ServiceProvider | Source ajoutée |
| 01 | Message `attempt to index nil with 'Color'` à la ligne 5 | OK | luau.exe | Numéro de ligne recompté |
| 01 | Quiz 5 (`Print`) : bug ligne 4, message « attempt to call a nil value » | OK | luau.exe | Message obtenu à l’exécution |
| 02 | 21 mots réservés | OK | luau/variables | La liste correspond exactement |
| 02 | `local` plus rapide, mémoire libérée en fin de portée | OK | luau/variables, luau/scope | Source scope ajoutée |
| 02 | Mot-clé `const` (nouveau, documenté par Roblox) | AJOUTÉ | luau/variables | Info courte ; testé avec luau.exe |
| 02 | Seuls nil et false sont faux ; 0 et "" sont vrais ; `or` donne une valeur par défaut | OK | luau/operators + luau.exe | |
| 02 | `17 // 5 = 3`, `%`, `^`, `+=` | OK | luau.exe | |
| 02 | `#` sur une chaîne = « nombre de caractères » | CORRIGÉ | luau.exe (`#"Étape"` = 6) | `#` compte les octets ; précision ajoutée sur les lettres accentuées |
| 02 | Interpolation : « seule contrainte » = parenthèses | REFORMULÉ | luau.org/syntax + luau.exe | `{{` est aussi interdit ; ajout de l’échappement `\{` (testé) |
| 02 | `typeof` vs `type` (userdata) | OK | RobloxGlobals | « does not denote Roblox-specific types as userdata » |
| 02 | Expression `if … then … else` (else obligatoire) ; piège `a and b or c` | OK | luau.org/syntax + luau.exe | |
| 02 | Quiz `not etape == 10` = false | OK | luau.exe | |
| 02 | Health = 0 → Dead, même sous ForceField ; TakeDamage sans effet sous ForceField | OK | reference/engine/classes/Humanoid | |
| 02 | Kill brick (Touched + Humanoid) | OK | tutoriel Deadly lava | |
| 02 | Quiz trouve-le-bug (`== nil`) : bug ligne 6 | OK | — | Lignes recomptées |
| 03 | for (pas par défaut 1, négatif), `10,1,-3` → 4 tours | OK | luau/control-structures + luau.exe | |
| 03 | repeat…until : au moins une fois, la variable locale reste visible dans `until` | OK | luau/control-structures + luau.exe | |
| 03 | `continue` : dernière instruction du bloc, absent de Lua 5.1, comportement for/while/repeat | OK | luau.org/syntax, luau/control-structures + luau.exe | |
| 03 | Boucle infinie sans attente → erreur « Script timeout », « très fréquent » selon le DevForum | REFORMULÉ | luau/control-structures | Doc officielle : « freezes the game and crashes Studio ». Le fil cité (2614735) parlait d’une boucle qui contenait une attente : remplacé par le fil 1455348, présenté comme retour de développeurs |
| 03 | Quiz 5 : « l’Output affiche « Script timeout » » | REFORMULÉ | idem | Énoncé ramené à « le jeu se fige », qui est documenté |
| 03 | `wait`/`spawn`/`delay` dépréciées ; `task.wait` sans throttling, reprise au Heartbeat, renvoie le temps écoulé | OK | RobloxGlobals, libraries/task | |
| 03 | Paramètres manquants = nil, arguments en trop ignorés, retours multiples | OK | luau/functions | |
| 03 | « `return` : les lignes suivantes du bloc ne sont pas exécutées » | CORRIGÉ | luau/functions | Du code entre `return` et `end` est une erreur ; précision ajoutée |
| 03 | Portée, shadowing, fonction locale déclarée avant usage | OK | luau/scope | |
| 03 | Rotation via `CFrame * CFrame.Angles(0, math.rad(v*dt), 0)` | OK | raisonnement | Part ancrée, rotation sur son propre axe Y |
| 04 | Indices à partir de 1, insert/remove/find, références, clone superficiel, exemple de deep clone dans la doc | OK | luau/tables, libraries/table + luau.exe | |
| 04 | `#` sur un dictionnaire = 0 | OK | luau.exe | |
| 04 | `#` sur un tableau à trous | AJOUTÉ | luau.exe (`{1,2,nil,4}` → `#` = 4, ipairs = 2 tours) | Paragraphe « garde tes tableaux sans trous » |
| 04 | Itération générale : ordre 1..#t puis non spécifié ; modifier la table pendant le parcours = non spécifié | OK | luau.org/syntax | |
| 04 | Doc Roblox : éviter les scripts attachés aux objets du Workspace | AJOUTÉ | scripting/locations | Justifie le passage à un script unique |
| 04 | Quiz trouve-le-bug (`for i = 0`) : ligne 3, « attempt to concatenate string with nil » | OK | luau.exe | |
| 05 | Connect → RBXScriptConnection, Disconnect, Once, Wait renvoie les arguments, déconnexion à Destroy | OK | scripting/events | |
| 05 | Touched : mouvement physique seulement, au moins une Part non ancrée, CanTouch | OK | BasePart | |
| 05 | « plusieurs membres du personnage » comme cause des déclenchements multiples | REFORMULÉ | scripting/debounce | La doc parle de « subtle physical collisions » |
| 05 | PlayerAdded en test solo : « ton personnage peut être créé avant » | CORRIGÉ | Players | La doc parle du **joueur** (« the player is created before scripts run ») |
| 05 | WaitForChild : avertissement après 5 s, `nil` après le délai | OK | Instance | |
| 05 | task.spawn / task.delay | OK | libraries/task | |
| 05 | Attributs : SetAttribute(nil) supprime ; règles de nommage ; GetAttributeChangedSignal ne passe aucun paramètre ; réplication serveur → client | OK | Instance, scripting/attributes, studio/properties | Source studio/properties ajoutée |
| 05 | Checkpoint : `CharacterAdded` → `AncestryChanged:Wait()` → `task.wait()` → `PivotTo` | OK + RENFORCÉ | Player (« Character Loading Event Order », RespawnLocation « Alternatives ») | Voir l’analyse ci-dessous. Ajout d’un test `IsDescendantOf(Workspace)` après l’attente, comme dans module-03/05 |
| 05 | Info « Pourquoi attendre » | REFORMULÉ | Player, SpawnLocation, DevForum 2030741 | S’appuie d’abord sur la doc officielle (ordre de chargement + « custom spawn logic using PivotTo ») ; alternative `RespawnLocation` expliquée ; DevForum présenté comme retour de développeurs |
| 05 | Défi 2 (« debounce par joueur sur la kill brick pour un seul message ») | REFORMULÉ | — | Le test `Health > 0` suffit déjà ; le défi demande maintenant d’expliquer pourquoi |
| 05 | Quiz trouve-le-bug (lave) : bug lignes 6-7, seul bug | OK | debounce | Lignes recomptées ; même motif `autrePart.Parent:FindFirstChildOfClass` que la doc officielle |
| 06 | ModuleScript : une valeur non nil, exécuté une fois par environnement, cache, copie distincte client/serveur, `required recursively` | OK | scripting/module, ModuleScript | |
| 06 | Erreur « Module code did not return exactly one value » | OK | DevForum 2667034 | Le titre du fil contient l’erreur exacte ; présenté comme « classique du DevForum » |
| 06 | `table.freeze` : superficiel, erreur à la modification | OK | luau/tables + luau.exe (« attempt to modify a readonly table ») | |
| 06 | `setmetatable` renvoie la table, `__index`, motif `Classe.__index = Classe` | OK | luau/metatables | |
| 06 | Motif POO `PieceTournante` (new / `:` / self) | OK | luau/metatables + luau-analyze | |
| 06 | Double rotation si `PiecesTournantes` et le script POO tournent ensemble | AJOUTÉ | raisonnement | Consigne de désactiver ou remplacer `PiecesTournantes` |
| 06 | `self` nil avec un appel par point → « attempt to index nil with 'active' » | OK | luau.exe | |
| 06 | Modes nocheck/nonstrict/strict, nonstrict par défaut | OK + PRÉCISÉ | luau.org/types, luau/type-checking, Workspace.LuauTypeCheckMode, enum LuauTypeCheckMode | La doc Luau donne `nonstrict` par défaut. La doc Roblox ne précise pas le défaut de Studio (« engine-default ») : formulation conservée (« indiqué par la documentation de Luau »), ajout de `Workspace.LuauTypeCheckMode` |
| 06 | Annotations sans effet sur l’exécution, `?`, `export type`, `::` | OK | luau/type-checking | |
| 06 | Quiz trouve-le-bug (`Compteur.ajouter`) : ligne 10, message « attempt to index nil with 'valeur' » | OK | luau.exe | |
| Examen | q2 (message d’erreur), q3, q4, q5, q7, q8, q9, q11, q12, q14 | OK | voir leçons | |
| Examen | q6 trouve-le-bug (fonction utilisée avant sa déclaration) : ligne 3 | OK | — | `Connect(nil)` provoque une erreur |
| Examen | q10 trouve-le-bug (GetAttributeChangedSignal) : lignes 5-6 | OK | scripting/attributes | « passes no parameters » |
| Examen | q13 trouve-le-bug : message annoncé « attempt to call a nil value » | CORRIGÉ | luau.exe | Le vrai message de Luau est « attempt to call missing method 'cacher' of table » ; énoncé et explication corrigés. Bug ligne 5 inchangé |

### Analyse du retour au checkpoint (leçon 05)
- Doc `Player` (LoadCharacterAsync, « Character Loading Event Order ») : CharacterAdded à l’étape 2, parentage à l’étape 6, déplacement au point d’apparition à l’étape 8. `CharacterAdded` « is before the character is parented to the Workspace ».
- Signaux immédiats : `AncestryChanged:Wait()` reprend à l’étape 6, puis `task.wait()` cède jusqu’au Heartbeat suivant. Les étapes 7-8 sont déjà passées, donc `PivotTo` n’est pas écrasé. Signaux différés : le gestionnaire s’exécute plus tard. Si le personnage est déjà dans le Workspace, `IsDescendantOf` évite l’attente et `task.wait()` garde la marge d’une image. Le raisonnement tient dans les deux modes.
- Risque restant : le personnage disparaît pendant l’attente (joueur parti, nouvelle réapparition). Ajout d’un test après `task.wait()`, identique à celui de module-03/05.
- Méthode plus simple et documentée : `player.RespawnLocation` avec des SpawnLocations. Elle n’a pas été retenue comme code principal, pour deux raisons. Le fil rouge impose des Parts dans `Workspace.Checkpoints`, et module-03/05 réutilise exactement le motif `AncestryChanged:Wait()`. Ensuite, plusieurs SpawnLocations actives donnent une apparition aléatoire (doc SpawnLocation). Elle est présentée en Info. La doc `Player.RespawnLocation` cite elle-même « custom spawn logic using PVInstance:PivotTo() » comme alternative officielle, ce qui valide l’approche.

## Erreurs restantes non corrigées
- Le checkpoint de la leçon 05 n’a pas pu être testé en jeu : aucune instance Studio n’est connectée. Le raisonnement repose sur l’ordre de chargement documenté. À tester en passe 2 si Studio est disponible.
- Le mode d’analyse par défaut réellement appliqué par Studio n’est pas précisé dans la doc Roblox (`LuauTypeCheckMode.Default` = « engine-default »). Le texte cite donc la doc Luau, sans affirmer le comportement de Studio.
