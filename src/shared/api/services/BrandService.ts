import { API } from '../instance'

interface BrandData {
    id: number
    name?: string
    is_deleted?: boolean
    is_active: boolean
}

export const BrandService = {
    getBrands: (params?: object) => API.get('/brands', { params }),
    getBrandById: (id: number) =>
        API.get(`/brands/${id}`, {
            headers: {
                Accept: 'application/json',
            },
        }),
    getBrandsCount: (params?: object) =>
        API.get('/brands', { params: { ...params, take: 1 } }),
    updateBrandById: (data: BrandData) => API.patch(`/brands/${data.id}`, data),
}
