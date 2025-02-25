import { Dropdown } from '@/shared/ui/Dropdown';
import { Link, useLocation } from 'react-router-dom';
import { links } from '../model/links';
import styles from './Sidebar.module.sass';
import clsx from 'clsx';

export const Sidebar = () => {
  const { pathname } = useLocation();

  const getActiveClass = (sidebarItem: any) => {
    const isActive =
      pathname === sidebarItem.pathname ||
      sidebarItem.children?.some((link: any) => link.pathname === pathname);
    return isActive ? styles.active : '';
  };

  const renderSidebarItem = (sidebarItem: any) => {
    const activeClass = getActiveClass(sidebarItem);

    if (sidebarItem.children && sidebarItem.children.length > 0) {
      const dropdownTitle = sidebarItem.pathname ? (
        <Link
          to={sidebarItem.pathname}
          className={clsx(styles.sidebar_item, styles.dropdown_title_item, activeClass)}
        >
          {sidebarItem.title}
        </Link>
      ) : (
        <p className={clsx(styles.sidebar_item, styles.dropdown_title_item, activeClass)}>
          {sidebarItem.icon}
          {sidebarItem.title}
        </p>
      );

      return (
        <Dropdown instantOpen={Boolean(activeClass)} title={dropdownTitle}>
          {sidebarItem.children.map((link) => (
            <Link
              to={link.pathname}
              className={clsx(
                styles.sidebar_item,
                styles.dropdown_item,
                link.pathname === pathname && styles.active
              )}
              key={link.pathname}
            >
              {link.title}
            </Link>
          ))}
        </Dropdown>
      );
    } else {
      return (
        <Link
          to={sidebarItem.pathname}
          className={clsx(styles.sidebar_item, activeClass)}
          key={sidebarItem.pathname}
        >
          {sidebarItem.icon}
          {sidebarItem.title}
        </Link>
      );
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <img src="/img/logo.svg" alt="For You Logo" className={styles.logo} />
      </div>

      <div className={styles.content}>{links.map(renderSidebarItem)}</div>
    </div>
  );
};
