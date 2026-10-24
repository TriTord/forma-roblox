-- ModuleScript « Config » dans ReplicatedStorage > Modules (lu par le serveur ET par le client)
-- Tous les réglages du mini-jeu Lave Montante, au même endroit.
local Config = {
	JOUEURS_MIN = 2, -- joueurs nécessaires pour lancer un round (mets 1 pour tester seul)
	DUREE_INTERMISSION = 15, -- secondes d'attente dans le lobby avant chaque round
	DUREE_ROUND = 60, -- durée maximale d'un round, en secondes
	DELAI_AVANT_LAVE = 5, -- secondes de répit dans l'arène avant que la lave commence à monter
	HAUTEUR_MAX_LAVE = 40, -- hauteur atteinte par la lave à la fin du round, en studs
	RECOMPENSE_SURVIE = 25, -- pièces gagnées par chaque survivant
	BONUS_DERNIER_SURVIVANT = 25, -- bonus si un seul joueur survit à un round à plusieurs
	INTERVALLE_VERIFICATION = 0.2, -- secondes entre deux contrôles de la lave par le serveur
	DUREE_FIN_ROUND = 5, -- secondes d'affichage des résultats avant le retour au lobby
}

-- Personne ne peut modifier ces réglages pendant la partie (une erreur apparaîtrait)
return table.freeze(Config)
