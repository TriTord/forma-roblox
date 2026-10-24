# Notes pour les vérificateurs — Adaptateur A5 (pages du site et module 00)

Date de travail : 2026-10-24 / 2026-10-25. Aucun commit.

## Fichiers modifiés

| Fichier | Changements |
|---|---|
| `src/pages/index.astro` | Héros réécrit (méthode IA, Claude Code, « diriger, lire, vérifier ») ; carte « Ton prompt à Claude Code » au-dessus de l’extrait Luau existant ; tuile « Leçons » calculée (`lecons.length`, 68 quand le module 02 sera publié) ; **nouvelle section « La méthode »** (3 cartes Diriger / Lire / Vérifier, comparaison prompt vague / prompt précis, boutons vers le module 02 et la bibliothèque de prompts) ; bénéfices revus (IA, lecture du code ; game design et analytics fusionnés pour rester à 6) ; fil rouge (ligne Rojo/Git/CLAUDE.md à la place des plateformes animées) ; public visé ; engagement d’honnêteté ; **FAQ** (voir plus bas) ; appel à l’action. Les URL du module 02 et de la bibliothèque sont calculées depuis les collections, avec repli sur `/modules/02/` et `/modules/02/bibliotheque-de-prompts/`. |
| `src/pages/programme.astro` | Description `<meta>` calculée (`modules.length`) au lieu de « 12 » en dur ; paragraphe d’introduction sur la méthode et le module 02. La liste des modules reste générée depuis `src/data/modules.ts`. |
| `src/data/site.ts` | Champ `description` uniquement. |
| `README.md` | Ligne de présentation (méthode IA, 12 modules 0 à 11) ; « 11 modules » → « 12 modules » dans l’arborescence ; composants `AvecClaudeCode`, `Prompt` ajoutés à la liste des composants MDX. |
| `module-00/01-bienvenue.mdx` | 12 modules (0 à 11), tableau des modules renuméroté (il était resté à l’ancienne numérotation, avec « 2 · Luau de A à Z ») ; section « La méthode : diriger, lire, vérifier » (module 02, bibliothèque, exemple vague/précis, Erreur « accepter le code sans le lire ») ; structure d’une leçon (encadré Avec Claude Code, 4 types de quiz) ; sous-section « Pour piloter l’IA (à partir du module 2) » (offre payante, prix datés, configuration requise, 18 ans, adulte, formation suivable sans abonnement) ; 4 sources ajoutées ; durée 15 → 20 min. Quiz : 6 questions (Q1 corrigée « 12 », nouvelle QCM sur le rôle de l’élève). |
| `module-00/03-mindset-du-createur.mdx` | Section « Ton état d’esprit face à l’IA » (petites étapes, scope creep version IA, vérifier, ne pas tout déléguer, Astuce « le test de la phrase ») ; puce de résumé ; source best practices ; durée 20 → 22. Quiz : 6 questions (+1 QCM). |
| `module-00/05-le-projet-fil-rouge.mdx` | Carte des modules renumérotée 0 à 11 avec la ligne du module 02 (identique au tableau de PLAN.md, reformulée pour débutants) ; phrase sur l’encadré « Avec Claude Code » à partir du module 3 ; noms fixés → CLAUDE.md ; étape 1 du plan de construction (modules 1, 2, 3 à 5) ; résumé (6 puces) ; source. Quiz : 6 questions (+1 QCM « à quel module prépares-tu le projet pour Claude Code ? »). |
| `module-01/05-premier-niveau-et-publication.mdx` | Intro et mention « module 3 » complétées ; encadré `<AvecClaudeCode titre="Avec Claude Code (aperçu du module 2)">` ; section finale « La suite : scripter avec l’IA » + Info (payant, 18 ans, adulte) ; résumé (2 puces fusionnées, 1 ajoutée : 6 puces) ; 2 sources. Quiz : 7 questions (+1 `ameliore-le-prompt`). |
| `src/content/examens/module-00.yaml` | Description ; explication de la Q1 (« aucun abonnement Roblox », Claude Code payant au module 2) ; la question vrai-faux sur la progression entre appareils est **remplacée** par une `ameliore-le-prompt` (kill bricks) pour couvrir la méthode tout en restant à 15 questions (plafond 10-15 de PLAN.md). L’examen ne mentionnait ni le nombre de modules ni l’ancienne numérotation. |

