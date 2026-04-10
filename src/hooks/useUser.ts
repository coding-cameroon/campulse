// src/hooks/useUser.ts
import { userApi } from "@/api/user.api";
import { useAxios } from "@/lib/axios";
import { queryKeys } from "@/lib/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // ! install tanstack
import { User } from "../../types/index";

export const useGetMe = () => {
  const axios = useAxios();

  return useQuery({
    queryKey: queryKeys.user.me,
    queryFn: () => userApi(axios).getMe(),
  });
};


export const useSyncUser = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => userApi(axios).syncUser(),
    onSuccess: (data: User) => {
      queryClient.setQueryData(queryKeys.user.me, data);
    },
  });
};

export const useUpdateMe = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      payload: Parameters<ReturnType<typeof userApi>["updateMe"]>[0],
    ) => userApi(axios).updateMe(payload),
    onSuccess: () => {
      // Refetch user after update
      queryClient.invalidateQueries({ queryKey: queryKeys.user.me });
    },
  });
};
