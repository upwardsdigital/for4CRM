import { HomeTabsProps } from '../types/HomeTabsProps';
import styles from './HomeTabs.module.sass';
import clsx from 'clsx';

export const HomeTabs: React.FC<HomeTabsProps> = ({
  activeValue,
  tabs,
  className,
  onTabChange,
}) => {
  return (
    <div className={clsx(styles.tabs, className)}>
      {tabs.map((tabItem, index) => (
        <button
          key={tabItem.value}
          onClick={() => onTabChange && onTabChange({ ...tabItem, index })}
          className={clsx(styles.tabs_button, activeValue === tabItem.value && styles.active)}
        >
          {<tabItem.icon />}
          <div className={styles.tabs_button_info}>
            <h4>{tabItem.title}</h4>
            <p>{tabItem.count}</p>
          </div>
        </button>
      ))}
    </div>
  );
};
