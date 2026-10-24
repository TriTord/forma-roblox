# Relecture finale : modules 00 à 03 et pages du site

Relecture faite le 24/10/2026 en me mettant à la place d’un élève débutant de 13 à 16 ans, dans l’ordre du parcours.

## Résumé

- **Relu en entier** : 21 leçons (00/01 à 03/05) avec leurs quiz, les 4 examens (`module-00.yaml` à `module-03.yaml`), les textes de `src/pages/index.astro` (héro, bénéfices, programme, fil rouge, public, engagement, FAQ, appel à l’action), `src/data/modules.ts` (titres, descriptions, objectifs, badges), `src/pages/programme.astro`, `src/pages/progression.astro` et `src/pages/404.astro`.
- **Constat général** : le contenu était déjà très propre. La structure est respectée partout (objectifs, explications, code commenté, au moins une `<Astuce>` et une `<Erreur>`, `<Resume>`, `<Sources>`). Le tutoiement est constant et le ton reste honnête, sans promesse de revenus. La typographie est cohérente : apostrophes courbes et guillemets « » dans le texte. Les seules apostrophes droites restantes sont dans des messages d’erreur anglais cités tels quels, ce qui est voulu.
- **Environ 45 corrections**, toutes ponctuelles :
  - environ 15 **termes techniques définis à leur première apparition** ;
  - 3 **ajouts pour que les questions de code des quiz et de l’examen du module 0 soient justes** (dans 00/01) ;
  - 6 **erreurs de cohérence** (nom d’objet, renvoi, genre d’un mot, fonctionnement annoncé) ;
  - une dizaine de **corrections de langue et de typographie** (raccourcis clavier, accords, tournures) ;
  - une dizaine de **retouches de textes sur les pages et dans `modules.ts`**.
- **Non modifiés** : aucun fait, chiffre ni nom d’API, aucune logique de code Luau, aucune structure de page. Sur les pages et dans `modules.ts`, seules des chaînes de texte ont changé. Seul un commentaire de code a été corrigé (« le SpawnLocation » devient « la SpawnLocation »).
- `bash scripts/build-verrou.sh` passe (code de sortie 0, 69 pages indexées).

## Corrections notables

