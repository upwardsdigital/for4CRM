import { ChevronUp } from '@/shared/ui/icons';
import styles from './CombinationsPage.module.sass';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';

interface TableDropdownProps {
  isOpen?: boolean;
  title?: string;
  children: React.ReactNode;
  onToggle?: () => void;
}

export const TableDropdown: React.FC<TableDropdownProps> = ({
  title,
  isOpen,
  children,
  onToggle,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (onToggle) {
      onToggle();
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      const content = contentRef.current;
      if (isOpen) {
        content.style.transition = 'max-height 0.5s ease, opacity 0.5s ease';
        content.style.maxHeight = `${content.scrollHeight}px`;
        content.style.opacity = '1';
      } else {
        content.style.transition = 'max-height 0.5s ease, opacity 0.3s ease';
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
      }
    }
  }, [isOpen]);

  return (
    <div className={clsx(styles.dropdown, isOpen && styles.active)}>
      <div className={styles.title_wrap}>
        <h4 className={styles.title}>{title}</h4>

        <div
          className={clsx(styles.dropdown_btn, isOpen && styles.active)}
          onClick={toggleDropdown}
        >
          {isOpen ? 'Свернуть таблицу' : 'Развернуть таблицу'}
          <ChevronUp />
        </div>
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  );
};
