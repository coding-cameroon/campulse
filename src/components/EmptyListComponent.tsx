import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ghost, RotateCcw, LucideIcon } from "lucide-react-native";
import { COLORS } from "@/utils/colors";

interface EmptyStateProps {
  title?: string;
  description?: string;
  Icon?: LucideIcon;
  actionText?: string;
  onAction?: () => void;
  showAction?: boolean;
}

const EmptyState = ({
  title = "No data found",
  description = "It looks like there's nothing here at the moment. Check back later!",
  Icon = Ghost,
  actionText = "Refresh",
  onAction,
  showAction = false,
}: EmptyStateProps) => {
  return (
    <View className="flex-1 items-center justify-center py-20 px-10">
      {/* Icon Container - Matches your "New Post" style */}
      <View className="bg-[#121212] p-6 rounded-full mb-6 border border-[#222]">
        <Icon size={48} color={COLORS.accent || "white"} strokeWidth={1.5} />
      </View>

      <Text className="text-white text-2xl font-[800] text-center mb-2 tracking-tight">
        {title}
      </Text>

      <Text className="text-white/50 text-center text-base leading-5 mb-10 font-medium">
        {description}
      </Text>

      {showAction && onAction && (
        <TouchableOpacity
          onPress={onAction}
          className="flex-row items-center bg-white py-3.5 px-8 rounded-full gap-2 shadow-sm"
          activeOpacity={0.8}
        >
          <RotateCcw size={18} color="black" />
          <Text className="text-black font-bold text-base">{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EmptyState;
