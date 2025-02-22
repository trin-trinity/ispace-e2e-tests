import { expect } from "@playwright/test";
import { test } from "./fixtures/fixture";
import { CatalogPage } from "../app/pages/PageSuffix";

test.describe("Favorites", () => {
  test(
    "IS-005 add item should be successful",
    { tag: "@loggedUser" },
    async ({ baseURL, catalogPage, homePage, page, favoritesPage }) => {
      await test.step("Navigate to iPad Air catalog page", async () => {
        await catalogPage.navigateTo(baseURL + CatalogPage.IPAD_AIR);
      });

      const selectedItem =
        await test.step("Add random product to favorites", async () => {
          return catalogPage.addRandomItemToFavorites();
        });

      await test.step("Navigate to favorites page", async () => {
        await homePage.navigationBar.clickFavoritesIcon();
      });

      await test.step("Verify previously added product is displayed in the Favorites page ", async () => {
        const firstItem = favoritesPage.productItem.getItemLocator().first();
        const articleTitle = await favoritesPage.productItem.getItemArticle(firstItem);

        console.log("articleTitle:" + ( articleTitle));
        
        await expect(articleTitle).toContain(selectedItem);
      });
    }
  );
});
