# Notes — Examen du module 02 (rédacteur de l’examen)

Fichier : `src/content/examens/module-02.yaml` — 18 questions, seuil 70.
Répartition : 9 `qcm` (dont 3 à réponses multiples), 2 `vrai-faux`, 4 `ameliore-le-prompt`, 3 `trouve-le-bug`.

Toutes les affirmations viennent des 10 leçons du module telles qu’elles étaient le 2026-10-24 (lues en entier) ; je n’ai fait aucune nouvelle affirmation factuelle sur un outil au-delà de ce qu’elles enseignent. Les vérificateurs des leçons font foi sur les sources : si une leçon change, la question correspondante doit suivre.

## Couverture (question → leçon → source dans la leçon)

| # | Type | Sujet | Leçon(s) |
|---|---|---|---|
| 1 | qcm multiple | Âge : 18 ans, trois voies pour un mineur (décision 38) | 01, 03, 08 (encadrés âge) |
| 2 | qcm | MCP local + Quick connect ; web = cloud ; pas de `multi_edit` sous Rojo | 01 (surfaces), 02 (étape 7) |
| 3 | qcm | Script créé dans Studio supprimé à la connexion de Rojo | 02 (« Avant la première connexion », syncback) |
| 4 | vrai-faux | `git restore .` ne supprime pas un fichier non suivi | 03 (tableau « Pour annuler ») |
| 5 | qcm multiple | Ce qui va dans CLAUDE.md vs dans le prompt | 03 (CLAUDE.md), 04 (astuce « Ton CLAUDE.md fait déjà la moitié… ») |
| 6 | qcm | `deny` évalué en premier, appliqué par Claude Code, même en `auto` ; doublon PowerShell sous Windows | 03 (permissions, encadré « Ne laisse pas l’IA publier », astuce PowerShell) |
| 7 | qcm | `/compact` (même tâche) vs `/clear`, `/rewind`, `/btw` | 03 (gestion du contexte) |
| 8 | vrai-faux | Le hook `Edit\|Write` ne voit pas une modification faite par Bash | 03 (encadré « stylua: command not found ») |
| 9 | ameliore-le-prompt | Message de victoire : gabarit complet, mode plan ; pièges = adjectifs, contraintes contradictoires, client qui déclare sa victoire | 04 (gabarit, « contraintes qui se contredisent »), 03 (mode plan) |
| 10 | ameliore-le-prompt | Correction ciblée (symptôme, cause, solution, vérification) sur la tâche 8 de Lave Montante | 05 (tâche 6 « correction ciblée », code final d’AffichageRound) |
| 11 | trouve-le-bug | Table indexée par joueur jamais vidée (`PlayerRemoving`) | 06 (point 6 de la checklist), 03 (CLAUDE.md) |
| 12 | qcm multiple | Pourquoi un sous-agent relecteur en lecture seule ; il peut se tromper | 03 (sous-agents), 06 (relecteur) |
| 13 | qcm | Nom de l’Output `Players.<pseudo>.PlayerScripts.X` → fichier `.client.luau` | 07 (tableau « Du nom dans l’Output au fichier ») |
| 14 | trouve-le-bug | `UserOwnsGamePassAsync` sans `pcall` | 03 (règle CLAUDE.md MarketplaceService), 10 (prompt Game Pass : pcall + 2 tentatives) |
| 15 | trouve-le-bug | `Model:SetPrimaryPartCFrame` déprécié → `PivotTo` | 08 (tableau du code obsolète) |
| 16 | ameliore-le-prompt | Clé d’API : magasin de secrets (`GetSecret`), jamais dans le prompt, Config ou un LocalScript | 08 (piège 5, secrets) |
| 17 | qcm | Description générée qui promet ce que le jeu n’a pas | 09 (description, métadonnées trompeuses), 08 (Terms of Use) |
| 18 | ameliore-le-prompt | Prompt de la bibliothèque : remplacer tous les crochets, ne pas retirer Sécurité ni Vérification | 10 (« Adapter les crochets », erreur « crochets non remplis ») |

