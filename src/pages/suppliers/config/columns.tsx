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
    headerName: 'Поставщик',
    field: 'name',
    sortable: true,
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'Услуги',
    field: 'serviceName',
    sortable: true,
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'API',
    field: 'api',
    sortable: true,
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'Адрес',
    field: 'address',
    sortable: true,
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'Статус',
    field: 'is_active',
    sortable: true,
    flex: 1,
    renderCell: ({ value }) =>
      value ? (
        <div className="status active">
          <span></span>
          <p>Активный</p>
        </div>
      ) : (
        <div className="status inactive">
          <span></span>
          <p>Неактивный</p>
        </div>
      ),
  },
];
