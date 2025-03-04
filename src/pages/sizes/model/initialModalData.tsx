import { ModalDataT } from '@/shared/types';

export const initialModalData: ModalDataT = {
  isOpen: false,
  type: 'add',
  isRequested: false,
  fields: {
    department: {
      type: 'select',
      required: true,
      label: 'Подкатегория',
      placeholder: 'Название',
      options: [],
    },
    us: {
      type: 'text',
      label: 'USA',
      placeholder: '0',
    },
    en: {
      type: 'text',
      label: 'EU',
      placeholder: '0',
    },
    uk: {
      type: 'text',
      label: 'GB',
      placeholder: '0',
    },
    name: {
      type: 'text',
      label: 'Размер',
      placeholder: '0',
    },
    it: {
      type: 'text',
      label: 'IT',
      placeholder: '0',
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
    type: 0,
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
