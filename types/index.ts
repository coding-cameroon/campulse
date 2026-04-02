export interface Author {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  username?: string;
  avatarUrl?: string; // Maps to your $/images/icon.png or a URI
}

export interface Post {
  _id: string;
  author: Author;
  content: string;
  postImage?: string | any; // Supports both remote URIs and local require()
  likesCount: number;
  commentsCount: number;
  createdAt: string | Date;
  expiresAt: string | Date; // For your "24 hours" ephemeral logic
  isLikedByMe?: boolean;
}

export interface LostAndFoundPost {
  _id: string;
  author: Author;
  title: string; // Brief headline (e.g., "Silver iPhone 15")
  content: string; // Detailed description
  lastSeenLocation: string; // Where it was lost/found
  location: string; // Where the item/owner is now (e.g., "Security Office")
  contactNumber: string;
  images: string[];
  createdAt: string;
  expiresAt: string;
  likesCount: number;
  commentsCount: number;
}

export interface Polygon {
  longitude: number;
  latitude: number;
}

export interface InitialRegion {
  longitude: number;
  latitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export type EventCategory =
  | "Academic"
  | "Tech"
  | "Social"
  | "Career"
  | "Sports";

export interface CampusEvent {
  _id: string;
  title: string;
  location: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  time: string;
  description: string;
  category: EventCategory;

  author: Author;
  images: string[];
  isFree: boolean;
  price?: number;
  phoneNumber: string;

  // Metadata
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Comment {
  _id: string;
  postId: string;
  author: Author;
  content: string;
  createdAt: string | Date;
  expiresAt: string | Date;
}

export interface BottomSheetProps {
  replyingTo: Author;
  comments: Comment[];
}
// Props for the PostCard component
export interface PostCardProps {
  post: Post;
}
