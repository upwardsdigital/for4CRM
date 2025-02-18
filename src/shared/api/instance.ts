import axios from 'axios';
import Cookies from 'js-cookie';

export const API = axios.create({
  baseURL: 'https://dev.api.4you.com.kz',
});

API.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post('https://dev.api.4you.com.kz/auth-password/login', {
          email: 'admin',
          password: 'admin',
        });

        const { accessToken, refreshToken } = response.data;

        Cookies.set('accessToken', accessToken, { expires: 7 });
        Cookies.set('refreshToken', refreshToken, { expires: 7 });

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return API(originalRequest);
      } catch (err) {
        console.error('Login failed', err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
