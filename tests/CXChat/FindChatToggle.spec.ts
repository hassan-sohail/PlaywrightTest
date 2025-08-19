import { test, expect } from '@playwright/test';

const AGENT_URL = 'https://rm-03.expertflow.com/unified-agent/#/login';
const AGENT_CREDENTIALS = { username: 'Hassan', password: '1234' };

test('Find Chat Toggle', async ({ page }) => {
  console.log('=== STEP 1: Agent Login ===');
  await page.goto(AGENT_URL);
  
  // Login
  await page.locator('#username').fill(AGENT_CREDENTIALS.username);
  await page.locator('#password').fill(AGENT_CREDENTIALS.password);
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Wait for login to complete
  await expect(page.getByAltText('ExpertFlow')).toBeVisible();
  await page.waitForTimeout(3000);
  
  console.log('=== STEP 2: Click Agent Button ===');
  await page.getByRole('button', { name: 'Agent' }).click();
  await page.waitForTimeout(2000);
  
  // Check if agent needs to be set to ready
  const notReadyButton = await page.locator('button:has-text("Not Ready")').count();
  if (notReadyButton > 0) {
    console.log('Setting agent to Ready...');
    await page.getByRole('button', { name: 'Not Ready' }).click();
    await page.getByRole('menuitem', { name: 'Ready' }).click();
    await page.waitForTimeout(2000);
  }
  
  console.log('=== STEP 3: Examine All Toggles ===');
  
  // Find all slide toggles
  const slideToggles = await page.locator('.mat-slide-toggle-thumb-container').all();
  console.log(`Found ${slideToggles.length} slide toggles`);
  
  // Examine each toggle and its surrounding context
  for (let i = 0; i < slideToggles.length; i++) {
    console.log(`\n--- Toggle ${i} ---`);
    
    // Get the toggle element
    const toggle = slideToggles[i];
    
    // Find the parent container to get context
    const parentContainer = await toggle.locator('xpath=..').first();
    const grandParent = await parentContainer.locator('xpath=..').first();
    
    // Get text content around this toggle
    const containerText = await grandParent.textContent();
    console.log(`Toggle ${i} context: "${containerText}"`);
    
    // Check if this toggle is checked/unchecked
    const isChecked = await toggle.evaluate(el => {
      const parent = el.closest('.mat-slide-toggle');
      return parent ? parent.classList.contains('mat-checked') : false;
    });
    console.log(`Toggle ${i} checked: ${isChecked}`);
    
    // Look for specific text that might indicate Chat
    if (containerText && containerText.toLowerCase().includes('chat')) {
      console.log(`*** Toggle ${i} appears to be CHAT toggle ***`);
    }
  }
  
  // Take a screenshot
  await page.screenshot({ path: 'toggles-examination.png' });
  
  console.log('\n=== STEP 4: Test Each Toggle ===');
  
  // Test each toggle one by one to see which one affects chat
  for (let i = 0; i < slideToggles.length; i++) {
    console.log(`\nTesting Toggle ${i}...`);
    
    try {
      // Click the toggle
      await slideToggles[i].click();
      await page.waitForTimeout(1000);
      
      // Look for any chat-related text that appears
      const chatTexts = await page.locator('*:has-text("CHAT"), *:has-text("Chat"), *:has-text("chat")').all();
      console.log(`After clicking toggle ${i}, found ${chatTexts.length} chat-related elements:`);
      
      for (let j = 0; j < chatTexts.length; j++) {
        const text = await chatTexts[j].textContent();
        console.log(`  Chat text ${j}: "${text}"`);
      }
      
      // Click again to toggle back
      await slideToggles[i].click();
      await page.waitForTimeout(1000);
      
    } catch (e) {
      console.log(`Error testing toggle ${i}: ${e.message}`);
    }
  }
}); 