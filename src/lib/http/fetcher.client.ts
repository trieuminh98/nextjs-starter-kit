// Fetcher for React Query using ky instance
import { http, createAbortController } from "./kyInstance";

export type FetcherOptions = {
  signal?: AbortSignal;
  [key: string]: unknown;
};

export const fetcher = async <T = unknown>(
  endpoint: string,
  method: "get" | "post" | "put" | "delete" | "patch" = "get",
  options: FetcherOptions = {}
): Promise<T> => {
  const controller = options.signal ? undefined : createAbortController();
  const signal = options.signal || controller?.signal;
  const response = await http[method](endpoint, { ...options, signal });
  return response.json<T>();
};
