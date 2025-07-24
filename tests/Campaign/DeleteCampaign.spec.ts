import { CampaignPage } from '../../pages/CampaignPage';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { adminInfo , unifiedAdmin } from '../../test_data/admin_data'; 



  test('should delete a campaign successfully', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const campaignPage = new CampaignPage(page);

    await page.goto(unifiedAdmin);
    await loginPage.login(adminInfo.username, adminInfo.password);
    await campaignPage.navigateToCampaigns();
    await campaignPage.searchCampaign();
    await campaignPage.deleteCampaign();

  });
