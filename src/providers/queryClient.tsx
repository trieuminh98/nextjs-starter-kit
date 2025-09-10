// In Next.js, this file would be called: app/providers.tsx
'use client';
import { getQueryClient } from '@/helper/query-client';
import { QueryClientProvider, QueryKey } from '@tanstack/react-query';

// Extend TanStack Query types for mutation metadata
declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      skipToast?: boolean;
      invalidatesQuery?: QueryKey;
      successMessage?: string;
      successTitle?: string;
      errorMessage?: string;
      errorTitle?: string;
    };
  }
}

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
