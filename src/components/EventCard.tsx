import { COLORS } from "@/utils/colors";
import { Clock, MapPin, Phone } from "lucide-react-native";
import React from "react";
import {
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
}

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className="mb-6 bg-zinc-900/50 rounded-3xl overflow-hidden border border-zinc-800"
    >
      {/* Image Gallery */}
      <FlatList
        data={event.images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width: SCREEN_WIDTH - 32, height: 220 }}
            className="bg-zinc-800"
          />
        )}
      />

      {/* Price Badge */}
      <View className="absolute top-4 right-4 bg-black/60 px-3 py-1.5 rounded-full border border-white/10">
        <Text className="text-white font-bold">
          {event.isFree ? "FREE" : `${event.price?.toLocaleString()} XAF`}
        </Text>
      </View>

      <View className="p-4">
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1">
            <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">
              {event.category}
            </Text>
            <Text className="text-xl font-bold text-white leading-7">
              {event.title}
            </Text>
          </View>
        </View>

        <Text className="text-zinc-400 text-sm mb-4" numberOfLines={2}>
          {event.description}
        </Text>

        <View className="flex-row flex-wrap gap-y-2">
          <View className="flex-row items-center mr-4">
            <MapPin size={14} color={COLORS.accent} />
            <Text className="text-zinc-300 text-xs ml-1">{event.location}</Text>
          </View>
          <View className="flex-row items-center">
            <Clock size={14} color={COLORS.accent} />
            <Text className="text-zinc-300 text-xs ml-1">{event.time}</Text>
          </View>
        </View>

        {/* Footer info */}
        <View className="mt-4 pt-4 border-t border-zinc-800 flex-row justify-between items-center">
          <View className="flex-row items-center gap-2">
            <View className="size-6 rounded-full bg-zinc-700 overflow-hidden">
              <Image
                source={{ uri: event.author.avatarUrl }}
                className="size-full"
              />
            </View>
            <Text className="text-zinc-500 text-xs">
              {event.author.fullName}
            </Text>
          </View>
          <TouchableOpacity className="flex-row items-center gap-1">
            <Phone size={14} color="#52525b" />
            <Text className="text-zinc-500 text-xs">{event.phoneNumber}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
