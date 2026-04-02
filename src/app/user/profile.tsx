import { MOCK_POSTS } from "$/data/post";
import { COLORS } from "@/utils/colors";
import { formatDate } from "@/utils/date";
import { useAuth, useUser } from "@clerk/expo";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  ChevronRight,
  CircleUser,
  Clock,
  Languages,
  LayoutList,
  LogOut,
  PackageOpen,
  Trash2,
  TriangleAlert,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// --- SUB-COMPONENTS ---

const AlertModal = ({
  visible,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  isDestructive = true,
}: {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  isDestructive?: boolean;
}) => (
  <Modal
    transparent
    visible={visible}
    animationType="fade"
    onRequestClose={onClose}
  >
    <View className="flex-1 justify-center items-center bg-black/80 px-10">
      <View className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-[24px] p-6 items-center">
        <View
          className={`${isDestructive ? "bg-red-500/10" : "bg-white/5"} p-4 rounded-full mb-4`}
        >
          <TriangleAlert
            color={isDestructive ? "#ef4444" : "white"}
            size={32}
          />
        </View>

        <Text className="text-white text-xl font-bold mb-2">{title}</Text>
        <Text className="text-white/50 text-center text-sm mb-8 leading-5">
          {description}
        </Text>

        <View className="w-full gap-3">
          <TouchableOpacity
            onPress={onConfirm}
            className={`w-full ${isDestructive ? "bg-red-500" : "bg-white"} py-4 rounded-xl items-center`}
          >
            <Text
              className={`${isDestructive ? "text-white" : "text-black"} font-bold text-base`}
            >
              {confirmText}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            className="w-full bg-white/5 py-4 rounded-xl items-center border border-white/5"
          >
            <Text className="text-white font-bold text-base">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

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

const UserPostCard = ({
  title,
  onDelete,
  isLast,
  postedOn,
}: {
  isLast: boolean;
  title: string;
  postedOn: string;
  onDelete: () => void;
}) => (
  <View
    className={`flex-row items-center justify-between py-4 ${isLast ? "" : "border-b border-[#1A1A1A]"}`}
  >
    <View className="flex-1 pr-4">
      <Text className="text-white font-bold text-base" numberOfLines={1}>
        {title}
      </Text>
      <View className="flex-row gap-1 items-center mt-1">
        <Clock
          color="rgb(255 255 255 / 0.3)"
          size={12}
          style={{ marginTop: 2 }}
        />
        <Text className="text-white/30 text-[10px] mt-1 uppercase font-bold">
          {formatDate(postedOn)}
        </Text>
      </View>
    </View>
    <TouchableOpacity
      onPress={onDelete}
      activeOpacity={0.7}
      className="p-2 bg-red-500/10 rounded-lg"
    >
      <Trash2 color="#ef4444" size={18} />
    </TouchableOpacity>
  </View>
);

const SettingsItem = ({
  label,
  icon: Icon,
  onPress,
  value,
  isLast = false,
  isDestructive = false,
  showChevron = true,
  isExpanded = false,
}: {
  label: string;
  icon: any;
  isLast: boolean;
  onPress: () => void;
  value?: string;
  isDestructive?: boolean;
  showChevron?: boolean;
  isExpanded?: boolean;
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    className={`flex-row items-center justify-between py-4 ${isLast ? "" : "border-b border-[#1A1A1A]"}`}
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
          <ChevronRight color="white" size={20} opacity={0.3} />
        </View>
      )}
    </View>
  </TouchableOpacity>
);

