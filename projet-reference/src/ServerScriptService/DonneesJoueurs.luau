-- ModuleScript « DonneesJoueurs » dans ServerScriptService (côté serveur)
-- Charge, garde en mémoire et sauvegarde les données de chaque joueur.
local DataStoreService = game:GetService("DataStoreService")

local magasin = DataStoreService:GetDataStore("DonneesJoueurs_v1")

-- À augmenter quand la structure des données change :
-- 1 = module 5 ; 2 = champ achats (module 7) ; 3 = champ zoneOragesDebloquee (module 8)
local VERSION_DONNEES = 3
local MAX_TENTATIVES = 3
local DELAI_MAX_FERMETURE = 25 -- secondes : Roblox n'attend que 30 s à la fermeture

local DonneesJoueurs = {}

-- Données en mémoire pendant la partie : [Player] = table de données
local sessions: { [Player]: { [string]: any } } = {}
-- Nombre de sauvegardes en cours, toutes origines confondues
-- (départ du joueur, sauvegarde automatique, fermeture du serveur)
local sauvegardesEnCours = 0

-- Structure d'une sauvegarde toute neuve
local function donneesParDefaut(): { [string]: any }
	return {
		version = VERSION_DONNEES,
		etape = 0, -- dernier checkpoint validé (0 = aucun)
		pieces = 0,
		inventaire = {}, -- objets possédés (leçon 3)
		equipe = "", -- objet équipé (leçon 3), "" = aucun
		achats = {}, -- PurchaseId des Developer Products déjà donnés (module 7)
		zoneOragesDebloquee = false, -- mise à jour « Zone des Orages » (module 8)
	}
end

-- Complète une ancienne sauvegarde avec les champs ajoutés depuis
local function completer(donnees: { [string]: any }): { [string]: any }
	for cle, valeurParDefaut in donneesParDefaut() do
		if donnees[cle] == nil then
			donnees[cle] = valeurParDefaut
		end
	end
	-- La sauvegarde a maintenant la structure actuelle : on met à jour son
	-- numéro de version (sans jamais baisser celui d'une sauvegarde plus récente)
	if donnees.version < VERSION_DONNEES then
		donnees.version = VERSION_DONNEES
	end
	return donnees
end

-- Exécute une requête réseau, avec plusieurs tentatives en cas d'échec
local function avecTentatives(requete: () -> any): (boolean, any)
	local succes: boolean, resultat: any = false, nil
	for tentative = 1, MAX_TENTATIVES do
		succes, resultat = pcall(requete)
		if succes then
			return true, resultat
		end
		warn(`DataStore : tentative {tentative}/{MAX_TENTATIVES} échouée ({resultat})`)
		if tentative < MAX_TENTATIVES then
			-- Attente croissante (environ 2 s, puis 4 s) + un peu de hasard
			task.wait(2 ^ tentative + math.random())
		end
	end
	return false, resultat
end

-- Copie les leaderstats (la référence pendant la partie) dans la session
local function lireLeaderstats(player: Player, donnees: { [string]: any })
	local leaderstats = player:FindFirstChild("leaderstats")
	if leaderstats == nil then
		return
	end
	local etape = leaderstats:FindFirstChild("Etape")
	local pieces = leaderstats:FindFirstChild("Pieces")
	if etape and etape:IsA("IntValue") then
		donnees.etape = etape.Value
	end
	if pieces and pieces:IsA("IntValue") then
		donnees.pieces = pieces.Value
	end
end

-- Charge les données ; renvoie nil en cas d'échec
function DonneesJoueurs.Charger(player: Player): { [string]: any }?
	local cle = "Joueur_" .. player.UserId
	local succes, resultat = avecTentatives(function()
		return magasin:GetAsync(cle)
	end)
	if not succes then
		-- Échec : on ne crée PAS de session (règle 2)
		return nil
	end

	local donnees
	if resultat == nil then
		donnees = donneesParDefaut() -- premier passage : nouveau joueur
	else
		donnees = completer(resultat)
	end
	sessions[player] = donnees
	return donnees
end

-- Renvoie les données en mémoire d'un joueur (nil si pas chargées)
function DonneesJoueurs.Obtenir(player: Player): { [string]: any }?
	return sessions[player]
end

-- Sauvegarde les données d'un joueur ; renvoie true SEULEMENT si elles ont
-- réellement été écrites dans le DataStore (false sinon)
function DonneesJoueurs.Sauvegarder(player: Player): boolean
	local donnees = sessions[player]
	if donnees == nil then
		return false -- jamais chargées correctement : surtout, ne rien écrire
	end
	lireLeaderstats(player, donnees)

	sauvegardesEnCours += 1
	local cle = "Joueur_" .. player.UserId
	local ecritureAnnulee = false
	local succes, erreur = avecTentatives(function()
		return magasin:UpdateAsync(cle, function(ancienne)
			-- Si la sauvegarde vient d'une version plus récente du jeu,
			-- on n'y touche pas : renvoyer nil annule l'écriture
			if ancienne ~= nil and (ancienne.version or 0) > VERSION_DONNEES then
				ecritureAnnulee = true
				return nil
			end
			-- (cette fonction peut être rappelée : on remet l'indicateur à jour)
			ecritureAnnulee = false
			-- Nouvelle valeur + UserId du joueur associé à la clé
			return donnees, { player.UserId }
		end)
	end)
	sauvegardesEnCours -= 1
	if not succes then
		warn(`Sauvegarde impossible pour {player.Name} : {erreur}`)
		return false
	end
	if ecritureAnnulee then
		warn(`Sauvegarde annulée pour {player.Name} : données d'une version plus récente du jeu`)
		return false -- rien n'a été écrit
	end
	return true
end

-- Oublie les données en mémoire (à appeler quand le joueur est parti)
function DonneesJoueurs.Liberer(player: Player)
	sessions[player] = nil
end

-- Fermeture du serveur : sauvegarde EN PARALLÈLE toutes les sessions encore
-- en mémoire, puis attend la fin de TOUTES les sauvegardes en cours,
-- y compris celles déjà lancées par PlayerRemoving
function DonneesJoueurs.SauvegarderTout()
	for player in sessions do
		task.spawn(DonneesJoueurs.Sauvegarder, player)
	end
	local debut = os.clock()
	while sauvegardesEnCours > 0 and os.clock() - debut < DELAI_MAX_FERMETURE do
		task.wait()
	end
end

return DonneesJoueurs
