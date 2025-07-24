import { test, expect } from '@playwright/test';

test('Create GPTCampaign via UI', async ({ page }) => {
  // Step 1: Open login page
  await page.goto('https://chatsolution.expertflow.com/unified-admin/#/login');

  // Step 2: Login as admin
  await page.locator('#mat-input-0').fill('admin');
  await page.locator('#mat-input-1').fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();

  // Assert: Should land on dashboard (look for Campaigns link)
  await expect(page.getByRole('link', { name: /campaigns Campaigns/i })).toBeVisible();

  // Step 3: Go to Campaigns module
  await page.getByRole('link', { name: /campaigns Campaigns/i }).click();

  // Step 4: Click 'Add new campaign'
  await page.getByRole('link', { name: /Add new campaign/i }).click();

  // Step 5: Fill campaign name and create
  await page.getByRole('textbox', { name: 'Campaign Title' }).fill('GPTCampaign');
  await page.getByRole('button', { name: 'Create' }).click();

  // Assert: Success toast appears
  await expect(page.getByText('Campaign has been created successfully', { exact: true })).toBeVisible();

  // Step 6: Search for the campaign in the table
  await page.getByRole('textbox', { name: 'Search Campaign' }).fill('GPTCampaign');
  await expect(page.getByText('GPTCampaign')).toBeVisible();

  // Step 7: Publish the campaign
  const gptRow = page.getByRole('row', { name: /GPTCampaign/i });
  await expect(gptRow).toBeVisible();
  await gptRow.hover();
  await gptRow.getByText('unpublished', { exact: true }).click();
  await page.getByRole('button', { name: 'Publish' }).click();

  // Assert: Publish success toast
  await expect(page.getByText('Campaign has been published successfully', { exact: true })).toBeVisible();
}); 