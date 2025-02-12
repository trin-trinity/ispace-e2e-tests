import { testData } from "../app/data/testData";
import { test } from "./fixtures/fixture";
import { expect } from "@playwright/test";

test.describe("Filter", () => {
  test("IS-004 products by memory size", async ({ catalogPage, page }) => {
    await test.step("Click on filter sidebar", async () => {
      await catalogPage.showFilterSidebar();
    });

    await test.step("Wait for memory size section element to be visible", async () => {
      await catalogPage.waitMemorySizeSectionToBeVisible();
    });

    await test.step("Expand all filter values", async () => {
      await catalogPage.filter.memorySizeSection.clickShowAllButton();
    });

    const selectedFilter =
      await test.step("Select random filter in memory size section", async () => {
        return await catalogPage.selectRandomMemorySizeFilter();
      });

    await test.step("Wait for page to be filtered", async () => {
      await catalogPage.waitForResponse();
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
});
