import { test, expect, chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { get } from 'http';
import { getEnv } from '../helper/env/env';
import { invokeBrowser } from '../helper/browsers/browserManager';

let browser: Browser;
let context: BrowserContext;
let page: Page;

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

  });
  page = await context.newPage();
});

// Runs after each test
test.afterEach(async () => {
  await context.close();
});

// Runs once after all tests
test.afterAll(async () => {
  await browser.close();
  console.log('Browser closed');
});

test('sm login', async () => {
  await page.goto(process.env.URL);
  await page.locator(`[id="username"]`).fill(process.env.Teacher);
  await page.locator(`[id="password"]`).fill(process.env.Password);
  const element = await page.locator(`[id="signInBtn"]`);
  await element.click();
  await page.getByRole('link', { name: 'Students' }).click();
  await page.getByText(`No thank you`).click();
  await page.waitForTimeout(15000);
});
