# PLAN.md — Plan détaillé de la formation

> « Créer un jeu Roblox qui marche, de A à Z » — 11 modules, 58 leçons.
> Ce plan est la référence des rédacteurs : **slugs, titres et ordre sont figés** (ils deviennent les noms de fichiers et les URL).
> Le titre peut être légèrement reformulé dans le frontmatter ; les objectifs et notions clés sont un minimum à couvrir.
> Format de fichier, frontmatter, quiz, composants : voir [AUTHORING.md](AUTHORING.md).

## Fil rouge : l’« Obby des Nuages »

Un parcours d’obstacles (obby) dans le ciel, avec des **pièces** à collecter, des **checkpoints** et une petite **boutique de cosmétiques** (traînées / « trails »). Choisi parce qu’il est :
- simple à démarrer sans code (module 1), puis enrichi notion par notion ;
- assez riche pour couvrir checkpoints, sauvegarde, UI, sécurité, monétisation, analytics, optimisation ;
- assez petit pour être **terminé et publié** par un débutant.

Progression du fil rouge (chaque module ajoute une brique) :

| Module | Ce que l’Obby des Nuages gagne |
|---|---|
| 0 | Le cahier des charges minimal (périmètre « version 1 ») |
| 1 | Le premier niveau construit à la main (plateformes, SpawnLocation), publié en privé |
| 2 | Kill bricks, pièces qui tournent, checkpoints basiques, ModuleScript de configuration |
| 3 | Checkpoints et pièces validés côté serveur, achat en boutique via RemoteEvent sécurisé |
| 4 | Leaderstats (Étape, Pièces), sauvegarde DataStore, inventaire de trails, UI boutique, plateformes animées (TweenService), animation de victoire |
| 5 | Onboarding des 60 premières secondes, courbe de difficulté, récompenses et objectifs |
| 6 | Game Pass cosmétique, Developer Product « passer l’étape », prix et éthique |
| 7 | Page du jeu, icône, miniatures, lancement, première mise à jour |
| 8 | Entonnoir d’onboarding et de progression (AnalyticsService), lecture du Creator Dashboard |
| 9 | Version mobile soignée, streaming d’instances, chasse au lag |
| 10 | Passage de la checklist de lancement complète |

## Règles communes à tous les modules

- 4 à 6 questions de quiz par leçon (3 types possibles : `qcm`, `vrai-faux`, `trouve-le-bug`), dont **au moins un `trouve-le-bug`** dans chaque leçon qui contient du code.
- Examen de module : **10 à 15 questions**, couvrant toutes les leçons du module, seuil 70 %.
- Tout chiffre susceptible d’évoluer (commissions, taux DevEx, limites d’API, conditions d’âge, fonctionnalités du Creator Hub) doit être **sourcé** (documentation officielle de préférence), assorti d’une date `miseAJour` dans le frontmatter et formulé avec prudence (« au moment de la rédaction… »). Dans le doute, renvoyer vers la page officielle plutôt qu’avancer un chiffre.
- Aucune promesse de revenus ou de succès. Pas de « recette virale ».

---

## Module 00 — Bienvenue : comprendre Roblox avant de créer 🧭

### 01 · `bienvenue` — Bienvenue dans la formation
*(gabarit déjà présent : `module-00/01-bienvenue.mdx`, à réécrire)*
- Objectifs : comprendre l’organisation (modules, leçons, quiz, examens) ; découvrir le fil rouge ; savoir suivre sa progression.
- Notions clés : structure d’une leçon, progression locale, badges, rythme conseillé (lire → pratiquer dans Studio), prérequis matériels (Studio sur Windows/macOS).

### 02 · `roblox-pour-les-createurs` — Roblox vu du côté des créateurs
- Objectifs : distinguer joueur / créateur / plateforme ; comprendre ce qu’est une « expérience » ; connaître les grandes sources de revenus d’un créateur (sans chiffres non sourcés).
- Notions clés : expériences, Roblox Studio, Creator Hub, Robux, Marketplace vs expériences, règles communautaires et conditions d’utilisation, concurrence (très grand nombre d’expériences publiées), honnêteté sur les chances de succès.

