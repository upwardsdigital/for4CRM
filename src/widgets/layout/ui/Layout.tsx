import { ReactNode } from 'react'
import styles from './Layout.module.sass'
import { Navbar } from '@/widgets/navbar'
import { Sidebar } from '@/widgets/sidebar'

interface LayoutProps {
    children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.content}>
                <Navbar />
                <main className={styles.content}>{children}</main>
            </div>
        </div>
    )
}
