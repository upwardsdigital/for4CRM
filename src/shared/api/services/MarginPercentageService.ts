import { API } from '../instance';

export const MarginPercentageService = {
  getMargins: (params?: object) => API.get('/margin', { params }),
  getMarginsByid: (id?: number) => API.post(`/margin/${id}`),
  createMargin: (data?: any) => API.post('/margin', data),
  updateMarginById: (data?: any) => API.patch(`/margin/${data.id}`, data),
  deleteMarginById: (id?: number) => API.delete(`/margin/${id}`),
};
