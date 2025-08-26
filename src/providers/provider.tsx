import React, { PropsWithChildren } from 'react';
import ReactQueryProvider from './queryClient';
import AuthProvider from './auth';
import DevToolProvider from './devTool';

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryProvider>
      <DevToolProvider>
        <AuthProvider>{children}</AuthProvider>
      </DevToolProvider>
    </ReactQueryProvider>
  );
};

export default Provider;
