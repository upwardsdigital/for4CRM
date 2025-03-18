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
    headerName: '18. Дата оформления доставки покупателю',
    field: 'a',
    width: 180,
  },
  {
    type: 'string',
    headerName: '19. Курьер',
    field: 'aasdasd',
  },
  {
    type: 'string',
    headerName: '20. Статус ',
    field: 'ab',
  },
  {
    type: 'string',
    headerName: '20. Покупатель',
    field: 'ac',
  },
  {
    type: 'string',
    headerName: '21. Дата доставки',
    field: 'created_at',
    flex: 1,
    valueFormatter: (value) => format(value, 'dd/MM/yyyy'),
  },
  {
    type: 'string',
    headerName: '22. Статус',
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
