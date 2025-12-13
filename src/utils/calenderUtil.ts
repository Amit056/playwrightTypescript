import { Page } from '@playwright/test';

/**
 * Selects a date from your calendar by passing month, day, year separately.
 *
 * @param page  Playwright Page object
 * @param day   1-31
 * @param month 1-12   (1 = January, 12 = December)
 * @param year  full year, e.g., 2025
 */
export async function selectDate(
  page: Page,
  day: number,
  month: number,
  year: number
) {
  const monthNames = [
    "JAN","FEB","MAR","APR","MAY","JUN",
    "JUL","AUG","SEP","OCT","NOV","DEC"
  ];

  /** Format pieces for matching the LI id */
  const dd = String(day).padStart(2, "0");   // 01
  const mm = String(month).padStart(2, "0"); // 11
  const yyyy = String(year);

  /** The id suffix in your HTML → "28/11/2025" */
  const idSuffix = `${dd}/${mm}/${yyyy}`;

  /** Step 1: Open the calendar */
  // await page.locator("#departure").click(); // change selector as needed

  /** Step 2: Navigate to target month & year */
  while (true) {
    const label = await page.locator(".month2").first().innerText();   // e.g., "Nov 2025"
    const [curMonthStr, curYearStr] = label.split(" ");
    const curYear = parseInt(curYearStr, 10);// specifies that the number should be read in base-10 (decimal).
    const curMonthIndex = monthNames.indexOf(curMonthStr); // 0–11

    const targetMonthIndex = month - 1; // convert to 0–11

    if (curYear === year && curMonthIndex === targetMonthIndex) break;

    const goPrev =
      curYear > year ||
      (curYear === year && curMonthIndex > targetMonthIndex);

    if (goPrev) {
      await page.locator("#img2Prv").click(); // prev button
    } else {
      await page.locator("#img2Nex").click(); // next button
    }

    await page.waitForTimeout(150);
  }

  /** Step 3: Select the date */
  await page.locator(`li[id$="_${idSuffix}"]`).click();
  await page.locator(`li[id$="_${idSuffix}"]`).click();
  await page.locator(`li[id$="_${idSuffix}"]`).fill('');
}
