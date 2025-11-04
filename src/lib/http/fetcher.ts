// Fetcher for React Query using ky instance

import { AxiosRequestConfig } from 'axios';
import { z } from 'zod';
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

// Wrapper function with Zod validation
export const fetcherWithValidation = async <T, Z>(
  endpoint: string,
  schema: z.ZodType<Z>,
  method: 'get' | 'post' | 'put' | 'delete' | 'patch' = 'get',
  options: CustomAxiosRequestConfig = {}
): Promise<Z> => {
  try {
    const data = await fetcher<T>(endpoint, method, options);
    return schema.parse(data);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.issues);
      throw new Error('Invalid data format');
    }
    throw error;
  }
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
