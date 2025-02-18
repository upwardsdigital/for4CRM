import { CheckListIcon, MenuIcon } from '@/shared/ui/icons';
import { BiHome } from 'react-icons/bi';

export const links = [
  {
    title: 'Главная',
    icon: <BiHome size={20} />,
    pathname: '/home',
  },
  {
    title: 'Отделы',
    icon: <MenuIcon />,
    children: [
      {
        title: 'Отделы',
        pathname: '/departments',
      },
      {
        title: 'Подотделы',
        pathname: '/sub-departments',
      },
    ],
  },
  {
    title: 'Категории',
    icon: <CheckListIcon />,
    children: [
      {
        title: 'Категории',
        pathname: '/categories',
      },
      {
        title: 'Подкатегории',
        pathname: '/sub-categories',
      },
      {
        title: 'Внутренние категории',
        pathname: '/inner-categories',
      },
    ],
  },
];
