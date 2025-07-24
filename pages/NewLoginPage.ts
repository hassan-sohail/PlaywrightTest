
import { Page, Locator } from '@playwright/test';

export class NewLoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        //this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.usernameInput= page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async navigateTo() {
        await this.page.goto('https://chatsolution.expertflow.com/unified-admin/#/login');
    }
}
