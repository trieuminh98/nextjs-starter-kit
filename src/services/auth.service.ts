"use server";

import { setTokenServer } from "@/lib/cookies/token.server";
import { fetcher } from "@/lib/http/fetcher.server";
import { HttpError } from "@/types/http";

type LoginResponse = {
  accessToken: string;
};

export const login = async (email: string, password: string) => {
  try {
    const res = await fetcher<LoginResponse>("api/auth/signin", "post", {
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      setTokenServer("jwtToken", res.data.accessToken);
    }
    return res;
  } catch (error: unknown) {
    throw error;
  }
};
