import { MOCK_POSTS } from "$/data/post";
import PostCard from "@/components/PostCard";
import { COLORS } from "@/utils/colors";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EventScreen() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  const Header = () => (
    <View style={styles.headerFloatingContainer}>
      {/* STATIC TITLE */}
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>The Wall</Text>
      </View>

      {/* FLOATING INTERACTIVE BAR */}
      <View style={styles.headerInner}>
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={require("$/images/icon.png")}
            style={styles.userAvatar}
          />
        </TouchableOpacity>

        <View style={styles.middleSection}>
          <View style={styles.accentBadge}>
            <Text numberOfLines={1} style={styles.badgeText}>
              Anonymous • Ephemeral • 24 hours
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
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
      <Header />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  headerFloatingContainer: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 10,
    backgroundColor: "black",
    paddingBottom: 15,
  },
  titleContainer: { paddingHorizontal: 8, paddingTop: 10, paddingBottom: 10 },
  headerTitle: {
    color: "white",
    fontSize: 40,
    fontWeight: "900",
    letterSpacing: -1.5,
  },
  headerInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  middleSection: { flex: 1, marginHorizontal: 10 },
  accentBadge: {
    backgroundColor: COLORS.accent,
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  badgeText: {
    fontSize: 16,
    fontWeight: "800",
    color: "black",
    textAlign: "center",
  },
  searchBarContainer: { justifyContent: "center" },

  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#333",
  },
  searchToggle: { paddingHorizontal: 10 },
  listContent: { paddingTop: 160, paddingBottom: 100 },
});
