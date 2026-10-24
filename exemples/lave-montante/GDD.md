# Lave Montante — mini game design doc (v1)

## Le jeu en une phrase
Des rounds courts : les joueurs attendent dans un lobby, sont téléportés dans une arène, et doivent grimper pour échapper à la lave qui monte. Les survivants gagnent des pièces.

## Boucle de jeu
1. **Attente** dans le lobby tant qu'il y a moins de `JOUEURS_MIN` joueurs.
2. **Intermission** : compte à rebours de 15 s dans le lobby.
3. **Round** : téléportation dans l'arène ; 5 s de répit ; la lave monte jusqu'à 40 studs en 60 s.
4. Un joueur touché par la lave est éliminé (il réapparaît dans le lobby).
5. **Fin** : chaque survivant gagne 25 pièces (+25 s'il est le dernier survivant d'un round à plusieurs) et 1 victoire, puis retour au lobby.
6. On recommence.

## Règles
- Le serveur décide de tout : phases, chronomètre, élimination, récompenses. Le client n'envoie rien.
- Un joueur qui arrive pendant un round attend le suivant dans le lobby.
- Un joueur qui part pendant un round est retiré proprement.
- Entre deux rounds, il ne reste rien : lave détruite, connexions coupées, liste des participants vidée.

## Interface
- Un bandeau en haut de l'écran : « En attente de joueurs (1/2) », « Prochain round dans 12 s », « La lave monte ! Encore 34 s », « Fin du round : 2 survivant(s) ».
- Un message personnel au survivant : « Tu as survécu ! +25 pièces ».

## Hors périmètre de la v1
Sauvegarde des pièces (DataStore), boutique, plusieurs arènes, effets sonores, classement global.
