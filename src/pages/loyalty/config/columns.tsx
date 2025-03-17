import { GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';

export const columns: GridColDef[] = [
  {
    type: 'string',
    headerName: 'ID',
    field: 'id',
    width: 70,
    sortable: true,
  },
  {
    type: 'string',
    headerName: 'Телефон',
    sortable: true,
    field: 'phone',
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'Номер карты',
    sortable: true,
    field: 'cart_number',
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'Клиент',
    sortable: true,
    field: 'first_name',
    flex: 1,
    renderCell: ({ row }) => `${row.first_name} ${row.last_name}`,
  },
  {
    type: 'string',
    headerName: 'Уровень',
    sortable: true,
    field: 'level',
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'Статус',
    sortable: true,
    field: 'is_active',
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
  {
    type: 'string',
    headerName: 'Дата регистрации',
    sortable: true,
    field: 'created_at',
    flex: 1,
    valueFormatter: (value) => format(value, 'dd/MM/yyyy'),
  },
  {
    type: 'string',
    headerName: 'Сумма покупок',
    sortable: true,
    field: 'total',
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'Баланс бонусов',
    sortable: true,
    field: 's',
    flex: 1,
  },
];
