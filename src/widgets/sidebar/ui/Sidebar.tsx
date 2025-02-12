import { BiHome } from 'react-icons/bi'
import { Dropdown } from '@/shared/ui/Dropdown'
import { Link, useLocation } from 'react-router-dom'
import styles from './Sidebar.module.sass'
import clsx from 'clsx'

export const Sidebar = () => {
    const { pathname } = useLocation()
    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <img
                    src="/img/logo.svg"
                    alt="For You Logo"
                    className={styles.logo}
                />
            </div>

            <div className={styles.content}>
                <Link
                    to="/home"
                    className={clsx(
                        styles.sidebar_item,
                        pathname === '/home' && styles.active,
                    )}
                >
                    <BiHome size={24} />
                    Главная
                </Link>
                <Dropdown
                    instantOpen={pathname === '/departments'}
                    title={
                        <Link
                            to="/departments"
                            className={clsx(
                                styles.sidebar_item,
                                styles.dropdown_title_item,
                                pathname === '/departments' && styles.active,
                            )}
                        >
                            <BiHome size={24} />
                            Отделы
                        </Link>
                    }
                >
                    <button
                        className={clsx(
                            styles.sidebar_item,
                            styles.dropdown_item,
                        )}
                    >
                        Подотделы
                    </button>
                </Dropdown>
            </div>
        </div>
    )
}
