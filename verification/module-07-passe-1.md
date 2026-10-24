# Module 07 — passe 1 (vérificateur : faits + sources + quiz) — 2026-10-24

## Résumé
94 affirmations vérifiées (5 leçons + examen), 11 corrigées ou reformulées, 0 supprimée ; quiz : 25 questions de leçon et 14 questions d'examen vérifiées, toutes justes (bonnes réponses, distracteurs et numéros de ligne des 5 `trouve-le-bug` contrôlés) ; code : `node scripts/verifier-luau.mjs 07` donne 10 extraits analysés et 1 seul diagnostic, le bug volontaire du quiz 5 de la leçon 03 (`player.GetJoinData()`). Build `bash scripts/build-verrou.sh` : code de sortie 0.

Méthode : pages create.roblox.com ouvertes avec WebFetch, et sources YAML/MD du dépôt officiel github.com/Roblox/creator-docs (branche main) téléchargées pour l'API (`GroupService.yaml`, `Player.yaml`, `DataModel.yaml`, `CloseReason.yaml`, `production/promotion/index.md`, `experience-icons.md`, `thumbnails.md`).

## Détail

| Leçon | Affirmation / élément | Verdict | Source | Commentaire |
|---|---|---|---|---|
| 01 | Game details à la 1re publication (icône, miniature, nom, genre, sous-genre, description) | OK | publish-games-and-places | |
| 01 | « La doc explique que Roblox utilise le nom et la description pour comprendre le jeu » | REFORMULÉ | publish-games-and-places | La page Discovery ne le dit pas ; la page de publication dit que les mots-clés aident « players and Roblox to understand the themes and genres ». Texte aligné sur cette phrase et attribué à la bonne page. |
| 01 | Nom stable, pas de répétition (demotion), emojis avec modération | OK | publish-games-and-places | |
| 01 | Description : résumer dès la 1re phrase, mots-clés pertinents, bourrage = rétrogradation | OK | publish-games-and-places | |
| 01 | « obby parkour tycoon… » = « exactement l'exemple » de la doc | REFORMULÉ | publish-games-and-places | L'exemple officiel est « Play our fun granny obby game. Obby obby… » suivi de noms de jeux. Remplacé par « le même type de description ». |
| 01 | Guide descriptions expérimental (~160 caractères, structure en 4 parties, hashtags déconseillés, contrôles, tous âges, visible sur mobile) | OK | descriptions | Page bien marquée « experimental and only meant for select creators ». |
| 01 | Genre : changement une fois tous les 3 mois, correction par Roblox (e-mail, appel), Charts, boucle principale, Classic Obby | OK | experience-genres | |
| 01 | « Genre et maturité sont deux choses séparées » | OK | content-maturity | La page maturité le dit (descripteurs vs genres). |
| 01 | Questionnaire Maturity & Compliance, chemin Publish settings > Content rating, descripteurs, conformité régionale | OK | content-maturity | |
| 01 | Tableau des labels (Minimal/Mild → Kids, Select, 16+ ; Moderate → Select, 16+ ; Restricted → 18+ vérifié ; Content May Vary → 16+ vérifié) | OK | content-maturity + kids-and-select | « Roblox (16+) allows all rated content except Restricted ». |
| 01 | Répondre selon le contenu le plus extrême, refaire après mise à jour, UGC avatar exclu, sanctions | OK | content-maturity | |
| 01 | Comptes Kids (5-8), Select (9-15), Roblox (16+ vérifié) | OK | kids-and-select | Select = aussi « 9+ auto-déclaré tant que l'âge n'est pas vérifié » ; simplification acceptable. |
| 01 | Conditions 16+ (2 jours, vérif d'âge, 1re question → Content May Vary) | OK | publish-games-and-places | Citation : « answer No… Content May Vary… only to age-checked users 16+ ». |
| 01 | Conditions tous âges (vérif, 2FA, Plus/Premium 2 mois ou 1 000 Robux, questionnaire complet, évaluation) | OK | publish-games-and-places + kids-and-select | |
| 01 | Seuil d'évaluation 250 parties uniques de joueurs très engagés, 60 jours | OK + complété | kids-and-select ; DevForum 4685717 (16 juin 2026) ; DevForum 4820164 (19 août 2026) | Contradiction tranchée : 500 (annonce de juin, confirmé le 16 juillet) puis 250 depuis le 19 août 2026 (annonce staff RbxRocketMan), chiffre repris par la doc actuelle. Historique ajouté dans l'encadré « Des règles qui bougent vite ». |
| 01 | Remboursement des 1 000 Robux | REFORMULÉ (ajout prudent) | publish-games-and-places ; kids-and-select | Divergence documentée entre les deux pages officielles (25 HEP pendant 60 jours vs remboursement automatique 90 jours après l'éligibilité) : les deux versions sont citées, avec renvoi aux pages officielles. |
| 01 | Frais d'examen accéléré 50 000 vs 100 000 Robux | NON REPRIS (volontaire) | kids-and-select (50 000) ; DevForum juin 2026 (100 000) | La leçon ne parle pas de l'examen accéléré ; rien à corriger. La doc actuelle indique 50 000. |
| 01 | Community Standards « Repetitive and Misleading Content » (métadonnées trompeuses, « confusingly similar », duplication, jeux pour sortir de Roblox) ; liens externes via Social Links seulement | OK | about.roblox.com/community-standards | |
| 01 | Discovery : récompense monétaire non prioritaire, exemple dinosaures, jeux non uniques, first play bounce rate parmi les signaux les plus importants | OK | discovery | |
| 01 | Pas de langage fort dans les métadonnées, même avec le réglage activé | OK | configure-games | Source ajoutée dans `<Sources>`. |
| 01 | Sources | CORRIGÉ | — | Ajout de l'annonce DevForum du 19 août 2026 et de configure-games. Tous les liens ouverts. |
| 02 | Icône carrée ≥ 512×512, réduite à 150×150, une par langue, modération, chemin Configurations > Places > lieu de départ > Icon, 3 bonnes pratiques, icône générée par défaut | OK | experience-icons | |
| 02 | Miniatures 16:9, 1920×1080, jpg/gif/png/tga/bmp, 10 max, 3 vidéos/mois, étirement, bas de l'image, onglets Home Page / Experience Detail Page, Videos | OK | thumbnails | |
| 02 | Vidéo en premier ; refusée compte dans le quota ; listes autorisé / interdit | OK | thumbnails | |
| 02 | Caméra libre Maj gauche + P en test solo | OK | thumbnails | |
| 02 | Thumbnail personalization : 2 à 5 actives, < 3 Mo, ≤ 1920×1080, Edit active thumbnails / Save / Start, algorithme, +8,5 % en moyenne (présenté comme non garanti) | OK | thumbnails | |
| 02 | Colonnes du tableau Thumbnail Performance | REFORMULÉ | thumbnails | Ajout de « notamment » (le tableau a aussi Status et Winning Segment). |
| 02 | Garder plusieurs miniatures actives, tester à chaque grosse mise à jour | OK | thumbnails | |
| 02 | Miniature personnalisée obligatoire pour les recommandations Home | OK | discovery | |
| 02 | Pas d'outil officiel d'A/B test d'icônes | OK | DevForum 3274267 | Demande de fonctionnalité (nov. 2024), réponses jusqu'en juillet 2026, aucune réponse staff ; aucune annonce de lancement trouvée. |
| 02 | Experiments : valeurs de config, 14-60 jours, difficile sous 1 000 DAU | OK | experiments | |
| 02 | Play through rate et bounce rate au même niveau de priorité | OK | discovery | |
| 03 | Early testers : 10 amis d'âge proche / trusted friends, File > Invite early testers, filigrane | OK | publish-games-and-places | |
| 03 | Manage Audience (Friends) ; Exclude from recommendations dans Audience > Advanced Settings | OK | publish-games-and-places | |
| 03 | Share links (onglet Share Links, analytics par lien, LaunchData) | OK | share-links | |
| 03 | Invitations en jeu via SocialService | OK | invite-prompts | |
| 03 | Autres sources accélèrent, classement RFY seulement sur joueurs organiques | OK | discovery | |
| 03 | « Running ads does not affect RFY ranking » ; jeux non uniques → aucune dépense | OK | ads-manager | |
| 03 | Accès Ads Manager « rubrique Advertise » | REFORMULÉ | ads-manager | La doc renvoie au portail create.roblox.com/advertise ; pas de « rubrique Advertise » décrite. |
| 03 | 13+ et e-mail vérifié ; carte 18+ ; crédits dès 13 ans, irréversibles | OK | ads-manager | |
| 03 | Objectifs Plays / Earnings (Limited) / Engagement | OK | ads-manager ; DevForum 4685717 | |
| 03 | Audiences récentes / parties | CORRIGÉ (précisé) | ads-manager | Ajout des seuils officiels : 10 000 joueurs récents, 20 000 joueurs partis. |
| 03 | Auto-bidding, budget quotidien / total, 10 miniatures, Home + recherche automatique | OK | ads-manager | « automatically shown on both the Home page and in search results ». |
| 03 | Modération < 24 h, annulation jusqu'à 6 h avant | OK | ads-manager | |
| 03 | Attribution 30 jours, données 48 h | OK | ads-manager | |
| 03 | Remboursement du trafic frauduleux | CORRIGÉ (précisé) | ads-manager | Ajout des délais officiels (analyse à J+14, remboursement à J+16). |
| 03 | 3-5 jours puis améliorer l'onboarding ; « la plupart des campagnes ont besoin de plusieurs jours » | OK | ads-manager | « Most campaigns require several days to produce meaningful results. » |
| 03 | Comparaison des visuels par campagne | OK | ads-manager | « breakdown of your metrics at the asset level ». |
| 03 | LaunchData visible dans l'URL, récompense cosmétique | OK | ads-manager | |
| 03 | `Player:GetJoinData().LaunchData` de type string | OK | Player.yaml (creator-docs) | |
| 03 | Exemple 20 $ / 400 parties | OK | — | Calcul pédagogique, présenté comme tel. |
| 03 | Encadré « Aucune garantie » | OK | — | Aucune promesse de succès dans la leçon. |
| 04 | 4 types de mises à jour LiveOps | OK | liveops-essentials | |
| 04 | Cadence 2 semaines à 1 mois, < 3 semaines d'effort, réutiliser les systèmes | OK | content-updates | |
| 04 | « What you do » influence les signaux | OK | discovery | |
| 04 | Publier ne migre pas les joueurs ; redémarrer si le format de données change | OK | update-games | |
| 04 | Configurations > Server management > Restart Servers ; « outdated versions » recommandé ; délai 1-60 min | OK | update-games | |
| 04 | « Roblox arrête d'envoyer de nouveaux joueurs vers ces serveurs » | REFORMULÉ | update-games | Seul le matchmaking via Jouer est arrêté ; invitations, téléportations et profils d'amis restent possibles. |
| 04 | Téléportation groupée vers le même nouveau serveur | OK | update-games | |
| 04 | `DataModel.ServerRestartScheduled(restartTime: DateTime, source: CloseReason, attributes: Dictionary)`, DeveloperUpdate / RobloxMaintenance, non déprécié | OK | DataModel.yaml + CloseReason.yaml | « The actual restart may happen slightly after this projected time, but not before » : cohérent avec « l'heure la plus proche ». `deprecation_message: ''`. |
| 04 | Code serveur et client (compte à rebours, SetCore protégé par pcall) | OK | — | luau-lsp sans diagnostic ; bon emplacement, WaitForChild côté client, pas d'API dépréciée. |
| 04 | Configs / ConfigService sans publier ni redémarrer ; contenu caché derrière une config | OK | configs ; update-games | |
| 04 | Events & Updates : chemin, bouton, champs, privé / public, max 10, Join Event / Notify Me, page partageable, onglet Events du groupe | OK | experience-events | |
| 04 | Trending Events (7 jours, 1 000 RSVP, public) | OK | experience-events | |
| 04 | Off-Platform Featuring (13+, 7 jours avant) | CORRIGÉ (précisé) | experience-events | Ajout de l'e-mail lié et de l'option « Submit for Featuring ». |
| 04 | Annonces de mise à jour : 60 caractères, une tous les 3 jours, joueurs ayant activé les notifications, être précis | OK | experience-events | |
| 04 | Notifications : pas de pub déguisée ni de fausse urgence | OK | experience-notifications | |
| 05 | Groups → Communities (21 nov. 2024), « Groups » conservé dans le Creator Hub | OK | DevForum 3268307 (staff) | Le nom des API (`GroupService`) est un fait constaté dans la référence API, pas dans l'annonce. |
| 05 | Groupe à 100 Robux, 3 liens sociaux, Roblox n'arbitre pas, permissions, 2FA pour certaines permissions | OK | groups | |
| 05 | Recommandations pour la page de communauté (nom du studio, visuels, liens sociaux) | OK | promotion (index.md, section Communities) | Vérifié dans le source du dépôt (le rendu WebFetch tronquait la page). |
| 05 | Forums pour tous (21 août 2025), 13+ connectés ; murs en lecture seule le 1er déc. 2025 ; suppression | CORRIGÉ (précisé) | DevForum 3892463 | Précisé « suppression complète annoncée pour début 2026, messages non transférés vers les forums ». La suppression effective n'est confirmée que par des médias tiers, d'où la formulation « annoncée ». |
| 05 | Blocked Words, Verified Joins, bans, rôles | OK | DevForum 3892463 ; groups | |
| 05 | Social Links : 16+ vérifié pour ajouter et voir, 3 max, Engagement > Social Links, pas de lien en jeu, exemples | OK | social-media-links ; Community Standards | |
| 05 | Discord : 13 ans minimum, plus dans certains pays (jusqu'à 16) | OK | support.discord.com 360040724612 | Page en 403 pour WebFetch ; contenu confirmé par l'extrait indexé (13 ans par défaut, 14-15 ou 16 selon les pays). |
| 05 | Tableau Feedback (Audience > Feedback) | OK | feedback | |
| 05 | « La raison derrière la suggestion compte plus » | OK | liveops-essentials | « Even more important than players' specific suggestions is the reasoning behind them. » |
| 05 | `GroupService:GetRolesInGroupAsync(userId, groupId)` → `{IsMember, Roles = {Id, Name, Rank}}` | OK | GroupService.yaml | Existe, non dépréciée, renvoie seulement les rôles publics (rôles triés du plus haut au plus bas). |
| 05 | Dépréciation de `Player:GetRankInGroupAsync` / `GetRoleInGroupAsync` | OK + complété | Player.yaml | Messages officiels : « returns only the member's highest public role. Use GroupService:GetRolesInGroupAsync() ». Ajout de la mention des méthodes historiques `Player:GetRankInGroup` / `GetRoleInGroup`, elles aussi dépréciées. |
| 05 | Cache des résultats « visible seulement à la prochaine connexion » | REFORMULÉ | GroupService.yaml | La doc parle d'un cache par utilisateur et par groupe, valable jusqu'à expiration. Texte corrigé, et précision que seuls les rôles publics sont renvoyés. |
| 05 | Code `GetRolesInGroupAsync` (pcall + vérification de `ok`, `Roles` vide pour un simple membre → « Membre ») | OK | — | Comportement conforme : `Roles` est vide si l'utilisateur n'a pas de rôle autre que le rôle de base. |
| Quiz 01 | 5 questions | OK | cf. ci-dessus | |
| Quiz 02 | 5 questions | OK | thumbnails, experience-icons, DevForum 3274267 | |
| Quiz 03 | 5 questions, `trouve-le-bug` (ligne 4, `.` au lieu de `:`) | OK | Player.yaml | Ligne 10 = `Players.PlayerAdded:Connect(...)` : numérotation juste ; seul diagnostic luau-lsp = le bug voulu. |
| Quiz 04 | 5 questions, `trouve-le-bug` (ligne 5, `DateTime - number`) | OK | DataModel.yaml | |
| Quiz 05 | 5 questions, `trouve-le-bug` (ligne 9, `ok` non vérifié) | OK | — | |
| Examen | 14 questions, 2 `trouve-le-bug` (ligne 3 `LocalPlayer` côté serveur ; ligne 5 `~= nil`) | OK | — | Numéros de ligne vérifiés ; un seul bug par extrait ; distracteurs faux (ex. itération généralisée Luau sans `pairs`). |

## Erreurs restantes non corrigées
- Aucune erreur factuelle connue.
- Point à surveiller : les règles Kids & Select (seuil d'entrée, remboursement des frais de 1 000 Robux, examen accéléré) ont changé quatre fois entre juin et août 2026, et les deux pages officielles se contredisent encore sur le remboursement. Les deux versions sont citées dans la leçon 01, qui renvoie aux pages officielles. À revérifier à chaque mise à jour du site.
- La suppression effective des murs de communauté (prévue début 2026) n'est confirmée que par des médias tiers : la leçon garde la formulation « annoncée ».
