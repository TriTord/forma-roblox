/**
 * Accès aux contenus de la formation (côté build uniquement).
 * Centralise le tri, les URL et la navigation entre leçons.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { MODULES, type ModuleInfo } from '~/data/modules';
import { lien } from '~/data/site';

export type LeconEntry = CollectionEntry<'lecons'>;
export type ExamenEntry = CollectionEntry<'examens'>;

export interface Lecon {
  /** Identifiant stable, ex. « module-00/01-bienvenue ». Sert de clé de progression. */
  id: string;
  /** Numéro de module sur 2 chiffres, ex. « 00 ». */
  module: string;
  /** Position dans le module (1, 2, 3…). */
  ordre: number;
  /** Slug d'URL, ex. « bienvenue ». */
  slug: string;
  url: string;
  entry: LeconEntry;
}

export interface ModuleAvecLecons extends ModuleInfo {
  url: string;
  urlExamen: string;
  lecons: Lecon[];
  examen?: ExamenEntry;
  /** Durée totale estimée (minutes). */
  duree: number;
}

const ID_LECON = /^module-(\d{2})\/(\d{2})-([a-z0-9]+(?:-[a-z0-9]+)*)$/;
const SLUGS_RESERVES = new Set(['examen']);

function versLecon(entry: LeconEntry): Lecon {
  const m = ID_LECON.exec(entry.id);
  if (!m) {
    throw new Error(
      `[lecons] Nom de fichier invalide : « ${entry.id} ». Format attendu : module-XX/NN-slug-en-minuscules.mdx`,
    );
  }
  const [, module, ordre, slug] = m;
  if (!MODULES.some((mod) => mod.numero === module)) {
    throw new Error(`[lecons] « ${entry.id} » : le module ${module} n'existe pas dans src/data/modules.ts.`);
  }
  if (SLUGS_RESERVES.has(slug)) {
    throw new Error(`[lecons] « ${entry.id} » : le slug « ${slug} » est réservé.`);
  }
  return { id: entry.id, module, ordre: Number(ordre), slug, url: lien(`/modules/${module}/${slug}/`), entry };
}

let cacheLecons: Promise<Lecon[]> | undefined;

/** Toutes les leçons publiées (les brouillons sont visibles uniquement en dev), triées. */
export function getLecons(): Promise<Lecon[]> {
  cacheLecons ??= getCollection('lecons', ({ data }) => import.meta.env.DEV || !data.brouillon).then((entries) => {
    const lecons = entries.map(versLecon).sort((a, b) => a.module.localeCompare(b.module) || a.ordre - b.ordre);
    // Détecte les doublons d'URL (même slug dans un module) ou de numéro d'ordre.
    const vus = new Map<string, string>();
    for (const l of lecons) {
      for (const cle of [`${l.module}/${l.slug}`, `${l.module}#${l.ordre}`]) {
        const autre = vus.get(cle);
        if (autre) throw new Error(`[lecons] Conflit entre « ${autre} » et « ${l.id} » (slug ou numéro identique).`);
        vus.set(cle, l.id);
      }
    }
    return lecons;
  });
  return cacheLecons;
}

let cacheModules: Promise<ModuleAvecLecons[]> | undefined;

/** Les 12 modules avec leurs leçons et leur examen (s'il existe). */
export function getModules(): Promise<ModuleAvecLecons[]> {
  cacheModules ??= Promise.all([getLecons(), getCollection('examens')]).then(([lecons, examens]) => {
    for (const ex of examens) {
      if (ex.id !== `module-${ex.data.module}`) {
        throw new Error(`[examens] Le fichier « ${ex.id} » déclare module: "${ex.data.module}". Ils doivent correspondre.`);
      }
    }
    return MODULES.map((mod) => {
      const leconsDuModule = lecons.filter((l) => l.module === mod.numero);
      return {
        ...mod,
        url: lien(`/modules/${mod.numero}/`),
        urlExamen: lien(`/modules/${mod.numero}/examen/`),
        lecons: leconsDuModule,
        examen: examens.find((e) => e.id === `module-${mod.numero}`),
        duree: leconsDuModule.reduce((total, l) => total + l.entry.data.duree, 0),
      };
    });
  });
  return cacheModules;
}

/** Leçons précédente et suivante (en traversant les modules). */
export async function getVoisins(id: string): Promise<{ precedente?: Lecon; suivante?: Lecon }> {
  const lecons = await getLecons();
  const i = lecons.findIndex((l) => l.id === id);
  return { precedente: lecons[i - 1], suivante: i >= 0 ? lecons[i + 1] : undefined };
}

/** Données minimales envoyées au navigateur pour calculer progression et badges. */
export interface CatalogueClient {
  modules: { numero: string; titre: string; emoji: string; badge: { nom: string; emoji: string }; aExamen: boolean; lecons: { id: string; titre: string; url: string }[] }[];
}

export async function getCatalogueClient(): Promise<CatalogueClient> {
  const modules = await getModules();
  return {
    modules: modules.map((m) => ({
      numero: m.numero,
      titre: m.titreCourt,
      emoji: m.emoji,
      badge: m.badge,
      aExamen: Boolean(m.examen),
      lecons: m.lecons.map((l) => ({ id: l.id, titre: l.entry.data.titre, url: l.url })),
    })),
  };
}

/** « 75 min » → « 1 h 15 ». */
export function formaterDuree(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const r = minutes % 60;
  return r ? `${h} h ${String(r).padStart(2, '0')}` : `${h} h`;
}
