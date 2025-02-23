import { useEffect, useState } from 'react';
import { loadDepartments } from '../api/departmentService';
import { Select } from '@/shared/ui/Select/ui/Select';

const departmentKeys = [
  'department',
  'subDepartment',
  'category',
  'subCategory',
  'innerCategory',
  'productType',
];

export const DepartmentSelector = ({ isOpen, initialValues, setValues }) => {
  const [departmentsData, setDepartmentsData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      const data = await loadDepartments();
      setDepartmentsData(data);
      setLoading(false);

      loadChildren(null, 'department');
    };
    fetchDepartments();
  }, [isOpen]);

  const loadChildren = (parentValue: string | null, type: string) => {
    let currentKey = type;
    let currentLevelData = departmentsData[currentKey] || [];

    if (type === 'deparment') {
      setValues((prev) => ({
        ...prev,
        fields: {
          ...prev.fields,
          [currentKey]: {
            ...prev.fields[currentKey],
            options: currentLevelData,
          },
        },
      }));
    }

    if (parentValue !== undefined) {
      for (const department in departmentsData[type]) {
        if (departmentsData[type].length > 0 && initialValues.fields[type]) {
          currentLevelData = departmentsData[type].filter((item) => item.parent_id === parentValue);

          setValues((prev) => {
            const newValues = {
              ...prev,
              fields: {
                ...prev.fields,
                [currentKey]: {
                  ...prev.fields[currentKey],
                  options: currentLevelData,
                },
              },
            };

            const departmentNumbers = departmentKeys.map((item, index) => index);

            for (
              let index = departmentKeys.findIndex((key) => key === currentKey);
              index < departmentNumbers.length;
              index++
            ) {
              if (initialValues.fields[departmentKeys[index]] && initialValues.isEdited) {
                newValues.values = { ...newValues.values, [departmentKeys[index]]: null };
              }
            }
            return newValues;
          });
          break;
        }
      }
    }
  };

  const handleChange = (option, type) => {
    const selectedValue = option.value;

    setValues((prev) => ({
      ...prev,
      isEdited: true,
      values: {
        ...prev.values,
        [departmentKeys[type]]: selectedValue,
        parent: selectedValue,
      },
    }));

    loadChildren(selectedValue, departmentKeys[type + 1]);
  };

  const renderSelects = () => {
    const selects: any = [];

    for (let type = 0; type < departmentKeys.length; type++) {
      const currentKey = departmentKeys[type];

      if (initialValues.fields[currentKey]?.options) {
        const isDisabled =
          initialValues.fields[currentKey].options.length === 0 ||
          !initialValues.fields[currentKey].options;
        selects.push(
          <Select
            key={currentKey}
            value={initialValues.values[currentKey] || ''}
            placeholder={isDisabled ? 'Нет данных' : ''}
            label={initialValues.fields[currentKey]?.label}
            disabled={isDisabled}
            onChange={(option) => handleChange(option, type)}
            options={initialValues.fields[currentKey]?.options || []}
          />
        );
      }
    }

    return selects;
  };

  return (
    <>
      {loading ? <div style={{ gridColumn: 'span 2' }}>Загрузка отделов...</div> : renderSelects()}
    </>
  );
};
