
import { Page, Locator } from '@playwright/test';

export class NewCampaignPage {
    readonly page: Page;
    readonly campaignsLink: Locator;
    readonly addNewCampaignLink: Locator;
    readonly campaignTitleInput: Locator;
    readonly createButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.campaignsLink = page.getByRole('link', { name: 'campaigns Campaigns' });
        this.addNewCampaignLink = page.getByRole('link', { name: 'Add new campaign' });
        this.campaignTitleInput = page.getByRole('textbox', { name: 'Campaign Title' });
        this.createButton = page.getByRole('button', { name: 'Create' });
        this.successMessage = page.getByText('Campaign has been published successfully');
    }

    async navigateToCampaigns() {
        await this.campaignsLink.click();
    }

    async createCampaign(campaignName) {
        await this.addNewCampaignLink.click();
        await this.campaignTitleInput.fill(campaignName);
        await this.createButton.click();
    }

    async publishCampaign(campaignName) {
        await this.page.getByRole('cell', { name: campaignName }).hover();
        await this.page.getByRole('switch', { name: 'unpublished' }).click();
        await this.page.getByRole('button', { name: 'Publish' }).click();
    }
}
