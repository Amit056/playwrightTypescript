import { test, expect, chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { get } from 'http';
import { getEnv } from '../helper/env/env';
import { invokeBrowser } from '../helper/browsers/browserManager';
import { selectDate } from '../utils/calenderUtil';

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
    permissions: []

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

test('emt one way trip', async () => {
  await page.goto(process.env.URL);
  await page.locator(`[id="pff"]`).click();
  await page.locator(`[id="a_FromSector_show"]`).fill('Mumbai, India');
  await page.getByText('Mumbai(BOM)').click();
  await page.locator(`[id="ptt"]`).click();
  await page.locator(`[id*="a_Editbox"]`).pressSequentially('New Delhi');
  await page.getByText('New Delhi(DEL)').first().click();
  await selectDate(page, 28, 1, 2026);
  await page.waitForTimeout(5000);
});

test('@emt emt round trip', async () => {
  await page.goto(process.env.URL);
  await page.locator(`[id="rtrip"]`).click();
  await page.locator(`[id="pff"]`).click();
  await page.locator(`[id="a_FromSector_show"]`).fill('Mumbai, India');
  await page.getByText('Mumbai(BOM)').click();
  await page.locator(`[id="ptt"]`).click();
  await page.locator(`[id*="a_Editbox"]`).pressSequentially('New Delhi');
  await page.getByText('New Delhi(DEL)').first().click();
  await selectDate(page, 28, 1, 2026);
  await page.waitForTimeout(5000);
  await selectDate(page, 28, 2, 2026);
  await page.locator(`[class="srchBtnSe"]`).click();
   await page.waitForTimeout(5000);
});
