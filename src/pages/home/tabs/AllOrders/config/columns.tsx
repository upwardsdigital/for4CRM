import { GridColDef } from '@mui/x-data-grid'
import { format } from 'date-fns'

export const columns: GridColDef[] = [
    {
        type: 'number',
        headerName: 'Номер заказа',
        field: 'order_id',
        flex: 1,
    },
    {
        type: 'string',
        headerName: 'Магазины',
        field: 'store',
        flex: 1,
    },
    {
        type: 'string',
        headerName: 'Покупатель',
        field: 'user_name',
        flex: 1,
        renderCell: ({ row }) => <a>{row.user_name}</a>,
    },
    {
        type: 'string',
        headerName: 'Дата оформления заказа',
        field: 'created_at',
        flex: 1,
        valueFormatter: (value) => format(value, 'dd/MM/yyyy'),
    },
    {
        type: 'string',
        headerName: 'Статус оплаты',
        field: 'payment_status_name',
        flex: 1,
    },
    {
        type: 'string',
        headerName: 'Статус товара',
        field: 'status_name',
        flex: 1,
    },
    {
        type: 'string',
        headerName: 'Доставка',
        field: 'supplier_delivery_name',
        flex: 1,
    },
    {
        type: 'string',
        headerName: 'Склад',
        field: 'supplier_storage_name',
        flex: 1,
    },
    {
        type: 'string',
        headerName: 'Менеджеры',
        field: 'manager_name',
        flex: 1,
    },
]
