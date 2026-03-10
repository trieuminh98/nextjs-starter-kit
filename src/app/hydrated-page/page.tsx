import Footer from './components/footer';
import HydratedPageHydrator from './hydrator';
import HandlingPart from './components/handlingPart';
import HydratePart from './components/hydratePart';
import StreamingPart from './components/streamingPart';
import { CompositeWrapper } from '@/components/core/compositeWrapper';
import { getQueryClient } from '@/helper/query-client';
import { pokemonQueries } from '@/queries/pokemon.query';
import { cacheLife } from 'next/cache';

export default async function Home() {
  'use cache';
  cacheLife({ stale: 30 });
  // Global fetch without authen
  const queryClient = getQueryClient();

  const pokemon = await queryClient.fetchQuery(
    pokemonQueries.detail(25, { next: { revalidate: 300 } })
  );

  console.log('prerender');

  await queryClient.prefetchQuery(pokemonQueries.detail(28, { next: { revalidate: 300 } }));

  return (
    <HydratedPageHydrator initialPokemon={pokemon}>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          {/* Streaming Part pokemon 26 */}
          <CompositeWrapper>
            <StreamingPart />
          </CompositeWrapper>
          {/* SSR */}
          <div className="p-6 space-y-4">
            <section>
              <h2 className="font-medium mb-1">Data from SSR fetching (SSR)</h2>
              <pre className="text-xs bg-black/5 dark:bg-white/10 rounded p-3">
                {JSON.stringify(pokemon?.name, null, 2)}
              </pre>
            </section>
          </div>

          {/* Global Toast Demo */}

          {/* Client Component */}
          <CompositeWrapper>
            <HydratePart />
          </CompositeWrapper>

          {/* Client with hydrated atom and query pokemon 25 */}
          <CompositeWrapper>
            <HandlingPart />
          </CompositeWrapper>
        </main>
        {/* Static */}
        <Footer />
      </div>
    </HydratedPageHydrator>
  );
}
