import { MOCK_COMMENTS } from "$/data/comments";
import { MOCK_POSTS } from "$/data/post";
import CustomBottomSheet from "@/components/CustomBottomSheet";
import InputField from "@/components/InputField";
import PostCard from "@/components/PostCard";
import { COLORS } from "@/utils/colors";
import BottomSheet from "@gorhom/bottom-sheet";
import { Search, X } from "lucide-react-native";
import React, { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PostScreen() {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const { t } = useTranslation("wall");

  const sheetRef = useRef<BottomSheet>(null);

  const eventComments = MOCK_COMMENTS.filter(
    (cmt) => cmt.postId === selectedPostId,
  );

  const handleAddEventComment = async (
    eventId: string | null,
    text: string,
  ) => {
    if (!eventId || !text.trim()) return;
  };

  const handleOpenSheet = useCallback((id: string) => {
    setSelectedPostId(id);
    sheetRef.current?.expand();
  }, []);

  const filteredPosts = MOCK_POSTS.filter(
    (post) =>
      post.author.username?.toLowerCase().includes(searchText.toLowerCase()) ||
      post.content.toLowerCase().includes(searchText.toLowerCase()),
  );

  const Header = () => (
    <View
      className="absolute top-0 left-0 right-0 z-10 bg-black/90 px-4 pb-4"
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
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={require("$/images/icon.png")}
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
  );

  return (
    <View className="flex-1 bg-black">
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onPressEvent={() => handleOpenSheet(item._id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 160,
          paddingBottom: 5,
          paddingHorizontal: 8,
        }}
      />
      <Header />
      <CustomBottomSheet
        ref={sheetRef}
        comments={eventComments}
        onSendComment={(text) => handleAddEventComment(selectedPostId, text)}
      />
    </View>
  );
}
