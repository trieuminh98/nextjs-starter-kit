// Fetcher for React Query using ky instance

import { AxiosRequestConfig } from 'axios';
import { http } from './axiosIntance';

type CustomAxiosRequestConfig = AxiosRequestConfig & {
  skipAttachToken?: boolean;
};

export const fetcher = async <T = unknown>(
  endpoint: string,
  method: 'get' | 'post' | 'put' | 'delete' | 'patch' = 'get',
  options: CustomAxiosRequestConfig = {}
): Promise<T> => {
  const { signal, ...rest } = options;
  const controller = signal ? undefined : new AbortController();
  const finalSignal = signal || controller?.signal;
  const response = await measureAsync(endpoint, () => {
    return http.request<T>({
      url: endpoint,
      method,
      signal: finalSignal,
      ...rest,
    });
  });
  return response.data;
};

const measureAsync = async <T>(name: string, fn: () => Promise<T>): Promise<T> => {
  const t0 = performance.now();
  console.log(fn);
  try {
    return await fn();
  } finally {
    const t1 = performance.now();
    console.log(`⏱️ ${name}: ${(t1 - t0).toFixed(3)}ms`);
  }
};

export const racePromise = async <T>(
  promise: Promise<T>,
  timeoutMs: number = 1000
): Promise<T | undefined> => {
  return Promise.any([
    promise,
    new Promise<undefined>((resolve) => setTimeout(resolve, timeoutMs)),
  ]);
};
