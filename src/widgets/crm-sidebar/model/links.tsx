import { CheckListIcon, FilterIcon, ImageIcon, MenuIcon } from '@/shared/ui/icons';
import { CombineCellsIcon } from '@/shared/ui/icons/CombineCellsIcon';
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
