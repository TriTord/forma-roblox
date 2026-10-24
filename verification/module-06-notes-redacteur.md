# Module 06 — Notes du rédacteur pour les vérificateurs

Rédaction : 2026-10-24. Sources principales : dépôt officiel `Roblox/creator-docs` (branche main, commit 4e795e6 du 2026-10-24, = source de create.roblox.com/docs), pages create.roblox.com/docs, help center (en.help.roblox.com, récupéré par curl), DevForum.

## Chiffres et faits (avec source)

| Affirmation | Où | Source |
|---|---|---|
| Part créateur 70 % pour achats en Robux (passes, dev products) | L1, L2, examen | Tableau « Non-subscriber 100 → 70 Robux, 70 % » de https://create.roblox.com/docs/production/monetization/roblox-plus (liste des achats éligibles : dev products, game passes, subscriptions…). Pas de phrase explicite « passes = 70 % » trouvée ailleurs dans la doc : à confirmer si une page plus directe existe. |
| Serveurs privés payants : 70 % | L1 | Même page Roblox Plus (exemple « 70% revenue share on a 100 Robux server price ») |
| Attente ~5 jours (passes, dev products, abonnements Robux) | L1, L4 | https://create.roblox.com/docs/production/monetization/subscriptions (« same hold period as passes and developer products, which is approximately 5 days ») |
| Accès payant Robux : jusqu’à 7 jours | L1 | https://create.roblox.com/docs/production/monetization/paid-access-robux |
| Abonnements monnaie locale : 30 jours ; 70 % 1er mois puis 100 % ; 1 Robux = 0,01 $ ; ex. 5 $ → 350 puis 500 | L1, L4, examen | page Subscriptions |
| Abonnements : ≥ 49 Robux ; paliers 2,99/4,99/7,99/9,99/14,99 $ ; 50 max par jeu ; prix modifiable 1×/60 jours, préavis 30 jours ; nom court définitif ; régional par défaut non désactivable ; monnaie locale = compte vérifié ID ou téléphone | L4 | page Subscriptions |
| Creator Rewards & bonus Roblox Plus : attente 60 jours | L1, L4 | https://create.roblox.com/docs/creator-rewards ; page Roblox Plus |
| Engagement-Based Payouts (Premium Payouts) dépréciés le 24 juillet 2025, remplacés par Creator Rewards | L1, L4, quiz, examen | https://create.roblox.com/docs/production/monetization/engagement-based-payouts (bandeau) + FAQ de creator-rewards |
| Creator Rewards : 5 Robux/jour par Active Spender ≥10 min, parmi les 3 premiers jeux du jour ; Active Spender = actif ≥60 j et ≥9,99 $ sur 60 j ; Audience Expansion 35 % des premiers 100 $ sur 60 j, compte ID-vérifié, ≥100 DAU moyens | L4 | page Creator Rewards |
| Roblox Plus lancé le 30 avril 2026, 4,99 $/mois ; arrêt de la vente de Premium aux nouveaux abonnés (date non précisée pour cette phrase) ; changements Premium effectifs au 30 mai 2026 | L1, L4 | https://devforum.roblox.com/t/introducing-roblox-plus/4567894 (annonce, catégorie Announcements). J’ai volontairement évité de dater l’arrêt de vente de Premium (ambigu dans le post). |
| Plus : réduction 10 % puis 20 % dès le 3e mois, payée par Roblox ; bonus 250 Robux/mois × 3 = 750 via PromptRobloxSubscriptionPurchase ; ≤100 Robux par abonné ≥60 min en serveur privé payant ; 10 % des transferts | L1, L4 | page Roblox Plus |
| `Player.MembershipType` déprécié → `Player.HasRobloxSubscription` | L4, examen | Player.yaml du dépôt creator-docs (deprecation_message) |
| `PromptPremiumPurchase` déprécié → `PromptRobloxSubscriptionPurchase` | (non utilisé) | MarketplaceService.yaml |
| DevEx : 13 ans, 30 000 Earned Robux, e-mail vérifié, compte portail DevEx, W-9/W-8, conformité ; 1 demande/mois ; inactivité 2,5 ans ; >100 pays | L6, examen | https://en.help.roblox.com/hc/en-us/articles/115005718246-Developer-Exchange-Terms-of-Use + https://create.roblox.com/docs/production/monetization/developer-exchange |
| Taux standard 0,0038 $/Earned Robux (114 $ / 30 000) depuis 5 sept. 2025 10h PT ; ancien 0,0035 (105 $), anciens soldes convertis en premier | L6, examen | page Developer Exchange |
| Taux U.S. 18+ 0,0054 depuis 8 juin 2026 (dev products, passes, abonnements, serveurs privés ; joueurs US 18+ vérifiés ; R15 uniquement, pas de R6) | L6 | https://create.roblox.com/docs/production/monetization/18-plus-devex-rate |
| Délais DevEx estimés : ~10 jours ouvrés (1re fois), ~5 ensuite ; 1 semaine pour s’inscrire au portail ; demande non annulable ; DevEx Dashboard avec jusqu’à 24 h de décalage | L6 | page Developer Exchange |
| Fiscalité : Roblox ne donne pas de conseil fiscal ; au 1er nov. 2026 paiements DevEx = royalties ; non-US avec infos valides : 0–30 % de retenue US sur la part liée aux joueurs US ; sinon 24 % backup withholding ; page Finances > Taxes | L6, examen | https://create.roblox.com/docs/production/monetization/tax-information |
| « Seuls les créateurs qui réussissent atteignent les conditions… aucune garantie » | L6 | help center DevEx FAQ (article 203314100) |
| Passes : création (512×512, jpg/png/bmp, cercle), Copy Asset ID ; promoted pass > 49 et < 801 Robux, pas d’objets aléatoires payants | L2, L5 | https://create.roblox.com/docs/production/monetization/passes |
| Dev products : prix 1 à 1 milliard de Robux | L3 | https://create.roblox.com/docs/production/monetization/developer-products |
| Ventes cross-game de passes/produits désactivées au 30 mai 2026 | (non mentionné dans les leçons) | pages passes / developer-products |
| Managed Pricing : prix régionaux bornés 30–100 % ; activé par défaut pour passes ; price optimization ~60 000 transactions/30 j, test ~3 semaines, appliqué si revenu incrémental positif ; seulement passes & dev products ; Dynamic Price Check | L2, L5, quiz | pages managed-pricing, price-optimization, regional-pricing |
| Règles : réductions authentiques et équitables, pas de fausse rareté, pas de compte à rebours inexact/qui redémarre ; formulations à éviter (GET IT NOW → View Item…) ; PolicyService obligatoire | L5, examen | https://create.roblox.com/docs/production/monetization |
| Objets aléatoires payants : issues + probabilités en % avant achat, somme 100 %, bouton avec mot « Info/Détails » (icône seule insuffisante), modificateurs de chances expliqués et mise à jour dynamique, gratuits exemptés ; traitements pour `ArePaidRandomItemsRestricted` | L5, examen | https://create.roblox.com/docs/production/monetization/paid-random-items |
| Achats simulés dans Studio, déclenchent ProcessReceipt | L2, L3 | https://devforum.roblox.com/t/mock-purchases-in-studio/26974 (2016, auteur Seranok — ancien ; formulé prudemment) |

