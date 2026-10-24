/**
 * Validation des DONNÉES réelles des quiz et examens (fichiers de src/content),
 * au-delà du schéma Zod du build : bonnes réponses, doublons, explications.
 * Chaque test liste tous les fichiers / questions fautifs.
 */
import { describe, expect, it } from 'vitest';
import { normaliser, problemesQuestion, questionsDesExamens, quizDesLecons, type QuizSource } from '../contenu-quiz';

const lecons = quizDesLecons();
const examens = questionsDesExamens();
const tous: QuizSource[] = [...lecons, ...examens];

const problemesDe = (sources: QuizSource[]) =>
  sources.flatMap((s) => s.questions.flatMap((q, i) => problemesQuestion(q).map((p) => `${s.id} Q${i + 1} ${p}`)));

describe('données des quiz et examens', () => {
  it('le contenu est complet : 58 leçons et 11 examens', () => {
    expect(lecons.filter((l) => !l.brouillon)).toHaveLength(58);
    expect(examens).toHaveLength(11);
  });

  it('chaque quiz de leçon a 3 à 8 questions, chaque examen 5 à 30', () => {
    const fautifs = [
      ...lecons.filter((l) => l.questions.length < 3 || l.questions.length > 8).map((l) => `${l.id} (${l.questions.length})`),
      ...examens.filter((e) => e.questions.length < 5 || e.questions.length > 30).map((e) => `${e.id} (${e.questions.length})`),
    ];
    expect(fautifs).toEqual([]);
  });

  it('chaque QCM a ≥ 1 bonne réponse, chaque trouve-le-bug exactement 1, pas d’option en double, explications non vides', () => {
    const problemes = problemesDe(tous);
    expect(problemes, problemes.join('\n')).toEqual([]);
  });

  it('pas deux fois la même question dans un même quiz ou examen', () => {
    const doublons = tous.flatMap((s) => {
      const vus = new Set<string>();
      return s.questions.flatMap((q) => {
        const cle = normaliser(q.question) + (q.code ?? '');
        if (vus.has(cle)) return [`${s.id} : « ${q.question.slice(0, 60)} »`];
        vus.add(cle);
        return [];
      });
    });
    expect(doublons).toEqual([]);
  });

  it('les extraits trouve-le-bug restent courts (≤ 20 lignes ; > 15 signalé, cf. AUTHORING.md)', () => {
    const lignes = (q: QuizSource['questions'][number]) => (q.code ?? '').replace(/\n+$/, '').split('\n').length;
    const extraits = tous.flatMap((s) =>
      s.questions.filter((q) => q.type === 'trouve-le-bug').map((q) => ({ ou: `${s.id} : « ${q.question.slice(0, 50)} »`, n: lignes(q) })),
    );
    const longs = extraits.filter((e) => e.n > 15);
    if (longs.length) console.warn(`[CONTENU] extraits trouve-le-bug de plus de 15 lignes :\n  ${longs.map((e) => `${e.ou} (${e.n})`).join('\n  ')}`);
    expect(extraits.filter((e) => e.n > 20).map((e) => `${e.ou} (${e.n})`)).toEqual([]);
  });

  it('la détection de problèmes repère bien les cas fautifs', () => {
    expect(problemesQuestion({ type: 'qcm', question: 'Q ?', options: [{ texte: 'A' }, { texte: 'B' }], explication: 'Une explication assez longue.' })).toHaveLength(1);
    expect(
      problemesQuestion({
        type: 'trouve-le-bug',
        question: 'Q ?',
        code: 'x',
        options: [{ texte: 'A', correct: true }, { texte: 'B', correct: true }, { texte: 'C' }],
        explication: 'Une explication assez longue.',
      }),
    ).toHaveLength(1);
    expect(
      problemesQuestion({ type: 'qcm', question: 'Q ?', options: [{ texte: 'Oui', correct: true }, { texte: 'oui.' }], explication: 'Une explication assez longue.' }),
    ).toHaveLength(1);
    expect(problemesQuestion({ type: 'vrai-faux', question: 'Q ?', reponse: true, explication: ' ' })).toHaveLength(1);
  });
});
