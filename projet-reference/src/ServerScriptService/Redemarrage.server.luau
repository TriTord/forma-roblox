-- Script « Redemarrage » (côté serveur) à placer dans ServerScriptService
-- Prévient tous les joueurs quand un redémarrage est programmé
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remotes = ReplicatedStorage:WaitForChild("Remotes")
local annonceRedemarrage = remotes:WaitForChild("AnnonceRedemarrage") :: RemoteEvent

game.ServerRestartScheduled:Connect(function(restartTime, source)
	-- restartTime est un DateTime : on compare des secondes « Unix »
	local secondesRestantes = restartTime.UnixTimestamp - DateTime.now().UnixTimestamp
	secondesRestantes = math.max(0, secondesRestantes)
	local minutes = math.ceil(secondesRestantes / 60)

	local message
	if source == Enum.CloseReason.DeveloperUpdate then
		message = "Nouvelle version de l'Obby des Nuages ! Le serveur redémarre dans "
			.. minutes .. " min. Ta progression est sauvegardée."
	else
		message = "Maintenance de Roblox : le serveur redémarre dans " .. minutes .. " min."
	end

	-- On envoie le message à tous les joueurs présents sur ce serveur
	annonceRedemarrage:FireAllClients(message)
end)
