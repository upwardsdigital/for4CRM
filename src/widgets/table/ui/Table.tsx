import styles from './Table.module.sass';
import React, { SetStateAction, useState } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { TextField } from '@/shared/ui/TextField';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  DoubleChevronLeft,
  DoubleChevronRight,
} from '@/shared/ui/icons';
import clsx from 'clsx';
import { TableDataT } from '@/shared/types';

interface TableProps {
  title?: React.ReactNode;
  columns: GridColDef[];
  className?: string;
  search?: string;
  customFilters?: React.ReactNode;
  table: TableDataT;
  setTable: React.Dispatch<SetStateAction<TableDataT>>;
}

export const Table: React.FC<TableProps> = ({
  title,
  columns,
  className,
  search,
  table,
  customFilters,
  setTable,
}) => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: Math.floor(table.pagination.skip / table.pagination.take),
    pageSize: table.pagination.take,
  });

  const handlePaginationChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
    const newSkip = model.page * model.pageSize;
    setTable((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        skip: newSkip,
      },
    }));
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPageSize = Number(event.target.value);
    setPaginationModel((prevModel) => ({
      ...prevModel,
      pageSize: newPageSize,
    }));
    const newSkip = paginationModel.page * newPageSize;
    setTable((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        take: newPageSize,
        skip: newSkip,
      },
    }));
  };

  const totalPages = Math.ceil(table.count / paginationModel.pageSize);
  console.log(totalPages);

  return (
    <div className={`table-container ${className}`}>
      {title}
      {(customFilters || search !== undefined) && (
        <div className="table-filters">
          {search !== 'undefined' && (
            <TextField
              type="search"
              value={search}
              placeholder="Поиск"
              className={styles.search_field}
              onChange={(e) =>
                setTable((prev) => ({
                  ...prev,
                  filters: {
                    ...prev.filters,
                    search: e.target.value,
                  },
                }))
              }
            />
          )}
          {customFilters}
        </div>
      )}
      <DataGrid
        columns={columns.map((column) => {
          const newColumn = { ...column };

          if (column.sortable) {
            newColumn.renderHeader = () => (
              <p className={styles.table_header}>
                {column.headerName}{' '}
                <button
                  className={styles.sort_btn}
                  onClick={() => {
                    const rowValue = table.rows.find((rowItem) => rowItem[column.field]);

                    setTable((prev) => ({
                      ...prev,
                      filters: {
                        ...prev.filters,
                        field: `${column.field}${rowValue[column.field].name ? '.name' : ''}`,
                        by: prev.filters.by === 'DESC' ? 'ASC' : 'DESC',
                      },
                    }));
                  }}
                >
                  <ChevronUp />
                  <ChevronDown />
                </button>
              </p>
            );
          }
          newColumn.sortable = false;
          return newColumn;
        })}
        rows={table.rows}
        paginationMode="server"
        paginationModel={paginationModel}
        hideFooterPagination
        onPaginationModelChange={handlePaginationChange}
        rowCount={table.count}
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableColumnResize
        disableRowSelectionOnClick
        className={clsx(className, 'table-content')}
        loading={table.status.loading}
        sx={{
          width: '100%',
          fontFamily: 'inherit !important',
          border: 'none !important',
          '& .MuiDataGrid-columnHeaders': {
            borderTopLeftRadius: '0',
            borderTopRightRadius: '0',
          },
          '& .MuiDataGrid-main': {
            border: '1px solid #E0E4EA',
            borderRadius: '10px',
          },
          '& .MuiDataGrid-row': {
            background: 'none !important',
          },
          '& .MuiDataGrid-row--borderBottom': {
            background: '#1414140A !important',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            minHeight: 'unset',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            whiteSpace: 'normal',
            textAlign: 'center',
          },
          '& .MuiDataGrid-columnHeaderTitleContainer': {
            flexDirection: 'row !important',
            fontWeight: '600 !important',
            whiteSpace: 'normal',
          },
          '& .MuiDataGrid-cell': {
            textAlign: 'left !important',
            borderTop: 'none !important',
            outline: 'none !important',
          },
        }}
      />
      <div className={styles.table_footer}>
        <label className={styles.page_size_selector}>
          <p>Строк на странице:</p>
          <TextField
            type="number"
            value={paginationModel.pageSize}
            onChange={handlePageSizeChange}
            className={styles.field_label}
            inputClassName={styles.field}
          />
        </label>
        <div className={styles.controls}>
          <span>
            Страница {paginationModel.page + 1} из {totalPages}
          </span>
          <div className={styles.arrows}>
            <button
              disabled={paginationModel.page === 0}
              onClick={() =>
                handlePaginationChange({
                  ...paginationModel,
                  page: 0,
                })
              }
            >
              <DoubleChevronLeft />
            </button>
            <button
              disabled={paginationModel.page === 0}
              onClick={() =>
                handlePaginationChange({
                  ...paginationModel,
                  page: paginationModel.page - 1,
                })
              }
            >
              <ChevronLeft />
            </button>

            <button
              disabled={
                paginationModel.page === totalPages || paginationModel.page === totalPages - 1
              }
              onClick={() =>
                handlePaginationChange({
                  ...paginationModel,
                  page: paginationModel.page + 1,
                })
              }
            >
              <ChevronRight />
            </button>
            <button
              disabled={
                paginationModel.page === totalPages || paginationModel.page === totalPages - 1
              }
              onClick={() =>
                handlePaginationChange({
                  ...paginationModel,
                  page: Math.floor(table.count / table.pagination.take),
                })
              }
            >
              <DoubleChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
