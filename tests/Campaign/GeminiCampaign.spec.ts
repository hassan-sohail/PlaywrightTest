
import { test, expect } from '@playwright/test';

test('Create and Publish Campaign', async ({ page }) => {
  await page.goto('https://chatsolution.expertflow.com/unified-admin/#/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'campaigns Campaigns' }).click();
  await page.getByRole('link', { name: 'Add new campaign' }).click();
  await page.getByRole('textbox', { name: 'Campaign Title' }).fill('GeminiCampaign');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('cell', { name: 'GeminiCampaign' }).hover();
  await page.getByRole('switch', { name: 'unpublished' }).click();
  await page.getByRole('button', { name: 'Publish' }).click();
  await expect(page.getByText('Campaign has been published successfully')).toBeVisible();
});
