import styles from './Layout.module.sass'
import { Navbar } from '@/widgets/navbar'
import { Sidebar } from '@/widgets/sidebar'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.content}>
                <Navbar />
                <main className={styles.main}>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
