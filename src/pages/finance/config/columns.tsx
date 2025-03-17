import { GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';

export const columns: GridColDef[] = [
  {
    type: 'string',
    headerName: '№',
    field: 'sasd',
    width: 60,
  },
  {
    type: 'string',
    headerName: '№ Заказа',
    field: 's',
    width: 90,
  },
  {
    type: 'string',
    headerName: 'ID Товара',
    field: 'aasdasd',
    width: 90,
  },
  {
    type: 'string',
    headerName: 'НЕТТО Стоимость товара',
    field: 'a',
    width: 90,
  },
  {
    type: 'string',
    headerName: 'НЕТТО Стоимость доставки',
    field: 'ab',
    width: 90,
  },
  {
    type: 'string',
    headerName: 'Импортная пошлина 15%',
    field: 'ac',
    width: 90,
  },
  {
    type: 'string',
    headerName: 'НДС 12%',
    field: 'created_at',
    flex: 1,
    width: 90,
    valueFormatter: (value) => format(value, 'dd/MM/yyyy'),
  },
  {
    type: 'string',
    headerName: 'Коммисия 4You',
    field: 'acasd',
    width: 90,
  },
  {
    type: 'string',
    headerName: 'Оборот',
    field: 'acasdasd',
    width: 90,
  },
  {
    type: 'string',
    headerName: 'Валовый доход до вычета налогов',
    field: 'acasdsa',
    width: 90,
  },
  {
    type: 'string',
    headerName: 'КПН 20%',
    field: 'acasda',
    width: 90,
  },
  {
    type: 'string',
    headerName: 'НДС 12%',
    field: 'acasdasdc',
    width: 90,
  },
  {
    type: 'string',
    headerName: 'Прибыль после вычета налогов',
    field: 'acasdqwe',
    width: 90,
  },
];
