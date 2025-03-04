import { ModalDataT } from '@/shared/types';
import { SetStateAction } from 'react';
import { TextField } from '@/shared/ui/TextField';
import styles from './DataAction.module.sass';
import { Button } from '@/shared/ui/Button/ui/Button';
import { Select } from '@/shared/ui/Select/ui/Select';
import { Checkbox } from '@/shared/ui/Checkbox';

interface DataActionProps {
  title?: string;
  modalData: ModalDataT;
  children?: React.ReactNode;
  setModalData: React.Dispatch<SetStateAction<ModalDataT>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const DataAction: React.FC<DataActionProps> = ({
  title,
  modalData,
  children,
  setModalData,
  onSubmit,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalData((prev) => ({
      ...prev,
      values: { ...prev.values, [e.target.name]: e.target.value },
      validation: {
        ...prev.validation,
        error: {
          ...prev.validation.error,
          [e.target.name]: false,
        },
        message: {
          ...prev.validation.message,
          [e.target.name]: '',
        },
      },
    }));
  };

  return (
    <form className={styles.action} onSubmit={onSubmit}>
      <h2>{`${modalData.type === 'add' ? 'Добавление' : 'Редактирование'} ${title}`}</h2>
      <div className={styles.action_form}>
        {children}
        {children === undefined &&
          Object.entries(modalData.fields).map(([key, field]) => {
            if (field.type === 'select') {
              return (
                <Select
                  label={field.label}
                  placeholder={field.placeholder}
                  name={key}
                  value={modalData.values[key]}
                  isError={modalData.validation.error[key]}
                  helperText={modalData.validation.message[key]}
                  onChange={(option) =>
                    setModalData((prev) => ({
                      ...prev,
                      values: { ...prev.values, [key]: option.value },
                    }))
                  }
                  options={field.options || []}
                />
              );
            }

            if (field.type === 'checkbox') {
              return (
                <Checkbox
                  label={field.label}
                  value={modalData.values[key] || false}
                  onChange={(e) =>
                    setModalData((prev) => ({
                      ...prev,
                      values: { ...prev.values, [key]: e.target.checked },
                    }))
                  }
                />
              );
            }

            return (
              <TextField
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                name={key}
                value={modalData.values[key]}
                isError={modalData.validation.error[key]}
                helperText={modalData.validation.message[key]}
                onChange={onChange}
                required={field.required}
              />
            );
          })}
      </div>

      <Button loading={modalData.isRequested}>
        {modalData.type === 'add' ? 'Добавить' : 'Редактировать'}
      </Button>
    </form>
  );
};
