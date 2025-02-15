import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Filter } from "../components/Filter";
import { CatalogPageLocators } from "./CatalogPageLocators";
import { ProductItem } from "../components/ProductItem";
import { RandomSelector } from "../../utils/RandomSelector";

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

  async waitForProductDataResponse() {
    await this.page.waitForResponse(
      "https://ispace.ua/ua/api/2Rpx2WuW7fQlSXR/11"
    );
  }

  async showFilterSidebar() {
    return this.locators.showFiltersButton.click();
  }

  async selectRandomMemorySizeFilter() {
    const allLabels = await this.filter.memorySizeSection.getAllFilterLabels();
    const randomFilter = await RandomSelector.getRandomText(allLabels);

    await this.filter.memorySizeSection.selectFilter(randomFilter);
    return randomFilter;
  }

  async selectSaleFilter() {
    await this.filter.priceSection.selectFilter("акції");
  }
}
