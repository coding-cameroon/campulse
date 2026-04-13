import { iutRegion, MOCK_CAMPUS_EVENTS } from "$/data/map";
import { CampusMap as MapCampus } from "@/components/CampusMap";
import GoogleMap from "@/components/GoogleMap";
import { useGetMe, useSyncUser } from "@/hooks/useUser";
import { COLORS } from "@/utils/colors";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ✅ Header defined OUTSIDE — stable reference, never remounts
interface HeaderProps {
  activeTab: "map" | "events";
  setActiveTab: (tab: "map" | "events") => void;
  displayName: string;
  imageUrl?: string;
  t: (key: string) => string;
  insets: { top: number };
}

const Header = ({
  activeTab,
  setActiveTab,
  displayName,
  imageUrl,
  t,
  insets,
}: HeaderProps) => {
  return (
    <View
      className="absolute top-0 left-0 right-0 z-10 bg-black/90 px-4 pb-4"
      style={{ paddingTop: insets.top + 5 }}
    >
      <View className="px-2 py-2 mb-1">
        <Text className="text-gray uppercase text-[14px] font-[900] tracking-tighter">
          {t("welcome")}
        </Text>
        <Text className="text-white text-[24px] font-[900] tracking-wider -mt-1">
          {displayName}
        </Text>
      </View>

      <View className="flex-row items-center bg-white/10 rounded-full p-1.5 border border-white/10">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/user/profile")}
          className="mr-2"
        >
          <Image
            source={imageUrl ? { uri: imageUrl } : require("$/images/icon.png")}
            className="w-10 h-10 rounded-full border-[1.5px] border-[#333]"
          />
        </TouchableOpacity>

        <View className="flex-1 flex-row gap-2">
          <TouchableOpacity
            onPress={() => setActiveTab("map")}
            activeOpacity={0.8}
            className="flex-1 rounded-full py-2.5 px-2"
            style={{
              backgroundColor:
                activeTab === "map" ? COLORS.accent : "transparent",
            }}
          >
            <Text
              numberOfLines={1}
              className={`text-xs font-[900] text-center uppercase tracking-tighter ${
                activeTab === "map" ? "text-black" : "text-white/60"
              }`}
            >
              {t("tabs.map")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("events")}
            activeOpacity={0.8}
            className="flex-1 rounded-full py-2.5 px-2"
            style={{
              backgroundColor:
                activeTab === "events" ? COLORS.accent : "transparent",
            }}
          >
            <Text
              numberOfLines={1}
              className={`text-xs font-[900] text-center uppercase tracking-tighter ${
                activeTab === "events" ? "text-black" : "text-white/60"
              }`}
            >
              {t("tabs.events")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// ── MAIN SCREEN ──────────────────────────────────────────────────────────────
export default function CampusMap() {
  const { user } = useGetMe();

  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<"map" | "events">("map");
  const { mutateAsync: syncUser } = useSyncUser();
  const { t } = useTranslation("home");

  useEffect(() => {
    (async () => {
      try {
        console.log("🔄 Syncing user to DB...");
        await syncUser();
        console.log("✅ User synced.");
      } catch (err: any) {
        if (err?.response?.status !== 409) {
          console.error("Sync error:", err?.response?.data || err);
        }
      }
    })();
  }, []);

  const getDisplayName = () => {
    if (user?.firstName) return user.firstName;
    const emailHandle = user?.email.split("@")[0];
    if (!emailHandle) return "Guest";
    return emailHandle.charAt(0).toUpperCase() + emailHandle.slice(1);
  };

  return (
    <View style={styles.container}>
      {activeTab === "map" ? (
        <MapCampus iutRegion={iutRegion} />
      ) : (
        <GoogleMap iutRegion={iutRegion} markers={MOCK_CAMPUS_EVENTS} />
      )}

      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        displayName={getDisplayName()}
        imageUrl={user?.realAvatarUrl!}
        t={t}
        insets={insets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
