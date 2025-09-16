'use client';
import { PropsWithChildren } from 'react';
import { ProgressProvider } from '@bprogress/next/app';

const ProgressBar = ({ children }: PropsWithChildren) => {
  return (
    <ProgressProvider height="4px" color="green" options={{ showSpinner: false }} shallowRouting>
      {children}
    </ProgressProvider>
  );
};

export default ProgressBar;
