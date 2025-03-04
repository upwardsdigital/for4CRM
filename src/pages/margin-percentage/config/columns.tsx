import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
  {
    type: 'string',
    headerName: '№',
    field: 'id',
    width: 80,
  },
  {
    type: 'string',
    headerName: 'Стоимость от ($)',
    field: 'price_from',
    sortable: true,
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'Стоимость до ($)',
    field: 'price_to',
    sortable: true,
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'Процент маржи',
    field: 'percent',
    sortable: true,
    flex: 1,
  },
];
