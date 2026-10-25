-- ModuleScript « ReglesRound » dans ReplicatedStorage > Modules
-- Les règles du round sous forme de calculs PURS : aucun service Roblox, aucune instance.
-- C'est ce qui permet de les tester automatiquement en dehors de Studio (module 2, leçon 6).
local ReglesRound = {}

-- Vrai si assez de joueurs sont connectés pour lancer un round
function ReglesRound.assezDeJoueurs(nombreJoueurs: number, minimum: number): boolean
	return nombreJoueurs >= minimum
end

-- Hauteur de la lave (en studs au-dessus de son point de départ) après « tempsEcoule » secondes de round.
-- La lave attend « delai » secondes, puis monte régulièrement jusqu'à « hauteurMax » à la fin du round.
function ReglesRound.hauteurLave(tempsEcoule: number, delai: number, dureeRound: number, hauteurMax: number): number
	if tempsEcoule <= delai then
		return 0
	end
	local progression = (tempsEcoule - delai) / (dureeRound - delai)
	return math.clamp(progression, 0, 1) * hauteurMax
end

-- Vrai si le centre du personnage (sa PrimaryPart, la HumanoidRootPart) est passé sous le dessus de la lave
function ReglesRound.estSousLaLave(hauteurJoueur: number, hauteurDessusLave: number): boolean
	return hauteurJoueur < hauteurDessusLave
end

-- Pièces gagnées par CHAQUE survivant à la fin du round
function ReglesRound.recompense(
	nombreSurvivants: number,
	nombreParticipants: number,
	base: number,
	bonusDernier: number
): number
	if nombreSurvivants <= 0 then
		return 0
	end
	if nombreSurvivants == 1 and nombreParticipants >= 2 then
		return base + bonusDernier -- le dernier survivant d'un round à plusieurs gagne un bonus
	end
	return base
end

return ReglesRound
