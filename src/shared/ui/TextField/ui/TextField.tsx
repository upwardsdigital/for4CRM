import React from 'react';
import styles from './TextField.module.sass';
import { TextFieldNumberArrows } from './TextFieldNumberArrows';
import clsx from 'clsx';
import { SearchIcon } from '../../icons/SearchIcon';
import { FiPlus, FiTrash } from 'react-icons/fi';

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
  hideArrows?: boolean;
  onDeleteFile?: () => void;
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
  helperText,
  hideArrows,
  onDeleteFile,
  onChange,
  onClick,
}) => {
  const handleFileDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDeleteFile) {
      onDeleteFile();
    }
  };

  const renderFileInput = () => (
    <label className={clsx(styles.label, className, isError && styles.error)}>
      {label && <p className={styles.label_text}>{label}</p>}
      <div className={styles.field_wrap}>
        <input name={name} type="file" className={styles.file} onChange={onChange} />
        {leftIcon}
        {value ? (
          <button
            type="button"
            className={clsx(styles.file_item, styles.active)}
            onClick={handleFileDeleteClick}
          >
            <p>{value.name}</p> <FiTrash color="#AEB2B8" />
          </button>
        ) : (
          <span className={clsx(styles.file_item)}>
            <p>Выберите файл</p> <FiPlus color="#AEB2B8" />
          </span>
        )}
        {rightIcon}
      </div>
      {helperText && <p className={styles.helper}>{helperText}</p>}
    </label>
  );

  const renderInputField = () => (
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
        {type === 'number' && !hideArrows && (
          <TextFieldNumberArrows value={value} onChange={onChange} />
        )}
        {rightIcon}
      </div>
      {helperText && <p className={styles.helper}>{helperText}</p>}
    </label>
  );

  return type === 'file' ? renderFileInput() : renderInputField();
};
