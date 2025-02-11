import { Locator, Page } from "@playwright/test";

export class SearchResultsPageLocators {
  header: Locator;
  defaultInfo: Locator;
  searchResults: Locator;
  searchResultsListItem: Locator;
  productCategoriesTitle: Locator;
  product: Locator;

  constructor(page: Page) {
    this.header = page.locator("h1");
    this.defaultInfo = page.locator("p.default-info");
    this.searchResults = page.locator(".search-wrapper .search-result-wrapper");
    this.productCategoriesTitle = page
      .locator(".title")
      .getByText("Категорії товарів");
  
    this.product = this.productCategoriesTitle.locator(
      'xpath=/ancestor-or-self::apr-search-result//*[@class="item-descr"]/a'
    );
  }
}
