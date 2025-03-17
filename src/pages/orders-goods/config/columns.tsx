import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
  {
    type: 'string',
    headerName: '№ заказа',
    field: 's',
  },
  {
    type: 'string',
    headerName: 'Дата офоромления доставки (передача курьеру)',
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
    headerName: 'Статус доставки',
    field: 'ab',
  },
  {
    type: 'string',
    headerName: 'Транзитный склад',
    field: 'ac',
  },
  {
    type: 'string',
    headerName: 'Дата прибытия на транзитный склад',
    field: 'ad',
    width: 170,
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
