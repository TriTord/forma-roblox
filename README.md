# Forma Roblox — « Créer un jeu Roblox qui marche, de A à Z »

Formation en 12 modules (0 à 11) pour créer un jeu Roblox **en pilotant des IA de code, surtout Claude Code** : le module 02 « Scripter avec l’IA » apprend à écrire des prompts précis, et toute la formation apprend à **lire, diriger et vérifier** le code produit.

Site de formation en français, 100 % statique : Astro 7 + MDX + Tailwind CSS 4, recherche Pagefind, progression stockée dans le navigateur.

## Démarrer

```bash
npm install
npm run dev       # http://localhost:4321 (la recherche ne fonctionne pas en dev)
npm run build     # astro check + build statique dans dist/ + index Pagefind
npm run preview   # sert dist/ (recherche incluse)
```

Node 24 recommandé (Astro 7 exige Node ≥ 22.23). Déploiement : n’importe quel hébergeur statique (Vercel, Netlify…) avec `npm run build` et le dossier `dist/`.

## Écrire du contenu

- Guide des rédacteurs : [AUTHORING.md](AUTHORING.md)
- Plan des leçons : [PLAN.md](PLAN.md)

## Structure

```
src/
  content.config.ts          collections « lecons » et « examens » (schémas Zod stricts)
  content/lecons/module-XX/NN-slug.mdx
  content/examens/module-XX.yaml
  data/modules.ts            métadonnées des 12 modules (titres, emoji, objectifs, badges)
  data/site.ts               constantes (nom, seuils, thèmes de code, lien())
  lib/schemas.ts             schémas Zod (leçon, quiz, examen)
  lib/cours.ts               tri, URL, navigation, catalogue envoyé au client
  components/mdx/            Astuce, Erreur, Info, Attention, Defi, Resume, Sources, AvecClaudeCode, Prompt
  components/quiz/Quiz.astro quiz de leçon et examen (rendu au build)
  components/layout/         en-tête, sommaire, table des matières, recherche, thème…
  scripts/progression.ts     état localStorage, statistiques, badges
  scripts/progression-ui.ts  liaison DOM (barres, pastilles, badges, bouton « terminée »)
  scripts/quiz.ts            correction des quiz / examens
  pages/                     accueil, /programme, /progression, /modules/XX[/slug|/examen]
```

Les éléments clés exposent des attributs `data-testid` (quiz, options, valider, score, barres de progression, bascule de thème, bouton « terminée », recherche, sommaire) pour les tests Playwright.
