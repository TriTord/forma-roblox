/**
 * Lecture des quiz et examens directement dans les fichiers sources (src/content),
 * sans passer par Astro : sert de « vérité terrain » indépendante du HTML construit.
 * Utilisé par les tests unitaires (validation des données) et e2e (recoupement DOM ↔ source).
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

export const RACINE_PROJET = fileURLToPath(new URL('../', import.meta.url));
const DOSSIER_LECONS = join(RACINE_PROJET, 'src', 'content', 'lecons');
const DOSSIER_EXAMENS = join(RACINE_PROJET, 'src', 'content', 'examens');

export interface OptionSource {
  texte: string;
  correct?: boolean;
}
export interface QuestionSource {
  type: 'qcm' | 'vrai-faux' | 'trouve-le-bug' | 'ameliore-le-prompt';
  question: string;
  options?: OptionSource[];
  reponse?: boolean;
  code?: string;
  prompt?: string;
  explication: string;
}
export interface QuizSource {
  /** « module-03/04-tables » (leçon) ou « examen-02 » (examen). */
  id: string;
  fichier: string;
  questions: QuestionSource[];
  brouillon?: boolean;
}

/** Frontmatter YAML d'un fichier MDX (entre les deux premières lignes « --- »). */
export function frontmatter(source: string): Record<string, unknown> {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(source);
  if (!m) throw new Error('Frontmatter introuvable');
  return parse(m[1]) as Record<string, unknown>;
}

export function quizDesLecons(): QuizSource[] {
  const resultat: QuizSource[] = [];
  for (const dossier of readdirSync(DOSSIER_LECONS).filter((d) => /^module-\d{2}$/.test(d)).sort()) {
    for (const nom of readdirSync(join(DOSSIER_LECONS, dossier)).filter((f) => /^\d{2}-.+\.mdx$/.test(f)).sort()) {
      const fichier = join(DOSSIER_LECONS, dossier, nom);
      const fm = frontmatter(readFileSync(fichier, 'utf8'));
      resultat.push({
        id: `${dossier}/${nom.replace(/\.mdx$/, '')}`,
        fichier,
        questions: (fm.quiz as QuestionSource[]) ?? [],
        brouillon: fm.brouillon === true,
      });
    }
  }
  return resultat;
}

export function questionsDesExamens(): QuizSource[] {
  return readdirSync(DOSSIER_EXAMENS)
    .filter((f) => /^module-\d{2}\.ya?ml$/.test(f))
    .sort()
    .map((nom) => {
      const fichier = join(DOSSIER_EXAMENS, nom);
      const donnees = parse(readFileSync(fichier, 'utf8')) as { module: string; questions: QuestionSource[] };
      return { id: `examen-${donnees.module}`, fichier, questions: donnees.questions ?? [] };
    });
}

/** Options telles que le site les affiche (vrai-faux → Vrai / Faux). */
export function optionsAffichees(q: QuestionSource): OptionSource[] {
  if (q.type === 'vrai-faux') {
    return [
      { texte: 'Vrai', correct: q.reponse === true },
      { texte: 'Faux', correct: q.reponse === false },
    ];
  }
  return q.options ?? [];
}

/** Indices des bonnes réponses, au format de l'attribut data-correct (« 0,2 »). */
export const indicesCorrects = (q: QuestionSource) =>
  optionsAffichees(q)
    .flatMap((o, i) => (o.correct ? [i] : []))
    .join(',');

/**
 * Normalisation pour détecter les doublons : espaces, ponctuation finale et casse
 * (la casse est conservée dans le `code`, où elle compte : `leaderstats` ≠ `LeaderStats`).
 */
export const normaliser = (s: string) =>
  s
    .normalize('NFC')
    .split(/(`[^`]*`)/)
    .map((morceau) => (morceau.startsWith('`') ? morceau : morceau.toLowerCase()))
    .join('')
    .replace(/\s+/g, ' ')
    .replace(/[\s.;:!?]+$/u, '')
    .trim();

/** Problèmes de données d'une question (liste vide = question valide). */
export function problemesQuestion(q: QuestionSource): string[] {
  const p: string[] = [];
  const debut = `« ${String(q.question ?? '').slice(0, 60)} »`;
  if (!q.question || !String(q.question).trim()) p.push('énoncé vide');
  if (typeof q.explication !== 'string' || !q.explication.trim()) p.push(`${debut} : explication vide`);
  else if (q.explication.trim().length < 20) p.push(`${debut} : explication trop courte (« ${q.explication.trim()} »)`);
  if (q.type === 'vrai-faux') {
    if (typeof q.reponse !== 'boolean') p.push(`${debut} : « reponse » doit être true ou false`);
    return p;
  }
  const options = q.options ?? [];
  const bonnes = options.filter((o) => o.correct === true).length;
  if (options.length < 2) p.push(`${debut} : moins de 2 options`);
  if (q.type === 'qcm' && bonnes < 1) p.push(`${debut} : QCM sans bonne réponse`);
  if (q.type === 'qcm' && bonnes === options.length) p.push(`${debut} : toutes les options sont correctes`);
  if (q.type === 'trouve-le-bug' && bonnes !== 1) p.push(`${debut} : trouve-le-bug avec ${bonnes} bonnes réponses (1 attendue)`);
  if (q.type === 'trouve-le-bug' && !String(q.code ?? '').trim()) p.push(`${debut} : code vide`);
  if (q.type === 'ameliore-le-prompt' && bonnes !== 1) p.push(`${debut} : ameliore-le-prompt avec ${bonnes} bonnes réponses (1 attendue)`);
  if (q.type === 'ameliore-le-prompt' && !String(q.prompt ?? '').trim()) p.push(`${debut} : prompt vide`);
  const vus = new Set<string>();
  for (const o of options) {
    const t = normaliser(String(o.texte ?? ''));
    if (!t) p.push(`${debut} : option vide`);
    else if (vus.has(t)) p.push(`${debut} : option en double « ${o.texte} »`);
    vus.add(t);
  }
  return p;
}
