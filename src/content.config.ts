import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { examenSchema, leconSchema } from './lib/schemas';

/** Leçons : src/content/lecons/module-XX/NN-slug.mdx → id « module-XX/NN-slug ». */
const lecons = defineCollection({
  loader: glob({ pattern: 'module-[0-9][0-9]/[0-9][0-9]-*.mdx', base: './src/content/lecons' }),
  schema: leconSchema,
});

/** Examens de fin de module : src/content/examens/module-XX.yaml → id « module-XX ». */
const examens = defineCollection({
  loader: glob({ pattern: 'module-[0-9][0-9].{yaml,yml,json}', base: './src/content/examens' }),
  schema: examenSchema,
});

export const collections = { lecons, examens };
