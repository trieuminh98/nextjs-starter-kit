import React, { PropsWithChildren } from 'react';
import ReactQueryProvider from './queryClient';
import AuthProvider from './auth';

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </ReactQueryProvider>
  );
};

export default Provider;
