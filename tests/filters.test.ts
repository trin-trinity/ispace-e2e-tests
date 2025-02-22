// TODO: Зламано

import { test } from "./fixtures/fixture";
import { expect } from "@playwright/test";
import { CatalogPage } from "../app/pages/PageSuffix";

test.describe("Filter", () => {
  test("IS-003 products by memory size", async ({ catalogPage, baseURL }) => {
    await test.step("Navigate to iPhone 16 Pro catalog page", async () => {
      await catalogPage.navigateTo(baseURL + CatalogPage.IPHONE_16_PRO);
    });

    await test.step("Wait for memory size section element to be visible", async () => {
      await catalogPage.filter.memorySizeSection.waitSectionToBeVisible();
    });

    await test.step("Expand all filter values", async () => {
      await catalogPage.filter.memorySizeSection.collapseButtonClick();
    });

    const selectedFilter =
      await test.step("Select random filter in memory size section", async () => {
        return catalogPage.selectRandomMemorySizeFilter();
      });

    await test.step("Wait for page to be filtered", async () => {
      await catalogPage.waitProductItemToBeVisible();
    });

    await test.step(`Verify that all filtered items contain selected filter: ${selectedFilter} keyword`, async () => {
      const items = await catalogPage.productItem.getAllItemNames();

      for (const item of items) {
        expect(item).toContain(selectedFilter);
      }
    });
  });

  test("IS-004 products by sale price", async ({ catalogPage, baseURL }) => {
    await test.step("Navigate to iPhone 16 Pro catalog page", async () => {
      await catalogPage.navigateTo(baseURL + CatalogPage.IPHONE_16_PRO);
    });

    await test.step("Wait for sale option in filter to be visible", async () => {
      await catalogPage.filter.saleSection.waitSectionToBeVisible();
    });

    await test.step("Enable 'Sale' filter", async () => {
      await catalogPage.filter.saleSection.clickSaleToggle();
    });

    await test.step("Wait for page to be filtered", async () => {
      await catalogPage.waitProductItemToBeVisible();
    });

    await test.step("Verify that all filtered items contain sale price", async () => {
      const productItems = await catalogPage.productItem.getAllProductItems();
      const salePrice = catalogPage.productItem.getSalePriceLocator();

      for (const item of productItems) {
        await expect(item.locator(salePrice)).toBeVisible();
      }
    });
  });
});
