import { GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';

export const columns: GridColDef[] = [
  {
    type: 'string',
    headerName: '№ заказа',
    field: 's',
  },
  {
    type: 'string',
    headerName: 'Дата оформления доставки покупателю',
    field: 'a',
    width: 180,
  },
  {
    type: 'string',
    headerName: 'Курьер',
    field: 'aasdasd',
  },
  {
    type: 'string',
    headerName: 'Статус ',
    field: 'ab',
  },
  {
    type: 'string',
    headerName: 'Покупатель',
    field: 'ac',
  },
  {
    type: 'string',
    headerName: 'Дата доставки',
    field: 'created_at',
    flex: 1,
    valueFormatter: (value) => format(value, 'dd/MM/yyyy'),
  },
  {
    type: 'string',
    headerName: 'Статус',
    field: 'af',
  },
  {
    type: 'string',
    headerName: 'Менеджер',
    field: 'ag',
    renderCell: ({ row }) => `${row.first_name} ${row.last_name}`,
  },
  {
    type: 'string',
    headerName: 'Примечание',
    field: 'ah',
  },
];
