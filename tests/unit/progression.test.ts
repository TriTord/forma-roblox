/**
 * Logique de progression (src/scripts/progression.ts) testée sans navigateur :
 * `window` est remplacé par un EventTarget + un localStorage en mémoire.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { CatalogueClient } from '~/lib/cours';

type Progression = typeof import('~/scripts/progression');

class StockageMemoire {
  donnees = new Map<string, string>();
  get length() {
    return this.donnees.size;
  }
  key(i: number) {
    return [...this.donnees.keys()][i] ?? null;
  }
  getItem(k: string) {
    return this.donnees.get(k) ?? null;
  }
  setItem(k: string, v: string) {
    this.donnees.set(k, String(v));
  }
  removeItem(k: string) {
    this.donnees.delete(k);
  }
  clear() {
    this.donnees.clear();
  }
}

let stockage: StockageMemoire;
let fenetre: EventTarget & { localStorage: StockageMemoire };

/** Recharge le module (son cache « stockage disponible » est au niveau module). */
async function charger(): Promise<Progression> {
  vi.resetModules();
  return import('~/scripts/progression');
}

const catalogue: CatalogueClient = {
  modules: [
    {
      numero: '00',
      titre: 'Bienvenue',
      emoji: '🧭',
      badge: { nom: 'Explorateur', emoji: '🧭' },
      aExamen: true,
      lecons: [
        { id: 'module-00/01-a', titre: 'A', url: '/modules/00/a/' },
        { id: 'module-00/02-b', titre: 'B', url: '/modules/00/b/' },
      ],
    },
    {
      numero: '01',
      titre: 'Studio',
      emoji: '🛠️',
      badge: { nom: 'Bâtisseur', emoji: '🧱' },
      aExamen: false,
      lecons: [
        { id: 'module-01/01-c', titre: 'C', url: '/modules/01/c/' },
        { id: 'module-01/02-d', titre: 'D', url: '/modules/01/d/' },
      ],
    },
    { numero: '02', titre: 'Vide', emoji: '📜', badge: { nom: 'Scribe', emoji: '📜' }, aExamen: false, lecons: [] },
  ],
};

