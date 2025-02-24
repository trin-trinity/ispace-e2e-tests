import { Request } from "../base/Request";
import { CartResponse, Product } from "@api/models/Basket";

export class BasketController extends Request {
  async deleteAllProductFromBasket(authToken: string): Promise<number> {
    const response = await this.request.delete("https://ispace.ua/api/cart", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.status();
  }

  async getBasketProducts(authToken: string): Promise<Product[]> {
    const response = await this.request.get("https://ispace.ua/api/cart", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const basketResponse: CartResponse = await response.json()
    const products = basketResponse.data.cart.products

    return products;
  }
}
