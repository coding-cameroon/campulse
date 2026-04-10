// src/api/post.api.ts
import { AxiosInstance } from "axios";
import { Post } from "../../types"

export type GetPostsResponse = {
  data: Post[];
  message: string;
  success: boolean;
  meta: { page: number; limit: number; count: number };
};

export type GetPostResponse = {
  data: Post;
  message: string;
  success: boolean;
};

export const postApi = (axios: AxiosInstance) => ({
  getPosts: async (params: {
    page?: number;
    limit?: number;
    category?: string;
  }): Promise<GetPostsResponse> => {
    const { data } = await axios.get("/api/posts", { params });
    return data;
  },

  getPost: async (id: string): Promise<GetPostResponse> => {
    const { data } = await axios.get(`/api/posts/${id}`);
    return data;
  },

  createPost: async (payload: FormData): Promise<GetPostResponse> => {
    const { data } = await axios.post("/api/posts", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  deletePost: async (id: string): Promise<void> => {
    await axios.delete(`/api/posts/${id}`);
  },
});
