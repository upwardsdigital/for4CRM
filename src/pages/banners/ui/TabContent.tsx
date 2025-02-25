import { useEffect, useState } from 'react';
import styles from './BannersPage.module.sass';
import { TextField } from '@/shared/ui/TextField';
import { Button } from '@/shared/ui/Button';
import { BannerService, DepartmentService } from '@/shared/api/services';
import { toast } from 'react-toastify';
import { Select } from '@/shared/ui/Select/ui/Select';
import { FileService } from '@/shared/api/services/FileService';
import Cookie from 'js-cookie';

export const TabContent = () => {
  const [data, setData] = useState<any>({
    isRequested: false,
    values: {
      file: null,
      opacity: 0,
      is_active: true,
      type: 0,
    },
  });
  const [departmentsData, setDepartmentsData] = useState<any>({
    department: [],
    subDepartment: [],
    category: [],
    subCategory: [],
    innerCategory: [],
    brands: [],
  });

  useEffect(() => {
    BannerService.getBanner(3).then((resp) => {
      setData((prev) => ({
        ...prev,
        values: {
          ...resp.data,
          department: resp.data.department ? resp.data.department.id : null,
          department2: resp.data.department2 ? resp.data.department2.id : null,
        },
      }));
    });
    DepartmentService.getDepartments({ type: 0 }).then((resp) => {
      setDepartmentsData((prev) => ({ ...prev, department: resp.data.items }));
    });
    DepartmentService.getDepartments({ type: 2 }).then((resp) => {
      setDepartmentsData((prev) => ({ ...prev, category: resp.data.items }));
    });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setData((prev) => ({ ...prev, values: { ...prev.values, file: e.target.files[0] } }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, values: { ...prev.values, [e.target.name]: e.target.value } }));
  };

  const handleSelectChange = (option: any, name: string) => {
    setData((prev) => ({ ...prev, values: { ...prev.values, [name]: option.value } }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let bannerData = { ...data.values, opacity: +data.values.opacity };
    try {
      setData((prev) => ({ ...prev, isRequested: true }));
      if (bannerData.file) {
        const file = data.values.file;
        const fileSignResponse = await FileService.uploadImage({ originalName: file.name });
        if (fileSignResponse.data.url) {
          const formData = new FormData();
          formData.append('file', file);

          const accessToken = Cookie.get('accessToken');

          const response = await fetch(fileSignResponse.data.url, {
            method: 'PUT',
            body: formData,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (response.ok) {
            const jsonResponse = await response.json();
            console.log('Файл успешно загружен:', jsonResponse);
          } else {
            console.error('Ошибка загрузки файла:', response.statusText);
          }
        }
      }

      const response = await BannerService.updateBanner({ ...bannerData, id: 3 });
      toast('Успешно обновлено', { type: 'success' });
    } catch (error: any) {
      if (error.response.data.error) {
        toast(error.response.data.error, { type: 'error' });
      }
    } finally {
      setData((prev) => ({ ...prev, isRequested: false }));
    }
  };

  return (
    <div className={styles.tab_content}>
      <div className={styles.banner_wrap}>
        {data.values.file ? (
          <img
            src={data.values.file && URL.createObjectURL(data.values.file)}
            className={styles.banner}
          />
        ) : (
          <span>No banner image</span>
        )}
      </div>

      <form className={styles.fields} onSubmit={handleSubmit}>
        <TextField
          type="file"
          label="Изоображение"
          value={data.values.file}
          onChange={handleFileChange}
          className={styles.field}
          onDeleteFile={() =>
            setData((prev) => ({ ...prev, values: { ...prev.values, file: null } }))
          }
        />

        <TextField
          type="text"
          label="Заголовок (рус.)"
          value={data.values.main_title_ru}
          name="main_title_ru"
          onChange={handleChange}
          className={styles.field}
        />

        <TextField
          type="text"
          label="Заголовок (анг.)"
          value={data.values.main_title}
          name="main_title"
          onChange={handleChange}
          className={styles.field}
        />
        <Select
          value={data.values.department2}
          label="Отдел"
          name="department2"
          options={departmentsData.department.map((item) => ({
            ...item,
            label: item.name,
            value: item.id,
          }))}
          onChange={(option) => handleSelectChange(option, 'department2')}
        />
        <TextField
          type="text"
          label="Надпись кнопки (рус.)"
          value={data.values.title_ru}
          name="title_ru"
          onChange={handleChange}
          className={styles.field}
        />
        <TextField
          type="text"
          label="Надпись кнопки (анг.)"
          value={data.values.title}
          name="title"
          onChange={handleChange}
          className={styles.field}
        />
        <Select
          label="Подотдел"
          value={data.values.subDepartment}
          options={departmentsData.subDepartment.map((item) => ({
            ...item,
            label: item.name,
            value: item.id,
          }))}
          name="subDepartment"
          onChange={(option) => handleSelectChange(option, 'subDepartment')}
          className={styles.field}
        />

        <Select
          label="Категория"
          value={data.values.category}
          options={departmentsData.category.map((item) => ({
            ...item,
            label: item.name,
            value: item.id,
          }))}
          name="category"
          onChange={(option) => handleSelectChange(option, 'category')}
          className={styles.field}
        />

        <Select
          label="Подкатегория"
          value={data.values.subCategory}
          options={departmentsData.subCategory.map((item) => ({
            ...item,
            label: item.name,
            value: item.id,
          }))}
          name="subCategory"
          onChange={(option) => handleSelectChange(option, 'subCategory')}
          className={styles.field}
        />
        <Select
          label="Брэнд"
          value={data.values.brand}
          options={departmentsData.brands.map((item) => ({
            ...item,
            label: item.name,
            value: item.id,
          }))}
          name="brand"
          onChange={(option) => handleSelectChange(option, 'brand')}
          className={styles.field}
        />
        <TextField
          type="number"
          label="Непрозрачный шрифт"
          value={data.values.opacity}
          name="opacity"
          onChange={handleChange}
          className={styles.field}
          hideArrows
        />

        <div className={styles.controls}>
          <Button loading={data.isRequested}>Принять</Button>
        </div>
      </form>
    </div>
  );
};
