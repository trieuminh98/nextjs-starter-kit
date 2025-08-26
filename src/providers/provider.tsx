import React, { PropsWithChildren } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import ReactQueryProvider from './queryClient';
import AuthProvider from './auth';
import DevToolProvider from './devTool';

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryProvider>
      <JotaiProvider>
        <DevToolProvider>
          <AuthProvider>{children}</AuthProvider>
        </DevToolProvider>
      </JotaiProvider>
    </ReactQueryProvider>
  );
};

export default Provider;