| Leçon / fichier | Problème | Correction |
|---|---|---|
| 00/01 Bienvenue | Le quiz (`..` au lieu de `+`) et deux questions de l’examen 00 (`=` / `==`, `"Players"`) supposent des notions de Luau que la leçon n’expliquait pas : ces questions étaient injustes pour un débutant. | Deux phrases ajoutées après l’aperçu de code : `..` colle des textes (le `+` est réservé aux nombres) et `==` compare (un seul `=` donne une valeur). |
| 00/02 Roblox pour les créateurs | Le titre « Marketplace et expériences » contredisait la règle posée trois paragraphes plus haut (« jeu » dans le texte courant), et il comparait mal les deux métiers. | « Jeux et objets d’avatar : deux métiers différents » (aucun lien ne pointait vers l’ancienne ancre, vérifié). |
| 00/03 Mindset | « onboarding » n’était pas expliqué. | « (l’accueil des nouveaux joueurs) ». |
| 00/04 Découverte | « rétention » et « impressions » apparaissaient sans définition. | Définitions courtes à leur première apparition : la part des joueurs qui reviennent ; une fois où ton jeu est affiché à un joueur. |
| 00/05 Projet fil rouge | Le résumé citait deux fois `Pieces` dans la même liste (le dossier et la statistique). « Les toucher fait perdre le personnage » était maladroit. « lag » n’était pas expliqué. | Le résumé distingue les dossiers et les statistiques. « les toucher élimine le personnage ». « lag (ralentissements) ». |
| Examen 00 | Une mauvaise réponse proposait « un abonnement Premium obligatoire », alors que Premium n’est plus vendu (remplacé par Roblox Plus, voir 00/02). | « Un abonnement payant à Roblox obligatoire ». |
| 01/01 Installer Studio | « Parts ancrées » apparaissait avant d’avoir été expliqué. | « (les blocs fixés sur place, que tu découvriras dans la leçon suivante) ». |
| 01/02 Construire avec des Parts | Faute d’accord : « ce que toi (ou tes groupes) as publié ». | « ce que tu as publié, toi ou tes groupes ». |
| 01/03 Organiser son jeu | « classe de base » n’était pas expliqué. | « (le « modèle » commun à tous les objets) ». |
| 01/04 Tester son jeu | La phrase sur le Device Simulator était trop dense (une date, un statut et un menu dans la même phrase). | Coupée en deux phrases, sans changer les faits. |
| 02/01 Premier script | Raccourcis écrits « F5 » et « **Ctrl+K** », alors que le reste du site écrit `F5` et `Ctrl`+`K`. Le texte parlait d’un « menu des fenêtres » vague. Le bouton d’insertion s’appelait « + », alors que le module 1 l’appelle « ⊕ ». | Raccourcis harmonisés, « menu **Window** », bouton « ⊕ » partout. |
| 02/02 Variables et conditions | L’intro disait que la kill brick « renvoie au dernier checkpoint », alors que la leçon précise que ce retour n’arrive qu’en leçon 5. On lisait « au SpawnLocation » alors que le site dit « la SpawnLocation », et « Ctrl+D » au lieu de `Ctrl`+`D`. | « le bloc piégé qui élimine le joueur qui le touche », « sur la SpawnLocation », `Ctrl`+`D`. |
| 02/03 Boucles et fonctions | Les « radians » n’étaient jamais expliqués. | Une phrase ajoutée : un tour complet (360°) vaut environ 6,28 radians. |
| 02/04 Tables | « fonction récursive » n’était pas expliqué. | « une fonction qui s’appelle elle-même pour chaque sous-table ». |
| 02/05 Événements | L’abréviation « PV » n’était pas expliquée (leçon et quiz). On lisait « le SpawnLocation » dans un commentaire et « SpawnLocations » au pluriel, alors que le site laisse ce nom invariable. | « PV (points de vie) » ; accord du commentaire ; « plusieurs SpawnLocation ». |
| 03/01 Modèle client/serveur | « un kill brick … gérés » : erreur de genre. `IntValue` apparaissait sans définition, alors que le quiz s’appuie dessus. | « une kill brick … gérées » ; définition courte d’`IntValue` avec un renvoi au module 4. |
| 03/02 RemoteEvents | `:: RemoteEvent` apparaissait partout sans rappel de ce qu’il fait. « spammer » est familier. | Rappel en une phrase (annotation de type vue en 02/06, sans effet sur l’exécution) ; « envoyer la demande en rafale ». |
| 03/03 RemoteFunctions | « callback » et « lever une erreur » étaient utilisés sans définition. | « (ce genre de fonction s’appelle un **callback**, ou « fonction de rappel ») » ; « (son code plante) ». |
| 03/04 Ne jamais faire confiance au client | « ProximityPrompts », « UTF-8 », « heuristiques » et « journaliser » n’étaient pas expliqués. | Une courte explication pour chacun (seul le commentaire UTF-8 est dans un bloc de code, et sa logique est inchangée). |
| 03/05 Sécuriser l’obby | Le texte annonçait que le script de démonstration achète « la traînée azur », alors que le code achète `TrailNuage` (« Traînée Nuage »), et ce nom n’existe nulle part dans le catalogue. « PNJ » n’était pas expliqué. | « achète la Traînée Nuage » ; « PNJ, personnage non joueur ». |
| `index.astro` | « code commenté ligne par ligne » promettait trop. « Studio n’existe pas sur téléphone ni sur tablette » est incorrect. « part de zéro : qu’est-ce qu’une variable… » était maladroit. « produit « passer une étape » » ne correspondait pas au nom utilisé en 00/05 (« passer l’étape »). Une virgule était en trop avant « et ». | « code commenté et expliqué pas à pas » ; « n’existe ni sur téléphone ni sur tablette » ; « ce qu’est une variable… » ; « achat « passer l’étape » » ; virgule retirée. |
| `modules.ts` | Apostrophes droites dans trois textes affichés, alors que le reste du site utilise des apostrophes courbes. « exploits » et « instrumenter ton jeu » sont du jargon. L’objectif du module 3 oubliait la boutique (sécurisée en 03/05). La description du module 1 ne disait pas que le niveau est publié. | Apostrophes courbes ; « contre la triche (les exploits) » ; « ajouter tes propres mesures dans ton jeu » ; « Sécuriser les checkpoints, les pièces et la boutique de ton obby » ; « …de ton obby, publié en privé ». |
| `programme.astro`, `progression.astro`, `404.astro` | Aucun problème trouvé : textes clairs, tutoiement, honnêtes sur le stockage local. | Aucune modification. |

