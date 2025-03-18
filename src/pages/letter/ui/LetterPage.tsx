import { ClientService } from '@/shared/api/services';
import { ModalDataT, TableDataT } from '@/shared/types';
import { Button } from '@/shared/ui/Button/ui/Button';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { Table } from '@/widgets/table';
import { useEffect, useState } from 'react';
import { columns } from '../config/columns';
import { Modal } from '@/shared/ui/Modal';
import { DataAction } from '@/features/data-action/ui/DataAction';
import styles from './LetterPage.module.sass';
import { toast } from 'react-toastify';
import { initialModalData } from '../model/initialModalData';
import { FilterDown } from '@/shared/ui/icons/FilterDown';
import { Calendar } from '@/shared/ui/icons/Calendar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { Select } from '@/shared/ui/Select/ui/Select';
import { TextField } from '@/shared/ui/TextField';
import { FilterUp } from '@/shared/ui/icons';

export const LetterPage = () => {
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

  const [modalData, setModalData] = useState<ModalDataT>(initialModalData);
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
        <h1 className="page_title">Письма</h1>
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
                  Дата
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
              label="Тип"
              placeholder="Выбрать"
              options={tagsOptions}
              className={styles.filter_item_select}
              onChange={handleTagsChange}
              value={selectedTags}
            />
            <Select
              label="Клиент"
              placeholder="Выбрать"
              options={tagsOptions}
              className={styles.filter_item_select}
              onChange={handleTagsChange}
              value={selectedTags}
            />
            <Select
              label="Отправитель"
              placeholder="Выбрать"
              options={tagsOptions}
              className={styles.filter_item_select}
              onChange={handleTagsChange}
              value={selectedTags}
            />
          </div>
          <div className={styles.filter_content}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div>
                <label htmlFor="date-range-picker" className={styles.filter_item_label}>
                  Получатель
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
              label="Тема"
              placeholder="Выбрать"
              options={tagsOptions}
              className={styles.filter_item_select}
              onChange={handleTagsChange}
              value={selectedTags}
            />
            <Select
              label="Статус входящих"
              placeholder="Выбрать"
              options={tagsOptions}
              className={styles.filter_item_select}
              onChange={handleTagsChange}
              value={selectedTags}
            />
            <Select
              label="Статус исходящих"
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

      <Table table={data} setTable={setData} search={data.filters.search} columns={[...columns]} />

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
