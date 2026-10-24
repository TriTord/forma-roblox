# Module 02 — passe 2 (vérificateur indépendant : sémantique Luau, code Roblox, quiz, progressivité, sources) — 2026-10-24

> **Note (phase IA, 2026-10-24)** : ce rapport a été écrit quand ce module portait le numéro 02. Un module 02 « Scripter avec l'IA » a ensuite été inséré : dans le texte ci-dessous, les numéros de modules et les chemins suivent l'**ancienne** numérotation (ancien module N ≥ 2 = nouveau module N + 1).

## Résumé
102 affirmations ou éléments vérifiés. 12 corrigés, reformulés ou précisés, 0 supprimé.
Quiz : 31 questions de leçon et 14 questions d'examen revérifiées. Elles sont toutes justes. Les 6 `trouve-le-bug` de leçon et les 3 de l'examen contiennent chacun un seul bug, et les numéros de ligne ont été recomptés un par un.
Code : 22 comportements Luau ont été réexécutés avec `C:\tmp\luau-tools\luau.exe`, y compris tous les messages d'erreur cités. `node scripts/verifier-luau.mjs 02` analyse 62 extraits : 7 ont des diagnostics, tous attendus (bugs volontaires, variable hors de portée volontaire, `Unknown require` des extraits isolés).
Le mot-clé `const` est **conservé**. Il est documenté par Roblox (luau/variables, mise à jour le 2026-10-23) et par luau.org/syntax, et le RFC a le statut « Implemented ». L'annonce officielle « [Beta] if local Statements » (staff, 2026-10-06) le traite comme une syntaxe acquise.
Build `bash scripts/build-verrou.sh` : code de sortie 0.
Studio n'est pas connecté (`list_roblox_studios` vide). Le checkpoint n'a donc pas pu être testé en jeu.

Méthode : les pages create.roblox.com ont été lues en version `.md` (`last_updated` 2026-10-23), luau.org/syntax, /types et /library en HTML. Les fils DevForum ont été lus en JSON, ainsi que le RFC `const-keyword.md` sur GitHub (luau-lang/rfcs).

