-- LocalScript « AffichageRound » dans StarterPlayer > StarterPlayerScripts (côté client)
-- Affiche l'état du round et les messages du serveur. Il n'envoie RIEN au serveur.
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Config = require(ReplicatedStorage:WaitForChild("Modules"):WaitForChild("Config"))
local etatRound = ReplicatedStorage:WaitForChild("EtatRound")
local notification = ReplicatedStorage:WaitForChild("Remotes"):WaitForChild("Notification") :: RemoteEvent

local joueur = Players.LocalPlayer
local interface = joueur:WaitForChild("PlayerGui"):WaitForChild("InterfaceLave")
local statut = interface:WaitForChild("Statut") :: TextLabel
local message = interface:WaitForChild("Message") :: TextLabel

local DUREE_MESSAGE = 3 -- secondes d'affichage d'un message

local function texteStatut(): string
	local phase = etatRound:GetAttribute("Phase")
	local temps = etatRound:GetAttribute("TempsRestant") or 0
	if phase == "Intermission" then
		return `Prochain round dans {temps} s`
	elseif phase == "EnJeu" then
		return `La lave monte ! Encore {temps} s`
	elseif phase == "Fin" then
		local survivants = etatRound:GetAttribute("Survivants") or 0
		return `Fin du round : {survivants} survivant(s)`
	end
	return `En attente de joueurs ({#Players:GetPlayers()}/{Config.JOUEURS_MIN})`
end

local function actualiser()
	statut.Text = texteStatut()
end

-- On réagit aux changements au lieu de vérifier à chaque image : rien ne tourne pour rien
etatRound:GetAttributeChangedSignal("Phase"):Connect(actualiser)
etatRound:GetAttributeChangedSignal("TempsRestant"):Connect(actualiser)
Players.PlayerAdded:Connect(actualiser)
Players.PlayerRemoving:Connect(function()
	task.defer(actualiser) -- le joueur qui part est encore dans la liste à cet instant
end)
actualiser()

local numeroMessage = 0
notification.OnClientEvent:Connect(function(texte: string)
	numeroMessage += 1
	local numero = numeroMessage
	message.Text = texte
	message.Visible = true
	task.delay(DUREE_MESSAGE, function()
		if numero == numeroMessage then -- un message plus récent ne doit pas être caché trop tôt
			message.Visible = false
		end
	end)
end)
