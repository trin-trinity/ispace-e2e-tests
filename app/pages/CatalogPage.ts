import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base/BasePage";
import { Filter } from "../components/Filter";
import { CatalogPageLocators } from "./CatalogPageLocators";
import { ProductItem } from "../components/ProductItem";
import { RandomSelector } from "../../helpers/RandomSelector";
import { IPageAssertions } from "./base/IPageAssertions";
import { th } from "@faker-js/faker";

export class CatalogPage extends BasePage {
  // TODO: Remove if needed
  private locators: CatalogPageLocators;
  filter: Filter;
  productItem: ProductItem;

  private assertions: IPageAssertions = {
    waitForIdentifiableElement: true,
    waitForResponseUrl:
      "https://ispaceua.helpcrunch.com/api/v2/applications/9e4b2ad5-acd2-42cc-a179-7252dbb656ac",
  };

  constructor(page: Page) {
    super(page);

    this.locators = new CatalogPageLocators(this.page);
    this.filter = new Filter(page);
    this.productItem = new ProductItem(page);
  }

  get identifiableElement(): Locator {
    return this.productItem.getItemLocator().first();
  }

  async waitProductItemToBeVisible() {
    await this.waitFor(this.productItem.getItemLocator().first());
  }

  async navigateTo(url?: string): Promise<void> {
    await super.navigateTo(url, this.assertions);
  }

  async selectRandomMemorySizeFilter() {
    const allLabels = await this.filter.memorySizeSection.getAllFilterLabels();
    const randomFilter = await RandomSelector.getRandomText(allLabels);

    await this.filter.memorySizeSection.selectFilter(randomFilter);
    return randomFilter;
  }

  async getAllProductItemTitles() {
    const items = this.productItem.getItemLocator().all();
    const title = this.productItem.getTitleLocator();

    const titles = (await items).map((item) => {
      return item.locator(title);
    });

    return titles;
  }

  async getAllProductSalePrices() {
    const items = this.productItem.getItemLocator().all();
    const salePrice = this.productItem.getSalePriceLocator();

    const prices = (await items).map((item) => {
      return item.locator(salePrice);
    });

    return prices;
  }

  async getRandomProductItem() {
    const items = await this.productItem.getItemLocator().all();
    const i = Math.floor(Math.random() * items.length);
    const randomItem = items[i];

    return randomItem;
  }
}
