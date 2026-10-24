import { defineConfig, devices } from '@playwright/test';

/**
 * Tests de bout en bout sur le site DÉJÀ construit (dist/).
 * Lancer `npm run build` (ou `bash scripts/build-verrou.sh`) avant `npm run test:e2e`.
 */
const PORT = 4322;
const URL_BASE = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 60_000,
  expect: { timeout: 7_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: URL_BASE,
    locale: 'fr-FR',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `npx astro preview --port ${PORT} --host 127.0.0.1 --ignore-lock`,
    url: URL_BASE,
    reuseExistingServer: false,
    // Le démarrage d'astro preview peut dépasser une minute sur une machine chargée (import d'Astro lent).
    timeout: 180_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
