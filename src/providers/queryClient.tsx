// In Next.js, this file would be called: app/providers.tsx
'use client';
import { getQueryClient } from '@/helper/query-client';
import { QueryClientProvider } from '@tanstack/react-query';

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
