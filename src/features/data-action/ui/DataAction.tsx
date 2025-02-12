import { ModalDataT } from '@/shared/types';
import { SetStateAction } from 'react';
import { TextField } from '@/shared/ui/TextField';
import styles from './DataAction.module.sass';
import { Button } from '@/shared/ui/Button/ui/Button';

interface DataActionProps {
  title?: string;
  modalData: ModalDataT;
  setModalData: React.Dispatch<SetStateAction<ModalDataT>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const DataAction: React.FC<DataActionProps> = ({
  title,
  modalData,
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
        {Object.entries(modalData.fields).map(([key, field]) => {
          return (
            <TextField
              label={field.label}
              placeholder={field.placeholder}
              name={key}
              value={modalData.values[key]}
              isError={modalData.validation.error[key]}
              helperText={modalData.validation.message[key]}
              onChange={onChange}
            />
          );
        })}
      </div>

      <Button>{modalData.type === 'add' ? 'Добавить' : 'Редактировать'}</Button>
    </form>
  );
};
