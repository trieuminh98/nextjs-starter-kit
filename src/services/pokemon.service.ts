import { fetcher } from '@/lib/http/fetcher';
import { Pokemon } from '@/types/pokemon';

// Mock API functions
export const createPokemon = async (pokemonData: Partial<Pokemon>): Promise<Pokemon> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate success/failure
  if (Math.random() > 0.3) {
    return {
      id: Math.floor(Math.random() * 1000),
      name: pokemonData.name || 'New Pokemon',
      abilities: pokemonData.abilities || [],
      height: pokemonData.height || 0,
      weight: pokemonData.weight || 0,
      sprites: pokemonData.sprites || { front_default: '' },
    } as Pokemon;
  } else {
    throw new Error('Failed to create Pokemon');
  }
};

export const updatePokemon = async (
  id: number,
  pokemonData: Partial<Pokemon>
): Promise<Pokemon> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (Math.random() > 0.2) {
    return {
      id,
      name: pokemonData.name || 'Updated Pokemon',
      abilities: pokemonData.abilities || [],
      height: pokemonData.height || 0,
      weight: pokemonData.weight || 0,
      sprites: pokemonData.sprites || { front_default: '' },
    } as Pokemon;
  } else {
    throw new Error('Failed to update Pokemon');
  }
};

export const deletePokemon = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (Math.random() > 0.1) {
    return;
  } else {
    throw new Error('Failed to delete Pokemon');
  }
};

export const getPokemonDetail = async (id: string | number) => {
  const res = await fetcher<Pokemon>(`/pokemon/${id}`, 'get', {
    baseURL: 'https://pokeapi.co/api/v2',
    skipAttachToken: true,
  });
  return res;
};
