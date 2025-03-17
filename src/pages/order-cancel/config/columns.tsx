import { GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';

export const columns: GridColDef[] = [
  {
    type: 'string',
    headerName: '№',
    field: 'ss',
  },
  {
    type: 'string',
    headerName: '№ заказа',
    field: 'sss',
  },
  {
    type: 'string',
    headerName: 'Дата и время заказа',
    field: 'created_at',
    flex: 1,
    valueFormatter: (value) => format(value, 'dd/MM/yyyy'),
  },
  {
    type: 'string',
    headerName: 'Статус заказа',
    field: 'ssss',
  },
  {
    type: 'string',
    headerName: 'Дата и время запроса на отмену',
    field: 'sssss',
  },
  {
    type: 'string',
    headerName: 'Причина отмены',
    field: 'ssssss',
  },
  {
    type: 'string',
    headerName: 'Статус запроса',
    field: 'sa',
  },
  {
    type: 'string',
    headerName: 'Статус возврата средств',
    field: 'saa',
  },
  {
    type: 'string',
    headerName: 'Примечание',
    field: 'saaa',
  },
  {
    type: 'string',
    headerName: 'Менеджер',
    field: 'saaaa',
  },
];
