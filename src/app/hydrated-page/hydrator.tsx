'use client';

import React from 'react';
import { useHydrateAtoms } from 'jotai/utils';
import { configsAtom } from '@/state/configs';
import type { AppConfigs } from '@/services/config.service';

type Props = {
  initialConfigs: AppConfigs;
  children: React.ReactNode;
};

const HydratedPageHydrator = ({ initialConfigs, children }: Props) => {
  useHydrateAtoms([[configsAtom, initialConfigs] as const]);
  return <>{children}</>;
};

export default HydratedPageHydrator;
