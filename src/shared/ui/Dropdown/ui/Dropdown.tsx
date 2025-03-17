import { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.sass';
import clsx from 'clsx';

interface DropdownProps {
  title: React.ReactNode;
  children: React.ReactNode;
  onOpen?: React.ReactNode;
  instantOpen?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({ title, instantOpen, children }) => {
  const [isOpen, setIsOpen] = useState(instantOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOpen = () => {
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
  };

  useEffect(() => {
    handleOpen();
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(true);
    setTimeout(() => {
      handleOpen();
    }, 100);
  }, [instantOpen]);

  return (
    <div className={clsx(styles.dropdown, isOpen && styles.active)}>
      <div className={styles.dropdown_title} onClick={toggleDropdown}>
        {title}
      </div>
      <div ref={contentRef} className={`${styles.dropdown_content} ${isOpen ? styles.open : ''}`}>
        {children}
      </div>
    </div>
  );
};
