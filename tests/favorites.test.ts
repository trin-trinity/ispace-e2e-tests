import { expect } from "@playwright/test";
import { test } from "./fixtures/fixture";
import { CatalogPage } from "../app/pages/PageSuffix";
import { fi } from "@faker-js/faker";

test.describe("Favorites", () => {
  test(
    "IS-005 add item should be successful",
    { tag: "@loggedUser" },
    async ({ baseURL, catalogPage, homePage, page, favoritesPage }) => {
      await test.step("Navigate to iPad Air catalog page", async () => {
        await catalogPage.navigateTo(baseURL + CatalogPage.IPAD_AIR);
      });

      const favoriteProductArticleText =
        await test.step("Add random product to favorites", async () => {
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
