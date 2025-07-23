import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { isClient } from "@/utils/common";
import { getTokenClient } from "../cookies/token.client";
import camelcaseKeys from "camelcase-keys";
import { getTokenServer } from "../cookies/token.server";
import { KEYS } from "@/types/key";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const createAxiosInstance = (
  customConfig: AxiosRequestConfig = {}
): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    ...customConfig,
  });

  // Request interceptor: attach token
  instance.interceptors.request.use(async (config) => {
    const token = isClient()
      ? getTokenClient(KEYS.JWT_TOKEN)
      : await getTokenServer(KEYS.JWT_TOKEN);
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  // Response interceptor: camelCase + error handling
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (
        response.headers["content-type"] &&
        response.headers["content-type"].includes("application/json")
      ) {
        response.data = camelcaseKeys(response.data, { deep: true });
      }
      return response;
    },
    (error) => {
      // Có thể handle auto refresh token ở đây nếu muốn
      // if (error.response?.status === 401) { ... }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const http = createAxiosInstance();

export const createAbortController = () => new AbortController();
