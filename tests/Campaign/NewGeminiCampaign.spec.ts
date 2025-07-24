
import { test, expect } from '@playwright/test';
import { NewLoginPage } from '../../pages/NewLoginPage';
import { NewCampaignPage } from '../../pages/NewCampaignPage';

test('Create and Publish Campaign with POM', async ({ page }) => {
  const loginPage = new NewLoginPage(page);
  const campaignPage = new NewCampaignPage(page);

  await loginPage.navigateTo();
  await loginPage.login('admin', 'admin');

  await campaignPage.navigateToCampaigns();
  await campaignPage.createCampaign('GeminiCampaign');
  await campaignPage.publishCampaign('GeminiCampaign');

  await expect(campaignPage.successMessage).toBeVisible();
});
