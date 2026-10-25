# RAPPORT FINAL — « Créer un jeu Roblox qui marche, de A à Z »

Date : 24 octobre 2026. Projet mené de bout en bout par un chef d'orchestre et des équipes de sous-agents (architecte, rédacteurs, vérificateurs, intégrateurs, testeurs QA, relecteurs), sans intervention humaine. Le suivi détaillé est dans [PROGRESS.md](PROGRESS.md), les choix dans [DECISIONS.md](DECISIONS.md), la vérification dans [VERIFICATION.md](VERIFICATION.md).

> **Mise à jour du 25 octobre 2026 : phase IA.** La formation compte désormais **12 modules (0 à 11) et 68 leçons** : un module 02 « Scripter avec l’IA : piloter Claude Code » a été inséré et les anciens modules 02 à 10 sont devenus 03 à 11. Les sections 1 à 9 ci-dessous décrivent la phase 1 avec l’**ancienne numérotation** ; tout ce qui a changé est dans la [section 10 « Phase IA »](#10-phase-ia--scripter-avec-lia).

## 1. En bref

| | |
|---|---|
| Modules | **11** (00 à 10), du mindset à la checklist de lancement |
| Leçons | **58**, environ **111 000 mots**, **151 blocs de code Luau** commentés |
| Quiz | **304 questions** de fin de leçon + **158 questions** d'examens de module (dont **68 « trouve le bug »** en Luau) |
| Fil rouge | « l'Obby des Nuages » : un obby avec checkpoints, pièces, sauvegarde, boutique de traînées, monétisation, analytics — construit module après module |
| Corrigé final | [`projet-reference/`](projet-reference/) : le code complet du jeu (13 Scripts, 7 ModuleScripts, 12 LocalScripts, format Rojo), **0 diagnostic** à l'analyse `luau-lsp` avec les types Roblox |
| Vérification | 2 passes indépendantes par module + cohérence inter-modules + relecture finale ; ~1 300 éléments vérifiés, **268 corrigés ou reformulés**, 5 supprimés ; **aucune erreur connue non corrigée** |
| Tests | **49/49** tests unitaires (Vitest) et **120/120** tests e2e (Playwright) ; **271 liens externes** testés, 0 mort |
| Build | `npm run build` : 0 erreur, 0 avertissement (`astro check`), 83 pages HTML générées, 69 indexées par la recherche |

## 2. Ce qui a été fait

### Contenu (programme complet)

| Module | Thème | Leçons |
|---|---|---|
| 00 | Bienvenue : mindset, Roblox côté créateurs, **comment fonctionne la découverte des jeux** (signaux officiels, passage de 7 à 28 jours de juin 2026), le projet fil rouge | 5 |
| 01 | Roblox Studio de zéro : installation, interface actuelle, Parts, services, modes de test, premier niveau et publication | 5 |
| 02 | Luau de A à Z : premier script, variables/types/conditions, boucles et fonctions, tables, événements, ModuleScripts et POO (métatables, typage) | 6 |
| 03 | Client/serveur : réplication, RemoteEvents, RemoteFunctions et Bindables, **ne jamais faire confiance au client**, sécuriser l'obby | 5 |
| 04 | Systèmes de jeu : leaderstats, **DataStores fiables** (UpdateAsync, retries, BindToClose, versionnage), inventaire, UI adaptative, animations R6/R15, TweenService | 6 |
| 05 | Game design : core loop, **les 60 premières secondes**, progression et récompenses, rejouabilité, playtests | 5 |
| 06 | Monétisation : économie Roblox (70 %), Game Passes, Developer Products (`ProcessReceipt` idempotent), abonnements, **Creator Rewards** (qui remplacent les Premium Payouts depuis juillet 2025), prix et éthique, **DevEx** (taux et conditions d'octobre 2026) | 6 |
| 07 | Publication et croissance : page du jeu, maturité, Roblox Kids and Select, icône et miniatures (tests officiels), lancement et publicité (Ads Manager), mises à jour et événements, communauté | 5 |
| 08 | Analytics : pourquoi mesurer, **rétention D1/D7/D30**, sessions et engagement, conversion et revenus, AnalyticsService (entonnoirs) | 5 |
| 09 | Performances : **mobile d'abord**, outils de mesure (Developer Console, MicroProfiler), streaming d'instances, réduire le lag, audit de l'obby | 5 |
| 10 | Les erreurs qui tuent un jeu (conception, technique, lancement) + **checklist de lancement interactive** (84 cases) + suite du parcours | 5 |

Chaque leçon contient : objectifs, explications pour débutants (tutoiement), code Luau commenté avec le type et l'emplacement de chaque script, au moins un encadré **« Astuce pro »** et un **« Erreur à éviter »**, souvent un **« Défi »** pratique, un **résumé**, les **sources** officielles consultées, et un **quiz** corrigé et expliqué. Chaque module se termine par un **examen** (seuil 70 %).

### Site

- **Stack** : Astro 7 + MDX + Tailwind CSS 4, site 100 % statique, TypeScript.
- **Accueil qui vend la formation** honnêtement : bénéfices, programme des 11 modules, public visé, FAQ (chiffres officiels de Roblox sur les revenus, aucune promesse), appel à l'action.
- **Pages** : programme complet, une page par module, 58 leçons, 11 examens, page de progression, 404.
- **Quiz** : QCM (une ou plusieurs réponses), vrai/faux, « trouve le bug » (code Luau coloré et numéroté) ; correction expliquée, score, recommencer ; accessibles au clavier et annoncés aux lecteurs d'écran.
- **Progression** sauvegardée en localStorage (repli en mémoire si bloqué) : leçon terminée (bouton ou quiz ≥ 70 %), scores, examens ; **barres de progression** globale et par module ; **16 badges** (un par module + 5 globaux, dont « Formation complète ») ; réinitialisation.
- **Coloration Luau** (Shiki, langage `luau` natif, thèmes à contraste AA), **sommaire latéral** repliable sur mobile (focus piégé), **table des matières** de leçon, **recherche plein texte** (Pagefind, Ctrl+K ou « / »), **navigation précédent/suivant** y compris d'un module à l'autre, fil d'Ariane.
- **Mode sombre/clair** : suit le système, bascule mémorisée, sans flash au chargement.
- **Responsive** mobile d'abord (aucun défilement horizontal à 390 px), **accessibilité** vérifiée par axe-core (aucune violation sérieuse ou critique, clair et sombre), liens soulignés, focus visibles.
- **Checklist interactive** : les listes `- [ ]` deviennent de vraies cases cochables, mémorisées, avec compteur.
- **SEO** : titres et descriptions uniques, Open Graph, canonical, sitemap.

### Organisation du travail (agents)

1. **Architecte** : stack, structure, composants, schémas stricts, plan de 58 leçons (validé par le chef d'orchestre).
2. **11 rédacteurs en parallèle** (un par module), avec sources vérifiées et notes pour les vérificateurs.
3. **22 vérificateurs** (2 passes indépendantes par module, la seconde sans faire confiance à la première).
4. **2 intégrateurs** de cohérence inter-modules : (A) assemblage du code du fil rouge en projet de référence analysé statiquement ; (B) faits répétés, renvois, terminologie.
5. **3 relecteurs finaux** lisant comme un élève débutant.
6. **QA** : suite de tests (phase 1), correction de 7 bugs par un développeur front, recette finale exhaustive (phase 2) avec captures d'écran relues.

Un commit git a été fait après chaque étape validée (`git log` pour l'historique complet).

## 3. Lancer le site en local

Prérequis : **Node.js 24** (minimum 22.23, exigé par Astro 7) et npm.

```bash
npm install
npm run dev        # http://localhost:4321 — développement (la recherche n'y fonctionne pas)
npm run build      # vérification des types et du contenu + build statique dans dist/ + index de recherche
npm run preview    # sert dist/ sur http://localhost:4321 (recherche incluse)
```

## 4. Déployer

Le site est 100 % statique : commande de build `npm run build`, dossier publié `dist/`.

Avant le premier déploiement, indique l'URL publique (balises canoniques, Open Graph, sitemap) via la variable d'environnement **`SITE_URL`** (par défaut `https://forma-roblox.vercel.app`).

### Vercel
1. Pousse le dépôt sur GitHub/GitLab/Bitbucket.
2. Sur vercel.com : **Add New › Project**, importe le dépôt. Vercel détecte Astro automatiquement (Build Command `npm run build`, Output Directory `dist`).
3. Dans **Settings › Environment Variables**, ajoute `SITE_URL` = l'URL de production (ex. `https://ton-domaine.fr`).
4. Déploie. La version de Node est prise dans `package.json` (`engines`) ou dans **Settings › General › Node.js Version** (choisis 24).
   En ligne de commande : `npm i -g vercel` puis `vercel` (aperçu) et `vercel --prod`.

### Netlify
1. Pousse le dépôt, puis sur app.netlify.com : **Add new site › Import an existing project**.
2. Le fichier [`netlify.toml`](netlify.toml) fournit déjà la configuration (build `npm run build`, publication `dist`, Node 24, page 404).
3. Dans **Site configuration › Environment variables**, ajoute `SITE_URL`.
   En ligne de commande : `npm i -g netlify-cli`, `netlify init`, puis `netlify deploy --prod`.

### Autre hébergeur statique
`SITE_URL=https://ton-domaine.fr npm run build`, puis envoie le contenu de `dist/` (GitHub Pages, Cloudflare Pages, un simple serveur web…). La page `404.html` est à configurer comme page d'erreur.

## 5. Résultats des tests

Commandes : `npm run test:unit`, `npm run test:e2e` (sur le site déjà buildé), `npm test` (les deux). Détails : [tests/README.md](tests/README.md) et [verification/qa-recette-finale.md](verification/qa-recette-finale.md).

| Suite | Résultat |
|---|---|
| Build (`astro check` + build + Pagefind) | ✅ 0 erreur, 0 avertissement |
| Vitest — logique de progression, catalogue, schémas, texte, **données réelles des 462 questions** (bonnes réponses, doublons, explications) | ✅ **49 / 49** |
| Playwright — e2e sur `dist/` (Chromium) | ✅ **120 / 120** |

Ce que couvrent les tests e2e : toutes les pages répondent, **aucun lien interne mort** (liens et ancres) ; structure de chaque leçon (Astuce, Erreur, résumé, sources, quiz) ; **chacun des 58 quiz et des 11 examens réussis à 100 %** avec les bonnes réponses ; parcours complet → 100 % et 16/16 badges ; mauvaises réponses, recommencer, alertes ; progression persistée et réinitialisable ; navigation précédent/suivant sur toutes les leçons ; recherche ; thème (bascule, persistance, pas de flash, préférence système) ; mobile 390 px (pas de débordement, menu mobile, focus piégé) ; accessibilité axe-core clair/sombre ; navigation **100 % clavier** d'un quiz et d'un examen ; cases de la checklist ; poids des pages (toutes < 500 Ko, la plus lourde ≈ 293 Ko) ; titres/descriptions uniques, `lang="fr"`, sitemap, 404 ; aucune erreur console ; régressions visuelles corrigées.

Autres contrôles :
- **Liens externes** (`node scripts/verifier-liens-externes.mjs`) : 271 URL testées, 0 lien mort, 11 URL mises à jour vers leur adresse finale.
- **Code Luau** (`node scripts/verifier-luau.mjs`) : 219 extraits analysés par `luau-lsp` avec les types Roblox ; les diagnostics restants sont tous attendus (bugs volontaires des « trouve le bug », `require` de modules définis dans d'autres blocs).
- **Projet de référence** : `luau-lsp analyze --sourcemap` sur les 32 scripts → **0 diagnostic**.
- **Recette visuelle** : 52 captures (desktop/mobile, clair/sombre) relues ; 9 défauts corrigés.

## 6. Résumé de VERIFICATION.md

- **Méthode** : rédaction sourcée → vérification passe 1 (indépendante du rédacteur) → passe 2 (indépendante de la passe 1, désaccords consignés) → cohérence inter-modules → relecture finale. Sources : documentation officielle create.roblox.com (et son dépôt GitHub), annonces du staff sur le DevForum, centre d'aide, roblox.com/info, Newsroom, luau.org.
- **Volume** : environ 1 300 éléments vérifiés (affirmations, questions, extraits de code, sources) ; 130 corrigés, 138 reformulés, 5 supprimés.
- **Corrections les plus importantes** :
  - Premium Payouts **arrêtés le 24/07/2025** et remplacés par Creator Rewards (le plan initial les présentait comme actuels) ;
  - chiffres DevEx mis à jour (taux 0,0038 $ et taux « U.S. 18+ » 0,0054 $, seuil 30 000 Earned Robux, retenues fiscales US au 01/11/2026 ; statistiques de septembre 2026) ;
  - `ProcessReceipt` rendu réellement fiable (octroi et `PurchaseId` sauvegardés ensemble, `PurchaseGranted` seulement après écriture réussie) ;
  - `BindToClose` qui n'attendait pas toutes les sauvegardes ; `Sauvegarder` qui renvoyait `true` sans avoir écrit ; versionnage des données ;
  - course entre réapparition et checkpoint (`CharacterAdded`) ; `LoadCharacter` déprécié → `LoadCharacterAsync` ; `Player.MembershipType` et `GetProductInfo` dépréciés ;
  - découverte des jeux : signaux officiels et passage de 7 à 28 jours (juin 2026) ; Roblox Kids and Select (250 depuis le 19/08/2026) ; Server Authority (lancé le 09/07/2026) ; Device Simulator sorti de bêta (16/10/2026) ;
  - conseils de game design sans source reformulés en « choix de la formation » ou « retours de développeurs » ; statistiques non sourcées supprimées ;
  - plusieurs « trouve le bug » qui contenaient un second bug involontaire, corrigés pour n’en garder qu’un.
- **Erreurs restantes non corrigées : aucune.** Les points « à surveiller » sont des contradictions de la documentation officielle elle-même (signalées dans les leçons), des détails d'interface de Studio non testables sans Studio, et des chiffres datés d'octobre 2026.
- **Limite assumée** : aucune instance de Roblox Studio n'était connectée pendant le projet ; le code a été vérifié par analyse statique, exécution du Luau pur et raisonnement sur la documentation, pas en jeu réel.

## 7. Résumé de DECISIONS.md

26 décisions prises sans validation humaine, toutes justifiées dans [DECISIONS.md](DECISIONS.md). Les principales :
- Stack Astro 7 + MDX + Tailwind 4, Pagefind, Shiki `luau` ; TypeScript 6 (compatibilité `@astrojs/check`) ; plugins Markdown pour Sätteri (processeur par défaut d'Astro 7).
- Quiz dans le frontmatter et examens en YAML, validés par des schémas stricts au build ; seuil 70 % ; réponses présentes dans le HTML (formation gratuite et statique).
- Progression en localStorage, 16 badges ; fil rouge « Obby des Nuages » ; tutoiement ; « jeu » plutôt qu'« expérience » dans le texte courant.
- Premium Payouts traités comme historique + Creator Rewards ; Roblox Kids and Select intégré aux modules 01, 07 et 10.
- Conventions de code communes (dossiers, remotes, `leaderstats.Etape` = dernier checkpoint validé, DataStore `DonneesJoueurs_v1`).
- Rapports de vérification par module puis consolidation ; builds concurrents sérialisés par un verrou.
- Ajout d'un corrigé final `projet-reference/` ; checklist de lancement interactive ; `SITE_URL` configurable, sitemap, Open Graph.
- Leçon DataStores conservée d'un seul tenant malgré sa longueur ; recherche disponible seulement après build.

## 8. Maintenance

- **Les faits Roblox évoluent vite.** Chaque leçon qui cite des chiffres porte un champ `miseAJour` (2026-10-24) et ses sources : à revérifier régulièrement, en priorité modules 06 (DevEx, Creator Rewards), 07 (Kids and Select, publicité) et 00/04 (découverte).
- Ajouter ou modifier une leçon : [AUTHORING.md](AUTHORING.md) ; le build refuse tout frontmatter ou quiz invalide.
- Outils de vérification Luau (`scripts/verifier-luau.mjs`) : nécessitent `luau-lsp` et `globalTypes.d.luau` dans `C:/tmp/luau-tools` (téléchargeables depuis les releases de `JohnnyMorganz/luau-lsp`) — chemin à adapter dans le script sur une autre machine.
- Recommandé : faire tester le projet de référence dans un vrai Roblox Studio (Rojo ou copier-coller, voir [projet-reference/README.md](projet-reference/README.md)), seule vérification qui n'a pas pu être faite.

## 9. Arborescence utile

```
RAPPORT_FINAL.md  PROGRESS.md  DECISIONS.md  VERIFICATION.md  PLAN.md  AUTHORING.md  README.md
src/content/lecons/module-XX/NN-slug.mdx    58 leçons
src/content/examens/module-XX.yaml          11 examens
src/                                        site (pages, composants, scripts de quiz et progression)
plugins/                                    cases à cocher et tableaux (Markdown)
tests/unit, tests/e2e                       Vitest et Playwright
scripts/                                    build avec verrou, vérification Luau, liens externes, captures, consolidation
verification/                               notes des rédacteurs, 22 rapports de vérification, cohérence, relectures, recette QA
projet-reference/                           corrigé final de l'Obby des Nuages (Rojo)
docs/briefs/                                consignes données aux agents
netlify.toml  .nvmrc                        déploiement
```

## 10. Phase IA — « Scripter avec l’IA »

Date : 24-25 octobre 2026. Même organisation qu’en phase 1 (chef d’orchestre + sous-agents, sans intervention humaine). Objectif : apprendre à créer un jeu Roblox **en pilotant des IA de code, surtout Claude Code**, avec deux messages martelés partout : **plus le prompt est précis (contexte, objectif, contraintes, critères de réussite), meilleur est le résultat** ; et, honnêtement, **il faut comprendre assez le code pour relire ce que l’IA produit : on apprend à lire, diriger et vérifier**.

### 10.1 En bref

| | |
|---|---|
| Modules | **12** (0 à 11) : nouveau module **02 « Scripter avec l’IA : piloter Claude Code »**, anciens 02-10 renumérotés 03-11 |
| Leçons | **68** (+10) ; module 02 ≈ 59 000 mots (code et prompts compris) |
| Prompts prêts à copier | **97** blocs `<Prompt>` avec bouton **Copier**, dont **55** dans le module 02 et **28** dans la **bibliothèque de prompts** |
| Encadrés « Avec Claude Code » | **41** (prompt précis en 8 rubriques + « À vérifier dans le code produit ») dans les leçons techniques des modules 01 et 03 à 11 |
| Quiz | **414** questions de leçon (dont **38 « Améliore ce prompt »**, 68 « trouve le bug / trouve la faille ») + **195** questions d’examens (12 examens) |
| Mini-jeu de bout en bout | **« Lave Montante »** (système de rounds) construit prompt par prompt en leçon 02/05 ; code complet dans [`exemples/lave-montante/`](exemples/lave-montante/) |
| Vérification | 2 passes indépendantes (9 rapports) + contrôle d’exécution dans Studio + relecture « débutant total » (3 relecteurs) ; **aucune erreur connue non corrigée** |
| Tests | **58 / 58** Vitest, **154 / 154** Playwright (30 nouveaux), **367** liens externes, **0** mort |

### 10.2 Ce qui a été ajouté

**Module 02 — Scripter avec l’IA : piloter Claude Code** (badge « Pilote d’IA » 🤖) :

| # | Leçon | Contenu clé |
|---|---|---|
| 01 | Panorama des outils IA pour Roblox | Agent vs assistant ; Claude Code, Assistant de Roblox Studio (mode Plan, skills), Cursor, GitHub Copilot, OpenAI Codex, outils Google : forces, limites, **prix officiels datés** ; quand utiliser quoi ; confidentialité ; **règle d’âge** (18 ans) |
| 02 | Installer un workflow pro | Tutoriel **Windows ET Mac** pour quelqu’un qui n’a jamais ouvert un terminal : VS Code, **Git**, **Rokit**, **Rojo 7.7** (`default.project.json` de l’Obby), plugin Studio, migration (`rojo syncback`), **Script Sync** natif présenté comme alternative, **serveur MCP intégré à Studio** branché à Claude Code (`claude mcp add`, testé), **luau-lsp, selene, StyLua**, `.gitattributes` ; checklist « ton poste est prêt » |
| 03 | Claude Code de A à Z | Installation native, offres, premier lancement, `/init`, **modèle complet de CLAUDE.md pour un jeu Roblox**, mode plan, modes de permission et `settings.json`, commandes slash actuelles, skills, sous-agents, **hook StyLua + selene après chaque modification** (testé de bout en bout, Git Bash et PowerShell), `/clear` `/compact` `/context`, `/rewind` et Git |
| 04 | L’art du prompt précis | Gabarit en 8 rubriques (Contexte, Ce qui existe déjà, Objectif, Fichiers concernés, Contraintes techniques, Sécurité, Cas limites, Vérification) ; **8 exemples « mauvais → bon prompt »** (DataStore, boutique, combat, inventaire, UI, rounds, anti-exploit, classement) avec le résultat expliqué |
| 05 | Découper un gros projet | GDD → plan → tâches → une tâche par prompt → test → commit ; **Lave Montante construit en 9 prompts**, dont un raté corrigé par un prompt ciblé |
| 06 | Relire et tester le code de l’IA | Checklist de revue en 11 points, sous-agent `relecteur-roblox` (testé avec `claude -p`), `/code-review`, tests en Luau (Jest Roblox, Lune ; TestEZ archivé) |
| 07 | Déboguer avec l’IA | Lire l’Output et la pile d’appels, prompt de débogage type, méthode anti-boucle (diagnostic d’abord, une hypothèse à la fois, `git restore` / `git stash -u`, `/clear` + résumé), 3 cas réels |
| 08 | Les pièges de l’IA | API inventées et dépréciées (vérifiées sur la référence officielle), failles typiques, dépendance sans comprendre, secrets jamais dans un prompt (règles `deny`), règles de Roblox sur l’IA (dont conditions du 1er novembre 2026) |
| 09 | L’IA au-delà du code | Outils IA officiels de Roblox (maillages, textures, matériaux, modèles procéduraux, Avatar Auto Setup, traduction automatique…), icônes, miniatures, descriptions : ce qui existe vraiment et les règles |
| 10 | Bibliothèque de prompts | **28 prompts commentés** prêts à copier, un tableau « quel prompt pour quel besoin », lien direct « Prompts » dans l’en-tête |

S’y ajoute l’**examen du module 02** (18 questions, dont 4 « Améliore ce prompt » et 3 « Trouve la faille dans ce code généré par IA »).

### 10.3 Ce qui a été modifié

- **Module 03 → « Lire et comprendre Luau (pour diriger l’IA) »** : mêmes bases et même code du fil rouge, mais orienté lecture : sections « Lire ce code comme un relecteur » (12 exercices avec réponses), encadrés, quiz et examen enrichis (questions de lecture, failles, prompts).
- **Encadré « Avec Claude Code » dans chaque leçon technique** (modules 01 et 03 à 11) : le prompt précis qui fait construire exactement le système de la leçon dans le projet Rojo, et les points à vérifier ; 1 question ajoutée à chaque quiz concerné, 1 à 3 questions à chaque examen.
- **Accueil, programme, FAQ, module 00, fin du module 01** : la méthode IA mise en avant (prompt vague vs prompt précis) ; FAQ « Faut-il payer une IA ? », « L’IA va-t-elle faire mon jeu à ma place ? », « Est-ce que j’apprends quand même à coder ? ».
- **Site** : composants `<AvecClaudeCode>` et `<Prompt>` (bouton Copier accessible, repli sans presse-papiers), type de quiz `ameliore-le-prompt`, **numéros de ligne** sur les blocs Luau des leçons, lien « Prompts » (ordinateur et mobile), progression **v2 avec migration automatique** (aucun élève ne perd sa progression malgré la renumérotation), 17 badges.
- **Corrigé `projet-reference/`** : outils qualité (`rokit.toml`, `selene.toml` avec la bibliothèque `luau_recent`, `stylua.toml`, `.gitattributes`), reformaté par StyLua, `Pieces` lit `Config.VALEUR_PIECE` ; **0 diagnostic** luau-lsp, selene et StyLua.
- Documentation : [PLAN.md](PLAN.md) (plan du module 02), [AUTHORING.md](AUTHORING.md) (nouveaux composants et type de quiz), briefs des agents dans [`docs/briefs/`](docs/briefs/), décisions 27 à 42 dans [DECISIONS.md](DECISIONS.md).

### 10.4 Résultats des tests

| Contrôle | Résultat |
|---|---|
| Build (`astro check` + build + Pagefind) | ✅ 0 erreur, 0 avertissement |
| Vitest | ✅ **58 / 58** (dont migration de la progression, schéma `ameliore-le-prompt`, données des 609 questions) |
| Playwright (Chromium, sur `dist/`) | ✅ **154 / 154**, dont 30 nouveaux (`tests/e2e/phase-ia.spec.ts`) : chaque bouton Copier copie exactement le prompt (presse-papiers réel, repli, clavier), bibliothèque ≥ 20 prompts, questions « Améliore ce prompt », encadré présent dans chaque leçon contenant du Luau, migration v1 → v2, navigation renumérotée (01 → 02 → 03), mobile 390 px sans débordement, axe-core clair/sombre ; parcours complet 68 leçons + 12 examens → 100 % et 17 / 17 badges |
| Liens externes | ✅ 367 URL distinctes, **0 lien mort**, 0 redirection permanente, 16 / 16 ancres |
| Luau (`verifier-luau`, luau-lsp + types Roblox) | ✅ 301 extraits analysés sur les 12 modules ; les 45 signalés sont tous attendus (défauts volontaires des « trouve le bug / la faille », `require` de modules définis dans d’autres blocs, extraits volontairement partiels), revus un par un en passe 2 ; aucun diagnostic réel |
| Projet `exemples/lave-montante/` | ✅ `rojo build`, luau-lsp avec sourcemap 0 diagnostic, selene, StyLua, **12 tests Lune**, simulation multijoueur |
| Tutoriels (Windows, réels) | ✅ leçons 02/02 et 02/03 suivies à la lettre plusieurs fois par des agents différents ; hook et sous-agent testés avec `claude -p` ; configuration MCP ajoutée puis retirée |
| Roblox Studio (contrôle non modifiant) | ✅ 17 API utilisées par les prompts confirmées à l’exécution ([controle-studio.md](verification/phase-ia/controle-studio.md)) |

### 10.5 Vérification

Méthode et chiffres : [VERIFICATION.md](VERIFICATION.md), section « Phase IA ». Veille factuelle préalable, 2 passes indépendantes (9 rapports, plus de 1 100 éléments vérifiés selon les résumés des rapports ; 66 lignes « corrigé » et 57 « reformulé » dans leurs tableaux), 10 signalements transverses tous résolus, relecture finale « débutant total » (environ 100 corrections de forme et points de blocage levés). Corrections notables : `TeleportService:Teleport()` présenté à tort comme non déprécié ; configuration selene du tutoriel qui aurait bloqué le hook ; fins de ligne Windows qui faisaient échouer StyLua ; règle d’âge de Claude Code (**18 ans**) ; prompts réalignés sur les leçons techniques (anti-triche, inventaire, sauvegarde, classement avec `UpdateAsync`) ; second défaut caché dans des « trouve la faille » ; survivants bloqués dans l’arène de Lave Montante après une erreur.

### 10.6 Décisions principales (DECISIONS.md, n° 27 à 42)

Module IA en 02 avant « Lire et comprendre Luau » (la méthode d’abord, le détail du code ensuite) ; progression v2 migrée ; gabarit de prompt unique en 8 rubriques ; workflow Rojo + Git + Claude Code + MCP (Script Sync en alternative) ; hooks sans `jq` ; Lave Montante comme exemple de bout en bout ; **Claude Code réservé aux 18 ans et plus** (formulation commune, aucun contournement suggéré) ; usage strictement non modifiant des Studios de l’utilisateur ; « place » au masculin ; numéros de ligne sur le Luau.

### 10.7 Points restés incertains

- **Mac** : aucune étape n’a pu être exécutée sur un Mac (installation de Git, Rokit, Claude Code, commande MCP de Studio, hooks en `sh`) ; tout est vérifié sur les documentations officielles uniquement.
- **Sessions Claude Code réelles** : les 97 prompts ont été relus et vérifiés, pas exécutés un par un dans une session interactive (seuls le hook, le sous-agent relecteur et la configuration MCP l’ont été, avec `claude -p`). Le résultat d’une IA varie d’une exécution à l’autre : c’est précisément pourquoi chaque prompt est suivi de « À vérifier ».
- **Studio** : pas d’exécution en jeu multijoueur réel (Lave Montante est vérifié statiquement, par tests Lune et simulation) ; le contrôle Studio s’est limité à l’existence des API, sans modifier les places de l’utilisateur ; le format exact de la pile d’appels dans l’Output n’a pas pu être capturé (Studio fermé entre-temps). Écrans du plugin Rojo, du Quick connect MCP et libellés de menus de Studio : d’après la documentation et le code source du plugin.
- **Volatilité** : prix et offres (Claude, Cursor, Copilot, Codex, Google), version de Claude Code (2.1.310), commandes slash et état de l’Assistant de Studio datés des 24-25 octobre 2026 ; la page MCP de Roblox renvoie encore par endroits au dépôt archivé ; les nouvelles conditions d’utilisation de Roblox entrent en vigueur le 1er novembre 2026 (à relire). Leçons à revérifier en priorité : 02/01, 02/02, 02/03, 02/08, 02/09.
- **Longueur** : les leçons 02/02, 02/03 et 02/05 sont longues (75 à 90 min) ; des repères « si tu es pressé » ont été ajoutés plutôt que de couper.
- La checklist de revue (02/06) ne s’applique pleinement qu’après les modules 03 à 05 : la leçon le dit et y renvoie.
- Les examens des modules 02, 03, 05 et 09 comptent 17 ou 18 questions (au-dessus de la cible indicative de 10 à 15, sous le maximum de 30) : toutes vérifiées justes, aucune supprimée.

### 10.8 Arborescence ajoutée

```
src/content/lecons/module-02/          10 leçons « Scripter avec l’IA »
src/content/examens/module-02.yaml      examen du module 02
src/components/mdx/AvecClaudeCode.astro, Prompt.astro ; src/scripts/prompt.ts
exemples/lave-montante/                 mini-jeu de la leçon 02/05 (Rojo, tests Lune)
verification/phase-ia/                  veille, notes, 9 rapports de vérification, contrôle Studio, QA, relectures
docs/briefs/BRIEF_PHASE_IA_*.md         consignes des agents de la phase IA
tests/e2e/phase-ia.spec.ts              30 tests e2e de la phase
```
