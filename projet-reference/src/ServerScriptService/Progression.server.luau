-- Script « Progression » placé dans ServerScriptService (côté serveur)
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerScriptService = game:GetService("ServerScriptService")
local Workspace = game:GetService("Workspace")

local Validation = require(ServerScriptService:WaitForChild("Validation"))
local RecompensesEtapes = require(ServerScriptService:WaitForChild("RecompensesEtapes"))

local dossierCheckpoints = Workspace:WaitForChild("Checkpoints")
local notification = ReplicatedStorage:WaitForChild("Remotes"):WaitForChild("Notification") :: RemoteEvent

local DISTANCE_MAX = 15 -- studs entre le personnage et le centre du checkpoint (augmente-la si tes checkpoints sont grands)
local TEMPS_MIN_ETAPE = 2 -- secondes : un passage plus rapide est suspect (journalisé seulement)

local dernierPassage: { [Player]: number } = {}

-- Renvoie l'IntValue « Etape » du joueur, ou nil si elle n'existe pas encore
local function obtenirEtape(player: Player): IntValue?
	local leaderstats = player:FindFirstChild("leaderstats")
	local etape = leaderstats and leaderstats:FindFirstChild("Etape")
	if etape and etape:IsA("IntValue") then
		return etape
	end
	return nil
end

-- Replace le personnage sur le dernier checkpoint validé
local function placerAuCheckpoint(player: Player, character: Model)
	-- Les leaderstats viennent maintenant d'un autre script (et, dès la leçon 2,
	-- elles n'apparaissent qu'une fois la sauvegarde chargée) : on les attend
	player:WaitForChild("leaderstats", 60)
	local etape = obtenirEtape(player)
	if etape == nil or etape.Value == 0 then
		return -- pas de leaderstats, ou premier départ : la SpawnLocation suffit
	end
	local checkpoint = dossierCheckpoints:FindFirstChild(tostring(etape.Value))
	if not (checkpoint and checkpoint:IsA("BasePart")) then
		return
	end
	-- Même précaution qu'au module 4 : on laisse Roblox finir de placer le personnage
	if not character:IsDescendantOf(Workspace) then
		character.AncestryChanged:Wait()
	end
	task.wait()
	if player.Character ~= character or not character:IsDescendantOf(Workspace) then
		return -- ce personnage a disparu entre-temps (joueur parti, nouvelle réapparition…)
	end
	character:PivotTo(checkpoint.CFrame + Vector3.new(0, 4, 0))
end

-- Ne crée plus les leaderstats : s'occupe seulement des réapparitions
local function initialiserJoueur(player: Player)
	player.CharacterAdded:Connect(function(character: Model)
		placerAuCheckpoint(player, character)
	end)
	-- Le personnage a pu apparaître avant que ce script ne s'occupe du joueur
	if player.Character then
		task.spawn(placerAuCheckpoint, player, player.Character)
	end
end

local function surContactCheckpoint(checkpoint: BasePart, partieTouchee: BasePart)
	-- 1. Le contact vient-il d'un personnage de joueur ?
	local player = Players:GetPlayerFromCharacter(partieTouchee.Parent)
	if player == nil then
		return
	end

	local numero = tonumber(checkpoint.Name)
	local etape = obtenirEtape(player)
	if numero == nil or etape == nil then
		return
	end

	-- 2. Uniquement l'étape SUIVANTE : ni retour en arrière, ni saut d'étapes
	if numero ~= etape.Value + 1 then
		return
	end

	-- 3. Distance réelle : un tricheur peut provoquer un contact à distance
	if not Validation.estAPortee(player, checkpoint.Position, DISTANCE_MAX) then
		return
	end

	-- 4. Heuristique : passage trop rapide → on note, on ne punit pas
	local maintenant = os.clock()
	local precedent = dernierPassage[player]
	if precedent and maintenant - precedent < TEMPS_MIN_ETAPE then
		warn(
			string.format(
				"[Anti-triche] %s : étape %d atteinte en %.1f s",
				player.Name,
				numero,
				maintenant - precedent
			)
		)
	end
	dernierPassage[player] = maintenant

	-- Tout est valide : le SERVEUR met à jour la progression
	RecompensesEtapes.valider(player, numero)
	notification:FireClient(player, "Étape " .. numero .. " atteinte !")
end

-- On branche chaque checkpoint du dossier
for _, checkpoint in dossierCheckpoints:GetChildren() do
	if checkpoint:IsA("BasePart") then
		checkpoint.Touched:Connect(function(partieTouchee: BasePart)
			surContactCheckpoint(checkpoint, partieTouchee)
		end)
	end
end

Players.PlayerAdded:Connect(initialiserJoueur)
-- Joueurs déjà présents si le script démarre après eux (rare, mais possible en test)
for _, player in Players:GetPlayers() do
	task.spawn(initialiserJoueur, player)
end

Players.PlayerRemoving:Connect(function(player: Player)
	dernierPassage[player] = nil
end)
