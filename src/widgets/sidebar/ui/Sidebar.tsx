import { BiHome } from 'react-icons/bi'
import styles from './Sidebar.module.sass'
import clsx from 'clsx'

export const Sidebar = () => {
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
                <button className={clsx(styles.sidebar_item, styles.active)}>
                    <BiHome size={24} />
                    Главная
                </button>
            </div>
        </div>
    )
}
