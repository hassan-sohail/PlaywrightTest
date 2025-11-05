import { test as base } from '@playwright/test';
import { unifiedAdmin, adminInfo } from '../test_data/admin_data';
import { LoginPage } from '../pages/LoginPage';
import { CampaignPage } from '../pages/CampaignPage';
type Loginfixtures = {
    setup: void;
};
 const test = base.extend<Loginfixtures>({

    setup: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        const campaignPage = new CampaignPage(page);    
    
    await page.goto(unifiedAdmin);
    await loginPage.login(adminInfo.username, adminInfo.password);
    await campaignPage.navigateToCampaigns();
    await use();
    },
    
});
export { test };
export{expect} from '@playwright/test';