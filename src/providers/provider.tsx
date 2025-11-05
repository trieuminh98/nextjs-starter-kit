import { PropsWithChildren, ViewTransition } from 'react';
import ReactQueryProvider from './queryClient';
import AuthProvider from './auth';
import DevToolProvider from './devTool';
import { Provider as JotaiProvider } from 'jotai';
import { ToastProvider } from './toast';
import ProgressBar from './bprogress';

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryProvider>
      <JotaiProvider>
        <DevToolProvider>
          <AuthProvider>
            <ViewTransition>
              <ProgressBar>{children}</ProgressBar>
              <ToastProvider />
            </ViewTransition>
          </AuthProvider>
        </DevToolProvider>
      </JotaiProvider>
    </ReactQueryProvider>
  );
};
export default Provider;
