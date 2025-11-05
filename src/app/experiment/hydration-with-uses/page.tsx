'use client';
import * as React from 'react';
import { useIsSSR } from '@/hooks/use-is-ssr.hook';

interface ExpensiveProps {
  isSSR: boolean;
}

const simulateBlockingWork = () => {
  let total = 0;
  const iterations = 7_500_000;
  for (let i = 0; i < iterations; i += 1) {
    total += (i % 10) * (i % 3);
  }
  return total;
};

export const Expensive = ({ isSSR }: ExpensiveProps) => {
  const syntheticLoad = simulateBlockingWork();
  console.log('Render Expensive', isSSR, syntheticLoad);
  return <div className="text-xs text-gray-500">Expensive Component (SSR: {isSSR.toString()})</div>;
};

// https://bsky.app/profile/kurtextrem.de/post/3lzsnjwqiuk2p
interface WithConcurrentProps {
  children: (isSSR: boolean) => React.ReactNode;
}

const WithConcurrent = ({ children }: WithConcurrentProps) => {
  const isSSR = useIsSSR(); // Already includes useDeferredValue
  return React.useMemo(() => children(isSSR), [isSSR, children]);
};

interface WithSyncProps {
  children: (isSSR: boolean) => React.ReactNode;
}

const WithSync = ({ children }: WithSyncProps) => {
  const isSSR = useIsSSR(); // Already includes useDeferredValue
  return React.useMemo(() => children(isSSR), [isSSR, children]);
};

const HydrationWithUsesPage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Hydration with useIsSSR Hook</h1>
      <p className="text-gray-600 mb-4">
        This page demonstrates hydration using the custom useIsSSR hook to avoid hydration
        mismatches in Next.js.
      </p>

      <div className="space-y-6">
        {/* Concurrent Rendering Section */}
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3">Concurrent Rendering (useDeferredValue)</h2>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
              <WithConcurrent key={value}>
                {(isSSR: boolean) => <Expensive isSSR={isSSR} />}
              </WithConcurrent>
            ))}
          </div>
        </div>

        {/* Sync Rendering Section */}
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3">Sync Rendering</h2>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
              <WithSync key={value}>{(isSSR: boolean) => <Expensive isSSR={isSSR} />}</WithSync>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold mb-2">How it works:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>useIsSSR Hook:</strong> Custom hook that combines useSyncExternalStore +
            useDeferredValue
          </li>
          <li>
            <strong>useSyncExternalStore:</strong> Detects SSR vs client environment safely
          </li>
          <li>
            <strong>useDeferredValue:</strong> Built into useIsSSR for concurrent-friendly rendering
          </li>
          <li>
            <strong>useMemo:</strong> Prevents unnecessary re-renders
          </li>
          <li>
            <strong>Next.js Hydration:</strong> Avoids hydration mismatches
          </li>
        </ul>

        <div className="mt-3 p-2 bg-blue-100 rounded text-xs">
          <strong>Note:</strong> Check browser console to see render logs and timing differences.
        </div>
      </div>
    </div>
  );
};

export default HydrationWithUsesPage;
