import { ModalProvider } from '@/shared/providers/ModalProvider';
import { Layout } from '@/widgets/layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { CategoriesPage } from '@/pages/categories';
import { ClientsPage } from '@/pages/clients';
import { DepartmentsPage } from '@/pages/departments';
import { HomePage } from '@/pages/home';
import { InnercategoriesPage } from '@/pages/innercategories';
import { SubcategoriesPage } from '@/pages/subcategories';
import { SubdepartmentsPage } from '@/pages/subdepartments';

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
        path: '/subdepartments',
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
        path: '/clients',
        element: <ClientsPage />,
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
