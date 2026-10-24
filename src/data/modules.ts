/**
 * Métadonnées des 11 modules de la formation.
 * Source de vérité pour la navigation, la page d'accueil, /programme, les badges et la progression.
 * Les leçons elles-mêmes vivent dans src/content/lecons/module-XX/NN-slug.mdx.
 */
export interface ModuleInfo {
  /** Numéro sur deux chiffres : "00" à "10". Sert d'URL (/modules/00) et de dossier (module-00). */
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
      "Comment fonctionne la plateforme, comment les joueurs découvrent les jeux, l'état d'esprit qui permet d'aller au bout, et le projet que tu vas construire tout au long de la formation.",
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
      "Installer Studio, maîtriser l'interface, construire avec des Parts, organiser son jeu et le tester comme un pro. Tu termines avec le premier niveau jouable de ton obby.",
    emoji: '🛠️',
    objectifs: [
      "Naviguer dans l'interface de Roblox Studio sans te perdre",
      'Construire et organiser une scène avec des Parts, Models et Folders',
      'Tester ton jeu en solo et en multijoueur local',
      'Publier une première version privée de ton jeu',
    ],
    badge: { nom: 'Bâtisseur', emoji: '🧱' },
  },
  {
    numero: '02',
    titre: 'Luau de A à Z',
    titreCourt: 'Luau de A à Z',
    description:
      'Le langage de Roblox, pas à pas : variables, conditions, boucles, fonctions, tables, événements, ModuleScripts et programmation orientée objet.',
    emoji: '📜',
    objectifs: [
      'Lire et écrire des scripts Luau clairs et commentés',
      'Réagir aux événements du jeu (contacts, joueurs, temps)',
      'Structurer ton code avec des ModuleScripts réutilisables',
      'Créer des objets avec les métatables (POO)',
    ],
    badge: { nom: 'Scripteur', emoji: '📜' },
  },
  {
    numero: '03',
    titre: 'Client, serveur et sécurité',
    titreCourt: 'Client / serveur',
    description:
      'Comprendre qui exécute quoi, faire communiquer client et serveur avec les RemoteEvents et RemoteFunctions, et protéger ton jeu contre les exploits.',
    emoji: '🛡️',
    objectifs: [
      'Expliquer le modèle client/serveur et la réplication',
      'Utiliser RemoteEvents et RemoteFunctions correctement',
      'Valider côté serveur tout ce qui vient du client',
      'Sécuriser les checkpoints et les pièces de ton obby',
    ],
    badge: { nom: 'Gardien', emoji: '🛡️' },
  },
  {
    numero: '04',
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
    numero: '05',
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
    numero: '06',
    titre: 'Monétisation et DevEx',
    titreCourt: 'Monétisation',
    description:
      'Game Passes, Developer Products, abonnements, Premium Payouts, fixation des prix, éthique et règles de Roblox, puis conversion des Robux avec DevEx.',
    emoji: '💎',
    objectifs: [
      'Connaître les sources de revenus d’une expérience Roblox',
      'Implémenter Game Passes et Developer Products de façon fiable',
      'Fixer des prix et monétiser sans nuire à l’expérience des joueurs',
      'Comprendre le fonctionnement et les conditions de DevEx',
    ],
    badge: { nom: 'Économiste', emoji: '💎' },
  },
  {
    numero: '07',
    titre: 'Publication et croissance',
    titreCourt: 'Publication',
    description:
      'Préparer une page de jeu qui donne envie, lancer, faire de la publicité avec prudence, publier des mises à jour et animer une communauté.',
    emoji: '🚀',
    objectifs: [
      'Optimiser titre, description, icône et miniatures',
      'Planifier un lancement et des tests sans brûler ton budget',
      'Rythmer mises à jour et événements',
      'Construire et modérer une communauté saine',
    ],
    badge: { nom: 'Lanceur', emoji: '🚀' },
  },
  {
    numero: '08',
    titre: 'Analytics : mesurer pour progresser',
    titreCourt: 'Analytics',
    description:
      'Rétention D1/D7/D30, sessions, engagement, conversion : lire le Creator Dashboard, instrumenter ton jeu et prendre des décisions à partir des données.',
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
    numero: '09',
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
    numero: '10',
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
