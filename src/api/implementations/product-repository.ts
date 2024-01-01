import { IProductRepository } from "../interfaces/i-product-repository";
import {
  CreateProductRequest,
  CreateProductResponse,
  UpdateProductRequest,
  UpdateProductResponse,
  Product,
  ProductListResponse,
} from "../interfaces/i-product-repository/types";

export default class ProductRepository implements IProductRepository {
  private static instance: ProductRepository;
  readonly resource: string = "products";

  /**
   * Returns the singleton instance of the ProductRepository class.
   *
   * @static
   * @returns {ProductRepository} The singleton instance.
   */
  static getInstance(): ProductRepository {
    if (!ProductRepository.instance) {
      ProductRepository.instance = new ProductRepository();
    }

    return ProductRepository.instance;
  }

  async create(product: CreateProductRequest): Promise<CreateProductResponse> {
    throw new Error("Method not implemented.");
  }

  async update(
    id: string,
    data: UpdateProductRequest
  ): Promise<UpdateProductResponse> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async detail(id: string): Promise<Product> {
    throw new Error("Method not implemented.");
  }

  async list(): Promise<ProductListResponse> {
    throw new Error("Method not implemented.");
  }
}
