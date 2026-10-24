-- LocalScript « MessagesProgression » à placer dans StarterPlayer > StarterPlayerScripts
-- Affiche un message quand le joueur gagne des pièces ou atteint une nouvelle étape.
-- Le serveur reste le seul à modifier les valeurs : ici, on ne fait que les afficher.
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

local joueur = Players.LocalPlayer
local leaderstats = joueur:WaitForChild("leaderstats")
local etape = leaderstats:WaitForChild("Etape") :: IntValue
local pieces = leaderstats:WaitForChild("Pieces") :: IntValue

-- Petite interface créée par le script
local ecran = Instance.new("ScreenGui")
ecran.Name = "RetourBoucle"
ecran.ResetOnSpawn = false -- l'interface survit à la réapparition du personnage
ecran.Parent = joueur:WaitForChild("PlayerGui")

local message = Instance.new("TextLabel")
message.AnchorPoint = Vector2.new(0.5, 0)
message.Position = UDim2.fromScale(0.5, 0.15)
message.Size = UDim2.fromScale(0.5, 0.08)
message.BackgroundTransparency = 1
message.TextScaled = true
message.TextColor3 = Color3.fromRGB(255, 220, 80)
message.TextTransparency = 1 -- invisible au départ
message.TextStrokeTransparency = 1
message.Parent = ecran

local infoFondu = TweenInfo.new(1.5, Enum.EasingStyle.Quad, Enum.EasingDirection.In)

-- Affiche un texte puis le fait disparaître en fondu
local function afficher(texte: string)
	message.Text = texte
	message.TextTransparency = 0
	message.TextStrokeTransparency = 0.5
	local fondu = TweenService:Create(message, infoFondu, {
		TextTransparency = 1,
		TextStrokeTransparency = 1,
	})
	fondu:Play()
end

-- Sécurité : le script de sauvegarde du module 4 crée les leaderstats directement avec
-- les valeurs chargées. Mais si ton propre script les met à jour APRÈS les avoir créées
-- (ex. de 0 à 120 pièces), on ne veut pas célébrer ce saut : on attend un peu.
local pret = false
task.delay(3, function()
	pret = true
end)

local anciennesPieces = pieces.Value
pieces.Changed:Connect(function(nouvelleValeur: number)
	local gain = nouvelleValeur - anciennesPieces
	anciennesPieces = nouvelleValeur
	if pret and gain > 0 then
		afficher("+" .. gain .. " pièce" .. (if gain > 1 then "s" else ""))
	end
end)

local ancienneEtape = etape.Value
etape.Changed:Connect(function(nouvelleEtape: number)
	local progresse = nouvelleEtape > ancienneEtape
	ancienneEtape = nouvelleEtape
	if pret and progresse then
		afficher("Étape " .. nouvelleEtape .. " atteinte !")
	end
end)