## API (noms et signatures vérifiés dans MarketplaceService.yaml / Players.yaml / Player.yaml / PolicyService.yaml du dépôt officiel, 2026-10-24)

- `MarketplaceService:UserOwnsGamePassAsync(userId: User | number, gamePassId)` — non déprécié, cache documenté, « transparent batching ». NB : nouveau datatype `User` (identité « domain-scoped », `Player.User`) ; la doc des passes utilise toujours `player.UserId`, ce que fait la leçon.
- `PromptGamePassPurchase(player, gamePassId)` ; `PromptGamePassPurchaseFinished(player, gamePassId, wasPurchased)` — à écouter côté serveur selon la doc.
- `PromptProductPurchase(player, productId, equipIfPurchased?, currencyType?)` — **non déprécié** dans le YAML (les 2 derniers paramètres « Ignored »). Attention : un résumé WebFetch de la page de référence l’avait annoncé à tort comme déprécié ; le YAML source (tags: []) fait foi.
- `MarketplaceService.ProcessReceipt(receiptInfo) -> Enum.ProductPurchaseDecision` (PurchaseGranted / NotProcessedYet) ; champs PurchaseId, PlayerId, ProductId, PlaceIdWherePurchased, CurrencySpent, CurrencyType, ProductPurchaseChannel. Garanties/limites citées en L3 recopiées de la section « Guarantees / Retries and Timeouts / Limitations ».
- `BindReceiptHandler(receiptType, handler, filter?)` → `Enum.ReceiptDecision.Processed / NotProcessedYet` : alternative récente, mentionnée seulement.
- `GetProductInfo` est **déprécié** → `GetProductInfoAsync` (utilisé dans les leçons ; la doc guide « passes »/« developer products » utilise encore l’ancien nom).
- Abonnements : `GetUserSubscriptionStatusAsync(user: Player, subscriptionId: string)` → `IsSubscribed`, `IsRenewing` ; `Players.UserSubscriptionStatusChanged(user, subscriptionId)` (serveur uniquement) ; `PromptSubscriptionPurchase(user, subscriptionId)` ; `PromptSubscriptionPurchaseFinished(user, subscriptionId, didTryPurchasing)`.
- `PolicyService:GetPolicyInfoForPlayerAsync(player)` → `ArePaidRandomItemsRestricted`, `IsPaidItemTradingAllowed`, `AreAdsAllowed`, `IsEligibleToPurchaseSubscription`…
- `Player.HasRobloxSubscription` (booléen, lecture seule).

## Choix de conception du code
- ProcessReceipt (L3) : vérifications préalables (joueur présent, leaderstats, Checkpoints) → enregistrement atomique du PurchaseId via `UpdateAsync` dans `AchatsTraites_v1` (clé `"Achat_" .. PurchaseId`) → application de l’effet si première fois → `PurchaseGranted`. `NotProcessedYet` si joueur absent, données non prêtes, produit inconnu ou erreur DataStore. Les limites (crash avant sauvegarde du module 4, joueur qui part pendant l’UpdateAsync) sont expliquées honnêtement, avec renvoi à l’approche « PurchaseId dans les mêmes données » / ProfileStore.
- `node scripts/verifier-luau.mjs 06` : 16 extraits, 0 diagnostic.

## Points incertains
1. Part 70 % des passes/dev products : déduite du tableau Roblox Plus (« effective revenue share 70 % » pour non-abonné), pas d’une phrase dédiée.
2. Étape « fixer le prix / mettre en vente » d’un pass : la doc de création ne la décrit plus ; j’ai écrit « depuis la page du pass (onglet Sales) » d’après la mention de la page « Sales » dans regional-pricing ; libellés à vérifier dans le Creator Hub.
3. Achats simulés dans Studio : source DevForum de 2016 seulement.
4. Date exacte de l’arrêt de la vente de Premium aux nouveaux abonnés : non datée dans l’annonce ; la leçon dit seulement « annoncé en 2026 ».
5. Le help center (en.help.roblox.com) renvoie 403 à WebFetch ; contenu récupéré via curl (User-Agent navigateur).
