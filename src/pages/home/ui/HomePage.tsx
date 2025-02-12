import clsx from 'clsx'
import styles from './HomePage.module.sass'
import { useEffect, useState } from 'react'
import { HomeTabs } from '@/widgets/home-tabs'
import { homeTabs } from '../config/tabs'
import { AllOrdersTab } from '../tabs/AllOrders'
import { TodayOrdersTab } from '../tabs/TodayOrders'
import { ProductsTab } from '../tabs/Products'
import { HomeTabT } from '@/widgets/home-tabs/types'
import {
    DefaultService,
    OrderService,
    ProductService,
    PromocodeService,
} from '@/shared/api/services'
import { format } from 'date-fns'
import { UsersTab } from '../tabs/Users'
import { UserService } from '@/shared/api/services/UserService'
import { BrandsTab } from '../tabs/Brands'
import { BrandService } from '@/shared/api/services/BrandService'
import { ActiveUsersTab } from '../tabs/ActiveUsers/ui/ActiveUsersTab'
import { PromocodesTab } from '../tabs/Promocodes/ui/PromocodesTab'

export const HomePage = () => {
    const [activeTab, setActiveTab] = useState<HomeTabT | null>(homeTabs[0])
    const [tabs, setTabs] = useState<HomeTabT[]>(homeTabs)

    const tabsComponents = {
        'all-orders': <AllOrdersTab />,
        'today-orders': <TodayOrdersTab />,
        products: <ProductsTab />,
        users: <UsersTab />,
        brands: <BrandsTab />,
        'active-users': <ActiveUsersTab />,
        promocodes: <PromocodesTab />,
    }

    // useEffect(() => {
    //     switch () {
    //       case value:

    //         break;

    //       default:
    //         break;
    //     }
    // }, [])

    useEffect(() => {
        const fetchData = async () => {
            const { data: dashboard } = await DefaultService.getDashboard()

            setTabs((prev) => {
                return prev.map((item) => {
                    switch (item.value) {
                        case 'all-orders':
                            return {
                                ...item,
                                count: dashboard.orderCount,
                            }
                        case 'today-orders':
                            return {
                                ...item,
                                count: dashboard.todayOrderCount,
                            }
                        case 'canceled-packages':
                            return {
                                ...item,
                                count: dashboard.cancelledOrderCount,
                            }
                        case 'returned-packages':
                            return {
                                ...item,
                                count: dashboard.returnCount,
                            }
                        case 'products':
                            return {
                                ...item,
                                count: dashboard.productCount,
                            }
                        case 'users':
                            return {
                                ...item,
                                count: dashboard.userCount,
                            }
                        case 'brands':
                            return {
                                ...item,
                                count: dashboard.brandCount,
                            }
                        case 'active-users':
                            return {
                                ...item,
                                count: dashboard.activeUserCount,
                            }
                        case 'promocodes':
                            return {
                                ...item,
                                count: dashboard.promocodeCount,
                            }

                        default:
                            return item
                    }
                })
            })
        }
        fetchData()
    }, [])

    return (
        <div className={clsx(styles.page, 'page')}>
            <h1 className="page_title">Главная</h1>

            <HomeTabs
                tabs={tabs}
                activeValue={activeTab?.value}
                onTabChange={(tab) => setActiveTab(tab)}
            />

            <div className={clsx(styles.page_table, 'page_table')}>
                {
                    tabsComponents[
                        activeTab?.value as keyof typeof tabsComponents
                    ]
                }
            </div>
        </div>
    )
}
