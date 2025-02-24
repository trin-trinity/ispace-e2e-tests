import { expect } from "@playwright/test";
import { test } from "@fixtures/fixture";
import { CatalogPage } from "@pages/PageSuffix";

test.describe("Product details", () => {
  test("IS-006 scroll screenshots should be successful", async ({
    baseURL,
    catalogPage,
    productDetailsPage,
  }) => {
    await test.step("Navigate to iPhone 16 Pro catalog page", async () => {
      await catalogPage.navigateTo(baseURL + CatalogPage.IPHONE_16_PRO);
    });

    await test.step("Click on random item", async () => {
      const randomItem = await catalogPage.getRandomProductItem();
      await randomItem.click();

      await productDetailsPage.waitForNavigation();
    });

    await test.step("Swipe product pictures to the last one", async () => {
      const picturesCount = await productDetailsPage.getPicturesCount();

      await productDetailsPage.clickNextSlideButton(picturesCount);
    });

    await test.step("Verify last picture is active", async () => {
      const pictures = await productDetailsPage.getAllPicturesLocators();
      const lastPicture = productDetailsPage.getLastPictureLocator(pictures);

      const lastPictureSource = await productDetailsPage.getPictureSource(
        lastPicture
      );

      const activePictureSource =
        await productDetailsPage.getActivePictureSource();

      expect(activePictureSource).toEqual(lastPictureSource);
    });
  });
});
