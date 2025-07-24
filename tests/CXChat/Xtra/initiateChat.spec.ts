import{test , expect} from '@playwright/test';
import { customerInfo, agentInfo, adminInfo, chatMessages } from '../../test_data/chat-data';


const CustomerWidget= 'https://efcx-qa9.expertflow.com/customer-widget/#/widget?widgetIdentifier=Web&serviceIdentifier=1122';
const AgentDesk= 'https://efcx-qa9.expertflow.com/unified-agent';
const AgentDesk2= 'https://efcx-reporting.expertflow.com/unified-agent';
const UnifiedAdmin= 'https://efcx-qa9.expertflow.com/unified-admin';
test('Initiate Chat', async ({ page }) => {
  //  //Step1 Open Customer Widget
  //    await page.goto(CustomerWidget);

  //  //Step2 Verify customer widget open  
  //    await expect(page).toHaveTitle('Customer Widget');

  //  //Step3 Open chat form
     
  //  const phoneField= page.locator('input#phone');

  //    await page.getByRole('button',{name: 'Connect with us'}).click();
  //    await expect(phoneField).toBeVisible();
  //    await phoneField.fill(customerInfo.phoneNumber);

  //   //Step4 click on Start Chat button
  //  const startChatButton= page.getByRole('button',{name:'Start Chat'});
  //    await expect (startChatButton).toBeEnabled();
  //    await startChatButton.click();

  //   //Step5 Type a message and start chat
  //   const messageField= page.getByRole('textbox', { name: 'Type message here ...' }); 
  //   const botMessageOption= page.getByRole('option', { name: 'Talk to a human agent' });

  //    await expect (messageField).toBeVisible();
  //    await messageField.fill(chatMessages.GreetingC);
  //    await page.locator('span.send-btn').click();
    
  //    await expect (botMessageOption).toBeVisible();
  //    await botMessageOption.click();
    
  //    await page.waitForTimeout(5000); 

//   ****** for login agent in same browser *******
  
// const agentContext = await browser.newContext();
  // const agentPage = await agentContext.newPage();
  // await agentPage.goto('https://efcx4-voice.expertflow.com/unified-agent/#/login');



     //Step6 Login Agent 
     await page.goto(AgentDesk2);
     await expect(page.getByRole('heading', { name: 'AgentDesk' })).toBeVisible();
     await page.locator('input#username').fill(agentInfo.agentID);
     await page.locator('input#password').fill(agentInfo.password);
     await page.getByRole('button', { name: 'Login' }).click();
     await expect(page.getByAltText('ExpertFlow')).toBeVisible();
     await page.waitForTimeout(3000);
    //Step7 Verify Agent is logged in
     await page.getByAltText('Agent').click();
     await expect(page.getByText(agentInfo.agentID)).toBeVisible();
     //Step8 Change Agent status to Ready
     await page.locator('span.ellipsis').click();
      await page.getByRole('menuitem', { name: 'Ready' }).click();
     //     await page.locator('button.mat-focus-indicator.state-trigger.mat-menu-item').first().click();
     await expect(page.locator('span.mat-button-wrapper > span.ellipsis')).toHaveText('Ready');

     await page.locator('.mat-slide-toggle-thumb-container').nth(2).click(); // Index starts at 0
     await expect(page.getByText('CHAT(READY)')).toBeVisible();
     await page.getByText('CHAT(READY)').click();

     await page.keyboard.press('Escape');
     await page.waitForTimeout(3000);
    //Step8a Change Agent status to Not Ready
   //   await page.getByAltText('Agent').click();
   //   await expect(page.getByText(agentInfo.agentID)).toBeVisible();
   //   await page.locator('span.ellipsis').click();
   //   await page.getByRole('menuitem', { name: 'Short Break' });
   //   //await page.locator('button.mat-focus-indicator.state-trigger.mat-menu-item').nth(1).click();
   //   await expect(page.locator('span.mat-button-wrapper > span.ellipsis')).toHaveText('Not Ready-Short Break');

     //  await expect(page.locator('.mat-slide-toggle-thumb-container').nth(2)).toHaveClass(/mat-checked/);


       //Step9 Accept Chat
       await page.getByRole('button', { name: 'Accept' }).click();
       await expect(page.locator("h5[class='customer-name'] span")).toHaveText(customerInfo.phoneNumber);

  });


