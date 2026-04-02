import { BrickWallFire, Heart, MessageCircleMore } from "lucide-react-native";
import React, { useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";

import { formatDate, getTimeLeft } from "@/utils/date";
import { Post } from "../../types";
import SimpleImageAlert from "./ImageOverLay";

const PostCard = ({
  post,
  onPressEvent,
}: {
  post: Post;
  onPressEvent: (id: string) => void;
}) => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isLiked, setIsLiked] = useState(post.isLikedByMe || false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);

  // 1. Initialize the scale value (starting at 1)
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleLike = () => {
    // 2. Toggle state
    const newLikedStatus = !isLiked;
    setIsLiked(newLikedStatus);
    setLikesCount((prev) => (newLikedStatus ? prev + 1 : prev - 1));

    // 3. Trigger the Pulse Sequence
    Animated.sequence([
      // Scale up to 1.4x
      Animated.spring(scaleAnim, {
        toValue: 1.4,
        friction: 3,
        useNativeDriver: true,
      }),
      // Snap back to 1x
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View className="flex-row gap-3 items-start justify-center mb-8 ">
      {/* User Avatar */}
      <View className="overflow-hidden rounded-full border border-gray-800">
        <Image
          source={
            post.author.avatarUrl
              ? { uri: post.author.avatarUrl }
              : require("$/images/icon.png")
          }
          className="w-[35px] h-[35px]"
          resizeMode="cover"
        />
      </View>

      <View className="flex-1 rounded-2xl overflow-hidden border-[0.5px] border-dark-1 bg-dark-2/60">
        {/* Header */}
        <View className="flex-row items-center justify-between p-3 pb-1">
          <View className="flex-row gap-2 items-center">
            <Text className="text-[17px] font-bold text-white">
              {post.author.username}
            </Text>
            <Text
              className="text-md font-semibold text-gray-300"
              style={{ color: "white" }}
            >
              •
            </Text>
            <Text className="text-sm font-bold text-white">
              {formatDate(post.createdAt)}
            </Text>
          </View>

          {/* Time Left Badge */}
          <View className="flex-row items-center gap-1 bg-orange-500/10 rounded-full border-[0.5px] border-orange-500/50 p-1 px-3">
            <BrickWallFire size={12} color="#f97316" />
            <Text className="text-orange-500 text-[10px] font-black uppercase">
              {getTimeLeft(post.expiresAt)}
            </Text>
          </View>
        </View>

        {/* Post Content */}
        <View className="px-3 py-2 mb-2">
          <Text className="text-[15px] text-white font-semibold leading-5">
            {post.content}
          </Text>
        </View>

        {/* Main Post Image */}
        {post.postImage && (
          <TouchableOpacity
            onPress={() => {
              setSelectedImg(post.postImage);
            }}
            className="px-3 pb-2"
          >
            <Image
              source={
                typeof post.postImage === "string"
                  ? { uri: post.postImage }
                  : post.postImage
              }
              className="w-full rounded-xl"
              style={{ aspectRatio: 1 }} // Keeps it square but shows the full image inside
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}

        <SimpleImageAlert
          visible={!!selectedImg}
          onClose={() => setSelectedImg(null)}
          imageSource={
            typeof selectedImg === "string" ? { uri: selectedImg } : selectedImg
          }
        />

        {/* Footer Actions */}
        <View className="flex-row items-center justify-end px-3 gap-3 mb-4 mt-1">
          <TouchableOpacity
            onPress={handleLike}
            activeOpacity={0.7}
            className="flex-row gap-1.5 items-center justify-center bg-white/5 p-2 px-4 rounded-full border-[0.5px] border-dark-1"
          >
            {/* 4. Wrap the Icon in an Animated View to apply the scale */}
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Heart
                size={18}
                color={isLiked ? "#FF4D4D" : "white"}
                fill={isLiked ? "#FF4D4D" : "transparent"}
              />
            </Animated.View>

            <Text
              className={`font-bold text-xs ${isLiked ? "text-[#FF4D4D]" : "text-white"}`}
            >
              {likesCount}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onPressEvent(post._id)}
            className="flex-row gap-1.5 items-center justify-center bg-white/5 p-2 px-4 border-[0.5px] border-dark-1 rounded-full"
          >
            <MessageCircleMore size={18} color="white" />
            <Text className="text-white font-bold text-xs">
              {post.commentsCount}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostCard;
