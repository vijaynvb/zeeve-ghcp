import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('logs in and renders dashboard artifacts', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    await page.locator('input[name="email"]').fill('v@g.com');
    await page.locator('input[name="password"]').fill('P@ssw0rd123');
    await page.getByRole('button', { name: 'Log in' }).click();

    await page.waitForURL('http://localhost:5173/dashboard');
    await expect(page.getByRole('heading', { name: 'Add a new TODO' })).toBeVisible();
  });
});
