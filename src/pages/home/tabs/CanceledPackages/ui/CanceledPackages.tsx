import { useEffect, useState } from 'react'
import { Table } from '@/widgets/table'
import { columns } from '../config/columns'
import { EditIcon, ViewIcon } from '@/shared/ui/icons'
import { OrderService } from '@/shared/api/services'
import { useModal } from '@/shared/hooks'
import { OrderDetailsModal } from '@/pages/home/modals/OrderDetailsModal'
import { TableDataT } from '@/shared/types'

export const CanceledPackages = () => {
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

    const { openModal } = useModal()

    useEffect(() => {
        setIsLoading(true)
        OrderService.getOrders({ ...data.pagination, ...data.filters })
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
            loading={isLoading}
            totalRows={data.count}
            take={data.pagination.take}
            search={data.filters.search}
            onFilterChange={(data) => {
                setData((prev) => ({
                    ...prev,
                    filters: { ...prev.filters.search, [data.key]: data.value },
                }))
            }}
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
                    width: 100,
                    renderCell: ({ row }) => {
                        return (
                            <div>
                                <button>
                                    <EditIcon />
                                </button>
                                <button
                                    onClick={() =>
                                        openModal(
                                            'order-detail-modal',
                                            <OrderDetailsModal id={row.id} />,
                                            {
                                                title: `Детали данных заказа №${row.id}`,
                                            },
                                        )
                                    }
                                >
                                    <ViewIcon />
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
