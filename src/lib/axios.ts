import { useAuth } from "@clerk/expo";
import axios, { AxiosInstance } from "axios";

// BASE_URL already includes /api/v1 from .env
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

// ── Unauthenticated instance ────────────────────────────────────────────────
// Used for public routes that don't need a token (none currently but good to have)
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ── Authenticated instance — used everywhere in the app ────────────────────
// This is a hook because it needs useAuth() from Clerk
// It creates a fresh axios instance per render but the interceptors
// always fetch a fresh token so it's always up to date
export const useAxios = (): AxiosInstance => {
  const { getToken } = useAuth();

  const authAxios = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
  });

  // REQUEST interceptor — runs before every API call
  // Fetches the current Clerk session token and attaches it as Bearer
  // getToken() is async and always returns the latest valid token
  // If the token is expired Clerk refreshes it automatically
  authAxios.interceptors.request.use(async (config) => {
    const token = await getToken();
    console.log("🔑 Token:", token ? token.substring(0, 20) + "..." : "NULL");
    console.log("🌐 Request URL:", config.baseURL! + config.url!);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // RESPONSE interceptor — runs after every API response
  // Passes successful responses through unchanged
  // On error, logs 401s and re-throws so React Query can handle retry/error state
  authAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error("Unauthorized:", error.response?.data?.message);
      }
      // Re-throw so useMutation/useQuery onError handlers receive it
      return Promise.reject(error);
    },
  );

  return authAxios;
};
