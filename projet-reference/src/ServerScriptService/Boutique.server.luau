-- Script « Boutique » dans ServerScriptService (côté serveur)
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerScriptService = game:GetService("ServerScriptService")

local DonneesJoueurs = require(ServerScriptService:WaitForChild("DonneesJoueurs"))
local Validation = require(ServerScriptService:WaitForChild("Validation")) -- module 3, leçon 4
local Catalogue = require(ReplicatedStorage:WaitForChild("Modules"):WaitForChild("Catalogue"))
local AnalytiqueEconomie = require(ServerScriptService:WaitForChild("AnalytiqueEconomie")) -- module 8, leçon 5

local remotes = ReplicatedStorage:WaitForChild("Remotes")
local acheterObjet = remotes:WaitForChild("AcheterObjet") :: RemoteEvent
local equiperObjet = remotes:WaitForChild("EquiperObjet") :: RemoteEvent

local NOMS_TRAINEE = { "TraineeObby", "TraineeHaut", "TraineeBas" }
local LONGUEUR_ID_MAX = 50 -- aucun identifiant du catalogue n'est plus long
local peutAcheter = Validation.creerCooldown(1) -- un achat par seconde maximum (module 3)
local peutEquiper = Validation.creerCooldown(0.5) -- limite aussi le spam d'équipement

-- Retrouve une statistique des leaderstats (voir leçon 1)
local function obtenirStat(player: Player, nomStat: string): IntValue?
	local leaderstats = player:FindFirstChild("leaderstats")
	local stat = leaderstats and leaderstats:FindFirstChild(nomStat)
	if stat and stat:IsA("IntValue") then
		return stat
	end
	return nil
end

-- Publie l'inventaire sous forme d'attributs (répliqués vers les clients)
local function publierInventaire(player: Player, donnees: { [string]: any })
	for idObjet in Catalogue do
		player:SetAttribute("Possede_" .. idObjet, donnees.inventaire[idObjet] == true)
	end
	player:SetAttribute("TrailEquipe", donnees.equipe)
end

-- Pose (ou retire) la traînée équipée sur le personnage du joueur
local function appliquerTrainee(player: Player)
	local donnees = DonneesJoueurs.Obtenir(player)
	local personnage = player.Character
	if donnees == nil or personnage == nil then
		return
	end
	local racine = personnage:WaitForChild("HumanoidRootPart", 5)
	if racine == nil or not racine:IsA("BasePart") then
		return
	end

	-- 1. On retire l'ancienne traînée, s'il y en a une
	for _, nom in NOMS_TRAINEE do
		local ancien = racine:FindFirstChild(nom)
		if ancien then
			ancien:Destroy()
		end
	end

	-- 2. Rien d'équipé (ou objet retiré du catalogue) : on s'arrête là
	local objet = Catalogue[donnees.equipe]
	if objet == nil then
		return
	end

	-- 3. Une traînée se dessine entre deux Attachments
	local haut = Instance.new("Attachment")
	haut.Name = "TraineeHaut"
	haut.Position = Vector3.new(0, 0.8, 0)
	haut.Parent = racine

	local bas = Instance.new("Attachment")
	bas.Name = "TraineeBas"
	bas.Position = Vector3.new(0, -0.8, 0)
	bas.Parent = racine

	local trainee = Instance.new("Trail")
	trainee.Name = "TraineeObby"
	trainee.Attachment0 = haut
	trainee.Attachment1 = bas
	trainee.Color = ColorSequence.new(objet.couleurDebut, objet.couleurFin)
	trainee.Lifetime = 0.6 -- durée de vie de chaque segment, en secondes
	trainee.Parent = racine
end

-- ACHAT : le client envoie seulement l'identifiant de l'objet
acheterObjet.OnServerEvent:Connect(function(player: Player, idObjet: unknown)
	-- 1. Un texte de taille raisonnable ? (un exploiteur peut envoyer n'importe quoi)
	if typeof(idObjet) ~= "string" or not Validation.estTexte(idObjet, LONGUEUR_ID_MAX) then
		return
	end
	-- Pas plus d'une demande par seconde (cooldown du module 3)
	if not peutAcheter(player) then
		return
	end
	-- 2. L'objet existe ? Le prix vient du catalogue DU SERVEUR
	local objet = Catalogue[idObjet]
	local donnees = DonneesJoueurs.Obtenir(player)
	if objet == nil or donnees == nil then
		return
	end
	-- 3. Pas déjà possédé ?
	if donnees.inventaire[idObjet] then
		return
	end
	-- 4. Assez de pièces ?
	local pieces = obtenirStat(player, "Pieces")
	if pieces == nil or pieces.Value < objet.prix then
		return
	end

	-- Tout est valide : on débite, puis on donne l'objet
	pieces.Value -= objet.prix
	donnees.inventaire[idObjet] = true
	AnalytiqueEconomie.achat(player, idObjet, objet.prix, pieces.Value) -- module 8 : solde APRÈS l'achat
	publierInventaire(player, donnees)
end)

-- ÉQUIPEMENT : "" retire la traînée, sinon il faut posséder l'objet
equiperObjet.OnServerEvent:Connect(function(player: Player, idObjet: unknown)
	-- "" est accepté ici (retirer la traînée) : on vérifie donc le type et la longueur à la main
	if typeof(idObjet) ~= "string" or #idObjet > LONGUEUR_ID_MAX then
		return
	end
	if not peutEquiper(player) then
		return
	end
	local donnees = DonneesJoueurs.Obtenir(player)
	if donnees == nil then
		return
	end
	if idObjet ~= "" and not donnees.inventaire[idObjet] then
		return -- on ne peut pas équiper un objet qu'on ne possède pas
	end

	donnees.equipe = idObjet
	publierInventaire(player, donnees)
	appliquerTrainee(player)
end)

-- ARRIVÉE : on attend que les données soient chargées (leçon 2)
local function surArrivee(player: Player)
	-- Les leaderstats n'apparaissent qu'après un chargement réussi
	local leaderstats = player:WaitForChild("leaderstats", 60)
	local donnees = DonneesJoueurs.Obtenir(player)
	if leaderstats == nil or donnees == nil then
		return
	end
	publierInventaire(player, donnees)

	-- La traînée doit être reposée à chaque réapparition
	player.CharacterAdded:Connect(function()
		appliquerTrainee(player)
	end)
	if player.Character then
		appliquerTrainee(player)
	end
end

Players.PlayerAdded:Connect(surArrivee)
for _, player in Players:GetPlayers() do
	task.spawn(surArrivee, player)
end
