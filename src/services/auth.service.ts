'use server';

import { fetcher } from '@/lib/http/fetcher';
import { KEYS } from '@/constants/key';
import { AppError } from '@/lib/error/app-error';
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
  if (!res.data) {
    throw new AppError({
      code: 'EMPTY_RESPONSE',
      message: 'Login response is empty',
      status: res.code,
    });
  }

  const cookieStore = await cookies();
  cookieStore.set({
    name: KEYS.JWT_TOKEN,
    value: res.data.accessToken,
    sameSite: 'lax',
    path: '/',
  });
  return res.data;
};
