import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base/BasePage";
import { ProductItem } from "@components/ProductItem";
import { IPageAssertions } from "./base/IPageAssertions";
import { FavoritePageLocators } from "./FavoritePageLocators";

export class FavoritePage extends BasePage {
  productItem: ProductItem;
  private locators: FavoritePageLocators;

  private assertions: IPageAssertions = {
    waitForIdentifiableElement: true,
  };

  constructor(page: Page) {
    super(page);

    this.productItem = new ProductItem(page);
    this.locators = new FavoritePageLocators(page);
  }

  get identifiableElement(): Locator {
    return this.locators.title;
  }

  async waitForNavigation() {
    await this.waitFor(this.identifiableElement)
  }
}
