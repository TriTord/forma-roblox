# Notes pour les vérificateurs — R5 (Bibliothèque de prompts)

Fichier rédigé : `src/content/lecons/module-02/10-bibliotheque-de-prompts.mdx` (uniquement). Le dossier `module-02/` n'existait pas au démarrage : je l'ai créé.
Date de vérification des faits : 2026-10-24 / 25 (frontmatter `miseAJour: 2026-10-24`, comme demandé par le brief).

## Contenu
- 28 prompts dans des `<Prompt>` (tous au gabarit Contexte / Ce qui existe déjà / Objectif / Fichiers concernés / Contraintes techniques / Sécurité / Cas limites / Vérification, sauf « Lancer la revue » (court, garde Objectif + Vérification) et « Déboguer une erreur » (rubriques de débogage ajoutées : erreur, attendu, obtenu, reproduire, déjà essayé)).
  Démarrage : CLAUDE.md, plan à partir d'un GDD, module Validation (ajouté car beaucoup d'autres prompts en dépendent).
  Obby : checkpoints, kill bricks, pièces, plateformes mobiles. Données : leaderstats, sauvegarde DataStore, classement global.
  Économie : boutique, inventaire/équipement, Game Pass, Developer Product, récompense quotidienne.
  Gameplay : manches, combat épée, zones/portes. Interface : UI mobile, notifications, UI boutique.
  Qualité : audit anti-exploit, sous-agent relecteur (création + lancement), tests, optimisation mobile, analytics. Débogage : erreur.
