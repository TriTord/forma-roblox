-- Script « Victoire » dans ServerScriptService (côté serveur)
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Workspace = game:GetService("Workspace")

local victoire = ReplicatedStorage:WaitForChild("Remotes"):WaitForChild("Victoire") :: RemoteEvent
local dossierCheckpoints = Workspace:WaitForChild("Checkpoints")

-- Le dernier checkpoint porte le plus grand numéro (le dossier ne contient que les Parts "1", "2"…)
local derniereEtape = #dossierCheckpoints:GetChildren()

local function surArrivee(player: Player)
	-- Les leaderstats apparaissent une fois les données chargées (leçon 2)
	local leaderstats = player:WaitForChild("leaderstats", 60)
	if leaderstats == nil then
		return
	end
	local etape = leaderstats:WaitForChild("Etape")
	if not etape:IsA("IntValue") then
		return
	end

	-- Changed donne la nouvelle valeur à chaque changement d'étape
	etape.Changed:Connect(function(nouvelleEtape: number)
		if nouvelleEtape == derniereEtape then
			victoire:FireClient(player) -- « tu as gagné, joue l'animation ! »
		end
	end)
end

Players.PlayerAdded:Connect(surArrivee)
for _, player in Players:GetPlayers() do
	task.spawn(surArrivee, player)
end
