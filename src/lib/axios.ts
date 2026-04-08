import { useAuth } from "@clerk/expo";
import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Hook to get axios with auth token injected
export const useAxios = () => {
  const { getToken } = useAuth();

  const authAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Intercept every request and attach Clerk token
  authAxios.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Intercept responses — handle global errors
  authAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized globally
        console.error("Unauthorized — redirect to login");
      }
      return Promise.reject(error);
    },
  );

  return authAxios;
};
