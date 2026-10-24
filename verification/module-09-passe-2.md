# Module 08 — passe 2 (vérificateur indépendant : contre-vérification) — 2026-10-24

> **Note (phase IA, 2026-10-24)** : ce rapport a été écrit quand ce module portait le numéro 08. Un module 02 « Scripter avec l'IA » a ensuite été inséré : dans le texte ci-dessous, les numéros de modules et les chemins suivent l'**ancienne** numérotation (ancien module N ≥ 2 = nouveau module N + 1).

## Résumé
102 affirmations ou éléments vérifiés, 9 corrigés ou reformulés, 0 supprimé.
Quiz : 25 questions de leçon et 15 questions d’examen revérifiées une par une (bonne réponse, distracteurs, explication, calculs). Les 5 `trouve-le-bug` ont été recomptés ligne par ligne (leçon 04 : ligne 6 ; leçon 05 : ligne 8 ; examen : lignes 5, 7 et 6). Résultat : tous corrects, aucun changement.
Code : `node scripts/verifier-luau.mjs 08` → 9 extraits, 0 diagnostic (avant et après corrections). J’ai relu l’exécution réelle du script `AnalytiqueObby` et du ModuleScript `AnalytiqueEconomie` en les comparant au code des modules 03, 04 et 06 (`creerLeaderstats`, `avecTentatives`, script d’achat de la leçon Inventaire, Developer Product « passer l’étape » qui fait `etape.Value += 1`). J’ai corrigé 4 points de cohérence ou de clarté.
Build : `bash scripts/build-verrou.sh` → code de sortie 0.

Méthode : pour avoir le texte exact, j’ai téléchargé les fichiers sources officiels du dépôt `Roblox/creator-docs` (branche `main` ; derniers commits : `production/analytics` le 2026-10-14, `AnalyticsService.yaml` le 2026-10-21). Il y en a 20 pages `.md`, plus `AnalyticsService.yaml` et 3 enums. J’ai aussi lu en direct avec WebFetch les pages creator-rewards et la référence AnalyticsService. Les 23 URL de `<Sources>` ont été testées : 22 répondent 200. La référence AnalyticsService répond 502 à curl (protection anti-robots), mais WebFetch l’affiche bien. Deux WebSearch : pas de « DAU/MAU » ni de « stickiness » sur create.roblox.com, et aucune définition officielle d’« Average Playtime ».

