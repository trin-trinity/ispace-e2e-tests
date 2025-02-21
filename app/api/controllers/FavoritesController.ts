import { Request } from "../base/Request";
import { FavoritesResponse } from "../models/Favorites";

export class FavoritesController extends Request {
  async getFavoritesStatus(token: string) {
    const response = await this.request.get(
      process.env.BASE_URL + "api/apr/favorites",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.status();
  }
}
