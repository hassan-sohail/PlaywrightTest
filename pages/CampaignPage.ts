import { expect } from '@playwright/test';
import { generateCampaignName, getSavedCampaignName } from '../test_data/helpers/campaignHelper';



export class CampaignPage {
  readonly page;
    readonly campaignsLink; 
    readonly addCampaignLink;
    readonly campaignTitleInput;
    readonly createButton;
    readonly successToast;
    readonly searchInput;
    readonly publishButton;
    readonly unPublishButton;
    readonly publishedToast;
    readonly unpublishedToast;
    // campaignName: string;

  constructor(page) {
    this.page = page;
    this.campaignsLink = page.getByRole('link', { name: 'campaigns Campaigns' });
    this.addCampaignLink = page.getByRole('link', { name: 'Add new campaign' });
    this.campaignTitleInput = page.getByRole('textbox', { name: 'Campaign Title' });
    // this.campaignName = `AutomatedCampaign_${Date.now()}`; 
    this.createButton = page.getByRole('button', { name: 'Create' });
    this.successToast = page.getByText('Campaign has been created successfully', { exact: true });
    this.searchInput = page.getByRole('textbox', { name: 'Search Campaign' });
    this.publishButton = page.getByRole('button', { name: 'Publish' });
    this.unPublishButton = page.getByRole('button', { name: 'Unpublish' });
    this.publishedToast = page.getByText('Campaign has been published successfully', { exact: true });
    this.unpublishedToast = page.getByText('Campaign has been unpublished successfully', { exact: true });
  }

  async navigateToCampaigns() {
    await this.campaignsLink.click();
  }

  async createCampaign() {
    const campaignName = generateCampaignName(); // Generate a unique campaign name
    await this.addCampaignLink.click();
    await this.campaignTitleInput.click();
    await this.campaignTitleInput.fill(campaignName);
    await this.createButton.click();
  }

  async verifyCampaignCreated() {
    await expect(this.successToast).toBeVisible();
  }

  async getCampaignRowCount(): Promise<number> {
    return await this.page.locator('table tbody tr').count();
  }

  async checkPaginationExists(): Promise<boolean> {
    return await this.page.getByText('Show', { exact: true }).isVisible();
  }

  async selectPaginationOption(value: string) {
    await this.page.getByRole('combobox').selectOption(value);
  }

  async searchCampaign() {
    const campaignName = getSavedCampaignName(); // Get the saved campaign name
    await this.searchInput.click();
    await this.searchInput.fill(campaignName);
    await this.page.getByText(campaignName).click();
  }

  async openCampaignDetailsFromRow() {
    const campaignName = getSavedCampaignName(); // Get the saved campaign name
    await this.page.getByRole('row', { name: campaignName }).getByRole('link').nth(3).click();
  }

  async hoverAndClickPublished() { //This method is used to published the campaign
    await this.page.locator('td.final-column').hover();
    await expect(this.page.getByText('unpublished', { exact: true })).toBeVisible();
    await this.page.getByText('unpublished', { exact: true }).click();

  }
  async publishCampaign() {
    await this.publishButton.click();
    await expect(this.publishedToast).toBeVisible();
  }

  
  async hoverAndClickUnpublished() { // This method is used to unpublish the campaign
    await this.page.locator('td.final-column').hover();
    await expect(this.page.getByText('published', { exact: true })).toBeVisible();
    await this.page.getByText('published', { exact: true }).click();
  }
async unpublishCampaign() {
    await this.unPublishButton.click();
    await expect(this.unpublishedToast).toBeVisible();
  }

  async deleteCampaign() {
    const campaignName = getSavedCampaignName(); // Get the saved campaign name
    await this.page.getByRole('row', { name: campaignName }).getByRole('link').nth(1).click();
    await this.page.getByRole('button', { name: 'Delete' }).click();
    await expect(this.page.getByText('Campaign has been deleted successfully', { exact: true })).toBeVisible();
  }

 
}