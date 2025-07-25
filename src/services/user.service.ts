import { fetcher } from '@/lib/http/fetcher';

type UserInfo = {
  id: number;
  email: string;
  name: string;
  role: string;
};

export const getUserInfo = async () => {
  try {
    const data = await fetcher<UserInfo>('api/auth/userinfo', 'get');
    return data;
  } catch (error: unknown) {
    throw error;
  }
};
