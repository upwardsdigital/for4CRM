import { API } from '../instance';

export const DepartmentService = {
  getDepartments: (params?: object) => API.get('/departments', { params }),
  updateDepartmentById: (data: any) => API.patch(`/departments/${data.id}`, data),
  createDepartment: (data: any) => API.post('/departments', data),
  getSubdepartments: (params?: object) => API.get('/departments/subdepartments', { params }),
  getCategories: (params?: object) => API.get('/departments/categories', { params }),
  getSubCategories: (params?: object) => API.get('/departments/sub-categories', { params }),
  getInnerCategories: (params?: object) => API.get('/departments/inner-categories', { params }),
  getProductType: (params?: object) => API.get('/departments/product-type', { params }),
};
