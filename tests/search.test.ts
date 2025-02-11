import { get } from "http";
import { testData } from "../app/data/testData";
import { test } from "./fixtures/fixture";
import { expect } from "@playwright/test";

test.describe("Search", () => {
  test("IS-001 suggestion click opens the correct results page", async ({
    homePage,
    searchResultsPage,
  }) => {
    await test.step("Click on search bar", async () => {
      await homePage.navigationBar.clickSearchButton();
    });

    const randomSuggestion =
      await test.step("Select a random search suggestion", async () => {
        return homePage.selectRandomSearchSuggestion();
      });

    const keywords =
      await test.step("Extract keywords from selected suggestion", async () => {
        return homePage.extractWords(randomSuggestion);
      });

    await test.step("Verify that search results header contains suggestion keywords", async () => {
      await searchResultsPage.waitForLocatorToBeVisible(searchResultsPage.getHeaderLocator());
      await Promise.all(
        keywords.map(async (word) => {
          await expect(searchResultsPage.getHeaderLocator()).toContainText(
            word
          );
        })
      );
    });
  });

  test("IS-002 for a dummy string returns no results", async ({
    homePage,
    searchResultsPage,
  }) => {
    await test.step("Click on search bar", async () => {
      await homePage.navigationBar.clickSearchButton();
    });

    await test.step(`Search for a query: ${testData.dummyString}`, async () => {
      await homePage.navigationBar.search.searchForQuery(testData.dummyString);
    });

    await test.step("Verify that search results count is zero", async () => {
      await expect(searchResultsPage.getDefaultInfoLocator()).toContainText(
        "0"
      );
    });

    await test.step("Verify that search results are empty", async () => {
      await expect(searchResultsPage.getSearchResultsLocator()).toBeEmpty();
    });
  });

  for (const product of testData.products) {
    test(`IS-003 categories product names include the searched product keyword: ${product}`, async ({
      homePage,
      searchResultsPage,
    }) => {
      await test.step("Click on search bar", async () => {
        await homePage.navigationBar.clickSearchButton();
      });

      await test.step(`Search for a query: ${product}`, async () => {
        await homePage.navigationBar.search.searchForQuery(product);
      });

      await test.step(`Verify that products in categories contain ${product} keyword`, async () => {
        await searchResultsPage.waitForLocatorToBeVisible(searchResultsPage.getProductLocator().first())
          
        const products = await searchResultsPage.getProductLocator().all();
        
        for (const item of products) {
          await expect(item).toContainText(product, {ignoreCase: true})
        }
      });
    });
  }
});
