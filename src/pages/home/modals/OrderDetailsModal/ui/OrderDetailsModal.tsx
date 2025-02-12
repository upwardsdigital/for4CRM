import { OrderT } from '@/shared/types'
import styles from './OrderDetailsModal.module.sass'
import { useEffect, useState } from 'react'
import { OrderService } from '@/shared/api/services'

interface OrderDetailsModalProps {
    id: number
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ id }) => {
    const [data, setData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        OrderService.getOrderById(id)
            .then((resp) => setData(resp.data))
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return (
        <div className={styles.order_detail}>
            {isLoading ? (
                <div>Загрузка...</div>
            ) : (
                data && (
                    <div className={styles.order_detail_item}>
                        <h4>Товары</h4>
                        <ul className={styles.order_products_list}>
                            {data.products.map((product) => (
                                <li className={styles.product}>
                                    <a href="#">product</a>,
                                    <p>
                                        <a href="#">
                                            {product.name_ru || product.name_en}
                                        </a>
                                        , {product.count} шт.,{' '}
                                        {product.color_name},{' '}
                                        {product.size_name}
                                        <a href="#">product</a>,
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            )}
        </div>
    )
}
