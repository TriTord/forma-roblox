-- LocalScript « IndiceDepart » à placer dans StarterPlayer > StarterPlayerScripts
-- Indice minuté : n'apparaît que si le joueur n'a pas atteint le checkpoint 1 à temps.
local Players = game:GetService("Players")

local DELAI_INDICE = 15 -- en secondes : à régler grâce à tes playtests (leçon 5)

local joueur = Players.LocalPlayer
local etape = joueur:WaitForChild("leaderstats"):WaitForChild("Etape") :: IntValue

local ecran = Instance.new("ScreenGui")
ecran.Name = "IndiceDepart"
ecran.ResetOnSpawn = false
ecran.Parent = joueur:WaitForChild("PlayerGui")

local indice = Instance.new("TextLabel")
indice.AnchorPoint = Vector2.new(0.5, 1)
indice.Position = UDim2.fromScale(0.5, 0.85)
indice.Size = UDim2.fromScale(0.6, 0.07)
indice.BackgroundTransparency = 0.3
indice.BackgroundColor3 = Color3.fromRGB(30, 30, 60)
indice.TextColor3 = Color3.new(1, 1, 1)
indice.TextScaled = true
indice.Text = "Suis le rayon doré et saute sur le premier nuage !"
indice.Visible = false
indice.Parent = ecran

task.delay(DELAI_INDICE, function()
	-- Toujours à l'étape 0 : le joueur a besoin d'aide
	if etape.Value == 0 then
		indice.Visible = true
	end
end)

-- Dès que le joueur progresse, l'indice disparaît pour de bon
etape.Changed:Connect(function(nouvelleEtape: number)
	if nouvelleEtape >= 1 then
		ecran:Destroy()
	end
end)
