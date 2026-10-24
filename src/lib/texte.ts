/**
 * Mise en forme minimale pour les textes des quiz (frontmatter / YAML) :
 * échappe le HTML puis gère `code` et **gras**. Rien d'autre (volontairement).
 */
const ECHAPPEMENTS: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function echapperHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ECHAPPEMENTS[c]);
}

export function texteEnLigne(s: string): string {
  return echapperHtml(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}
