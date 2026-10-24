# Relecture finale : modules 07, 08, 09 et 10

Date : 2026-10-24. Relecture faite du point de vue d'un élève débutant de 13 à 16 ans, en suivant le brief `C:\tmp\BRIEF_RELECTEUR.md`.

## Résumé

- **Relu en entier** : 20 leçons avec leurs quiz, et 4 examens (`module-07.yaml` à `module-10.yaml`).
- **Volume** : environ 55 corrections, toutes de forme. Aucun fait, chiffre, nom d'API ni logique Luau n'a été modifié.
- **Types de corrections** :
  - termes techniques définis à leur première apparition ;
  - paragraphes ou cases de checklist trop denses découpés en listes ;
  - consignes rendues reproductibles (où exécuter un script, où régler une propriété) ;
  - exemples chiffrés ajoutés dans le module 08 ;
  - quelques fautes de grammaire et répétitions corrigées.
- **Examens** : aucun n'a été modifié. Les numéros de ligne cités dans tous les `trouve-le-bug` ont été vérifiés, et chaque extrait ne contient qu'un seul bug.
- **Corrigé final `projet-reference/`** : un `grep` sur `src/` montre qu'il n'était mentionné nulle part. J'ai ajouté une `<Astuce>` dans la leçon 10-05 (section « Le bilan ») qui signale le dossier `projet-reference` du dépôt et son `README.md`.
- **Build** : `bash scripts/build-verrou.sh` passe (code de sortie 0).

## Corrections notables

| Leçon | Problème | Correction |
|---|---|---|
| 07-01 | « Rétrograder » et « métadonnées » non expliqués | Définitions courtes ajoutées à la première apparition |
| 07-01 | Phrases sur la découverte et sur l'évaluation « tous âges » trop longues | Chacune coupée en deux phrases, sans changer le sens |
| 07-02 | « Lieu de départ » flou, « test A/B » non défini | Précisé : la *place* marquée d'une étoile ; définition du test A/B ajoutée |
| 07-03 | « Onboarding » et « enchères » non expliqués, une répétition (« se perdent ») | Explications ajoutées et phrase reformulée |
| 07-04 | Défi ambigu (« 3 si tu as suivi le parcours sans le bonus… ») | Reformulé à partir du champ bonus `victoires` (cohérence vérifiée avec les modules 04 et 06) ; `DateTime` défini |
| 07-05 | Phrase sur les « murs » (*Walls*) mal construite ; « bots » et « dépréciées » non expliqués | Phrase reformulée, termes expliqués, paragraphe découpé |
| 08-01 | Play through rate sans exemple concret ; sigle DAU non développé | Exemple chiffré ajouté (40 ÷ 1 000 = 4 %) et sigle développé (*daily active users*) |
| 08-01 | « 5 points » de rétention sans calcul ; « session » et « FPS » non définis | Calcul ajouté (1 sur 20 = 5 %), « session » défini, (FPS) ajouté |
| 08-02 | Encadré `<Info>` sur les définitions trop dense | Coupé en deux paragraphes |
| 08-04 | Encadré sur les Daily Engagement Rewards : une seule phrase de quatre lignes pleine de chiffres | Transformé en liste de trois puces, avec les mêmes faits et les mêmes chiffres |
| 08-05 | Consigne d'intégration dans le Script « Boutique » en une seule phrase | Deux étapes numérotées ; « SKU » expliqué dans le tableau des limites |
| 09-01 | Jeu de mots sur « pouces » ambigu ; « ping » non défini ; paragraphe Device Simulator trop dense | Taille donnée en cm, « ping » défini, paragraphe coupé en deux |
| 09-02 | « ms », « frame time », « worker threads » et « meshes » non expliqués ; expression « Spoiler » | Termes expliqués ; « Spoiler » remplacé par « Petite annonce » |
| 09-03 | « Streaming » non traduit, unité « studs » non rappelée, `CameraMaxZoomDistance` sans emplacement | Traduction et rappel ajoutés ; précision « propriété de `StarterPlayer` » |
| 09-04 | « Voxels » et « niveau 4 » de qualité graphique non expliqués | Explications ajoutées (petits cubes ; réglage Graphics Quality) |
| 09-05 | Script d'audit sans mode d'emploi ; une case de checklist contenait deux vérifications | Commentaire « colle-le dans la Command Bar » ajouté ; case coupée en deux |
| 10-01 | « Kill bricks » non défini à cet endroit | Ajouté : « (parties qui tuent au toucher) » |
| 10-02 | Commentaire de code en franglais (« ajout du trail ») | Remplacé par « ajout de la traînée » (commentaire seulement) |
| 10-03 | Faute de syntaxe : « un jeu que seul toi as testé » | Corrigé en « que toi seul as testé » |
| 10-04 | Cases écrites en jargon (`InvokeClient`, streaming « fait consciemment », `ProcessReceipt`, `ArePaidRandomItemsRestricted`) | Chaque case dit maintenant en mots simples ce qu'il faut vérifier, puis donne le nom de l'API entre parenthèses |
| 10-04 | Cases non actionnables (« Tu sais que Studio utilise… ») et cases trop longues (Social Links, label Content May Vary) | Reformulées comme des vérifications à faire, et découpées en deux cases |
| 10-04 | Exigences « tous âges » et processus d'évaluation écrits en un bloc | Liste à puces et étapes numérotées, avec les mêmes chiffres et les mêmes dates |
| 10-04 | L'examen 10 interroge sur l'icône (i) des objets aléatoires payants, mais le module 10 n'en parlait pas | Précision ajoutée dans la case Monétisation, reprise de la leçon 06-05, avec un lien vers cette leçon |
| 10-05 | Pas de mention du corrigé final ; fin de formation un peu sèche | `<Astuce>` « Le corrigé complet de l'Obby des Nuages » ajoutée (dossier `projet-reference`) ; phrase finale d'encouragement ajoutée |

