# QA phase 2 — Recette finale

Date : 2026-10-24 · Contenu : 58 leçons, 11 examens · Site construit par `npm run build` (astro check : 0 erreur, 0 avertissement).

## Résultat global

| Suite | Avant | Après | Résultat |
|---|---|---|---|
| Vitest (unitaires) | 43 | **49** (+6) | 49 / 49 ✅ |
| Playwright (e2e, Chromium, sur `dist/`) | 85 | **120** (+35) | 120 / 120 ✅ (2 min 40 s) |

`npm run build` puis `npm test` passent à 100 %.

## Outils

- Playwright 1.64 (Chromium) + @axe-core/playwright, Vitest 5, `yaml` 2.9 (ajouté en devDependency : il était déjà installé comme dépendance transitive).
- `scripts/verifier-liens-externes.mjs` (nouveau) : vérification des liens externes.
- `scripts/captures-recette.mjs` (nouveau) : captures de recette visuelle + détection de débordements et d’erreurs console.
- Découpage / montage des captures (sharp) pour la relecture visuelle image par image.

## Nouveaux tests

| Fichier | Tests | Couvre |
|---|---|---|
| `tests/unit/donnees-quiz.test.ts` (+ `tests/contenu-quiz.ts`) | 6 | données réelles (frontmatter + YAML) : 58 leçons / 11 examens ; 3–8 questions par quiz, 5–30 par examen ; chaque `qcm` ≥ 1 bonne réponse (et pas toutes), chaque `trouve-le-bug` exactement 1 ; aucune option en double ; explications non vides (≥ 20 car.) ; pas de question répétée ; extraits ≤ 20 lignes (> 15 signalés) ; auto-test du détecteur |
| `tests/e2e/recette-quiz.spec.ts` | 23 | 11 tests (un par module) : CHAQUE leçon tout juste → `n / n (100 %)`, quiz `reussi`, bouton « terminée » pressé, progression enregistrée — bonnes réponses lues dans `data-correct` **et** recoupées avec le frontmatter source (nombre, type, indices corrects, nombre d’options) ; 11 tests : CHAQUE examen → 100 %, réussite, badge du module « Obtenu » sur `/progression` ; 1 parcours complet (58 leçons + 11 examens dans la même session) → barre globale et 11 barres de module à 100 %, 16 / 16 badges dont « Formation complète », persistance après rechargement |
| `tests/e2e/clavier-quiz.spec.ts` | 2 | quiz de leçon et examen 100 % clavier (Tab, flèches dans les groupes radio, Espace sur les cases, Entrée sur les boutons), focus visible vérifié à chaque étape (`:focus-visible` + contour ≥ 2 px), y compris sur les blocs de code focalisables ; verdicts `role="status"` `aria-live="polite"` reliés par `aria-describedby`, score focalisé et annoncé, alerte « questions sans réponse » en `role="alert"`, « Recommencer » au clavier |
| `tests/e2e/qualite.spec.ts` | 5 | toutes les pages (70) : poids HTML+JS+CSS < 500 Ko ; `<title>` et meta description présents et uniques ; `lang="fr"` ; favicon existante ; viewport ; un seul `<h1>` ; sitemap complet sans la 404 ; 404 servie par la preview (statut 404) ; aucune erreur console / exception / ressource en échec sur aucune page |
| `tests/e2e/visuel.spec.ts` | 5 | régressions des défauts visuels corrigés (voir plus bas), par styles calculés, clair et sombre |

Aucune leçon ni aucun examen fautif : les 58 quiz et les 11 examens se valident à 100 % avec les bonnes réponses, et le DOM correspond exactement aux données sources.

## Liens externes

`node scripts/verifier-liens-externes.mjs` — sources : MDX/YAML (liens Markdown et URL nues, hors blocs de code) + toutes les balises `<a href="http…">` de `dist/` (pages, en-tête, pied de page).

| | Nombre |
|---|---|
| URL distinctes testées (sans ancre) | **271** (≈ 490 occurrences dans le contenu) |
| OK directement (2xx) | 265 |
| OK confirmées par la source officielle | 6 (pages Zendesk derrière un défi Cloudflare 403 : confirmées par l’API `…/api/v2/help_center/<langue>/articles/<id>.json`) |
| Ancres `#…` vérifiées dans la source officielle (creator-docs) | 12 / 12 |
| **Liens morts (404/410)** | **0** — aucune correction nécessaire |
| Non vérifiables | 0 |

