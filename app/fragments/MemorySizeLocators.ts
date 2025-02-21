// TODO: Зламано

import { Locator, Page } from "@playwright/test";

export class MemorySizeLocators {
  readonly section: Locator;

  constructor(page: Page) {
    this.section = page
      .locator("p")
      .getByText("Розмір внутрішньої пам'яті")
      .locator("xpath=./ancestor::apr-sidenav-filter-item");
  }
}
