import styles from './DeleteModal.module.sass';
import { Button } from '@/shared/ui/Button';

interface DeleteModalProps {
  title: string;
  desc?: string;
  onSubmit: () => void;
  onCancel?: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ title, desc, onSubmit, onCancel }) => {
  return (
    <div className={styles.modal}>
      <h2>{title}</h2>
      <p>{desc || 'Это действие необратимо.'}</p>
      <div className={styles.controls}>
        <Button onClick={onCancel}>Отменить</Button>
        <Button onClick={onSubmit}>Удалить</Button>
      </div>
    </div>
  );
};