create.roblox.com n’a renvoyé aucun 502 pendant ce passage ; le repli `raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/<chemin>.md|.yaml` est en place (et sert à la vérification des ancres). Contrôle préalable : create.roblox.com, devforum et luau.org renvoient de vrais 404 pour une page inexistante (pas de « soft 404 »).

### URL mises à jour (même page, libellés inchangés)

| Ancienne URL | Nouvelle URL | Fichiers |
|---|---|---|
| `luau.org/syntax`, `/library`, `/types` (301) | même chemin avec `/` final | module-02 : 02, 03, 04, 06 |
| `deceptive.design/types` (301) | `deceptive.design/types/` | 05/04 |
| `devforum…/c/updates/announcements` (301) | `…/announcements/36` | 10/05 |
| `devforum…/c/help-and-feedback/scripting-support` (301) | `…/scripting-support/55` | 10/05 |
| `devforum…/c/resources/community-tutorials` (301) | `…/community-tutorials/46` | 10/05 |
| `devforum…/c/collaboration/recruitment` (301) | `…/recruitment/82` | 10/05 |
| `devforum…/c/collaboration/portfolios` (301) | `…/portfolios/83` | 10/05 |
| `devforum…/t/studio-beta-new-device-simulator-toolbar-and-network-simulator/4861695` (301, sujet renommé) | `…/t/full-release-new-device-simulator-toolbar-and-network-simulator/4861695` | 01/04, 04/04, 09/01 |
| `en.help…/articles/203314100-Developer-Exchange-DevEx-FAQs` (ancien slug) | `…/203314100-Developer-Exchange-DevEx-Overview-How-to-Submit-Requirements` (URL canonique) | 06/06 |
| `en.help…/articles/360024256251` (sans slug) | `…/360024256251-Roblox-Premium-Membership` (URL canonique) | 06/01, 06/04 |
| `support.discord.com/hc/articles/360040724612` | `…/hc/en-us/articles/360040724612-Why-is-Discord-asking-for-my-birthday` (URL canonique) | 07/05 |

### Redirections permanentes NON modifiées (la destination n’est pas la même page)

Voir « Problèmes de contenu » n° 1 à 3. Redirections temporaires laissées telles quelles (choix de langue / géolocalisation) : `about.roblox.com/…` → `/fr/…` (4 URL), `www.roblox.com/info/terms` → conditions EEE/R.-U./Suisse.

## Recette visuelle

