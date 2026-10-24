# DECISIONS.md — Journal des décisions

Décisions prises de façon autonome par le chef d'orchestre (l'utilisateur n'étant pas disponible).

| # | Date | Décision | Raison |
|---|------|----------|--------|
| 1 | 2026-10-24 | Stack : Astro + MDX + Tailwind, site 100 % statique | Recommandé dans le brief ; statique = déploiement trivial Vercel/Netlify, rapide, SEO. |
| 2 | 2026-10-24 | Chaque vérificateur écrit son rapport dans `verification/module-XX-passe-N.md`, puis le chef d'orchestre consolide dans `VERIFICATION.md` | Éviter les conflits d'écriture simultanée de plusieurs agents parallèles sur un même fichier. |
| 3 | 2026-10-24 | Les leçons de chaque module sont rédigées par un rédacteur dédié (11 rédacteurs en parallèle) | Conforme au brief ; modules indépendants. |