### 03 · `mindset-du-createur` — Le mindset qui permet de finir un jeu
- Objectifs : choisir un périmètre réaliste ; adopter le cycle publier → mesurer → améliorer ; gérer motivation et échecs.
- Notions clés : MVP / « version 1 », scope creep, projets inachevés, prototypage rapide, feedback précoce, apprendre des jeux existants sans copier, régularité plutôt qu’intensité.

### 04 · `comment-les-jeux-sont-decouverts` — Comment les joueurs découvrent les jeux
- Objectifs : identifier les canaux de découverte ; comprendre le rôle des signaux d’engagement ; savoir ce qu’on contrôle (et ce qu’on ne contrôle pas).
- Notions clés : page d’accueil et recommandations personnalisées, recherche, tri/charts, publicité (annonces sponsorisées), partage social et amis, liens externes ; signaux mis en avant par Roblox dans ses communications officielles (engagement, rétention, satisfaction…) — **à sourcer précisément**, sans prétendre connaître l’algorithme ; impact de l’icône/miniature sur le taux de clic.

### 05 · `le-projet-fil-rouge` — Ton projet : l’Obby des Nuages
- Objectifs : comprendre le cahier des charges ; définir la boucle de jeu de l’obby ; planifier les étapes de construction.
- Notions clés : description du jeu, fonctionnalités v1 (niveaux, checkpoints, pièces, boutique cosmétique) vs plus tard, carte des modules ↔ fonctionnalités, critères de « terminé ».

---

## Module 01 — Roblox Studio de zéro 🛠️

### 01 · `installer-et-decouvrir-studio` — Installer Studio et découvrir l’interface
- Objectifs : installer Studio et créer un projet ; repérer les fenêtres essentielles ; personnaliser l’espace de travail.
- Notions clés : modèles de départ (Baseplate…), Explorer, Properties, Toolbox, Output, barre d’outils/onglets, navigation caméra (WASD/QE, clic droit, F pour focus), sauvegarde locale vs publication.

### 02 · `construire-avec-des-parts` — Construire avec des Parts
- Objectifs : créer et transformer des Parts ; régler les propriétés physiques de base ; construire proprement.
- Notions clés : Part, outils Move/Scale/Rotate, pas de grille (snap), Anchored, CanCollide, Transparency, Material, Color, Size/Position/Orientation, duplication, Union/Negate (aperçu), Toolbox et risques des modèles gratuits (scripts malveillants).

### 03 · `organiser-son-jeu` — Organiser son jeu : services, Models et Folders
- Objectifs : connaître le rôle des principaux services ; ranger un projet ; nommer les objets correctement.
- Notions clés : Workspace, ReplicatedStorage, ServerScriptService, ServerStorage, StarterPlayer (StarterPlayerScripts, StarterCharacterScripts), StarterGui, Lighting, Players ; Model vs Folder, PrimaryPart ; conventions de nommage ; hiérarchie parent/enfant.

### 04 · `tester-son-jeu` — Tester son jeu comme un pro
- Objectifs : utiliser les différents modes de test ; lire la fenêtre Output ; tester à plusieurs joueurs en local.
- Notions clés : Play, Play Here, Run, test client/serveur (plusieurs joueurs locaux), vue client vs vue serveur, Output et erreurs, Command Bar, émulation d’appareil (aperçu, approfondi au module 9).

### 05 · `premier-niveau-et-publication` — Construire le premier niveau et le publier
- Objectifs : construire les premiers sauts de l’Obby des Nuages ; publier une première version privée ; gérer versions et collaboration.
- Notions clés : SpawnLocation, rythme et difficulté des sauts, lisibilité visuelle, publication sur Roblox, paramètres de l’expérience (privée/publique), historique des versions, Team Create / collaboration (aperçu).

---

## Module 02 — Luau de A à Z 📜

### 01 · `premier-script` — Ton premier script
- Objectifs : distinguer Script, LocalScript et ModuleScript ; savoir où placer chaque type ; écrire et exécuter un premier script.
- Notions clés : `print`, commentaires (`--`, `--[[ ]]`), emplacements où chaque type s’exécute, `script.Parent`, `game:GetService`, lire une erreur dans l’Output.

### 02 · `variables-types-et-conditions` — Variables, types et conditions
- Objectifs : déclarer des variables locales ; manipuler les types de base ; écrire des conditions.
- Notions clés : `local`, nil/boolean/number/string, opérateurs arithmétiques et de comparaison, `..` (concaténation), `and`/`or`/`not`, `if/elseif/else`, `~=`, truthy/falsy (seuls `nil` et `false` sont faux), `typeof`. Fil rouge : kill brick (`Humanoid.Health = 0`).

