# Brief commun — Phase IA (rédacteurs et adaptateurs)

Projet : site de formation en français « Créer un jeu Roblox qui marche, de A à Z » (Astro 7 + MDX), dossier `C:\Users\t9lev\Documents\Forma Roblox`. Date du jour : **2026-10-24**.
Tu travailles en autonomie totale : personne ne répondra à tes questions. Quand tu hésites, prends la décision la plus raisonnable et note-la dans ton fichier de notes. **Ne fais PAS de commit git.** D'autres agents écrivent d'autres fichiers EN MÊME TEMPS dans le même dossier : ne touche qu'aux fichiers qui te sont attribués.

## La phase IA en deux phrases
En 2026, on n'écrit plus tout son code à la main : la formation apprend à créer un jeu Roblox **en pilotant des IA de code, surtout Claude Code**. Un nouveau module **02 « Scripter avec l'IA : piloter Claude Code »** a été inséré après le module 01 ; les anciens modules 02 à 10 sont devenus **03 à 11** (déjà fait : fichiers, URL et renvois « module N » sont renumérotés).

Messages à faire passer **partout** :
1. **Plus le prompt est PRÉCIS (contexte, objectif, contraintes, critères de réussite), meilleur est le résultat. Un prompt vague donne du code vague.**
2. **Message honnête** : il faut comprendre assez le code pour relire ce que l'IA produit (sécurité, bugs, performances). On n'apprend plus à tout taper : on apprend à **LIRE, DIRIGER et VÉRIFIER**.

## À lire d'abord (obligatoire)
1. `AUTHORING.md` : format exact (frontmatter, quiz, composants, pièges MDX/YAML). Règle absolue. Il documente les **nouveautés** : composants `<AvecClaudeCode>` et `<Prompt>`, type de quiz `ameliore-le-prompt`.
2. `PLAN.md` : le fil rouge (Obby des Nuages), les règles communes, la section **Module 02** (plan figé : slugs, ordre, notions), et les modules voisins.
3. Une leçon existante pour le ton et la structure : `src/content/lecons/module-04/02-remoteevents.mdx`.
4. Les fiches de veille (faits actuels avec sources, à **revérifier** pour ce que tu cites) : `verification/phase-ia/veille-claude-code.md` et `verification/phase-ia/veille-roblox-ia.md` (si présente). Lis surtout leur section « Non confirmé / changé récemment / à ne pas affirmer ».
5. Le corrigé du fil rouge au format Rojo : `projet-reference/` (`default.project.json`, `src/…`, `README.md`).

## Conventions communes à TOUTE la phase IA (cohérence entre agents)

### Le projet de l'élève
- L'Obby des Nuages devient un **projet Rojo** versionné avec Git, ouvert dans un terminal où tourne Claude Code. Arborescence = celle de `projet-reference/` :
  - `default.project.json`
  - `src/ServerScriptService/` (Scripts `Nom.server.luau`, ModuleScripts serveur `Nom.luau`)
  - `src/ReplicatedStorage/Modules/` (ModuleScripts partagés `Config.luau`, `Catalogue.luau`)
  - `ReplicatedStorage.Remotes` (Folder de RemoteEvents, déclarés dans `default.project.json`)
  - `src/StarterPlayer/StarterPlayerScripts/` et `src/StarterPlayer/StarterCharacterScripts/` (LocalScripts `Nom.client.luau`)
  - `src/StarterGui/InterfaceObby/` (ScreenGui et ses LocalScripts)
- Le fichier **`CLAUDE.md`** du projet (modèle complet donné dans la leçon 02/03) contient : architecture des dossiers, services, conventions de nommage (identifiants en français sans accents, PascalCase pour les scripts et instances, camelCase pour les variables), règles de sécurité serveur (le serveur valide tout, le client ne fait que demander), « toujours `task.wait`, jamais `wait` », `pcall` autour des DataStores et de MarketplaceService, nettoyage des connexions, commandes de vérification (`selene src`, `stylua --check src`). Les autres leçons y **renvoient** (« ton CLAUDE.md précise déjà… ») au lieu de tout répéter dans chaque prompt.
- Conventions de code inchangées (voir `docs/briefs/BRIEF_REDACTEUR.md`, section « Conventions du fil rouge ») : `Workspace.Checkpoints` (Parts `"1"`, `"2"`…), `Workspace.KillBricks`, `Workspace.Pieces`, `ReplicatedStorage.Remotes`, `ReplicatedStorage.Modules` (`Config`, `Catalogue`), leaderstats `Etape` et `Pieces`, DataStore `"DonneesJoueurs_v1"`, clé `"Joueur_" .. player.UserId`.

