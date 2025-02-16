import { useEffect, useState } from 'react';
import { Table } from '@/widgets/table';
import { columns } from '../config/columns';
import { EditIcon, TagIcon, ViewIcon } from '@/shared/ui/icons';
import { TableDataT } from '@/shared/types';
import { BrandService } from '@/shared/api/services/BrandService';
import { ToggleButton } from '@/shared/ui/ToggleButton';

export const BrandsTab = () => {
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

  const updateBrandStatus = (id: number, status: boolean) => {
    setData((prev) => {
      const prevRowsCopy = [...prev.rows];
      const brandIndex = data.rows.findIndex((item) => item.id === id);
      prevRowsCopy[brandIndex].is_active = status;
      return { ...prev, rows: prevRowsCopy };
    });
  };

  useEffect(() => {
    setIsLoading(true);
    BrandService.getBrands(data.pagination)
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
      title={
        <h2 className="table-title">
          <TagIcon />
          Бренды
        </h2>
      }
      table={data}
      setTable={setData}
      columns={[
        ...columns,
        {
          type: 'actions',
          field: 'actions',
          flex: 1,
          renderCell: ({ row }) => {
            return (
              <div className="table-actions">
                <ToggleButton
                  value={row.is_active}
                  onChange={(e) => {
                    const value = e.target.checked;
                    updateBrandStatus(row.id, value);
                    BrandService.updateBrandById({
                      is_active: value,
                      id: row.id,
                    }).catch(() => {
                      updateBrandStatus(row.id, !value);
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
