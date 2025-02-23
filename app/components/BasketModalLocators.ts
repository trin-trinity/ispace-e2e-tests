import { Locator, Page } from "@playwright/test";

export class BasketModalLocators {
  readonly navigateToBasketButton: Locator;

  constructor(page: Page) {
    this.navigateToBasketButton = page
      .locator('[class*="bottom-bar"] button')
      .getByText("У кошик");
  }
}

//await page.getByRole('button', { name: 'У кошик' }).click();