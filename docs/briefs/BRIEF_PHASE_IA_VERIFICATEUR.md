# Brief commun — Phase IA (vérificateurs)

Projet : site de formation en français « Créer un jeu Roblox qui marche, de A à Z » (Astro 7 + MDX), dossier `C:\Users\t9lev\Documents\Forma Roblox`. Date du jour : **2026-10-24**.
Tu es **indépendant des rédacteurs** (et, en passe 2, du vérificateur de la passe 1) : tu ne leur fais pas confiance, tu vérifies tout toi-même. Autonomie totale, aucune question. **Ne fais PAS de commit git.** D'autres agents travaillent en même temps : ne touche QU'AUX fichiers de ta mission.

## Contexte
La phase IA ajoute le module **02 « Scripter avec l'IA : piloter Claude Code »** (10 leçons + examen) et un encadré `<AvecClaudeCode>` (prompt précis + points à vérifier) dans les leçons techniques des autres modules. Lis `docs/briefs/BRIEF_PHASE_IA_REDACTEUR.md` (conventions communes : gabarit de prompt en 8 rubriques, format des encadrés, projet Rojo de l'Obby des Nuages), `AUTHORING.md` (format, dont le type de quiz `ameliore-le-prompt`) et la section Module 02 de `PLAN.md`.
Notes des rédacteurs (aide, PAS une preuve) : `verification/phase-ia/notes-*.md`. Fiches de veille (aide, à revérifier) : `verification/phase-ia/veille-*.md`.

## Règles de vérité (les outils d'IA changent vite)
- **Chaque commande, option, raccourci, nom de menu, fichier de configuration, prix, offre, fonctionnalité** cité doit être confirmé comme **existant aujourd'hui** sur une source officielle et récente, sinon **corrigé ou supprimé**. Sources acceptées : code.claude.com/docs, docs.claude.com / platform.claude.com, github.com/anthropics/claude-code (README, CHANGELOG.md), claude.com/pricing, anthropic.com ; create.roblox.com/docs (et github.com/Roblox/creator-docs), annonces du staff sur devforum.roblox.com, en.help.roblox.com, github.com/Roblox (dépôts officiels) ; github.com/rojo-rbx/rojo, rojo.space/docs, github.com/rojo-rbx/rokit ; github.com/JohnnyMorganz/luau-lsp, github.com/JohnnyMorganz/StyLua, github.com/Kampfkarren/selene ; dépôts officiels des frameworks de test ; sites et pages de prix officiels des autres outils (Cursor, GitHub Copilot, OpenAI, Google…). Utilise WebFetch / WebSearch.
- **Teste réellement** ce qui peut l'être sur cette machine (Windows 11), dans un dossier `C:\tmp\phase-ia-<ton-id>\` (jamais dans le dépôt) : `claude --version`, `claude --help`, `claude mcp --help`, `claude mcp add --help` (Claude Code 2.1.310 ; ne lance pas de session interactive et retire toute configuration de test), `rojo` (7.7.0-rc.1) et `rokit` (1.2.0) dans `~/.rokit/bin`, `rokit add` de selene / StyLua, `git`. Vérifie la validité JSON des `settings.json` et des hooks proposés, et que la commande d'un hook s'exécute. `jq` n'est pas installé sous Windows.
- Pour Mac : vérifie sur la documentation officielle (pas de test possible) ; signale-le dans le rapport.
- Chiffres et prix : « au moment de la rédaction (octobre 2026) » + source + `miseAJour: 2026-10-24`.
- Le public est **débutant total en IA de code** : signale (et corrige si c'est simple) toute étape impossible à suivre sans aide (commande non expliquée, résultat attendu absent, différence Windows/Mac oubliée).
- `<Sources>` en bas de CHAQUE leçon : uniquement des liens réels que tu as ouverts et qui confirment le contenu. Retire les liens morts ou hors sujet, ajoute ceux qui manquent.

## Prompts (cœur de la phase)
- Chaque prompt doit être **cohérent avec la leçon** (mêmes noms de scripts, remotes, modules, emplacements Rojo, règles de sécurité et de fiabilité) et avec les conventions du fil rouge ; il ne doit **jamais** demander quelque chose de faux, dangereux ou déprécié (ex. `wait`, prix envoyé par le client, `SetAsync` pour une valeur qui dépend de l'ancienne, absence de `pcall`).
- Les API Roblox citées dans les prompts et les puces « À vérifier » existent et ne sont pas dépréciées (référence create.roblox.com/docs).
- Les exemples « mauvais → bon prompt » sont honnêtes : la description du résultat d'un mauvais prompt reste plausible et sans statistique inventée.

## Quiz et examens
- Chaque question : bonne réponse réellement correcte, options fausses réellement fausses, pas d'ambiguïté, explication juste.
- `trouve-le-bug` : exactement UN défaut, celui désigné ; numéros de ligne exacts (ligne 1 = première ligne du bloc `code`) ; le reste du code est correct.
- `ameliore-le-prompt` : une seule meilleure version, clairement supérieure, les autres plausibles mais moins bonnes pour une raison expliquée.

## Code Luau
- `node scripts/verifier-luau.mjs XX` (luau-lsp + types Roblox) sur chaque module de ta mission ; traite chaque diagnostic réel.
- Raisonne sur l'exécution réelle dans Roblox (type et emplacement du script, réplication, `nil`, `WaitForChild` côté client, `pcall`, cadence, API non dépréciées, sécurité serveur). Aucun Studio n'est connecté : l'exécution en jeu réel est impossible, dis-le dans le rapport.

## Après tes corrections
- Build : `bash scripts/build-verrou.sh` doit passer pour tes fichiers (si l'erreur vient d'un fichier hors de ta mission, relance plus tard).
- Rapport : chemin donné dans ta mission, structuré ainsi (les titres comptent : le rapport est consolidé automatiquement) :
  ```
  # <Périmètre> — passe N (rôle) — 2026-10-24
  ## Résumé
  X éléments vérifiés, Y corrigés, Z reformulés, W supprimés ; quiz : … ; code : … ; tests réels effectués : …
  ## Détail
  | Leçon | Affirmation / élément | Verdict (OK / CORRIGÉ / REFORMULÉ / SUPPRIMÉ) | Source | Commentaire |
  ## Désaccords avec la passe précédente
  (passe 2 uniquement)
  ## Erreurs restantes non corrigées
  (aucune, idéalement ; sinon chaque point avec la raison)
  ```

## Réponse finale (COURTE, ≤ 12 lignes)
Nombre d'éléments vérifiés / corrigés / reformulés / supprimés, les 3 à 5 corrections les plus importantes (une ligne chacune), tests réels effectués, statut du build, erreurs restantes.
