'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { pokemonQueries } from '@/queries/pokemon.query';

const StreamingPark = () => {
  const { data: pokemonData } = useSuspenseQuery(pokemonQueries.detail(26));

  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="font-medium mb-1">Streaming Part</div>
        <pre className="text-xs bg-black/5 dark:bg-white/10 rounded p-2">
          {JSON.stringify(pokemonData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default StreamingPark;
