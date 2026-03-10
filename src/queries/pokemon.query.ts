import { queryOptions } from '@tanstack/react-query';
import { getPokemonDetail } from '@/services/pokemon.service';
import { FetcherCustomOptions } from '@/lib/http/fetcher';

export const pokemonKeys = {
  all: ['pokemon'] as const,
  list: (limit: number, offset: number) => [...pokemonKeys.all, 'list', { limit, offset }] as const,
  detail: (id: string | number) => [...pokemonKeys.all, 'detail', id] as const,
};

export const pokemonQueries = {
  list: (limit = 20, offset = 0) =>
    queryOptions({
      queryKey: pokemonKeys.list(limit, offset),
      queryFn: async () => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch pokemon list: ${res.status}`);
        }
        return await res.json();
      },
    }),
  detail: (id: string | number, fetcherOptions?: FetcherCustomOptions) =>
    queryOptions({
      queryKey: pokemonKeys.detail(id),
      queryFn: async () => getPokemonDetail(id, fetcherOptions),
    }),
};
