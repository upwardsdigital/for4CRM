import { API } from '../instance';

export const DepartmentService = {
  getDepartments: (params?: object) => API.get('/departments', { params }),
  getDepartmentsDictionary: () => API.get('/departments/dictionary'),
  updateDepartmentById: (data: any) => API.patch(`/departments/${data.id}`, data),
  createDepartment: (data: any) => API.post('/departments', data),
  deleteDepartment: (id: number) => API.delete(`/departments/${id}`),
  getSubdepartments: (params?: object) => API.get('/departments/subdepartments', { params }),
  getCategories: (params?: object) => API.get('/departments/categories', { params }),
  getSubCategories: (params?: object) => API.get('/departments/sub-categories', { params }),
  getInnerCategories: (params?: object) => API.get('/departments/inner-categories', { params }),
  getProductType: (params?: object) => API.get('/departments/product-type', { params }),

  getAdditonalCharges: (params?: object) => API.get('/additional-charges', { params }),
  createAdditionalCharges: (data: any) => API.post('/additional-charges', data),
  updateAdditionalCharges: (data: any) => API.patch('/additional-charges', data),
};