### 03 · `boucles-et-fonctions` — Boucles et fonctions
- Objectifs : répéter des actions avec les boucles ; écrire des fonctions avec paramètres et retours ; comprendre la portée.
- Notions clés : `for i = a, b, pas`, `while`, `repeat…until`, `break`, `continue`, `task.wait` (et pourquoi éviter `wait`), fonctions locales, paramètres, valeurs de retour multiples, portée des variables. Fil rouge : pièce qui tourne.

### 04 · `tables` — Les tables : listes et dictionnaires
- Objectifs : créer et parcourir des tableaux ; utiliser des dictionnaires ; choisir la bonne structure.
- Notions clés : indices à partir de 1, `#`, `table.insert`, `table.remove`, `table.find`, `ipairs`/`pairs` (et itération générale), dictionnaires clé/valeur, tables imbriquées, références (copie vs même table).

### 05 · `evenements` — Réagir aux événements
- Objectifs : connecter des fonctions aux événements ; gérer joueurs et personnages ; éviter les déclenchements multiples.
- Notions clés : `:Connect`, `:Disconnect`, `:Wait()`, `Touched`, `Players.PlayerAdded`, `CharacterAdded`, debounce, `task.spawn`/`task.delay`, `WaitForChild`, attributs (`SetAttribute`/`GetAttribute`, `GetAttributeChangedSignal`). Fil rouge : checkpoints basiques.

### 06 · `modulescripts-et-poo` — ModuleScripts et programmation orientée objet
- Objectifs : structurer son code en modules réutilisables ; créer des « classes » avec les métatables ; découvrir le typage optionnel.
- Notions clés : `require`, tables retournées par un module, configuration centralisée, métatables, `__index`, constructeur `new`, méthodes et `self` (`:`), annotations de type et `--!strict` (aperçu). Fil rouge : module `Config` des niveaux.

---

## Module 03 — Client, serveur et sécurité 🛡️

### 01 · `modele-client-serveur` — Le modèle client/serveur
- Objectifs : expliquer qui exécute quoi ; comprendre la réplication ; identifier ce que le client peut modifier.
- Notions clés : serveur autoritaire, réplication serveur → clients, changements locaux non répliqués (FilteringEnabled toujours actif), exceptions (personnage, propriété réseau / network ownership de la physique), où vivent les scripts (ServerScriptService vs StarterPlayerScripts vs ReplicatedStorage).

### 02 · `remoteevents` — Communiquer avec les RemoteEvents
- Objectifs : envoyer des messages client → serveur et serveur → client ; passer des arguments ; organiser ses remotes.
- Notions clés : `FireServer`/`OnServerEvent` (le joueur est le 1er argument côté serveur), `FireClient`, `FireAllClients`, `OnClientEvent`, types transmissibles, rangement dans ReplicatedStorage, UnreliableRemoteEvent (aperçu et cas d’usage).

### 03 · `remotefunctions-et-bindables` — RemoteFunctions et BindableEvents
- Objectifs : faire une requête avec réponse ; connaître les risques des RemoteFunctions ; communiquer entre scripts d’un même côté.
- Notions clés : `InvokeServer`/`OnServerInvoke`, pourquoi éviter `InvokeClient` (client qui ne répond jamais / erreur), délais d’attente, BindableEvent/BindableFunction.

### 04 · `ne-jamais-faire-confiance-au-client` — Ne jamais faire confiance au client
- Objectifs : reconnaître les exploits courants ; valider chaque requête côté serveur ; limiter le spam de remotes.
- Notions clés : validation des types et des valeurs, vérifications de distance/position, cooldown et limitation de débit, ne jamais recevoir un prix ou une récompense du client, téléportation/vitesse (détection côté serveur et limites), journaliser sans bannir à tort.

### 05 · `securiser-l-obby` — Sécuriser l’Obby des Nuages
- Objectifs : sécuriser checkpoints et pièces ; implémenter un achat en boutique sûr ; tester ses protections.
- Notions clés : checkpoint accepté seulement s’il suit l’étape actuelle, pièce ramassée validée par le serveur (distance + debounce par joueur), RemoteEvent d’achat validé (solde, objet existant, pas déjà possédé), tests à deux clients.

