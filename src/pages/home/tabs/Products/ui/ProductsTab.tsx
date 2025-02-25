import { useEffect, useState } from 'react';
import { Table } from '@/widgets/table';
import { columns } from '../config/columns';
import { ProductService } from '@/shared/api/services';
import { TableDataT } from '@/shared/types';

export const ProductsTab = () => {
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
    ProductService.getProducts({ ...data.pagination, ...data.filters })
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
    <Table search={data.filters.search} table={data} setTable={setData} columns={[...columns]} />
  );
};
