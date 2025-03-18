import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
  {
    type: 'string',
    headerName: '№ заказа',
    field: 's',
  },
  {
    type: 'string',
    headerName: '6. Дата офоромления доставки (передача курьеру)',
    field: 'a',
    width: 180,
  },
  {
    type: 'string',
    headerName: '7. Курьер',
    field: 'aasdasd',
  },
  {
    type: 'string',
    headerName: '8. Статус доставки',
    field: 'ab',
  },
  {
    type: 'string',
    headerName: '9. Транзитный склад',
    field: 'ac',
  },
  {
    type: 'string',
    headerName: '11. Дата прибытия на транзитный склад',
    field: 'ad',
    width: 170,
  },
  {
    type: 'string',
    headerName: '12. Статус',
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
