/**
 * Progression de l'élève, stockée dans localStorage (navigateur uniquement).
 * Tolère l'absence de localStorage (navigation privée stricte, cookies bloqués) :
 * on bascule alors sur un stockage en mémoire, perdu au rechargement.
 */
import type { CatalogueClient } from '~/lib/cours';

export const CLE_STOCKAGE = 'forma-roblox:progression:v1';
export const EVENEMENT_CHANGEMENT = 'progression:change';

export interface ResultatQuiz {
  score: number;
  total: number;
  meilleurScore: number;
  tentatives: number;
  date: string;
}

export interface ResultatExamen {
  /** Dernier pourcentage obtenu. */
  pct: number;
  meilleurPct: number;
  reussi: boolean;
  sansFaute: boolean;
  tentatives: number;
  date: string;
}

export interface EtatProgression {
  version: 2;
  /** id de leçon → date (ISO) à laquelle elle a été terminée. */
  lecons: Record<string, string>;
  /** id de leçon → meilleur résultat au quiz. */
  quiz: Record<string, ResultatQuiz>;
  /** numéro de module → résultat d'examen. */
  examens: Record<string, ResultatExamen>;
}

const etatVide = (): EtatProgression => ({ version: 2, lecons: {}, quiz: {}, examens: {} });

/**
 * Version 1 → 2 : insertion du module 02 « Scripter avec l'IA ». Les anciens modules 02 à 10
 * sont devenus 03 à 11 ; on décale leurs clés pour que l'élève ne perde pas sa progression.
 */
