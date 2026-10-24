-- LocalScript « AffichageRedemarrage » (côté client) à placer dans StarterPlayer > StarterPlayerScripts
-- Affiche l'annonce de redémarrage dans une notification Roblox
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local StarterGui = game:GetService("StarterGui")

local remotes = ReplicatedStorage:WaitForChild("Remotes")
local annonceRedemarrage = remotes:WaitForChild("AnnonceRedemarrage") :: RemoteEvent

annonceRedemarrage.OnClientEvent:Connect(function(message: string)
	-- SetCore peut échouer si l'interface Roblox n'est pas encore prête : on protège l'appel
	local ok, erreur = pcall(function()
		StarterGui:SetCore("SendNotification", {
			Title = "Mise à jour",
			Text = message,
			Duration = 15,
		})
	end)
	if not ok then
		warn("Notification impossible : " .. tostring(erreur))
	end
end)