Fins de ligne : chaque fichier garde celle de sa version HEAD (CRLF ou LF), pour ne pas gonfler les diffs.

## Affirmations factuelles et sources (consultées le 2026-10-25, cohérentes avec la fiche de veille du 2026-10-24)

| Affirmation | Où | Source |
|---|---|---|
| Claude Code exige un compte Pro, Max, Team, Enterprise ou Console ; l’offre gratuite ne l’inclut pas (« The free claude.ai plan does not include Claude Code access ») | accueil (FAQ), bienvenue, module 01/05 | https://code.claude.com/docs/en/setup |
| Pro : « $17 » par mois en annuel (« $200 billed up front »), « $20 if billed monthly » ; Max : « From $100 » ; Free : Claude Code « No » ; aucune date sur la page | accueil (FAQ), bienvenue | https://claude.com/pricing (relu le 2026-10-25 : identique à la veille du 24) |
| Configuration requise de Claude Code : Windows 10 1809+ / macOS 13.0+, 4 Go de RAM ou plus, connexion Internet | bienvenue | https://code.claude.com/docs/en/setup |
| « You must be at least 18 years old to use the Services » (Consumer Terms, en vigueur au 8 octobre 2025) | accueil (2 questions de la FAQ), bienvenue, module 01/05 | https://www.anthropic.com/legal/consumer-terms |
| Assistant de Studio : la page officielle ne mentionne ni prix, ni abonnement, ni gratuité ; seules limites chiffrées : 50 modèles procéduraux par fenêtre glissante de 24 h, pas de limite au nombre de discussions ; « The generated script might not function flawlessly » | accueil (FAQ : « ni prix ni abonnement, et elle publie quelques limites d’usage »), bienvenue (mention de l’Assistant) | https://create.roblox.com/docs/assistant/guide ; veille-roblox-ia.md, section « Non confirmé » (ne jamais citer de prix) |
| « Claude stops when the work looks done » ; « If you can't verify it, don't ship it » ; « The more precise your instructions, the fewer corrections you'll need » | mindset (citation exacte en anglais + traduction) | https://code.claude.com/docs/en/best-practices |
| « CLAUDE.md is a special file that Claude reads at the start of every conversation » | fil rouge (« la fiche que Claude Code lit au début de chaque session »), module 01/05 | https://code.claude.com/docs/en/best-practices |
| Chiffres DevEx de la FAQ (42 000, 1 500 $) | accueil | inchangés (phase 1, sourcés dans module-00/02) |

Le prompt précis de l’accueil (pièces) reprend les valeurs du corrigé `projet-reference/src/ServerScriptService/Pieces.server.luau` (`Config.VALEUR_PIECE`, réapparition au bout de 10 s, vérification de distance, leaderstats créées par `GestionJoueurs.server.luau`).

## Tests réels

- `bash scripts/build-verrou.sh` : code de sortie 0 (astro check sans erreur ni avertissement sur mes fichiers, 86 pages, Pagefind OK). Lancé deux fois, la seconde après les dernières retouches.
- Lecture du texte rendu de `dist/index.html` (extraction du texte de `<main>`) : 12 modules, 58 leçons publiées à ce jour (les leçons du module 02 ne sont pas encore écrites), FAQ complète, liens « bibliothèque de prompts » → `/modules/02/bibliotheque-de-prompts/`, module 02 → `/modules/02/`.
- `dist/modules/01/premier-niveau-et-publication/index.html` : l’encadré « Avec Claude Code (aperçu du module 2) » et son bouton « Copier » sont rendus, la question `ameliore-le-prompt` aussi.
- Pas de code Luau nouveau (`verifier-luau` non nécessaire : l’extrait de l’accueil et celui de la leçon 01/05 sont inchangés).

