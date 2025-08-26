'use client';
import { PropsWithChildren } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DevTools as JotaiDevTools } from 'jotai-devtools';
import 'jotai-devtools/styles.css';

const DevToolProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      {process.env.NODE_ENV !== 'production' ? <JotaiDevTools isInitialOpen={false} /> : null}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default DevToolProvider;
