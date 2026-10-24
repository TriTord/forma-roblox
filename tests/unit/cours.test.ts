/**
 * Tri, URL, navigation et catalogue (src/lib/cours.ts), avec un faux `astro:content`.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { collectionsFactices } from './bouchons/astro-content';

type Cours = typeof import('~/lib/cours');

const donneesLecon = (titre: string, extra: Record<string, unknown> = {}) => ({
  titre,
  description: 'x'.repeat(40),
  duree: 10,
  objectifs: ['A', 'B'],
  quiz: [],
  brouillon: false,
  ...extra,
});

/** Recharge le module : ses résultats sont mis en cache au niveau module. */
async function charger(lecons: { id: string; data?: Record<string, unknown> }[], examens: string[] = []): Promise<Cours> {
  collectionsFactices().lecons = lecons.map((l) => ({ id: l.id, data: l.data ?? donneesLecon(l.id) }));
  collectionsFactices().examens = examens.map((m) => ({ id: `module-${m}`, data: { module: m, seuil: 70, questions: [] } }));
  vi.resetModules();
  return import('~/lib/cours');
}

beforeEach(() => {
  collectionsFactices().lecons = [];
  collectionsFactices().examens = [];
});

describe('getLecons', () => {
  it('trie par module puis par numéro et construit les URL', async () => {
    const c = await charger([
      { id: 'module-01/01-studio' },
      { id: 'module-00/10-dixieme' },
      { id: 'module-00/02-deuxieme' },
    ]);
    const lecons = await c.getLecons();
    expect(lecons.map((l) => l.id)).toEqual(['module-00/02-deuxieme', 'module-00/10-dixieme', 'module-01/01-studio']);
    expect(lecons[0]).toMatchObject({ module: '00', ordre: 2, slug: 'deuxieme', url: '/modules/00/deuxieme/' });
  });

  it('refuse un nom de fichier invalide, un module inconnu, le slug réservé « examen »', async () => {
    await expect((await charger([{ id: 'module-00/1-court' }])).getLecons()).rejects.toThrow(/Nom de fichier invalide/);
    await expect((await charger([{ id: 'module-00/01-Majuscule' }])).getLecons()).rejects.toThrow(/Nom de fichier invalide/);
    await expect((await charger([{ id: 'module-42/01-x' }])).getLecons()).rejects.toThrow(/n'existe pas/);
    await expect((await charger([{ id: 'module-00/01-examen' }])).getLecons()).rejects.toThrow(/réservé/);
  });

  it('détecte deux leçons au même numéro ou au même slug dans un module', async () => {
    await expect((await charger([{ id: 'module-00/01-a' }, { id: 'module-00/01-b' }])).getLecons()).rejects.toThrow(/Conflit/);
    await expect((await charger([{ id: 'module-00/01-a' }, { id: 'module-00/02-a' }])).getLecons()).rejects.toThrow(/Conflit/);
  });
});

describe('getModules / getVoisins / catalogue', () => {
  it('rattache leçons et examens aux 11 modules', async () => {
    const c = await charger([{ id: 'module-00/01-a' }, { id: 'module-02/01-b' }], ['00']);
    const modules = await c.getModules();
    expect(modules).toHaveLength(11);
    expect(modules.map((m) => m.numero)).toEqual(['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10']);
    expect(modules[0]).toMatchObject({ url: '/modules/00/', urlExamen: '/modules/00/examen/', duree: 10 });
    expect(modules[0].examen).toBeDefined();
    expect(modules[1].lecons).toHaveLength(0);
  });

  it('refuse un examen dont le champ module ne correspond pas au fichier', async () => {
    collectionsFactices().lecons = [];
    collectionsFactices().examens = [{ id: 'module-01', data: { module: '02', seuil: 70, questions: [] } }];
    vi.resetModules();
    const c: Cours = await import('~/lib/cours');
    await expect(c.getModules()).rejects.toThrow(/doivent correspondre/);
  });

  it('enchaîne précédente/suivante en traversant les modules (même s’il y a un module vide)', async () => {
    const c = await charger([{ id: 'module-00/01-a' }, { id: 'module-00/02-b' }, { id: 'module-02/01-c' }]);
    const v = await c.getVoisins('module-00/02-b');
    expect(v.precedente?.id).toBe('module-00/01-a');
    expect(v.suivante?.id).toBe('module-02/01-c');
    expect((await c.getVoisins('module-00/01-a')).precedente).toBeUndefined();
    expect((await c.getVoisins('module-02/01-c')).suivante).toBeUndefined();
    expect(await c.getVoisins('inconnue')).toEqual({ precedente: undefined, suivante: undefined });
  });

  it('produit un catalogue client minimal', async () => {
    const c = await charger([{ id: 'module-00/01-a' }], ['00']);
    const cat = await c.getCatalogueClient();
    expect(cat.modules[0]).toMatchObject({ numero: '00', aExamen: true, lecons: [{ id: 'module-00/01-a', url: '/modules/00/a/' }] });
    expect(cat.modules[1]).toMatchObject({ aExamen: false, lecons: [] });
  });
});

describe('formaterDuree', () => {
  it('formate minutes et heures', async () => {
    const c = await charger([]);
    expect(c.formaterDuree(45)).toBe('45 min');
    expect(c.formaterDuree(60)).toBe('1 h');
    expect(c.formaterDuree(75)).toBe('1 h 15');
    expect(c.formaterDuree(125)).toBe('2 h 05');
  });
});
