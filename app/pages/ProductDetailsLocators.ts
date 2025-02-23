import { Locator, Page } from "@playwright/test";

export class ProductDetailsLocators {
  readonly reviews: Locator;
  readonly tabBar: Locator;

  readonly nextSlideButton: Locator;

  readonly pictureSwiper: Locator;
  readonly picture: Locator;

  readonly activePicture: Locator;

  constructor(page: Page) {
    this.reviews = page.locator('[class="product-reviews-header"]');
    //this.tabBar = page.locator('[class*="v-tabs-bar__content"]');
    this.nextSlideButton = page.locator(
      '[class*="product-main-slider"] [class*="next-slide-btn"]'
    );
    this.pictureSwiper = page.locator(
      '[class="slider-thumbs-wrapper"] [class="swiper-wrapper"]'
    );

    this.picture = this.pictureSwiper.locator('[class*="swiper-slide"] img');

    this.activePicture = page
      .locator('[class="product-main-slider"]')
      .locator('[class*="slider-main"]')
      .locator('[class*="swiper-slide-active"] img');
  }
}
