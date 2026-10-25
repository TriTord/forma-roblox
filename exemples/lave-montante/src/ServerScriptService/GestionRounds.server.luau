-- Script « GestionRounds » dans ServerScriptService (côté serveur)
-- La boucle du jeu : attente des joueurs → intermission → round dans l'arène → récompenses → lobby.
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerScriptService = game:GetService("ServerScriptService")
local Workspace = game:GetService("Workspace")

local modules = ReplicatedStorage:WaitForChild("Modules")
local Config = require(modules:WaitForChild("Config"))
local ReglesRound = require(modules:WaitForChild("ReglesRound"))
local Lave = require(ServerScriptService:WaitForChild("Lave"))

local etatRound = ReplicatedStorage:WaitForChild("EtatRound")
local notification = ReplicatedStorage:WaitForChild("Remotes"):WaitForChild("Notification") :: RemoteEvent

-- Construits à la main dans Studio (voir le README)
local apparitionLobby = Workspace:WaitForChild("Lobby"):WaitForChild("ApparitionLobby") :: BasePart
local arene = Workspace:WaitForChild("Arene")
local dossierPoints = arene:WaitForChild("PointsApparition")
local departLave = arene:WaitForChild("DepartLave") :: BasePart

type Participant = {
	personnage: Model,
	connexionMort: RBXScriptConnection,
}

-- Joueurs encore en vie dans le round en cours
local participants: { [Player]: Participant } = {}
local laveActuelle: BasePart? = nil

-- L'état du round est publié dans des attributs : le client les lit, il n'envoie jamais rien
local function changerPhase(phase: string, tempsRestant: number)
	etatRound:SetAttribute("Phase", phase)
	etatRound:SetAttribute("TempsRestant", tempsRestant)
end

local function compterParticipants(): number
	local nombre = 0
	for _ in participants do
		nombre += 1
	end
	return nombre
end

-- Retire un joueur du round (éliminé, parti ou fin du round) et coupe sa connexion
local function retirerParticipant(player: Player)
	local participant = participants[player]
	if participant then
		participant.connexionMort:Disconnect()
		participants[player] = nil
	end
end

local function teleporter(personnage: Model, cible: BasePart)
	-- PivotTo déplace tout le personnage d'un coup ; +4 studs pour ne pas apparaître dans le sol
	personnage:PivotTo(cible.CFrame + Vector3.new(0, 4, 0))
end

local function listerPointsApparition(): { BasePart }
	local points: { BasePart } = {}
	for _, enfant in dossierPoints:GetChildren() do
		if enfant:IsA("BasePart") then
			table.insert(points, enfant)
		end
	end
	return points
end

-- Remet tout à zéro : appelée à la fin de CHAQUE round, même après une erreur.
-- Les participants encore en vie reviennent au lobby : personne ne reste coincé dans l'arène.
local function nettoyerRound()
	if laveActuelle then
		laveActuelle:Destroy()
		laveActuelle = nil
	end
	for player, participant in participants do
		retirerParticipant(player)
		local personnage = participant.personnage
		local humanoid = personnage:FindFirstChildOfClass("Humanoid")
		-- Ceux qui sont morts ou partis ont déjà été retirés (connexion Died, PlayerRemoving)
		if personnage.Parent ~= nil and humanoid and humanoid.Health > 0 then
			teleporter(personnage, apparitionLobby)
		end
	end
end

