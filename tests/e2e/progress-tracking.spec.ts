import { test, expect } from '@playwright/test';

test.describe('Progress Tracking', () => {
  test('should display user progress dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    
    await expect(page.getByRole('heading', { name: /progress/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /writing scores/i })).toBeVisible();
    
    // Check progress chart
    await expect(page.locator('[data-testid="progress-chart"]')).toBeVisible();
    
    // Check recent assessments
    await expect(page.getByRole('heading', { name: /recent assessments/i })).toBeVisible();
  });

  test('should filter progress by date range', async ({ page }) => {
    await page.goto('/dashboard');
    
    await page.getByRole('button', { name: /last 7 days/i }).click();
    await page.getByRole('option', { name: /last 30 days/i }).click();
    
    await expect(page.locator('[data-testid="progress-chart"]')).toBeVisible();
  });

  test('should show improvement suggestions', async ({ page }) => {
    await page.goto('/dashboard');
    
    await expect(page.getByRole('heading', { name: /improvement areas/i })).toBeVisible();
    await expect(page.getByText(/focus on/i)).toBeVisible();
  });
});