import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Filter } from "../components/Filter";
import { CatalogPageLocators } from "./CatalogPageLocators";
import { ProductItem } from "../components/ProductItem";

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

  async waitForLocatorToBeVisible(locator: Locator, timeout?: number) {
    await super.waitForLocatorToBeVisible(locator, timeout);
  }

  getFiltersSidebarLocator = () => this.locators.showFiltersButton;

  showFiltersSidebar = async () => await this.locators.showFiltersButton.click();

  private async getRandomMemorySizeFilter() {
    const filters: string[] = [];

    const memorySizeFilters = await this.filter.getAllMemorySizeLabels();

    for (const filter of memorySizeFilters) {
      const text = await filter.textContent();

      if (text !== null) {
        filters.push(text.trim());
      }
    }

    const i = Math.floor(Math.random() * filters.length);
    const randomFilter = filters[i];

    return randomFilter;
  }

  async selectRandomMemorySizeFilter() {
    const randomFilter = await this.getRandomMemorySizeFilter();

    await this.filter.selectMemorySizeFilter(randomFilter);
    return randomFilter;
  }
}
