# Brief commun des VÉRIFICATEURS

Projet : site de formation en français « Créer un jeu Roblox qui marche, de A à Z » (Astro + MDX).
Dossier : `C:\Users\t9lev\Documents\Forma Roblox`. Date du jour : 2026-10-24.
Tu es indépendant du rédacteur : tu ne lui fais pas confiance, tu vérifies tout toi-même. Autonomie totale, aucune question. Ne fais PAS de commit git.
D'autres agents travaillent sur d'autres modules en même temps : ne touche QU'AUX fichiers de ton module.

## Fichiers de ton module (XX)
- Leçons : `src/content/lecons/module-XX/*.mdx`
- Examen : `src/content/examens/module-XX.yaml`
- Notes du rédacteur (aide, pas une preuve) : `verification/module-XX-notes-redacteur.md`
- Rapports de vérification précédents s'il y en a : `verification/module-XX-passe-*.md`
- Format à respecter : `AUTHORING.md`. Fil rouge et périmètre : `PLAN.md`.

## Règles de vérité
- Sources acceptées, par ordre de préférence : create.roblox.com/docs (doc + référence API), annonces officielles du staff Roblox sur devforum.roblox.com, en.help.roblox.com, roblox.com/info (DevEx…), about.roblox.com / corp.roblox.com / ir.roblox.com, luau.org. Les retours de développeurs (DevForum, hors staff) ne sont acceptés que s'ils sont présentés comme tels dans le texte.
- Utilise WebSearch / WebFetch pour chaque vérification. Privilégie les pages les plus récentes ; vérifie qu'une API n'est pas dépréciée ou remplacée et qu'une fonctionnalité existe toujours sous ce nom en octobre 2026.
- Pour chaque affirmation fausse, obsolète ou invérifiable : CORRIGE-la dans le fichier (ou reformule honnêtement, ou supprime-la). Chiffres qui évoluent : « au moment de la rédaction (octobre 2026) » + source + `miseAJour: 2026-10-24` dans le frontmatter.
- Aucun « secret de succès » inventé, aucune promesse de revenus/viralité : chaque conseil doit reposer sur une source, des données Roblox, ou être présenté comme un retour d'expérience de développeurs.
- `<Sources>` en bas de CHAQUE leçon : uniquement des liens réels que tu as ouverts et qui confirment le contenu. Retire les liens morts ou hors sujet, ajoute ceux qui manquent.

## Quiz et examens
- Vérifie chaque question : bonne réponse réellement correcte, options fausses réellement fausses, pas d'ambiguïté, explication juste et pédagogique.
- `trouve-le-bug` : le code contient exactement UN bug, celui désigné ; les numéros de ligne cités correspondent (ligne 1 = première ligne du bloc `code`) ; le reste du code est correct.

## Code Luau
- Lance `node scripts/verifier-luau.mjs XX` (luau-lsp + définitions de types Roblox) et traite chaque diagnostic (les extraits `trouve-le-bug` ont un bug volontaire ; un extrait volontairement partiel peut produire un `UnknownGlobal` acceptable — sinon corrige).
- Au-delà de l'analyse statique, raisonne sur l'exécution réelle dans Roblox : bon type de script et bon emplacement (Script/LocalScript/ModuleScript ; ServerScriptService, StarterPlayerScripts…), réplication client/serveur, `nil` possibles (`FindFirstChild`, `hit.Parent`), `WaitForChild` côté client, debounce, `pcall` autour des appels réseau/DataStore/MarketplaceService, pas d'API dépréciée (`wait`, `spawn`, `delay`, `:connect`, `Humanoid:LoadAnimation`…), sécurité (le serveur valide tout).
- Cohérence avec les conventions du fil rouge (cf. `C:\tmp\BRIEF_REDACTEUR.md`, section « Conventions du fil rouge »).

## Après tes corrections
- Build : `bash scripts/build-verrou.sh` doit passer pour tes fichiers (si l'erreur vient d'un autre module, ignore-la et relance plus tard).
- Écris ton rapport : `verification/module-XX-passe-N.md` (N donné dans ta mission), structuré ainsi :
  ```
  # Module XX — passe N (rôle) — 2026-10-24
  ## Résumé
  X affirmations vérifiées, Y corrigées, Z supprimées ; quiz : …; code : …
  ## Détail
  | Leçon | Affirmation / élément | Verdict (OK / CORRIGÉ / SUPPRIMÉ / REFORMULÉ) | Source | Commentaire |
  ## Erreurs restantes non corrigées
  (aucune, idéalement ; sinon chaque point avec la raison)
  ```

## Réponse finale (COURTE, ≤ 12 lignes)
Nombre d'éléments vérifiés / corrigés / supprimés, les 3 à 5 corrections les plus importantes en une ligne chacune, statut du build, erreurs restantes non corrigées (s'il y en a).
