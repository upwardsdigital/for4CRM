import { ClientService } from '@/shared/api/services';
import { UserService } from '@/shared/api/services/UserService';
import { TableDataT } from '@/shared/types';
import { Button } from '@/shared/ui/Button/ui/Button';
import { ViewIcon } from '@/shared/ui/icons';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { ToggleButton } from '@/shared/ui/ToggleButton';
import { Table } from '@/widgets/table';
import { useEffect, useState } from 'react';
import { columns } from '../config/columns';

export const ClientsPage = () => {
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
    ClientService.getClients(data.pagination)
      .then((resp) => {
        setData((prev) => ({
          ...prev,
          rows: resp.data.items,
          count: resp.data.info.count,
        }));
      })
      .finally(() => {});
  }, [data.filters, data.pagination]);

  return (
    <div>
      <div className="page-header">
        <h1 className="page_title">Клиенты</h1>
        <Button onClick={() => {}}>
          <PlusIcon />
          Добавить
        </Button>
      </div>
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
    </div>
  );
};
