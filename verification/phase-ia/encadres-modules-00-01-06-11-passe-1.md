# Accueil, programme, modules 00, 01 et 06 à 11 (ajouts de la phase IA) — passe 1 (vérificateur V4) — 2026-10-24

Travail réalisé le 2026-10-25. Périmètre : `src/pages/index.astro`, `src/pages/programme.astro`, `src/data/site.ts`, `README.md`, leçons des modules 00, 01, 06 à 11 et examens 00, 06 à 11. Seuls les ajouts depuis `1ffeb8a` ont été vérifiés (`git diff 1ffeb8a`). Les modules 06 à 08 et 09 à 10 ont été vérifiés en parallèle par deux sous-agents du même vérificateur ; leurs lignes sont reprises ci-dessous.

## Résumé

97 éléments vérifiés, 6 corrigés, 9 reformulés, 0 supprimé.

**Quiz et examens** : 22 nouvelles questions de leçon et 15 nouvelles questions d'examen, dans les examens 00 et 06 à 11.
- Chaque `trouve-le-bug` a été recompté à la main : un seul défaut, à la bonne ligne.
- Chaque `ameliore-le-prompt` a une seule meilleure version.
- 1 explication fausse corrigée (01/05).
- 1 libellé reformulé (10/03).

**Code** :
- Extrait Luau de l'accueil réécrit, pour qu'il corresponde au prompt Rojo affiché juste au-dessus.
- `verifier-luau` : aucun diagnostic réel.
  - 00 : 4 extraits. 2 diagnostics sur les défauts volontaires des q14 et q15 de l'examen, inchangés depuis la phase 1.
  - 01 : 9 extraits, 0 diagnostic.
  - 06 : 19 extraits. 6 diagnostics : des « Unknown require » (pas de sourcemap) et des `ImportUnused`/`FunctionUnused` sur des extraits partiels.
  - 07 : 18 extraits. 1 « Unknown require ».
  - 08 : 12 extraits. 1 diagnostic sur le défaut volontaire du quiz 08/03.
  - 09 : 11 extraits, 0 diagnostic.
  - 10 : 22 extraits. 2 « Unknown require » de la phase 1.
  - 11 : 14 extraits, 0 diagnostic.
- Aucun Studio n'est connecté : aucune exécution en jeu réel.

**Tests réels** :
- **luau-lsp** sur le nouvel extrait de l'accueil, dans `C:\tmp\phase-ia-V4\` : 0 diagnostic en mode non strict, celui des autres extraits du site.
- **selene et StyLua**, sur une copie de `projet-reference/` :
  - `selene --version` affiche 0.32.0 et `stylua --version` 2.6.0 ;
  - `selene src` affiche `0 errors / 0 warnings / 0 parse errors` ;
  - `stylua --check src` se termine avec le code 0.
  
  Ce sont les commandes citées dans les prompts et dans la checklist 11/04.
- **Build** : `bash scripts/build-verrou.sh` se termine avec le code 0 (80 pages indexées). Le rendu de `dist/index.html` a été contrôlé.
- **Liens internes** : tous les liens `/modules/XX/slug/` du contenu et des pages ont été comparés aux fichiers existants, aucun ne manque.

**Sources ouvertes le 2026-10-25** :
- claude.com/pricing ;
- code.claude.com/docs/en/setup ;
- code.claude.com/docs/en/best-practices ;
- anthropic.com/legal/consumer-terms ;
- create.roblox.com/docs/assistant/guide ;
- référence MarketplaceService ;
- AnalyticsService ;
- creator-docs (`DataModel.yaml`, `GroupService.yaml`, `Player.yaml`, `PolicyService.yaml`, `MarketplaceService.yaml`).

**Mac** : rien de propre à Mac n'a été ajouté dans ce périmètre, hors configuration requise. « macOS 13.0+ » a été confirmé sur code.claude.com/docs/en/setup ; aucun test sur Mac n'était possible.

## Détail

