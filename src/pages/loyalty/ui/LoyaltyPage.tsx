import { LoyaltyService } from '@/shared/api/services/LoyaltyService';
import { TableDataT } from '@/shared/types';
import { Button } from '@/shared/ui/Button/ui/Button';
import { Table } from '@/widgets/table';
import { useEffect, useState } from 'react';
import { columns } from '../config/columns';
import styles from './LoyaltyPage.module.sass';
import { format } from 'date-fns';
import { FilterDown } from '@/shared/ui/icons/FilterDown';
import { Calendar } from '@/shared/ui/icons/Calendar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { TextField } from '@/shared/ui/TextField';
import { Select } from '@/shared/ui/Select/ui/Select';
import { FilterUp } from '@/shared/ui/icons/FilterUp';
import 'dayjs/locale/ru';

export const LoyaltyPage = () => {
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

  const [filterOpen, setFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    dateRange: [null, null],
    orderCount: [0, 0],
    orderCheck: [0, 0],
    orderSum: [0, 0],
    bonusTotal: [0, 0],
    id: null as number | null,
    numberCard: null as number | null,
    phone: null as number | null,
  });

  console.log(filters);

  const [selectedDates, setSelectedDates] = useState([]);
  const [locale, setLocale] = useState('ru');

  const handleDateChange = (newValue) => {
    setSelectedDates(newValue.filter((e) => e.$d).map((e) => e.$d.toISOString()));
  };

  const handleApplyFilters = () => {
    const [dateFrom, dateTo] = selectedDates;
    const [startOrderQuantity, endOrderQuantity] = filters.orderCount;
    const [startOrderCheck, endOrderCheck] = filters.orderCheck;
    const [startSum, endSum] = filters.orderSum;
    const [startBonus, endBonus] = filters.bonusTotal;
    const { id, numberCard, phone } = filters;

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
        id: id || null,
        numberCard: numberCard || null,
        phone: phone || null,
        startSum: startSum || null,
        endSum: endSum || null,
        startBonus: startBonus || null,
        endBonus: endBonus || null,
      },
    }));
  };

  const resetFilters = () => {
    setFilters({
      dateRange: [null, null],
      orderCount: [0, 0],
      orderCheck: [0, 0],
      orderSum: [0, 0],
      bonusTotal: [0, 0],
      id: null,
      numberCard: null,
      phone: null,
    });

    setData((prev) => ({
      ...prev,
      filters: {
        search: '',
        startDate: null,
        endDate: null,
        startOrderQuantity: null,
        endOrderQuantity: null,
        startOrderCheck: null,
        endOrderCheck: null,
        tags: null,
        id: null,
        numberCard: null,
        phone: null,
        startSum: null,
        endSum: null,
        startBonus: null,
        endBonus: null,
      },
    }));
  };

  const hasActiveFilters = () => {
    const { filters } = data;
    return (
      filters.search !== '' ||
      filters.startDate !== null ||
      filters.endDate !== null ||
      filters.startOrderQuantity !== null ||
      filters.endOrderQuantity !== null ||
      filters.startOrderCheck !== null ||
      filters.endOrderCheck !== null ||
      filters.tags !== null ||
      filters.id !== null ||
      filters.numberCard !== null ||
      filters.phone !== null ||
      filters.startSum !== null ||
      filters.endSum !== null ||
      filters.startBonus !== null ||
      filters.endBonus !== null
    );
  };

  const toggleFilter = () => {
    setFilterOpen((prev) => !prev);
  };

  useEffect(() => {
    setData((prev) => ({ ...prev, status: { ...prev.status, loading: true } }));
    LoyaltyService.getLoyalty({ ...data.pagination, ...data.filters })
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
    <div>
      <div className="page-header">
        <h1 className="page_title">Программа лояльности</h1>
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
            <div>
              <label htmlFor="date-range-picker" className={styles.filter_item_label}>
                ID участия
              </label>
              <TextField
                type="number"
                value={filters.id}
                onChange={(event) =>
                  setFilters((prev) => ({
                    ...prev,
                    id: event.target.value === '' ? null : Number(event.target.value),
                  }))
                }
                className={styles.filter_item_id}
                placeholder="Введите ID"
              />
            </div>
            <div>
              <label htmlFor="date-range-picker" className={styles.filter_item_label}>
                Номер карты
              </label>
              <TextField
                type="number"
                value={filters.numberCard}
                placeholder="0000 0000 0000 0000"
                onChange={(event) =>
                  setFilters((prev) => ({
                    ...prev,
                    numberCard: event.target.value === '' ? null : Number(event.target.value),
                  }))
                }
                className={styles.filter_item_id}
              />
            </div>
            <div>
              <label htmlFor="date-range-picker" className={styles.filter_item_label}>
                Номер телефона
              </label>
              <TextField
                type="number"
                value={filters.phone}
                placeholder="0"
                onChange={(event) =>
                  setFilters((prev) => ({
                    ...prev,
                    phone: event.target.value === '' ? null : Number(event.target.value),
                  }))
                }
                className={styles.filter_item_id_two}
              />
            </div>
            <div>
              <Select
                label="Программа лояльности"
                className={styles.filter_loyalty_select}
                placeholder="Выбрать"
              />
            </div>
          </div>
          <div className={styles.filter_item}>
            <div>
              <Select label="Магазины" className={styles.filter_item_id} placeholder="Выбрать" />
            </div>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
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

            <div>
              <Select
                label="Уровень"
                className={styles.filter_loyalty_select}
                placeholder="Выбрать"
              />
            </div>

            <div>
              <Select
                label="Статус"
                className={styles.filter_loyalty_select}
                placeholder="Выбрать"
              />
            </div>
          </div>
          <div className={styles.filter_item}>
            <div className={styles.filter_item_order}>
              <label className={styles.filter_item_label}>Сумма покупок</label>
              <div className={styles.filter_item_count_orders}>
                <TextField
                  type="number"
                  value={filters.orderSum[0]}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      orderSum: [Number(event.target.value), prev.orderSum[1]],
                    }))
                  }
                  className={styles.filter_item_count_order}
                />
                <span> – </span>
                <TextField
                  type="number"
                  value={filters.orderSum[1]}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      orderSum: [prev.orderSum[0], Number(event.target.value)],
                    }))
                  }
                  className={styles.filter_item_count_order}
                />
              </div>
            </div>
            <div className={styles.filter_item_order}>
              <label className={styles.filter_item_label}>Баланс бонусов</label>
              <div className={styles.filter_item_count_orders}>
                <TextField
                  type="number"
                  value={filters.bonusTotal[0]}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      bonusTotal: [Number(event.target.value), prev.bonusTotal[1]],
                    }))
                  }
                  className={styles.filter_item_count_order}
                />
                <span> – </span>
                <TextField
                  type="number"
                  value={filters.bonusTotal[1]}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      bonusTotal: [prev.bonusTotal[0], Number(event.target.value)],
                    }))
                  }
                  className={styles.filter_item_count_order}
                />
              </div>
            </div>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
              <div>
                <label htmlFor="date-range-picker" className={styles.filter_item_label}>
                  Дата сгорания бонусов
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

            <Button className={styles.filter_item_btn} onClick={handleApplyFilters}>
              Применить
            </Button>
          </div>

          <div className={styles.filter_item}></div>
        </div>
      )}

      {hasActiveFilters() && (
        <button onClick={resetFilters} style={{ margin: '10px 0' }}>
          Сбросить фильтр
        </button>
      )}

      <Table table={data} setTable={setData} search={data.filters.search} columns={[...columns]} />
    </div>
  );
};
