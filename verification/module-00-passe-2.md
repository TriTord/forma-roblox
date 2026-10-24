# Module 00 — passe 2 (vérificateur, contre-vérification indépendante) — 2026-10-24

## Résumé
Environ 100 affirmations revérifiées sur source officielle (5 leçons + examen), 17 corrigées / reformulées / simplifiées, 0 supprimée sur le fond (2 passages chiffrés allégés). Quiz : 26 questions de leçon + 15 d'examen relues : 0 réponse fausse ; 1 question d'examen désambiguïsée, 1 explication simplifiée. Code : `verifier-luau 00` → 4 extraits, diagnostics uniquement sur les 2 `trouve-le-bug` de l'examen (bugs volontaires, numéros de ligne exacts) ; extrait d'aperçu de la leçon 01 complété d'une note sur l'absence d'anti-rebond. Sources : 1 lien mort remplacé, 1 lien redirigé mis à jour, 6 sources ajoutées. Build `build-verrou.sh` : code 0 (69 pages).

Méthode : versions `.md` de create.roblox.com (curl), API JSON du DevForum et du centre d'aide, texte des pages Newsroom ; contrôle du code HTTP de chaque lien de `<Sources>` (WebFetch confirme le 404 du lien mort).

## Détail

| Leçon | Affirmation / élément | Verdict | Source | Commentaire |
|---|---|---|---|---|
| 01 | Studio gratuit, Windows et Mac ; config. min. Win 10 / macOS 10.14 / 3 Go ; recommandé Win 11 / macOS 14+ / 8 Go / 1600×900 (colonne Recommandé) | OK | create.roblox.com/docs/studio/setup | Correction de la passe 1 confirmée |
| 01 | Accord parental pour un mineur | OK | Terms US (115004647846) et EEE (52986395990932), version « Effective Date: November 1, 2026 » | |
| 01 | 2-Step Verification, lien d'aide | OK | en.help…/212459863 | |
| 01 | 11 modules, quiz ≥ 70 %, bouton « Marquer comme terminée », badge Explorateur, badges globaux, localStorage, pages Ma progression / Programme | OK | src/data/site.ts, modules.ts, src/scripts/progression.ts, quiz.ts, src/pages | Défiler/ouvrir la leçon suivante ne marque rien (vérifié dans le code) |
| 01 | Aperçu de code checkpoints | OK + PRÉCISÉ | Analyse + raisonnement d'exécution | Pas de debounce : le message s'affiche plusieurs fois → phrase ajoutée (renvoi au module 2) |
| 01 | « Le cerveau retient mieux ce qu'il revoit souvent » | REFORMULÉ | — | Présenté comme conseil de méthode |
| 01 | Quiz trouve-le-bug `+` | OK | — | Erreur d'exécution (arithmétique sur chaîne), lignes 1/4/8 exactes |
| 02 | « Roblox a longtemps appelé ses jeux expériences, pour englober… » | REFORMULÉ | Terms (« interactive content called Experiences ») ; docs (Experience Detail Page, « game ») | Historique et justification non sourcés officiellement → limité à ce qui est vérifiable |
| 02 | Trois rôles, plateformes de jeu (dont VR), définition de créateur | OK | docs/monetize ; docs/creator-rewards (Roblox Dictionary) | |
| 02 | Studio, Team Create ; Creator Hub (Dashboard, docs, Creator Store, DevForum, Roadmap) | OK | docs/get-started/tools ; version .md de docs/creator-hub | |
| 02 | Robux = contenu numérique sous licence, pas une vraie monnaie | OK | Terms EEE §5.1 ; Terms US (« not a substitute for real currency ») | |
| 02 | DevEx sous conditions (âge, montant, vérifications) | OK + PRÉCISÉ | en.help…/203314100 (13 ans, 30 000 Robux, e-mail vérifié, revue) | Ajout : l'aide officielle dit que les exigences sont élevées et qu'il n'y a « no guarantee of earning money » |
| 02 | Roblox Wallet (fin 2026, versement automatique en USD) | OK | DevForum 4865880 (Roblox Staff, 11/09/2026) | |
| 02 | Liste des sources de revenus | OK + COMPLÉTÉ | docs/monetize ; docs/production/monetization ; docs/production/monetization/roblox-plus | **Roblox Plus** (listé officiellement comme moyen de gagner) ajouté en une ligne |
| 02 | Creator Rewards (Active Spenders ; nouveaux joueurs ou réactivés) ; remplacement des Engagement-Based Payouts le 24/07/2025 | OK + PRÉCISÉ | docs/creator-rewards ; …/engagement-based-payouts | « les anciens » → « joueurs inactifs depuis longtemps » (Lapsed User = 60 jours) |
| 02 | Accès payant, bêta fermée, serveurs privés, pubs (panneaux, vidéos récompensées, portails) | OK | docs/production/monetization ; docs/monetize | |
| 02 | Avertissement « not guaranteed… financial goals » | OK | docs/production/monetization | |
| 02 | Marketplace ≠ Creator Store | OK | docs/marketplace | |
| 02 | Community Standards (Safety, Civility, Integrity, Security ; jeux renvoyant hors de Roblox ; Paid Random Items) | OK | about.roblox.com/community-standards | |
| 02 | Portée des Creator Terms (versions EEE vs internationale) | SIMPLIFIÉ | Terms US et EEE | Passage trop technique pour un débutant → « encadrent notamment l'usage de Studio et la publication de jeux » (vrai dans les deux versions) |
| 02 | Roblox Kids (5-8) / Select (9-15) / Roblox (16+) ; exigences 16+ et tous âges ; évaluation | OK | docs/production/publishing/kids-and-select | |
| 02 | « Millions of games » ; studios de dizaines de personnes | OK | docs/discovery ; docs/monetize (studio de 100 personnes) | |
| 02 | DevEx : > 42 000 participants, médiane ≈ 1 500 $ (12 mois au 30/06/2026) ; doc encore à 35 000 / 1 550 $ (2025) ; rapport 2025 « median creator participating in the DevEx Program » | OK + SIMPLIFIÉ | Newsroom 09/2026 ; docs/monetize ; Newsroom 09/2025 | Chiffres exacts. Paragraphe allégé (anciens chiffres non répétés, explication de « médian » ajoutée) |
| 02 | Lien « Turn your creativity into income » | CORRIGÉ | — | `production/earning-on-roblox` redirige (301 ×2) vers `docs/monetize` → URL canonique |
| 02 | Lien `docs/creator-hub` | CORRIGÉ (lien mort) | — | La page HTML renvoie **404** (curl et WebFetch) ; remplacée par docs/production/analytics + create.roblox.com/roadmap |
| 03 | MVP, retours tôt, « finding the fun », « too late to pivot », KPI avant le développement, comparer analytics/KPI, parler aux joueurs, les regarder jouer | OK | docs/get-started/strategies | |
| 03 | Genres populaires, genre éprouvé | OK + PRÉCISÉ | idem (« Understanding the preferences of the Roblox user base is essential ») | |
| 03 | Prototypage papier / Studio, détection précoce, prototype rapide et ciblé | OK | docs/production/game-design/prototyping | |
| 03 | Pas de pénalité, fenêtre glissante, tests continus | OK | docs/discovery-faq | |
| 03 | Jeux non originaux « plus prioritaires » | OK | docs/discovery | |
| 03 | « Les développeurs plus expérimentés répondent souvent la même chose » ; « causes d'abandon que l'on retrouve le plus souvent » ; résumé « causes les plus citées » | REFORMULÉ | devforum…/573814 (un seul fil, membres non staff, expérience inconnue) | Fréquence non démontrable → « un membre lui répond… », « pièges classiques », « des développeurs le signalent » |
| 03 | Régularité « souvent plus efficace » | REFORMULÉ | — | Présenté comme conseil de méthode, pas règle de Roblox |
| 04 | « Documentation mise à jour en octobre 2026 » | CORRIGÉ | — | `last_updated` identique sur toutes les pages (date de génération du site) → « consultée en octobre 2026 » |
| 04 | Sorts Home (RFY, Continue Playing, Friends List, Sponsored, Curated Sorts) ; Standout Games (curation manuelle, candidature « Status: Open ») ; Live Events (quêtes, récompenses) | OK | docs/discovery ; docs/creator-programs/standout-games | |
| 04 | RFY = principale source organique | OK (source ajoutée) | docs/get-started/strategies (« Home is where a majority of discovery takes place ») | |
| 04 | Continue = joueurs qui reviennent ; Sponsored clairement signalés ; ≈ 100 jeux | OK | docs/discovery-faq | |
| 04 | Recherche sémantique, Discover, jeux similaires, share links, notifications (opt-in), Ads Manager (Home + Search) | OK | docs/discovery ; …/share-links ; …/advertise | |
| 04 | Retrieval / Ranking ; exclusion des joueurs pub, sélection, amis, recherche, réseaux sociaux | OK + CORRIGÉ | docs/discovery | « de tes amis » était un contresens (source = joueurs venus *via leurs* amis) → corrigé |
| 04 | Explore / expand (engagement **et** monétisation) ; pas de pénalité ; test quotidien | OK | docs/discovery ; FAQ | |
| 04 | Tableau des 8 signaux (deux niveaux, définitions, < 60 s / 61-180 s, J1 / J2-7 / J8-28, plafond 60 min, signal négatif, organiques RFY) | OK | docs/discovery « Key signals » ; FAQ | |
| 04 | Moyennes par joueur ; valeur = rétention + monétisation long terme ; aucun signal seul ; genre non explicite | OK | Discovery ; FAQ | |
| 04 | Passage 7 → 28 jours le 15/06/2026, raison (miniatures attrape-clic) | OK | Newsroom 06/2026 ; DevForum 4684575 (Roblox Staff) | |
| 04 | Remplacement de QPTR par PTR + first play bounce rate | OK mais RETIRÉ du texte | DevForum 4684575 (« Removing QPTR and introducing PTR and first play bounce rates ») | Exact, mais créait une confusion avec le +8,5 % de QPTR cité plus bas : détail inutile pour un débutant |
| 04 | Nouveau jeu n'attend pas 28 jours | OK | FAQ « New games questions » | |
| 04 | Qualité > optimisation de chaque signal ; rétention faible → gameplay d'abord | OK | Discovery ; FAQ | |
| 04 | Tableau Home Recommendations + benchmarks | OK | Discovery | |
| 04 | « Règle simple : on ne paie pas de pub tant que le jeu ne retient pas » | REFORMULÉ + SOURCÉ | docs/production/analytics (« Before driving too many new users to your game, grow… retention ») | Règle non sourcée → conseil officiel cité |
| 04 | Problèmes limitant l'exposition ; Community Standards (FAQ) ; bandeau quotidien ; réévaluation | OK | Discovery ; FAQ | |
| 04 | Miniature personnalisée obligatoire | OK | Discovery | |
| 04 | Personnalisation : 2 à 5 miniatures, groupes aléatoires, +8,5 % en moyenne pendant les tests | OK + SIMPLIFIÉ | …/publishing/thumbnails | Jargon « qualified play through rate » remplacé par sa définition en français |
| 04 | « Le PTR se joue en une fraction de seconde » | REFORMULÉ | — | Exagération non sourcée → « en quelques instants » |
| 04 | 4 facteurs d'impressions ; saisonnalité (samedi, été/rentrée, fêtes) ; pub sans pénalité | OK | Discovery ; FAQ | |
| 04 | Quiz (6 questions) | OK | Discovery ; FAQ ; thumbnails | Réponses et distracteurs justes |
| 05 | Core loop en trois sections | OK | docs/production/game-design/core-loops | |
| 05 | « Premier projet souvent conseillé aux débutants sur le DevForum » | REFORMULÉ | devforum…/573814 (posts 2 à 5) | Ramené à ce que montre le fil (plusieurs membres, 2020) |
| 05 | Évaluation avant accès aux moins de 16 ans | OK | kids-and-select | |
| 05 | Carte des modules, conventions de noms | OK | PLAN.md ; BRIEF_REDACTEUR.md | |
| 05 | Quiz (5 questions) | OK | — | |
| Examen | Q5 DevEx | SIMPLIFIÉ | Newsroom 09/2026 | La période « 12 mois au 30/06/2026 » s'applique à la médiane, pas au nombre de participants → explication allégée et exacte |
| Examen | Q9 bounce rate | CORRIGÉ (ambiguïté) | FAQ (PTR et bounce = joueurs organiques RFY, première session) | Ajout « arrivés par Recommended for You » : sinon des joueurs venus d'une pub ne toucheraient pas ce signal |
| Examen | Q14 `GetService("Player")` | OK | luau-lsp « Invalid service name » | Lignes 1/3/4/7 exactes, un seul bug |
| Examen | Q15 `if joueur = nil then` | OK | luau-lsp SyntaxError (6,12) | Lignes 2/5/6/7 exactes, un seul bug |
| Examen | 11 autres questions | OK | Leçons + sources ci-dessus | |

