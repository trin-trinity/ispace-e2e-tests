// TODO: Зламано

import { Page } from "@playwright/test";
import { FilterLocators } from "./FilterLocators";
import { MemorySizeSection } from "../fragments/MemorySizeSection";
import { PriceSection } from "../fragments/PriceSection";
import { BaseView } from "../pages/base/BaseView";

export class Filter extends BaseView {
  private locators: FilterLocators;

  memorySizeSection: MemorySizeSection;
  priceSection: PriceSection;

  constructor(page: Page) {
    super(page);

    this.locators = new FilterLocators(page);
    this.memorySizeSection = new MemorySizeSection(page);
    this.priceSection = new PriceSection(page);
  }

  async clickShowButton() {
    await this.locators.showButton.click();
  }
}
