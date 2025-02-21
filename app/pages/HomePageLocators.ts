import { Locator, Page } from "@playwright/test";

export class HomePageLocators {
  readonly sliderBanner: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    this.sliderBanner = page.locator('picture [class="default-image"]');

    this.logo = page.locator('[class*="header-list-item logo"]');
  }
}
