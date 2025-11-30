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

test('@mmt one way trip', async () => {
  await page.goto(process.env.URL);
  await page.locator(`[data-cy="closeModal"]`).click();
  await page.locator(`[alt="minimize"]`).click();
  // Close MMT Work tooltip
  await page.mouse.click(10, 10);
  await page.getByText('From', { exact: true }).click();
  await page.getByPlaceholder('From').fill('Mumbai, India');
  await page.getByText('Mumbai, India').click();
  await page.getByText('To', { exact: true }).first().click();
  await page.getByPlaceholder('To').fill('New Delhi, India');
  await page.getByText('New Delhi, India').click();
  await page.waitForTimeout(5000);
  await page.waitForSelector(`[class="DayPicker-Month"]:nth-child(1) p[class=" todayPrice"]`);
  const prices = await page.locator(`[class="DayPicker-Month"]:nth-child(1) p[class=" todayPrice"]`).allTextContents();
  console.log('Prices are: ', prices);
  prices.sort((a, b) => parseInt(a) - parseInt(b));
  console.log('Sorted Prices are: ' + prices);
  const lowestPrice = prices[0];
  console.log('Lowest Price is: ', lowestPrice);
  await page.locator(`text=${lowestPrice}`).first().click();
  await page.getByRole('button', { name: 'Search Flights' }).click();
  await page.waitForSelector(`text=Select departure flight`);

});

test('two way trip', async () => {
  await page.goto(process.env.URL);
  await page.locator(`[data-cy="closeModal"]`).click();
  await page.locator(`[alt="minimize"]`).click();
  // Close MMT Work tooltip
  await page.mouse.click(10, 10);
  await page.locator(`[data-cy="roundTrip"]`).click();
  await page.getByText('From', { exact: true }).click();
  await page.getByPlaceholder('From').fill('Mumbai, India');
  await page.getByText('Mumbai, India').click();
  await page.getByText('To', { exact: true }).first().click();
  await page.getByPlaceholder('To').fill('New Delhi, India');
  await page.getByText('New Delhi, India').click();
  await page.waitForTimeout(5000);
  await page.waitForSelector(`[class="DayPicker-Month"]:nth-child(1) p[class=" todayPrice"]`);
  const prices = await page.locator(`[class="DayPicker-Month"]:nth-child(1) p[class=" todayPrice"]`).allTextContents();
  console.log('Prices are: ', prices);
  prices.sort((a, b) => parseInt(a) - parseInt(b));
  console.log('Sorted Prices are: ' + prices);
  const lowestPrice = prices[0];
  console.log('Lowest Price is: ', lowestPrice);
  await page.locator(`text=${lowestPrice}`).first().click();
  await page.getByRole('button', { name: 'Search Flights' }).click();
  await page.waitForSelector(`text=Select departure flight`);
});



