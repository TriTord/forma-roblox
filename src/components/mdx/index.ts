/**
 * Composants disponibles SANS import dans toutes les leçons MDX
 * (passés à <Content components={composantsMdx} /> dans la page de leçon).
 */
import Astuce from './Astuce.astro';
import Attention from './Attention.astro';
import AvecClaudeCode from './AvecClaudeCode.astro';
import Defi from './Defi.astro';
import Erreur from './Erreur.astro';
import Info from './Info.astro';
import Prompt from './Prompt.astro';
import Resume from './Resume.astro';
import Sources from './Sources.astro';

export const composantsMdx = { Astuce, Attention, AvecClaudeCode, Defi, Erreur, Info, Prompt, Resume, Sources };
