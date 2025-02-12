import { API } from '../instance'

interface UserStatusData {
    id: number
    is_active: boolean
}

export const UserService = {
    getUsers: (params?: object) => API.get('/users', { params }),
    getUserById: (id: number) =>
        API.get(`/users/${id}`, {
            headers: {
                Accept: 'application/json',
            },
        }),
    getUserCount: (params?: object) =>
        API.get('/users', { params: { ...params, take: 1 } }),
    updateUserStatus: (data: UserStatusData, params?: object) =>
        API.patch(
            `/users/${data.id}/activate`,
            {
                is_active: data.is_active,
            },
            { params },
        ),
}
