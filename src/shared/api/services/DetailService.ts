import { API } from '../instance';

export const DetailService = {
  getDetails: (params: object) => API.get('/details', { params }),
  createDetails: (data: any) => API.post('/details', data),
  updateDetails: (data: any) => API.patch(`details/${data.id}`, data),
  getDetailsById: (id: number) => API.get(`/details/${id}`),
  deleteDetails: (id: number) => API.patch(`/details/${id}`, { is_deleted: true }),
};
