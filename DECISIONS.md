# DECISIONS.md — Journal des décisions

Décisions prises de façon autonome par le chef d'orchestre (l'utilisateur n'étant pas disponible).

| # | Date | Décision | Raison |
|---|------|----------|--------|
| 1 | 2026-10-24 | Stack : Astro + MDX + Tailwind, site 100 % statique | Recommandé dans le brief ; statique = déploiement trivial Vercel/Netlify, rapide, SEO. |
| 2 | 2026-10-24 | Chaque vérificateur écrit son rapport dans `verification/module-XX-passe-N.md`, puis le chef d'orchestre consolide dans `VERIFICATION.md` | Éviter les conflits d'écriture simultanée de plusieurs agents parallèles sur un même fichier. |
| 3 | 2026-10-24 | Les leçons de chaque module sont rédigées par un rédacteur dédié (11 rédacteurs en parallèle) | Conforme au brief ; modules indépendants. |
| 4 | 2026-10-24 | Versions : Astro 7.4, @astrojs/mdx 8.1, Tailwind 4.3 (+ typography), Pagefind 1.5, TypeScript 6.0 (et non 7 : incompatible avec @astrojs/check), Shiki avec langage `luau` natif | Dernières versions stables compatibles entre elles. |
| 5 | 2026-10-24 | Thèmes de code `github-light-default` / `github-dark-default` | Contraste AA, commentaires inclus. |
| 6 | 2026-10-24 | Composants MDX globaux sans import : Astuce, Erreur, Info, Attention, Defi, Resume, Sources | Simplicité pour les rédacteurs. |
| 7 | 2026-10-24 | Quiz dans le frontmatter (schéma Zod strict), examens en YAML séparés ; leçon terminée si quiz ≥ 70 %, examen réussi ≥ 70 % | Validation au build, zéro faute de format possible en production. |
| 8 | 2026-10-24 | Progression en localStorage avec repli mémoire ; badges : 1 par module + 5 globaux | Site statique sans backend. |
| 9 | 2026-10-24 | Réponses des quiz présentes dans le HTML | Acceptable pour une formation gratuite statique (pas d'enjeu de triche). |
| 10 | 2026-10-24 | Fil rouge : « l'Obby des Nuages » (obby + pièces + checkpoints + boutique de trails) | Assez simple pour être fini par un débutant, assez riche pour couvrir tous les modules. |
| 11 | 2026-10-24 | Plan validé par le chef d'orchestre : 11 modules, 58 leçons (voir PLAN.md) | Couvre tout le contenu minimum demandé, progression cohérente. |
| 12 | 2026-10-24 | Builds concurrents des agents sérialisés par `scripts/build-verrou.sh` (verrou mkdir) | 11 rédacteurs en parallèle dans le même dossier. |
| 13 | 2026-10-24 | Tutoiement dans tout le site | Public débutant, souvent jeune ; ton pédagogique. |
| 14 | 2026-10-24 | Premium Payouts : la doc officielle indique leur arrêt (24/07/2025) et leur remplacement par Creator Rewards → présentés comme historique + dispositif actuel (module 06, slug inchangé) | Le brief demande les Premium Payouts, mais une info obsolète présentée comme actuelle serait fausse. |
| 15 | 2026-10-24 | Programme « Roblox Kids and Select » (accès des moins de 16 ans) signalé aux rédacteurs 01, 07, 10 pour vérification et intégration | Info 2026 importante pour la publication, découverte par le rédacteur 00. |
