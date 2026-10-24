# Module 00 — passe 1 (vérificateur : faits + sources + quiz) — 2026-10-24

## Résumé
Environ 95 affirmations vérifiées (5 leçons + examen), 16 corrigées ou reformulées, 0 supprimée ; 8 sources ajoutées. Quiz : 26 questions de leçon + 15 d'examen relues, 0 réponse fausse, 3 explications corrigées (formulation). Code : `verifier-luau 00` → 4 extraits, diagnostics uniquement sur les 2 `trouve-le-bug` de l'examen (bugs volontaires, lignes correctes) ; l'extrait `+` de la leçon 01 provoque bien une erreur à l'exécution (arithmétique sur une chaîne non numérique).

Pages officielles lues en texte brut (curl des versions `.md` de create.roblox.com, `last_updated` 2026-10-23 ; API JSON du DevForum et du centre d'aide, car WebFetch reçoit des 403).

## Détail

| Leçon | Affirmation / élément | Verdict | Source | Commentaire |
|---|---|---|---|---|
| 01 | Studio gratuit, Windows et Mac | OK | create.roblox.com/docs/studio/setup | |
| 01 | Configuration requise : min. Win 10 / macOS 10.14, 3 Go ; recommandé Win 11 / macOS 14+, 8 Go | OK | idem | |
| 01 | Résolution 1600×900 placée en colonne « Minimum » | CORRIGÉ | idem | La doc la met dans la colonne **Recommended** (minimum vide) |
| 01 | Mineur : compte créé avec parent/tuteur qui accepte les conditions | OK | Terms of Use EEE/R-U/CH (en.help 52986395990932, §2.1.1) ; version US idem (« parent or legal guardian must read and consent ») | Nouvelle version en vigueur le 1er nov. 2026, même contenu sur ce point |
| 01 | 2-Step Verification | OK | en.help.roblox.com/…/212459863 | Lien ajouté aux sources |
| 01 | 11 modules, quiz ≥ 70 %, bouton « Marquer comme terminée », badge « Explorateur », 5 badges globaux, localStorage | OK | src/data/site.ts, src/data/modules.ts, src/scripts/progression.ts | |
| 01 | Quiz trouve-le-bug (`+` au lieu de `..`) | OK | — | Un seul bug, lignes 1/4/8 exactes |
| 02 | Trois rôles ; créateur = utilisateur qui crée et rend disponible du contenu | OK | Roblox Dictionary cité par create.roblox.com/docs/creator-rewards | |
| 02 | Joueur sur ordinateur, mobile, console, VR | OK | create.roblox.com/docs/production/earning-on-roblox | |
| 02 | « Pendant plusieurs années… expériences… de nouveau game » | REFORMULÉ | Terms of Use (« interactive content called Experiences ») ; docs Discovery (« game ») | Historique uniquement appuyé sur la presse ; reformulé sur ce qui est vérifiable |
| 02 | Places multiples, téléportation | OK | create.roblox.com/docs/production/publishing/publish-games-and-places | |
| 02 | Studio : 3D, physique, animations, logique, Team Create | OK | create.roblox.com/docs/get-started/tools | |
| 02 | Creator Hub : Dashboard (créations, analytics, DevEx, pubs), Creator Store, Forum, Roadmap | OK | create.roblox.com/docs/creator-hub | |
| 02 | Robux = contenu numérique, licence limitée | OK | Terms EEE §5.1 (« Robux is digital content… limited… license ») | |
| 02 | DevEx : conversion sous conditions | OK | earning-on-roblox (13+ ans, 30 000 Earned Robux) | Ajout : annonce Roblox Wallet (fin 2026, versement automatique en USD) — DevForum RDC26, staff |
| 02 | Liste des revenus (Game Passes, Developer Products, abonnements, accès payant, serveurs privés, Creator Rewards, pubs, avatars, modèles/plugins) | OK | create.roblox.com/docs/production/monetization ; earning-on-roblox | |
| 02 | Accès payant « réservé en pratique » aux jeux à communauté fidèle | REFORMULÉ | earning-on-roblox (« Creators with a dedicated fanbase ») ; monetization (bêta fermée) | |
| 02 | Creator Rewards : engagement + nouveaux joueurs | CORRIGÉ (précisé) | create.roblox.com/docs/creator-rewards | Engagement des « Active Spenders » ; joueurs nouveaux **ou réactivés** |
| 02 | Engagement-based payouts dépréciés le 24 juillet 2025 | OK | …/engagement-based-payouts | |
| 02 | Avertissement « not guaranteed… don't need financial goals » | OK | …/production/monetization | |
| 02 | Marketplace ≠ Creator Store | OK | create.roblox.com/docs/marketplace | |
| 02 | Community Standards : Safety, Civility, Integrity, Security ; jeux servant uniquement à renvoyer hors de Roblox ; objets aléatoires payants | OK | about.roblox.com/community-standards | « Creating games solely to direct users off Roblox », « Paid Random Items » |
| 02 | Creator Terms s'appliquent dès l'usage de Studio, Creator Hub, Creator Store, DevForum | REFORMULÉ | Terms EEE (« Roblox Creator Platform ») vs Terms US (« apply to all Users… use of Roblox Studio ») | Vrai pour la version européenne seulement ; les deux versions sont désormais décrites |
| 02 | Roblox Kids (5-8), Select (9-15), Roblox (16+ vérifiés) ; exigences 16+ ; tous âges (vérification, 2FA, frais ou abonnement, questionnaire, évaluation 16+ puis 250 joueurs très engagés / 60 j, revue de sécurité) | OK | create.roblox.com/docs/production/publishing/kids-and-select | |
| 02 | « Roblox has millions of games » | OK | create.roblox.com/docs/discovery | |
| 02 | DevEx : 35 000 participants, médiane 1 550 $ (année 2025) | CORRIGÉ (actualisé) | earning-on-roblox (toujours 35 000 / 1 550 $) ; about.roblox.com/newsroom/2026/09/global-impact-of-creation-on-roblox (**> 42 000, ≈ 1 500 $, 12 mois au 30 juin 2026**) | Chiffre le plus récent mis en avant, ancien mentionné avec sa date |
| 02 | Interprétation « médiane de quoi ? » | CORRIGÉ | Rapport 2025 : « the median creator **participating in the DevEx Program** receiving $1,575 » | Médiane parmi les **participants DevEx** uniquement. Supprimé « seule une petite fraction atteint le seuil » (participer ≠ atteindre le seuil) ; ajouté que les millions d'autres créateurs ne sont pas dans le calcul |
| 02 | « La qualité… comptent davantage que la chance » | REFORMULÉ | — | Affirmation non sourcée → conseil « mise sur ce que tu contrôles » |
| 02 | Signaux calculés par joueur | OK | Discovery + FAQ | |
| 03 | MVP : fonctionnalités clés, core loop, version minimale ; feedback tôt ; « finding the fun » ; « too late to pivot » | OK | create.roblox.com/docs/get-started/strategies | |
| 03 | KPI définis avant le développement ; comparer analytics et KPI ; itérer | OK | idem | |
| 03 | Parler aux joueurs / les regarder jouer | OK | idem (« Talk to your users », « Watch how users interact ») | |
| 03 | « Connaître les genres populaires augmente tes chances » | REFORMULÉ | idem (« Choosing a proven genre will increase the likelihood… ») | C'est le choix d'un genre éprouvé, pas la connaissance, qui est cité |
| 03 | Prototypage papier / Studio, détecter tôt défauts, oublis, besoins techniques ; prototype rapide et ciblé | OK | …/game-design/prototyping | |
| 03 | Jeux non originaux « ne sont plus mis en avant » (texte + quiz) | REFORMULÉ | Discovery (« no longer prioritized for recommendations ») | → « ne sont plus prioritaires » |
| 03 | Pas de pénalité après un mauvais départ, fenêtre glissante | OK | Discovery FAQ | |
| 03 | Citation DevForum 2020 « most common mistake… plan too broad » | OK | devforum…/573814 (post n°3, compte non staff) | Présentée comme retour d'expérience |
| 04 | Sorts : Recommended for You, Continue Playing, Friends List, Sponsored, Curated Sorts | OK | Discovery (« Other Home sorts ») | |
| 04 | Continue Playing = retour des joueurs fidèles | REFORMULÉ | Discovery FAQ (« Returning-user traffic comes through other sorts such as Continue ») | Attribué à la FAQ |
| 04 | Curated Sorts = sélections faites à la main, dont Live Events | CORRIGÉ | Discovery ; create.roblox.com/docs/creator-programs/standout-games | Standout Games = curated sort choisi à la main (candidature ouverte) ; Live Events n'est pas décrit comme curation manuelle → puce séparée, avec quêtes et récompenses |
| 04 | Sponsored clairement signalés | OK | Discovery FAQ (« clearly labeled ») | |
| 04 | Recherche sémantique (« food games »), toutes langues officielles | OK | Discovery (« Search ») | |
| 04 | Discover : top charts, trending, remanié pour plus de diversité | OK | Discovery | |
| 04 | Page de détails : jeux similaires | OK | Discovery | |
| 04 | Share links créés dans le Creator Dashboard, traçables, par canal | OK | …/promotion/share-links | |
| 04 | Notifications d'expérience avec opt-in | OK | Discovery (« Notifications ») | |
| 04 | Ads Manager : Home + Search ; « contrairement à la découverte organique, c'est toi qui contrôles » | OK | …/promotion/advertise | |
| 04 | Retrieval puis Ranking ; sources qui accélèrent ; ranking = uniquement joueurs organiques RFY | OK | Discovery (tableau Stage 1 / Stage 2) | |
| 04 | ≈ 100 jeux sur la Home | OK | Discovery FAQ | |
| 04 | Explore / expand | CORRIGÉ (précisé) | Discovery | Condition = « good engagement **and monetization** », exemple après une mise à jour de contenu |
| 04 | « Liste classée par importance » / « ordre d'importance » | REFORMULÉ | Discovery (tableau « Most important » / « Important ») ; FAQ « relative priority » | Deux niveaux, pas d'ordre interne → « importance relative » (leçon + examen) |
| 04 | 8 signaux, définitions, segments < 60 s / 61-180 s, D1 / D2-7 / D8-28, plafond 60 min/joueur/jeu/jour, signal négatif | OK | Discovery (« Key signals ») | Ajout précision co-play (join, invitations, serveurs privés) |
| 04 | Moyennes par joueur, petits jeux non désavantagés | OK | Discovery + FAQ | |
| 04 | Objectif rétention long terme ; valeur = rétention + monétisation long terme | OK | Discovery ; FAQ | |
| 04 | Genre non explicite ; tags exacts, sinon rebonds | OK | FAQ | |
| 04 | « Un signal seul ne décide jamais » | OK | FAQ (« no single signal that determines ranking ») | Attribution ajoutée |
| 04 | **Passage de 7 à 28 jours en juin 2026** | OK + PRÉCISÉ | about.roblox.com/newsroom/2026/06/optimizing-discovery… (15 juin 2026, J. Ciancutti) ; DevForum 4684575 (staff, 15 juin 2026) | Date exacte, raison officielle (miniatures « attrape-clic »), remplacement de QPTR par PTR + first play bounce rate. Ajout FAQ : un nouveau jeu n'attend pas 28 jours |
| 04 | Plus efficace de viser un jeu de qualité ; rétention faible → gameplay d'abord | OK | FAQ | |
| 04 | Tableau Home Recommendations avec jeux similaires (benchmarks) | OK | Discovery | |
| 04 | Titre de l'astuce « Les 60 premières secondes comptent double » | REFORMULÉ | — | « compte double » pouvait passer pour une pondération officielle |
| 04 | Problèmes limitant l'exposition (giveaways, métadonnées trompeuses, non-originaux) | OK | Discovery (« Issues that limit exposure ») | Non-originaux précisé (recommandations + recherche) |
| 04 | Non-respect des Community Standards dans la liste | OK (attribué) | FAQ (« Does Roblox ever reduce a game's reach? ») | Absent de la liste de la page Discovery, présent dans la FAQ → attribution ajoutée |
| 04 | Bandeau quotidien ; réévaluation à chaque mise à jour ; « corriger permet de retrouver » | REFORMULÉ | Discovery (« giving all games the opportunity to improve ») | « te donne une chance de » |
| 04 | Miniature personnalisée obligatoire pour RFY | OK | Discovery | |
| 04 | Personnalisation : 2 à 5 miniatures, groupes aléatoires, +8,5 % QPTR en moyenne pendant les tests | OK + PRÉCISÉ | …/publishing/thumbnails | Définition QPTR alignée sur la doc ; ajouté « moyenne de tests, pas une promesse » |
| 04 | 4 facteurs d'impressions, saisonnalité (samedi, été/rentrée, fêtes) | OK | Discovery + FAQ | |
| 04 | Pub : pas de pénalité, joueurs pub exclus, baisse possible des impressions RFY | OK | FAQ (« Ads questions ») | |
| 04 | Quiz (6 questions) | OK | Discovery, FAQ | Réponses et distracteurs justes |
| 05 | Core loop en trois « couches » | REFORMULÉ | …/game-design/core-loops | « three sections » qui forment un cycle |
| 05 | Obby = moins de construction et de script (DevForum) | OK | devforum…/573814 (post n°2, non staff) | Présenté comme conseil communautaire |
| 05 | Évaluation avant accès aux moins de 16 ans | OK | kids-and-select | |
| 05 | Conventions de noms | OK | C:\tmp\BRIEF_REDACTEUR.md | Conformes |
| Examen | Q5 DevEx (35 000) | CORRIGÉ | Newsroom sept. 2026 | Actualisé à > 42 000 et précision « médiane des participants » |
| Examen | Q9 explication « plus il pénalise » | REFORMULÉ | Discovery | Formulation officielle du signal négatif |
| Examen | Q10 « ordre d'importance » | REFORMULÉ | FAQ | « importance relative » |
| Examen | Q14 `GetService("Player")` | OK | luau-lsp : « Invalid service name 'Player' » | Erreur à l'exécution, un seul bug ligne 1 |
| Examen | Q15 `if joueur = nil then` | OK | luau-lsp : SyntaxError ligne 6 | Un seul bug |
| Examen | Autres questions (13) | OK | Leçons + sources ci-dessus | |

### Sources ajoutées
- 01 : aide officielle 2-Step Verification.
- 02 : Newsroom « The Global Impact of Creation on Roblox » (sept. 2026) ; Newsroom « Annual Roblox Economic Impact Report » (2025) ; DevForum « RDC26: What We Announced » (staff).
- 04 : Standout Games (doc) ; DevForum « Recommended For You Algorithm Improvements That Better Value Long-Term Retention » (staff, 15/06/2026) ; libellé exact de l'article Newsroom du 15 juin 2026.

Toutes les autres sources existantes ont été ouvertes et confirment le contenu (aucun lien mort).

## Erreurs restantes non corrigées
- Aucune erreur de fond connue.
- À surveiller : la page create.roblox.com « Turn your creativity into income » affiche encore les chiffres DevEx 2025 (35 000 / 1 550 $) alors que le Newsroom de septembre 2026 donne > 42 000 / ≈ 1 500 $. La leçon cite les deux, avec leur date.
- Les Terms of Use lus sont la version « Effective Date: November 1, 2026 » (publiée, pas encore en vigueur au 24/10). Les points cités (accord parental, Robux contenu numérique, portée des Creator Terms) sont identiques ou décrits pour les deux versions.
- Build : `bash scripts/build-verrou.sh` passe (code 0, 69 pages indexées) après correction par un autre agent d'une erreur temporaire dans `module-05/01-core-loop.mdx`.