## Points signalés non corrigés

- **Quiz 09-04, `trouve-le-bug` sur `CanTouch`** : l'option correcte affirme qu'une connexion à `Touched` sur une partie avec `CanTouch = false` provoque une erreur. Cette affirmation a été validée par les deux passes de vérification, mais c'est le seul énoncé du module qui annonce une erreur à l'exécution. Il faudrait la confirmer dans Studio.
- **Chemins de menus du Creator Dashboard** (07-01, 07-04, 10-04 : « Publish settings › Content rating », « Configurations › Server management », « Engagement › Events & Updates »…) : ils sont déjà datés « au moment de la rédaction », mais ils changent souvent. À revérifier avant la mise en ligne.
- **Faits datés du module 09** : le Device Simulator est sorti de bêta en septembre 2026, alors que sa documentation porte encore la mention « beta ». Le raccourci du MicroProfiler diffère selon les pages (Ctrl+F6 ou Ctrl+Alt+F6). Ces deux points sont formulés avec prudence, mais il faudra les revoir à chaque mise à jour.
- **07-01** : le tableau Audience Reach est placé dans le « Creator Hub », alors que le reste du module parle du « Creator Dashboard ». La différence est légère et je ne l'ai pas changée sans source.
- **07-05** : l'encadré `<Info>` sur le cache de `GetRolesInGroupAsync` reste long. Je l'ai laissé tel quel pour ne rien perdre.
- **08-05** : la limite du nombre de monnaies d'économie diffère selon les pages de la documentation (5 ou 10). La leçon le signale déjà et conseille de s'en tenir à 5. Ce point est à suivre.
- **Annotations de type** `:: TextButton`, `:: RemoteEvent`… : elles ne sont pas réexpliquées dans les modules 07 à 10. Je n'ai rien changé, car l'élève les a déjà vues dans les modules 02 à 06.

## Suivi par le chef d'orchestre (2026-10-24)
- Quiz 09-04 (`CanTouch = false` + `Touched`) : **confirmé** par la référence officielle `BasePart.CanTouch` (dépôt Roblox/creator-docs, `reference/engine/classes/BasePart.yaml`) : « If `false`, touch events cannot be set up for the part and attempting to do so will throw an error. » Aucune correction nécessaire.
- Device Simulator (sorti de bêta, annonce staff du 16/10/2026) et raccourci MicroProfiler (Ctrl+F6, ancien Ctrl+Alt+F6) : revérifiés par les deux passes du module 09 et par la passe de cohérence ; formulés avec date.
