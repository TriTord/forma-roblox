# VERIFICATION.md — Vérification du contenu

Ce fichier est généré par `node scripts/consolider-verification.mjs` à partir des rapports détaillés du dossier [`verification/`](verification/).

## Méthode

Chaque module a suivi la même boucle qualité :

1. **Rédaction** par un rédacteur dédié, qui a sourcé chaque affirmation et listé ses doutes dans `verification/module-XX-notes-redacteur.md`.
2. **Vérification passe 1** par un vérificateur indépendant du rédacteur : faits, chiffres, noms d'API et de fonctionnalités confrontés aux sources officielles (create.roblox.com/docs et son dépôt GitHub, annonces officielles du staff sur le DevForum, en.help.roblox.com, roblox.com/info, Newsroom / about.roblox.com, luau.org) ; quiz ; code Luau.
3. **Vérification passe 2** par un second vérificateur indépendant, qui ne fait pas confiance à la passe 1 : il refait la vérification, se concentre sur le code Luau à l'exécution, les quiz et la clarté, et consigne ses désaccords avec la passe 1.
4. **Cohérence inter-modules** : assemblage du code du fil rouge dans un projet de référence analysé par luau-lsp avec types Roblox, et harmonisation des faits répétés d'un module à l'autre.
5. **Relecture finale** comme un élève débutant.

Outils utilisés : `luau-lsp analyze` avec les définitions de types Roblox (`node scripts/verifier-luau.mjs`), interpréteur `luau` pour la sémantique du langage pur, WebFetch/WebSearch sur les sources officielles.

Règles appliquées : toute information fausse, obsolète ou invérifiable est corrigée, reformulée prudemment ou supprimée ; les chiffres qui évoluent sont datés (« au moment de la rédaction, octobre 2026 ») avec leur source ; aucun « secret de succès » : chaque conseil s'appuie sur une source, des données Roblox, ou est présenté comme un retour d'expérience de développeurs ou un choix de la formation.

**Limite connue commune à tous les modules** : aucune instance de Roblox Studio n'était connectée pendant la vérification. Le code a été vérifié par analyse statique (luau-lsp + types Roblox), exécution du Luau pur quand c'était possible, et raisonnement sur la documentation officielle (ordre de chargement des personnages, réplication…), mais pas exécuté dans un vrai serveur Roblox. Les points concernés sont signalés dans les rapports.

## Tableau de bord

Comptage automatique des lignes des tableaux « Détail » de chaque rapport (une ligne = un élément vérifié : affirmation, question de quiz, extrait de code ou source).

| Module | Passe | Lignes OK | Corrigées | Reformulées | Supprimées | Rapport |
|---|---|---|---|---|---|---|
| 00 | 1 | 56 | 7 | 13 | 0 | [module-00-passe-1.md](verification/module-00-passe-1.md) |
| 00 | 2 | 41 | 4 | 6 | 0 | [module-00-passe-2.md](verification/module-00-passe-2.md) |
| 01 | 1 | 56 | 6 | 11 | 0 | [module-01-passe-1.md](verification/module-01-passe-1.md) |
| 01 | 2 | 47 | 2 | 5 | 0 | [module-01-passe-2.md](verification/module-01-passe-2.md) |
| 02 | 1 | 45 | 4 | 6 | 0 | [module-02-passe-1.md](verification/module-02-passe-1.md) |
| 02 | 2 | 51 | 1 | 5 | 0 | [module-02-passe-2.md](verification/module-02-passe-2.md) |
| 03 | 1 | 41 | 6 | 4 | 0 | [module-03-passe-1.md](verification/module-03-passe-1.md) |
| 03 | 2 | 41 | 3 | 5 | 0 | [module-03-passe-2.md](verification/module-03-passe-2.md) |
| 04 | 1 | 46 | 6 | 6 | 1 | [module-04-passe-1.md](verification/module-04-passe-1.md) |
| 04 | 2 | 22 | 4 | 1 | 1 | [module-04-passe-2.md](verification/module-04-passe-2.md) |
| 05 | 1 | 52 | 14 | 14 | 2 | [module-05-passe-1.md](verification/module-05-passe-1.md) |
| 05 | 2 | 41 | 10 | 3 | 0 | [module-05-passe-2.md](verification/module-05-passe-2.md) |
| 06 | 1 | 49 | 8 | 4 | 0 | [module-06-passe-1.md](verification/module-06-passe-1.md) |
| 06 | 2 | 30 | 3 | 1 | 0 | [module-06-passe-2.md](verification/module-06-passe-2.md) |
| 07 | 1 | 71 | 5 | 7 | 0 | [module-07-passe-1.md](verification/module-07-passe-1.md) |
| 07 | 2 | 66 | 5 | 12 | 0 | [module-07-passe-2.md](verification/module-07-passe-2.md) |
| 08 | 1 | 71 | 7 | 4 | 0 | [module-08-passe-1.md](verification/module-08-passe-1.md) |
| 08 | 2 | 45 | 4 | 4 | 0 | [module-08-passe-2.md](verification/module-08-passe-2.md) |
| 09 | 1 | 62 | 7 | 7 | 0 | [module-09-passe-1.md](verification/module-09-passe-1.md) |
| 09 | 2 | 18 | 8 | 6 | 1 | [module-09-passe-2.md](verification/module-09-passe-2.md) |
| 10 | 1 | 50 | 9 | 7 | 0 | [module-10-passe-1.md](verification/module-10-passe-1.md) |
| 10 | 2 | 44 | 7 | 7 | 0 | [module-10-passe-2.md](verification/module-10-passe-2.md) |
| **Total** | | **1045** | **130** | **138** | **5** | |


# Résumés par module

## Module 00

### Passe 1 — [rapport détaillé](verification/module-00-passe-1.md)

Environ 95 affirmations vérifiées (5 leçons + examen), 16 corrigées ou reformulées, 0 supprimée ; 8 sources ajoutées. Quiz : 26 questions de leçon + 15 d'examen relues, 0 réponse fausse, 3 explications corrigées (formulation). Code : `verifier-luau 00` → 4 extraits, diagnostics uniquement sur les 2 `trouve-le-bug` de l'examen (bugs volontaires, lignes correctes) ; l'extrait `+` de la leçon 01 provoque bien une erreur à l'exécution (arithmétique sur une chaîne non numérique).

