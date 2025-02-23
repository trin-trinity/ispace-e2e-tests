import { Locator, Page } from "@playwright/test";

export class BasketPageLocators {
  readonly title: Locator;
  readonly productItem: Locator;
  readonly productArticle: Locator;

  constructor(page: Page) {
    this.title = page.locator('h1[class*="text-subtitle"]').getByText("Кошик");
    this.productItem = page.locator('[class="checkout-card-product"]');
    this.productArticle = page.locator('[class*="text-body"]');
  }
}
