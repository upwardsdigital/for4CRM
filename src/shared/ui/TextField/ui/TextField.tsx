import React from 'react';
import styles from './TextField.module.sass';
import { TextFieldNumberArrows } from './TextFieldNumberArrows';
import clsx from 'clsx';
import { SearchIcon } from '../../icons/SearchIcon';

interface TextFieldProps {
  value: any;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  label?: string;
  name?: string;
  placeholder?: string;
  inputClassName?: string;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isError?: boolean;
  helperText?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

export const TextField: React.FC<TextFieldProps> = ({
  value,
  type = 'text',
  required,
  label,
  name,
  placeholder,
  className,
  inputClassName,
  rightIcon,
  leftIcon,
  isError,
  disabled,
  helperText,
  onChange,
  onClick,
}) => {
  return (
    <label className={clsx(styles.label, className, isError && styles.error)}>
      {label && <p className={styles.label_text}>{label}</p>}
      <div className={styles.field_wrap}>
        {type === 'search' && <SearchIcon />}
        {leftIcon}
        <input
          name={name}
          type={type === 'number' ? 'text' : type}
          placeholder={placeholder}
          className={clsx(styles.field, inputClassName)}
          value={value}
          required={required}
          onChange={onChange}
          onClick={onClick}
        />
        {type === 'number' && <TextFieldNumberArrows value={value} onChange={onChange} />}
        {rightIcon}
      </div>
      {helperText && <p className={styles.helper}>{helperText}</p>}
    </label>
  );
};
