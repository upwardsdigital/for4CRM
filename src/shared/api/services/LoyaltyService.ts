import { API } from '../instance';

export const LoyaltyService = {
  getLoyalty: (params?: object) => API.get('/users/loyalty', { params }),
};
