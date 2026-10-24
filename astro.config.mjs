// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { satteri } from '@astrojs/markdown-satteri';
import { tableauxDefilants } from './plugins/tableaux.mjs';
import { tachesInteractives } from './plugins/taches.mjs';
import { THEMES_CODE } from './src/data/site.ts';

// URL publique du site (balises canoniques, Open Graph, sitemap). Surcharger au déploiement :
//   SITE_URL=https://mon-domaine.fr npm run build
const SITE_URL = process.env.SITE_URL?.trim() || 'https://forma-roblox.vercel.app';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap({ filter: (page) => !/\/404\/?$/.test(page) })],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      // Thèmes partagés avec le composant <Code> des quiz « trouve-le-bug ».
      themes: THEMES_CODE,
      defaultColor: 'light',
      wrap: false,
    },
    // Processeur par défaut d'Astro 7 (Sätteri), étendu de deux plugins HAST (appliqués aussi au MDX) :
    // listes de tâches « - [ ] » interactives (voir src/scripts/taches.ts) et tableaux dans un conteneur défilant.
    processor: satteri({ hastPlugins: [tachesInteractives, tableauxDefilants] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
