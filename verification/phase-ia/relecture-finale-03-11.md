# Relecture finale RL3 — module 03 et ajouts IA des modules 04 à 11

Date : 2026-10-25. Relecteur : RL3 (relecteur final, phase IA). Aucun commit.

## Résumé

**Périmètre relu**
- Module 03 en entier : les 6 leçons (intros, explications, 12 exercices « Lire ce code comme un relecteur », encadrés, défis, quiz) et `src/content/examens/module-03.yaml` (17 questions).
- Modules 04 à 11 : seulement les ajouts de la phase IA, repérés avec `git diff 1ffeb8a`. Cela fait 32 encadrés `<AvecClaudeCode>`, 2 encadrés `<Attention titre="Si ton projet utilise Rojo (module 2)">` (05/04, 05/06), le prompt « Décrire l'interface de Studio en fichiers Rojo », les phrases « dans ton projet Rojo… / demande-le à Claude Code… » des explications et des défis, 26 nouvelles questions de quiz et 17 nouvelles questions d'examen.

**Point de vue adopté.** Celui d'un élève qui a fini le module 02 : il sait se servir de Claude Code, de Rojo et de Git, et il découvre Luau au module 03.

**Ce que j'ai vérifié**
- Chaque exercice de lecture du module 03 peut-il se faire avec ce qui a été expliqué avant ?
- Chaque puce « À vérifier » peut-elle être contrôlée avec la leçon ?
- L'élève sait-il quand utiliser chaque prompt et ce qu'il doit y adapter ?
- La forme des encadrés est-elle la même d'un module à l'autre ?
- Les numéros de ligne cités dans les réponses des exercices et dans les `trouve-le-bug` sont-ils justes ?

**Types de corrections**
- 4 explications ajoutées pour un débutant :
  - comment compter les numéros de ligne (03/01, rappel en 03/02) ;
  - le `and` « gardien » (03/04) ;
  - pourquoi on passe une fonction à `Connect` sans parenthèses (03/02) ;
  - le rôle de `REMPLACE_PAR_TON_ID` (05/05).
- 2 consignes ajoutées pour remplacer les passages entre crochets (10/04, 10/05).
- 11 renvois « le bug du quiz » rendus clairs : le quiz est affiché *après* l'encadré, donc « le bug du quiz » était encore inconnu au moment de la lecture.
- 4 titres « À vérifier » ajustés quand Claude Code produit un rapport et non du code.
- La première ligne « Contexte : » de 33 prompts harmonisée.
- Aucun fait, chiffre, commande, nom d'API ou code Luau modifié. Le sens des prompts est inchangé.

**Vérifications faites**
- Numéros de ligne recomptés à la main :
  - les 12 réponses d'exercices du module 03 ;
  - les 7 `trouve-le-bug` des quiz 03 et les 4 de l'examen 03 ;
  - les 17 nouveaux `trouve-le-bug` et options d'examen des modules 04 à 11.
- Sorties des exercices du module 03 refaites à la main (03/02 ex. 1 ; 03/03 ex. 1 et 2 ; 03/04 ex. 1 et 2 ; 03/05 ex. 1 ; 03/06 ex. 1 et 2). Toutes sont conformes aux réponses.
- Fins de ligne CRLF de 08/03 et 08/04 conservées.
- `bash scripts/build-verrou.sh` : code de sortie 0 (80 pages indexées).

## Corrections notables

