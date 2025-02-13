import { faker } from "@faker-js/faker";

export const testData = {
  dummyString: faker.string.alpha({ length: 20 }),
  products: ["iPhone", "MacBook", "Apple Watch", "iPad", "AirPods"]
};
