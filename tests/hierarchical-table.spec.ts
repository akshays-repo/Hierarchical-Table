import { test, expect } from "@playwright/test";

test.describe.serial("Hierarchical Table Allocation Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://hierarchical-table-mauve.vercel.app/");
  });

  test("Initial table loads correctly", async ({ page }) => {
    await expect(page.locator("#electronics")).toBeVisible();
    await expect(page.locator("#electronics-value")).toHaveText("1500.00");
    await expect(page.locator("#furniture")).toBeVisible();
    await expect(page.locator("#furniture-value")).toHaveText("1000.00");
  });

  test('Updating "Phones" value by 10% updates table correctly', async ({
    page,
  }) => {
    const phonesInput = page.locator("#phones-input");
    const allocationButton = page.locator("#phones-allocation-percentage");

    await phonesInput.fill("10");
    await allocationButton.click();

    await expect(page.locator("#phones-value")).toHaveText("880.00");
    await expect(page.locator("#electronics-variance")).toHaveText("5.33%");
    await expect(page.locator("#electronics-value")).toHaveText("1580.00");
  });

  test('Updating "Tables" value directly updates correctly', async ({
    page,
  }) => {
    const tablesInput = page.locator("#tables-input");
    const allocationButton = page.locator("#tables-allocation-value");

    await tablesInput.fill("400");
    await allocationButton.click();

    await expect(page.locator("#tables-value")).toHaveText("400.00");
    await expect(page.locator("#tables-variance")).toHaveText("33.33%");
    await expect(page.locator("#furniture-value")).toHaveText("1100.00");
  });

  test('Updating "Furniture" value to 2000 distributes values proportionally', async ({
    page,
  }) => {
    const furnitureInput = page.locator("#furniture-input");
    const allocationButton = page.locator("#furniture-allocation-value");

    await furnitureInput.fill("2000");
    await allocationButton.click();

    await expect(page.locator("#furniture-variance")).toHaveText("100.00%");
  });

  test('Variance updates correctly when changing "Electronics" value', async ({
    page,
  }) => {
    const electronicsInput = page.locator("#electronics-input");
    const allocationButton = page.locator("#electronics-allocation-value");

    await electronicsInput.fill("1800");
    await allocationButton.click();

    await expect(page.locator("#electronics-value")).toHaveText("1800.00");
    await expect(page.locator("#electronics-variance")).toHaveText("20.00%");
  });
});
