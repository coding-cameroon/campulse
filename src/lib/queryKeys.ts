// ── Centralized query key registry ─────────────────────────────────────────
// All React Query cache keys live here
// Using "as const" makes the arrays readonly tuples — TypeScript can
// infer exact types instead of just string[]
// This prevents typos and makes invalidation reliable across the app
export const queryKeys = {
  user: {
    // ["user", "me"] — identifies the current logged-in user's data
    me: ["user", "me"] as const,
    single: (id: string) => ["user", id] as const
  },
  posts: {
    // ["posts", { page, limit, category }] — parameterized list
    // Different params = different cache entries automatically
    all: (params: object) => ["posts", params] as const,
    // ["posts", "abc123"] — single post by id
    single: (id: string) => ["posts", id] as const,
  },
  comments: {
    // ["comments", "postId"] — all comments for a specific post
    all: (postId: string) => ["comments", postId] as const,
  },
};
