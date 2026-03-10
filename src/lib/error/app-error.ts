export type AppErrorCode =
  | 'HTTP_ERROR'
  | 'NETWORK_ERROR'
  | 'TIMEOUT_ERROR'
  | 'ABORT_ERROR'
  | 'EMPTY_RESPONSE'
  | 'REQUEST_CONFIG_ERROR'
  | 'UNKNOWN_ERROR';

type AppErrorInit = {
  code?: AppErrorCode;
  message: string;
  status?: number;
  data?: unknown;
  cause?: unknown;
};

export class AppError extends Error {
  readonly code: AppErrorCode;
  readonly status?: number;
  readonly data?: unknown;

  constructor({ code = 'UNKNOWN_ERROR', message, status, data, cause }: AppErrorInit) {
    super(message, cause ? { cause } : undefined);
    this.name = 'AppError';
    this.code = code;
    this.status = status;
    this.data = data;
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const MESSAGE_KEYS = ['message', 'error', 'detail', 'title'] as const;

export const extractErrorMessage = (value: unknown): string | null => {
  if (typeof value === 'string') {
    return value;
  }

  if (!isRecord(value)) {
    return null;
  }

  for (const key of MESSAGE_KEYS) {
    const candidate = value[key];
    if (typeof candidate === 'string' && candidate.trim().length > 0) {
      return candidate;
    }
  }

  return null;
};

export const normalizeError = (error: unknown, fallbackMessage = 'Unexpected error'): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    if (error.name === 'AbortError') {
      return new AppError({
        code: 'ABORT_ERROR',
        message: error.message || 'Request was aborted',
        cause: error,
      });
    }

    if (/timeout/i.test(error.message)) {
      return new AppError({
        code: 'TIMEOUT_ERROR',
        message: error.message,
        cause: error,
      });
    }

    return new AppError({
      code: 'UNKNOWN_ERROR',
      message: error.message || fallbackMessage,
      cause: error,
    });
  }

  const messageFromUnknown = extractErrorMessage(error);
  if (messageFromUnknown) {
    return new AppError({
      code: 'UNKNOWN_ERROR',
      message: messageFromUnknown,
      data: error,
    });
  }

  return new AppError({
    code: 'UNKNOWN_ERROR',
    message: fallbackMessage,
    data: error,
  });
};

export const getErrorMessage = (error: unknown, fallbackMessage = 'Something went wrong'): string =>
  normalizeError(error, fallbackMessage).message;
