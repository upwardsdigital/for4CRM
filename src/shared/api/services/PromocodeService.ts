import { API } from '../instance'

interface BrandData {
    id: number
    name?: string
    is_deleted?: boolean
    is_active: boolean
}

export const PromocodeService = {
    getPromocodes: (params?: object) => API.get('/promocodes', { params }),
    getPromocodeById: (id: number) => API.get(`/promocodes/${id}`),
    getPromocodesCount: (params?: object) =>
        API.get('/promocodes', { params: { ...params, take: 1 } }),
    updatePromocodeById: (data: BrandData) =>
        API.patch(`/promocodes/${data.id}`, data),
}
