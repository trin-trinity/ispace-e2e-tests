import { expect } from "@playwright/test";
import { test } from "@fixtures/fixture";
import { CatalogPage } from "@pages/PageSuffix";

test.describe("Favorites", () => {
  test(
    "IS-005 add item should be successful",
    { tag: "@loggedUser" },
    async ({ baseURL, catalogPage, homePage, favoritesPage }) => {
      await test.step("Navigate to iPad Air catalog page", async () => {
        await catalogPage.navigateTo(baseURL + CatalogPage.IPAD_AIR);
      });

      const favoriteProductArticleText =
        await test.step("Add random product to favorites", async () => {
          // This waiter fix incorrect click to basket button
          await catalogPage.navigationBar.awaitFavoritesIcon();
          
          const randomItem = await catalogPage.getRandomProductItem();
          await catalogPage.productItem.clickFavoritesIcon(randomItem);

          return catalogPage.productItem.getArticleText(randomItem);
        });

      await test.step("Navigate to favorites page", async () => {
        
        await homePage.navigationBar.clickFavoritesIcon();
        await favoritesPage.waitForNavigation();
      });

      await test.step("Verify previously added product is displayed in the 'Favorites' page", async () => {
        const firstItem = favoritesPage.productItem.getItemLocator().first();
        const articleText = await catalogPage.productItem.getArticleText(
          firstItem
        );

        expect(articleText).toEqual(favoriteProductArticleText);
      });
    }
  );
});
