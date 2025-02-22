// TODO: Зламано

import { Page } from "@playwright/test";
import { ProductItemLocators } from "./ProductItemLocators";
import { BaseView } from "../pages/base/BaseView";
import { it } from "node:test";

export class ProductItem extends BaseView {
  private locators: ProductItemLocators;

  constructor(page: Page) {
    super(page);

    this.locators = new ProductItemLocators(page);
  }

  private async getItemNamesLocators() {
    const allItems = await this.locators.itemName.all()

    const results = await Promise.all(
      allItems.map(async (item) => {
        const text = await item.textContent();
        if (text !== null && !text.toLowerCase().includes("артикул")) {
          return item;
        }
        return null;
      })
    );

    const filteredItems = results.filter((item) => item !== null);
    return filteredItems;
  }

  async getAllProductItems() {
    return this.locators.item.all();
  }

  async getAllItemNames() {
    const locators = await this.getItemNamesLocators()

    const itemNames: string[] = [];

    for (const locator of locators) {
      const itemName = await locator.textContent();
      if (itemName !== null) {
        itemNames.push(itemName);
      }
    }

    return itemNames;
  }

  getSalePriceLocator() {
    return this.locators.salePrice;
  }

  getItemLocator() {
    return this.locators.item;
  }
}
