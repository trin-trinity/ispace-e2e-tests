export interface Product {
  id: number;
  sku: string;

}

export interface CartResponse {
  data: {
    cart: {
      products: Product[];
    };
  };
}
