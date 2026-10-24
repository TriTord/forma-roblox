# Module 06 — passe 2 (vérificateur indépendant : ProcessReceipt, chiffres, API, quiz) — 2026-10-24

> **Note (phase IA, 2026-10-24)** : ce rapport a été écrit quand ce module portait le numéro 06. Un module 02 « Scripter avec l'IA » a ensuite été inséré : dans le texte ci-dessous, les numéros de modules et les chemins suivent l'**ancienne** numérotation (ancien module N ≥ 2 = nouveau module N + 1).

## Résumé
Environ 160 affirmations revérifiées (6 leçons + examen), 14 corrigées / reformulées / précisées, 1 supprimée (DataStore séparé `AchatsTraites_v1`, remplacé) ; 1 question de quiz ajoutée (L3), 1 question d’examen réécrite (Q5) ; 32 liens testés (29 en HTTP 200 avec curl ; les 3 pages de référence API qui renvoient 502 à curl ont été confirmées par WebFetch et par leur YAML source).
Quiz : 31 questions de leçon + 14 d’examen relues ; 0 bonne réponse fausse trouvée ; lignes des `trouve-le-bug` revérifiées (L2 Q4 ligne 6 ; L3 Q6 ligne 9 ; L4 Q4 ligne 9 ; L5 Q4 ligne 8 ; examen Q3 ligne 7 et Q7 ligne 7), un seul bug chacun.
Code : `node scripts/verifier-luau.mjs 06` → 16 extraits, 1 diagnostic acceptable (`Unknown require: game/ServerScriptService/DonneesJoueurs` : `require` du ModuleScript du module 4, même cas que module 05 avec `Config`). Build `bash scripts/build-verrou.sh` : OK (code 0).

Méthode : sources lues dans le dépôt officiel `Roblox/creator-docs` (commit 4e795e6 du 2026-10-24, source de create.roblox.com/docs, YAML de la référence API compris), help center via l’API Zendesk publique (`/api/v2/help_center/.../articles/ID.json`), DevForum via JSON Discourse, WebFetch / curl pour les pages en ligne.

## Point principal : ProcessReceipt (leçon 03)
La passe 1 gardait un motif « enregistrer le `PurchaseId` dans un DataStore séparé (`AchatsTraites_v1`) puis donner l’effet », avec une limite assumée : achat noté comme traité mais effet perdu si le joueur part pendant l’`UpdateAsync` ou si le serveur plante avant la sauvegarde suivante. Ce motif contredit le guide officiel « Implement player data and purchasing systems », qui exige AVANT `PurchaseGranted` : (1) vérifier que le `PurchaseId` n’est pas déjà noté, (2) donner l’achat dans les données du joueur en mémoire, (3) noter le `PurchaseId` dans ces mêmes données, (4) sauvegarder ; `PurchaseGranted` si la sauvegarde réussit, sinon `NotProcessedYet`.

Réécriture (niveau débutant/intermédiaire, cohérente avec le module 04) :
- utilise le ModuleScript `DonneesJoueurs` du module 4 (`Obtenir`, `Sauvegarder` qui renvoie un booléen ; DataStore `DonneesJoueurs_v1`, clé `Joueur_<UserId>`) ; nouveau champ `achats` (`PurchaseId` → `true`) dans la même table, à ajouter dans `donneesParDefaut()` (comme le fait le module 7), avec création défensive dans le script ;
- attend le chargement des données (≤ 60 s tant que le joueur est présent), comme le guide officiel ;
- l’effet est écrit dans les leaderstats ET dans `donnees` (`donnees.etape` / `donnees.pieces`), sans aucune attente entre « donner » et « noter » : aucune sauvegarde (automatique, départ, fermeture) ne peut enregistrer l’un sans l’autre ;
- `PurchaseGranted` seulement si `DonneesJoueurs.Sauvegarder(player)` renvoie `true` ; sinon `NotProcessedYet` ; un reçu rejoué dont le `PurchaseId` est déjà en mémoire n’est que resauvegardé puis confirmé.
Les deux pertes de la passe 1 disparaissent : départ du joueur pendant la sauvegarde → la sauvegarde de départ contient étape + `PurchaseId` ; crash → aucun `PurchaseGranted` avant une sauvegarde réussie, le reçu revient (les achats non résolus ne sont ni supprimés ni remboursés, référence `ProcessReceipt`).

