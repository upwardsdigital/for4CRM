import { API } from '../instance';

interface UserStatusData {
  id: number;
  is_active: boolean;
}

export const ClientService = {
  getClients: (params?: object) => API.get('/users/clients', { params }),
  getClientById: (id: number) =>
    API.get(`/users/clients/${id}`, {
      headers: {
        Accept: 'application/json',
      },
    }),
};
