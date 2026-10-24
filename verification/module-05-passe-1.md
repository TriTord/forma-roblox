# Module 05 — passe 1 (vérificateur : faits + sources + quiz) — 2026-10-24

## Résumé
72 affirmations ou éléments vérifiés sur les sources (27 pages ouvertes le 2026-10-24), dont 49 OK, 21 corrigés ou reformulés et 2 supprimés (remplacés). Quiz : 25 questions de leçon et 13 d'examen relues. 3 explications corrigées, 1 option corrigée, 1 extrait `trouve-le-bug` harmonisé (noms de champs) ; tous les numéros de ligne des 8 `trouve-le-bug` sont justes, avec un seul bug par extrait. Code : `verifier-luau 05` donne 16 extraits et 3 avec diagnostics, tous attendus (`Unknown require` sur des extraits isolés, `FunctionUnused` sur une fonction d'intégration). 3 corrections d'intégration avec les modules 3 et 4. Build `scripts/build-verrou.sh` : code 0.

Toutes les affirmations de « recette » restantes sont soit sourcées par la doc Roblox ou NN/g, soit présentées explicitement comme des choix de la formation : les 60 secondes, la formule action → récompense → progression, les zones, les prix, l'absence de perte à la mort, les séries sans punition, le rythme mensuel conseillé à un créateur seul et la checklist du spawn. Aucune statistique non sourcée ne reste.

