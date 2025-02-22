import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base/BasePage";
import { Filter } from "../components/Filter";
import { CatalogPageLocators } from "./CatalogPageLocators";
import { ProductItem } from "../components/ProductItem";
import { RandomSelector } from "../../helpers/RandomSelector";
import { IPageAssertions } from "./base/IPageAssertions";
import { FavoritePageLocators } from "./FavoritePageLocators";

export class FavoritePage extends BasePage {
  productItem: ProductItem;
  private locators: FavoritePageLocators

  private assertions: IPageAssertions = {
    waitForIdentifiableElement: true,
  };

  constructor(page: Page) {
    super(page);

    this.productItem = new ProductItem(page);
    this.locators = new FavoritePageLocators(page);
  }

  get identifiableElement(): Locator {
    return this.locators.title
  }
}
