import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { isClient } from '@/utils/runtime';
import { getTokenClient } from '../cookies/token.client';
import { KEYS } from '@/constants/key';

export const createAxiosInstance = (customConfig: AxiosRequestConfig = {}): AxiosInstance => {
  const instance = axios.create({
    withCredentials: false,
    ...customConfig,
  });

  // Request interceptor: attach token
  instance.interceptors.request.use(async (config) => {
    let token = null;
    // Token is client-only by design in this app.
    if (isClient()) {
      token = getTokenClient(KEYS.JWT_TOKEN);
    }
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  // Response interceptor: error handling
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Có thể handle auto refresh token ở đây nếu muốn
      // if (error.response?.status === 401) { ... }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const http = createAxiosInstance();
