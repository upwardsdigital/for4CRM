import { useEffect } from 'react';
import { loadDepartments } from '../api/departmentService';
import { Select } from '@/shared/ui/Select/ui/Select';
import { useQuery } from '@tanstack/react-query';

const departmentKeys = [
  'department',
  'subDepartment',
  'category',
  'subCategory',
  'innerCategory',
  'productType',
];

export const DepartmentSelector = ({ isOpen, initialValues, setValues }) => {
  // const [departmentsData, setDepartmentsData] = useState<any>({});
  const { isPending, data: departmentsData } = useQuery({
    queryKey: ['departments-dictionary'],
    queryFn: async () => {
      const data = await loadDepartments();
      return data;
    },
  });

  useEffect(() => {
    if (departmentsData) {
      loadChildren(null, 'department');
      // const currentLevelData = departmentsData.department || [];
      // return setValues((prev) => ({
      //   ...prev,
      //   fields: {
      //     ...prev.fields,
      //     department: {
      //       ...prev.fields.department,
      //       options: currentLevelData,
      //     },
      //   },
      // }));
    }
  }, [isOpen, departmentsData]);

  const loadChildren = (parentValue: string | null, type: string) => {
    let currentKey = type;
    let currentLevelData = departmentsData[currentKey] || [];

    setValues((prev) => {
      let newValues = { ...prev };
      const index = departmentKeys.findIndex((key) => key === type);
      for (let i = index; i < departmentKeys.length; i++) {
        currentKey = departmentKeys[i];

        if (departmentsData[currentKey].length > 0 && initialValues.fields[currentKey]) {
          currentLevelData =
            currentKey === 'department'
              ? departmentsData[currentKey]
              : departmentsData[currentKey].filter((item) => item.parent_id === parentValue);

          newValues = {
            ...newValues,
            fields: {
              ...newValues.fields,
              [currentKey]: {
                ...newValues.fields[currentKey],
                options: currentLevelData,
              },
            },
          };

          console.log(newValues);
          const departmentNumbers = departmentKeys.map((__, index) => index);
          for (
            let index = departmentKeys.findIndex((key) => key === currentKey);
            index < departmentNumbers.length;
            index++
          ) {
            if (initialValues.fields[departmentKeys[index]] && initialValues.isEdited) {
              newValues.values = { ...newValues.values, [departmentKeys[index]]: null };
            }
          }
          // return newValues;
        }
      }

      const currentKeyIndex = departmentKeys.findIndex((key) => key === currentKey);
      for (let i = currentKeyIndex; i < departmentKeys.length; i++) {
        currentKey = departmentKeys[currentKeyIndex];
        if (initialValues.fields[currentKey]) {
          newValues = {
            ...newValues,
            fields: {
              ...newValues.fields,
              [currentKey]: {
                ...newValues.fields[currentKey],
                options: [],
              },
            },
          };
        }
      }
      return newValues;
    });
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
      {isPending ? (
        <div style={{ gridColumn: 'span 2' }}>Загрузка отделов...</div>
      ) : (
        renderSelects()
      )}
    </>
  );
};
