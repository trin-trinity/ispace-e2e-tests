import { Locator, Page } from "@playwright/test";

export class HomePageLocators {
  readonly sliderBanner: Locator;

  constructor(page: Page) {
    this.sliderBanner = page.locator('picture [class="default-image"]');
  }
}
