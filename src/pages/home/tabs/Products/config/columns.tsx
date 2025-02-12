import { GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';

export const columns: GridColDef[] = [
  {
    type: 'string',
    headerName: '№',
    field: 'id',
    flex: 1,
    width: 100,
  },
  {
    type: 'string',
    headerName: 'Отдел',
    field: 'department',
    valueFormatter: (value: any) => (value ? value.name : ''),
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'Подотдел',
    field: 'subDepartment',
    valueFormatter: (value: any) => (value ? value.name : ''),
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'Категория',
    field: 'category',
    valueFormatter: (value: any) => (value ? value.name : ''),
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'Подкатегория',
    field: 'subCategory',
    valueFormatter: (value: any) => (value ? value.name : ''),
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'Внутренняя категория',
    field: 'innerCategory',
    valueFormatter: (value: any) => (value ? value.name : ''),
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'Товары',
    field: 'name',
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'Количество',
    field: 'productCount',
    flex: 1,
  },
];
