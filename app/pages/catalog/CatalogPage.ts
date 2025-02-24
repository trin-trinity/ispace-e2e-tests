import { Locator, Page } from "@playwright/test";
import { BasePage } from "@pages/base/BasePage";
import { Filter } from "@components/Filter";
import { ProductItem } from "@components/ProductItem";
import { RandomSelector } from "@helpers/RandomSelector";
import { IPageAssertions } from "@pages/base/IPageAssertions";
import { BasketModal } from "@components/BasketModal";
import { NavigationBar } from "@components/NavigationBar";

export class CatalogPage extends BasePage {
  filter: Filter;
  navigationBar: NavigationBar
  productItem: ProductItem;
  basketModal: BasketModal

  private assertions: IPageAssertions = {
    waitForIdentifiableElement: true,
  };

  constructor(page: Page) {
    super(page);

    this.filter = new Filter(page);
    this.productItem = new ProductItem(page);
    this.basketModal = new BasketModal(page);
    this.navigationBar = new NavigationBar(page);
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
