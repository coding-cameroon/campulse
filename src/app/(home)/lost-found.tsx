import CustomBottomSheet from "@/components/CustomBottomSheet";
import EmptyState from "@/components/EmptyListComponent";
import InputField from "@/components/InputField";
import LostAndFoundCard from "@/components/LostFoundCard";
import { useCreateComment, useGetComments } from "@/hooks/useComment";
import { useGetPosts } from "@/hooks/usePosts";
import { useGetMe } from "@/hooks/useUser";
import { COLORS } from "@/utils/colors";
import BottomSheet from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { Ghost, Search, X } from "lucide-react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
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

export default function LostFoundScreen() {
  const insets = useSafeAreaInsets();
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedItemId, setSelectedItemId] = useState("");
  const { t } = useTranslation("lost");

  // hooks
  const { user } = useGetMe();
  const { comments, isPending } = useGetComments(selectedItemId as string);
  const { mutateAsync: createComments } = useCreateComment(
    selectedItemId as string,
  );
  const { posts, isLoading } = useGetPosts({ category: "lost_found" });

  // data
  // const lostFoundPost = posts.filter((post) => post.category === "lost_found");
  const lostFoundPost = posts;
  const filteredPosts = lostFoundPost.filter(
    (post) =>
      post.realName?.includes(searchText.toLowerCase()) ||
      post.body.toLowerCase().includes(searchText.toLowerCase()) ||
      (post.title &&
        post.title.toLowerCase().includes(searchText.toLowerCase())) ||
      (post.lastSeenAt &&
        post.lastSeenAt.toLowerCase().includes(searchText.toLowerCase())),
  );

  const sheetRef = useRef<BottomSheet>(null);
  const handleOpenSheet = useCallback((id: string) => {
    setSelectedItemId(id);

    sheetRef.current?.expand();
  }, []);

  const handleSubmit = async (text: string) => {
    try {
      await createComments({ postId: selectedItemId, newComment: text });
      console.log("✅ Comment created.");
    } catch (err) {
      console.log("create comment filed: ", err);
    }
  };

  // HEADER COMPONENT
  const Header = useMemo(
    () => (
      /* We add padding top based on the device's notch/status bar height */
      <View
        className="absolute top-0 left-0 right-0 z-0 bg-black/90 px-4 pb-4"
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
              source={{ uri: user?.realAvatarUrl! }}
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
                  {t("banner.trackItems")} • {t("banner.expiryNotice")}
                </Text>
              </View>
            ) : (
              <InputField
                autoFocus
                onChangeText={setSearchText}
                placeholder={t("searchPlaceholder")}
                style={{ borderRadius: 60, height: 37, marginBottom: -24 }}
              />
            )}
          </View>

          {/* action */}
          <TouchableOpacity
            onPress={() => setIsSearching(!isSearching)}
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
    ),
    [isSearching],
  );

  // MAIN SCREEN CONTENT
  return (
    <View className="flex-1 bg-black">
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={40} color={"#505152"} />
          <Text className="text-xl font-bold text-[#505152]">Loading</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LostAndFoundCard
              post={item}
              onPressItem={() => handleOpenSheet(item.id)}
            />
          )}
          ListEmptyComponent={
            <EmptyState
              title={searchText ? "No matches found" : "No posts yet"}
              description={
                searchText
                  ? `We couldn't find anything for "${searchText}".`
                  : "Be the first to post something!"
              }
              Icon={searchText ? Search : Ghost}
              showAction={searchText.length > 0}
              actionText="Clear Search"
              onAction={() => {
                setSearchText("");
                setIsSearching(false);
              }}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: insets.top + 160,
            paddingBottom: 5,
            paddingHorizontal: 8,
          }}
        />
      )}
      {Header}
      <CustomBottomSheet
        comments={comments ?? []}
        onSendComment={handleSubmit}
        ref={sheetRef}
      />
    </View>
  );
}
