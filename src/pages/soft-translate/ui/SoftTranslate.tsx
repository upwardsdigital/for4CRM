import { FilterUp } from '@/shared/ui/icons';
import styles from './SoftTranslate.module.sass';
import { useState } from 'react';
import { Select } from '@/shared/ui/Select/ui/Select';
import { TextField } from '@/shared/ui/TextField';

export const SoftTranslate = () => {
  const [status, setStatus] = useState(false);
  const [status2, setStatus2] = useState(false);

  const [isContentVisible, setIsContentVisible] = useState(true);

  const handleToggle = (newStatus) => {
    setStatus(newStatus);
  };

  const handleToggle2 = (newStatus) => {
    setStatus2(newStatus);
  };

  const toggleContentVisibility = () => {
    setIsContentVisible((prev) => !prev);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page_title">Перевод</h1>
      </div>

      <div className={styles.items}>
        <div className={styles.item}>
          <div className={styles.item_filter_top}>
            <p onClick={toggleContentVisibility}>Свернуть фильтр</p>
            <FilterUp />
          </div>

          <div className={styles.item_content}>
            <div className={styles.item_content_top}>
              <p>Управление карточкой товора (автоматическое с помощью API стороние приложения)</p>
              <div className={styles.item_content_status}>
                <p className={status ? styles.active : ''} onClick={() => handleToggle(true)}>
                  Вкл
                </p>
                <p className={!status ? styles.active : ''} onClick={() => handleToggle(false)}>
                  Выкл
                </p>
              </div>
            </div>

            {isContentVisible && (
              <div className={styles.filters}>
                <div className={styles.filters_content}>
                  <h2>ОПИСАНИЕ ТОВАРА</h2>
                  <div className={styles.filters_items}>
                    <div className={styles.filters_item}>
                      <p>Выберите магазин </p>
                      <Select />
                    </div>

                    <div className={styles.filters_item}>
                      <p>Выберите отдел</p>
                      <TextField placeholder="выбрать отдел" />
                    </div>

                    <div className={styles.filters_item}>
                      <p>Удалить первые слова </p>
                      <TextField placeholder="количество слов " />
                    </div>

                    <div className={styles.filters_item}>
                      <p>Удалить последние слова </p>
                      <TextField placeholder="количество слов " />
                    </div>
                  </div>
                </div>

                <div className={styles.filters_content}>
                  <h2>СОЗДАНИЕ ВКЛАДОК ДЛЯ ТОВАРА</h2>
                  <div className={styles.filters_items}>
                    <div className={styles.filters_item}>
                      <p>Выберите магазин </p>
                      <Select />
                    </div>

                    <div className={styles.filters_item}>
                      <p>Создать вкладку</p>
                      <TextField placeholder="Написатать вкладку" />
                    </div>

                    <div className={styles.filters_item_status}>
                      <p>Добавить</p>

                      <div className={styles.item_content_status}>
                        <p
                          className={status2 ? styles.active : ''}
                          onClick={() => handleToggle2(true)}
                        >
                          Вкл
                        </p>
                        <p
                          className={!status2 ? styles.active : ''}
                          onClick={() => handleToggle2(false)}
                        >
                          Выкл
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.filters_content}>
                  <h2>УПРАВЛЕНИЕ ВКЛАДКАМИ КАРТОЧКОЙ ТОВАРА</h2>
                </div>

                <div className={styles.filters_content}>
                  <div className={styles.filters_items}>
                    <div className={styles.filters_item}>
                      <p>Выберите магазин</p>
                      <TextField placeholder="Написатать вкладку" />
                    </div>

                    <div className={styles.filters_item}>
                      <p>Выбрать вкладку </p>
                      <Select />
                    </div>
                  </div>
                </div>

                <div className={styles.filters_content}>
                  <h2>ПЕРЕВОД ВКЛАДОК С ОПИСАНИЕМ ТОВАРА ВРУЧНУЮ</h2>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.item_filter_top}>
            <p>Свернуть фильтр</p>
            <FilterUp />
          </div>

          <div className={styles.item_content}>
            <div className={styles.item_content_top}>
              <p>Управление карточкой товора (автоматическое с помощью API стороние приложения)</p>
              <div className={styles.item_content_status}>
                <p className={status ? styles.active : ''} onClick={() => handleToggle(true)}>
                  Вкл
                </p>
                <p className={!status ? styles.active : ''} onClick={() => handleToggle(false)}>
                  Выкл
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
