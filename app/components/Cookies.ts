import { Page } from "@playwright/test";
import { BaseView } from "@pages/base/BaseView";
import { CookiesLocators } from "./CookiesLocators";

export class Cookies extends BaseView {
  private locators: CookiesLocators;

  constructor(page: Page) {
    super(page)

    this.locators = new CookiesLocators(page);
  }

  async clickAgreeButton() {
    await this.locators.agreeButton.click();
  }
}
