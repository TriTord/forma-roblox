# Module 07 — passe 2 (vérificateur indépendant : contre-vérification complète) — 2026-10-24

> **Note (phase IA, 2026-10-24)** : ce rapport a été écrit quand ce module portait le numéro 07. Un module 02 « Scripter avec l'IA » a ensuite été inséré : dans le texte ci-dessous, les numéros de modules et les chemins suivent l'**ancienne** numérotation (ancien module N ≥ 2 = nouveau module N + 1).

## Résumé
102 affirmations vérifiées (5 leçons + examen), 14 corrigées ou reformulées, 0 supprimée ; quiz : 25 questions de leçon et 14 questions d'examen revérifiées (3 `trouve-le-bug` de leçon + 2 d'examen, numéros de ligne recomptés), 4 questions ou explications corrigées ; code : `node scripts/verifier-luau.mjs 07` → 10 extraits, 1 seul diagnostic = bug volontaire du quiz 5 de la leçon 03 (`player.GetJoinData()`). Correction de fond sur l'extrait de sauvegarde de la leçon 04 (incohérent avec le module 4). Build `bash scripts/build-verrou.sh` : code de sortie 0.

Méthode : pages create.roblox.com ouvertes avec WebFetch (live) et sources Markdown/YAML du dépôt officiel github.com/Roblox/creator-docs (main, `kids-and-select.md` avec `last_updated: 2026-10-23`) ; annonces DevForum ouvertes une à une (auteur, date, mises à jour en tête de post) ; about.roblox.com/community-standards ouvert ; chaque lien de `<Sources>` testé (curl + WebFetch).

## Détail

