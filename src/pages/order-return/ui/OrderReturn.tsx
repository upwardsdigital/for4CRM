import { ClientService } from '@/shared/api/services';
import { ModalDataT, TableDataT } from '@/shared/types';
import { Button } from '@/shared/ui/Button/ui/Button';
import { EditIcon, ViewIcon } from '@/shared/ui/icons';
import { Table } from '@/widgets/table';
import { useEffect, useState } from 'react';
import { columns } from '../config/columns';
import { Modal } from '@/shared/ui/Modal';
import { DataAction } from '@/features/data-action/ui/DataAction';
import styles from './OrderReturn.module.sass';
import { useModal } from '@/shared/hooks';
import { toast } from 'react-toastify';
import { initialModalData } from '../model/initialModalData';
import { format } from 'date-fns';
import { FilterDown } from '@/shared/ui/icons/FilterDown';
import { Calendar } from '@/shared/ui/icons/Calendar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { Select } from '@/shared/ui/Select/ui/Select';
import { TextField } from '@/shared/ui/TextField';
import { FilterUp } from '@/shared/ui/icons';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';

export const OrderReturn = () => {
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
      status_pay: null,
      status_order: null,
      manager: null,
      note: null,
    },
    pagination: {
      skip: 0,
      take: 10,
    },
  });

  const [modalData, setModalData] = useState<ModalDataT>(initialModalData);
  const { openModal, closeModal } = useModal();
  const [tagsOptions, setTagsOptions] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [detailsSum, setDetailsSum] = useState(false);
  const [selectedValue, setSelectedValue] = useState({
    order_count: '',
    date_register: null,
    courier: undefined,
    status: undefined,
    store: null,
    date_arrival: null,
    address_delivery: undefined,
    order_sum: 0,
    manager: undefined,
    inn: null,
    phone: null,
    note: '',
    email: null,
  });

  const [filters, setFilters] = useState({
    dateRange: [null, null],
    orderCount: [0, 0],
    orderCheck: [0, 0],
  });

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

    setData((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        startDate: dateFrom,
        endDate: dateTo,
        status_pay: null,
        status_order: null,
        manager: null,
        note: null,
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
    setFilterOpen(!filterOpen);
  };
  const toggleDetailsSum = () => {
    setDetailsSum((prev) => !prev);
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

  const customData = ['Option1', 'Option2', 'Option3', 'Option4', 'Option5', 'Option6'];
  const options = customData.map((option, index) => ({
    label: option,
    value: index,
  }));

  const handleChange = (selectedOption) => {
    setSelectedValue((prevState) => ({
      ...prevState,
      status: selectedOption.value,
    }));
    console.log('Выбрано:', selectedOption);
  };

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
        <h1 className="page_title">Возврат заказа</h1>
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
          <div className={styles.filter_content}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div>
                <label htmlFor="date-range-picker" className={styles.filter_item_label}>
                  Дата и время отмены
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
              label="Рассмотрение заявки"
              placeholder="Выбрать"
              options={tagsOptions}
              className={styles.filter_item_select}
              onChange={handleTagsChange}
              value={selectedTags}
            />
            <Select
              label="Статус возврата средств"
              placeholder="Выбрать"
              options={tagsOptions}
              className={styles.filter_item_select}
              onChange={handleTagsChange}
              value={selectedTags}
            />
            <Select
              label="Курьер"
              placeholder="Выбрать"
              options={tagsOptions}
              className={styles.filter_item_select}
              onChange={handleTagsChange}
              value={selectedTags}
            />
          </div>
          <div className={styles.filter_content}>
            <Select
              label="Статус"
              placeholder="Выбрать"
              options={tagsOptions}
              className={styles.filter_item_select}
              onChange={handleTagsChange}
              value={selectedTags}
            />
            <Select
              label="Примечание"
              placeholder="Выбрать"
              options={tagsOptions}
              className={styles.filter_item_select}
              onChange={handleTagsChange}
              value={selectedTags}
            />
            <Select
              label="Менеджер"
              placeholder="Выбрать"
              options={tagsOptions}
              className={styles.filter_item_select}
              onChange={handleTagsChange}
              value={selectedTags}
            />
            <Select
              label="Статус"
              placeholder="Выбрать"
              options={tagsOptions}
              className={styles.filter_item_select}
              onChange={handleTagsChange}
              value={selectedTags}
            />
          </div>
          <div className={styles.filter_item_button}>
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
                                onClick={toggleDetailsSum}
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

      <Modal isOpen={modalData.isOpen} onClose={handleModalOpen}>
        <DataAction
          title={modalData.type === 'edit' ? 'заказа №' : 'клиента'}
          modalData={modalData}
          setModalData={setModalData}
          onSubmit={handleModalSubmit}
          className={styles.custom_action_form}
        >
          <div className={styles.edit_item}>
            <TextField label="Номер заказа" value={selectedValue.order_count} />
            <label htmlFor="" className={styles.edit_date}>
              <p>Дата оформления доставки покупателю </p>
              <input className={styles.edit_date_input} type="date" />
            </label>
          </div>
          <div className={styles.edit_item}>
            <Select
              label="Курьер"
              options={options}
              className={styles.edit_select}
              placeholder="Выбрать"
              onChange={handleChange}
              value={selectedValue.courier}
            />
            <Select
              label="Статус"
              options={options}
              className={styles.edit_select}
              placeholder="Выбрать"
              onChange={handleChange}
              value={selectedValue.status}
            />
          </div>
          <div className={styles.edit_item}>
            <Select
              label="Дистрибуционный скалад"
              options={options}
              className={styles.edit_select}
              placeholder="Выбрать"
            />
            <label htmlFor="" className={styles.edit_date}>
              <p>Дата оформления доставки покупателю </p>
              <input className={styles.edit_date_input} type="date" />
            </label>
          </div>
          <div className={styles.edit_item}>
            <Select
              label="Статус"
              options={options}
              className={styles.edit_select}
              placeholder="Выбрать"
              onChange={handleChange}
              value={selectedValue.status}
            />
            <Select
              label="Адрес доставки"
              options={options}
              className={styles.edit_select}
              placeholder="Данные"
              onChange={handleChange}
              value={selectedValue.address_delivery}
            />
          </div>
          <div className={styles.edit_item}>
            <Select
              label="Сумма заказа"
              options={options}
              className={styles.edit_select}
              placeholder="0"
              onChange={handleChange}
              value={selectedValue.order_count}
            />
            <Select
              label="Менеджер"
              options={options}
              className={styles.edit_select}
              placeholder="Данные"
              onChange={handleChange}
              value={selectedValue.manager}
            />
          </div>
          <div className={styles.edit_item}>
            <TextField label="Примечание" placeholder="Примечание" value={selectedValue.note} />
            <TextField label="Почта" placeholder="Почта" value={selectedValue.email} />
          </div>

          <div className={styles.edit_orders}>
            <h2>Товары</h2>
            <div className={styles.edit_item}>
              <Select
                label="Товар"
                options={options}
                className={styles.edit_select}
                placeholder="название"
                onChange={handleChange}
                value={selectedValue.manager}
              />
              <TextField label="Количество товара" placeholder="0" value={selectedValue.email} />
            </div>
            <div className={styles.edit_item}>
              <Select
                label="Размер товара"
                options={options}
                className={styles.edit_select}
                placeholder="Выбрать"
                onChange={handleChange}
                value={selectedValue.manager}
              />
              <Select
                label="Цвет товара"
                options={options}
                className={styles.edit_select}
                placeholder="Выбрать"
                onChange={handleChange}
                value={selectedValue.manager}
              />
            </div>
            <div className={styles.edit_item}>
              <Select
                label="Ссылка на товар URL"
                options={options}
                className={styles.edit_select}
                placeholder="URL"
                onChange={handleChange}
                value={selectedValue.manager}
              />
            </div>
          </div>
        </DataAction>
      </Modal>
    </div>
  );
};
