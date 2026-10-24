/**
 * Bouchon du module virtuel `astro:content` pour Vitest (voir vitest.config.ts).
 * Les données sont lues sur globalThis pour survivre à `vi.resetModules()` :
 * les tests remplissent `collectionsFactices()` avant d'importer `~/lib/cours`.
 */
export interface EntreeFactice {
  id: string;
  data: Record<string, unknown>;
}

type Collections = Record<string, EntreeFactice[]>;
const CLE = '__collectionsFactices__';

export function collectionsFactices(): Collections {
  const g = globalThis as unknown as Record<string, Collections | undefined>;
  return (g[CLE] ??= { lecons: [], examens: [] });
}

export async function getCollection(
  nom: string,
  filtre?: (entree: EntreeFactice) => unknown,
): Promise<EntreeFactice[]> {
  const entrees = collectionsFactices()[nom] ?? [];
  return filtre ? entrees.filter((e) => filtre(e)) : [...entrees];
}

export type CollectionEntry<_T extends string> = EntreeFactice;
