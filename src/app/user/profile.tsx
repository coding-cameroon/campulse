import { MOCK_POSTS } from "$/data/post";
import { COLORS } from "@/utils/colors";
import { formatDate } from "@/utils/date";
import { useAuth, useUser } from "@clerk/expo";
import { Stack, useRouter } from "expo-router";
import {
  ArrowLeft,
  Camera,
  ChevronRight,
  CircleUser,
  Clock,
  ImageIcon,
  Languages,
  LayoutList,
  LogOut,
  PackageOpen,
  Trash2,
  TriangleAlert,
  UserRoundPen,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
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

const EditField = ({
  label,
  placeholder,
  value,
}: {
  label: string;
  placeholder: string;
  value?: string;
}) => (
  <View className="mb-4">
    <Text className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1.5 ml-1">
      {label}
    </Text>
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="rgba(255,255,255,0.2)"
      defaultValue={value}
      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-semibold"
    />
  </View>
);

// --- IMAGE PICKER COMPONENTS ---

const ProfileImagePicker = ({
  label,
  imageUri,
  onPress,
}: {
  label: string;
  imageUri?: string;
  onPress: () => void;
}) => (
  <View className="mb-6 items-center">
    <Text className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-3 self-start ml-1">
      {label}
    </Text>
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="relative items-center justify-center"
    >
      <View className="size-28 rounded-full border-2 border-white/10 overflow-hidden bg-white/5 items-center justify-center">
        {imageUri ? (
          <Image source={{ uri: imageUri }} className="size-full" />
        ) : (
          <CircleUser color="rgba(255,255,255,0.2)" size={48} />
        )}
      </View>
      <View
        className="absolute bottom-1 right-1 p-2 rounded-full border-2 border-black"
        style={{ backgroundColor: COLORS.accent }}
      >
        <Camera color="black" size={16} />
      </View>
    </TouchableOpacity>
  </View>
);

const CoverImagePicker = ({
  label,
  imageUri,
  onPress,
}: {
  label: string;
  imageUri?: string;
  onPress: () => void;
}) => (
  <View className="mb-6">
    <Stack.Screen
      options={{
        animationTypeForReplace: "push",
        animation: "slide_from_left",
      }}
    />
    <Text className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-3 ml-1">
      {label}
    </Text>
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="relative w-full h-32 rounded-xl border-2 border-white/10 overflow-hidden bg-white/5 items-center justify-center"
    >
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          className="size-full"
          resizeMode="cover"
        />
      ) : (
        <ImageIcon color="rgba(255,255,255,0.2)" size={32} />
      )}
      <View
        className="absolute bottom-2 right-2 p-2 rounded-full border-2 border-black"
        style={{ backgroundColor: COLORS.accent }}
      >
        <Camera color="black" size={16} />
      </View>
    </TouchableOpacity>
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

  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isPostsOpen, setIsPostsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [myPosts, setMyPosts] = useState(MOCK_POSTS.slice(0, 5));

  const [modalConfig, setModalConfig] = useState({
    visible: false,
    title: "",
    description: "",
    confirmText: "",
    onConfirm: () => {},
  });

  const getDisplayName = () => {
    if (user?.firstName && user?.lastName) return user.fullName;
    const emailHandle = user?.emailAddresses?.[0]?.emailAddress?.split("@")[0];
    return emailHandle
      ? emailHandle.charAt(0).toUpperCase() + emailHandle.slice(1)
      : "Guest";
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      className="bg-black"
    >
      <ScrollView
        className="bg-black"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
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
        <View style={{ width }} className="h-[220px]">
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
            className="absolute top-10 left-5 z-10 p-2 rounded-full bg-black/40"
          >
            <ArrowLeft color="white" size={24} />
          </TouchableOpacity>
        </View>

        {/* 2. PROFILE HEADER */}
        <View className="items-center px-5 -mt-[55px]">
          <View className="elevation-10 shadow-black shadow-offset-[0px_10px] shadow-opacity-50 shadow-radius-10">
            <Image
              source={{ uri: user?.imageUrl }}
              className="size-[140px] rounded-full border-4 border-black"
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

          {/* Account Details */}
          <View className="w-full mt-8">
            <Text className="text-white/30 text-[10px] font-black uppercase tracking-[2px] mb-2 px-1">
              Account Details
            </Text>
            <View className="w-full rounded-2xl border border-[#1A1A1A] bg-[#0A0A0A] px-5">
              <InfoItem label="Username" value="@shinny_squirrel" />
              <View className="h-[0.5px] bg-[#1A1A1A]" />
              <InfoItem
                label="User Role"
                value={(user?.publicMetadata?.role as string) || "Student"}
              />
            </View>
          </View>

          {/* --- EDIT PROFILE SECTION --- */}
          <View className="w-full mt-8">
            <Text className="text-white/30 text-[10px] font-black uppercase tracking-[2px] mb-2 px-1">
              Edit Profile
            </Text>
            <View className="bg-[#0A0A0A] rounded-2xl px-5 border border-[#1A1A1A]">
              <SettingsItem
                label="Update Information"
                icon={UserRoundPen}
                isLast={!isEditOpen}
                isExpanded={isEditOpen}
                onPress={() => setIsEditOpen(!isEditOpen)}
              />

              {isEditOpen && (
                <View className="pb-6 pt-2">
                  <View className="flex-row gap-4">
                    <View className="flex-1">
                      <ProfileImagePicker
                        label="Profile Image"
                        imageUri={user?.imageUrl}
                        onPress={() => {}}
                      />
                    </View>
                  </View>

                  <CoverImagePicker
                    label="Cover Image"
                    imageUri="https://tse2.mm.bing.net/th/id/OIP._XuPSkfdjac9iIbQQrJ8sQHaED?w=2500&h=1369&rs=1&pid=ImgDetMain&o=7&rm=3"
                    onPress={() => {}}
                  />

                  <EditField
                    label="First Name"
                    placeholder="Enter first name"
                    value={user?.firstName || ""}
                  />
                  <EditField
                    label="Last Name"
                    placeholder="Enter last name"
                    value={user?.lastName || ""}
                  />

                  <TouchableOpacity
                    style={{ backgroundColor: COLORS.accent }}
                    className="w-full py-4 rounded-xl items-center mt-4 shadow-lg"
                  >
                    <Text className="text-black font-black uppercase tracking-widest text-xs">
                      Save Changes
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* 3. SETTINGS & OPTIONS SECTION */}
        <View className="px-5 mt-8">
          <Text className="text-white/30 text-[10px] font-black uppercase tracking-[2px] mb-2 px-1">
            Preferences
          </Text>
          <View className="bg-[#0A0A0A] rounded-2xl px-5 border border-[#1A1A1A]">
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
                {["English", "French"].map((lang) => (
                  <TouchableOpacity
                    key={lang}
                    onPress={() => {
                      setSelectedLanguage(lang);
                      setIsLanguageOpen(false);
                    }}
                    className="py-3 flex-row justify-between items-center pr-4"
                  >
                    <Text
                      className={`text-base ${selectedLanguage === lang ? "text-white font-bold" : "text-white/40"}`}
                    >
                      {lang}
                    </Text>
                    {selectedLanguage === lang && (
                      <View className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
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

        {/* 4. CONTENT SECTION */}
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
                      onDelete={() => {}}
                    />
                  ))
                ) : (
                  <View className="py-8 flex-row gap-2 items-center justify-center">
                    <PackageOpen color={"rgb(255 255 255 / 0.3)"} />
                    <Text className="text-white/30 font-bold">
                      No posts found
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
