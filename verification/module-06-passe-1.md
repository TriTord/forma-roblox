# Module 06 — passe 1 (vérificateur : faits + sources + quiz) — 2026-10-24

## Résumé
Environ 150 affirmations vérifiées (6 leçons + examen), 22 corrigées / reformulées / précisées, 0 supprimée ; 6 sources ajoutées, 0 lien mort (32 liens testés : HTTP 200, les 3 pages de référence API qui renvoyaient 502 à curl ont été ouvertes avec succès via WebFetch).
Quiz : 30 questions de leçon + 14 d’examen relues ; 0 bonne réponse fausse ; 1 question de leçon (L4 Q5) et 1 question d’examen (Q1) reformulées ; les numéros de ligne des 5 `trouve-le-bug` ont été vérifiés (un seul bug chacun).
Code : `node scripts/verifier-luau.mjs 06` → 16 extraits, 0 diagnostic (avant et après corrections). Correction importante de fiabilité dans `ProcessReceipt` (L3). Build `bash scripts/build-verrou.sh` : OK (code 0).

Méthode : sources lues directement dans le dépôt officiel `Roblox/creator-docs` (commit 4e795e6 du 2026-10-24, source de create.roblox.com/docs, YAML de la référence API compris), pages en ligne vérifiées (WebFetch/curl), help center (curl avec User-Agent navigateur), DevForum.

