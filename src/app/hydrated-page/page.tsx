import Footer from './components/footer';
import HydratedPageHydrator from './hydrator';
import { getQueryClient } from '@/helper/query-client';
import { fetchPokemon25, pokemonQueries } from './query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import ToastDemo from './components/toast-demo';
import HandlingPart from './components/handlingPart';
import HydratePart from './components/hydratePart';
import ContainerWrapper from '@/components/core/componentWrapper';

export default async function Home() {
  const queryClient = getQueryClient();

  const pokemon = await fetchPokemon25();
  // Set pokemon data directly to cache to avoid duplicate fetch
  queryClient.setQueryData(pokemonQueries.detail(25).queryKey, pokemon);

  // after(() => {
  //   // Execute after the layout is rendered and sent to the user
  //   console.log('do something after send the response to client');
  // });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HydratedPageHydrator initialPokemon={pokemon}>
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

            {/* Global Toast Demo */}
            <ToastDemo />

            {/* Client Component */}
            <HydratePart />
            <ContainerWrapper enableErrorBoundary={true}>
              <HandlingPart />
            </ContainerWrapper>
          </main>
          {/* Static */}
          <Footer />
        </div>
      </HydratedPageHydrator>
    </HydrationBoundary>
  );
}
