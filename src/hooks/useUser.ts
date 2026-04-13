import { SyncUserResponse, userApi } from "@/api/user.api";
import { useAxios } from "@/lib/axios";
import { queryKeys } from "@/lib/queryKeys";
import { useAuth } from "@clerk/expo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ── useGetMe ────────────────────────────────────────────────────────────────
// Fetches the current user from your DB
// Runs automatically when the component mounts
// Result is cached under ["user", "me"] — any component calling this
// hook gets the same cached data without extra network requests
export const useGetMe = () => {
  const axios = useAxios();
  const { isSignedIn } = useAuth();

  const query = useQuery({
    enabled: !!isSignedIn,
    queryKey: queryKeys.user.me,
    queryFn: () => userApi(axios).getMe(),
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 404) return false;
      return failureCount < 2;
    },
  });

  return { ...query, user: query.data?.data };
};

// ── useSyncUser ─────────────────────────────────────────────────────────────
// Called ONCE after Clerk signup completes
// Creates the user in your DB via POST /api/v1/users/sync
// On success, stores the returned user in React Query cache
// so useGetMe() anywhere in the app immediately has the data
// without needing to refetch from the server
export const useSyncUser = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => userApi(axios).syncUser(),
    onSuccess: (response: SyncUserResponse) => {
      // Store the full response in cache — same shape as getMe returns
      // This means any useGetMe() call resolves instantly from cache
      queryClient.setQueryData(queryKeys.user.me, response);
    },
    onError: (error: any) => {
      if (error?.response?.status === 409) {
        console.log("User already synced — skipping");
        return;
      }
      console.error("Status:", error?.response?.status);
      console.error(
        "Server said:",
        JSON.stringify(error?.response?.data, null, 2),
      );
    },
  });
};

// ── useUpdateMe ─────────────────────────────────────────────────────────────
// Updates the current user's profile
// On success, invalidates the ["user", "me"] cache key
// which triggers useGetMe() to refetch fresh data from the server
export const useUpdateName = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { firstname: string; lastname: string }) =>
      userApi(axios).updateName(payload),
    onSuccess: () => {
      // Invalidate forces a fresh fetch — ensures UI reflects
      // exactly what the server saved, not just what we sent
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me });
    },
    onError: (error: any) => {
      if (error.response) {
        // This is the actual data sent back by your Railway API
        console.log("Server Error Data:", error.response.data);
        console.log("Server Status:", error.response.status);
      } else {
        console.log("Error Message:", error.message);
      }
    },
  });
};

// ── useDeactivateUser ─────────────────────────────────────────────────────────────
// Toggles the current user's isActive state
export const useDeactivateUser = () => {
  const axios = useAxios();

  return useMutation({
    mutationFn: (id: string) => userApi(axios).deactivateUser(id),
    onError: (error: any) => {
      if (error.response) {
        // This is the actual data sent back by your Railway API
        console.log("Server Error Data:", error.response.data);
        console.log("Server Status:", error.response.status);
      } else {
        console.log("Error Message:", error.message);
      }
    },
  });
};
