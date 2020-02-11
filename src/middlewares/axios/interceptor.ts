import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { instance } from './axios';

// Add a request interceptor
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return config;
});

// Add a response interceptor
instance.interceptors.response.use(
  (config: AxiosResponse) => {
    return config;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // add the router you wanna push
    }
    return Promise.reject(error);
  }
);

export { instance };