### La structure d'un prompt précis (titres à réutiliser tels quels)
Tous les prompts « complets » de la formation suivent ce gabarit, en français, dans un bloc ` ```text ` (on peut omettre une rubrique sans objet, jamais « Objectif » ni « Vérification ») :

```text
Contexte : (le jeu, la partie du jeu concernée, ce que fait déjà le projet)
Ce qui existe déjà : (scripts, modules, remotes, instances à réutiliser — avec leurs chemins)
Objectif : (le résultat exact attendu, du point de vue du joueur)
Fichiers concernés : (fichiers à créer / modifier ; « ne modifie rien d'autre »)
Contraintes techniques : (type de script et emplacement, API à utiliser ou à éviter, style)
Sécurité : (ce que le serveur doit valider, ce qui ne doit jamais venir du client)
Cas limites : (joueur qui part, valeurs invalides, double clic, panne du DataStore…)
Vérification : (comment prouver que ça marche : test dans Studio, messages attendus dans l'Output, selene/StyLua sans erreur)
```

Pour les gros changements, le prompt commence par « Commence par me proposer un plan (mode plan), sans modifier de fichier. » ou l'élève active le mode plan.

### L'encadré « Avec Claude Code » (leçons techniques existantes)
Format exact (lignes vides obligatoires autour du contenu, voir AUTHORING §5) :

````mdx
<AvecClaudeCode>

Une ou deux phrases : ce que tu vas demander et pourquoi le prompt est précis.

<Prompt titre="Nom court du système">

```text
Contexte : …
…
Vérification : …
```

</Prompt>

**À vérifier dans le code produit :**

- point de contrôle concret 1 (ex. « le serveur recalcule le prix depuis `Catalogue`, il ne lit jamais un prix envoyé par le client ») ;
- point 2 ;
- point 3 (3 à 6 puces, concrètes, liées à la leçon).

</AvecClaudeCode>
````

- Le prompt doit permettre à Claude Code de construire **le système enseigné dans la leçon**, avec exactement les noms, emplacements et règles de la leçon (pas une variante).
- Les puces « À vérifier » renvoient aux notions de la leçon (le lecteur doit pouvoir les contrôler grâce à ce qu'il vient d'apprendre).
- N'utilise **pas** de cases `- [ ]` dans l'encadré (elles deviendraient des cases interactives) : liste à puces simple.

### Composant `<Prompt>` hors encadré
Utilisable partout (leçons du module 02, bibliothèque) : un bloc ` ```text ` dedans, éventuellement un court commentaire après le bloc. Le bouton « Copier » copie le texte du bloc.

## Vérité des informations (CRITIQUE)
- Les outils d'IA changent **très vite**. Toute commande, option, raccourci, prix, fonctionnalité ou nom de menu que tu cites doit être confirmé **aujourd'hui** sur une source officielle : code.claude.com/docs et docs.claude.com (Claude Code), github.com/anthropics/claude-code (CHANGELOG), create.roblox.com/docs, devforum.roblox.com (annonces du staff), github.com/rojo-rbx/rojo et rojo.space, github.com/Roblox/studio-rust-mcp-server, github.com/JohnnyMorganz/luau-lsp, github.com/JohnnyMorganz/StyLua, github.com/Kampfkarren/selene, github.com/rokit-rs/rokit, sites officiels des autres outils. Sinon : ne l'écris pas.
- Outils installés sur cette machine, utilisables pour **tester réellement** ce que tu enseignes (dans un dossier de test sous `C:\tmp\phase-ia-<ton-nom>\`, jamais dans le dépôt) : `claude` (Claude Code 2.1.310 : `claude --help`, `claude mcp --help`, etc. ; ne lance PAS de session interactive), `rojo` 7.7.0-rc.1 et `rokit` 1.2.0 (dans `~/.rokit/bin`), `git`. `selene` et `stylua` s'installent par projet avec `rokit add` (réseau disponible). `jq` n'est PAS installé sous Windows : n'écris pas de hook Windows qui en dépend sans le dire.
- Chiffres et prix : « au moment de la rédaction (octobre 2026) » + source + `miseAJour: 2026-10-24` dans le frontmatter. Dans le doute, renvoie vers la page officielle.
- Aucune promesse de revenus ; aucune statistique inventée sur « l'IA fait gagner X % de temps ».
- Le site s'adresse à des **débutants complets (12-16 ans comme adultes)** qui n'ont **jamais** utilisé d'IA de code ni de terminal : chaque étape doit être faisable sans aide extérieure (où cliquer, quoi taper, à quoi doit ressembler le résultat, que faire si ça échoue). Windows ET Mac à chaque fois que les étapes diffèrent.
- Sécurité des mineurs et des comptes : ne jamais coller de mot de passe, cookie `.ROBLOSECURITY`, clé d'API ou secret dans un prompt ; prudence avec les permissions larges ; un adulte doit être impliqué pour un abonnement payant.
- `<Sources>` : uniquement des liens réels que tu as consultés.

## Code Luau (si ta leçon en contient)
Mêmes règles que la phase 1 (`docs/briefs/BRIEF_REDACTEUR.md`, section « Code Luau ») : Luau moderne, `task.wait`, `pcall`, type et emplacement de chaque script indiqués, code complet. Vérifie avec `node scripts/verifier-luau.mjs 02` (ou le numéro de ton module) : luau-lsp avec les types Roblox. Les `trouve-le-bug` (« Trouve la faille dans ce code généré par IA ») contiennent volontairement UN défaut.

## Quiz
- 4 à 6 questions par leçon (8 maximum). Pour le module 02 : chaque leçon contient au moins un `ameliore-le-prompt` OU un `trouve-le-bug` « Trouve la faille dans ce code généré par IA », quand c'est pertinent.
- Explications qui disent POURQUOI. Une seule bonne réponse pour `trouve-le-bug` et `ameliore-le-prompt`. Les mauvaises options sont plausibles.

## Vérifier ton travail
- Build (verrou partagé) : `bash scripts/build-verrou.sh`. Il doit passer pour TES fichiers ; si l'erreur vient du fichier d'un autre agent, relance plus tard.
- Relis chaque fichier en entier avant de terminer.

## Notes pour les vérificateurs (obligatoire)
Écris `verification/phase-ia/notes-<ton-identifiant>.md` : pour chaque affirmation factuelle importante (commande, option, prix, fonctionnalité, API), la source consultée ; ce que tu as **testé réellement** sur la machine (commande + résultat) ; les points incertains ; tes décisions.

## Réponse finale (COURTE, ≤ 15 lignes)
Fichiers créés/modifiés, nombre de questions, statut du build pour tes fichiers, résultat de `verifier-luau` s'il y a du code, points incertains, besoins techniques. N'inclus pas le contenu des leçons.

## Âge minimal (décision 38, OBLIGATOIRE partout)
Les conditions d'utilisation grand public d'Anthropic (https://www.anthropic.com/legal/consumer-terms, section 2, version du 8 octobre 2025) exigent **18 ans minimum**, sans clause de supervision parentale. Formulation commune : « Claude Code est réservé aux personnes de 18 ans et plus (conditions d'utilisation d'Anthropic, octobre 2026). Si tu as moins de 18 ans, ne crée pas de compte et n'utilise pas seul celui d'un parent. Tu peux : travailler avec un adulte (parent, enseignant) qui utilise Claude Code avec son propre compte ; utiliser l'Assistant intégré à Roblox Studio, soumis aux règles de Roblox ; ou suivre la formation en lisant et en tapant toi-même — les prompts et la méthode de relecture restent utiles. » N'écris jamais qu'un mineur peut utiliser Claude Code avec l'accord d'un parent.
