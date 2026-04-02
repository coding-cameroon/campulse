import { MOCK_COMMENTS } from "$/data/comments";
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

const CustomBottomSheet = forwardRef<BottomSheet, { postId: string | null }>(
  ({ postId }, ref) => {
    const [comment, setComment] = useState<string>();
    const [commenting, setCommenting] = useState<boolean>(false);
    const snapPoints = useMemo(() => ["25%", "50%", "70%", "80%"], []);

    const comments = useMemo(
      () => MOCK_COMMENTS.filter((cmt) => cmt.postId === postId),
      [postId],
    );

    const handleCloseSheet = useCallback(() => {
      (ref as any).current?.close();
    }, [ref]);

    const handleComment = () => {
      setCommenting(true);

      setTimeout(() => {
        setCommenting(false);
        setComment("");
      }, 3000);
    };

    const renderComment = ({ item }: { item: Comment }) => (
      <View className="flex-row px-4 py-3 gap-3">
        <View className="items-center">
          <View className="size-10 rounded-full bg-zinc-800 overflow-hidden border border-zinc-700">
            {item.author.avatarUrl ? (
              <Image
                source={{ uri: item.author.avatarUrl }}
                className="w-full h-full"
              />
            ) : (
              <View className="w-full h-full items-center justify-center bg-zinc-700">
                <Text className="text-white text-xs">
                  {item.author.username?.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
          </View>
          <View className="flex-1 w-[2px] bg-zinc-800 my-1 rounded-full" />
        </View>

        {/* RIGHT COLUMN: Content */}
        <View className="flex-1 pt-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-zinc-100 font-bold text-[15px]">
              {item.author.fullName}
              <Text className="text-zinc-500 font-normal ml-2 text-sm">
                {" "}
                @{item.author.username}
              </Text>
            </Text>
            <Text className="text-zinc-500 text-xs">2h</Text>
          </View>

          <Text className="text-zinc-300 text-[15px] leading-5 mt-1">
            {item.content}
          </Text>

          {/* DIVIDER */}
          <View className="h-[0.5px] mt-4 bg-zinc-800" />
        </View>
      </View>
    );

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
        backgroundStyle={{
          backgroundColor: COLORS["dark-3"],
          borderTopWidth: 1,
          borderTopColor: "#27272a",
        }}
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

          {/* COMMENTS LIST */}
          <BottomSheetFlatList
            data={comments}
            keyExtractor={(item: Comment) => item._id}
            renderItem={renderComment}
            contentContainerStyle={{
              paddingBottom: 100, // Extra space so last comment isn't hidden by input
              paddingTop: 10,
            }}
            ListEmptyComponent={
              <View className="items-center justify-center pt-20">
                <Text className="text-zinc-500 text-base">
                  No comments yet.
                </Text>
              </View>
            }
          />

          {/* STICKY INPUT BOX */}
          <View style={[styles.inputContainer, { paddingBottom: 8 }]}>
            <View className="flex-row items-center gap-3 px-4">
              <View className="size-9 rounded-full bg-zinc-800 overflow-hidden border border-zinc-700">
                <Image
                  source={require("$/images/icon.png")}
                  className="w-full h-full"
                />
              </View>

              <View className="flex-1 justify-between flex-row items-center">
                <BottomSheetTextInput
                  placeholder="Post your reply"
                  placeholderTextColor="#71717a"
                  style={styles.inputField}
                  onChangeText={setComment}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.sendButton}
                  onPress={handleComment}
                >
                  {commenting ? (
                    <ActivityIndicator size={"small"} color={"#222"} />
                  ) : (
                    <ArrowUp
                      strokeWidth={3}
                      size={20}
                      color={COLORS["dark-3"]}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 12,
    backgroundColor: COLORS["dark-3"],
    borderTopWidth: 1,
    borderTopColor: COLORS["dark-2"],
  },
  inputField: {
    backgroundColor: "#121212",
    borderWidth: 1,
    borderColor: "#27272a",
    borderRadius: 24,
    color: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingRight: 45,
    fontSize: 15,
    width: "87%",
  },
  sendButton: {
    // position: "absolute",
    // right: 4,
    borderRadius: 50,
    width: 30,
    height: 30,
    backgroundColor: COLORS.accent,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomBottomSheet;
