import ComponentWrapper from '@/components/core/componentWrapper';
import UserInfo from '../components/userInfo';
import VercelInfo from '../components/vercelInfo';
import Footer from '../components/footer';
import HydratedPageHydrator from './hydrator';
import { getQueryClient } from '@/helper/query-client';
import { fetchConfigs, pokemonQueries } from './query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function Home() {
  const queryClient = getQueryClient();

  const pokemon = await fetchConfigs();

  // Prefetch pokemon detail query
  void queryClient.prefetchQuery(pokemonQueries.detail(25));

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* SSR */}
        <div className="p-6 space-y-4">
          <section>
            <h2 className="font-medium mb-1">Data from SSR fetching (SSR)</h2>
            <pre className="text-xs bg-black/5 dark:bg-white/10 rounded p-3">
              {JSON.stringify(pokemon.abilities, null, 2)}
            </pre>
          </section>
        </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <HydratedPageHydrator initialPokemon={pokemon}>
            <UserInfo />
            <ComponentWrapper enableErrorBoundary={true}>
              <VercelInfo />
            </ComponentWrapper>
          </HydratedPageHydrator>
        </HydrationBoundary>
      </main>
      {/* Static */}
      <Footer />
    </div>
  );
}
