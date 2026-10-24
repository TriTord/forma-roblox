-- ModuleScript « Catalogue » dans ReplicatedStorage > Modules
-- Lu par le serveur (prix, vérifications) ET par le client (affichage).
export type Objet = {
	nom: string, -- nom affiché dans la boutique
	prix: number, -- prix en pièces
	couleurDebut: Color3, -- couleur à l'avant de la traînée
	couleurFin: Color3, -- couleur à l'arrière
}

local Catalogue: { [string]: Objet } = {
	TrailNuage = {
		nom = "Traînée Nuage",
		prix = 25,
		couleurDebut = Color3.fromRGB(255, 255, 255),
		couleurFin = Color3.fromRGB(170, 215, 255),
	},
	TrailSoleil = {
		nom = "Traînée Soleil",
		prix = 75,
		couleurDebut = Color3.fromRGB(255, 220, 80),
		couleurFin = Color3.fromRGB(255, 120, 40),
	},
	TrailAurore = {
		nom = "Traînée Aurore",
		prix = 150,
		couleurDebut = Color3.fromRGB(120, 255, 200),
		couleurFin = Color3.fromRGB(170, 90, 255),
	},
}

return Catalogue
