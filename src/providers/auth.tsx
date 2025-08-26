/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { getTokenClient } from '@/lib/cookies/token.client';
import { KEYS } from '@/constants/key';
import { useRouter } from 'next/navigation';
import React, { PropsWithChildren, useEffect } from 'react';

const AuthProvider = ({ children }: PropsWithChildren) => {
  const token = getTokenClient(KEYS.JWT_TOKEN);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push(`/login`);
    }
  }, [token]);

  return <div>{children}</div>;
};

export default AuthProvider;
