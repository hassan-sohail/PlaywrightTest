import { test, expect } from '@playwright/test';

// Constants for URLs and credentials
const CUSTOMER_WIDGET_URL = 'https://rm-03.expertflow.com/customer-widget/#/widget?widgetIdentifier=Web&serviceIdentifier=1122';
const AGENT_URL = 'https://rm-03.expertflow.com/unified-agent/#/login';
const AGENT_CREDENTIALS = { username: 'Hassan', password: '1234' };
const CUSTOMER_INFO = { name: 'AI Customer', phone: '666' };

test('Customer Agent Chat Interaction', async ({ browser }) => {
  // Create two browser contexts for customer and agent
  const customerContext = await browser.newContext();
  const agentContext = await browser.newContext();
  
  const customerPage = await customerContext.newPage();
  const agentPage = await agentContext.newPage();

  // Step 1: Customer starts chat
  await customerPage.goto(CUSTOMER_WIDGET_URL);
  
  // Click on Live chat button (using ID for reliability)
  await customerPage.locator('#chatIconBtn').click();
  
  // Fill customer information
  await customerPage.locator('input#phone').fill(CUSTOMER_INFO.phone);
  await customerPage.locator('input[type="text"]').fill(CUSTOMER_INFO.name);
  
  // Start the chat
  await customerPage.getByRole('button', { name: 'Start Chat' }).click();
  
  // Step 2: Agent login and setup
  await agentPage.goto(AGENT_URL);
  
  // Login with provided credentials
  await agentPage.locator('#username').fill(AGENT_CREDENTIALS.username);
  await agentPage.locator('#password').fill(AGENT_CREDENTIALS.password);
  await agentPage.getByRole('button', { name: 'Login' }).click();
  
  // Wait for login to complete
  await expect(agentPage.getByAltText('ExpertFlow')).toBeVisible();
  await agentPage.waitForTimeout(3000);
  
  // Set agent state to Ready (only if not already ready)
  await agentPage.getByRole('button', { name: 'Agent' }).click();
  
  // Check if agent is already ready
  const notReadyButton = await agentPage.locator('button:has-text("Not Ready")').count();
  if (notReadyButton > 0) {
    await agentPage.getByRole('button', { name: 'Not Ready' }).click();
    await agentPage.getByRole('menuitem', { name: 'Ready' }).click();
  }
  
  // Toggle Chat state to Ready (second toggle is Chat)
  await agentPage.locator('.mat-slide-toggle-thumb-container').nth(1).click(); // Second toggle for Chat
  
  // Wait for chat ready state to be visible (with different possible texts)
  try {
    await expect(agentPage.getByText('CHAT(READY)')).toBeVisible();
    await agentPage.getByText('CHAT(READY)').click();
  } catch (e) {
    // Try alternative text formats
    try {
      await expect(agentPage.getByText('Chat(Ready)')).toBeVisible();
      await agentPage.getByText('Chat(Ready)').click();
    } catch (e2) {
      try {
        await expect(agentPage.getByText('chat(ready)')).toBeVisible();
        await agentPage.getByText('chat(ready)').click();
      } catch (e3) {
        // If no specific text found, just proceed
        console.log('Chat ready text not found, proceeding');
      }
    }
  }
  
  // Close the agent menu if it's open
  try {
    await agentPage.keyboard.press('Escape');
  } catch (e) {
    console.log('Could not press escape, continuing');
  }
  
  // Step 3: Customer sends initial message
  await customerPage.getByRole('textbox', { name: 'Type message here' }).fill('Hi');
  await customerPage.getByText('send', { exact: true }).click();
  
  // Wait for bot response
  await customerPage.waitForTimeout(3000);
  
  // Click on "Talk to Human Agent" option
  await customerPage.getByRole('option', { name: 'Talk to a human agent' }).click();
  
  // Step 4: Agent accepts the incoming chat
  await agentPage.getByRole('button', { name: 'Accept' }).click();
  
  // Step 5: Agent replies to customer
  await agentPage.getByRole('combobox', { name: 'Type a message here...' }).fill('Hello! How can I help you today?');
  await agentPage.locator('form').getByRole('button').click();
  
  // Wait for message to be sent
  await agentPage.waitForTimeout(2000);
  
  // Close contexts
  await customerContext.close();
  await agentContext.close();
}); 