/**
 * Composants disponibles SANS import dans toutes les leçons MDX
 * (passés à <Content components={composantsMdx} /> dans la page de leçon).
 */
import Astuce from './Astuce.astro';
import Attention from './Attention.astro';
import Defi from './Defi.astro';
import Erreur from './Erreur.astro';
import Info from './Info.astro';
import Resume from './Resume.astro';
import Sources from './Sources.astro';

export const composantsMdx = { Astuce, Attention, Defi, Erreur, Info, Resume, Sources };
