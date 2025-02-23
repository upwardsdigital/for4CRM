import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ModalProvider } from '@/shared/providers/ModalProvider';
import { Layout } from '@/widgets/layout';

import { HomePage } from '@/pages/home';
import { DepartmentsPage } from '@/pages/departments';
import { SubdepartmentsPage } from '@/pages/subdepartments';
import { CategoriesPage } from '@/pages/categories';
import { SubcategoriesPage } from '@/pages/subcategories';
import { InnercategoriesPage } from '@/pages/innercategories';
import { BannersPage } from '@/pages/banners';
import { AdditionalFilters } from '@/pages/additional-filters';
import { CombinationsPage } from '@/pages/combinations';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/departments',
        element: <DepartmentsPage />,
      },
      {
        path: '/sub-departments',
        element: <SubdepartmentsPage />,
      },
      {
        path: '/categories',
        element: <CategoriesPage />,
      },
      {
        path: '/sub-categories',
        element: <SubcategoriesPage />,
      },
      {
        path: '/inner-categories',
        element: <InnercategoriesPage />,
      },
      {
        path: '/additional-filters',
        element: <AdditionalFilters />,
      },
      {
        path: '/combinations',
        element: <CombinationsPage />,
      },
      {
        path: '/banners',
        element: <BannersPage />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return (
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  );
};
