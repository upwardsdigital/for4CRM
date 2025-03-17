import { GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';

export const columns: GridColDef[] = [
  {
    type: 'string',
    headerName: 'Магазин',
    field: 's',
    width: 180,
  },
  {
    type: 'string',
    headerName: 'Отдел',
    field: 'aasdasd',
    width: 180,
  },
  {
    type: 'string',
    headerName: 'Категория',
    field: 'a',
    width: 180,
  },
  {
    type: 'string',
    headerName: 'Подкатегория ',
    field: 'ab',
    width: 180,
  },
  {
    type: 'string',
    headerName: 'Товар',
    field: 'ac',
    width: 180,
  },
  {
    type: 'string',
    headerName: 'Количество',
    field: 'created_at',
    flex: 1,
    width: 180,
    valueFormatter: (value) => format(value, 'dd/MM/yyyy'),
  },
];