### Sources ajoutées / modifiées
- 02 : docs/monetize (URL canonique), docs/production/analytics, create.roblox.com/roadmap, aide DevEx (203314100), docs Roblox Plus ; retrait de docs/creator-hub (404).
- 04 : docs/get-started/strategies, docs/production/analytics.
- Tous les autres liens ont été ouverts (code 200, contenu confirmant le texte). `www.roblox.com/info/terms` répond 404 en requête HEAD mais 200 en GET (redirection géolocalisée vers les Terms du centre d'aide) : lien conservé.

## Désaccords avec la passe 1
- **« Toutes les autres sources existantes ont été ouvertes… (aucun lien mort) »** : faux pour `https://create.roblox.com/docs/creator-hub`, dont la page HTML renvoie 404 (seule la version `.md` existe). Remplacé.
- **Lien « earning-on-roblox »** jugé OK : il fonctionne, mais par double redirection vers `docs/monetize` ; URL mise à jour.
- **Leçon 04, « mise à jour en octobre 2026 »** laissé tel quel : le `last_updated` est commun à toutes les pages (date de génération), ce n'est pas une preuve de mise à jour du contenu.
- **Leçon 04, « de tes amis »** non relevé : contresens sur la source « friends ».
- **Leçon 03, fréquence des témoignages DevForum** (« répondent souvent », « les plus cités ») jugée OK : un seul fil de 2020 ne permet pas d'affirmer une fréquence.
- **Examen Q5** : la passe 1 a introduit « participaient à DevEx sur les douze mois clos le 30 juin 2026 », attribution de période inexacte (elle porte sur la médiane).
- **Examen Q9** : ambiguïté sur la provenance des joueurs non relevée.
- **Clarté** : la passe 1 a ajouté des chiffres (double série DevEx 2025/2026, remplacement de QPTR, double description des Creator Terms) qui alourdissaient des leçons pour débutants ; allégés ici sans perte d'exactitude.
- **Roblox Plus** absent de la liste des revenus alors que docs/monetize le liste ; ajouté.

## Erreurs restantes non corrigées
- Aucune erreur de fond connue.
- À surveiller : les Terms of Use lus sont la version « Effective Date: November 1, 2026 » (pas encore en vigueur au 24/10/2026) ; les points cités sont généraux et identiques dans l'esprit.
- Hors périmètre (signalé, non modifié) : `src/data/modules.ts` décrit le module 6 avec « Premium Payouts », programme déprécié depuis le 24/07/2025 (remplacé par Creator Rewards).
