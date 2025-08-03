import { test, expect } from '@playwright/test';

test.describe('Writing Assessment Flow', () => {
  test('should submit essay and receive AI feedback', async ({ page }) => {
    await page.goto('/writing');
    
    const essayText = `In today's rapidly evolving world, education plays a crucial role in shaping individuals and societies. While some argue that formal education is the most important factor for success, others believe that practical experience is equally valuable. This essay will examine both perspectives and present my viewpoint.`;

    await page.getByRole('textbox', { name: /essay/i }).fill(essayText);
    await page.getByRole('combobox', { name: /question type/i }).selectOption('agree-disagree');
    await page.getByRole('button', { name: /submit essay/i }).click();
    
    await expect(page.getByText(/score:/i)).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('heading', { name: /overall score/i })).toBeVisible();
  });

  test('should validate essay length requirements', async ({ page }) => {
    await page.goto('/writing');
    
    await page.getByRole('textbox', { name: /essay/i }).fill('This is too short.');
    await page.getByRole('button', { name: /submit essay/i }).click();
    
    await expect(page.getByText(/minimum word count/i)).toBeVisible();
  });
});