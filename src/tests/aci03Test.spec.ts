// import { test, expect, chromium, Browser, BrowserContext, Page } from '@playwright/test';
// import { get } from 'http';
// import { getEnv } from '../helper/env/env';
// import { invokeBrowser } from '../helper/browsers/browserManager';
// import { selectDate } from '../utils/calenderUtil';
// import { TestDataManager } from '../utils/testDataManager';
// import path from 'path';
// import fs from 'fs';

// let browser: Browser;
// let context: BrowserContext;
// let page: Page;

// // Runs once before all tests
// test.beforeAll(async () => {
//   getEnv();
//   browser = await invokeBrowser() as Browser;
// });



// // Runs before each test
// test.beforeEach(async () => {
//   context = await browser.newContext({
//     viewport: null,
//     deviceScaleFactor: undefined,
//     permissions: []
//   });
//   page = await context.newPage();
// });

// // Runs after each test
// test.afterEach(async () => {
//   await context.close();
// });

// // Runs once after all tests
// // Runs once after all tests

// test.afterAll(async ({}, testInfo) => {
//    await browser.close();
//   console.log('Browser closed');
//   const runtimeFile = path.join(
//     process.cwd(),
//     'runtime',
//     `worker-${testInfo.workerIndex}.json`
//   );

//   if (fs.existsSync(runtimeFile)) {
//     fs.unlinkSync(runtimeFile);
//     console.log(`Cleaned runtime file: ${runtimeFile}`);
//   }
// });


// test.describe.serial(() => {
// test('@round1 aci login and ivite user', async () => {
//   await page.goto(process.env.URL);
//   await page.getByTestId('email-username').click();
//   await page.getByTestId('email-username').fill('adminuser0623113618');
//   await page.getByTestId('password').click();
//   await page.getByTestId('password').fill('Admin@1234');
//   await page.getByTestId('submitlogin').click();
//   await page.getByRole('button', { name: 'Manage' }).click();
//   await page.getByRole('tab', { name: 'Users' }).click();
//   await page.getByRole('menu').getByText('Users').click();
//   await page.getByRole('button', { name: 'Invite Users' }).click();
//   await page.getByRole('textbox', { name: 'Email ID' }).click();
//   //Creating a unique email for each test run
//   const invitedUserEmail=`learner${test.info().workerIndex}Test${Date.now()}@yopmail.com`;
//   await page.getByRole('textbox', { name: 'Email ID' }).fill(invitedUserEmail);

// // Storing the email in test data for future reference
//   TestDataManager.set(test.info(), 'invitedUserEmail', invitedUserEmail);
//   await page.getByRole('textbox', { name: 'Email ID' }).click();
//   await page.getByRole('button', { name: 'Send invite (1)' }).click();
//   // await expect(page.getByRole('button', { name: 'Profile Photo' })).toBeVisible();
  
// });


//  test('@round1 aci invite user flow', async () => {
//    await page.goto(process.env.URL);
//    await page.getByRole('link', { name: 'Sign up' }).click();
//    await page.getByTestId('email').click();
//    // Retrieving the invited email from test data
//    const invitedEmail = TestDataManager.get<string>(test.info(), 'invitedUserEmail');
//    await page.getByTestId('email').fill(invitedEmail);
//    await page.getByTestId('username').click();
//    await page.getByTestId('username').fill(invitedEmail.substring(0, 14));
//    await page.getByTestId('password').click();
//    await page.getByTestId('password').fill('Test@1234567');
//    await page.getByRole('button', { name: 'display the password' }).first().click();
//    await page.getByTestId('password').click();
//    await page.getByTestId('confirm-password').click();
//    await page.getByTestId('confirm-password').fill('Test@1234567');
//    await page.getByTestId('submit').click();
//    await page.getByRole('link', { name: 'Sign in' }).click();
//    await page.getByTestId('email-username').click();
//    await page.getByTestId('email-username').fill(invitedEmail.substring(0, 14));
//    await page.getByTestId('password').click();
//    await page.getByTestId('password').fill('Test@1234567');
//    await page.getByTestId('submitlogin').click();
//    await page.getByRole('button', { name: 'Get Started' }).click();
//    await page.getByRole('textbox', { name: 'First Name' }).click();
//    await page.getByRole('textbox', { name: 'First Name' }).fill(invitedEmail.substring(0, 12));
//    await page.getByRole('textbox', { name: 'First Name' }).click();
//    await page.getByRole('textbox', { name: 'Last Name' }).fill('qa');
//    await page.getByRole('button', { name: 'Next' }).click();
//    await page.getByRole('combobox', { name: 'Search skills' }).click();
//    await page.getByRole('option', { name: 'Data Analytics' }).click();
//    await page.locator('button').filter({ hasText: /^Add Skill$/ }).click();
//    await page.locator('.MuiSlider-rail').click();
//    await page.getByRole('button', { name: 'Add Skill' }).click();
//    await page.getByRole('button', { name: 'Next' }).click();
//    await page.getByRole('button', { name: 'Next' }).click();
//    await page.getByRole('button', { name: 'Start learning' }).click();
//    await page.getByRole('button', { name: 'Skip Tour' }).click();
//    await expect(page.getByRole('button', { name: 'My Learning' })).toBeVisible();
//       });
// });