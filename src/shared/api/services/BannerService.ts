import { API } from '../instance';

export const BannerService = {
  createBanner: (data: any) => API.post('/banner', data),
  updateBanner: (data: any) => API.patch(`banner/${data.id}`, data),
  getBanner: (id: number) => API.get(`/banner/${id}`),
};