## Détail
| Leçon | Affirmation / élément | Verdict | Source | Commentaire |
|---|---|---|---|---|
| 01 | Définition de la core loop, ses 3 parties, « repetitive, boring, and shallow » | OK | https://create.roblox.com/docs/production/game-design/core-loops | Citations conformes |
| 01 | Exemple RPG d'action : explorer → combattre → améliorer | OK | idem | |
| 01 | La page Core loops ne parle pas des boucles méta (dit dans le texte) | OK | idem | Vérifié : aucune mention des boucles courtes, longues ou méta |
| 01 | Formule « action → récompense → progression » | REFORMULÉ | — | Présentée comme une simplification de la formation |
| 01 | « Très souvent, la réponse tient dans la boucle » | REFORMULÉ | — | Affirmation généralisante adoucie |
| 01 | Conseils J1 : boucle claire et fun, défi équilibré, récompenses | OK | https://create.roblox.com/docs/production/analytics/retention | |
| 01 | « Imperative to provide clear feedback », exemple Winds of Fortune | OK | https://create.roblox.com/docs/production/game-design/onboarding-techniques | |
| 01 | LiveOps : toute fonctionnalité reliée à la core loop | OK | https://create.roblox.com/docs/production/game-design/liveops-essentials | |
| 01 | Core curriculum : pièces échangées contre de la puissance de saut | OK | https://create.roblox.com/docs/tutorials/curriculums/core | |
| 01 | Vérifier la boucle dès le prototype | OK | https://create.roblox.com/docs/production/game-design/prototyping | Lien ajouté aux Sources |
| 01 | Un son « renforce énormément » la récompense | REFORMULÉ | — | Non sourcé, remplacé par « peut renforcer… à vérifier en playtest » |
| 01 | Commentaire du code : les valeurs « sautent » au chargement de la sauvegarde | CORRIGÉ | module 4 leçon 2 (`creerLeaderstats`) | Le module 4 crée les leaderstats avec les valeurs chargées, donc pas de saut. Le délai est gardé comme sécurité, avec un commentaire juste |
| 01 | Quiz Q3 : l'explication disait qu'atteindre un checkpoint se répète « toutes les quelques secondes » | CORRIGÉ | — | Contredisait le tableau de la leçon (boucle principale, en minutes) |
| 01 | Quiz Q5 (`trouve-le-bug`) : ligne 11, `Connect(afficher(...))` | OK | — | Lignes vérifiées ; un seul bug |
| 01 | Lien « Design games on Roblox » dans les Sources | OK | https://create.roblox.com/docs/production/game-design | Page d'ensemble valide |
| 02 | « New players typically decide their interest… within minutes » | OK | https://create.roblox.com/docs/production/game-design/onboarding | |
| 02 | Les 3 objectifs de l'onboarding | OK | idem | |
| 02 | Détail de « Amener vite au plaisir » (« premiers objets, jeu avec les autres ») | CORRIGÉ | idem | Remplacé par les 3 moyens officiels : progression, motivations sociales, objets ou monnaie de départ |
| 02 | Moment de joie : récompenses, animations, effets de célébration ; objectifs visibles | OK | idem | |
| 02 | Experiments : « a shorter dialogue sequence versus a guided arrow » | OK | idem | |
| 02 | FTUE rapides sur Roblox, majorité sur mobile, jeunes joueurs et interfaces chargées de texte | OK | https://create.roblox.com/docs/production/game-design/design-for-roblox | Citations vérifiées |
| 02 | « Ideally in 5 minutes or less », définition de J1 | OK | https://create.roblox.com/docs/production/analytics/retention | |
| 02 | « 60 secondes » présenté comme un objectif de la formation | OK | — | Encadré et quiz déjà honnêtes |
| 02 | Les 3 techniques, l'exemple 10 s / 11 s, l'indice « montré une seule fois » | OK | https://create.roblox.com/docs/production/game-design/onboarding-techniques | |
| 02 | Éléments visuels temporaires ; tutoriels « juste à temps » | OK | idem | |
| 02 | Pas de traduction nécessaire, ce qui « aide les plus jeunes, les étrangers, le téléphone » | REFORMULÉ | idem | La doc parle d'un public mondial et de la localisation ; l'extrapolation est maintenant séparée de la citation |
| 02 | Color or Die « impossible to miss… » ; traînée « strongly suggest… » | OK | idem | |
| 02 | Checklist du spawn « découle des conseils » | REFORMULÉ | — | Présentée comme choix de conception de la formation, appuyé sur les conseils officiels |
| 02 | Entonnoir d'onboarding, événements envoyés seulement depuis le serveur et dans un jeu publié | OK | https://create.roblox.com/docs/production/analytics/funnel-events | |
| 02 | « Le Creator Dashboard te montre… » | CORRIGÉ | idem | Remplacé par « page Funnel du tableau de bord Analytics (Creator Hub) », comme dans la doc |
| 02 | Avertissement Experiments : moins de 1 000 DAU | OK | https://create.roblox.com/docs/production/experiments | C'est un avertissement, pas une exigence ; formulation déjà prudente |
| 02 | API Beam (Attachment0/1, FaceCamera, Width0/1, Color) | OK | https://create.roblox.com/docs/reference/engine/classes/Beam | Rien de déprécié |
| 02 | Code : faisceau et indice minuté (LocalScripts, `WaitForChild`, streaming) | OK | — | `Etape = 0` au départ, conforme à la convention (module 3 l.5, module 4 l.1) |
| 02 | Quiz (5 questions) | OK | — | `trouve-le-bug` : ligne 8, numérotation juste |
| 03 | Trop vite → manque de contenu ; trop lent → ennui ; mesurer les joueurs par niveau | OK | https://create.roblox.com/docs/production/analytics/retention | |
| 03 | Zones et paliers | REFORMULÉ | — | Indiqué comme choix de la formation |
| 03 | Courbe « en dents de scie » | OK | — | Déjà présentée comme non officielle |
| 03 | « Introduire un obstacle à la fois » | REFORMULÉ | — | Présenté comme pratique courante de level design, pas comme règle Roblox |
| 03 | « Le pic de difficulté au début fait fuir les nouveaux joueurs » | REFORMULÉ | https://create.roblox.com/docs/production/game-design/onboarding | Affirmation causale non sourcée, rattachée aux recommandations officielles (amener vite au plaisir, premiers paliers bas) |
| 03 | « La surprise est un levier puissant, c'est pour cela que Roblox encadre… » | SUPPRIMÉ | — | Motivation prêtée à Roblox sans source. Remplacé par « quand ce hasard est payant, Roblox l'encadre » |
| 03 | Objets aléatoires payants : cotes exactes et chiffrées, bénéfice garanti, utilisateurs éligibles | OK + précisé | https://about.roblox.com/community-standards | Ajout de l'attribut `ArePaidRandomItemsRestricted` cité par les Standards |
| 03 | « Plus la quête est difficile, plus la récompense a de valeur » | OK | https://create.roblox.com/docs/production/game-design/introduction-to-quest-design | |
| 03 | Premiers paliers bas | OK | https://create.roblox.com/docs/production/game-design/onboarding | |
| 03 | Intégration de `Recompenses.valider` (« à appeler depuis ta validation ») | CORRIGÉ | module 3 l.5, module 4 l.1 | Ces scripts font déjà `etape.Value = numero`. Le texte précise de remplacer cette ligne et donne le `require` |
| 03 | Sinks : définition et cosmétiques à durée limitée | OK | https://create.roblox.com/docs/production/game-design/balance-virtual-economies | |
| 03 | « Planifier les puits avant d'ajouter de nouvelles sources » | REFORMULÉ | idem | Formulation alignée sur la doc (« imperative to have plans for how to sink… ») |
| 03 | Le mot « inflation » | REFORMULÉ | idem | La page parle de « surplus » ; c'est maintenant dit dans la leçon et dans l'examen |
| 03 | Exemple de surplus, monnaie d'événement « safest solution », espérance (EV) | OK | idem | |
| 03 | Calcul 20 + 31 + 50 = 101 ; prix 30, 120 et 400 | OK | — | Arithmétique vérifiée ; prix présentés comme points de départ |
| 03 | Garde-fou « aucune perte de pièces à la mort » attribué aux recommandations Roblox | REFORMULÉ | — | Présenté comme choix de la formation |
| 03 | Missions régulièrement ratées → intérêt qui baisse | OK | https://create.roblox.com/docs/production/game-design/season-pass-design | |
| 03 | Quiz (5 questions) | OK | — | Q4 : 3 + 10 = 13 juste ; `trouve-le-bug` ligne 7 juste |
| 04 | Touristes et habitués (« almost all a game's engaged user base »), jeux solo, invitations, serveurs privés | OK | https://create.roblox.com/docs/production/game-design/design-for-roblox | |
| 04 | Leviers J1, J7, J30 | OK | https://create.roblox.com/docs/production/analytics/retention | |
| 04 | Exemples sociaux pour J30 (« classements ») | CORRIGÉ | idem | La page cite « trading, parties, guilds, and competitive systems ». Texte et option de quiz Q1 alignés |
| 04 | Quêtes : « objectifs variés encouragent d'autres façons de jouer » | REFORMULÉ | https://create.roblox.com/docs/production/game-design/introduction-to-quest-design | Paraphrase plus fidèle ; les idées de variété sont présentées comme des exemples de la formation |
| 04 | Quotidiennes : courtes, modestes, 24 h, court terme, « resource drip » | OK | idem | |
| 04 | Intégration du module `ObjectifsQuotidiens` (table de données « supposée accessible ») | CORRIGÉ | module 4 l.2 (`DonneesJoueurs.Obtenir`) | L'extrait utilise maintenant `DonneesJoueurs.Obtenir(player)` et explique où l'appeler (après `pieces.Value += VALEUR_PIECE`) |
| 04 | Noms des champs `JourObjectif`, `PiecesDuJour`, `BonusReclame` | CORRIGÉ | module 4 l.2 | Passés en minuscules (`jourObjectif`…), comme les clés `etape`, `pieces` et `inventaire` du module 4 ; quiz `trouve-le-bug` mis à jour (mêmes lignes) |
| 04 | « La série qui punit » (corvée, culpabilisation) | REFORMULÉ | https://create.roblox.com/docs/production/game-design/season-pass-design | Présentée comme choix éthique de la formation |
| 04 | Quiz Q4 : l'explication prêtait à Roblox « ne pas pénaliser l'attente » | CORRIGÉ | idem | Absent de la doc ; reformulé avec ce que dit vraiment la page (éviter l'épuisement, missions qui ne prennent pas tout le temps de jeu) |
| 04 | `SocialService:PromptGameInvite` et `CanSendGameInviteAsync` dans un `pcall` | OK | https://create.roblox.com/docs/production/promotion/invite-prompts | |
| 04 | Badges : 5 gratuits par 24 h (GMT) et par jeu, puis 100 Robux | OK | https://create.roblox.com/docs/production/publishing/badges | Vérifié le 2026-10-24 ; formulé « au moment de la rédaction » |
| 04 | `AwardBadgeAsync` dans un `pcall` ; `AwardBadge` dépréciée | OK | https://create.roblox.com/docs/reference/engine/classes/BadgeService | |
| 04 | LiveOps : sans mises à jour, même les joueurs fidèles décrochent ; construire sur l'existant | OK | https://create.roblox.com/docs/production/game-design/liveops-essentials | |
| 04 | Rythme : toutes les deux semaines à un mois | OK + précisé | https://create.roblox.com/docs/production/game-design/content-updates | Ajout du rythme de la page Retention (petites mises à jour toutes les 2 à 4 semaines, grosses tous les 2 à 3 mois) |
| 04 | « Un rythme mensuel tenable vaut mieux… » présenté comme « conseil officiel » | REFORMULÉ | — | Présenté comme conseil de la formation |
| 04 | Notifications : 13 ans et plus, opt-in, moins de 13 ans = mises à jour seulement, 100 visites, pas de modération, 1 par jour, prompt standard, 30 jours | OK + précisé | https://create.roblox.com/docs/production/promotion/experience-notifications | Ajouts : permission de gérer le jeu, limite globale quotidienne, textes de 99 caractères maximum, package sur le Creator Store |
| 04 | Description des « achats piégés » (« achat pré-rempli ») | CORRIGÉ | idem | Doc : « trick users into making unintended purchases » |
| 04 | Autres dark patterns interdits, notifications non obligatoires, notifications personnalisées et actionnables | OK | idem | |
| 04 | « Le joueur qui a fini verra la proposition au chargement (Etape passe de 0 à max) » | SUPPRIMÉ | module 4 l.2 | Faux avec le code du module 4 (`Changed` ne se déclenche pas au chargement). Remplacé par l'explication correcte |
| 04 | API `ExperienceNotificationService` (`CanPromptOptInAsync`, `PromptOptIn`) | OK | https://create.roblox.com/docs/reference/engine/classes/ExperienceNotificationService | Rien de déprécié ; appel depuis un LocalScript comme dans l'exemple officiel |
| 04 | Community Standards : contenu ou métadonnées trompeurs | OK | https://about.roblox.com/community-standards | |
| 04 | Fake urgency, fake scarcity, confirmshaming ; deceptive.design est l'ancien darkpatterns.org | OK | https://deceptive.design/types | |
| 04 | Season pass : au moins une semaine de pause, missions qui ne prennent pas tout le temps de jeu | OK | https://create.roblox.com/docs/production/game-design/season-pass-design | |
| 04 | Quiz (5 questions) | OK après corrections | — | `trouve-le-bug` : ligne 4, numérotation juste |
| 05 | Prototypage : défauts, oublis, besoins techniques ; partager hors équipe ; itérer ; 4 points à examiner | OK | https://create.roblox.com/docs/production/game-design/prototyping | |
| 05 | Accès par défaut ; 10 amis d'âge proche ; File > Invite early testers ; filigrane | OK | https://create.roblox.com/docs/production/publishing/publish-experiences-and-places | Daté (octobre 2026) |
| 05 | « Roblox peut te demander une vérification d'âge » | CORRIGÉ | idem | Précisé : vérification demandée si elle n'est pas encore faite. Ajout de la limite pour les testeurs de moins de 16 ans (contrôle parental de la maturité du contenu) |
| 05 | Le think aloud, « la méthode la plus utilisée en ergonomie » | CORRIGÉ | https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/ | NN/g dit « #1 », « most valuable », pas « la plus utilisée ». Auteur et date (Nielsen, 2012) ajoutés |
| 05 | Les 3 étapes (« shut up… ») ; les interventions changent le comportement | OK | idem | |
| 05 | « Environ 5 personnes, plusieurs petites séries » | CORRIGÉ | https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/ | « No more than 5 users ». Ajout de la date (2000) et de la réserve de Nielsen sur les publics hétérogènes. Le chiffre de 85 % n'est toujours pas cité |
| 05 | Raison derrière les suggestions ; bugs priorisés par gravité, effort et joueurs touchés | OK | https://create.roblox.com/docs/production/game-design/liveops-essentials | |
| 05 | Sortie serveur dans la Developer Console (F9) réservée au propriétaire et aux membres avec droits d'édition | OK | https://create.roblox.com/docs/studio/developer-console | |
| 05 | Script de playtest | CORRIGÉ (robustesse) | — | Boucle ajoutée pour les joueurs déjà présents si le script démarre après eux |
| 05 | Quiz (5 questions) | OK | — | `trouve-le-bug` : ligne 8, numérotation juste |
| Examen | 13 questions | OK après corrections | — | 2 explications reformulées (Q2 « complique le jeu », Q7 puits et surplus). `trouve-le-bug` ligne 9 (`prochaine <= …`) et ligne 5 (`>` au lieu de `>=`) : numérotation juste, un seul bug par extrait |

## Erreurs restantes non corrigées
Aucune. À surveiller, sans que ce soit une erreur :
- Les chiffres datés (testeurs invités, badges, conditions des notifications) changent souvent ; ils sont formulés « au moment de la rédaction (octobre 2026) ».
- Le module 2, leçon 6 (création de `Config`), n'est pas encore écrit. La leçon 3 suppose un `Config` en table avec `return Config`, à harmoniser si le module 2 diffère.
- Les diagnostics `verifier-luau` restants sont attendus : `Unknown require` ×4 sur des extraits isolés, et `FunctionUnused` sur `verifierObjectifDuJour`, fonction d'intégration à appeler depuis le script « Pieces ».
