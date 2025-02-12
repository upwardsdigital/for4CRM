import { API } from '../instance'

export const ProductService = {
    getProducts: (params?: object) =>
        API.get('/departments/product-type', { params }),
    getProductById: (id: number) => API.get(`/products/${id}`),
    getProductsCount: (params?: object) =>
        API.get('/departments/product-type', {
            params: { ...params, take: 1 },
        }),
}
