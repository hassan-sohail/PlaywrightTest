import { test, expect } from '@playwright/test'; 
import path from 'path';
import { LoginPage } from '../../pages/LoginPage';
import { CampaignPage } from '../../pages/CampaignPage';
import { ContactsPage } from '../../pages/ContactsPage';
import { unifiedAdmin, adminInfo } from '../../test_data/admin_data';

test('Create and publish campaign', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const campaignPage = new CampaignPage(page);
  const contactsPage = new ContactsPage(page);

  await page.goto(unifiedAdmin);
  await loginPage.login(adminInfo.username, adminInfo.password);

  await campaignPage.navigateToCampaigns();
  await campaignPage.createCampaign();
  await campaignPage.verifyCampaignCreated();

  const rows = await campaignPage.getCampaignRowCount();
  const paginationExists = await campaignPage.checkPaginationExists();
  console.log(`Number of rows: ${rows}, Pagination: ${paginationExists}`);

  if (rows === 10 && paginationExists) {
    await campaignPage.selectPaginationOption('100');
    console.log('Selected 100 records per page.');
  }

  await campaignPage.searchCampaign();
  await campaignPage.openCampaignDetailsFromRow();
  await contactsPage.uploadContacts('test_data/CSV/Contacts.csv');

  await campaignPage.searchCampaign();
  await campaignPage.hoverAndClickPublished();
  await campaignPage.publishCampaign();

  // Retrieve and log the session storage token after publishing
  const token = await page.evaluate(() => sessionStorage.getItem('token'));
  console.log('Token:', token);
});

test('Unpublished the Created Campaign', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const campaignPage = new CampaignPage(page);

  await page.goto(unifiedAdmin);
  await loginPage.login(adminInfo.username, adminInfo.password);

  await campaignPage.navigateToCampaigns();
  await campaignPage.searchCampaign();

  await campaignPage.hoverAndClickUnpublished();
  await campaignPage.unpublishCampaign();
});
