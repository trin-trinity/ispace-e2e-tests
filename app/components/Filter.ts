import { Page } from "@playwright/test";
import { FilterLocators } from "./FilterLocators";
import { MemorySizeSection } from "../fragments/MemorySizeSection";
import { PriceSection } from "../fragments/PriceSection";

export class Filter {
  private page: Page;
  private locators: FilterLocators;

  memorySizeSection: MemorySizeSection;
  priceSection: PriceSection;

  constructor(page: Page) {
    this.page = page;

    this.locators = new FilterLocators(page);
    this.memorySizeSection = new MemorySizeSection(page);
    this.priceSection = new PriceSection(page);
  }

  async clickShowButton() {
    await this.locators.showButton.click();
  }
}
