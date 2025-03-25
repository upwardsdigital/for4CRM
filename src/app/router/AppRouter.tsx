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
import { LoyaltyPage } from '@/pages/loyalty';
import { LetterPage } from '@/pages/letter';
import { OrdersShipment } from '@/pages/orders-shipment';
import { OrdersGoods } from '@/pages/orders-goods';
import { OrdersDelivery } from '@/pages/orders-delivery';
import { OrdersMovement } from '@/pages/orders-movement';
import { RemainderPage } from '@/pages/remainder';
import { FinancePage } from '@/pages/finance';
import { OrderCancel } from '@/pages/order-cancel';
import { OrderReturn } from '@/pages/order-return';
import { SoftPage } from '@/pages/soft-page';
import { SoftUnboxPage } from '@/pages/soft-unbox-page';
import { SoftImageUpload } from '@/pages/soft-image-upload';
import { SoftCardOrder } from '@/pages/soft-card-order';
import { SoftTranslate } from '@/pages/soft-translate';

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
      { path: 'soft-page', element: <SoftPage /> },
      { path: 'soft-unbox-page', element: <SoftUnboxPage /> },
      { path: 'soft-image-upload', element: <SoftImageUpload /> },
      { path: 'soft-card-order', element: <SoftCardOrder /> },
      { path: 'soft-translate', element: <SoftTranslate /> },
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
      {
        path: 'loyalty',
        element: <LoyaltyPage />,
      },
      {
        path: 'letter',
        element: <LetterPage />,
      },
      {
        path: 'orders-shipment',
        element: <OrdersShipment />,
      },
      {
        path: 'orders-goods',
        element: <OrdersGoods />,
      },
      {
        path: 'orders-delivery',
        element: <OrdersDelivery />,
      },
      {
        path: 'orders-movement',
        element: <OrdersMovement />,
      },
      {
        path: 'remainder',
        element: <RemainderPage />,
      },
      {
        path: 'finance',
        element: <FinancePage />,
      },
      {
        path: 'order-cancel',
        element: <OrderCancel />,
      },
      {
        path: 'order-return',
        element: <OrderReturn />,
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
