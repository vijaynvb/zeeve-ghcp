import { defineConfig } from '@playwright/test';

/**
 * Playwright configuration scoped to UI smoke tests in the UITest directory.
 */
export default defineConfig({
  testDir: './UITest',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry'
  },
  expect: {
    timeout: 5000
  }
});
