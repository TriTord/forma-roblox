# Module 07 — Notes du rédacteur pour les vérificateurs

Vérifications faites le 2026-10-24. Sources : pages create.roblox.com/docs (contenu vérifié aussi dans le dépôt officiel github.com/Roblox/creator-docs, branche main, qui génère la doc), DevForum (annonces officielles), about.roblox.com, centre d’aide Discord.

## Leçon 01 — preparer-la-page-du-jeu

| Affirmation | Source |
|---|---|
| Première publication : File > Publish, fenêtre « Game details » (icône, miniature, Name, Genre, Subgenre, Description) | https://create.roblox.com/docs/production/publishing/publish-games-and-places |
| Bonnes pratiques nom : nom stable, pas de répétition (risque de « demotion »), emojis avec modération | idem (accordéon « Metadata best practices ») |
| Description : résumer dès la 1re phrase, mots-clés pertinents, pas de spam (rétrogradation) ; exemple officiel de liste de mots-clés à éviter | idem |
| Guide description EXPÉRIMENTAL (« only meant for select creators ») : accroche ~160 caractères, sections, hashtags inutiles pour le classement, ne pas lister les contrôles, contenu adapté à tous âges ; visible sur mobile avant dépliage | https://create.roblox.com/docs/production/publishing/descriptions (page noindex, présentée comme expérimentale dans la leçon) |
| Genre : changement une fois tous les 3 mois ; Roblox peut corriger le genre ; sous-genre Classic Obby ; utilisé dans les sorts de Charts | https://create.roblox.com/docs/production/publishing/experience-genres |
| Questionnaire « Maturity & Compliance », chemin Publish settings > Content rating, labels Minimal / Mild / Moderate / Restricted / Content May Vary, publics associés, répondre selon le contenu le plus extrême, refaire après mise à jour, modération en cas de fausse déclaration, ne concerne pas l’UGC des avatars | https://create.roblox.com/docs/production/promotion/content-maturity |
| Types de comptes Roblox Kids (5-8), Select (9-15), Roblox (16+ âge vérifié) ; conditions tous âges ; évaluation : 250 parties uniques de joueurs très engagés à l’âge vérifié sur 60 jours ; tableau Audience Reach | https://create.roblox.com/docs/production/publishing/kids-and-select |
| Conditions 16+ (compte de 2 jours, vérif d’âge, 1re question → Content May Vary) ; tous âges (vérif, 2FA, Plus/Premium 2 mois ou frais remboursables 1 000 Robux, questionnaire complet Minimal/Mild/Moderate, évaluation) | publish-games-and-places + kids-and-select |
| Lancement global Kids & Select (16 juin 2026), seuils ajustés ensuite | https://devforum.roblox.com/t/roblox-kids-and-select-global-launch-upcoming-updates-to-eligibility-ads-manager-and-expedited-review/4685717 |
| Community Standards « Repetitive and Misleading Content » ; liens externes seulement via Social Links | https://about.roblox.com/community-standards (l’ancien article en.help 203313410 redirige vers cette page) |
| Problèmes qui limitent l’exposition : cadeaux/Robux dans les métadonnées, métadonnées incohérentes (exemple dinosaures), jeux non uniques ; first play bounce rate = signal négatif « most important » | https://create.roblox.com/docs/discovery |
| Pas de langage grossier dans les métadonnées, même en Restricted | https://create.roblox.com/docs/projects/configure-games (section Allow strong language) |

## Leçon 02 — icone-et-miniatures

