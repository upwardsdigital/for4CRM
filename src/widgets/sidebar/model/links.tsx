import { CheckListIcon, FilterIcon, ImageIcon, MenuIcon } from '@/shared/ui/icons';
import { CombineCellsIcon } from '@/shared/ui/icons/CombineCellsIcon';
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
  {
    title: 'Дополнительные фильтры',
    icon: <FilterIcon />,
    pathname: '/additional-filters',
  },
  {
    title: 'Комбинации',
    icon: <CombineCellsIcon />,
    pathname: '/combinations',
  },
  {
    title: 'Баннеры',
    icon: <ImageIcon />,
    pathname: '/banners',
  },
];
