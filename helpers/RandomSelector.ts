import { Locator } from "@playwright/test";

export class RandomSelector {
  static async getRandomText(elements: Locator[]) {
    const items: string[] = [];

    for (const element of elements) {
      const text = await element.textContent();
      if (text !== null) {
        items.push(text.trim());
      }
    }

    if (items.length === 0) {
      throw new Error("No elements found for random selection.");
    }

    const i = Math.floor(Math.random() * items.length);
    return items[i];
  }
}
