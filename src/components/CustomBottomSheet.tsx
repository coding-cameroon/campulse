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
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Comment } from "../../types/index";

interface CommentsBottomSheetProps {
  comments: Comment[];
  onSendComment: (text: string) => Promise<void> | void;
  isLoading?: boolean;
  onClose?: () => void; // ✅ added
}

const CommentsBottomSheet = forwardRef<BottomSheet, CommentsBottomSheetProps>(
  ({ comments, onSendComment, isLoading = false, onClose }, ref) => {
    const [commentText, setCommentText] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const snapPoints = useMemo(() => ["70%"], []);
    const { t } = useTranslation("wall");

    const handleCloseSheet = useCallback(() => {
      (ref as any).current?.close();
      onClose?.(); // ✅ notify parent when closed via X button
    }, [ref, onClose]);

    const handlePostComment = async () => {
      if (!commentText.trim()) return;
      setIsSubmitting(true);
      await onSendComment(commentText);
      setCommentText("");
      setIsSubmitting(false);
    };

    const renderComment = useCallback(({ item }: { item: Comment }) => {
      const isMe = false;

      return (
        <View
          className={`flex-row px-4 py-2 gap-2.5 ${isMe ? "flex-row-reverse" : ""}`}
        >
          {/* ── AVATAR ── */}
          <View className="size-8 rounded-full bg-zinc-800 overflow-hidden border border-zinc-700/50 mt-auto shrink-0">
            {item.author.avatarUrl ? (
              <Image
                source={{ uri: item.author.avatarUrl }}
                className="w-full h-full"
              />
            ) : (
              <View className="w-full h-full items-center justify-center bg-zinc-700">
                <Text className="text-white text-[10px] font-black">
                  {item.author.fullName?.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
          </View>

          {/* ── BUBBLE ── */}
          <View className={`max-w-[78%] ${isMe ? "items-end" : "items-start"}`}>
            {!isMe && (
              <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-wider ml-3 mb-1">
                {item.author.fullName}
              </Text>
            )}

            <View
              className={`px-4 py-2.5 rounded-2xl ${
                isMe ? "rounded-br-sm" : "rounded-bl-sm"
              }`}
              style={{
                backgroundColor: isMe ? COLORS.accent : "#1c1c1e",
                borderWidth: isMe ? 0 : 1,
                borderColor: "#27272a",
              }}
            >
              <Text
                className="text-white text-[14px] leading-5 font-medium"
                style={{ color: isMe ? "#000" : "#fff" }}
              >
                {item.content}
              </Text>

              <Text
                className="text-[10px] mt-1.5 self-end font-semibold"
                style={{ color: isMe ? "rgba(0,0,0,0.4)" : "#52525b" }}
              >
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
          opacity={0.75}
          pressBehavior="none"
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
        onChange={(index) => {
          // ✅ also notify parent when sheet is closed by any means
          if (index === -1) onClose?.();
        }}
        backgroundStyle={{
          backgroundColor: "#0a0a0a",
          borderRadius: 24,
          borderWidth: 1,
          borderColor: "#1a1a1a",
        }}
        handleIndicatorStyle={{ display: "none" }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
        >
          {/* ── HEADER ── */}
          <View className="flex-row items-center justify-between px-5 py-4 border-b border-zinc-900">
            <View className="flex-row items-center gap-3">
              <View
                className="size-10 rounded-2xl items-center justify-center"
                style={{ backgroundColor: `${COLORS.accent}18` }}
              >
                <MessageCircleMore size={20} color={COLORS.accent} />
              </View>
              <View>
                <Text className="text-white text-base font-black">
                  {t("comments.title") || "Comments"}
                </Text>
                <Text className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest">
                  {comments.length}{" "}
                  {comments.length === 1
                    ? t("comments.singular") || "reply"
                    : t("comments.plural") || "replies"}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleCloseSheet}
              className="bg-zinc-800 size-9 items-center justify-center rounded-full border border-zinc-700"
            >
              <X color="#a1a1aa" size={16} />
            </TouchableOpacity>
          </View>

          {/* ── COMMENT LIST ── */}
          <BottomSheetFlatList
            data={comments}
            keyExtractor={(item: any) => item._id + Math.random() * 10000}
            renderItem={renderComment}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16, paddingTop: 12 }}
            style={{ flex: 1 }}
            ListEmptyComponent={
              <View className="items-center justify-center pt-16 gap-3">
                <View className="size-16 rounded-full bg-zinc-900 items-center justify-center border border-zinc-800">
                  <MessageCircleMore size={28} color="#3f3f46" />
                </View>
                <View className="items-center gap-1">
                  <Text className="text-zinc-400 font-bold text-base">
                    {t("comments.empty.title") || "No comments yet"}
                  </Text>
                  <Text className="text-zinc-600 text-sm font-medium">
                    {t("comments.empty.subtitle") || "Be the first to reply"}
                  </Text>
                </View>
              </View>
            }
          />

          {/* ── INPUT BAR ── */}
          <View
            className="px-4 pt-3 pb-8 border-t border-zinc-900"
            style={{ backgroundColor: "#0a0a0a" }}
          >
            <View className="flex-row items-center gap-3">
              <View className="flex-1 flex-row items-center bg-zinc-900 border border-zinc-800 rounded-full px-4 h-12">
                <BottomSheetTextInput
                  placeholder={
                    t("comments.placeholder") || "Write a comment..."
                  }
                  placeholderTextColor="#52525b"
                  style={{ flex: 1, color: "white", fontSize: 14 }}
                  value={commentText}
                  onChangeText={setCommentText}
                  multiline={false}
                />
              </View>

              <TouchableOpacity
                disabled={isSubmitting || !commentText.trim()}
                onPress={handlePostComment}
                className="size-12 rounded-full items-center justify-center"
                style={{
                  backgroundColor: commentText.trim()
                    ? COLORS.accent
                    : "#1c1c1e",
                  borderWidth: 1,
                  borderColor: commentText.trim() ? COLORS.accent : "#27272a",
                }}
              >
                {isSubmitting || isLoading ? (
                  <ActivityIndicator size="small" color="#000" />
                ) : (
                  <ArrowUp
                    strokeWidth={2.5}
                    size={18}
                    color={commentText.trim() ? "#000" : "#3f3f46"}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </BottomSheet>
    );
  },
);

export default CommentsBottomSheet;
