'use client';

import React from 'react';
import { useHydrateAtoms } from 'jotai/utils';
import { Pokemon } from '@/types/pokemon';
import { pokemonAtom } from '@/state/pokemon';

type Props = {
  initialPokemon: Pokemon; // Fixed naming: initialConfigs -> initialPokemon
  children: React.ReactNode;
};

const HydratedPageHydrator = ({ initialPokemon, children }: Props) => {
  // Hydrate Jotai atom with server data
  useHydrateAtoms([[pokemonAtom, initialPokemon] as const]);

  // Hydrate React Query cache
  return children;
};

export default HydratedPageHydrator;
