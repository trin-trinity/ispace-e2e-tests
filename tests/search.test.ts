import { test } from "./fixtures/fixture";
import { expect } from "@playwright/test";

test("IS-001 suggestion click opens the correct results page", async ({
  homePage,
  searchResultsPage,
}) => {
  await test.step("Click on search bar", async () => {
    await homePage.navigationBar.clickSearchButton();
  });

  const randomSuggestion =
    await test.step("Select a random search suggestion", async () => {
      return await homePage.navigationBar.searchContainer.selectRandomSearchSuggestion();
    });

  const keywords =
    await test.step("Extract keywords from selected suggestion", async () => {
      return homePage.navigationBar.searchContainer.extractWords(
        randomSuggestion
      );
    });

  await test.step("Verify that search results header contains suggestion keywords", async () => {
    await Promise.all(
      keywords.map(async (word) => {
        await expect(searchResultsPage.getHeaderLocator()).toContainText(word);
      })
    );
  });
});
