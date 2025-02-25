import { APIRequestContext } from "@playwright/test";
import { Request } from "../base/Request";
import { CartResponse, Product } from "@api/models/Basket";

export class BasketController extends Request {
  private authToken: string;

  constructor(request: APIRequestContext, authToken: string) {
    super(request);
    this.authToken = authToken;
  }

  async deleteAllProductFromBasket(): Promise<number> {
    const response = await this.request.delete("https://ispace.ua/api/cart", {
      headers: {
        Authorization: `Bearer ${this.authToken}`,
      },
    });

    return response.status();
  }

  async getBasketProducts(): Promise<Product[]> {
    const response = await this.request.get("https://ispace.ua/api/cart", {
      headers: {
        Authorization: `Bearer ${this.authToken}`,
      },
    });

    const basketResponse: CartResponse = await response.json();
    const products = basketResponse.data.cart.products;

    return products;
  }
}
