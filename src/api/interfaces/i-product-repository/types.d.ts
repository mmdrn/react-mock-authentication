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

// method based types
type CreateProductRequest = Pick<
  Product,
  "name" | "description" | "price" | "quantity"
>;

type CreateProductResponse = {
  status: boolean;
  product: Product;
};

type UpdateProductRequest = Pick<
  Product,
  "name" | "description" | "price" | "quantity"
>;

type UpdateProductResponse = {
  status: boolean;
  product: Product;
};

type ProductListResponse = {
  totalCound: number;
  products: Pick<Product, "id" | "name" | "price">[];
};

export {
  Product,
  CreateProductRequest,
  CreateProductResponse,
  UpdateProductRequest,
  UpdateProductResponse,
  ProductListResponse,
};
