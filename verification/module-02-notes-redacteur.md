# Module 02 — Notes du rédacteur pour les vérificateurs

Rédigé le 2026-10-24. Sources consultées le jour même (WebFetch). Les comportements purement Luau ont en plus été testés avec `C:/tmp/luau-tools/luau.exe` (interpréteur Luau local) : `//`, `%`, `continue`, itération générale, interpolation, `typeof`, `or` comme valeur par défaut, truthiness de `0`/`""`, `table.find/insert/remove/clone`, `#` sur dictionnaire (0), `ipairs` qui s'arrête au premier `nil`, références de tables, messages d'erreur (`attempt to index nil with 'Health'`, `attempt to concatenate string with nil`, `attempt to call a nil value`), coercition `"5" + 1 = 6`.

## Affirmations factuelles et sources

### Leçon 01 — premier-script
- Luau dérivé de Lua 5.1, typage graduel/optionnel : https://create.roblox.com/docs/luau , https://create.roblox.com/docs/scripting
- Script (RunContext Legacy) s'exécute dans un conteneur serveur (ServerScriptService, Workspace) ; LocalScript dans StarterPlayerScripts / StarterCharacterScripts / StarterGui / StarterPack, pas dans ReplicatedStorage ; ModuleScript ne s'exécute pas seul ; RunContext Legacy/Server/Client : https://create.roblox.com/docs/scripting/locations
- Nouveau Script contient par défaut `print("Hello world!")` : https://create.roblox.com/docs/tutorials/fundamentals/coding-1/create-a-script
- Commentaires `--`, `--[[ ]]`, directives `--!`, mise en gras après TODO : https://create.roblox.com/docs/luau/comments
- Output : print/warn, filtres (type, contexte, texte), Ctrl+K / ⌘K pour vider : https://create.roblox.com/docs/studio/output
- `GetService` crée le service s'il n'existe pas, utile pour les services au nom inhabituel (exemple RunService) : https://create.roblox.com/docs/reference/engine/classes/ServiceProvider
- `script`, `game`, `workspace` globaux : https://create.roblox.com/docs/reference/engine/globals/RobloxGlobals
- Message « Infinite yield possible » (warning après 5 s de WaitForChild) : https://create.roblox.com/docs/reference/engine/classes/Instance

### Leçon 02 — variables-types-et-conditions
- Règles de nommage, 21 mots réservés, `local` recommandé (plus rapide) : https://create.roblox.com/docs/luau/variables , https://create.roblox.com/docs/luau/scope
- Opérateurs (`//`, `%`, `^`, `~=`, `and/or/not`, seuls nil et false sont faux, 0 et "" vrais), affectations composées : https://create.roblox.com/docs/luau/operators
- Interpolation par accents graves, parenthèses obligatoires pour un appel de fonction, `{{` interdit ; expression `if ... then ... else` (else obligatoire, préférée à `a and b or c`) : https://luau.org/syntax
- `typeof` plus précis que `type` (ne renvoie pas `userdata` pour les types Roblox) : https://create.roblox.com/docs/reference/engine/globals/RobloxGlobals
- `tonumber` renvoie nil si non convertible : https://create.roblox.com/docs/luau/strings
- Health = 0 → état Dead ; `TakeDamage` sans effet sous ForceField, fixer `Health` directement contourne le ForceField : https://create.roblox.com/docs/reference/engine/classes/Humanoid
- Kill brick (Touched + Humanoid + Health = 0) : https://create.roblox.com/docs/tutorials/use-case-tutorials/scripting/basic-scripting/deadly-lava
- Accent grave sur AZERTY français = AltGr + 7 (touche morte, puis Espace) : connaissance générale, non sourcée officiellement.

### Leçon 03 — boucles-et-fonctions
- for (pas par défaut 1, pas négatif), while, repeat…until (au moins une fois, locale visible dans `until`), break, continue : https://create.roblox.com/docs/luau/control-structures
- `continue` doit être la dernière instruction du bloc, mot-clé contextuel : https://luau.org/syntax
- `wait`/`spawn`/`delay` dépréciées, remplacées par `task.*` : https://create.roblox.com/docs/reference/engine/globals/RobloxGlobals ; `task.wait` sans throttling, reprend au premier Heartbeat, renvoie le temps écoulé, défaut 0 : https://create.roblox.com/docs/reference/engine/libraries/task
- Paramètres manquants = nil, arguments en trop ignorés, retours multiples, fonctions anonymes : https://create.roblox.com/docs/luau/functions
- Portée/blocs/shadowing : https://create.roblox.com/docs/luau/scope
- « Script timeout: exhausted allowed execution time » pour une boucle sans attente : fils DevForum (communauté), ex. https://devforum.roblox.com/t/script-timeout-exhausted-allowed-execution-time/2614735 — formulé comme retour du DevForum.

