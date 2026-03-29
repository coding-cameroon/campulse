import { MOCK_POSTS } from "$/data/post";
import CustomBottomSheet from "@/components/CustomBottomSheet";
import InputField from "@/components/InputField";
import PostCard from "@/components/PostCard";
import { COLORS } from "@/utils/colors";
import BottomSheet from "@gorhom/bottom-sheet";
import { Search, X } from "lucide-react-native";
import React, { useRef, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EventScreen() {
  const insets = useSafeAreaInsets();
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  const sheetRef = useRef<BottomSheet>(null);

  const handleOpenSheet = () => {
    sheetRef.current?.expand();
  };

  const filteredPosts = MOCK_POSTS.filter(
    (post) =>
      post.author.username?.includes(searchText) ||
      post.content.includes(searchText),
  );

  const Header = () => (
    /* We add padding top based on the device's notch/status bar height */
    <View
      className="absolute top-0 left-0 right-0 z-10 bg-black/90 px-4 pb-4"
      style={{ paddingTop: insets.top + 5 }}
    >
      {/* STATIC TITLE */}
      <View className="px-2 py-2">
        <Text className="text-white text-[44px] font-[900] tracking-tighter">
          The Wall
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
                Anonymous • Ephemeral • 24 hours
              </Text>
            </View>
          ) : (
            <InputField
              autoFocus
              onChangeText={setSearchText}
              placeholder="What are you looking for?"
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
          <PostCard post={item} onPressEvent={handleOpenSheet} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 160,
          paddingBottom: 5,
          paddingHorizontal: 8,
        }}
      />
      <Header />
      <CustomBottomSheet ref={sheetRef} />
    </View>
  );
}
