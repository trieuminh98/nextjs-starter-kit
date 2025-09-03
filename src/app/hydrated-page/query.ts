import { Pokemon } from '@/types/pokemon';
import { queryOptions } from '@tanstack/react-query';

const REVALIDATE_TIME = 60 * 5; // 5 minutes
export async function fetchConfigs(): Promise<Pokemon> {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/25', {
    next: { revalidate: REVALIDATE_TIME },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch configs: ${res.status}`);
  }
  return await res.json();
}

export const pokemonOptions = queryOptions({
  queryKey: ['pokemon'],
  queryFn: async () => {
    const response = await fetchConfigs();

    return response;
  },
});
