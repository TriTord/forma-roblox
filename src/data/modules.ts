/**
 * Métadonnées des 12 modules de la formation.
 * Source de vérité pour la navigation, la page d'accueil, /programme, les badges et la progression.
 * Les leçons elles-mêmes vivent dans src/content/lecons/module-XX/NN-slug.mdx.
 */
export interface ModuleInfo {
  /** Numéro sur deux chiffres : "00" à "11". Sert d'URL (/modules/00) et de dossier (module-00). */
  numero: string;
  titre: string;
  /** Titre court pour la barre latérale et les cartes. */
  titreCourt: string;
  description: string;
  emoji: string;
  /** Ce que l'élève saura faire à la fin du module (3 à 4 puces). */
  objectifs: string[];
  /** Badge obtenu en réussissant l'examen du module. */
  badge: { nom: string; emoji: string };
}

export const MODULES: ModuleInfo[] = [
  {
    numero: '00',
    titre: 'Bienvenue : comprendre Roblox avant de créer',
    titreCourt: 'Bienvenue et mindset',
    description:
      "Comment fonctionne la plateforme, comment les joueurs découvrent les jeux, l’état d’esprit qui permet d’aller au bout, et le projet que tu vas construire tout au long de la formation.",
    emoji: '🧭',
    objectifs: [
      'Comprendre comment Roblox fonctionne pour les joueurs et pour les créateurs',
      'Savoir comment les jeux sont découverts et quels signaux comptent',
      'Adopter une méthode réaliste : petit périmètre, publication tôt, itérations',
      'Connaître le projet fil rouge « Obby des Nuages »',
    ],
    badge: { nom: 'Explorateur', emoji: '🧭' },
  },
  {
    numero: '01',
    titre: 'Roblox Studio de zéro',
    titreCourt: 'Roblox Studio',
    description:
      "Installer Studio, maîtriser l’interface, construire avec des Parts, organiser son jeu et le tester comme un pro. Tu termines avec le premier niveau jouable de ton obby, publié en privé.",
    emoji: '🛠️',
    objectifs: [
      "Naviguer dans l’interface de Roblox Studio sans te perdre",
      'Construire et organiser une scène avec des Parts, Models et Folders',
      'Tester ton jeu en solo et en multijoueur local',
      'Publier une première version privée de ton jeu',
    ],
    badge: { nom: 'Bâtisseur', emoji: '🧱' },
  },
  {
    numero: '02',
    titre: 'Scripter avec l’IA : piloter Claude Code',
    titreCourt: 'Scripter avec l’IA',
    description:
      'Créer ton jeu en dirigeant des IA de code, surtout Claude Code : installer un workflow pro (Rojo, Git, serveur MCP de Studio), écrire des prompts précis, découper un projet, puis relire, tester et déboguer ce que l’IA produit.',
    emoji: '🤖',
    objectifs: [
      'Choisir le bon outil d’IA et installer un workflow pro (Rojo, Git, MCP, outils qualité)',
      'Écrire des prompts précis : contexte, objectif, contraintes, critères de réussite',
      'Découper un projet en petites tâches et construire un jeu prompt par prompt',
      'Relire, tester et déboguer le code généré, et éviter les pièges de l’IA',
    ],
    badge: { nom: 'Pilote d’IA', emoji: '🤖' },
  },
  {
    numero: '03',
    titre: 'Lire et comprendre Luau (pour diriger l’IA)',
    titreCourt: 'Lire et comprendre Luau',
    description:
      'Le langage de Roblox, pas à pas, pour savoir lire et vérifier ce que l’IA écrit : variables, conditions, boucles, fonctions, tables, événements, ModuleScripts et programmation orientée objet.',
    emoji: '📜',
    objectifs: [
      'Lire et comprendre un script Luau, ligne par ligne',
      'Repérer ce qui cloche dans un script (erreurs, oublis, mauvaises pratiques)',
      'Reconnaître la structure d’un code bien organisé (événements, ModuleScripts, POO)',
      'Modifier un script toi-même quand une petite retouche suffit',
    ],
    badge: { nom: 'Scripteur', emoji: '📜' },
  },
  {
    numero: '04',
    titre: 'Client, serveur et sécurité',
    titreCourt: 'Client / serveur',
    description:
      'Comprendre qui exécute quoi, faire communiquer client et serveur avec les RemoteEvents et RemoteFunctions, et protéger ton jeu contre la triche (les exploits).',
    emoji: '🛡️',
    objectifs: [
      'Expliquer le modèle client/serveur et la réplication',
      'Utiliser RemoteEvents et RemoteFunctions correctement',
      'Valider côté serveur tout ce qui vient du client',
      'Sécuriser les checkpoints, les pièces et la boutique de ton obby',
    ],
    badge: { nom: 'Gardien', emoji: '🛡️' },
  },
  {
    numero: '05',
    titre: 'Systèmes de jeu',
    titreCourt: 'Systèmes de jeu',
    description:
      'Les briques de tout jeu sérieux : leaderstats, sauvegarde fiable avec les DataStores, inventaire, interfaces, animations R6/R15 et TweenService.',
    emoji: '⚙️',
    objectifs: [
      'Sauvegarder les données des joueurs sans en perdre',
      'Afficher des statistiques et une interface lisible sur tous les écrans',
      'Gérer un inventaire simple et sécurisé',
      'Animer personnages, objets et interfaces',
    ],
    badge: { nom: 'Ingénieur', emoji: '⚙️' },
  },
  {
    numero: '06',
    titre: 'Un game design qui retient les joueurs',
    titreCourt: 'Game design',
    description:
      'Boucle de jeu, 60 premières secondes, progression, récompenses et rejouabilité : ce qui donne envie de rester et de revenir.',
    emoji: '🎯',
    objectifs: [
      'Définir une boucle de jeu claire et motivante',
      'Concevoir des 60 premières secondes qui accrochent',
      'Construire une progression et des récompenses équilibrées',
      'Tester ton jeu avec de vrais joueurs et en tirer des décisions',
    ],
    badge: { nom: 'Game designer', emoji: '🎯' },
  },
  {
    numero: '07',
    titre: 'Monétisation et DevEx',
    titreCourt: 'Monétisation',
    description:
      'Game Passes, Developer Products, abonnements, Creator Rewards (qui ont remplacé les Premium Payouts), fixation des prix, éthique et règles de Roblox, puis conversion des Robux avec DevEx.',
    emoji: '💎',
    objectifs: [
      'Connaître les sources de revenus d’un jeu Roblox',
      'Implémenter Game Passes et Developer Products de façon fiable',
      'Fixer des prix et monétiser sans nuire à l’expérience des joueurs',
      'Comprendre le fonctionnement et les conditions de DevEx',
    ],
    badge: { nom: 'Économiste', emoji: '💎' },
  },
  {
    numero: '08',
    titre: 'Publication et croissance',
    titreCourt: 'Publication',
    description:
      'Préparer une page de jeu qui donne envie, remplir le questionnaire de maturité et les conditions de publication, lancer, faire de la publicité avec prudence, publier des mises à jour et animer une communauté.',
    emoji: '🚀',
    objectifs: [
      'Soigner titre, description, icône et miniatures, et remplir les conditions de publication',
      'Planifier un lancement et des tests sans brûler ton budget',
      'Rythmer mises à jour et événements',
      'Construire et modérer une communauté saine',
    ],
    badge: { nom: 'Lanceur', emoji: '🚀' },
  },
  {
    numero: '09',
    titre: 'Analytics : mesurer pour progresser',
    titreCourt: 'Analytics',
    description:
      'Rétention D1/D7/D30, sessions, engagement, conversion : lire le Creator Dashboard, ajouter tes propres mesures dans ton jeu et prendre des décisions à partir des données.',
    emoji: '📊',
    objectifs: [
      'Lire les métriques clés du Creator Dashboard',
      'Interpréter la rétention et l’engagement',
      'Mesurer la monétisation et la conversion',
      'Ajouter des événements analytiques à ton jeu',
    ],
    badge: { nom: 'Analyste', emoji: '📊' },
  },
  {
    numero: '10',
    titre: 'Optimisation et performances',
    titreCourt: 'Optimisation',
    description:
      'Penser mobile d’abord, mesurer les performances, utiliser le streaming d’instances et chasser le lag côté scripts, physique, réseau et rendu.',
    emoji: '⚡',
    objectifs: [
      'Concevoir pour le mobile dès le départ',
      'Mesurer les performances avec les outils de Studio',
      'Configurer le streaming d’instances',
      'Réduire le lag sur les appareils modestes',
    ],
    badge: { nom: 'Optimiseur', emoji: '⚡' },
  },
  {
    numero: '11',
    titre: 'Les erreurs qui tuent un jeu et la checklist de lancement',
    titreCourt: 'Erreurs et checklist',
    description:
      'Les erreurs de conception, techniques et de lancement les plus fréquentes, comment les éviter, et une checklist complète avant de publier.',
    emoji: '✅',
    objectifs: [
      'Reconnaître les erreurs de conception les plus courantes',
      'Prévenir les erreurs techniques qui font fuir les joueurs',
      'Préparer un lancement avec une checklist complète',
      'Planifier la suite après la formation',
    ],
    badge: { nom: 'Prêt au lancement', emoji: '✅' },
  },
];

export function getModuleInfo(numero: string): ModuleInfo | undefined {
  return MODULES.find((m) => m.numero === numero);
}
