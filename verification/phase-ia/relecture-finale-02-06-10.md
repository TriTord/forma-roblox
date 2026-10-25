# Relecture finale RL2 — module 02, leçons 06 à 10 et examen

Date : 2026-10-25. Relecteur : RL2 (débutant total, d'après `docs/briefs/BRIEF_PHASE_IA_RELECTEUR.md`).

## Résumé

- **Fichiers relus en entier, dans l'ordre du parcours** : `06-relire-et-tester-le-code-de-l-ia.mdx`, `07-deboguer-avec-l-ia.mdx`, `08-les-pieges-de-l-ia.mdx`, `09-l-ia-au-dela-du-code.mdx`, `10-bibliotheque-de-prompts.mdx`, `src/content/examens/module-02.yaml`. Leçons 01 à 05 lues en diagonale (titres, résumés, passages sur le terminal, Git, `!`, `@`, Lune et Lave Montante) pour savoir ce que l'élève connaît déjà en arrivant.
- **Types de corrections** : termes jamais expliqués (mode strict, branche, dépôt distant, data models, maillage, PBR, armature/skinning, PNJ, 2SV, RDC, spam d'un RemoteEvent) ; étapes manquantes (créer `tests/…` et `.luaurc` dans VS Code, ce qu'il faut remplacer dans quatre prompts) ; explication des crochets à leur **première apparition** (leçon 07) et de leurs formes particulières (leçon 10) ; navigation de la bibliothèque (phrase d'orientation et tableau « Quel prompt pour quel besoin ? ») ; rappel de l'âge minimal là où l'élève est invité à utiliser Claude ; un paragraphe trop dense découpé ; genre de « place » harmonisé avec les modules 01 et 02 (« le place »).
- **Aucun** fait, chiffre, commande, nom d'API, code Luau ni texte de prompt n'a été modifié. Aucune question de quiz ni de l'examen n'a été changée (numéros de ligne des `trouve-le-bug` revérifiés un par un : tous exacts).
- `bash scripts/build-verrou.sh` : **code de sortie 0** (80 pages).

## Corrections notables

| Leçon | Problème | Correction |
|---|---|---|
| 06 | `--!strict` présenté seulement par un renvoi au module 3 : le débutant ne sait pas ce que c'est | Une phrase : le mode strict demande à luau-lsp de vérifier les types plus sévèrement |
| 06 | « les changements de ta branche Git » : le mot **branche** n'a jamais été expliqué | Définition courte (une ligne d'historique ; ton projet n'en a qu'une, `main` ou `master`) |
| 06 | « dépôt distant `origin` » non expliqué | « une copie en ligne de ton dépôt, sur GitHub par exemple » |
| 06 | `/code-review ultra` : « l'accord de l'adulte qui gère l'abonnement » laissait penser qu'un mineur utilise Claude Code sur le compte d'un adulte (décision 38) | « l'accord de la personne qui paie l'abonnement » |
| 06 | Lune et `tests/ReglesRound.spec.luau` présentés comme à créer, alors que l'élève les a déjà installés et fait créer par Claude aux tâches 3 et 6 de la leçon 5 ; aucune indication pour créer un fichier dans un nouveau dossier | Précision « si tu l'as déjà fait à la leçon 5… », « compare-le à cette version de référence », et la marche à suivre dans VS Code (New File, `tests/ReglesRound.spec.luau`, dossier créé automatiquement, comme en leçon 03) |
| 06 | Prompt « Lancer le relecteur » propre à la tâche 7 : rien ne dit quoi changer pour une autre tâche | Commentaire après le bloc (chemins, numéro de tâche, contexte utile) |
| 07 | Premier prompt du parcours avec des `[CROCHETS]`, sans explication (elle n'arrive qu'en leçon 10) | Commentaire après le prompt « Diagnostiquer une erreur » : quoi remplacer, crochets et exemple compris ; `[DEBUG]` reste |
| 07 | « data models » : jargon | « (les versions du jeu ouvertes dans Studio : Edit, Client, Server) » |
| 07 | Paragraphe `git restore` / nouveaux fichiers / `/rewind` trop dense (6 idées) | Découpé en trois paragraphes, sans rien retirer |
| 07, 06, 09 | « la place », « ta place ouverte », « une place publiée », « Ouvre la place » alors que les modules 01 et 02 disent « ton place » | Harmonisé au masculin dans mes fichiers |
| 08 | « le spam d'un remote » : jargon | « un tricheur peut envoyer la même demande des centaines de fois par seconde (le « spam » d'un RemoteEvent) » |
| 08 | « PNJ » et « codes 2SV » jamais définis | « personnage non joueur » ; « vérification en deux étapes » |
| 08 | « crée à la racine un fichier `.luaurc` » sans dire comment | Renvoi au geste de la leçon 2 (VS Code › New File, avec le point au début) |
| 09 | « maillage », « PBR », « armature R15 », « skinning », « RDC 2026 », « PNJ » non expliqués | Une définition courte à la première apparition de chacun |
| 09 | Prompts « Proposer des traductions » et « Brouillon de description » : rien ne dit où mettre le CSV exporté ni quoi remplacer | Un commentaire après chaque bloc (chemin après `@`, âge, langues ; `[NOMBRE]` et liste du contenu réel) |
| 09 | Le défi fait utiliser Claude sans rappel de l'âge minimal | Rappel : Claude réservé aux 18 ans et plus, alternatives (adulte avec son propre compte, ou brouillon écrit soi-même) |
| 10 | Page de 60 min sans phrase d'orientation ; rien ne dit qu'il faut d'abord avoir lu la leçon technique correspondante pour pouvoir vérifier le code | Paragraphe d'orientation en haut (« ne se lit pas d'une traite », lire d'abord « Comment utiliser », puis aller au besoin) + avertissement modules 3 à 10 |
| 10 | Difficile de choisir un prompt parmi 28 | Tableau « Quel prompt pour quel besoin ? » (besoin → prompts → section) |
| 10 | Crochets à choix (`[RIEN / …]`, `[OU : contre des PNJ]`, `[OU modifie …]`), crochets « COLLE … » et `[NOM]` non expliqués | Trois puces dans « Adapter les crochets » (garder une version, coller le texte exact, nom court sans espace ni accent) |
| 10 | L'encadré `<Attention>` parlait des mineurs et des Robux sans rappeler que Claude Code est réservé aux 18 ans et plus | Rappel avec la formulation commune et les alternatives ; lignes vides ajoutées autour du contenu (deux paragraphes) |

