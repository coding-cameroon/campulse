// ENUMS
export type PostCategory = "feed" | "event" | "lost_found";
export type PostStatus = "active" | "expired" | "removed";
export type ItemStatus = "lost" | "found";
export type EventCategory =
  | "Academic"
  | "Tech"
  | "Social"
  | "Career"
  | "Sports";

// ACTUAL INTERFACES
export type Role = "student" | "admin";

export interface User {
  id: string;
  clerkId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  realAvatarUrl: string | null;
  coverAvatarUrl: string | null;
  realAvatarUrlId: string | null;
  coverAvatarUrlId: string | null;
  anonymousName: string;
  anonymousAvatarUrl: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  authorId: string;
  category: PostCategory;
  status: PostStatus;
  title: string | null;
  body: string;
  imageUrls: string[] | null;
  imageFileIds: string[] | null;

  // Anonymous Feed Fields
  anonName: string | null;
  anonAvatarUrl: string | null;

  // Real Identity Fields
  realName: string | null;
  realAvatarUrl: string | null;

  // Lost & Found Fields
  collectAt: string | null;
  lastSeenAt: string | null;
  phoneNumber: number | null;
  itemStatus: ItemStatus | null;

  // Event Fields
  price: number | null;
  eventCategory: EventCategory | null;
  isFree: boolean | null;
  eventLocation: string | null;
  eventStartAt: Date | null;
  eventEndAt: Date | null;
  mapCoordinates: {
    lat: number;
    lng: number;
  } | null;

  expiresAt: Date | null;
  reactionCount: number;
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  createdAt: Date;
  authorId: string;
  body: string;
  postId: string;
  author: User;
}

export type ReactionType = "like" | "heart" | "laugh" | "sad";

export interface Reaction {
  id: string;
  postId: string;
  userId: string;
  type: ReactionType;
  createdAt: Date;
}