beforeEach(() => {
  stockage = new StockageMemoire();
  fenetre = Object.assign(new EventTarget(), { localStorage: stockage });
  vi.stubGlobal('window', fenetre);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('lecture / écriture de l’état', () => {
  it('renvoie un état vide sans données', async () => {
    const p = await charger();
    expect(p.lireEtat()).toEqual({ version: 2, lecons: {}, quiz: {}, examens: {} });
  });

  it('ignore des données corrompues ou d’une autre version', async () => {
    const p = await charger();
    stockage.setItem(p.CLE_STOCKAGE, '{pas du json');
    expect(p.lireEtat().lecons).toEqual({});
    stockage.setItem(p.CLE_STOCKAGE, JSON.stringify({ version: 3, lecons: { x: 'y' } }));
    expect(p.lireEtat().lecons).toEqual({});
    stockage.setItem(p.CLE_STOCKAGE, JSON.stringify([1, 2]));
    expect(p.lireEtat().lecons).toEqual({});
    stockage.setItem(p.CLE_STOCKAGE, JSON.stringify({ version: 1, lecons: [1], quiz: null, examens: 'x' }));
    expect(p.lireEtat()).toEqual({ version: 2, lecons: {}, quiz: {}, examens: {} });
  });

  it('migre une progression de la version 1 (modules 02 à 10 décalés d’un cran)', async () => {
    const p = await charger();
    const r = { score: 4, total: 5, meilleurScore: 4, tentatives: 1, date: 'd' };
    const ex = { pct: 80, meilleurPct: 80, reussi: true, sansFaute: false, tentatives: 1, date: 'd' };
    stockage.setItem(
      p.CLE_STOCKAGE,
      JSON.stringify({
        version: 1,
        lecons: { 'module-01/01-a': 'd1', 'module-02/04-tables': 'd2', 'module-10/04-checklist': 'd3' },
        quiz: { 'module-09/02-b': r },
        examens: { '00': ex, '02': ex, '10': ex },
      }),
    );
    expect(p.lireEtat()).toEqual({
      version: 2,
      lecons: { 'module-01/01-a': 'd1', 'module-03/04-tables': 'd2', 'module-11/04-checklist': 'd3' },
      quiz: { 'module-10/02-b': r },
      examens: { '00': ex, '03': ex, '11': ex },
    });
  });

  it('marque et démarque une leçon en conservant la date initiale', async () => {
    const p = await charger();
    p.marquerLecon('module-00/01-a', true);
    const date = p.lireEtat().lecons['module-00/01-a'];
    expect(date).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    p.marquerLecon('module-00/01-a', true);
    expect(p.lireEtat().lecons['module-00/01-a']).toBe(date);
    p.marquerLecon('module-00/01-a', false);
    expect(p.lireEtat().lecons).toEqual({});
  });

  it('enregistre le meilleur score et le nombre de tentatives d’un quiz', async () => {
    const p = await charger();
    p.enregistrerQuiz('l', 3, 5);
    p.enregistrerQuiz('l', 5, 5);
    p.enregistrerQuiz('l', 2, 5);
    expect(p.lireEtat().quiz.l).toMatchObject({ score: 2, total: 5, meilleurScore: 5, tentatives: 3 });
  });

  it('enregistre un examen : pourcentage arrondi, réussite et sans-faute définitifs', async () => {
    const p = await charger();
    p.enregistrerExamen('00', 2, 3, 70); // 67 %
    expect(p.lireEtat().examens['00']).toMatchObject({ pct: 67, meilleurPct: 67, reussi: false, sansFaute: false, tentatives: 1 });
    p.enregistrerExamen('00', 3, 3, 70);
    expect(p.lireEtat().examens['00']).toMatchObject({ pct: 100, reussi: true, sansFaute: true });
    p.enregistrerExamen('00', 0, 3, 70);
    expect(p.lireEtat().examens['00']).toMatchObject({ pct: 0, meilleurPct: 100, reussi: true, sansFaute: true, tentatives: 3 });
  });

  it('gère un examen sans question (total = 0)', async () => {
    const p = await charger();
    p.enregistrerExamen('05', 0, 0, 70);
    expect(p.lireEtat().examens['05']).toMatchObject({ pct: 0, reussi: false, sansFaute: false });
  });

  it('réinitialise toute la progression', async () => {
    const p = await charger();
    p.marquerLecon('a', true);
    p.enregistrerQuiz('a', 1, 1);
    p.reinitialiser();
    expect(stockage.getItem(p.CLE_STOCKAGE)).toBeNull();
    expect(p.lireEtat()).toEqual({ version: 2, lecons: {}, quiz: {}, examens: {} });
  });
});

describe('notifications de changement', () => {
  it('appelle l’abonné à chaque modification locale, et plus après désabonnement', async () => {
    const p = await charger();
    const fn = vi.fn();
    const desabonner = p.surChangement(fn);
    p.marquerLecon('a', true);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn.mock.calls[0][0].lecons).toHaveProperty('a');
    p.reinitialiser();
    expect(fn).toHaveBeenCalledTimes(2);
    desabonner();
    p.marquerLecon('b', true);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('réagit aux modifications faites dans un autre onglet (événement storage)', async () => {
    const p = await charger();
    const fn = vi.fn();
    p.surChangement(fn);
    const evenement = (cle: string | null) => Object.assign(new Event('storage'), { key: cle });
    fenetre.dispatchEvent(evenement('autre-cle'));
    expect(fn).not.toHaveBeenCalled();
    fenetre.dispatchEvent(evenement(p.CLE_STOCKAGE));
    fenetre.dispatchEvent(evenement(null)); // localStorage.clear()
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

describe('stockage indisponible', () => {
  it('bascule sur la mémoire si localStorage lève une exception', async () => {
    vi.stubGlobal(
      'window',
      Object.defineProperty(new EventTarget(), 'localStorage', {
        get(): Storage {
          throw new Error('SecurityError');
        },
      }),
    );
    const p = await charger();
    expect(p.stockageDisponible()).toBe(false);
    p.marquerLecon('a', true);
    expect(p.lireEtat().lecons).toHaveProperty('a');
    p.reinitialiser();
    expect(p.lireEtat().lecons).toEqual({});
  });

  it('garde une copie en mémoire si setItem échoue (quota)', async () => {
    const p = await charger();
    expect(p.stockageDisponible()).toBe(true);
    stockage.setItem = () => {
      throw new Error('QuotaExceededError');
    };
    expect(() => p.marquerLecon('a', true)).not.toThrow();
  });
});

describe('statistiques', () => {
  it('calcule les pourcentages global et par module, et la prochaine leçon', async () => {
    const p = await charger();
    const etat = { version: 2 as const, lecons: { 'module-00/01-a': 'd', 'module-01/01-c': 'd' }, quiz: {}, examens: {} };
    const s = p.calculerStats(etat, catalogue);
    expect(s).toMatchObject({ total: 4, terminees: 2, pct: 50 });
    expect(s.modules.map((m) => [m.numero, m.terminees, m.total, m.pct])).toEqual([
      ['00', 1, 2, 50],
      ['01', 1, 2, 50],
      ['02', 0, 0, 0],
    ]);
    expect(s.prochaine?.id).toBe('module-00/02-b');
  });

  it('ignore les leçons inconnues du catalogue (anciennes leçons supprimées)', async () => {
    const p = await charger();
    const etat = { version: 2 as const, lecons: { 'module-10/99-supprimee': 'd' }, quiz: {}, examens: {} };
    expect(p.calculerStats(etat, catalogue)).toMatchObject({ terminees: 0, pct: 0 });
  });

  it('n’a pas de prochaine leçon quand tout est terminé, et gère un catalogue vide', async () => {
    const p = await charger();
    const toutes = Object.fromEntries(catalogue.modules.flatMap((m) => m.lecons.map((l) => [l.id, 'd'])));
    expect(p.calculerStats({ version: 2, lecons: toutes, quiz: {}, examens: {} }, catalogue)).toMatchObject({
      pct: 100,
      prochaine: undefined,
    });
    expect(p.calculerStats({ version: 2, lecons: {}, quiz: {}, examens: {} }, { modules: [] })).toMatchObject({ total: 0, pct: 0 });
  });
});

describe('badges', () => {
  const obtenus = (badges: { id: string; obtenu: boolean }[]) => badges.filter((b) => b.obtenu).map((b) => b.id).sort();

  it('aucun badge au départ ; un badge par module + 5 badges globaux', async () => {
    const p = await charger();
    const badges = p.calculerBadges(p.lireEtat(), catalogue);
    expect(badges).toHaveLength(5 + catalogue.modules.length);
    expect(obtenus(badges)).toEqual([]);
    expect(new Set(badges.map((b) => b.id)).size).toBe(badges.length);
  });

  it('premier pas, mi-parcours, badge de module et sans-faute', async () => {
    const p = await charger();
    p.marquerLecon('module-00/01-a', true);
    expect(obtenus(p.calculerBadges(p.lireEtat(), catalogue))).toEqual(['premier-pas']);
    p.marquerLecon('module-00/02-b', true);
    p.enregistrerExamen('00', 9, 10, 70);
    expect(obtenus(p.calculerBadges(p.lireEtat(), catalogue))).toEqual(['mi-parcours', 'module-00', 'premier-pas']);
    p.enregistrerExamen('00', 10, 10, 70);
    expect(obtenus(p.calculerBadges(p.lireEtat(), catalogue))).toContain('sans-faute');
  });

  it('perfectionniste : 10 quiz à 100 % (le meilleur score compte)', async () => {
    const p = await charger();
    for (let i = 0; i < 9; i++) p.enregistrerQuiz(`q${i}`, 4, 4);
    p.enregistrerQuiz('q9', 3, 4);
    expect(obtenus(p.calculerBadges(p.lireEtat(), catalogue))).not.toContain('perfectionniste');
    p.enregistrerQuiz('q9', 4, 4);
    expect(obtenus(p.calculerBadges(p.lireEtat(), catalogue))).toContain('perfectionniste');
  });

  it('formation complète : impossible tant qu’un module n’a pas d’examen publié', async () => {
    const p = await charger();
    catalogue.modules.forEach((m) => m.lecons.forEach((l) => p.marquerLecon(l.id, true)));
    catalogue.modules.forEach((m) => p.enregistrerExamen(m.numero, 1, 1, 70));
    expect(obtenus(p.calculerBadges(p.lireEtat(), catalogue))).not.toContain('formation-complete');
    const complet: CatalogueClient = { modules: catalogue.modules.map((m) => ({ ...m, aExamen: true })) };
    expect(obtenus(p.calculerBadges(p.lireEtat(), complet))).toContain('formation-complete');
  });
});

describe('catalogue injecté dans la page', () => {
  it('lit le JSON du script #catalogue-formation, et tolère son absence ou une erreur', async () => {
    const p = await charger();
    const doc = (texte: string | null) => ({ getElementById: () => (texte === null ? null : { textContent: texte }) });
    vi.stubGlobal('document', doc(JSON.stringify(catalogue)));
    expect(p.lireCatalogue().modules).toHaveLength(3);
    vi.stubGlobal('document', doc(null));
    expect(p.lireCatalogue()).toEqual({ modules: [] });
    vi.stubGlobal('document', doc('{oups'));
    expect(p.lireCatalogue()).toEqual({ modules: [] });
  });
});
