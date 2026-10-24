-- LocalScript « GuideCheckpoint » à placer dans StarterPlayer > StarterPlayerScripts
-- Affiche un faisceau entre le personnage et le prochain checkpoint,
-- seulement pendant les premières étapes (onboarding).
local Players = game:GetService("Players")
local Workspace = game:GetService("Workspace")

local ETAPES_GUIDEES = 2 -- on guide vers les checkpoints 1 et 2, puis plus rien

local joueur = Players.LocalPlayer
local etape = joueur:WaitForChild("leaderstats"):WaitForChild("Etape") :: IntValue
local dossierCheckpoints = Workspace:WaitForChild("Checkpoints")

-- On garde la liste des objets créés pour pouvoir les supprimer
local elementsGuide: { Instance } = {}

local function retirerGuide()
	for _, element in elementsGuide do
		element:Destroy()
	end
	table.clear(elementsGuide)
end

local function placerGuide()
	retirerGuide()

	local prochaine = etape.Value + 1
	if prochaine > ETAPES_GUIDEES then
		return -- le joueur connaît le principe : on ne le guide plus
	end

	local personnage = joueur.Character
	local racine = personnage and personnage:FindFirstChild("HumanoidRootPart")
	-- Avec le streaming (module 9), un checkpoint lointain peut ne pas être encore chargé
	local cible = dossierCheckpoints:FindFirstChild(tostring(prochaine))
	if not (racine and cible and cible:IsA("BasePart")) then
		return
	end

	-- Un point d'attache sur le joueur, un autre sur le checkpoint
	local attacheJoueur = Instance.new("Attachment")
	attacheJoueur.Parent = racine
	local attacheCible = Instance.new("Attachment")
	attacheCible.Parent = cible

	-- Le faisceau lui-même, visible uniquement par ce joueur (créé côté client)
	local faisceau = Instance.new("Beam")
	faisceau.Attachment0 = attacheJoueur
	faisceau.Attachment1 = attacheCible
	faisceau.FaceCamera = true
	faisceau.Width0 = 0.3
	faisceau.Width1 = 0.3
	faisceau.Color = ColorSequence.new(Color3.fromRGB(255, 220, 80))
	faisceau.Parent = cible

	table.insert(elementsGuide, attacheJoueur)
	table.insert(elementsGuide, attacheCible)
	table.insert(elementsGuide, faisceau)
end

-- Nouvelle étape atteinte : on vise le checkpoint suivant (ou on arrête de guider)
etape.Changed:Connect(placerGuide)

-- Réapparition du personnage : il faut recréer l'attache sur le nouveau corps
joueur.CharacterAdded:Connect(function(personnage)
	personnage:WaitForChild("HumanoidRootPart")
	placerGuide()
end)

-- Si le checkpoint visé arrive plus tard (chargement, streaming), on réessaie
dossierCheckpoints.ChildAdded:Connect(function(enfant)
	if enfant.Name == tostring(etape.Value + 1) then
		placerGuide()
	end
end)

if joueur.Character then
	placerGuide()
end
