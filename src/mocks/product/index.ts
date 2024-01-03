import { HttpResponse, delay, http } from "msw";
import {
  Product,
  ProductDetailResponseBody,
  ProductsListResponseBody,
  CreateProductResponseBody,
} from "./types";
import { BasicResponse } from "../types";
import { v4 as uuidv4 } from "uuid";

const products: Product[] = [
  {
    id: uuidv4(),
    name: "IPhone 13",
    description: "lorem ipsum",
    price: 1100,
    quantity: 113,
    createdAt: "1704127047607",
  },
  {
    id: uuidv4(),
    name: "IPhone 14",
    description: "lorem ipsum",
    price: 1340,
    quantity: 47,
    createdAt: "1704127082763",
  },
];

const getProductsListHandler = http.get("/api/products", async () => {
  await delay(1500);

  return HttpResponse.json<ProductsListResponseBody>(
    {
      success: true,
      totalCount: products.length,
      products: products.map((i) => {
        return {
          id: i.id,
          name: i.name,
          price: i.price,
        };
      }),
    },
    {
      status: 200,
    }
  );
});

const getProductDetailHandler = http.get(
  "/api/products/:productId",
  async ({ params }) => {
    const { productId } = params;
    await delay(1500);

    const product = products.find((i) => i.id === productId);

    if (!product) {
      return HttpResponse.json<BasicResponse>(
        {
          success: false,
          message: "Product not found.",
        },
        {
          status: 404,
        }
      );
    }

    return HttpResponse.json<ProductDetailResponseBody>(
      {
        success: true,
        product: product,
      },
      {
        status: 200,
      }
    );
  }
);

const createProductHandler = http.post("/api/products", async ({ request }) => {
  await delay(1500);
  const formData = await request.formData();

  const validation: any = {};

  if (!formData.get("name")) {
    validation["name"] = "name is required.";
  } else if (products.find((i) => i.name === formData.get("name"))) {
    validation["name"] = "name is duplicate.";
  }

  if (!formData.get("description")) {
    validation["description"] = "description is required.";
  }

  if (!formData.get("price")) {
    validation["price"] = "price is required.";
  } else if (Number.isNaN(Number(formData.get("price") as string))) {
    validation["price"] = "price should be number.";
  }

  if (!formData.get("quantity")) {
    validation["quantity"] = "quantity is required.";
  } else if (Number.isNaN(Number(formData.get("quantity") as string))) {
    validation["quantity"] = "quantity should be number.";
  }

  if (Object.keys(validation).length) {
    return HttpResponse.json<Response & any>({
      success: false,
      message: "operation failed.",
      validation,
    });
  }

  const product: Product = {
    id: uuidv4(),
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price") as string),
    quantity: Number(formData.get("quantity") as string),
    createdAt: Date.now().toString(),
  };

  products.push(product);

  return HttpResponse.json<CreateProductResponseBody>({
    success: true,
    product: product,
  });
});

const editProductHandler = http.put(
  "/api/products/:productId",
  async ({ request, params }) => {
    await delay(1500);
    const formData = await request.formData();
    const { productId } = params;

    const product: Product | undefined = products.find(
      (i) => i.id === productId
    );

    if (!product) {
      return HttpResponse.json<BasicResponse>(
        {
          success: false,
          message: "Product not found.",
        },
        {
          status: 404,
        }
      );
    }

    const validation: any = {};

    if (!formData.get("name")) {
      validation["name"] = "name is required.";
    } else if (
      products.find(
        (i) => i.name === formData.get("name") && i.id !== productId
      )
    ) {
      validation["name"] = "name is duplicate.";
    }

    if (!formData.get("description")) {
      validation["description"] = "description is required.";
    }

    if (!formData.get("price")) {
      validation["price"] = "price is required.";
    } else if (Number.isNaN(Number(formData.get("price") as string))) {
      validation["price"] = "price should be number.";
    }

    if (!formData.get("quantity")) {
      validation["quantity"] = "quantity is required.";
    } else if (Number.isNaN(Number(formData.get("quantity") as string))) {
      validation["quantity"] = "quantity should be number.";
    }

    if (Object.keys(validation).length) {
      return HttpResponse.json<Response & any>({
        success: false,
        message: "operation failed.",
        validation,
      });
    }

    product.name = formData.get("name") as string;
    product.description = formData.get("description") as string;
    product.price = Number(formData.get("price") as string);
    product.quantity = Number(formData.get("quantity") as string);
    product.updatedAt = Date.now().toString();
    products.push(product);

    return HttpResponse.json<CreateProductResponseBody>({
      success: true,
      product: product,
    });
  }
);

const deleteProductHandler = http.delete(
  "/api/products/:productId",
  async ({ params }) => {
    const { productId } = params;
    await delay(1500);

    const productIndex = products.findIndex((i) => i.id === productId);
    if (productIndex < 0) {
      return HttpResponse.json<BasicResponse>(
        {
          success: false,
          message: "Product not found.",
        },
        {
          status: 404,
        }
      );
    }

    products.splice(productIndex, 1);

    return HttpResponse.json<BasicResponse>(
      {
        success: true,
      },
      {
        status: 200,
      }
    );
  }
);

export const handlers = [
  getProductsListHandler,
  getProductDetailHandler,
  createProductHandler,
  editProductHandler,
  deleteProductHandler,
];
