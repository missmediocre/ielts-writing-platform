import { test, expect } from '@playwright/test';

test.describe('IELTS Writing Platform - Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check if main elements are visible
    await expect(page.getByRole('heading', { name: /ielts writing/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /start writing/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /login/i })).toBeVisible();
  });

  test('should navigate to writing assessment', async ({ page }) => {
    await page.goto('/');
    
    await page.getByRole('button', { name: /start writing/i }).click();
    
    // Should redirect to writing page
    await expect(page).toHaveURL(/.*\/writing/);
    await expect(page.getByRole('heading', { name: /writing task 2/i })).toBeVisible();
  });

  test('should display responsive design on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check mobile-specific elements
    await expect(page.getByRole('button', { name: /menu/i })).toBeVisible();
    await expect(page.locator('.mobile-menu')).toBeVisible();
  });
});