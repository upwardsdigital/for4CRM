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
    headerName: 'код промокода',
    field: 'code',
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'описание промокода',
    field: 'name',
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'количество',
    field: 'quantity',
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'действителен с:',
    field: 'valid_from',
    valueFormatter: (value) => format(value, 'dd.MM.yyyy'),
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'действителен до:',
    field: 'valid_to',
    valueFormatter: (value) => format(value, 'dd.MM.yyyy'),
    flex: 1,
  },
  {
    type: 'string',
    headerName: 'Активный',
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
