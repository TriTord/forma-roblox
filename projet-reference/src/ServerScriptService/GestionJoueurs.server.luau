-- Script « GestionJoueurs » dans ServerScriptService (côté serveur)
-- Remplace le Script « Leaderstats » de la leçon 1.
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local ServerScriptService = game:GetService("ServerScriptService")

local DonneesJoueurs = require(ServerScriptService:WaitForChild("DonneesJoueurs"))

local INTERVALLE_SAUVEGARDE = 180 -- secondes, comme dans l'exemple officiel de Roblox
-- false = comme l'exemple officiel : pas de sauvegarde à la fermeture d'un test Studio.
-- Passe-le à true, sur ta copie de test uniquement, pour tester la sauvegarde dans Studio.
local SAUVEGARDER_EN_STUDIO = false

-- Crée les leaderstats à partir des données chargées
local function creerLeaderstats(player: Player, donnees: { [string]: any })
	local leaderstats = Instance.new("Folder")
	leaderstats.Name = "leaderstats"

	local etape = Instance.new("IntValue")
	etape.Name = "Etape"
	etape.Value = donnees.etape
	etape.Parent = leaderstats

	local pieces = Instance.new("IntValue")
	pieces.Name = "Pieces"
	pieces.Value = donnees.pieces
	pieces.Parent = leaderstats

	leaderstats.Parent = player
end

local function surArrivee(player: Player)
	local donnees = DonneesJoueurs.Charger(player)
	if donnees == nil then
		player:Kick("Tes données n'ont pas pu être chargées. Réessaie dans quelques minutes !")
		return
	end
	-- Le joueur a pu partir pendant le chargement (qui prend parfois quelques secondes)
	if player.Parent ~= Players then
		DonneesJoueurs.Liberer(player)
		return
	end
	creerLeaderstats(player, donnees)
end

local function surDepart(player: Player)
	DonneesJoueurs.Sauvegarder(player) -- ne fait rien si le chargement avait échoué
	DonneesJoueurs.Liberer(player)
end

Players.PlayerAdded:Connect(surArrivee)
Players.PlayerRemoving:Connect(surDepart)
for _, player in Players:GetPlayers() do
	task.spawn(surArrivee, player)
end

-- Fermeture du serveur : on sauvegarde tout le monde EN PARALLÈLE et on attend
game:BindToClose(function()
	if RunService:IsStudio() and not SAUVEGARDER_EN_STUDIO then
		return -- recommandation de la référence API pour les tests dans Studio
	end
	DonneesJoueurs.SauvegarderTout()
end)

-- Sauvegarde automatique : un filet de sécurité si la sauvegarde finale échoue
task.spawn(function()
	while true do
		-- Un peu de hasard pour que tous les serveurs ne sauvegardent pas en même temps
		task.wait(INTERVALLE_SAUVEGARDE + math.random(0, 30))
		for _, player in Players:GetPlayers() do
			task.spawn(DonneesJoueurs.Sauvegarder, player)
		end
	end
end)
