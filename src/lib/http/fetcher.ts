// Fetcher for React Query using ky instance

import { AxiosRequestConfig } from 'axios';
import { http } from './axiosIntance';

export const fetcher = async <T = unknown>(
  endpoint: string,
  method: 'get' | 'post' | 'put' | 'delete' | 'patch' = 'get',
  options: AxiosRequestConfig = {}
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
  performance.mark(`${name}-start`);
  try {
    return await fn();
  } finally {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    const [entry] = performance.getEntriesByName(name);
    console.log(`⏱️ ${name}: ${entry.duration.toFixed(3)}ms`);
    performance.clearMarks();
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