Limite résiduelle expliquée dans la leçon (« La seule limite qui reste ») : le système est aussi fiable que la sauvegarde du module 4, qui n’a pas de verrouillage de session ; un changement de serveur très rapide pendant une sauvegarde lente peut écraser des données récentes (achats compris). Le guide officiel s’appuie sur le verrouillage de session pour cette garantie ; renvoi vers ProfileStore. Cas annexe signalé ici seulement (conception du module 4, non modifiable par cette passe) : `Sauvegarder` renvoie `true` quand sa fonction `UpdateAsync` annule l’écriture parce que la sauvegarde distante a une `version` plus récente ; dans ce cas (ancien serveur coexistant avec une version plus récente du jeu), un achat pourrait être confirmé sans être écrit. Très rare, et toute la session est alors non sauvegardée de toute façon.

## Détail
| Leçon | Affirmation / élément | Verdict | Source | Commentaire |
|---|---|---|---|---|
| 03 | `ProcessReceipt` « enregistrer `PurchaseId` dans `AchatsTraites_v1` puis donner » + limite de perte | CORRIGÉ (code réécrit, section « limites » remplacée) | https://create.roblox.com/docs/cloud-services/data-stores/player-data-purchasing (Developer Product processing) | Voir ci-dessus. Tableau « Pourquoi cet ordre ? », section « Et si quelque chose tourne mal ? », astuce support, défi, résumé, test n° 3 adaptés |
| 03 | Garanties de `ProcessReceipt` (appel à l’arrivée, yield sans limite, pas de retry temporel, deux serveurs, échec d’enregistrement, auto-acquittement) | OK, REFORMULÉ (liste simplifiée) | MarketplaceService.yaml (Guarantees, Retries and Timeouts, Limitations) | Ajout : « un achat non résolu n’est ni supprimé ni remboursé » (Unresolved Developer Product Purchases) |
| 03 | Achats hors jeu (Store / Listed) | PRÉCISÉ | https://create.roblox.com/docs/production/monetization/developer-products (Enable external sales) | Listed se règle dans Monetization ⟩ Shop ; Roblox vérifie en continu le `ProcessReceipt` des produits Listed et les retire des surfaces externes en cas de problème |
| 03 | Téléchargement des données de ventes | OK | developer-products (« you can request to download sales data ») | — |
| 03 | `BindReceiptHandler`, `Enum.ReceiptDecision`, `ProcessReceipt` « legacy » non déprécié, priorité des handlers | OK | MarketplaceService.yaml | — |
| 03 | Création (1 à 1 milliard de Robux, icône 512×512, Copy Asset ID) | OK | developer-products | — |
| 03 | Studio : achats simulés (staff 2016) ; Team Test sans `ProcessReceipt` (développeurs 2025) | OK (présentation honnête conservée) | DevForum 26974 ; DevForum 3983692 (JSON : auteurs non staff, citation d’une réponse Roblox « pas de correctif à court terme ») | Aucune page create.roblox.com plus récente sur ce point |
| 03 | Quiz : nouvelle Q « à quel moment `PurchaseGranted` ? » ; Q3 explication | AJOUTÉ / CORRIGÉ | player-data-purchasing | Q3 parlait d’un DataStore séparé |
| Examen | Q5 (échec de l’`UpdateAsync` du `PurchaseId`) | CORRIGÉ (réécrite) | player-data-purchasing ; MarketplaceService.yaml | Porte désormais sur l’échec de `DonneesJoueurs.Sauvegarder` après octroi en mémoire |
| 01 | 70 % pour le créateur, 30 % Marketplace Fee | OK | https://create.roblox.com/docs/get-started/monetization | — |
| 01 | Attentes : ~5 j (passes, produits, abos Robux), ≤ 7 j accès payant Robux, 30 j abos monnaie locale, 60 j Creator Rewards et bonus Plus | OK | subscriptions (« approximately 5 days ») ; paid-access-robux (« up to 7 days ») ; creator-rewards (60-day holding) ; roblox-plus (60-day holding) | — |
| 01/04 | Plus : −10 % puis −20 % dès le 3e mois, subventionné par Roblox, créateur touche 70 | OK | roblox-plus (tableau de subvention) | — |
| 01/04 | Premium plus vendu le 30/04/2026, abonnés existants conservés sans réabonnement, avantages modifiés le 30/05/2026 | OK | help center 360024256251 (texte lu via l’API Zendesk, édité le 2026-04-10) | — |
| 04 | Roblox Plus 4,99 $/mois, lancé le 30/04/2026 | OK | DevForum 4567894 (catégorie Announcements, 2026-04-10, mise à jour 30/04 « rolling out now ») | — |
| 04 | Bonus 250 Robux × 3 mois consécutifs (750), hors essai, via `PromptRobloxSubscriptionPurchase` ; serveurs privés ≤ 100 Robux / abonné ≥ 60 min sur 30 j dans le serveur qu’il a créé ; 10 % des transferts | OK | roblox-plus | — |
| 04 | Creator Rewards : « trois premiers jeux qu’il lance ce jour-là » | CORRIGÉ | https://create.roblox.com/docs/creator-rewards (exemples 1 et 2) | Les exemples officiels montrent que ce sont les trois premiers jeux où le joueur passe 10 min (un 5e jeu visité peut compter). Reformulé en « trois jeux par jour au maximum » ; paragraphe découpé pour un débutant |
| 04 | Active Spender : achats qualifiants « Robux ou abonnements » | PRÉCISÉ | creator-rewards (« Qualifying Purchases means the purchase of Robux, Roblox Premium, or UGC subscriptions ») | Ajout de Premium |
| 04 | Audience Expansion : 35 % des 100 premiers $, 60 j, ID vérifié, ≥ 100 DAU | OK, PRÉCISÉ | creator-rewards | Ajout : lien de partage, lien direct ou recherche, 10 min de jeu ; mention honnête que 100 DAU est rarement atteint par un premier jeu |
| 04 | « Supprimer un abonnement actif rembourse les abonnés » | REFORMULÉ | subscriptions (« Refunds are not available for subscriptions in Robux » vs « Deleting an active subscription results in full refunds ») | La doc est contradictoire pour les abonnements en Robux : on n’affirme le remboursement que pour la monnaie locale, avec le conseil officiel « Take Off Sale » |
| 04 | Abonnements : 49 Robux min, paliers 2,99–14,99 $, 70 % / 70 % puis 100 %, 50 max, nom non modifiable, nom court définitif, prix 1×/60 j + préavis 30 j, régional non désactivable, pays exclus | OK | subscriptions | — |
| 04 | `GetUserSubscriptionStatusAsync(user: Player, subscriptionId: string)` → `IsSubscribed`/`IsRenewing` ; `PromptSubscriptionPurchase(user, id)` ; `Players.UserSubscriptionStatusChanged(user, subscriptionId)`, serveur seulement, revérification après fermeture du modal | OK | MarketplaceService.yaml ; Players.yaml ; subscriptions | Aucune dépréciation |
| 04 | `Player.MembershipType` déprécié → `Player.HasRobloxSubscription` | OK | Player.yaml (deprecation_message) | — |
| 02 | `UserOwnsGamePassAsync(userId, gamePassId)` non déprécié, cache, « toujours true à l’arrivée après achat », achat hors jeu « plusieurs minutes » | OK | MarketplaceService.yaml | Le paramètre est désormais typé `User` (accepte aussi le nouveau `Datatype.User` / `Player.User`) ; un objet `Player` reste refusé → examen Q3 toujours juste. `UserId` non déprécié : pas de changement |
| 02 | `PromptGamePassPurchase(player, gamePassId)`, `PromptGamePassPurchaseFinished(player, gamePassId, wasPurchased)` | OK | MarketplaceService.yaml | — |
| 02/05 | `GetProductInfoAsync(assetId, infoType)` ; `GetProductInfo` déprécié | OK | MarketplaceService.yaml (GetProductInfo : tags Deprecated, « superseded by GetProductInfoAsync ») | Le guide developer-products montre encore `GetProductInfo` : la formation a raison d’utiliser la version Async |
| 02 | `PromptProductPurchase(player, productId, …)` non déprécié | OK | MarketplaceService.yaml | — |
| 02 | Studio ne simule pas l’achat de passes | OK | season-passes (« Studio does not mock pass purchasing ») | — |
| 05 | Pass « promoted » 49 < prix < 801 | PRÉCISÉ | passes (Promote a pass) | Ajout essentiel : le pass promu est **offert** aux acheteurs de packs de Robux ; icône obligatoire |
| 05 | Prix régionaux « activés par défaut pour passes et abonnements en Robux » | PRÉCISÉ | regional-pricing ; managed-pricing ; subscriptions | Passes : par défaut, désactivable pass par pass ; abonnements Robux : automatique, non désactivable |
| 05 | Managed Pricing 30–100 %, test ~3 semaines, revenu incrémental positif, passes & produits seulement, 60 000 transactions / 30 j | OK | managed-pricing ; price-optimization | — |
| 05 | Règles de présentation (réductions authentiques et équitables, fausse rareté, compte à rebours, « GET IT NOW » → « View Item »), PolicyService obligatoire | OK | production/monetization (Presenting products, Promoting to global audiences) | — |
| 05 | Objets aléatoires payants (achats indirects, % avant achat, somme 100 %, bouton avec mot, modificateurs, gratuit exempté) | OK | paid-random-items | — |
| 05 | Champs PolicyService (`ArePaidRandomItemsRestricted`, `IsPaidItemTradingAllowed`, `AreAdsAllowed`, `IsEligibleToPurchaseSubscription`) | OK | PolicyService.yaml | — |
| 06 | Taux standard 0,0038 $ (114 $/30 000) depuis le 05/09/2025 10 h PT ; ancien 0,0035 (105 $) converti en premier | OK | developer-exchange | — |
| 06 | Taux U.S. 18+ 0,0054 $ depuis le 08/06/2026 (produits, passes, abonnements, serveurs privés ; joueurs US 18+ vérifiés ; R6 possible ⇒ inéligible) | OK | 18-plus-devex-rate | — |
| 06 | Éligibilité : 13 ans, 30 000 Earned Robux, e-mail vérifié, portail DevEx, W-9/W-8, Ongoing Service Requirements, conformité | OK | DevEx Terms (API Zendesk, édité le 2026-06-08) ; developer-exchange | — |
| 06 | « une demande au maximum par mois » | PRÉCISÉ | developer-exchange FAQ (« a completed DevEx request once per calendar month ») | → « une seule demande aboutie par mois civil » (texte + résumé) |
| 06 | Inactivité 2,5 ans, > 100 pays, frais du prestataire, impôts à déclarer, impact sur la déclaration des parents pour un mineur | OK | DevEx Terms | — |
| 06 | Démarche (Finances ⟩ Cash Out, nom légal, Robux retirés/rendus, e-mail no-reply, Tipalti, 1 semaine, ~10 / ~5 jours ouvrés, non annulable, dashboard 24 h) | OK | developer-exchange | — |
| 06 | Fiscalité : pas de conseil ; royalties au 01/11/2026 ; 0–30 % sur la part US si infos valides ; 24 % sinon ; Finances ⟩ Taxes ; W-8BEN | OK, PRÉCISÉ | tax-information | Ajout : la page demandait des infos valides avant le 31/10/2026 (date de référence pour la retenue de 24 %) |
| 06 | « Seuls les créateurs qui réussissent… aucune garantie » | OK | help center 203314100 (API Zendesk) | — |
| 01/06 | Earned Robux / non-Earned (achats, cartes cadeaux, transferts reçus, allocation mensuelle, revente, pass de jeux modèles, contenus modérés) | OK | developer-exchange | — |
| Éthique | Aucune promesse de revenus ; mineurs (parents, pression) | OK | monetization (« not guaranteed ») ; help center DevEx | Ajout d’une phrase réaliste sur le seuil de 100 DAU (L4) |

