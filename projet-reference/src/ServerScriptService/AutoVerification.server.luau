-- Script « AutoVerification » dans ServerScriptService
-- Lance un test (Play) et lis l'Output. Ne s'exécute que dans Studio.
local RunService = game:GetService("RunService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

if not RunService:IsStudio() then
	return -- jamais exécuté dans le jeu publié
end

local problemes = 0

local function signaler(message: string)
	problemes += 1
	warn("[Checklist] " .. message)
end

-- 1. Checkpoints numérotés 1, 2, 3... sans trou, et ancrés
local checkpoints = workspace:FindFirstChild("Checkpoints")
if checkpoints == nil then
	signaler("Dossier Workspace.Checkpoints introuvable")
else
	local total = #checkpoints:GetChildren()
	for numero = 1, total do
		local part = checkpoints:FindFirstChild(tostring(numero))
		if part == nil then
			signaler("Checkpoint " .. numero .. " manquant (trou dans la numérotation)")
		elseif part:IsA("BasePart") and not part.Anchored then
			signaler("Checkpoint " .. numero .. " n'est pas ancré (Anchored)")
		end
	end
end

-- 2. Kill bricks et pièces : les dossiers existent et les Parts sont ancrées
for _, nomDossier in { "KillBricks", "Pieces" } do
	local dossier = workspace:FindFirstChild(nomDossier)
	if dossier == nil then
		signaler("Dossier Workspace." .. nomDossier .. " introuvable")
	else
		for _, objet in dossier:GetDescendants() do
			if objet:IsA("BasePart") and not objet.Anchored then
				signaler(objet:GetFullName() .. " n'est pas ancré")
			end
		end
	end
end

-- 3. Les RemoteEvents attendus existent
local remotes = ReplicatedStorage:FindFirstChild("Remotes")
for _, nomRemote in { "AcheterObjet", "EquiperObjet" } do
	local remote = remotes and remotes:FindFirstChild(nomRemote)
	if remote == nil or not remote:IsA("RemoteEvent") then
		signaler("RemoteEvent ReplicatedStorage.Remotes." .. nomRemote .. " introuvable")
	end
end

-- 4. Les ModuleScripts partagés existent
local modules = ReplicatedStorage:FindFirstChild("Modules")
for _, nomModule in { "Config", "Catalogue" } do
	local objetModule = modules and modules:FindFirstChild(nomModule)
	if objetModule == nil or not objetModule:IsA("ModuleScript") then
		signaler("ModuleScript ReplicatedStorage.Modules." .. nomModule .. " introuvable")
	end
end

if problemes == 0 then
	print("[Checklist] Aucun problème détecté par l'auto-vérification.")
else
	warn("[Checklist] " .. problemes .. " problème(s) à corriger.")
end
