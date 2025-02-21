import { expect } from "@playwright/test";
import { test } from "./fixtures/fixture";


test.describe("Favorites", () => {
  test(
    "IS-007 test auth state",
    { tag: "@loggedUser" },
    async ({ baseURL, homePage }) => {
      if (!baseURL) {
        throw new Error("baseURL is not defined");
      }

      await homePage.navigateTo(baseURL);
      
    }
  );
});
