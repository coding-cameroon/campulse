import { COLORS } from "@/utils/colors";
import { useUser } from "@clerk/expo";
import { CircleUser } from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// --- SUB-COMPONENTS ---

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row items-center justify-between py-2">
    <View className="flex-row items-center gap-1.5">
      <CircleUser color="white" size={14} />
      <Text className="text-[10px] font-bold uppercase text-white/50">
        {label}
      </Text>
    </View>
    <Text className="text-sm font-extrabold" style={{ color: COLORS.accent }}>
      {value}
    </Text>
  </View>
);

// --- MAIN SCREEN ---

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<"posts" | "videos">("posts");

  const { user } = useUser();

  const USER = {
    imageUrl: user?.imageUrl,
    email: user?.emailAddresses[0].emailAddress,
    fullName: user?.fullName || "No Username",
  };

  return (
    <ScrollView
      className="flex-1 bg-black"
      showsVerticalScrollIndicator={false}
    >
      {/* 1. COVER PHOTO SECTION */}
      <View style={{ width }} className="h-[200px]">
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000&auto=format&fit=crop",
          }}
          className="h-full w-full"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-black/30" />
      </View>

      {/* 2. PROFILE HEADER */}
      <View className="items-center px-5 -mt-[55px]">
        <View className="elevation-10 shadow-black shadow-offset-[0px_10px] shadow-opacity-50 shadow-radius-10">
          <Image
            source={{ uri: USER.imageUrl }}
            className="size-[150px]  rounded-[25px] border-4 border-black"
          />
        </View>

        <View className="items-center mt-3">
          <Text className="text-2xl font-[900] tracking-tighter text-white">
            {USER.fullName}
          </Text>
          <Text
            className="mt-0.5 text-sm font-semibold"
            style={{ color: COLORS.gray }}
          >
            {USER.email}
          </Text>
        </View>

        {/* INFO BAR */}
        <View className="mt-5 w-full justify-center rounded-xl border border-[#1A1A1A] bg-[#0A0A0A] px-4">
          <InfoItem label="Anonymous name" value="Shinny Squirrel" />
          <View className="my-1.25 h-[0.5px] bg-[#222]" />
          <InfoItem label="Username" value="@shinny_squirrel" />
        </View>
      </View>

      {/* 3. SWITCHABLE TABS */}
      <View className="mx-5 mt-6 flex-row rounded-[14px] border border-[#1A1A1A] bg-[#0D0D0D] p-1">
        <TouchableOpacity
          onPress={() => setActiveTab("posts")}
          className={`flex-1 items-center rounded-[11px] py-3 ${
            activeTab === "posts" ? "bg-[#1A1A1A]" : ""
          }`}
        >
          <Text
            className={`text-sm font-bold ${
              activeTab === "posts" ? "text-white" : "text-gray-400"
            }`}
            style={activeTab !== "posts" ? { color: COLORS.gray } : null}
          >
            Posts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("videos")}
          className={`flex-1 items-center rounded-[11px] py-3 ${
            activeTab === "videos" ? "bg-[#1A1A1A]" : ""
          }`}
        >
          <Text
            className={`text-sm font-bold ${
              activeTab === "videos" ? "text-white" : "text-gray-400"
            }`}
            style={activeTab !== "videos" ? { color: COLORS.gray } : null}
          >
            Video
          </Text>
        </TouchableOpacity>
      </View>

      {/* 4. TAB CONTENT AREA */}
      <View className="min-h-[300px] p-5">
        <View className="mt-[60px] items-center justify-center">
          <Text className="text-sm font-medium" style={{ color: COLORS.gray }}>
            {activeTab === "posts"
              ? "No ephemeral posts yet."
              : "No video content uploaded."}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
