import { Locator, Page } from "@playwright/test";

export class MemorySizeLocators {
  readonly section: Locator;

  constructor(page: Page) {
    this.section = page
      .locator('[class*="filter-header"] [class*=text-h6]')
      .getByText("Розмір внутрішньої пам'яті")
      .locator(
        'xpath=ancestor::*[contains(@class, "filters-container")]'
      );
  }
}
