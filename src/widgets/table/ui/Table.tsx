import styles from './Table.module.sass'
import React, { useState } from 'react'
import {
    DataGrid,
    GridColDef,
    GridValidRowModel,
    GridPaginationModel,
} from '@mui/x-data-grid'
import { TextField } from '@/shared/ui/TextField'
import {
    ChevronLeft,
    ChevronRight,
    DoubleChevronLeft,
    DoubleChevronRight,
} from '@/shared/ui/icons'
import clsx from 'clsx'

interface TableProps {
    title?: React.ReactNode
    columns: GridColDef[]
    rows: GridValidRowModel[]
    className?: string
    loading?: boolean
    take?: number
    skip?: number
    totalRows?: number
    search?: string
    customFilters?: React.ReactNode
    onPageChange?: (paginationModel: GridPaginationModel) => void
    onFilterChange?: (data: { key: string; value: any }) => void
}

export const Table: React.FC<TableProps> = ({
    title,
    columns,
    rows,
    className,
    loading,
    take = 10,
    totalRows = 0,
    search,
    skip = 0,
    customFilters,
    onPageChange,
    onFilterChange,
}) => {
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(
        {
            page: Math.floor(skip / take),
            pageSize: take,
        },
    )

    const handlePaginationChange = (model: GridPaginationModel) => {
        setPaginationModel(model)
        const newSkip = model.page * model.pageSize
        onPageChange?.({ ...model, skip: newSkip })
    }

    const handlePageSizeChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const newPageSize = Number(event.target.value)
        setPaginationModel((prevModel) => ({
            ...prevModel,
            pageSize: newPageSize,
        }))
        const newSkip = paginationModel.page * newPageSize
        onPageChange?.({
            ...paginationModel,
            pageSize: newPageSize,
            skip: newSkip,
        })
    }

    const totalPages = Math.ceil(totalRows / paginationModel.pageSize)

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
                            onChange={(e) =>
                                onFilterChange &&
                                onFilterChange({
                                    key: 'search',
                                    value: e.target.value,
                                })
                            }
                        />
                    )}
                    {customFilters}
                </div>
            )}
            <DataGrid
                columns={columns}
                rows={rows}
                paginationMode="server"
                paginationModel={paginationModel}
                hideFooterPagination
                onPaginationModelChange={handlePaginationChange}
                rowCount={totalRows}
                disableColumnFilter
                disableColumnMenu
                disableColumnSelector
                disableColumnResize
                disableRowSelectionOnClick
                className={clsx(className, 'table-content')}
                loading={loading}
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
                                    page: 1,
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
                            disabled={paginationModel.page === totalPages - 1}
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
                            disabled={paginationModel.page === totalPages - 1}
                            onClick={() =>
                                handlePaginationChange({
                                    ...paginationModel,
                                    page: Math.floor(totalRows / take),
                                })
                            }
                        >
                            <DoubleChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
