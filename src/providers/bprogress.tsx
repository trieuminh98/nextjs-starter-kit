'use client';
import { PropsWithChildren, Suspense } from 'react';
import { ProgressProvider } from '@bprogress/next/app';

const ProgressBar = ({ children }: PropsWithChildren) => {
  return (
    <Suspense fallback={<>{children}</>}>
      <ProgressProvider height="4px" color="green" options={{ showSpinner: false }} shallowRouting>
        {children}
      </ProgressProvider>
    </Suspense>
  );
};

export default ProgressBar;
