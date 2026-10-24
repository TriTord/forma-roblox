-- Script « PlateformesMobiles » dans ServerScriptService (côté serveur)
local TweenService = game:GetService("TweenService")
local Workspace = game:GetService("Workspace")

local dossier = Workspace:WaitForChild("PlateformesMobiles")

local function animerPlateforme(plateforme: Instance)
	if not plateforme:IsA("BasePart") then
		return
	end
	-- Un tween déplace la Part sans la physique : elle doit être ancrée
	plateforme.Anchored = true

	-- Réglages lus dans les attributs, avec des valeurs par défaut
	local deplacement = plateforme:GetAttribute("Deplacement")
	if typeof(deplacement) ~= "Vector3" then
		deplacement = Vector3.new(0, 8, 0)
	end
	local duree = plateforme:GetAttribute("Duree")
	if typeof(duree) ~= "number" then
		duree = 3
	end

	local infos = TweenInfo.new(
		duree, -- durée d'un aller
		Enum.EasingStyle.Sine, -- départ et arrivée en douceur
		Enum.EasingDirection.InOut,
		-1, -- répétition à l'infini
		true, -- aller-retour
		0 -- pas de délai
	)
	-- On ajoute le déplacement à la CFrame actuelle (position + rotation)
	local objectif = { CFrame = plateforme.CFrame + deplacement }

	TweenService:Create(plateforme, infos, objectif):Play()
end

for _, plateforme in dossier:GetChildren() do
	animerPlateforme(plateforme)
end
