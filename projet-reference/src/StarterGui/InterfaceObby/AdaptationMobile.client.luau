-- Nouveau LocalScript « AdaptationMobile », placé dans StarterGui > InterfaceObby
-- (le ScreenGui du module 5, à côté de ScriptInterface).
-- InterfaceObby contient le TextButton « BoutonBoutique » créé au module 5.
local UserInputService = game:GetService("UserInputService")

local interface = script.Parent
local boutonBoutique = interface:WaitForChild("BoutonBoutique") :: TextButton

-- Tailles en Scale : une fraction de l'écran, pas des pixels
local TAILLE_TACTILE = UDim2.fromScale(0.2, 0.12) -- plus grand pour le doigt
local TAILLE_CLAVIER_SOURIS = UDim2.fromScale(0.15, 0.08) -- la taille du module 5

local function adapterInterface()
	if UserInputService.PreferredInput == Enum.PreferredInput.Touch then
		-- Au doigt : un bouton plus grand, plus facile à toucher
		boutonBoutique.Size = TAILLE_TACTILE
	else
		-- Souris ou manette : un bouton plus discret suffit
		boutonBoutique.Size = TAILLE_CLAVIER_SOURIS
	end
end

-- On adapte une première fois au lancement…
adapterInterface()
-- … puis à chaque changement de mode de contrôle (manette branchée, etc.)
UserInputService:GetPropertyChangedSignal("PreferredInput"):Connect(adapterInterface)
