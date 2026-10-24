import { describe, expect, it } from 'vitest';
import { echapperHtml, texteEnLigne } from '~/lib/texte';

describe('texteEnLigne (textes des quiz)', () => {
  it('échappe tout le HTML (pas d’injection possible depuis le YAML)', () => {
    expect(echapperHtml(`<script>alert("x")</script> & 'a'`)).toBe(
      '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#39;a&#39;',
    );
    expect(texteEnLigne('<img src=x onerror=alert(1)>')).not.toContain('<img');
  });

  it('met en forme `code` et **gras**', () => {
    expect(texteEnLigne('Utilise `task.wait()` et **pas** `wait()`')).toBe(
      'Utilise <code>task.wait()</code> et <strong>pas</strong> <code>wait()</code>',
    );
  });

  it('échappe le HTML à l’intérieur du code', () => {
    expect(texteEnLigne('`a < b`')).toBe('<code>a &lt; b</code>');
  });

  it('laisse intact un texte sans balisage', () => {
    expect(texteEnLigne('Vrai')).toBe('Vrai');
  });
});
