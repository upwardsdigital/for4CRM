import clsx from 'clsx';
import styles from './SubcategoriesPage.module.sass';
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
import { DeleteModal } from '@/features/delete-modal';
import { DeleteIcon } from '@/shared/ui/icons/DeleteIcon';
import { useModal } from '@/shared/hooks';
import { DepartmentSelector } from '@/entities/department';
import { TextField } from '@/shared/ui/TextField';

export const SubcategoriesPage = () => {
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
      const resp = await DepartmentService.getSubCategories({
        ...data.pagination,
        ...data.filters,
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

  const updateDepartmentStatus = (id: number, status: boolean) => {
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
          const response = await DepartmentService.createDepartment({
            name: modalData.values.name,
            name_ru: modalData.values.name_ru,
            is_active: modalData.values.is_active,
            parent: modalData.values.department,
            id: modalData.values.id,
            type: 3,
          });
          if (response) {
            toast('Успешно добавлено', { type: 'success' });
            handleModalOpen();
            fetchData();
          }
        } catch (error) {}
        break;
      case 'edit':
        try {
          const response = await DepartmentService.updateDepartmentById({
            name: modalData.values.name,
            name_ru: modalData.values.name_ru,
            is_active: modalData.values.is_active,
            parent: modalData.values.department,
            id: modalData.values.id,
          });
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
      values: {
        ...data,
        department: data.department?.id,
        subDepartment: data.subDepartment?.id,
        category: data.category?.id,
      },
    }));
  };

  const handleModalOpen = () =>
    setModalData((prev) => ({ ...prev, ...initialModalData, isOpen: !prev.isOpen }));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalData((prev) => ({
      ...prev,
      values: { ...prev.values, [e.target.name]: e.target.value },
      validation: {
        ...prev.validation,
        error: {
          ...prev.validation.error,
          [e.target.name]: false,
        },
        message: {
          ...prev.validation.message,
          [e.target.name]: '',
        },
      },
    }));
  };

  return (
    <div className={clsx(styles.page, 'page')}>
      <div className="page-header">
        <h1 className="page_title">Подкатегории</h1>
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
                        updateDepartmentStatus(row.id, value);
                        DepartmentService.updateDepartmentById({
                          is_active: value,
                          id: row.id,
                        }).catch((err) => {
                          toast('Не удалось обновить статус');
                          console.log(err);
                          updateDepartmentStatus(row.id, !value);
                        });
                      }}
                    />
                    <button onClick={() => handleEdit(row)}>
                      <EditIcon />
                    </button>
                    <button
                      onClick={() =>
                        openModal(
                          'delete-subcategory-modal',
                          <DeleteModal
                            title="Удалить подкатегорию"
                            onCancel={() => closeModal('delete-subcategory-modal')}
                            onSubmit={() => {
                              DepartmentService.deleteDepartment(row.id)
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
                                  closeModal('delete-subcategory-modal');
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
          title="подкатегории"
          modalData={modalData}
          setModalData={setModalData}
          onSubmit={handleModalSubmit}
        >
          <DepartmentSelector
            isOpen={modalData.isOpen}
            initialValues={modalData}
            setValues={setModalData}
          />
          <TextField
            label={modalData.fields.name_ru.label}
            name={'name_ru'}
            value={modalData.values.name_ru}
            isError={modalData.validation.error.name_ru}
            helperText={modalData.validation.message.name_ru}
            onChange={onChange}
          />
          <TextField
            label={modalData.fields.name.label}
            name={'name'}
            value={modalData.values.name}
            isError={modalData.validation.error.name}
            helperText={modalData.validation.message.name}
            onChange={onChange}
          />
        </DataAction>
      </Modal>
    </div>
  );
};
