'use client';

import { DevTools as JotaiDevTools } from 'jotai-devtools';
import 'jotai-devtools/styles.css';

export const JotaiDevTool = () => {
  return <JotaiDevTools isInitialOpen={false} />;
};

