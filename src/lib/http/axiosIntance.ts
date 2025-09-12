import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { isClient } from '@/utils/common';
import { getTokenClient } from '../cookies/token.client';
import camelcaseKeys from 'camelcase-keys';
import { KEYS } from '@/constants/key';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAttachToken?: boolean;
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const createAxiosInstance = (customConfig: AxiosRequestConfig = {}): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
    ...customConfig,
  });

  // Request interceptor: attach token
  instance.interceptors.request.use(async (config) => {
    if (config?.skipAttachToken) {
      return config; // opt-out từ consumer
    }
    let token = null;
    // Only support client-side token for personal data
    // Incase for unauthorized data, we will use fetch nextjs (follow hydrate-page)
    if (isClient()) {
      token = getTokenClient(KEYS.JWT_TOKEN);
    }
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  // Response interceptor: camelCase + error handling
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (
        response.headers['content-type'] &&
        response.headers['content-type'].includes('application/json')
      ) {
        response.data = camelcaseKeys(response.data, { deep: true });
      }
      return response;
    },
    (error) => {
      // Có thể handle auto refresh token ở đây nếu muốn
      // if (error.response?.status === 401) { ... }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const http = createAxiosInstance();

export const createAbortController = () => new AbortController();
