import { useEffect, useState } from 'react';
import { Table } from '@/widgets/table';
import { columns } from '../config/columns';
import { TableDataT } from '@/shared/types';
import { UserService } from '@/shared/api/services/UserService';
import { ToggleButton } from '@/shared/ui/ToggleButton';
import { ViewIcon } from '@/shared/ui/icons';

export const UsersTab = () => {
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
      const userIndex = data.rows.findIndex((item) => item.id === id);
      prevRowsCopy[userIndex].is_active = status;
      return { ...prev, rows: prevRowsCopy };
    });
  };

  useEffect(() => {
    setData((prev) => ({ ...prev, status: { ...prev.status, loading: true } }));
    UserService.getUsers(data.pagination)
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
