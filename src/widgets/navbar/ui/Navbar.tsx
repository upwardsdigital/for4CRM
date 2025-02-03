import { HiMenuAlt2 } from 'react-icons/hi'
import styles from './Navbar.module.sass'
import { RiUserLine } from 'react-icons/ri'
import { IoLogInOutline } from 'react-icons/io5'

export const Navbar = () => {
    return (
        <header className={styles.header}>
            <div className={styles.navbar}>
                <div className={styles.left}>
                    <button className={styles.menu_btn}>
                        <HiMenuAlt2 size={20} />
                        Меню
                    </button>
                </div>

                <div className={styles.right}>
                    <button>
                        <RiUserLine size={20} />
                    </button>
                    <button>
                        <IoLogInOutline size={20} />
                    </button>
                </div>
            </div>
        </header>
    )
}
