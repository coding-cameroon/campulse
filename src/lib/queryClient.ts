// src/lib/queryClient.ts
import { QueryClient } from "@tanstack/react-query"; // ! install tan stack.

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // data stays fresh for 5 minutes
      retry: 2, // retry failed requests twice
      refetchOnWindowFocus: false, // don't refetch when app comes to foreground
    },
    mutations: {
      retry: 0, // never retry mutations
    },
  },
});
