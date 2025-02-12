import { Page } from "@playwright/test";
import { ProductItemLocators } from "./ProductItemLocators";

export class ProductItem {
  private page: Page;
  private locators: ProductItemLocators;

  constructor(page: Page) {
    this.page = page;

    this.locators = new ProductItemLocators(page);
  }

  getItemNameLocator = () => this.locators.itemName;
  
  async getAllItemNames() {
    const locators = await this.getItemNameLocator().all();

    const itemNames: string[] = []

    for (const locator of locators) {
      const itemName = await locator.textContent()
      if (itemName !== null) {
        itemNames.push(itemName);
      }
    }

    return itemNames
  } 

}