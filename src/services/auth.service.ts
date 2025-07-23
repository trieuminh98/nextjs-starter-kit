"use server";

import { setTokenServer } from "@/lib/cookies/token.server";
import { fetcher } from "@/lib/http/fetcher.server";
import { KEYS } from "@/types/key";
import { cookies } from "next/headers";

type LoginResponse = {
  accessToken: string;
};

export const login = async (email: string, password: string) => {
  try {
    const res = await fetcher<LoginResponse>("api/auth/signin", "post", {
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const cookieStore = await cookies();
      cookieStore.set({
        name: KEYS.JWT_TOKEN,
        value: res.data.accessToken,
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });
    }
    return res;
  } catch (error: unknown) {
    throw error;
  }
};
