import { API } from '../instance';

export const CombinationService = {
  getCombinations: async (params?: object) => API.get('/combinations', { params }),
  getCombinationById: async (id: number) => API.get(`/combinations/${id}`),
};
