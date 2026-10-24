-- ModuleScript « Lave » dans ServerScriptService (côté serveur)
-- Crée la lave d'un round, la fait monter et donne la hauteur de son dessus.
local Lave = {}

local EPAISSEUR_MIN = 0.2 -- une Part ne peut pas avoir une taille nulle

-- Crée une Part de lave posée sur « depart » (la Part repère DepartLave de l'arène)
function Lave.creer(depart: BasePart, parent: Instance): BasePart
	local lave = Instance.new("Part")
	lave.Name = "Lave"
	lave.Anchored = true
	lave.CanCollide = false -- on la traverse : c'est le serveur qui élimine, pas une collision
	lave.CanTouch = false -- on n'utilise pas Touched (voir la leçon : peu fiable ici)
	lave.CanQuery = false
	lave.CastShadow = false
	lave.Material = Enum.Material.Neon
	lave.Color = Color3.fromRGB(255, 85, 0)
	lave.Transparency = 0.2
	lave.Size = Vector3.new(depart.Size.X, EPAISSEUR_MIN, depart.Size.Z)
	lave.CFrame = CFrame.new(depart.Position + Vector3.new(0, EPAISSEUR_MIN / 2, 0))
	lave.Parent = parent
	return lave
end

-- Place le dessus de la lave à « hauteur » studs au-dessus du centre de « depart »
function Lave.mettreAHauteur(lave: BasePart, depart: BasePart, hauteur: number)
	local epaisseur = math.max(hauteur, EPAISSEUR_MIN)
	lave.Size = Vector3.new(lave.Size.X, epaisseur, lave.Size.Z)
	lave.CFrame = CFrame.new(depart.Position + Vector3.new(0, epaisseur / 2, 0))
end

-- Hauteur (coordonnée Y) du dessus de la lave
function Lave.dessus(lave: BasePart): number
	return lave.Position.Y + lave.Size.Y / 2
end

return Lave