Pages officielles lues en texte brut (curl des versions `.md` de create.roblox.com, `last_updated` 2026-10-23 ; API JSON du DevForum et du centre d'aide, car WebFetch reçoit des 403).

**Erreurs restantes non corrigées :**

- Aucune erreur de fond connue.
- À surveiller : la page create.roblox.com « Turn your creativity into income » affiche encore les chiffres DevEx 2025 (35 000 / 1 550 $) alors que le Newsroom de septembre 2026 donne > 42 000 / ≈ 1 500 $. La leçon cite les deux, avec leur date.
- Les Terms of Use lus sont la version « Effective Date: November 1, 2026 » (publiée, pas encore en vigueur au 24/10). Les points cités (accord parental, Robux contenu numérique, portée des Creator Terms) sont identiques ou décrits pour les deux versions.
- Build : `bash scripts/build-verrou.sh` passe (code 0, 69 pages indexées) après correction par un autre agent d'une erreur temporaire dans `module-05/01-core-loop.mdx`.

### Passe 2 — [rapport détaillé](verification/module-00-passe-2.md)

Environ 100 affirmations revérifiées sur source officielle (5 leçons + examen), 17 corrigées / reformulées / simplifiées, 0 supprimée sur le fond (2 passages chiffrés allégés). Quiz : 26 questions de leçon + 15 d'examen relues : 0 réponse fausse ; 1 question d'examen désambiguïsée, 1 explication simplifiée. Code : `verifier-luau 00` → 4 extraits, diagnostics uniquement sur les 2 `trouve-le-bug` de l'examen (bugs volontaires, numéros de ligne exacts) ; extrait d'aperçu de la leçon 01 complété d'une note sur l'absence d'anti-rebond. Sources : 1 lien mort remplacé, 1 lien redirigé mis à jour, 6 sources ajoutées. Build `build-verrou.sh` : code 0 (69 pages).

Méthode : versions `.md` de create.roblox.com (curl), API JSON du DevForum et du centre d'aide, texte des pages Newsroom ; contrôle du code HTTP de chaque lien de `<Sources>` (WebFetch confirme le 404 du lien mort).

**Désaccords avec la passe précédente (tranchés par la passe 2) :**

- **« Toutes les autres sources existantes ont été ouvertes… (aucun lien mort) »** : faux pour `https://create.roblox.com/docs/creator-hub`, dont la page HTML renvoie 404 (seule la version `.md` existe). Remplacé.
- **Lien « earning-on-roblox »** jugé OK : il fonctionne, mais par double redirection vers `docs/monetize` ; URL mise à jour.
- **Leçon 04, « mise à jour en octobre 2026 »** laissé tel quel : le `last_updated` est commun à toutes les pages (date de génération), ce n'est pas une preuve de mise à jour du contenu.
- **Leçon 04, « de tes amis »** non relevé : contresens sur la source « friends ».
- **Leçon 03, fréquence des témoignages DevForum** (« répondent souvent », « les plus cités ») jugée OK : un seul fil de 2020 ne permet pas d'affirmer une fréquence.
- **Examen Q5** : la passe 1 a introduit « participaient à DevEx sur les douze mois clos le 30 juin 2026 », attribution de période inexacte (elle porte sur la médiane).
- **Examen Q9** : ambiguïté sur la provenance des joueurs non relevée.
- **Clarté** : la passe 1 a ajouté des chiffres (double série DevEx 2025/2026, remplacement de QPTR, double description des Creator Terms) qui alourdissaient des leçons pour débutants ; allégés ici sans perte d'exactitude.
- **Roblox Plus** absent de la liste des revenus alors que docs/monetize le liste ; ajouté.

**Erreurs restantes non corrigées :**

- Aucune erreur de fond connue.
- À surveiller : les Terms of Use lus sont la version « Effective Date: November 1, 2026 » (pas encore en vigueur au 24/10/2026) ; les points cités sont généraux et identiques dans l'esprit.
- Hors périmètre (signalé, non modifié) : `src/data/modules.ts` décrit le module 6 avec « Premium Payouts », programme déprécié depuis le 24/07/2025 (remplacé par Creator Rewards).

## Module 01

### Passe 1 — [rapport détaillé](verification/module-01-passe-1.md)

94 affirmations vérifiées (interface, menus, onglets, boutons, modes de test, raccourcis, API, publication, collaboration) : 81 OK, 12 corrigées ou reformulées, 0 supprimée ; 1 vérifiée sans pouvoir être testée (recherche `is:LuaSourceContainer`, Studio non disponible), reformulée avec une solution de repli.
Quiz : 30 questions de leçon et 15 questions d’examen relues ; 1 question d’examen reformulée (Q12, Transparency). Les 5 `trouve-le-bug` ont bien un seul bug réel, et les numéros de ligne sont corrects.
Code : `node scripts/verifier-luau.mjs 01` → 9 extraits, 0 diagnostic. Build `bash scripts/build-verrou.sh` : code de sortie 0.
Sources : toutes les pages create.roblox.com ont été lues dans leur version Markdown (`/docs/en-us/<chemin>.md`, `last_updated: 2026-10-23`). Les liens ont été vérifiés un par un avec curl : 200 partout, sauf les pages HTML de la référence API Instance, Players, SpawnLocation et Workspace, qui renvoient 502 à curl (pages très lourdes). Leurs versions `.md` répondent 200 et sont à jour : les liens sont donc gardés.

**Erreurs restantes non corrigées :**

- Aucune erreur connue. Deux points ne sont pas vérifiables sans Studio (aucune instance connectée au MCP) et sont formulés prudemment avec un repli : la recherche `is:LuaSourceContainer` (leçon 02) et les touches de la caméra sur clavier AZERTY (leçon 01).
- Les pages HTML de la référence API Instance, Players, SpawnLocation et Workspace renvoient 502 à curl, mais leurs versions `.md` officielles répondent 200 (`last_updated` 2026-10-23). Les liens sont gardés ; une passe suivante peut les recontrôler dans un navigateur.

### Passe 2 — [rapport détaillé](verification/module-01-passe-2.md)

102 éléments revérifiés sur les pages officielles actuelles (versions `.md` de create.roblox.com, `last_updated: 2026-10-23`) : interface, menus, modes de test, raccourcis, propriétés, API, publication, collaboration. 93 OK, 8 corrigés ou reformulés, 1 supprimé (lien DevForum AZERTY).
Quiz : les 30 questions de leçon et les 15 questions d’examen ont été relues. 1 distracteur a été remplacé (03-Q3) et 1 explication ajustée (01-Q3). Les 5 `trouve-le-bug` ont été recomptés ligne par ligne : chacun contient un seul bug, et les numéros de ligne cités sont les bons.
Code : `node scripts/verifier-luau.mjs 01` analyse 9 extraits, sans aucun diagnostic. J’ai aussi raisonné sur l’exécution réelle : bons emplacements (Script dans ServerScriptService, Command Bar hors test), `FindFirstChild` protégé par `if`, aucune API dépréciée, avertissement « infinite yield » de `WaitForChild` après 5 s confirmé par la référence Instance.
Build : `bash scripts/build-verrou.sh` se termine avec le code de sortie 0.
Studio : le MCP Roblox Studio ne voyait aucune instance connectée, donc rien n’a pu être testé dans l’interface.

**Désaccords avec la passe précédente (tranchés par la passe 2) :**

- **« experiences »** : la passe 1 dit avoir retiré l’affirmation historique non sourcée (« Roblox a longtemps appelé… »). Elle était pourtant toujours dans le texte (« Pendant plusieurs années, Roblox a appelé… »). Je l’ai reformulée.
- **AZERTY** : la passe 1 gardait le fil DevForum du staff comme appui. Ce fil parle des KeyCodes en jeu (`GetStringForKeyCode`), pas de la caméra de Studio : il n’étaye rien ici. Lien retiré, texte simplifié et concret.
- **`is:LuaSourceContainer`** : la passe 1 le gardait avec une solution de repli. LuaSourceContainer est NotBrowsable, ce qui rend son support incertain, et c’est un détail inutile pour un débutant. J’ai remplacé par `is:Script or is:ModuleScript`, qui ne repose que sur la syntaxe documentée.
- **Sauvegarde auto « toutes les quatre minutes »** : la passe 1 a ajouté ce chiffre, mais la même page dit aussi 5 minutes. La formulation est maintenant prudente.
- **Quiz 03-Q3** : la passe 1 avait validé ce distracteur, alors qu’il reposait sur un comportement de Studio non documenté. Je l’ai remplacé.

**Erreurs restantes non corrigées :**

- Aucune erreur connue.
- Pas vérifiable sans Studio (aucune instance MCP connectée) : les touches réelles de la caméra sur AZERTY. Le texte reste prudent et propose de tester les deux jeux de touches.
- `is:Script or is:ModuleScript` découle de la documentation (`is:` couvre les sous-classes, et `or` est supporté) mais n’a pas été testé en direct.

## Module 02

### Passe 1 — [rapport détaillé](verification/module-02-passe-1.md)

94 affirmations ou éléments vérifiés, 14 corrigés ou reformulés, 0 supprimé, 7 compléments ajoutés (sources et précisions).
Quiz : 35 questions de leçon + 14 questions d’examen vérifiées. 1 erreur factuelle corrigée (message d’erreur de l’examen q13). 1 énoncé reformulé (leçon 03, quiz 5 : le message « Script timeout » n’est pas documenté officiellement). Les 9 `trouve-le-bug` contiennent chacun un seul bug, à la ligne indiquée.
Code : `node scripts/verifier-luau.mjs 02` donne 62 extraits et 7 diagnostics, tous attendus (bugs volontaires et `Unknown require` des extraits isolés). Les comportements de Luau pur ont été réexécutés avec `C:\tmp\luau-tools\luau.exe`. Studio n’était pas connecté (`list_roblox_studios` vide), donc pas de test du checkpoint en jeu. Build `bash scripts/build-verrou.sh` : code de sortie 0.

Méthode : les pages officielles ont été téléchargées en Markdown (`create.roblox.com/docs/…​.md`, mises à jour le 2026-10-23) et lues. luau.org/syntax et luau.org/types ont été lues avec WebFetch. Les 3 fils DevForum cités ont été ouverts.

**Erreurs restantes non corrigées :**

- Le checkpoint de la leçon 05 n’a pas pu être testé en jeu : aucune instance Studio n’est connectée. Le raisonnement repose sur l’ordre de chargement documenté. À tester en passe 2 si Studio est disponible.
- Le mode d’analyse par défaut réellement appliqué par Studio n’est pas précisé dans la doc Roblox (`LuauTypeCheckMode.Default` = « engine-default »). Le texte cite donc la doc Luau, sans affirmer le comportement de Studio.

### Passe 2 — [rapport détaillé](verification/module-02-passe-2.md)

102 affirmations ou éléments vérifiés. 12 corrigés, reformulés ou précisés, 0 supprimé.
Quiz : 31 questions de leçon et 14 questions d'examen revérifiées. Elles sont toutes justes. Les 6 `trouve-le-bug` de leçon et les 3 de l'examen contiennent chacun un seul bug, et les numéros de ligne ont été recomptés un par un.
Code : 22 comportements Luau ont été réexécutés avec `C:\tmp\luau-tools\luau.exe`, y compris tous les messages d'erreur cités. `node scripts/verifier-luau.mjs 02` analyse 62 extraits : 7 ont des diagnostics, tous attendus (bugs volontaires, variable hors de portée volontaire, `Unknown require` des extraits isolés).
Le mot-clé `const` est **conservé**. Il est documenté par Roblox (luau/variables, mise à jour le 2026-10-23) et par luau.org/syntax, et le RFC a le statut « Implemented ». L'annonce officielle « [Beta] if local Statements » (staff, 2026-10-06) le traite comme une syntaxe acquise.
Build `bash scripts/build-verrou.sh` : code de sortie 0.
Studio n'est pas connecté (`list_roblox_studios` vide). Le checkpoint n'a donc pas pu être testé en jeu.

Méthode : les pages create.roblox.com ont été lues en version `.md` (`last_updated` 2026-10-23), luau.org/syntax, /types et /library en HTML. Les fils DevForum ont été lus en JSON, ainsi que le RFC `const-keyword.md` sur GitHub (luau-lang/rfcs).

**Désaccords avec la passe précédente (tranchés par la passe 2) :**

- Aucun désaccord sur les faits. Les corrections de la passe 1 ont été revérifiées et sont justes : `#` en octets, `{{` et `\{`, message de q13, reformulation « Script timeout », test `IsDescendantOf`, et ajout de `const`, qui est bien en production.
- La passe 1 a laissé passer plusieurs points de **progressivité** pour un débutant : `task.spawn` utilisé avant d'être expliqué, syntaxe `{[cle] = true}` jamais présentée, `math.random` et `os.clock` non définis, étape `require` manquante pour brancher `Config` dans `Checkpoints`, exemple `Workspace`/`workspace` source de confusion.
- Elle a aussi laissé passer deux points de **cohérence entre modules** : l'Info sur les pièces « ramassées » retirées du dossier contredit le module 3, et rien ne demandait de réactiver `PiecesTournantes` après la démo POO, alors que les modules 3 et 9 le réutilisent.

**Erreurs restantes non corrigées :**

- Le retour au checkpoint (leçon 05) n'a toujours pas été testé en jeu : aucune instance Studio n'est connectée. Le raisonnement s'appuie sur l'ordre de chargement documenté et sur le même motif qu'au module 3.

## Module 03

### Passe 1 — [rapport détaillé](verification/module-03-passe-1.md)

71 affirmations ou éléments vérifiés (5 leçons, 25 questions de quiz de leçon, 15 questions d'examen, 34 extraits de code) : 8 corrigés ou reformulés, 0 supprimé. Quiz : 40 questions vérifiées, 1 extrait `trouve-le-bug` complété (sans décalage des numéros de ligne), 1 explication reformulée. Code : 1 API dépréciée remplacée (`LoadCharacter` → `LoadCharacterAsync`), 1 condition de course corrigée (réapparition au checkpoint), 1 script de test rendu déterministe. `verifier-luau 03` : 6 extraits avec diagnostics, tous attendus (require de ModuleScripts définis ailleurs, extrait d'examen volontairement partiel). Build : OK (code de sortie 0).

Pages consultées le 2026-10-24 (format `.md` de create.roblox.com, `last_updated` 2026-10-23), plus l'annonce officielle du DevForum sur Server Authority.

**Erreurs restantes non corrigées :**

- Aucune dans le module 03.
- Remarque hors périmètre (non modifiée) : `Player:LoadCharacter()` est dépréciée ; si d'autres modules l'utilisent, à signaler à leurs vérificateurs.
- La page officielle `scripting/security/network-ownership` dit encore que Server Authority est « currently in beta », alors que l'annonce officielle du 9 juillet 2026 indique le lancement pour tous les jeux : le texte suit l'annonce, plus récente.
- Les tests 2 et 3 de la leçon 05 et le motif de réapparition n'ont pas pu être exécutés dans Studio. Le raisonnement s'appuie sur l'ordre de chargement documenté dans la référence `Player`.

### Passe 2 — [rapport détaillé](verification/module-03-passe-2.md)

78 affirmations ou éléments vérifiés (5 leçons, 25 questions de quiz, 15 questions d'examen, 34 extraits de code, 24 liens `<Sources>`) : 9 corrigés ou reformulés, 0 supprimé. Quiz : 40 questions revérifiées, 1 option reformulée (ambiguïté sur InvokeClient) ; les 8 `trouve-le-bug` (1 par leçon, plus q6, q9 et q14 de l'examen) ont été recomptés ligne par ligne : tous corrects, aucun décalage introduit par mes modifications. Code : aucun bug d'exécution bloquant trouvé ; identifiants du `Catalogue` alignés sur le module 4 ; 4 indications ajoutées pour un débutant (remotes à créer, téléportations et détecteur). `verifier-luau 03` : 6 extraits avec diagnostics, tous attendus (require de ModuleScripts définis ailleurs ; q14 de l'examen volontairement partielle). Build : OK (code de sortie 0).