52 captures dans `C:\tmp\captures-qa\` : 13 vues × {desktop 1280 px, mobile 390 px} × {clair, sombre} — accueil, programme, module 02, leçon à tableaux (08/05), checklist (10/04, cases cochées), leçon très codée (02/03, + gros plan d’un bloc), quiz corrigé (02/04, une réponse fausse), examen 03 avant / après correction (réponses mixtes), progression vide / avec badges, 404, recherche ouverte (« DataStore »). Le script ne signale ni défilement horizontal ni élément qui dépasse, sur aucune capture.

### Défauts visuels corrigés (`src/styles/global.css`, `src/pages/index.astro`, `src/components/layout/Recherche.astro`)

1. **Couleurs de correction écrasées** (clair et sombre) : une option cochée gardait le style « cochée » indigo après correction (`.option:has(input:checked)` plus spécifique que `.option[data-etat]`) ; la bonne réponse choisie n’était pas verte, la mauvaise n’était pas rouge (seule la pastille l’indiquait). Spécificité relevée + bordures sombres explicites.
2. **Indentation perdue dans les extraits « trouve-le-bug »** : les numéros de ligne en `inline-block` décalaient les taquets de tabulation ; une tabulation ne valait plus que ~0,7 caractère (le corps des `for`/`if` paraissait non indenté). Numéros sortis du flux (colonne positionnée dans la marge du `<code>`).
3. **Énoncé de question collé aux options** : la marge haute de l’élément suivant la légende flottante était absorbée par le `clear`. Espacement porté par la légende.
4. **Identifiants coupés au milieu dans les tableaux** (`LogOnboardingFunnelStepEven|t`, 08/05) : `overflow-wrap: anywhere` réduisait la largeur minimale des colonnes ; désactivé dans les cellules (le tableau défile dans son cadre si besoin).
5. **Quiz trop étroit sur mobile** : 4 cadres imbriqués mangeaient ~90 px sur 390 ; marges internes resserrées < 640 px (quiz, question, option, code, score).
6. **Extrait de code de l’accueil tronqué** (commentaires de 100+ caractères coupés, desktop et mobile) : commentaires raccourcis (même sens) et police réduite sur mobile.
7. **Chiffres clés de l’accueil sur mobile** : « 1 par module » passait sur 2 lignes en 30 px, grille déséquilibrée → 20 px sur mobile, 30 px dès 640 px.
8. **Badges** : le statut « Obtenu / À débloquer » n’était pas aligné entre cartes de hauteurs différentes → poussé en bas de carte.
9. **Recherche** : surlignage Pagefind jaune vif, criard en mode sombre → couleurs adoucies et adaptées aux deux thèmes ; en-tête du dialogue (« Fermer Échap ») qui passait sur 2 lignes sur mobile → raccourci clavier masqué sur mobile.

Les défauts 1 à 4 sont couverts par `tests/e2e/visuel.spec.ts`. Contrastes et thème sombre : déjà couverts par axe-core (`accessibilite.spec.ts`), toujours verts après modifications.

## Performance / qualité

- Poids (HTML + JS + CSS, hors images et hors index Pagefind chargé à la demande) : **aucune page > 500 Ko**. La plus lourde : `/modules/04/datastores-fiables/` ≈ 293 Ko (HTML 207 Ko + CSS 74 Ko + JS 12 Ko). CSS unique 74 Ko, JS total ≈ 12 Ko.
- Aucune erreur console / exception / requête en échec sur les 70 pages (hors le 404 attendu de la page 404 elle-même).
- `<title>` et meta description présents et uniques partout ; `lang="fr"` partout ; favicon SVG ; un seul `<h1>` par page ; sitemap (`sitemap-index.xml` → `sitemap-0.xml`) avec les 69 pages publiques, sans la 404 ; la preview sert la page 404 avec le statut 404.

## Bugs corrigés (hors visuel)

- Aucun bug fonctionnel trouvé dans le site (quiz, examens, progression, badges, navigation clavier, annonces : conformes) ; les défauts trouvés sont visuels (section précédente).
- Nettoyage : 3 imports inutilisés (`scripts/consolider-verification.mjs`, `scripts/verifier-luau.mjs`, `tests/e2e/structure.spec.ts`) qui produisaient des avertissements `astro check` → 0 avertissement.

## Problèmes de contenu signalés (non modifiés)

1. **07/05 `communaute.mdx`, Sources** : « Promotion (section Communities) » → `create.roblox.com/docs/production/promotion` redirige (301) vers `/docs/scale`, page d’accueil générique « Reach a massive global audience » : ce n’est plus une page sur les communautés. Le rédacteur doit choisir la page officielle actuelle sur les communautés.
2. **01/01 `installer-et-decouvrir-studio.mdx`, Sources** : « Create your first game — projet, Baseplate et studs » → `docs/tutorials/first-experience` redirige (301) vers l’index du « Core curriculum ». Candidat vérifié (200, parle du template Baseplate) : `https://create.roblox.com/docs/tutorials/curriculums/core/building/create-a-project` — à valider par le rédacteur (libellé à adapter).
3. **10/05 `et-apres.mdx`** : lien « Talent » `create.roblox.com/talent` → 301 vers `/talent/search/jobs` (vue « offres d’emploi » du même espace). Fonctionne ; URL d’entrée conservée volontairement.
4. **Libellés DevForum datés** (01/04, 04/04) : le sujet « New Device Simulator Toolbar and Network Simulator » est passé de « Studio Beta » à « Full Release » ; les libellés ne le mentionnent pas (09/01 dit déjà « Full Release ») — cohérence à vérifier.
5. **Extraits « trouve-le-bug » de 16 lignes** (AUTHORING : ≤ 15) : 09/02 `mesurer-les-performances` (« Ce Script serveur ajoute une étiquette au MicroProfiler… ») et 09/04 `reduire-le-lag` (« Pour « optimiser », ce Script serveur modifie les… »).
6. **Leçons au-delà de la longueur indicative** (900–1 800 mots ; estimation hors code) : 04/02 (~3 550, assumé par DECISIONS n° 23), 10/04 (~3 060), 00/04 (~2 820), 08/05 (~2 550), 07/01 (~2 530), 01/05 (~2 440), 00/02 (~2 440), 06/03 (~2 330), 09/04 (~2 320), 01/01 (~2 300), 05/04 (~2 250).
7. 06/06 `devex.mdx` : le libellé « Developer Exchange (DevEx) — aide officielle » pointait vers l’ancien slug « DevEx-FAQs » ; l’article (id 203314100) s’intitule désormais « Developer Exchange (DevEx) Overview, How to Submit, Requirements ». URL mise à l’adresse canonique ; le libellé reste correct.
