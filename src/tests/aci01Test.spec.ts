import { test, expect, chromium, Browser, BrowserContext, Page, TestInfo, Locator } from '@playwright/test';
import { getEnv } from '../helper/env/env';
import { invokeBrowser } from '../helper/browsers/browserManager';
import { selectDate } from '../utils/calenderUtil';
import { TestDataManager } from '../utils/testDataManager';
import path from 'path';
import fs from 'fs';
import { pageFixtute } from '../hooks/pageFixture';
import BasePage from '../page/basePage';
import logger from '../utils/logger';

let browser: Browser;
let context: BrowserContext;
let page: Page;
let element: Locator;
// Runs once before all tests
test.beforeAll(async () => {
  getEnv();
  browser = await invokeBrowser() as Browser;
});

// Runs before each test
test.beforeEach(async () => {
  context = await browser.newContext({
    viewport: null,
    deviceScaleFactor: undefined,
    permissions: []

  });
  page = await context.newPage();
  pageFixtute.page = page;
  logger.info(`Worker Index: ${test.info().workerIndex}, Page Value: ${JSON.stringify(pageFixtute.page)}`);
  
});

// Runs after each test
// test.afterEach(async () => {
//   await context.close();
// });

test.afterEach(async ({ }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const screenshot = await page.screenshot({ fullPage: true });

    await testInfo.attach('Failure Screenshot', {
      body: screenshot,
      contentType: 'image/png'
    });
  }

  await context.close();
});


// Runs once after all tests
test.afterAll(async ({ }, testInfo) => {
  await browser.close();
  console.log('Browser closed');
  const runtimeFile = path.join(
    process.cwd(),
    'runtime',
    `worker-${testInfo.workerIndex}.json`
  );

  if (fs.existsSync(runtimeFile)) {
    fs.unlinkSync(runtimeFile);
    console.log(`🧹 Cleaned runtime file: ${runtimeFile}`);
  }
});


test.describe.serial(() => {
  test('@round1 aci login and ivite user', async () => {
    const basePage = new BasePage(pageFixtute.page);
    await page.goto(process.env.URL);
    element = await basePage.createWebEditElement('data-testid', 'email-username');
    await basePage.fillInputField(element, process.env.AdminUserName)
    element = await basePage.createWebEditElement('data-testid', 'password');
    await basePage.fillInputField(element, process.env.AdminPassWord);
    element = await basePage.createWebEditElement('data-testid', 'submitlogin');
    await basePage.clickElement(element);
    element = await basePage.createWebElement('WebButton', 'text', 'Manage');
    await basePage.clickElement(element);
    element = await basePage.createWebElement('WebButton', 'text', 'Manage Users');
    await basePage.clickElement(element);
    element = await basePage.getElementRelativeToText("name", "invite-mode-group", 'left-of', "Single Invite");
    await expect(element).toBeChecked();

    element = await basePage.getElementRelativeToText("name", "invite-mode-group", 'left-of', "Bulk Invite");
    await expect(element.first()).not.toBeChecked();

    await page.getByRole('textbox', { name: 'Email ID' }).click();

    //Creating a unique email for each test run
    const invitedUserEmail = `learner${test.info().workerIndex}Test${Date.now()}@yopmail.com`;
    await page.getByRole('textbox', { name: 'Email ID' }).fill(invitedUserEmail);

    // Storing the email in test data for future reference
    TestDataManager.set(test.info(), 'invitedUserEmail', invitedUserEmail);
    await page.getByRole('textbox', { name: 'Email ID' }).click();
    await page.getByRole('button', { name: 'Send invite (1)' }).click();
    // await expect(page.getByRole('button', { name: 'Profile Photo' })).toBeVisible();

  });

  // test('@round1 aci invite user flow', async () => {
  //   const basePage = new BasePage(pageFixtute.page);
  //   await page.goto(process.env.URL);
  //   element = await basePage.createWebElement('WebLink', 'text', 'Sign up');
  //   await basePage.clickElement(element);
  //   const invitedEmail = TestDataManager.get<string>(test.info(), 'invitedUserEmail');
  //   element = await basePage.createWebEditElement('data-testid', 'email');
  //   await basePage.fillInputField(element, invitedEmail);
  //   element = await basePage.createWebEditElement('data-testid', 'username');
  //   await basePage.fillInputField(element, invitedEmail.substring(0, 14));
  //   element = await basePage.createWebEditElement('data-testid', 'password');
  //   await basePage.fillInputField(element, process.env.LearnerPassWord);
  //   element = await basePage.createWebEditElement('data-testid', 'confirm-password');
  //   await basePage.fillInputField(element, process.env.LearnerPassWord);
  //   element = await basePage.createWebEditElement('data-testid', 'submit');
  //   await basePage.clickElement(element);
  //   element = await basePage.createWebElement('WebLink', 'text', 'Sign in');
  //   await basePage.clickElement(element);
  //   element = await basePage.createWebEditElement('data-testid', 'email-username');
  //   await basePage.fillInputField(element, invitedEmail.substring(0, 14))
  //   element = await basePage.createWebEditElement('data-testid', 'password');
  //   await basePage.fillInputField(element, process.env.LearnerPassWord);
  //   element = await basePage.createWebEditElement('data-testid', 'submitlogin');
  //   await basePage.clickElement(element);
  //   logger.info(`Worker Index: ${test.info().workerIndex}, Page Value: ${JSON.stringify(pageFixtute.page)}`);

  //   // unable to sign up
  //   await page.getByRole('button', { name: 'Get Started' }).click();
  //   await page.getByRole('textbox', { name: 'First Name' }).click();
  //   await page.getByRole('textbox', { name: 'First Name' }).fill(invitedEmail.substring(0, 12));
  //   await page.getByRole('textbox', { name: 'First Name' }).click();
  //   await page.getByRole('textbox', { name: 'Last Name' }).fill('qa');
  //   await page.getByRole('button', { name: 'Next' }).click();
  //   await page.getByRole('combobox', { name: 'Search skills' }).click();
  //   await page.getByRole('option', { name: 'Data Analytics' }).click();
  //   await page.locator('button').filter({ hasText: /^Add Skill$/ }).click();
  //   await page.locator('.MuiSlider-rail').click();
  //   await page.getByRole('button', { name: 'Add Skill' }).click();
  //   await page.getByRole('button', { name: 'Next' }).click();
  //   await page.getByRole('button', { name: 'Next' }).click();
  //   await page.getByRole('button', { name: 'Start learning' }).click();
  //   await page.getByRole('button', { name: 'Skip Tour' }).click();
  //   await expect(page.getByRole('button', { name: 'My Learning' })).toBeVisible();

  // });
});