| Affirmation | Source |
|---|---|
| Icône carrée, au moins 512×512, réduite parfois à 150×150 ; une icône par langue ; modération ; chemin Configurations > Places > lieu de départ > Icon ; bonnes pratiques (qualité, contenu pertinent, couleur/contraste) | https://create.roblox.com/docs/production/publishing/experience-icons |
| Miniatures 16:9, idéalement 1920×1080, formats jpg/gif/png/tga/bmp, jusqu’à 10 images ou vidéos, vidéos : quota 3 envois/mois, étirement si pas 16:9, éviter le bas de l’image, règles d’authenticité des vidéos (autorisé / interdit), vidéo affichée en premier | https://create.roblox.com/docs/production/publishing/thumbnails |
| Caméra libre : Maj gauche + P pendant un test solo | idem (section Free camera mode) |
| Thumbnail personalization : 2 à 5 miniatures actives, < 3 Mo et 1920×1080, algorithme explore/exploite, tableau Thumbnail Performance, +8,5 % en moyenne pendant les tests (présenté comme chiffre Roblox, pas garantie), garder plusieurs actives | idem |
| Miniature personnalisée obligatoire pour les recommandations Home | https://create.roblox.com/docs/discovery (Best practices) |
| Pas d’outil officiel d’A/B test d’icônes : seulement une demande de fonctionnalité (pas de réponse du staff trouvée) | https://devforum.roblox.com/t/icon-ab-testing/3274267 |
| Experiments = A/B tests de valeurs de config, 14 à 60 jours, difficile sous 1 000 DAU | https://create.roblox.com/docs/production/experiments |

## Leçon 03 — lancer-et-publicite

| Affirmation | Source |
|---|---|
| Early testers : jusqu’à 10 amis d’âge proche / amis de confiance, File > Invite early testers, filigrane, outils de signalement actifs | publish-games-and-places |
| Manage Audience (Friends) ; Exclude from recommendations dans Audience > Advanced Settings | idem |
| Ads Manager : 13+ et e-mail vérifié ; carte 18+ ; Robux → crédits dès 13 ans, irréversible, minimum 1 crédit ; objectifs Plays / Earnings (Limited) / Engagement ; audiences ; auto-bidding ; budget quotidien ou total ; 10 miniatures ; affichage Home + recherche automatique ; moderation visée < 24 h ; annulation jusqu’à 6 h avant ; attribution jusqu’à 30 jours ; données jusqu’à 48 h ; remboursement fraude ; « Running ads does not affect how your game ranks in Recommended For You » ; jeux non uniques → pas de dépense ; conseil 3-5 jours puis améliorer l’onboarding | https://create.roblox.com/docs/production/promotion/ads-manager (vérifié aussi sur la page en ligne via WebFetch) |
| Recommandations : les autres sources accélèrent la prise en compte, mais le classement dépend seulement des joueurs organiques RFY | https://create.roblox.com/docs/discovery |
| Share links + LaunchData ; Advanced join options + LaunchData visible dans l’URL et partageable ; récompenses cosmétiques pour joueurs venus d’une pub | share-links, ads-manager |
| `Player:GetJoinData().LaunchData` (string) | https://create.roblox.com/docs/reference/engine/classes/Player#GetJoinData |
| Exemple coût par partie (20 $ / 400 = 0,05 $) : calcul pédagogique, pas un chiffre Roblox | — |

## Leçon 04 — mises-a-jour-et-evenements

| Affirmation | Source |
|---|---|
| LiveOps : cadence de contenu, grosses mises à jour, QoL, bugs | https://create.roblox.com/docs/production/game-design/liveops-essentials |
| Beaucoup de jeux : contenu toutes les 2 semaines à 1 mois ; moins de 3 semaines d’effort par mise à jour de cadence | https://create.roblox.com/docs/production/game-design/content-updates |
| Publier ne migre pas les joueurs ; redémarrer si le format de données change ; Configurations > Server management > Restart Servers ; options « Restart only servers with outdated versions » (recommandée) et « Delay server restart » 1-60 min ; arrêt du matchmaking, téléportation groupée ; configs pour sortir du contenu sans redémarrer | https://create.roblox.com/docs/projects/update-games |
| `DataModel.ServerRestartScheduled(restartTime: DateTime, source: Enum.CloseReason, attributes: Dictionary)`, DeveloperUpdate / RobloxMaintenance, côté serveur, non déprécié | https://create.roblox.com/docs/reference/engine/classes/DataModel (+ DataModel.yaml du dépôt) |
| Configs / ConfigService : modifier des valeurs sans redémarrer | https://create.roblox.com/docs/production/configs |
| Événements : Engagement > Events & Updates ; champs ; privé/public ; max 10 en cours ou à venir ; Join Event / Notify Me ; page partageable ; onglet Events de la communauté ; Trending Events (7 jours, 1 000 RSVP, public) ; Off-Platform Featuring (13+, 7 jours avant) ; annonces de mise à jour 60 caractères, une tous les 3 jours | https://create.roblox.com/docs/production/promotion/experience-events |
| Règles des notifications : pas de pub déguisée ni de fausse urgence | https://create.roblox.com/docs/production/promotion/experience-notifications (include guidelines) |
| Découverte : « What you do » influence les signaux | https://create.roblox.com/docs/discovery |

