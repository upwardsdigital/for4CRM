import {
    ShoppingBagIcon,
    ShoppingCartIcon,
    TagIcon,
    TicketIcon,
    UsersIcon,
} from '@/shared/ui/icons'
import { HomeTabT } from '@/widgets/home-tabs/types'

export const homeTabs: HomeTabT[] = [
    {
        title: 'Все заказы',
        count: 0,
        value: 'all-orders',
        icon: ShoppingBagIcon,
    },
    {
        title: 'Заказы за сегодня',
        count: 0,
        value: 'today-orders',
        icon: ShoppingBagIcon,
    },
    {
        title: 'Отмененные посылки',
        count: 0,
        value: 'canceled-packages',
        icon: ShoppingCartIcon,
    },
    {
        title: 'Возвращенные посылки',
        count: 0,
        value: 'returned-packages',
        icon: ShoppingCartIcon,
    },
    {
        title: 'Товары',
        count: 0,
        value: 'products',
        icon: ShoppingCartIcon,
    },
    {
        title: 'Пользователи',
        count: 0,
        value: 'users',
        icon: UsersIcon,
    },
    {
        title: 'Активные пользователи',
        count: 0,
        value: 'active-users',
        icon: UsersIcon,
    },
    {
        title: 'Бренды',
        count: 0,
        value: 'brands',
        icon: TagIcon,
    },
    {
        title: 'Промокоды',
        count: 0,
        value: 'promocodes',
        icon: TicketIcon,
    },
]
