# Module 00 — notes du rédacteur pour les vérificateurs

Rédigé le 2026-10-24. Toutes les pages create.roblox.com ci-dessous ont été lues dans leur version Markdown (`<url>.md`), `last_updated` 2026-10-23.

## Leçon 01 — bienvenue

| Affirmation | Source |
|---|---|
| Studio = application gratuite pour Windows et Mac ; minimum Windows 10 / macOS 10.14, 3 Go RAM, 1600×900 ; recommandé Windows 11 / macOS 14+, 8 Go | https://create.roblox.com/docs/studio/setup |
| Mineurs : compte créé avec un parent/tuteur qui accepte les conditions | Terms of Use, version EEE/R-U/Suisse (https://www.roblox.com/info/terms → redirige vers en.help.roblox.com, article 52986395990932 ; lu via curl, WebFetch renvoie 403). **Incertain** : la page lue affiche « Effective Date: November 1, 2026 » (nouvelle version). Le texte de la leçon reste général (« les conditions prévoient leur accord »). |
| Nom « 2-Step Verification » | Lien d’aide cité dans https://create.roblox.com/docs/production/publishing/kids-and-select |
| Fonctionnement du site (quiz ≥ 70 %, bouton « Marquer comme terminée », badges Explorateur + 5 badges globaux, localStorage) | Code du site : `src/scripts/progression.ts`, `src/data/site.ts`, `src/data/modules.ts` |
| Code d’aperçu (checkpoints) : `Players:GetPlayerFromCharacter`, `Touched`, `WaitForChild`, `IsA("BasePart")` | Vérifié par `verifier-luau` (0 diagnostic) |

## Leçon 02 — roblox-pour-les-createurs

| Affirmation | Source |
|---|---|
| Studio (3D, physique, animations, logique en Luau, Team Create) ; Creator Hub = Dashboard, docs, forum, Creator Store… | https://create.roblox.com/docs/get-started/tools ; https://create.roblox.com/docs/creator-hub |
| Dashboard : créations, analytics, DevEx, transactions, Ads Manager ; Creator Roadmap | https://create.roblox.com/docs/creator-hub |
| Un jeu = une ou plusieurs places, téléportation entre places | https://create.roblox.com/docs/production/publishing/publish-games-and-places |
| Docs récentes utilisent « game » ; historiquement « experience » | Constat sur les pages docs (Discovery : « game details page », « your game ») ; le passage à « experiences » (2021) est documenté par la presse (The Verge/Kotaku), pas relu sur une source Roblox. Formulation volontairement prudente. |
| Robux = contenu numérique, licence limitée ; Earned Robux ; DevEx | Terms of Use (section 5.1 User Terms, section 6.3 Creator Terms) ; https://create.roblox.com/docs/production/earning-on-roblox |
| Liste des sources de revenus (in-game items, subscriptions, paid access, Creator Rewards, ads, avatars, models/plugins, commerce, private servers) | https://create.roblox.com/docs/production/earning-on-roblox ; https://create.roblox.com/docs/production/monetization |
| Creator Rewards (Daily Engagement + Audience Expansion) ; Engagement-based payouts (Premium Payouts) **dépréciés le 24 juillet 2025**, remplacés par Creator Rewards | https://create.roblox.com/docs/creator-rewards ; https://create.roblox.com/docs/production/monetization/engagement-based-payouts |
| « Applying these techniques… you are not guaranteed… you don't need to have any financial goals » | https://create.roblox.com/docs/production/monetization (encadré Warning) |
| Marketplace ≠ Creator Store | https://create.roblox.com/docs/marketplace (encadré Warning) |
| Community Standards : sections Safety, Civility, Integrity, Security ; interdiction des jeux qui redirigent hors de Roblox ; objets aléatoires payants encadrés | https://about.roblox.com/community-standards |
| Creator Terms s’appliquent à Studio, Creator Store, Creator Hub, DevForum… | Terms of Use (EEE) |
| Comptes Roblox Kids (5-8), Select (9-15), Roblox (16+ vérifiés) ; exigences de publication ; évaluation (essai 16+, 250 joueurs très engagés / 60 jours, revue de sécurité) | https://create.roblox.com/docs/production/publishing/kids-and-select |
| « Roblox has millions of games » | https://create.roblox.com/docs/discovery |
| « Of the millions of creators monetizing on Roblox, over 35,000 are part of our DevEx program, with the median creator receiving $1,550 USD during the twelve months ended December 31, 2025 » | https://create.roblox.com/docs/production/earning-on-roblox — **Point d’attention** : « median creator » est interprété comme médiane des créateurs DevEx (formulation de la page ambiguë ; la leçon dit « parmi ces créateurs-là »). |

## Leçon 03 — mindset-du-createur

| Affirmation | Source |
|---|---|
| MVP : fonctionnalités clés + core loop, version minimale ; feedback tôt ; « finding the fun » ; KPI définis avant le développement, comparaison analytics/KPI | https://create.roblox.com/docs/get-started/strategies |
| « Choosing a proven genre will increase the likelihood of attracting and retaining players » | idem |
| Prototypage papier / Studio, détecter tôt les défauts, prototype rapide et ciblé | https://create.roblox.com/docs/production/game-design/prototyping |
| Jeux non originaux moins recommandés ; « add your own spin » | https://create.roblox.com/docs/discovery |
| Pas de pénalité pour un mauvais départ, test continu | https://create.roblox.com/docs/discovery-faq |
| Retour d’expérience : « The most common mistake is that new developers plan too broad… » | https://devforum.roblox.com/t/i-need-help-making-a-game/573814 (fil communautaire de 2020, non officiel, présenté comme tel) |
| Conseils de régularité, carnet de bord, parking à idées | Conseils pédagogiques présentés comme tels (aucune statistique) |

## Leçon 04 — comment-les-jeux-sont-decouverts (la plus sensible)

Tout provient de la doc officielle Discovery + FAQ (mises à jour le 2026-10-23), de la page Thumbnails et de l’annonce Newsroom de juin 2026.

| Affirmation | Source |
|---|---|
| Sorts de Home : Recommended for You, Continue Playing, Friends List, Sponsored, Curated Sorts ; Standout Games (curation manuelle) ; Live Events | https://create.roblox.com/docs/discovery (« Other Home sorts ») |
| Recherche sémantique dans les langues officielles (« food games ») | idem (« Search ») |
| Discover : top charts et trending, remanié pour plus de diversité | idem |
| Jeux similaires sur la page de détails | idem (« Game details page ») |
| Retrieval puis Ranking ; autres sources accélèrent la prise en compte ; ranking = uniquement joueurs organiques RFY | idem (tableau « Stage 1 / Stage 2 ») |
| ~100 jeux sur la Home d’un joueur | https://create.roblox.com/docs/discovery-faq |
| Explore / expand ; pas de pénalité, fenêtre glissante, test quotidien | Discovery + FAQ |
| Tableau des 8 signaux (priorités, définitions, segments < 60 s / 61-180 s, D1 / D2-7 / D8-28, plafond 60 min/jour) | https://create.roblox.com/docs/discovery (« Key signals ») |
| Moyennes par joueur, petits jeux non désavantagés | Discovery + FAQ |
| Valeur = rétention long terme + monétisation long terme ; « no single signal determines ranking » | FAQ |
| Genre non explicite ; descriptions inexactes → rebonds | FAQ |
| Passage de 7 à 28 jours (juin 2026) | https://about.roblox.com/newsroom/2026/06/optimizing-discovery-great-games-reach-millions-players-roblox (15 juin 2026, John Ciancutti) — le titre exact de l’article n’a pas été relevé, le libellé du lien est descriptif. |
| Problèmes limitant l’exposition (giveaways « Robux! Play now! », métadonnées trompeuses, jeux non uniques), bandeau quotidien dans le Dashboard, réévaluation à chaque mise à jour | Discovery (« Issues that limit exposure », « Track and improve content quality ») + FAQ |
| Miniature personnalisée obligatoire pour les impressions RFY | Discovery (« Use a custom thumbnail ») |
| Personnalisation des miniatures : 2 à 5 actives, +8,5 % de qualified play through rate en moyenne pendant les tests | https://create.roblox.com/docs/production/publishing/thumbnails |
| 4 facteurs d’impressions ; saisonnalité (pic le samedi, été/rentrée, fêtes) | Discovery + FAQ |
| Pubs : n’affectent pas le classement RFY, joueurs pub exclus des signaux, baisse possible des impressions RFY non pénalisante | FAQ (« Ads questions ») |
| Share links créés dans le Creator Dashboard, liens traçables | https://create.roblox.com/docs/production/promotion/share-links |
| Ads Manager : emplacements sponsorisés Home + Search | https://create.roblox.com/docs/production/promotion/advertise |
| Notifications d’expérience avec opt-in | Discovery (« Notifications ») |
| Contexte historique (mission, principes) | https://devforum.roblox.com/t/discovery-on-roblox-past-present-and-future-vision/2859111 (compte staff Roblox, 28/02/2024) |

**Non utilisé volontairement** :
- **Today’s Picks** : la seule page officielle trouvée concerne « Today’s Picks on Marketplace » (objets d’avatar, https://create.roblox.com/docs/creator-programs/todays-picks-marketplace). Pour les jeux, je n’ai trouvé qu’un fil DevForum (https://devforum.roblox.com/t/todays-picks-and-site-events-negatively-effecting-a-games-home-recommendation-signals/4042042) où un compte (statut staff non confirmé sur la page) répond que Today’s Picks et les téléportations ne comptent pas dans les signaux Home Recommendation. Cohérent avec la doc (seuls les joueurs organiques RFY comptent), mais non cité faute de source officielle claire. La leçon parle seulement de « Curated Sorts ».
- Aucun chiffre tiers (presse, analyses) sur l’impact boursier ou les jeux ayant perdu des impressions.

## Leçon 05 — le-projet-fil-rouge

| Affirmation | Source |
|---|---|
| Core loop en 3 parties (minute to minute interaction, most repeated set of actions, progression engine) | https://create.roblox.com/docs/production/game-design/core-loops |
| Obby conseillé comme premier projet (moins de construction et de script) | https://devforum.roblox.com/t/i-need-help-making-a-game/573814 (communautaire) |
| Évaluation avant accès aux moins de 16 ans | https://create.roblox.com/docs/production/publishing/kids-and-select |
| Cahier des charges, carte des modules, conventions de noms | PLAN.md et BRIEF_REDACTEUR.md (conventions du fil rouge) |

## Examen

15 questions (9 QCM, 4 vrai/faux, 2 `trouve-le-bug` : `GetService("Player")` (TypeError confirmé par luau-lsp « Invalid service name ») et `if joueur = nil then` (SyntaxError confirmée).

## Points à signaler au chef d’orchestre

1. **PLAN.md, module 06 leçon 04 « Abonnements et Premium Payouts »** : la page officielle https://create.roblox.com/docs/production/monetization/engagement-based-payouts indique que le programme Engagement-Based Payouts (Premium Payouts) est **déprécié depuis le 24 juillet 2025** et remplacé par **Creator Rewards** (https://create.roblox.com/docs/creator-rewards). Le rédacteur du module 6 doit en tenir compte.
2. **Publication et public** : depuis 2026, la doc « Roblox Kids and Select » impose des exigences côté créateur (vérification d’âge, 2FA, frais remboursables ou abonnement Roblox Plus/Premium, évaluation de 250 joueurs très engagés sur 60 jours) pour toucher les moins de 16 ans. Concerne les modules 1 (publication), 7 et 10.
3. **Roblox Plus** apparaît dans la doc monétisation comme programme créateur (remises subventionnées, bonus d’inscription, serveurs privés payants) — à vérifier pour le module 6.
