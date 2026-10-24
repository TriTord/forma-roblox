-- Script « Pieces » placé dans ServerScriptService (côté serveur)
local Players = game:GetService("Players")
local ServerScriptService = game:GetService("ServerScriptService")
local Workspace = game:GetService("Workspace")

local Validation = require(ServerScriptService:WaitForChild("Validation"))
local DonneesJoueurs = require(ServerScriptService:WaitForChild("DonneesJoueurs"))
local ObjectifsQuotidiens = require(ServerScriptService:WaitForChild("ObjectifsQuotidiens"))

local dossierPieces = Workspace:WaitForChild("Pieces")

local VALEUR_PIECE = 1 -- pièces gagnées par ramassage (valeur décidée par le SERVEUR)
local DISTANCE_MAX = 12 -- studs
local DELAI_REAPPARITION = 10 -- secondes avant que la pièce revienne

-- Un même joueur ne peut ramasser qu'une pièce toutes les 0,2 seconde
local peutRamasser = Validation.creerCooldown(0.2)

-- Ajoute le bonus du jour si l'objectif vient d'être atteint (module 5, leçon 4).
-- « pieces » est l'IntValue leaderstats.Pieces du joueur.
local function verifierObjectifDuJour(player: Player, pieces: IntValue)
	local donnees = DonneesJoueurs.Obtenir(player) -- table en mémoire (module 4)
	if donnees == nil then
		return -- données pas encore chargées : on ne compte rien
	end
	local bonus = ObjectifsQuotidiens.enregistrerPiece(donnees)
	if bonus > 0 then
		pieces.Value += bonus
	end
end

local function preparerPiece(piece: BasePart)
	local transparenceInitiale = piece.Transparency
	local disponible = true -- état connu du serveur seulement

	piece.Touched:Connect(function(partieTouchee: BasePart)
		if not disponible then
			return -- déjà ramassée (évite aussi les contacts multiples d'un même personnage)
		end

		local player = Players:GetPlayerFromCharacter(partieTouchee.Parent)
		if player == nil then
			return
		end

		-- Le personnage est-il vraiment à côté de la pièce ?
		if not Validation.estAPortee(player, piece.Position, DISTANCE_MAX) then
			return
		end

		-- Ramassage trop rapide pour ce joueur ?
		if not peutRamasser(player) then
			return
		end

		local leaderstats = player:FindFirstChild("leaderstats")
		local pieces = leaderstats and leaderstats:FindFirstChild("Pieces")
		if not (pieces and pieces:IsA("IntValue")) then
			return
		end

		-- On désactive la pièce AVANT de récompenser : un second contact ne passera pas
		disponible = false
		piece.Transparency = 1
		piece.CanTouch = false
		pieces.Value += VALEUR_PIECE
		verifierObjectifDuJour(player, pieces)

		task.delay(DELAI_REAPPARITION, function()
			disponible = true
			piece.Transparency = transparenceInitiale
			piece.CanTouch = true
		end)
	end)
end

for _, piece in dossierPieces:GetChildren() do
	if piece:IsA("BasePart") and piece.Name == "Piece" then
		preparerPiece(piece)
	end
end
