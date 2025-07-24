    import { test, expect } from '@playwright/test';
    
    
    test('Record Chat', async ({ page, browser }) => {
        const context1 = await browser.newContext();
        const page1 = await context1.newPage();
    
    
    await page.goto('https://efcx4-voice.expertflow.com/unified-agent/#/login');
    await page.locator('#username').click();
    await page.locator('#username').fill('bilal');
    await page.locator('#username').press('Tab');
    await page.locator('#password').fill('12345');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('button', { name: 'Agent' }).click();
    await page.getByRole('button', { name: 'Not Ready' }).click();
    await page.getByRole('menuitem', { name: 'Ready' }).click();
   // await page.locator('#mat-slide-toggle-7 > .mat-slide-toggle-label > .mat-slide-toggle-bar > .mat-slide-toggle-thumb-container').click();
   await page.locator('.mat-slide-toggle-thumb-container').nth(2).click(); // Index starts at 0
     await expect(page.getByText('CHAT(READY)')).toBeVisible();
     await page.getByText('CHAT(READY)').click();

   
   
   await page1.goto('https://efcx4-voice.expertflow.com/customer-widget/#/widget?widgetIdentifier=Web&serviceIdentifier=112233');
    await page1.getByRole('button', { name: 'sms' }).click();
    await page1.locator('div').filter({ hasText: /^phone\*$/ }).getByRole('textbox').click();
    await page1.locator('div').filter({ hasText: /^phone\*$/ }).getByRole('textbox').fill('2888');
    await page1.locator('input[type="text"]').click();
    await page1.locator('input[type="text"]').fill('demorec');
    await page1.getByRole('button', { name: 'Start Chat' }).click();
    await page1.getByRole('textbox', { name: 'Type message here' }).click();
    await page1.getByRole('textbox', { name: 'Type message here' }).fill('hi');
//    await page1.locator('.material-symbols-outlined.send-btn').click();
    await page1.getByText('send', { exact: true }).click();
    await page1.getByRole('option', { name: 'Talk to a human agent' }).click();
    await page.getByRole('button', { name: 'Accept' }).click();
    await page.getByRole('combobox', { name: 'Type a message here...' }).click();
    await page.getByRole('combobox', { name: 'Type a message here...' }).fill('we are recording the script');
    await page.locator('.mat-focus-indicator.send-btn.composer-trigger.mat-icon-button.mat-button-base.ng-star-inserted').click();
    await page1.getByRole('textbox', { name: 'Type message here' }).click();
    await page1.getByRole('textbox', { name: 'Type message here' }).fill('perfect');
    await page1.getByText('send', { exact: true }).click();
    await page.getByRole('combobox', { name: 'Bot suggestions are available' }).click();
    await page.getByRole('combobox', { name: 'Bot suggestions are available' }).fill('ending the chat now');
    await page.locator('.mat-focus-indicator.send-btn.composer-trigger.mat-icon-button.mat-button-base.ng-star-inserted').click();
    await page.getByRole('button').filter({ hasText: 'close' }).click();
    await page.getByRole('button', { name: 'Confirm' }).click();
    await page.getByLabel('Cat 2').getByRole('option', { name: 'Opt 2' }).click();
    await page.locator('text=Add Wrap-Up').click();
        await context1.close();
    });
