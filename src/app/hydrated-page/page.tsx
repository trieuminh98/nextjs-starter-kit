import ComponentWrapper from '@/components/core/componentWrapper';
import { AppConfigs } from '@/services/config.service';
import UserInfo from '../components/userInfo';
import VercelInfo from '../components/vercelInfo';
import Footer from '../components/footer';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const REVALIDATE_TIME = 60 * 5; // 5 minutes
async function fetchConfigs(): Promise<AppConfigs> {
  const res = await fetch(`${baseUrl}/api/configs`, { next: { revalidate: REVALIDATE_TIME } });
  if (!res.ok) {
    throw new Error(`Failed to fetch configs: ${res.status}`);
  }
  return (await res.json()) as AppConfigs;
}

export default async function Home() {
  const configs = await fetchConfigs();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* SSR */}
        <div className="p-6 space-y-4">
          <h1 className="text-lg font-semibold">App Configs (SSR)</h1>
          <section>
            <h2 className="font-medium mb-1">Feature Flags</h2>
            <pre className="text-xs bg-black/5 dark:bg-white/10 rounded p-3">
              {JSON.stringify(configs.featureFlags, null, 2)}
            </pre>
          </section>
          <section>
            <h2 className="font-medium mb-1">UI</h2>
            <pre className="text-xs bg-black/5 dark:bg-white/10 rounded p-3">
              {JSON.stringify(configs.ui, null, 2)}
            </pre>
          </section>
          <section>
            <h2 className="font-medium mb-1">Runtime</h2>
            <pre className="text-xs bg-black/5 dark:bg-white/10 rounded p-3">
              {JSON.stringify(configs.runtime, null, 2)}
            </pre>
          </section>
        </div>
        {/* Client */}
        <UserInfo />
        <ComponentWrapper enableErrorBoundary={true}>
          <VercelInfo />
        </ComponentWrapper>
      </main>
      {/* Static */}
      <Footer />
    </div>
  );
}
