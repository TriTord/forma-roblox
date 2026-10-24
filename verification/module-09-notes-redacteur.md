# Module 08 — Notes du rédacteur pour les vérificateurs

> **Note (phase IA, 2026-10-24)** : ce rapport a été écrit quand ce module portait le numéro 08. Un module 02 « Scripter avec l'IA » a ensuite été inséré : dans le texte ci-dessous, les numéros de modules et les chemins suivent l'**ancienne** numérotation (ancien module N ≥ 2 = nouveau module N + 1).

Vérifications faites le 2026-10-24 sur la documentation officielle (pages create.roblox.com consultées via WebFetch, et sources Markdown/YAML identiques du dépôt officiel `github.com/Roblox/creator-docs`, branche `main`, derniers commits sur `production/analytics` du 2026-10-14).

## Affirmations factuelles et sources

### Leçon 01 — pourquoi-mesurer
| Affirmation | Source |
|---|---|
| Éligibilité à tous les KPI : « more than 10 daily active users (DAU) and 10 play hours for 7 consecutive days » | https://create.roblox.com/docs/production/analytics/analytics-dashboard |
| Activation : e-mail vérifié + vérification en 2 étapes + acceptation des Terms of Use ; bouton « Activate Analytics » ; jeux de groupe : propriétaire et membres ayant la permission | idem |
| Catégories : Overview, Retention, Engagement, Acquisition, Demographics, Feedback, Monetization (+ sales data), Explore | idem |
| Pages Economy / Funnel / Custom (Explore) débloquées après envoi d’événements | https://create.roblox.com/docs/production/analytics/event-types , /funnel-events , /custom-events , /economy-events |
| Menu « Monitoring » > Performance ; graphiques détaillés à partir de 100 DAU | https://create.roblox.com/docs/production/analytics/performance |
| Analytics Home : watchlist jusqu’à 9 jeux | https://create.roblox.com/docs/production/analytics |
| Insights : jeux 100+ DAU ; rapports IA : 1000+ DAU ; panneau des réussites = plus haut sur 6 mois | https://create.roblox.com/docs/production/analytics/insights |
| Benchmark scorecards à partir de 100 DAU ; benchmarks non utilisés comme signal direct de découverte | https://create.roblox.com/docs/production/analytics |
| Benchmarks : jeux similaires → genre → toutes expériences ; fourchette 50e–90e percentile ; jeux d’au moins 100 DAU ; KPI concernés (rétention, durée moyenne de session, ARPPU, ARPDAU, conversion, play through rate) | analytics-dashboard#benchmarking |
| Play through rate = % de joueurs ayant joué après avoir vu le jeu en recommandation | https://create.roblox.com/docs/production/analytics |
| Plan en 3 étapes (D1 + durée de session d’abord, puis acquisition, puis suivi après mise à jour) | https://create.roblox.com/docs/production/analytics |
| Baisse de rétention après gros afflux = « typical and temporary » | https://create.roblox.com/docs/production/analytics/retention |
| Experiments = tests A/B mesurant l’impact causal ; jeux < 1 000 DAU peuvent avoir du mal à obtenir des données utiles | https://create.roblox.com/docs/production/experiments |
| Ligne en pointillés quand le taux de crash est bruité | /performance |
| Groupes d’âge/genre < 3 utilisateurs masqués | https://create.roblox.com/docs/production/analytics/demographics |
| Explore : overlay période précédente, moyenne mobile 7 jours | analytics-dashboard#overlays-and-smoothing |

### Leçon 02 — retention
| Affirmation | Source |
|---|---|
| Axe X = date de première partie (cohorte) ; exemple 06/20 ; données D7 visibles après 7 jours, D30 après 30 | /retention |
| D1 = nouveaux joueurs qui reviennent le lendemain ; D7 = « on the 8th day (Day 7) » ; D30 = « on the 31st day (Day 30) » | /retention |
| Cohortes quotidiennes (10 premiers jours) et hebdomadaires (10 semaines, lundi–dimanche) ; métriques 7D playtime, 7D conversion, 7D/30D revenue per user | /retention |
| D1 ↔ core loop, FTUE, performance ; plaisir en 5 minutes ou moins ; D7 ↔ progression ; D30 ↔ ending system, mises à jour 2–4 semaines / 2–3 mois, social | /retention |

