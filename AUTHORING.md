# AUTHORING.md — Guide des rédacteurs

Tout ce qu’il faut pour écrire une leçon ou un examen. Le plan (slugs, titres, objectifs) est dans [PLAN.md](PLAN.md).
Exemples complets à copier : `src/content/lecons/module-00/01-bienvenue.mdx` et `src/content/examens/module-00.yaml`.

**Vérifier son travail** : `npm run build` doit se terminer sans erreur (il valide frontmatter, quiz et examens, avec des messages en français). Pour relire visuellement : `npm run dev` puis http://localhost:4321.

---

## 1. Fichiers et nommage

| Contenu | Emplacement | URL générée |
|---|---|---|
| Leçon | `src/content/lecons/module-XX/NN-slug.mdx` | `/modules/XX/slug/` |
| Examen | `src/content/examens/module-XX.yaml` | `/modules/XX/examen/` |

- `XX` = numéro du module sur 2 chiffres (`00` à `10`), `NN` = ordre de la leçon sur 2 chiffres (`01`, `02`…).
- `slug` = celui de PLAN.md : minuscules, chiffres et tirets uniquement, sans accents (`ne-jamais-faire-confiance-au-client`). `examen` est interdit.
- Deux leçons d’un même module ne peuvent pas avoir le même `NN` ni le même slug (le build échoue).
- L’ordre, les URL, la navigation précédent/suivant, le sommaire et la progression sont **automatiques**.
- Ne modifie que les fichiers de **ton** module. Ne touche pas à `src/data/modules.ts` ni au code ; signale un besoin au chef d’orchestre.

## 2. Frontmatter d’une leçon

| Champ | Obligatoire | Règle |
|---|---|---|
| `titre` | oui | 3 à 90 caractères |
| `description` | oui | 30 à 220 caractères (cartes, moteur de recherche) |
| `duree` | oui | entier, minutes (3 à 90) : lecture + pratique |
| `objectifs` | oui | 2 à 4 puces, commençant par un verbe (« Créer… », « Comprendre… ») ; affichés automatiquement en haut de la leçon |
| `quiz` | oui | 3 à 8 questions (vise 4 à 6), voir §3 |
| `miseAJour` | conseillé | date de vérification des faits, `AAAA-MM-JJ` ; **obligatoire** si la leçon cite des chiffres qui évoluent (prix, taux, limites) |
| `brouillon` | non | `true` = visible en dev, exclu du build de production |

Aucun autre champ n’est accepté (schéma strict : une faute de frappe fait échouer le build).

```yaml
---
titre: Sauvegarder sans perdre de données
description: Utilise les DataStores pour sauvegarder la progression des joueurs de façon fiable, même quand Roblox a un raté.
duree: 25
objectifs:
  - Sauvegarder et charger les données d’un joueur
  - Gérer les erreurs avec pcall et des nouvelles tentatives
  - Éviter les pertes de données à la fermeture du serveur
miseAJour: 2026-10-24
quiz:
  - type: vrai-faux
    question: "`SetAsync` est la méthode la plus sûre pour modifier une valeur qui dépend de l’ancienne."
    reponse: false
    explication: Pour une valeur qui dépend de l’ancienne, on préfère `UpdateAsync`, qui lit et écrit en une seule opération.
---
```

## 3. Quiz : les 3 types de questions

Champs communs : `type`, `question`, `explication` (affichée après la réponse : explique **pourquoi**, pas seulement « c’est B »).
Dans les textes de quiz, seuls `` `code` `` et `**gras**` sont mis en forme.

### `qcm` — une ou plusieurs bonnes réponses
2 à 6 options ; marque chaque bonne réponse avec `correct: true`. S’il y en a plusieurs, le site affiche des cases à cocher et l’élève doit toutes les cocher.

```yaml
  - type: qcm
    question: Où placer un script qui gère les sauvegardes ?
    options:
      - texte: Dans StarterGui
      - texte: Dans ServerScriptService
        correct: true
      - texte: Dans un LocalScript de StarterPlayerScripts
    explication: Les sauvegardes se font côté serveur ; ServerScriptService n’est jamais envoyé aux clients.
```

### `vrai-faux`
L’affirmation est dans `question`, la réponse dans `reponse` (`true` = vrai, `false` = faux).

