import { Dropdown } from '@/shared/ui/Dropdown';
import clsx from 'clsx';
import { BiHome } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
import styles from './CrmSidebar.module.sass';

export const CrmSidebar = () => {
  const { pathname } = useLocation();
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <img src="/img/logo.svg" alt="For You Logo" className={styles.logo} />
      </div>

      <div className={styles.content}>
        <Dropdown
          instantOpen={pathname === '/departments' || pathname === '/subdepartments'}
          title={
            <p
              className={clsx(
                styles.sidebar_item,
                styles.dropdown_title_item,
                pathname === '/clients' && styles.active
              )}
            >
              <BiHome size={24} />
              Клиенты
            </p>
          }
        >
          <Link to="/crm/clients" className={clsx(styles.sidebar_item, styles.dropdown_item)}>
            Клиенты
          </Link>
          <Link to="" className={clsx(styles.sidebar_item, styles.dropdown_item)}>
            Программа лояльности
          </Link>
          <Link to="" className={clsx(styles.sidebar_item, styles.dropdown_item)}>
            Письма
          </Link>
        </Dropdown>
      </div>
    </div>
  );
};
