import {
  CreateProductRequest,
  CreateProductResponse,
  UpdateProductRequest,
  UpdateProductResponse,
  Product,
  ProductListResponse,
} from "./types";

export interface IProductService {
  readonly resource: string;

  /**
   * Creates a new product.
   *
   * @param {CreateProductRequest} product - The product details to create.
   * @returns {Promise<CreateProductResponse>} A promise that resolves to the response of the create operation.
   */
  create(product: CreateProductRequest): Promise<CreateProductResponse>;

  /**
   * Updates an existing product.
   *
   * @param {string} id - The identifier of the product to update.
   * @param {UpdateProductRequest} data - The updated product details.
   * @returns {Promise<UpdateProductResponse>} A promise that resolves to the response of the update operation.
   */
  update(
    id: string,
    data: UpdateProductRequest
  ): Promise<UpdateProductResponse>;

  /**
   * Deletes a product.
   *
   * @param {string} id - The identifier of the product to delete.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the delete operation.
   */
  delete(id: string): Promise<boolean>;

  /**
   * Retrieves details of a specific product.
   *
   * @param {string} id - The identifier of the product to retrieve details for.
   * @returns {Promise<Product>} A promise that resolves to the details of the specified product.
   */
  detail(id: string): Promise<Product>;

  /**
   * Retrieves a list of products.
   *
   * @returns {Promise<ProductListResponse>} A promise that resolves to the response containing a list of products.
   */
  list(): Promise<ProductListResponse>;
}
