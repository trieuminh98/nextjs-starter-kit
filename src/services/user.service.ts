import { AppError } from '@/lib/error/app-error';
import { fetcher } from '@/lib/http/fetcher';

export type UserInfo = {
  id: number;
  email: string;
  name: string;
  role: string;
};

export const getUserInfo = async () => {
  const res = await fetcher<UserInfo>('api/auth/userinfo', {
    auth: 'none',
    method: 'get',
  });

  if (!res.data) {
    throw new AppError({
      code: 'EMPTY_RESPONSE',
      message: 'User info response is empty',
      status: res.code,
    });
  }

  return res.data;
};
