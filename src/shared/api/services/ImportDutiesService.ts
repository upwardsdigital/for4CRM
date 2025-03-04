import { API } from '../instance';

export const ImportDutiesService = {
  getImportDuties: (params?: object) => API.get('/import-duties', { params }),
  getImportDutyById: (id?: number) => API.post(`/import-duties/${id}`),
  createImportDuty: (data?: any) => API.post('/import-duties', data),
  updateImportDuty: (data?: any) => API.patch(`/import-duties/${data.id}`, data),
  deleteImportDuty: (id?: number) => API.delete(`/import-duties/${id}`),
};
