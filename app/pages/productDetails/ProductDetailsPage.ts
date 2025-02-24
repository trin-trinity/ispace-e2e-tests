import { Locator, Page } from "@playwright/test";
import { BasePage } from "@pages/base/BasePage";
import { IPageAssertions } from "@pages/base/IPageAssertions";
import { ProductDetailsLocators } from "./ProductDetailsLocators";

export class ProductDetailsPage extends BasePage {
  private locators: ProductDetailsLocators;

  private assertions: IPageAssertions = {
    waitForIdentifiableElement: true,
  };

  constructor(page: Page) {
    super(page);

    this.locators = new ProductDetailsLocators(page);
  }

  get identifiableElement(): Locator {
    return this.locators.reviews;
  }

  async navigateTo(url?: string) {
    await super.navigateTo(url, this.assertions);
  }

  async waitForNavigation() {
    await this.waitFor(this.identifiableElement);
  }

  async clickNextSlideButton(clickCount: number) {
    await this.locators.nextSlideButton.click({ clickCount: clickCount });
  }

  async getPicturesCount() {
    return this.locators.picture.count();
  }

  async getAllPicturesLocators() {
    return this.locators.picture.all();
  }

  async getPictureSource(picture: Locator) {
    return picture.getAttribute("src");
  }

  getLastPictureLocator(pictures: Locator[]) {
    return pictures.slice(-1)[0];
  }

  async getActivePictureSource() {
    const activePicture = await this.getActivePicture();
    return this.getPictureSource(activePicture);
  }

  private async getActivePicture() {
    return this.locators.activePicture;
  }
}
