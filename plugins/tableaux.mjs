/**
 * Plugin HAST (processeur Markdown Sätteri d'Astro) : enveloppe chaque <table> du contenu dans un
 * conteneur à défilement horizontal (`.tableau-defilement`) pour que les tableaux larges ne fassent
 * pas défiler toute la page sur mobile. Le conteneur est focusable (tabindex=0) et nommé : on peut
 * le faire défiler au clavier (axe « scrollable-region-focusable »).
 */

/** @type {import('satteri').HastPluginDefinition} */
export const tableauxDefilants = {
  name: 'forma-tableaux-defilants',
  element: {
    filter: ['table'],
    visit(table, ctx) {
      ctx.wrapNode(table, {
        type: 'element',
        tagName: 'div',
        properties: { className: ['tableau-defilement'], tabIndex: 0, role: 'region', ariaLabel: 'Tableau' },
        children: [],
      });
    },
  },
};
