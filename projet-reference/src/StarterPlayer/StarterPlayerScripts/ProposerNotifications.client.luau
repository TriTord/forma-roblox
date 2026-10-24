-- LocalScript « ProposerNotifications » à placer dans StarterPlayer > StarterPlayerScripts
-- Propose d'activer les notifications une fois le parcours terminé.
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ExperienceNotificationService = game:GetService("ExperienceNotificationService")

local Config = require(ReplicatedStorage:WaitForChild("Modules"):WaitForChild("Config"))
-- Dernière étape du parcours : etapeFin du dernier niveau de Config.Niveaux (module 3, leçon 6)
local DERNIERE_ETAPE = Config.Niveaux[#Config.Niveaux].etapeFin

local joueur = Players.LocalPlayer
local etape = joueur:WaitForChild("leaderstats"):WaitForChild("Etape") :: IntValue

local dejaPropose = false

-- Vérifie si Roblox autorise à afficher la demande (âge, déjà accepté, déjà vue récemment…)
local function peutProposer(): boolean
	local ok, resultat = pcall(function()
		return ExperienceNotificationService:CanPromptOptInAsync()
	end)
	return ok and resultat == true
end

etape.Changed:Connect(function(nouvelleEtape: number)
	if nouvelleEtape < DERNIERE_ETAPE or dejaPropose then
		return
	end
	dejaPropose = true
	task.wait(3) -- on laisse d'abord le joueur savourer sa victoire
	if peutProposer() then
		pcall(function()
			ExperienceNotificationService:PromptOptIn()
		end)
	end
end)
