import { Fragment, useState } from 'react'
import Button from '../../components/button'
import CreateProductModal from './components/create-product-modal'
import EditProductModal from './components/edit-product-modal'
import Card from '../../components/card'
import NotAvailable from '../../components/not-available'
import TableEmpty from '../../components/table-empty'
import TableOperationFailed from '../../components/table-operaion-failed'
import CardHeader from '../../components/card-header'
import ProductService from '../../../api/services/product-service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Product } from '../../../api/interfaces/i-product-service/types'
import DeleteProductModal from './components/delete-product-modal'
import ProductsTableLoading from './components/table-loading'

const Products = () => {
    const [createNewProduct_isOpen, setCreateNewProduct_isOpen] = useState(false)

    const [deleteProduct_id, setDeleteProduct_id] = useState('')
    const [deleteProduct_isOpen, setDeleteProduct_isOpen] = useState(false)

    const [editProduct_id, setEditProduct_id] = useState('')
    const [editProduct_isOpen, setEditProduct_isOpen] = useState(false)

    /**
     * Renders table rows for a list of products, handling data display and user actions.
     *
     * @param {Pick<Product, 'id' | 'name' | 'price'>[]} products - An array of products, each containing only the ID, name, and price properties.
     */
    const handleRenderTableRows = (products: Pick<Product, 'id' | 'name' | 'price'>[]) => {
        return products.map((product) => {
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
                                title="edit"
                                onClick={() => {
                                    setEditProduct_id(product.id.toString())
                                    setEditProduct_isOpen(true)
                                }}
                            >
                                <span className="material-symbols-rounded text-xl">&#xe3c9;</span>
                            </button>
                            <button
                                className="w-10 h-10 rounded-md flex items-center justify-center cursor-pointer text-white bg-red-500 hover:bg-red-700 transition-colors duration-300"
                                title="delete"
                                onClick={() => {
                                    setDeleteProduct_id(product.id.toString())
                                    setDeleteProduct_isOpen(true)
                                }}
                            >
                                <span className="material-symbols-rounded text-xl">&#xe872;</span>
                            </button>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    /**
     * Fetches a list of products using the ProductService and manages the query state.
     */
    const fetchProductsQuery = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const service = ProductService.getInstance()
            return await service.list()
        },
        cacheTime: 0,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            console.log(12321, data)
        },
        onError: () => {
            toast('An error occured while fetching products.', {
                type: 'error'
            })
        }
    })

    /**
     * Creates a new product using the ProductService and manages the mutation state.
     */
    const createProductMutation = useMutation({
        mutationFn: async ({
            name,
            description,
            price,
            quantity
        }: {
            name: string
            description: string
            price: number
            quantity: number
        }) => {
            const service = ProductService.getInstance()
            return await service.create({
                name,
                description,
                price,
                quantity
            })
        },
        onSuccess: async () => {
            await fetchProductsQuery.refetch()
            toast('Product created successfully.', {
                type: 'success'
            })
            setCreateNewProduct_isOpen(false)
        },
        onError: () => {
            toast('An error occured while creating product.', {
                type: 'error'
            })
        }
    })

    /**
     * Deletes a product using the ProductService and manages the mutation state.
     */
    const deleteProductMutation = useMutation({
        mutationFn: async ({ id }: { id: string }) => {
            const service = ProductService.getInstance()
            return await service.delete(id)
        },
        onSuccess: async () => {
            await fetchProductsQuery.refetch()
            toast('Product deleted successfully.', {
                type: 'success'
            })
            setDeleteProduct_isOpen(false)
            setDeleteProduct_id('')
        },
        onError: () => {
            toast('An error occured while deleting product.', {
                type: 'error'
            })
        }
    })

    /**
     * Updates an existing product using the ProductService and manages the mutation state.
     */
    const editProductMutation = useMutation({
        mutationFn: async ({
            id,
            name,
            description,
            price,
            quantity
        }: {
            id: string
            name: string
            description: string
            price: number
            quantity: number
        }) => {
            const service = ProductService.getInstance()
            return await service.update(id, {
                name,
                description,
                price,
                quantity
            })
        },
        onSuccess: async () => {
            await fetchProductsQuery.refetch()
            toast('Product edited successfully.', {
                type: 'success'
            })
            setEditProduct_isOpen(false)
            setEditProduct_id('')
        },
        onError: () => {
            toast('An error occured while editing product.', {
                type: 'error'
            })
        }
    })

    return (
        <Card>
            <Fragment>
                {/* create product modal */}
                <CreateProductModal
                    isOpen={createNewProduct_isOpen}
                    isLoading={
                        createProductMutation.isLoading ||
                        fetchProductsQuery.isLoading ||
                        fetchProductsQuery.isFetching
                    }
                    onClose={() => {
                        setCreateNewProduct_isOpen(false)
                    }}
                    onSubmit={(name, description, price, quantity) =>
                        createProductMutation.mutate({
                            name,
                            description,
                            price,
                            quantity
                        })
                    }
                />

                {/* edit product modal */}
                <EditProductModal
                    isOpen={editProduct_isOpen}
                    isLoading={
                        editProductMutation.isLoading ||
                        fetchProductsQuery.isLoading ||
                        fetchProductsQuery.isFetching
                    }
                    productId={editProduct_id}
                    onClose={() => {
                        setEditProduct_isOpen(false)
                        setEditProduct_id('')
                    }}
                    onSubmit={(name, description, price, quantity) =>
                        editProductMutation.mutate({
                            id: editProduct_id,
                            name,
                            description,
                            price,
                            quantity
                        })
                    }
                />

                {/* delete product modal */}
                <DeleteProductModal
                    isOpen={deleteProduct_isOpen}
                    isLoading={
                        deleteProductMutation.isLoading ||
                        fetchProductsQuery.isLoading ||
                        fetchProductsQuery.isFetching
                    }
                    onClose={() => {
                        setDeleteProduct_isOpen(false)
                        setDeleteProduct_id('')
                    }}
                    onSubmit={() => {
                        deleteProductMutation.mutate({ id: deleteProduct_id })
                    }}
                />

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
                    <table className="w-full border-collapse table-fixed" id="products-list-table">
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
                            {!fetchProductsQuery.isLoading && !fetchProductsQuery.isFetching ? (
                                !fetchProductsQuery.isError ? (
                                    fetchProductsQuery.data &&
                                    fetchProductsQuery.data.products?.length ? (
                                        handleRenderTableRows(fetchProductsQuery.data.products)
                                    ) : (
                                        <TableEmpty colSpan={4} />
                                    )
                                ) : (
                                    // operation failed
                                    <TableOperationFailed colSpan={4} />
                                )
                            ) : (
                                <ProductsTableLoading />
                            )}
                        </tbody>
                    </table>
                </div>
            </Fragment>
        </Card>
    )
}

export default Products
