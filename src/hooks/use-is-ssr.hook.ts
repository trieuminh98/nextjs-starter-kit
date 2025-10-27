'use client';
import * as React from 'react';

const emptySub = () => () => {};
const getSnapshot = () => false; // client value after hydration
const getServerSnapshot = () => true; // stable value for SSR/hydration

export const useIsSSR = () => {
  const isSSRSync = React.useSyncExternalStore(emptySub, getSnapshot, getServerSnapshot);
  return React.useDeferredValue(isSSRSync); // defer concurrent-friendly
};
