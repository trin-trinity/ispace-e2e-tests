import { Page } from "@playwright/test";
import { BaseView } from "@pages/base/BaseView";
import { AuthLocators } from "./AuthLocators";

export class AuthPopUp extends BaseView {
  private locators: AuthLocators;
  constructor(page: Page) {
    super(page);

    this.locators = new AuthLocators(page);
  }

  async clickGoogleAuth() {
    await this.locators.googleAuthIcon.click();
  }

  async waitForEmailField() {
    await this.waitFor(this.locators.gEmailField);
  }

  async waitForPassWindow() {
    await super.waitFor(this.locators.gPasswordField);
  }
  async fillEmailField(email: string) {
    await this.locators.gEmailField.fill(email);
  }

  async fillPassField(pass: string) {
    await this.locators.gPasswordField.fill(pass);
  }

  async clickNextButton() {
    await this.locators.gNextButton.click();
  }
}
