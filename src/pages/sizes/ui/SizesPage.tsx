import clsx from 'clsx';
import styles from './SizesPage.module.sass';
import { useEffect, useState } from 'react';
import { ModalDataT, TableDataT } from '@shared/types';
import { Table } from '@widgets/table';
import { columns } from '../config/columns';
import { EditIcon } from '@shared/ui/icons';
import { DepartmentService } from '@shared/api/services/DepartmentService';
import { ToggleButton } from '@/shared/ui/ToggleButton';
import { Button } from '@shared/ui/Button/ui/Button';
import { PlusIcon } from '@shared/ui/icons/PlusIcon';
import { Modal } from '@shared/ui/Modal';
import { DataAction } from '@features/data-action/ui/DataAction';
import { initialModalData } from '../model/initialModalData';
import { toast } from 'react-toastify';
import { DeleteIcon } from '@/shared/ui/icons/DeleteIcon';
import { DeleteModal } from '@/features/delete-modal';
import { useModal } from '@/shared/hooks';
import { SizesService } from '@/shared/api/services';

export const SizesPage = () => {
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

  const fetchData = async () => {
    try {
      const resp = await SizesService.getSizes({
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
    if (modalData.isOpen) {
      DepartmentService.getDepartments({ type: 3 }).then((resp) => {
        setModalData((prev) => ({
          ...prev,
          fields: {
            ...prev.fields,
            department: {
              ...prev.fields.department,
              options: resp.data.items.map((subCategory) => ({
                ...subCategory,
                label: subCategory.name,
                value: subCategory.id,
              })),
            },
          },
        }));
      });
    }
  }, [modalData.isOpen]);

  const updateSizeStatus = (id: number, status: boolean) => {
    setData((prev) => {
      const prevRowsCopy = [...prev.rows];
      const userIndex = data.rows.findIndex((item) => item.id === id);
      prevRowsCopy[userIndex].is_active = status;
      return { ...prev, rows: prevRowsCopy };
    });
  };

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    switch (modalData.type) {
      case 'add':
        try {
          const response = await SizesService.createSize(modalData.values);
          if (response) {
            toast('Успешно добавлено', { type: 'success' });
            handleModalOpen();
            fetchData();
          }
        } catch (error) {}
        break;
      case 'edit':
        try {
          const response = await SizesService.updateSizeById(modalData.values);
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
      values: { ...data },
    }));
  };

  const handleModalOpen = () =>
    setModalData((prev) => ({ ...prev, ...initialModalData, isOpen: !prev.isOpen }));

  return (
    <div className={clsx(styles.page, 'page')}>
      <div className="page-header">
        <h1 className="page_title">Размеры</h1>
        <Button onClick={handleModalOpen}>
          <PlusIcon />
          Добавить
        </Button>
      </div>

      <div className={clsx(styles.page_table, 'page_table')}>
        <Table
          table={data}
          setTable={setData}
          search={data.filters.search}
          columns={[
            ...columns,
            {
              type: 'actions',
              field: 'actions',
              width: 120,
              renderCell: ({ row }) => {
                return (
                  <div className="table-actions">
                    <ToggleButton
                      value={row.is_active}
                      onChange={(e) => {
                        const value = e.target.checked;
                        updateSizeStatus(row.id, value);
                        SizesService.updateSizeById({
                          is_active: value,
                          id: row.id,
                        }).catch((err) => {
                          toast('Не удалось обновить статус');
                          console.log(err);
                          updateSizeStatus(row.id, !value);
                        });
                      }}
                    />
                    <button onClick={() => handleEdit(row)}>
                      <EditIcon />
                    </button>
                    <button
                      onClick={() =>
                        openModal(
                          'delete-size-modal',
                          <DeleteModal
                            title="Удалить размер"
                            onCancel={() => closeModal('delete-size-modal')}
                            onSubmit={() => {
                              SizesService.deleteSizeById(row.id)
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
                                  closeModal('delete-size-modal');
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
          title="размера"
          modalData={modalData}
          setModalData={setModalData}
          onSubmit={handleModalSubmit}
        />
      </Modal>
    </div>
  );
};
