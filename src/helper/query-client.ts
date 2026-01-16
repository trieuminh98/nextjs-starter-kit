// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import { isServer, MutationCache, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

function makeQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Cache time
        staleTime: 60 * 1000,
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
