// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { THEMES_CODE } from './src/data/site.ts';

export default defineConfig({
  // Renseigner l'URL publique au déploiement (balises canoniques / Open Graph).
  // site: 'https://exemple.fr',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [mdx()],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      // Thèmes partagés avec le composant <Code> des quiz « trouve-le-bug ».
      themes: THEMES_CODE,
      defaultColor: 'light',
      wrap: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
