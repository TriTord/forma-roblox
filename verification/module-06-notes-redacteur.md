# Module 05 — Notes du rédacteur pour les vérificateurs

> **Note (phase IA, 2026-10-24)** : ce rapport a été écrit quand ce module portait le numéro 05. Un module 02 « Scripter avec l'IA » a ensuite été inséré : dans le texte ci-dessous, les numéros de modules et les chemins suivent l'**ancienne** numérotation (ancien module N ≥ 2 = nouveau module N + 1).

Toutes les pages ci-dessous ont été consultées le 2026-10-24.

## Affirmations factuelles et sources

### Leçon 01 — core-loop
| Affirmation | Source |
|---|---|
| Core loop = gameplay central ; 3 sections : interaction minute par minute, ensemble d’actions le plus répété, moteur de progression ; sans progression le jeu devient « repetitive, boring, and shallow » ; exemple RPG d’action Explore → Fight → Upgrade | https://create.roblox.com/docs/production/game-design/core-loops |
| Conseils J1 : rendre les étapes de la boucle claires et amusantes, équilibrer le défi (frustration/ennui), récompenser (feedback, monnaie, objets, succès) | https://create.roblox.com/docs/production/analytics/retention |
| « Anytime a player takes an action… imperative to provide clear feedback » ; exemple Winds of Fortune (pièces qui jaillissent en récompense) | https://create.roblox.com/docs/production/game-design/onboarding-techniques |
| « Any features added during LiveOps should be connected to the core loop » | https://create.roblox.com/docs/production/game-design/liveops-essentials |
| Core curriculum : « players collect coins to trade for jump power », plateformes de plus en plus hautes | https://create.roblox.com/docs/tutorials/curriculums/core |
| Le prototypage doit examiner la core loop | https://create.roblox.com/docs/production/game-design/prototyping |
| Boucles courtes/longues/méta et boucles par genre (obby, simulateur, tycoon, RP) | **Présenté comme description générale de game design, pas comme donnée Roblox** (la page Core loops ne parle pas de méta-boucles ; c’est dit dans le texte). |

### Leçon 02 — les-60-premieres-secondes
| Affirmation | Source |
|---|---|
| « New players typically decide their interest in a game within minutes » ; 3 objectifs de l’onboarding (essentiels, vite au fun, envie de plus) ; objectifs court/moyen/long terme visibles ; finir par un moment de joie ; Experiments pour comparer « a shorter dialogue sequence versus a guided arrow » ; garder les premiers paliers XP bas | https://create.roblox.com/docs/production/game-design/onboarding |
| 3 techniques (visuels, tutoriels contextuels, indices minutés) ; exemple hypothétique 10 s / 11 s ; « Timed hints should be sufficient… after only being shown once » ; Color or Die « impossible to miss, but doesn't prevent the player from starting » ; traînées « strongly suggest an action, but don't require it » | https://create.roblox.com/docs/production/game-design/onboarding-techniques |
| « FTUEs that get users into the fun quickly tend to do better on Roblox » ; majorité des utilisateurs sur mobile ; jeunes joueurs et interfaces chargées de texte | https://create.roblox.com/docs/production/game-design/design-for-roblox |
| « Avoid a complex or time consuming FTUE… ideally in 5 minutes or less after entering your game » ; définition D1 | https://create.roblox.com/docs/production/analytics/retention |
| Entonnoir d’onboarding, `LogOnboardingFunnelStepEvent`, événements uniquement côté serveur et dans un jeu publié | https://create.roblox.com/docs/production/analytics/funnel-events |
| Experiments : « Games with fewer than 1,000 daily active users might struggle to get useful data » (avertissement, pas une exigence) | https://create.roblox.com/docs/production/experiments |
| Propriétés Beam (Attachment0/1, FaceCamera, Width0/1, Color) non dépréciées | https://create.roblox.com/docs/reference/engine/classes/Beam |
| « 60 secondes » | **Explicitement présenté comme un objectif de conception de la formation, PAS un chiffre Roblox** (encadré Info + question de quiz). |