## Désaccords avec la passe 1
1. **ProcessReceipt** : la passe 1 jugeait le motif « DataStore séparé, enregistrer puis donner » acceptable avec une limite connue de perte d’octroi. Désaccord : le guide officiel décrit un motif sans cette perte, accessible au niveau du cours puisque le module 4 fournit déjà une table de données en mémoire et une fonction de sauvegarde qui renvoie un booléen. Code réécrit, limite retirée ; seule reste la dépendance au verrouillage de session (documentée).
2. **Creator Rewards** : la passe 1 a validé « trois premiers jeux qu’il lance » ; les exemples officiels montrent que le décompte porte sur les trois premiers jeux où le joueur atteint 10 minutes. Reformulé.
3. **Suppression d’un abonnement** : validée « OK » par la passe 1, alors que la page officielle se contredit pour les abonnements en Robux (« Refunds are not available for subscriptions in Robux »). Reformulé prudemment.
4. **Pass promu** : la passe 1 n’a pas signalé que le pass promu est offert gratuitement aux acheteurs de Robux, information indispensable pour décider de l’activer.

## Erreurs restantes non corrigées
- Aucune erreur factuelle connue.
- Diagnostic `Unknown require` dans L3 (require du ModuleScript `DonneesJoueurs` du module 4) : attendu pour un extrait qui dépend d’un autre script.
- Cas très rare lié au module 4 (non modifiable ici) : `DonneesJoueurs.Sauvegarder` renvoie `true` quand l’écriture est annulée pour cause de version de données plus récente ; le module 4 pourrait renvoyer `false` dans ce cas (à transmettre au responsable du module 4).
- Studio et Developer Products : seule source officielle = annonce staff de 2016 ; présentée comme telle.
