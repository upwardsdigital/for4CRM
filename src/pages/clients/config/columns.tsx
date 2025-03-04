import { GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';

export const columns: GridColDef[] = [
  {
    type: 'string',
    headerName: '№',
    field: 'id',
    width: 50,
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
    headerName: 'Дата регистрации',
    sortable: true,
    field: 'created_at',
    flex: 1,
    valueFormatter: (value) => format(value, 'dd/MM/yyyy'),
  },
  {
    type: 'string',
    headerName: 'Номер телефона',
    field: 'phone',
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'Почта',
    field: 'email',
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'ИИН',
    sortable: true,
    field: 'iin',
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'Теги',
    field: 'clientTags',
    flex: 1,
    renderCell: ({ value }) =>
      value?.map((tag: string) => (
        <div key={tag} className="tag active">
          {tag}
        </div>
      )),
  },
  {
    type: 'string',
    headerName: 'Статус',
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
];
