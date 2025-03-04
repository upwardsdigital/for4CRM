import { API } from '../instance';

export const ClientService = {
  getClients: (params?: object) => API.get('/users/clients', { params }),
  getClientById: (id: number) =>
    API.get(`/users/clients/${id}`, {
      headers: {
        Accept: 'application/json',
      },
    }),
  updateClientById: (data: any) => API.put(`/users/${data.id}`, data),
  createClient: (data: any) => API.post('/users', data),
  clientTags: (data: any) => API.get('/client-tags/dictionary', data),
  deleteClient: (id: number) => API.patch(`/users/${id}/delete`, { is_delete: true }),
};
