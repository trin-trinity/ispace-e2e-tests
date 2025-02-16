import { expect, Page } from "@playwright/test";
import { MemorySizeLocators } from "./MemorySizeLocators";
import { FilterLocators } from "../components/FilterLocators";
import { BaseView } from "../pages/base/BaseView";

export class MemorySizeSection extends BaseView {
  private locators: MemorySizeLocators;
  private filterLocators: FilterLocators;

  constructor(page: Page) {
    super(page)
    
    this.locators = new MemorySizeLocators(page);
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

  async clickShowAllButton() {
    await this.locators.section
      .locator(this.filterLocators.showAllButton)
      .click();
  }

  async waitSectionToBeVisible() {
    const section = this.locators.section;
    this.waitFor(section);
  }
}
