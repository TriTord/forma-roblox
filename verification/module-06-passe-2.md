# Module 05 — passe 2 (vérificateur indépendant : contre-vérification) — 2026-10-24

> **Note (phase IA, 2026-10-24)** : ce rapport a été écrit quand ce module portait le numéro 05. Un module 02 « Scripter avec l'IA » a ensuite été inséré : dans le texte ci-dessous, les numéros de modules et les chemins suivent l'**ancienne** numérotation (ancien module N ≥ 2 = nouveau module N + 1).

## Résumé
68 affirmations ou éléments revérifiés sur 24 pages sources rouvertes le 2026-10-24 (create.roblox.com/docs, about.roblox.com, nngroup.com, deceptive.design). 57 OK, 9 corrigés ou reformulés, 0 supprimé. Quiz : 25 questions de leçon et 13 d'examen relues une à une (bonnes réponses, distracteurs, explications, numéros de ligne des 7 `trouve-le-bug`). 3 questions modifiées : leçon 3 Q4 (nouvelle configuration), leçon 5 Q3 (« 5 au plus »), examen Q9 (noms des champs alignés sur le module 2, mêmes numéros de ligne). Code : alignement complet sur `Config` du module 2 (leçon 6) et sur les scripts des modules 3 et 4, plus un conflit de nom corrigé (`Recompenses` → `RecompensesEtapes`). `verifier-luau 05` : 17 extraits, 4 avec diagnostics, tous attendus (`Unknown require` sur des extraits isolés, `ImportUnused` sur l'extrait d'intégration de 2 lignes, `FunctionUnused` sur `verifierObjectifDuJour`, à appeler depuis le script « Pieces »). Le module `Config` complet de la leçon 3 ne produit aucun diagnostic. Build `scripts/build-verrou.sh` : code 0.

