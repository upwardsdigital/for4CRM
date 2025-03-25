import { TextField } from '@/shared/ui/TextField';
import styles from './SoftCardOrder.module.sass';
import { Select } from '@/shared/ui/Select/ui/Select';

export const SoftCardOrder = () => {
  return (
    <div>
      <div className="page-header">
        <h1 className="page_title">Расстановка фотографий карточки товара</h1>
      </div>

      <div className={styles.terminal}>
        <div className={styles.terminal_name}></div>
        <div className={styles.items}>
          <div className={styles.item}>
            <p>Выберите магазин</p>
            <TextField placeholder="Выберите магазин" value="Выберите магазин" />
          </div>
          <div className={styles.item}>
            <p>Выберите отдел</p>
            <TextField placeholder="Выберите отдел" value="Выберите отдел" />
          </div>
          <div className={styles.item}>
            <p>Выберите категорию</p>
            <TextField placeholder="Выберите категорию" value="Выберите категорию" />
          </div>
          <div className={styles.item}>
            <p>Индекс (заглавная)</p>
            <Select />
          </div>
        </div>

        <div className={styles.terminal_bottom}>
          <button className={styles.top_btn}>УСТАНОВИТЬ</button>
        </div>
      </div>
    </div>
  );
};
