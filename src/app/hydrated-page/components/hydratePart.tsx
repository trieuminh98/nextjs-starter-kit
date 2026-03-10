'use client';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { useAtomValue } from 'jotai';
import { pokemonAtom } from '@/state/pokemon';
import { pokemonQueries } from '@/queries/pokemon.query';
import { userQueries } from '@/queries/user.query';

const HydratePart = () => {
  const { data } = useQuery(userQueries.info);

  const pokemonAtomData = useAtomValue(pokemonAtom);

  // Reuse shared queryOptions and override only component-specific options.
  const { data: pokemonData } = useSuspenseQuery({
    ...pokemonQueries.detail(25),
    initialData: pokemonAtomData ?? undefined,
  });

  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="font-medium mb-1">Data client fetching</div>
        <pre className="text-xs bg-black/5 dark:bg-white/10 rounded p-2">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
      <div>
        <div className="font-medium mb-1">Pokemon data hydrated from server to client on atom:</div>
        <pre className="text-xs bg-black/5 dark:bg-white/10 rounded p-2">
          {JSON.stringify(pokemonAtomData?.abilities, null, 2)}
        </pre>
      </div>
      <div>
        <div className="font-medium mb-1">Pokemon Data from prefetch query: </div>
        <pre className="text-xs bg-black/5 dark:bg-white/10 rounded p-2">
          {JSON.stringify(pokemonData?.abilities, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default HydratePart;