// --- MAIN SCREEN ---

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useAuth();

  // States
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isPostsOpen, setIsPostsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [myPosts, setMyPosts] = useState(MOCK_POSTS.slice(0, 5));

  // Modal States
  const [modalConfig, setModalConfig] = useState<{
    visible: boolean;
    title: string;
    description: string;
    confirmText: string;
    onConfirm: () => void;
  }>({
    visible: false,
    title: "",
    description: "",
    confirmText: "",
    onConfirm: () => {},
  });

  const getDisplayName = () => {
    if (user?.firstName && user?.lastName) return user.fullName;
    const emailHandle = user?.emailAddresses?.[0]?.emailAddress?.split("@")[0];
    if (!emailHandle) return "Guest";
    return emailHandle.charAt(0).toUpperCase() + emailHandle.slice(1);
  };

  const closeModal = () =>
    setModalConfig((prev) => ({ ...prev, visible: false }));

  const initiateSignOut = () => {
    setModalConfig({
      visible: true,
      title: "Sign Out?",
      description: "Are you sure you want to log out of your account?",
      confirmText: "Sign Out",
      onConfirm: async () => {
        try {
          await signOut();
          closeModal();
        } catch (error) {
          console.error("Error signing out:", error);
        }
      },
    });
  };

  const initiateDelete = (postId: string) => {
    setModalConfig({
      visible: true,
      title: "Delete Post?",
      description:
        "This action cannot be undone. This post will be permanently removed.",
      confirmText: "Delete",
      onConfirm: () => {
        setMyPosts((prev) => prev.filter((post) => post._id !== postId));
        closeModal();
      },
    });
  };

  return (
    <ScrollView
      className="flex-1 bg-black"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <AlertModal
        visible={modalConfig.visible}
        title={modalConfig.title}
        description={modalConfig.description}
        confirmText={modalConfig.confirmText}
        onConfirm={modalConfig.onConfirm}
        onClose={closeModal}
      />

      {/* 1. COVER PHOTO SECTION */}
      <View style={{ width }} className="h-[240px]">
        <Image
          source={{
            uri: "https://tse2.mm.bing.net/th/id/OIP._XuPSkfdjac9iIbQQrJ8sQHaED?w=2500&h=1369&rs=1&pid=ImgDetMain&o=7&rm=3",
          }}
          className="h-full w-full"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-black/30" />

        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-12 left-5 z-10 p-2 rounded-full bg-black/40"
        >
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
      </View>

      {/* 2. PROFILE HEADER */}
      <View className="items-center px-5 -mt-[55px]">
        <View className="elevation-10 shadow-black shadow-offset-[0px_10px] shadow-opacity-50 shadow-radius-10">
          <Image
            source={{ uri: user?.imageUrl }}
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
            {user?.emailAddresses[0].emailAddress}
          </Text>
        </View>
        <View className="w-full mt-8">
          <Text className="text-white/30 text-[10px] font-black uppercase tracking-[2px] mb-2">
            Account Details
          </Text>
          <View className="w-full rounded-2xl border border-[#1A1A1A] bg-[#0A0A0A] px-5">
            <InfoItem label="Anonymous name" value="Shinny Squirrel" />
            <View className="h-[0.5px] bg-[#1A1A1A]" />
            <InfoItem label="Username" value="@shinny_squirrel" />
            <View className="h-[0.5px] bg-[#1A1A1A]" />
            <InfoItem
              label="User Role"
              value={(user?.publicMetadata?.role as string) || "Student"}
            />
            {/* <View className="h-[0.5px] bg-[#1A1A1A] mb-2" /> */}
          </View>
        </View>
      </View>

      {/* 3. SETTINGS & OPTIONS SECTION */}
      <View className="px-5 mt-8">
        <Text className="text-white/30 text-[10px] font-black uppercase tracking-[2px] mb-2 px-1">
          Preferences
        </Text>

        <View className="bg-[#0A0A0A] rounded-2xl px-5 border border-[#1A1A1A]">
          <View>
            <SettingsItem
              label="Language"
              icon={Languages}
              isLast={false}
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

          <SettingsItem
            label="Sign Out"
            icon={LogOut}
            isDestructive
            isLast
            showChevron={false}
            onPress={initiateSignOut}
          />
        </View>
      </View>

      {/* 4. COLLAPSIBLE MY POSTS SECTION */}
      <View className="px-5 mt-8">
        <Text className="text-white/30 text-[10px] font-black uppercase tracking-[2px] mb-2 px-1">
          Content
        </Text>

        <View className="bg-[#0A0A0A] rounded-2xl px-5 border border-[#1A1A1A]">
          <SettingsItem
            label="My Posts"
            icon={LayoutList}
            isLast={false}
            value={`${myPosts.length}`}
            isExpanded={isPostsOpen}
            onPress={() => setIsPostsOpen(!isPostsOpen)}
          />

          {isPostsOpen && (
            <View className="pb-4">
              {myPosts.length > 0 ? (
                myPosts.map((post, idx) => (
                  <UserPostCard
                    key={post._id}
                    isLast={idx === myPosts.length - 1}
                    title={post.content}
                    postedOn={post.createdAt as string}
                    onDelete={() => initiateDelete(post._id)}
                  />
                ))
              ) : (
                <View className="py-8 flex-row gap-2 items-center justify-center">
                  <PackageOpen color={"rgb(255 255 255 / 0.3)"} />
                  <Text className="text-white/30 font-bold">
                    You haven't posted anything yet
                  </Text>
                </View>
              )}
            </View>
          )}
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
