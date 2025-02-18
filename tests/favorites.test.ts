import { expect } from "@playwright/test";
import { test } from "./fixtures/fixture";
import { PageSuffix } from "../app/pages/PageSuffix";

test.describe("Favorites", () => {
  test("IS-004 add to favorites", async ({
    catalogPage,
    baseURL,
    page,
  }) => {
  
    await catalogPage.navigateTo(baseURL + PageSuffix.CatalogPage.IPAD_AIR);
    await page
      .locator("#ipad-air-11-m2-128-gb-wi-fi-seryy-kosmos-muwc3nfa")
      .getByRole("button")
      .nth(1)
      .click();
    await page.getByRole("button", { name: "1" }).click();
    await page.getByText("Артикул: MUWC3NF/A").click();
    await expect(page.locator("apr-catalog-list-item")).toContainText(
      "Артикул: MUWC3NF/A"
    );
  });
});
