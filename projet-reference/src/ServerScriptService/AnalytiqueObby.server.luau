-- Script « AnalytiqueObby » placé dans ServerScriptService (serveur uniquement).
-- Il écoute leaderstats.Etape (modifiée seulement par le serveur, modules 4 et 5)
-- et envoie les événements d'analytics de l'Obby des Nuages.
local AnalyticsService = game:GetService("AnalyticsService")
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

-- Entonnoir d'onboarding : les 60 premières secondes (module 6)
local ETAPES_ONBOARDING = {
	[1] = "Arrivée",
	[2] = "Personnage apparu",
	[3] = "Checkpoint 1",
	[4] = "Checkpoint 2",
	[5] = "Checkpoint 3",
}
local DECALAGE_CHECKPOINTS = 2 -- le checkpoint 1 correspond à l'étape 3 de l'onboarding
local DERNIER_CHECKPOINT_ONBOARDING = 3

-- Entonnoir de progression : une étape par checkpoint (100 étapes maximum)
local ENTONNOIR_PROGRESSION = "ProgressionObby"
local ETAPE_MAX_ENTONNOIR = 100

-- Clé du premier custom field (les valeurs doivent être des chaînes)
local CHAMP_ETAPE = Enum.AnalyticsCustomFieldKeys.CustomField01.Name

-- Envoie un événement en le protégeant : une erreur d'analytics
-- ne doit jamais casser le gameplay. Dans Studio, rien n'est envoyé :
-- on affiche simplement l'événement dans l'Output pour tester la logique.
local function envoyer(description: string, envoi: () -> ())
	if RunService:IsStudio() then
		print("[Analytics, test Studio] " .. description)
		return
	end
	local ok, erreur = pcall(envoi)
	if not ok then
		warn("[Analytics] échec de « " .. description .. " » : " .. tostring(erreur))
	end
end

local function etapeOnboarding(player: Player, numero: number)
	local nom = ETAPES_ONBOARDING[numero]
	envoyer(player.Name .. " → onboarding " .. numero .. " (" .. nom .. ")", function()
		AnalyticsService:LogOnboardingFunnelStepEvent(player, numero, nom)
	end)
end

-- Lit l'étape actuelle du joueur sans jamais provoquer d'erreur
local function lireEtape(player: Player): number
	local leaderstats = player:FindFirstChild("leaderstats")
	local etape = if leaderstats then leaderstats:FindFirstChild("Etape") else nil
	if etape and etape:IsA("IntValue") then
		return etape.Value
	end
	return 0
end

-- Suit les checkpoints franchis
local function suivreEtape(player: Player, etape: IntValue, heureArrivee: number)
	local ancienneValeur = etape.Value

	etape.Changed:Connect(function(nouvelleValeur: number)
		-- Seule une hausse d'exactement 1 est une vraie progression
		-- (un saut de plusieurs étapes, par exemple au chargement d'une sauvegarde, est ignoré)
		local estUneProgression = nouvelleValeur == ancienneValeur + 1
		ancienneValeur = nouvelleValeur
		if not estUneProgression then
			return
		end

		-- 1. Onboarding : checkpoints 1 à 3 = étapes 3 à 5
		if nouvelleValeur >= 1 and nouvelleValeur <= DERNIER_CHECKPOINT_ONBOARDING then
			etapeOnboarding(player, nouvelleValeur + DECALAGE_CHECKPOINTS)
		end

		-- 2. Progression : entonnoir unique par joueur (funnelSessionId = nil)
		if nouvelleValeur >= 1 and nouvelleValeur <= ETAPE_MAX_ENTONNOIR then
			envoyer(player.Name .. " → progression checkpoint " .. nouvelleValeur, function()
				AnalyticsService:LogFunnelStepEvent(
					player,
					ENTONNOIR_PROGRESSION,
					nil, -- pas de session : chaque étape compte une seule fois par joueur
					nouvelleValeur,
					"Checkpoint " .. nouvelleValeur
				)
			end)
		end

		-- 3. Temps mis pour atteindre le premier checkpoint (événement avec valeur)
		if nouvelleValeur == 1 then
			local secondes = os.time() - heureArrivee
			envoyer(player.Name .. " → checkpoint 1 en " .. secondes .. " s", function()
				AnalyticsService:LogCustomEvent(player, "SecondesAvantCheckpoint1", secondes)
			end)
		end
	end)
end

local function onPlayerAdded(player: Player)
	local heureArrivee = os.time()
	etapeOnboarding(player, 1)

	-- Personnage : étape 2 de l'onboarding + suivi des morts
	local personnageDejaApparu = false
	local function onCharacterAdded(personnage: Model)
		if not personnageDejaApparu then
			personnageDejaApparu = true
			etapeOnboarding(player, 2)
		end

		local humanoid = personnage:WaitForChild("Humanoid", 10)
		if humanoid and humanoid:IsA("Humanoid") then
			humanoid.Died:Connect(function()
				local etapeActuelle = lireEtape(player)
				envoyer(player.Name .. " → mort à l'étape " .. etapeActuelle, function()
					-- Un seul nom d'événement, l'étape va dans un custom field (texte)
					AnalyticsService:LogCustomEvent(player, "Mort", 1, {
						[CHAMP_ETAPE] = "Etape " .. etapeActuelle,
					})
				end)
			end)
		end
	end
	player.CharacterAdded:Connect(onCharacterAdded)
	if player.Character then
		task.spawn(onCharacterAdded, player.Character)
	end

	-- Attend les leaderstats créées par le script du module 5 (60 s, comme au module 5 :
	-- le chargement de la sauvegarde peut faire plusieurs tentatives)
	local leaderstats = player:WaitForChild("leaderstats", 60)
	local etape = if leaderstats then leaderstats:WaitForChild("Etape", 10) else nil
	if etape and etape:IsA("IntValue") then
		suivreEtape(player, etape, heureArrivee)
	else
		warn("[Analytics] leaderstats.Etape introuvable pour " .. player.Name)
	end
end

Players.PlayerAdded:Connect(onPlayerAdded)
-- Joueurs déjà présents si le script démarre en retard
for _, player in Players:GetPlayers() do
	task.spawn(onPlayerAdded, player)
end
