import { Page } from "@playwright/test";
import { FilterLocators } from "./FilterLocators";
import { MemorySizeSection } from "@fragments/MemorySizeSection";
import { SaleSection } from "@fragments/SaleSection";
import { BaseView } from "@pages/base/BaseView";

export class Filter extends BaseView {
  memorySizeSection: MemorySizeSection;
  saleSection: SaleSection;
  private locators: FilterLocators;

  constructor(page: Page) {
    super(page);

    this.locators = new FilterLocators(page);
    this.memorySizeSection = new MemorySizeSection(page);
    this.saleSection = new SaleSection(page);
  }
}
