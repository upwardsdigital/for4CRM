import { ClientService } from '@/shared/api/services';
import { ModalDataT, TableDataT } from '@/shared/types';
import { Button } from '@/shared/ui/Button/ui/Button';
import { Table } from '@/widgets/table';
import { useEffect, useState } from 'react';
import { columns } from '../config/columns';
import styles from './RemainderPage.module.sass';
import { initialModalData } from '../model/initialModalData';
import { FilterDown } from '@/shared/ui/icons/FilterDown';
import { Select } from '@/shared/ui/Select/ui/Select';
import { TextField } from '@/shared/ui/TextField';
import { FilterUp } from '@/shared/ui/icons';

export const RemainderPage = () => {
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
      store: null,
      department: null,
      categories: null,
      subcategory: null,
      order_quantity: null,
    },
    pagination: {
      skip: 0,
      take: 10,
    },
  });

  const [modalData, setModalData] = useState<ModalDataT>(initialModalData);
  const [tagsOptions, setTagsOptions] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    dateRange: [null, null],
    orderCount: [0, 0],
    orderCheck: [0, 0],
  });

  const [selectedTags, setSelectedTags] = useState('');

  const handleTagsChange = (val) => {
    setSelectedTags(val.value);
  };

  const handleApplyFilters = () => {
    setData((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        store: null,
        department: null,
        categories: null,
        subcategory: null,
        order_quantity: null,
      },
    }));
  };

  const fetchClientTags = async () => {
    try {
      const response = await ClientService.clientTags({ data });
      const tags = response.data || [];
      return tags.map((tag) => ({ value: tag.id, label: tag.name }));
    } catch (error) {
      console.error('Ошибка при получении тегов:', error);
      return [];
    }
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  useEffect(() => {
    const getTags = async () => {
      const options = await fetchClientTags();
      setTagsOptions(options);
    };

    getTags();
  }, []);

  useEffect(() => {
    setData((prev) => ({ ...prev, status: { ...prev.status, loading: true } }));
    ClientService.getClients({ ...data.pagination, ...data.filters })
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

  useEffect(() => {
    const fetchClientTags = async () => {
      try {
        const response = await ClientService.clientTags({ data });
        const tags = response.data || [];

        setModalData((prev) => ({
          ...prev,
          fields: {
            ...prev.fields,
            tags: {
              ...prev.fields.tags,
              options: tags.map((tag) => ({ value: tag.id, label: tag.name })),
            },
          },
        }));
      } catch (error) {
        console.error('Ошибка при получении тегов:', error);
      }
    };

    if (modalData.isOpen) {
      fetchClientTags();
    }
  }, [modalData.isOpen]);

  return (
    <div>
      <div className="page-header">
        <h1 className="page_title">Остатки</h1>
        {/* <Button onClick={handleModalOpen}>
          <PlusIcon />
          Добавить
        </Button> */}
      </div>
      <div className={styles.filter_title}>
        <div
          onClick={toggleFilter}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          Развернуть фильтр {filterOpen ? <FilterUp /> : <FilterDown />}
        </div>
      </div>

      {filterOpen && (
        <div className={styles.filter_items}>
          <div className={styles.filter_content}>
            <Select
              label="Магазин"
              placeholder="Выбрать"
              options={tagsOptions}
              className={styles.filter_item_select}
              onChange={handleTagsChange}
              value={selectedTags}
            />
            <Select
              label="Отдел"
              placeholder="Выбрать"
              options={tagsOptions}
              className={styles.filter_item_select}
              onChange={handleTagsChange}
              value={selectedTags}
            />
            <Select
              label="Категория"
              placeholder="Выбрать"
              options={tagsOptions}
              className={styles.filter_item_select}
              onChange={handleTagsChange}
              value={selectedTags}
            />
          </div>
          <div className={styles.filter_content}>
            <Select
              label="Подкатегория"
              placeholder="Выбрать"
              options={tagsOptions}
              className={styles.filter_item_select}
              onChange={handleTagsChange}
              value={selectedTags}
            />
            <div className={styles.filter_item_order}>
              <label className={styles.filter_item_label}>Количество заказов</label>
              <div className={styles.filter_item_count_orders}>
                <TextField
                  type="number"
                  value={filters.orderCount[0]}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      orderCount: [Number(event.target.value), prev.orderCount[1]],
                    }))
                  }
                  className={styles.filter_item_count_order}
                />
                <span> – </span>
                <TextField
                  type="number"
                  value={filters.orderCount[1]}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      orderCount: [prev.orderCount[0], Number(event.target.value)],
                    }))
                  }
                  className={styles.filter_item_count_order}
                />
              </div>
            </div>
            <Button className={styles.filter_item_btn} onClick={handleApplyFilters}>
              Применить
            </Button>
          </div>
        </div>
      )}

      <Table
        table={data}
        setTable={setData}
        search={data.filters.search}
        columns={[...columns.filter((column) => column.field !== 'actions')]}
      />
    </div>
  );
};
