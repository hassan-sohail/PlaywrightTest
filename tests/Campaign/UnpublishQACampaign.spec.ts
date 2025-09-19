import { test, expect } from '@playwright/test';

// This test logs in, navigates to Campaigns, searches for "QA",
// unpublishes it, saves, and verifies the status is Unpublished in the list.

test.describe('Campaigns - Unpublish QA campaign', () => {
	// Increase timeout a bit to account for network slowness seen on the app
	test.setTimeout(180_000);

	test('Unpublish "QA" campaign', async ({ page }) => {
		// 1) Login
		await page.goto('https://chatsolution.expertflow.com/unified-admin/#/login');
		await page.getByLabel('Username').fill('admin');
		await page.getByLabel('Password').fill('admin');
		await page.getByRole('button', { name: 'Login' }).click();

		// Wait for the shell to load by checking the left navigation exists
		await expect(page.getByRole('link', { name: /Forms$/ })).toBeVisible();

		// 2) Navigate to Campaigns
		await page.getByRole('link', { name: /Campaigns$/ }).click();
		await expect(page.getByRole('heading', { name: /Campaigns/i })).toBeVisible({ timeout: 10000 }).catch(() => {});

		// 3) Search for QA
		await page.getByRole('textbox', { name: 'Search Campaign' }).fill('QA');
		await expect(page.getByRole('cell', { name: 'QA' })).toBeVisible({ timeout: 15000 });

		// 4) Open the QA row to edit
		await page.getByRole('row', { name: /\bQA\b/ }).click();

		// 5) Unpublish: toggle off Published and confirm in dialog
		// Some Material toggles require clicking the visible label rather than the hidden input
		await page.getByText('Published', { exact: true }).click();
		await page.getByRole('button', { name: 'Unpublish' }).click();

		// Optional: assert toast appears
		await expect(page.getByText('Campaign has been unpublished successfully')).toBeVisible({ timeout: 10000 }).catch(() => {});

		// 6) Save the campaign
		await page.getByRole('button', { name: 'Save' }).click();
		await expect(page.getByText('Campaign has been updated successfully')).toBeVisible({ timeout: 10000 }).catch(() => {});

		// 7) Go back to list (click Campaigns in left nav)
		await page.getByRole('link', { name: /Campaigns$/ }).click();

		// 8) Verify Unpublished in list
		await page.getByRole('textbox', { name: 'Search Campaign' }).fill('QA');
		await expect(page.getByRole('row', { name: /\bQA\b/ })).toBeVisible({ timeout: 15000 });
		await expect(page.getByRole('row', { name: /\bQA\b/ })).toContainText('Unpublished');
	});
}); 