import clsx from 'clsx';
import styles from './BannersPage.module.sass';
import { Tabs } from '@/shared/ui/Tabs';
import { useEffect, useState } from 'react';
import { TabContent } from './TabContent';
import { DepartmentService } from '@/shared/api/services';

export const BannersPage = () => {
  const [activeTab, setActiveTab] = useState<any>(3);
  const [departments, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    DepartmentService.getDepartments({ type: 0 }).then((resp) => {
      setDepartments(resp.data.items.sort((a, b) => a.id - b.id));
    });
  }, []);

  return (
    <div className={clsx(styles.page, 'page')}>
      <div className="page-header">
        <h1 className="page_title">Баннеры</h1>
      </div>

      <div className={styles.content}>
        <Tabs
          value={activeTab}
          className={styles.tabs}
          tabs={[
            { label: 'Главный', value: 0 },
            ...departments.map((department) => ({
              label: department.name,
              value: department.id,
            })),
          ]}
          onChange={(tab) => setActiveTab(tab.value)}
        />

        {[
          { label: 'Главный', value: 0 },
          ...departments.map((department) => ({
            label: department.name,
            value: department.id,
          })),
        ].map((tab) => {
          if (activeTab === tab.value) {
            return <TabContent key={tab.value} departmentId={tab.value} />;
          }
        })}
      </div>
    </div>
  );
};
