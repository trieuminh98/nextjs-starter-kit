import Cookies from "js-cookie";
const TOKEN_KEY = "jwtToken";

export const getTokenClient = (): string | null => {
  return Cookies.get(TOKEN_KEY) || null;
};

export const setTokenClient = (token: string): void => {
  Cookies.set(TOKEN_KEY, token, { sameSite: "lax" });
};

export const removeTokenClient = (): void => {
  Cookies.remove(TOKEN_KEY);
};