## Leçon 05 — communaute

| Affirmation | Source |
|---|---|
| Groups renommés Communities ; « Groups » conservé dans le Creator Hub (21 nov. 2024) | https://devforum.roblox.com/t/introducing-roblox-communities/3268307 |
| Créer un groupe coûte 100 Robux ; jusqu’à 3 liens sociaux ; Roblox n’arbitre pas les conflits ; permissions forum/annonces/modération/analytics ; 2FA requise pour attribuer certaines permissions | https://create.roblox.com/docs/projects/groups |
| Forums ouverts à tous les propriétaires de communautés (21 août 2025), 13+ connectés ; Walls en lecture seule le 1er déc. 2025, suppression annoncée début 2026 ; Blocked Words, Verified Joins, bans | https://devforum.roblox.com/t/forums-are-now-live-for-all-community-owners/3892463 |
| Recommandations pour la page communauté (nom du studio, liens sociaux…) | https://create.roblox.com/docs/production/promotion (section Communities) |
| Social links : ajout et visibilité réservés aux 16+ à l’âge vérifié ; jusqu’à 3 ; pas de lien dans le jeu ; exemples de textes autorisés/interdits ; Engagement > Social Links | https://create.roblox.com/docs/production/promotion/social-media-links + Community Standards |
| Discord : au moins 13 ans, jusqu’à 16 ans dans certains pays | https://support.discord.com/hc/articles/360040724612 |
| Tableau Feedback (Audience > Feedback) | https://create.roblox.com/docs/production/analytics/feedback |
| Conseil LiveOps : la raison derrière la suggestion compte plus | liveops-essentials |
| `GroupService:GetRolesInGroupAsync(userId, groupId)` → `{IsMember, Roles = {Id, Name, Rank}}`, cache, utiliser Id stable ; `Player:GetRankInGroupAsync` / `GetRoleInGroupAsync` dépréciés ; `IsInGroup` déprécié au profit de `IsInGroupAsync` | https://create.roblox.com/docs/reference/engine/classes/GroupService (+ Player.yaml / GroupService.yaml du dépôt, et globalTypes.d.luau) |

## Points incertains / à surveiller

1. **Seuils Kids & Select** : la page doc actuelle indique 250 parties uniques de joueurs très engagés sur 60 jours et des frais d’examen accéléré de 50 000 Robux ; l’annonce DevForum de juin 2026 parlait de 500 HEP et 100 000 Robux (avant ajustements de juillet-août). Les conditions de remboursement des frais de 1 000 Robux diffèrent entre publish-games-and-places (25 joueurs très engagés pendant 60 jours) et la FAQ kids-and-select (remboursement automatique 90 jours après l’éligibilité). La leçon ne donne donc que le seuil de la page doc avec mention datée, et renvoie aux pages officielles pour les frais.
2. **Chemins de menus du Creator Dashboard** : les pages doc ne sont pas toujours cohérentes entre elles (ex. « Publish settings » vs « Audience »). Les chemins sont présentés « au moment de la rédaction ».
3. **Annonces de communauté** : elles existent dans les permissions documentées (view/create community announcements) ; je n’ai pas trouvé d’annonce de lancement dédiée.
4. **Walls** : suppression annoncée pour « début 2026 » ; je n’ai pas vérifié si elle est effective, d’où la formulation « Roblox a annoncé leur suppression ».
5. La page social-media-links liste encore Guilded parmi les types de liens alors que Guilded a été arrêté fin 2025 (annonce DevForum « Update on Guilded and Communities ») : Guilded n’est pas cité dans la leçon.
6. Pas de limite officielle trouvée pour la longueur du nom ; seul le guide expérimental mentionne une limite de 1 000 caractères pour la description (non reprise dans la leçon).
7. Réglage des appareils pris en charge : pas de page doc trouvée décrivant ce réglage ; la leçon se limite à conseiller de mentionner les appareils dans la description (guide descriptions).
8. Premium Payouts / Creator Rewards : non mentionnés dans ce module.
