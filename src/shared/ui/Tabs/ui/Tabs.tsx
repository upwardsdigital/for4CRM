import clsx from 'clsx';
import styles from './Tabs.module.sass';

type TabsItemT = {
  label: any;
  value: any;
};

interface TabsProps {
  value: string;
  tabs: TabsItemT[];
  className?: string;
  onChange: (tab: TabsItemT) => void;
}

export const Tabs: React.FC<TabsProps> = ({ value, tabs, className, onChange }) => {
  return (
    <div className={clsx(styles.tabs, className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab)}
          className={clsx(styles.tabs_button, value === tab.value && styles.active)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
