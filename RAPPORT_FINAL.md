# RAPPORT FINAL — « Créer un jeu Roblox qui marche, de A à Z »

Date : 24 octobre 2026. Projet mené de bout en bout par un chef d'orchestre et des équipes de sous-agents (architecte, rédacteurs, vérificateurs, intégrateurs, testeurs QA, relecteurs), sans intervention humaine. Le suivi détaillé est dans [PROGRESS.md](PROGRESS.md), les choix dans [DECISIONS.md](DECISIONS.md), la vérification dans [VERIFICATION.md](VERIFICATION.md).

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
