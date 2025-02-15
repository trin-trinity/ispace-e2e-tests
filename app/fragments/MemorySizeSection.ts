import { Page } from "@playwright/test";
import { MemorySizeLocators } from "./MemorySizeLocators";
import { FilterLocators } from "../components/FilterLocators";

export class MemorySizeSection {
  private page: Page;
  private locators: MemorySizeLocators;
  private filterLocators: FilterLocators;

  constructor(page: Page) {
    this.page = page;
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
    await section.waitFor({ state: "visible", timeout: 10000 });
  }
}
