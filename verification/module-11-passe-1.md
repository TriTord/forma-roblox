# Module 10 — passe 1 (vérificateur : faits + sources + quiz) — 2026-10-24

> **Note (phase IA, 2026-10-24)** : ce rapport a été écrit quand ce module portait le numéro 10. Un module 02 « Scripter avec l'IA » a ensuite été inséré : dans le texte ci-dessous, les numéros de modules et les chemins suivent l'**ancienne** numérotation (ancien module N ≥ 2 = nouveau module N + 1).

## Résumé
94 affirmations ou éléments vérifiés (faits, liens, questions de quiz et d’examen, extraits de code), 24 corrigés ou reformulés, 0 supprimé.
Quiz : 25 questions de leçon et 14 questions d’examen relues. 1 question réécrite (L03 Q3 : les règles « gameplay inexistant / Free UGC! / voix off » ne s’appliquent explicitement qu’aux **vidéos** de la page du jeu). 3 explications précisées (L03 Q1, L04 Q4, L05 Q2). Les 5 `trouve-le-bug` ont un seul bug et les bons numéros de ligne.
Code : `verifier-luau 10` = 12 extraits, 0 diagnostic (avant et après corrections). Le `BindToClose` de la leçon 02 a été rendu robuste et le format du `Catalogue` aligné sur le module 4.
Liens internes : 42 liens `/modules/XX/slug/`, tous présents dans PLAN.md et existants. Liens externes : tous testés (HTTP 200 ou redirection vers une page valide). Les URL redirigées ont été remplacées par l’URL finale.
Build : `bash scripts/build-verrou.sh` → code de sortie 0.

Méthode : pages officielles consultées en direct (curl ou WebFetch) et dans le dépôt source officiel de la documentation `github.com/Roblox/creator-docs`, cloné le 2026-10-24 (dernier commit le 2026-10-24). Les fils DevForum ont été vérifiés via l’API JSON du forum (auteur, statut staff, date, contenu).

