// TODO: Зламано

import { Locator, Page } from "@playwright/test";

export class ProductItemLocators {
  readonly itemName: Locator;
  readonly saleIcons: Locator;
  readonly saleIcon: Locator;

  constructor(page: Page) {
    this.itemName = page.locator(".item-name");
    this.saleIcons = page.locator('[class="sale-icons"]');
    this.saleIcon = page.locator(".icon-red", { hasText: "Акція" });
  }
}
