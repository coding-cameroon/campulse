// src/hooks/usePosts.ts
import { postApi } from "@/app/api/post.api";
import { useAxios } from "@/lib/axios";
import { queryKeys } from "@/lib/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetPosts = (params: {
  page?: number;
  limit?: number;
  category?: string;
}) => {
  const axios = useAxios();

  return useQuery({
    queryKey: queryKeys.posts.all(params),
    queryFn: () => postApi(axios).getPosts(params),
  });
};

export const useGetPost = (id: string) => {
  const axios = useAxios();

  return useQuery({
    queryKey: queryKeys.posts.single(id),
    queryFn: () => postApi(axios).getPost(id),
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: FormData) => postApi(axios).createPost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useDeletePost = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => postApi(axios).deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
