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

  getSectionLocator = () => this.locators.section;
  getFilterLabel = () => this.locators.section.locator(this.filterLocators.checkboxLabel);

  getFilterCheckbox(labelText: string) {
    return this.locators.section
      .locator(this.getFilterLabel(), { hasText: labelText })
      .locator("..")
      .locator(this.filterLocators.checkbox);
  }

  getAllFilterLabels = async () => await this.getFilterLabel().all();

  selectFilter = async (labelText: string) => await this.getFilterCheckbox(labelText).click();
  clickShowAllButton = async () => await this.locators.section.locator(this.filterLocators.showAllButton).click();
}
