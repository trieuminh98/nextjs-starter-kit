'use client';
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

const ReactQueryDevtools = dynamic(
  () => import('@tanstack/react-query-devtools').then((mod) => mod.ReactQueryDevtools),
  {
    ssr: false,
  }
);

const JotaiDevTool = dynamic(() => import('./jotaiDevTool').then((mod) => mod.JotaiDevTool), {
  ssr: false,
});

const ReactScanDevTool = dynamic(
  () => import('./reactScanDevTool').then((mod) => mod.ReactScanDevTool),
  {
    ssr: false,
  }
);

const DevToolProvider = ({ children }: PropsWithChildren) => {
  if (process.env.NODE_ENV !== 'development') {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <ReactScanDevTool />
      <JotaiDevTool />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default DevToolProvider;
