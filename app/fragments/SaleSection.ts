import { Page } from "@playwright/test";
import { SaleLocators } from "./SaleLocators";
import { BaseView } from "@pages/base/BaseView";

export class SaleSection extends BaseView {
  private locators: SaleLocators;

  constructor(page: Page) {
    super(page);

    this.locators = new SaleLocators(page);
  }

  async waitSectionToBeVisible() {
    await this.waitFor(this.locators.section);
  }

  async clickSaleToggle() {
    await this.locators.toggle.click();
  }
}
