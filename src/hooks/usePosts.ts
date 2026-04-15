import { postApi } from "@/api/post.api";
import { useAxios } from "@/lib/axios";
import { queryKeys } from "@/lib/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type GetPostsParams = {
  page?: number;
  limit?: number;
  category?: string;
};

export const useGetPosts = (params: GetPostsParams = {}) => {
  const axios = useAxios();
  const { page = 1, limit = 20, category } = params;

  const query = useQuery({
    // ✅ params go INSIDE the key — different params = different cache entries
    queryKey: queryKeys.posts.all({ page, limit, category }),
    // ✅ queryFn receives context from React Query — your params come from closure
    queryFn: () => postApi(axios).getPosts({ page, limit, category }),
  });

  return {
    ...query,
    // ✅ safely access nested data
    posts: query.data?.data ?? [],
  };
};

export const useCreatePost = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: FormData) => postApi(axios).createPost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: any) => {
      console.error(
        "Create post failed:",
        error?.response?.data || error?.message,
      );
    },
  });
};
