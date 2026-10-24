# Module 03 — Notes du rédacteur pour les vérificateurs

> **Note (phase IA, 2026-10-24)** : ce rapport a été écrit quand ce module portait le numéro 03. Un module 02 « Scripter avec l'IA » a ensuite été inséré : dans le texte ci-dessous, les numéros de modules et les chemins suivent l'**ancienne** numérotation (ancien module N ≥ 2 = nouveau module N + 1).

Toutes les pages ont été consultées le 2026-10-24 au format Markdown (`https://create.roblox.com/docs/en-us/<chemin>.md`, champ `last_updated` du 2026-10-23).

## Affirmations factuelles et sources

### Leçon 01 — modele-client-serveur
| Affirmation | Source |
|---|---|
| Le serveur est « l’autorité finale » sur l’état du jeu et garde les clients synchronisés | create.roblox.com/docs/projects/client-server |
| La réplication synchronise le modèle de données, la physique et le chat | idem |
| La plupart des joueurs ont 100 à 300 ms de latence ; Studio n’a aucune latence par défaut ; il faut simuler 50 à 150 ms dans chaque sens | idem (encadré final) |
| Les changements faits côté client « persistent mais ne sont pas répliqués au serveur » | reference/engine/classes/ReplicatedStorage (Description) |
| `Workspace.FilteringEnabled` est dépréciée : « discontinued and no longer takes effect » | reference/engine/classes/Workspace#FilteringEnabled |
| Types de scripts, RunContext `Legacy` par défaut, emplacements (les LocalScripts ne tournent pas dans ReplicatedStorage, les scripts ne tournent pas dans ServerStorage) | scripting/locations ; reference/engine/classes/ReplicatedStorage ; ServerScriptService (jamais répliqué) |
| Le serveur possède toujours les Parts ancrées (non modifiable) ; propriété automatique selon la proximité et la capacité matérielle ; `SetNetworkOwner(nil)` à utiliser avec modération (saccades) ; visualisation « Network owners » (vert = mon client, blanc/gris = serveur ou autre client) | physics/network-ownership |
| Le client a la propriété réseau de son personnage ; Roblox ne peut pas vérifier la physique des Parts possédées par un client ; `Touched` peut être déclenché sans contact réel | scripting/security/security-tactics ; physics/network-ownership ; scripting/security/network-ownership |
| Les états du Humanoid sont communiqués au serveur | scripting/events/remote (introduction) |
| Les animations lancées par le client sur l’Animator de son personnage sont répliquées (si l’Animator a été créé par le serveur) | reference/engine/classes/Animator (section « Loading an Animation on Client or Server ») |
| Test (F5) lance deux simulations (client + serveur) ; bouton Client/Server ; Output : bleu = client, vert = serveur | studio/testing-modes |
| Le « server authority model » est en bêta | scripting/security/network-ownership (encadré : « currently in beta and will be released soon ») ; projects/server-authority |

### Leçon 02 — remoteevents
| Affirmation | Source |
|---|---|
| FireServer / OnServerEvent (le joueur en 1er paramètre), FireClient, FireAllClients, OnClientEvent ; pas de communication directe de client à client | scripting/events/remote |
| Ranger les remotes dans ReplicatedStorage (ou parfois dans le Workspace ou un Tool) | idem |
| Limites des arguments : clés non textuelles converties en textes, fonctions → nil, tables mixtes et `nil` à éviter, tables copiées, métatables perdues, instances non répliquées → nil (ServerStorage → client ; Part créée par un LocalScript → serveur) | scripting/events/remote, section « Argument limitations » |
| RemoteEvent fiable et ordonné ; file d’attente limitée quand aucun gestionnaire n’est connecté (erreur « Remote event invocation » dans l’Output) ; messages perdus si le destinataire se déconnecte ; au-delà de la limite de débit, les messages d’un RemoteEvent sont traités plus tard, pas jetés | scripting/events/remote, section « Delivery guarantees » |
| Environ 500 requêtes/s par client, limite partagée par type de remote | reference/engine/classes/RemoteEvent (section Throttling) ; UnreliableRemoteEvent |
| UnreliableRemoteEvent : pas de renvoi, pas d’ordre, messages de plus de 1 000 octets jetés, pas de file d’attente, messages en excès jetés en cas de débit trop élevé ; usage : effets éphémères et données continues | scripting/events/remote ; reference/engine/classes/UnreliableRemoteEvent |

### Leçon 03 — remotefunctions-et-bindables
| Affirmation | Source |
|---|---|
| InvokeServer attend la réponse ; OnServerInvoke reçoit le joueur en 1er ; seul le dernier callback défini s’exécute | scripting/events/remote ; reference/engine/classes/RemoteFunction |
| Les 3 risques d’InvokeClient (erreur relayée, erreur si déconnexion, attente infinie si pas de valeur renvoyée) ; recommandation d’utiliser FireClient | idem (cités presque mot pour mot) |
| Préférer un RemoteEvent quand on n’a pas besoin du résultat | reference/engine/classes/RemoteFunction (Description) |
| Bindables : même côté ; emplacements recommandés (ServerScriptService / ReplicatedStorage) ; ordre d’exécution non garanti avec plusieurs connexions ; Invoke attend indéfiniment si OnInvoke n’est jamais défini ; un seul OnInvoke ; mêmes limites d’arguments (clés converties, tables mixtes, copies, métatables) ; les ModuleScripts sont souvent une meilleure solution | scripting/events/bindable ; reference/engine/classes/BindableFunction |

