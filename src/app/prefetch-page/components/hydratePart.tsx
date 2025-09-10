'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { pokemonQueries } from '../query';

const HydratePart = () => {
  // Use the new createQueryKeys pattern
  const { data: pokemonData } = useSuspenseQuery({
    ...pokemonQueries.detail(25),
  });

  return (
    <div className="flex flex-col gap-3">
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
