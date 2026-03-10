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
    throw new Error('User info response is empty');
  }

  return res.data;
};
