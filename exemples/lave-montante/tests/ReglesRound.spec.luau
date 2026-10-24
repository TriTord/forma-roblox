-- Tests automatiques de la logique pure du round, exécutés avec Lune (hors de Studio) :
--   lune run tests/ReglesRound.spec.luau
local ReglesRound = require("../src/ReplicatedStorage/Modules/ReglesRound")

local reussis, rates = 0, 0

-- Compare la valeur obtenue à la valeur attendue et affiche le résultat
local function verifier(nom: string, obtenu: any, attendu: any)
	if obtenu == attendu then
		reussis += 1
		print(`OK    {nom}`)
	else
		rates += 1
		print(`RATÉ  {nom} : attendu {attendu}, obtenu {obtenu}`)
	end
end

-- assezDeJoueurs
verifier("1 joueur sur 2 requis : pas assez", ReglesRound.assezDeJoueurs(1, 2), false)
verifier("2 joueurs sur 2 requis : assez", ReglesRound.assezDeJoueurs(2, 2), true)

-- hauteurLave(tempsEcoule, delai, dureeRound, hauteurMax)
verifier("pendant le délai, la lave ne bouge pas", ReglesRound.hauteurLave(3, 5, 60, 40), 0)
verifier("à mi-montée, la lave est à mi-hauteur", ReglesRound.hauteurLave(32.5, 5, 60, 40), 20)
verifier("après la fin, la lave reste au maximum", ReglesRound.hauteurLave(90, 5, 60, 40), 40)
verifier("à la fin du round, la lave est au maximum", ReglesRound.hauteurLave(60, 5, 60, 40), 40)

-- estSousLaLave(hauteurJoueur, hauteurDessusLave)
verifier("joueur au-dessus de la lave", ReglesRound.estSousLaLave(12, 10), false)
verifier("joueur sous la lave", ReglesRound.estSousLaLave(8, 10), true)

-- recompense(nombreSurvivants, nombreParticipants, base, bonusDernier)
verifier("aucun survivant : 0 pièce", ReglesRound.recompense(0, 4, 25, 25), 0)
verifier("plusieurs survivants : la base", ReglesRound.recompense(2, 4, 25, 25), 25)
verifier("dernier survivant à plusieurs : base + bonus", ReglesRound.recompense(1, 4, 25, 25), 50)
verifier("seul dans le round : pas de bonus", ReglesRound.recompense(1, 1, 25, 25), 25)

print(`\n{reussis} réussi(s), {rates} raté(s)`)
if rates > 0 then
	error("Des tests ont échoué") -- code de sortie non nul : le terminal (et Claude Code) le voient
end
