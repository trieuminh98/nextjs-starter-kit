'use server';

import { fetcher } from '@/lib/http/fetcher';
import { KEYS } from '@/constants/key';
import { cookies } from 'next/headers';

type LoginResponse = {
  accessToken: string;
};

export const login = async (email: string, password: string) => {
  const res = await fetcher<LoginResponse>('api/auth/signin', 'post', {
    data: { email, password },
  });
  if (res) {
    const cookieStore = await cookies();
    cookieStore.set({
      name: KEYS.JWT_TOKEN,
      value: res.accessToken,
      sameSite: 'lax',
      path: '/',
    });
  }
  return res;
};
