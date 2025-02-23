import { Page } from "@playwright/test";
import { BaseView } from "../pages/base/BaseView";
import { BasketModalLocators } from "./BasketModalLocators";

export class BasketModal extends BaseView {
  private locators: BasketModalLocators;

  constructor(page: Page) {
    super(page);

    this.locators = new BasketModalLocators(page);
  }

  async clickNavigateToBasketButton() {
    await this.locators.navigateToBasketButton.click();
  }
}
