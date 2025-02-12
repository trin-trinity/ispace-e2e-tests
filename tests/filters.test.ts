import { testData } from "../app/data/testData";
import { test } from "./fixtures/fixture";
import { expect } from "@playwright/test";

test.describe("Filter", () => {
  test("IS-004 products by internal memory size", async({ catalogPage, page }) => {
   
    const response1 = page.waitForResponse(
      "https://ispace.ua/ua/api/2Rpx2WuW7fQlSXR/11"
    );
    await response1;
    

    await catalogPage.showFiltersSidebar();
    
    // await catalogPage.waitForLocatorToBeVisible(
    //   catalogPage.filter.getMemorySizeLabel().first()
    // );

    await catalogPage.waitForLocatorToBeVisible(
      catalogPage.filter.getShowAllButtonLocator(catalogPage.filter.getMemorySizeSection())
    );

    await catalogPage.filter.clickShowAllButton(catalogPage.filter.getMemorySizeSection())

    const selectedFilter = await catalogPage.selectRandomMemorySizeFilter();
    /// wait for request

    const response2 = page.waitForResponse(
      "https://ispace.ua/ua/api/2Rpx2WuW7fQlSXR/11"
    );
    await response2


    await catalogPage.filter.clickShowButton();

    const items = await catalogPage.productItem.getAllItemNames()

    for (const item of items) {
      expect(item).toContain(selectedFilter)
    }
  });
});