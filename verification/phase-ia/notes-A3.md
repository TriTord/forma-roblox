# Notes de l'adaptateur A3 (phase IA) — modules 06, 07, 08

Date : 2026-10-24/25. Périmètre : leçons avec code Luau des modules 06 (01 à 05), 07 (02 à 05), 08 (03 à 05) et examens `module-06.yaml`, `module-07.yaml`, `module-08.yaml`. Aucune autre leçon touchée. Pas de commit.

## Ce qui a été ajouté

Dans chacune des 12 leçons :
- un encadré `<AvecClaudeCode>` au format du brief (intro, `<Prompt>` avec bloc `text` au gabarit en 8 rubriques, « À vérifier dans le code produit » avec 4 à 6 puces), placé juste après l'explication du code concerné ;
- une phrase de rappel de la méthode à l'endroit où la leçon dit « crée / colle ce script », avec le chemin du fichier dans le projet Rojo ;
- une question de quiz liée à l'encadré.

| Leçon | Système demandé dans le prompt | Question ajoutée | Total quiz |
|---|---|---|---|
| 06/01 | `MessagesProgression.client.luau` | ameliore-le-prompt | 6 |
| 06/02 | `GuideCheckpoint.client.luau` + `IndiceDepart.client.luau` | ameliore-le-prompt | 6 |
| 06/03 | `Config.luau` (piecesParEtape, BONUS, recompensePourEtape) + `RecompensesEtapes.luau` + branchement dans `Progression` (mode plan) | trouve-le-bug « faille IA » (RemoteEvent `EtapeAtteinte` qui croit le client) | 6 |
| 06/04 | `ObjectifsQuotidiens.luau` + branchement dans `Pieces` | ameliore-le-prompt | 6 |
| 06/05 | `SuiviPlaytest.server.luau` | ameliore-le-prompt | 6 |
| 07/02 | `GamePassTrail.server.luau` + `BoutonTrailDore/ScriptBouton.client.luau` | trouve-le-bug « faille IA » (RemoteEvent `PassAchete`) | 6 |
| 07/03 | `DemandesAchat` + `Achats` (ProcessReceipt idempotent) + `achats = {}` / `VERSION_DONNEES` + remote dans `default.project.json` (mode plan) | ameliore-le-prompt | 7 |
| 07/04 | `Abonnements.server.luau` + `calculerGain` dans `Pieces` + `BoutonNuagePlus` | ameliore-le-prompt | 6 |
| 07/05 | `BoutonPasserEtape/ScriptBouton.client.luau` | ameliore-le-prompt | 6 |
| 08/03 | `SourcesArrivee.server.luau` | ameliore-le-prompt | 6 |
| 08/04 | `Redemarrage.server.luau` + `AffichageRedemarrage.client.luau` + remote | ameliore-le-prompt | 6 |
| 08/05 | `RolesCommunaute.server.luau` | trouve-le-bug « faille IA » (RemoteEvent `ExpulserJoueur` autorisé par `~= "Joueur"`) | 6 |

