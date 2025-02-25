import { useEffect, useState } from 'react';
import { Table } from '@/widgets/table';
import { columns } from '../config/columns';
import { EditIcon, ViewIcon } from '@/shared/ui/icons';
import { OrderService } from '@/shared/api/services';
import { useModal } from '@/shared/hooks';
import { OrderDetailsModal } from '@/pages/home/modals/OrderDetailsModal';
import { TableDataT } from '@/shared/types';

export const CanceledPackages = () => {
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

  const { openModal } = useModal();

  useEffect(() => {
    setData((prev) => ({ ...prev, status: { ...prev.status, loading: true } }));
    OrderService.getOrders({ ...data.pagination, ...data.filters })
      .then((resp) => {
        setData((prev) => ({
          ...prev,
          rows: resp.data.items,
          count: resp.data.info.count,
        }));
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
            return (
              <div>
                <button>
                  <EditIcon />
                </button>
                <button
                  onClick={() =>
                    openModal('order-detail-modal', <OrderDetailsModal id={row.id} />, {
                      title: `Детали данных заказа №${row.id}`,
                    })
                  }
                >
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
