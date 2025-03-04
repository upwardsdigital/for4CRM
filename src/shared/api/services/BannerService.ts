import { API } from '../instance';

export const BannerService = {
  getBanners: (params: object) => API.get(`/banner`, { params }),
  createBanner: (data: any) => API.post('/banner', data),
  updateBanner: (data: any) => API.patch(`banner/${data.id}`, data),
  getBanner: (id: number) => API.get(`/banner/${id}`),
};
