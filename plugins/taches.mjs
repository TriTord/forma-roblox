/**
 * Plugin HAST (processeur Markdown Sätteri d'Astro) : listes de tâches Markdown (`- [ ] …`) interactives et accessibles.
 *
 * GFM produit `<li class="task-list-item"><input type="checkbox" disabled> texte</li>` : une case
 * désactivée et sans nom accessible (axe « label », critique). Ce plugin :
 *  - retire `disabled`, donne un id unique (`tache-N`) et un index `data-tache` (mémorisation par page) ;
 *  - enveloppe le texte qui suit la case (jusqu'au premier bloc : sous-liste, paragraphe…) dans
 *    `<label for="tache-N">` : cliquer sur le texte coche la case et le lecteur d'écran l'annonce.
 * L'état coché est restauré / enregistré côté client par `src/scripts/taches.ts`.
 */

const BLOCS = new Set([
  'ul', 'ol', 'p', 'div', 'pre', 'blockquote', 'table', 'figure', 'details', 'section', 'aside', 'hr',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
]);

const estElement = (n, tag) => n?.type === 'element' && (!tag || n.tagName === tag);
const estCase = (n) => estElement(n, 'input') && n.properties?.type === 'checkbox';
const estBloc = (n) => n?.type === 'element' && BLOCS.has(n.tagName);

/** Copie profonde « simple » d'un nœud HAST (les nœuds fournis par Sätteri ne sont pas clonables). */
function copier(n) {
  const c = { type: n.type };
  for (const cle of ['tagName', 'value', 'name', 'attributes', 'data']) if (n[cle] !== undefined) c[cle] = n[cle];
  if (n.properties) c.properties = { ...n.properties };
  if (n.children) c.children = n.children.map(copier);
  return c;
}

/** Case d'un item : enfant direct, ou dans le 1er paragraphe (liste « lâche »). */
function trouverCase(li) {
  const i = li.children.findIndex(estCase);
  if (i !== -1) return { parent: li, i };
  const p = li.children.find((c) => estElement(c, 'p'));
  const j = p ? p.children.findIndex(estCase) : -1;
  return j !== -1 ? { parent: p, i: j } : undefined;
}

/** @type {import('satteri').HastPluginDefinition} */
export const tachesInteractives = {
  name: 'forma-taches-interactives',
  before(_racine, ctx) {
    ctx.data.formaTaches = 0;
  },
  element: {
    filter: ['li'],
    visit(li, ctx) {
      const classes = li.properties?.className;
      if (!(Array.isArray(classes) ? classes : String(classes ?? '').split(/\s+/)).includes('task-list-item')) return;
      const trouve = trouverCase(li);
      if (!trouve) return;
      const { parent, i } = trouve;
      const index = Number(ctx.data.formaTaches ?? 0);
      ctx.data.formaTaches = index + 1;
      const id = `tache-${index + 1}`;
      const caseOrigine = parent.children[i];
      const { disabled: _retire, ...props } = caseOrigine.properties ?? {};
      let fin = i + 1;
      while (fin < parent.children.length && !estBloc(parent.children[fin])) fin++;
      const contenu = parent.children.slice(i + 1, fin);
      for (const n of contenu) ctx.removeNode(n);
      ctx.replaceNode(caseOrigine, [
        { type: 'element', tagName: 'input', properties: { ...props, id, className: ['tache-case'], dataTache: String(index) }, children: [] },
        { type: 'element', tagName: 'label', properties: { htmlFor: id, className: ['tache-texte'] }, children: contenu.map(copier) },
      ]);
    },
  },
};
