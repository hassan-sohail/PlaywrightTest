import {test, expect} from '@playwright/test';
import path from 'path';
import {LoginPage} from '../../pages/LoginPage';
import {CampaignPage} from '../../pages/CampaignPage';
import {ContactsPage} from '../../pages/ContactsPage';
import {unifiedAdmin, adminInfo} from '../../test_data/admin_data'; 


test('Edit and upload new CSV in campaign', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const campaignPage = new CampaignPage(page);
  const contactsPage = new ContactsPage(page);

  await page.goto(unifiedAdmin);
  await loginPage.login(adminInfo.username, adminInfo.password);

  await campaignPage.navigateToCampaigns();
//  await campaignPage.createCampaign();
  
  //await campaignPage.verifyCampaignCreated();

  const rows = await campaignPage.getCampaignRowCount();
  const paginationExists = await campaignPage.checkPaginationExists();
  console.log(`Number of rows: ${rows}, Pagination: ${paginationExists}`);

  if (rows === 10 && paginationExists) {
    await campaignPage.selectPaginationOption('100');
    console.log('Selected 100 records per page.');
  }

  await campaignPage.searchCampaign();
  await campaignPage.openCampaignDetailsFromRow();

  // Upload new CSV file
  await contactsPage.uploadContacts('test_data/CSV/EditCase.csv');

  // Verify the upload and any changes in the campaign
  await campaignPage.searchCampaign();
    await campaignPage.hoverAndClickPublished();
    await campaignPage.publishCampaign();
});