## Décisions

1. **Encadré du module 01/05** : la leçon est de la construction à la main, l’élève n’a pas encore installé Claude Code. J’ai mis un prompt **complet** au format du brief, mais pour le seul « système » de la leçon qui s’y prête : la commande Command Bar qui liste les Parts non ancrées de `Workspace.Plateformes`. Le prompt décrit exactement le code de la leçon (`GetService`, `FindFirstChild`, `GetDescendants`, `IsA("BasePart")`, `not objet.Anchored`, `GetFullName`, « Vérification terminée »), le titre de l’encadré précise « aperçu du module 2 » et le texte dit de le garder pour le module 2. Les 5 puces « À vérifier » renvoient aux notions de la leçon (dont le piège du quiz `trouve-le-bug`). Rubriques omises : Ce qui existe déjà, Sécurité (sans objet : rien n’est modifié, rien ne passe par le réseau).
2. **Âge et mineurs — appliqué selon la décision 38 du chef d’orchestre** (brief commun, section « Âge minimal ») : la première formulation (« un adulte ouvre le compte et en reste responsable ») a été **retirée partout**. La formulation commune du brief (18 ans et plus ; un mineur ne crée pas de compte et n’utilise pas seul celui d’un parent ; options : adulte avec son propre compte, Assistant de Studio soumis aux règles de Roblox, lire et taper soi-même) figure désormais dans : FAQ de l’accueil (« Faut-il payer une IA ? » et « Y a-t-il des conditions d’âge ? »), `module-00/01-bienvenue.mdx` (encadré `<Attention titre="Moins de 18 ans">` + puce du résumé), `module-01/05` (encadré Info « Avant le module 2 »), et l’explication de la Q1 de l’examen du module 00 (« réservé aux 18 ans et plus »). `module-00/03` ne contenait aucune mention de l’âge. Aucune question de quiz ne dépendait de cette formulation. Rebuild après correction : voir « Tests réels ».
3. **Assistant de Studio** : je n’ai écrit ni « gratuit » ni aucun quota, seulement que la documentation officielle n’indique ni prix ni abonnement et publie quelques limites d’usage (vrai : 50 modèles procéduraux / 24 h).
4. **« Chaque leçon technique comporte un encadré « Avec Claude Code » »** (accueil, programme, bienvenue, fil rouge) : c’est la convention du brief commun ; à confirmer quand toutes les leçons des modules 03 à 11 auront leur encadré (les diffs en cours dans les modules 03 à 07 vont dans ce sens).
5. **Nombre de leçons** : jamais écrit en dur. L’accueil affiche `lecons.length` (tuile « Leçons » et FAQ « Combien de temps ») et le programme son compteur existant.
6. **Examen du module 00** : remplacement d’une question plutôt qu’ajout, pour rester à 15 (fourchette 10-15 de PLAN.md). La notion retirée (progression stockée dans le navigateur) reste couverte par le quiz de la leçon de bienvenue et par la FAQ de l’accueil.
7. **Accueil** : le héros garde l’extrait Luau existant mais le présente comme « le code que tu relis », précédé du prompt qui l’a demandé. Bénéfices ramenés à 6 cartes (grille 3 colonnes).

## Points incertains

- Prix : en dollars US, sans taxes ; la page ne donne pas de prix en euros ni de date. Formulé « relevés en octobre 2026 », avec renvoi vers la page officielle.
- Le libellé « Max commence à 100 $ » suit « From $100 » ; le prix du niveau 20x n’est pas affiché (non cité).
- La leçon de bienvenue affirme que le module 2 « compare les outils » et « se termine par une bibliothèque de prompts » : conforme au plan figé de PLAN.md (leçons 01 et 10), à vérifier une fois le module écrit.
- `Header.astro` contient déjà un lien « Prompts » vers la bibliothèque (modification d’un autre agent, non touchée).
