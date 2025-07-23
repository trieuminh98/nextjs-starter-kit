// Ky instance with global config, hooks, retry, auto refresh token, cancellation, and login redirect
import ky, { Options, KyInstance } from "ky";
import { isomorphicRedirect, isClient } from "@/utils/common";
import {
  getTokenClient,
  removeTokenClient,
  setTokenClient,
} from "../cookies/token.client";
import camelcaseKeys from "camelcase-keys";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const getToken = getTokenClient;
const setToken = setTokenClient;
const removeToken = removeTokenClient;

const handleResponse = async (response: Response): Promise<unknown> => {
  // Nếu response không có content-type json, trả về nguyên bản
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json"))
    return response;
  try {
    const data = await response.clone().json();
    return camelcaseKeys(data, { deep: true });
  } catch (e) {
    return response;
  }
};

export const createKyInstance = (customOptions: Options = {}): KyInstance => {
  return ky.create({
    prefixUrl: BASE_URL,
    timeout: 10000,
    retry: { limit: 5 },
    hooks: {
      beforeRequest: [
        async (request) => {
          const token = await getToken();
          if (token) {
            request.headers.set("Authorization", `Bearer ${token}`);
          } else {
            if (isClient()) {
              isomorphicRedirect("/login");
            } else {
              throw new Error("Unauthorized: No token");
            }
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
              await setToken(accessToken);
              request.headers.set("Authorization", `Bearer ${accessToken}`);
              return ky(request, options);
            } catch (err) {
              await removeToken();
              if (isClient()) {
                isomorphicRedirect("/login");
              } else {
                throw new Error("Unauthorized: Refresh token failed");
              }
            }
          }
        },
      ],
      beforeError: [
        (error) => {
          return error;
        },
      ],
    },
    ...customOptions,
  });
};

export const http = createKyInstance();

export const createAbortController = () => new AbortController();
