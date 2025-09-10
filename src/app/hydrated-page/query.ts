import { Pokemon } from '@/types/pokemon';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getUserInfo } from '@/services/user.service';
import { getPokemonDetail } from '@/services/pokemon.service';

const REVALIDATE_TIME = 60 * 5; // 5 minutes

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

// User queries
export const userQueries = createQueryKeys('users', {
  info: {
    queryKey: ['user-info'],
    queryFn: getUserInfo,
  },
});

export async function fetchPokemon25(): Promise<Pokemon> {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/25', {
    next: { revalidate: REVALIDATE_TIME },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch configs: ${res.status}`);
  }
  return await res.json();
}
