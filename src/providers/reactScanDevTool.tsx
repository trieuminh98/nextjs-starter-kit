'use client';

import { useScan } from 'react-scan';

export const ReactScanDevTool = () => {
  useScan({
    enabled: true,
    showToolbar: true,
    trackUnnecessaryRenders: true,
  });

  return null;
};
