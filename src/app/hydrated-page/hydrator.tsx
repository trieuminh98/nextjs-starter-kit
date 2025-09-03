'use client';

import React from 'react';
import { useHydrateAtoms } from 'jotai/utils';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/helper/query-client';
import { Pokemon } from '@/types/pokemon';
import { pokemonAtom } from '@/state/pokemon';

type Props = {
  intialData: Pokemon;
  children: React.ReactNode;
};

const HydratedPageHydrator = ({ intialData, children }: Props) => {
  const queryClient = getQueryClient();
  useHydrateAtoms([[pokemonAtom, intialData] as const]);

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
};

export default HydratedPageHydrator;
