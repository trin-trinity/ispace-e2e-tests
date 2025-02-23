import { Locator, Page } from "@playwright/test";
import { ProductItemLocators } from "./ProductItemLocators";
import { BaseView } from "../pages/base/BaseView";

export class ProductItem extends BaseView {
  private locators: ProductItemLocators;

  constructor(page: Page) {
    super(page);

    this.locators = new ProductItemLocators(page);
  }

  getSalePriceLocator() {
    return this.locators.salePrice;
  }

  getItemLocator() {
    return this.locators.item;
  }

  getTitleLocator() {
    return this.locators.title;
  }

  getArticleLocator() {
    return this.locators.article;
  }

  async clickFavoritesIcon(productItem: Locator) {
    await productItem.locator(this.locators.favoriteIcon).click();
  }

  async getArticleText(productItem: Locator) {
    const text = await productItem.locator(this.locators.article).textContent();
    if (text === null) {
      throw new Error("Can't get text of product item, text is null");
    }
    return text;
  }
}