```yaml
  - type: vrai-faux
    question: Un changement fait par un LocalScript est automatiquement visible par tous les joueurs.
    reponse: false
    explication: Sauf exceptions (personnage, physique dont le client est propriétaire), les changements faits côté client ne sont pas répliqués au serveur.
```

### `trouve-le-bug`
Un extrait Luau (`code`, affiché avec coloration et **numéros de ligne**) + des options ; **exactement une** option correcte. Indique la ligne dans les options (« Ligne 4 : … »). Le code doit être court (≤ 15 lignes), réaliste, et ne contenir qu’**un** bug.

```yaml
  - type: trouve-le-bug
    question: "Ce script doit tuer le joueur qui touche la Part. Où est le bug ?"
    code: |
      local part = script.Parent

      part.Touched:Connect(function(hit)
      	local humanoid = hit.Parent:FindFirstChild("Humanoid")
      	humanoid.Health = 0
      end)
    options:
      - texte: "Ligne 3 : il faut `part.Touched:connect` en minuscules"
      - texte: "Ligne 5 : `humanoid` peut être `nil` si ce n’est pas un personnage qui touche"
        correct: true
      - texte: "Ligne 1 : `script.Parent` n’existe pas dans un Script"
    explication: "`FindFirstChild` renvoie `nil` si rien n’est trouvé (une balle, une autre Part…). Il faut tester `if humanoid then` avant d’utiliser `humanoid.Health`."
```

