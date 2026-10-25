# Relecture finale RL1 — module 02, leçons 01 à 05, fin du module 01 et accueil

Relecteur : RL1 (relecteur final, personnage « débutant total »). Date : 2026-10-25. Aucun commit.

## Résumé

Fichiers relus dans l'ordre du parcours :

1. `src/pages/index.astro` (textes seulement)
2. `src/content/lecons/module-01/05-premier-niveau-et-publication.mdx` (transition « La suite » et encadré « Avec Claude Code »)
3. `src/content/lecons/module-02/01-panorama-des-outils-ia.mdx`
4. `src/content/lecons/module-02/02-installer-un-workflow-pro.mdx`
5. `src/content/lecons/module-02/03-claude-code-de-a-a-z.mdx`
6. `src/content/lecons/module-02/04-l-art-du-prompt-precis.mdx`
7. `src/content/lecons/module-02/05-decouper-un-gros-projet.mdx`

Types de corrections : définitions courtes de termes jamais expliqués (prompt, terminal, Rojo, Git, commit, dépôt, refactorisation, sous-agent, hook) ; étapes manquantes ou implicites (où cliquer, à quoi ressemble le résultat, comment sortir d'un écran bloquant) ; phrases d'orientation dans les leçons longues (« Par où commencer ? », « Si tu es pressé ») ; liens entre leçons qui manquaient (prompt du module 1 jamais repris, étape 7 de la leçon 2 jamais rappelée) ; explication de la façon de remplir le gabarit de prompt.

Aucun fait, chiffre, prix, nom d'API ni texte de commande n'a été modifié. Aucun code Luau modifié (le code de la leçon 05 reste identique à `exemples/lave-montante/`). Une seule option de commande a été **ajoutée** comme alternative (`git revert --no-edit HEAD`), vérifiée avec `git revert -h` (git 2.52.0) et documentée sur git-scm.com/docs/git-revert (déjà en source).

Structure : les sept fichiers ont tous objectifs, Astuce, Erreur, Resume, Sources (rien à corriger). Règle d'âge (décision 38) présente avec la formulation commune dans l'accueil (FAQ prix et âge), 01/05 (Info « Avant le module 2 »), 02/01, 02/03, et rappelée en 02/02 étape 7. Quiz relus : énoncés compréhensibles et répondables à partir de la leçon, pas de piège injuste ; aucun changement.

Build : `bash scripts/build-verrou.sh` → code de sortie 0 (80 pages indexées).

## Tests rejoués sous Windows (`C:\tmp\phase-ia-rl1\ObbyDesNuages`)

| Étape (leçon 02/02 ou 02/03) | Commande | Résultat obtenu | Conforme à la leçon ? |
|---|---|---|---|
| Étape 0, dossier de travail | `pwd` (PowerShell) | `Path` / `----` / `C:\tmp\phase-ia-rl1\ObbyDesNuages` | Oui, mais l'en-tête `Path` n'était pas annoncé : ajouté |
| Étape 3 | `rokit init`, 3 × `rokit add …`, `rokit list` | `rokit.toml` créé ; liste rojo 7.7.1, selene 0.32.0, stylua 2.6.0 (même tableau que la leçon) | Oui |
| Étape 4 | `rojo init` | `Creating new Place project 'ObbyDesNuages'`, `Initialized empty Git repository in …`, `Created project successfully.` ; crée aussi `README.md`, `.gitignore`, `src/client`, `src/server`, `src/shared` | Oui |
| Étape 4 | `Remove-Item -Recurse …` puis `mkdir …` (PowerShell) | aucune demande de confirmation ; tableaux `Mode / LastWriteTime / Name` | Oui |
| Étape 5 | `selene src` (avec `selene.toml`, `luau_recent.yml`) | `Results:` `0 errors` `0 warnings` `0 parse errors` | Oui |
| Étape 5 | `stylua --check src` sur un fichier CRLF | diff sur des lignes « identiques » ; après `stylua src`, plus rien | Oui (correspond à l'Erreur CRLF) |
| Étape 4 | `rojo serve` (5 s) | `Rojo server listening:` / `Address: localhost` / `Port: 34872` / `Visit http://localhost:34872/…` | Oui |
| Étape 6 | `git add .` puis `git commit -m …` | avertissements `CRLF will be replaced by LF`, puis `[master (root-commit) 3fb3054] …`, `8 files changed` | Oui (le dossier `src` vide n'est pas commité : cohérent avec l'Erreur « dossiers vides ») |
| Étape 7 | `claude mcp add --help`, `claude mcp remove --help` | options `-s, --scope` (local, user, project) présentes | Oui (non exécuté pour ne pas modifier la configuration utilisateur) |
| 02/03 | `claude doctor` | se termine par `No installation issues found.` puis le conseil sur `/doctor` | Oui |

Non rejoué : installeurs (Rokit, Claude Code, Git), `rojo plugin install`, tout ce qui touche Studio, session interactive de Claude Code (interdit).

## Corrections notables

| Leçon | Problème | Correction |
|---|---|---|
| Accueil | « prompts précis » employé dans le héros sans définition | « (les demandes écrites que tu leur envoies) » ajouté |
| Accueil | Bénéfice 1 : « projet Rojo versionné avec Git, un fichier CLAUDE.md » incompréhensible pour un débutant | Reformulé : « le code de ton jeu en fichiers (Rojo) avec leur historique de versions (Git), une fiche CLAUDE.md qui décrit ton jeu à l'IA » |
| 01/05 | L'encadré dit de garder le prompt « pour le module 2, où il fera partie de tes premiers essais », mais aucune leçon du module 2 n'y renvoyait | Texte précisé (« À la leçon 3, une fois Claude Code installé… ») et renvoi ajouté en 02/03 (deuxième essai sans risque) |
| 02/01 | Terminal, Rojo, Git, commit, dépôt, selene, StyLua utilisés dès les tableaux sans définition (prompt et terminal définis seulement au module 0) | Info « Quelques mots que tu vas croiser » (lexique de 5 puces) après l'intro |
| 02/01 | « refactorisation », « sous-agent relecteur », « hooks », « data model » (quiz) non expliqués | Définitions d'une demi-phrase ajoutées |
| 02/02 | Leçon de 90 min sans indication d'ordre ; l'étape 7 demande Claude Code (leçon 3) | Paragraphe « Par où commencer ? » : étapes 0-6, puis 7 après la leçon 3, sections finales facultatives |
| 02/02 | Résultat de `pwd` sous Windows non décrit (`Path` / tirets) | Forme du résultat ajoutée |
| 02/02 | VS Code : menus en anglais sans équivalent français ; bouton de création du dossier ; raccourci `Ctrl`+`` ` `` souvent inopérant sur clavier AZERTY | Équivalent français des menus, bouton « Nouveau dossier », note « passe par le menu » |
| 02/02 | Mac : rien prévu si `xcode-select --install` répond que les outils sont déjà là | Phrase ajoutée |
| 02/02 | Adresse e-mail Git : un mineur ne sait pas s'il doit donner la sienne | Précision : Git ne vérifie pas l'adresse ; l'exemple fonctionne si le projet n'est pas publié |
| 02/02 | « efface tout son contenu » sans geste ; fichiers de configuration créés par erreur dans `src` (clic droit sur le dossier) | `Ctrl`+`A` puis `Suppr` ; clic droit dans la zone vide de l'explorateur, pas sur `src` |
| 02/02 | « connecte Rojo à une copie du place » sans dire comment l'obtenir ni l'ouvrir | Deuxième copie avec Save to File As…, ouverture par le menu File (libellé exact non confirmé sur une page officielle, donc non cité) |
| 02/02 | « Lance **Play** » alors que le module 1 parle du mode **Test** et du bouton **Play** | « Lance un test (mode Test, bouton Play, module 1, leçon 4) » |
| 02/02 | Aucun recours si `git commit` échoue faute d'identité | Phrase sur `Author identity unknown` → refaire les `git config` |
| 02/02 | « redémarre Claude Code » sans dire comment | `/exit` puis relancer `claude` |
| 02/02 | Défi : `git diff HEAD~1` peut ouvrir le paginateur (`:` en bas) dans le petit terminal de VS Code : débutant bloqué | « appuie sur `q` pour en sortir » |
| 02/03 | Leçon longue sans minimum indiqué | « Si tu es pressé » : installation, premier lancement, CLAUDE.md, permissions avant les leçons 4-5 ; skills, sous-agent, hook avant le module 3 |
| 02/03 | « Quand il a fini » : le débutant ne sait pas reconnaître la fin d'un installeur muet | Retour de l'invite `PS C:\Users\TonNom>` (Windows) ou `%` (Mac) |
| 02/03 | Premier lancement : choix du type de compte et questions de configuration non mentionnés (la doc parle de « login prompt » avec « 3rd-party platform » et de « first-launch setup ») | Choisir le compte Claude avec abonnement ; garder le choix proposé en cas de doute ; le mode actif s'affiche en bas |
| 02/03 | Création de `.claude/skills/verifier/SKILL.md` : dossiers imbriqués, geste inconnu du débutant | Astuce VS Code : New File puis `skills/verifier/SKILL.md` |
| 02/03 | `git revert HEAD` ouvre un éditeur (Vim par défaut avec Git for Windows) : débutant bloqué | `:wq` puis Entrée, ou alternative `git revert --no-edit HEAD` |
| 02/03 | Rien ne rappelle de revenir faire l'étape 7 (MCP) de la leçon 2 | Point 5 ajouté au Défi |
| 02/04 | Message central : le gabarit utilise des parenthèses comme zones à remplir, sans le dire | « remplace le texte entre parenthèses… et supprime les parenthèses » |
| 02/04 | Les huit exemples sont pleins de termes vus aux modules 3-5, et citent des fichiers absents du projet : risque de les envoyer tels quels | Info « Tu ne comprends pas encore tous les mots ? C'est normal » (regarder ce qu'apporte chaque rubrique ; ne pas envoyer ces prompts maintenant) |
| 02/04 | Défi : le prompt écrit peut dépendre de scripts que le projet n'a pas encore | Phrase : le garder pour plus tard (leaderstats construites au module 5) |
| 02/05 | Leçon de 960 lignes ; code Luau complet face à un élève qui ne connaît pas encore Luau | « Si tu es pressé » (méthode + tâche 6) et « pas d'inquiétude si tu ne comprends pas chaque ligne » |
| 02/05 | Étape 0 : « Crée un projet Rojo… (leçon 2) » trop elliptique : quel dossier ? quelles étapes ? quel place ? | Dossier `LaveMontante` à côté de `ObbyDesNuages`, refaire les étapes 3 à 6 de la leçon 2, nouveau place Baseplate (module 1, leçon 1) |
| 02/05 | « Crée aussi les dossiers vides » sans méthode | Renvoi à l'étape 4 de la leçon 2 (supprimer les dossiers d'exemple, pas de `StarterCharacterScripts`) |

## Points de blocage pour un débutant

Corrigés (voir le tableau) : paginateur de `git diff` ; éditeur Vim de `git revert` ; fichiers de configuration créés dans `src` ; copie du place pour le premier essai Rojo ; reconnaître la fin des installeurs ; premier lancement de Claude Code (type de compte) ; création de sous-dossiers `.claude/…` ; étape 7 MCP jamais rappelée ; prompt du module 1 jamais repris ; projet Lave Montante mal amorcé ; gabarit de prompt sans mode d'emploi.

Non corrigés (laissés tels quels, faute de source ou hors périmètre) :

- **Installeur de Claude Code** : la leçon ne montre pas le texte affiché à la fin de l'installation (la documentation dit seulement qu'il n'y a pas de progression). Remplacé par un repère sûr (retour de l'invite).
- **Écrans du premier lancement de Claude Code** (thème, sécurité, réglage du terminal) : impossibles à vérifier sans session interactive et non décrits dans la documentation officielle ; seule une phrase générique a été ajoutée.
- **Fenêtre « Sync changes » du plugin Rojo, menus de l'Assistant (Manage MCP Servers, Quick connect)** : non vérifiables sans Studio ; laissés tels que vérifiés en passe 2.
- **Commande d'ouverture d'un fichier local dans Studio** : libellé « Open from File… » trouvé seulement sur un wiki communautaire ; non cité.

## Points signalés non corrigés

1. **02/05, code de référence de `GestionRounds`** : le commentaire `-- Construits à la main dans Studio (voir le README)` renvoie au README de `exemples/lave-montante/`, que l'élève de la leçon ne voit pas. Non modifié, car le code de la leçon doit rester identique à `exemples/lave-montante/`. Si l'on change ce commentaire, il faut le changer aux deux endroits (par exemple « voir l'étape 0 de la leçon »).
2. **02/05, commentaire de `ReglesRound.estSousLaLave`** : il parle de « HumanoidRootPart » alors que `GestionRounds` passe la `PrimaryPart` du personnage (c'est la même Part pour un personnage standard). Exact, mais peut troubler ; même contrainte d'identité avec `exemples/`.
3. **02/02, raccourci du terminal intégré de VS Code sur clavier AZERTY** : je n'ai pas trouvé de source officielle donnant la touche exacte ; la leçon renvoie maintenant au menu, ce qui marche partout.
4. **Longueur** : 02/02, 02/03 et 02/05 restent très longues (90, 90 et 75 min) ; aucune suppression faite (consigne), seulement des repères d'orientation.

## Fichiers modifiés

- `src/pages/index.astro` (2 textes ; fins de ligne CRLF d'origine conservées)
- `src/content/lecons/module-01/05-premier-niveau-et-publication.mdx` (1 phrase de l'encadré)
- `src/content/lecons/module-02/01-panorama-des-outils-ia.mdx`
- `src/content/lecons/module-02/02-installer-un-workflow-pro.mdx`
- `src/content/lecons/module-02/03-claude-code-de-a-a-z.mdx`
- `src/content/lecons/module-02/04-l-art-du-prompt-precis.mdx`
- `src/content/lecons/module-02/05-decouper-un-gros-projet.mdx` (texte seulement, aucun bloc de code)

Sources consultées pour les ajouts : https://code.claude.com/docs/en/quickstart et https://code.claude.com/docs/en/authentication (écran de connexion, « 3rd-party platform », « first-launch setup », `Login successful`), `git revert -h` (git 2.52.0) et https://git-scm.com/docs/git-revert (`--no-edit`), sorties réelles des commandes listées plus haut.
