import type { BasicResponse } from "../types";

// general types
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt?: string;
};

// method types
type ProductsListResponseBody = BasicResponse & {
  totalCount: number;
  products: Pick<Product, "id" | "name" | "price">[];
};

type ProductDetailResponseBody = BasicResponse & {
  product: Product;
};

type CreateProductResponseBody = BasicResponse & {
  product: Product;
};

export {
  Product,
  ProductsListResponseBody,
  ProductDetailResponseBody,
  CreateProductResponseBody,
};
