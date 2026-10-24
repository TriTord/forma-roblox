-- LocalScript « PiecesTournantesClient » placé dans StarterPlayerScripts
-- (Supprime le Script serveur « PiecesTournantes » et les éventuels scripts
-- de rotation restés dans chaque pièce.)
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local Workspace = game:GetService("Workspace")

-- Config est dans ReplicatedStorage.Modules : le client peut le lire
local Config = require(ReplicatedStorage:WaitForChild("Modules"):WaitForChild("Config"))

local dossierPieces = Workspace:WaitForChild("Pieces")
local VITESSE_ROTATION = math.rad(Config.VITESSE_ROTATION_PIECES) -- en radians par seconde

-- Les pièces actuellement chargées chez CE joueur (le streaming en ajoute et en retire)
local piecesChargees: { [BasePart]: boolean } = {}

local function ajouterPiece(objet: Instance)
	if objet:IsA("BasePart") then
		piecesChargees[objet] = true
	end
end

local function retirerPiece(objet: Instance)
	if objet:IsA("BasePart") then
		piecesChargees[objet] = nil
	end
end

-- Les pièces déjà là, puis celles qui arrivent ou repartent
for _, objet in dossierPieces:GetChildren() do
	ajouterPiece(objet)
end
dossierPieces.ChildAdded:Connect(ajouterPiece)
dossierPieces.ChildRemoved:Connect(retirerPiece)

-- Ici, une mise à jour à chaque image est justifiée : c'est une animation visible.
RunService.PreRender:Connect(function(deltaTime: number)
	local rotation = CFrame.Angles(0, VITESSE_ROTATION * deltaTime, 0)
	for piece in piecesChargees do
		piece.CFrame = piece.CFrame * rotation
	end
end)
