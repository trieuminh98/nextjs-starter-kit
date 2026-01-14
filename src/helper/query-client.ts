// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import { isServer, MutationCache, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

function makeQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Cache time
        staleTime: 60 * 1000,

        // Retry mechanism
        retry(failureCount, error: Error) {
          const axiosErr = error as AxiosError;
          const status = axiosErr?.status ?? axiosErr?.response?.status;
          if (status && ![429, 503].includes(status)) return false;
          return failureCount < 3;
        },
        retryDelay(attempt, error: Error) {
          const axiosErr = error as AxiosError;
          const ra = axiosErr?.response?.headers?.['retry-after'];
          const hinted = ra
            ? isNaN(+ra)
              ? Math.max(0, Date.parse(ra) - Date.now())
              : +ra * 1000
            : null;
          if (hinted) return hinted;
          const base = 1000;
          const cap = 30000;
          const exp = Math.min(cap, base * 2 ** (attempt - 1));
          // full jitter
          return Math.floor(Math.random() * exp);
        },
      },
    },
    mutationCache: new MutationCache({
      onError: (_error, _variables, _context, mutation) => {
        console.error('Mutation error:', _error);
      },
      onSettled: (_data, _error, _variables, _context, mutation) => {
        // Invalidate queries if specified - use the stored queryClient reference
        if (mutation.meta?.invalidatesQuery) {
          queryClient.invalidateQueries({
            queryKey: mutation.meta.invalidatesQuery,
          });
        }
      },
    }),
  });

  return queryClient;
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient(); // Server: always make a new query client
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient; // Browser: singleton
  }
}