Méthode : pages `.md` de create.roblox.com téléchargées et lues directement (`last_updated` 2026-10-23), JSON de l'annonce DevForum lu en entier (auteur : `welblander`, titre « Roblox Staff », publié le 2026-07-09). Tous les liens `<Sources>` répondent (les 4 pages de référence très lourdes renvoient un 502 en curl, mais leur version `.md` répond en 200 et WebFetch les ouvre).

**Désaccords avec la passe précédente (tranchés par la passe 2) :**

- **« Aucune erreur restante »** : la passe 1 n'a pas vu deux incohérences entre modules. Les identifiants et les prix du `Catalogue` différaient du module 4. Et la leçon 05 décrivait mal ce que le module 2 avait fait construire (scripts « dans les Parts » au lieu du Script Checkpoints dans ServerScriptService, avec un attribut). Les deux sont corrigées.
- **Quatre couches « dans cet ordre »** : la passe 1 a validé le texte et le code, qui se contredisaient (débit avant contexte dans le code). Reformulé.
- **InvokeClient, quiz de la leçon 03** : l'option « si le client ne renvoie rien » était jugée OK. Elle est ambiguë, car un callback sans `return` renvoie `nil` et ne bloque pas. Reformulée en « ne répond jamais ».
- **Détecteur de vitesse** : le conseil de remettre `dernieresPositions[player]` à `nil` « juste après » une téléportation était impossible à suivre depuis un autre script. Précisé.
- Accord avec la passe 1 sur ces points, revérifiés à la source : `LoadCharacterAsync` et la dépréciation de `LoadCharacter`, la date et le caractère opt-in de Server Authority, la limite de 1 000 octets, et le motif de réapparition.

