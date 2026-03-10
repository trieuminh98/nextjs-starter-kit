import { queryOptions } from '@tanstack/react-query';
import { getUserInfo } from '@/services/user.service';

export const userKeys = {
  all: ['users'] as const,
  info: () => [...userKeys.all, 'info'] as const,
};

export const userQueries = {
  info: queryOptions({
    queryKey: userKeys.info(),
    queryFn: getUserInfo,
  }),
};
