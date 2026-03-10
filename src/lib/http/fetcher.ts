import axios, { AxiosRequestConfig } from 'axios';
import { isServer } from '@/utils/runtime';
import { toCamelCaseDeep, toSnakeCaseDeep } from './case-transform';
import { createFetcherError, FetcherError, normalizeUnknownToFetcherError } from './fetcher-error';
import { http } from './axiosIntance';

export { FetcherError } from './fetcher-error';

type AuthMode = 'none' | 'bearer';
type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

type NextFetchOptions = {
  revalidate?: number | false;
  tags?: string[];
};

type FetcherInternalOptions = {
  auth?: AuthMode;
  method?: HttpMethod;
  baseURL?: string;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  data?: unknown;
  body?: BodyInit | null;
  signal?: AbortSignal;
  timeoutMs?: number;
  next?: NextFetchOptions;
  credentials?: RequestCredentials;
};

// Export only curated options for consumers to keep a stable surface.
export type FetcherCustomOptions = Pick<
  FetcherInternalOptions,
  'baseURL' | 'params' | 'headers' | 'signal' | 'timeoutMs' | 'next' | 'credentials'
>;

export type FetcherRequestOptions = Pick<
  FetcherInternalOptions,
  'auth' | 'method' | 'data' | 'body'
> &
  FetcherCustomOptions;

export type FetcherResult<T> = {
  code: number;
  data: T | null;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const resolveRequestUrl = (endpoint: string, baseURL?: string): string => {
  if (/^https?:\/\//i.test(endpoint)) {
    return endpoint;
  }

  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const effectiveBaseURL = baseURL ?? BASE_URL;
  if (!effectiveBaseURL) {
    return normalizedEndpoint;
  }

  return `${effectiveBaseURL.replace(/\/+$/, '')}${normalizedEndpoint}`;
};

const appendQueryParam = (searchParams: URLSearchParams, key: string, value: unknown): void => {
  if (value === undefined || value === null) {
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      appendQueryParam(searchParams, `${key}[]`, item);
    }
    return;
  }

  if (typeof value === 'object') {
    for (const [nestedKey, nestedValue] of Object.entries(value)) {
      appendQueryParam(searchParams, `${key}[${nestedKey}]`, nestedValue);
    }
    return;
  }

  searchParams.append(key, String(value));
};

const withQueryParams = (url: string, params?: Record<string, unknown>): string => {
  if (!params) {
    return url;
  }

  const [path, query = ''] = url.split('?');
  const searchParams = new URLSearchParams(query);
  for (const [key, value] of Object.entries(params)) {
    appendQueryParam(searchParams, key, value);
  }

  const queryString = searchParams.toString();
  if (!queryString) {
    return path;
  }

  return `${path}?${queryString}`;
};

const createRequestSignal = (
  externalSignal?: AbortSignal,
  timeoutMs?: number
): { signal?: AbortSignal; cleanup: () => void } => {
  if (!timeoutMs) {
    return { signal: externalSignal, cleanup: () => undefined };
  }

  const timeoutController = new AbortController();
  const timeoutId = setTimeout(() => {
    timeoutController.abort(new Error(`Request timeout after ${timeoutMs}ms`));
  }, timeoutMs);

  if (!externalSignal) {
    return {
      signal: timeoutController.signal,
      cleanup: () => clearTimeout(timeoutId),
    };
  }

  if (typeof AbortSignal.any === 'function') {
    return {
      signal: AbortSignal.any([externalSignal, timeoutController.signal]),
      cleanup: () => clearTimeout(timeoutId),
    };
  }

  const onExternalAbort = () => timeoutController.abort();
  if (externalSignal.aborted) {
    onExternalAbort();
  } else {
    externalSignal.addEventListener('abort', onExternalAbort, { once: true });
  }

  return {
    signal: timeoutController.signal,
    cleanup: () => {
      clearTimeout(timeoutId);
      externalSignal.removeEventListener('abort', onExternalAbort);
    },
  };
};

const normalizePayload = <T>(code: number, payload: unknown): FetcherResult<T> => ({
  code,
  data: code === 204 || code === 205 ? null : (toCamelCaseDeep(payload) as T | null),
});

