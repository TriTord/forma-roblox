/** Schémas de validation du contenu (src/lib/schemas.ts) : ce que le build accepte ou refuse. */
import { describe, expect, it } from 'vitest';
import { examenSchema, leconSchema, questionSchema } from '~/lib/schemas';

const vf = { type: 'vrai-faux', question: 'Q ?', reponse: true, explication: 'Parce que.' };
const qcm = {
  type: 'qcm',
  question: 'Q ?',
  options: [{ texte: 'A', correct: true }, { texte: 'B' }],
  explication: 'Parce que.',
};
const bug = {
  type: 'trouve-le-bug',
  question: 'Où est le bug ?',
  code: 'prnt("x")',
  options: [{ texte: 'Ligne 1', correct: true }, { texte: 'Ligne 2' }],
  explication: 'prnt n’existe pas.',
};

const lecon = {
  titre: 'Une leçon',
  description: 'Une description suffisamment longue pour passer.',
  duree: 10,
  objectifs: ['Comprendre A', 'Créer B'],
  quiz: [vf, qcm, bug],
};

describe('questions', () => {
  it('accepte les 3 types valides', () => {
    for (const q of [vf, qcm, bug]) expect(questionSchema.safeParse(q).success).toBe(true);
  });

  it('applique correct: false par défaut aux options', () => {
    const r = questionSchema.parse(qcm);
    expect(r.type === 'qcm' && r.options[1].correct).toBe(false);
  });

  it('refuse un QCM sans bonne réponse', () => {
    expect(questionSchema.safeParse({ ...qcm, options: [{ texte: 'A' }, { texte: 'B' }] }).success).toBe(false);
  });

  it('refuse un trouve-le-bug avec 2 bonnes réponses ou sans code', () => {
    const deux = { ...bug, options: [{ texte: 'A', correct: true }, { texte: 'B', correct: true }] };
    expect(questionSchema.safeParse(deux).success).toBe(false);
    expect(questionSchema.safeParse({ ...bug, code: '' }).success).toBe(false);
  });

  it('refuse un type inconnu, un champ inconnu, une réponse vrai-faux non booléenne', () => {
    expect(questionSchema.safeParse({ ...vf, type: 'ouverte' }).success).toBe(false);
    expect(questionSchema.safeParse({ ...vf, indice: 'x' }).success).toBe(false);
    expect(questionSchema.safeParse({ ...vf, reponse: 'vrai' }).success).toBe(false);
  });

  it('refuse moins de 2 ou plus de 6 options', () => {
    expect(questionSchema.safeParse({ ...qcm, options: [{ texte: 'A', correct: true }] }).success).toBe(false);
    const sept = Array.from({ length: 7 }, (_, i) => ({ texte: `O${i}`, correct: i === 0 }));
    expect(questionSchema.safeParse({ ...qcm, options: sept }).success).toBe(false);
  });
});

describe('leçon', () => {
  it('accepte une leçon valide (brouillon false par défaut)', () => {
    expect(leconSchema.parse(lecon).brouillon).toBe(false);
  });

  it('impose 3 à 8 questions de quiz et 2 à 4 objectifs', () => {
    expect(leconSchema.safeParse({ ...lecon, quiz: [vf, qcm] }).success).toBe(false);
    expect(leconSchema.safeParse({ ...lecon, quiz: Array(9).fill(vf) }).success).toBe(false);
    expect(leconSchema.safeParse({ ...lecon, objectifs: ['Un seul'] }).success).toBe(false);
  });

  it('refuse un champ de frontmatter inconnu (faute de frappe)', () => {
    expect(leconSchema.safeParse({ ...lecon, durée: 10 }).success).toBe(false);
  });

  it('convertit miseAJour en date', () => {
    expect(leconSchema.parse({ ...lecon, miseAJour: '2026-10-24' }).miseAJour).toBeInstanceOf(Date);
  });
});

describe('examen', () => {
  const examen = { module: '03', questions: [vf, qcm, bug, vf, qcm] };

  it('accepte un examen valide avec un seuil de 70 % par défaut', () => {
    expect(examenSchema.parse(examen).seuil).toBe(70);
  });

  it('impose un numéro de module sur 2 chiffres, 5 à 30 questions, un seuil de 50 à 100', () => {
    expect(examenSchema.safeParse({ ...examen, module: '3' }).success).toBe(false);
    expect(examenSchema.safeParse({ ...examen, questions: [vf] }).success).toBe(false);
    expect(examenSchema.safeParse({ ...examen, seuil: 40 }).success).toBe(false);
  });
});
