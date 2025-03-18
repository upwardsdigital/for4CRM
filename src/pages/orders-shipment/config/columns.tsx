import { GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';

export const columns: GridColDef[] = [
  {
    type: 'string',
    headerName: '№',
    field: 'id',
    width: 50,
  },
  {
    type: 'string',
    headerName: '№ заказа',
    field: 's',
    width: 100,
  },
  {
    type: 'string',
    headerName: '1. Магазин',
    field: 'a',
    width: 100,
  },
  {
    type: 'string',
    headerName: '2. Покупатель',
    field: 'first_name',
    flex: 1,
    renderCell: ({ row }) => `${row.first_name} ${row.last_name}`,
  },
  {
    type: 'string',
    headerName: '3. Дата и время оформления заказа',
    field: 'created_at',
    flex: 1,
    valueFormatter: (value) => format(value, 'dd/MM/yyyy'),
  },
  {
    type: 'string',
    headerName: '4. Статус оплаты',
    field: 'is_active',
    flex: 1,
  },
  {
    type: 'string',
    headerName: '5. Статус товара ',
    field: 'order_status',
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'Менеджер',
    field: 'manager',
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'Примечание',
    field: 'note',
    flex: 1,
  },
];
