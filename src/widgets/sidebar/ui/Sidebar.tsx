import { BiHome } from 'react-icons/bi';
import { Dropdown } from '@/shared/ui/Dropdown';
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.sass';
import clsx from 'clsx';

export const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <img src="/img/logo.svg" alt="For You Logo" className={styles.logo} />
      </div>

      <div className={styles.content}>
        <Link
          to="/home"
          className={clsx(styles.sidebar_item, pathname === '/home' && styles.active)}
        >
          <BiHome size={24} />
          Главная
        </Link>
        <Dropdown
          instantOpen={pathname === '/departments' || pathname === '/subdepartments'}
          title={
            <p
              className={clsx(
                styles.sidebar_item,
                styles.dropdown_title_item,
                (pathname === '/departments' || pathname === '/subdepartments') && styles.active
              )}
            >
              <BiHome size={24} />
              Отделы
            </p>
          }
        >
          <Link to="/departments" className={clsx(styles.sidebar_item, styles.dropdown_item)}>
            Отделы
          </Link>
          <Link to="/subdepartments" className={clsx(styles.sidebar_item, styles.dropdown_item)}>
            Подотделы
          </Link>
        </Dropdown>
        <Dropdown
          instantOpen={
            pathname === '/categories' ||
            pathname === '/sub-categories' ||
            pathname === '/inner-categories'
          }
          title={
            <p
              className={clsx(
                styles.sidebar_item,
                styles.dropdown_title_item,
                (pathname === '/categories' ||
                  pathname === '/sub-categories' ||
                  pathname === '/inner-categories') &&
                  styles.active
              )}
            >
              <BiHome size={24} />
              Категории
            </p>
          }
        >
          <Link to="/categories" className={clsx(styles.sidebar_item, styles.dropdown_item)}>
            Категории
          </Link>
          <Link to="/sub-categories" className={clsx(styles.sidebar_item, styles.dropdown_item)}>
            Подкатегории
          </Link>
          <Link to="/inner-categories" className={clsx(styles.sidebar_item, styles.dropdown_item)}>
            Внутрение категории
          </Link>
        </Dropdown>
      </div>
    </div>
  );
};