| Leçon | Problème | Correction |
|---|---|---|
| 03/01 (« Lire ce code comme un relecteur ») | Les réponses citent des lignes (« lignes 5 et 8 à 10 », « ligne 7 »). Mais les blocs de code des leçons n'affichent pas de numéros de ligne : seuls les `trouve-le-bug` des quiz en ont. Le débutant ne sait pas d'où partir pour compter. | Ajout d'une phrase : on compte à partir de la 1re ligne de l'extrait (le commentaire du haut est la ligne 1), lignes vides comprises ; dans Studio et VS Code, les numéros s'affichent à gauche du code. |
| 03/02 (exercice 2) | Même difficulté pour « Ligne 6, dangereuse » et « Ligne 3, inutile ». | Rappel d'une phrase, entre parenthèses, renvoyant à la leçon 1. |
| 03/02 (encadré) | La puce « fonction passée à `Connect` sans parenthèses » ne s'explique qu'à la leçon 5. L'élève ne sait pas pourquoi il doit la contrôler. | Ajout : « comme dans le code de la leçon (tu verras pourquoi à la leçon 5) ». L'élève peut contrôler la puce en comparant avec le code de la leçon. |
| 03/04 (fil rouge KillBricks) | `personnage and personnage:FindFirstChildOfClass("Humanoid")` n'est expliqué nulle part : la leçon 2 ne présente que le `or` comme valeur par défaut. Pourtant, la puce « À vérifier » demande de contrôler ce `personnage and ...`. | Ajout d'une phrase après le code : si `personnage` vaut `nil`, `and` s'arrête et renvoie `nil` sans appeler la méthode ; sinon, il renvoie le résultat de la recherche. |
| 05/05 (encadré Animation de victoire) | Le prompt contient `rbxassetid://REMPLACE_PAR_TON_ID`, mais l'intro ne dit pas clairement qu'il faut remplacer ce texte avant d'envoyer le prompt. | Ajout : « Avant de l'envoyer, remplace `REMPLACE_PAR_TON_ID` (dans la ligne « Contexte ») par le numéro de ton animation publiée. » |
| 10/04 (Rotation des pièces côté client) | Le prompt contient `[colle ici tes chiffres : …]`. L'intro dit « donne-lui tes mesures » sans parler des crochets. | Ajout : remplacer le passage entre crochets par les chiffres notés à la leçon 2. |
| 10/05 (Audit de performance du code) | Le prompt contient deux passages entre crochets (fiche « avant », sortie du script d'audit) qui ne sont signalés nulle part. | Ajout : remplacer les deux passages par la fiche de mesure « avant » et par la sortie du script d'audit. |
| 05/04, 06/01 à 06/05, 07/02, 07/04, 08/03 à 08/05 (11 puces) | « (le bug du quiz) », « (le piège du quiz) », « la faille du quiz » : le quiz est affiché sous la leçon, donc l'élève lit l'encadré avant de l'avoir vu. Le renvoi est obscur. | Remplacé partout par « … du quiz de fin de leçon ». |
| 04/01 et 11/04 | « **À vérifier dans le code produit :** » au-dessus d'un audit en lecture seule : Claude Code ne produit aucun code, seulement un rapport. | « **À vérifier dans le rapport produit :** ». C'est la formule déjà employée dans la bibliothèque de prompts (02/10). |
| 10/05 et 11/02 | Même titre au-dessus d'un audit suivi de corrections après accord. Les puces portent sur les deux. | « **À vérifier dans le rapport et le code produits :** ». |
| 33 prompts des modules 04 à 11 | Quatre formulations différentes ouvraient la ligne « Contexte : » d'un module à l'autre (une par rédacteur) : « projet Rojo de l'Obby des Nuages (jeu Roblox). », « je développe l'Obby des Nuages, un obby Roblox géré avec Rojo (voir CLAUDE.md). », « jeu Roblox « Obby des Nuages », projet Rojo (voir CLAUDE.md). » et, au module 03, « mon jeu Roblox « Obby des Nuages » est un projet Rojo (voir CLAUDE.md). » | Formule unique, celle du module 03 : « Contexte : mon jeu Roblox « Obby des Nuages » est un projet Rojo (voir CLAUDE.md). » Les prompts des modules 04 et 05, qui citent déjà CLAUDE.md plus loin, prennent « … est un projet Rojo. » ; en 05/05 : « …, avec des avatars R15. ». Le reste de chaque prompt est inchangé. |

**Forme déjà homogène, laissée telle quelle**
- Titres des prompts : groupes nominaux courts, parfois suivis du nom du script entre parenthèses.
- Formule « **À vérifier dans le code produit :** » partout où du code est produit.
- Listes à puces simples, sans cases `- [ ]`.
- Encadrés en dernier avant `<Defi>` ou `<Resume>`.
- Phrases « toi-même, ou avec Claude Code et le prompt de l'encadré ci-dessus, puis relis-les » dans les défis.

## Points de blocage pour un débutant

**Corrigés**
1. Les numéros de ligne cités dans les réponses des exercices du module 03 sans aucun repère pour compter (03/01, 03/02). Les leçons 03/03 à 03/06 suivent la même convention, posée à la leçon 1.
2. Le `and` gardien de 03/04, utilisé et à vérifier sans avoir été expliqué.
3. Le contrôle « sans parenthèses » demandé en 03/02 alors que `Connect` n'est expliqué qu'en 03/05.
4. Les textes à remplacer dans les prompts (05/05, 10/04, 10/05) : rien n'indiquait qu'il fallait les modifier avant l'envoi.
5. Les renvois « le bug du quiz » lus avant le quiz.
6. « Code produit » écrit au-dessus d'audits qui ne produisent aucun code.

**Vérifiés, sans blocage**
- Les 12 exercices de lecture du module 03 ne demandent que des notions déjà vues :
  - 03/01 : `print`, commentaires, `script.Parent`, message `is not a valid member` du tableau des erreurs ;
  - 03/02 : falsy/truthy, `or`, interpolation, `FindFirstChildOfClass` ;
  - 03/03 : `continue`/`break`, `wait` déprécié, boucle infinie qui bloque la suite ;
  - 03/04 : référence et `table.clone`, `table.remove` vers l'avant ;
  - 03/05 : `task.delay`/`task.spawn`, `WaitForChild` sans délai, joueurs déjà présents ;
  - 03/06 : `.` contre `:`, réglage dupliqué.
- Toutes les puces « À vérifier » des modules 03 à 11 renvoient à une notion, une section ou un code de la leçon. J'ai vérifié que les sections citées existent : « Le piège de NaN » (04/04), « Envoyer soi-même le joueur » (04/02), « Qui exécute quel script ? » (04/01), « Et le personnage, dans tout ça ? » (05/06). `ModelStreamingMode` et `Persistent` sont expliqués en 10/03, `debug.profilebegin` en 10/02.
- Chaque encadré dit ce qui est demandé. Le défi correspondant dit quand utiliser le prompt (« toi-même, ou avec Claude Code… »).
- Les prompts qui contiennent un ID fictif (`ID_PASS_TRAIL_DORE`, `ID_ABONNEMENT`, `ID_PASSER_ETAPE`, `ID_COMMUNAUTE` « 0 en attendant ») n'exigent aucune modification avant l'envoi : c'est voulu.
- Les termes Claude Code employés (mode plan, CLAUDE.md, `git diff`, `git status`, selene/StyLua, serveur MCP de Studio) sont tous vus au module 02.

## Points signalés non corrigés

1. **Numéros de ligne dans les blocs de code des leçons.** Les exercices « Lire ce code comme un relecteur » gagneraient à afficher des numéros, comme les `trouve-le-bug` des quiz. Il faudrait modifier le rendu des blocs Shiki (code du site), ce qui sort de ma mission. J'ai seulement ajouté la consigne pour compter. À proposer à l'orchestrateur.
2. **Intros d'encadrés plus longues que « une ou deux phrases »** (brief rédacteur) : 04/05, 05/02, 05/03 et 05/04 en ont trois ou quatre. Le contenu est utile (ordre des étapes, nom choisi pour un script sans nom dans la leçon) : je l'ai laissé.
3. **Encadré « Si ton projet utilise Rojo » de 05/04.** Il est long : 3 étapes et un prompt complet dans un `<Attention>`. Il reste compréhensible et chaque étape dit quoi cliquer (Disconnect, Accept, Abort) ; je ne l'ai pas restructuré. Une sous-section `###` serait plus navigable : changement de structure à décider par l'orchestrateur.
4. **Dépendance entre encadrés (05/03).** Le prompt demande de supprimer `DemoAchat.client.luau`, créé seulement par l'encadré de 04/05. L'intro le signale déjà (« si tu as suivi l'encadré de cette leçon-là ») ; un élève qui a tout tapé à la main aura un LocalScript de démonstration d'un autre nom à supprimer lui-même. Rien de bloquant, non modifié.
5. **Examen 03 : 17 questions.** C'est au-dessus de la cible « 10 à 15 » d'AUTHORING mais dans la limite du schéma (5 à 30). Toutes sont justes et couvrent les 6 leçons : conservées.
6. **Aucun test réel en jeu.** Aucun Studio n'est connecté et je n'ai lancé aucune session Claude Code : les prompts et les scripts n'ont pas été exécutés. Les réponses des exercices ont été refaites à la main (les passes 1 et 2 les avaient déjà exécutées avec `luau.exe`).

## Fichiers modifiés

- Module 03 :
  - `src/content/lecons/module-03/01-premier-script.mdx`
  - `src/content/lecons/module-03/02-variables-types-et-conditions.mdx`
  - `src/content/lecons/module-03/04-tables.mdx`
- Modules 04 et 05 :
  - `src/content/lecons/module-04/01` à `05` (ligne « Contexte : » ; 04/01 : titre « À vérifier »)
  - `src/content/lecons/module-05/01` à `06` (ligne « Contexte : » ; 05/04 : renvoi au quiz ; 05/05 : consigne `REMPLACE_PAR_TON_ID`)
- Modules 06 à 08 :
  - `src/content/lecons/module-06/01` à `05` (« Contexte : », renvoi au quiz)
  - `src/content/lecons/module-07/02` à `05` (« Contexte : » ; 07/02 et 07/04 : renvoi au quiz)
  - `src/content/lecons/module-08/03` à `05` (« Contexte : », renvoi au quiz ; CRLF conservé)
- Modules 09 à 11 :
  - `src/content/lecons/module-09/04`, `05` (« Contexte : »)
  - `src/content/lecons/module-10/01` à `05` (« Contexte : » ; 10/04 et 10/05 : consignes pour les crochets ; 10/05 : titre « À vérifier »)
  - `src/content/lecons/module-11/02`, `04` (« Contexte : », titres « À vérifier »)

Aucun fichier d'examen n'a été modifié. Le module 02, l'accueil et les fichiers de l'autre relecteur n'ont pas été touchés.