Équilibre « secrets de succès » : chaque conseil reste sourcé ou signalé une seule fois comme choix de la formation. Deux conseils non sourcés sont maintenant signalés (badge « qui raconte quelque chose » : « Notre conseil » ; moment de l'opt-in : rattaché à la phrase officielle). Je n'ai pas ajouté d'autres précautions, pour garder le texte lisible.

## Détail
| Leçon | Affirmation / élément | Verdict | Source | Commentaire |
|---|---|---|---|---|
| 01 | Définition de la core loop, ses 3 sections, « repetitive, boring, and shallow », exemple RPG d'action | OK | https://create.roblox.com/docs/production/game-design/core-loops | La page ne parle pas des boucles méta, et le texte le dit |
| 01 | Conseils Retention : étapes claires et amusantes, défi équilibré, récompenses (feedback, monnaie, objets, succès) | OK | https://create.roblox.com/docs/production/analytics/retention | |
| 01 | « Imperative to provide clear feedback » ; pièces qui jaillissent (Winds of Fortune) | OK | https://create.roblox.com/docs/production/game-design/onboarding-techniques | « When an enemy is defeated, coins fly out » |
| 01 | LiveOps : fonctionnalités reliées à la core loop | OK | https://create.roblox.com/docs/production/game-design/liveops-essentials | |
| 01 | Core curriculum : pièces échangées contre de la puissance de saut | OK | https://create.roblox.com/docs/tutorials/curriculums/core | |
| 01 | Examiner la core loop dès le prototype | OK | https://create.roblox.com/docs/production/game-design/prototyping | |
| 01 | Code feedback (LocalScript, `WaitForChild`, tween, délai de sécurité) | OK | module 4 l.2 | Compatible avec `creerLeaderstats` (valeurs chargées à la création) |
| 01 | Quiz (5) dont `trouve-le-bug` ligne 11 | OK | — | Lignes 3, 5, 8 et 11 justes ; un seul bug |
| 02 | « Decide their interest… within minutes » ; 3 objectifs ; 3 moyens d'aller vite au plaisir ; moment de joie ; « shorter dialogue sequence versus a guided arrow » | OK | https://create.roblox.com/docs/production/game-design/onboarding | |
| 02 | FTUE rapides, majorité sur mobile, jeunes et interfaces chargées de texte | OK | https://create.roblox.com/docs/production/game-design/design-for-roblox | |
| 02 | 5 minutes ou moins | OK | https://create.roblox.com/docs/production/analytics/retention | |
| 02 | Définition de J1 : « pourcentage de nouveaux joueurs qui reviennent après leur première visite » | CORRIGÉ | idem | Il manquait l'horizon (« in 1 day, 7 days, and 30 days »). Nouvelle formulation : « combien de joueurs reviennent un jour après leur première visite (J7, J30 : 7 et 30 jours) » |
| 02 | 3 techniques, 10 s / 11 s, « montré une seule fois », « impossible to miss », « strongly suggest », pas de traduction | OK | https://create.roblox.com/docs/production/game-design/onboarding-techniques | |
| 02 | Entonnoir : serveur seulement, jeu publié, page Funnel du tableau de bord Analytics | OK | https://create.roblox.com/docs/production/analytics/funnel-events | |
| 02 | Experiments : moins de 1 000 DAU | OK | https://create.roblox.com/docs/production/experiments | Avertissement des « best practices », pas une exigence ; formulation juste |
| 02 | API Beam (Attachment0/1, FaceCamera, Width0/1, Color en ColorSequence) | OK | https://create.roblox.com/docs/reference/engine/classes/Beam | Rien de déprécié |
| 02 | Code faisceau et indice (`Etape = 0` au départ) | OK | module 3 l.5, module 4 l.2 | `Etape` vaut bien 0 par défaut (`donneesParDefaut`) |
| 02 | Quiz (5) dont `trouve-le-bug` ligne 8 | OK | — | Lignes 3, 5, 7 et 8 justes |
| 03 | Trop vite / trop lent ; mesurer les joueurs par niveau | OK | https://create.roblox.com/docs/production/analytics/retention | |
| 03 | Paliers « Prairie des Nuages / Ponts du Vent / Sommet de l'Orage » (20 étapes) et `Config.Zones` (`premiereEtape`/`derniereEtape`) | CORRIGÉ | module 2 l.6 | Incohérent avec le `Config` du module 2, qui définit déjà `Config.Niveaux` (`nom`, `etapeDebut`, `etapeFin` : 1-5, 6-10, 11-12). La leçon réutilise maintenant `Config.Niveaux` et ajoute seulement `piecesParEtape`, `Config.BONUS_FIN_DE_NIVEAU` (constante en MAJUSCULES comme `VALEUR_PIECE`) et `Config.recompensePourEtape`, qui réutilise `Config.obtenirNiveau`. Le module complet est affiché avec des marques `-- NOUVEAU`, et la place de `table.freeze` (astuce du module 2) est expliquée |
| 03 | Bloc Config précédent : un module complet (`local Config = {}` … `return Config`) présenté comme « ajoute ces champs » | CORRIGÉ | — | Un débutant qui l'aurait collé en entier aurait perdu `VALEUR_PIECE`, `HAUTEUR_REAPPARITION` et `obtenirNiveau`. Le bloc est maintenant le fichier complet du module 2 avec les ajouts |
| 03 | ModuleScript `Recompenses` dans ServerScriptService | CORRIGÉ | module 3 l.3 | Le module 3 crée déjà un **Script** « Recompenses » dans ServerScriptService : `WaitForChild("Recompenses")` pouvait renvoyer le Script, et `require` aurait échoué. Renommé `RecompensesEtapes`, avec la raison donnée dans le texte |
| 03 | Branchement dans le script de checkpoints | REFORMULÉ | module 3 l.5 (« Progression »), module 4 l.1 (« Checkpoints ») | Étapes numérotées : déclarer `ServerScriptService` s'il manque (absent du script du module 4), `require`, puis remplacer `etape.Value = numero`. On ne parle plus de « vérifications de distance » (absentes de la version du module 4) |
| 03 | Calcul 20 + 31 + 50 = 101 et prix 30, 120, 400 « Traînée blanche / arc-en-ciel / d'orage » | CORRIGÉ | module 4 l.3 (`Catalogue`) | Recalculé avec les niveaux du module 2 : 20 + 25 + 20 = **65**. Les prix sont ceux du vrai Catalogue du module 4 : Traînée Nuage 25, Soleil 75, Aurore 150. Moment d'achat recalculé : 105 pièces à la fin du premier parcours ; Aurore après environ 4 parcours rejoués (5 + 4 × 40 = 165) |
| 03 | Quiz Q4 « étape 12, Ponts du Vent » | CORRIGÉ | — | Devient « étape 10, dernière étape de La tempête » : 3 + 10 = 13, vérifié à la main avec la nouvelle fonction |
| 03 | Objets aléatoires payants : cotes exactes et chiffrées, bénéfice, `ArePaidRandomItemsRestricted` | OK | https://about.roblox.com/community-standards | |
| 03 | Plus de difficulté, plus de valeur | OK | https://create.roblox.com/docs/production/game-design/introduction-to-quest-design | |
| 03 | Sinks, cosmétiques à durée limitée, « imperative to have plans », surplus, monnaie d'événement « safest solution », EV ; « inflation » absent de la page | OK | https://create.roblox.com/docs/production/game-design/balance-virtual-economies | Le texte le précise déjà |
| 03 | Missions ratées → intérêt qui baisse | OK | https://create.roblox.com/docs/production/game-design/season-pass-design | |
| 03 | Quiz (5) dont `trouve-le-bug` ligne 7 | OK | — | Lignes 1, 2, 7 et 9 justes |
| 04 | Touristes / habitués, amis, invitations, jeux solo, serveurs privés | OK | https://create.roblox.com/docs/production/game-design/design-for-roblox | |
| 04 | J1 / J7 / J30 et exemples sociaux | OK | https://create.roblox.com/docs/production/analytics/retention | « trading, parties, guilds, and competitive systems » |
| 04 | Quotidiennes, quêtes et variété | OK | https://create.roblox.com/docs/production/game-design/introduction-to-quest-design | |
| 04 | Intégration de `verifierObjectifDuJour` dans le script « Pieces » | CORRIGÉ | module 3 l.5 | Placement précisé : au-dessus de `preparerPiece` (sinon la fonction locale n'est pas visible), avec l'appel `verifierObjectifDuJour(player, pieces)` juste après `pieces.Value += VALEUR_PIECE` ; `ServerScriptService` y est déjà déclaré |
| 04 | `ObjectifsQuotidiens` sur la table `DonneesJoueurs.Obtenir` | OK | module 4 l.2 | La table de session est sauvegardée en entier par `UpdateAsync` : les nouveaux champs sont bien persistés |
| 04 | `DERNIERE_ETAPE = Config.Zones[#Config.Zones].derniereEtape` | CORRIGÉ | module 2 l.6 | `Config.Niveaux[#Config.Niveaux].etapeFin` (aurait levé une erreur, `Config.Zones` étant nil avec le Config du module 2) |
| 04 | Badges : 5 gratuits / 24 h (GMT) / jeu, puis 100 Robux ; `AwardBadgeAsync` en pcall ; `AwardBadge` dépréciée | OK | https://create.roblox.com/docs/production/publishing/badges ; https://create.roblox.com/docs/reference/engine/classes/BadgeService | |
| 04 | Astuce « un badge doit raconter quelque chose » | REFORMULÉ | — | Présentée comme « Notre conseil » (non sourcée). Exemple « Sommet de l'Orage » remplacé par « Sommet » |
| 04 | `SocialService` (invites) | OK | https://create.roblox.com/docs/production/promotion/invite-prompts | |
| 04 | LiveOps, rythme « deux semaines à un mois », 2 à 4 semaines et 2 à 3 mois | OK | https://create.roblox.com/docs/production/game-design/content-updates ; retention | |
| 04 | Notifications : 13 ans et plus, moins de 13 ans = mises à jour seulement, 100 visites, modération, permission, 1 par jour, limite globale, prompt standard, 30 jours, 99 caractères, dark patterns, pas d'obligation, package Open Cloud | OK | https://create.roblox.com/docs/production/promotion/experience-notifications | |
| 04 | « Le bon moment pour demander… » | REFORMULÉ | idem | Rattaché à la phrase officielle (« any suitable context… that warrants a future notification ») |
| 04 | `CanPromptOptInAsync` / `PromptOptIn` depuis un LocalScript, en pcall | OK | https://create.roblox.com/docs/reference/engine/classes/ExperienceNotificationService | Conforme à l'exemple officiel |
| 04 | Community Standards (contenu trompeur) ; deceptive.design (fake urgency, scarcity, confirmshaming, ex-darkpatterns.org) | OK | https://about.roblox.com/community-standards ; https://deceptive.design/types | |
| 04 | Quiz (5) dont `trouve-le-bug` ligne 4 | OK | — | Lignes 1, 4, 7 et 9 justes |
| 05 | Prototypage (défauts, partage hors équipe, itération, 4 points) | OK | https://create.roblox.com/docs/production/game-design/prototyping | |
| 05 | Accès par défaut, 10 amis d'âge proche, File > Invite early testers, vérification d'âge, moins de 16 ans, filigrane | OK | https://create.roblox.com/docs/production/publishing/publish-experiences-and-places | Daté |
| 05 | Developer Console (F9), sortie serveur réservée au propriétaire et aux membres avec droits d'édition | OK | https://create.roblox.com/docs/studio/developer-console | |
| 05 | Think aloud : Nielsen, 2012, « #1 », 3 étapes, interventions | OK | https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/ | |
| 05 | 5 utilisateurs au plus ; réserve « enfants et adultes » | CORRIGÉ | https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/ | L'exemple de Nielsen est « children and parents » : texte ajusté |
| 05 | Quiz Q3 « tests d'environ 5 personnes » | CORRIGÉ | idem | « de 5 personnes au plus » (« no more than 5 users ») |
| 05 | Raison derrière les suggestions ; priorisation des bugs | OK | https://create.roblox.com/docs/production/game-design/liveops-essentials | |
| 05 | Script de playtest (Script serveur, `CharacterAdded`, joueurs déjà présents) | OK | — | Fonctionne aussi quand les leaderstats arrivent après le chargement du DataStore (`WaitForChild`) |
| 05 | Quiz (5) dont `trouve-le-bug` ligne 8 | OK | — | Lignes 3, 4, 8 et 10 justes |
| Examen | 13 questions | OK après correction | — | Q9 : `Zone1`/`premiereEtape`/`derniereEtape` → `Niveau1`/`etapeDebut`/`etapeFin` (cohérence avec le module 2), mêmes lignes (5, 9, 10, 1), un seul bug. Q5 : lignes 5, 7, 8 et 9 justes |

## Désaccords avec la passe 1
- **Cohérence avec le module 2** : la passe 1 avait laissé `Config.Zones` « à harmoniser » parce que la leçon 2.6 n'existait pas encore. Elle existe maintenant et définit `Config.Niveaux` avec d'autres noms de champs et d'autres bornes (12 étapes). Tout le module 05 a été réaligné (leçons 3 et 4, quiz, examen).
- **Conflit de nom `Recompenses`** : non détecté en passe 1. Le Script « Recompenses » du module 3 (leçon 3) rendait le `require` fragile.
- **Prix de la boutique** : la passe 1 a validé des prix (30 / 120 / 400) et des objets (« Traînée blanche »…) qui n'existent pas dans le `Catalogue` du module 4 (Nuage 25, Soleil 75, Aurore 150). Corrigé.
- **Bloc Config présenté comme « ajoute ces champs » mais écrit comme un module complet** : jugé OK en passe 1 ; dangereux pour un débutant, donc corrigé.
- **Définition de J1** : validée en passe 1 sans l'horizon d'un jour. Corrigée.
- **Placement de `verifierObjectifDuJour`** : la passe 1 indiquait où l'appeler, mais pas où la définir (au-dessus de `preparerPiece`). Précisé.

## Erreurs restantes non corrigées
Aucune. À surveiller, sans que ce soit une erreur :
- Les chiffres datés (testeurs invités, badges, notifications, seuil des Experiments) changent souvent ; ils sont formulés « au moment de la rédaction (octobre 2026) ».
- Si le module 2 (leçon 6) ou le Catalogue du module 4 change de noms de champs, de bornes d'étapes ou de prix, il faudra refaire le calcul de la leçon 3 (65 pièces de bonus, prix 25 / 75 / 150), la question 4 de la leçon 3 et la question 9 de l'examen.
- Le code n'a pas pu être exécuté dans Studio (aucune instance connectée au MCP Roblox Studio). Sa logique a été vérifiée à la main (`recompensePourEtape` pour les étapes 1 à 13, calendrier d'achat), en plus de l'analyse statique.
