import { ModalDataT } from '@/shared/types';

export const initialModalData: ModalDataT = {
  isOpen: false,
  type: 'add',
  isRequested: false,
  fields: {
    name: {
      type: 'text',
      required: true,
      label: 'Поставщик',
      placeholder: 'Наименование орг.',
    },
    address: {
      type: 'text',
      label: 'Адрес',
      placeholder: 'ул., офис',
    },
    service: {
      type: 'text',
      label: 'Услуги',
      placeholder: '0',
    },
    api: {
      type: 'text',
      label: 'Услуги',
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
