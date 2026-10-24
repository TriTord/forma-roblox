# VERIFICATION.md — Vérification du contenu

Ce fichier est généré par `node scripts/consolider-verification.mjs` à partir des rapports détaillés du dossier [`verification/`](verification/).

## Méthode

Chaque module a suivi la même boucle qualité :

1. **Rédaction** par un rédacteur dédié, qui a sourcé chaque affirmation et listé ses doutes dans `verification/module-XX-notes-redacteur.md`.
2. **Vérification passe 1** par un vérificateur indépendant du rédacteur : faits, chiffres, noms d'API et de fonctionnalités confrontés aux sources officielles (create.roblox.com/docs et son dépôt GitHub, annonces officielles du staff sur le DevForum, en.help.roblox.com, roblox.com/info, Newsroom / about.roblox.com, luau.org) ; quiz ; code Luau.
3. **Vérification passe 2** par un second vérificateur indépendant, qui ne fait pas confiance à la passe 1 : il refait la vérification, se concentre sur le code Luau à l'exécution, les quiz et la clarté, et consigne ses désaccords avec la passe 1.
4. **Cohérence inter-modules** : assemblage du code du fil rouge dans un projet de référence analysé par luau-lsp avec types Roblox, et harmonisation des faits répétés d'un module à l'autre.
5. **Relecture finale** comme un élève débutant.

Outils utilisés : `luau-lsp analyze` avec les définitions de types Roblox (`node scripts/verifier-luau.mjs`), interpréteur `luau` pour la sémantique du langage pur, WebFetch/WebSearch sur les sources officielles.

Règles appliquées : toute information fausse, obsolète ou invérifiable est corrigée, reformulée prudemment ou supprimée ; les chiffres qui évoluent sont datés (« au moment de la rédaction, octobre 2026 ») avec leur source ; aucun « secret de succès » : chaque conseil s'appuie sur une source, des données Roblox, ou est présenté comme un retour d'expérience de développeurs ou un choix de la formation.

**Limite connue commune à tous les modules** : aucune instance de Roblox Studio n'était connectée pendant la vérification. Le code a été vérifié par analyse statique (luau-lsp + types Roblox), exécution du Luau pur quand c'était possible, et raisonnement sur la documentation officielle (ordre de chargement des personnages, réplication…), mais pas exécuté dans un vrai serveur Roblox. Les points concernés sont signalés dans les rapports.
