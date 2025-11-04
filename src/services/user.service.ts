import { fetcherWithValidation } from '@/lib/http/fetcher';
import { z } from 'zod';

const UserInfoSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  role: z.string(),
});

export type UserInfo = z.infer<typeof UserInfoSchema>;

export const getUserInfo = async () => {
  return fetcherWithValidation<unknown, UserInfo>('api/auth/userinfo', UserInfoSchema, 'get');
};