| Leçon | Affirmation / élément | Verdict | Source | Commentaire |
|---|---|---|---|---|
| 01 | Fenêtre Game details à la 1re publication (icône, miniature, Name, Genre, Subgenre, Description) | OK | publish-games-and-places | |
| 01 | Nom et description contribuent à la découverte ; mots-clés aident « players and Roblox to understand » | OK | publish-games-and-places | Citations exactes retrouvées. |
| 01 | Nom stable, répétition → demotion, 1-2 emojis | OK | publish-games-and-places | |
| 01 | Exemple de bourrage « granny obby… » = « même type » | OK | publish-games-and-places | |
| 01 | Guide descriptions expérimental (« only meant for select creators »), ~160 car., 4 parties, hashtags inutiles au classement, pas de liste de contrôles, tous âges, accroche visible sur mobile | OK | descriptions | |
| 01 | Genre : 1 changement / 3 mois, Charts, boucle principale, correction Roblox + e-mail + appel, Classic Obby | OK | experience-genres | |
| 01 | Questionnaire Maturity & Compliance, Publish settings > Content rating, descripteurs, conformité régionale | OK | content-maturity | |
| 01 | Tableau des labels et publics | OK | content-maturity ; kids-and-select | Minimal/Mild → Kids+Select (+16+ qui a tout sauf Restricted) ; Moderate (9+) → Select+16+ ; Restricted → 18+ vérifié ; CMV → 16+ vérifié. |
| 01 | « Une seule scène réaliste suffit à changer la catégorie » | OK | content-maturity | « even if the realistic violence only occurs once ». |
| 01 | UGC avatar exclu, refaire après mise à jour, sanctions | OK | content-maturity | |
| 01 | Conditions 16+ (2 jours, vérif d'âge, 1re question « Non » → Content May Vary) | OK | publish-games-and-places | |
| 01 | Quiz 2 : CMV = « répondre seulement à la première question » | REFORMULÉ | publish-games-and-places | Il faut répondre **Non** à la 1re question (un « Oui » oblige à remplir tout le questionnaire). Explication précisée. |
| 01 | Conditions tous âges (vérif, 2FA, Plus/Premium 2 mois ou 1 000 Robux, questionnaire complet, évaluation 250 parties uniques / 60 jours / âge vérifié) | OK | kids-and-select ; publish-games-and-places | Chiffres revérifiés sur la version du 23/10/2026. |
| 01 | Définition des joueurs très engagés | REFORMULÉ | kids-and-select | « account age, play history, spend » / « tenure, playtime in your game, platform spend » : texte simplifié (« ancienneté, temps de jeu, achats sur Roblox »). |
| 01 | Historique : 500 HEP (16 juin 2026, confirmé le 16 juillet) → 250 (19 août 2026) | OK | DevForum 4685717 ; DevForum 4820164 | Posts de RbxRocketMan, catégorie Announcements. |
| 01 | Divergence sur le remboursement des 1 000 Robux | OK | publish-games-and-places (25 HEP / 60 jours) vs kids-and-select (auto 90 jours après éligibilité) | Divergence toujours présente au 23/10/2026. |
| 01 | Encadré « Des règles qui bougent vite » | REFORMULÉ (simplifié) | idem | Trop chargé en chiffres pour un débutant : gardé l'exemple 500 → 250 et le renvoi aux pages officielles, retiré le détail des deux règles de remboursement. |
| 01 | Bullet « évaluation » | REFORMULÉ (simplifié) | kids-and-select | Phrase découpée, même contenu. |
| 01 | Community Standards « Repetitive and Misleading Content » ; liens externes via Social Links seulement | OK | about.roblox.com/community-standards | |
| 01 | Discovery : cadeaux/Robux, exemple dinosaures, jeux non uniques, first play bounce rate « most important » | OK | discovery | |
| 01 | Pas de langage fort dans les métadonnées | OK | configure-games | |
| 01 | Par défaut, jeu visible seulement par toi/collaborateurs | OK | publish-games-and-places | |
| 01 | Quiz 1, 3, 4, 5 | OK | cf. ci-dessus | Lien Discord dans la description = interdit (Community Standards). |
| 02 | Icône carrée ≥ 512×512, 150×150, une par langue, modération, chemin, 3 bonnes pratiques, icône par défaut | OK | experience-icons | |
| 02 | Phrase mêlant icône par défaut et miniature personnalisée obligatoire | REFORMULÉ | experience-icons ; discovery | La règle « custom thumbnail required » concerne les miniatures, pas l'icône : phrase séparée en deux idées. |
| 02 | Miniatures 16:9, 1920×1080, formats, 10 max, 3 vidéos/mois (refus compris), étirement, bas de l'image, onglets | OK | thumbnails | |
| 02 | Vidéo en premier, listes autorisé/interdit (logo autorisé, voix off et « 50 % off » interdits) | OK | thumbnails | « It's also acceptable to overlay your game's logo ». |
| 02 | Caméra libre Maj gauche + P | OK | thumbnails | |
| 02 | Thumbnail personalization : 2-5 actives, < 3 Mo, ≤ 1920×1080, Edit active thumbnails / Save / Start, algorithme, tableau, +8,5 % (non garanti), garder plusieurs actives | OK | thumbnails | Présenté comme moyenne Roblox, pas comme garantie. |
| 02 | Pas d'outil officiel d'A/B test d'icônes | OK | DevForum 3274267 | Demande de fonctionnalité, dernière réponse 15/07/2026, aucune réponse staff ; nouvelle demande d'août 2026 (4778726) confirme l'absence. Aucune annonce officielle trouvée. |
| 02 | Experiments : valeurs de config, 14-60 jours, < 1 000 DAU | OK | experiments | |
| 02 | Play through rate et first play bounce rate au même niveau (« Most important ») | OK | discovery | Les 4 signaux du niveau « Most important » : PTR, bounce, play days, playtime. |
| 02 | Quiz 1 à 5 | OK | thumbnails ; experience-icons | |
| 03 | Early testers (10, amis d'âge proche / de confiance, File > Invite early testers, filigrane, signalement) | OK | publish-games-and-places | |
| 03 | Manage Audience (Friends), Exclude from recommendations | OK | publish-games-and-places | |
| 03 | Share links (onglet Share Links, LaunchData), SocialService | OK | share-links ; invite-prompts | |
| 03 | Autres sources accélèrent ; classement RFY seulement sur les joueurs organiques | OK | discovery | |
| 03 | « Running ads does not affect… RFY » ; jeux non uniques → aucune dépense | OK | ads-manager | |
| 03 | Portail create.roblox.com/advertise ; Home + recherche automatiques | OK | ads-manager | |
| 03 | 13+ e-mail vérifié ; carte 18+ ; crédits dès 13 ans, irréversibles | OK | ads-manager | |
| 03 | Objectifs Plays / Earnings (Limited) / Engagement | OK | ads-manager | |
| 03 | Audiences (10 000 récents / 20 000 partis) | REFORMULÉ (simplifié) | ads-manager | Chiffres justes ; phrase réécrite pour un débutant. |
| 03 | Auto-bidding, budget quotidien / total, 10 miniatures 16:9, modération < 24 h, annulation 6 h avant | OK | ads-manager | |
| 03 | Attribution « sur une période qui peut aller jusqu'à 30 jours » | REFORMULÉ | ads-manager | La fenêtre dépend du type de joueur (30 j nouveaux, session cliquée seulement pour les récents, 7 ou 30 j pour les revenants) : ajout de « selon le type de joueur ». |
| 03 | Données jusqu'à 48 h | OK | ads-manager | |
| 03 | Remboursement fraude (analyse J+14, remboursement J+16) | REFORMULÉ (simplifié) | ads-manager | Chiffres justes ; remplacés par « un peu plus de deux semaines après la fin ». |
| 03 | 3-5 jours puis améliorer l'onboarding ; « several days » ; détail par visuel ; LaunchData visible dans l'URL ; récompenses cosmétiques ; adapter l'onboarding | OK | ads-manager | |
| 03 | `Player:GetJoinData().LaunchData` (string) ; script serveur | OK | Player (référence API) | Script dans ServerScriptService, `nil` géré, aucune confiance pour de grosses récompenses. |
| 03 | Encadrés « Aucune garantie » / « Avant de dépenser » | OK | — | Aucune promesse de résultat. |
| 03 | Quiz 1 à 5 (trouve-le-bug ligne 4 recomptée) | OK | ads-manager ; discovery | |
| 04 | 4 types LiveOps ; contenu limité dans le temps | OK | liveops-essentials | |
| 04 | 2 semaines à 1 mois, < 3 semaines d'effort, réutiliser l'existant | OK | content-updates | |
| 04 | « What you do » influence les signaux | OK | discovery | |
| 04 | Extrait de sauvegarde `DONNEES_PAR_DEFAUT` / `completerDonnees` (clés `Etape`, `Pieces`, `Inventaire` en liste) | CORRIGÉ | module 4, leçon 2 et 3 du site | Incohérent avec le fil rouge : le module 4 a déjà `donneesParDefaut()` et `completer()` avec des clés en minuscules (`etape`, `pieces`, `inventaire` en table `id → true`, `equipe`, `version`). Copier l'extrait aurait ajouté des champs `Etape = 1`, `Pieces = 0` en double à côté des vrais. Extrait réécrit : on ajoute `zoneOragesDebloquee = false` dans `donneesParDefaut()`, `completer` inchangée ; exemple autonome qui passe luau-lsp. |
| 04 | Quiz 3 et Défi 1 (`ZoneOragesDebloquee`, `completerDonnees`) | CORRIGÉ | idem | Renommés `zoneOragesDebloquee` et renvoi à `completer` du module 4. |
| 04 | Publier ne migre pas les joueurs ; redémarrer si le format de données change ; Configurations > Server management ; 2 options ; 1-60 min ; matchmaking « Play » seulement ; téléportation groupée | OK | update-games | |
| 04 | `ServerRestartScheduled(restartTime: DateTime, source: CloseReason, attributes)` ; DeveloperUpdate / RobloxMaintenance ; « earliest time » | OK | update-games ; DataModel (référence + YAML) | Non déprécié. |
| 04 | Code serveur (UnixTimestamp, `math.max`, FireAllClients) et client (WaitForChild, SetCore dans `pcall`) | OK | — | Bons emplacements, RemoteEvent dans `ReplicatedStorage.Remotes` (convention), aucune API dépréciée. |
| 04 | Configs / ConfigService sans publier ni redémarrer | OK | configs ; update-games | |
| 04 | Events & Updates : chemin, champs, privé/public, max 10, Join Event / Notify Me, page partageable, onglet Events du groupe | OK | experience-events | |
| 04 | Trending Events (7 jours, 1 000 RSVP, public) ; Off-Platform Featuring (13+, e-mail, 7 jours, Submit for Featuring, pas de garantie) | OK | experience-events | |
| 04 | Annonces : 60 caractères, 1 / 3 jours, joueurs opt-in, être précis | OK | experience-events | |
| 04 | Notifications : pas de pub déguisée ni de fausse pression temporelle | OK | include `experience-notifications/guidelines.md` | « Disguised Ads », « Time Pressured Actions ». |
| 04 | Quiz 1, 2, 4, 5 (trouve-le-bug ligne 5 recomptée) | OK | update-games ; DataModel | |
| 05 | Groups → Communities (21/11/2024), « Groups » reste dans le Creator Hub | OK | DevForum 3268307 | |
| 05 | Groupe 100 Robux, 3 liens sociaux, Roblox n'arbitre pas, 2FA pour certaines permissions, permissions forum/annonces/bans | OK | groups | |
| 05 | Recommandations page de communauté | OK | promotion (section Communities) | |
| 05 | « Liens sociaux » sur la page de communauté sans précision d'âge | REFORMULÉ | social-media-links | Ajout « visibles seulement par les 16 ans et plus à l'âge vérifié ». |
| 05 | Forums (21/08/2025, 13+ connectés), murs en lecture seule (01/12/2025), suppression annoncée début 2026 | REFORMULÉ (simplifié) | DevForum 3892463 | Faits justes ; phrase allégée. Suppression effective (fin mars 2026) rapportée seulement par un média tiers : formulation « annoncée » conservée. |
| 05 | « Communauté Roblox et jeu = canaux qui touchent tous tes joueurs » (encadré Erreur + Résumé) | CORRIGÉ | DevForum 3892463 | Faux pour la communauté : ses forums sont réservés aux 13 ans et plus. Seul le jeu touche tous les joueurs ; la communauté vient ensuite. |
| 05 | Social Links : 16+ vérifié pour ajouter et voir, 3 max, Engagement > Social Links, pas de lien en jeu, exemples | OK | social-media-links ; Community Standards | |
| 05 | Discord 13 ans, plus dans certains pays | OK | support.discord.com 360040724612 | Page en 403 pour les robots ; contenu confirmé par l'extrait indexé (13 ans, 14-16 selon pays). |
| 05 | Blocked Words, Verified Joins, bans, filtrage, signalement | OK | DevForum 3892463 | |
| 05 | Feedback (Audience > Feedback) ; « la raison derrière la suggestion » | OK | feedback ; liveops-essentials | |
| 05 | `GroupService:GetRolesInGroupAsync` (IsMember, Roles {Id, Name, Rank}, triés, publics, cache, Id stable) ; `Player:GetRankInGroupAsync`/`GetRoleInGroupAsync` et `GetRankInGroup`/`GetRoleInGroup` dépréciées | OK | GroupService.yaml ; Player.yaml | |
| 05 | « Le changement ne sera pris en compte qu'à sa prochaine connexion » | REFORMULÉ | GroupService.yaml | Le cache peut encore servir l'ancien résultat après une reconnexion : « au plus tôt ». |
| 05 | Code `GetRolesInGroupAsync` (pcall + `ok`, `IsMember`, rôles multiples) | OK | — | Erreur de `groupId = 0` capturée par le `pcall`. |
| 05 | Quiz 1 à 5 (trouve-le-bug ligne 9 recomptée) | OK | — | |
| Examen | Q canal « tous les joueurs » : bonne réponse « le jeu et ta communauté Roblox » | CORRIGÉ | DevForum 3892463 | Bonne réponse remplacée par « le jeu lui-même » ; explication corrigée (forums 13+). |
| Examen | trouve-le-bug `completerDonnees` (clés `Etape = 1`…) | CORRIGÉ | module 4 | Clés alignées sur le fil rouge (`etape = 0`, `pieces`, `zoneOragesDebloquee`) ; explication « remis à l'étape 0 ». Bug toujours ligne 5, un seul bug. |
| Examen | Q7 : explication « la doc conseille d'améliorer l'onboarding quand une campagne ne donne pas de résultats » | REFORMULÉ | ads-manager | Précisé : « si une campagne ne progresse pas après 3 à 5 jours ». |
| Examen | Autres questions (description, zone hantée, conditions tous âges, bas de miniature, miniature par défaut, vidéo, LaunchData, trouve-le-bug `LocalPlayer` ligne 3, ServerRestartScheduled, événement privé, `GetRankInGroupAsync`) | OK | cf. leçons | Numéros de ligne recomptés. |
| Toutes | Liens `<Sources>` | OK | — | 33 liens testés : tous accessibles (les deux pages de référence API renvoient 502 à curl à cause de leur taille mais s'ouvrent normalement, contenu confirmé avec WebFetch ; Discord 403 pour les robots uniquement). Tous pertinents. |

## Désaccords avec la passe 1
1. **Leçon 04, extrait de sauvegarde** : la passe 1 l'a jugé « OK ». Il ne compilait pas d'erreur, mais il contredisait le module 4 (fonction déjà existante, clés en majuscules contre minuscules, inventaire en liste au lieu de table `id → true`). Un élève qui suit le défi aurait créé des champs en double. Réécrit (voir tableau).
2. **« La communauté Roblox touche tous tes joueurs »** (leçon 05 et question d'examen) : la passe 1 n'a pas relevé la contradiction avec sa propre ligne « forums 13+ ». Corrigé.
3. **Content May Vary** : la passe 1 a validé « répondre seulement à la première question » ; il faut répondre **Non**. Précisé.
4. **Attribution 30 jours** : validée sans nuance par la passe 1 ; elle dépend du type de joueur. Précisé.

## Erreurs restantes non corrigées
- Aucune erreur factuelle connue.
- À surveiller : règles Kids & Select (seuil, frais, remboursement) et divergence entre les deux pages officielles sur le remboursement des 1 000 Robux ; accès des comptes Kids aux pages de communauté non documenté officiellement (la leçon ne s'appuie plus dessus).
- Hors périmètre (module 04) : `completer()` ne met pas à jour le champ `version` d'une ancienne sauvegarde, ce qui rend la protection `ancienne.version > VERSION_DONNEES` inopérante après une hausse de `VERSION_DONNEES`. À signaler au vérificateur du module 04 ; la leçon 07 ne demande pas d'augmenter `VERSION_DONNEES`.