### Leçon 04 — ne-jamais-faire-confiance-au-client
| Affirmation | Source |
|---|---|
| Liste des capacités d’un exploiteur (décompiler les scripts répliqués, propriété réseau, Touched et ProximityPrompt à n’importe quelle distance, remotes avec n’importe quels arguments sauf le Player…) | scripting/security/security-tactics (« Never trust the client ») |
| Rôle du serveur : recevoir, valider, exécuter, répliquer ; exemple d’achat (vrai prix, argent du joueur, distance de la boutique) ; questions de « threat model » | idem |
| NaN : `typeof` donne "number", toutes les comparaisons sont fausses ; utiliser `math.isfinite()` ; inf aussi | scripting/security/client-server-boundary (« The danger of NaN », « Value validation ») |
| Faux objet de boutique (table imitant un Folder avec un prix à 0) ; vérifier `typeof`, `IsDescendantOf` | idem (« Type and structure validation ») |
| Seau à jetons (token bucket) ; ne jamais compter seulement sur une limite côté client | idem (« Rate limiting ») |
| ClickDetector : aucune vérification côté serveur ; ProximityPrompt : seul `Triggered` a une vérification de distance | idem (« Securing client-triggered instances ») |
| WalkSpeed modifiable localement, à ne pas utiliser comme mécanisme de sécurité ; WalkSpeed par défaut = 16 | reference/engine/classes/Humanoid#WalkSpeed ; scripting/security/network-ownership |
| Pas de solution universelle pour valider les mouvements ; faux positifs avec les connexions instables ; projeter sur XZ ; exemptions pour les téléportations légitimes ; accumulateurs de type « leaky bucket » | scripting/security/network-ownership (« Movement validation ») |
| Philosophie de sanction : le serveur décide, neutraliser d’abord, proportionné et réversible, score de suspicion, échelle des conséquences, Ban API (`Players:BanAsync`) pour les récidivistes, honeypots | scripting/security/server-side-detection |
| `utf8.len` renvoie nil pour un texte UTF-8 invalide | scripting/security/client-server-boundary (« Data store manipulation ») |

### Leçon 05 — securiser-l-obby
| Affirmation | Source |
|---|---|
| Exemple officiel de l’obby : checkpoints obligatoires validés dans l’ordre par le serveur, plutôt que de détecter la téléportation | scripting/security/defensive-design |
| Heuristique « Fastest Completion Time », un signal n’est pas une preuve | scripting/security/server-side-detection |
| Mode Server & Clients (1 à 2 clients suffisent en général, jusqu’à 8) | studio/testing-modes (« Multi-client simulation ») |

Convention fil rouge appliquée (consigne du chef d’orchestre) : `leaderstats.Etape` = dernier checkpoint validé, 0 au départ ; checkpoint N accepté seulement si N == Etape + 1.

## Points incertains ou à vérifier en priorité
1. **Réapparition au checkpoint** (leçon 05, script Progression) : dans `CharacterAdded`, on fait `WaitForChild("HumanoidRootPart")` + `task.wait()` puis `PivotTo`. C’est un motif courant chez les développeurs, mais je ne l’ai pas trouvé décrit dans la documentation officielle (moment exact où la SpawnLocation place le personnage). À tester dans Studio.
2. **InvokeServer sans délai maximum** (quiz de la leçon 03) : aucune page ne mentionne de timeout et la signature n’a pas de paramètre de délai. J’en déduis qu’il n’y a pas de délai intégré, mais ce n’est pas écrit noir sur blanc.
3. **Test 2 de la leçon 05** (modifier `Pieces` dans Properties depuis la fenêtre d’un client en mode Server & Clients) : c’est cohérent avec la règle « les changements du client ne sont pas répliqués », mais je ne l’ai pas testé dans Studio (Studio n’était pas disponible via MCP).
4. **Test 3 de la leçon 05** : `PivotTo` du personnage depuis un LocalScript qui se réplique (le client possède son personnage). C’est cohérent avec la documentation (un exploiteur peut se téléporter), mais pas testé.
5. Le comportement de `pcall` autour d’`InvokeServer` quand le callback serveur lève une erreur n’est pas documenté sur les pages consultées. Le texte dit seulement « si l’appel échoue », sans préciser comment.
6. La limite d’environ 500 requêtes/s par client est datée « octobre 2026 » dans le texte, avec un renvoi vers la page officielle.

## Analyse statique (`node scripts/verifier-luau.mjs 03`)
34 extraits, 6 avec diagnostics, tous attendus :
- « Unknown require » sur `ServerScriptService.Validation` et `ReplicatedStorage.Modules.Catalogue` : ces ModuleScripts sont définis dans un autre bloc (leçons 04/05), et l’analyseur ne voit pas l’arborescence de Studio.
- Examen, question 14 (trouve-le-bug) : extrait volontairement partiel (`Catalogue`, `possedes` non déclarés, fonction non appelée).