Fautes dans les prompts de la bibliothèque : aucune trouvée après lecture complète des 28 prompts (accords, ponctuation, rubriques) ; aucun texte de prompt modifié.

## Points de blocage pour un débutant

Corrigés :

- terme inconnu au moment où il sert : mode strict, branche, dépôt distant, data models, maillage, PBR, armature, skinning, PNJ, 2SV, RDC, spam ;
- créer un fichier dans un dossier qui n'existe pas (`tests/`) ou un fichier qui commence par un point (`.luaurc`) ;
- savoir quoi remplacer dans un prompt à crochets dès la leçon 07, et dans les formes à choix de la leçon 10 ;
- savoir quel prompt choisir dans la bibliothèque et quand il est trop tôt pour l'utiliser ;
- double travail en 06 (réinstaller Lune, recréer un fichier de test que Claude a déjà écrit en 05).

Non corrigés (inhérents au placement du module) :

- les exemples de la checklist en 11 points (06) et les points « À vérifier » de la bibliothèque (10) supposent de savoir lire du Luau, que l'élève apprend au module 3. Les deux leçons le disent (encadré « Tu comprendras tout aux modules 3 à 5 » en 06, nouvelle phrase d'orientation en 10) ; c'est le bon choix pédagogique, mais un débutant pur ne pourra pas vraiment appliquer la checklist avant le module 4 ;
- le tableau des outils de test (06) cite Wally, Creator Store, Open Cloud et clé d'API sans les définir : ce sont des options « plus tard », laissées telles quelles pour ne pas alourdir.

## Points signalés non corrigés

- **Genre de « place »** : le site mélange « le place » (modules 01, 02/01-02, 05/02…) et « la place » (modules 04, 05, 07, 10…). Harmonisé au masculin dans mes seuls fichiers ; une décision globale serait utile (hors de ma mission).
- **Leçon 09, deux prompts du même jeu** : « Proposer des traductions » vise des « joueurs de 8 à 16 ans », « Brouillon de description » un jeu « pour tous les âges ». Incohérence légère du public cible ; non modifiée (sémantique des prompts). Le commentaire ajouté invite l'élève à adapter l'âge.
- **Examen** : 18 questions (AUTHORING vise 10 à 15, maximum 30) ; couverture complète des leçons 01 à 10, aucune question injuste trouvée. Laissé tel quel.
- **Faits non revérifiés par moi** (déjà vérifiés en passes 1 et 2, rien ne m'a paru suspect) : raccourci `Alt+M` sous Windows, `Ctrl+G` de VS Code sur Mac, comportement de `/code-review`, limites des outils MCP. Aucune modification.
