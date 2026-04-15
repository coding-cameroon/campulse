import { commentApi } from "@/api/comment.api";
import { useAxios } from "@/lib/axios";
import { queryKeys } from "@/lib/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetComments = (id: string) => {
  const axios = useAxios();

  const query = useQuery({
    enabled: !!id,
    queryKey: queryKeys.comments.all(id),
    queryFn: () => commentApi(axios).getComments(id),
  });

  return {
    ...query,
    comments: query.data?.data,
  };
};

export const useCreateComment = (postId: string) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      newComment,
      postId,
    }: {
      postId: string;
      newComment: string;
    }) => commentApi(axios).createComment(postId, newComment),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments.all(postId),
      });
    },
  });
};
