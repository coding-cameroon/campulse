export const queryKeys = {
  user: {
    me: ["user", "me"] as const,
  },
  posts: {
    all: (params: object) => ["posts", params] as const,
    single: (id: string) => ["posts", id] as const,
  },
  comments: {
    all: (postId: string) => ["comments", postId] as const,
  },
};
