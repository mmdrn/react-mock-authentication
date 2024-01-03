import axios from "axios";
import { IProductService } from "../interfaces/i-product-service";
import {
  CreateProductRequest,
  CreateProductResponse,
  UpdateProductRequest,
  UpdateProductResponse,
  Product,
  ProductListResponse,
} from "../interfaces/i-product-service/types";

export default class ProductService implements IProductService {
  private static instance: ProductService;
  readonly resource: string = "products";

  /**
   * Returns the singleton instance of the ProductService class.
   *
   * @static
   * @returns {ProductService} The singleton instance.
   */
  static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }

    return ProductService.instance;
  }

  async create(product: CreateProductRequest): Promise<CreateProductResponse> {
    const data = new FormData();

    data.append("name", product.name);
    data.append("description", product.description);
    data.append("price", product.price.toString());
    data.append("quantity", product.price.toString());

    const response = await axios.post(`/api/products/`, data);

    return response.data;
  }

  async update(
    id: string,
    data: UpdateProductRequest
  ): Promise<UpdateProductResponse> {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("quantity", data.price.toString());

    const response = await axios.put(`/api/products/${id}`, formData);

    return response.data;
  }

  async delete(id: string): Promise<boolean> {
    const response = await axios.delete(`/api/products/${id}`);

    return response.data;
  }

  async detail(id: string): Promise<Product> {
    const response = await axios.get(`/api/products/${id}`);

    return response.data.product;
  }

  async list(): Promise<ProductListResponse> {
    const response = await axios.get(`/api/products`);

    return response.data;
  }
}
