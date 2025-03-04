import { useEffect, useState } from 'react';
import styles from './BannersPage.module.sass';
import { TextField } from '@/shared/ui/TextField';
import { Button } from '@/shared/ui/Button';
import { BannerService } from '@/shared/api/services';
import { toast } from 'react-toastify';
import { Select } from '@/shared/ui/Select/ui/Select';
import { FileService } from '@/shared/api/services/FileService';
import { useQuery } from '@tanstack/react-query';
import { BrandService } from '@/shared/api/services/BrandService';
import { Checkbox } from '@/shared/ui/Checkbox';
import { initialBannerData } from '../model/initialBannerData';

interface TabContentProps {
  departmentId: number;
}

export const TabContent: React.FC<TabContentProps> = ({ departmentId }) => {
  // const [data, setData] = useState<any>({
  //   isRequested: false,
  //   isEdit: false,
  //   values: {
  //     file: null,
  //     opacity: 0,
  //     is_active: true,
  //     type: 0,
  //   },
  // });
  const [mainBanner, setMainBanner] = useState<any>(null);
  const [additionalBanners, setAdditionalBanners] = useState<any[]>([]);

  const [departmentsData, setDepartmentsData] = useState<any>({
    department: [],
    subDepartment: [],
    category: [],
    subCategory: [],
    innerCategory: [],
    brands: [],
  });

  const { data: brands } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const data = await BrandService.getBrands();
      return data.data.items.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    },
  });

  useEffect(() => {
    if (departmentId > 0) {
      BannerService.getBanners({ departmentId2: departmentId, type: 1 }).then((resp) => {
        const mainBanner = resp.data.items[0];
        if (mainBanner) {
          setMainBanner({
            ...mainBanner,
            values: {
              ...mainBanner,
              brand: mainBanner.brand?.id || null,
              department: mainBanner.department ? mainBanner.department.id : null,
              department2: mainBanner.department2 ? mainBanner.department2.id : null,
            },
          });

          if (mainBanner.type === 1) {
            BannerService.getBanners({
              departmentId2: departmentId,
              type: 2,
            }).then((resp) => {
              setAdditionalBanners(
                resp.data.items.map((banner) => ({
                  ...initialBannerData,
                  values: {
                    ...banner,
                    brand: banner.brand?.id || null,
                    department: banner.department ? banner.department.id : null,
                    department2: banner.department2 ? banner.department2.id : null,
                  },
                }))
              );
            });
          }
        }
      });
    } else {
      BannerService.getBanners({ type: 0 }).then((resp) => {
        const mainBanner = resp.data.items[0];
        if (mainBanner) {
          setMainBanner((prev) => ({
            ...prev,
            values: {
              ...mainBanner,
              brand: mainBanner.brand?.id || null,
              department: mainBanner.department ? mainBanner.department.id : null,
              department2: mainBanner.department2 ? mainBanner.department2.id : null,
            },
          }));
        }
      });
    }
    // DepartmentService.getDepartments({ type: 0 }).then((resp) => {
    //   setDepartmentsData((prev) => ({ ...prev, department: resp.data.items }));
    // });
    // DepartmentService.getDepartments({ type: 2 }).then((resp) => {
    //   setDepartmentsData((prev) => ({ ...prev, category: resp.data.items }));
    // });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    if (e.target.files && e.target.files[0]) {
      if (typeof index === 'number') {
        setAdditionalBanners((prev) =>
          prev.map((item, i) =>
            //@ts-ignore
            i === index ? { ...item, values: { ...item.values, file: e.target.files[0] } } : item
          )
        );
      } else {
        //@ts-ignore
        setMainBanner((prev) => ({ ...prev, values: { ...prev.values, file: e.target.files[0] } }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    if (typeof index === 'number') {
      setAdditionalBanners((prev) =>
        prev.map((item, i) =>
          i === index
            ? { ...item, values: { ...item.values, [e.target.name]: e.target.value } }
            : item
        )
      );
    } else {
      setMainBanner((prev) => ({
        ...prev,
        values: { ...prev.values, [e.target.name]: e.target.value },
      }));
    }
  };

  const handleSelectChange = (option: any, name: string, index?: number) => {
    if (typeof index === 'number') {
      setAdditionalBanners((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, values: { ...item.values, [name]: option.value } } : item
        )
      );
    } else {
      setMainBanner((prev) => ({
        ...prev,
        values: { ...prev.values, [name]: option.value },
      }));
    }
    // setData((prev) => ({ ...prev, values: { ...prev.values, [name]: option.value } }));
  };

  const handleEditClick = (index?: number) => {
    if (typeof index === 'number') {
      setAdditionalBanners((prev) =>
        prev.map((item, i) => (i === index ? { ...item, isEdit: !item.isEdit } : item))
      );
    } else {
      setMainBanner((prev) => ({
        ...prev,
        isEdit: !prev.isEdit,
      }));
    }
  };

  const handleIsRequested = (index?: number, value?: boolean) => {
    if (index) {
      setAdditionalBanners((prev) => [...prev, { ...prev[index], isRequested: value }]);
    } else {
      setMainBanner((prev) => ({ ...prev, isRequested: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, index?: number) => {
    e.preventDefault();
    let bannerData =
      typeof index === 'number'
        ? { ...additionalBanners[index].values, opacity: +additionalBanners[index].values.opacity }
        : { ...mainBanner.values, opacity: +mainBanner.values.opacity };

    try {
      handleIsRequested(index, true);

      if (bannerData.file) {
        const file = bannerData.file;
        const fileSignResponse = await FileService.uploadImage({ originalName: file.name });

        if (fileSignResponse.data.url) {
          const response = await fetch(fileSignResponse.data.url, {
            method: 'PUT',
            body: file,
          });

          if (!response.ok) {
            throw new Error(`Ошибка загрузки файла: ${response.statusText}`);
          }

          console.log('Файл успешно загружен');
        }
      }
      if (bannerData.file) {
        const file = bannerData.file;
        const fileSignResponse = await FileService.uploadImage({ originalName: file.name });

        if (fileSignResponse.data.url) {
          const response = await fetch(fileSignResponse.data.url, {
            method: 'PUT',
            body: file,
          });

          if (!response.ok) {
            throw new Error(`Ошибка загрузки файла: ${response.statusText}`);
          }

          console.log('Файл успешно загружен');
        }
      }

      const { file, ...bannerWithoutFile } = bannerData;

      await BannerService.updateBanner({ ...bannerWithoutFile, id: bannerData.id });

      toast('Успешно обновлено', { type: 'success' });
    } catch (error: any) {
      console.error('Ошибка:', error);
      toast(error.response?.data?.error || 'Ошибка обновления', { type: 'error' });
    } finally {
      handleIsRequested(index, false);
    }
  };

  const handleAddBanner = (isMain?: boolean) => {
    if (isMain) {
      BannerService.createBanner({
        ...initialBannerData.values,
        type: 1,
        department2: departmentId,
      })
        .then((resp) => {
          setMainBanner({ ...initialBannerData, values: resp.data });
        })
        .catch(() => {
          toast('Не удалось создать основной баннер', { type: 'error' });
        });
    } else {
      BannerService.createBanner({
        ...initialBannerData.values,
        type: 2,
        department2: departmentId,
      })
        .then((resp) => {
          setAdditionalBanners([...additionalBanners, { ...initialBannerData, values: resp.data }]);
        })
        .catch(() => {
          toast('Не удалось создать доп. баннер', { type: 'error' });
        });
    }
  };

  useEffect(() => {
    if (brands) {
      setDepartmentsData((prev) => ({ ...prev, brands: brands }));
    }
  }, [brands]);
  return (
    <div className={styles.tab_content_wrap}>
      {mainBanner ? (
        <div className={styles.tab_content}>
          <div className={styles.banner_wrap}>
            <img
              src={
                mainBanner.values.file
                  ? URL.createObjectURL(mainBanner?.values.file)
                  : '/img/no_image.png'
              }
              className={styles.banner}
            />
          </div>

          <form className={styles.fields} onSubmit={handleSubmit}>
            <TextField
              type="file"
              label="Изоображение"
              value={mainBanner.values.file}
              onChange={(e) => handleFileChange(e)}
              className={styles.field}
              readOnly={!mainBanner.isEdit}
              onDeleteFile={() =>
                setMainBanner((prev) => ({ ...prev, values: { ...prev.values, file: null } }))
              }
            />

            <TextField
              type="text"
              label="Заголовок (рус.)"
              value={mainBanner.values.main_title_ru}
              name="main_title_ru"
              onChange={handleChange}
              readOnly={!mainBanner.isEdit}
              className={styles.field}
            />

            <TextField
              type="text"
              label="Заголовок (анг.)"
              value={mainBanner.values.main_title}
              name="main_title"
              onChange={handleChange}
              readOnly={!mainBanner.isEdit}
              className={styles.field}
            />
            <Select
              value={mainBanner.values.department2}
              label="Отдел"
              name="department2"
              options={departmentsData.department.map((item) => ({
                ...item,
                label: item.name,
                value: item.id,
              }))}
              onChange={(option) => handleSelectChange(option, 'department2')}
              readOnly={(departmentId === 0 && !mainBanner.isEdit) || departmentId > 0}
            />
            <TextField
              type="text"
              label="Надпись кнопки (рус.)"
              value={mainBanner.values.title_ru}
              name="title_ru"
              onChange={handleChange}
              readOnly={!mainBanner.isEdit}
              className={styles.field}
            />
            <TextField
              type="text"
              label="Надпись кнопки (анг.)"
              value={mainBanner.values.title}
              name="title"
              onChange={handleChange}
              readOnly={!mainBanner.isEdit}
              className={styles.field}
            />
            {mainBanner.values.type === 0 && (
              <Select
                label="Подотдел"
                value={mainBanner.values.subDepartment}
                options={departmentsData.subDepartment.map((item) => ({
                  ...item,
                  label: item.name,
                  value: item.id,
                }))}
                name="subDepartment"
                onChange={(option) => handleSelectChange(option, 'subDepartment')}
                readOnly={!mainBanner.isEdit}
                className={styles.field}
              />
            )}

            <Select
              label="Категория"
              value={mainBanner.values.category}
              options={departmentsData.category.map((item) => ({
                ...item,
                label: item.name,
                value: item.id,
              }))}
              name="category"
              onChange={(option) => handleSelectChange(option, 'category')}
              readOnly={!mainBanner.isEdit}
              className={styles.field}
            />

            {mainBanner.values.type === 0 && (
              <>
                <Select
                  label="Подкатегория"
                  value={mainBanner.values.subCategory}
                  options={departmentsData.subCategory.map((item) => ({
                    ...item,
                    label: item.name,
                    value: item.id,
                  }))}
                  name="subCategory"
                  onChange={(option) => handleSelectChange(option, 'subCategory')}
                  readOnly={!mainBanner.isEdit}
                  className={styles.field}
                />
                <Select
                  label="Брэнд"
                  value={mainBanner.values.brand}
                  options={departmentsData.brands.map((item) => ({
                    ...item,
                    label: item.name,
                    value: item.id,
                  }))}
                  name="brand"
                  onChange={(option) => handleSelectChange(option, 'brand')}
                  readOnly={!mainBanner.isEdit}
                  className={styles.field}
                />
                <TextField
                  type="number"
                  label="(Логотим) Прозрачность шрифта"
                  value={mainBanner.values.opacity}
                  name="opacity"
                  onChange={handleChange}
                  readOnly={!mainBanner.isEdit}
                  className={styles.field}
                  hideArrows
                />
              </>
            )}

            <TextField
              type="number"
              label="Прозрачность шрифта"
              value={mainBanner.values.opacity}
              name="opacity"
              onChange={handleChange}
              readOnly={!mainBanner.isEdit}
              className={styles.field}
              hideArrows
            />
            {mainBanner.values.type === 0 && <div style={{ gridColumn: 'span 2' }}></div>}

            <div className={styles.controls}>
              <Checkbox
                value={mainBanner.values.isFullWidth}
                name="isFullWidth"
                label="На всю ширину экрана"
                onChange={(e) => {
                  setMainBanner((prev) => ({
                    ...prev,
                    values: { ...prev.values, [e.target.name]: e.target.checked },
                  }));
                }}
                readOnly={!mainBanner.isEdit}
              />
              {mainBanner.isEdit ? (
                <div className={styles.banner_controls}>
                  <Button onClick={handleEditClick} type="button">
                    {mainBanner.isEdit ? 'Отменить' : 'Изменить'}
                  </Button>
                  <Button loading={mainBanner.isRequested} color="white">
                    Принять
                  </Button>
                </div>
              ) : (
                <div className={styles.banner_controls}>
                  <Button onClick={handleEditClick} type="button">
                    {mainBanner.isEdit ? 'Отменить' : 'Изменить'}
                  </Button>
                </div>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.banner_add_btn_wrap}>
          <button className={styles.banner_add_btn} onClick={() => handleAddBanner(true)}>
            Добавить основной баннер +/-
          </button>
        </div>
      )}

      {departmentId !== 0 && (
        <div className={styles.banner_add_btn_wrap}>
          <button className={styles.banner_add_btn} onClick={() => handleAddBanner(false)}>
            Добавить дополнительный баннер +/-
          </button>
        </div>
      )}
      {additionalBanners.map((__, index) => (
        <div className={styles.tab_content}>
          <div className={styles.banner_wrap}>
            <img
              src={
                additionalBanners[index].values.file
                  ? URL.createObjectURL(additionalBanners[index].values.file)
                  : '/img/no_image.png'
              }
              className={styles.banner}
            />
          </div>

          <form className={styles.fields} onSubmit={(e) => handleSubmit(e, index)}>
            <TextField
              type="file"
              label="Изоображение"
              value={additionalBanners[index].values.file}
              onChange={(e) => handleFileChange(e, index)}
              readOnly={!additionalBanners[index].isEdit}
              className={styles.field}
              onDeleteFile={() =>
                setAdditionalBanners((prev) =>
                  prev.map((item, i) =>
                    i === index ? { ...item, values: { ...item.values, file: null } } : item
                  )
                )
              }
            />

            <TextField
              type="text"
              label="Заголовок (рус.)"
              value={additionalBanners[index].values.main_title_ru}
              name="main_title_ru"
              onChange={(e) => handleChange(e, index)}
              readOnly={!additionalBanners[index].isEdit}
              className={styles.field}
            />

            <TextField
              type="text"
              label="Заголовок (анг.)"
              value={additionalBanners[index].values.main_title}
              name="main_title"
              onChange={(e) => handleChange(e, index)}
              readOnly={!additionalBanners[index].isEdit}
              className={styles.field}
            />
            <Select
              value={additionalBanners[index].values.department2}
              label="Отдел"
              name="department2"
              options={departmentsData.department.map((item) => ({
                ...item,
                label: item.name,
                value: item.id,
              }))}
              onChange={(option) => handleSelectChange(option, 'department2')}
              readOnly={!additionalBanners[index].isEdit}
            />
            <TextField
              type="text"
              label="Надпись кнопки (рус.)"
              value={additionalBanners[index].values.title_ru}
              name="title_ru"
              onChange={(e) => handleChange(e, index)}
              readOnly={!additionalBanners[index].isEdit}
              className={styles.field}
            />
            <TextField
              type="text"
              label="Надпись кнопки (анг.)"
              value={additionalBanners[index].values.title}
              name="title"
              onChange={(e) => handleChange(e, index)}
              readOnly={!additionalBanners[index].isEdit}
              className={styles.field}
            />
            {additionalBanners[index].values.type === 0 && (
              <Select
                label="Подотдел"
                value={additionalBanners[index].values.subDepartment}
                options={departmentsData.subDepartment.map((item) => ({
                  ...item,
                  label: item.name,
                  value: item.id,
                }))}
                name="subDepartment"
                onChange={(option) => handleSelectChange(option, 'subDepartment')}
                readOnly={!additionalBanners[index].isEdit}
                className={styles.field}
              />
            )}

            <Select
              label="Категория"
              value={additionalBanners[index].values.category}
              options={departmentsData.category.map((item) => ({
                ...item,
                label: item.name,
                value: item.id,
              }))}
              name="category"
              onChange={(option) => handleSelectChange(option, 'category', index)}
              readOnly={!additionalBanners[index].isEdit}
              className={styles.field}
            />

            {additionalBanners[index].values.type === 0 && (
              <>
                <Select
                  label="Подкатегория"
                  value={additionalBanners[index].values.subCategory}
                  options={departmentsData.subCategory.map((item) => ({
                    ...item,
                    label: item.name,
                    value: item.id,
                  }))}
                  name="subCategory"
                  onChange={(option) => handleSelectChange(option, 'subCategory', index)}
                  readOnly={!additionalBanners[index].isEdit}
                  className={styles.field}
                />
                <Select
                  label="Брэнд"
                  value={additionalBanners[index].values.brand}
                  options={departmentsData.brands.map((item) => ({
                    ...item,
                    label: item.name,
                    value: item.id,
                  }))}
                  name="brand"
                  onChange={(option) => handleSelectChange(option, 'brand', index)}
                  readOnly={!additionalBanners[index].isEdit}
                  className={styles.field}
                />
                <TextField
                  type="number"
                  label="(Логотим) Прозрачность шрифта"
                  value={additionalBanners[index].values.opacity}
                  name="opacity"
                  onChange={(e) => handleChange(e, index)}
                  readOnly={!additionalBanners[index].isEdit}
                  className={styles.field}
                  hideArrows
                />
              </>
            )}

            <TextField
              type="number"
              label="Прозрачность шрифта"
              value={additionalBanners[index].values.opacity}
              name="opacity"
              onChange={(e) => handleChange(e, index)}
              readOnly={!additionalBanners[index].isEdit}
              className={styles.field}
              hideArrows
            />
            {additionalBanners[index].values.type === 0 && (
              <div style={{ gridColumn: 'span 2' }}></div>
            )}

            <div className={styles.controls}>
              <Checkbox
                value={additionalBanners[index].values.isFullWidth}
                name="isFullWidth"
                label="По всей ширине"
                onChange={(e) => {
                  setAdditionalBanners((prev) =>
                    prev.map((item, i) =>
                      i === index
                        ? { ...item, values: { ...item.values, [e.target.name]: e.target.checked } }
                        : item
                    )
                  );
                }}
                readOnly={!additionalBanners[index].isEdit}
              />
              <Checkbox
                value={additionalBanners[index].values.isHorizontal}
                name="isHorizontal"
                label="По горизонтали"
                onChange={(e) => {
                  setAdditionalBanners((prev) =>
                    prev.map((item, i) =>
                      i === index
                        ? { ...item, values: { ...item.values, [e.target.name]: e.target.checked } }
                        : item
                    )
                  );
                }}
                readOnly={!additionalBanners[index].isEdit}
              />
              {additionalBanners[index].isEdit ? (
                <div className={styles.banner_controls}>
                  <Button onClick={() => handleEditClick(index)} type="button">
                    {additionalBanners[index].isEdit ? 'Отменить' : 'Изменить'}
                  </Button>
                  <Button loading={additionalBanners[index].isRequested} color="white">
                    Принять
                  </Button>
                </div>
              ) : (
                <div className={styles.banner_controls}>
                  <Button onClick={() => handleEditClick(index)} type="button">
                    {additionalBanners[index].isEdit ? 'Отменить' : 'Изменить'}
                  </Button>
                </div>
              )}
            </div>
          </form>
        </div>
      ))}
    </div>
  );
};