## Détail
| Leçon | Affirmation / élément | Verdict | Source | Commentaire |
|---|---|---|---|---|
| 01 | Part du créateur 70 % sur achats en Robux (passes, dev products) | REFORMULÉ (source explicite trouvée) | https://create.roblox.com/docs/get-started/monetization (« You receive 70% of Robux spent… The remaining 30% is Roblox's Marketplace Fee », section In-app purchases) | Le rédacteur l’avait déduit du tableau Roblox Plus ; phrase officielle citée dans le texte et l’explication du quiz Q1 |
| 01 | 70 % pour abonnements en Robux / serveurs privés payants | OK | pages subscriptions (« 70% of subscription earnings each month ») et roblox-plus (« 70% revenue share on a 100 Robux server price ») | Attribution ajoutée dans le texte |
| 01 | Ligne « Roblox Plus : bonus quand des abonnés Plus achètent… » | CORRIGÉ | roblox-plus | Pas de bonus sur les achats (réduction subventionnée, gain identique). Remplacé par : bonus d’inscription, compensation serveurs privés, 10 % des transferts |
| 01 | Premium : « annoncé qu’il cessait de vendre Premium » | CORRIGÉ | https://en.help.roblox.com/hc/en-us/articles/360024256251 (« On April 30, 2026, Roblox Premium membership will no longer be available for purchase… ») | Date désormais précise (30 avril 2026), abonnés existants conservés sans réabonnement |
| 01 | Plus : −10 % puis −20 % dès le 3e mois, payé par Roblox | PRÉCISÉ | roblox-plus | Ajout « achats éligibles en Robux » (liste officielle) |
| 01 | Attentes : ~5 j (passes, produits, abos Robux), 7 j accès payant, 30 j abos monnaie locale, 60 j Creator Rewards | OK | subscriptions ; paid-access-robux (« up to 7 days ») ; creator-rewards | — |
| 01 | « bonus Roblox Plus : 60 jours » | PRÉCISÉ | roblox-plus (60 j documentés pour le bonus d’inscription) | → « bonus d’inscription Roblox Plus » |
| 01 | Earned Robux / non-Earned (achetés, cartes cadeaux, transferts reçus, allocation mensuelle) | OK | developer-exchange | — |
| 01 | Premium Payouts remplacés par Creator Rewards le 24/07/2025 | OK | engagement-based-payouts (bandeau « Effective July 24, 2025… ») | — |
| 01 | Roblox n’enregistre pas l’historique d’achat | OK | monetization ; passes ; developer-products | — |
| 01 | « downvote », pas de garantie, minuteurs déconseillés, touristes/locals | OK | https://create.roblox.com/docs/production/monetization | — |
| 01 | Seuil DevEx 30 000 Earned Robux | OK | developer-exchange | — |
| 02 | Création d’un pass (étapes, 512×512, jpg/png/bmp, cercle, catégorie), Copy Asset ID | OK | passes | — |
| 02 | « fixer le prix depuis l’onglet Sales » | REFORMULÉ | regional-pricing (seule mention : page **Sales** qui affiche les prix par pays) | La doc ne décrit plus l’étape de mise en prix ; formulation prudente |
| 02 | Prix régionaux activés par défaut pour les passes, plancher 30 %, désactivables pass par pass | OK | regional-pricing ; managed-pricing | — |
| 02 | `UserOwnsGamePassAsync(userId, gamePassId)` non déprécié, cache, mise à jour par `PromptGamePassPurchaseFinished`, achat hors jeu « plusieurs minutes » | OK | MarketplaceService.yaml (param. `User \| number`, tags: Yields) | — |
| 02 | `PromptGamePassPurchase(player, gamePassId)` ; `PromptGamePassPurchaseFinished(player, gamePassId, wasPurchased)`, à écouter côté serveur | OK | MarketplaceService.yaml | — |
| 02 | `GetProductInfoAsync` / `PriceInRobux` (côté client) ; `GetProductInfo` déprécié | OK | MarketplaceService.yaml ; passes (« make sure the script runs on the client ») | — |
| 02 | « Achats simulés dans Studio » (source 2016) appliqués aux passes | CORRIGÉ | https://create.roblox.com/docs/resources/feature-packages/season-passes (« Studio does not mock pass purchasing ») + annonce staff 2016 (qui signalait déjà des valeurs incorrectes pour la possession de pass) | Section de test réécrite : Studio pour l’UI + attribution forcée temporairement, jeu publié pour l’achat réel |
| 02 | Code serveur et client (pcall + 3 essais, attribut, CharacterAdded, prix dynamique) | OK | passes ; Trail API | Raisonnement d’exécution : correct, aucune API dépréciée |
| 03 | Création dev product, prix 1 à 1 milliard de Robux | OK | developer-products | — |
| 03 | Garanties/limites de `ProcessReceipt` (appel à l’arrivée, pas de retry temporel, deux serveurs, échec d’enregistrement, auto-acquittement) | OK | MarketplaceService.yaml (sections Guarantees / Retries and Timeouts / Limitations) | — |
| 03 | `ProcessReceipt` : `NotProcessedYet` immédiat si les leaderstats ne sont pas chargées | CORRIGÉ (code) | MarketplaceService.yaml (« can yield for as long as the server is running ») ; https://create.roblox.com/docs/cloud-services/data-stores/player-data-purchasing (« If the player's data hasn't loaded yet (which is expected when a player joins a game), wait for the player's data to load ») | Bug de fiabilité : les reçus non résolus sont rejoués à l’arrivée, avant la fin du chargement (module 4) → reçu bloqué jusqu’à la reconnexion suivante. Ajout de `attendrePreparation` (attente ≤ 60 s tant que le joueur est présent) et explication dans le tableau |
| 03 | Idempotence : `UpdateAsync` sur `"Achat_" .. PurchaseId`, `return nil` pour annuler, effet appliqué hors de la fonction de transformation, `PurchaseGranted` seulement après | OK | GlobalDataStore:UpdateAsync ; player-data-purchasing | Approche « enregistrer puis donner » : jamais de double octroi ; limites (crash avant sauvegarde, départ du joueur pendant l’`UpdateAsync`) déjà expliquées honnêtement — renvoi ajouté vers l’approche officielle « même sauvegarde » |
| 03 | Achats hors jeu (Store / Listed) livrés via `ProcessReceipt` à l’arrivée ; callback peut attendre | AJOUTÉ | developer-products ; MarketplaceService.yaml | Justifie l’attente des données |
| 03 | Studio : achats simulés + `ProcessReceipt` appelé (DevForum 2016) | REFORMULÉ | https://devforum.roblox.com/t/mock-purchases-in-studio/26974 (staff Seranok, 12/07/2016, catégorie Announcements) ; https://devforum.roblox.com/t/marketplaceserviceprocessreceipt-is-not-called-in-team-test/3983692 (rapport de développeurs, 2025) | Aucune source officielle plus récente trouvée (doc developer-products, testing-modes, MarketplaceService muets) : âge de la source signalé, conseil de test final en jeu publié, mise en garde Team Test présentée comme retour de développeurs |
| 03 | Scénario de test « désactive l’accès aux API » | CORRIGÉ | module 04 leçon 02 (échec de chargement → joueur expulsé) | Le scénario était impossible ; remplacé par une panne simulée temporaire (`error(...)` dans le pcall) |
| 03 | `BindReceiptHandler` alternative récente, `Enum.ReceiptDecision.Processed/NotProcessedYet` | PRÉCISÉ | MarketplaceService.yaml ; ReceiptDecision.yaml | La référence appelle `ProcessReceipt` « legacy » (non déprécié) ; priorité des handlers liés ajoutée |
| 03 | `PromptProductPurchase(player, productId)` non déprécié ; `PromptProductPurchaseFinished` ne prouve pas l’achat | OK | MarketplaceService.yaml (tags: []) | — |
| 03 | Script `DemandesAchat` (rate limit, vérif. étape suivante côté serveur, ID constant) | OK | — | Raisonnement d’exécution correct |
| 04 | Abonnements : auto-renouvelés, Robux ou monnaie locale, payés en Robux, non exclusifs, 50 max/jeu | OK | subscriptions | — |
| 04 | Tableau Robux / monnaie locale (éligibilité ID ou téléphone, ≥ 49 Robux, 2,99–14,99 $, 70 % / 70 % puis 100 %, 5 j / 30 j, prix régionaux, pays) | OK | subscriptions | — |
| 04 | 0,01 $ = 1 Robux, exemple 5 $ → 350 puis 500 | OK | subscriptions | — |
| 04 | Nom unique non modifiable, nom court définitif, prix 1×/60 j + préavis 30 j, suppression = remboursement | OK | subscriptions | — |
| 04 | Règles des abonnements | OK | subscriptions (Subscription guidelines) | — |
| 04 | `GetUserSubscriptionStatusAsync(player, id)` → `IsSubscribed`/`IsRenewing`, côté serveur | OK | MarketplaceService.yaml ; subscriptions | — |
| 04 | `Players.UserSubscriptionStatusChanged` « abonnement acheté, résilié ou expiré pendant la partie » | CORRIGÉ | Players.yaml (« the server only attempts to check and update the status after the Subscription Purchase modal has been closed ») | Commentaire du code et texte corrigés |
| 04 | `PromptSubscriptionPurchase(player, id)` ; `PolicyService.IsEligibleToPurchaseSubscription` | OK | MarketplaceService.yaml ; PolicyService.yaml ; monetization (intégration PolicyService obligatoire) | — |
| 04 | Creator Rewards : 5 Robux/jour, 10 min, 3 premiers jeux ; Audience Expansion 35 % des 100 premiers $ sur 60 j, ID vérifié, ≥ 100 DAU ; 60 j d’attente ; abus | OK | creator-rewards | — |
| 04 | Définition « Active Spender = actif depuis au moins 60 jours » | CORRIGÉ | creator-rewards (« (b) was not a New User or Reactivated User during the past 60 days ») | — |
| 04 | Raison du changement (manque de transparence) | OK | creator-rewards FAQ | — |
| 04 | Roblox Plus 30/04/2026, 4,99 $/mois ; Premium modifié au 30/05/2026 | OK | https://devforum.roblox.com/t/introducing-roblox-plus/4567894 (Announcements) | — |
| 04 | Arrêt de vente de Premium (non daté) | CORRIGÉ | help center 360024256251 | Daté au 30 avril 2026 (texte, résumé, quiz Q5) |
| 04 | Bonus d’inscription 750 Robux (250×3), serveurs privés ≤ 100 Robux/abonné ≥ 60 min/30 j, 10 % des transferts | PRÉCISÉ | roblox-plus | Ajouts : « mois consécutifs, hors essai gratuit » ; « dans le serveur privé qu’il a créé » |
| 04 | `Player.MembershipType` déprécié → `Player.HasRobloxSubscription` (booléen lecture seule) | OK | Player.yaml (deprecation_message) | Code `GetPropertyChangedSignal("HasRobloxSubscription")` conforme à l’exemple officiel de roblox-plus |
| 04 | Conseils Premium (pas de paywall, pas de promesse de Robux, pas d’avantage tactique) | OK | engagement-based-payouts | — |
| 05 | Valeur claire, boutique contextuelle | OK | monetization-foundations | — |
| 05 | « La description doit être exacte et honnête » attribué à Monetization foundations | REFORMULÉ | monetization (« transparent, honest, and user-friendly ») | Phrase introuvable dans foundations ; rattachée à la bonne page |
| 05 | Gamme de prix, offres de bienvenue | OK | production/analytics/monetization | — |
| 05 | Promoted pass > 49 et < 801 Robux, pas d’objets aléatoires payants | OK | passes | — |
| 05 | Managed Pricing (onglet, prix régionaux 30–100 %, défaut passes & abonnements Robux), price optimization (~3 semaines, revenu incrémental positif, passes & produits seulement, 60 000 transactions/30 j), Dynamic Price Check, `GetUsersPriceLevelsAsync` | OK | managed-pricing ; price-optimization ; regional-pricing | — |
| 05 | Experiments cite la tarification | OK | production/experiments (« Monetization - … pricing ») | — |
| 05 | Règles de présentation (réductions authentiques et équitables, fausse rareté, compte à rebours), formulations à éviter | OK | monetization (Guidelines) | — |
| 05 | Objets aléatoires payants (achats indirects, % avant achat, somme 100 %, arrondi + mention, bouton avec mot, modificateurs, gratuit exempté, traitements `ArePaidRandomItemsRestricted`) | OK | paid-random-items ; PolicyService.yaml | — |
| 05 | PolicyService obligatoire ; `IsPaidItemTradingAllowed`, `AreAdsAllowed`, `IsEligibleToPurchaseSubscription` | OK | monetization ; PolicyService.yaml | — |
| 06 | Earned Robux (liste incluse/exclue, passes de jeux modèles, contenus modérés) | OK | developer-exchange ; DevEx Terms | — |
| 06 | « Seuls les créateurs qui réussissent… aucune garantie » | OK | help center 203314100 (« only successful creators will be able to meet the high requirements… no guarantee ») | — |
| 06 | Conditions : 13 ans, 30 000, e-mail vérifié, portail DevEx (invitation après 1re demande), W-9/W-8, conformité, Ongoing Service Requirements | OK | DevEx Terms ; developer-exchange ; help center 203314100 | — |
| 06 | 1 demande/mois, inactivité 2,5 ans, > 100 pays, vente de Robux hors DevEx = refus | OK | DevEx Terms ; developer-exchange FAQ | — |
| 06 | Taux standard 0,0038 $ (114 $/30 000) depuis le 05/09/2025 10 h PT ; ancien 0,0035 (105 $) converti en premier | OK | developer-exchange | — |
| 06 | Taux U.S. 18+ 0,0054 $ depuis le 08/06/2026 ; produits, passes, abonnements, serveurs privés ; joueurs US 18+ vérifiés ; R6 ⇒ inéligible | OK | 18-plus-devex-rate (FAQ « June 8, 2026 ») | — |
| 06 | Frais de transaction du prestataire, variables selon le moyen de paiement | OK | DevEx Terms (« Transaction fees… charged by our DevEx portal provider… vary depending on payment method ») | — |
| 06 | Démarche (Finances ⟩ Cash Out, nom légal, Robux retirés/rendus, e-mail no-reply, Tipalti, 1 semaine, ~10/~5 jours ouvrés, non annulable, dashboard 24 h) | OK | developer-exchange | — |
| 06 | Fiscalité : pas de conseil fiscal ; royalties au 01/11/2026 ; 0–30 % sur la part US si infos valides ; 24 % sinon ; Finances ⟩ Taxes ; W-8BEN ; mineurs / parents | OK | tax-information ; DevEx Terms | — |
| Quiz L1–L6 | 30 questions | OK (L4 Q5 reformulée) | — | Bonnes réponses justes, distracteurs faux ; lignes des `trouve-le-bug` L2 Q4 (ligne 6), L3 Q5 (lignes 5/9/14), L4 Q4 (lignes 3/7/9), L5 Q4 (lignes 5/8/9) vérifiées |
| Examen | 14 questions | OK (Q1 précisée) | — | Q1 : « joueur non abonné à Roblox Plus » (évite l’ambiguïté du prix réduit). Calculs vérifiés (175 ; 171 / 157,50 / 243). `trouve-le-bug` Q3 (ligne 7 : `player` au lieu de `player.UserId`) et Q7 (ligne 7 : ID venant du client) : lignes justes, un seul bug |

## Erreurs restantes non corrigées
- Aucune erreur factuelle connue.
- Limite assumée (documentée dans L3) : le `ProcessReceipt` « enregistrer puis donner » peut perdre un octroi si le joueur quitte pendant l’`UpdateAsync` ou si le serveur plante avant la sauvegarde suivante ; il ne double jamais un octroi. L’approche officielle « même sauvegarde » est citée comme solution robuste.
- Comportement des achats simulés dans Studio pour les Developer Products : seule source officielle = annonce staff de 2016 ; présenté comme tel, avec conseil de vérifier dans le jeu publié.
- Libellé exact de l’écran de mise en prix d’un pass dans le Creator Hub : non documenté (octobre 2026) ; formulation prudente.