- Quiz : 6 questions (2 `ameliore-le-prompt`, 1 `trouve-le-bug` « Trouve la faille dans ce code généré par IA », 2 `qcm`, 1 `vrai-faux`).
- Seul code Luau : le `trouve-le-bug` (14 lignes, un seul défaut : pas de vérification de distance). Le bloc ```bash (git add / commit) n'est pas du Luau.

## Cohérence avec les leçons techniques (règles reprises à l'identique)
- 04/04 : 4 couches type/valeur/contexte/débit, `math.isfinite`, client = intention, cooldown par joueur, journaliser sans bannir, module `Validation` dans ServerScriptService (mêmes noms de fonctions : estNombre, estEntier, estTexte, racineVivante, estAPortee, creerCooldown).
- 05/02 : `DonneesJoueurs_v1`, clé `"Joueur_" .. UserId`, API Charger/Obtenir/Sauvegarder/Liberer/SauvegarderTout, 3 tentatives (2 s, 4 s + hasard), échec ≠ nouveau joueur (Kick), UpdateAsync + `{ player.UserId }`, version + completer, refus d'écraser une version plus récente, BindToClose parallèle 25 s, `SAUVEGARDER_EN_STUDIO`, autosave 180 s + random(0, 30), copie de test + Enable Studio Access to API Services, ProfileStore en option.
- 07/03 : un seul ProcessReceipt, ordre joueur présent → données chargées (60 s) → PurchaseId → donner + noter sans attente → Sauvegarder → PurchaseGranted sinon NotProcessedYet ; pas de PromptProductPurchaseFinished ; BindReceiptHandler exclu volontairement (la leçon garde ProcessReceipt) ; test « if false then » ; pas en Team Test.
- 07/02 : UserOwnsGamePassAsync(UserId), PromptGamePassPurchaseFinished côté serveur + wasPurchased, GetProductInfoAsync, test via appel temporaire à accorderPass + test réel dans le jeu publié.
- 05/06 : tween sur CFrame, TweenInfo(Sine, InOut, -1, true, 0), attributs Deplacement/Duree, plateformes horizontales → PrismaticConstraint Servo (pas de tween).
- 06/04 : jour UTC `math.floor(os.time() / 86400)`, pas d'appel DataStore propre, pas de dark patterns.
- 10/01 : ScreenInsets CoreUISafeInsets, coins inférieurs réservés, UITextSizeConstraint, PreferredInput, Device Simulator « Physical size ».
- 09/05 et projet-reference : LogOnboardingFunnelStepEvent, LogFunnelStepEvent(player, nom, nil, etape, nom d'étape), LogEconomyEvent (Source/Sink, montant positif, solde après, `Enum.AnalyticsEconomyTransactionType.X.Name`, SKU), pcall, print dans Studio.
- Noms/chemins : ceux de `projet-reference/` (Boutique, Achats, DemandesAchat, GamePassTrail→`GamePass[NOM]`, Progression, Pieces, KillBricks, PlateformesMobiles, AnalytiqueObby, AnalytiqueEconomie, attributs `Possede_<id>`, `TrailEquipe`, remotes AcheterObjet, EquiperObjet, Notification, DemanderPasserEtape, `.model.json` de InterfaceObby).
- Nouveaux noms inventés par moi (systèmes hors fil rouge) : remotes `AttaquerEpee`, `ReclamerRecompense` ; scripts `Classement`, `Manches`, `AffichageManche`, `CombatEpee`, `ControleEpee`, `PortesZones`, `PortesClient`, `RecompenseQuotidienne`, `Notifications` ; module `Zones` ; attributs `EtatManche`, `FinPhase`, `RecompenseDisponible`, `Zone_<id>` ; champs `dernierJourRecompense`, `zonesDebloquees` ; sous-agent `relecteur-roblox`.

## API Roblox vérifiées (existence, non dépréciées)
Source principale : fichiers YAML de la référence dans le dépôt officiel `github.com/Roblox/creator-docs` (branche main, `content/en-us/reference/engine/...`), téléchargés le 2026-10-25 dans `C:\tmp\phase-ia-R5\` (champ `tags` / `deprecation_message`), + pages create.roblox.com consultées avec WebFetch (OrderedDataStore, AnalyticsService, MarketplaceService, Funnel events, Developer Products, Security tactics). create.roblox.com renvoyait parfois une 502 en curl ; WebFetch passait.
- `DataStoreService:GetOrderedDataStore`, `GetDataStore` : OK. `OrderedDataStore:GetSortedAsync(ascending, pagesize, minValue, maxValue)` : OK ; pagesize « max allowed value is 100 » ; valeurs « must be integers » ; « do not support the optional userIds parameter for SetAsync or IncrementAsync ». `Pages:GetCurrentPage` (entrées `key`/`value`), `AdvanceToNextPageAsync` : OK.
- Limites (error-codes-and-limits.md) : `GetSortedAsync` = OrderedList 5 + n×2 / min ; lectures standard 60 + n×40 → justifie « limite plus basse ». Pas de chiffre écrit dans la page.
- `GlobalDataStore:UpdateAsync`, `SetAsync` : OK. `DataModel:BindToClose` : OK.
- `MarketplaceService` : `ProcessReceipt` (tags vides), `PromptProductPurchase` (tags vides — WebFetch m'a d'abord dit « deprecated », c'était une erreur de lecture : le label appartient à `PromptPremiumPurchase`, vérifié dans le YAML), `UserOwnsGamePassAsync`, `PromptGamePassPurchase`, `PromptGamePassPurchaseFinished`, `GetProductInfoAsync`, `BindReceiptHandler` : OK. **`GetProductInfo` (sans Async) est Deprecated** → écrit dans la page.
- `AnalyticsService:LogFunnelStepEvent(player, funnelName, funnelSessionId, step, stepName, customFields)`, `LogOnboardingFunnelStepEvent`, `LogEconomyEvent`, `LogProgressionEvent`, `LogCustomEvent` : non dépréciés (seuls les anciens `Fire*` le sont). « Limited to 10 unique funnels per experience », steps 1-100. Funnel events : « Events can only be sent from the server and in published games. Events can't be sent from the client or Studio. »
- `TweenService:Create`, `TweenInfo.new`, `Tool.Activated`, `Tool.Equipped`, `Humanoid:TakeDamage` (respecte ForceField, d'après la référence), `Humanoid.Died`, `ScreenGui.ScreenInsets` (enum `CoreUISafeInsets` existe), `UserInputService.PreferredInput` (enum Touch, KeyboardAndMouse…), `ProximityPrompt.Triggered`, `Workspace:GetServerTimeNow`, `Players:GetNameFromUserIdAsync`, `Players:GetPlayerByUserId`, `TextService:FilterStringAsync`, `BasePart.Touched`, `CollectionService:GetTagged` : tous sans tag Deprecated.

## Claude Code (sources consultées le 2026-10-25 + veille du 24/10)
- Mode plan : `Shift+Tab` jusqu'à `⏸ plan mode on`, ou préfixe `/plan` ; Alt+M sous Windows si VT absent (veille) — https://code.claude.com/docs/en/permission-modes
- Sous-agents : `.claude/agents/`, `name` et `description` seuls obligatoires, `tools: Read, Grep, Glob` (chaîne séparée par virgules), invocation en langage naturel ou `@` (« guarantees that subagent runs ») — https://code.claude.com/docs/en/sub-agents
- Skills : `.claude/skills/<nom>/SKILL.md`, `/nom`, `$ARGUMENTS` = texte tapé après la commande — https://code.claude.com/docs/en/skills
- `/code-review` (skill fournie), `@` pour référencer un fichier, `/context` pour vérifier le chargement du CLAUDE.md, CLAUDE.md lu « at the start of every conversation », `/clear` entre tâches, CLAUDE.md < 200 lignes (veille, page memory) — https://code.claude.com/docs/en/best-practices
- Testé : `claude --version` → `2.1.310 (Claude Code)` ; `claude --help` contient bien `--permission-mode`, `--agent`, `--agents`.

## Tests réels sur la machine
- `luau-lsp analyze` (C:\tmp\luau-tools) sur le code du trouve-le-bug : 0 diagnostic (exit 0). Une première version utilisait `require(ServerScriptService.Validation)` → « Unknown require » (pas de sourcemap pour un extrait) : remplacée par un cooldown via attribut.
- `node scripts/verifier-luau.mjs 02` : voir résultat dans la réponse finale (mon extrait sans diagnostic).
- `bash scripts/build-verrou.sh` : build OK (code 0).

## Décisions et points incertains
- Pas de leçon dédiée dans la formation pour : classement global, manches, combat, zones/portes. Prompts écrits d'après la doc API ; signalés comme tels dans la page (« relis bien chaque cas limite »).
- Tests : réaligné sur la leçon 02/06 (parue pendant ma rédaction) : logique pure dans un ModuleScript sans service ni type Roblox, tests `tests/<Module>.spec.luau` lancés avec `lune run`, fonction `verifier(nom, obtenu, attendu)`, `error()` final. Exemple chiffré cohérent avec `Config.recompensePourEtape` de projet-reference (étape 5 = 2 + bonus 10 = 12 ; étape 6 = 3 ; étape 99 = 0).
- Débogage : prompt aligné mot pour mot (à l'adaptation près) sur celui de la leçon 02/07, qui annonce que « la bibliothèque en contient la même version » (Stack Begin / Stack End, préfixe [DEBUG]).
- Plan à partir du GDD : fichiers `GDD.md` et `TACHES.md` à la racine, comme la leçon 02/05.
- Sous-agent : la leçon 02/03 crée `relecteur-roblox` (court) et la 02/06 le complète (11 points). Mon prompt de création est présenté comme « pour un nouveau projet » ; même nom, mêmes outils (Read, Grep, Glob).
- Combat : choix d'un RemoteEvent `AttaquerEpee` avec cible choisie par le client et validée par le serveur (type, cadence, épée équipée, distance + marge). Alternative (détection 100 % serveur) non retenue pour rester dans le schéma « 4 couches » du module 4.
- Zones : la porte est ouverte localement (changement non répliqué) + contrôle serveur périodique de présence dans le volume de la zone. Choix de conception, pas une recette officielle.
- Notifications : le lien renvoie à 06/01 (core-loop), où `MessagesProgression` est introduit (grep), alors que le README de projet-reference le date « 6.1 » : cohérent.
- Les liens internes vers les leçons du module 02 (02 à 07) supposent les slugs du PLAN (`installer-un-workflow-pro`, `claude-code-de-a-a-z`, `l-art-du-prompt-precis`, `decouper-un-gros-projet`, `relire-et-tester-le-code-de-l-ia`, `deboguer-avec-l-ia`). Le build ne vérifie pas les liens internes.
- Les phrases « (leçon 2) Git », « (leçon 3) /clear, skills » supposent le contenu prévu par PLAN.md pour ces leçons.
- `duree: 60` : page de référence longue (28 prompts, ~14 000 mots dont l'essentiel dans les prompts) ; lecture des explications + parcours des prompts, pas application de tous.
