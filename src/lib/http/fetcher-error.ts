import { AppError, AppErrorCode, extractErrorMessage, normalizeError } from '@/lib/error/app-error';
import { toCamelCaseDeep } from './case-transform';

type FetcherErrorInit = {
  code: AppErrorCode;
  message: string;
  status?: number;
  data?: unknown;
  cause?: unknown;
};

type CreateFetcherErrorInput = {
  code: AppErrorCode;
  status?: number;
  payload?: unknown;
  fallbackMessage: string;
  cause?: unknown;
};

export class FetcherError extends AppError {
  constructor({ code, message, status, data, cause }: FetcherErrorInit) {
    super({ code, message, status, data, cause });
    this.name = 'FetcherError';
  }
}

export const createFetcherError = ({
  code,
  status,
  payload,
  fallbackMessage,
  cause,
}: CreateFetcherErrorInput): FetcherError => {
  const normalizedPayload = payload === undefined ? null : toCamelCaseDeep(payload);
  return new FetcherError({
    code,
    status,
    data: normalizedPayload,
    message: extractErrorMessage(normalizedPayload) ?? fallbackMessage,
    cause,
  });
};

export const normalizeUnknownToFetcherError = (
  error: unknown,
  fallbackMessage = 'Network request failed'
): FetcherError => {
  if (error instanceof FetcherError) {
    return error;
  }

  const normalized = normalizeError(error, fallbackMessage);
  const code: AppErrorCode =
    normalized.code === 'ABORT_ERROR'
      ? 'ABORT_ERROR'
      : normalized.code === 'TIMEOUT_ERROR'
        ? 'TIMEOUT_ERROR'
        : 'NETWORK_ERROR';

  return createFetcherError({
    code,
    fallbackMessage: normalized.message,
    cause: error,
  });
};
