import { API } from '../instance';

export const CountryService = {
  getCountries: (params?: object) => API.get('/countries', { params }),
  getCountryById: (id?: number) => API.post(`/countries/${id}`),
  createCountry: (data?: any) => API.post('/countries', data),
  updateCountry: (data?: any) => API.patch(`/countries/${data.id}`, data),
};
