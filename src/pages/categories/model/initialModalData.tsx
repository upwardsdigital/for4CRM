import { ModalDataT } from '@/shared/types';

export const initialModalData: ModalDataT = {
  isOpen: false,
  type: 'add',
  isRequested: false,
  fields: {
    department: {
      type: 'select',
      label: 'Отдел',
      options: [],
    },
    subDepartment: {
      type: 'select',
      label: 'Подотдел',
      options: [],
    },
    name_ru: {
      type: 'text',
      required: true,
      label: 'Название подотдела (рус.)',
      placeholder: 'Название',
    },
    name: {
      type: 'text',
      label: 'Название подотдела (анг.)',
      placeholder: 'Название',
    },
    is_active: {
      type: 'select',
      label: 'Статус',
      options: [
        {
          value: true,
          label: (
            <p className="status active">
              <span></span> Активный
            </p>
          ),
        },
        {
          value: false,
          label: (
            <p className="status inactive">
              <span></span> Не активный
            </p>
          ),
        },
      ],
      placeholder: 'Выберите статус',
    },
  },
  values: {
    type: 2,
    is_active: false,
    name: '',
    name_ru: '',
  },
  validation: {
    error: {
      type: false,
      status: false,
      name: false,
      name_ru: false,
    },
    message: {
      type: '',
      status: '',
      name: '',
      name_ru: '',
    },
  },
};
