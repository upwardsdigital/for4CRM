import { ModalProvider } from '@/shared/providers/ModalProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@/widgets/layout';

import { CategoriesPage } from '@/pages/categories';
import { DepartmentsPage } from '@/pages/departments';
import { HomePage } from '@/pages/home';
import { InnercategoriesPage } from '@/pages/innercategories';
import { BannersPage } from '@/pages/banners';
import { AdditionalFilters } from '@/pages/additional-filters';
import { CombinationsPage } from '@/pages/combinations';
import { SubdepartmentsPage } from '@/pages/subdepartments';
import { SubcategoriesPage } from '@/pages/subcategories';
import { SizesPage } from '@/pages/sizes';
import { MarginPercentage } from '@/pages/margin-percentage';
import { ImportDutiesPage } from '@/pages/import-duties';
import { SuppliersPage } from '@/pages/suppliers';
import { LoginPage } from '@/pages/login';
import { ClientsPage } from '@/pages/clients';

const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  {
    path: '/admin',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '*',
        element: <>Not Found Page</>,
      },
      {
        path: 'departments',
        element: <DepartmentsPage />,
      },
      {
        path: 'sub-departments',
        element: <SubdepartmentsPage />,
      },
      {
        path: 'categories',
        element: <CategoriesPage />,
      },
      {
        path: 'sub-categories',
        element: <SubcategoriesPage />,
      },
      {
        path: 'inner-categories',
        element: <InnercategoriesPage />,
      },
      {
        path: 'additional-filters',
        element: <AdditionalFilters />,
      },
      {
        path: 'combinations',
        element: <CombinationsPage />,
      },
      {
        path: 'banners',
        element: <BannersPage />,
      },
      {
        path: 'sizes',
        element: <SizesPage />,
      },
      {
        path: 'margin-percentage',
        element: <MarginPercentage />,
      },
      { path: 'import-duties', element: <ImportDutiesPage /> },
      { path: 'suppliers', element: <SuppliersPage /> },
    ],
  },
  {
    path: '/crm',
    element: <Layout isCrm />,
    children: [
      {
        path: 'clients',
        element: <ClientsPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

export const AppRouter = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </QueryClientProvider>
  );
};
