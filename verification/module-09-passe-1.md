# Module 08 — passe 1 (vérificateur : faits + sources + quiz) — 2026-10-24

## Résumé
94 affirmations / éléments vérifiés, 11 corrigés ou reformulés (dont 3 compléments : méthode `GetPlayerSegmentsAsync`, effet des anciens joueurs sur l’entonnoir de progression, 2 sources en leçon 02), 0 supprimé.
Quiz : 25 questions de leçon + 15 questions d’examen vérifiées (bonnes réponses, distracteurs, numéros de ligne des 4 `trouve-le-bug`, calculs) ; 1 question d’examen corrigée (base de calcul de la D1).
Code : `node scripts/verifier-luau.mjs 08` → 9 extraits, 0 diagnostic (avant et après corrections) ; relecture d’exécution du script `AnalytiqueObby` (Script serveur dans ServerScriptService, `pcall`, `RunService:IsStudio()`, pas d’API dépréciée, cohérent avec la convention `leaderstats.Etape` = dernier checkpoint validé, 0 au départ, +1 seulement ; vérifié dans les modules 03, 04 et 06) ; 1 délai d’attente rallongé.
Build : `bash scripts/build-verrou.sh` → code de sortie 0.

Méthode : pages lues en direct avec WebFetch sur create.roblox.com (event-types, référence AnalyticsService, economy-events, retention, analytics-dashboard, creator-rewards). Pour le texte exact, j’ai aussi lu les fichiers sources officiels de ces pages et des autres (dépôt `Roblox/creator-docs`, branche `main`, `content/en-us/...`, y compris `AnalyticsService.yaml`). Toutes les URL de `<Sources>` répondent en 200, sauf la référence AnalyticsService : 502 avec curl (protection anti-robots), mais elle s’affiche avec WebFetch.

