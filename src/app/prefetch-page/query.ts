import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getPokemonDetail } from '@/services/pokemon.service';

// Pokemon queries
export const pokemonQueries = createQueryKeys('pokemon', {
  list: (limit = 20, offset = 0) => ({
    queryKey: [{ limit, offset }],
    queryFn: async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch pokemon list: ${res.status}`);
      }
      return await res.json();
    },
  }),
  detail: (id: string | number) => ({
    queryKey: [id],
    queryFn: async () => {
      return await getPokemonDetail(id);
    },
  }),
});
