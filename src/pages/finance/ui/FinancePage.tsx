import { ClientService } from '@/shared/api/services';
import { ModalDataT, TableDataT } from '@/shared/types';
import { Button } from '@/shared/ui/Button/ui/Button';
import { Table } from '@/widgets/table';
import { useEffect, useState } from 'react';
import { columns } from '../config/columns';
import styles from './FinancePage.module.sass';
import { initialModalData } from '../model/initialModalData';
import { FilterDown } from '@/shared/ui/icons/FilterDown';
import { Select } from '@/shared/ui/Select/ui/Select';
import { TextField } from '@/shared/ui/TextField';
import { EditIcon, FilterUp, ViewIcon } from '@/shared/ui/icons';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { Calendar } from '@/shared/ui/icons/Calendar';
import { format } from 'date-fns';
import { useModal } from '@/shared/hooks/useModal';

export const FinancePage = () => {
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
  const [detailsSum, setDetailsSum] = useState(false);

  const [filters, setFilters] = useState({
    dateRange: [null, null],
    orderCount: [0, 0],
    orderCheck: [0, 0],
  });

  const { openModal, closeModal } = useModal();
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTags, setSelectedTags] = useState('');

  const handleDateChange = (newValue) => {
    setSelectedDates(newValue.filter((e) => e.$d).map((e) => e.$d.toISOString()));
  };

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

  const handleEdit = (data: any) => {
    setModalData((prev) => ({
      ...prev,
      isOpen: true,
      type: 'edit',
      values: {
        ...data,
        created_at: format(new Date(data.created_at), 'dd/MM/yyyy'),
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
        <h1 className="page_title">Финансы</h1>
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
              label="Статьи расходов"
              placeholder="Выбрать"
              options={tagsOptions}
              className={styles.filter_item_select}
              onChange={handleTagsChange}
              value={selectedTags}
            />
            <div className={styles.filter_item_order}>
              <label className={styles.filter_item_label}>Средний чек, KZT</label>
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div>
                <label htmlFor="date-range-picker" className={styles.filter_item_label}>
                  Период
                </label>
                <DateRangePicker
                  onChange={handleDateChange}
                  className={styles.filter_item_calendar}
                  localeText={{ start: '00/00/00', end: '00/00/00' }}
                  slotProps={{
                    textField: {
                      size: 'medium',
                      InputProps: { endAdornment: <Calendar /> },
                      style: {
                        width: '125px',
                        marginTop: '10px',
                      },
                    },
                  }}
                />
              </div>
            </LocalizationProvider>
          </div>
          <div className={styles.filter_content}>
            <TextField
              label="Номер заказа"
              type="number"
              className={styles.finance_order}
              value="0"
            />
            <TextField
              label="Комментарий"
              type="number"
              className={styles.finance_order}
              value="0"
            />
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
        columns={[
          ...columns,
          {
            type: 'actions',
            field: 'actions',
            width: 80,
            renderCell: ({ row }) => {
              return (
                <div className="table-actions">
                  <button onClick={() => handleEdit(row)}>
                    <EditIcon />
                  </button>
                  <button
                    onClick={() =>
                      openModal(
                        'client-detail',
                        <div className={styles.details_items}>
                          <div className={styles.details_item}>
                            <h2 className={styles.details_title}>Товары</h2>
                            <div className={styles.details_item_orders}>
                              <div className={styles.details_item_order}>
                                <a href="">Кожаная куртка</a>
                                <p>1 шт.,</p>
                                <p>черный,</p>
                                <p>размер s</p>
                                <a href="">ID Товара</a>
                              </div>
                              <div className={styles.details_item_order}>
                                <a href="">Ссылка:</a>
                                <p>
                                  https://www.harrods.com/en-us/p/dolce-and-gabbana-wool-cashmere-dg-patch-jacket-000000000007480038
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className={styles.details_item}>
                            <h2 className={styles.details_title}>Сумма заказа, KZT</h2>
                            <div className={styles.details_sum_item}>
                              {detailsSum ? (
                                <div>
                                  <p>Стоимость товара - 100 000 тенге </p>
                                  <p>Стоимость товара - 100 000 тенге </p>
                                  <p>Стоимость товара - 100 000 тенге </p>
                                </div>
                              ) : (
                                <p>150 000 тенге</p>
                              )}
                              <div
                                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                              >
                                Развернуть стоимость {detailsSum ? <FilterUp /> : <FilterDown />}
                              </div>
                            </div>
                          </div>
                          <div className={styles.details_item}>
                            <h2 className={styles.details_title}>Адрес доставки</h2>
                            <div className={styles.details_sum_item}>
                              Улица Зелёная, дом 12, квартира 34, город Светлоград, 123456, страна
                              Небесная.
                            </div>
                          </div>
                          <div className={styles.details_item_note}>
                            <div className={styles.details_note}>
                              <h2 className={styles.details_title}>Примечание</h2>
                              <p>Важно</p>
                            </div>
                            <div className={styles.details_note}>
                              <h2 className={styles.details_title}>Текст к примечанию</h2>
                              <p>
                                Проверить наличие размера M перед отправкой. Убедиться, что все
                                аксессуары включены в упаковку.
                              </p>
                            </div>
                          </div>
                          <div className={styles.details_item}>
                            <h2 className={styles.details_title}>ФИО</h2>
                            <div className={styles.details_sum_item}>МУЖ</div>
                          </div>
                          <div className={styles.details_item}>
                            <h2 className={styles.details_title}>ИИН</h2>
                            <div className={styles.details_sum_item}>0000000000000</div>
                          </div>
                          <div className={styles.details_item}>
                            <h2 className={styles.details_title}>Адресс</h2>
                            <div className={styles.details_sum_item}>
                              Жамакаева 99, Алматы,Алматы, Kazakhstan.
                            </div>
                          </div>
                          <div className={styles.details_item}>
                            <h2 className={styles.details_title}>Номер телефона</h2>
                            <div className={styles.details_sum_item}>+7 707 123 45 67</div>
                          </div>
                          <div className={styles.details_item}>
                            <h2 className={styles.details_title}>Почта</h2>
                            <div className={styles.details_sum_item}>example123@mail.com</div>
                          </div>
                        </div>,
                        { title: 'Детали заказа' }
                      )
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
    </div>
  );
};
