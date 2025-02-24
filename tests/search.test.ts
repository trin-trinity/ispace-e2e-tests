import { testData } from "@data/testData";
import { test } from "@fixtures/fixture";
import { expect } from "@playwright/test";

test.describe("Search", () => {
  test("IS-001 for a dummy string returns no results", async ({
    homePage,
    searchResultsPage,
  }) => {
    await test.step("Navigate to home page", async () => {
      await homePage.navigateTo();
    });

    await test.step("Click on search icon", async () => {
      await homePage.navigationBar.clickSearchIcon();
    });

    await test.step(`Search for a query: ${testData.dummyString}`, async () => {
      await homePage.navigationBar.search.searchForQuery(testData.dummyString);
    });

    await test.step("Verify that product count is zero", async () => {
      await expect(searchResultsPage.getProductCountLocator()).toContainText(
        "0"
      );
    });

    await test.step("Verify that search results are empty", async () => {
      await expect(searchResultsPage.getEmptyTextLocator()).toBeVisible();
    });
  });

  for (const product of testData.products) {
    test(`IS-002 for ${product} returns searched keyword in header`, async ({
      homePage,
      searchResultsPage,
    }) => {
      await test.step("Navigate to home page", async () => {
        await homePage.navigateTo();
      });

      await test.step("Click on search icon", async () => {
        await homePage.navigationBar.clickSearchIcon();
      });

      await test.step(`Search for a query: ${product}`, async () => {
        await homePage.navigationBar.search.searchForQuery(product);
      });

      await test.step("Wait for product to be visible", async () => {
        await searchResultsPage.waitProductItemToBeVisible();
      });

      await test.step(`Verify that header on search results contains ${product} keyword`, async () => {
        const header = searchResultsPage.getHeaderTitle();
        await expect(header).toContainText(product);
      });
    });
  }
});
