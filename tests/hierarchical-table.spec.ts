import { test, expect } from "@playwright/test";

test.describe("Sales Table Allocation Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto("http://localhost:5173/");
  });

  test("Initial table loads correctly", async ({ page }) => {
    await expect(page.locator("text=Electronics")).toBeVisible();
    await expect(page.locator("text=1500")).toBeVisible();
    await expect(page.locator("text=Furniture")).toBeVisible();
    await expect(page.locator("text=1000")).toBeVisible();
  });

  test('Updating "Phones" value by 10% updates table correctly', async ({
    page,
  }) => {
    const phonesInput = page.locator('input[name="Phones"]');
    const allocationButton = page.locator("#Phones-allocation-percentage");

    await phonesInput.fill("10");
    await allocationButton.click();

    await expect(page.locator("text=880")).toBeVisible(); // Phones new value
    await expect(page.locator("text=5.33%")).toBeVisible(); // Electronics variance
  });

  test('Updating "Tables" value directly updates correctly', async ({
    page,
  }) => {
    const tablesInput = page.locator('input[name="Tables"]');
    const allocationButton = page.locator("#Tables-allocation-value");

    await tablesInput.fill("400");
    await allocationButton.click();

    await expect(page.locator("text=400")).toBeVisible();
    await expect(page.locator("text=33.33%")).toBeVisible(); // Tables variance
    await expect(page.locator("text=1100")).toBeVisible(); // Furniture updated total
  });

  test('Updating "Furniture" value to 2000 distributes values proportionally', async ({
    page,
  }) => {
    const furnitureInput = page.locator('input[name="Furniture"]');
    const allocationButton = page.locator("#Furniture-allocation-value");

    await furnitureInput.fill("2000");
    await allocationButton.click();

    await expect(page.locator("text=727.27")).toBeVisible(); // Tables recalculated value
    await expect(page.locator("text=1272.73")).toBeVisible(); // Chairs recalculated value
    await expect(page.locator("text=100%")).toBeVisible(); // Furniture variance
  });

  test('Variance updates correctly when changing "Electronics" value', async ({
    page,
  }) => {
    const electronicsInput = page.locator('input[name="Electronics"]');
    const allocationButton = page.locator("#Electronics-allocation-value");

    await electronicsInput.fill("1800");
    await allocationButton.click();

    await expect(page.locator("text=1800")).toBeVisible(); // Electronics new value
    await expect(page.locator("text=20.00%")).toBeVisible(); // Electronics variance
  });
});