---

## Module 04 — Systèmes de jeu ⚙️

### 01 · `leaderstats` — Afficher des statistiques avec les leaderstats
- Objectifs : créer des leaderstats ; mettre à jour les valeurs depuis le serveur ; choisir quoi afficher.
- Notions clés : dossier `leaderstats`, IntValue/NumberValue/StringValue, création à `PlayerAdded`, modification uniquement côté serveur. Fil rouge : Étape et Pièces.

### 02 · `datastores-fiables` — Sauvegarder sans perdre de données
- Objectifs : sauvegarder et charger les données d’un joueur ; gérer les erreurs ; éviter les pertes de données.
- Notions clés : DataStoreService, `GetAsync`, `SetAsync` vs `UpdateAsync`, `pcall` et nouvelles tentatives, limites de requêtes (à sourcer), sauvegarde à `PlayerRemoving` + `game:BindToClose`, sauvegarde périodique, accès aux API dans Studio, structure de données versionnée, verrouillage de session (notion), bibliothèques communautaires reconnues (ex. ProfileStore) présentées comme option.

### 03 · `inventaire` — Un inventaire simple et sécurisé
- Objectifs : modéliser un inventaire ; le synchroniser avec le client ; le sauvegarder.
- Notions clés : table d’objets possédés, objet équipé, serveur source de vérité, synchronisation par RemoteEvent ou attributs, catalogue d’objets dans un ModuleScript. Fil rouge : trails achetables avec les pièces.

### 04 · `interfaces-ui` — Créer des interfaces lisibles partout
- Objectifs : construire une interface avec ScreenGui ; la rendre adaptable à toutes les tailles d’écran ; la relier au jeu.
- Notions clés : ScreenGui, Frame, TextLabel, TextButton, ImageLabel, Scale vs Offset, AnchorPoint, UIListLayout/UIGridLayout, UIPadding, UIAspectRatioConstraint, UICorner, TextScaled (avec modération), zones de sécurité mobiles (aperçu), LocalScript d’interface. Fil rouge : compteur de pièces + boutique.

### 05 · `animations-r6-r15` — Animer les personnages (R6 et R15)
- Objectifs : comprendre R6 vs R15 ; créer une animation avec l’Animation Editor ; la jouer depuis un script.
- Notions clés : rigs R6/R15, réglage dans les paramètres de l’expérience, Animation Editor, publication de l’animation et ID, `Animator:LoadAnimation`, AnimationTrack (`Play`, `Stop`, `Looped`), priorités d’animation, droits sur les animations (propriétaire de l’expérience). Fil rouge : animation de victoire.

### 06 · `tweenservice` — Animer objets et interfaces avec TweenService
- Objectifs : créer des tweens ; choisir styles et directions d’easing ; animer des plateformes et des interfaces.
- Notions clés : `TweenService:Create`, `TweenInfo.new` (durée, EasingStyle, EasingDirection, répétitions, aller-retour, délai), `Play`/`Completed`, plateformes mobiles (et leur impact sur le personnage), tweens d’UI, où exécuter quoi (serveur vs client). Fil rouge : plateformes mobiles.

---

## Module 05 — Un game design qui retient les joueurs 🎯

### 01 · `core-loop` — La boucle de jeu (core loop)
- Objectifs : définir la boucle principale d’un jeu ; distinguer boucles courtes et longues ; analyser la boucle de jeux existants.
- Notions clés : action → récompense → progression, boucles secondaires (méta), exemples par genre (obby, simulateur, tycoon, jeu de rôle…), boucle de l’Obby des Nuages.

### 02 · `les-60-premieres-secondes` — Les 60 premières secondes
- Objectifs : comprendre pourquoi le début de partie est décisif ; concevoir un onboarding sans mur de texte ; mesurer ce moment (lien avec le module 8).
- Notions clés : temps avant la première action amusante, objectif clair et visible, tutoriel par la pratique, guider sans bloquer, éviter chargements et menus d’entrée, premiers succès rapides. Fil rouge : refonte du spawn et du premier saut.

