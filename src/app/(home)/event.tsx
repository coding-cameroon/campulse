import { MOCK_POSTS } from "$/data/post";
import PostCard from "@/components/PostCard";
import { COLORS } from "@/utils/colors";
import { Search, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EventScreen() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  const FloatingHeader = () => (
    <View style={styles.headerFloatingContainer}>
      <View style={styles.headerInner}>
        {/* AVATAR */}
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={require("$/images/icon.png")}
            style={styles.userAvatar}
          />
        </TouchableOpacity>

        {/* DYNAMIC MIDDLE SECTION */}
        <View style={styles.middleSection}>
          {!isSearching ? (
            <View style={styles.accentBadge}>
              <Text numberOfLines={1} style={styles.badgeText}>
                Anonymous • Ephemeral • Disappear after 24 hrs
              </Text>
            </View>
          ) : (
            <View style={styles.searchBarContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search the wall..."
                placeholderTextColor="rgba(0,0,0,0.5)"
                autoFocus
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
          )}
        </View>

        {/* SEARCH / CLOSE TOGGLE */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsSearching(!isSearching)}
          style={styles.searchToggle}
        >
          {isSearching ? (
            <X color="white" size={22} />
          ) : (
            <Search color="white" size={22} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* THE WALL TITLE - Separated from float to stay at the top */}
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>The Wall</Text>
      </View>

      <FlatList
        data={MOCK_POSTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            username={item.username}
            timeAgo={item.timeAgo}
            timeLeft={item.timeLeft}
            content={item.content}
            likes={item.likes}
            comments={item.comments}
            postImage={item.postImage}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      {/* FLOATING HEADER COMPONENT */}
      <FloatingHeader />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  titleContainer: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 5,
  },
  headerTitle: {
    color: "white",
    fontSize: 40,
    fontWeight: "900",
    letterSpacing: -1.5,
  },
  listContent: {
    paddingTop: 80, // Space so first post isn't hidden by the float
    paddingBottom: 100,
  },
  headerFloatingContainer: {
    position: "absolute",
    top: 100, // Adjusted to sit below "The Wall" title
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 10,
  },
  headerInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.8)", // Semi-transparent glass effect
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  middleSection: {
    flex: 1,
    marginHorizontal: 10,
  },
  accentBadge: {
    backgroundColor: COLORS.accent,
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "700",
    color: "black",
    textAlign: "center",
  },
  searchBarContainer: {
    backgroundColor: "white",
    borderRadius: 40,
    paddingHorizontal: 15,
    height: 40,
    justifyContent: "center",
  },
  searchInput: {
    color: "black",
    fontSize: 14,
    fontWeight: "600",
    padding: 0,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#333",
  },
  searchToggle: {
    paddingRight: 10,
  },
});
