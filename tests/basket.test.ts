import { expect } from "@playwright/test";
import { test } from "./fixtures/fixture";
import { CatalogPage } from "../app/pages/PageSuffix";

test.describe("Basket", () => {
  test(
    "IS-007 add product should be successful",
    { tag: ["@loggedUser", "@basket"] },
    async ({ baseURL, catalogPage, basketPage }) => {
      await test.step("Navigate to iPhone 16 Pro catalog page", async () => {
        await catalogPage.navigateTo(baseURL + CatalogPage.IPHONE_16_PRO);
      });

      const addedItemArticleText =
        await test.step("Add random item to basket", async () => {
          const randomItem = await catalogPage.getRandomProductItem();
          await catalogPage.productItem.clickAddToBasketButton(randomItem);

          return (
            await catalogPage.productItem.getArticleText(randomItem)
          ).toLowerCase();
        });

      await test.step("Navigate to basket page", async () => {
        await catalogPage.basketModal.clickNavigateToBasketButton();

        await basketPage.waitProductItemToBeVisible();
      });

      await test.step("Verify previously added product is displayed in the 'Basket' page", async () => {
        const firstProductItem = basketPage.getProductItemLocator().first();
        const articleNumber = await basketPage.extractArticleNumber(
          firstProductItem
        );

        expect(addedItemArticleText).toContain(articleNumber);
      });
    }
  );
});
