import { BoxIcon, SoftMoreIcon, SoftUploadIcon, TranslateIcon } from '@/shared/ui/icons';
import styles from './SoftPage.module.sass';
import { Link } from 'react-router-dom';

export const SoftPage = () => {
  return (
    <div>
      <div className="page-header">
        <h1 className="page_title">SOFT</h1>
      </div>

      <div className={styles.soft_items}>
        <div className={styles.soft_item}>
          <div className={styles.soft_item_top}>
            <BoxIcon />
            <p>Распаковка</p>
          </div>
          <Link to="/admin/soft-unbox-page" className={styles.soft_button}>
            Распаковка
          </Link>
        </div>

        <div className={styles.soft_item}>
          <div className={styles.soft_item_top}>
            <SoftUploadIcon />
            <p>Загрузка фотографий</p>
          </div>
          <Link to="" className={styles.soft_button}>
            Загрузка
          </Link>
        </div>

        <div className={styles.soft_item}>
          <div className={styles.soft_item_top}>
            <SoftMoreIcon />
            <p>Растановка фотографии карточки товара</p>
          </div>
          <Link to="/admin/soft-card-order" className={styles.soft_button}>
            Растановка
          </Link>
        </div>

        <div className={styles.soft_item}>
          <div className={styles.soft_item_top}>
            <TranslateIcon />
            <p>Перевод </p>
          </div>
          <Link to="/admin/soft-translate" className={styles.soft_button}>
            Перевод
          </Link>
        </div>
      </div>
    </div>
  );
};
