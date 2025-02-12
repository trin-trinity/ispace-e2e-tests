import { Locator, Page } from "@playwright/test";

export class SearchResultsPageLocators {
  readonly breadcrumb: Locator;
  readonly defaultInfo: Locator;
  readonly searchResults: Locator;
  readonly searchResultsListItem: Locator;
  readonly productCategoriesTitle: Locator;
  readonly product: Locator;

  constructor(page: Page) {
    this.breadcrumb = page.locator(".breadcrumb>.active");
    this.defaultInfo = page.locator("p.default-info");
    this.searchResults = page.locator(".search-wrapper .search-result-wrapper");
    this.productCategoriesTitle = page.locator(".title", {
      hasText: "Категорії товарів",
    });

    this.product = this.productCategoriesTitle
      .locator("xpath=./ancestor::apr-search-result")
      .locator(".item-descr a");
  }
}
