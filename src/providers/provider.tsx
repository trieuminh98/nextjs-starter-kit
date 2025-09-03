import React, { PropsWithChildren } from 'react';
import ReactQueryProvider from './queryClient';
import AuthProvider from './auth';
import DevToolProvider from './devTool';
import { Provider as JotaiProvider } from 'jotai';
import { ToastProvider } from './toast';

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryProvider>
      <JotaiProvider>
        <DevToolProvider>
          <AuthProvider>
            {children}
            <ToastProvider />
          </AuthProvider>
        </DevToolProvider>
      </JotaiProvider>
    </ReactQueryProvider>
  );
};
export default Provider;
