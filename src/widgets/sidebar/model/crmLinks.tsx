import { ClientsIcon, FinanceIcon, OrdersIcon, RemainderIcon } from '@/shared/ui/icons';

export const crmLinks = [
  {
    title: 'Клиенты',
    icon: <ClientsIcon />,
    children: [
      {
        title: 'Клиенты',
        pathname: '/crm/clients',
      },
      {
        title: 'Программа лояльности',
        pathname: '/crm/loyalty',
      },
      {
        title: 'Письма',
        pathname: '/crm/letter',
      },
    ],
  },
  {
    title: 'Заказы',
    icon: <OrdersIcon />,
    children: [
      {
        title: 'Оформление заказа покупателем',
        pathname: '/crm/orders-shipment',
      },
      {
        title: 'Отгрузка заказов в службу доставки',
        pathname: '/crm/orders-goods',
      },
      {
        title: 'Забор товара со складов',
        pathname: '/crm/orders-delivery',
      },
      {
        title: 'Перемещения товаров',
        pathname: '/crm/orders-movement',
      },
      {
        title: 'Отмена заказа',
        pathname: '/crm/order-cancel',
      },
      {
        title: 'Возврат заказа',
        pathname: '/crm/order-return',
      },
    ],
  },
  {
    title: 'Остаток',
    icon: <RemainderIcon />,
    pathname: '/crm/remainder',
  },
  {
    title: 'Финансы',
    icon: <FinanceIcon />,
    pathname: '/crm/finance',
  },
];
