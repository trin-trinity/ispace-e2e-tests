import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Filter } from "../components/Filter";
import { CatalogPageLocators } from "./CatalogPageLocators";
import { ProductItem } from "../components/ProductItem";
import { RandomSelector } from "../core/RandomSelector";

export class CatalogPage extends BasePage {
  private locators: CatalogPageLocators;
  filter: Filter;
  productItem: ProductItem;

  constructor(page: Page) {
    super(page);

    this.locators = new CatalogPageLocators(this.page);
    this.filter = new Filter(page);
    this.productItem = new ProductItem(page);
  }

  async navigateTo(url: string) {
    await super.navigateTo(url);
  }

  async waitMemorySizeSectionToBeVisible() {
    const section = this.filter.memorySizeSection.getSectionLocator();
    await super.waitForLocatorToBeVisible(section);
  }

  async waitForResponse() {
    await super.waitForResponse("https://ispace.ua/ua/api/2Rpx2WuW7fQlSXR/11");
  }

  showFilterSidebar = async () => await this.locators.showFiltersButton.click();

  async selectRandomMemorySizeFilter() {
    const allLabels = await this.filter.memorySizeSection.getAllFilterLabels();
    const randomFilter = await RandomSelector.getRandomText(allLabels);

    await this.filter.memorySizeSection.selectFilter(randomFilter);
    return randomFilter;
  }
}
