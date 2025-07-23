"use server";
import { KEYS } from "@/types/key";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const getTokenServer = async (key: KEYS): Promise<string | null> => {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value || null;
};

export const setTokenServer = async (
  key: KEYS,
  value: string,
  options?: Partial<ResponseCookie>
): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: key,
    value: value,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    ...options,
  });
};

export const removeTokenServer = async (key: KEYS): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: key,
    value: "",
    expires: new Date(0),
    path: "/",
  });
};
