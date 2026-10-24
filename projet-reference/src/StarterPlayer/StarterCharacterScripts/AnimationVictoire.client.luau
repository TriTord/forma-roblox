-- LocalScript « AnimationVictoire » dans StarterPlayer > StarterCharacterScripts
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local personnage = script.Parent
local humanoid = personnage:WaitForChild("Humanoid") :: Humanoid
local animator = humanoid:WaitForChild("Animator") :: Animator

local victoire = ReplicatedStorage:WaitForChild("Remotes"):WaitForChild("Victoire") :: RemoteEvent

-- 1. L'objet Animation : remplace l'ID par celui de TON animation publiée
local animation = Instance.new("Animation")
animation.AnimationId = "rbxassetid://0000000000"

-- 2. On charge l'animation UNE fois et on garde la piste
local piste = animator:LoadAnimation(animation)
piste.Priority = Enum.AnimationPriority.Action -- passe devant marche et attente
piste.Looped = false -- une seule fois

-- 3. Le serveur annonce la victoire : on joue l'animation
victoire.OnClientEvent:Connect(function()
	if not piste.IsPlaying then
		piste:Play()
	end
end)

-- 4. Facultatif : réagir à la fin de l'animation
piste.Ended:Connect(function()
	print("Animation de victoire terminée !")
end)
