import { COLORS } from "@/utils/colors";
import {
  BrickWallFire,
  Heart,
  MessageCircleMore,
  Share2,
} from "lucide-react-native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";

interface PostCardProps {
  userImage?: any;
  username: string;
  timeAgo: string;
  timeLeft: string;
  content: string;
  postImage?: any;
  likes: number;
  comments: number;
  onAvatarPress?: () => void;
}

const PostCard = ({
  userImage,
  username,
  timeAgo,
  timeLeft,
  content,
  postImage,
  likes,
  comments,
  onAvatarPress,
}: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const scale = useSharedValue(1);

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleLike = () => {
    const newValue = !isLiked;
    setIsLiked(newValue);

    if (newValue) {
      // Pumping/Pulse animation sequence
      scale.value = withSequence(
        withSpring(1.4), // Expand
        withSpring(1.0), // Settle back
      );
    }
  };

  return (
    <View style={styles.cardContainer}>
      {/* LEFT SIDE: AVATAR */}
      <View style={styles.avatarColumn}>
        <TouchableOpacity onPress={onAvatarPress} activeOpacity={0.8}>
          <Image
            resizeMode="cover"
            source={userImage || require("$/images/icon.png")}
            style={styles.avatar}
          />
        </TouchableOpacity>
        {/* Stroke/Vertical Line removed as requested */}
      </View>

      {/* RIGHT SIDE: CONTENT */}
      <View style={styles.contentColumn}>
        <View style={styles.headerRow}>
          <View style={styles.userInfo}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.timeAgo}>{timeAgo}</Text>
          </View>

          <View style={styles.timerBadge}>
            <BrickWallFire size={14} color="#FF4500" />
            <Text style={styles.timerText}>{timeLeft}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.contentText}>{content}</Text>
        </View>

        {postImage && (
          <View style={styles.imageContainer}>
            <Image
              resizeMode="cover"
              source={postImage}
              style={styles.postMedia}
            />
          </View>
        )}

        {/* FOOTER: INTERACTIONS */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.interactionButton}
            onPress={handleLike}
            activeOpacity={0.7}
          >
            <Animated.View style={heartStyle}>
              <Heart
                size={20}
                color={isLiked ? "#FF3B30" : COLORS.gray}
                fill={isLiked ? "#FF3B30" : "transparent"}
              />
            </Animated.View>
            <Text
              style={[styles.interactionText, isLiked && { color: "#FF3B30" }]}
            >
              {isLiked ? likes + 1 : likes}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.interactionButton}
            activeOpacity={0.6}
          >
            <MessageCircleMore size={20} color={COLORS.gray} />
            <Text style={styles.interactionText}>{comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.interactionButton}
            activeOpacity={0.6}
          >
            <Share2 size={18} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "black",
    padding: 16,
    // Bottom border removed for a "floating" or "seamless" unique look
  },
  avatarColumn: {
    alignItems: "center",
    marginRight: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#333", // Subtle border for the avatar itself
  },
  contentColumn: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  username: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
  dot: {
    color: COLORS.gray,
    fontSize: 12,
  },
  timeAgo: {
    color: COLORS.gray,
    fontSize: 14,
  },
  timerBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 69, 0, 0.05)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8, // More angular, modern look
    gap: 4,
    borderWidth: 1, // Added border as requested
    borderColor: "rgba(255, 69, 0, 0.3)",
  },
  timerText: {
    color: "#FF4500",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  body: {
    marginBottom: 12,
  },
  contentText: {
    color: "#E1E1E1",
    fontSize: 15,
    lineHeight: 22,
  },
  imageContainer: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#222",
    marginBottom: 12,
  },
  postMedia: {
    width: "100%",
    height: 250,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 40,
    marginTop: 4,
  },
  interactionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  interactionText: {
    color: COLORS.gray,
    fontSize: 13,
    fontWeight: "600",
  },
});

export default PostCard;
