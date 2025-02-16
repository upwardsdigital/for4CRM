import clsx from 'clsx';
import styles from './SubdepartmentsPage.module.sass';
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

export const SubdepartmentsPage = () => {
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

  const fetchData = async () => {
    try {
      const resp = await DepartmentService.getSubdepartments({
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
    const loadDepartments = async () => {
      const departmentOptions = await DepartmentService.getDepartments({ type: 0 });
      setModalData((prevData) => ({
        ...prevData,
        fields: {
          ...prevData.fields,
          parent: {
            ...prevData.fields.parent,
            options: departmentOptions.data.items.map((item) => ({
              label: item.name.length > 0 ? item.name : 'Без названия',
              value: item.id,
            })),
          },
        },
      }));
    };

    loadDepartments();
  }, [modalData.isOpen]);

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
          const response = await DepartmentService.createDepartment(modalData.values);
          if (response) {
            toast('Успешно добавлено', { type: 'success' });
            handleModalOpen();
            fetchData();
          }
        } catch (error) {}
        break;
      case 'edit':
        try {
          const response = await DepartmentService.updateDepartmentById(modalData.values);
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
      values: { ...data, parent: data.department.id },
    }));
  };

  const handleModalOpen = () =>
    setModalData((prev) => ({ ...prev, ...initialModalData, isOpen: !prev.isOpen }));

  return (
    <div className={clsx(styles.page, 'page')}>
      <div className="page-header">
        <h1 className="page_title">Подотделы</h1>
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
                  </div>
                );
              },
            },
          ]}
        />
      </div>

      <Modal isOpen={modalData.isOpen} onClose={handleModalOpen}>
        <DataAction
          title="отдела"
          modalData={modalData}
          setModalData={setModalData}
          onSubmit={handleModalSubmit}
        />
      </Modal>
    </div>
  );
};
