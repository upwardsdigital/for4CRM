import { API } from '../instance'

export const DefaultService = {
    getDashboard: (params?: object) => API.get('/dashboard', { params }),
}
