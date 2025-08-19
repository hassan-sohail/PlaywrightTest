import { test, expect } from '@playwright/test';

/*
 * This Playwright test automates the flow of logging into the Unified Admin
 * application and creating a new campaign. The script uses high‑level
 * selectors (labels and roles) to locate elements, making it resilient to
 * minor UI changes. If your application uses different names for buttons
 * (e.g. "Add" instead of "New Campaign"), adjust the regex in the
 * getByRole call accordingly.
 */

test('create a new campaign', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://chatsolution.expertflow.com/unified-admin/#/login');

  // Fill in credentials and submit the login form
  await page.getByLabel('Username').fill('admin');
  await page.getByLabel('Password').fill('admin');
  await page.getByRole('button', { name: /login/i }).click();

  // Wait for navigation to complete
  await page.waitForLoadState('networkidle');

  // Navigate to the Campaigns module. Adjust the selector if the module
  // appears as a menu item rather than a link.
  await page.getByRole('link', { name: /campaigns/i }).click();

  // Click the button to create a new campaign. The name may vary (e.g.
  // "New Campaign", "Create", or "Add"), so a regex is used here.
  await page.getByRole('button', { name: /new\s+campaign|create|add/i }).click();

  // Fill out the campaign creation form. Replace the field labels with
  // appropriate labels from your application if they differ.
  await page.getByLabel('Campaign Name').fill('Automation Test Campaign');
  await page.getByLabel('Description').fill('This is a test campaign created via Playwright automation.');

  // Submit the campaign. Adjust the selector if the button uses a
  // different name, such as "Save" or "Submit".
  await page.getByRole('button', { name: /save|submit|create/i }).click();

  // Optionally, verify that the campaign was created by checking for a
  // success message or the presence of the new campaign in a list.
  // For example:
  // await expect(page.getByText('Automation Test Campaign')).toBeVisible();
});
