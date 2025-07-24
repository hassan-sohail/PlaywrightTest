import { type Locator , type Page } from "@playwright/test";

export class HomePage{
    page:Page;
//    await page.getByRole('link', { name: 'Get started' }).click();
    startedButton: Locator;

    constructor(page:Page){
        this.page=page;
        this.startedButton= page.getByRole('link', { name: 'Get started' });
    }


    async clickStartedButton() {
       return await this.startedButton.click();
    
    }
}


export default HomePage; 