import { Locator, Page } from "@playwright/test";

export class AuthLocators {
  readonly googleAuthIcon: Locator;
  readonly gEmailField: Locator;
  readonly gPasswordField: Locator;
  readonly gNextButton: Locator;

  constructor(page: Page) {
    this.googleAuthIcon = page
      .locator('.v-dialog > .mx-auto')
      .getByRole("listitem")
      .getByRole("button");
    this.gEmailField = page.locator('[aria-label="Email or phone"]');
    this.gPasswordField = page.locator('aria-label="Enter your password"');
    this.gNextButton = page.locator("button").getByText("Next");
  }
}
