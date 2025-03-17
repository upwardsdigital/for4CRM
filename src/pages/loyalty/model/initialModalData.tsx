import { ModalDataT } from '@/shared/types';

export const initialModalData: ModalDataT = {
  isOpen: false,
  type: 'add',
  isRequested: false,
  fields: {
    sub_email: {
      type: 'checkbox',
      label: 'Подписан на почту',
    },
    sub_whatsapp: {
      type: 'checkbox',
      label: 'Подписан на WhatsApp',
    },
    first_name: {
      type: 'text',
      label: 'Имя',
    },
    last_name: {
      type: 'text',
      label: 'Фамилия',
    },
    gender: {
      type: 'select',
      required: true,
      label: 'Пол',
      options: [
        { value: 'male', label: 'муж.' },
        { value: 'female', label: 'жен.' },
      ],
      placeholder: 'Выбрать',
    },
    email: {
      type: 'text',
      required: true,
      label: 'Почта',
    },
    phone: {
      type: 'number',
      label: 'Номер телефона',
      placeholder: '+0',
      required: true,
    },
    birth_date: {
      type: 'date',
      label: 'Дата рождения',
      placeholder: '00/00/1900',
    },
    address: {
      type: 'text',
      label: 'Адрес',
    },
    tags: {
      type: 'select',
      label: 'Тэги',
      placeholder: 'Тэг',
      options: [],
    },
    iin: {
      type: 'number',
      label: 'ИНН',
      required: true,
      placeholder: '0',
    },
    count_orders: {
      type: 'number',
      label: 'Количество заказов',
      placeholder: '0',
    },
    orders: {
      type: 'number',
      label: '№ Заказы',
      placeholder: '№',
    },
    sum_orders: {
      type: 'number',
      label: 'Сумма заказов',
      placeholder: '0',
    },
    password: {
      type: 'password',
      label: 'Пароль',
      placeholder: 'Введите пароль',
    },
    // created_at: {
    //   type: 'date',
    //   label: 'Дата регистрации',
    //   placeholder: '00/00/1900',
    // },
  },
  values: {
    type: 2,
    first_name: '',
    last_name: '',
    gender: '',
    email: '',
    phone: '',
    birth_date: '',
    address: '',
    tags: '',
    iin: '',
    count_orders: '',
    orders: '',
    sum_orders: '',
    sub_whatsapp: '',
    sub_email: '',
    password: '',
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
