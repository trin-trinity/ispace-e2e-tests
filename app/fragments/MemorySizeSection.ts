import { Page } from "@playwright/test";
import { MemorySizeLocators } from "./MemorySizeLocators";
import { FilterLocators } from "@components/FilterLocators";
import { BaseView } from "@pages/base/BaseView";

export class MemorySizeSection extends BaseView {
  private locators: MemorySizeLocators;
  private filterLocators: FilterLocators;

  constructor(page: Page) {
    super(page);

    this.locators = new MemorySizeLocators(page);
    this.filterLocators = new FilterLocators(page);
  }

  private getFilterLabel() {
    return this.locators.section.locator(this.filterLocators.filterLabel);
  }

  getFilterCheckbox(labelText: string) {
    return this.getFilterLabel()
      .getByText(labelText)
      .locator("..")
      .locator(this.filterLocators.checkbox);
  }

  async getAllFilterLabels() {
    return this.getFilterLabel().all();
  }

  async selectFilter(labelText: string) {
    await this.getFilterCheckbox(labelText).scrollIntoViewIfNeeded()
    await this.getFilterCheckbox(labelText).click();
  }

  async collapseButtonClick() {
    await this.locators.section
      .locator(this.filterLocators.collapseButton)
      .click();
  }

  async waitSectionToBeVisible() {
    await this.waitFor(this.locators.section);
  }
}
