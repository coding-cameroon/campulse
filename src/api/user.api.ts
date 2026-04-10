import { AxiosInstance } from "axios";
import { User } from "../../types";

export type SyncUserResponse = {
  success: boolean;
  data: User;
  message: string;
};

export const userApi = (axios: AxiosInstance) => ({
  syncUser: async (): Promise<SyncUserResponse> => {
    const { data } = await axios.post("/api/users/sync");
    return data;
  },

  getMe: async (): Promise<SyncUserResponse> => {
    const { data } = await axios.get("/api/users/me");
    return data;
  },

  updateMe: async (payload: {
    firstName?: string;
    lastName?: string;
    realAvatarUrl?: string;
    coverImageUrl?: string;
  }): Promise<SyncUserResponse> => {
    const { data } = await axios.patch("/api/users/me", payload);
    return data;
  },
});
