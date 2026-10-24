# Module 10 — Notes du rédacteur pour les vérificateurs

Date de vérification des sources : 2026-10-24. Toutes les pages ci-dessous ont été consultées (WebFetch) ou leur existence vérifiée (HTTP 200).

## Affirmations factuelles et sources

### Leçon 01 — erreurs-de-conception
| Affirmation | Source |
|---|---|
| Un prototype sert à détecter tôt les défauts ; « la différence entre travailler sur une fonctionnalité et prototyper, c’est le périmètre » | https://create.roblox.com/docs/production/game-design/prototyping |
| Core loop = gameplay central ; sans progression, un jeu devient répétitif | https://create.roblox.com/docs/production/game-design/core-loops |
| Les nouveaux joueurs décident en quelques minutes | https://create.roblox.com/docs/production/game-design/onboarding (« New players typically decide their interest in a game within minutes ») |
| Signal « first play bounce rate » ; jeux ressemblant à des titres existants moins recommandés / moins bien classés en recherche | https://create.roblox.com/docs/discovery |
| Campagnes publicitaires pour jeux ressemblants « might not be effective » | https://create.roblox.com/docs/production/promotion/ads-manager |
| Règles communautaires : contenu trompeur/dupliqué, propriété intellectuelle | https://about.roblox.com/community-standards |
| Sources/puits, surplus de monnaie, monnaie d’événement séparée | https://create.roblox.com/docs/production/game-design/balance-virtual-economies |
| Monétisation prévue dès le départ ; valeur ; descriptions exactes | https://create.roblox.com/docs/production/game-design/monetization-foundations |
| Objets aléatoires payants : toutes les issues + probabilités en %, total 100 % | https://create.roblox.com/docs/production/monetization/paid-random-items |
| Comptes Roblox Kids (5-8) et Select (9-15) créés en 2026 | https://create.roblox.com/docs/production/publishing/kids-and-select + annonce DevForum 13/04/2026 |
| « Règle des deux semaines » | Présentée explicitement comme garde-fou pratique, PAS comme règle officielle |

### Leçon 02 — erreurs-techniques
| Affirmation | Source |
|---|---|
| Retry avec exponential backoff ; un échec d’écriture ne prouve pas que l’écriture n’a pas eu lieu ; UpdateAsync lit avant d’écrire | https://create.roblox.com/docs/cloud-services/data-stores/best-practices |
| « Enable Studio Access to API Services » (File > Experience Settings > Security) ; Studio partage les mêmes DataStores ; activer seulement sur une copie de test | https://create.roblox.com/docs/cloud-services/data-stores |
| Scénario « chargement raté → données par défaut sauvegardées par-dessus » | Retour d’expérience DevForum : https://devforum.roblox.com/t/datastore-completely-wiped/2064718 |
| « Assume every piece of data sent from the client has been manipulated… » ; questions « n’importe quelle valeur » et « 1 000+ fois par seconde » | https://create.roblox.com/docs/scripting/security/security-tactics |
| Backdoors dans les modèles du Creator Store/Toolbox ; Toolbox signale les scripts ; modération non garantie ; code obfusqué ; popularité ≠ sécurité ; sandboxing (SandboxedInstance = Experimental, Sandboxed = true, Capabilities) en bêta | https://create.roblox.com/docs/scripting/security/third-party-vulnerabilities |
| Mots à rechercher (`require` + numéro, `getfenv`, `loadstring`), Ctrl+Maj+F | Retour d’expérience communautaire : https://devforum.roblox.com/t/backdooring-explained-megathread/845508 (présenté comme tel, pas comme liste officielle) |
| Mode « Server & Clients », jusqu’à 8 clients ; Device Simulator | https://create.roblox.com/docs/studio/testing-modes |
| Tableau Performance : crashs, FPS, mémoire par plateforme ; graphiques à partir de 100 DAU ; à consulter avant/après mise à jour | https://create.roblox.com/docs/production/analytics/performance |
| Developer Console : F9 ou `/console` ; logs serveur visibles seulement par le propriétaire / membres avec droit d’édition | https://create.roblox.com/docs/studio/developer-console |
| Error Report (Monitoring) : erreurs/avertissements Luau serveur + client ; filtre « new errors since » version | https://create.roblox.com/docs/production/analytics/error-report |

### Leçon 03 — erreurs-de-lancement-et-de-suivi
| Affirmation | Source |
|---|---|
| Publish settings > Manage Audience ; onglet Playtest : « Early testers », « Playtesters » | https://create.roblox.com/docs/production/publishing/publish-experiences-and-places |
| Miniature personnalisée requise pour les impressions des recommandations de la page d’accueil ; métadonnées à thème monétaire non priorisées ; utilisateurs acquis par pub non comptés dans « Recommended for You » | https://create.roblox.com/docs/discovery |
| Miniatures 16:9, idéalement 1920×1080, jusqu’à 10 ; pas de gameplay inexistant, pas de « 50% off »/« Free UGC! », pas de voix off dans les vidéos ; éviter le bas de l’image | https://create.roblox.com/docs/production/publishing/thumbnails |
| Sans informations de maturité → jouabilité restreinte pour tous | https://create.roblox.com/docs/production/promotion/experience-guidelines |
| Ads Manager : 13+ et e-mail vérifié ; carte 18+ ; Engagement : sans progrès après 3-5 jours, améliorer l’onboarding | https://create.roblox.com/docs/production/promotion/ads-manager |
| Benchmarks à partir de 100 DAU ; pas un signal direct de l’algorithme | https://create.roblox.com/docs/production/analytics |
| Définition D1/D7/D30 | https://create.roblox.com/docs/production/analytics/retention |
| LiveOps : sans mises à jour, même les joueurs fidèles perdent intérêt ; cadence hebdo à mensuelle ; QoL ; « the reasoning behind » | https://create.roblox.com/docs/production/game-design/liveops-essentials |
| Tableau de décision persévérer/pivoter/arrêter | Présenté explicitement comme méthode, PAS comme règle Roblox ; aucun seuil chiffré avancé |

