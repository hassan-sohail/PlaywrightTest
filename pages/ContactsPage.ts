import path from 'path';
import { expect } from '@playwright/test';

export class ContactsPage {
  readonly page;
    readonly manageContactsButton;
    readonly browseCsvInput;
    readonly uploadSuccessToast;
    readonly refreshButton;
    readonly saveButton;

  constructor(page) {
    this.page = page;
    this.manageContactsButton = page.getByRole('button', { name: 'Manage Contacts' });
    this.browseCsvInput = page.getByLabel('Browse CSV');
    this.uploadSuccessToast = page.getByText('File has been uploaded successfully', { exact: true });
    this.refreshButton = page.getByRole('button').filter({ hasText: 'refresh' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async uploadContacts(csvRelativePath: string) {
    await this.manageContactsButton.click();
 
    const filePath = path.resolve(__dirname, '..', csvRelativePath);
    await this.browseCsvInput.setInputFiles(filePath);
    await expect(this.uploadSuccessToast).toBeVisible();
    await this.refreshButton.click();
    await this.saveButton.click();
  }
}
