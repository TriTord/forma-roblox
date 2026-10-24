/** Constantes globales du site. */
export const SITE = {
  nom: 'Forma Roblox',
  titre: 'Créer un jeu Roblox qui marche, de A à Z',
  description:
    'Formation en français pour créer, publier et faire grandir ton premier jeu Roblox : Roblox Studio, Luau, client/serveur, systèmes de jeu, game design, monétisation éthique, analytics et optimisation.',
  avertissement:
    'Formation indépendante, non affiliée à Roblox Corporation. « Roblox » et « Roblox Studio » sont des marques de Roblox Corporation.',
  /** Nom du jeu construit au fil des modules. */
  filRouge: 'Obby des Nuages',
} as const;

/** Thèmes Shiki (blocs de code MDX + composant <Code>). Variantes choisies pour leurs contrastes AA. */
export const THEMES_CODE = {
  light: 'github-light-default',
  dark: 'github-dark-default',
} as const;

/** Seuil (en %) pour réussir un quiz de leçon (marque la leçon comme terminée). */
export const SEUIL_QUIZ = 70;
/** Seuil par défaut (en %) d'un examen de module, surchargeable dans le fichier d'examen. */
export const SEUIL_EXAMEN_DEFAUT = 70;

/** Préfixe une route interne avec la base du site (utile si le site est servi dans un sous-dossier). */
export function lien(chemin: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${chemin.startsWith('/') ? chemin : `/${chemin}`}`;
}
