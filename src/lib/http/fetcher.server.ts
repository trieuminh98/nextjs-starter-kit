// Fetcher for React Query using ky instance

import { HttpError, HttpResponse } from "@/types/http";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const fetcher = async <T>(
  endpoint: string,
  method: "get" | "post" | "put" | "delete" | "patch" = "get",
  options?: RequestInit
): Promise<HttpResponse<T>> => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: method,
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (res.ok) {
    return {
      ok: res.ok,
      status: res.status,
      data: data,
      headers: res.headers,
    };
  }
  const error: HttpError = {
    ok: res.ok,
    message: data?.message || "",
    status: res.status,
    data: data,
  };
  throw new Error(JSON.stringify(error));
};
