import styles from './SoftImageUpload.module.sass';

export const SoftImageUpload = () => {
  return (
    <div>
      <div className="page-header">
        <h1 className="page_title">Загрузка фотографий</h1>
      </div>

      <div className={styles.terminal}>
        <div className={styles.terminal_name}>ТЕРМИНАЛ</div>
        <div className={styles.terminal_items}>
          <div className={styles.terminal_item}>
            <p>
              <span></span> ID: 74206 - b2114a150a5d49c88e2574d879f45d05.jpg
            </p>
          </div>
          <div className={styles.terminal_item}>
            <p>
              <span></span> ID: 74206 - b2114a150a5d49c88e2574d879f45d05.jpg
            </p>
          </div>
          <div className={styles.terminal_item}>
            <p>
              <span></span> ID: 74206 - b2114a150a5d49c88e2574d879f45d05.jpg
            </p>
          </div>
          <div className={styles.terminal_item}>
            <p>
              <span></span> ID: 74206 - b2114a150a5d49c88e2574d879f45d05.jpg
            </p>
          </div>
        </div>

        <div className={styles.pagination}>
          <button className={styles.pagination_btn}>&lt;&lt;предыдущий</button>
          <div className={styles.pagination_count}>страница 1 - 1700</div>
          <button className={styles.pagination_btn}>следущий &gt;&gt;</button>
        </div>

        <div className={styles.terminal_bottom}>
          <button className={styles.top_btn}>ЗАГРУЗИТЬ ВСЕ ФОТОГРФИИ</button>
        </div>
      </div>
    </div>
  );
};