| Leçon | Affirmation / élément | Verdict (OK / CORRIGÉ / REFORMULÉ / SUPPRIMÉ) | Source | Commentaire |
|---|---|---|---|---|
| Accueil | Héros : prompt « projet Rojo » suivi de l'extrait « un Script dans chaque checkpoint » (`script.Parent`, attribut `Etape`), titré `Checkpoint.server.luau` | CORRIGÉ | `projet-reference/src/ServerScriptService/Progression.server.luau` ; conventions du brief (leaderstats `Etape`) | Le code ne pouvait pas sortir de ce prompt. Dans un projet Rojo, aucun Script ne vit dans les Parts du Workspace, et la convention du projet est `leaderstats.Etape`, pas un attribut. L'extrait devient un seul Script serveur qui parcourt `Workspace.Checkpoints` (avec `IsA("BasePart")`) et lit/écrit `leaderstats.Etape`, sous le titre `Progression.server.luau`. Le prompt gagne « leaderstats.Etape existe déjà » et « Fichiers concernés : crée src/ServerScriptService/Progression.server.luau ». luau-lsp : 0 diagnostic |
| Accueil | Prompt vague/précis « pièces » : `Config.VALEUR_PIECE`, réapparition au bout de 10 s, leaderstats créées par `GestionJoueurs.server.luau`, distance, contacts multiples | OK | `projet-reference` (`Config.luau`, `Pieces.server.luau`, `GestionJoueurs.server.luau`) | |
| Accueil (FAQ) | Claude Code : offre payante nécessaire, l'offre gratuite ne l'inclut pas | OK | code.claude.com/docs/en/setup (« The free claude.ai plan does not include Claude Code access ») ; claude.com/pricing | |
| Accueil (FAQ) et 00/01 | Prix : Pro à 20 $/mois en paiement mensuel, 17 $/mois en annuel (200 $ d'avance), Max « à partir de 100 $ », formulés « au moment de la rédaction (octobre 2026) » | OK | claude.com/pricing (aucune date sur la page) | `miseAJour: 2026-10-24` est présent dans 00/01 |
| Accueil (FAQ), 00/01, 01/05, examen 00 | Règle d'âge (décision 38) : 18 ans et plus, sans exception parentale, avec les 3 alternatives | OK | anthropic.com/legal/consumer-terms (« You must be at least 18 years old », en vigueur depuis le 8 oct. 2025, aucune clause parentale) | Formulation commune reprise mot pour mot ; aucune mention d'une utilisation par un mineur avec l'accord d'un parent |
| Accueil (FAQ) | Assistant de Studio : « ni prix ni abonnement » indiqués ; « quelques limites d'usage » | OK | create.roblox.com/docs/assistant/guide (50 modèles procéduraux par 24 h glissantes, 8 parties par modèle) | Rien d'autre n'est affirmé |
| Accueil, programme, 00/01, 00/05 | « Chaque leçon technique comporte un encadré Avec Claude Code » | OK | décompte du dépôt | Toutes les leçons des modules 03 à 11 qui contiennent du code Luau ont un `<AvecClaudeCode>` |
| Accueil, programme, README, 00/01 | 12 modules numérotés de 0 à 11 ; nombre de leçons calculé (`lecons.length`, 68 fichiers) | OK | `src/data/modules.ts` ; `src/content/lecons/` | Aucun nombre de leçons écrit en dur |
| Accueil, programme | Liens vers le module 02 et la bibliothèque de prompts (URL calculées, avec repli) | OK | `src/content/lecons/module-02/10-bibliotheque-de-prompts.mdx` | |
| Accueil | FAQ « matériel » : terminal déjà présent, installation Windows et Mac au module 2 | OK | code.claude.com/docs/en/setup | |
| Accueil | Engagement d'honnêteté, « pas de promesse », chiffres DevEx de la phase 1 | OK | (phase 1) | Aucune promesse |
| Programme, site.ts, README | Description, paragraphe sur la méthode, nombre de modules, composants `AvecClaudeCode` et `Prompt` | OK | `src/components/mdx/` | |
| 00/01 | Tableau des modules 0 à 11, renuméroté | OK | `src/data/modules.ts` | |
| 00/01 | Exemple de prompt vague/précis (checkpoints) ; lien vers la bibliothèque | OK | | Le lien existe |
| 00/01 | Configuration requise de Claude Code : Windows 10 1809+ / macOS 13+, 4 Go de RAM, connexion Internet | OK | code.claude.com/docs/en/setup | |
| 00/01 | « le module 2 compare les outils » (dont l'Assistant de Studio) | OK | 02/01 (23 mentions de l'Assistant) | |
| 00/01 | Quiz qcm « ton rôle » ; Q1 corrigée à « 12 » | OK | | Une seule bonne réponse |
| 00/01 | Sources ajoutées (setup, pricing, consumer-terms, assistant/guide) | OK | pages ouvertes | |
| 00/03 | Citations « Claude stops when the work looks done », « If you can't verify it, don't ship it » | OK | code.claude.com/docs/en/best-practices | Citations exactes |
| 00/03 | Quiz qcm « bon état d'esprit » | OK | | |
| 00/05 | Carte des modules 0 à 11, phrase sur CLAUDE.md (« lu au début de chaque session ») | OK | best-practices (« CLAUDE.md is a special file that Claude reads at the start of every conversation ») | |
| 00/05 | Quiz qcm « à quel module ? » (module 2) | OK | PLAN.md | |
| Examen 00 | Nouvelle `ameliore-le-prompt` (kill bricks) ; explication de la Q1 (abonnement, 18 ans) | OK | | Une seule meilleure version |
| 01/03 | Encadré « Aperçu : Compter les plateformes » | REFORMULÉ | référence Instance:WaitForChild (le délai renvoie `nil`) ; code de la leçon | Le prompt ajoute à la leçon un délai de 10 s et un `warn`. J'ai ajouté une puce « À vérifier » : avec un délai, `WaitForChild` renvoie `nil`, et le code doit tester ce `nil` avant `GetChildren` |
| 01/03 | Quiz `ameliore-le-prompt` (compter les plateformes) | OK | | |
| 01/04 | Encadré « Comprendre une erreur de l'Output » (script de la SpawnLocation, F5, Server & Clients à 2 clients) et 3 puces | OK | code de la leçon (`FindFirstChildOfClass("SpawnLocation")`, « Point de départ trouvé ») | |
| 01/04 | Quiz `ameliore-le-prompt` (erreur de l'Output) | OK | | |
| 01/05 | Encadré « Vérifier l'ancrage des plateformes » : prompt et 5 puces | OK | code de la leçon (`GetDescendants`, `IsA("BasePart")`, `not objet.Anchored`, `GetFullName`) et quiz `trouve-le-bug` de la leçon | Le prompt décrit exactement le code enseigné |
| 01/05 | Explication de la nouvelle `ameliore-le-prompt` : « ancrer toutes les Parts casserait les futures plateformes mobiles » | CORRIGÉ | `projet-reference/src/ServerScriptService/PlateformesMobiles.server.luau` (`plateforme.Anchored = true`) ; leçon 05/06 | C'était faux : les plateformes mobiles animées par TweenService **doivent** être ancrées. Nouvelle raison : ancrer d'office modifie le niveau sans contrôle, y compris des objets qu'on voudrait laisser bouger avec la physique, et ce n'est plus une vérification |
| 01/05 | Section « La suite : scripter avec l'IA » et Info « Avant le module 2 » | OK | consumer-terms ; setup | |
| 06/01 | Encadré `MessagesProgression.client.luau` (ScreenGui `RetourBoucle`, `ResetOnSpawn`, `task.delay` de 3 s, `Notification.OnClientEvent`) | OK | code de la leçon ; projet-reference `MessagesProgression.client.luau`, `Progression.server.luau` | |
| 06/01 | Quiz `ameliore-le-prompt` (feedback) | OK | leçon | |
| 06/02 | Encadré `GuideCheckpoint` et `IndiceDepart` (Beam, `ETAPES_GUIDEES = 2`, `DELAI_INDICE = 15`) | OK | code de la leçon ; projet-reference | |
| 06/02 | Quiz `ameliore-le-prompt` (onboarding) | OK | leçon | |
| 06/03 | Encadré « Récompenses par palier », rubrique Contraintes : « un Script "Recompenses" existe déjà » | REFORMULÉ | projet-reference (`RecompensesEtapes.luau`, `Progression.server.luau`) | Ce script n'existe pas dans le projet Rojo. Remplacé par « jamais Recompenses (un Script d'exemple de ce nom peut exister depuis le module 4) ». Valeurs 12/13/15/0 recalculées : justes |
| 06/03 | Quiz `trouve-le-bug` « faille IA » `EtapeAtteinte` (ligne 9) | OK | décompte à la main | Un seul défaut |
| 06/04 | Encadré `ObjectifsQuotidiens` et branchement dans `Pieces` | OK | projet-reference `Pieces.server.luau`, `ObjectifsQuotidiens.luau` | « 3e pièce = 1 + 15 » est juste |
| 06/04 | Quiz `ameliore-le-prompt` (quotidien) | OK | leçon | |
| 06/05 | Encadré `SuiviPlaytest.server.luau` | OK | code de la leçon | |
| 06/05 | Quiz `ameliore-le-prompt` (playtest) | OK | leçon | |
| Examen 06 | qcm relecture de `RecompensesEtapes.valider` ; `trouve-le-bug` `PieceRamassee` (ligne 8) | OK | leçon 06/03 ; décompte à la main | |
| 07/02 | Encadré Game Pass (`UserOwnsGamePassAsync` dans un `pcall` avec 3 tentatives, `PromptGamePassPurchaseFinished` côté serveur, `GetProductInfoAsync` et `PriceInRobux`, bouton Rojo avec `init.meta.json`) | OK | référence MarketplaceService (signatures, aucune dépréciation) ; projet-reference `GamePassTrail.server.luau` | |
| 07/02 | Quiz `trouve-le-bug` `PassAchete` (ligne 8) | OK | décompte à la main | |
| 07/03 | Encadré Developer Product (mode plan, `ProcessReceipt` idempotent sur `PurchaseId` dans `donnees.achats`, `PurchaseGranted` seulement après une sauvegarde réussie, pas de `BindReceiptHandler`) | OK | projet-reference `Achats.server.luau`, `DemandesAchat.server.luau`, `DonneesJoueurs.luau`, `default.project.json` | |
| 07/03 | Quiz `ameliore-le-prompt` (`ProcessReceipt`) | OK | creator-docs `MarketplaceService.yaml` (« Do not use PromptProductPurchaseFinished … to process purchases ») | |
| 07/04 | Encadré Nuage+ (`GetUserSubscriptionStatusAsync(player, id)`, `IsSubscribed`, `PolicyService`, `UserSubscriptionStatusChanged`) | OK | référence MarketplaceService ; `PolicyService.yaml` | |
| 07/04 | Quiz `ameliore-le-prompt` (abonnement) | OK | leçon | |
| 07/05 | Encadré bouton « Passer l'étape » (`InfoType.Product`, `pcall`, `FireServer()` sans argument) | OK | projet-reference `BoutonPasserEtape/ScriptBouton.client.luau` | |
| 07/05 | Quiz `ameliore-le-prompt` (éthique) | OK | leçon | |
| Examen 07 | qcm « `PurchaseGranted` à 3 endroits » ; `trouve-le-bug` LocalScript qui pose l'attribut (ligne 12) | OK | `Achats.server.luau` ; décompte à la main | |
| 08/03 | Encadré `SourcesArrivee` (`GetJoinData().LaunchData`) | OK | creator-docs `Player.yaml` | |
| 08/03 | Quiz `ameliore-le-prompt` (données de lancement) | OK | leçon | |
| 08/04 | Encadré « annonce de redémarrage », rubrique Vérification | CORRIGÉ | creator-docs `DataModel.yaml` ; leçon (option « Restart only servers with outdated versions ») | Avec l'option conseillée par la leçon, un serveur rejoint après la publication est à jour : il ne redémarre pas, et aucune annonce n'apparaît. Le test devient : rejoindre, publier une modification, puis lancer Restart Servers avec cette option et un délai de 2 min |
| 08/04 | Quiz `ameliore-le-prompt` (redémarrage) | OK | leçon | |
| 08/05 | Encadré `RolesCommunaute`, rubrique Vérification : « avec l'ID à 0, un avertissement s'affiche » | REFORMULÉ | creator-docs `GroupService.yaml` | La documentation ne dit pas ce qui se passe avec un groupe invalide. Remplacé par « aucune erreur bloquante (soit un avertissement, soit l'attribut RoleCommunaute = "Joueur") » |
| 08/05 | Quiz `trouve-le-bug` `ExpulserJoueur` (ligne 7) | OK | décompte à la main | |
| Examen 08 | `trouve-le-bug` `GetRankInGroup` déprécié (ligne 6) ; qcm « refuser `DonneesJoueurs_v2` » | OK | `Player.yaml` (deprecation_message) ; `DonneesJoueurs.luau` | |
| 09/04 | Intro de l'encadré : « une IA fait très souvent la moyenne des ARPPU » | REFORMULÉ | brief (pas de statistique inventée) | Devient « peut très bien » |
| 09/04 | Prompt « Calculatrice de monétisation », rubrique Vérification : « 2,0 %, 75,0 Robux » | CORRIGÉ | code de la leçon (`string.format("%.1f")` écrit un point décimal) | Devient « 2.0 %, 75.0 Robux et 1.50 Robux », avec la précision sur le point |
| 09/04 | Reste du prompt (`outils/` hors de `src/`) et 5 puces | OK | leçon 09/04 | |
| 09/04 | Quiz `trouve-le-bug` « moyenne des ARPPU » (ligne 11) | OK | décompte et calcul à la main | |
| 09/05 | Intro de l'encadré : « invente ses propres étapes (souvent dans le désordre) » | REFORMULÉ | brief | Devient « risque d'inventer » |
| 09/05 | Prompt « Entonnoirs », rubrique Ce qui existe déjà | REFORMULÉ | projet-reference (GestionJoueurs, RecompensesEtapes, Achats) | Précise qui crée et qui modifie `Etape` |
| 09/05 | Prompt : étapes 1 à 5 de l'onboarding, `ProgressionObby`, `funnelSessionId` à nil, `LogEconomyEvent`/`LogCustomEvent`, `pcall`, `IsStudio` | OK | référence AnalyticsService ; `AnalytiqueObby.server.luau` | API actuelles, ordre des paramètres vérifié |
| 09/05 | Prompt, rubrique Vérification : ordre des lignes dans l'Output | CORRIGÉ | script de la leçon | L'ordre annoncé était faux : le script fait alterner l'onboarding et la progression à chaque checkpoint |
| 09/05 | 6 puces ; quiz `ameliore-le-prompt` (analytics) | OK | leçon 09/05 | |
| Examen 09 | `trouve-le-bug` événement d'économie enregistré avant la vérification du solde ; `ameliore-le-prompt` entonnoir de boutique | OK | leçon 09/05 ; référence AnalyticsService | |
| 10/01 | Encadré « Audit mobile et AdaptationMobile » et quiz | OK | leçon ; projet-reference `AdaptationMobile.client.luau` | |
| 10/02 | Encadré « Repérer et étiqueter » (`debug.profilebegin`/`profileend` fermés sur tous les chemins, fiche de mesure vide) et quiz | OK | leçon 10/02 | Mesure avant/après, sans optimisation à l'aveugle |
| 10/03 | Encadré « Audit streaming » | OK | leçon 10/03 | |
| 10/03 | Quiz `trouve-le-bug` `GetChildren` sans `ChildAdded` (ligne 7) | REFORMULÉ | décompte à la main | « Restent gris » devient « gardent leur couleur d'origine » ; formulation sans statistique |
| 10/04 | Intro de l'encadré : « change dix choses à la fois » | REFORMULÉ | brief | Devient « risque de » |
| 10/04 | Prompt « Rotation des pièces côté client » (`PreRender`, `deltaTime`, `ChildAdded`/`ChildRemoved`, mesure avant/après) et quiz | OK | leçon 10/04 ; projet-reference `PiecesTournantesClient.client.luau` | |
| 10/05 | Encadré « Audit de performance du code » et quiz | OK | leçon 10/05 | |
| Examen 10 | `trouve-le-bug` CanCollide/CanTouch/CanQuery (ligne 5) ; `ameliore-le-prompt` « l'IA propose, tu mesures » | OK | leçons 10/02 et 10/04 | |
| 11/02 | Encadré « Audit des erreurs techniques » : 6 parties = les 6 erreurs de la leçon ; fichiers cités, tous présents dans projet-reference | OK | leçon (titres Erreur 1 à 6) ; `projet-reference/src/ServerScriptService/` | |
| 11/02 | Puce « l'IA ne lit que `src/` » | REFORMULÉ | module 02 (serveur MCP de Studio) | Devient « avec ce prompt, l'IA ne lit que `src/` » : avec le serveur MCP de Studio, elle peut lire davantage |
| 11/02 | Quiz `trouve-le-bug` `EquiperObjet` sans vérification de possession (ligne 13) | OK | décompte à la main ; projet-reference `Boutique.server.luau`, `Validation.luau` | 15 lignes, un seul défaut |
| 11/04 | Prompt, point Monétisation : « PurchaseGranted… jamais deux fois pour le même achat » | CORRIGÉ | projet-reference `Achats.server.luau` (lignes 82-90) | Formulation ambiguë : pour un `PurchaseId` déjà noté, il **faut** renvoyer `PurchaseGranted` sans redonner. Devient : « après avoir fait passer l'étape, noté le PurchaseId et sauvegardé, et qui n'accorde jamais deux fois le même achat (PurchaseId déjà noté : on confirme sans redonner) » |
| 11/04 | Autres points du prompt (API dépréciées, `DonneesJoueurs_v1`/`Joueur_`, `BindToClose`, sauvegarde périodique, AnalyticsService côté serveur, `FilterStringAsync`, secrets) et 5 puces | OK | projet-reference (`GestionJoueurs.server.luau` l.68 et 79) ; leçon 09/05 | |
| 11/04 | 5 nouvelles cases de la checklist « Si tu as écrit une partie du code avec Claude Code » | OK | 02/02 (`selene src`, `stylua --check src`, `git status`) ; 02/08 (API dépréciées, `LoadAnimation`) ; 02/01 (`.ROBLOSECURITY`) ; test réel de selene et StyLua | Les liens 02/02, 02/06 et 02/08 existent |
| 11/04 | « Les cases se cochent sur cette page et restent cochées dans ce navigateur » | OK | `plugins/taches.mjs`, `src/scripts/taches.ts` (`localStorage`) | |
| 11/04 | Quiz `ameliore-le-prompt` (checklist) | OK | | |
| Examen 11 | qcm « revue du code généré » (4 bonnes réponses sur 5) | OK | | |
| Examen 11 | `trouve-le-bug` texte filtré jeté (ligne 13) | OK | create.roblox.com/docs/ui/text-filtering ; décompte à la main | Un seul défaut, les lignes 5, 6 et 10 sont correctes |

## Erreurs restantes non corrigées

Aucune.

Remarques sans correction :
- Les diagnostics de `verifier-luau` encore listés viennent tous de la phase 1, ou sont des défauts volontaires de `trouve-le-bug`.
- Les prix en dollars viennent d'une page sans date. Ils sont datés « octobre 2026 » et renvoient vers la page officielle.
