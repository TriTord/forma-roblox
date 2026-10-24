-- LocalScript « ScriptInterface » dans StarterGui > InterfaceObby (côté client)
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Catalogue = require(ReplicatedStorage:WaitForChild("Modules"):WaitForChild("Catalogue"))
local remotes = ReplicatedStorage:WaitForChild("Remotes")
local acheterObjet = remotes:WaitForChild("AcheterObjet") :: RemoteEvent
local equiperObjet = remotes:WaitForChild("EquiperObjet") :: RemoteEvent

local joueur = Players.LocalPlayer
local interface = script.Parent
local texteCompteur = interface:WaitForChild("CompteurPieces"):WaitForChild("Texte") :: TextLabel
local fenetreBoutique = interface:WaitForChild("Boutique") :: Frame
local liste = fenetreBoutique:WaitForChild("Liste") :: Frame

-- 1. LE COMPTEUR : on lit les leaderstats (créées par le serveur)
local pieces = joueur:WaitForChild("leaderstats"):WaitForChild("Pieces") :: IntValue

local function majCompteur()
	texteCompteur.Text = `Pièces : {pieces.Value}`
end

pieces.Changed:Connect(majCompteur) -- à chaque changement de valeur
majCompteur() -- et une première fois au démarrage

-- (Le bloc « 2. OUVRIR / FERMER LA BOUTIQUE » a été supprimé au module 4, leçon 6 :
-- c'est AnimationsInterface qui ouvre et ferme la fenêtre.)

-- 3. LES BOUTONS DES OBJETS, fabriqués à partir du catalogue
local boutons: { [string]: TextButton } = {}

-- Texte d'un bouton selon l'état publié par le serveur (attributs, leçon 3)
local function texteBouton(idObjet: string): string
	local objet = Catalogue[idObjet]
	if joueur:GetAttribute("TrailEquipe") == idObjet then
		return `{objet.nom}\nÉquipé`
	elseif joueur:GetAttribute("Possede_" .. idObjet) == true then
		return `{objet.nom}\nÉquiper`
	end
	return `{objet.nom}\n{objet.prix} pièces`
end

local function majBoutons()
	for idObjet, bouton in boutons do
		bouton.Text = texteBouton(idObjet)
	end
end

for idObjet, objet in Catalogue do
	local bouton = Instance.new("TextButton")
	bouton.Name = idObjet
	bouton.BackgroundColor3 = objet.couleurDebut
	bouton.TextColor3 = Color3.fromRGB(30, 30, 50) -- texte foncé : bon contraste
	bouton.TextScaled = true

	local coins = Instance.new("UICorner")
	coins.Parent = bouton

	local tailleTexte = Instance.new("UITextSizeConstraint")
	tailleTexte.MinTextSize = 12
	tailleTexte.MaxTextSize = 28
	tailleTexte.Parent = bouton

	-- Le client DEMANDE ; c'est le serveur qui vérifie et décide
	bouton.Activated:Connect(function()
		if joueur:GetAttribute("TrailEquipe") == idObjet then
			equiperObjet:FireServer("") -- déjà équipé : on retire
		elseif joueur:GetAttribute("Possede_" .. idObjet) == true then
			equiperObjet:FireServer(idObjet)
		else
			acheterObjet:FireServer(idObjet)
		end
	end)

	bouton.Parent = liste -- le UIGridLayout le range automatiquement
	boutons[idObjet] = bouton
	joueur:GetAttributeChangedSignal("Possede_" .. idObjet):Connect(majBoutons)
end

joueur:GetAttributeChangedSignal("TrailEquipe"):Connect(majBoutons)
majBoutons()
