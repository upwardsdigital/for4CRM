import { BoxIcon, SoftMoreIcon, SoftUploadIcon, TranslateIcon } from '@/shared/ui/icons';
import styles from './SoftUnboxPage.module.sass';

export const SoftUnboxPage = () => {
  return (
    <div>
      <div className="page-header">
        <h1 className="page_title">Распаковка</h1>
      </div>

      <div className={styles.top}>
        <div className={styles.top_content}>
          <div className={styles.top_file_name}>Выберите файл</div>
          <div className={styles.top_btns}>
            <div className={styles.top_name}>Название файла </div>
            <div className={styles.top_btn}>ЗАГРУЗИТЬ</div>
          </div>
        </div>
      </div>

      <div className={styles.terminal}>
        <div className={styles.terminal_name}>ТЕРМИНАЛ</div>
        <div className={styles.terminal_items}>
          <div className={styles.terminal_item}>
            <p>1. For Woman-Shoes-t1mcbujj.json 06/03/2025 18.00</p>
          </div>
          <div className={styles.terminal_item}>
            <p>1. For Woman-Shoes-t1mcbujj.json 06/03/2025 18.00</p>
          </div>
          <div className={styles.terminal_item}>
            <p>1. For Woman-Shoes-t1mcbujj.json 06/03/2025 18.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};
