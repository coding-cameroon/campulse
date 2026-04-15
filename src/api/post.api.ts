// src/api/post.api.ts
import { AxiosInstance } from "axios";
import { Post } from "../../types";

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
  createPost: async (payload: FormData) => {
    const { data } = await axios.post("/posts/new", payload, {
      // ✅ multipart/form-data so multer on the server can parse
      // images and text fields together in one request
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  getPosts: async (params: {
    page?: number;
    limit?: number;
    category?: string;
  }): Promise<GetPostsResponse> => {
    const { data } = await axios.get("/posts", { params });
    return data;
  },
});
