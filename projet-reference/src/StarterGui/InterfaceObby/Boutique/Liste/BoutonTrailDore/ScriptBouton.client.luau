-- LocalScript placé dans le TextButton « BoutonTrailDore »
-- (StarterGui > InterfaceObby > Boutique > Liste > BoutonTrailDore)
local MarketplaceService = game:GetService("MarketplaceService")
local Players = game:GetService("Players")

local ID_PASS_TRAIL_DORE = 0 -- le même ID que dans le script serveur
local joueur = Players.LocalPlayer
local bouton = script.Parent :: TextButton

-- Affiche le prix réel : il peut varier selon le pays ou une réduction
local ok, infos = pcall(function()
	return MarketplaceService:GetProductInfoAsync(ID_PASS_TRAIL_DORE, Enum.InfoType.GamePass)
end)
if ok and infos.PriceInRobux then
	bouton.Text = "Traînée dorée : " .. infos.PriceInRobux .. " Robux"
end

-- Si le joueur possède déjà le pass, on l'indique sur le bouton
local function mettreAJourBouton()
	if joueur:GetAttribute("PossedeTrailDore") then
		bouton.Text = "Traînée dorée : possédée"
	end
end

bouton.Activated:Connect(function()
	if joueur:GetAttribute("PossedeTrailDore") then
		return -- inutile de proposer un pass déjà possédé
	end
	MarketplaceService:PromptGamePassPurchase(joueur, ID_PASS_TRAIL_DORE)
end)

joueur:GetAttributeChangedSignal("PossedeTrailDore"):Connect(mettreAJourBouton)
mettreAJourBouton()