## Détail
| Leçon | Affirmation / élément | Verdict | Source | Commentaire |
|---|---|---|---|---|
| 01 | Éligibilité : plus de 10 DAU et 10 h de jeu pendant 7 jours consécutifs ; e-mail vérifié, vérification en 2 étapes, Terms of Use, bouton Activate Analytics ; jeux de groupe | OK | /analytics-dashboard | Citation exacte |
| 01 | Sections Overview / Retention / Engagement / Acquisition / Demographics / Feedback / Monetization / Explore ; Economy / Funnel / Custom | OK | /analytics-dashboard, /event-types | |
| 01 | Monitoring → Performance ; graphiques à partir de 100 DAU ; watchlist de 9 jeux | OK | /performance, /production/analytics | |
| 01 | « rapports automatiques à partir de 1 000 DAU » | REFORMULÉ | /insights | La doc parle de rapports **générés par IA**, hebdomadaires et mensuels (« analytics reports ») : formulation précisée |
| 01 | Benchmark scorecards et insights à partir de 100 DAU | OK | /production/analytics, /insights | |
| 01 | Play through rate ; plan en 3 étapes ; benchmarks non utilisés comme signal direct de découverte | OK | /production/analytics | |
| 01 | Benchmarks : jeux similaires → genre → toutes expériences ; 50e–90e percentile ; liste des KPI | OK | /analytics-dashboard#benchmarking | |
| 01 | « typical and temporary » ; Experiments (impact causal, moins de 1 000 DAU) ; ligne en pointillés ; groupes de moins de 3 masqués ; superposition de la période précédente et moyenne mobile sur 7 jours ; achievement panel sur 6 mois | OK | /retention, /experiments, /performance, /demographics, /analytics-dashboard, /insights | |
| 01 | « les métriques… montrent où regarder de plus près » | OK | /get-started | |
| 01 | Quiz 1 à 5 | OK | — | |
| 02 | Axe X = date de première partie ; exemple du 20/06 ; D7 visible le 27/06, D30 le 20/07 | OK | /retention | |
| 02 | D1 = le lendemain ; D7 = « on the 8th day (Day 7) » ; D30 = « on the 31st day (Day 30) » | OK | /retention | |
| 02 | Encadré sur les définitions divergentes (Analytics Home, Acquisition « D8 ») | OK | /production/analytics, /acquisition | Reformulation de la passe 1 vérifiée : exacte |
| 02 | Cohortes quotidiennes (10 jours) et hebdomadaires (10 semaines, du lundi au dimanche) ; 4 métriques cumulées | OK | /retention | |
| 02 | D1 ↔ core loop, FTUE, performance ; 5 minutes ou moins ; D7 ↔ progression ; D30 ↔ ending system (2–4 semaines / 2–3 mois, social) | OK | /retention | |
| 02 | Exemple 400 → 15 % / 4 % / 1 % ; quiz 1 (30/200 = 15 %), quiz 2 à 5 | OK | calcul | |
| 02 | Source « Onboarding » | OK | /game-design/onboarding | Page pertinente (FTUE, D1, entonnoir) |
| 03 | DAU, New Users, Session Time, CCU public (watchlist) | OK | /production/analytics | |
| 03 | MAU (exemple d’Halloween) ; Demographics calculées sur les MAU | OK | /get-started, /demographics | |
| 03 | DAU/MAU non présenté par Roblox | OK | WebSearch sur create.roblox.com | Aucun résultat |
| 03 | « La page Engagement affiche un temps de jeu moyen (*Average Playtime*) = temps de chaque joueur, toutes sessions confondues » | REFORMULÉ | /get-started (mention seule) ; WebSearch | Aucune page officielle ne définit Average Playtime. La leçon présente maintenant le temps de jeu par joueur comme un calcul à faire soi-même, et renvoie à l’icône d’information du graphique pour la définition d’Average Playtime |
| 03 | Durée moyenne de session = temps total ÷ sessions, « closely tied to retention » | OK | /engagement | |
| 03 | Breakdown : Platform / OS (doublons multi-appareils), âge, pays, langue, source ; User engagement (0 / 1 / 2–3 / 4–7 jours) | OK | /analytics-dashboard | |
| 03 | New User First Session Retention + 2 conseils ; Concurrent users (Performance) | OK | /engagement, /performance | |
| 03 | Exemples 27 000 ÷ 1 800 = 15 et 27 000 ÷ 1 200 = 22,5 ; 1 200 ÷ 9 000 ≈ 13 % ; quiz 1 à 5 | OK | calcul | |
| 04 | Tableau des 5 indicateurs ; menu Monetization > Overview ; pages par produit | OK | /monetization | |
| 04 | Divergence sur la définition de la conversion (« percentage of all users… ») | OK | /get-started | |
| 04 | ARPDAU = combinaison de la conversion et de l’ARPPU ; ARPPU élevé + ARPDAU faible ; signaux de conversion et d’ARPPU faibles | OK | /monetization, /get-started | |
| 04 | Calculatrice pour la Command Bar (sortie 2.0 % / 75.0 / 1.50 / 1.50) ; moyenne de moyennes (200 + 600) ÷ 32 = 25 ; 4/15 ≈ 27 % (« plus d’un quart ») | OK | calcul | |
| 04 | Active payer status (85–100e percentile, etc., Lapsed 30 jours, recalcul quotidien) ; top 15 % ≈ 50 % des revenus | OK | /analytics-dashboard, /get-started | |
| 04 | Engagement-based payouts dépréciés le 24/07/2025 et remplacés par Creator Rewards | OK | /engagement-based-payouts | |
| 04 | Daily Engagement Rewards : « trois premières expériences où il atteint ces 10 minutes » | CORRIGÉ | /creator-rewards (WebFetch + source) | Cette formulation (passe 1) contredit l’exemple 2 de la doc : A atteint 10 minutes en dernier mais rapporte quand même ; E rapporte 0 parce qu’elle est la 4e expérience **lancée**. Nouvelle formulation, compatible avec les deux exemples : parmi les expériences où le joueur passe au moins 10 minutes, la tienne doit être parmi les trois premières qu’il a lancées |
| 04 | Active Spender : 9,99 $ en 60 jours, ni New User ni Reactivated User ; Platform spender status cohérent avec cette définition ; seuil de 10 min et Average Playtime | OK | /creator-rewards, /analytics-dashboard, /get-started | |
| 04 | Public de 13 ans et plus désormais majoritaire | OK | /roblox-user-base | |
| 04 | Quiz 1 à 5 (2,5 % ; 60 et 1,5 ; bug ligne 6 ; etc.) | OK | — | |
| 05 | Signatures des méthodes `Log…` (valeurs par défaut : `value = 1`, `step = 1`, `customFields = nil`) ; méthodes `Fire…` et `ApiKey` dépréciées ; `GetPlayerSegmentsAsync` lecture serveur uniquement | OK | référence API (WebFetch) + AnalyticsService.yaml | |
| 05 | `LogProgression…` absent des graphiques Roblox | OK | yaml | |
| 05 | Serveur et jeu publié uniquement ; fonctionnalités gratuites ; pages débloquées | OK | /funnel-events, /event-types, /custom-events | |
| 05 | Page « Custom » vs « Explore » pour les événements personnalisés | REFORMULÉ | /event-types (« Custom pages ») vs /custom-events (« Explore page ») | La doc se contredit : l’étape View Events signale maintenant les deux noms pour ne pas perdre le débutant |
| 05 | Étape répétée ignorée mais comptée dans le débit ; étape sautée ; 1re étape dans PlayerAdded ; 180 jours ; `nil` → étapes répétées ignorées ; 10 identifiants de session ; GUID | OK | /funnel-events + yaml | J’ai ajouté une définition de « GUID » pour les débutants |
| 05 | Custom fields (3 clés `CustomField01..03.Name`, valeurs en chaînes, 8 000 combinaisons) ; PlantSeed ; « 10 zombies » | OK | /custom-fields, /custom-events | |
| 05 | Limites : 120 + 20 × CCU ; 10 entonnoirs ; 100 étapes ; 100 eventNames ; 20 types / 100 SKU ; 90 jours ; remise à zéro quotidienne ; monnaies 5 ou 10 (la doc se contredit) | OK | /event-types, yaml, /economy-events | J’ai revérifié la contradiction (5 dans le yaml et /economy-events, 10 dans le tableau /event-types) |
| 05 | Objectif « limites de cardinalité » jamais défini dans le texte | CORRIGÉ (clarté) | — | Définition ajoutée au début de la section des limites |
| 05 | Types de transaction (IAP, TimedReward, Onboarding, Shop, Gameplay, ContextualPurchase) ; montant toujours positif ; endingBalance ≥ 0 ; `.Name` | OK | /economy-events, enum, yaml | |
| 05 | View Events ; graphiques en 24 h environ ; enregistrer après réussite ; entonnoirs par cohorte ; plage de dates après une modification | OK | /event-types, /funnel-events | |
| 05 | Script `AnalytiqueObby` : commentaire « le chargement d’une sauvegarde fait sauter la valeur » | REFORMULÉ | module 04 (`creerLeaderstats` règle `Etape` avant de rattacher le dossier au joueur) | Le commentaire contredisait la prose corrigée en passe 1 (avec le code du module 04, il n’y a pas de saut) |
| 05 | `WaitForChild("leaderstats", 30)` puis `WaitForChild("Etape", 30)` | CORRIGÉ | module 04 (leçons 03 et 05 : `WaitForChild("leaderstats", 60)`) | Passé à 60 s, comme dans le reste du fil rouge. `Etape` est déjà créée quand `leaderstats` apparaît, donc 10 s suffisent pour elle |
| 05 | ModuleScript `AnalytiqueEconomie` : « script d’achat (module 3) » et appel `achat(player, idObjet, prix, pieces.Value)` | CORRIGÉ | module 04, leçon 03 (`pieces.Value -= objet.prix`, inventaire persistant) | Le script d’achat avec inventaire est celui du module 04 : appel aligné sur ses variables (`objet.prix`), et précision que `pieces.Value` est déjà le solde après l’achat |
| 05 | Exécution : Script serveur dans ServerScriptService ; `pcall` ; `RunService:IsStudio()` ; connexions établies avant toute attente ; `task.spawn` pour les joueurs déjà présents ; `FindFirstChild`/`IsA` contre `nil` ; aucune API dépréciée ; `Etape` +1 par checkpoint (module 03/04) ou par le Developer Product (module 06, `+= 1`) | OK | modules 03, 04, 06 | |
| 05 | Entonnoir fictif (96 / 73 / 60 / 93 %, 280/700 = 40 %) ; débit 320 et 80 req/min | OK | calcul | |
| 05 | Quiz 1 à 5 (bug ligne 8 = `-prix`) | OK | — | |
| Examen | Q1 à Q15 : réponses, distracteurs, calculs (27 % = 4/15 ; 12/10 = jour 7 ; 0,04 × 50 = 2 ; 5000 % ; 770 → 380 ≈ 51 % de départs) | OK | pages ci-dessus | |
| Examen | `trouve-le-bug` Q10 (ligne 5), Q13 (ligne 7), Q14 (ligne 6) : un seul bug chacun, numéros exacts | OK | yaml, /custom-fields | |

