import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ModalProvider } from '@/shared/providers/ModalProvider';
import { Layout } from '@/widgets/layout';

import { HomePage } from '@/pages/home';
import { DepartmentsPage } from '@/pages/departments';
import { SubdepartmentsPage } from '@/pages/subdepartments';
import { CategoriesPage } from '@/pages/categories';
import { SubcategoriesPage } from '@/pages/subcategories';
import { InnercategoriesPage } from '@/pages/innercategories';

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
