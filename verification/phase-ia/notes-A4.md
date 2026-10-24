# Notes de l’adaptateur A4 (phase IA)

Périmètre : leçons avec code Luau des modules 09, 10, 11 (09/04, 09/05, 10/01 à 10/05, 11/02, 11/04), leçons 01/03 et 01/04, examens 09, 10 et 11. Rédigé le 2026-10-24/25.

## Fichiers modifiés

| Fichier | Encadré `<AvecClaudeCode>` (placement) | Question de quiz ajoutée | Total quiz |
|---|---|---|---|
| `module-09/04-monetisation-et-conversion.mdx` | après l’`<Erreur>` « moyenne de moyennes » : calculatrice hebdomadaire `outils/CalculMonetisation.luau` (hors `src/`) | `trouve-le-bug` IA : moyenne des ARPPU quotidiens | 6 |
| `module-09/05-evenements-personnalises.mdx` | après l’`<Info>` « anciens joueurs » : `AnalytiqueObby.server.luau`, entonnoirs exacts de la leçon | `ameliore-le-prompt` (analytics) | 6 |
| `module-10/01-penser-mobile-d-abord.mdx` | après `AdaptationMobile` : audit mobile en lecture seule + `AdaptationMobile.client.luau` | `ameliore-le-prompt` (mobile) | 7 |
| `module-10/02-mesurer-les-performances.mdx` | après l’`<Astuce>` « Profiler le serveur » : repérage + étiquettes MicroProfiler, fiche de mesure vide | `ameliore-le-prompt` (mesurer avant d’optimiser) | 7 |
| `module-10/03-streaming-d-instances.mdx` | après « D’autres pièges » : audit streaming des LocalScripts | `trouve-le-bug` IA : `GetChildren` sans `ChildAdded` | 7 |
| `module-10/04-reduire-le-lag.mdx` | après l’avant/après n° 3 : `PiecesTournantesClient` + liste des autres sources de lag | `ameliore-le-prompt` (lag) | 7 |
| `module-10/05-optimiser-l-obby.mdx` | après l’`<Astuce>` de l’étape 3 : rapport d’audit du code, une correction par demande | `ameliore-le-prompt` (audit) | 6 |
| `module-11/02-erreurs-techniques.mdx` | après le tableau des cas limites : audit des six erreurs techniques | `trouve-le-bug` IA : `EquiperObjet` sans vérification de possession | 6 |
| `module-11/04-checklist-de-lancement.mdx` | après l’`<Info>` du script AutoVerification : vérification des points techniques avec preuve fichier/ligne | `ameliore-le-prompt` (checklist) | 6 |
| `module-01/03-organiser-son-jeu.mdx` | encadré « Aperçu : avec Claude Code » (compter les plateformes), renvoi au module 2 pour l’installation | `ameliore-le-prompt` simple | 7 |
| `module-01/04-tester-son-jeu.mdx` | encadré « Aperçu : avec Claude Code » (comprendre une erreur de l’Output), renvoi au module 2 | `ameliore-le-prompt` simple | 7 |
| `examens/module-09.yaml` | — | +2 : `trouve-le-bug` IA (événement d’économie enregistré avant la vérification du solde), `ameliore-le-prompt` (entonnoir de boutique répétable) | 17 |
| `examens/module-10.yaml` | — | +2 : `trouve-le-bug` IA (CanCollide/CanTouch/CanQuery sur toutes les MeshParts), `ameliore-le-prompt` (« l’IA propose, tu mesures ») | 16 |
| `examens/module-11.yaml` | — | +2 : `qcm` (revue du code généré : diff, selene/StyLua, secrets, tests à 2 clients), `trouve-le-bug` IA (texte filtré jeté, texte brut affiché) | 16 |

`miseAJour: 2026-10-24` était déjà présent dans les 11 leçons : inchangé.

Checklist interactive 11/04 : ajout, à la fin de la section « 2. Technique », d’un groupe de 5 cases « Si tu as écrit une partie du code avec Claude Code ou une autre IA » (relecture et compréhension, `selene src` / `stylua --check src`, API dépréciées ou inventées, secrets absents du dépôt et de l’historique, `git status` propre et version publiée liée à un commit). Liens vers les leçons 02/02, 02/06 et 02/08 (slugs du PLAN, fichiers en cours d’écriture par d’autres agents).

## Correction d’une erreur avérée (contenu phase 1)

- 11/04, section « Comment utiliser cette checklist » : le texte disait « les cases de cette page ne se cochent pas ». C’est faux depuis l’ajout des listes de tâches interactives (`plugins/taches.mjs` + `src/scripts/taches.ts` : cases cochables, état mémorisé par page dans `localStorage`). Remplacé par : on coche sur la page (état gardé dans ce navigateur), ou on recopie la checklist dans un document.
- Effet de bord à connaître : l’état des cases est mémorisé **par index** (`data-tache`). Les 5 cases ajoutées au milieu de la page décalent les index des cases suivantes ; un lecteur qui aurait déjà coché des cases de cette page verrait son état décalé. Sans importance avant la mise en ligne ; à garder en tête pour les modifications futures de checklists déjà publiées.

## Faits utilisés et sources

Aucune nouvelle affirmation factuelle sur Roblox n’a été ajoutée hors de ce que les leçons de la phase 1 sourcent déjà ; les prompts réutilisent les noms, API et règles des leçons elles-mêmes. Points précis :