### 03 · `progression-et-recompenses` — Progression, difficulté et récompenses
- Objectifs : construire une courbe de difficulté ; choisir des récompenses motivantes ; équilibrer une économie de jeu.
- Notions clés : courbe de difficulté et paliers, récompenses fixes vs variables, sources et « puits » de monnaie (sinks), inflation, objectifs à court/moyen/long terme, éviter la frustration.

### 04 · `rejouabilite` — Donner envie de revenir
- Objectifs : identifier les leviers de rejouabilité ; ajouter du social ; planifier du contenu renouvelé.
- Notions clés : variété, objectifs quotidiens/hebdomadaires (sans abus de mécaniques compulsives), jouer avec des amis, classements, collections, contenu saisonnier, notifications d’expérience (à sourcer), respect du temps du joueur.

### 05 · `tester-avec-de-vrais-joueurs` — Tester avec de vrais joueurs
- Objectifs : organiser un playtest ; observer sans influencer ; transformer les retours en décisions.
- Notions clés : playtests privés (amis, communauté), observer où les joueurs bloquent, questions ouvertes, prioriser les retours, itérer vite, tenir un journal des changements.

---

## Module 06 — Monétisation et DevEx 💎

### 01 · `economie-roblox` — Comprendre l’économie de Roblox
- Objectifs : connaître les sources de revenus d’une expérience ; comprendre le circuit des Robux ; poser les bases d’une monétisation saine.
- Notions clés : Robux, Game Passes, Developer Products, abonnements d’expérience, Premium Payouts, objets d’avatar (aperçu), part prélevée par la plateforme et délai des revenus en attente (**chiffres à sourcer**), monétisation = conséquence d’un bon jeu.

### 02 · `game-passes` — Les Game Passes
- Objectifs : créer un Game Pass ; vérifier qu’un joueur le possède ; proposer l’achat en jeu.
- Notions clés : création dans le Creator Hub, `MarketplaceService:UserOwnsGamePassAsync` (avec `pcall`), `PromptGamePassPurchase`, `PromptGamePassPurchaseFinished`, appliquer l’avantage côté serveur, mise en cache. Fil rouge : Game Pass cosmétique (trail exclusif).

### 03 · `developer-products` — Les Developer Products
- Objectifs : créer un produit achetable plusieurs fois ; traiter les achats de façon fiable ; éviter les doubles attributions ou les pertes.
- Notions clés : `PromptProductPurchase`, `MarketplaceService.ProcessReceipt` (un seul callback par expérience), `Enum.ProductPurchaseDecision.PurchaseGranted` / `NotProcessedYet`, idempotence (PurchaseId enregistré), joueur parti pendant l’achat. Fil rouge : « Passer l’étape ».

### 04 · `abonnements-et-premium-payouts` — Abonnements et Premium Payouts
- Objectifs : comprendre les abonnements d’expérience ; comprendre le principe des Premium Payouts ; savoir quand les utiliser.
- Notions clés : abonnements (création, avantages récurrents, vérification côté serveur — API à sourcer), Premium Payouts liés au temps d’engagement des abonnés Premium (principe, sans formule inventée), avantages Premium en jeu (`MembershipType`).

### 05 · `prix-et-ethique` — Fixer ses prix et monétiser éthiquement
- Objectifs : choisir des prix cohérents ; tester ses prix ; monétiser sans nuire aux joueurs (souvent mineurs).
- Notions clés : ancrage et paliers de prix, valeur perçue, tests de prix (outils officiels si disponibles, à sourcer), pay-to-win vs cosmétique, transparence, règles Roblox sur les objets aléatoires payants et la publicité (à sourcer), pas de pression ni de faux comptes à rebours.

### 06 · `devex` — DevEx : convertir ses Robux
- Objectifs : comprendre ce qu’est DevEx ; connaître les conditions d’éligibilité ; anticiper fiscalité et délais.
- Notions clés : Developer Exchange, conditions (âge, compte vérifié, seuil minimal, Robux gagnés… **toutes à sourcer sur la page officielle, avec date**), taux de change en vigueur (à sourcer, ne pas figer dans le texte sans date), obligations fiscales selon le pays (rester général, conseiller un professionnel), ordre de grandeur réaliste.

---

## Module 07 — Publication et croissance 🚀

