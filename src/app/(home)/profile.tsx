import { COLORS } from "@/utils/colors";
import { CircleUser } from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// --- SUB-COMPONENTS ---

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.itemWrapper}>
    <View style={styles.labelGroup}>
      <CircleUser color="white" size={14} />
      <Text style={styles.labelText}>{label}</Text>
    </View>
    <Text style={styles.valueText}>{value}</Text>
  </View>
);

// --- MAIN SCREEN ---

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<"posts" | "videos">("posts");

  const MOCK_USER = {
    email: "demanouprincesse88@gmail.com",
    fullName: "Demanou Princesse",
    postsCount: 13,
    videoCount: 7,
  };

  return (
    <ScrollView
      style={styles.screenContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. COVER PHOTO SECTION */}
      <View style={styles.coverWrapper}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000&auto=format&fit=crop",
          }}
          style={styles.coverPhoto}
        />
        <View style={styles.coverOverlay} />
      </View>

      {/* 2. PROFILE HEADER */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarWrapper}>
          <Image source={require("$/images/icon.png")} style={styles.avatar} />
        </View>

        <View style={styles.infoTextContainer}>
          <Text style={styles.fullName}>{MOCK_USER.fullName}</Text>
          <Text style={styles.usernameHandle}>{MOCK_USER.email}</Text>
        </View>

        {/* INFO BAR */}
        <View style={styles.infoBar}>
          <InfoItem label="Anonymous name" value="Shinny Squirrel" />
          <View
            style={{
              height: 0.5,
              backgroundColor: "#222",
              marginVertical: 5,
            }}
          />
          <InfoItem label="Username" value="@shinny_squirrel" />
        </View>
      </View>

      {/* 3. SWITCHABLE TABS */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab("posts")}
          style={[styles.tab, activeTab === "posts" && styles.activeTab]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "posts" && styles.activeTabText,
            ]}
          >
            Posts ({MOCK_USER.postsCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("videos")}
          style={[styles.tab, activeTab === "videos" && styles.activeTab]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "videos" && styles.activeTabText,
            ]}
          >
            Video ({MOCK_USER.videoCount})
          </Text>
        </TouchableOpacity>
      </View>

      {/* 4. TAB CONTENT AREA */}
      <View style={styles.contentArea}>
        {activeTab === "posts" ? (
          <View style={styles.placeholderGrid}>
            <Text style={styles.placeholderText}>No ephemeral posts yet.</Text>
          </View>
        ) : (
          <View style={styles.placeholderGrid}>
            <Text style={styles.placeholderText}>
              No video content uploaded.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  coverWrapper: {
    height: 180,
    width: width,
  },
  coverPhoto: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  profileHeader: {
    alignItems: "center",
    marginTop: -55,
    paddingHorizontal: 20,
  },
  avatarWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: "black",
  },
  infoTextContainer: {
    alignItems: "center",
    marginTop: 12,
  },
  fullName: {
    color: "white",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  usernameHandle: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
  },
  infoBar: {
    width: "100%",
    backgroundColor: "#0A0A0A",
    borderWidth: 1,
    borderColor: "#1A1A1A",
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginTop: 20,
  },
  itemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    justifyContent: "space-between",
  },
  labelGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  labelText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  valueText: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: "800",
  },
  tabContainer: {
    flexDirection: "row",
    marginTop: 25,
    marginHorizontal: 20,
    backgroundColor: "#0D0D0D",
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: "#1A1A1A",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 11,
  },
  activeTab: {
    backgroundColor: "#1A1A1A",
  },
  tabText: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: "700",
  },
  activeTabText: {
    color: "white",
  },
  contentArea: {
    padding: 20,
    minHeight: 300,
  },
  placeholderGrid: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  placeholderText: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: "500",
  },
});
