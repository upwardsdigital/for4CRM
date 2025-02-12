import { useEffect, useState } from 'react'
import { Table } from '@/widgets/table'
import { columns } from '../config/columns'
import { EditIcon, ViewIcon } from '@/shared/ui/icons'
import { OrderService } from '@/shared/api/services'
import { format } from 'date-fns'

export const TodayOrdersTab = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [orders, setOrders] = useState<any[]>([])

    useEffect(() => {
        setIsLoading(true)
        const today = new Date().toISOString()
        OrderService.getOrders({
            startDate: format(today, 'yyyy-MM-dd'),
            endDate: format(today, 'yyyy-MM-dd'),
        })
            .then((resp) => {
                setOrders(resp.data.items)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return (
        <Table
            loading={isLoading}
            columns={[
                ...columns,
                {
                    type: 'actions',
                    field: 'actions',
                    width: 100,
                    renderCell: ({ row }) => {
                        console.log(row)
                        return (
                            <div>
                                <button>
                                    <EditIcon />
                                </button>
                                <button>
                                    <ViewIcon />
                                </button>
                            </div>
                        )
                    },
                },
            ]}
            rows={orders}
        />
    )
}
