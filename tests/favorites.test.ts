import { expect } from "@playwright/test";
import { test } from "./fixtures/fixture";


test.describe("Favorites", () => {
  test(
    "IS-007 add to favorites",
    { tag: "@loggedUser" },
    async ({ baseURL, page }) => {
      if (!baseURL) {
        throw new Error("baseURL is not defined");
      }
      await page.locator('.v-dialog > .mx-auto').click();

      await page.goto(baseURL);
      await page.waitForTimeout(2_000);
    }
  );
});