Chaque leçon a au moins une question. Aucune question n’est recopiée d’un quiz : les sujets proches (déboguer, sous-agent, API dépréciée) utilisent une autre situation, un autre code ou une autre API (par exemple `SetPrimaryPartCFrame` au lieu de `Humanoid:LoadAnimation`, Game Pass au lieu de DataStore).

## Code des trouve-le-bug

- 3 extraits de 12 à 14 lignes, chacun avec un seul défaut voulu :
  - Q11 : pas de nettoyage de `derniereDemande` à `PlayerRemoving`. J’ai écrit le délai avec `if derniere and …` pour éviter un second défaut (avec `(derniereDemande[player] or 0)`, la première demande serait refusée pendant les 5 premières secondes de vie du serveur, puisque `os.clock` part de 0).
  - Q14 : `UserOwnsGamePassAsync` sans `pcall` (l’ID 0 est le gabarit de la bibliothèque, avec son commentaire).
  - Q15 : `SetPrimaryPartCFrame` (déprécié selon la référence, liste de la leçon 08).
- Testé directement avec `C:/tmp/luau-tools/luau-lsp.exe analyze --definitions=@roblox=…/globalTypes.d.luau` sur les 3 extraits, en mode par défaut ET avec `--!strict` ajouté : Q11 et Q14 sans aucun diagnostic (donc `Player:LoadCharacterAsync` et `MarketplaceService:UserOwnsGamePassAsync` existent dans les définitions) ; Q15 n’affiche que `(11,4): DeprecatedApi: Member 'SetPrimaryPartCFrame' is deprecated, use 'PVInstance:PivotTo' instead`, c’est-à-dire le défaut voulu. L’explication de Q15 le mentionne.

## Vérifications faites

- Lecture YAML (`yaml`) : 18 questions, une seule bonne réponse pour chaque `trouve-le-bug` et `ameliore-le-prompt`.
- `npx vitest run tests/unit/donnees-quiz.test.ts` : 8 tests passés (dont le décompte 58 leçons / 11 examens).
- `node scripts/verifier-luau.mjs 02` : 49 extraits analysés, 5 avec diagnostics, tous dans des leçons (05 blocs 6-7, 06 bloc 14, 08 bloc 4 et quiz 1), qui ne sont pas les miens ; aucun pour `examens/module-02.yaml`. (Le script ne remonte que les fichiers où luau-lsp sort en erreur : l’avertissement `DeprecatedApi` voulu de Q15 n’y apparaît pas, voir le test direct plus haut.)
- `bash scripts/build-verrou.sh` : code de sortie 0.

## Décisions

- Titre exactement comme demandé : `Examen du module 2 — Scripter avec l'IA` (apostrophe droite, entre guillemets YAML).
- La Q6 parle d’un push via l’outil **Bash** et rappelle la règle `PowerShell(git push *)` de la leçon 03, pour rester exacte sous Windows.
- La Q16 reprend `GetSecret` puis `RequestAsync` comme le décrit la leçon 08 (« elle s’utilise ensuite avec HttpService:RequestAsync »), sans détailler comment le secret est inséré dans la requête, ce que la leçon ne fait pas non plus.
- Q9 : les bonnes et mauvaises options reprennent les noms du fil rouge (`Progression.server.luau`, `Remotes.Victoire`, `InterfaceObby`) ; `Victoire` est bien déclaré dans le `default.project.json` de la leçon 02.

## Points incertains

- Q11 : `Player:LoadCharacterAsync()` est donné par les leçons 06 et 08 comme remplaçant de `LoadCharacter` (référence vérifiée par leurs rédacteurs). Si un vérificateur conclut autrement, il faut changer la ligne 13 et l’option correspondante.
- Aucun autre point incertain identifié pour Q15 (dépréciation confirmée par la leçon 08 et par luau-lsp).
