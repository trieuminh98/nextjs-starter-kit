import { fetcher } from '@/lib/http/fetcher';

export type AppConfigs = {
  featureFlags: {
    newDashboard: boolean;
    enableSentry: boolean;
  };
  ui: {
    defaultLocale: string;
    supportedLocales: string[];
  };
  runtime: {
    buildId: string;
    timestamp: number;
  };
};

export const getConfigs = async () => {
  try {
    const data = await fetcher<AppConfigs>('api/configs', 'get');
    return data;
  } catch (error: unknown) {
    throw error;
  }
};
