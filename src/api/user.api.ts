import { AxiosInstance } from "axios";
import { User } from "../../types";

// ── Response shapes matching your server's response format ─────────────────
export type SyncUserResponse = {
  success: boolean;
  data: User;
  message: string;
};

export type GetMeResponse = {
  success: boolean;
  data: User;
  message: string;
};

export type GetUserResponse = {
  success: boolean;
  data: User;
  message: string;
};

export type DeactivateUserResponse = {
  success: boolean;
  data: User;
  message: string;
};

export type UpdateNameResponse = {
  success: boolean;
  data: User;
  message: string;
};

// ── API factory ─────────────────────────────────────────────────────────────
// Takes an axios instance and returns an object of API call functions
// Keeping it as a factory (not a hook) means the functions are pure
// and easy to test — the hook layer (useUser.ts) handles React concerns
export const userApi = (axios: AxiosInstance) => ({
  // POST /api/v1/users/sync
  // Called once after Clerk signup completes
  // Server reads the Clerk token, fetches user from Clerk,
  // generates anonymous name/avatar and saves to DB
  syncUser: async (): Promise<SyncUserResponse> => {
    const { data } = await axios.post("/users/sync");
    return data;
  },

  // GET /api/v1/users/me
  // Protected by requireAuth — returns the DB user matching the Clerk token
  getMe: async (): Promise<GetMeResponse> => {
    const { data } = await axios.get("/users/me");
    return data;
  },

  // PATCH /api/v1/users/:id/deactivate
  // Protected by requireAuth — returns the DB user matching the Clerk token
  deactivateUser: async (id: string): Promise<DeactivateUserResponse> => {
    const { data } = await axios.patch(`/users/${id}/deactivate`);
    return data;
  },

  // PATCH /api/v1/users/me
  // Updates only allowed fields — firstName, lastName, realAvatarUrl, coverImageUrl
  updateName: async (payload: {
    firstname: string;
    lastname: string;
  }): Promise<UpdateNameResponse> => {
    const { data } = await axios.put("/users/update/profile-name", payload);
    return data;
  },

  // PATCH /api/v1/users/me
  // Updates only allowed fields — firstName, lastName, realAvatarUrl, coverImageUrl
  getUser: async (id: string): Promise<GetUserResponse> => {
    const { data } = await axios.get(`/users/${id}`);
    return data;
  },
});