## Détail
| Leçon | Affirmation / élément | Verdict | Source | Commentaire |
|---|---|---|---|---|
| 01 | Éligibilité : plus de 10 DAU et 10 h de jeu pendant 7 jours consécutifs | OK | /production/analytics/analytics-dashboard | Citation exacte |
| 01 | Activation : e-mail vérifié, vérification en 2 étapes, Terms of Use, bouton Activate Analytics ; jeux de groupe | OK | idem | |
| 01 | Catégories Overview, Retention, Engagement, Acquisition, Demographics, Feedback, Monetization, Explore | OK | idem | Explore : graphiques personnalisés, formules, overlays |
| 01 | Pages Economy / Funnel / Custom débloquées par les événements | OK | /event-types | |
| 01 | Monitoring → Performance ; graphiques détaillés à partir de 100 DAU | OK | /performance | |
| 01 | Analytics Home : watchlist de 9 jeux maximum | OK | /production/analytics | |
| 01 | Seuils 100 DAU (benchmarks / insights) et 1 000 DAU (rapports IA) | REFORMULÉ | /production/analytics, /insights | Précision : « benchmark scorecards » (seuil de 100+ DAU dans la doc) |
| 01 | Play through rate = % de joueurs ayant joué après avoir vu le jeu en recommandation | OK | /production/analytics | |
| 01 | Plan en 3 étapes (D1 et durée de session d’abord, puis acquisition, puis suivi après chaque mise à jour) | OK | idem | |
| 01 | Benchmarks : similaires → genre → toutes expériences ; 50e–90e percentile ; KPI concernés | OK | analytics-dashboard#benchmarking | |
| 01 | Benchmarks non utilisés comme signal direct de découverte | OK | /production/analytics | Quiz 5 OK |
| 01 | Baisse de rétention après afflux = « typical and temporary » | OK | /retention | Quiz 3 OK |
| 01 | Experiments : tests A/B, impact causal ; jeux de moins de 1 000 DAU | OK | /production/experiments | |
| 01 | Ligne « en pointillés » quand le taux de crash est bruité | OK | /performance | La doc dit « dashed line » |
| 01 | Groupes de moins de 3 utilisateurs masqués (âge/genre) | OK | /demographics | |
| 01 | Explore : période précédente superposée + moyenne mobile 7 jours | OK | analytics-dashboard#overlays-and-smoothing | |
| 01 | Achievement panel : plus haut niveau depuis 6 mois | OK | /insights | |
| 01 | « Les métriques montrent où regarder de plus près » | OK | /get-started | |
| 01 | Calcul : 20 nouveaux joueurs → 1 joueur = 5 points | OK | calcul | |
| 01 | Quiz 1 à 5 | OK | — | |
| 02 | Axe X = date de première partie ; exemple 06/20 | OK | /retention (WebFetch) | |
| 02 | D1 = le lendemain ; D7 = 8e jour (« Day 7 ») ; D30 = 31e jour (« Day 30 ») | OK | /retention | Citations exactes |
| 02 | Données D7 visibles le 06/27, D30 le 07/20 | OK | /retention | Exemple 20/06 → 27/06 et 20/07 recalculé |
| 02 | Encadré « exactement le jour N » : « une des raisons pour lesquelles D7 est nettement plus bas que D1 » | REFORMULÉ | /production/analytics, /acquisition | Lien de cause non sourcé, remplacé par un fait mathématique (le calcul strict donne des valeurs ≤ à la méthode cumulative). J’ai cité les définitions divergentes : Analytics Home (« played again after their first session ended ») et Acquisition (D7 « on the 8th day (D8) ») |
| 02 | Exemple chiffré 400 → 60/16/4 = 15 %/4 %/1 % ; dates 2, 8 et 31 octobre | OK | calcul | |
| 02 | Cohortes quotidiennes (10 jours) et hebdomadaires (10 semaines, lundi–dimanche) ; 7D playtime, 7D conversion, 7D/30D revenue | OK | /retention | |
| 02 | D1 ↔ core loop / FTUE / performance ; plaisir en 5 minutes ou moins ; D7 ↔ progression ; D30 ↔ ending system, mises à jour toutes les 2–4 semaines / 2–3 mois, social | OK | /retention | |
| 02 | Sources | CORRIGÉ | — | Ajout de /production/analytics et /production/analytics/acquisition (définitions citées dans l’encadré) |
| 02 | Quiz 1 (30/200 = 15 %), quiz 2 à 5 | OK | — | |
| 03 | DAU = « unique players who joined the game at least once in the given day » ; New Users ; Session Time | OK | /production/analytics | |
| 03 | CCU parmi les statistiques publiques de la watchlist | OK | idem | |
| 03 | MAU (exemple d’Halloween), Demographics calculées sur les MAU | OK | /get-started, /demographics | |
| 03 | DAU/MAU non présenté comme KPI par Roblox | OK | recherche WebSearch sur create.roblox.com : aucun résultat | Présenté comme indicateur de l’industrie à calculer soi-même |
| 03 | DAU/MAU 1 200 / 9 000 ≈ 13 % ≈ 4 jours sur 30 ; quiz 500/5 000 = 10 % ≈ 3 jours | OK | calcul | |
| 03 | Durée moyenne de session = temps total ÷ sessions, « closely tied to retention » | OK | /engagement | |
| 03 | Average Playtime, WAU, MAU sur la page Engagement | OK | /get-started | |
| 03 | Exemple 27 000 / 1 800 = 15 min ; 27 000 / 1 200 = 22,5 min | OK | calcul | |
| 03 | Breakdown : Platform (Computer, phone, tablet, console, VR), OS, doublons multi-appareils ; User engagement (0 / 1 / 2–3 / 4–7 jours) | OK | /analytics-dashboard | |
| 03 | New User First Session Retention + 2 conseils | OK | /engagement | Quiz 5 OK |
| 03 | Graphique Concurrent users (Performance) | OK | /performance | |
| 03 | Quiz 1 (6 000/400 = 15 ; 6 000/300 = 20), quiz 2 à 5 | OK | — | |
| 04 | Tableau Revenue / Conversion rate / Paying users / ARPPU / ARPDAU ; menu Monetization > Overview | OK | /monetization | Définitions exactes |
| 04 | Divergence sur la définition de la conversion (/get-started : « percentage of all users ») | OK | /get-started | Signalée honnêtement dans la leçon |
| 04 | « ARPDAU is a combination of payer conversion rate and ARPPU » ; ARPPU élevé + ARPDAU faible | OK | /monetization | |
| 04 | Exemple 20/1 000 = 2 % ; 1 500/20 = 75 ; 1 500/1 000 = 1,5 ; 0,02 × 75 = 1,5 | OK | calcul | La sortie attendue de la calculatrice Luau a aussi été vérifiée |
| 04 | Moyenne de moyennes : (200 + 600) ÷ 32 = 25 | OK | calcul | |
| 04 | Conversion de 2 % à 2,4 %, D1 de 15 % à 11 % → « plus d’un quart » des joueurs qui reviennent perdus (4/15 = 26,7 %) | OK | calcul | |
| 04 | Pages par produit (Developer Products, Passes, Avatar items, Subscriptions, Immersive ads, Creator rewards) | OK | /monetization | |
| 04 | Mélange durables/consommables, gamme de prix, conseils conversion/ARPPU | OK | /monetization | |
| 04 | Active payer status (Top 15 %, 35 %, 50 %, Lapsed 30 jours, Never, recalcul quotidien) ; « top 15 % ≈ 50 % des revenus » | OK | /analytics-dashboard, /get-started | |
| 04 | Engagement-based payouts dépréciés le 24/07/2025, remplacés par Creator Rewards | OK | /engagement-based-payouts | |
| 04 | Daily Engagement Rewards : « l’une des trois premières expériences qu’il lance ce jour-là » | CORRIGÉ | /creator-rewards (WebFetch) | Règle de la doc : « one of the first three an Active Spender plays for 10+ minutes » (l’exemple 1 de la doc le confirme). Définition d’Active Spender complétée : pas un New User ni un Reactivated User sur la période |
| 04 | Filtre Platform spender status = même définition que Creator Rewards ; vérifier Average Playtime par rapport au seuil de 10 min | OK | /analytics-dashboard, /get-started | |
| 04 | « une part importante de ses joueurs ont moins de 13 ans » | REFORMULÉ | /production/roblox-user-base | La doc dit qu’il y a désormais plus d’utilisateurs de 13 ans et plus que de moins de 13 ans |
| 04 | Après chaque mise à jour : D1 et D7, durée de session, conversion, ARPPU, revenus | OK | /production/analytics | |
| 04 | Quiz 1 à 5 (2,5 % ; 60 et 1,5 ; trouve-le-bug ligne 6 ; lignes numérotées vérifiées) | OK | — | |
| 05 | Signatures des 5 méthodes `Log…` et des raccourcis Start/Complete/Fail | OK | référence API (WebFetch) + AnalyticsService.yaml | |
| 05 | Méthodes `Fire…` (et la propriété `ApiKey`) dépréciées | OK | idem | |
| 05 | « Voici les méthodes actuelles » (liste incomplète) | CORRIGÉ | référence API | Ajout d’une mention de `GetPlayerSegmentsAsync` (méthode de lecture, serveur uniquement), présente dans la référence |
| 05 | `LogProgression…` : « does not currently display in any Roblox-provided charts » | OK | AnalyticsService.yaml | Quiz 5 OK |
| 05 | Serveur uniquement, jeux publiés uniquement | OK | /funnel-events, /economy-events, /custom-events | |
| 05 | Fonctionnalités gratuites ; pages Funnel / Economy / Explore débloquées | OK | /event-types, /custom-events | |
| 05 | Étape répétée ignorée mais comptée dans la limite de débit ; étape sautée → étapes précédentes complétées ; 1re étape dans PlayerAdded ; expiration après 180 jours | OK | /funnel-events | |
| 05 | funnelSessionId : inutile pour un entonnoir unique ; GUID pour une boutique ; 10 identifiants les plus récents ; `nil` → étapes répétées ignorées | OK | /funnel-events + yaml | |
| 05 | Validation serveur des étapes envoyées par un RemoteEvent | OK | /funnel-events | |
| 05 | Custom fields : 3, clés `CustomField01..03.Name`, autres clés ignorées, valeurs en chaînes, 8 000 combinaisons | OK | /custom-fields, page de l’enum | |
| 05 | Exemple PlantSeed ; regroupement « 10 zombies » | OK | /custom-events | |
| 05 | Limites : 120 + 20 × CCU par minute ; 10 entonnoirs ; 100 étapes ; 100 eventNames ; 20 transactionTypes / 100 SKU avant « Other » ; 90 jours ; remise à zéro quotidienne | OK | /event-types (WebFetch) | |
| 05 | Monnaies : « très peu : 5 types par expérience selon la référence de l’API » | CORRIGÉ | /event-types (« Resource types : 10 ») ; référence API, paramètre `currencyType` (« Limited to 5 unique currency types per experience ») ; /economy-events (« up to five currencies ») | La contradiction de la doc est maintenant signalée dans la leçon, avec un conseil prudent : 5 au maximum |
| 05 | Montant toujours positif, endingBalance ≥ 0, `.Name` de l’enum, 6 types de transaction | OK | /economy-events + yaml | Quiz 4 (trouve-le-bug, ligne 8) OK |
| 05 | View Events (liste quasi en temps réel) ; graphiques en 24 h environ ; enregistrer après une opération réussie | OK | /event-types | |
| 05 | Entonnoirs affichés par cohorte ; plage de dates à partir de la modification | OK | /funnel-events | |
| 05 | Exemple de débit 120 + 20 × 10 = 320 ; 10 × (6 + 2) = 80 | OK | calcul | |
| 05 | Entonnoir fictif : 96 %, 73 %, 60 %, 93 % ; 280/700 = 40 % ; morts à `Etape` 1 = passage CP1 → CP2 | OK | calcul + convention du fil rouge | |
| 05 | « Au chargement de la sauvegarde, Etape peut sauter de 0 à 12 » | REFORMULÉ | module 04 (`creerLeaderstats` règle la valeur avant de rattacher l’objet au joueur) | Avec le code du module 04, ce saut n’arrive pas : le filtre « +1 exactement » devient une précaution, justifiée par la convention (+1 par checkpoint ou par « passer l’étape » du module 06) |
| 05 | `WaitForChild("leaderstats", 15)` | CORRIGÉ | module 04 (3 tentatives avec attente de 2^n s) | Délai passé à 30 s : un chargement lent avec plusieurs tentatives pouvait dépasser 15 s et désactiver le suivi du joueur |
| 05 | Encadré sur les anciens joueurs (entonnoir d’onboarding) | CORRIGÉ (complété) | /funnel-events (étape sautée) | Ajout : dans `ProgressionObby`, un ancien joueur qui atteint le checkpoint 10 valide d’un coup les étapes 1 à 9 |
| 05 | Script : Script serveur, `pcall`, rien n’est envoyé dans Studio, `task.spawn`, `WaitForChild` avec délai, pas d’API dépréciée | OK | — | |
| 05 | Quiz 1 à 5 | OK | — | |
| Examen | Q1 (sources d’acquisition), Q2 (percentiles), Q4 (25/500 = 5 %, le 12/10 = jour 7), Q5, Q6, Q7, Q8, Q9 (0,04 × 50 = 2), Q11, Q12, Q15 (770 → 380 ≈ 51 % de départs) | OK | pages ci-dessus | |
| Examen | Q3 : « une quinzaine de joueurs par jour » → D1 | CORRIGÉ | /retention | La D1 se calcule sur la cohorte des **nouveaux** joueurs : énoncé et explication précisés (1/15 ≈ 7 points ; 3/15 = 20 %, 4/15 ≈ 27 %) |
| Examen | Q10, Q13, Q14 (trouve-le-bug) : un seul bug, numéros de ligne exacts | OK | yaml (étapes 1–100), /custom-fields | |

## Erreurs restantes non corrigées
Aucune erreur restante.
- Contradiction de la doc officielle sur le nombre de monnaies (5 ou 10) : elle ne peut pas être tranchée ; la leçon la signale en citant les deux pages.
- La référence AnalyticsService renvoie 502 à curl, mais elle s’affiche avec WebFetch : le lien est conservé.
- Hors module (pour info) : le module 00 (leçon 04) parle d’un tableau « Home Recommendations » du Creator Dashboard, à vérifier par son vérificateur.