const parseFetchPayload = async (response: Response): Promise<unknown> => {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const fetchWithNative = async <T>(
  url: string,
  options: FetcherRequestOptions
): Promise<FetcherResult<T>> => {
  const method = options.method ?? 'get';
  if (options.next && method !== 'get') {
    throw createFetcherError({
      code: 'REQUEST_CONFIG_ERROR',
      fallbackMessage: '`next` options are only supported for GET requests',
    });
  }
  if (
    (method === 'get' || method === 'delete') &&
    (options.body !== undefined || options.data !== undefined)
  ) {
    throw createFetcherError({
      code: 'REQUEST_CONFIG_ERROR',
      fallbackMessage: 'GET/DELETE requests must not include a request body',
    });
  }

  const snakeParams = options.params ? toSnakeCaseDeep(options.params) : undefined;
  const { signal, cleanup } = createRequestSignal(options.signal, options.timeoutMs);
  const headers = new Headers(options.headers);
  const snakeData =
    options.body === undefined && options.data !== undefined && options.data !== null
      ? toSnakeCaseDeep(options.data)
      : options.data;
  const hasData = options.data !== undefined && options.data !== null;
  if (hasData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  const body = options.body ?? (hasData ? JSON.stringify(snakeData) : undefined);
  const requestUrl = withQueryParams(url, snakeParams);

  try {
    const response = await fetch(requestUrl, {
      method: method.toUpperCase(),
      headers,
      body,
      signal,
      next: options.next,
      credentials: options.credentials,
    });

    const payload = await parseFetchPayload(response);
    if (!response.ok) {
      throw createFetcherError({
        code: 'HTTP_ERROR',
        status: response.status,
        payload,
        fallbackMessage: `Request failed with status ${response.status}`,
      });
    }

    return normalizePayload<T>(response.status, payload);
  } catch (error) {
    if (error instanceof FetcherError) {
      throw error;
    }

    throw normalizeUnknownToFetcherError(error, 'Network request failed');
  } finally {
    cleanup();
  }
};

const fetchWithAxios = async <T>(
  url: string,
  options: FetcherRequestOptions
): Promise<FetcherResult<T>> => {
  const method = options.method ?? 'get';
  if (
    (method === 'get' || method === 'delete') &&
    (options.body !== undefined || options.data !== undefined)
  ) {
    throw createFetcherError({
      code: 'REQUEST_CONFIG_ERROR',
      fallbackMessage: 'GET/DELETE requests must not include a request body',
    });
  }
  const snakeParams = options.params ? toSnakeCaseDeep(options.params) : undefined;
  const snakeData =
    options.body === undefined && options.data !== undefined && options.data !== null
      ? toSnakeCaseDeep(options.data)
      : options.data;
  const { signal, cleanup } = createRequestSignal(options.signal, options.timeoutMs);

  const config: AxiosRequestConfig = {
    url,
    method,
    params: snakeParams,
    headers: options.headers,
    signal,
    data: options.body ?? snakeData,
    withCredentials: options.credentials === 'include',
  };

  try {
    const response = await http.request(config);
    return normalizePayload<T>(response.status, response.data);
  } catch (error) {
    if (error instanceof FetcherError) {
      throw error;
    }

    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      throw createFetcherError({
        code: 'HTTP_ERROR',
        status,
        payload: data,
        fallbackMessage: `Request failed with status ${status}`,
        cause: error,
      });
    }

    if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
      throw createFetcherError({
        code: 'TIMEOUT_ERROR',
        fallbackMessage: error.message || 'Request timeout',
        cause: error,
      });
    }

    throw normalizeUnknownToFetcherError(error, 'Network request failed');
  } finally {
    cleanup();
  }
};

export const fetcher = async <T = unknown>(
  endpoint: string,
  options: FetcherRequestOptions = {}
): Promise<FetcherResult<T>> => {
  const auth = options.auth ?? 'none';
  const url = resolveRequestUrl(endpoint, options.baseURL);

  if (auth === 'bearer') {
    if (isServer()) {
      throw createFetcherError({
        code: 'REQUEST_CONFIG_ERROR',
        fallbackMessage: '`auth: bearer` is client-only by design',
      });
    }
    return fetchWithAxios<T>(url, options);
  }

  return fetchWithNative<T>(url, options);
};
