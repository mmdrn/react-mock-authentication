import { Fragment, useState } from "react";
import Button from "../../components/button";
import CreateProductModal from "./components/create-product-modal";
import Modal from "../../components/modal";
import EditProductModal from "./components/edit-product-modal";
import Card from "../../components/card";
import NotAvailable from "../../components/not-available";
import TableEmpty from "../../components/table-empty";
import TableOperationFailed from "../../components/table-operaion-failed";
import CardHeader from "../../components/card-header";
import ProductService from "../../../api/services/product-service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Products = () => {
  const [createNewProduct_isOpen, setCreateNewProduct_isOpen] = useState(false);

  const [deleteProduct_id, setDeleteProduct_id] = useState("");
  const [deleteProduct_isOpen, setDeleteProduct_isOpen] = useState(false);

  const [editProduct_id, setEditProduct_id] = useState("");
  const [editProduct_isOpen, setEditProduct_isOpen] = useState(false);

  const fetchProductsQuery = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const service = ProductService.getInstance();
      return await service.list();
    },
    cacheTime: 0,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log(12321, data);
    },
    onError: () => {
      toast("An error occured while fetching products.", {
        type: "error",
      });
    },
  });

  const createProductMutation = useMutation({
    mutationFn: async ({
      name,
      description,
      price,
      quantity,
    }: {
      name: string;
      description: string;
      price: number;
      quantity: number;
    }) => {
      const service = ProductService.getInstance();
      return await service.create({
        name,
        description,
        price,
        quantity,
      });
    },
    onSuccess: async () => {
      await fetchProductsQuery.refetch();
      toast("Product created successfully.", {
        type: "success",
      });
      setCreateNewProduct_isOpen(false);
    },
    onError: () => {
      toast("An error occured while creating product.", {
        type: "error",
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const service = ProductService.getInstance();
      return await service.delete(id);
    },
    onSuccess: async () => {
      await fetchProductsQuery.refetch();
      toast("Product deleted successfully.", {
        type: "success",
      });
      setDeleteProduct_isOpen(false);
      setDeleteProduct_id("");
    },
    onError: () => {
      toast("An error occured while deleting product.", {
        type: "error",
      });
    },
  });

  const editProductMutation = useMutation({
    mutationFn: async ({
      id,
      name,
      description,
      price,
      quantity,
    }: {
      id: string;
      name: string;
      description: string;
      price: number;
      quantity: number;
    }) => {
      const service = ProductService.getInstance();
      return await service.update(id, {
        name,
        description,
        price,
        quantity,
      });
    },
    onSuccess: async () => {
      await fetchProductsQuery.refetch();
      toast("Product edited successfully.", {
        type: "success",
      });
      setEditProduct_isOpen(false);
      setEditProduct_id("");
    },
    onError: () => {
      toast("An error occured while editing product.", {
        type: "error",
      });
    },
  });

  return (
    <Card>
      <Fragment>
        {/* create e-learning modal */}
        <CreateProductModal
          isOpen={createNewProduct_isOpen}
          isLoading={
            createProductMutation.isLoading ||
            fetchProductsQuery.isLoading ||
            fetchProductsQuery.isFetching
          }
          onClose={() => {
            setCreateNewProduct_isOpen(false);
          }}
          onSubmit={(name, description, price, quantity) =>
            createProductMutation.mutate({
              name,
              description,
              price,
              quantity,
            })
          }
        />

        {/* edit e-learning modal */}
        <EditProductModal
          isOpen={editProduct_isOpen}
          isLoading={
            editProductMutation.isLoading ||
            fetchProductsQuery.isLoading ||
            fetchProductsQuery.isFetching
          }
          productId={editProduct_id}
          onClose={() => {
            setEditProduct_isOpen(false);
            setEditProduct_id("");
          }}
          onSubmit={(name, description, price, quantity) =>
            editProductMutation.mutate({
              id: editProduct_id,
              name,
              description,
              price,
              quantity,
            })
          }
        />

        {/* delete tutorial modal */}
        <Modal title="Delete tutorial" isOpen={deleteProduct_isOpen}>
          <p
            className={`mb-4 ${
              deleteProductMutation.isLoading ||
              fetchProductsQuery.isLoading ||
              fetchProductsQuery.isFetching
                ? "animate-pulse"
                : ""
            }`}
          >
            Are you sure you want to delete this product?
          </p>

          <form
            className={`grid grid-cols-2 gap-6 ${
              deleteProductMutation.isLoading ||
              fetchProductsQuery.isLoading ||
              fetchProductsQuery.isFetching
                ? "animate-pulse"
                : ""
            }`}
            onSubmit={(e) => {
              e.preventDefault();
              deleteProductMutation.mutate({ id: deleteProduct_id });
            }}
          >
            <Button
              status="danger"
              type="submit"
              disabled={
                deleteProductMutation.isLoading ||
                fetchProductsQuery.isLoading ||
                fetchProductsQuery.isFetching
              }
              loading={
                deleteProductMutation.isLoading ||
                fetchProductsQuery.isLoading ||
                fetchProductsQuery.isFetching
              }
            >
              Delete
            </Button>
            <Button
              status="success"
              type="button"
              disabled={
                deleteProductMutation.isLoading ||
                fetchProductsQuery.isLoading ||
                fetchProductsQuery.isFetching
              }
              loading={
                deleteProductMutation.isLoading ||
                fetchProductsQuery.isLoading ||
                fetchProductsQuery.isFetching
              }
              onClick={() => {
                setDeleteProduct_isOpen(false);
                setDeleteProduct_id("");
              }}
            >
              Close
            </Button>
          </form>
        </Modal>

        {/* page title */}
        <CardHeader title="Products">
          <Button
            status="info"
            onClick={() => setCreateNewProduct_isOpen(true)}
            className="!w-36"
          >
            Create
          </Button>
        </CardHeader>

        {/* table */}
        <div className="block text-primaryText border border-gray-200 rounded-md bg-gray-100 overflow-hidden">
          <table className="w-full border-collapse table-fixed">
            {/* head */}
            <thead className="text-gray-800">
              <tr className="border-b border-gray-200">
                <th className="border-gray-200 py-3 rounded-tl-lg bg-gray-100 w-[33.33%] text-left">
                  <div className="pl-4 pr-2 text-sm leading-6 font-medium truncate">
                    Name
                  </div>
                </th>
                <th className="py-3 bg-gray-100 w-[33.33%] text-left">
                  <div className="px-2 text-sm leading-6 font-medium truncate">
                    Price
                  </div>
                </th>
                <th className="py-3 rounded-tr-lg bg-gray-100 w-[33.33%] text-center">
                  <div className="px-2 text-sm leading-6 font-medium truncate"></div>
                </th>
              </tr>
            </thead>

            {/* body */}
            <tbody className="text-gray-700">
              {!fetchProductsQuery.isLoading &&
              !fetchProductsQuery.isFetching ? (
                !fetchProductsQuery.isError ? (
                  fetchProductsQuery.data &&
                  fetchProductsQuery.data.products?.length ? (
                    fetchProductsQuery.data.products?.map((product) => {
                      return (
                        <tr
                          className="border-b last:border-b-0 border-gray-200 even:bg-gray-50 odd:bg-white"
                          key={product.id}
                        >
                          <td className="py-3 border-l border-gray-200 w-[33.33%] text-left">
                            <div className="pl-4 pr-2 truncate text-sm leading-6 font-normal">
                              {product.name ? product.name : NotAvailable()}
                            </div>
                          </td>
                          <td className="py-3 w-[33.33%] text-left">
                            <div className="px-2 truncate text-sm leading-6 font-normal">
                              {product.price ? product.price : NotAvailable()}
                            </div>
                          </td>
                          <td className="py-3 w-[33.33%] text-right">
                            <div className="pl-2 pr-4 truncate w-full flex items-start justify-end gap-2">
                              <button
                                className="w-10 h-10 rounded-md flex items-center justify-center cursor-pointer text-white bg-green-500 hover:bg-green-700 transition-colors duration-300"
                                onClick={() => {
                                  setEditProduct_id(product.id.toString());
                                  setEditProduct_isOpen(true);
                                }}
                              >
                                <span className="material-symbols-rounded text-xl">
                                  &#xe3c9;
                                </span>
                              </button>
                              <button
                                className="w-10 h-10 rounded-md flex items-center justify-center cursor-pointer text-white bg-red-500 hover:bg-red-700 transition-colors duration-300"
                                onClick={() => {
                                  setDeleteProduct_id(product.id.toString());
                                  setDeleteProduct_isOpen(true);
                                }}
                              >
                                <span className="material-symbols-rounded text-xl">
                                  &#xe872;
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <TableEmpty colSpan={4} />
                  )
                ) : (
                  // operation failed
                  <TableOperationFailed colSpan={4} />
                )
              ) : (
                // loading
                <Fragment>
                  <tr className="border-b last:border-b-0 border-gray-200 even:bg-gray-50 odd:bg-white cursor-progress">
                    <td className="py-3 border-l border-gray-200 w-[33.33%] text-left">
                      <div className="pl-4 pr-2">
                        <span className="animate-pulse rounded-md bg-gray-300 h-4 block max-w-[70%]"></span>
                      </div>
                    </td>
                    <td className="py-3 w-[33.33%] text-left">
                      <div className="px-2">
                        <span className="animate-pulse rounded-md bg-gray-300 h-4 block max-w-[70%]"></span>
                      </div>
                    </td>
                    <td className="py-3 w-[33.33%] text-left">
                      <div className="px-2">
                        <span className="animate-pulse rounded-md bg-gray-300 h-4 block max-w-[70%]"></span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b last:border-b-0 border-gray-200 even:bg-gray-50 odd:bg-white cursor-progress">
                    <td className="py-3 border-l border-gray-200 w-[33.33%] text-left">
                      <div className="pl-4 pr-2">
                        <span className="animate-pulse rounded-md bg-gray-300 h-4 block max-w-[70%]"></span>
                      </div>
                    </td>
                    <td className="py-3 w-[33.33%] text-left">
                      <div className="px-2">
                        <span className="animate-pulse rounded-md bg-gray-300 h-4 block max-w-[70%]"></span>
                      </div>
                    </td>
                    <td className="py-3 w-[33.33%] text-left">
                      <div className="px-2">
                        <span className="animate-pulse rounded-md bg-gray-300 h-4 block max-w-[70%]"></span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b last:border-b-0 border-gray-200 even:bg-gray-50 odd:bg-white cursor-progress">
                    <td className="py-3 border-l border-gray-200 w-[33.33%] text-left">
                      <div className="pl-4 pr-2">
                        <span className="animate-pulse rounded-md bg-gray-300 h-4 block max-w-[70%]"></span>
                      </div>
                    </td>
                    <td className="py-3 w-[33.33%] text-left">
                      <div className="px-2">
                        <span className="animate-pulse rounded-md bg-gray-300 h-4 block max-w-[70%]"></span>
                      </div>
                    </td>
                    <td className="py-3 w-[33.33%] text-left">
                      <div className="px-2">
                        <span className="animate-pulse rounded-md bg-gray-300 h-4 block max-w-[70%]"></span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b last:border-b-0 border-gray-200 even:bg-gray-50 odd:bg-white cursor-progress">
                    <td className="py-3 border-l border-gray-200 w-[33.33%] text-left">
                      <div className="pl-4 pr-2">
                        <span className="animate-pulse rounded-md bg-gray-300 h-4 block max-w-[70%]"></span>
                      </div>
                    </td>
                    <td className="py-3 w-[33.33%] text-left">
                      <div className="px-2">
                        <span className="animate-pulse rounded-md bg-gray-300 h-4 block max-w-[70%]"></span>
                      </div>
                    </td>
                    <td className="py-3 w-[33.33%] text-left">
                      <div className="px-2">
                        <span className="animate-pulse rounded-md bg-gray-300 h-4 block max-w-[70%]"></span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b last:border-b-0 border-gray-200 even:bg-gray-50 odd:bg-white cursor-progress">
                    <td className="py-3 border-l border-gray-200 w-[33.33%] text-left">
                      <div className="pl-4 pr-2">
                        <span className="animate-pulse rounded-md bg-gray-300 h-4 block max-w-[70%]"></span>
                      </div>
                    </td>
                    <td className="py-3 w-[33.33%] text-left">
                      <div className="px-2">
                        <span className="animate-pulse rounded-md bg-gray-300 h-4 block max-w-[70%]"></span>
                      </div>
                    </td>
                    <td className="py-3 w-[33.33%] text-left">
                      <div className="px-2">
                        <span className="animate-pulse rounded-md bg-gray-300 h-4 block max-w-[70%]"></span>
                      </div>
                    </td>
                  </tr>
                </Fragment>
              )}
            </tbody>
          </table>
        </div>
      </Fragment>
    </Card>
  );
};

export default Products;
