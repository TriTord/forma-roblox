-- LocalScript dans le TextButton « BoutonPasserEtape »
-- (StarterGui > InterfaceObby > Boutique > Liste > BoutonPasserEtape)
local MarketplaceService = game:GetService("MarketplaceService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local ID_PASSER_ETAPE = 0 -- l'ID de ton Developer Product
local bouton = script.Parent :: TextButton
local remotes = ReplicatedStorage:WaitForChild("Remotes")
local demanderPasserEtape = remotes:WaitForChild("DemanderPasserEtape") :: RemoteEvent

-- Lit le prix réel (régional, réduit ou en test) depuis Roblox
local function afficherPrix()
	local ok, infos = pcall(function()
		return MarketplaceService:GetProductInfoAsync(ID_PASSER_ETAPE, Enum.InfoType.Product)
	end)
	if ok and infos.PriceInRobux then
		bouton.Text = "Passer l'étape (" .. infos.PriceInRobux .. " Robux)"
	else
		bouton.Text = "Passer l'étape" -- mieux vaut aucun prix qu'un prix faux
	end
end

bouton.Activated:Connect(function()
	demanderPasserEtape:FireServer() -- le serveur vérifie puis ouvre la fenêtre d'achat
end)

afficherPrix()
