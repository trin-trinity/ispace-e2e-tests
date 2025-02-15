import { test } from "./fixtures/fixture";
import { expect } from "@playwright/test";

test.describe("Filter", () => {
  test("IS-004 products by memory size", async ({ catalogPage }) => {
    await test.step("Navigate to iPhone 16 Pro catalog page", async () => {
      await catalogPage.navigateTo("https://ispace.ua/ua/iphone/iphone-16-pro");
      await catalogPage.waitForProductDataResponse();
    });

    await test.step("Click on filter sidebar", async () => {
      await catalogPage.showFilterSidebar();
    });

    await test.step("Wait for memory size section element to be visible", async () => {
      await catalogPage.filter.memorySizeSection.waitSectionToBeVisible();
    });

    await test.step("Expand all filter values", async () => {
      await catalogPage.filter.memorySizeSection.clickShowAllButton();
    });

    const selectedFilter =
      await test.step("Select random filter in memory size section", async () => {
        return catalogPage.selectRandomMemorySizeFilter();
      });

    await test.step("Wait for page to be filtered", async () => {
      await catalogPage.waitForProductDataResponse();
    });

    await test.step("Click on Show button", async () => {
      await catalogPage.filter.clickShowButton();
    });

    await test.step(`Verify that all filtered items contain selected filter: ${selectedFilter} keyword`, async () => {
      const items = await catalogPage.productItem.getAllItemNames();

      for (const item of items) {
        expect(item).toContain(selectedFilter);
      }
    });
  });

  test("IS-005 products by sale", async ({ catalogPage }) => {
    await test.step("Navigate to iPhone 16 Pro catalog page", async () => {
      await catalogPage.navigateTo("https://ispace.ua/ua/iphone/iphone-16-pro");
      await catalogPage.waitForProductDataResponse();
    });

    await test.step("Click on filter sidebar", async () => {
      await catalogPage.showFilterSidebar();
    });

    await test.step("Click on the 'Sale' filter", async () => {
      await catalogPage.selectSaleFilter();
    });

    await test.step("Wait for page to be filtered", async () => {
      await catalogPage.waitForProductDataResponse();
    });

    await test.step("Click on Show button", async () => {
      await catalogPage.filter.clickShowButton();
    });

    await test.step("Verify that all filtered items contain sale label", async () => {
      const saleIcons = await catalogPage.productItem.getAllSaleIcons();
      const saleIcon = catalogPage.productItem.getSaleIconLocator();

      for (const item of saleIcons) {
        await expect(item.locator(saleIcon)).toBeVisible();
      }
    });
  });
});
