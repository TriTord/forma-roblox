/**
 * Schémas Zod partagés : questions de quiz (leçons) et d'examens (modules).
 * Les messages d'erreur sont en français pour guider les rédacteurs au moment du build.
 */
import { z } from 'astro/zod';

const texte = z.string().trim().min(1, 'Texte obligatoire (ne peut pas être vide).');

const option = z.strictObject({
  texte,
  correct: z.boolean().default(false),
});

const questionQcm = z.strictObject({
  type: z.literal('qcm'),
  question: texte,
  options: z.array(option).min(2, 'Au moins 2 options.').max(6, 'Au plus 6 options.'),
  explication: texte,
});

const questionVraiFaux = z.strictObject({
  type: z.literal('vrai-faux'),
  question: texte,
  reponse: z.boolean({ error: 'Le champ « reponse » doit valoir true (vrai) ou false (faux).' }),
  explication: texte,
});

const questionTrouveLeBug = z.strictObject({
  type: z.literal('trouve-le-bug'),
  question: texte,
  /** Extrait de code Luau affiché avec coloration et numéros de ligne. */
  code: z.string().min(1, 'Le champ « code » est obligatoire pour une question trouve-le-bug.'),
  options: z.array(option).min(2, 'Au moins 2 options.').max(6, 'Au plus 6 options.'),
  explication: texte,
});

const questionAmelioreLePrompt = z.strictObject({
  type: z.literal('ameliore-le-prompt'),
  question: texte,
  /** Prompt vague à améliorer, affiché tel quel (texte brut, retours à la ligne conservés). */
  prompt: z.string().trim().min(1, 'Le champ « prompt » est obligatoire pour une question ameliore-le-prompt.'),
  /** Versions proposées (une seule est la meilleure) ; les retours à la ligne sont conservés. */
  options: z.array(option).min(2, 'Au moins 2 options.').max(5, 'Au plus 5 options.'),
  explication: texte,
});

export const questionSchema = z
  .discriminatedUnion('type', [questionQcm, questionVraiFaux, questionTrouveLeBug, questionAmelioreLePrompt], {
    error: 'Type de question inconnu : utilise « qcm », « vrai-faux », « trouve-le-bug » ou « ameliore-le-prompt ».',
  })
  .superRefine((q, ctx) => {
    if (q.type === 'vrai-faux') return;
    const bonnes = q.options.filter((o) => o.correct).length;
    if (bonnes === 0) {
      ctx.addIssue({
        code: 'custom',
        message: `Question « ${q.question.slice(0, 50)} » : aucune option n'a « correct: true ».`,
      });
    }
    if ((q.type === 'trouve-le-bug' || q.type === 'ameliore-le-prompt') && bonnes !== 1) {
      ctx.addIssue({
        code: 'custom',
        message: `Question ${q.type} « ${q.question.slice(0, 50)} » : il faut exactement UNE option correcte.`,
      });
    }
  });

export type Question = z.infer<typeof questionSchema>;

/** Liste de questions d'un quiz de leçon. */
export const quizLeconSchema = z
  .array(questionSchema)
  .min(3, 'Un quiz de leçon contient au moins 3 questions.')
  .max(8, 'Un quiz de leçon contient au plus 8 questions.');

/** Frontmatter d'une leçon (fichier .mdx). */
export const leconSchema = z.strictObject({
  titre: z.string().trim().min(3).max(90, 'Titre trop long (90 caractères max).'),
  description: z
    .string()
    .trim()
    .min(30, 'Description trop courte (30 caractères min).')
    .max(220, 'Description trop longue (220 caractères max).'),
  /** Durée estimée de lecture + pratique, en minutes. */
  duree: z.number().int().min(3).max(90),
  objectifs: z
    .array(texte)
    .min(2, 'Au moins 2 objectifs.')
    .max(4, 'Au plus 4 objectifs.'),
  quiz: quizLeconSchema,
  /** Date de dernière vérification des informations (format AAAA-MM-JJ). */
  miseAJour: z.coerce.date().optional(),
  /** true = leçon masquée du build de production (visible en dev). */
  brouillon: z.boolean().default(false),
});

/** Fichier d'examen d'un module (src/content/examens/module-XX.yaml). */
export const examenSchema = z.strictObject({
  module: z.string().regex(/^\d{2}$/, 'Le champ « module » est un numéro sur 2 chiffres, ex. "03".'),
  titre: z.string().trim().min(3).optional(),
  description: z.string().trim().min(10).optional(),
  /** Pourcentage minimal pour réussir (70 par défaut). */
  seuil: z.number().int().min(50).max(100).default(70),
  questions: z
    .array(questionSchema)
    .min(5, 'Un examen contient au moins 5 questions.')
    .max(30, 'Un examen contient au plus 30 questions.'),
});
