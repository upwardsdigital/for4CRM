import { API } from '../instance';

export const DepartmentService = {
  getDepartments: (params?: object) => API.get('/departments', { params }),
  updateDepartmentById: (data: any) => API.patch(`/departments/${data.id}`, data),
  createDepartment: (data: any) => API.post('/departments', data),
};
