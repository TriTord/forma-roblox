# PROGRESS.md — Suivi du projet

## Étapes
- [x] 0. Initialisation (git, PROGRESS, DECISIONS)
- [x] 1. ARCHITECTE : stack, structure, composants (quiz, progression, badges, recherche), plan des leçons
- [x] 2. Validation du plan par le chef d'orchestre (58 leçons, fil rouge « Obby des Nuages »)
- [ ] 3. RÉDACTEURS : modules 0 à 10 (leçons + quiz + examen final) — EN COURS (11 agents)
- [ ] 4. VÉRIFICATEURS passe 1 (faits + sources) — lancée module par module dès qu'un rédacteur finit
- [ ] 5. VÉRIFICATEURS passe 2 (indépendants : code Luau + quiz + re-vérif faits)
- [ ] 6. Consolidation VERIFICATION.md
- [ ] 7. QA : build, tests auto (Playwright/Vitest), bugs — phase 1 (infra de tests) EN COURS
- [ ] 8. Corrections + re-tests
- [ ] 9. RELECTEUR FINAL
- [ ] 10. RAPPORT_FINAL.md

## Suivi par module
| Module | Rédaction | Vérif passe 1 | Vérif passe 2 |
|---|---|---|---|
| 00 | FAIT | en cours | |
| 01 | FAIT | en cours | |
| 02 | en cours | | |
| 03 | FAIT | en cours | |
| 04 | en cours | | |
| 05 | FAIT | en cours | |
| 06 | FAIT | en cours | |
| 07 | FAIT | en cours | |
| 08 | FAIT | en cours | |
| 09 | FAIT | en cours | |
| 10 | FAIT | en cours | |

## Outils
- Briefs : `C:\tmp\BRIEF_REDACTEUR.md`, `C:\tmp\BRIEF_VERIFICATEUR.md`
- Build concurrent : `bash scripts/build-verrou.sh`
- Analyse Luau : `node scripts/verifier-luau.mjs XX` (luau-lsp dans C:\tmp\luau-tools)

## Notes
- QA phase 1 terminée (suite de tests). Agent DEV lancé pour corriger 7 bugs site (mobile overflow, liens soulignés, label recherche, checklist interactive, focus menu mobile, site/canonical/sitemap, logo 44px).
- À FAIRE en passe de cohérence inter-modules : contenu du ModuleScript `Config` (module 02 vs `Config.Zones` du module 05), structure des données joueur (module 04 vs 05/06/08), convention `Etape`.
- Cohérence à vérifier aussi : format du Catalogue (module 10 suppose `{ [id] = { prix = … } }`) vs module 04.
- Cohérence : noms d'UI du module 09 (InterfaceObby, CompteurPieces, BoutonBoutique) à aligner sur le module 04.
