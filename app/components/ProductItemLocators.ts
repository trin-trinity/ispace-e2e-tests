import { Locator, Page } from "@playwright/test";

export class ProductItemLocators {
  readonly itemName: Locator;

  constructor(page: Page) {
    this.itemName = page.locator(".item-name");
  }
}
