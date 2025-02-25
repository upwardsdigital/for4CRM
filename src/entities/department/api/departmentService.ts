import { DepartmentService } from '@shared/api/services/DepartmentService';

export const loadDepartments = async () => {
  try {
    const response = await DepartmentService.getDepartmentsDictionary();
    const departments = response.data;

    const departmentObject: any = {
      department: [],
      subDepartment: [],
      category: [],
      subCategory: [],
      innerCategory: [],
      productType: [],
    };

    const addDepartmentsByType = (department) => {
      const formattedDepartment = { ...department, value: department.id, label: department.name };
      switch (department.type) {
        case 0:
          departmentObject.department.push(formattedDepartment);
          break;
        case 1:
          departmentObject.subDepartment.push(formattedDepartment);
          break;
        case 2:
          departmentObject.category.push(formattedDepartment);
          break;
        case 3:
          departmentObject.subCategory.push(formattedDepartment);
          break;
        case 4:
          departmentObject.innerCategory.push(formattedDepartment);
          break;
        case 5:
          departmentObject.productType.push(formattedDepartment);
          break;
        default:
          break;
      }

      if (department.children && department.children.length > 0) {
        department.children.forEach(addDepartmentsByType);
      }
    };

    departments.forEach(addDepartmentsByType);

    return departmentObject;
  } catch (error) {
    console.error('Ошибка при загрузке данных', error);
    return {};
  }
};
