import { API } from '../instance';

export const SupplierService = {
  getSuppliers: (params?: object) => API.get('/suppliers', { params }),
  getSupplierById: (id?: number) => API.post(`/suppliers/${id}`),
  createSupplier: (data?: any) => API.post('/suppliers', data),
  updateSupplier: (data?: any) => API.patch(`/suppliers/${data.id}`, data),
  deleteSupplier: (id?: number) => API.delete(`/suppliers/${id}`),
};
