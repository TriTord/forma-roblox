-- Script (côté serveur) dans ServerScriptService, nommé « Achats »
-- C'est le SEUL script du jeu qui définit MarketplaceService.ProcessReceipt.
-- Il utilise le ModuleScript « DonneesJoueurs » du module 4 (DataStore « DonneesJoueurs_v1 »).
local MarketplaceService = game:GetService("MarketplaceService")
local Players = game:GetService("Players")
local ServerScriptService = game:GetService("ServerScriptService")
local Workspace = game:GetService("Workspace")

local DonneesJoueurs = require(ServerScriptService:WaitForChild("DonneesJoueurs"))

local ID_PASSER_ETAPE = 0 -- remplace 0 par l'ID de ton Developer Product
local PIECES_DE_SECOURS = 100 -- si le joueur est déjà tout au bout
local ATTENTE_MAX_DONNEES = 60 -- secondes d'attente maximum du chargement des données

type Donnees = { [string]: any }

-- Une fonction « donner » par produit. Deux règles :
-- 1) elle n'attend JAMAIS (pas de task.wait, pas d'appel réseau) ;
-- 2) elle écrit l'effet dans les leaderstats ET dans la table de données du joueur.
local function donnerPasserEtape(player: Player, donnees: Donnees, etape: IntValue, pieces: IntValue)
	local checkpoints = Workspace:FindFirstChild("Checkpoints")
	local prochain = checkpoints and checkpoints:FindFirstChild(tostring(etape.Value + 1))
	if prochain and prochain:IsA("BasePart") then
		etape.Value += 1
		donnees.etape = etape.Value
		local character = player.Character
		if character then
			character:PivotTo(prochain.CFrame + Vector3.new(0, 4, 0))
		end
	else
		-- Cas rare (le serveur ne propose pas l'achat à la dernière étape) :
		-- on ne laisse pas le joueur sans rien
		pieces.Value += PIECES_DE_SECOURS
		donnees.pieces = pieces.Value
	end
end

-- Table « ID du produit -> fonction qui le donne »
local produits: { [number]: (Player, Donnees, IntValue, IntValue) -> () } = {
	[ID_PASSER_ETAPE] = donnerPasserEtape,
}

-- Attend que les données du joueur soient chargées (module 4), tant qu'il est sur le serveur.
-- Les achats en attente sont rejoués dès l'arrivée du joueur, AVANT la fin du chargement.
local function attendreDonnees(player: Player): (Donnees?, IntValue?, IntValue?)
	local debut = os.clock()
	while player.Parent == Players and os.clock() - debut < ATTENTE_MAX_DONNEES do
		local donnees = DonneesJoueurs.Obtenir(player)
		local leaderstats = player:FindFirstChild("leaderstats")
		local etape = leaderstats and leaderstats:FindFirstChild("Etape")
		local pieces = leaderstats and leaderstats:FindFirstChild("Pieces")
		if donnees and etape and etape:IsA("IntValue") and pieces and pieces:IsA("IntValue") then
			return donnees, etape, pieces
		end
		task.wait(1)
	end
	return nil, nil, nil -- joueur parti, ou données jamais chargées
end

local function traiterRecu(receiptInfo)
	-- 1. Le joueur doit être sur CE serveur, et le produit doit être connu
	local player = Players:GetPlayerByUserId(receiptInfo.PlayerId)
	if player == nil then
		return Enum.ProductPurchaseDecision.NotProcessedYet
	end
	local donner = produits[receiptInfo.ProductId]
	if donner == nil then
		warn("Produit inconnu : " .. tostring(receiptInfo.ProductId))
		return Enum.ProductPurchaseDecision.NotProcessedYet
	end

	-- 2. Attendre que ses données soient chargées
	local donnees, etape, pieces = attendreDonnees(player)
	if donnees == nil or etape == nil or pieces == nil then
		return Enum.ProductPurchaseDecision.NotProcessedYet
	end

	-- 3. Déjà donné ? On regarde l'historique rangé DANS les données du joueur
	if donnees.achats == nil then
		donnees.achats = {} -- ancienne sauvegarde sans ce champ
	end
	if not donnees.achats[receiptInfo.PurchaseId] then
		-- 4. Donner ET noter l'achat, d'un seul bloc (aucune attente entre les deux)
		donner(player, donnees, etape, pieces)
		donnees.achats[receiptInfo.PurchaseId] = true
	end

	-- 5. Sauvegarder MAINTENANT ; PurchaseGranted seulement si la sauvegarde a réussi
	if DonneesJoueurs.Sauvegarder(player) then
		return Enum.ProductPurchaseDecision.PurchaseGranted
	end
	warn("Sauvegarde impossible, l'achat " .. tostring(receiptInfo.PurchaseId) .. " reviendra plus tard")
	return Enum.ProductPurchaseDecision.NotProcessedYet
end

MarketplaceService.ProcessReceipt = traiterRecu
