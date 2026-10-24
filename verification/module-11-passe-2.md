# Module 10 — passe 2 (vérificateur indépendant : contre-vérification) — 2026-10-24

> **Note (phase IA, 2026-10-24)** : ce rapport a été écrit quand ce module portait le numéro 10. Un module 02 « Scripter avec l'IA » a ensuite été inséré : dans le texte ci-dessous, les numéros de modules et les chemins suivent l'**ancienne** numérotation (ancien module N ≥ 2 = nouveau module N + 1).

## Résumé
Environ 105 éléments vérifiés (affirmations factuelles, chiffres, 25 questions de leçon, 14 questions d'examen, 12 extraits Luau, 42 liens internes, 53 liens externes). 21 corrigés ou reformulés, 0 supprimé.
Quiz : 1 question corrigée (L02 Q2 : l'extrait `trouve-le-bug` contenait un 2e bug), 3 explications précisées (L03 Q3, L04 Q3, examen Q13). Examen : extrait de la Q4 aligné sur la structure de données du module 4 (numéros de ligne inchangés).
Code : `node scripts/verifier-luau.mjs 10` → 12 extraits, 0 diagnostic (avant et après corrections). Deux extraits corrigés de la leçon 02 réalignés sur le module 4 (`DonneesJoueurs`, `Catalogue`, structure `etape`/`pieces`/`inventaire`/`equipe`).
Build : `bash scripts/build-verrou.sh` → code de sortie 0.

Méthode : sources officielles relues dans le dépôt `github.com/Roblox/creator-docs` (dernier commit du 2026-10-24, fichiers `.md` et `.yaml` de la référence API), pages en ligne testées (HTTP), Community Standards via WebFetch, fils DevForum via l'API JSON (auteur, titre « Roblox Staff », date, contenu, réponse acceptée), catégories DevForum via `categories.json`. Rien n'a été repris de la passe 1 sans revérification.

## Détail
| Leçon | Affirmation / élément | Verdict | Source | Commentaire |
|---|---|---|---|---|
| 01 | Prototype : défauts détectés tôt, « la différence… c'est le périmètre », prototyper coûte moins que corriger tard | OK | production/game-design/prototyping | Citations exactes |
| 01 | Core loop = gameplay central ; sans progression, répétitif | OK | …/core-loops | |
| 01 | Décision « within minutes » ; « first play bounce rate » (signal négatif) | OK | …/onboarding ; /discovery | |
| 01 | Jeux ressemblant à l'existant : moins recommandés, moins bien classés | OK | /discovery (« Non-unique games ») ; ads-manager | |
| 01 | Surplus de monnaie ; monnaie d'événement séparée (« safest solution ») | OK | …/balance-virtual-economies | Examen Q3 OK |
| 01 | Monétisation « integral part of initial and ongoing development » ; valeur ; descriptions « accurate and truthful » | OK | …/monetization-foundations | |
| 01 | Objets aléatoires payants : issues + probabilités en %, total 100 %, restrictions par pays | OK | …/monetization/paid-random-items | Examen Q2 (icône (i) seule insuffisante) OK |
| 01 | Kids 5-8, Select 9-15, 2026 | OK | …/publishing/kids-and-select ; DevForum t/4573166 (staff, 13/04/2026), t/4685717 (staff, lancement mondial 16/06/2026) | |
| 01 | « C'est l'erreur numéro un des débutants » | REFORMULÉ | — | Classement non sourcé → « un piège classique » |
| 01 | Quiz Q1 à Q5 | OK | — | |
| 02 | Quiz Q1 (prix venu du client) | OK | — | Lignes 7, 8, 5, 11 vérifiées ; un seul bug |
| 02 | Quiz Q2 (verrou partagé) | CORRIGÉ | module 03/05-securiser-l-obby (« Avec un simple `etape.Value = numero`, un joueur honnête perdrait sa progression ») | La ligne 10 `Etape.Value = tonumber(checkpoint.Name)` était un 2e bug (recul d'étape, saut d'étapes, `nil` possible). Remplacée par la validation « étape suivante » ; option « Ligne 11 » devenue « Ligne 12 » |
| 02 | Quiz Q3, Q4, Q5 | OK | data-stores ; third-party-vulnerabilities ; error-report | |
| 02 | « La cause la plus fréquente… » des pertes de données | REFORMULÉ | …/data-stores/player-data-purchasing | Superlatif non sourcé → « une cause classique, contre laquelle la documentation met en garde » |
| 02 | « Des fils d'entraide du DevForum décrivent exactement ce scénario » | REFORMULÉ | devforum t/2064718 (réponse acceptée de 404problems) | Un seul fil cité : décrit fidèlement, présenté comme retour de développeur |
| 02 | Code fautif DataStore : données par défaut `{ Etape = 1, Pieces = 0 }` | CORRIGÉ | module-04/02-datastores-fiables | Même DataStore et même clé que le module 4, mais structure différente : aligné sur `{ etape = 0, pieces = 0, inventaire = {}, equipe = "" }` |
| 02 | Code corrigé DataStore | CORRIGÉ | best-practices (« exponential backoff… add random jitter ») ; module 4 | Mêmes champs que le module 4 ; jitter ajouté (`2 ^ essai + math.random()`) ; joueurs déjà présents traités ; `player.Parent == Players` ; avertissement : ne pas l'ajouter en plus de `DonneesJoueurs`/`GestionJoueurs` (deux scripts écriraient la même clé) |
| 02 | `BindToClose` : compteur global `sauvegardesEnCours` | OK | Référence `DataModel.yaml` (« The experience server waits 30 seconds for all bound functions… ») | Raisonné à l'exécution : `task.spawn` incrémente avant la boucle ; les sauvegardes déjà lancées par `PlayerRemoving` sont attendues ; double sauvegarde sans danger avec `UpdateAsync` |
| 02 | 30 secondes au maximum | OK | DataModel.yaml (creator-docs) | La page en ligne de référence renvoie un 502 (CloudFront) aux outils, mais le lien est le bon |
| 02 | Code corrigé de la boutique | CORRIGÉ | module-04/03-inventaire (Script « Boutique ») ; module-03/05 (cooldown 1 s) | L'inventaire était une table locale `possessions` jamais sauvegardée. Réécrit avec `DonneesJoueurs.Obtenir(player).inventaire` comme au module 4, délai de 1 s comme au module 3, `Catalogue` au format du module 4 |
| 02 | Studio = mêmes DataStores ; copie de test | OK | cloud-services/data-stores | Examen Q7 OK |
| 02 | « Assume every piece of data… » ; questions « any value » et « 1,000+ times per second » | OK | …/security/security-tactics | |
| 02 | Backdoors, modèles d'apparence légitime, Toolbox qui signale les scripts, modération non garantie, obfusqué, espaces, popularité ≠ sécurité, sandboxing (bêta) | OK | …/security/third-party-vulnerabilities | |
| 02 | `require` + numéro, `getfenv`, `loadstring` | OK | devforum t/845508 (non staff) | Bien présenté comme retour d'expérience |
| 02 | Find All / Replace All, Ctrl+Maj+F / ⌘+Maj+F | OK | studio/script-editor | |
| 02 | Server & Clients, 1-2 clients suffisent, jusqu'à 8 ; Device Simulator | OK | studio/testing-modes | |
| 02 | Performance : crashs, FPS, mémoire, par plateforme et version ; 100 DAU ; avant/après mise à jour | OK | analytics/performance | Examen Q6 OK |
| 02 | Developer Console F9, `/console`, logs serveur réservés au propriétaire et membres du groupe avec droit d'édition | OK | studio/developer-console | |
| 02 | Error Report (Monitoring), serveur + client, filtre « New errors since » | OK | analytics/error-report | |
| 02 | « Une ligne rouge, c'est un script qui s'est arrêté » | REFORMULÉ | — | Inexact pour un débutant : seule la fonction en cours s'arrête si l'erreur survient dans un événement |
| 02 | « Le plus courant : un verrou partagé » | REFORMULÉ | — | → « un exemple classique » |
| 03 | Publish settings > Manage Audience, onglet Playtest | OK | publishing/publish-games-and-places | |
| 03 | Testeurs invités | PRÉCISÉ | publish-games-and-places | Ajout : File > Invite early testers, jusqu'à 10 amis d'âge proche |
| 03 | Miniature personnalisée requise ; 16:9, 1920 × 1080, jusqu'à 10 ; métadonnées décalées ; « giveaways » non priorisés | OK | /discovery ; publishing/thumbnails | Examen Q8 OK |
| 03 | Vidéos : pas de gameplay inexistant, « 50% off » / « Free UGC! », voix off | PRÉCISÉ | thumbnails (section Videos : « voice-overs, narration, voice chat conversations, and music with lyrics is not permitted ») | Musique avec paroles ajoutée (leçon, quiz Q3, checklist) |
| 03 | Publicité non comptée au classement de « Recommended for You » | OK / PRÉCISÉ | /discovery ; ads-manager (« Running ads does not affect how your game ranks in Recommended For You ») | Confirmation Ads Manager ajoutée |
| 03 | Ads Manager 13+ (e-mail vérifié), carte 18+ ; objectif Engagement, 3-5 jours, améliorer l'onboarding | OK | promotion/ads-manager | |
| 03 | Benchmarks dès 100 DAU, pas un signal direct | OK | production/analytics ; /discovery | Quiz Q4 OK |
| 03 | D1/D7/D30 ; LiveOps (perte d'intérêt, hebdo à mensuel, rythme fiable, QoL, raison derrière les suggestions) | OK | analytics/retention ; liveops-essentials | Examen Q9 OK |
| 03 | « Beaucoup de créateurs… n'ouvrent plus jamais le Creator Dashboard » ; « aussi fréquentes l'une que l'autre » ; « ce que beaucoup de créateurs n'arrivent jamais à faire » | REFORMULÉ | — | Généralisations non sourcées retirées |
| 03 | Quiz Q1, Q2, Q5 | OK | — | |
| 04 | Questionnaire : Publish settings > Content rating ; contenu le plus mature ; resoumettre ; inexactitudes → modération ; label remplacé ou retiré | OK | promotion/content-maturity (section Content maturity moderation) | Quiz Q2 OK |
| 04 | Sans informations de maturité → jouabilité restreinte pour tous | OK | content-maturity | Examen Q12 OK |
| 04 | Content May Vary | PRÉCISÉ | publish-games-and-places ; content-maturity | Précisé : réponse « Non » à la 1re question, joueurs 16+ à l'âge vérifié |
| 04 | Quiz Q3 : « (nouveau type de contenu, chat…) » | CORRIGÉ | content-maturity (catégories) | Le chat n'est pas une catégorie du questionnaire → « espace de discussion sociale » (Social hangout) |
| 04 | Exigences 16+ (compte en règle ≥ 2 jours, vérification de l'âge, 1re question) et tous âges (vérification faciale < 18 / pièce d'identité ≥ 18, 2FA, Plus/Premium 2 mois consécutifs ou 1 000 Robux remboursables, questionnaire complet Minimal/Mild/Moderate, évaluation) | OK | kids-and-select ; publish-games-and-places ; DevForum t/4630944 (staff, 1 000 Robux) | Examen Q11 OK |
| 04 | Conditions vérifiées à chaque publication | AJOUTÉ | publish-games-and-places (« Release requirements apply to all release actions… Updating a released game ») | Item de checklist complété |
| 04 | Évaluation : essai 16+, joueurs très engagés, revue de sécurité, 250 parties uniques en 60 jours, Audience Reach | OK | kids-and-select | DevForum t/4685717 : 500 HEP pour entrer, 25 pour rester (16/07/2026) → la mention prudente du texte est justifiée |
| 04 | Kids = Minimal/Mild ; Select = jusqu'à Moderate | OK | kids-and-select ; content-maturity | |
| 04 | Filtrage : `FilterStringAsync` puis `GetNonChatStringForBroadcastAsync` ; jeu retiré jusqu'à l'ajout du filtrage | OK | ui/text-filtering | Quiz Q4 OK |
| 04 | `ArePaidRandomItemsRestricted` via `GetPolicyInfoForPlayerAsync` | OK | paid-random-items ; content-maturity | |
| 04 | Social Links | PRÉCISÉ | social-media-links (« You cannot share social media links directly within a game ») ; Community Standards | Ajout : liens seulement sur la page du jeu, jamais dans le jeu ; exemple de renvoi autorisé |
| 04 | Doublon checklist : « pas de lien externe hors Social Links » (sections 9 et 10) | CORRIGÉ | — | Retiré de la section 10 (renvoi à la section 9) |
| 04 | Événements AnalyticsService : serveur et jeu publié seulement | OK | analytics/funnel-events | |
| 04 | Communautés = nouveau nom des groupes (côté joueurs) | OK | DevForum t/3268307 (titre « Roblox Staff », catégorie Announcements, 21/11/2024) | |
| 04 | Script AutoVerification | OK | — | `IsStudio`, `return` au niveau du script valide, noms du fil rouge respectés |
| 04 | Checklist : actionnable, renvois aux bonnes leçons | OK | — | Hormis le doublon ci-dessus, pas d'item faux ; Quiz Q1 et Q5 OK |
| 05 | Team Create : Collaborate, Edit seulement pour des amis (jeu personnel), vérification de l'âge, tranches d'âge compatibles, Drafts désactivé par défaut (File > Experience Settings) | OK | projects/collaboration | Quiz Q2 OK |
| 05 | Catégories DevForum (Announcements, Scripting Support, Code Review, Building Support, Game Design Support, Community Tutorials, Find and Hire Talent, Showcase Your Portfolio) | OK | devforum categories.json | Quiz Q1 et examen Q14 OK |
| 05 | « … ce qui est rare » (portfolio) | REFORMULÉ | — | Affirmation non sourcée retirée |
| Examen | Q4 trouve-le-bug (données par défaut) | CORRIGÉ | module 4 | Champs alignés (`etape = 0, pieces = 0`) ; la ligne 12 reste le bug, la ligne 10 reste correcte |
| Examen | Q5 trouve-le-bug (`numero > etape.Value`) | OK | module 3 | Un seul bug, ligne 5 |
| Examen | Q13 (Discord) | PRÉCISÉ | Community Standards (« Any other efforts to direct users off of Roblox… are prohibited ») ; social-media-links | Explication complétée |
| Toutes | 42 liens internes `/modules/XX/slug/` | OK | fichiers de `src/content/lecons` | Tous existent |
| Toutes | 53 liens externes | OK | curl | Tous HTTP 200, sauf la référence `DataModel#BindToClose` (502 côté serveur Roblox pour cette grosse page ; contenu vérifié dans creator-docs) |

## Désaccords avec la passe 1
- **L02 Q2 (`trouve-le-bug`)** : la passe 1 l'a jugée correcte. Or la ligne `Etape.Value = tonumber(checkpoint.Name)` était un 2e bug selon le module 3 lui-même (recul d'étape en retombant, sauts d'étapes acceptés, `nil` possible). Corrigé.
- **Cohérence avec le module 4** : la passe 1 a seulement aligné le format du `Catalogue`. Les deux codes corrigés de L02 restaient incohérents avec le module 4 : données par défaut `{ Etape = 1, Pieces = 0 }` (autres noms de champs, étape de départ différente) écrites dans le **même** DataStore avec la **même** clé que `DonneesJoueurs`, et inventaire de la boutique dans une table locale jamais sauvegardée. Les deux ont été réalignés, avec un avertissement pour ne pas doubler les scripts du module 4.
- **Fil DevForum « Datastore completely wiped »** : la passe 1 a gardé « des fils… décrivent exactement ce scénario ». Un seul fil est cité, et c'est la réponse acceptée (pas l'auteur) qui donne cette explication. Reformulé.
- **Social Links** : la passe 1 l'a validé sans la précision officielle « liens sur la page du jeu, jamais dans le jeu ». Pour la question de l'examen (panneau dans le jeu), c'est justement le point clé. Ajouté.
- **L04 Q3** : l'explication citait le « chat » comme réponse du questionnaire. Ce n'est pas une catégorie (il s'agit de « Social hangout »). Corrigé.
- **Formulations non sourcées** restées après la passe 1 (« erreur numéro un », « la cause la plus fréquente », « aussi fréquentes l'une que l'autre », « beaucoup de créateurs… », « ce qui est rare ») : reformulées.

## Erreurs restantes non corrigées
- Aucune dans le module 10.
- À surveiller : les chiffres de l'évaluation Kids/Select (doc : 250 parties uniques en 60 jours ; DevForum : 500 HEP pour entrer, 25 pour rester) et les conditions de remboursement des 1 000 Robux (25 HEP pendant 60 jours sur `publish-games-and-places`, 90 jours sur `kids-and-select`) divergent entre sources officielles. La leçon cite la doc avec une mise en garde et ne donne pas les conditions de remboursement : c'est volontaire.
- Hors périmètre : le module 4 a été modifié pendant cette vérification (`SauvegarderTout` avec compteur global). Le signalement de la passe 1 sur le `BindToClose` du module 4 semble donc traité. Non vérifié en détail, car ce module n'est pas le mien.
