-- ModuleScript « Config » dans ReplicatedStorage > Modules (créé au module 3, leçon 6)
-- Tous les réglages de l'Obby des Nuages, au même endroit.
local Config = {}

-- Pièces
Config.VITESSE_ROTATION_PIECES = 90 -- degrés par seconde
Config.VALEUR_PIECE = 1 -- pièces gagnées par ramassage

-- Checkpoints
Config.HAUTEUR_REAPPARITION = Vector3.new(0, 4, 0)

-- Niveaux : chaque niveau regroupe des étapes de difficulté proche
-- NOUVEAU : le champ piecesParEtape (pièces gagnées par étape de ce niveau)
Config.Niveaux = {
	{ nom = "Les premiers nuages", etapeDebut = 1, etapeFin = 5, piecesParEtape = 2 },
	{ nom = "La tempête", etapeDebut = 6, etapeFin = 10, piecesParEtape = 3 },
	{ nom = "Le sommet", etapeDebut = 11, etapeFin = 12, piecesParEtape = 5 },
}

-- Renvoie le niveau qui contient l'étape donnée (ou nil)
function Config.obtenirNiveau(etape)
	for _, niveau in Config.Niveaux do
		if etape >= niveau.etapeDebut and etape <= niveau.etapeFin then
			return niveau
		end
	end
	return nil
end

-- NOUVEAU : bonus versé en terminant un niveau (le « moment de joie » de fin de palier)
Config.BONUS_FIN_DE_NIVEAU = 10

-- NOUVEAU : pièces gagnées en atteignant une étape pour la première fois
function Config.recompensePourEtape(etape: number): number
	local niveau = Config.obtenirNiveau(etape)
	if niveau == nil then
		return 0 -- étape hors des niveaux : aucune récompense
	end
	local gain = niveau.piecesParEtape
	if etape == niveau.etapeFin then
		gain += Config.BONUS_FIN_DE_NIVEAU -- dernière étape du niveau : bonus
	end
	return gain
end

return Config -- OBLIGATOIRE, toujours en dernier