### 01 · `preparer-la-page-du-jeu` — Préparer la page du jeu
- Objectifs : écrire un titre et une description efficaces ; configurer genre et paramètres ; remplir le questionnaire de maturité.
- Notions clés : titre clair et recherchable, description (accroche, contrôles, nouveautés), genre, appareils pris en charge, questionnaire de maturité / labels de contenu (à sourcer), règles contre les titres et visuels trompeurs.

### 02 · `icone-et-miniatures` — Icône et miniatures qui donnent envie de cliquer
- Objectifs : concevoir une icône lisible en petit ; créer des miniatures représentatives ; tester ses visuels.
- Notions clés : lisibilité à petite taille, contraste, un seul message, représenter le vrai gameplay, formats et tailles (à sourcer), outils d’expérimentation sur icônes/miniatures du Creator Hub (à sourcer), taux de clic.

### 03 · `lancer-et-publicite` — Lancer son jeu et faire de la publicité
- Objectifs : planifier un lancement progressif ; comprendre la publicité sur Roblox ; maîtriser son budget.
- Notions clés : playtest privé → lancement public, attendre d’avoir des métriques saines avant de payer de la publicité, Ads Manager / annonces sponsorisées (fonctionnement général et conditions à sourcer), petits budgets et mesure du résultat, pas de promesse de retour sur investissement.

### 04 · `mises-a-jour-et-evenements` — Mises à jour et événements
- Objectifs : établir un rythme de mises à jour ; communiquer les nouveautés ; organiser des événements.
- Notions clés : cadence réaliste, notes de mise à jour, mises à jour sans casser les sauvegardes, événements limités dans le temps, fonctionnalités officielles d’événements (à sourcer), redémarrage des serveurs (aperçu).

### 05 · `communaute` — Construire et animer une communauté
- Objectifs : choisir ses canaux communautaires ; modérer et protéger les joueurs ; écouter les retours.
- Notions clés : Communautés Roblox (anciennement « groupes » — nom à vérifier), réseaux externes et leurs limites d’âge (ex. Discord), règles de modération, sécurité des mineurs, transformer les retours en feuille de route, gérer les critiques.

---

## Module 08 — Analytics : mesurer pour progresser 📊

### 01 · `pourquoi-mesurer` — Pourquoi et quoi mesurer
- Objectifs : comprendre le rôle des données ; découvrir le Creator Dashboard ; éviter les pièges d’interprétation.
- Notions clés : Creator Dashboard / Analytics (sections à sourcer), métriques d’acquisition, d’engagement, de rétention et de monétisation, corrélation ≠ causalité, échantillons trop petits, comparer à soi-même dans le temps.

### 02 · `retention` — La rétention : D1, D7, D30
- Objectifs : définir la rétention D1/D7/D30 ; lire une courbe de rétention ; relier rétention et game design.
- Notions clés : définition (part des nouveaux joueurs revenant au jour N), cohortes, ce que révèle chaque horizon (D1 = première impression / onboarding, D7-D30 = profondeur), comparaisons proposées par Roblox (benchmarks, à sourcer), pistes d’amélioration.

### 03 · `engagement-et-sessions` — Engagement et sessions
- Objectifs : lire durée de session et temps de jeu ; comprendre DAU/MAU et joueurs simultanés ; détecter les points d’abandon.
- Notions clés : durée moyenne de session, temps de jeu par utilisateur, DAU, MAU, ratio DAU/MAU, joueurs simultanés (CCU), répartition par appareil, lien avec les 60 premières secondes.

### 04 · `monetisation-et-conversion` — Mesurer la monétisation
- Objectifs : calculer taux de conversion et revenus par utilisateur ; identifier ce qui se vend ; améliorer sans dégrader l’expérience.
- Notions clés : taux de conversion payeurs, ARPDAU, ARPPU, revenus par produit, Premium Payouts dans les statistiques, surveiller la rétention après un changement de monétisation.

### 05 · `evenements-personnalises` — Instrumenter son jeu avec AnalyticsService
- Objectifs : envoyer des événements personnalisés ; construire un entonnoir d’onboarding et de progression ; prendre une décision à partir des données.
- Notions clés : AnalyticsService (`LogOnboardingFunnelStepEvent`, `LogFunnelStepEvent`, `LogProgressionEvent`, `LogEconomyEvent`, `LogCustomEvent` — signatures et limites à sourcer), appels côté serveur, nommage cohérent des étapes. Fil rouge : entonnoir étape par étape de l’Obby des Nuages.

