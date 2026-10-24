# Brief commun des RÉDACTEURS

Projet : site de formation en français « Créer un jeu Roblox qui marche, de A à Z » (Astro + MDX).
Dossier : `C:\Users\t9lev\Documents\Forma Roblox`. Date du jour : 2026-10-24.
Tu travailles en autonomie totale (personne ne répondra à tes questions). Ne fais PAS de commit git.
D'autres rédacteurs écrivent les autres modules EN MÊME TEMPS dans le même dossier.

## À lire d'abord
1. `AUTHORING.md` (format exact : frontmatter, quiz, examens, composants, pièges MDX/YAML) — règle absolue.
2. `PLAN.md` : le fil rouge (Obby des Nuages), les règles communes, TA section de module, et un coup d'œil aux modules voisins (avant/après) pour la continuité (ne réexplique pas en détail ce qu'un autre module couvre : renvoie-y en une phrase, ex. « on verra ça au module 4 »).
3. La leçon gabarit `src/content/lecons/module-00/01-bienvenue.mdx` et l'examen `src/content/examens/module-00.yaml`.

## Ce que tu produis
- Toutes les leçons de ton module (slugs, ordre et numéros EXACTS de PLAN.md) : `src/content/lecons/module-XX/NN-slug.mdx`.
- L'examen du module : `src/content/examens/module-XX.yaml` (10 à 15 questions couvrant toutes les leçons, mélange des 3 types, dont des `trouve-le-bug` si le module contient du code).
- Un fichier de notes pour les vérificateurs : `verification/module-XX-notes-redacteur.md` : liste des affirmations factuelles importantes / chiffres / noms d'API avec la source utilisée pour chacune, et les points dont tu n'es pas sûr.
- Ne modifie AUCUN autre fichier (ni code, ni autres modules, ni PLAN/AUTHORING). Besoin technique → signale-le dans ta réponse finale.

## Exigences de contenu
- Chaque leçon : intro + objectifs (frontmatter) → explications claires pour débutant → code Luau commenté (si pertinent) → au moins une `<Astuce>` (« Astuce pro ») et au moins une `<Erreur>` (« Erreur à éviter ») → `<Resume>` → `<Sources>` en bas. Utilise `<Defi>` pour un exercice pratique quand c'est utile.
- Longueur : leçons substantielles (environ 1 000 à 2 500 mots hors quiz), avec titres `##`/`###` pour la table des matières. Français impeccable, tutoiement, ton chaleureux et précis, phrases courtes. Termes Roblox en anglais tels qu'ils apparaissent dans Studio (Explorer, Properties, ServerScriptService…), expliqués en français la première fois.
- Quiz : 4 à 6 questions par leçon, explications qui disent POURQUOI ; au moins un `trouve-le-bug` dans chaque leçon qui contient du code ; une seule faute dans chaque `trouve-le-bug`, ligne indiquée correctement (les numéros de ligne affichés commencent à 1 sur la première ligne du bloc `code`). Évite les questions pièges sur des détails sans intérêt.

## Vérité des informations (CRITIQUE)
- Chaque affirmation factuelle sur Roblox (API, comportement, limites, chiffres, commissions, DevEx, règles, fonctionnalités du Creator Hub/Dashboard) doit être vérifiée MAINTENANT sur une source officielle et récente : create.roblox.com/docs (doc et référence API), devforum.roblox.com (annonces officielles du staff Roblox), en.help.roblox.com, about.roblox.com / corp.roblox.com, roblox.com/info (ex. conditions DevEx), rapports officiels. Utilise WebSearch / WebFetch. Les fonctionnalités Roblox évoluent vite : privilégie les pages les plus récentes et vérifie qu'une API n'est pas dépréciée.
- Si tu ne peux pas vérifier une info : ne l'écris pas, ou formule-la honnêtement (« selon des retours de développeurs sur le DevForum… » avec le lien du fil).
- Chiffres qui évoluent : toujours avec « au moment de la rédaction (octobre 2026) » + source + champ `miseAJour: 2026-10-24` dans le frontmatter. Dans le doute, renvoie vers la page officielle plutôt que d'avancer un chiffre.
- AUCUN « secret de succès » inventé, aucune promesse de revenus ou de viralité. Chaque conseil s'appuie sur une source, des données Roblox, ou est présenté comme un retour d'expérience de développeurs.
- `<Sources>` : liens réels que tu as effectivement consultés (pas de lien inventé, pas d'URL devinée), avec un libellé clair.

## Code Luau
- Luau moderne et idiomatique : `game:GetService(...)`, `task.wait`/`task.spawn`/`task.delay` (jamais `wait`/`spawn`/`delay`), `:Connect` (jamais `:connect`), `Animator:LoadAnimation` (pas `Humanoid:LoadAnimation`), `FindFirstChildOfClass("Humanoid")`, `pcall` autour des appels réseau/DataStore/MarketplaceService, pas d'API dépréciée.
- Indique toujours en commentaire ou dans le texte le TYPE de script (Script / LocalScript / ModuleScript) et OÙ le placer.
- Code complet et correct (pas de pseudo-code présenté comme du vrai code). Vérifie-le avec l'analyseur statique : `node scripts/verifier-luau.mjs XX` (luau-lsp + types Roblox). Les extraits `trouve-le-bug` contiennent volontairement un bug ; pour le reste, corrige tout diagnostic réel (un `UnknownGlobal` sur un extrait volontairement partiel peut être acceptable, mais préfère des extraits autonomes).
- Conventions du fil rouge (Obby des Nuages) à respecter pour la cohérence entre modules :
  - `Workspace.Checkpoints` (Folder) contenant des Parts nommées `"1"`, `"2"`, `"3"`… (numéro d'étape) ; `Workspace.KillBricks` (Folder) ; `Workspace.Pieces` (Folder) contenant des Parts `Piece`.
  - `ReplicatedStorage.Remotes` (Folder) pour tous les RemoteEvents/RemoteFunctions (ex. `AcheterObjet`, `EquiperObjet`).
  - `ReplicatedStorage.Modules` (Folder) : ModuleScripts partagés, ex. `Config` (réglages du jeu) et `Catalogue` (objets de la boutique).
  - leaderstats : `IntValue` `Etape` et `IntValue` `Pieces` (sans accents dans les noms d'instances ; les libellés affichés à l'écran peuvent avoir des accents).
  - DataStore : `DataStoreService:GetDataStore("DonneesJoueurs_v1")`, clé `"Joueur_" .. player.UserId`.
  - Noms de variables et commentaires en français (sans accents dans les identifiants), sauf noms d'API Roblox.

## Vérifier ton travail
- Build (avec verrou, car d'autres agents buildent aussi) : `bash scripts/build-verrou.sh`. Il doit finir sans erreur pour TES fichiers. Si une erreur concerne le fichier d'un autre module, ignore-la (un autre rédacteur est en train d'écrire) et relance plus tard pour confirmer que tes fichiers passent.
- Relis chaque leçon une fois en entier avant de terminer.

## Réponse finale (COURTE, ≤ 15 lignes)
Fichiers créés, nombre de questions (par leçon + examen), statut du build pour tes fichiers, résultat de `verifier-luau`, et les points incertains ou besoins techniques. N'inclus PAS le contenu des leçons.
