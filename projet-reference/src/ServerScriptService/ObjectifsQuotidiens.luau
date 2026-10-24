-- ModuleScript « ObjectifsQuotidiens » dans ServerScriptService
-- Objectif quotidien : ramasser un certain nombre de pièces dans la journée (UTC).
-- Ne fait aucun appel DataStore : on travaille sur la table de données du joueur
-- que DonneesJoueurs (module 5) charge et sauvegarde déjà.
local ObjectifsQuotidiens = {}

ObjectifsQuotidiens.PIECES_A_RAMASSER = 20
ObjectifsQuotidiens.BONUS = 15

local SECONDES_PAR_JOUR = 86400

-- Numéro du jour en temps universel : change à minuit UTC, pareil pour tous les serveurs
local function jourActuel(): number
	return math.floor(os.time() / SECONDES_PAR_JOUR)
end

-- Nouveau jour : on repart de zéro, sans rien retirer au joueur
local function mettreAJour(donnees)
	local aujourdhui = jourActuel()
	if donnees.jourObjectif ~= aujourdhui then
		donnees.jourObjectif = aujourdhui
		donnees.piecesDuJour = 0
		donnees.bonusReclame = false
	end
end

-- À appeler côté serveur chaque fois qu'une pièce ramassée est validée (module 4).
-- Renvoie le bonus à verser (0 la plupart du temps).
function ObjectifsQuotidiens.enregistrerPiece(donnees): number
	mettreAJour(donnees)
	donnees.piecesDuJour += 1
	if donnees.piecesDuJour >= ObjectifsQuotidiens.PIECES_A_RAMASSER and not donnees.bonusReclame then
		donnees.bonusReclame = true
		return ObjectifsQuotidiens.BONUS
	end
	return 0
end

-- Pour l'interface : renvoie la progression du jour, par exemple 12 et 20
function ObjectifsQuotidiens.progression(donnees): (number, number)
	mettreAJour(donnees)
	local objectif = ObjectifsQuotidiens.PIECES_A_RAMASSER
	return math.min(donnees.piecesDuJour, objectif), objectif
end

return ObjectifsQuotidiens
