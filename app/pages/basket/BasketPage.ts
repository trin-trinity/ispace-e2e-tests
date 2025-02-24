import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { IPageAssertions } from "../base/IPageAssertions";
import { BasketPageLocators } from "./BasketPageLocators";

export class BasketPage extends BasePage {
  private locators: BasketPageLocators;

  private assertions: IPageAssertions = {
    waitForIdentifiableElement: true,
  };

  constructor(page: Page) {
    super(page);

    this.locators = new BasketPageLocators(page);
  }

  get identifiableElement(): Locator {
    return this.locators.title;
  }

  async waitProductItemToBeVisible() {
    const firsItem = this.locators.productItem.first();
    await this.waitFor(firsItem);
  }

  async waitForNavigation() {
    await this.waitFor(this.identifiableElement);
  }

  async navigateTo(url?: string): Promise<void> {
    await super.navigateTo(url, this.assertions);
  }

  getProductItemLocator() {
    return this.locators.productItem;
  }

  async extractArticleNumber(productItem: Locator) {
    const articleText = await this.getProductArticleText(productItem);

    const regex = /артикул:\s*([\s\S]+)/i;
    const extractedArticle = articleText.toLowerCase().match(regex);
    if (!extractedArticle) {
      throw new Error(
        `Failed to extract article value from string: "${articleText}"`
      );
    }
    return extractedArticle[1].trim();
  }

  private async getProductArticleText(productItem: Locator) {
    const text = await productItem
      .locator(this.locators.productArticle)
      .textContent();
    if (text === null) {
      throw new Error("Can't get text of product item, text is null");
    }
    return text;
  }
}
