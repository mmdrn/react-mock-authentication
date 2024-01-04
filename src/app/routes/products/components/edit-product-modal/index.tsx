import { FC, memo, useCallback, useEffect, useState } from 'react'
import Modal from '../../../../components/modal'
import TextInput from '../../../../components/text-input'
import Button from '../../../../components/button'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import ProductService from '../../../../../api/services/product-service'
import TextareaInput from '../../../../components/textarea-input'
import { Product } from '../../../../../api/interfaces/i-product-service/types'

interface IProps {
    productId: string
    isOpen: boolean
    isLoading: boolean
    onClose: () => void
    onSubmit: (name: string, description: string, price: number, quantity: number) => void
}

const EditProductModal: FC<IProps> = memo(
    ({ productId, isOpen, isLoading, onClose, onSubmit: _onSubmit }) => {
        EditProductModal.displayName = 'Edit product modal'

        const [product, setProduct] = useState<Product | null>(null)

        const [name, setName] = useState('')
        const [name_errors, setName_errors] = useState<string[] | null>(null)

        const [description, setDescription] = useState('')
        const [description_errors, setDescription_errors] = useState<string[] | null>(null)

        const [price, setPrice] = useState('')
        const [price_errors, setPrice_errors] = useState<string[] | null>(null)

        const [quantity, setQuantity] = useState('')
        const [quantity_errors, setQuantity_errors] = useState<string[] | null>(null)

        /**
         * Handles form submission, validating input and calling a provided callback with parsed data.
         *
         * @param {string} name The product name.
         * @param {string} description The product description.
         * @param {string} price The product price as a string.
         * @param {string} quantity The product quantity as a string.
         */
        const handleSubmit = (
            name: string,
            description: string,
            price: string,
            quantity: string
        ) => {
            if (name && description && price && price) {
                _onSubmit(name, description, Number(price), Number(quantity))
            }
        }

        /**
         * Fetches a single product using the ProductService and manages the query state.
         */
        const fetchProductQuery = useQuery({
            queryKey: ['product', productId],
            queryFn: async () => {
                if (productId) {
                    const service = ProductService.getInstance()
                    return await service.detail(productId)
                } else {
                    return null
                }
            },
            onSuccess: (data) => {
                if (data) {
                    setProduct(data)
                }
            },
            cacheTime: 0,
            refetchOnWindowFocus: false,
            onError: () => {
                toast('An error occured while fetching product.', {
                    type: 'error'
                })
            }
        })

        /**
         * Validates product form fields and manages error states.
         */
        const handlValidation = useCallback(() => {
            let isValid = true

            setName_errors([])
            setDescription_errors([])
            setPrice_errors([])
            setQuantity_errors([])

            if (!description.trim()) {
                isValid = false
                setDescription_errors(['Description is required.'])
            }

            if (!name.trim()) {
                isValid = false
                setName_errors(['Name is required.'])
            }

            if (!price) {
                isValid = false
                setPrice_errors(['Price is required.'])
            } else if (Number.isNaN(Number(price))) {
                isValid = false
                setPrice_errors(['Price should be number.'])
            }

            if (!quantity) {
                isValid = false
                setQuantity_errors(['Quantity is required.'])
            } else if (Number.isNaN(Number(quantity))) {
                isValid = false
                setQuantity_errors(['Quantity should be number.'])
            }

            return isValid
        }, [name, description, price, quantity])

        useEffect(() => {
            if (!isOpen) {
                setName('')
                setName_errors([])
                setDescription('')
                setDescription_errors([])
                setPrice('')
                setPrice_errors([])
                setQuantity('')
                setQuantity_errors([])
            } else {
                setProduct(null)
                fetchProductQuery.refetch()
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isOpen])

        useEffect(() => {
            if (product && isOpen) {
                setName(product.name)
                setDescription(product.description)
                setPrice(product.price.toString())
                setQuantity(product.quantity.toString())
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [product])

        return (
            <Modal title="Edit product" isOpen={isOpen}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handlValidation() ? handleSubmit(name, description, price, quantity) : null
                    }}
                    className="grid grid-cols-2 gap-6"
                >
                    <TextInput
                        className="col-span-2"
                        title="Name"
                        required
                        disabled={isLoading || fetchProductQuery.isLoading}
                        loading={isLoading || fetchProductQuery.isLoading}
                        errors={name_errors}
                        value={name}
                        onChange={(value) => setName(value)}
                    />

                    <TextareaInput
                        className="col-span-2"
                        title="Description"
                        required
                        disabled={isLoading || fetchProductQuery.isLoading}
                        loading={isLoading || fetchProductQuery.isLoading}
                        errors={description_errors}
                        value={description}
                        onChange={(value) => setDescription(value)}
                    />

                    <TextInput
                        title="Price"
                        errors={price_errors}
                        required
                        disabled={isLoading || fetchProductQuery.isLoading}
                        loading={isLoading || fetchProductQuery.isLoading}
                        value={price}
                        onChange={(value) => setPrice(value)}
                    />

                    <TextInput
                        title="Quantity"
                        errors={quantity_errors}
                        required
                        disabled={isLoading || fetchProductQuery.isLoading}
                        loading={isLoading || fetchProductQuery.isLoading}
                        value={quantity}
                        onChange={(value) => setQuantity(value)}
                    />

                    <Button
                        status="success"
                        type="submit"
                        disabled={isLoading || fetchProductQuery.isLoading}
                        loading={isLoading || fetchProductQuery.isLoading}
                    >
                        Submit
                    </Button>
                    <Button
                        status="danger"
                        type="button"
                        disabled={isLoading || fetchProductQuery.isLoading}
                        loading={isLoading || fetchProductQuery.isLoading}
                        onClick={() => onClose()}
                    >
                        Close
                    </Button>
                </form>
            </Modal>
        )
    }
)

export default EditProductModal