**Erreurs restantes non corrigées :**

- Aucune dans le module 03.
- Le motif de réapparition (attente du Workspace puis une image) et les tests 1 à 3 de la leçon 05 n'ont pas été exécutés dans Studio. Le raisonnement s'appuie sur l'ordre de chargement documenté (référence `Player`).
- Hors périmètre, à signaler au vérificateur du module 04 :
  - `module-04/01-leaderstats.mdx` (vers la ligne 212) dit « si, au module 3, tu avais rangé l'étape dans un attribut ou une variable ». Or le module 3 utilise déjà `leaderstats.Etape` : c'est le module 2 qui utilisait un attribut.
  - Le script Checkpoints de cette même leçon ne reprend pas la vérification de distance du module 3. C'est une régression de sécurité par rapport au script Progression.

## Module 04

### Passe 1 — [rapport détaillé](verification/module-04-passe-1.md)

Environ 110 affirmations vérifiées, dont 13 corrigées ou reformulées et 1 supprimée. Les sources sont les pages create.roblox.com, lues via WebFetch et via leur source officielle `github.com/Roblox/creator-docs` (branche main, octobre 2026), plus les annonces du staff sur le DevForum.
Quiz : 32 questions de quiz et 15 questions d'examen vérifiées. Toutes sont correctes ; 1 explication a été reformulée (tween / plateforme). Les 6 `trouve-le-bug` ont un bug unique, et les numéros de ligne sont exacts.
Code : `node scripts/verifier-luau.mjs 04` analyse 26 extraits. Il reste 9 extraits avec des diagnostics, tous attendus : `require` de modules définis dans d'autres blocs, extraits de quiz volontairement partiels (`UnknownGlobal`), bug volontaire de `TweenInfo.new` dans le quiz 06, et `script.Parent` typé `Instance?`. Une correction de logique a été faite dans le code DataStore (voir plus bas).
Build : `bash scripts/build-verrou.sh` → code de sortie 0.

**Erreurs restantes non corrigées :**

