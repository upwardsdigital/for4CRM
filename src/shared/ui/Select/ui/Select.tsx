import clsx from 'clsx';
import styles from './Select.module.sass';
import { useState, useEffect, useRef } from 'react';
import { TextField } from '@/shared/ui/TextField';
import { ChevronDown } from '@/shared/ui/icons';

type SelectOptionItemT = {
  label: string | React.ReactNode;
  value: any;
};

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  name?: string;
  helperText?: string;
  isError?: boolean;
  disabled?: boolean;
  className?: string;
  options?: SelectOptionItemT[];
  onChange?: (option: SelectOptionItemT) => void;
}

export const Select: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  value,
  required,
  name,
  helperText,
  isError,
  disabled,
  className,
  options,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={clsx(styles.select, className, isError && styles.error)} ref={selectRef}>
      {label && <p className={styles.label_text}>{label}</p>}
      <div className={styles.select_title} onClick={() => setIsOpen(!isOpen)}>
        <div
          className={styles.field}
          // helperText={helperText}
          // isError={isError}
          // required={required}
          // disabled={disabled}
        >
          {(options && options.find((option) => option.value === value)?.label) ||
            `Select ${name ? name : 'option'}`}
        </div>
        <ChevronDown />
      </div>
      {helperText && <p className={styles.helper}>{helperText}</p>}
      {options && isOpen && (
        <div className={clsx(styles.select_options, isOpen && styles.active)}>
          {options.map((option) => (
            <button
              type="button"
              className={clsx(styles.select_options_item, value === option.value && styles.active)}
              key={option.value}
              onClick={() => {
                if (onChange) {
                  onChange(option);
                  setIsOpen(false);
                }
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
