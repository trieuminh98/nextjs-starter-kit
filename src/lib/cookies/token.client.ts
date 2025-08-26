import { KEYS } from '@/constants/key';
import Cookies from 'js-cookie';

export const getTokenClient = (key: KEYS): string | null => {
  return Cookies.get(key) || null;
};

export const setTokenClient = (key: KEYS, token: string): void => {
  Cookies.set(key, token, { sameSite: 'lax' });
};

export const removeTokenClient = (key: KEYS): void => {
  Cookies.remove(key);
};