## Désaccords avec la passe 1
1. **Daily Engagement Rewards (leçon 04)** : la correction de la passe 1 (« trois premières expériences où il atteint ces 10 minutes ») est contredite par l’exemple 2 de la page officielle. La règle compatible avec les deux exemples, c’est l’ordre de **lancement** parmi les expériences où le joueur a passé au moins 10 minutes. C’est corrigé.
2. **Average Playtime (leçon 03)** : la passe 1 l’a validé comme le « temps par joueur toutes sessions confondues ». Aucune page officielle ne donne cette définition : j’ai reformulé.
3. **Délai d’attente des leaderstats (leçon 05)** : la passe 1 l’a passé à 30 s. J’ai aligné le délai sur les 60 s utilisées ailleurs dans le module 04, pour la cohérence du fil rouge.
4. **Commentaire du script (leçon 05)** : la passe 1 a reformulé la prose (un saut de valeur est une simple précaution), mais pas le commentaire du code, qui affirmait encore que le chargement fait sauter la valeur. Corrigé.
5. **Script d’achat (leçon 05)** : la passe 1 n’a pas relevé que le script d’achat de référence (avec inventaire) se trouve au module 04, pas au module 03. Corrigé.

## Erreurs restantes non corrigées
Aucune.
- La documentation officielle se contredit sur le nombre de monnaies (5 ou 10) et sur le nom de la page des événements personnalisés (« Custom » ou « Explore »). Je ne peux pas trancher : les deux points sont signalés honnêtement dans la leçon.
- La référence AnalyticsService répond 502 à curl, mais WebFetch l’affiche : le lien est conservé.
