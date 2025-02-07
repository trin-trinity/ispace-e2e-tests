import { test } from "./fixtures/fixture";
import { expect } from "@playwright/test";

test.describe("Search", () => {
  test("IS-001 suggestion click opens the correct results page", async ({
    homePage,
    searchResultsPage,
  }) => {
    await homePage.navigationBar.clickSearchButton();

    const randomSuggestion =
      await homePage.navigationBar.searchContainer.selectRandomSearchSuggestion();
    const keywords = await homePage.navigationBar.searchContainer.extractWords(
      randomSuggestion
    );

    await test.step("Verify that search results header contains suggestion keywords", async () => {
      await Promise.all(
        keywords.map(async (word) => {
          await expect(searchResultsPage.getHeaderLocator()).toContainText(
            word
          );
        })
      );
    });
  });
});