## Détail
| Leçon | Affirmation / élément | Verdict | Source | Commentaire |
|---|---|---|---|---|
| 01 | Prototype : détecter tôt les défauts ; « la différence… c’est le périmètre » ; prototyper coûte moins cher que corriger tard | OK | create.roblox.com/docs/production/game-design/prototyping | Citations exactes |
| 01 | Core loop = gameplay central ; sans progression, le jeu devient répétitif | OK | …/game-design/core-loops | |
| 01 | Les nouveaux joueurs décident en quelques minutes | OK | …/game-design/onboarding | « within minutes » |
| 01 | Signal « first play bounce rate » (signal négatif) | OK | create.roblox.com/docs/discovery | |
| 01 | Jeux ressemblant à des titres existants : moins recommandés, moins bien classés en recherche | OK | discovery (« Non-unique games ») | Quiz Q2 OK |
| 01 | Ads Manager : campagnes pour ces jeux peut-être peu efficaces | OK | …/promotion/ads-manager | |
| 01 | Community Standards : contenu trompeur ou dupliqué, propriété intellectuelle | OK | about.roblox.com/community-standards | |
| 01 | Surplus de monnaie ; monnaie d’événement séparée | OK | …/balance-virtual-economies | |
| 01 | « Monétisation prévue dès le départ » | REFORMULÉ | …/monetization-foundations | La doc dit « integral part of initial and ongoing development » : formulation alignée |
| 01 | Valeur des objets ; descriptions exactes | OK | monetization-foundations | |
| 01 | Objets aléatoires payants : toutes les issues et probabilités en % | OK | …/monetization/paid-random-items | |
| 01 | Kids (5-8) et Select (9-15) créés en 2026 | OK | …/publishing/kids-and-select ; annonce DevForum 13/04/2026 | |
| 01 | « Règle des deux semaines » | OK | — | Déjà présentée comme garde-fou non officiel |
| 01 | Quiz Q1 à Q5 | OK | — | Bonnes réponses justes, distracteurs faux |
| 02 | Quiz Q1 (trouve-le-bug, prix du client) | CORRIGÉ | — | Ajout d’une ligne de commentaire après la ligne 11 (« ajout du trail à l’inventaire ») : sans elle, l’absence d’attribution de l’objet pouvait passer pour un 2e bug. Lignes 1 à 11 inchangées |
| 02 | Quiz Q2 (verrou partagé), Q3, Q4, Q5 | OK | security-tactics, third-party-vulnerabilities, error-report | Numéros de ligne vérifiés |
| 02 | Code fautif DataStore : commentaire « donnees contient le message d’erreur (ou nil) » | CORRIGÉ | — | En cas d’échec, `pcall` renvoie toujours le message d’erreur |
| 02 | « Ce scénario revient très souvent sur le DevForum » | REFORMULÉ | …/data-stores/player-data-purchasing ; devforum t/2064718 | Ajout de la mise en garde officielle (« fallback data doesn’t later overwrite real data ») ; le DevForum est présenté comme un retour d’expérience |
| 02 | Retry + exponential backoff ; UpdateAsync lit avant d’écrire | OK | …/data-stores/best-practices | |
| 02 | `BindToClose` : 30 secondes au maximum | AJOUTÉ (confirmé) | Référence API DataModel:BindToClose (source creator-docs `DataModel.yaml` : « The experience server waits 30 seconds… ») | Ajouté dans le texte et en commentaire de code |
| 02 | Code corrigé `BindToClose` | CORRIGÉ | DataModel:BindToClose ; player-data-purchasing | Le compteur ne suivait que les sauvegardes lancées par BindToClose. Si `PlayerRemoving` a déjà lancé les sauvegardes, `GetPlayers()` peut être vide et le serveur pouvait s’arrêter avant leur fin. Compteur global `sauvegardesEnCours` maintenant géré dans `sauvegarder` |
| 02 | Code corrigé DataStore : pcall, réessais, pas de sauvegarde si le chargement a échoué, joueur parti pendant le chargement | OK | best-practices | Logique relue ligne par ligne |
| 02 | Studio partage les mêmes DataStores ; option « Enable Studio Access to API Services » ; activer seulement sur une copie de test | OK | …/cloud-services/data-stores | |
| 02 | « Toute donnée du client a pu être manipulée… » ; questions « n’importe quelle valeur » et « 1 000+ fois par seconde » | OK | …/security/security-tactics | |
| 02 | Code remote corrigé (cooldown par joueur, type, prix serveur, solde, possession) | OK | security-tactics | Cooldown par joueur avec `os.clock`, nettoyage à `PlayerRemoving` |
| 02 | Hypothèse sur le format du `Catalogue` | CORRIGÉ | module-04/03-inventaire.mdx | Aligné sur le vrai catalogue du module 4 (`TrailNuage = { nom, prix = 25, … }`) |
| 02 | Backdoors, modèles d’apparence légitime, Toolbox qui signale les scripts, modération non garantie, code obfusqué, espaces, popularité ≠ sécurité | OK | …/security/third-party-vulnerabilities | |
| 02 | Sandboxing : `SandboxedInstance` = Experimental, `Sandboxed` = true, Capabilities ; en bêta | OK | third-party-vulnerabilities | |
| 02 | Ctrl+Maj+F présenté comme une astuce du DevForum | REFORMULÉ | …/studio/script-editor | Le raccourci est officiel (Find All / Replace All, ⌘+Maj+F sur Mac). La liste de mots (`require` + numéro, `getfenv`, `loadstring`) reste présentée comme retour d’expérience |
| 02 | Renvoi « Le module 1 en parlait déjà » (historique des versions) | CORRIGÉ | …/projects/version-history | L’historique des versions est vu en 01/05 (premier-niveau-et-publication), pas en 01/02 : renvois précisés |
| 02 | Server & Clients, jusqu’à 8 clients, 1-2 suffisent ; Device Simulator | OK | …/studio/testing-modes | |
| 02 | Tableau Performance : crashs, FPS, mémoire par plateforme ; graphiques à partir de 100 DAU ; avant/après mise à jour | OK | …/analytics/performance | |
| 02 | Developer Console : F9, `/console` ; messages serveur réservés au propriétaire et aux membres du groupe autorisés à modifier | OK | …/studio/developer-console | |
| 02 | Error Report (Monitoring) : erreurs serveur et client, filtre « New errors since » | OK | …/analytics/error-report | |
| 03 | Publish settings > Manage Audience > onglet Playtest (Early testers, Playtesters) | OK | …/publishing/publish-games-and-places | |
| 03 | Miniature personnalisée requise pour les impressions des recommandations de la page d’accueil | OK | discovery | |
| 03 | 16:9, 1920×1080, jusqu’à 10 | REFORMULÉ | …/publishing/thumbnails | « jusqu’à 10 images ou vidéos » |
| 03 | « Les miniatures ne doivent pas montrer de gameplay inexistant ni “50% off” / “Free UGC!” » | REFORMULÉ | thumbnails (section Videos) ; discovery (« Mismatched metadata ») | Ces interdictions explicites concernent les **vidéos**. Pour les images, la doc dit seulement que des métadonnées qui ne correspondent pas au jeu ne sont pas recommandées |
| 03 | Quiz Q3 (miniatures) | CORRIGÉ | thumbnails | Question réécrite sur la vidéo de présentation, pour que les 3 bonnes réponses soient explicitement interdites par la doc |
| 03 | Métadonnées promettant de l’argent ou des Robux : non priorisées | OK | discovery (« Leading with giveaways ») | |
| 03 | Sans informations de maturité : jouabilité restreinte pour tous | OK | …/promotion/content-maturity | Lien `experience-guidelines` (redirection 301, ancienne page) remplacé par `content-maturity` |
| 03 | Publicité : non comptée dans « Recommended for You » (texte, résumé, quiz Q1) | REFORMULÉ | discovery | La doc distingue deux étapes : la publicité peut aider à être pris en considération, mais l’engagement des joueurs qu’elle amène n’est pas compté à l’étape de classement |
| 03 | Ads Manager : 13+ et e-mail vérifié ; carte bancaire 18+ ; objectif Engagement, sans progrès après 3-5 jours, améliorer l’onboarding | OK | ads-manager | |
| 03 | Benchmarks à partir de 100 DAU, pas un signal direct de l’algorithme | OK | create.roblox.com/docs/production/analytics ; discovery | |
| 03 | D1/D7/D30 | OK | …/analytics/retention | |
| 03 | LiveOps : perte d’intérêt sans mises à jour, rythme hebdo à mensuel, rythme fiable, QoL à fort impact, comprendre la raison des suggestions | OK | …/liveops-essentials | |
| 03 | Tableau persévérer / pivoter / arrêter | OK | — | Présenté comme une méthode, pas comme une règle Roblox ; aucun seuil inventé |
| 03 | Quiz Q2, Q4, Q5 | OK | — | |
| 04 | Questionnaire : Creator Dashboard > Publish settings > Content rating ; contenu le plus mature ; resoumettre après changement ; inexactitudes → modération | OK | content-maturity | |
| 04 | Label « Content May Vary » si l’on répond seulement à la 1re question (16+ uniquement) | AJOUTÉ | content-maturity ; publish-games-and-places | Point de conformité important qui manquait |
| 04 | Exigences 16+ : compte en règle d’au moins 2 jours, vérification de l’âge, question sur le contenu à accès restreint | OK / REFORMULÉ | publish-games-and-places ; kids-and-select | « contenu réservé aux adultes » remplacé par « contenu à accès restreint selon l’âge », la formulation de la doc |
| 04 | Exigences tous âges : compte vérifié, 2FA, Plus/Premium depuis 2 mois **ou** frais remboursables de 1 000 Robux, questionnaire complet (Minimal/Mild/Moderate), évaluation | OK / PRÉCISÉ | kids-and-select ; publish-games-and-places ; DevForum 4573166 et 4630944 (staff) | Précision ajoutée : estimation faciale si moins de 18 ans, pièce d’identité si 18 ans ou plus |
| 04 | Évaluation : phase d’essai 16+, joueurs très engagés, revue de sécurité, 250 parties uniques en 60 jours, tableau Audience Reach | OK | kids-and-select (doc actuelle) | Les annonces DevForum (06/2026, mise à jour du 16/07/2026) parlent de 500 « Highly Engaged Players » pour entrer et 25 pour rester. Doc retenue, avec mention prudente des chiffres divergents |
| 04 | Kids = Minimal/Mild ; Select = jusqu’à Moderate | OK | kids-and-select ; content-maturity | |
| 04 | Filtrage `TextService:FilterStringAsync` ; Roblox retire le jeu jusqu’à l’ajout du filtrage | OK / PRÉCISÉ | …/ui/text-filtering | Ajout de `GetNonChatStringForBroadcastAsync` (checklist et explication du quiz Q4) |
| 04 | `PolicyService:GetPolicyInfoForPlayerAsync` → `ArePaidRandomItemsRestricted` | OK | paid-random-items ; référence PolicyService | API non dépréciée |
| 04 | Liens externes seulement via Social Links, 16+ à l’âge vérifié | OK / PRÉCISÉ | community-standards ; …/promotion/social-media-links | Précisé : 16+ vérifié pour ajouter des liens **et** pour les voir. Source ajoutée |
| 04 | Événements AnalyticsService : seulement depuis le serveur et dans un jeu publié | OK | …/analytics/funnel-events | |
| 04 | Miniatures et vidéos (checklist section 7) | REFORMULÉ | thumbnails ; discovery | Même correction qu’en L03 |
| 04 | « Communauté = nouveau nom des groupes » | OK | DevForum t/3268307 (Roblox Staff, 21/11/2024) | Source ajoutée |
| 04 | `UserOwnsGamePassAsync`, `ProcessReceipt`, `LogOnboardingFunnelStepEvent` non dépréciés | OK | Référence API (creator-docs) | |
| 04 | Script d’auto-vérification (Studio uniquement, conventions du fil rouge) | OK | — | Noms `Checkpoints`, `KillBricks`, `Pieces`, `Remotes`, `Modules`, `Config`, `Catalogue` conformes ; pièces ancrées comme au module 2 |
| 04 | Quiz Q1 (trouve-le-bug), Q2, Q3, Q5 | OK | content-maturity | |
| 04 | Sources : `publish-experiences-and-places` et `experience-guidelines` | CORRIGÉ | — | URL redirigées (301) remplacées par `publish-games-and-places` et `content-maturity` |
| 05 | « Jeu détenu par une Communauté (anciennement groupe) » | CORRIGÉ | DevForum t/3268307 ; …/projects/collaboration ; …/projects/groups | L’annonce précise que, pour la collaboration entre créateurs, le produit garde le nom de **Groups** dans le Creator Hub, et la doc parle de « group-owned games ». Formulation corrigée, quiz Q2 aussi (« pas à un groupe ») |
| 05 | Collaborate ; Edit seulement pour des amis (jeu personnel) ; vérification de l’âge ; tranches d’âge compatibles | OK | projects/collaboration | |
| 05 | Mode Drafts | PRÉCISÉ | projects/collaboration | Désactivé par défaut (File > Experience Settings) |
| 05 | Catégories DevForum (Announcements, Scripting Support, Building/Game Design Support, Code Review, Community Tutorials, Find and Hire Talent, Showcase Your Portfolio) ; tag roadmap | OK | devforum.roblox.com/categories.json | Toutes les URL renvoient la bonne catégorie |
| 05 | Liens docs, tutorials, reference/engine, game-design, luau.org, status.roblox.com, create.roblox.com/talent | OK | HTTP 200 ou redirection valide | |
| 05 | Lien Roblox Education | CORRIGÉ | …/education/support/education-getting-started | Redirection remplacée par l’URL finale ; précisé « surtout destinées aux enseignants » |
| 05 | Quiz Q1 à Q5 | OK | — | |
| Examen | 14 questions (dont 2 trouve-le-bug) | OK | paid-random-items, balance-virtual-economies, performance, data-stores, discovery, liveops, kids-and-select, content-maturity, community-standards | Numéros de ligne des trouve-le-bug vérifiés (ligne 12 et ligne 5) ; aucune modification nécessaire |
| Toutes | 42 liens internes `/modules/XX/slug/` | OK | PLAN.md + fichiers existants | |

## Erreurs restantes non corrigées
- Aucune dans le module 10.
- Signalement hors périmètre (module 4, non modifié) : le `BindToClose` de `module-04/02-datastores-fiables.mdx` utilise un compteur local à `BindToClose`. Il n’attend donc pas les sauvegardes déjà lancées par `PlayerRemoving` quand les joueurs sont déconnectés à la fermeture. Il vaudrait la peine d’appliquer la même correction qu’en module 10, leçon 02 (compteur global incrémenté dans la fonction de sauvegarde).
- Point à surveiller : les chiffres de l’évaluation Kids/Select. La doc (250 parties uniques en 60 jours) diverge des annonces DevForum (500 pour entrer, 25 pour rester), et les conditions de remboursement des frais de 1 000 Robux diffèrent entre `publish-games-and-places` et `kids-and-select`. La leçon cite la doc actuelle avec une formulation prudente et ne donne pas les conditions de remboursement.
