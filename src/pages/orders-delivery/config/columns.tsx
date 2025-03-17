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
    headerName: 'Курьер',
    field: 'aasdasd',
  },
  {
    type: 'string',
    headerName: 'Дата офоромления доставки (передача курьеру)',
    field: 'a',
    width: 180,
  },
  {
    type: 'string',
    headerName: 'Статус ',
    field: 'ab',
  },
  {
    type: 'string',
    headerName: 'Дистрибуционый склад',
    field: 'ac',
  },
  {
    type: 'string',
    headerName: 'Дата прибытия в дистрибуционный скалад',
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
