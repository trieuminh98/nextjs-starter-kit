// Types for HTTP client
export type HttpConfig = {
  baseUrl?: string;
  headers?: Record<string, string>;
  token?: string;
};

export type HttpResponse<T = unknown> = {
  data: T;
  status: number;
  headers: Headers;
};

export type HttpError = {
  message: string;
  status?: number;
  data?: unknown;
};
