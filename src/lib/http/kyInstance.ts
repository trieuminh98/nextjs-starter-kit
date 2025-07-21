// Ky instance with global config, hooks, retry, auto refresh token, cancellation, and login redirect
import ky, { Options, KyInstance } from "ky";
import { getToken, setToken, removeToken } from "@/lib/cookies/token";
import { handleError } from "./errorHandler";
import { handleResponse } from "./responseHandler";
import { isClient, isomorphicRedirect } from "@/utils/common";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const createKyInstance = (customOptions: Options = {}): KyInstance => {
  return ky.create({
    prefixUrl: BASE_URL,
    timeout: 10000,
    retry: { limit: 5 },
    hooks: {
      beforeRequest: [
        (request) => {
          const token = getToken();
          if (token) {
            request.headers.set("Authorization", `Bearer ${token}`);
          } else {
            isomorphicRedirect("/login");
          }
        },
      ],
      afterResponse: [
        async (request, options, response) => {
          await handleResponse(response);
          if (response.status === 401) {
            try {
              const refreshRes = await ky.post("auth/refresh", {
                prefixUrl: BASE_URL,
              });
              const { accessToken }: { accessToken: string } =
                await refreshRes.json();
              setToken(accessToken);
              request.headers.set("Authorization", `Bearer ${accessToken}`);
              return ky(request, options);
            } catch (err) {
              removeToken();
              isomorphicRedirect("/login");
            }
          }
        },
      ],
      beforeRetry: [
        async ({ request, error, retryCount }) => {
          handleError(error, retryCount);
        },
      ],
    },
    ...customOptions,
  });
};

// Global ky instance
export const http = createKyInstance();

export const createAbortController = () => new AbortController();
