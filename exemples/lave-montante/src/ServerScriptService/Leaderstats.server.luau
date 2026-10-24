-- Script « Leaderstats » dans ServerScriptService (côté serveur)
-- Crée le tableau des scores de chaque joueur : Pieces et Victoires.
local Players = game:GetService("Players")

local function creerLeaderstats(player: Player)
	local leaderstats = Instance.new("Folder")
	leaderstats.Name = "leaderstats" -- nom exact attendu par Roblox (en minuscules)

	local pieces = Instance.new("IntValue")
	pieces.Name = "Pieces"
	pieces.Parent = leaderstats

	local victoires = Instance.new("IntValue")
	victoires.Name = "Victoires"
	victoires.Parent = leaderstats

	leaderstats.Parent = player
end

Players.PlayerAdded:Connect(creerLeaderstats)

-- Joueurs déjà présents avant le démarrage du script (fréquent en test dans Studio)
for _, player in Players:GetPlayers() do
	task.spawn(creerLeaderstats, player)
end
