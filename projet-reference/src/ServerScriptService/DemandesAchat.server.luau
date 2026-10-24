-- Script (côté serveur) dans ServerScriptService, nommé « DemandesAchat »
-- Prérequis : un RemoteEvent « DemanderPasserEtape » dans ReplicatedStorage > Remotes
local MarketplaceService = game:GetService("MarketplaceService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Workspace = game:GetService("Workspace")

local ID_PASSER_ETAPE = 0 -- remplace 0 par l'ID de ton Developer Product
local DELAI_ENTRE_DEMANDES = 2 -- secondes, contre le spam

local remotes = ReplicatedStorage:WaitForChild("Remotes")
local demanderPasserEtape = remotes:WaitForChild("DemanderPasserEtape") :: RemoteEvent
local checkpoints = Workspace:WaitForChild("Checkpoints")

local derniereDemande: { [Player]: number } = {}

demanderPasserEtape.OnServerEvent:Connect(function(player)
	-- Limite de débit : une demande toutes les 2 secondes au maximum
	local maintenant = os.clock()
	if derniereDemande[player] and maintenant - derniereDemande[player] < DELAI_ENTRE_DEMANDES then
		return
	end
	derniereDemande[player] = maintenant

	-- On vérifie qu'il existe bien une étape suivante
	local leaderstats = player:FindFirstChild("leaderstats")
	local etape = leaderstats and leaderstats:FindFirstChild("Etape")
	if etape == nil or not etape:IsA("IntValue") then
		return
	end
	if checkpoints:FindFirstChild(tostring(etape.Value + 1)) == nil then
		return -- déjà à la dernière étape : on ne vend rien
	end

	MarketplaceService:PromptProductPurchase(player, ID_PASSER_ETAPE)
end)

game:GetService("Players").PlayerRemoving:Connect(function(player)
	derniereDemande[player] = nil -- on libère la mémoire
end)
