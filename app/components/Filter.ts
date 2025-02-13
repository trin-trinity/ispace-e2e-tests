import { Page } from "@playwright/test";
import { FilterLocators } from "./FilterLocators";
import { MemorySizeSection } from "../fragments/MemorySizeSection";

export class Filter {
  private page: Page;
  private locators: FilterLocators;

  memorySizeSection: MemorySizeSection;

  constructor(page: Page) {
    this.page = page;

    this.locators = new FilterLocators(page);
    this.memorySizeSection = new MemorySizeSection(page);
  }

  async clickShowButton() {
    await this.locators.showButton.click();
  }
}