Examens (2 questions chacun, sur la relecture de code généré par IA) :
- 06 : 13 → 15 (qcm « point de relecture prioritaire de `RecompensesEtapes.valider` » ; trouve-le-bug « faille IA » : RemoteEvent `PieceRamassee` qui compte les pièces sur parole du client).
- 07 : 14 → 16 (qcm « `PurchaseGranted` trouvé à 3 endroits » ; trouve-le-bug « faille IA » : LocalScript qui vérifie le Game Pass et pose l'attribut lui-même).
- 08 : 14 → 16 (trouve-le-bug : API dépréciée `Player:GetRankInGroup` proposée par l'IA ; qcm : refuser le passage à `DonneesJoueurs_v2` proposé dans un plan).

## Correction d'une erreur avérée (contenu de phase 1)

- `module-08/04-mises-a-jour-et-evenements.mdx`, commentaire du bloc `DonneesJoueurs` : « 1 au module 5, **3** au module 7 (achats), 3 ici » corrigé en « 1 au module 5, **2** au module 7 (achats), 3 ici ». Source : `projet-reference/src/ServerScriptService/DonneesJoueurs.luau`, ligne 8 (« 1 = module 5 ; 2 = champ achats (module 7) ; 3 = champ zoneOragesDebloquee (module 8) ») et leçon 07/03 (« de 1 à 2 »).

## Décisions

- **Noms de scripts absents de la leçon** : 08/03 et 08/05 ne nommaient pas leur Script. J'ai choisi `SourcesArrivee` et `RolesCommunaute` et je l'ai écrit dans la leçon (une phrase) pour que le prompt et la leçon disent la même chose. Ces scripts ne sont pas dans `projet-reference/` (le README ne les liste pas) ; je n'ai pas modifié `projet-reference/` (hors périmètre). Même chose pour `SuiviPlaytest` (06/05, nommé par la leçon), `Abonnements` et `BoutonNuagePlus` (07/04, présentés comme « imaginons ») : volontairement absents du corrigé.
- **Boutons en Rojo** : un TextButton est décrit comme un dossier avec `init.meta.json` (`"className": "TextButton"`) contenant `ScriptBouton.client.luau`, exactement comme `projet-reference/src/StarterGui/InterfaceObby/Boutique/Liste/BoutonTrailDore/`.
- **RemoteEvents** : déclarés dans `default.project.json` (convention du brief et de `projet-reference`). Les prompts de 07/03 et 08/04 demandent l'ajout de `DemanderPasserEtape` et `AnnonceRedemarrage`.
- **Mode plan** : demandé (« Commence par me proposer un plan (mode plan), sans modifier de fichier. ») pour les deux prompts qui modifient des fichiers existants en plus d'en créer (06/03, 07/03), conformément au brief.
- **Prompt 07/03** : impose `ProcessReceipt` (motif du guide officiel enseigné dans la leçon) et exclut `BindReceiptHandler` pour que l'IA ne produise pas une variante.
- **Prompt 06/04** : couvre l'objectif quotidien (système principal de la leçon), pas `ProposerNotifications` (un prompt = une tâche, cf. module 02).
- **Prompt 08/04** : couvre l'annonce de redémarrage ; la migration de sauvegarde (`zoneOragesDebloquee`) est traitée par la question d'examen 08 « refuser `DonneesJoueurs_v2` ».
- Quiz : mélange `ameliore-le-prompt` (9) et `trouve-le-bug` « faille IA » (3) ; chaque `trouve-le-bug` a un seul défaut, ligne indiquée vérifiée à la main (numérotation depuis la 1re ligne du bloc `code`).
- Commandes de vérification citées dans les prompts : `selene src` et `stylua --check src`, reprises telles quelles du brief commun (section CLAUDE.md). Je n'ai pas revérifié leur syntaxe (déjà signalée « non vérifiée » dans la veille Claude Code) : à confirmer par l'auteur de la leçon 02/02.

## Affirmations factuelles et sources

Aucune nouvelle affirmation factuelle sur Roblox ou Claude Code n'a été ajoutée : les prompts et les puces reprennent les API, noms et règles déjà vérifiés en phase 1 dans chaque leçon (sources listées dans leurs `<Sources>`). Points précis :
- `UserOwnsGamePassAsync(userId, gamePassId)`, `PromptGamePassPurchaseFinished(player, id, wasPurchased)` côté serveur, `GetProductInfoAsync(id, Enum.InfoType.GamePass|Product)` et `PriceInRobux` : leçon 07/02 et 07/05, https://create.roblox.com/docs/reference/engine/classes/MarketplaceService. `PromptProductPurchase`, `ProcessReceipt` et `UserOwnsGamePassAsync` non dépréciés : veille Roblox IA, section I.
- `ProcessReceipt` : ordre vérifier / donner / noter / sauvegarder / confirmer : leçon 07/03, https://create.roblox.com/docs/cloud-services/data-stores/player-data-purchasing.
- `GetUserSubscriptionStatusAsync(player, id)` → `IsSubscribed`, `Players.UserSubscriptionStatusChanged`, `PolicyService.IsEligibleToPurchaseSubscription`, `PromptSubscriptionPurchase` : leçon 07/04, https://create.roblox.com/docs/production/monetization/subscriptions.
- `game.ServerRestartScheduled` (`restartTime` en `DateTime`, `Enum.CloseReason.DeveloperUpdate`) : leçon 08/04, https://create.roblox.com/docs/reference/engine/classes/DataModel#ServerRestartScheduled.
- `GroupService:GetRolesInGroupAsync` ; `Player:GetRankInGroup` / `GetRoleInGroup` et variantes `Async` dépréciées : leçon 08/05 et veille Roblox IA section I (https://create.roblox.com/docs/reference/engine/classes/Player).
- `Player:GetJoinData().LaunchData` lisible dans l'adresse du lien : leçon 08/03. Dans l'explication du quiz, je n'affirme pas que `GetJoinData` est réservé au serveur (non revérifié) : formulation « se lit côté serveur avec `GetJoinData`, comme dans la leçon ».
- Un attribut modifié par un LocalScript n'est pas répliqué au serveur (examen 07) : règle générale de réplication enseignée au module 4 (« les changements faits côté client ne sont pas répliqués au serveur »).
- Studio ne simule pas l'achat de passes ; `ProcessReceipt` non appelé en Team Test : leçons 07/02 et 07/03 (sources citées dans ces leçons), repris dans les rubriques « Vérification ».
- « Mode plan » : veille Claude Code §4 (mode de permission « plan »).

## Tests réellement effectués

1. `node scripts/verifier-luau.mjs 06|07|08` avant et après modification.
   - Avant : 06 → 4 extraits avec diagnostics (tous « Unknown require » sans sourcemap, `ImportUnused`/`FunctionUnused` sur extraits partiels) ; 07 → 1 (« Unknown require ») ; 08 → 1 (le `.GetJoinData()` volontaire du quiz).
   - Après : 06 → 19 extraits, 6 avec diagnostics : les 4 anciens + `03-progression-et-recompenses.mdx#quiz6` et `examens/module-06.yaml#q15`, uniquement « Unknown require » (même cause : pas de sourcemap pour `require(ServerScriptService:WaitForChild(...))`). 07 → 18 extraits, inchangé (1). 08 → 12 extraits, inchangé (1, le bug volontaire). Aucun nouveau diagnostic réel. Les défauts volontaires des nouveaux `trouve-le-bug` sont logiques (sécurité, API dépréciée), donc invisibles pour luau-lsp, ce qui est attendu.
2. Rojo 7.7.0-rc.1 (`~/.rokit/bin`), dans `C:\tmp\phase-ia-A3\test` (copie de `projet-reference/` + fichiers factices `SourcesArrivee.server.luau`, `RolesCommunaute.server.luau`, `SuiviPlaytest.server.luau`, `Abonnements.server.luau`, dossier `BoutonNuagePlus/` avec `init.meta.json` `{ "className": "TextButton" }` et `ScriptBouton.client.luau`) :
   - `rojo sourcemap default.project.json -o sm.json` : les `.server.luau` donnent des `Script`, `BoutonNuagePlus` est un `TextButton` et son `ScriptBouton` un `LocalScript` ;
   - `rojo build default.project.json -o t.rbxlx` : réussi ; 6 RemoteEvents, dont `DemanderPasserEtape` et `AnnonceRedemarrage`, déclarés via `default.project.json`.
3. `bash scripts/build-verrou.sh` (2026-10-25 00:46) : code de sortie 0, 96 pages construites ; les pages 06/core-loop, 07/developer-products et 08/communaute contiennent bien leur `<Prompt>`.

## Points incertains

- Syntaxe exacte de `selene src` / `stylua --check src` (reprise du brief, non testée ici).
- Les libellés « Configurations > Server management » (08/04) et la méthode de test de `ServerRestartScheduled` reprennent la leçon de phase 1 ; non revérifiés sur un vrai jeu publié.
- Les prompts supposent un `CLAUDE.md` conforme au modèle de la leçon 02/03 (écrite en parallèle par un autre agent) : ils y renvoient (« voir CLAUDE.md ») sans le recopier.
