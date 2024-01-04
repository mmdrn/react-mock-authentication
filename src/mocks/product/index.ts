import { HttpResponse, delay, http } from 'msw'
import {
    Product,
    ProductDetailResponseBody,
    ProductsListResponseBody,
    CreateProductResponseBody
} from './types'
import { BasicResponse } from '../types'
import { v4 as uuidv4 } from 'uuid'

const baseUrl = process.env['ENABLE_TEST'] ? 'http://localhost' : ''

const products: Product[] = [
    {
        id: '1',
        name: 'Laptop',
        description: 'Powerful laptop with high-end specifications.',
        price: 1200,
        quantity: 50,
        createdAt: '1641043200000',
        updatedAt: '1641129000000'
    },
    {
        id: '2',
        name: 'Smartphone',
        description: 'Latest smartphone with a stunning display.',
        price: 800,
        quantity: 100,
        createdAt: '1644932700000',
        updatedAt: '1645387200000'
    },
    {
        id: '3',
        name: 'Headphones',
        description: 'Noise-canceling headphones for an immersive experience.',
        price: 150,
        quantity: 75,
        createdAt: '1646885400000',
        updatedAt: '1647054900000'
    },
    {
        id: '4',
        name: 'Camera',
        description: 'Professional-grade camera for stunning photography.',
        price: 1000,
        quantity: 30,
        createdAt: '1650229200000',
        updatedAt: '1650305100000'
    },
    {
        id: '5',
        name: 'Fitness Tracker',
        description: 'Monitor your health and fitness with this advanced tracker.',
        price: 80,
        quantity: 120,
        createdAt: '1653046200000',
        updatedAt: '1653100500000'
    },
    {
        id: '6',
        name: 'Gaming Console',
        description: 'Next-gen gaming console for an unparalleled gaming experience.',
        price: 500,
        quantity: 40,
        createdAt: '1655295600000',
        updatedAt: '1655474400000'
    },
    {
        id: '7',
        name: 'Tablet',
        description: 'Versatile tablet for work and entertainment on the go.',
        price: 300,
        quantity: 90,
        createdAt: '1657491900000',
        updatedAt: '1657617000000'
    },
    {
        id: '8',
        name: 'Wireless Earbuds',
        description: 'Compact and wireless earbuds for seamless audio experience.',
        price: 70,
        quantity: 60,
        createdAt: '1659725400000',
        updatedAt: '1659796500000'
    },
    {
        id: '9',
        name: 'Smartwatch',
        description: 'Intelligent smartwatch with health and fitness tracking features.',
        price: 200,
        quantity: 50,
        createdAt: '1662090000000',
        updatedAt: '1662166200000'
    },
    {
        id: '10',
        name: 'Portable Speaker',
        description: 'Compact and powerful portable speaker for music enthusiasts.',
        price: 50,
        quantity: 80,
        createdAt: '1663302900000',
        updatedAt: '1663472700000'
    }
]

const getProductsListHandler = http.get(`${baseUrl}/api/products`, async () => {
    await delay(1500)

    return HttpResponse.json<ProductsListResponseBody>(
        {
            success: true,
            totalCount: products.length,
            products: products.map((i) => {
                return {
                    id: i.id,
                    name: i.name,
                    price: i.price
                }
            })
        },
        {
            status: 200
        }
    )
})

const getProductDetailHandler = http.get(
    `${baseUrl}/api/products/:productId`,
    async ({ params }) => {
        const { productId } = params
        await delay(1500)

        const product = products.find((i) => i.id === productId)

        if (!product) {
            return HttpResponse.json<BasicResponse>(
                {
                    success: false,
                    message: 'Product not found.'
                },
                {
                    status: 404
                }
            )
        }

        return HttpResponse.json<ProductDetailResponseBody>(
            {
                success: true,
                product: product
            },
            {
                status: 200
            }
        )
    }
)

const createProductHandler = http.post(`${baseUrl}/api/products`, async ({ request }) => {
    await delay(1500)
    const formData = await request.formData()

    const validation: any = {}

    if (!formData.get('name')) {
        validation['name'] = 'name is required.'
    } else if (products.find((i) => i.name === formData.get('name'))) {
        validation['name'] = 'name is duplicate.'
    }

    if (!formData.get('description')) {
        validation['description'] = 'description is required.'
    }

    if (!formData.get('price')) {
        validation['price'] = 'price is required.'
    } else if (Number.isNaN(Number(formData.get('price') as string))) {
        validation['price'] = 'price should be number.'
    }

    if (!formData.get('quantity')) {
        validation['quantity'] = 'quantity is required.'
    } else if (Number.isNaN(Number(formData.get('quantity') as string))) {
        validation['quantity'] = 'quantity should be number.'
    }

    if (Object.keys(validation).length) {
        return HttpResponse.json<Response & any>({
            success: false,
            message: 'operation failed.',
            validation
        })
    }

    const product: Product = {
        id: uuidv4(),
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price: Number(formData.get('price') as string),
        quantity: Number(formData.get('quantity') as string),
        createdAt: Date.now().toString()
    }

    products.push(product)

    return HttpResponse.json<CreateProductResponseBody>({
        success: true,
        product: product
    })
})

const editProductHandler = http.put(
    `${baseUrl}/api/products/:productId`,
    async ({ request, params }) => {
        await delay(1500)
        const formData = await request.formData()
        const { productId } = params

        const product: Product | undefined = products.find((i) => i.id === productId)

        if (!product) {
            return HttpResponse.json<BasicResponse>(
                {
                    success: false,
                    message: 'Product not found.'
                },
                {
                    status: 404
                }
            )
        }

        const validation: any = {}

        if (!formData.get('name')) {
            validation['name'] = 'name is required.'
        } else if (products.find((i) => i.name === formData.get('name') && i.id !== productId)) {
            validation['name'] = 'name is duplicate.'
        }

        if (!formData.get('description')) {
            validation['description'] = 'description is required.'
        }

        if (!formData.get('price')) {
            validation['price'] = 'price is required.'
        } else if (Number.isNaN(Number(formData.get('price') as string))) {
            validation['price'] = 'price should be number.'
        }

        if (!formData.get('quantity')) {
            validation['quantity'] = 'quantity is required.'
        } else if (Number.isNaN(Number(formData.get('quantity') as string))) {
            validation['quantity'] = 'quantity should be number.'
        }

        if (Object.keys(validation).length) {
            return HttpResponse.json<Response & any>({
                success: false,
                message: 'operation failed.',
                validation
            })
        }

        product.name = formData.get('name') as string
        product.description = formData.get('description') as string
        product.price = Number(formData.get('price') as string)
        product.quantity = Number(formData.get('quantity') as string)
        product.updatedAt = Date.now().toString()

        return HttpResponse.json<CreateProductResponseBody>({
            success: true,
            product: product
        })
    }
)

const deleteProductHandler = http.delete(
    `${baseUrl}/api/products/:productId`,
    async ({ params }) => {
        const { productId } = params
        await delay(1500)

        const productIndex = products.findIndex((i) => i.id === productId)
        if (productIndex < 0) {
            return HttpResponse.json<BasicResponse>(
                {
                    success: false,
                    message: 'Product not found.'
                },
                {
                    status: 404
                }
            )
        }

        products.splice(productIndex, 1)

        return HttpResponse.json<BasicResponse>(
            {
                success: true
            },
            {
                status: 200
            }
        )
    }
)

export const handlers = [
    getProductsListHandler,
    getProductDetailHandler,
    createProductHandler,
    editProductHandler,
    deleteProductHandler
]
