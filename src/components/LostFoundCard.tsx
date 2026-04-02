import {
  BrickWallFire,
  Heart,
  MapPin,
  MessageCircleMore,
  Phone,
} from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
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
import { Fontisto } from "@expo/vector-icons";
import { Alert } from "react-native";
import { LostAndFoundPost } from "../../types";
import SimpleImageAlert from "./ImageOverLay";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const LostAndFoundCard = ({
  post,
  onPressItem,
}: {
  post: LostAndFoundPost;
  onPressItem: () => void;
}) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false); // 1. Track like state locally

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleLike = () => {
    // setLikesCount((prev) => prev + 1);
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
    const cleanNumber = post.contactNumber.replace(/[^\d]/g, "");

    const fullNumber = cleanNumber.startsWith("237")
      ? cleanNumber
      : `237${cleanNumber}`;

    const message = `Hello! I'm reaching out regarding the *Lost & Found* post for: *${post.title}* 🔍

📍 *Found at/near:* ${post.location}
📝 *Description:* ${post.content}

I believe this belongs to me (or I have found this item). Please let me know how we can coordinate the return. Thank you!`;

    const url = `whatsapp://send?phone=${fullNumber}&text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Linking.openURL(
          `https://wa.me/${fullNumber}?text=${encodeURIComponent(message)}`,
        );
      }
    });
  };

  const handleCall = () => {
    const cleanNumber = post.contactNumber.replace(/[^\d+]/g, "");
    const url = `tel:${cleanNumber}`;

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Error", "Phone calls are not supported on this device.");
      }
    });
  };

  return (
    <View className="flex-row gap-3 items-start justify-center mb-8 px-2">
      {/* User Avatar using Author Type */}
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
        {/* Header - Using fullName and username */}
        <View className="flex-row items-center justify-between p-3 pb-1">
          <View className="flex-1 mr-2 flex-row gap-2 items-center">
            <Text
              className="text-[16px] font-bold text-white"
              numberOfLines={1}
            >
              {post.author.fullName || post.author.username}
            </Text>
            <Text className="text-sm font-bold text-gray">
              • {formatDate(post.createdAt)}
            </Text>
          </View>

          <View className="flex-row items-center gap-1 bg-orange-500/10 rounded-full border-[0.5px] border-orange-500/50 p-1 px-3">
            <BrickWallFire size={12} color="#f97316" />
            <Text className="text-orange-500 text-[10px] font-black uppercase">
              {getTimeLeft(post.expiresAt)}
            </Text>
          </View>
        </View>

        {/* Post Content */}
        <View className="px-3 py-2">
          <Text className="text-[17px] text-white font-bold leading-5 mb-2">
            {post.title}
          </Text>
          <Text className="text-[15px] text-white font-medium leading-5">
            {post.content}
          </Text>
        </View>

        {/* Multiple Images */}
        {post.images && post.images.length > 0 && (
          <View>
            <FlatList
              data={post.images}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const index = Math.round(
                  e.nativeEvent.contentOffset.x / (SCREEN_WIDTH * 0.7),
                );
                setActiveIndex(index);
              }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setSelectedImg(item)}
                  style={{ width: SCREEN_WIDTH * 0.78 }}
                  className="px-3 pb-2"
                >
                  <Image
                    source={{ uri: item }}
                    className="w-full rounded-xl"
                    style={{ aspectRatio: 1 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* Location & Time */}
        <View className="px-3 mb-1 mt-2">
          <View className="flex-row items-center gap-1">
            <MapPin size={13} color="#fff" />
            <Text className="text-gray text-xs font-bold uppercase">
              found at{" "}
            </Text>
            <Text className="text-gray-400 text-lg font-bold text-white">
              {post.location}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View className="flex-row items-center justify-between px-3 mb-4 mt-1">
          <View className="flex-row gap-3 mt-4">
            {/* Phone Call Button */}
            <TouchableOpacity
              onPress={handleCall} // Assuming you have a separate call handler
              className="bg-blue-500/10 p-2.5 px-5 rounded-full border-[0.5px] border-blue-500/40"
            >
              <Phone size={16} color="#3b82f6" strokeWidth={2.5} />
            </TouchableOpacity>

            {/* WhatsApp Button */}
            <TouchableOpacity
              onPress={handleWhatsApp}
              className="bg-green-500/10 p-2.5 px-5 rounded-full border-[0.5px] border-green-500/40"
            >
              <Fontisto name="whatsapp" size={16} color="#22c55e" />
            </TouchableOpacity>
          </View>

          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={handleLike}
              className="flex-row gap-1.5 items-center bg-white/5 p-2 px-4 rounded-full border-[0.5px] border-dark-1"
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
              className="flex-row gap-1.5 items-center bg-white/5 p-2 px-4 rounded-full border-[0.5px] border-dark-1"
            >
              <MessageCircleMore size={18} color="white" />
              <Text className="font-bold text-xs text-white">{likesCount}</Text>
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
