import clsx from 'clsx';
import styles from './ImportDutiesPage.module.sass';
import { useEffect, useState } from 'react';
import { ModalDataT, TableDataT } from '@shared/types';
import { Table } from '@widgets/table';
import { columns } from '../config/columns';
import { EditIcon } from '@shared/ui/icons';
import { CountryService, ImportDutiesService } from '@shared/api/services';
import { Button } from '@shared/ui/Button/ui/Button';
import { PlusIcon } from '@shared/ui/icons/PlusIcon';
import { Modal } from '@shared/ui/Modal';
import { DataAction } from '@features/data-action/ui/DataAction';
import { initialModalData } from '../model/initialModalData';
import { toast } from 'react-toastify';
import { DeleteIcon } from '@/shared/ui/icons/DeleteIcon';
import { DeleteModal } from '@/features/delete-modal';
import { useModal } from '@/shared/hooks';
import { useQuery } from '@tanstack/react-query';

export const ImportDutiesPage = () => {
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

  const [modalData, setModalData] = useState<ModalDataT>(initialModalData);
  const { openModal, closeModal } = useModal();

  const { isFetching: countriesLoading, data: countries } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const data = await CountryService.getCountries();

      return data.data.items
        .map((country) => ({
          ...country,
          label: country.name,
          value: country.id,
        }))
        .sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
    },
  });

  const fetchData = async () => {
    try {
      const resp = await ImportDutiesService.getImportDuties({
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

  useEffect(() => {
    fetchData();
  }, [data.filters, data.pagination]);

  useEffect(() => {
    if (countries && !countriesLoading) {
      setModalData((prev) => ({
        ...prev,
        fields: {
          ...prev.fields,
          country: {
            ...prev.fields.country,
            options: countries,
          },
        },
      }));
    }
  }, [countries, modalData.isOpen]);

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const modalValues = { ...modalData.values };

    const data = {
      ...modalData.values,
      vat: +modalValues.vat,
      dutyFreeAmount: +modalValues.dutyFreeAmount,
      custom_duty: +modalValues.custom_duty,
    };
    switch (modalData.type) {
      case 'add':
        try {
          const response = await ImportDutiesService.createImportDuty(data);
          if (response) {
            toast('Успешно добавлено', { type: 'success' });
            handleModalOpen();
            fetchData();
          }
        } catch (error) {}
        break;
      case 'edit':
        try {
          const response = await ImportDutiesService.updateImportDuty(data);
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

  const handleEdit = (data: any) => {
    setModalData((prev) => ({
      ...prev,
      isOpen: true,
      type: 'edit',
      values: { ...data, country: data.country?.id },
    }));
  };

  const handleModalOpen = () =>
    setModalData((prev) => ({ ...prev, ...initialModalData, isOpen: !prev.isOpen }));

  return (
    <div className={clsx(styles.page, 'page')}>
      <div className="page-header">
        <h1 className="page_title">Импортная пошлина и НДС</h1>
        <Button onClick={handleModalOpen}>
          <PlusIcon />
          Добавить
        </Button>
      </div>

      <div className={clsx(styles.page_table, 'page_table')}>
        <Table
          table={data}
          setTable={setData}
          columns={[
            ...columns,
            {
              type: 'actions',
              field: 'actions',
              width: 120,
              renderCell: ({ row }) => {
                return (
                  <div className="table-actions">
                    <button onClick={() => handleEdit(row)}>
                      <EditIcon />
                    </button>
                    <button
                      onClick={() =>
                        openModal(
                          'delete-department-modal',
                          <DeleteModal
                            title="Удалить импортную пошлину и НДС"
                            onCancel={() => closeModal('delete-department-modal')}
                            onSubmit={() => {
                              ImportDutiesService.deleteImportDuty(row.id)
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
                                  closeModal('delete-department-modal');
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
      </div>

      <Modal isOpen={modalData.isOpen} onClose={handleModalOpen}>
        <DataAction
          title="импортной пошлины и НДС"
          modalData={modalData}
          setModalData={setModalData}
          onSubmit={handleModalSubmit}
        />
      </Modal>
    </div>
  );
};
