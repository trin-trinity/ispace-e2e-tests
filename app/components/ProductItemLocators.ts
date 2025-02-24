import { Locator, Page } from "@playwright/test";

export class ProductItemLocators {
  readonly item: Locator;
  readonly title: Locator;
  readonly article: Locator;
  readonly salePrice: Locator;
  readonly favoriteIcon: Locator;
  readonly addToBasketButton: Locator;

  constructor(page: Page) {
    this.item = page.locator(".card-grid-container");
    this.title = page.locator("[aria-label]").first();
    this.article = page.locator("[aria-label]").nth(1);
    this.salePrice = page.locator('[class*="price-text--sale"]');
    this.favoriteIcon = page.locator('[class="favorite-btn"]');
    this.addToBasketButton = page
      .locator('[type="button"][class*="ui-btn"]')
      .locator('[class*="content"]')
      .getByText("Додати в кошик");
  }
}
