import { test, expect } from '@playwright/test';

// Constants for URLs and credentials
const AGENT_URL = 'https://efcx4-voice.expertflow.com/unified-agent/#/login';
const CUSTOMER_WIDGET_URL = 'https://efcx4-voice.expertflow.com/customer-widget/#/widget?widgetIdentifier=Web&serviceIdentifier=112233';
const AGENT_CREDENTIALS = { username: 'bilal', password: '12345' };
const CUSTOMER_INFO = { phone: '2888', name: 'demorec' };

// Helper functions
async function loginAgent(page: any, credentials: { username: string; password: string }) {
  await page.goto(AGENT_URL);
  await page.locator('#username').fill(credentials.username);
  await page.locator('#password').fill(credentials.password);
  await page.getByRole('button', { name: 'Login' }).click();
}

async function setAgentStatusToReady(page: any) {
  await page.getByRole('button', { name: 'Agent' }).click();
  await page.getByRole('button', { name: 'Not Ready' }).click();
  await page.getByRole('menuitem', { name: 'Ready' }).click();
  await page.locator('.mat-slide-toggle-thumb-container').nth(2).click(); // Index starts at 0
  await expect(page.getByText('CHAT(READY)')).toBeVisible();
  await page.getByText('CHAT(READY)').click();
}

async function startCustomerChat(page: any, customerInfo: { phone: string; name: string }) {
  await page.goto(CUSTOMER_WIDGET_URL);
  await page.getByRole('button', { name: 'sms' }).click();
  await page.locator('div').filter({ hasText: /^phone\*$/ }).getByRole('textbox').fill(customerInfo.phone);
  await page.locator('input[type="text"]').fill(customerInfo.name);
  await page.getByRole('button', { name: 'Start Chat' }).click();
}

async function sendMessage(page: any, message: string) {
  await page.getByRole('textbox', { name: 'Type message here' }).fill(message);
  await page.getByText('send', { exact: true }).click();
  await page.waitForTimeout(2000); // Wait for the message to be sent
  await page.getByRole('option', { name: 'Talk to a human agent' }).click();
}
let isAgentAcceptedChat = false; // Flag to ensure execution only once

test('Record Chat', async ({ page, browser }) => {
  const context1 = await browser.newContext();
  const page1 = await context1.newPage();

  // Agent login and status setup
  await loginAgent(page, AGENT_CREDENTIALS);
  await setAgentStatusToReady(page);

  // Customer starts chat
  await startCustomerChat(page1, CUSTOMER_INFO);
  await sendMessage(page1, 'hi');

  // Agent accepts chat and responds (execute only once)
  if (!isAgentAcceptedChat) {
    await page.getByRole('button', { name: 'Accept' }).click();
    isAgentAcceptedChat = true; // Update flag after execution
  }

  await page.getByRole('combobox', { name: 'Type a message here...' }).fill('we are recording the script');
  await page.locator('.mat-focus-indicator.send-btn.composer-trigger.mat-icon-button.mat-button-base.ng-star-inserted').click();

  // Customer responds
  await sendMessage(page1, 'perfect');

  // Agent ends chat
  await page.getByRole('combobox', { name: 'Bot suggestions are available' }).fill('ending the chat now');
  await page.locator('.mat-focus-indicator.send-btn.composer-trigger.mat-icon-button.mat-button-base.ng-star-inserted').click();
  await page.getByRole('button').filter({ hasText: 'close' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByLabel('Cat 2').getByRole('option', { name: 'Opt 2' }).click();
  await page.locator('text=Add Wrap-Up').click();

  // Logout Agent
  await page.getByRole('button', { name: 'Agent' }).click();
  await page.getByRole('button', { name: 'Ready' }).click();
  await page.getByRole('menuitem', { name: 'Short Break' }).click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();
  await context1.close();
});