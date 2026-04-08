import { COLORS } from "@/utils/colors";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { ArrowUp, MessageCircleMore, X } from "lucide-react-native";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Comment } from "../../types/index";

interface CommentsBottomSheetProps {
  comments: Comment[];
  onSendComment: (text: string) => Promise<void> | void;
  isLoading?: boolean;
}

const CommentsBottomSheet = forwardRef<BottomSheet, CommentsBottomSheetProps>(
  ({ comments, onSendComment, isLoading = false }, ref) => {
    const [commentText, setCommentText] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const snapPoints = useMemo(() => ["75%"], []);
    const { t } = useTranslation("wall");

    const handleCloseSheet = useCallback(() => {
      (ref as any).current?.close();
    }, [ref]);

    const handlePostComment = async () => {
      if (!commentText.trim()) return;

      setIsSubmitting(true);
      await onSendComment(commentText);
      setCommentText("");
      setIsSubmitting(false);
    };

    const renderComment = useCallback(({ item }: { item: Comment }) => {
      const isMe = false; // Replace with actual auth logic

      return (
        <View
          className={`flex-row px-4 py-2 gap-2 ${isMe ? "flex-row-reverse" : ""}`}
        >
          {/* Avatar */}
          <View className="size-8 rounded-full bg-zinc-800 overflow-hidden border border-zinc-700 mt-auto">
            {item.author.avatarUrl ? (
              <Image
                source={{ uri: item.author.avatarUrl }}
                className="w-full h-full"
              />
            ) : (
              <View className="w-full h-full items-center justify-center bg-zinc-700">
                <Text className="text-white text-[10px]">
                  {item.author.fullName?.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
          </View>

          {/* Bubble Container */}
          <View className={`max-w-[80%] ${isMe ? "items-end" : "items-start"}`}>
            {!isMe && (
              <Text className="text-zinc-500 text-[11px] font-bold ml-2 mb-1">
                {item.author.fullName}
              </Text>
            )}
            <View
              className={`px-3 py-2 rounded-2xl relative ${
                isMe
                  ? "bg-orange-500 rounded-br-sm"
                  : "bg-zinc-800 rounded-bl-sm"
              }`}
              style={isMe ? { backgroundColor: COLORS.accent } : null}
            >
              <Text className="text-white text-[15px] leading-5">
                {item.content}
              </Text>
              <Text className="text-zinc-500 text-[10px] mt-1 self-end">
                12:45
              </Text>
            </View>
          </View>
        </View>
      );
    }, []);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.7}
        />
      ),
      [],
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
        backdropComponent={renderBackdrop}
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
        backgroundStyle={{ backgroundColor: COLORS["dark-3"], borderRadius: 0 }}
        handleIndicatorStyle={{ backgroundColor: "#3f3f46", width: 40 }}
      >
        <View className="flex-1">
          {/* HEADER */}
          <View className="flex-row items-center justify-between px-4 pb-4 border-b border-zinc-900">
            <View className="flex-row gap-3 items-center">
              <View className="size-9 rounded-full bg-orange-500/10 items-center justify-center">
                <MessageCircleMore size={20} color="#f97316" />
              </View>
              <Text className="text-lg font-bold text-white">
                <Text className="text-zinc-500 font-medium">
                  {comments.length} comment(s)
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleCloseSheet}
              className="bg-zinc-800 size-8 items-center justify-center rounded-full"
            >
              <X color={"#a1a1aa"} size={18} />
            </TouchableOpacity>
          </View>

          {/* LIST */}
          <BottomSheetFlatList
            data={comments}
            keyExtractor={(item: any) => item._id}
            renderItem={renderComment}
            contentContainerStyle={{ paddingBottom: 500, paddingTop: 10 }}
            ListEmptyComponent={
              <View className="items-center justify-center pt-20">
                <Text className="text-zinc-500 text-base">
                  No Comments yet.
                </Text>
              </View>
            }
          />

          {/* ABSOLUTE INPUT CONTAINER */}
          <View
            className="absolute bottom-20 left-0 right-0 pt-3 pb-8 border-t"
            style={{
              backgroundColor: COLORS["dark-3"],
              borderTopColor: COLORS["dark-2"],
            }}
          >
            <View className="flex-row items-center gap-3 px-4">
              <BottomSheetTextInput
                placeholder={t("comments.placeholder")}
                placeholderTextColor="#71717a"
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-full text-white px-4 py-2 text-[15px]"
                value={commentText}
                onChangeText={setCommentText}
              />
              <TouchableOpacity
                disabled={isSubmitting}
                className="rounded-full size-9 items-center justify-center"
                style={{ backgroundColor: COLORS.accent }}
                onPress={handlePostComment}
              >
                {isSubmitting || isLoading ? (
                  <ActivityIndicator size="small" color="#000" />
                ) : (
                  <ArrowUp strokeWidth={3} size={20} color={COLORS["dark-3"]} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheet>
    );
  },
);

export default CommentsBottomSheet;
