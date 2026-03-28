export interface Author {
  _id: string;
  fullName: string;
  email: string;
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

export interface Comment {
  _id: string;
  postId: string;
  userId: string;
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
