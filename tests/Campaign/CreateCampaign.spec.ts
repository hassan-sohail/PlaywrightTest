import { test, expect } from '@playwright/test';
import path from 'path';

test('Create Campaign',async ({ page }) => 
    {
const campaignName = `AutomatedCampaign_${Date.now()}`;
//await page.goto('https://chatsolution.expertflow.com/unified-admin/#/login');
await page.goto('https://deb-frontend.expertflow.com//unified-admin/#/login');
await page.locator('#mat-input-0').fill('admin');
await page.locator('#mat-input-1').fill('admin');
await page.getByRole('button', { name: 'Login' }).click();
await page.waitForTimeout(3000);
await page.getByRole('link', { name: 'campaigns Campaigns' }).click();
await page.getByRole('link', { name: 'Add new campaign' }).click();
await page.getByRole('textbox', { name: 'Campaign Title' }).click();
await page.getByRole('textbox', { name: 'Campaign Title' }).fill(campaignName);
await page.getByRole('button', { name: 'Create' }).click();

const createCampaignToast = page.getByText('Campaign has been created successfully', { exact: true });
await expect(createCampaignToast).toBeVisible();


// Count rows after creating the campaign
const rows = await page.locator('table tbody tr').count(); // Adjust the selector to match your table structure
console.log(`Number of rows in the campaign table: ${rows}`);

// check for pagination
const paginationExists = await page.getByText('Show', {exact:true}).isVisible();
console.log(`Pagination exists: ${paginationExists}`);

if (paginationExists) {
    console.log('Pagination exists on the campaign page.');
  } else {
    console.log('Pagination does not exist on the campaign page.');
  };
  
if (rows == 10 && paginationExists) {
    await page.getByRole('combobox').selectOption('100');
    console.log('Selecting 100 records per page.');
}



await page.getByRole('textbox', { name: 'Search Campaign' }).click();
await page.getByRole('textbox', { name: 'Search Campaign' }).fill(campaignName);


await page.getByText(campaignName).click();
await page.getByRole('row', { name: campaignName }).getByRole('link').nth(3).click();

await page.getByRole('button', { name: 'Manage Contacts' }).click();
//await page.getByText('Browse CSV').click();

const filePath = path.resolve(__dirname, '../../test_data/CSV/Contacts.csv');
await page.getByLabel('Browse CSV').setInputFiles(filePath);

const contactUploadToast=  page.getByText('File has been uploaded successfully', { exact: true })
await expect(contactUploadToast).toBeVisible();

await page.getByRole('button').filter({ hasText: 'refresh' }).click();
await page.getByRole('button', { name: 'Save' }).click();
await page.getByRole('textbox', { name: 'Search Campaign' }).click();
await page.getByRole('textbox', { name: 'Search Campaign' }).fill(campaignName);
await page.locator('td.final-column').hover();
await expect(page.getByText('unpublished', { exact: true })).toBeVisible();
 await page.getByText('unpublished', { exact: true }).click();


await page.getByRole('button', { name: 'Publish' }).click();
const publishedCampaignToast=  page.getByText('Campaign has been published successfully', { exact: true })
await expect(publishedCampaignToast).toBeVisible();
});
