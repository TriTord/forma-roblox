-- ModuleScript « RecompensesEtapes » dans ServerScriptService
-- À appeler depuis le script qui valide les checkpoints (modules 4 et 5), côté serveur uniquement.
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Config = require(ReplicatedStorage:WaitForChild("Modules"):WaitForChild("Config"))

local RecompensesEtapes = {}

-- Fait passer le joueur à l'étape suivante et lui verse la récompense correspondante.
-- Renvoie true si l'étape a été acceptée.
function RecompensesEtapes.valider(player: Player, nouvelleEtape: number): boolean
	local stats = player:FindFirstChild("leaderstats")
	if not stats then
		return false
	end
	local etape = stats:FindFirstChild("Etape") :: IntValue?
	local pieces = stats:FindFirstChild("Pieces") :: IntValue?
	if not (etape and pieces) then
		return false
	end

	-- Seule l'étape qui suit immédiatement est acceptée : pas de saut d'étape, pas de « farm »
	if nouvelleEtape ~= etape.Value + 1 then
		return false
	end

	etape.Value = nouvelleEtape
	pieces.Value += Config.recompensePourEtape(nouvelleEtape)
	return true
end

return RecompensesEtapes
