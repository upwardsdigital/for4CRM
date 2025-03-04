import { ModalDataT } from '@/shared/types';

export const initialModalData: ModalDataT = {
  isOpen: false,
  type: 'add',
  isRequested: false,
  fields: {
    country: {
      type: 'select',
      required: true,
      label: 'Страна назначения',
      placeholder: 'Выберите страну',
      options: [],
    },
    dutyFreeAmount: {
      type: 'text',
      label: 'Сумма, не облагаемая пошлиной',
      placeholder: '0',
    },
    custom_duty_percent: {
      type: 'text',
      label: 'Процент импортной пошлины',
      placeholder: '0',
    },
    vat: {
      type: 'text',
      label: 'НДС',
      placeholder: '0',
    },
    brokerage_services_price: {
      type: 'text',
      label: 'Брокерские услуги',
      placeholder: '0',
    },
    custom_duty: {
      type: 'text',
      label: 'Таможенный сбор',
      placeholder: '0',
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
