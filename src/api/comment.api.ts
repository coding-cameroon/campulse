import { AxiosInstance } from "axios";
import { Comment } from "../../types";

export type GetCommentResponse = {
  data: Comment[];
  message: string;
  success: boolean;
  meta: {
    page: number;
    limit: number;
    count: number;
    hasMore: boolean;
  };
};

export type CreateCommentResponse = {
  data: Comment;
  message: string;
  success: boolean;
};

export const commentApi = (axios: AxiosInstance) => ({
  getComments: async (id: string): Promise<GetCommentResponse> => {
    const { data } = await axios.get(`/comments/${id}/post`);
    return data;
  },

  createComment: async (
    postId: string,
    comment: string,
  ): Promise<CreateCommentResponse> => {
    const { data } = await axios.post(`/comments/${postId}/create`, {
      comment,
    });
    return data;
  },
});
