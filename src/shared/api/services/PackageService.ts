import { API } from '../instance'

export const OrderService = {
    getOrders: (params?: object) => API.get('/sub-orders/short', { params }),
    getOrderById: (id: number) =>
        API.get(`/order/full/${id}`, {
            headers: {
                Accept: 'application/json',
            },
        }),
    getOrdersCount: (params?: object) =>
        API.get('/sub-orders/short', { params: { ...params, take: 1 } }),
}
