import CustomBottomSheet from "@/components/CustomBottomSheet";
import EmptyState from "@/components/EmptyListComponent";
import InputField from "@/components/InputField";
import PostCard from "@/components/PostCard";
import { useCreateComment, useGetComments } from "@/hooks/useComment";
import { useGetPosts } from "@/hooks/usePosts";
import { useGetMe } from "@/hooks/useUser";
import { COLORS } from "@/utils/colors";
import BottomSheet from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { Search, X } from "lucide-react-native";
import React, { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PostScreen() {
  const { posts, isPending: isPostPending } = useGetPosts({ category: "feed" });
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // HOOKS
  const { user } = useGetMe();
  const { mutateAsync: createComment, isPending: isCreateCommentPending } =
    useCreateComment(selectedPostId as string);
  const { comments, isPending: isCommentPending } = useGetComments(
    selectedPostId as string,
  );

  const { t } = useTranslation("wall");

  const sheetRef = useRef<BottomSheet>(null);

  const handleAddEventComment = async (text: string) => {
    if (!selectedPostId || !text.trim()) return;

    try {
      await createComment({
        postId: selectedPostId,
        newComment: text,
      });
      console.log("✅ Comment created");
    } catch (error) {
      // This will now catch the 400 error specifically
      console.error("Mutation Error:", error);
    }
  };

  const handleOpenSheet = useCallback((id: string) => {
    setSelectedPostId(id);
    sheetRef.current?.expand();
  }, []);

  const filteredPosts =
    searchText.trim() === ""
      ? posts
      : posts.filter(
          (post) =>
            post.anonName?.toLowerCase().includes(searchText.toLowerCase()) ||
            post.body?.toLowerCase().includes(searchText.toLowerCase()),
        );

  // console.log(JSON.stringify(comments, null, 2));

  const Header = () => (
    <View
      className="absolute top-0 left-0 right-0 bg-black/90 px-4 pb-4"
      style={{ paddingTop: insets.top + 5 }}
    >
      {/* STATIC TITLE */}
      <View className="px-2 py-2">
        <Text className="text-white text-[44px] font-[900] tracking-tighter">
          {t("title")}
        </Text>
      </View>

      {/* FLOATING INTERACTIVE BAR */}
      <View className="flex-row items-center justify-between bg-white/10 rounded-full px-2 py-2 border border-white/10">
        {/* profile */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/user/profile")}
        >
          <Image
            source={{
              uri: user?.anonymousAvatarUrl,
            }}
            className="w-10 h-10 rounded-full border-[1.5px] border-[#333]"
          />
        </TouchableOpacity>

        {/* content */}
        <View className="flex-1 mx-2">
          {!isSearching ? (
            <View
              className="rounded-full py-2.5 px-4"
              style={{ backgroundColor: COLORS.accent }}
            >
              <Text
                numberOfLines={1}
                className="text-black text-sm font-extrabold text-center"
              >
                {t("banner.anonymous")} • {t("banner.ephemeral")} •{" "}
                {t("banner.expiry")}
              </Text>
            </View>
          ) : (
            <InputField
              autoFocus
              onChangeText={setSearchText}
              placeholder={t("searchPlaceholder") as string}
              style={{ borderRadius: 60, height: 37, marginBottom: -24 }}
            />
          )}
        </View>

        {/* action */}
        <TouchableOpacity
          onPress={() => {
            setIsSearching(!isSearching);
          }}
          className="bg-dark-2 rounded-full size-[34px] flex items-center justify-center"
        >
          {isSearching ? (
            <X color="white" size={20} />
          ) : (
            <Search color="white" size={20} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-black" style={{ zIndex: -20 }}>
      {isPostPending ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size={"large"} color={COLORS["dark-1"]} />
          <Text className="text-dark-1 text-xl font-semibold mt-2">
            Loading...
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              onPressEvent={() => handleOpenSheet(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: insets.top + 160,
            paddingBottom: 5,
            paddingHorizontal: 8,
          }}
          ListEmptyComponent={EmptyState}
        />
      )}
      <CustomBottomSheet
        ref={sheetRef}
        isLoading={isCreateCommentPending}
        comments={isCommentPending ? [] : (comments ?? [])}
        onSendComment={(text) => handleAddEventComment(text)}
      />
      <Header />
    </View>
  );
}