local function attendreJoueurs()
	while not ReglesRound.assezDeJoueurs(#Players:GetPlayers(), Config.JOUEURS_MIN) do
		changerPhase("Attente", 0)
		task.wait(1)
	end
end

-- Compte à rebours dans le lobby ; renvoie false si des joueurs partent entre-temps
local function intermission(): boolean
	for reste = Config.DUREE_INTERMISSION, 1, -1 do
		if not ReglesRound.assezDeJoueurs(#Players:GetPlayers(), Config.JOUEURS_MIN) then
			return false
		end
		changerPhase("Intermission", reste)
		task.wait(1)
	end
	return true
end

-- Téléporte dans l'arène chaque joueur vivant et l'inscrit au round ; renvoie leur nombre
local function demarrerRound(): number
	local points = listerPointsApparition()
	if #points == 0 then
		error("Aucune Part dans Workspace.Arene.PointsApparition")
	end
	for index, player in Players:GetPlayers() do
		local personnage = player.Character
		local humanoid = if personnage then personnage:FindFirstChildOfClass("Humanoid") else nil
		if personnage and humanoid and humanoid.Health > 0 then
			teleporter(personnage, points[(index - 1) % #points + 1])
			participants[player] = {
				personnage = personnage,
				connexionMort = humanoid.Died:Connect(function()
					retirerParticipant(player) -- mort (lave, chute, reset) : éliminé
				end),
			}
		end
	end
	return compterParticipants()
end

-- Fait monter la lave et élimine ceux qu'elle rattrape, jusqu'à la fin du temps ou du dernier survivant
local function jouerRound()
	local lave = Lave.creer(departLave, arene)
	laveActuelle = lave
	local debut = os.clock()
	while true do
		local ecoule = os.clock() - debut
		local hauteur =
			ReglesRound.hauteurLave(ecoule, Config.DELAI_AVANT_LAVE, Config.DUREE_ROUND, Config.HAUTEUR_MAX_LAVE)
		Lave.mettreAHauteur(lave, departLave, hauteur)
		local dessusLave = Lave.dessus(lave)

		-- C'est le SERVEUR qui regarde où sont les personnages : le client ne déclare rien
		for player, participant in participants do
			local personnage = participant.personnage
			local racine = personnage.PrimaryPart
			local humanoid = personnage:FindFirstChildOfClass("Humanoid")
			if racine == nil or humanoid == nil or personnage.Parent == nil then
				retirerParticipant(player) -- personnage disparu : on ne le compte plus
			elseif ReglesRound.estSousLaLave(racine.Position.Y, dessusLave) then
				humanoid.Health = 0
				retirerParticipant(player)
			end
		end

		changerPhase("EnJeu", math.max(0, math.ceil(Config.DUREE_ROUND - ecoule)))
		if ecoule >= Config.DUREE_ROUND or compterParticipants() == 0 then
			return
		end
		task.wait(Config.INTERVALLE_VERIFICATION)
	end
end

local function recompenser(player: Player, gain: number)
	local leaderstats = player:FindFirstChild("leaderstats")
	if leaderstats == nil then
		return
	end
	local pieces = leaderstats:FindFirstChild("Pieces")
	local victoires = leaderstats:FindFirstChild("Victoires")
	if pieces and pieces:IsA("IntValue") then
		pieces.Value += gain
	end
	if victoires and victoires:IsA("IntValue") then
		victoires.Value += 1
	end
end

-- Récompense les survivants et affiche le résultat (nettoyerRound les ramène ensuite au lobby)
local function terminerRound(nombreDepart: number)
	local survivants: { Player } = {}
	for player in participants do
		table.insert(survivants, player)
	end
	local gain =
		ReglesRound.recompense(#survivants, nombreDepart, Config.RECOMPENSE_SURVIE, Config.BONUS_DERNIER_SURVIVANT)
	for _, player in survivants do
		recompenser(player, gain)
		notification:FireClient(player, `Tu as survécu ! +{gain} pièces`)
	end

	etatRound:SetAttribute("Survivants", #survivants)
	changerPhase("Fin", Config.DUREE_FIN_ROUND)
	task.wait(Config.DUREE_FIN_ROUND)
end

local function jouerUnCycle()
	local nombreDepart = demarrerRound()
	if nombreDepart == 0 then
		return -- personne n'avait de personnage vivant : on recommence l'intermission
	end
	jouerRound()
	terminerRound(nombreDepart)
end

-- Un joueur qui quitte le jeu en plein round ne doit plus être compté
Players.PlayerRemoving:Connect(retirerParticipant)

changerPhase("Attente", 0)
while true do
	attendreJoueurs()
	if intermission() then
		-- pcall : une erreur pendant un round ne doit pas arrêter le jeu pour toujours
		local ok, erreur = pcall(jouerUnCycle)
		if not ok then
			warn("Round interrompu :", erreur)
		end
		nettoyerRound() -- toujours appelé, même après une erreur : retour au lobby, connexions coupées, lave détruite
	end
end
