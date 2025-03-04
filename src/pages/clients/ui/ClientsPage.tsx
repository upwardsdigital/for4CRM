import { ClientService } from '@/shared/api/services';
import { UserService } from '@/shared/api/services/UserService';
import { ModalDataT, TableDataT } from '@/shared/types';
import { Button } from '@/shared/ui/Button/ui/Button';
import { EditIcon, ViewIcon } from '@/shared/ui/icons';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { ToggleButton } from '@/shared/ui/ToggleButton';
import { Table } from '@/widgets/table';
import { useEffect, useState } from 'react';
import { columns } from '../config/columns';
import { Modal } from '@/shared/ui/Modal';
import { DataAction } from '@/features/data-action/ui/DataAction';
import styles from './ClientsPage.module.sass';
import { useModal } from '@/shared/hooks';
import { toast } from 'react-toastify';
import { initialModalData } from '../model/initialModalData';
import { format } from 'date-fns';
import { FilterDown } from '@/shared/ui/icons/FilterDown';
import { Calendar } from '@/shared/ui/icons/Calendar';
import { DeleteModal } from '@/features/delete-modal/ui/DeleteModal';
import { DeleteIcon } from '@/shared/ui/icons/DeleteIcon';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { Select } from '@/shared/ui/Select/ui/Select';
import { TextField } from '@/shared/ui/TextField';
import { FilterUp } from '@/shared/ui/icons/FilterUp';

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
      startDate: null,
      endDate: null,
      startOrderQuantity: null,
      endOrderQuantity: null,
      startOrderCheck: null,
      endOrderCheck: null,
      tags: null,
    },
    pagination: {
      skip: 0,
      take: 10,
    },
  });

  console.log(data);

  const updateUserStatus = (id: number, status: boolean) => {
    setData((prev) => {
      const prevRowsCopy = [...prev.rows];
      const userIndex = data.rows.findIndex((item) => item.id === id);
      prevRowsCopy[userIndex].is_active = status;
      return { ...prev, rows: prevRowsCopy };
    });
  };

  const [modalData, setModalData] = useState<ModalDataT>(initialModalData);
  const { openModal, closeModal } = useModal();
  const [tagsOptions, setTagsOptions] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    dateRange: [null, null],
    orderCount: [0, 0],
    orderCheck: [0, 0],
  });

  console.log(filters);

  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTags, setSelectedTags] = useState('');

  const handleDateChange = (newValue) => {
    setSelectedDates(newValue.filter((e) => e.$d).map((e) => e.$d.toISOString()));
    console.log(selectedDates);
  };
  const handleTagsChange = (val) => {
    setSelectedTags(val.value);
  };

  const handleApplyFilters = () => {
    const [dateFrom, dateTo] = selectedDates;
    const [startOrderQuantity, endOrderQuantity] = filters.orderCount;
    const [startOrderCheck, endOrderCheck] = filters.orderCheck;

    setData((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        startDate: dateFrom,
        endDate: dateTo,
        startOrderQuantity: startOrderQuantity || null,
        endOrderQuantity: endOrderQuantity || null,
        startOrderCheck: startOrderCheck || null,
        endOrderCheck: endOrderCheck || null,
        selectedTags: selectedTags || null,
      },
    }));
  };

  const fetchData = async () => {
    try {
      const resp = await ClientService.getClients({
        ...data.pagination,
        ...data.filters,
        type: 0,
      });
      if (resp.data) {
        setData((prev) => ({
          ...prev,
          rows: resp.data.items,
          count: resp.data.info.count,
        }));
      }
    } catch (error) {
    } finally {
      setData((prev) => ({
        ...prev,
        status: { ...prev.status, loading: false },
      }));
    }
  };

  const handleModalOpen = () =>
    setModalData((prev) => ({ ...prev, ...initialModalData, isOpen: !prev.isOpen }));

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
    console.log(data);
  };

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { bin, avg_check, ...dataToSend } = modalData.values;
    switch (modalData.type) {
      case 'add':
        try {
          const response = await ClientService.createClient(dataToSend);
          if (response) {
            toast('Успешно добавлено', { type: 'success' });
            handleModalOpen();
            fetchData();
          }
        } catch (error) {}
        break;
      case 'edit':
        try {
          const response = await ClientService.updateClientById(dataToSend);
          if (response) {
            toast('Успешно изменено', { type: 'success' });
            handleModalOpen();
            fetchData();
          }
        } catch (error) {}
        break;
      default:
        break;
    }
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
    setFilterOpen((prev) => !prev);
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
        <h1 className="page_title">Клиенты</h1>
        <Button onClick={handleModalOpen}>
          <PlusIcon />
          Добавить
        </Button>
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
          <div className={styles.filter_item}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div>
                <label htmlFor="date-range-picker" className={styles.filter_item_label}>
                  Дата регистрации
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
            <Select
              label="Теги"
              placeholder="Выбрать"
              options={tagsOptions}
              className={styles.filter_item_select}
              onChange={handleTagsChange}
              value={selectedTags}
            />
          </div>
          <div className={styles.filter_item}>
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
            <div className={styles.filter_item_order}>
              <label className={styles.filter_item_label}>Средний чек</label>
              <div className={styles.filter_item_count_orders}>
                <TextField
                  type="number"
                  value={filters.orderCheck[0]}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      orderCheck: [Number(event.target.value), prev.orderCheck[1]],
                    }))
                  }
                  className={styles.filter_item_count_order}
                />
                <span> – </span>
                <TextField
                  type="number"
                  value={filters.orderCheck[1]}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      orderCheck: [prev.orderCheck[0], Number(event.target.value)],
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
        columns={[
          ...columns,
          {
            type: 'actions',
            field: 'actions',
            width: 190,
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
                  <button onClick={() => handleEdit(row)}>
                    <EditIcon />
                  </button>
                  <button
                    onClick={() =>
                      openModal(
                        'client-detail',
                        <div className={styles.clients_details}>
                          <div className={styles.clients_details_top}>
                            <div className={styles.clients_item}>
                              <h2>Пол</h2>
                              <p>{row.gender === 'male' ? 'муж.' : 'жен.'}</p>
                            </div>
                            <div className={styles.clients_item}>
                              <h2>Дата рождения</h2>
                              <p>{row.birth_date}</p>
                            </div>
                            <div className={styles.clients_item}>
                              <h2>Адрес</h2>
                              <p></p>
                            </div>
                          </div>

                          <div className={styles.clients_details_bottom}>
                            <div className={styles.clients_item}>
                              <h2>Количество заказов</h2>
                              <p>{row.count_orders}</p>
                            </div>
                            <div className={styles.clients_item}>
                              <h2>№ Заказы</h2>
                              <p></p>
                            </div>
                            <div className={styles.clients_item}>
                              <h2>Сумма заказов</h2>
                              <p></p>
                            </div>
                            <div className={styles.clients_item}>
                              <h2>ИНН</h2>
                              <p>{row.iin}</p>
                            </div>
                          </div>
                        </div>,
                        { title: 'Детали данных клиента' }
                      )
                    }
                  >
                    <ViewIcon />
                  </button>
                  <button
                    onClick={() =>
                      openModal(
                        'delete-client-modal',
                        <DeleteModal
                          title="Удалить категорию"
                          onCancel={() => closeModal('delete-client-modal')}
                          onSubmit={() => {
                            ClientService.deleteClient(row.id)
                              .then(() => {
                                toast('Успешно удалено', { type: 'success' });
                                setData((prev) => {
                                  const prevRows = [...prev.rows];
                                  const rowIndex = prevRows.findIndex(
                                    (rowItem) => rowItem.id === row.id
                                  );
                                  prevRows.splice(rowIndex, 1);
                                  return { ...prev, rows: prevRows };
                                });
                                closeModal('delete-client-modal');
                              })
                              .catch(() => {
                                toast('Возникла ошибка при удалении', { type: 'error' });
                              });
                          }}
                        />
                      )
                    }
                  >
                    <DeleteIcon />
                  </button>
                </div>
              );
            },
          },
        ]}
      />

      <Modal isOpen={modalData.isOpen} onClose={handleModalOpen}>
        <DataAction
          title={modalData.type === 'edit' ? 'данных клиента' : 'клиента'}
          modalData={modalData}
          setModalData={setModalData}
          onSubmit={handleModalSubmit}
        />
      </Modal>
    </div>
  );
};
