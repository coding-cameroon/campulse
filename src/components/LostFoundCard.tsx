import { Fontisto } from "@expo/vector-icons";
import {
  BrickWallFire,
  Heart,
  MapPin,
  MessageCircleMore,
  Phone,
} from "lucide-react-native";
import React, { useMemo, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { formatDate, getTimeLeft } from "@/utils/date";
import { Post } from "../../types";
import SimpleImageAlert from "./ImageOverLay";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const LostAndFoundCard = ({
  post,
  onPressItem,
}: {
  post: Post;
  onPressItem: () => void;
}) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [likesCount, setLikesCount] = useState(post.reactionCount ?? 0);
  const [isLiked, setIsLiked] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Optimized style calculation
  const statusConfig = useMemo(() => {
    const isLost = post.itemStatus === "lost";
    return {
      container: isLost
        ? "bg-red-500/10 border-red-500/40"
        : "bg-green-500/10 border-green-500/40",
      text: isLost ? "text-red-500" : "text-green-500",
    };
  }, [post.itemStatus]);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
    }

    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.4,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleWhatsApp = () => {
    const message = `Hello! I'm reaching out regarding the *Lost & Found* post for: *${post.title}* 🔍\n\n📍 *Found at/near:* ${post.lastSeenAt}\n📝 *Description:* ${post.body}`;
    // Using string template for phone number to prevent overflow issues
    const phoneStr = `${post.phoneNumber}`;
    const url = `whatsapp://send?phone=${phoneStr}&text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url).then((supported) => {
      const targetUrl = supported
        ? url
        : `https://wa.me/${phoneStr}?text=${encodeURIComponent(message)}`;
      Linking.openURL(targetUrl);
    });
  };

  const handleCall = () => {
    const url = `tel:${post.phoneNumber}`;
    Linking.canOpenURL(url).then((supported) => {
      supported
        ? Linking.openURL(url)
        : Alert.alert("Error", "Calling not supported.");
    });
  };

  return (
    <View className="flex-row gap-3 items-start justify-center mb-8 px-2">
      {/* Avatar Section */}
      <View className="overflow-hidden rounded-full border border-gray-800 bg-dark-1">
        <Image
          source={
            post.realAvatarUrl
              ? { uri: post.realAvatarUrl }
              : require("$/images/icon.png")
          }
          className="w-9 h-9"
          resizeMode="cover"
        />
      </View>

      <View className="flex-1 rounded-2xl overflow-hidden border-[0.5px] border-dark-1 bg-dark-2/60">
        {/* Header */}
        <View className="flex-row items-center justify-between p-3 pb-1">
          <View className="flex-1 mr-2 flex-row gap-2 items-center">
            <Text className="text-base font-bold text-white" numberOfLines={1}>
              {post.realName || post.anonName}
            </Text>
            <Text className="text-xs font-bold text-gray">
              • {formatDate(post.createdAt)}
            </Text>
          </View>

          <View className="flex-row items-center gap-1 bg-orange-500/10 rounded-full border-[0.5px] border-orange-500/50 p-1 px-3">
            <BrickWallFire size={12} color="#f97316" />
            <Text className="text-orange-500 text-[10px] font-black uppercase">
              {getTimeLeft(post.expiresAt as Date)}
            </Text>
          </View>
        </View>

        {/* Content */}
        <View className="px-3 py-2">
          <Text className="text-lg text-white font-bold leading-5 mb-1">
            {post.title}
          </Text>
          <Text className="text-[15px] text-white/90 font-medium leading-5">
            {post.body}
          </Text>
        </View>

        {/* Image Carousel */}
        {post.imageUrls && post.imageUrls.length > 0 && (
          <View>
            <FlatList
              data={post.imageUrls}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setSelectedImg(item)}
                  style={{ width: SCREEN_WIDTH * 0.78 }}
                  className="px-3 pb-2"
                >
                  <Image
                    source={{ uri: item }}
                    className="w-full rounded-xl bg-dark-1"
                    style={{ aspectRatio: 1 }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* Meta Info */}
        <View className="px-3 mb-1 mt-2 flex-row items-center justify-between">
          <View className="flex-row items-center gap-1.5 flex-1 mr-2">
            <MapPin size={13} color="#9ca3af" />
            <Text className="text-gray text-[10px] font-bold uppercase tracking-tighter">
              found at
            </Text>
            <Text
              className="text-white text-md font-bold flex-1"
              numberOfLines={1}
            >
              {post.lastSeenAt}
            </Text>
          </View>

          <View
            className={`p-1 px-4 rounded-full border-[0.5px] ${statusConfig.container}`}
          >
            <Text
              className={`text-[10px] font-black uppercase tracking-widest ${statusConfig.text}`}
            >
              {post.itemStatus}
            </Text>
          </View>
        </View>

        {/* Centered Footer Buttons */}
        <View className="flex-row w-full items-center justify-between py-4 px-3">
          <View className="flex-row items-center justify-center gap-3">
            {/* Contact Actions */}
            <TouchableOpacity
              onPress={handleCall}
              className="bg-blue-500/10 p-2.5 px-5 rounded-full border-[0.5px] border-blue-500/40"
            >
              <Phone size={18} color="#3b82f6" strokeWidth={2.5} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleWhatsApp}
              className="bg-green-500/10 p-2.5 px-5 rounded-full border-[0.5px] border-green-500/40"
            >
              <Fontisto name="whatsapp" size={18} color="#22c55e" />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center justify-center gap-3">
            {/* Engagement Actions */}
            <TouchableOpacity
              onPress={handleLike}
              className="flex-row gap-2 items-center bg-white/5 p-2.5 px-5 rounded-full border-[0.5px] border-dark-1"
            >
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <Heart
                  size={18}
                  color={isLiked ? "#ef4444" : "white"}
                  fill={isLiked ? "#ef4444" : "transparent"}
                />
              </Animated.View>
              <Text className="font-bold text-xs text-white">{likesCount}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onPressItem}
              className="flex-row gap-2 items-center bg-white/5 p-2.5 px-5 rounded-full border-[0.5px] border-dark-1"
            >
              <MessageCircleMore size={18} color="white" />
              <Text className="font-bold text-xs text-white">
                {post.commentCount ?? 0}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <SimpleImageAlert
        visible={!!selectedImg}
        onClose={() => setSelectedImg(null)}
        imageSource={{ uri: selectedImg || "" }}
      />
    </View>
  );
};

export default LostAndFoundCard;
