-- ModuleScript « Validation » placé dans ServerScriptService (côté serveur uniquement)
local Players = game:GetService("Players")

local Validation = {}

-- Vrai si la valeur est un nombre fini (ni NaN ni infini) compris entre min et max
function Validation.estNombre(valeur: unknown, min: number, max: number): boolean
	if typeof(valeur) ~= "number" then
		return false
	end
	if not math.isfinite(valeur) then
		return false
	end
	return valeur >= min and valeur <= max
end

-- Vrai si la valeur est un nombre entier (1, 2, 3…) compris entre min et max
function Validation.estEntier(valeur: unknown, min: number, max: number): boolean
	if not Validation.estNombre(valeur, min, max) then
		return false
	end
	local nombre = valeur :: number
	return math.floor(nombre) == nombre
end

-- Vrai si la valeur est un texte non vide, pas trop long et en UTF-8 valide
function Validation.estTexte(valeur: unknown, longueurMax: number): boolean
	if typeof(valeur) ~= "string" then
		return false
	end
	if #valeur == 0 or #valeur > longueurMax then
		return false
	end
	return utf8.len(valeur) ~= nil -- utf8.len renvoie nil si le texte est invalide
end

-- Renvoie la HumanoidRootPart du joueur s'il a un personnage vivant, sinon nil
function Validation.racineVivante(player: Player): BasePart?
	local character = player.Character
	if character == nil then
		return nil
	end
	local humanoid = character:FindFirstChildOfClass("Humanoid")
	local racine = character:FindFirstChild("HumanoidRootPart")
	if humanoid and humanoid.Health > 0 and racine and racine:IsA("BasePart") then
		return racine
	end
	return nil
end

-- Vrai si le personnage du joueur est à moins de distanceMax studs de la position
function Validation.estAPortee(player: Player, position: Vector3, distanceMax: number): boolean
	local racine = Validation.racineVivante(player)
	if racine == nil then
		return false
	end
	return (racine.Position - position).Magnitude <= distanceMax
end

-- Crée un cooldown par joueur : la fonction renvoyée répond true au plus
-- une fois toutes les `delai` secondes pour un même joueur
function Validation.creerCooldown(delai: number): (Player) -> boolean
	local dernieresActions: { [Player]: number } = {}

	-- On oublie le joueur quand il part (sinon la table grossit sans fin)
	Players.PlayerRemoving:Connect(function(player: Player)
		dernieresActions[player] = nil
	end)

	return function(player: Player): boolean
		local maintenant = os.clock()
		local derniere = dernieresActions[player]
		if derniere and maintenant - derniere < delai then
			return false -- trop tôt : demande refusée
		end
		dernieresActions[player] = maintenant
		return true
	end
end

return Validation
