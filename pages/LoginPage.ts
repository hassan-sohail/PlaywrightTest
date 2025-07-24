export class LoginPage {
    readonly page;
    readonly usernameInput;
    readonly passwordInput;
    readonly loginButton;
    readonly stateDropdownMenu;
    readonly globalStateReady;
    readonly globalStateNotReady;
    readonly SetglobalStateShortBreak;
    readonly openLogoutDropdown;
    readonly logoutButton;
  
    constructor(page) {
      this.page = page;
      this.usernameInput = page.locator('#mat-input-0');
      this.passwordInput = page.locator('#mat-input-1');
      this.loginButton = page.getByRole('button', { name: 'Login' });
      this.stateDropdownMenu = page.getByRole('button', { name: 'Agent' });
      this.globalStateReady = page.getByRole('button', { name: 'Ready' });// if agent is in Ready state  
      this.SetglobalStateShortBreak = page.getByRole('menuitem', { name: 'Short Break' });
      this.openLogoutDropdown = page.getByRole('menuitem', { name: 'Logout' });
      this.logoutButton = page.getByRole('button', { name: 'Logout' });
    }
  
    async login(username: string, password: string) {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
      await this.page.waitForTimeout(3000); // Add explicit wait only if needed
    }

    async logoutAgent() {

      await this.stateDropdownMenu.click();
      await this.globalStateReady.click();
      await this.SetglobalStateShortBreak.click();
      await this.openLogoutDropdown.click();
      await this.loginButton.click();
    }
  }