import { getUserInfo } from '@/services/user.service';
import UserInfo from './components/userInfo';
import { Suspense } from 'react';
import { racePromise } from '@/lib/http/fetcher';
import VercelInfo from './components/vercelInfo';
import Footer from './components/footer';
import ComponentWrapper from '@/components/core/componentWrapper';

export default async function Home() {
  const userPromise = getUserInfo();
  await racePromise(userPromise);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Suspense fallback={<div>Loading user info...</div>}>
          <UserInfo promise={userPromise} />
        </Suspense>

        <ComponentWrapper enableErrorBoundary={true}>
          <VercelInfo />
        </ComponentWrapper>
      </main>
      <Footer />
    </div>
  );
}
