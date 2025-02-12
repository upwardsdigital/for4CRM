import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ModalProvider } from '@/shared/providers/ModalProvider'
import { Layout } from '@/widgets/layout'

import { HomePage } from '@/pages/home'
import { DepartmentsPage } from '@/pages/departments'

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
        ],
    },
])

export const AppRouter = () => {
    return (
        <ModalProvider>
            <RouterProvider router={router} />
        </ModalProvider>
    )
}
