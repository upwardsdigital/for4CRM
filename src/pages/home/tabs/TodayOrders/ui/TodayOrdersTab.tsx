import { useEffect, useState } from 'react';
import { Table } from '@/widgets/table';
import { columns } from '../config/columns';
import { EditIcon, ViewIcon } from '@/shared/ui/icons';
import { OrderService } from '@/shared/api/services';
import { format } from 'date-fns';
import { TableDataT } from '@/shared/types';

export const TodayOrdersTab = () => {
  const [data, setData] = useState<TableDataT>({
    rows: [],
    count: 0,
    status: {
      loading: false,
      error: false,
      message: '',
    },
    filters: {
      search: '',
    },
    pagination: {
      skip: 0,
      take: 10,
    },
  });

  useEffect(() => {
    setData((prev) => ({ ...prev, status: { ...prev.status, loading: true } }));
    const today = new Date().toISOString();
    OrderService.getOrders({
      startDate: format(today, 'yyyy-MM-dd'),
      endDate: format(today, 'yyyy-MM-dd'),
    })
      .then((resp) => {
        setData((prev) => ({ ...prev, rows: resp.data.items, count: resp.data.info.count }));
      })
      .finally(() => {
        setData((prev) => ({ ...prev, status: { ...prev.status, loading: false } }));
      });
  }, [data.filters, data.pagination]);

  return (
    <Table
      table={data}
      setTable={setData}
      columns={[
        ...columns,
        {
          type: 'actions',
          field: 'actions',
          width: 100,
          renderCell: ({ row }) => {
            console.log(row);
            return (
              <div>
                <button>
                  <EditIcon />
                </button>
                <button>
                  <ViewIcon />
                </button>
              </div>
            );
          },
        },
      ]}
    />
  );
};
