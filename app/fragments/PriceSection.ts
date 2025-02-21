// TODO: Зламано

import { Page } from "@playwright/test";
import { FilterLocators } from "../components/FilterLocators";
import { PriceLocators } from "./PriceLocators";
import { BaseView } from "../pages/base/BaseView";

export class PriceSection extends BaseView {
  private locators: PriceLocators;
  private filterLocators: FilterLocators;

  constructor(page: Page) {
    super(page);

    this.locators = new PriceLocators(page);
    this.filterLocators = new FilterLocators(page);
  }

  private getFilterLabel() {
    return this.locators.section.locator(this.filterLocators.checkboxLabel);
  }

  getFilterCheckbox(labelText: string) {
    return this.locators.section
      .locator(this.getFilterLabel(), { hasText: labelText })
      .locator("..")
      .locator(this.filterLocators.checkbox);
  }

  async getAllFilterLabels() {
    return this.getFilterLabel().all();
  }

  async selectFilter(labelText: string) {
    await this.getFilterCheckbox(labelText).click();
  }

  async waitSectionToBeVisible() {
    const section = this.locators.section;
    await this.waitFor(section);
  }
}
