-- Script (côté serveur) à placer dans ServerScriptService, nommé « GamePassTrail »
local MarketplaceService = game:GetService("MarketplaceService")
local Players = game:GetService("Players")

local ID_PASS_TRAIL_DORE = 0 -- remplace 0 par l'ID de TON pass (Copy Asset ID)

-- Ajoute une traînée dorée au personnage (si elle n'y est pas déjà)
local function ajouterTrail(character: Model)
	local rootPart = character:WaitForChild("HumanoidRootPart", 5)
	if rootPart == nil or rootPart:FindFirstChild("TrailDore") then
		return
	end

	-- Une traînée a besoin de deux points d'attache (Attachments)
	local haut = Instance.new("Attachment")
	haut.Name = "TrailHaut"
	haut.Position = Vector3.new(0, 1, 0)
	haut.Parent = rootPart

	local bas = Instance.new("Attachment")
	bas.Name = "TrailBas"
	bas.Position = Vector3.new(0, -1, 0)
	bas.Parent = rootPart

	local trail = Instance.new("Trail")
	trail.Name = "TrailDore"
	trail.Attachment0 = haut
	trail.Attachment1 = bas
	trail.Color = ColorSequence.new(Color3.fromRGB(255, 210, 80))
	trail.Lifetime = 0.6
	trail.Parent = rootPart
end

-- Donne l'avantage : on le note dans un attribut, puis on l'applique
local function accorderPass(player: Player)
	player:SetAttribute("PossedeTrailDore", true)
	if player.Character then
		ajouterTrail(player.Character)
	end
end

-- Vérifie la possession du pass, avec quelques nouvelles tentatives
local function verifierPass(player: Player)
	for tentative = 1, 3 do
		local ok, resultat = pcall(function()
			return MarketplaceService:UserOwnsGamePassAsync(player.UserId, ID_PASS_TRAIL_DORE)
		end)
		if ok then
			if resultat == true then
				accorderPass(player)
			end
			return
		end
		warn("Vérification du pass impossible (essai " .. tentative .. ") : " .. tostring(resultat))
		task.wait(2)
	end
end

local function onPlayerAdded(player: Player)
	-- À chaque réapparition, on remet la traînée si le joueur a le pass
	player.CharacterAdded:Connect(function(character)
		if player:GetAttribute("PossedeTrailDore") then
			ajouterTrail(character)
		end
	end)
	verifierPass(player)
end

Players.PlayerAdded:Connect(onPlayerAdded)
-- Joueurs déjà présents si le script démarre en retard
for _, player in Players:GetPlayers() do
	task.spawn(onPlayerAdded, player)
end

-- Achat terminé : on ne donne l'avantage que si l'achat a RÉUSSI
MarketplaceService.PromptGamePassPurchaseFinished:Connect(function(player, idPass, achete)
	if achete and idPass == ID_PASS_TRAIL_DORE then
		accorderPass(player)
	end
end)
