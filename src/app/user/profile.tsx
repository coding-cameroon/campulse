import { MOCK_POSTS } from "$/data/post";
import { useDeactivateUser, useGetMe, useUpdateName } from "@/hooks/useUser";
import { COLORS } from "@/utils/colors";
import { useAuth } from "@clerk/expo";
// import * as ImagePicker from "expo-image-picker";
import { Stack, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
  ArrowLeft,
  Camera,
  ChevronRight,
  CircleUser,
  Languages,
  LayoutList,
  LogOut,
  TriangleAlert,
  UserRoundPen,
} from "lucide-react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
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

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useGetMe();
  const { signOut } = useAuth();
  const { i18n, t } = useTranslation("profile");
  const {
    mutateAsync: updateUsername,
    isPending,
    isError,
    error,
  } = useUpdateName();
  const { mutateAsync: deactivateUser, isPending: isSignOutPending } =
    useDeactivateUser();

  const [image, setImage] = useState<string | null>();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isPostsOpen, setIsPostsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [myPosts, setMyPosts] = useState(MOCK_POSTS.slice(0, 5));

  // update name
  const [payload, setPayload] = useState({ firstname: "", lastname: "" });

  const [modalConfig, setModalConfig] = useState({
    visible: false,
    title: "",
    description: "",
    confirmText: "",
    isDestructive: true,
    onConfirm: () => {},
  });

  const closeModal = () =>
    setModalConfig((prev) => ({ ...prev, visible: false }));

  const getDisplayName = () => {
    if (user?.firstName && user?.lastName)
      return `${user.firstName} ${user.lastName}`;
    const emailHandle = user?.email.split("@")[0];
    return emailHandle
      ? emailHandle.charAt(0).toUpperCase() + emailHandle.slice(1)
      : "Guest";
  };

  const changeLanguage = async (lang: string) => {
    await SecureStore.setItemAsync("language", lang);
    i18n.changeLanguage(lang);
  };

  // UPDATE USER FN
  const handleNameUpdate = async () => {
    try {
      await updateUsername(payload);

      console.log("Name updated successfully!");
      console.log(JSON.stringify(user, null, 2));

      // Close the edit accordion on success
      setIsEditOpen(false);

      // Optionally alert the user
      console.log("Name updated successfully!");
    } catch (error) {
      // Errors are already handled in the hook's onError,
      // but you can catch them here for local UI logic too.
      console.log(error);
    }
  };

  // DEACTIVATE USER FN
  const handleDeactivateUser = async () => {
    try {
      const { success, data } = await deactivateUser(user?.id!);

      if (!success || !data) return;

      console.log("User deactivated.");
    } catch (error) {
      console.log(error);
    }
  };

  // SIGN OUT FN
  const initiateSignOut = () => {
    setModalConfig({
      visible: true,
      isDestructive: true,
      title: t("preferences.signOutConfirm.title"),
      description: t("preferences.signOutConfirm.description"),
      confirmText: t("preferences.signOut"),
      onConfirm: async () => {
        try {
          // await handleDeactivateUser();
          await signOut();
          closeModal();

          router.replace("/(auth)/sign-in");
        } catch (error) {
          console.error("Error signing out:", error);
        }
      },
    });
  };

  // PICK IMAGE
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
    // const permissionResult =
    //   await ImagePicker.requestMediaLibraryPermissionsAsync();
    // if (!permissionResult.granted) {
    //   Alert.alert(
    //     "Permission required",
    //     "Permission to access the media library is required.",
    //   );
    //   return;
    // }
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ["images", "videos"],
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });
    // console.log(result);
    // if (!result.canceled) {
    //   setImage(result.assets[0].uri);
    // }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      className="bg-black"
    >
      {/* ── ALERT MODAL ── */}
      <Modal
        transparent
        visible={modalConfig.visible}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-center items-center bg-black/80 px-10">
          <View className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-[24px] p-6 items-center">
            <View
              className={`${modalConfig.isDestructive ? "bg-red-500/10" : "bg-white/5"} p-4 rounded-full mb-4`}
            >
              <TriangleAlert
                color={modalConfig.isDestructive ? "#ef4444" : "white"}
                size={32}
              />
            </View>
            <Text className="text-white text-xl font-bold mb-2">
              {modalConfig.title}
            </Text>
            <Text className="text-white/50 text-center text-sm mb-8 leading-5">
              {modalConfig.description}
            </Text>
            <View className="w-full gap-3">
              <TouchableOpacity
                onPress={modalConfig.onConfirm}
                className={`w-full ${modalConfig.isDestructive ? "bg-red-500" : "bg-white"} py-4 rounded-xl items-center`}
              >
                <Text
                  className={`${modalConfig.isDestructive ? "text-white" : "text-black"} font-bold text-base`}
                >
                  {modalConfig.confirmText}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeModal}
                className="w-full bg-white/5 py-4 rounded-xl items-center border border-white/5"
              >
                <Text className="text-white font-bold text-base">
                  {t("preferences.signOutConfirm.cancel")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView
        className="bg-black"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
      >
        {/* ── 1. COVER ── */}
        <View style={{ width }} className="h-[220px]">
          <Image
            source={{
              uri: user?.coverAvatarUrl || "",
            }}
            className="h-full w-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black/40" />
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-10 left-5 z-10 p-2.5 rounded-full bg-black/50 border border-white/10"
          >
            <ArrowLeft color="white" size={22} />
          </TouchableOpacity>
        </View>

        {/* ── 2. PROFILE HEADER ── */}
        <View className="items-center px-5 -mt-[55px]">
          <Image
            source={{ uri: user?.realAvatarUrl || "" }}
            className="size-[130px] rounded-full border-4 border-black"
          />

          <View className="items-center mt-4 mb-1">
            <Text className="text-3xl font-black tracking-wide text-white">
              {getDisplayName()}
            </Text>
            <Text className="mt-1 text-sm font-semibold text-white/40">
              {user?.email}
            </Text>
          </View>

          {/* ── ACCOUNT DETAILS ── */}
          <View className="w-full mt-8">
            <Text className="text-white/30 text-[10px] font-black uppercase tracking-[2px] mb-2 px-1">
              {t("profile.accountDetails")}
            </Text>
            <View className="w-full rounded-2xl border border-[#1A1A1A] bg-[#0A0A0A] px-5">
              {/* Username row */}
              <View className="flex-row items-center justify-between py-4 border-b border-[#1A1A1A]">
                <View className="flex-row items-center gap-2.5">
                  <CircleUser color="rgba(255,255,255,0.3)" size={18} />
                  <Text className="text-[10px] font-bold uppercase text-white/50 tracking-widest">
                    {t("profile.username")}
                  </Text>
                </View>
                <Text
                  className="text-md font-extrabold"
                  style={{ color: COLORS.accent }}
                >
                  @{user?.anonymousName}
                </Text>
              </View>

              {/* Role row */}
              <View className="flex-row items-center justify-between py-4">
                <View className="flex-row items-center gap-2.5">
                  <CircleUser color="rgba(255,255,255,0.3)" size={18} />
                  <Text className="text-[10px] font-bold uppercase text-white/50 tracking-widest">
                    {t("profile.userRole")}
                  </Text>
                </View>
                <Text
                  className="text-sm font-extrabold"
                  style={{ color: COLORS.accent }}
                >
                  {user?.role || t("profile.userRole")}
                </Text>
              </View>
            </View>
          </View>

          {/* ── EDIT PROFILE ── */}
          <View className="w-full mt-8">
            <Text className="text-white/30 text-[10px] font-black uppercase tracking-[2px] mb-2 px-1">
              {t("profile.editProfile.title")}
            </Text>
            <View className="bg-[#0A0A0A] rounded-2xl px-5 border border-[#1A1A1A]">
              <TouchableOpacity
                onPress={() => setIsEditOpen(!isEditOpen)}
                activeOpacity={0.7}
                className={`flex-row items-center justify-between py-4 ${isEditOpen ? "" : ""}`}
              >
                <View className="flex-row items-center gap-3">
                  <View className="p-2 rounded-lg bg-white/5">
                    <UserRoundPen color="white" size={20} />
                  </View>
                  <Text className="text-base font-bold text-white">
                    {t("profile.editProfile.updateInfo")}
                  </Text>
                </View>
                <View
                  style={{
                    transform: [{ rotate: isEditOpen ? "90deg" : "0deg" }],
                  }}
                >
                  <ChevronRight color="white" size={20} opacity={0.3} />
                </View>
              </TouchableOpacity>

              {isEditOpen && (
                <View className="pb-6 pt-2">
                  <Stack.Screen
                    options={{
                      animationTypeForReplace: "push",
                      animation: "slide_from_left",
                    }}
                  />

                  {/* Profile image picker */}
                  <View className="mb-6 items-center">
                    <Text className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-3 self-start ml-1">
                      {t("profile.editProfile.profileImage")}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      className="relative items-center justify-center"
                      onPress={() => {}}
                    >
                      <View className="size-28 rounded-full border-2 border-white/10 overflow-hidden bg-white/5 items-center justify-center">
                        {user?.realAvatarUrl ? (
                          <Image
                            source={{ uri: user.realAvatarUrl }}
                            className="size-full"
                          />
                        ) : (
                          <CircleUser color="rgba(255,255,255,0.2)" size={48} />
                        )}
                      </View>
                      <TouchableOpacity
                        onPress={async () => await pickImage()}
                        className="absolute bottom-1 right-1 p-2 rounded-full border-2 border-black"
                        style={{ backgroundColor: COLORS.accent }}
                      >
                        <Camera color="black" size={16} />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </View>

                  {/* Cover image picker */}
                  <View className="mb-6">
                    <Text className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-3 ml-1">
                      {t("profile.editProfile.coverImage")}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {}}
                      className="relative w-full h-32 rounded-xl border-2 border-white/10 overflow-hidden bg-white/5 items-center justify-center"
                    >
                      <Image
                        source={{
                          uri: user?.coverAvatarUrl || "",
                        }}
                        className="size-full"
                        resizeMode="cover"
                      />
                      <View
                        className="absolute bottom-2 right-2 p-2 rounded-full border-2 border-black"
                        style={{ backgroundColor: COLORS.accent }}
                      >
                        <Camera color="black" size={16} />
                      </View>
                    </TouchableOpacity>
                  </View>

                  {/* First name */}
                  <View className="mb-4">
                    <Text className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1.5 ml-1">
                      {t("profile.editProfile.firstName")}
                    </Text>
                    <TextInput
                      placeholder={t(
                        "profile.editProfile.placeholders.firstName",
                      )}
                      onChangeText={(text) =>
                        setPayload((prev) => ({ ...prev, firstname: text }))
                      }
                      placeholderTextColor="rgba(255,255,255,0.2)"
                      defaultValue={user?.firstName || ""}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-semibold"
                    />
                  </View>

                  {/* Last name */}
                  <View className="mb-4">
                    <Text className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1.5 ml-1">
                      {t("profile.editProfile.lastName")}
                    </Text>
                    <TextInput
                      placeholder={t(
                        "profile.editProfile.placeholders.lastName",
                      )}
                      onChangeText={(text) =>
                        setPayload((prev) => ({ ...prev, lastname: text }))
                      }
                      placeholderTextColor="rgba(255,255,255,0.2)"
                      defaultValue={user?.lastName || ""}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-semibold"
                    />
                  </View>

                  {isError && (
                    <Text className="text-xs font-bold text-red-500 tracking-wider">
                      {error?.response?.data?.message || error.message}
                    </Text>
                  )}

                  <TouchableOpacity
                    disabled={isPending}
                    style={{ backgroundColor: COLORS.accent }}
                    className="w-full py-4 rounded-xl items-center mt-4"
                    onPress={handleNameUpdate}
                  >
                    {isPending ? (
                      <ActivityIndicator size={"small"} color="#000" />
                    ) : (
                      <Text className="text-black font-black uppercase tracking-widest text-xs">
                        {t("profile.editProfile.save")}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* ── 3. PREFERENCES ── */}
        <View className="px-5 mt-8">
          <Text className="text-white/30 text-[10px] font-black uppercase tracking-[2px] mb-2 px-1">
            {t("preferences.title")}
          </Text>
          <View className="bg-[#0A0A0A] rounded-2xl px-5 border border-[#1A1A1A]">
            {/* Language toggle */}
            <TouchableOpacity
              onPress={() => setIsLanguageOpen(!isLanguageOpen)}
              activeOpacity={0.7}
              className="flex-row items-center justify-between py-4 border-b border-[#1A1A1A]"
            >
              <View className="flex-row items-center gap-3">
                <View className="p-2 rounded-lg bg-white/5">
                  <Languages color="white" size={20} />
                </View>
                <Text className="text-base font-bold text-white">
                  {t("preferences.language")}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="text-white/40 font-semibold">
                  {selectedLanguage}
                </Text>
                <View
                  style={{
                    transform: [{ rotate: isLanguageOpen ? "90deg" : "0deg" }],
                  }}
                >
                  <ChevronRight color="white" size={20} opacity={0.3} />
                </View>
              </View>
            </TouchableOpacity>

            {isLanguageOpen && (
              <View className="py-2 pl-12 gap-y-1 border-b border-[#1A1A1A]">
                {["English", "French"].map((lang) => (
                  <TouchableOpacity
                    key={lang}
                    onPress={async () => {
                      const lng = lang === "English" ? "en" : "fr";
                      await changeLanguage(lng);
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

            {/* Sign out */}
            <TouchableOpacity
              onPress={initiateSignOut}
              activeOpacity={0.7}
              className="flex-row items-center justify-between py-4"
            >
              {isSignOutPending ? (
                <ActivityIndicator size={"small"} color="#ef4444" />
              ) : (
                <View className="flex-row items-center gap-3">
                  <View className="p-2 rounded-lg bg-red-500/10">
                    <LogOut color="#ef4444" size={20} />
                  </View>
                  <Text className="text-base font-bold text-red-500">
                    {t("preferences.signOut")}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* ── 4. MY POSTS ── */}
        <View className="px-5 mt-8">
          <Text className="text-white/30 text-[10px] font-black uppercase tracking-[2px] mb-2 px-1">
            {t("content.title")}
          </Text>
          <View className="bg-[#0A0A0A] rounded-2xl px-5 border border-[#1A1A1A]">
            <TouchableOpacity
              onPress={() => setIsPostsOpen(!isPostsOpen)}
              activeOpacity={0.7}
              className={`flex-row items-center justify-between py-4 ${isPostsOpen ? "border-b border-[#1A1A1A]" : ""}`}
            >
              <View className="flex-row items-center gap-3">
                <View className="p-2 rounded-lg bg-white/5">
                  <LayoutList color="white" size={20} />
                </View>
                <Text className="text-base font-bold text-white">
                  {t("content.myPosts")}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="text-white/40 font-semibold">
                  {myPosts.length}
                </Text>
                <View
                  style={{
                    transform: [{ rotate: isPostsOpen ? "90deg" : "0deg" }],
                  }}
                >
                  <ChevronRight color="white" size={20} opacity={0.3} />
                </View>
              </View>
            </TouchableOpacity>

            {/* {isPostsOpen && (
              <View className="pb-4">
                {myPosts.length > 0 ? (
                  myPosts.map((post, idx) => (
                    <View
                      key={post._id}
                      className={`flex-row items-center justify-between py-4 ${idx === myPosts.length - 1 ? "" : "border-b border-[#1A1A1A]"}`}
                    >
                      <View className="flex-1 pr-4">
                        <Text
                          className="text-white font-bold text-base"
                          numberOfLines={1}
                        >
                          {post.content}
                        </Text>
                        <View className="flex-row gap-1 items-center mt-1">
                          <Clock
                            color="rgba(255,255,255,0.3)"
                            size={12}
                            style={{ marginTop: 2 }}
                          />
                          <Text className="text-white/30 text-[10px] mt-1 uppercase font-bold">
                            {formatDate(post.createdAt as string)}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          setMyPosts((prev) =>
                            prev.filter((p) => p._id !== post._id),
                          )
                        }
                        activeOpacity={0.7}
                        className="p-2 bg-red-500/10 rounded-lg"
                      >
                        <Trash2 color="#ef4444" size={18} />
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <View className="py-8 flex-row gap-2 items-center justify-center">
                    <PackageOpen color="rgba(255,255,255,0.3)" />
                    <Text className="text-white/30 font-bold">
                      {t("content.noPost")}
                    </Text>
                  </View>
                )}
              </View>
            )} */}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