### Leçon 04 — tables
- Indices à partir de 1, `table.insert`/`remove`, références, `table.clone` superficiel, deep clone récursif, `table.freeze` : https://create.roblox.com/docs/luau/tables
- `table.find` renvoie l'indice ou nil : https://luau.org/library
- Itération générale, ordre garanti 1..#t puis non ordonné, modification pendant l'itération non spécifiée : https://luau.org/syntax
- `GetChildren` renvoie un tableau : https://create.roblox.com/docs/reference/engine/classes/Instance

### Leçon 05 — evenements
- Connect → RBXScriptConnection, Disconnect, Wait (renvoie les arguments), Once, déconnexion auto à Destroy : https://create.roblox.com/docs/scripting/events
- Touched : seulement mouvement physique, pas sur changement de CFrame ; au moins une part non ancrée ; CanTouch : https://create.roblox.com/docs/reference/engine/classes/BasePart
- Touched se déclenche plusieurs fois → debounce (motif attribut + task.wait) : https://create.roblox.com/docs/scripting/debounce
- PlayerAdded peu fiable en test solo, boucle sur GetPlayers ; GetPlayerFromCharacter : https://create.roblox.com/docs/reference/engine/classes/Players
- CharacterAdded à chaque (ré)apparition ; ordre de chargement : CharacterAdded (étape 2) avant parentage au DataModel (6) et déplacement au point d'apparition (8) : https://create.roblox.com/docs/reference/engine/classes/Player
- WaitForChild : warning après 5 s, timeout → nil : https://create.roblox.com/docs/reference/engine/classes/Instance
- Attributs : SetAttribute/GetAttribute/GetAttributeChangedSignal (callback sans paramètre), nil = suppression, réplication serveur → client : https://create.roblox.com/docs/scripting/attributes ; règles de nommage (alphanumérique + `. - / _`, ≤ 100 caractères, pas de préfixe RBX) : https://create.roblox.com/docs/reference/engine/classes/Instance
- Attendre avant de replacer le personnage : conseil communautaire, https://devforum.roblox.com/t/checkpoint-script-not-working/2030741 (réponse expliquant que le personnage est déplacé au spawn après chargement).
- Convention du chef d'orchestre appliquée : étape = dernier checkpoint validé (0 au départ), checkpoint N accepté seulement si N == étape + 1 ; étape stockée dans l'attribut `Etape` du Player (leaderstats au module 4).

### Leçon 06 — modulescripts-et-poo
- ModuleScript : une seule valeur (pas nil), exécuté une fois par environnement, cache, client/serveur séparés, erreur « Requested module was required recursively », emplacements (ReplicatedStorage, ServerScriptService) : https://create.roblox.com/docs/scripting/module , https://create.roblox.com/docs/reference/engine/classes/ModuleScript
- Erreur « Module code did not return exactly one value » : https://devforum.roblox.com/t/how-do-i-fix-module-code-did-not-return-exactly-one-value/2667034
- Métatables, `__index`, setmetatable renvoie la table, motif de classe `Set.__index = Set` : https://create.roblox.com/docs/luau/metatables
- Annotations, `?`, `type`, `export type`, modes nocheck/nonstrict/strict, `Workspace.LuauTypeCheckMode` : https://create.roblox.com/docs/luau/type-checking ; mode par défaut = nonstrict selon https://luau.org/types
- Le module typé `Niveaux` (`--!strict`) a été vérifié sans erreur avec luau-analyze.

## Points incertains / à vérifier
1. **Téléportation au checkpoint (leçon 05)** : l'approche `AncestryChanged:Wait()` (si pas encore dans le Workspace) + `task.wait()` + `PivotTo` n'a PAS pu être testée dans Studio (aucune instance Studio connectée). Elle repose sur l'ordre de chargement documenté et sur des retours DevForum. À tester en priorité.
2. Le mode d'analyse par défaut dans Roblox Studio (vs luau.org « nonstrict par défaut ») : formulé en citant la doc Luau.
3. Le texte exact des messages d'erreur Roblox (« attempt to call a nil value » peut être suivi d'un détail du type « (global 'Print') ») : formulé avec « ressemble à ».
4. Extraits volontairement erronés signalés par `verifier-luau` : quiz 01#5 (`Print`), leçon 03 bloc 10 (variable hors de portée, démonstration d'erreur), quiz 06#5 (`self`), examen q6 (`accueillir` avant déclaration). Les « Unknown require » de la leçon 06 viennent de l'analyse isolée des extraits.