const decalerNumero = (numero: string) => {
  const n = Number(numero);
  return n >= 2 ? String(n + 1).padStart(2, '0') : numero;
};
const decalerId = (id: string) => id.replace(/^module-(\d{2})\//, (_, n: string) => `module-${decalerNumero(n)}/`);
function migrerCles<T>(table: Record<string, T>, decaler: (cle: string) => string): Record<string, T> {
  return Object.fromEntries(Object.entries(table).map(([cle, valeur]) => [decaler(cle), valeur]));
}

let memoire: string | null = null;
let disponible: boolean | undefined;

export function stockageDisponible(): boolean {
  if (disponible !== undefined) return disponible;
  try {
    const test = '__forma_test__';
    window.localStorage.setItem(test, '1');
    window.localStorage.removeItem(test);
    disponible = true;
  } catch {
    disponible = false;
  }
  return disponible;
}

function lireBrut(): string | null {
  if (!stockageDisponible()) return memoire;
  try {
    return window.localStorage.getItem(CLE_STOCKAGE);
  } catch {
    return memoire;
  }
}

function ecrireBrut(valeur: string | null): void {
  memoire = valeur;
  if (!stockageDisponible()) return;
  try {
    if (valeur === null) window.localStorage.removeItem(CLE_STOCKAGE);
    else window.localStorage.setItem(CLE_STOCKAGE, valeur);
  } catch {
    /* quota dépassé ou accès refusé : on garde la copie en mémoire */
  }
}

const estObjet = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

export function lireEtat(): EtatProgression {
  const brut = lireBrut();
  if (!brut) return etatVide();
  try {
    const donnees: unknown = JSON.parse(brut);
    if (!estObjet(donnees) || (donnees.version !== 1 && donnees.version !== 2)) return etatVide();
    const etat: EtatProgression = {
      version: 2,
      lecons: estObjet(donnees.lecons) ? (donnees.lecons as EtatProgression['lecons']) : {},
      quiz: estObjet(donnees.quiz) ? (donnees.quiz as EtatProgression['quiz']) : {},
      examens: estObjet(donnees.examens) ? (donnees.examens as EtatProgression['examens']) : {},
    };
    if (donnees.version === 1) {
      etat.lecons = migrerCles(etat.lecons, decalerId);
      etat.quiz = migrerCles(etat.quiz, decalerId);
      etat.examens = migrerCles(etat.examens, decalerNumero);
    }
    return etat;
  } catch {
    return etatVide();
  }
}

function sauver(etat: EtatProgression): void {
  ecrireBrut(JSON.stringify(etat));
  window.dispatchEvent(new CustomEvent(EVENEMENT_CHANGEMENT, { detail: etat }));
}

export function modifier(fn: (etat: EtatProgression) => void): EtatProgression {
  const etat = lireEtat();
  fn(etat);
  sauver(etat);
  return etat;
}

export function marquerLecon(id: string, terminee: boolean): void {
  modifier((e) => {
    if (terminee) e.lecons[id] ??= new Date().toISOString();
    else delete e.lecons[id];
  });
}

export function enregistrerQuiz(id: string, score: number, total: number): void {
  modifier((e) => {
    const precedent = e.quiz[id];
    e.quiz[id] = {
      score,
      total,
      meilleurScore: Math.max(score, precedent?.meilleurScore ?? 0),
      tentatives: (precedent?.tentatives ?? 0) + 1,
      date: new Date().toISOString(),
    };
  });
}

export function enregistrerExamen(module: string, score: number, total: number, seuil: number): void {
  const pct = total ? Math.round((score / total) * 100) : 0;
  modifier((e) => {
    const precedent = e.examens[module];
    e.examens[module] = {
      pct,
      meilleurPct: Math.max(pct, precedent?.meilleurPct ?? 0),
      reussi: Boolean(precedent?.reussi) || pct >= seuil,
      sansFaute: Boolean(precedent?.sansFaute) || (total > 0 && score === total),
      tentatives: (precedent?.tentatives ?? 0) + 1,
      date: new Date().toISOString(),
    };
  });
}

export function reinitialiser(): void {
  ecrireBrut(null);
  window.dispatchEvent(new CustomEvent(EVENEMENT_CHANGEMENT, { detail: etatVide() }));
}

/** Appelle `fn` à chaque changement (dans cet onglet ou un autre). Renvoie une fonction de désabonnement. */
export function surChangement(fn: (etat: EtatProgression) => void): () => void {
  const local = () => fn(lireEtat());
  const autreOnglet = (ev: StorageEvent) => {
    if (ev.key === CLE_STOCKAGE || ev.key === null) fn(lireEtat());
  };
  window.addEventListener(EVENEMENT_CHANGEMENT, local);
  window.addEventListener('storage', autreOnglet);
  return () => {
    window.removeEventListener(EVENEMENT_CHANGEMENT, local);
    window.removeEventListener('storage', autreOnglet);
  };
}

/* ------------------------------------------------------------------ */
/* Catalogue (injecté dans chaque page par BaseLayout) et statistiques */
/* ------------------------------------------------------------------ */

export function lireCatalogue(): CatalogueClient {
  const el = document.getElementById('catalogue-formation');
  try {
    return el?.textContent ? (JSON.parse(el.textContent) as CatalogueClient) : { modules: [] };
  } catch {
    return { modules: [] };
  }
}

export interface StatsModule {
  numero: string;
  total: number;
  terminees: number;
  pct: number;
  examenReussi: boolean;
}

export interface Stats {
  total: number;
  terminees: number;
  pct: number;
  modules: StatsModule[];
  /** Première leçon non terminée (pour « Reprendre »). */
  prochaine?: { id: string; titre: string; url: string };
}

const pourcentage = (n: number, total: number) => (total ? Math.round((n / total) * 100) : 0);

export function calculerStats(etat: EtatProgression, catalogue: CatalogueClient): Stats {
  let total = 0;
  let terminees = 0;
  let prochaine: Stats['prochaine'];
  const modules = catalogue.modules.map((m) => {
    const faites = m.lecons.filter((l) => etat.lecons[l.id]).length;
    total += m.lecons.length;
    terminees += faites;
    prochaine ??= m.lecons.find((l) => !etat.lecons[l.id]);
    return {
      numero: m.numero,
      total: m.lecons.length,
      terminees: faites,
      pct: pourcentage(faites, m.lecons.length),
      examenReussi: Boolean(etat.examens[m.numero]?.reussi),
    };
  });
  return { total, terminees, pct: pourcentage(terminees, total), modules, prochaine };
}

/* ------------------------------------------------------------------ */
/* Badges                                                              */
/* ------------------------------------------------------------------ */

export interface Badge {
  id: string;
  nom: string;
  emoji: string;
  description: string;
  obtenu: boolean;
  categorie: 'module' | 'global';
}

export function calculerBadges(etat: EtatProgression, catalogue: CatalogueClient): Badge[] {
  const stats = calculerStats(etat, catalogue);
  const quizParfaits = Object.values(etat.quiz).filter((q) => q.total > 0 && q.meilleurScore === q.total).length;
  // Tous les modules doivent avoir un examen publié ET réussi (badge impossible tant que la formation est incomplète).
  const tousExamens =
    catalogue.modules.length > 0 && catalogue.modules.every((m) => m.aExamen && etat.examens[m.numero]?.reussi);

  const globaux: Badge[] = [
    {
      id: 'premier-pas',
      nom: 'Premier pas',
      emoji: '👣',
      description: 'Terminer ta première leçon.',
      obtenu: stats.terminees >= 1,
      categorie: 'global',
    },
    {
      id: 'mi-parcours',
      nom: 'À mi-parcours',
      emoji: '🏔️',
      description: 'Terminer la moitié des leçons de la formation.',
      obtenu: stats.total > 0 && stats.terminees * 2 >= stats.total,
      categorie: 'global',
    },
    {
      id: 'perfectionniste',
      nom: 'Perfectionniste',
      emoji: '🎯',
      description: 'Obtenir 100 % à 10 quiz de leçon.',
      obtenu: quizParfaits >= 10,
      categorie: 'global',
    },
    {
      id: 'sans-faute',
      nom: 'Sans-faute',
      emoji: '🌟',
      description: 'Obtenir 100 % à un examen de module.',
      obtenu: Object.values(etat.examens).some((e) => e.sansFaute),
      categorie: 'global',
    },
    {
      id: 'formation-complete',
      nom: 'Formation complète',
      emoji: '🏆',
      description: 'Terminer toutes les leçons et réussir tous les examens.',
      obtenu: stats.total > 0 && stats.terminees === stats.total && tousExamens,
      categorie: 'global',
    },
  ];

  const parModule: Badge[] = catalogue.modules.map((m) => ({
    id: `module-${m.numero}`,
    nom: m.badge.nom,
    emoji: m.badge.emoji,
    description: `Réussir l'examen du module ${m.numero} (${m.titre}).`,
    obtenu: Boolean(etat.examens[m.numero]?.reussi),
    categorie: 'module',
  }));

  return [...globaux, ...parModule];
}
