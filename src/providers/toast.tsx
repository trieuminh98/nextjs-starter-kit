'use client';

import { Toaster } from 'sonner';

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      duration={4000}
      expand={true}
      theme="system"
    />
  );
};
