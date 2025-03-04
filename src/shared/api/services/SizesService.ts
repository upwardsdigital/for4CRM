import { API } from '../instance';

export const SizesService = {
  getSizes: (params?: object) => API.get('/sizes', { params }),
  getSizeById: (id?: number) => API.post(`/sizes/${id}`),
  createSize: (data?: any) => API.post('/sizes', data),
  updateSizeById: (data?: any) => API.patch(`/sizes/${data.id}`, data),
  deleteSizeById: (id?: number) => API.delete(`/sizes/${id}`),
};
