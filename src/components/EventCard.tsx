import { COLORS } from "@/utils/colors";
import dayjs from "dayjs";
import {
  ChevronRight,
  Clock,
  Heart,
  MapPin,
  MessageCircleMore,
} from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CampusEvent } from "../../types";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface EventCardProps {
  event: CampusEvent;
  onPress: () => void;
  // ✅ Screen passes this down — card just calls it with its own comments
  onCommentPress: (eventId: string) => void;
  commentCount?: number;
}

export const EventCard = ({
  event,
  onPress,
  onCommentPress,
  commentCount = 0,
}: EventCardProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(/*event?.likesCount ||*/ 0);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleLike = () => {
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setLikesCount((prev: any) => (newLiked ? prev + 1 : prev - 1));

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

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={onPress}
      className="mb-5 rounded-3xl overflow-hidden"
      style={{
        backgroundColor: "#0d0d0d",
        borderWidth: 1,
        borderColor: "#1a1a1a",
      }}
    >
      {/* ── IMAGE GALLERY ── */}
      <View>
        <FlatList
          data={event.images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(
              e.nativeEvent.contentOffset.x / (SCREEN_WIDTH - 32),
            );
            setActiveImageIndex(index);
          }}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{ width: SCREEN_WIDTH - 32, height: 210 }}
              resizeMode="cover"
            />
          )}
        />

        {/* Image dots */}
        {event.images.length > 1 && (
          <View className="absolute bottom-3 left-0 right-0 flex-row justify-center gap-1.5">
            {event.images.map((_, i) => (
              <View
                key={i}
                className="rounded-full"
                style={{
                  width: i === activeImageIndex ? 16 : 5,
                  height: 5,
                  backgroundColor:
                    i === activeImageIndex
                      ? COLORS.accent
                      : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </View>
        )}

        {/* Category pill */}
        <View
          className="absolute top-3 left-3 px-3 py-1 rounded-full"
          style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
        >
          <Text
            className="text-[10px] font-black uppercase tracking-widest"
            style={{ color: COLORS.accent }}
          >
            {event.category}
          </Text>
        </View>

        {/* Price badge */}
        <View
          className="absolute top-3 right-3 px-3 py-1 rounded-full"
          style={{
            backgroundColor: event.isFree
              ? "rgba(34,197,94,0.15)"
              : "rgba(239,68,68,0.15)",
            borderWidth: 1,
            borderColor: event.isFree
              ? "rgba(34,197,94,0.3)"
              : "rgba(239,68,68,0.3)",
          }}
        >
          <Text
            className="text-[11px] font-black"
            style={{ color: event.isFree ? "#22c55e" : "#ef4444" }}
          >
            {event.isFree ? "FREE" : `${event.price?.toLocaleString()} XAF`}
          </Text>
        </View>
      </View>

      {/* ── CARD BODY ── */}
      <View className="px-4 pt-4 pb-3">
        {/* Title */}
        <View className="flex-row items-start justify-between mb-1.5">
          <Text
            className="text-white text-[18px] font-black leading-tight flex-1 pr-2"
            numberOfLines={2}
          >
            {event.title}
          </Text>
          <View className="mt-1">
            <ChevronRight size={18} color="#3f3f46" />
          </View>
        </View>

        {/* Description */}
        <Text
          className="text-zinc-500 text-[13px] leading-5 mb-4"
          numberOfLines={2}
        >
          {event.description}
        </Text>

        {/* Meta */}
        <View className="flex-row flex-wrap gap-y-2 gap-x-4 mb-4">
          <View className="flex-row items-center gap-1.5">
            <View
              className="p-1 rounded-md"
              style={{ backgroundColor: `${COLORS.accent}15` }}
            >
              <MapPin size={11} color={COLORS.accent} />
            </View>
            <Text
              className="text-zinc-400 text-xs font-semibold"
              numberOfLines={1}
            >
              {event.location}
            </Text>
          </View>

          <View className="flex-row items-center gap-1.5">
            <View
              className="p-1 rounded-md"
              style={{ backgroundColor: `${COLORS.accent}15` }}
            >
              <Clock size={11} color={COLORS.accent} />
            </View>
            <Text className="text-zinc-400 text-xs font-semibold">
              {dayjs(event.time).format("MMM DD · hh:mm A")}
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View className="h-px bg-zinc-900 mb-3" />

        {/* ── FOOTER ── */}
        <View className="flex-row items-center justify-between">
          {/* Author */}
          <View className="flex-row items-center gap-2">
            <View
              className="size-7 rounded-full overflow-hidden"
              style={{ borderWidth: 1.5, borderColor: COLORS.accent + "40" }}
            >
              <Image
                source={{ uri: event.author.avatarUrl }}
                className="size-full"
              />
            </View>
            <View>
              <Text className="text-zinc-300 text-[12px] font-bold">
                {event.author.fullName}
              </Text>
              <Text className="text-zinc-600 text-[10px] font-semibold uppercase tracking-wide">
                {event.author.role}
              </Text>
            </View>
          </View>

          {/* Actions */}
          <View className="flex-row items-center gap-3">
            {/* Phone */}
            {/* <TouchableOpacity
              className="flex-row gap-1.5 items-center justify-center bg-white/5 p-2 px-4 rounded-full border-[0.5px]"
              style={{ borderColor: "#1f1f1f" }}
            >
              <Phone size={14} color="#52525b" />
              <Text className="text-zinc-500 text-xs font-bold">Call</Text>
            </TouchableOpacity> */}

            {/* Like */}
            <TouchableOpacity
              onPress={handleLike}
              activeOpacity={0.7}
              className="flex-row gap-1.5 items-center justify-center bg-white/5 p-2 px-4 rounded-full border-[0.5px]"
              style={{ borderColor: "#1f1f1f" }}
            >
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <Heart
                  size={14}
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

            {/* Comment — calls screen-level handler */}
            <TouchableOpacity
              onPress={() => onCommentPress(event._id)}
              className="flex-row gap-1.5 items-center justify-center bg-white/5 p-2 px-4 rounded-full border-[0.5px]"
              style={{ borderColor: "#1f1f1f" }}
            >
              <MessageCircleMore size={14} color="white" />
              <Text className="text-white font-bold text-xs">
                {commentCount}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
