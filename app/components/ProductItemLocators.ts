import { Locator, Page } from "@playwright/test";

export class ProductItemLocators {
  readonly item: Locator;
  readonly itemName: Locator;
  readonly salePrice: Locator;

  constructor(page: Page) {
    this.item = page.locator(".card-grid-container");
    this.itemName = this.item.locator("[aria-label]");
    this.salePrice = page.locator('[class*="price-text--sale"]');
  }
}
