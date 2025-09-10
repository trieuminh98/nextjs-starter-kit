'use client';
import { PropsWithChildren } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DevTools as JotaiDevTools } from 'jotai-devtools';
import 'jotai-devtools/styles.css';
import { useScan } from 'react-scan';

const DevToolProvider = ({ children }: PropsWithChildren) => {
  useScan({
    enabled: process.env.NODE_ENV === 'development',
    showToolbar: true,
    trackUnnecessaryRenders: true,
  });
  return (
    <>
      {children}
      {process.env.NODE_ENV !== 'production' ? <JotaiDevTools isInitialOpen={false} /> : null}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default DevToolProvider;
