-- LocalScript « AnimationsInterface » dans StarterGui > InterfaceObby (côté client)
-- Remplace le bloc « 2. OUVRIR / FERMER LA BOUTIQUE » de ScriptInterface (leçon 4)
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

local joueur = Players.LocalPlayer
local interface = script.Parent
local boutonBoutique = interface:WaitForChild("BoutonBoutique") :: TextButton
local fenetreBoutique = interface:WaitForChild("Boutique") :: Frame
local compteur = interface:WaitForChild("CompteurPieces") :: Frame

-- 1. LA FENÊTRE QUI GLISSE
local POSITION_OUVERTE = UDim2.fromScale(0.5, 0.5) -- centre de l'écran
local POSITION_CACHEE = UDim2.fromScale(0.5, 1.5) -- sous le bas de l'écran

local infosOuverture = TweenInfo.new(0.35, Enum.EasingStyle.Back, Enum.EasingDirection.Out)
local infosFermeture = TweenInfo.new(0.25, Enum.EasingStyle.Quad, Enum.EasingDirection.In)

local ouverte = false
fenetreBoutique.Position = POSITION_CACHEE
fenetreBoutique.Visible = false

boutonBoutique.Activated:Connect(function()
	ouverte = not ouverte
	if ouverte then
		fenetreBoutique.Visible = true
		TweenService:Create(fenetreBoutique, infosOuverture, { Position = POSITION_OUVERTE }):Play()
	else
		local fermeture = TweenService:Create(fenetreBoutique, infosFermeture, { Position = POSITION_CACHEE })
		-- On ne masque la fenêtre qu'une fois la fermeture terminée
		fermeture.Completed:Connect(function(etat)
			-- Si le joueur a rouvert entre-temps, la fermeture a été annulée
			if etat == Enum.PlaybackState.Completed and not ouverte then
				fenetreBoutique.Visible = false
			end
		end)
		fermeture:Play()
	end
end)

-- 2. LE COMPTEUR QUI REBONDIT à chaque changement de pièces
local echelle = Instance.new("UIScale") -- agrandit le cadre ET tout son contenu
echelle.Parent = compteur

local pieces = joueur:WaitForChild("leaderstats"):WaitForChild("Pieces") :: IntValue
local infosRebond = TweenInfo.new(0.25, Enum.EasingStyle.Back, Enum.EasingDirection.Out)

pieces.Changed:Connect(function()
	echelle.Scale = 1.25 -- grossit d'un coup…
	TweenService:Create(echelle, infosRebond, { Scale = 1 }):Play() -- …et revient en rebondissant
end)
