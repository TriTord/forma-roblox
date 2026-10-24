import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

/** Tests unitaires de la logique pure (sans navigateur). */
export default defineConfig({
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
      // Module virtuel d'Astro remplacé par un bouchon pilotable depuis les tests.
      'astro:content': fileURLToPath(new URL('./tests/unit/bouchons/astro-content.ts', import.meta.url)),
    },
  },
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
  },
});