- Aucune erreur factuelle connue.
- Remarque : `curl` renvoie 502 sur certaines grosses pages de référence (DataModel, Players, AnimationTrack). Elles s'ouvrent bien via WebFetch (vérifié), donc les liens sont conservés.
- Non testé dans Roblox Studio (pas d'instance connectée). Le comportement exact de la sauvegarde `PlayerRemoving` au Stop d'un test Studio n'est pas documenté par Roblox : la leçon le présente comme non garanti.

### Passe 2 — [rapport détaillé](verification/module-04-passe-2.md)

Environ 120 éléments vérifiés : affirmations, code, quiz, examen et liens. 16 ont été corrigés ou reformulés, 1 extrait de code a été supprimé (le Script « Checkpoints » affaibli de la leçon 01), et 2 sources ont été ajoutées.

Sources : pages create.roblox.com, lues dans leur source officielle `github.com/Roblox/creator-docs` (branche main ; dernier commit de error-codes-and-limits.md le 2026-10-06, de leaderboards.md le 2026-09-23) et par WebFetch, plus les annonces du staff sur le DevForum.

Quiz : 32 questions de quiz et 15 d'examen revérifiées. Elles sont toutes justes. Les 6 `trouve-le-bug` ont chacun un seul bug, aux bons numéros de ligne. Une question d'examen a été précisée (Q2 : on y signale que la vérification de distance a été retirée de l'extrait).

Code : `node scripts/verifier-luau.mjs 04` analyse 26 extraits, dont 10 ont des diagnostics. Ils sont tous attendus :
- `require` de modules définis dans d'autres blocs ;
- extraits de quiz volontairement partiels ;
- bug volontaire de `TweenInfo.new` ;
- `script.Parent` typé `Instance?` ;
- le nouvel extrait partiel de « Progression » (leçon 01), qui utilise `obtenirEtape`, `dossierCheckpoints` et `Workspace` du script du module 3.

Le ModuleScript `DonneesJoueurs` passe sans aucun diagnostic.

Build : `bash scripts/build-verrou.sh` se termine avec le code 0.

**Désaccords avec la passe précédente (tranchés par la passe 2) :**

- La passe 1 affirmait que les noms étaient cohérents et que le code combiné était vérifié, mais elle n'a pas confronté le module 04 au **code réel du module 03**. Il y avait un double dossier `leaderstats` (Progression + Leaderstats / GestionJoueurs). Pendant la sauvegarde, `FindFirstChild("leaderstats")` pouvait lire le dossier resté à 0 : **risque de perte de pièces et d'étapes**. S'y ajoutaient une régression de sécurité sur les checkpoints (plus de contrôle de distance) et deux Scripts « Boutique » possibles (double débit), sans cooldown ni vérification de longueur.
- La passe 1 n'a pas vu que `Sauvegarder` renvoyait `true` quand l'écriture était annulée.
- La passe 1 présentait le Device Simulator comme étant en bêta. L'annonce du staff du 16/10/2026 le déclare sorti de bêta.
- La passe 1 avait validé le BoutonBoutique en bas à gauche. Or la documentation réserve cette zone aux contrôles tactiles.

**Erreurs restantes non corrigées :**

- Aucune erreur factuelle connue dans le module 04.
- Rien n'a été testé dans un Roblox Studio réel (aucune instance connectée). En particulier, le placement au checkpoint après un chargement tardif (`placerAuCheckpoint`) n'a été vérifié qu'en raisonnant sur la documentation de `CharacterAdded`.

## Module 05

### Passe 1 — [rapport détaillé](verification/module-05-passe-1.md)

72 affirmations ou éléments vérifiés sur les sources (27 pages ouvertes le 2026-10-24), dont 49 OK, 21 corrigés ou reformulés et 2 supprimés (remplacés). Quiz : 25 questions de leçon et 13 d'examen relues. 3 explications corrigées, 1 option corrigée, 1 extrait `trouve-le-bug` harmonisé (noms de champs) ; tous les numéros de ligne des 8 `trouve-le-bug` sont justes, avec un seul bug par extrait. Code : `verifier-luau 05` donne 16 extraits et 3 avec diagnostics, tous attendus (`Unknown require` sur des extraits isolés, `FunctionUnused` sur une fonction d'intégration). 3 corrections d'intégration avec les modules 3 et 4. Build `scripts/build-verrou.sh` : code 0.

Toutes les affirmations de « recette » restantes sont soit sourcées par la doc Roblox ou NN/g, soit présentées explicitement comme des choix de la formation : les 60 secondes, la formule action → récompense → progression, les zones, les prix, l'absence de perte à la mort, les séries sans punition, le rythme mensuel conseillé à un créateur seul et la checklist du spawn. Aucune statistique non sourcée ne reste.

**Erreurs restantes non corrigées :**

Aucune. À surveiller, sans que ce soit une erreur :
- Les chiffres datés (testeurs invités, badges, conditions des notifications) changent souvent ; ils sont formulés « au moment de la rédaction (octobre 2026) ».
- Le module 2, leçon 6 (création de `Config`), n'est pas encore écrit. La leçon 3 suppose un `Config` en table avec `return Config`, à harmoniser si le module 2 diffère.
- Les diagnostics `verifier-luau` restants sont attendus : `Unknown require` ×4 sur des extraits isolés, et `FunctionUnused` sur `verifierObjectifDuJour`, fonction d'intégration à appeler depuis le script « Pieces ».

### Passe 2 — [rapport détaillé](verification/module-05-passe-2.md)

68 affirmations ou éléments revérifiés sur 24 pages sources rouvertes le 2026-10-24 (create.roblox.com/docs, about.roblox.com, nngroup.com, deceptive.design). 57 OK, 9 corrigés ou reformulés, 0 supprimé. Quiz : 25 questions de leçon et 13 d'examen relues une à une (bonnes réponses, distracteurs, explications, numéros de ligne des 7 `trouve-le-bug`). 3 questions modifiées : leçon 3 Q4 (nouvelle configuration), leçon 5 Q3 (« 5 au plus »), examen Q9 (noms des champs alignés sur le module 2, mêmes numéros de ligne). Code : alignement complet sur `Config` du module 2 (leçon 6) et sur les scripts des modules 3 et 4, plus un conflit de nom corrigé (`Recompenses` → `RecompensesEtapes`). `verifier-luau 05` : 17 extraits, 4 avec diagnostics, tous attendus (`Unknown require` sur des extraits isolés, `ImportUnused` sur l'extrait d'intégration de 2 lignes, `FunctionUnused` sur `verifierObjectifDuJour`, à appeler depuis le script « Pieces »). Le module `Config` complet de la leçon 3 ne produit aucun diagnostic. Build `scripts/build-verrou.sh` : code 0.

Équilibre « secrets de succès » : chaque conseil reste sourcé ou signalé une seule fois comme choix de la formation. Deux conseils non sourcés sont maintenant signalés (badge « qui raconte quelque chose » : « Notre conseil » ; moment de l'opt-in : rattaché à la phrase officielle). Je n'ai pas ajouté d'autres précautions, pour garder le texte lisible.

**Désaccords avec la passe précédente (tranchés par la passe 2) :**

- **Cohérence avec le module 2** : la passe 1 avait laissé `Config.Zones` « à harmoniser » parce que la leçon 2.6 n'existait pas encore. Elle existe maintenant et définit `Config.Niveaux` avec d'autres noms de champs et d'autres bornes (12 étapes). Tout le module 05 a été réaligné (leçons 3 et 4, quiz, examen).
- **Conflit de nom `Recompenses`** : non détecté en passe 1. Le Script « Recompenses » du module 3 (leçon 3) rendait le `require` fragile.
- **Prix de la boutique** : la passe 1 a validé des prix (30 / 120 / 400) et des objets (« Traînée blanche »…) qui n'existent pas dans le `Catalogue` du module 4 (Nuage 25, Soleil 75, Aurore 150). Corrigé.
- **Bloc Config présenté comme « ajoute ces champs » mais écrit comme un module complet** : jugé OK en passe 1 ; dangereux pour un débutant, donc corrigé.
- **Définition de J1** : validée en passe 1 sans l'horizon d'un jour. Corrigée.
- **Placement de `verifierObjectifDuJour`** : la passe 1 indiquait où l'appeler, mais pas où la définir (au-dessus de `preparerPiece`). Précisé.

**Erreurs restantes non corrigées :**

Aucune. À surveiller, sans que ce soit une erreur :
- Les chiffres datés (testeurs invités, badges, notifications, seuil des Experiments) changent souvent ; ils sont formulés « au moment de la rédaction (octobre 2026) ».
- Si le module 2 (leçon 6) ou le Catalogue du module 4 change de noms de champs, de bornes d'étapes ou de prix, il faudra refaire le calcul de la leçon 3 (65 pièces de bonus, prix 25 / 75 / 150), la question 4 de la leçon 3 et la question 9 de l'examen.
- Le code n'a pas pu être exécuté dans Studio (aucune instance connectée au MCP Roblox Studio). Sa logique a été vérifiée à la main (`recompensePourEtape` pour les étapes 1 à 13, calendrier d'achat), en plus de l'analyse statique.

## Module 06

### Passe 1 — [rapport détaillé](verification/module-06-passe-1.md)

Environ 150 affirmations vérifiées (6 leçons + examen), 22 corrigées / reformulées / précisées, 0 supprimée ; 6 sources ajoutées, 0 lien mort (32 liens testés : HTTP 200, les 3 pages de référence API qui renvoyaient 502 à curl ont été ouvertes avec succès via WebFetch).
Quiz : 30 questions de leçon + 14 d’examen relues ; 0 bonne réponse fausse ; 1 question de leçon (L4 Q5) et 1 question d’examen (Q1) reformulées ; les numéros de ligne des 5 `trouve-le-bug` ont été vérifiés (un seul bug chacun).
Code : `node scripts/verifier-luau.mjs 06` → 16 extraits, 0 diagnostic (avant et après corrections). Correction importante de fiabilité dans `ProcessReceipt` (L3). Build `bash scripts/build-verrou.sh` : OK (code 0).

Méthode : sources lues directement dans le dépôt officiel `Roblox/creator-docs` (commit 4e795e6 du 2026-10-24, source de create.roblox.com/docs, YAML de la référence API compris), pages en ligne vérifiées (WebFetch/curl), help center (curl avec User-Agent navigateur), DevForum.

**Erreurs restantes non corrigées :**

- Aucune erreur factuelle connue.
- Limite assumée (documentée dans L3) : le `ProcessReceipt` « enregistrer puis donner » peut perdre un octroi si le joueur quitte pendant l’`UpdateAsync` ou si le serveur plante avant la sauvegarde suivante ; il ne double jamais un octroi. L’approche officielle « même sauvegarde » est citée comme solution robuste.
- Comportement des achats simulés dans Studio pour les Developer Products : seule source officielle = annonce staff de 2016 ; présenté comme tel, avec conseil de vérifier dans le jeu publié.
- Libellé exact de l’écran de mise en prix d’un pass dans le Creator Hub : non documenté (octobre 2026) ; formulation prudente.

### Passe 2 — [rapport détaillé](verification/module-06-passe-2.md)

Environ 160 affirmations revérifiées (6 leçons + examen), 14 corrigées / reformulées / précisées, 1 supprimée (DataStore séparé `AchatsTraites_v1`, remplacé) ; 1 question de quiz ajoutée (L3), 1 question d’examen réécrite (Q5) ; 32 liens testés (29 en HTTP 200 avec curl ; les 3 pages de référence API qui renvoient 502 à curl ont été confirmées par WebFetch et par leur YAML source).
Quiz : 31 questions de leçon + 14 d’examen relues ; 0 bonne réponse fausse trouvée ; lignes des `trouve-le-bug` revérifiées (L2 Q4 ligne 6 ; L3 Q6 ligne 9 ; L4 Q4 ligne 9 ; L5 Q4 ligne 8 ; examen Q3 ligne 7 et Q7 ligne 7), un seul bug chacun.
Code : `node scripts/verifier-luau.mjs 06` → 16 extraits, 1 diagnostic acceptable (`Unknown require: game/ServerScriptService/DonneesJoueurs` : `require` du ModuleScript du module 4, même cas que module 05 avec `Config`). Build `bash scripts/build-verrou.sh` : OK (code 0).

Méthode : sources lues dans le dépôt officiel `Roblox/creator-docs` (commit 4e795e6 du 2026-10-24, source de create.roblox.com/docs, YAML de la référence API compris), help center via l’API Zendesk publique (`/api/v2/help_center/.../articles/ID.json`), DevForum via JSON Discourse, WebFetch / curl pour les pages en ligne.

**Désaccords avec la passe précédente (tranchés par la passe 2) :**

1. **ProcessReceipt** : la passe 1 jugeait le motif « DataStore séparé, enregistrer puis donner » acceptable avec une limite connue de perte d’octroi. Désaccord : le guide officiel décrit un motif sans cette perte, accessible au niveau du cours puisque le module 4 fournit déjà une table de données en mémoire et une fonction de sauvegarde qui renvoie un booléen. Code réécrit, limite retirée ; seule reste la dépendance au verrouillage de session (documentée).
2. **Creator Rewards** : la passe 1 a validé « trois premiers jeux qu’il lance » ; les exemples officiels montrent que le décompte porte sur les trois premiers jeux où le joueur atteint 10 minutes. Reformulé.
3. **Suppression d’un abonnement** : validée « OK » par la passe 1, alors que la page officielle se contredit pour les abonnements en Robux (« Refunds are not available for subscriptions in Robux »). Reformulé prudemment.
4. **Pass promu** : la passe 1 n’a pas signalé que le pass promu est offert gratuitement aux acheteurs de Robux, information indispensable pour décider de l’activer.

**Erreurs restantes non corrigées :**

- Aucune erreur factuelle connue.
- Diagnostic `Unknown require` dans L3 (require du ModuleScript `DonneesJoueurs` du module 4) : attendu pour un extrait qui dépend d’un autre script.
- Cas très rare lié au module 4 (non modifiable ici) : `DonneesJoueurs.Sauvegarder` renvoie `true` quand l’écriture est annulée pour cause de version de données plus récente ; le module 4 pourrait renvoyer `false` dans ce cas (à transmettre au responsable du module 4).
- Studio et Developer Products : seule source officielle = annonce staff de 2016 ; présentée comme telle.

## Module 07

### Passe 1 — [rapport détaillé](verification/module-07-passe-1.md)

94 affirmations vérifiées (5 leçons + examen), 11 corrigées ou reformulées, 0 supprimée ; quiz : 25 questions de leçon et 14 questions d'examen vérifiées, toutes justes (bonnes réponses, distracteurs et numéros de ligne des 5 `trouve-le-bug` contrôlés) ; code : `node scripts/verifier-luau.mjs 07` donne 10 extraits analysés et 1 seul diagnostic, le bug volontaire du quiz 5 de la leçon 03 (`player.GetJoinData()`). Build `bash scripts/build-verrou.sh` : code de sortie 0.

Méthode : pages create.roblox.com ouvertes avec WebFetch, et sources YAML/MD du dépôt officiel github.com/Roblox/creator-docs (branche main) téléchargées pour l'API (`GroupService.yaml`, `Player.yaml`, `DataModel.yaml`, `CloseReason.yaml`, `production/promotion/index.md`, `experience-icons.md`, `thumbnails.md`).

**Erreurs restantes non corrigées :**

- Aucune erreur factuelle connue.
- Point à surveiller : les règles Kids & Select (seuil d'entrée, remboursement des frais de 1 000 Robux, examen accéléré) ont changé quatre fois entre juin et août 2026, et les deux pages officielles se contredisent encore sur le remboursement. Les deux versions sont citées dans la leçon 01, qui renvoie aux pages officielles. À revérifier à chaque mise à jour du site.
- La suppression effective des murs de communauté (prévue début 2026) n'est confirmée que par des médias tiers : la leçon garde la formulation « annoncée ».

### Passe 2 — [rapport détaillé](verification/module-07-passe-2.md)

102 affirmations vérifiées (5 leçons + examen), 14 corrigées ou reformulées, 0 supprimée ; quiz : 25 questions de leçon et 14 questions d'examen revérifiées (3 `trouve-le-bug` de leçon + 2 d'examen, numéros de ligne recomptés), 4 questions ou explications corrigées ; code : `node scripts/verifier-luau.mjs 07` → 10 extraits, 1 seul diagnostic = bug volontaire du quiz 5 de la leçon 03 (`player.GetJoinData()`). Correction de fond sur l'extrait de sauvegarde de la leçon 04 (incohérent avec le module 4). Build `bash scripts/build-verrou.sh` : code de sortie 0.

Méthode : pages create.roblox.com ouvertes avec WebFetch (live) et sources Markdown/YAML du dépôt officiel github.com/Roblox/creator-docs (main, `kids-and-select.md` avec `last_updated: 2026-10-23`) ; annonces DevForum ouvertes une à une (auteur, date, mises à jour en tête de post) ; about.roblox.com/community-standards ouvert ; chaque lien de `<Sources>` testé (curl + WebFetch).

**Désaccords avec la passe précédente (tranchés par la passe 2) :**

1. **Leçon 04, extrait de sauvegarde** : la passe 1 l'a jugé « OK ». Il ne compilait pas d'erreur, mais il contredisait le module 4 (fonction déjà existante, clés en majuscules contre minuscules, inventaire en liste au lieu de table `id → true`). Un élève qui suit le défi aurait créé des champs en double. Réécrit (voir tableau).
2. **« La communauté Roblox touche tous tes joueurs »** (leçon 05 et question d'examen) : la passe 1 n'a pas relevé la contradiction avec sa propre ligne « forums 13+ ». Corrigé.
3. **Content May Vary** : la passe 1 a validé « répondre seulement à la première question » ; il faut répondre **Non**. Précisé.
4. **Attribution 30 jours** : validée sans nuance par la passe 1 ; elle dépend du type de joueur. Précisé.

**Erreurs restantes non corrigées :**

- Aucune erreur factuelle connue.
- À surveiller : règles Kids & Select (seuil, frais, remboursement) et divergence entre les deux pages officielles sur le remboursement des 1 000 Robux ; accès des comptes Kids aux pages de communauté non documenté officiellement (la leçon ne s'appuie plus dessus).
- Hors périmètre (module 04) : `completer()` ne met pas à jour le champ `version` d'une ancienne sauvegarde, ce qui rend la protection `ancienne.version > VERSION_DONNEES` inopérante après une hausse de `VERSION_DONNEES`. À signaler au vérificateur du module 04 ; la leçon 07 ne demande pas d'augmenter `VERSION_DONNEES`.

## Module 08

### Passe 1 — [rapport détaillé](verification/module-08-passe-1.md)

94 affirmations / éléments vérifiés, 11 corrigés ou reformulés (dont 3 compléments : méthode `GetPlayerSegmentsAsync`, effet des anciens joueurs sur l’entonnoir de progression, 2 sources en leçon 02), 0 supprimé.
Quiz : 25 questions de leçon + 15 questions d’examen vérifiées (bonnes réponses, distracteurs, numéros de ligne des 4 `trouve-le-bug`, calculs) ; 1 question d’examen corrigée (base de calcul de la D1).
Code : `node scripts/verifier-luau.mjs 08` → 9 extraits, 0 diagnostic (avant et après corrections) ; relecture d’exécution du script `AnalytiqueObby` (Script serveur dans ServerScriptService, `pcall`, `RunService:IsStudio()`, pas d’API dépréciée, cohérent avec la convention `leaderstats.Etape` = dernier checkpoint validé, 0 au départ, +1 seulement ; vérifié dans les modules 03, 04 et 06) ; 1 délai d’attente rallongé.
Build : `bash scripts/build-verrou.sh` → code de sortie 0.

Méthode : pages lues en direct avec WebFetch sur create.roblox.com (event-types, référence AnalyticsService, economy-events, retention, analytics-dashboard, creator-rewards). Pour le texte exact, j’ai aussi lu les fichiers sources officiels de ces pages et des autres (dépôt `Roblox/creator-docs`, branche `main`, `content/en-us/...`, y compris `AnalyticsService.yaml`). Toutes les URL de `<Sources>` répondent en 200, sauf la référence AnalyticsService : 502 avec curl (protection anti-robots), mais elle s’affiche avec WebFetch.

**Erreurs restantes non corrigées :**

Aucune erreur restante.
- Contradiction de la doc officielle sur le nombre de monnaies (5 ou 10) : elle ne peut pas être tranchée ; la leçon la signale en citant les deux pages.
- La référence AnalyticsService renvoie 502 à curl, mais elle s’affiche avec WebFetch : le lien est conservé.
- Hors module (pour info) : le module 00 (leçon 04) parle d’un tableau « Home Recommendations » du Creator Dashboard, à vérifier par son vérificateur.

### Passe 2 — [rapport détaillé](verification/module-08-passe-2.md)

102 affirmations ou éléments vérifiés, 9 corrigés ou reformulés, 0 supprimé.
Quiz : 25 questions de leçon et 15 questions d’examen revérifiées une par une (bonne réponse, distracteurs, explication, calculs). Les 5 `trouve-le-bug` ont été recomptés ligne par ligne (leçon 04 : ligne 6 ; leçon 05 : ligne 8 ; examen : lignes 5, 7 et 6). Résultat : tous corrects, aucun changement.
Code : `node scripts/verifier-luau.mjs 08` → 9 extraits, 0 diagnostic (avant et après corrections). J’ai relu l’exécution réelle du script `AnalytiqueObby` et du ModuleScript `AnalytiqueEconomie` en les comparant au code des modules 03, 04 et 06 (`creerLeaderstats`, `avecTentatives`, script d’achat de la leçon Inventaire, Developer Product « passer l’étape » qui fait `etape.Value += 1`). J’ai corrigé 4 points de cohérence ou de clarté.
Build : `bash scripts/build-verrou.sh` → code de sortie 0.

Méthode : pour avoir le texte exact, j’ai téléchargé les fichiers sources officiels du dépôt `Roblox/creator-docs` (branche `main` ; derniers commits : `production/analytics` le 2026-10-14, `AnalyticsService.yaml` le 2026-10-21). Il y en a 20 pages `.md`, plus `AnalyticsService.yaml` et 3 enums. J’ai aussi lu en direct avec WebFetch les pages creator-rewards et la référence AnalyticsService. Les 23 URL de `<Sources>` ont été testées : 22 répondent 200. La référence AnalyticsService répond 502 à curl (protection anti-robots), mais WebFetch l’affiche bien. Deux WebSearch : pas de « DAU/MAU » ni de « stickiness » sur create.roblox.com, et aucune définition officielle d’« Average Playtime ».

**Désaccords avec la passe précédente (tranchés par la passe 2) :**

1. **Daily Engagement Rewards (leçon 04)** : la correction de la passe 1 (« trois premières expériences où il atteint ces 10 minutes ») est contredite par l’exemple 2 de la page officielle. La règle compatible avec les deux exemples, c’est l’ordre de **lancement** parmi les expériences où le joueur a passé au moins 10 minutes. C’est corrigé.
2. **Average Playtime (leçon 03)** : la passe 1 l’a validé comme le « temps par joueur toutes sessions confondues ». Aucune page officielle ne donne cette définition : j’ai reformulé.
3. **Délai d’attente des leaderstats (leçon 05)** : la passe 1 l’a passé à 30 s. J’ai aligné le délai sur les 60 s utilisées ailleurs dans le module 04, pour la cohérence du fil rouge.
4. **Commentaire du script (leçon 05)** : la passe 1 a reformulé la prose (un saut de valeur est une simple précaution), mais pas le commentaire du code, qui affirmait encore que le chargement fait sauter la valeur. Corrigé.
5. **Script d’achat (leçon 05)** : la passe 1 n’a pas relevé que le script d’achat de référence (avec inventaire) se trouve au module 04, pas au module 03. Corrigé.

**Erreurs restantes non corrigées :**

Aucune.
- La documentation officielle se contredit sur le nombre de monnaies (5 ou 10) et sur le nom de la page des événements personnalisés (« Custom » ou « Explore »). Je ne peux pas trancher : les deux points sont signalés honnêtement dans la leçon.
- La référence AnalyticsService répond 502 à curl, mais WebFetch l’affiche : le lien est conservé.

## Module 09

### Passe 1 — [rapport détaillé](verification/module-09-passe-1.md)

Environ 110 affirmations vérifiées. 15 modifiées (8 corrigées, 7 reformulées), 0 supprimée, 1 source ajoutée.
Quiz : 29 questions de leçon et 14 questions d’examen relues. 2 corrigées : une question ambiguë (L3, `ModelStreamingMode`) et un `trouve-le-bug` qui contenait un second bug (L2).
Code : `node scripts/verifier-luau.mjs 09` → 20 extraits, 0 diagnostic (avant et après corrections). Exécution réelle relue : emplacements, streaming, `nil`, fuites et réplication sont corrects. Les trois avant/après de la leçon 4 sont de vraies optimisations, sans micro-optimisation mythique :
- passage du `Heartbeat` à `Changed` ;
- suppression d’un `SetAttribute` répliqué à chaque image et d’une fuite de connexion ;
- rotation décorative déplacée côté client, donc sans réplication.

Build : `bash scripts/build-verrou.sh` → code de sortie 0.

Méthode : comparaison avec le dépôt officiel `github.com/Roblox/creator-docs` (commit du 2026-10-24) et l’historique de ses commits (API GitHub), puis contrôle des pages en ligne sur create.roblox.com et de l’annonce DevForum. Tous les liens `<Sources>` répondent 200. Les grandes pages de référence (BasePart, Player, Workspace…) renvoient 502 à curl mais s’ouvrent normalement avec un navigateur ou WebFetch.

**Erreurs restantes non corrigées :**

- Valeur affichée par défaut de `Workspace.StreamingIntegrityMode` dans un nouveau place : invérifiable par la doc, et aucun Studio n’était connecté pour la vérifier. La leçon reste honnête (« `Default`, comportement non détaillé ») et recommande de régler le mode explicitement. À confirmer dans Studio lors d’une prochaine passe.
- Divergence persistante dans la doc officielle sur le raccourci du MicroProfiler (Ctrl+F6 contre Ctrl+Alt+F6) : les deux sont donnés dans la leçon, avec leur contexte.

### Passe 2 — [rapport détaillé](verification/module-09-passe-2.md)

Environ 120 affirmations vérifiées, 11 éléments modifiés (6 corrigés, 4 reformulés, 1 supprimé). Aucune autre suppression.

Quiz : 29 questions de leçon et 14 questions d’examen relues. 1 `trouve-le-bug` d’examen corrigé : il contenait un second défaut (le personnage déjà présent au lancement n’était pas géré). Les 7 `trouve-le-bug` ont maintenant un seul bug chacun, et leurs numéros de ligne ont été recomptés.

Code : `node scripts/verifier-luau.mjs 09` donnait 0 diagnostic avant correction et en donne 2 après, tous deux acceptables. Il s’agit de `Unknown require: game/ReplicatedStorage/Modules/Config` : ce ModuleScript du fil rouge (module 2) est absent de l’environnement d’analyse, et le module 2 utilise le même motif.

L’analyse statique ne voyait pas un vrai bug d’exécution, corrigé : en leçon 4, `CompteurPieces` était typé `TextLabel`, alors qu’au module 4 c’est un `Frame` qui contient le TextLabel `Texte`. Ce code aurait planté à l’exécution.

Build : `bash scripts/build-verrou.sh` se termine avec le code 0.

Méthode : j’ai téléchargé les sources brutes du dépôt officiel `github.com/Roblox/creator-docs` (branche `main`, 39 fichiers de guides et de référence YAML) et consulté l’historique des commits par l’API GitHub. J’ai aussi ouvert l’annonce DevForum avec WebFetch et relu les modules 02, 03, 04 et 06 pour vérifier la cohérence. Aucun Studio n’était connecté au MCP Roblox (`list_roblox_studios` renvoie une liste vide), donc rien n’a été exécuté dans Studio.

**Désaccords avec la passe précédente (tranchés par la passe 2) :**

- **Chiffres Android (≈ 65 %, 2–4 Go)** : la passe 1 les avait ajoutés avec la mention « au moment de la rédaction ». Je les retire. La page ne date pas ses données, et la formulation « 65 % of a typical game's player base » est ambiguë : elle se lisait facilement comme une part des joueurs mobiles. C’est exactement le cas que la mission demande de supprimer.
- **« Code avant/après… OK », « Exécution réelle relue »** : la passe 1 n’a pas vu que `CompteurPieces` est un `Frame` au module 4. Le cast `:: TextLabel` masquait l’erreur à l’analyse statique, mais le code plantait à l’exécution. Elle n’a pas vu non plus que le `BoutonBoutique` du module 4 se trouve dans la zone réservée au joystick.
- **Script de rotation de la leçon 2** : la passe 1 l’a validé, mais il ne correspondait pas au fil rouge (le module 2 utilise `PiecesTournantes` avec `while true` / `task.wait()` et `Config`). Il est maintenant aligné.
- **`trouve-le-bug` de l’examen (« Died »)** : validé par la passe 1, mais il contenait un second défaut (personnage déjà présent au lancement). Corrigé.
- **Colonne « Défaut » du tableau de streaming** : la passe 1 a gardé `LowMemory` et `Legacy` comme valeurs par défaut affichées. Les enums ont pourtant tous un item `Default`. J’ai reformulé en « comportement par défaut », sans affirmer ce qu’affiche la fenêtre Properties.

**Erreurs restantes non corrigées :**

- Ce qu’affiche réellement la fenêtre Properties de Studio pour `StreamingIntegrityMode`, `StreamOutBehavior` et `ModelStreamingBehavior` dans un nouveau place n’a pas pu être vérifié : aucun Studio n’était connecté. La leçon ne l’affirme plus et recommande de régler ces propriétés explicitement.
- La documentation officielle reste incohérente sur le raccourci du MicroProfiler (Ctrl+F6 ou Ctrl+Alt+F6). La leçon donne les deux.
- Le module 4 (hors périmètre) décrit toujours la position en bas à gauche de `BoutonBoutique` comme « facile à atteindre avec le pouce ». Le module 9 corrige ce point pour le mobile ; il serait bon d’harmoniser le module 4 lors de sa propre vérification.

## Module 10

### Passe 1 — [rapport détaillé](verification/module-10-passe-1.md)

94 affirmations ou éléments vérifiés (faits, liens, questions de quiz et d’examen, extraits de code), 24 corrigés ou reformulés, 0 supprimé.
Quiz : 25 questions de leçon et 14 questions d’examen relues. 1 question réécrite (L03 Q3 : les règles « gameplay inexistant / Free UGC! / voix off » ne s’appliquent explicitement qu’aux **vidéos** de la page du jeu). 3 explications précisées (L03 Q1, L04 Q4, L05 Q2). Les 5 `trouve-le-bug` ont un seul bug et les bons numéros de ligne.
Code : `verifier-luau 10` = 12 extraits, 0 diagnostic (avant et après corrections). Le `BindToClose` de la leçon 02 a été rendu robuste et le format du `Catalogue` aligné sur le module 4.
Liens internes : 42 liens `/modules/XX/slug/`, tous présents dans PLAN.md et existants. Liens externes : tous testés (HTTP 200 ou redirection vers une page valide). Les URL redirigées ont été remplacées par l’URL finale.
Build : `bash scripts/build-verrou.sh` → code de sortie 0.

Méthode : pages officielles consultées en direct (curl ou WebFetch) et dans le dépôt source officiel de la documentation `github.com/Roblox/creator-docs`, cloné le 2026-10-24 (dernier commit le 2026-10-24). Les fils DevForum ont été vérifiés via l’API JSON du forum (auteur, statut staff, date, contenu).

**Erreurs restantes non corrigées :**

- Aucune dans le module 10.
- Signalement hors périmètre (module 4, non modifié) : le `BindToClose` de `module-04/02-datastores-fiables.mdx` utilise un compteur local à `BindToClose`. Il n’attend donc pas les sauvegardes déjà lancées par `PlayerRemoving` quand les joueurs sont déconnectés à la fermeture. Il vaudrait la peine d’appliquer la même correction qu’en module 10, leçon 02 (compteur global incrémenté dans la fonction de sauvegarde).
- Point à surveiller : les chiffres de l’évaluation Kids/Select. La doc (250 parties uniques en 60 jours) diverge des annonces DevForum (500 pour entrer, 25 pour rester), et les conditions de remboursement des frais de 1 000 Robux diffèrent entre `publish-games-and-places` et `kids-and-select`. La leçon cite la doc actuelle avec une formulation prudente et ne donne pas les conditions de remboursement.

### Passe 2 — [rapport détaillé](verification/module-10-passe-2.md)

Environ 105 éléments vérifiés (affirmations factuelles, chiffres, 25 questions de leçon, 14 questions d'examen, 12 extraits Luau, 42 liens internes, 53 liens externes). 21 corrigés ou reformulés, 0 supprimé.
Quiz : 1 question corrigée (L02 Q2 : l'extrait `trouve-le-bug` contenait un 2e bug), 3 explications précisées (L03 Q3, L04 Q3, examen Q13). Examen : extrait de la Q4 aligné sur la structure de données du module 4 (numéros de ligne inchangés).
Code : `node scripts/verifier-luau.mjs 10` → 12 extraits, 0 diagnostic (avant et après corrections). Deux extraits corrigés de la leçon 02 réalignés sur le module 4 (`DonneesJoueurs`, `Catalogue`, structure `etape`/`pieces`/`inventaire`/`equipe`).
Build : `bash scripts/build-verrou.sh` → code de sortie 0.

Méthode : sources officielles relues dans le dépôt `github.com/Roblox/creator-docs` (dernier commit du 2026-10-24, fichiers `.md` et `.yaml` de la référence API), pages en ligne testées (HTTP), Community Standards via WebFetch, fils DevForum via l'API JSON (auteur, titre « Roblox Staff », date, contenu, réponse acceptée), catégories DevForum via `categories.json`. Rien n'a été repris de la passe 1 sans revérification.

**Désaccords avec la passe précédente (tranchés par la passe 2) :**

- **L02 Q2 (`trouve-le-bug`)** : la passe 1 l'a jugée correcte. Or la ligne `Etape.Value = tonumber(checkpoint.Name)` était un 2e bug selon le module 3 lui-même (recul d'étape en retombant, sauts d'étapes acceptés, `nil` possible). Corrigé.
- **Cohérence avec le module 4** : la passe 1 a seulement aligné le format du `Catalogue`. Les deux codes corrigés de L02 restaient incohérents avec le module 4 : données par défaut `{ Etape = 1, Pieces = 0 }` (autres noms de champs, étape de départ différente) écrites dans le **même** DataStore avec la **même** clé que `DonneesJoueurs`, et inventaire de la boutique dans une table locale jamais sauvegardée. Les deux ont été réalignés, avec un avertissement pour ne pas doubler les scripts du module 4.
- **Fil DevForum « Datastore completely wiped »** : la passe 1 a gardé « des fils… décrivent exactement ce scénario ». Un seul fil est cité, et c'est la réponse acceptée (pas l'auteur) qui donne cette explication. Reformulé.
- **Social Links** : la passe 1 l'a validé sans la précision officielle « liens sur la page du jeu, jamais dans le jeu ». Pour la question de l'examen (panneau dans le jeu), c'est justement le point clé. Ajouté.
- **L04 Q3** : l'explication citait le « chat » comme réponse du questionnaire. Ce n'est pas une catégorie (il s'agit de « Social hangout »). Corrigé.
- **Formulations non sourcées** restées après la passe 1 (« erreur numéro un », « la cause la plus fréquente », « aussi fréquentes l'une que l'autre », « beaucoup de créateurs… », « ce qui est rare ») : reformulées.

**Erreurs restantes non corrigées :**

- Aucune dans le module 10.
- À surveiller : les chiffres de l'évaluation Kids/Select (doc : 250 parties uniques en 60 jours ; DevForum : 500 HEP pour entrer, 25 pour rester) et les conditions de remboursement des 1 000 Robux (25 HEP pendant 60 jours sur `publish-games-and-places`, 90 jours sur `kids-and-select`) divergent entre sources officielles. La leçon cite la doc avec une mise en garde et ne donne pas les conditions de remboursement : c'est volontaire.
- Hors périmètre : le module 4 a été modifié pendant cette vérification (`SauvegarderTout` avec compteur global). Le signalement de la passe 1 sur le `BindToClose` du module 4 semble donc traité. Non vérifié en détail, car ce module n'est pas le mien.
