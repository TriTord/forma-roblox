-- Script « KillBricks » dans ServerScriptService
-- Gère toutes les Parts rangées dans le dossier Workspace.KillBricks
local Workspace = game:GetService("Workspace")

-- WaitForChild attend que le dossier existe (détaillé à la leçon 5)
local dossierKillBricks = Workspace:WaitForChild("KillBricks")

local function surContact(autrePart)
	local personnage = autrePart.Parent
	local humanoid = personnage and personnage:FindFirstChildOfClass("Humanoid")
	if humanoid and humanoid.Health > 0 then
		humanoid.Health = 0
	end
end

-- On parcourt tous les enfants du dossier
for _, killBrick in dossierKillBricks:GetChildren() do
	-- On ne garde que les Parts (un Folder peut contenir autre chose)
	if killBrick:IsA("BasePart") then
		killBrick.Touched:Connect(surContact)
	end
end

print(`{#dossierKillBricks:GetChildren()} objets dans le dossier KillBricks`)
