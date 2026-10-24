# Module 03 — passe 1 (vérificateur : faits + sources + quiz) — 2026-10-24

## Résumé
71 affirmations ou éléments vérifiés (5 leçons, 25 questions de quiz de leçon, 15 questions d'examen, 34 extraits de code) : 8 corrigés ou reformulés, 0 supprimé. Quiz : 40 questions vérifiées, 1 extrait `trouve-le-bug` complété (sans décalage des numéros de ligne), 1 explication reformulée. Code : 1 API dépréciée remplacée (`LoadCharacter` → `LoadCharacterAsync`), 1 condition de course corrigée (réapparition au checkpoint), 1 script de test rendu déterministe. `verifier-luau 03` : 6 extraits avec diagnostics, tous attendus (require de ModuleScripts définis ailleurs, extrait d'examen volontairement partiel). Build : OK (code de sortie 0).

Pages consultées le 2026-10-24 (format `.md` de create.roblox.com, `last_updated` 2026-10-23), plus l'annonce officielle du DevForum sur Server Authority.

## Détail
| Leçon | Affirmation / élément | Verdict | Source | Commentaire |
|---|---|---|---|---|
| 01 | Serveur = autorité finale, garde les clients synchronisés | OK | projects/client-server | « ultimate authority for maintaining the game's state » |
| 01 | La réplication synchronise le modèle de données, la physique et le chat | OK | projects/client-server | |
| 01 | Latence 100 à 300 ms ; Studio sans latence ; simuler 50 à 150 ms dans chaque sens | OK | projects/client-server | |
| 01 | Changements client persistants mais non répliqués, écrasables par le serveur | OK | ReplicatedStorage (référence) | |
| 01 | `Workspace.FilteringEnabled` dépréciée, sans effet | OK | Workspace (référence) | « discontinued and no longer takes effect » |
| 01 | RunContext `Legacy` par défaut, `Client` possible depuis ReplicatedStorage ; LocalScripts : StarterPlayerScripts, StarterCharacterScripts, StarterGui, StarterPack ; pas dans ReplicatedStorage ; scripts inactifs dans ServerStorage | OK | scripting/locations ; ReplicatedStorage | |
| 01 | ServerScriptService jamais répliqué | OK | ServerScriptService (référence) | « never replicated to player clients at all » |
| 01 | Parts ancrées toujours au serveur ; attribution auto selon proximité et matériel ; `SetNetworkOwner(nil)` avec modération (saccades) ; visualisation Network owners vert / blanc-gris | OK | physics/network-ownership | Le code `SetNetworkOwner(nil)` vérifie `Anchored` avant l'appel : correct |
| 01 | Roblox ne peut pas vérifier la physique d'un client | OK | physics/network-ownership | |
| 01 | « déclencher des Touched sur les Parts qu'il possède, y compris sans vrai contact » | REFORMULÉ | security-tactics ; security/network-ownership | Les docs disent « manipulate the firing of Touched » et « at any range » ; formulation alignée, source security-tactics ajoutée |
| 01 | États du Humanoid communiqués au serveur ; animations du personnage répliquées (Animator créé par le serveur) | OK | scripting/events/remote ; Animator | |
| 01 | F5 = deux simulations, bouton Client/Server, Output bleu/vert | OK | studio/testing-modes | |
| 01 | « Server authority en bêta » | CORRIGÉ | Annonce officielle DevForum (9 juillet 2026) ; projects/server-authority ; Workspace.AuthorityMode | Lancé pour tous les jeux le 9 juillet 2026, opt-in via `Workspace.AuthorityMode = Server`. La page security/network-ownership dit encore « currently in beta » (page en retard sur l'annonce) |
| 01 | Quiz (5 questions) | OK | — | trouve-le-bug : ligne 9 = `pieces.Value += 10`, numéros vérifiés |
| 02 | FireServer/OnServerEvent (joueur en 1er), FireClient, FireAllClients, OnClientEvent ; pas de client à client | OK | scripting/events/remote | |
| 02 | Seul le `player` est garanti | OK | security-tactics | « with arbitrary arguments (besides the first Player argument) » ; source ajoutée |
| 02 | Remotes dans ReplicatedStorage | OK | scripting/events/remote | |
| 02 | `player:LoadCharacter()` | CORRIGÉ | Player (référence) | Méthode dépréciée, « superseded by LoadCharacterAsync() » ; remplacée + encadré Attention + note sur l'appel répété avant `CharacterAppearanceLoaded` |
| 02 | Tableau des limites d'arguments (fonctions → nil, clés converties, tables mixtes, trous, métatables, copies, instances invisibles → nil) | OK | scripting/events/remote (Argument limitations) | |
| 02 | RemoteEvent fiable et ordonné, file limitée sans gestionnaire (erreur « Remote event invocation »), perte si déconnexion | OK | scripting/events/remote (Delivery guarantees) | |
| 02 | ~500 requêtes/s/client, partagée ; excès traité plus tard pour RemoteEvent | REFORMULÉ | RemoteEvent (Throttling) ; scripting/events/remote | Précisé « partagée entre les remotes du même type » (RemoteEvents d'un côté, UnreliableRemoteEvents de l'autre) |
| 02 | UnreliableRemoteEvent : pas de renvoi, désordre, > 1 000 octets jeté, pas de file, excès jeté | OK | UnreliableRemoteEvent (référence) ; scripting/events/remote | « Events with payloads larger than 1000 bytes are dropped » |
| 02 | Quiz (5 questions) | OK | — | trouve-le-bug : ligne 6 vérifiée ; `print(player)` affiche bien le nom |
| 03 | InvokeServer attend ; OnServerInvoke reçoit le joueur ; un seul callback (le dernier) | OK | RemoteFunction ; scripting/events/remote | |
| 03 | Pas de délai maximum d'InvokeServer (quiz 1) | REFORMULÉ | RemoteFunction (« yields until it receives a response », signature sans timeout) | Point incertain n° 2 du rédacteur : non écrit noir sur blanc ; explication reformulée en « la documentation ne prévoit aucun délai maximum » |
| 03 | Comportement de `pcall` autour d'InvokeServer | REFORMULÉ | — | Non documenté (point n° 5) : ajout « pcall protège contre une erreur, pas contre une attente » |
| 03 | Appels mis en file si `OnServerInvoke` n'est pas encore défini | AJOUTÉ (OK) | scripting/events/remote (RemoteFunctions) | Encadré Info ajouté |
| 03 | 3 risques d'InvokeClient ; FireClient recommandé ; « le client a rarement une information que le serveur n'a pas » | OK | RemoteFunction (Warning) | |
| 03 | Bindables : même côté, emplacements recommandés, ordre non garanti, Invoke bloqué sans OnInvoke, un seul OnInvoke, limites d'arguments, ModuleScripts souvent préférables | OK | scripting/events/bindable ; BindableFunction ; BindableEvent | |
| 03 | Code `invoquerAvecDelai` | OK | — | task.spawn + pcall + attente bornée ; la limite (fil bloqué si pas de réponse) est dite |
| 03 | Quiz (5 questions) | OK | — | trouve-le-bug : `OnServerInvoke:Connect` lève bien une erreur (callback non lisible), ligne 6 |
| 04 | Capacités d'un exploiteur, rôle du serveur (4 étapes), exemple d'achat, questions de menace | OK | security-tactics | |
| 04 | NaN / inf, `math.isfinite` | OK | client-server-boundary ; bibliothèque math | `math.isfinite` documenté ; source ajoutée |
| 04 | Faux objet de boutique, `IsDescendantOf` | OK | client-server-boundary | |
| 04 | Token bucket, ne jamais compter seulement sur le client ; ClickDetector sans contrôle, ProximityPrompt : seul `Triggered` vérifié | OK | client-server-boundary | |
| 04 | WalkSpeed modifiable, pas un mécanisme de sécurité, 16 par défaut | OK | Humanoid.WalkSpeed ; security/network-ownership | |
| 04 | Validation des mouvements : pas de solution universelle, faux positifs, plan XZ, exemptions, leaky bucket | OK | security/network-ownership | |
| 04 | Philosophie de sanction, échelle, BanAsync, honeypot | OK | server-side-detection | |
| 04 | « Server authority en bêta, solution la plus fiable une fois disponible » | CORRIGÉ | Annonce DevForum ; projects/server-authority ; security/network-ownership | Disponible depuis juillet 2026 (opt-in) ; la « plus fiable » est conservée (citée par la doc de sécurité) ; sources ajoutées |
| 04 | Module `Validation` (typeof, isfinite, entier, UTF-8, distance, cooldown + PlayerRemoving) | OK | — | Correct à l'exécution ; affinage de type `unknown` OK |
| 04 | Script `AllerAuCheckpoint`, détecteur de mouvements | OK | — | Validation type → débit → contexte → existence ; PlayerRemoving nettoie |
| 04 | Quiz trouve-le-bug (prix venant du client) | CORRIGÉ | — | Le code ne donnait jamais l'objet (2e défaut potentiel) : ajout d'une ligne commentaire après la ligne 11, numéros cités inchangés |
| 05 | Exemple officiel de l'obby (checkpoints obligatoires dans l'ordre) | OK | defensive-design | |
| 05 | Heuristique du temps de parcours, « un signal, pas une preuve » | OK | server-side-detection | |
| 05 | Server & Clients, 1 à 2 clients suffisent, jusqu'à 8 | OK | studio/testing-modes | |
| 05 | Réapparition au checkpoint : `WaitForChild("HumanoidRootPart")` + `task.wait()` + `PivotTo` | CORRIGÉ | Player (référence : ordre de chargement ; CharacterAdded « before the character is parented to the Workspace » ; Humanoid et parties du corps déjà présents) | Point incertain n° 1 : course réelle. La HRP existe déjà quand `CharacterAdded` se déclenche, donc `WaitForChild` ne bloque pas ; l'apparence peut charger plusieurs images, et le déplacement vers la SpawnLocation (étape 8) arrive après la mise dans le Workspace (étape 6) → le `PivotTo` pouvait être écrasé. Remplacé par le motif du module 2 (attendre `IsDescendantOf(Workspace)` / `AncestryChanged`, puis `task.wait()`, puis vérifier que le personnage existe encore) + encadré explicatif honnête (motif de développeurs, pas décrit tel quel par la doc) |
| 05 | Test 2 (modifier `Pieces` dans un client) | OK (raisonnement) | ReplicatedStorage (changements client non répliqués) | Non testé dans Studio (pas d'accès), cohérent avec la doc |
| 05 | Test 3 (client tricheur) | CORRIGÉ | — | Avec le cooldown d'1 s, « TraineeDoree, 0 » et tout le spam étaient refusés par le cooldown dès « ObjetInexistant » ; ajout de deux `task.wait(1.5)` et résultats attendus détaillés (« Requête invalide », « Cet objet n'existe pas », « Il te manque… », un seul passage sur 20) |
| 05 | Téléportation côté client répliquée | OK | security-tactics (« Modify their player's position ») | Point incertain n° 4 : cohérent avec la doc |
| 05 | Scripts Progression / Pieces / Boutique | OK | — | typeof/taille, cooldown par joueur, distance, PlayerRemoving, pièce désactivée avant récompense, débit + solde + transaction sans yield |
| 05 | Quiz (5 questions) | OK | — | trouve-le-bug : ligne 7 vérifiée |
| Examen | 15 questions | OK | — | Les 3 `trouve-le-bug` (q6, q9, q14) : numéros de ligne vérifiés ; q7 (1 000 octets) confirmée par la référence |

## Erreurs restantes non corrigées
- Aucune dans le module 03.
- Remarque hors périmètre (non modifiée) : `Player:LoadCharacter()` est dépréciée ; si d'autres modules l'utilisent, à signaler à leurs vérificateurs.
- La page officielle `scripting/security/network-ownership` dit encore que Server Authority est « currently in beta », alors que l'annonce officielle du 9 juillet 2026 indique le lancement pour tous les jeux : le texte suit l'annonce, plus récente.
- Les tests 2 et 3 de la leçon 05 et le motif de réapparition n'ont pas pu être exécutés dans Studio. Le raisonnement s'appuie sur l'ordre de chargement documenté dans la référence `Player`.
