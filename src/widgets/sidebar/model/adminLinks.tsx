import { SoftUnboxPage } from '@/pages/soft-unbox-page';
import {
  CheckListIcon,
  FilterIcon,
  ImageIcon,
  MenuIcon,
  CombineCellsIcon,
  ExpandIcon,
  ChartIcon,
  UserVoiceIcon,
  MobileIcon,
  SoftIcon,
} from '@/shared/ui/icons';
import { NoteIcon } from '@/shared/ui/icons/NoteIcon';
import { BiHome } from 'react-icons/bi';

export const adminLinks = [
  {
    title: 'Главная',
    icon: <BiHome size={20} />,
    pathname: '/admin',
  },
  {
    title: 'Отделы',
    icon: <MenuIcon />,
    children: [
      {
        title: 'Отделы',
        pathname: '/admin/departments',
      },
      {
        title: 'Подотделы',
        pathname: '/admin/sub-departments',
      },
    ],
  },
  {
    title: 'Категории',
    icon: <CheckListIcon />,
    children: [
      {
        title: 'Категории',
        pathname: '/admin/categories',
      },
      {
        title: 'Подкатегории',
        pathname: '/admin/sub-categories',
      },
      {
        title: 'Внутренние категории',
        pathname: '/admin/inner-categories',
      },
    ],
  },
  {
    title: 'Дополнительные фильтры',
    icon: <FilterIcon />,
    pathname: '/admin/additional-filters',
  },
  {
    title: 'Комбинации',
    icon: <CombineCellsIcon />,
    pathname: '/admin/combinations',
  },
  {
    title: 'Баннеры',
    icon: <ImageIcon />,
    pathname: '/admin/banners',
  },
  {
    title: 'Размеры',
    icon: <ExpandIcon />,
    pathname: '/admin/sizes',
  },
  {
    title: 'Поставщики',
    icon: <UserVoiceIcon />,
    pathname: '/admin/suppliers',
  },
  {
    title: 'Импортная пошлина',
    icon: <NoteIcon />,
    pathname: '/admin/import-duties',
  },
  {
    title: 'Процент маржи',
    icon: <ChartIcon />,
    pathname: '/admin/margin-percentage',
  },
  {
    title: 'Система управления контентом',
    icon: <MobileIcon />,
    pathname: '/admin/crm',
  },
  {
    title: 'SOFT',
    icon: <SoftIcon />,
    pathname: '/admin/soft-page',
    children: [
      {
        title: 'Распаковка',
        pathname: '/admin/soft-unbox-page',
      },
      {
        title: 'Загрузка фотографии',
        pathname: '/admin/soft-image-upload',
        icon: <SoftUnboxPage />,
      },
      {
        title: 'Растановка фотографий карточки товаров',
        pathname: '/admin/soft-card-order',
      },
      {
        title: 'Перевод',
        pathname: '/admin/soft-translate',
      },
    ],
  },
];
