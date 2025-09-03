import { atom } from 'jotai';
import { Pokemon } from '@/types/pokemon';

export const pokemonAtom = atom<Pokemon | null>(null);
