# Brief du RELECTEUR FINAL — Phase IA

Projet : site de formation en français « Créer un jeu Roblox qui marche, de A à Z » (Astro + MDX), dossier `C:\Users\t9lev\Documents\Forma Roblox`. Date : 2026-10-25. Autonomie totale, aucune question, **pas de commit git**. Un autre relecteur travaille en parallèle : ne modifie QUE les fichiers de ta mission.

Le contenu de la phase IA (module 02 « Scripter avec l'IA : piloter Claude Code » et encadrés « Avec Claude Code » dans les autres modules) a été rédigé puis vérifié deux fois sur les sources officielles (rapports dans `verification/phase-ia/`). Conventions : `docs/briefs/BRIEF_PHASE_IA_REDACTEUR.md` ; format : `AUTHORING.md`.

## Ton personnage
Tu relis **comme un débutant total** : 13-16 ans (ou adulte) qui a fini le module 01 (il sait se servir de Roblox Studio), **n'a jamais ouvert un terminal, n'a jamais utilisé Git, VS Code ni une IA de code**, et ne connaît pas encore Luau (il l'apprend au module 03, juste après). Il est seul devant son ordinateur (Windows ou Mac), sans personne pour l'aider.

## Pour chaque leçon, dans l'ordre du parcours
1. **Faisabilité sans aide extérieure** : chaque étape dit où cliquer, quoi taper, à quoi ressemble le résultat attendu, et quoi faire si ça échoue. Repère tout endroit où tu serais bloqué : terme jamais expliqué (terminal, dossier courant, chemin, commit, dépôt, prompt, contexte, token, MCP, hook, sous-agent…), commande sans explication, étape Windows/Mac manquante, renvoi vers une notion pas encore vue sans résumé d'une phrase. Ajoute l'explication manquante (courte) ou l'étape oubliée.
2. **Clarté et charge** : phrases trop longues, paragraphes trop denses, trop de jargon ou de précautions d'un coup → simplifie sans perdre l'exactitude. Les leçons très longues (02/02, 02/03, 02/05, 02/10) doivent rester navigables : titres `##`/`###` clairs, résumé utile ; tu peux ajouter une phrase d'orientation (« Si tu es pressé, fais d'abord… ») mais ne supprime pas de contenu utile.
3. **Le message central** est-il compris ? « Plus le prompt est précis (contexte, objectif, contraintes, critères de réussite), meilleur est le résultat » et « on apprend à lire, diriger et vérifier ». Les prompts sont-ils compréhensibles par un débutant (il doit savoir ce qu'il doit remplacer entre crochets) ?
4. **Langue** : orthographe, grammaire, accords, typographie française (« », espaces avant `: ; ! ?` cohérentes), tutoiement partout, ton chaleureux et motivant sans être infantilisant.
5. **Structure** : objectifs → explications → au moins une `<Astuce>` et une `<Erreur>` → `<Resume>` → `<Sources>` ; encadrés `<AvecClaudeCode>` au format du brief.
6. **Quiz et examen** : énoncés compréhensibles, pas de piège injuste ; un élève qui a lu la leçon peut répondre.
7. **Honnêteté** : pas de promesse ; règle d'âge (décision 38) présente là où l'on parle de créer un compte.

## Interdits
- Ne change AUCUN fait, chiffre, commande, option, nom d'API ou prix vérifié sans source officielle à l'appui (si tu penses qu'il est faux, vérifie-le et corrige avec la source, sinon signale-le).
- Ne modifie pas la logique du code Luau ni le texte des commandes (tu peux corriger un commentaire). Si un code ou une commande te paraît faux, signale-le.
- Ne modifie pas la sémantique des prompts (tu peux corriger une faute ou clarifier une consigne entre crochets).

## À la fin
- `bash scripts/build-verrou.sh` doit passer.
- Rapport : chemin donné dans ta mission : résumé (leçons relues, types de corrections), tableau des corrections notables (leçon | problème | correction), section « Points de blocage pour un débutant » (corrigés ou non), section « Points signalés non corrigés ».
- Réponse finale COURTE (≤ 12 lignes).
