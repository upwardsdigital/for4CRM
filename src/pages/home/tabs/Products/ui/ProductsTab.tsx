import { useEffect, useState } from 'react'
import { Table } from '@/widgets/table'
import { columns } from '../config/columns'
import { EditIcon, ViewIcon } from '@/shared/ui/icons'
import { ProductService } from '@/shared/api/services'
import { TableDataT } from '@/shared/types'

export const ProductsTab = () => {
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

    useEffect(() => {
        setIsLoading(true)
        ProductService.getProducts({ ...data.pagination, ...data.filters })
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
            search={data.filters.search}
            onFilterChange={(data) => {
                setData((prev) => ({
                    ...prev,
                    filters: { ...prev.filters.search, [data.key]: data.value },
                }))
            }}
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
            columns={[...columns]}
            rows={data.rows}
        />
    )
}
