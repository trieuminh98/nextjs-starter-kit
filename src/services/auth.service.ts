'use server';

import { fetcher } from '@/lib/http/fetcher';
import { KEYS } from '@/constants/key';
import { cookies } from 'next/headers';

type LoginResponse = {
  accessToken: string;
};

export const login = async (email: string, password: string) => {
  const res = await fetcher<LoginResponse>('api/auth/signin', {
    auth: 'none',
    method: 'post',
    data: { email, password },
  });
  if (res.data) {
    const cookieStore = await cookies();
    cookieStore.set({
      name: KEYS.JWT_TOKEN,
      value: res.data.accessToken,
      sameSite: 'lax',
      path: '/',
    });
  }
  return res.data;
};
