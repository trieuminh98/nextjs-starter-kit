import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type AppConfigs = {
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

export async function GET() {
  // Simulate latency
  await new Promise((r) => setTimeout(r, 3000));

  const data: AppConfigs = {
    featureFlags: {
      newDashboard: true,
      enableSentry: false,
    },
    ui: {
      defaultLocale: 'en',
      supportedLocales: ['en', 'vi'],
    },
    runtime: {
      buildId: 'dev-local',
      timestamp: Date.now(),
    },
  };

  return NextResponse.json(data, { status: 200 });
}