---

## Module 09 — Optimisation et performances ⚡

### 01 · `penser-mobile-d-abord` — Penser mobile d’abord
- Objectifs : comprendre les contraintes du mobile ; adapter interface et contrôles tactiles ; tester sur émulateur et vrai appareil.
- Notions clés : part importante de joueurs sur mobile (chiffre à sourcer ou ne pas chiffrer), boutons tactiles assez grands, zones de sécurité, texte lisible, émulateur d’appareils de Studio, test sur appareil réel, appareils modestes (mémoire, CPU).

### 02 · `mesurer-les-performances` — Mesurer les performances
- Objectifs : utiliser la Developer Console ; lire le MicroProfiler à un niveau débutant ; identifier scripts et ressources coûteux.
- Notions clés : Developer Console (F9 en jeu) : mémoire, scripts, réseau ; MicroProfiler (principe des frames) ; Script Profiler ; statistiques de rendu ; mesurer avant d’optimiser.

### 03 · `streaming-d-instances` — Le streaming d’instances
- Objectifs : comprendre le streaming ; le configurer ; adapter les scripts clients.
- Notions clés : `Workspace.StreamingEnabled`, rayons de streaming (`StreamingTargetRadius`, `StreamingMinRadius`), `ModelStreamingMode` (Atomic, Persistent…), `WaitForChild` et objets absents côté client, `RequestStreamAroundAsync` (aperçu).

### 04 · `reduire-le-lag` — Réduire le lag
- Objectifs : optimiser scripts, physique et réseau ; alléger le rendu ; prioriser les optimisations.
- Notions clés : boucles et `RunService.Heartbeat` à surveiller, déconnecter les événements, Anchored et CanCollide/CanTouch/CanQuery, nombre de Parts et MeshParts, CollisionFidelity, RenderFidelity, textures, taille et fréquence des messages réseau, effets et particules, ombres/lumières.

### 05 · `optimiser-l-obby` — Audit de performance de l’Obby des Nuages
- Objectifs : mener un audit complet ; corriger les problèmes trouvés ; vérifier le gain sur mobile.
- Notions clés : checklist d’audit (scripts, physique, réseau, rendu, mémoire, UI mobile), mesures avant/après, régressions, documentation des choix.

---

## Module 10 — Les erreurs qui tuent un jeu et la checklist de lancement ✅

### 01 · `erreurs-de-conception` — Les erreurs de conception
- Objectifs : reconnaître les erreurs de conception fréquentes ; diagnostiquer son propre projet ; corriger le tir.
- Notions clés : projet trop gros, boucle de jeu floue, début de partie trop lent, copie sans différence, difficulté mal dosée, économie déséquilibrée, monétisation agressive.

### 02 · `erreurs-techniques` — Les erreurs techniques
- Objectifs : prévenir les erreurs techniques qui font fuir ; mettre en place des garde-fous ; tester les cas limites.
- Notions clés : pertes de données, exploits par remotes non validés, modèles gratuits avec scripts malveillants, bugs non testés en multijoueur, plantages ou lag sur mobile, erreurs dans l’Output ignorées.

### 03 · `erreurs-de-lancement-et-de-suivi` — Les erreurs de lancement et de suivi
- Objectifs : éviter les erreurs de lancement ; suivre son jeu après la sortie ; savoir quand persévérer ou pivoter.
- Notions clés : lancer sans playtest, page de jeu bâclée, publicité trop tôt, ignorer les statistiques, absence de mises à jour, abandonner trop tôt ou s’acharner, critères de décision basés sur la rétention.

### 04 · `checklist-de-lancement` — La checklist de lancement
- Objectifs : vérifier un jeu de bout en bout avant publication ; appliquer la checklist à l’Obby des Nuages ; préparer le jour J.
- Notions clés : checklist gameplay, technique, sécurité, sauvegarde, mobile, monétisation, page du jeu, analytics, communauté, conformité aux règles Roblox ; plan des premiers jours.

### 05 · `et-apres` — Et maintenant ?
- Objectifs : faire le bilan de la formation ; construire un plan pour les 30 prochains jours ; savoir où continuer à apprendre.
- Notions clés : ressources officielles (documentation, forum développeurs), projets suivants, travailler en équipe, portfolio, apprentissage continu, rester réaliste et persévérant.
