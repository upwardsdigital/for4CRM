import clsx from 'clsx';
import styles from './Select.module.sass';
import { useState, useEffect, useRef } from 'react';
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
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  options?: SelectOptionItemT[];
  readOnly?: boolean;
  onChange?: (option: SelectOptionItemT) => void;
}

export const Select: React.FC<TextFieldProps> = ({
  label,
  value,
  helperText,
  isError,
  placeholder,
  disabled,
  className,
  options,
  readOnly,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<any>(null);
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

  useEffect(() => {
    if (options) {
      const selectedOption = options.find((option) => option.value === value);
      if (selectedOption) {
        setSelectedValue(selectedOption);
      }
    } else {
      setSelectedValue('');
    }
  }, [value, options]);

  return (
    <div
      className={clsx(
        styles.select,
        className,
        isError && styles.error,
        disabled && styles.disabled
      )}
      ref={selectRef}
    >
      {label && <p className={styles.label_text}>{label}</p>}
      <div
        className={styles.select_title}
        onClick={() => {
          if (!readOnly) {
            setIsOpen(!isOpen);
          }
        }}
      >
        <div className={styles.field}>
          {selectedValue ? selectedValue.label : placeholder ? placeholder : ``}
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
