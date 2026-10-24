# Contrôle d'exécution réel dans Roblox Studio (chef d'orchestre) — 2026-10-25

Un Studio de l'utilisateur (« Game », mode Edit) était connecté au serveur MCP intégré. Conformément à la décision 39, seul un script **non modifiant** a été exécuté avec l'outil `execute_luau` : aucune instance parentée au DataModel (les instances de test ont été créées hors DataModel puis détruites), aucun service modifié, aucun lancement de test, rien d'enregistré.

But : confirmer à l'exécution l'existence des API sur lesquelles reposent les prompts et les points « À vérifier » du module 02 et des encadrés « Avec Claude Code ».

| API / comportement | Résultat |
|---|---|
| `math.isfinite` (utilisée par `Validation`, inconnue de selene 0.32) | existe : `math.isfinite(1) == true`, `math.isfinite(math.huge) == false` |
| `task.wait`, `task.defer` | existent |
| `MarketplaceService.GetProductInfoAsync`, `UserOwnsGamePassAsync`, `PromptProductPurchase` | existent (fonctions) |
| `AnalyticsService.LogFunnelStepEvent`, `LogOnboardingFunnelStepEvent`, `LogEconomyEvent` | existent |
| `DataStoreService.GetOrderedDataStore` | existe |
| `Humanoid.SetWalkSpeed` (API inventée citée en leçon 02/08) | **n'existe pas** (l'accès lève une erreur), comme l'affirme la leçon |
| `Animator:LoadAnimation` | existe |
| `LinearVelocity`, `AlignPosition`, `UnreliableRemoteEvent` | créables |
| `BasePart.CanTouch` | existe (vaut `true` par défaut) |
| `TweenService:Create`, `TextChatService` | existent |

Limite : un contrôle d'existence ne prouve ni l'absence de dépréciation (vérifiée sur la référence officielle par les vérificateurs) ni le comportement en jeu multijoueur.
