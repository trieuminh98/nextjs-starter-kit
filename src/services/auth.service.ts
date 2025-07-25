'use server';

import { fetcher } from '@/lib/http/fetcher';
import { KEYS } from '@/types/key';
import { cookies } from 'next/headers';

type LoginResponse = {
  accessToken: string;
};

export const login = async (email: string, password: string) => {
  try {
    const res = await fetcher<LoginResponse>('api/auth/signin', 'post', {
      data: { email, password },
    });
    console.log('res', res.accessToken);
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
  } catch (error: unknown) {
    throw error;
  }
};