### Leçon 03 — progression-et-recompenses
| Affirmation | Source |
|---|---|
| Trop vite → manque de contenu ; trop lent → ennui/frustration ; mesurer la répartition des joueurs par niveau de progression | https://create.roblox.com/docs/production/analytics/retention |
| Sinks (définition, cosmétiques à durée limitée), planifier les puits avant les sources, monnaie d’événement « safest solution », calcul d’espérance (EV), exemple de surplus (« players with abundant Gold spend freely, leaving little incentive to purchase more ») | https://create.roblox.com/docs/production/game-design/balance-virtual-economies |
| « Generally, the more challenging the quest, the more valuable the rewards » | https://create.roblox.com/docs/production/game-design/introduction-to-quest-design |
| Missions régulièrement ratées → intérêt qui baisse | https://create.roblox.com/docs/production/game-design/season-pass-design |
| Objets aléatoires payants : probabilités affichées exactement et numériquement avant l’achat, chaque issue apporte un bénéfice, accès réservé aux utilisateurs éligibles | https://about.roblox.com/community-standards (section Roblox Economy > Paid Random Items) |
| Courbe « en dents de scie » | **Présentée comme approche courante de level design, non officielle, à vérifier en playtest** (pas de source Roblox ; je n’ai pas trouvé de source académique solide, donc formulation prudente). |
| Le terme « inflation » | La page Roblox ne l’emploie pas (elle parle de « surplus ») ; utilisé comme terme général d’économie. |

