# PROGRESS.md — Suivi du projet

## Étapes
- [x] 0. Initialisation (git, PROGRESS, DECISIONS)
- [x] 1. ARCHITECTE : stack, structure, composants (quiz, progression, badges, recherche), plan des leçons
- [x] 2. Validation du plan par le chef d'orchestre (58 leçons, fil rouge « Obby des Nuages »)
- [x] 3. RÉDACTEURS : modules 0 à 10 (58 leçons + 11 examens)
- [x] 4. VÉRIFICATEURS passe 1 (faits + sources) — 11 modules
- [ ] 5. VÉRIFICATEURS passe 2 (indépendants : code Luau + quiz + re-vérif faits)
- [ ] 6. Consolidation VERIFICATION.md
- [ ] 7. QA : build, tests auto (Playwright/Vitest), bugs — phase 1 (infra de tests) EN COURS
- [ ] 8. Corrections + re-tests
- [ ] 9. RELECTEUR FINAL
- [ ] 10. RAPPORT_FINAL.md

## Suivi par module
| Module | Rédaction | Vérif passe 1 | Vérif passe 2 |
|---|---|---|---|
| 00 | FAIT | FAIT (16 corrections) | FAIT (17 corr.) ✅ |
| 01 | FAIT | FAIT (12 corrections) | FAIT (9 corr.) ✅ |
| 02 | FAIT | FAIT (14 corrections) | FAIT (12 corr.) ✅ |
| 03 | FAIT | FAIT (8 corrections) | FAIT (9 corr.) ✅ |
| 04 | FAIT | FAIT (13 corr., 1 suppr.) | en cours |
| 05 | FAIT | FAIT (21 corr., 2 suppr.) | FAIT (9 corr.) ✅ |
| 06 | FAIT | FAIT (22 corrections) | en cours |
| 07 | FAIT | FAIT (11 corrections) | FAIT (14 corr.) ✅ |
| 08 | FAIT | FAIT (11 corrections) | FAIT (9 corr.) ✅ |
| 09 | FAIT | FAIT (15 corrections) | FAIT (11 corr.) ✅ |
| 10 | FAIT | FAIT (24 corrections) | FAIT (21 corr.) ✅ |

## Outils
- Briefs : `C:\tmp\BRIEF_REDACTEUR.md`, `C:\tmp\BRIEF_VERIFICATEUR.md`
- Build concurrent : `bash scripts/build-verrou.sh`
- Analyse Luau : `node scripts/verifier-luau.mjs XX` (luau-lsp dans C:\tmp\luau-tools)

## Notes
- QA phase 1 terminée ; 7 bugs site corrigés par DEV (43 unit + 85 e2e OK).
- À FAIRE en passe de cohérence inter-modules : contenu du ModuleScript `Config` (module 02 vs `Config.Zones` du module 05), structure des données joueur (module 04 vs 05/06/08), convention `Etape`.
- Cohérence à vérifier aussi : format du Catalogue (module 10 suppose `{ [id] = { prix = … } }`) vs module 04.
- Cohérence : noms d'UI du module 09 (InterfaceObby, CompteurPieces, BoutonBoutique) à aligner sur le module 04.
- Désaccord passe1/passe2 module 08 (Daily Engagement Rewards) tranché par le chef d'orchestre sur create.roblox.com/docs/creator-rewards : la passe 2 a raison (ordre de lancement).
- Cohérence : harmoniser la présentation des seuils Kids & Select entre modules 01, 07, 10 (07 : 500 en juin puis 250 depuis le 19/08/2026).
