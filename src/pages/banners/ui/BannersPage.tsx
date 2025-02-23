import clsx from 'clsx';
import styles from './BannersPage.module.sass';
import { Tabs } from '@/shared/ui/Tabs';
import { useState } from 'react';
import { tabs } from '../model/tabs';
import { TabContent } from './TabContent';

export const BannersPage = () => {
  const [activeTab, setActiveTab] = useState<string>('main');
  

  return (
    <div className={clsx(styles.page, 'page')}>
      <div className="page-header">
        <h1 className="page_title">Баннеры</h1>
      </div>

      <div className={styles.content}>
        <Tabs
          value={activeTab}
          className={styles.tabs}
          tabs={tabs}
          onChange={(tab) => setActiveTab(tab.value)}
        />

        {tabs.map((tab) => {
          if (activeTab === tab.value) {
            return <TabContent />;
          }
        })}
      </div>
    </div>
  );
};
