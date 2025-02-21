// TODO: Зламано

import { Page } from "@playwright/test";
import { ProductItemLocators } from "./ProductItemLocators";
import { BaseView } from "../pages/base/BaseView";

export class ProductItem extends BaseView {
  private locators: ProductItemLocators;

  constructor(page: Page) {
    super(page);

    this.locators = new ProductItemLocators(page);
  }

  private getItemNameLocator() {
    return this.locators.itemName;
  }

  async getAllItemNames() {
    const locators = await this.getItemNameLocator().all();

    const itemNames: string[] = [];

    for (const locator of locators) {
      const itemName = await locator.textContent();
      if (itemName !== null) {
        itemNames.push(itemName);
      }
    }

    return itemNames;
  }

  async getAllSaleIcons() {
    return this.locators.saleIcons.all();
  }

  getSaleIconLocator() {
    return this.locators.saleIcon;
  }
}
