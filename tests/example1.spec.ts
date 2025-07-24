import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page).toHaveURL(/.*intro/);
});

test('check Java page', async ({ page }) => {
  await page.goto('https://playwright.dev/'); 
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.getByRole('button', { name: 'Node.js' }).hover();
  //await page.getByText('Java', { exact: true }).click();
   await page.getByRole('navigation', { name: 'Main' }).getByText('Java').click(); // in case the locator above doesn't work, you can use this line. Remove the line above and use this one instead.
  await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
  await expect(page.getByText('Installing Playwright', { exact: true })).not.toBeVisible();
  const javaDescription = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;
  await expect(page.getByText(javaDescription)).toBeVisible();
});

test('My first test @learn', async({page})=> { 
  //npx playwright test tests/example1.spec.ts --grep "@learn" --headed (to run the tag cases)
  // add ".only after the test (test.only) to run the single test"
  await page.goto('https://playwright.dev/');
  await page.getByText('Get started').click();
  await page.getByRole('button',{name: 'Node.js'}).hover();
  await page.getByRole('navigation', { name: 'Main' }).getByText('Java').click();
  await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
  const pageDescription= `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;
  await expect(page.getByText(pageDescription)).toBeVisible();

}); 