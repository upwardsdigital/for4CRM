import { ModalDataT } from '@/shared/types';

export const initialModalData: ModalDataT = {
  isOpen: false,
  type: 'add',
  isRequested: false,
  fields: {
    price_from: {
      type: 'text',
      required: true,
      label: 'Стоимость от ($)',
      placeholder: 'Название',
    },
    price_to: {
      type: 'text',
      required: true,
      label: 'Стоимость до ($)',
      placeholder: 'Название',
    },
    percent: {
      type: 'text',
      label: 'Процент маржи',
      placeholder: 'Название',
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
