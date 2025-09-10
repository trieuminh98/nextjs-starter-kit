import Footer from './components/footer';
import { getQueryClient } from '@/helper/query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { pokemonQueries } from './query';
import ContainerWrapper from '@/components/core/componentWrapper';
import HydratePart from './components/hydratePart';

// Force dynamic rendering to avoid prerender issues
export const dynamic = 'force-dynamic';

export default async function Home() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(pokemonQueries.detail(25));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <Footer />
          <ContainerWrapper>
            <HydratePart />
          </ContainerWrapper>
        </main>
        {/* Static */}
        <Footer />
      </div>
    </HydrationBoundary>
  );
}
