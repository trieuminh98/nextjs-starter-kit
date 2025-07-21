// Fetcher for React Query using ky instance
import { http, createAbortController } from "./kyInstance";

export type FetcherOptions = {
  signal?: AbortSignal;
  [key: string]: unknown;
};

export const fetcher = async <T = unknown>(
  endpoint: string,
  options: FetcherOptions = {}
): Promise<T> => {
  // Tạo AbortController nếu chưa có
  const controller = options.signal ? undefined : createAbortController();
  const signal = options.signal || controller?.signal;
  const response = await http(endpoint, { ...options, signal });
  return response.json<T>();
};