## Détail
| Leçon | Affirmation / élément | Verdict | Source | Commentaire |
|---|---|---|---|---|
| 01 | Script Legacy dans SSS/Workspace, LocalScript ni dans SSS ni dans ReplicatedStorage, RunContext | OK | scripting/locations | |
| 01 | Un nouveau Script contient `print("Hello world!")` | OK | create-a-script | |
| 01 | Ctrl+K / ⌘K, filtres de l'Output | OK | studio/output | |
| 01 | GetService crée le service ; le nom de RunService est inhabituel | OK | ServiceProvider | « RunService's name is "Run Service" » |
| 01 | TODO « met en gras le mot qui suit » | REFORMULÉ | luau/comments | Devient « le texte qui le suit (jusqu'au premier espace) », comme dans la doc |
| 01 | Attention casse : « `Workspace` et `workspace` sont des noms différents » | REFORMULÉ | RobloxGlobals | C'est vrai, mais les deux globales désignent le même service et la leçon 2 utilise `workspace` : risque de confusion pour un débutant. Remplacé par `Color` / `color` |
| 01 | Message `ServerScriptService.Script:5: attempt to index nil with 'Color'` (ligne 5) | OK | luau.exe | |
| 01 | Quiz 5 `Print` → « attempt to call a nil value », ligne 4 | OK | luau.exe | |
| 01 | Quiz commentaires `//` et `#` invalides | OK | luau.exe | Erreur de syntaxe |
| 02 | 21 mots réservés, règles de nommage, `local` plus rapide | OK | luau/variables, luau/scope | |
| 02 | Mot-clé `const` (ajouté par la passe 1) | OK + PRÉCISÉ | luau/variables, luau.org/syntax#const-bindings, RFC « Status: Implemented », annonce staff DevForum 4918297 (if const, 2026-10-06), luau.exe (« Variable 'X' is constant and may not be reassigned ») | Gardé. L'Info précise maintenant que le mot-clé est récent (absent des anciens tutoriels) et que la réaffectation provoque une erreur. Libellé de la source luau.org complété |
| 02 | `17 // 5 = 3`, `/`, `%`, `^`, priorité `2 + 3 * 4 = 14` | OK | luau.exe, luau/operators | |
| 02 | Seuls `nil` et `false` sont faux ; `0` et `""` sont vrais ; `or` donne une valeur par défaut | OK | luau/operators + luau.exe | |
| 02 | `#"Lea"` = 3, `#"Étape"` = 6 (octets) | OK | luau.exe | |
| 02 | Interpolation, parenthèses obligatoires, échappement `\{` | OK | luau.org/syntax + luau.exe | `print \`x\`` est une erreur de syntaxe, `{{` aussi (testé) |
| 02 | `typeof` / `type` (userdata) | OK + PRÉCISÉ | RobloxGlobals | Commentaire ajouté sur `workspace` en minuscules, qu'aucune leçon n'avait encore présenté |
| 02 | Quiz `not etape == 10` → toujours `false` | OK | luau.exe | |
| 02 | Health = 0 → Dead même sous ForceField ; TakeDamage bloqué par un ForceField | OK | Humanoid (« To do damage … irrespective of any ForceFields … set Health directly ») | |
| 02 | Kill brick (FindFirstChildOfClass + Health > 0) | OK | deadly-lava | |
| 02 | Trouve-le-bug `== nil` : ligne 6, seul bug | OK | recompté | |
| 03 | for, pas négatif `10,1,-3` → 4 tours | OK | luau.exe | |
| 03 | repeat…until : au moins un tour, locale visible dans `until` | OK | luau/control-structures | |
| 03 | `continue` doit être la dernière instruction du bloc | OK | luau.org/syntax + luau.exe | `continue print(i)` → erreur de syntaxe |
| 03 | Boucle sans attente : jeu figé et plantage de Studio (doc) ; « Script timeout » présenté comme un retour du DevForum | OK | luau/control-structures, DevForum 1455348 | Le fil parle bien de boucles imbriquées sans pause |
| 03 | `task.wait` : sans throttling, reprise au Heartbeat, renvoie le temps écoulé ; `wait`/`spawn`/`delay` dépréciées | OK | libraries/task, RobloxGlobals | |
| 03 | Paramètres manquants = nil, arguments en trop ignorés, `return` en fin de bloc | OK | luau/functions | |
| 03 | Pièce qui tourne : consigne « Cylinder fine et ronde » | PRÉCISÉ | enum PartType (« oriented along the X axis ») | Sans indication de taille, un débutant obtenait souvent un disque à plat ou un cylindre qui ne « tourne » pas comme une pièce. Ajout de Shape = Cylinder, Size `0.4, 3, 3`, de l'explication sur l'axe X, et de la source PartType |
| 03 | Rotation `CFrame * CFrame.Angles(0, math.rad(v*dt), 0)` sur une Part ancrée | OK | raisonnement | Rotation autour du Y propre de la pièce, qui reste vertical si la pièce n'est pas inclinée |
| 03 | Trouve-le-bug boucle sans `task.wait` : ligne 6, seul bug | OK | recompté | |
| 04 | Indices à partir de 1, insert/remove/find, références, `table.clone` superficiel, exemple de deep clone dans la doc | OK | luau/tables, luau.org/library + luau.exe | |
| 04 | Tableau à trous : `#{1,2,nil,4}` = 4, `ipairs` s'arrête à 2, itération générale = 3 tours | OK | luau.exe | Formulation « `#` peut renvoyer une longueur inattendue, certaines boucles s'arrêtent au trou » juste |
| 04 | `#` sur un dictionnaire = 0 | OK | luau.exe | |
| 04 | Modifier une table pendant `for … in` = comportement non spécifié | OK | luau.org/syntax | |
| 04 | Doc Roblox : éviter les scripts attachés aux objets du Workspace | OK | scripting/locations (« Avoid attaching scripts directly to instances in Workspace ») | |
| 04 | Tableau des choix : `{[cle] = true}` | REFORMULÉ | — | La syntaxe `[cle] =` dans un constructeur n'a jamais été expliquée. Remplacée par `possedes["TraineeRouge"] = true` (crochets déjà vus) |
| 04 | Info PiecesTournantes : « une pièce retirée du dossier (parce qu'elle a été ramassée) » | REFORMULÉ | module-03/05 | Au module 3, les pièces ramassées restent dans le dossier (transparentes). Formulation neutre : ajout et retrait du dossier pendant la partie |
| 04 | Défi `math.random(1, #t)` | PRÉCISÉ | — | La fonction était utilisée sans explication : définition courte ajoutée |
| 04 | Trouve-le-bug `for i = 0` : ligne 3, « attempt to concatenate string with nil » | OK | luau.exe | |
| 05 | Connect / Disconnect / Once / Wait | OK | scripting/events | |
| 05 | « Quand un objet est détruit, ses connexions sont coupées » | REFORMULÉ | scripting/events | La doc nuance (« non-deferred » connections) et recommande de couper soi-même. Ajout de « en général » et de la bonne pratique |
| 05 | Touched : mouvement physique, au moins une Part non ancrée, CanTouch, déclenchements multiples | OK | BasePart, scripting/debounce | |
| 05 | PlayerAdded en test solo + boucle GetPlayers | OK | Players (« does not work as expected in a solo playtest mode because the player is created before scripts run ») | |
| 05 | `task.spawn` utilisé dans le code avant d'être expliqué | CORRIGÉ (progressivité) | — | Commentaire ajouté dans le code, avec renvoi à la section plus bas |
| 05 | WaitForChild : avertissement à 5 s, `nil` après le délai | OK | Instance | |
| 05 | Noms d'attributs : alphanumériques + `_ - . /`, 100 caractères max, pas de préfixe RBX | OK | Instance:SetAttribute | |
| 05 | GetAttributeChangedSignal ne passe aucun paramètre ; réplication serveur → client | OK | scripting/attributes, studio/properties | |
| 05 | Checkpoint : ordre de chargement (CharacterAdded à l'étape 2, parentage à l'étape 6, déplacement au spawn à l'étape 8), `AncestryChanged:Wait()` + `task.wait()` + `PivotTo`, RespawnLocation et SpawnLocations aléatoires | OK (raisonnement) | Player (Character Loading Event Order, RespawnLocation « custom spawn logic using PivotTo »), SpawnLocation, DevForum 2030741 (réponses de Cluzio et Pragmatist : attendre avant de déplacer) | Même motif que module-03/05. Hauteur +4 studs cohérente avec la hauteur du HumanoidRootPart. Non testé en jeu (pas de Studio) |
| 05 | Trouve-le-bug lave : lignes 6-7, seul bug | OK | recompté | |
| 06 | ModuleScript : une valeur non nil, exécuté une fois, cache, une référence par côté, « Requested module was required recursively » | OK | scripting/module | |
| 06 | `table.freeze` superficiel, erreur à la modification | OK | luau/tables, luau.org/library + luau.exe (« attempt to modify a readonly table ») | |
| 06 | `setmetatable` renvoie la table, `__index`, motif de classe | OK | luau/metatables + luau.exe | |
| 06 | `maPiece.arreter()` → « attempt to index nil with 'active' » | OK | luau.exe | |
| 06 | Trouve-le-bug `Compteur.ajouter` : ligne 10, « attempt to index nil with 'valeur' » | OK | luau.exe | |
| 06 | nocheck / nonstrict (par défaut selon luau.org) / strict, `Workspace.LuauTypeCheckMode` | OK | luau.org/types (« --!nonstrict (default) »), luau/type-checking | |
| 06 | Module typé `Niveaux` (`--!strict`) | OK | verifier-luau | Aucun diagnostic |
| 06 | Brancher `Config` dans `Checkpoints` (« remplace sa constante ») | PRÉCISÉ | — | Un débutant aurait oublié le `require`. Les étapes sont maintenant données explicitement |
| 06 | Script POO et PiecesTournantes | PRÉCISÉ (cohérence) | module-03/05, module-09/02 et 04 | Les modules 3 et 9 reprennent le Script `PiecesTournantes` branché sur `Config`. Consigne ajoutée : une fois les essais terminés, réactiver ce script et désactiver la démo POO |
| 06 | Défi `os.clock()` | PRÉCISÉ | libraries/os | Définition courte ajoutée |
| 06 | `Config.Niveaux` compatible avec module 05 | OK | module-05/03 | Même structure `{nom, etapeDebut, etapeFin}`. Le module 5 ajoute `piecesParEtape`, `BONUS_FIN_DE_NIVEAU` et `recompensePourEtape`, qui réutilise `obtenirNiveau`. `Config.Niveaux[#Config.Niveaux].etapeFin` (module-05/04) donne 12. La remarque « freeze après les ajouts » est cohérente |
| Examen | q1 à q5, q7 à q9, q11, q12, q14 | OK | voir leçons + luau.exe | q11 : `repeat … until 3` ne fait qu'un tour (3 est vrai), donc la réponse reste fausse |
| Examen | q6 : fonction connectée avant sa déclaration, ligne 3 | OK | recompté | `Connect(nil)` provoque une erreur |
| Examen | q10 : lignes 5-6 | OK | scripting/attributes | |
| Examen | q13 : « attempt to call missing method 'cacher' of table », ligne 5 | OK | luau.exe | |
| Sources | Tous les liens `<Sources>` | OK | curl + WebFetch | 200 partout. Les 7 pages de référence lourdes (BasePart, Humanoid, Instance, Player, Players, SpawnLocation, Workspace) renvoient 502 à curl, mais leurs versions `.md` répondent 200 et WebFetch les ouvre : liens gardés. Ajout de la source PartType (leçon 03) |

## Désaccords avec la passe 1
- Aucun désaccord sur les faits. Les corrections de la passe 1 ont été revérifiées et sont justes : `#` en octets, `{{` et `\{`, message de q13, reformulation « Script timeout », test `IsDescendantOf`, et ajout de `const`, qui est bien en production.
- La passe 1 a laissé passer plusieurs points de **progressivité** pour un débutant : `task.spawn` utilisé avant d'être expliqué, syntaxe `{[cle] = true}` jamais présentée, `math.random` et `os.clock` non définis, étape `require` manquante pour brancher `Config` dans `Checkpoints`, exemple `Workspace`/`workspace` source de confusion.
- Elle a aussi laissé passer deux points de **cohérence entre modules** : l'Info sur les pièces « ramassées » retirées du dossier contredit le module 3, et rien ne demandait de réactiver `PiecesTournantes` après la démo POO, alors que les modules 3 et 9 le réutilisent.

## Erreurs restantes non corrigées
- Le retour au checkpoint (leçon 05) n'a toujours pas été testé en jeu : aucune instance Studio n'est connectée. Le raisonnement s'appuie sur l'ordre de chargement documenté et sur le même motif qu'au module 3.
