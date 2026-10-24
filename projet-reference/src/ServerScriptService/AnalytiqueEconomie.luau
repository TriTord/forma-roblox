-- ModuleScript « AnalytiqueEconomie » placé dans ServerScriptService
-- À appeler depuis le script serveur d'achat (modules 4 et 5), APRÈS un achat réussi.
local AnalyticsService = game:GetService("AnalyticsService")

local AnalytiqueEconomie = {}

-- idObjet : identifiant de l'objet dans ReplicatedStorage.Modules.Catalogue
-- prix : nombre de pièces dépensées ; soldeApres : pièces restantes
function AnalytiqueEconomie.achat(player: Player, idObjet: string, prix: number, soldeApres: number)
	local ok, erreur = pcall(function()
		AnalyticsService:LogEconomyEvent(
			player,
			Enum.AnalyticsEconomyFlowType.Sink, -- les pièces SORTENT du portefeuille
			"Pieces", -- nom de la monnaie, toujours identique
			prix, -- montant TOUJOURS positif, même pour une dépense
			soldeApres, -- solde après l'achat (jamais négatif)
			Enum.AnalyticsEconomyTransactionType.Shop.Name, -- type de transaction (texte)
			idObjet -- « SKU » : identifiant unique de l'objet
		)
	end)
	if not ok then
		warn("[Analytics] achat non enregistré : " .. tostring(erreur))
	end
end

return AnalytiqueEconomie