### Leçon 03 — engagement-et-sessions
| Affirmation | Source |
|---|---|
| DAU = « Number of unique players who joined the game at least once in the given day » ; New Users = DAU first-time users ; Session Time = total play time / sessions ; CCU parmi les stats publiques | /production/analytics (Analytics Home) |
| MAU (nombre de joueurs du mois, exemple Halloween), durée moyenne de session « from the start of their session to the time they log out » | /get-started |
| Average session time = temps total / nombre de sessions, « closely tied to retention » | /engagement |
| « Average Playtime », WAU, MAU cités dans la page Engagement | /get-started (encadré Active payer status) |
| Graphique New User First Session Retention + conseils (friction onboarding, rapports erreurs/perf) | /engagement |
| Breakdown Platform (Computer, phone, tablet, console, VR) / OS ; multi-appareils comptés plusieurs fois ; User engagement (inactif/faible/moyen/élevé, jours joués sur 7) | /analytics-dashboard |
| Graphique Concurrent users dans Performance | /performance |
| Demographics calculées sur les MAU | /demographics |

### Leçon 04 — monetisation-et-conversion
| Affirmation | Source |
|---|---|
| Tableau Revenue / Conversion rate (% des DAU qui sont payeurs) / Paying users / ARPPU / ARPDAU ; menu Monetization > Overview | https://create.roblox.com/docs/production/analytics/monetization |
| « ARPDAU is a combination of your payer conversion rate and your ARPPU » ; « high ARPPU and low ARPDAU suggest revenue comes from a limited user subset » ; conseils conversion/ARPPU/ARPDAU | /monetization |
| Pages par produit : Developer Products, Passes, Avatar items, Subscriptions, Immersive ads, Creator rewards | /monetization |
| Active payer status : Top 15 %, Intermediate 35 %, Casual 50 %, Lapsed (30 jours), Never ; recalcul quotidien | /analytics-dashboard |
| « On average, the top 15% of active payers account for roughly 50% of revenue » | /get-started |
| Engagement-based payouts (Premium Payouts) dépréciés le 24 juillet 2025, remplacés par Creator Rewards | https://create.roblox.com/docs/production/monetization/engagement-based-payouts |
| Daily Engagement Rewards : 5 Robux/jour, Active Spender (≥ 9,99 $ en 60 jours), ≥ 10 min, parmi les 3 premières expériences du jour | https://create.roblox.com/docs/creator-rewards ; filtre Platform spender status : /analytics-dashboard |
| Formules (conversion, ARPPU, ARPDAU, ARPDAU = conversion × ARPPU) : calcul vérifié à la main ; exemples chiffrés marqués « fictifs » | — |

