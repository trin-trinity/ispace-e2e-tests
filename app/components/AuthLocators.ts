import { Locator, Page } from "@playwright/test";

export class AuthLocators {
  readonly googleAuthIcon: Locator;
  readonly gEmailField: Locator;
  readonly gPasswordField: Locator;
  readonly gNextButton: Locator;

  constructor(page: Page) {
    // I know, this locator is awful. But otherwise it is impossible to find it.
    this.googleAuthIcon = page
      .locator(".v-dialog > .mx-auto")
      .getByRole("listitem")
      .getByRole("button");
    this.gEmailField = page.locator('[type="email"]');
    this.gPasswordField = page.locator('[type="password"]');
    this.gNextButton = page.locator("button").getByText("Next");
  }
}
