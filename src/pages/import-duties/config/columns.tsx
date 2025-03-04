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
    headerName: 'Страна',
    field: 'country',
    sortable: true,
    width: 140,
    valueGetter: (value: any) => value?.name,
  },
  {
    type: 'string',
    headerName: 'Сумма, не ОП',
    field: 'dutyFreeAmount',
    flex: 1,
    sortable: true,
  },
  {
    type: 'string',
    headerName: 'Процент ИП',
    field: 'custom_duty_percent',
    width: 140,
    sortable: true,
  },
  {
    type: 'string',
    headerName: 'НДС',
    field: 'vat',
    width: 140,
    sortable: true,
  },
  {
    type: 'string',
    headerName: 'БУ',
    field: 'brokerage_services_price',
    width: 140,
    sortable: true,
  },
  {
    type: 'string',
    headerName: 'ТС',
    field: 'custom_duty',
    width: 140,
    sortable: true,
  },
];
