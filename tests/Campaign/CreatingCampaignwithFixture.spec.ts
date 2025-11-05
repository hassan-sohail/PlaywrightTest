import {test, expect} from '../../Fixtures/fixtures';
import { CampaignPage } from '../../pages/CampaignPage';
test('Create and publish campaign', async ({setup, page}) => {
  const Loginfixtures = setup;
  const campaignPage = new CampaignPage(page);
  await campaignPage.createCampaign();
  
  await campaignPage.verifyCampaignCreated();

});

