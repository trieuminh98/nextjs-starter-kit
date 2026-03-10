import 'server-only';
import { Pokemon } from '@/types/pokemon';

const REVALIDATE_TIME = 60 * 5; // 5 minutes

export async function fetchPokemonById(id: string | number): Promise<Pokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    next: { revalidate: REVALIDATE_TIME },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch pokemon: ${res.status}`);
  }

  return await res.json();
}

export async function fetchPokemon25(): Promise<Pokemon> {
  return await fetchPokemonById(25);
}