### Leçon 04 — rejouabilite
| Affirmation | Source |
|---|---|
| Touristes / habitués (« Locals… form almost all a game's engaged user base » — paraphrasé) ; jeux solo « often find it harder to build and retain an audience » ; invitations ; serveurs privés à ne pas rendre trop chers | https://create.roblox.com/docs/production/game-design/design-for-roblox |
| J1/J7/J30 et leviers associés (progression, variété, contenu régulier, social) | https://create.roblox.com/docs/production/analytics/retention |
| Quotidiennes : objectifs simples, récompenses modestes, 24 h, court terme uniquement, « resource drip » | https://create.roblox.com/docs/production/game-design/introduction-to-quest-design |
| Notifications d’expérience : 13+ et opt-in ; moins de 13 ans = seulement notifications de mises à jour ; ≥ 100 visites, pas sous modération ; 1 notification/jour/expérience/utilisateur ; prompt standard non personnalisable, ne s’affiche pas si déjà activé ou vu dans les 30 jours ; dark patterns interdits (publicités déguisées, fausse pression temporelle, faux cadeaux, achats piégés) ; « Games should not require users to turn on notifications in order to participate or advance in gameplay » ; notifications personnalisées et actionnables ; envoi via package Open Cloud ou API Open Cloud | https://create.roblox.com/docs/production/promotion/experience-notifications |
| `CanPromptOptInAsync`, `PromptOptIn`, `OptInPromptClosed` (aucun déprécié) | https://create.roblox.com/docs/reference/engine/classes/ExperienceNotificationService |
| `SocialService:PromptGameInvite`, `CanSendGameInviteAsync` (dans pcall) | https://create.roblox.com/docs/production/promotion/invite-prompts |
| Badges : 5 gratuits / 24 h (GMT) / jeu, puis 100 Robux ; `AwardBadgeAsync` en pcall ; `AwardBadge` dépréciée | https://create.roblox.com/docs/production/publishing/badges et https://create.roblox.com/docs/reference/engine/classes/BadgeService |
| LiveOps : sans mises à jour même les joueurs fidèles perdent intérêt ; construire sur les systèmes existants ; protéger l’équipe | https://create.roblox.com/docs/production/game-design/liveops-essentials |
| « Many games release cadence updates every two weeks to one month » | https://create.roblox.com/docs/production/game-design/content-updates |
| Season pass : repos d’au moins une semaine (burnout), missions qui ne consomment pas tout le temps de jeu | https://create.roblox.com/docs/production/game-design/season-pass-design |
| Community Standards : contenu/métadonnées trompeurs pour la découverte, la monétisation ou l’engagement interdits | https://about.roblox.com/community-standards |
| Définitions fake urgency / fake scarcity / confirmshaming | https://deceptive.design/types (site de référence, anciennement darkpatterns.org) |
| Conseil « pas de séries qui punissent » | **Conseil de conception éthique de la formation**, appuyé sur l’esprit des docs Roblox (season pass/burnout, interdiction de la fausse urgence) ; pas une règle Roblox explicite (formulé comme tel). |

### Leçon 05 — tester-avec-de-vrais-joueurs
| Affirmation | Source |
|---|---|
| Prototyper détecte tôt défauts/oublis/besoins techniques ; partager hors équipe ; itérer ; examiner core loop, UI/UX, règles, cas limites | https://create.roblox.com/docs/production/game-design/prototyping |
| Nouveau jeu accessible par défaut au créateur et aux éditeurs ; jusqu’à 10 amis d’âge proche comme early testers via File > Invite early testers ; vérification d’âge possible ; filigrane d’aperçu | https://create.roblox.com/docs/production/publishing/publish-experiences-and-places |
| « Even more important than players' specific suggestions is the reasoning behind them » ; bugs priorisés par gravité, effort, nombre de joueurs touchés | https://create.roblox.com/docs/production/game-design/liveops-essentials |
| Sortie serveur visible dans la Developer Console (F9) seulement par le propriétaire / membres de groupe avec droits d’édition | https://create.roblox.com/docs/studio/developer-console |
| Think aloud (3 étapes, « shut up »), interventions qui changent le comportement | https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/ (J. Nielsen, 2012) |
| 5 utilisateurs, plusieurs petites séries | https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/ (J. Nielsen, 2000) — présenté comme règle empirique d’utilisabilité, pas une loi ; le chiffre 85 % n’est volontairement PAS cité. |

## Points incertains / à surveiller
- **Early testers / audience** : la page de publication a beaucoup changé récemment (onglets Playtest/Public, early testers, vérification d’âge). Des fils DevForum récents (lus en résumé seulement) signalent des testeurs qui n’arrivent pas à rejoindre. J’ai daté l’info et renvoyé au module 7 et à la page officielle.
- **Badges** : coût (5 gratuits/24 h puis 100 Robux) lu sur la page officielle le 2026-10-24 ; formulé « au moment de la rédaction ».
- **Notifications d’expérience** : le seuil d’éligibilité (100 visites) et la limite « 1 par jour » peuvent évoluer ; datés.
- **Valeur initiale de `Etape`** : le module 4 n’était pas encore écrit ; j’ai supposé `Etape = 0` tant qu’aucun checkpoint n’est atteint et je le dis explicitement dans la leçon 2 (à harmoniser avec le module 4 si différent). Même remarque pour la « table de données du joueur » (leçon 4) supposée accessible côté serveur depuis le script de sauvegarde du module 4.
- **Config.Zones** (leçon 3) est réutilisé dans la leçon 4 (`Config.Zones[#Config.Zones].derniereEtape`). Si le module 2 définit déjà un nombre d’étapes dans `Config`, il faudra harmoniser.

## Analyse statique (`node scripts/verifier-luau.mjs 05`)
16 extraits, 3 avec diagnostics, tous attendus :
- `Unknown require` (×3) : les `require` de `ReplicatedStorage.Modules.Config` et `ServerScriptService.ObjectifsQuotidiens` ne peuvent pas être résolus sur un extrait isolé.
- `FunctionUnused` sur `verifierObjectifDuJour` (leçon 4, bloc 2) : extrait d’intégration volontairement fourni comme fonction à appeler depuis le script du module 3.
