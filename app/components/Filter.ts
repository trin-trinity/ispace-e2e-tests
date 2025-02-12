import { Locator, Page } from "@playwright/test";
import { FilterLocators } from "./FilterLocators";

export class Filter {
  private page: Page;
  private locators: FilterLocators;

  constructor(page: Page) {
    this.page = page;

    this.locators = new FilterLocators(page);
  }

  getMemorySizeSection = () => this.locators.memorySizeSection;

  getMemorySizeLabel = () =>
    this.locators.memorySizeSection.locator(this.locators.checkboxLabel);

  getMemorySizeCheckbox(labelText: string): Locator {
    return this.locators.memorySizeSection
      .locator(this.locators.checkboxLabel, { hasText: labelText })
      .locator("..")
      .locator(this.locators.checkbox);
  }

  getAllMemorySizeLabels = async () => await this.getMemorySizeLabel().all();
  

  selectMemorySizeFilter= async (labelText: string) => await this.getMemorySizeCheckbox(labelText).click();

  clickShowButton = async () => await this.locators.showButton.click();

  getShowAllButtonLocator = (section: Locator) => section.locator(this.locators.showAllButton)
  
  clickShowAllButton = async (section: Locator) =>
    await section.locator(this.locators.showAllButton).click();
}