### Leçon 04 — checklist-de-lancement
| Affirmation | Source |
|---|---|
| Questionnaire : Creator Dashboard > jeu > Publish settings > Content rating ; répondre selon le contenu le plus mature ; resoumettre si changement ; inexactitudes → modération ; labels Minimal/Mild/Moderate/Restricted (+ Content May Vary) | https://create.roblox.com/docs/production/promotion/experience-guidelines |
| Exigences 16+ et Trusted Friends (compte en règle, ≥ 2 jours, vérification d’âge, question contenu restreint) ; tous âges (vérification, 2FA, Plus/Premium 2 mois consécutifs ou frais remboursables 1 000 Robux/jeu, évaluation, questionnaire complet, label Minimal/Mild/Moderate) | https://create.roblox.com/docs/production/publishing/publish-experiences-and-places ; annonces https://devforum.roblox.com/t/new-publishing-requirements-evaluation-process-for-games/4573166 (13/04/2026, en vigueur 19/05/2026) et https://devforum.roblox.com/t/alternate-publishing-requirements-for-roblox-kids-and-select/4630944 (11/05/2026, frais de 1 000 Robux) |
| Processus d’évaluation : phase d’essai 16+, analyse « highly engaged players », revue de sécurité, seuil 250 parties uniques en 60 jours, suivi dans « Audience Reach » ; Kids = Minimal/Mild, Select = jusqu’à Moderate | https://create.roblox.com/docs/production/publishing/kids-and-select (ajouté à la demande du chef d’orchestre, confirmé sur la doc) |
| Filtrage obligatoire des textes saisis par les joueurs (`TextService:FilterStringAsync`) ; Roblox peut retirer un jeu qui ne filtre pas | https://create.roblox.com/docs/ui/text-filtering |
| `PolicyService:GetPolicyInfoForPlayerAsync` → `ArePaidRandomItemsRestricted` | https://create.roblox.com/docs/reference/engine/classes/PolicyService et paid-random-items |
| Liens externes uniquement via Social Links (16+ âge vérifié) | https://about.roblox.com/community-standards ; DevForum 16/06/2026 (passage de 13+ à 16+ au 30/06) https://devforum.roblox.com/t/roblox-kids-and-select-global-launch-upcoming-updates-to-eligibility-ads-manager-and-expedited-review/4685717 |
| Événements AnalyticsService envoyés seulement depuis le serveur et dans un jeu publié | https://create.roblox.com/docs/production/analytics/funnel-events |
| « Communautés » = nouveau nom des groupes | https://devforum.roblox.com/t/introducing-roblox-communities/3268307 (trouvé par recherche, non ouvert en entier) |

### Leçon 05 — et-apres
| Affirmation | Source |
|---|---|
| Team Create : bouton Collaborate ; Edit seulement pour amis (jeu personnel) ; vérification d’âge requise pour collaborer ; tranches d’âge compatibles ; Drafts mode | https://create.roblox.com/docs/projects/collaboration |
| Catégories DevForum (Announcements, Scripting Support, Community Tutorials, Find and Hire Talent, Showcase Your Portfolio) | https://devforum.roblox.com/categories.json (vérifié) ; URL de catégories testées en HTTP 200 |
| Liens : docs, tutorials, reference/engine, game-design, education, luau.org, status.roblox.com, create.roblox.com/talent, devforum tag roadmap | Tous testés HTTP 200 (la page /talent a pour titre « Creator Hub - Talent ») |

## Points incertains / à surveiller
- **Exigences de publication 2026** : chiffres instables. Les annonces DevForum mentionnent 500 « highly engaged players » (entrée) puis 25 (maintien, juillet 2026), tandis que la page doc actuelle parle de 250 parties uniques en 60 jours. J’ai retenu la doc (plus récente) avec avertissement « a changé plusieurs fois ». Frais de revue accélérée : 50 000 Robux (doc) vs 100 000 Robux (DevForum juin 2026) → NON cités dans les leçons.
- **BindToClose** : la limite de 30 secondes n’a pas pu être vérifiée sur la page anglaise (page référence en erreur 502) → non citée.
- **Command Bar / Ctrl+Maj+F** : raccourci de recherche dans tous les scripts cité d’après le DevForum (retour d’expérience).
- **Sandboxing** des assets : fonctionnalité en bêta au moment de la rédaction (indiqué dans la leçon).
- Le module ne mentionne PAS les Premium Payouts (remplacés par Creator Rewards selon le chef d’orchestre).
- Le format du ModuleScript `Catalogue` (`{ [id] = { prix = … } }`) est une hypothèse, signalée dans le code : à harmoniser avec le module 4 si son rédacteur a choisi un autre nom de champ.
- Les Conditions d’utilisation (en.help.roblox.com) renvoient HTTP 403 aux outils : non citées.
