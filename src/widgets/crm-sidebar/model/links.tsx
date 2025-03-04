import { BiHome } from 'react-icons/bi';

export const links = [
  {
    title: 'Клиенты',
    icon: <BiHome />,
    children: [
      {
        title: 'Клиенты',
        pathname: '/crm',
      },
      {
        title: 'Подотделы',
        pathname: '/crm/clients',
      },
    ],
  },
];