- Mode plan (« Commence par me proposer un plan (mode plan), sans modifier de fichier. ») : formule imposée par le brief ; le mode `plan` ne modifie pas les fichiers source — https://code.claude.com/docs/en/permissions (via `verification/phase-ia/veille-claude-code.md` §4.1).
- `selene src` et `stylua --check src` : https://github.com/Kampfkarren/selene et https://github.com/JohnnyMorganz/StyLua (veille Roblox §E) ; **testés réellement**, voir plus bas.
- API dépréciées citées (`wait`, `spawn`, `delay`, `BodyVelocity`, `Humanoid:LoadAnimation`, `FireEvent`, `FireCustomEvent`) : veille Roblox §I et leçon 09/05 (référence AnalyticsService).
- `TextService:FilterStringAsync` puis `GetNonChatStringForBroadcastAsync` pour un texte visible par tout le serveur : https://create.roblox.com/docs/ui/text-filtering (déjà source de 11/04).
- `Validation.creerCooldown`, `DonneesJoueurs.Obtenir`, `donnees.inventaire`, `donnees.equipe`, `EquiperObjet`, `Achats.server.luau` modifiant `Etape` : vérifiés dans `projet-reference/src/ServerScriptService/`.
- Rojo : `ReplicatedFirst` n’est pas mappé dans `projet-reference/default.project.json`, d’où le choix de ne pas faire créer par l’IA le script de temps de chargement (ReplicatedFirst) de 10/02 ; les propriétés de `Workspace` (streaming, `PlayerCharacterDestroyBehavior`) ne sont pas dans les fichiers Rojo : les prompts disent explicitement que l’élève les règle dans Studio.
- `git diff`, `git diff --stat`, `git status` : commandes Git standard.

## Tests réellement effectués sur la machine

- `selene --version` → `selene 0.32.0` ; `stylua --version` → `stylua 2.6.0` (outils déjà présents dans `~/.rokit/bin`, `rokit.toml` créé dans `C:\tmp\phase-ia-A4\`).
- Extraction de tous les extraits Luau des quiz et examens de mon périmètre (script `C:\tmp\phase-ia-A4\extraire.mjs`, qui vérifie aussi le parse YAML du frontmatter et compte les questions et encadrés), puis `selene extraits` avec `std = "roblox"` : **0 erreur, 0 erreur de syntaxe**, 7 avertissements dont 2 sur mes ajouts :
  - `examen11_q16` : `resultat is defined, but never used` → c’est exactement le défaut volontaire (texte filtré jeté). Bonus pédagogique : selene le signale.
  - `examen09_q16` : fonction `traiterAchat` non utilisée → extrait partiel, comme les extraits existants de la phase 1.
- `node scripts/verifier-luau.mjs 09`, `10`, `11`, `01` : voir la section « Résultats » ci-dessous.
- `bash scripts/build-verrou.sh` : voir « Résultats ».

## Résultats

- `node scripts/verifier-luau.mjs 09` : 11 extraits, 0 diagnostic. `10` : 22 extraits, 2 diagnostics, tous deux `Unknown require: game/ReplicatedStorage/Modules/Config` sur des blocs existants de la phase 1 (10/02 bloc 1, 10/04 bloc 6). Ils étaient déjà là avant mes modifications : c’est le `require` d’un module du projet qui ne se résout pas hors sourcemap. `11` : 14 extraits, 0 diagnostic. `01` : 9 extraits, 0 diagnostic. **Aucun nouveau diagnostic.**
- `bash scripts/build-verrou.sh` : code de sortie 0 (astro check + astro build + pagefind).

## Décisions

- Quiz : `ameliore-le-prompt` en priorité (8 leçons), `trouve-le-bug` « Trouve la faille dans ce code généré par IA » pour 09/04, 10/03 et 11/02, chacun ≤ 15 lignes avec un seul défaut.
- 11/02 (`EquiperObjet`) : j’ai ajouté le délai par joueur (`Validation.creerCooldown`) et la vérification de type pour que l’absence de vérification de **possession** soit le seul défaut ; 15 lignes, sans ligne vide.
- 09/04 : l’outil demandé est écrit dans `outils/` (hors `src/`) pour qu’il ne soit pas synchronisé par Rojo dans le jeu ; vérification `selene outils` (selene accepte n’importe quel dossier, avec le `selene.toml` du projet).
- Module 01 : l’élève n’a pas encore vu le module 02. Encadrés titrés « Aperçu : avec Claude Code », courts, prompts réduits (sans chemins Rojo, en termes de Studio), renvoi explicite au module 2 pour l’installation (« rien à faire pour l’instant »).
- 10/02 : le prompt n’inclut pas la consigne « pas de `task.wait` entre `profilebegin` et `profileend` », faute de l’avoir confirmée sur une source officielle ; il reprend seulement la règle de la leçon (fermer l’étiquette sur tous les chemins).
- Pas de mention du serveur MCP de Studio dans les prompts : les encadrés fonctionnent avec la seule lecture des fichiers ; ils disent clairement que l’IA ne voit pas le niveau construit dans Studio ni les mesures, et que l’élève mesure lui-même.

## Points incertains

- Les liens vers `/modules/02/relire-et-tester-le-code-de-l-ia/`, `/modules/02/installer-un-workflow-pro/` et `/modules/02/les-pieges-de-l-ia/` (11/04) suivent les slugs figés du PLAN ; au moment de mon travail, seuls `02/03` et `02/10` existaient dans le dépôt.
