import { COLORS } from "@/utils/colors";
import { useAuth, useUser } from "@clerk/expo";
import {
  ChevronRight,
  CircleUser,
  Languages,
  LogOut,
} from "lucide-react-native";
import React, { useState } from "react"; // Added useState
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
  <View className="flex-row items-center justify-between py-4">
    <View className="flex-row items-center gap-2.5">
      <CircleUser color="white" size={18} />
      <Text className="text-[10px] font-bold uppercase text-white/50 tracking-widest">
        {label}
      </Text>
    </View>
    <Text className="text-sm font-extrabold" style={{ color: COLORS.accent }}>
      {value}
    </Text>
  </View>
);

const SettingsItem = ({
  label,
  icon: Icon,
  onPress,
  value,
  isDestructive = false,
  showChevron = true,
  isExpanded = false,
}: {
  label: string;
  icon: any;
  onPress: () => void;
  value?: string;
  isDestructive?: boolean;
  showChevron?: boolean;
  isExpanded?: boolean;
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    className="flex-row items-center justify-between py-4 border-b border-[#1A1A1A]"
  >
    <View className="flex-row items-center gap-3">
      <View
        className={`p-2 rounded-lg ${isDestructive ? "bg-red-500/10" : "bg-white/5"}`}
      >
        <Icon color={isDestructive ? "#ef4444" : "white"} size={20} />
      </View>
      <Text
        className={`text-base font-bold ${isDestructive ? "text-red-500" : "text-white"}`}
      >
        {label}
      </Text>
    </View>
    <View className="flex-row items-center gap-2">
      {value && <Text className="text-gray font-semibold">{value}</Text>}
      {showChevron && (
        <View
          style={{ transform: [{ rotate: isExpanded ? "90deg" : "0deg" }] }}
        >
          <ChevronRight color="#333" size={20} />
        </View>
      )}
    </View>
  </TouchableOpacity>
);

// --- MAIN SCREEN ---

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();

  // New States for Language Selection
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const getDisplayName = () => {
    if (user?.firstName) return user.firstName;
    const emailHandle = user?.emailAddresses?.[0]?.emailAddress?.split("@")[0];
    if (!emailHandle) return "Guest";
    return emailHandle.charAt(0).toUpperCase() + emailHandle.slice(1);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
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
            source={{ uri: user!.imageUrl }}
            className="size-[150px] rounded-full border-4 border-black"
          />
        </View>

        <View className="items-center mt-4">
          <Text className="text-3xl font-[900] tracking-wider text-white">
            {getDisplayName()}
          </Text>
          <Text
            className="mt-1 text-sm font-semibold"
            style={{ color: COLORS.gray }}
          >
            {user!.emailAddresses[0].emailAddress}
          </Text>
        </View>

        {/* INFO CARD */}
        <View className="mt-8 w-full rounded-2xl border border-[#1A1A1A] bg-[#0A0A0A] px-5">
          <InfoItem label="Anonymous name" value="Shinny Squirrel" />
          <View className="h-[0.5px] bg-[#1A1A1A]" />
          <InfoItem label="Username" value="@shinny_squirrel" />
        </View>
      </View>

      {/* 3. SETTINGS & OPTIONS SECTION */}
      <View className="px-5 mt-8 pb-10">
        <Text className="text-white/30 text-[10px] font-black uppercase tracking-[2px] mb-2 px-1">
          Preferences
        </Text>

        <View className="bg-[#0A0A0A] rounded-2xl px-5 border border-[#1A1A1A]">
          {/* Collapsible Language Section */}
          <View>
            <SettingsItem
              label="Language"
              icon={Languages}
              value={selectedLanguage}
              isExpanded={isLanguageOpen}
              onPress={() => setIsLanguageOpen(!isLanguageOpen)}
            />

            {isLanguageOpen && (
              <View className="py-2 pl-12 gap-y-1 border-b border-[#1A1A1A]">
                <TouchableOpacity
                  onPress={() => {
                    setSelectedLanguage("English");
                    setIsLanguageOpen(false);
                  }}
                  className="py-3 flex-row justify-between items-center pr-4"
                >
                  <Text
                    className={`text-base ${selectedLanguage === "English" ? "text-white font-bold" : "text-white/40"}`}
                  >
                    English
                  </Text>
                  {selectedLanguage === "English" && (
                    <View className="w-2 h-2 rounded-full bg-white" />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setSelectedLanguage("French");
                    setIsLanguageOpen(false);
                  }}
                  className="py-3 flex-row justify-between items-center pr-4"
                >
                  <Text
                    className={`text-base ${selectedLanguage === "French" ? "text-white font-bold" : "text-white/40"}`}
                  >
                    French
                  </Text>
                  {selectedLanguage === "French" && (
                    <View className="w-2 h-2 rounded-full bg-white" />
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Sign Out Option */}
          <SettingsItem
            label="Sign Out"
            icon={LogOut}
            isDestructive
            showChevron={false}
            onPress={handleSignOut}
          />
        </View>

        <View className="mt-10 items-center">
          <Text className="text-gray-800 text-[10px] font-bold uppercase tracking-widest">
            Campulse Version 1.0.2
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
