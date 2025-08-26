import { atom } from 'jotai';
import type { AppConfigs } from '@/services/config.service';

export const configsAtom = atom<AppConfigs | null>(null);
