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
    headerName: '13. Курьер',
    field: 'aasdasd',
  },
  {
    type: 'string',
    headerName: '14. Дата офоромления доставки (передача курьеру)',
    field: 'a',
    width: 180,
  },
  {
    type: 'string',
    headerName: '15. Статус ',
    field: 'ab',
  },
  {
    type: 'string',
    headerName: '16. Дистрибуционый склад',
    field: 'ac',
  },
  {
    type: 'string',
    headerName: '17. Дата прибытия в дистрибуционный скалад',
    field: 'created_at',
    flex: 1,
    valueFormatter: (value) => format(value, 'dd/MM/yyyy'),
  },
  {
    type: 'string',
    headerName: '18. Статус',
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
