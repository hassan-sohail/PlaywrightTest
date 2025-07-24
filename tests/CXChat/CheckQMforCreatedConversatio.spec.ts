
import { test, expect } from '@playwright/test';    
import { customerInfo, chatMessages } from '../../test_data/chat-data';
import { agentInfo,unifiedAgent } from '../../test_data/agent_data';
import { LoginPage } from '../../pages/LoginPage';
import { adminInfo, unifiedAdmin } from '../../test_data/admin_data';

const Admin_URL = 'https://efcx-qa9.expertflow.com/unified-admin/#/login';

test('Check QM for Created Conversation', async ({ page }) => {
    // Step 1: Login as Admin
    await page.goto(Admin_URL);
    await expect(page.getByRole('heading', { name: 'Unified Admin' })).toBeVisible();
    await page.locator('input#mat-input-0').fill(adminInfo.username);
    await page.locator('#mat-input-1').fill(adminInfo.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForTimeout(5000); // Wait for login to complete
    await expect(page.getByAltText('Wall Board Admin')).toBeVisible();
    
    // Step 2: Navigate to Conversation list in QM
    await page.getByText('Quality Management').click();
    await page.getByText('Conversation List').click();
    await expect(page.getByRole('heading', { name: 'Conversation List' })).toBeVisible();

    // Step 3: Search for the conversation created by the customer
    await page.getByRole('button').filter({ hasText: 'filter_list' }).click();
    await page.getByRole('button', { name: 'Direction' }).click();
    await page.locator('select[formcontrolname="conversationDirection"]').selectOption({ label: 'Inbound' });

  
    await page.getByRole('button', { name: 'Apply' }).click();
    
    // Step 4: Verify the conversation is listed
    const createdConvo = page.getByRole('cell', { name: customerInfo.phoneNumber1 }).first()
    await expect(createdConvo).toHaveText(customerInfo.phoneNumber1);
    await createdConvo.click();

    await page.getByRole('button', { name: 'Review' }).click();
    
    await page.locator('select[formcontrolname="agent"]').selectOption({ label: agentInfo.agentID });

    
    
    await page.waitForTimeout(2000); // Wait for the agent selection to complete
    // // Step 5: Click on the conversation to view details
    // await conversation.click();
    
    // // Step 6: Verify QM is enabled for the conversation
    // const qmStatus = page.locator('.qm-status'); // Adjust selector based on actual QM status element
    // await expect(qmStatus).toHaveText('QM Enabled');
});