**Pièges YAML** : indente avec des **espaces** (jamais de tabulation, sauf *à l’intérieur* d’un bloc `code: |`) ; mets entre guillemets `"…"` toute valeur qui commence par `` ` ``, `*`, `[`, `{`, `"`, `'`, `@`, `!`, `&`, `%`, `#`, `>`, `|`, ou qui contient `: ` (deux-points + espace) ou ` #`. Dans une chaîne entre `"…"`, écris `\"` pour un guillemet. Les nombres affichés comme réponses s’écrivent entre guillemets : `texte: "11"`.

## 4. Examens de module (`src/content/examens/module-XX.yaml`)

```yaml
module: "03"            # obligatoire, entre guillemets, identique au nom du fichier
titre: Examen du module 3   # facultatif
description: …           # facultatif (sinon texte automatique)
seuil: 70                # facultatif, 70 par défaut (50 à 100)
questions:               # 5 à 30 questions ; vise 10 à 15
  - type: qcm
    question: …
    options: …
    explication: …
```

Mêmes 3 types et même format que les quiz. L’examen couvre **toutes** les leçons du module, ne recopie pas les questions des quiz (reformule ou crée des mises en situation) et contient au moins 2 `trouve-le-bug` si le module contient du code. Réussir l’examen débloque le badge du module.

## 5. Composants disponibles (sans import)

Utilisables directement dans le MDX. Laisse une **ligne vide** après la balise ouvrante et avant la balise fermante si le contenu fait plusieurs paragraphes ou contient une liste.

| Composant | Usage | Titre par défaut |
|---|---|---|
| `<Astuce>…</Astuce>` | conseil de pro (obligatoire, ≥ 1) | « Astuce pro » |
| `<Erreur>…</Erreur>` | erreur fréquente à éviter (obligatoire, ≥ 1) | « Erreur à éviter » |
| `<Info>…</Info>` | précision, contexte | « Bon à savoir » |
| `<Attention>…</Attention>` | risque, sécurité, règle Roblox | « Attention » |
| `<Defi>…</Defi>` | mini-exercice pratique dans Studio | « À toi de jouer » |
| `<Resume>…</Resume>` | résumé de fin (obligatoire, une fois, liste à puces) | « Ce qu’il faut retenir » |
| `<Sources>…</Sources>` | sources (obligatoire, en dernier, liste de liens Markdown) | « Sources et pour aller plus loin » |

Tous acceptent un titre personnalisé : `<Astuce titre="Raccourci clavier">`.

```mdx
<Erreur titre="Sauvegarder à chaque pièce ramassée">
Chaque appel à un DataStore compte dans une limite de requêtes. Sauvegarde à la sortie du joueur et périodiquement, pas à chaque changement.
</Erreur>

<Sources>
- [DataStoreService — documentation Roblox](https://create.roblox.com/docs/reference/engine/classes/DataStoreService)
- [Data stores — guide Roblox](https://create.roblox.com/docs/cloud-services/data-stores)
</Sources>
```

## 6. Structure imposée d’une leçon (corps MDX)

1. **Intro** (2-4 phrases, sans titre) : pourquoi cette leçon compte, lien avec la précédente / le fil rouge. Les objectifs sont affichés automatiquement depuis le frontmatter : ne les répète pas.
2. **Explications** en sections `##` (et `###` si besoin). Pas de `#` (le titre H1 est généré). Les `##`/`###` alimentent la table des matières.
3. **Code Luau commenté** (au moins un bloc dans les modules techniques), appliqué au fil rouge quand c’est possible.
4. **Au moins une `<Astuce>` et une `<Erreur>`** (placées là où elles sont utiles, pas toutes à la fin).
5. Optionnel : `<Info>`, `<Attention>`, `<Defi>`.
6. **`<Resume>`** : 3 à 6 puces.
7. **`<Sources>`** : en tout dernier, 2 liens minimum, documentation officielle en priorité (`create.roblox.com/docs`, `luau.org`, `devforum.roblox.com` pour les annonces officielles, `en.help.roblox.com` / pages d’aide officielles).

Le quiz est ajouté automatiquement après le contenu (ne l’écris pas dans le corps).

## 7. Conventions de rédaction

- **Tutoiement** partout, ton chaleureux et pédagogique, pour débutants (12-16 ans comme adultes). Phrases courtes, un concept à la fois, définir chaque terme technique à sa première apparition.
- Français correct : accents, typographie française (espace avant `: ; ? !`, guillemets « … », apostrophe ’ acceptée). Termes Roblox en anglais tels qu’ils apparaissent dans Studio (`Workspace`, `ServerScriptService`, « Properties »), avec traduction à la première occurrence.
- **Code** : blocs ` ```luau ` (pas `lua`), indentation par tabulations comme dans Studio, commentaires en français, noms de variables explicites (français ou anglais, mais cohérents dans la leçon), services récupérés avec `game:GetService(...)`, `task.wait` plutôt que `wait`. Tout code doit fonctionner tel quel dans Studio (ou indiquer clairement où le placer et ce qui manque).
- **Faits** : aucune affirmation non vérifiable. Chiffres qui évoluent (commissions, taux DevEx, limites d’API, conditions d’âge) → source officielle + `miseAJour` + formulation datée. Pas de promesse de revenus, pas de « secret de l’algorithme ».
- Longueur indicative : 900 à 1 800 mots par leçon.

## 8. Pièges MDX courants

- **Accolades** `{ }` dans le texte (hors code) = expression JavaScript → erreur. Écris-les dans du code inline (`` `{}` ``) ou échappe-les : `\{`.
- **Chevron** `<` suivi d’une lettre dans le texte = balise HTML/JSX → erreur. Écris `&lt;` ou mets-le dans du code inline (`` `a < b` ``). Idem pour `<=`, `<-`.
- Les blocs de code ` ``` ` et le code inline sont sûrs : `{`, `<` et `--` y sont autorisés.
- Les commentaires HTML `<!-- -->` ne fonctionnent pas : utilise `{/* commentaire */}`.
- Une balise de composant doit être fermée (`</Astuce>`) et bien orthographiée (majuscule initiale).
- Liste ou plusieurs paragraphes dans un composant : lignes vides autour du contenu.
- Pas d’`import` nécessaire pour les composants listés au §5 ; pas d’autres composants ni d’images externes sans accord.

## 9. Avant de rendre ton module

- [ ] Tous les fichiers du module suivent PLAN.md (slugs, ordre) et la structure du §6.
- [ ] Chaque leçon : ≥ 1 `<Astuce>`, ≥ 1 `<Erreur>`, `<Resume>`, `<Sources>` (≥ 2 liens), quiz de 4 à 6 questions avec explications.
- [ ] Examen `module-XX.yaml` : 10 à 15 questions couvrant tout le module.
- [ ] Code Luau relu ligne par ligne ; bugs des `trouve-le-bug` uniques et sans ambiguïté.
- [ ] `npm run build` passe sans erreur.