### Leçon 05 — evenements-personnalises
| Affirmation | Source |
|---|---|
| Signatures : `LogOnboardingFunnelStepEvent(player, step, stepName, customFields)`, `LogFunnelStepEvent(player, funnelName, funnelSessionId, step=1, stepName, customFields)`, `LogEconomyEvent(player, flowType, currencyType, amount, endingBalance, transactionType, itemSku, customFields)`, `LogCustomEvent(player, eventName, value=1, customFields)`, `LogProgressionEvent(player, progressionPathName, status, level, levelName, customFields)` + Start/Complete/Fail | https://create.roblox.com/docs/reference/engine/classes/AnalyticsService (YAML source : `content/en-us/reference/engine/classes/AnalyticsService.yaml`) ; concordance avec `C:/tmp/luau-tools/globalTypes.d.luau` |
| `LogProgression…` : « This event does not currently display in any Roblox-provided charts » | référence API |
| FireEvent, FireCustomEvent, FireInGameEconomyEvent, FirePlayerProgressionEvent, FireLogEvent dépréciés | référence API |
| Serveur uniquement + jeux publiés uniquement (ni client, ni Studio) | /funnel-events, /custom-events, /economy-events |
| Fonctionnalités gratuites | /event-types |
| Étape répétée ignorée (mais compte dans le rate limit) ; étape sautée → précédentes complétées ; 1er pas dans PlayerAdded ; expiration 180 jours ; filtres sur 1re étape ; affichage par cohorte ; plage de dates après modification | /funnel-events |
| funnelSessionId : inutile pour entonnoir unique, GUID pour boutique, 10 derniers IDs par joueur et entonnoir ; funnelSessionId `nil` → étapes répétées ignorées | /funnel-events + référence API (paramètre step) |
| Validation serveur des étapes envoyées par le client via RemoteEvent | /funnel-events (« Protect your funnels from exploiters ») |
| Custom fields : 3 max, clés `Enum.AnalyticsCustomFieldKeys.CustomField01..03.Name`, autres clés ignorées, valeurs en chaînes, 8 000 combinaisons | /custom-fields, /event-types |
| Préférer custom fields aux noms d’événements (exemple PlantSeed) ; batching « 10 zombies » | /custom-events |
| Limites : 120 + 20 × CCU req/min ; 10 entonnoirs ; 100 étapes ; 100 eventNames ; 20 transactionTypes et 100 itemSkus avant « Other » ; rétention 90 jours après dernière donnée ; reset quotidien | /event-types#event-tracking-limitations |
| Montant toujours positif ; endingBalance ≥ 0 ; transactionType = `.Name` de l’Enum ; types IAP, TimedReward, Onboarding, Shop, Gameplay, ContextualPurchase | /economy-events + référence API |
| View Events (liste quasi temps réel) ; graphiques ≈ 24 h ; enregistrer après une opération réussie | /event-types |

## Points incertains / à surveiller
1. **Nombre de monnaies (économie)** : incohérence dans la doc officielle. Tableau des limites (/event-types) : « Resource types : 10 » ; référence API (`currencyType`) : « Limited to 5 unique currency types per experience » ; /economy-events : « up to five currencies ». J’ai écrit « très peu : 5 types par expérience selon la référence de l’API ».
2. **Définition exacte de D1** : /retention dit « returned the next day » ; Analytics Home dit « played again after their first session ended » ; /acquisition parle de D7 « played again on the 8th day (D8) after their first session ended ». J’ai présenté la définition de la page Retention (jour N exact) et signalé que les formulations varient (encadré Info leçon 02).
3. **Taux de conversion** : /monetization = % des DAU payeurs (retenu) ; /get-started = « percentage of all users who have spent any amount ». Signalé dans la leçon 04.
4. **Revenue** : je n’affirme pas s’il s’agit de Robux nets ou bruts (la doc dit « Robux earned by the game »).
5. **DAU/MAU** : présenté explicitement comme un indicateur de l’industrie à calculer soi-même ; je n’ai trouvé aucune page Roblox qui l’affiche comme KPI.
6. **Comportement des méthodes `Log…` dans Studio** (erreur ou ignoré silencieusement) non documenté : le script de la leçon 05 court-circuite l’envoi dans Studio avec `RunService:IsStudio()` et protège chaque appel avec `pcall` (choix de robustesse, pas une exigence officielle).
7. La méthode `LogJourneyEvent` existe dans les définitions de types mais pas dans la référence publiée : non mentionnée.
8. Le script de la leçon 05 suppose que `leaderstats.Etape` vaut le numéro du dernier checkpoint validé (0 au départ) et n’augmente que de 1 par checkpoint (module 3). Si le module 4 fait démarrer un nouveau joueur à `Etape = 1`, le script reste correct (l’étape 3 de l’onboarding sera validée automatiquement par saut d’étape), mais l’événement `SecondesAvantCheckpoint1` ne sera jamais envoyé. Le Developer Product « passer l’étape » (module 6) sera compté comme une progression (+1).
9. **Cohérence inter-modules** : le PLAN mentionne les « Premium Payouts » (modules 6 et 8). Ce programme est déprécié depuis le 24/07/2025 (remplacé par Creator Rewards) : le rédacteur du module 6 devrait en tenir compte.
10. Les URL `create.roblox.com/docs/reference/engine/classes/...` ont renvoyé un code 502 à `curl` (probablement une protection anti-robots) mais s’affichent via WebFetch : liens corrects.
