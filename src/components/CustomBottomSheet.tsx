import { COLORS } from "@/utils/colors";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { ArrowUp, MessageCircleMore, X } from "lucide-react-native";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Comment } from "../../types/index";

// 1. Define the Props interface
interface CommentsBottomSheetProps {
  comments: Comment[];
  onSendComment: (text: string) => Promise<void> | void;
  isLoading?: boolean;
}

const CommentsBottomSheet = forwardRef<BottomSheet, CommentsBottomSheetProps>(
  ({ comments, onSendComment, isLoading = false }, ref) => {
    const [commentText, setCommentText] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const snapPoints = useMemo(() => ["25%", "50%", "75%", "80%"], []);

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
      // You can check if the item.author._id === currentUserId to align right
      const isMe = false;

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
              style={[
                styles.bubble,
                isMe ? styles.bubbleMe : styles.bubbleThem,
              ]}
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
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.indicator}
      >
        <View style={styles.contentContainer}>
          {/* HEADER */}
          <View className="flex-row items-center justify-between px-4 pb-4 border-b border-zinc-900">
            <View className="flex-row gap-3 items-center">
              <View className="size-9 rounded-full bg-orange-500/10 items-center justify-center">
                <MessageCircleMore size={20} color="#f97316" />
              </View>
              <Text className="text-lg font-bold text-white">
                Comments{" "}
                <Text className="text-zinc-500 font-medium">
                  ({comments.length})
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
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View className="items-center justify-center pt-20">
                <Text className="text-zinc-500 text-base">
                  No comments yet.
                </Text>
              </View>
            }
          />

          {/* ABSOLUTE INPUT CONTAINER */}
          <View style={styles.inputWrapper}>
            <View className="flex-row items-center gap-3 px-4">
              <BottomSheetTextInput
                placeholder="Write a comment..."
                placeholderTextColor="#71717a"
                style={styles.inputField}
                value={commentText}
                onChangeText={setCommentText}
              />
              <TouchableOpacity
                disabled={isSubmitting}
                style={styles.sendButton}
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

const styles = StyleSheet.create({
  sheetBackground: {
    borderRadius: 0,
    backgroundColor: COLORS["dark-3"],
  },
  indicator: {
    backgroundColor: "#3f3f46",
    width: 40,
  },
  contentContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100, // Room for the input box
    paddingTop: 10,
  },
  inputWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 12,
    paddingBottom: 30, // Increased for safe area/aesthetic
    backgroundColor: COLORS["dark-3"],
    borderTopWidth: 1,
    borderTopColor: COLORS["dark-2"],
  },
  inputField: {
    flex: 1,
    backgroundColor: "#121212",
    borderWidth: 1,
    borderColor: "#27272a",
    borderRadius: 24,
    color: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
  },
  sendButton: {
    borderRadius: 50,
    width: 35,
    height: 35,
    backgroundColor: COLORS.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  bubble: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    position: "relative",
  },
  bubbleThem: {
    backgroundColor: "#27272a",
    borderBottomLeftRadius: 4,
  },
  bubbleMe: {
    backgroundColor: COLORS.accent,
    borderBottomRightRadius: 4,
  },
});

export default CommentsBottomSheet;
