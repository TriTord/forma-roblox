# Brief du RELECTEUR FINAL

Projet : site de formation en français « Créer un jeu Roblox qui marche, de A à Z » (Astro + MDX), dossier `C:\Users\t9lev\Documents\Forma Roblox`. Date : 2026-10-24. Autonomie totale, aucune question, pas de commit git. D'autres relecteurs travaillent en parallèle sur d'autres modules : ne modifie QUE les fichiers de tes modules (et ce qui est explicitement indiqué dans ta mission).

Tout le contenu a déjà été rédigé, vérifié deux fois sur les sources officielles, et mis en cohérence entre modules (rapports dans `verification/`). Format : `AUTHORING.md`. Plan : `PLAN.md`. Corrigé final du code : `projet-reference/`.

## Ton rôle
Relis TOUT le contenu de tes modules (leçons + quiz + examen) **comme un élève débutant de 13-16 ans** qui découvre Roblox Studio et la programmation, en suivant l'ordre du parcours. Pour chaque leçon :
1. **Clarté** : chaque terme technique est-il expliqué à sa première apparition ? Une étape manque-t-elle pour reproduire ce qui est décrit (où cliquer, où placer le script, quel type de script) ? Une phrase est-elle trop longue ou trop dense (trop de chiffres, trop de précautions juridiques) ? Simplifie sans perdre l'exactitude.
2. **Langue** : orthographe, grammaire, accords, typographie française (espaces insécables avant `: ; ! ?` facultatives mais cohérentes, guillemets « », apostrophes cohérentes), tutoiement partout, ton chaleureux et motivant sans être infantilisant.
3. **Structure** : objectifs (frontmatter) → explications → code commenté → au moins une `<Astuce>` et une `<Erreur>` → `<Resume>` → `<Sources>`. Titres `##`/`###` logiques pour la table des matières. Le résumé reprend vraiment l'essentiel.
4. **Quiz/examen** : énoncés compréhensibles, pas de piège injuste, explications pédagogiques ; un élève qui a lu la leçon attentivement doit pouvoir répondre.
5. **Cohérence** d'une leçon à l'autre et avec les modules voisins (ce qui est annoncé est tenu, mêmes noms).
6. **Motivation et honnêteté** : pas de promesse de succès ou de revenus ; encourager la persévérance.

## Interdits
- Ne change AUCUN fait, chiffre, nom d'API ou affirmation vérifiée sans source officielle à l'appui (si tu penses qu'un fait est faux, vérifie-le sur la source officielle et corrige avec la source, sinon signale-le dans ton rapport).
- Ne modifie pas la logique du code Luau (tu peux corriger un commentaire ou une faute dans un commentaire). Si un code te paraît faux, signale-le.
- Ne supprime pas de contenu utile pour raccourcir.

## À la fin
- `bash scripts/build-verrou.sh` doit passer.
- Rapport : `verification/relecture-finale-<tes modules>.md` (ex. `relecture-finale-00-03.md`) : résumé (nombre de leçons relues, types de corrections), tableau des corrections notables (leçon | problème | correction), et une section « Points signalés non corrigés » (ce qui dépasse ton rôle).
- Réponse finale COURTE (≤ 12 lignes) : volume de corrections, les plus importantes, points signalés.
