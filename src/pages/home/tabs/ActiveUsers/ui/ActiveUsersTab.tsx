import { useEffect, useState } from 'react';
import { Table } from '@/widgets/table';
import { columns } from '../config/columns';
import { ViewIcon } from '@/shared/ui/icons';
import { TableDataT } from '@/shared/types';
import { UserService } from '@/shared/api/services/UserService';
import { ToggleButton } from '@/shared/ui/ToggleButton';

export const ActiveUsersTab = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  const updateUserStatus = (id: number, status: boolean) => {
    setData((prev) => {
      const prevRowsCopy = [...prev.rows];
      return {
        ...prev,
        rows: prevRowsCopy.filter((item) => item.id !== id),
      };
    });
  };

  useEffect(() => {
    setIsLoading(true);
    UserService.getUsers({ ...data.pagination, is_active: true })
      .then((resp) => {
        setData((prev) => ({
          ...prev,
          rows: resp.data.items,
          count: resp.data.info.count,
        }));
      })
      .finally(() => {
        setIsLoading(false);
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
              <div className="table-actions">
                <ToggleButton
                  value={row.is_active}
                  onChange={(e) => {
                    const value = e.target.checked;
                    updateUserStatus(row.id, value);
                    UserService.updateUserStatus({
                      is_active: value,
                      id: row.id,
                    }).catch(() => {
                      updateUserStatus(row.id, !value);
                    });
                  }}
                />
                <button onClick={() => console.log('dsds')}>
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
