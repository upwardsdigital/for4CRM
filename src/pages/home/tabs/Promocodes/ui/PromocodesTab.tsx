import { useEffect, useState } from 'react'
import { Table } from '@/widgets/table'
import { columns } from '../config/columns'
import { ViewIcon, TicketIcon, EditIcon } from '@/shared/ui/icons'
import { TableDataT } from '@/shared/types'
import { BrandService } from '@/shared/api/services/BrandService'
import { ToggleButton } from '@/shared/ui/ToggleButton'
import { PromocodeService } from '@/shared/api/services'

export const PromocodesTab = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
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
    })

    const upatePromocodeStatus = (id: number, status: boolean) => {
        setData((prev) => {
            const prevRowsCopy = [...prev.rows]
            const promocodeIndex = data.rows.findIndex((item) => item.id === id)
            prevRowsCopy[promocodeIndex].is_active = status
            return { ...prev, rows: prevRowsCopy }
        })
    }

    useEffect(() => {
        setIsLoading(true)
        PromocodeService.getPromocodes({ ...data.pagination, ...data.filters })
            .then((resp) => {
                setData((prev) => ({
                    ...prev,
                    rows: resp.data.items,
                    count: resp.data.info.count,
                }))
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [data.filters, data.pagination])

    return (
        <Table
            title={
                <h2 className="table-title">
                    <TicketIcon />
                    Промокоды
                </h2>
            }
            search={data.filters.search}
            onFilterChange={(data) => {
                setData((prev) => ({
                    ...prev,
                    filters: { ...prev.filters.search, [data.key]: data.value },
                }))
            }}
            loading={isLoading}
            totalRows={data.count}
            take={data.pagination.take}
            onPageChange={(data) =>
                setData((prev) => ({
                    ...prev,
                    pagination: {
                        take: data.pageSize,
                        skip: data.pageSize * data.page,
                    },
                }))
            }
            columns={[
                ...columns,
                {
                    type: 'actions',
                    field: 'actions',
                    flex: 1,
                    renderCell: ({ row }) => {
                        return (
                            <div className="table-actions">
                                <ToggleButton
                                    value={row.is_active}
                                    onChange={(e) => {
                                        const value = e.target.checked
                                        upatePromocodeStatus(row.id, value)
                                        PromocodeService.updatePromocodeById({
                                            is_active: value,
                                            id: row.id,
                                        }).catch(() => {
                                            upatePromocodeStatus(row.id, !value)
                                        })
                                    }}
                                />
                                <button onClick={() => console.log('dsds')}>
                                    <EditIcon />
                                </button>
                            </div>
                        )
                    },
                },
            ]}
            rows={data.rows}
        />
    )
}
