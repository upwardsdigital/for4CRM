import { ModalDataT } from '@/shared/types';

export const initialModalData: ModalDataT = {
  isOpen: false,
  type: 'add',
  isRequested: false,
  fields: {
    status: {
      type: 'select',
      label: 'Статус',
      options: [
        {
          value: true,
          label: 'Не активный',
        },
        {
          value: false,
          label: 'Не активный',
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
    type: 0,
    status: false,
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
