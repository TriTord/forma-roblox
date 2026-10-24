## Suivi des signalements transverses (tous résolus)

Plusieurs rapports de passe 2 listent, dans « Erreurs restantes », des problèmes **situés dans un autre module** que le vérificateur n'avait pas le droit de modifier. Ils ont tous été transmis par le chef d'orchestre et corrigés ensuite :

| # | Signalé par | Problème | Résolution |
|---|---|---|---|
| 1 | Module 10, passe 1 | `BindToClose` du module 04 n'attendait pas les sauvegardes lancées par `PlayerRemoving` | Corrigé au module 04 (passe 1) : compteur commun `sauvegardesEnCours`, `SauvegarderTout()`, limite 25 s sous les 30 s officielles |
| 2 | Module 07, passe 2 | `completer()` (module 04) ne mettait pas à jour `version` | Corrigé au module 04 (passe 1) |
| 3 | Module 03, passe 2 | Module 04 : phrase fausse sur « l'attribut du module 3 » et script Checkpoints sans contrôle de distance | Corrigé au module 04 (passe 2) : le script « Progression » du module 03 est conservé et seulement complété |
| 4 | Module 09, passe 2 | `BoutonBoutique` (module 04) dans la zone du joystick mobile | Corrigé au module 04 (passe 2) : bord gauche, mi-hauteur ; modules 09 alignés (cohérence A) |
| 5 | Module 06, passe 2 | `DonneesJoueurs.Sauvegarder` renvoyait `true` quand l'écriture était annulée | Corrigé au module 04 (passe 2) : `true` seulement si écrit ; `ProcessReceipt` du module 06 donc fiable |
| 6 | Module 00, passe 2 | `src/data/modules.ts` présentait les Premium Payouts comme actuels | Corrigé par le chef d'orchestre (Creator Rewards) |
| 7 | Module 04, passe 2 | Module 07 (extrait `completer` « inchangé »), module 09 (bouton à déplacer), module 10 (sauvegarde simplifiée non alignée) | Corrigés par l'intégration code (cohérence A) |
| 8 | Module 05, passes 1-2 | `Config.Zones` inexistant au module 02 ; module `Recompenses` homonyme d'un script du module 03 | Corrigé au module 05 (passe 2) : `Config.Niveaux` + ajouts documentés ; `RecompensesEtapes` |
| 9 | Modules 03 et 10 | Format et identifiants du `Catalogue` différents du module 04 | Alignés sur le module 04 (`TrailNuage` / `TrailSoleil` / `TrailAurore`, 25 / 75 / 150) |
| 10 | Modules 06 et 08 | Désaccord sur la règle des Daily Engagement Rewards | Tranché par le chef d'orchestre sur la source officielle (`creator-rewards.md`, exemples 1 et 2) : parmi les jeux où l'Active Spender passe ≥ 10 min, les trois premiers dans l'ordre des visites ; formulation unique (cohérence B) |
| 11 | Modules 01, 07, 10 | Chiffres de Roblox Kids and Select présentés différemment | Harmonisés (cohérence B) : 500 au lancement (juin 2026), 250 depuis le 19/08/2026 ; détail au seul module 07, renvois ailleurs |
| 12 | Relecture 00-03 | FAQ de l'accueil non sourcée sur les revenus | Remplacée par les chiffres officiels publiés par Roblox (septembre 2026) |
| 13 | Relecture 07-10 | Quiz 09-04 : `Touched` sur une Part `CanTouch = false` lève-t-il une erreur ? | Confirmé par la référence officielle `BasePart.CanTouch` |

Le code des 58 leçons a en outre été assemblé dans un **projet de référence** (`projet-reference/`, format Rojo) reproduisant exactement ce qu'obtient un élève qui suit toutes les consignes ; `luau-lsp analyze` avec les types Roblox et le sourcemap y rapporte **0 diagnostic**.

**Bilan : aucune erreur factuelle connue n'est laissée sans correction.** Les points « à surveiller » qui subsistent dans les rapports ne sont pas des erreurs mais :
- des **contradictions dans la documentation officielle elle-même** (ex. 5 ou 10 monnaies pour AnalyticsService, raccourci du MicroProfiler Ctrl+F6 / Ctrl+Alt+F6, conditions de remboursement Kids and Select), que les leçons signalent honnêtement ;
- des **comportements de l'interface de Studio non testables sans Studio connecté** (touches AZERTY de la caméra, requête de recherche de l'Explorer, valeurs affichées par défaut de certaines propriétés de streaming), formulés prudemment ;
- des **chiffres datés** (octobre 2026) qui évolueront, tous assortis de leur source et du champ `miseAJour`.
