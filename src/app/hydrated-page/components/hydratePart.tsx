'use client';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { useAtomValue } from 'jotai';
import { pokemonAtom } from '@/state/pokemon';
import { pokemonQueries } from '@/queries/pokemon.query';

const HydratePart = () => {
  const { data } = useQuery(pokemonQueries.detail(27));

  const pokemonAtomData = useAtomValue(pokemonAtom);
  const hydratedQueryOptions = pokemonAtomData
    ? {
        ...pokemonQueries.detail(28),
        initialData: pokemonAtomData,
      }
    : pokemonQueries.detail(28);

  // Reuse shared queryOptions and override only component-specific options.
  const { data: hydrateData } = useSuspenseQuery(hydratedQueryOptions);

  // Reuse shared queryOptions and override only component-specific options.
  const { data: pokemonData } = useSuspenseQuery({
    ...pokemonQueries.detail(28),
  });

  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="font-medium mb-1">Data client fetching</div>
        <pre className="text-xs bg-black/5 dark:bg-white/10 rounded p-2">
          {JSON.stringify(data?.name, null, 2)}
        </pre>
      </div>
      <div>
        <div className="font-medium mb-1">Pokemon data hydrated from server to client on atom:</div>
        <pre className="text-xs bg-black/5 dark:bg-white/10 rounded p-2">
          {JSON.stringify(pokemonAtomData?.name, null, 2)}
        </pre>
      </div>
      <div>
        <div className="font-medium mb-1">
          Pokemon data hydrated from server to client on atom and inject to React Query:
        </div>
        <pre className="text-xs bg-black/5 dark:bg-white/10 rounded p-2">
          {JSON.stringify(hydrateData?.name, null, 2)}
        </pre>
      </div>
      <div>
        <div className="font-medium mb-1">Pokemon Data from prefetch query: </div>
        <pre className="text-xs bg-black/5 dark:bg-white/10 rounded p-2">
          Hydrated: {JSON.stringify(pokemonData?.name, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default HydratePart;
