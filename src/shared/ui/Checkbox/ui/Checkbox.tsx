import React from 'react';
import styles from './Checkbox.module.sass';

interface CheckboxProps {
  value: boolean;
  label?: string;
  name?: string;
  readOnly?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ value, label, name, readOnly, onChange }) => {
  return (
    <label className={styles.label}>
      <div className={styles.checkbox_wrap}>
        <input
          type="checkbox"
          checked={value}
          name={name}
          onChange={onChange}
          readOnly={readOnly}
          className={styles.default_checkbox}
        />
        <span className={styles.checkbox}></span>
      </div>
      <p>{label}</p>
    </label>
  );
};
