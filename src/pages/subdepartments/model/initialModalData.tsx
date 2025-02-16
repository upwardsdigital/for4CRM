import { ModalDataT } from '@/shared/types';
import { DepartmentService } from '@/shared/api/services';

export const initialModalData: ModalDataT = {
  isOpen: false,
  type: 'add',
  isRequested: false,
  fields: {
    parent: {
      type: 'select',
      label: 'Отдел',
      options: [],
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
  },
  values: {
    type: 1,
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
