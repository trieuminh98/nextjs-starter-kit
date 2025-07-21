// Token management using Next.js cookies (supports both client and server)
import { cookies } from "next/headers"; // For server-side
import Cookies from "js-cookie"; // For client-side

const TOKEN_KEY = "jwtToken";

// Get token on server (async)
export const getTokenServer = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_KEY)?.value || null;
};

// Get token on client (sync)
export const getTokenClient = (): string | null => {
  return Cookies.get(TOKEN_KEY) || null;
};

// Get token (auto detect client/server)
export const getToken = (): string | null | Promise<string | null> => {
  if (typeof window === "undefined") {
    return getTokenServer();
  }
  return getTokenClient();
};

// Set token
export const setToken = (token: string): void => {
  if (typeof window === "undefined") {
    // Server-side: not supported for set (should be done in API route or middleware)
    return;
  }
  Cookies.set(TOKEN_KEY, token, { sameSite: "lax" });
};

// Remove token
export const removeToken = (): void => {
  if (typeof window === "undefined") {
    // Server-side: not supported for remove (should be done in API route or middleware)
    return;
  }
  Cookies.remove(TOKEN_KEY);
};