## Points signalés non corrigés

- **Messages d’erreur de Luau cités dans les quiz et examens** : « attempt to call missing method 'cacher' of table » (examen 02), « attempt to index nil with 'valeur' » (quiz 02/06) et « Requested module was required recursively » (02/06). Ils ont l’air justes, mais je n’ai pas pu les comparer au texte exact affiché par Studio. À vérifier dans Studio si quelqu’un veut une citation mot pour mot.
- **FAQ de l’accueil** : « la grande majorité des jeux publiés sur Roblox ne génèrent que peu ou pas de revenus » n’a pas de source sur la page. Les chiffres DevEx de 00/02 vont dans ce sens (environ 42 000 participants à DevEx parmi des millions de créateurs), mais ils ne parlent pas des jeux. La formulation est prudente et ne promet rien : je l’ai laissée telle quelle. Une source pourrait être ajoutée.
- **Questions de code du module 3 qui utilisent des notions pas encore vues** : le quiz de 03/01 utilise `UserInputService` et `leaderstats`, qui arrivent au module 4. La question reste faisable, puisqu’elle porte sur la réplication et que l’explication le dit, mais un élève peut être surpris. Je n’ai pas touché au code du quiz.
- **Défi de 01/02** : il demande de lancer un test avec `F5` et `Shift`+`F5` avant que la leçon 4 explique les modes de test. Ce n’est pas bloquant (la consigne est complète), mais 01/04 pourrait rappeler que l’élève a déjà essayé.
- **Titre de l’accueil, « Crée un jeu Roblox qui marche »** : « qui marche » veut dire « qui fonctionne », et le reste de la page s’engage clairement à ne promettre aucun succès. Je l’ai laissé, car c’est le nom de la formation. À reformuler seulement si l’on craint qu’on le lise comme « qui a du succès ».
- **Examen 02** : il n’a pas de champ `description`, donc le site affiche le texte automatique. Ce champ est facultatif et les trois autres examens en ont un. À ajouter si l’on veut la même présentation partout.

## Suivi par le chef d'orchestre (2026-10-24)
- FAQ de l'accueil (« la plupart des jeux rapportent peu ou rien », non sourcé) : **remplacée** par les chiffres officiels publiés par Roblox (septembre 2026 : un peu plus de 42 000 participants DevEx parmi des millions de créateurs qui monétisent, médiane ≈ 1 500 $ sur 12 mois), avec renvoi vers la leçon 00/02 qui les source. « Méthode éprouvée » → « méthode claire » ; « la plupart des jeux restent confidentiels » → « des millions de créateurs publient des jeux ».
- Quiz 03/01 (`UserInputService`, `leaderstats`) : **conservé**. La question porte sur la réplication client → serveur, la seule notion à connaître ; `leaderstats.Pieces` est déjà utilisé au module 03 (leçon 05) et les deux lignes concernées sont lisibles sans connaître ces API.
- Messages d'erreur Luau cités dans les quiz : testés avec l'interpréteur `luau` par la passe 2 du module 02 (22 comportements, dont tous les messages d'erreur cités).
