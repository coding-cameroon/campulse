import { iutRegion } from "$/data/map";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { useCreatePost } from "@/hooks/usePosts";
import { useGetMe } from "@/hooks/useUser";
import { COLORS } from "@/utils/colors";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import {
  Banknote,
  Calendar,
  Camera,
  Ghost,
  Image as ImageIcon,
  MapPin,
  Search,
  Ticket,
  X,
} from "lucide-react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar as DatePicker } from "react-native-calendars";
import MapView from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const POST_TYPES = [
  {
    id: "feed",
    label: "Anonymous Feed",
    icon: Ghost,
    description: "Share anonymously · expires in 24h",
    color: "#a855f7",
  },
  {
    id: "event",
    label: "Campus Event",
    icon: Calendar,
    description: "Announce an event on campus",
    color: "#3b82f6",
  },
  {
    id: "lost_found",
    label: "Lost & Found",
    icon: Search,
    description: "Report a lost or found item · expires in 7d",
    color: "#f97316",
  },
];

const ITEM_STATUS = [
  { id: "lost", label: "Lost" },
  { id: "found", label: "Found" },
];

export type EventCategory =
  | "Academic"
  | "Tech"
  | "Social"
  | "Career"
  | "Sports";

const EVENT_CATEGORIES: EventCategory[] = [
  "Academic",
  "Tech",
  "Social",
  "Career",
  "Sports",
];

type PostCategory = "feed" | "event" | "lost_found";
type ItemStatus = "lost" | "found";

const CreatePostScreen = () => {
  const insets = useSafeAreaInsets();
  const { user } = useGetMe();
  const { mutateAsync: createPost, isPending } = useCreatePost();

  const [postType, setPostType] = useState<PostCategory>("feed");
  const [errors, setErrors] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [itemStatus, setItemStatus] = useState<ItemStatus>("lost");
  const [eventCategory, setEventCategory] = useState<EventCategory>("Academic");

  const [form, setForm] = useState({
    title: "",
    body: "",
    collectAt: "",
    lastSeenAt: "",
    phoneNumber: "",
    eventLocation: "",
    eventStartAt: "",
    eventCategory: "",
    eventEndAt: "",
    isFree: true,
    price: "",
    coords: { lat: 0, lng: 0 },
  });

  const updateForm = (key: keyof typeof form, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const snapPoints = useMemo(() => ["25%", "50%", "85%"], []);
  const sheetRef = useRef<BottomSheet>(null);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.75}
      />
    ),
    [],
  );

  const activeType = POST_TYPES.find((t) => t.id === postType)!;

  const handlePost = async () => {
    setErrors([]);
    const currentErrors: string[] = [];

    if (!form.body.trim())
      currentErrors.push("Please write something before posting.");

    if (postType !== "feed" && !form.title.trim()) {
      currentErrors.push("Please provide a title.");
    }

    if (postType !== "feed" && !form.phoneNumber.trim()) {
      currentErrors.push("Please provide a contact number.");
    }

    if (postType === "lost_found") {
      if (!form.lastSeenAt.trim())
        currentErrors.push("Please provide a last seen location.");
      if (!form.collectAt.trim())
        currentErrors.push("Please provide a collection point.");
    }

    if (postType === "event") {
      if (!eventCategory)
        currentErrors.push("Please select an event category.");
      if (!form.eventLocation.trim())
        currentErrors.push("Please provide the event venue.");
      if (!selectedDate) currentErrors.push("Please select an event date.");
      if (form.coords.lat === 0)
        currentErrors.push("Please pin the location on the map.");
      if (!form.isFree && !form.price.trim())
        currentErrors.push("Please set a price for paid events.");
    }

    if (currentErrors.length > 0) {
      setErrors(currentErrors);
      return;
    }

    const formData = new FormData();
    formData.append("category", postType);
    formData.append("body", form.body.trim());

    if (form.title.trim()) {
      formData.append("title", form.title.trim());
    }

    if (postType !== "feed") {
      formData.append("phoneNumber", form.phoneNumber.trim());
    }

    if (postType === "lost_found") {
      formData.append("itemStatus", itemStatus);
      formData.append("lastSeenAt", form.lastSeenAt.trim());
      formData.append("collectAt", form.collectAt.trim());
    }

    if (postType === "event") {
      formData.append("eventCategory", eventCategory);
      formData.append("eventLocation", form.eventLocation.trim());
      formData.append("eventStartAt", selectedDate);
      formData.append("eventEndAt", selectedDate);
      formData.append("isFree", String(form.isFree));
      formData.append("price", form.isFree ? "0" : form.price);
      formData.append(
        "mapCoordinates",
        JSON.stringify({ lat: form.coords.lat, lng: form.coords.lng }),
      );
    }

    try {
      await createPost(formData);

      switch (postType) {
        case "feed":
          router.replace("/(home)/post");
          break;
        case "lost_found":
          router.replace("/(home)/lost-found");
          break;
        case "event":
          router.replace("/(home)/event");
          break;
        default:
          console.warn("Unknown post type:", postType);
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Failed to publish. Try again.";
      setErrors([message]);
    }
  };

  // console.log(JSON.stringify(form, null, 2));

  return (
    <View className="flex-1 bg-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: insets.top + 10,
            paddingBottom: insets.bottom + 60,
            paddingHorizontal: 18,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── HEADER ── */}
          <View className="flex-row justify-between items-center mb-6 mt-2 border-b border-zinc-900 pb-4">
            <View>
              <Text className="text-zinc-500 text-[11px] font-black uppercase tracking-widest">
                Campulse
              </Text>
              <Text className="text-white text-4xl font-black tracking-tight">
                New Post
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/user/profile")}
              className="size-14 rounded-full overflow-hidden border-2"
              style={{ borderColor: activeType.color + "60" }}
            >
              <Image
                source={
                  user?.realAvatarUrl
                    ? { uri: user.realAvatarUrl }
                    : require("$/images/icon.png")
                }
                className="w-full h-full"
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>

          {/* ── CATEGORY SELECTOR ── */}
          <View className="mb-6">
            <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-3 ml-1">
              Post Category
            </Text>
            <View className="flex-row gap-2">
              {POST_TYPES.map((type) => {
                const isActive = postType === type.id;
                const Icon = type.icon;
                return (
                  <TouchableOpacity
                    key={type.id}
                    onPress={() => setPostType(type.id as PostCategory)}
                    activeOpacity={0.8}
                    className="flex-1 p-3 rounded-2xl items-center gap-2"
                    style={{
                      backgroundColor: isActive ? type.color + "18" : "#0d0d0d",
                      borderWidth: 1.5,
                      borderColor: isActive ? type.color : "#1a1a1a",
                    }}
                  >
                    <Icon size={20} color={isActive ? type.color : "#52525b"} />
                    <Text
                      className="text-[10px] font-black text-center"
                      style={{ color: isActive ? type.color : "#52525b" }}
                      numberOfLines={2}
                    >
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View
              className="flex-row items-center gap-2 mt-3 px-3 py-2 rounded-xl"
              style={{ backgroundColor: activeType.color + "10" }}
            >
              <activeType.icon size={12} color={activeType.color} />
              <Text
                className="text-[11px] font-semibold"
                style={{ color: activeType.color }}
              >
                {activeType.description}
              </Text>
            </View>
          </View>

          {/* ── COMMON USER CONTEXT ── */}
          <View className="gap-1">
            {postType === "feed" ? (
              <View
                className="flex-row items-center gap-3 p-3 rounded-2xl mb-4"
                style={{
                  backgroundColor: "#0d0d0d",
                  borderWidth: 1,
                  borderColor: "#1a1a1a",
                }}
              >
                <Image
                  source={
                    user?.anonymousAvatarUrl
                      ? { uri: user.anonymousAvatarUrl }
                      : require("$/images/icon.png")
                  }
                  className="size-10 rounded-full"
                />
                <View>
                  <Text className="text-white text-sm font-black">
                    {user?.anonymousName || "Anonymous"}
                  </Text>
                  <Text className="text-zinc-500 text-[11px] font-semibold">
                    Posting anonymously
                  </Text>
                </View>
              </View>
            ) : (
              <View
                className="flex-row items-center gap-3 p-3 rounded-2xl mb-4"
                style={{
                  backgroundColor: "#0d0d0d",
                  borderWidth: 1,
                  borderColor: "#1a1a1a",
                }}
              >
                <Image
                  source={
                    user?.realAvatarUrl
                      ? { uri: user.realAvatarUrl }
                      : require("$/images/icon.png")
                  }
                  className="size-10 rounded-full"
                />
                <View>
                  <Text className="text-white text-sm font-black">
                    {user?.firstName
                      ? `${user.firstName} ${user.lastName || ""}`
                      : user?.email}
                  </Text>
                  <Text className="text-zinc-500 text-[11px] font-semibold capitalize">
                    {user?.role}
                  </Text>
                </View>
              </View>
            )}

            {/* ── SHARED TITLE & DESCRIPTION ── */}
            {postType !== "feed" && (
              <InputField
                label="Title"
                placeholder={
                  postType === "event"
                    ? "Event name..."
                    : "What did you lose or find?"
                }
                value={form.title}
                onChangeText={(v) => updateForm("title", v)}
              />
            )}

            <InputField
              label={
                postType === "feed" ? "What's on your mind?" : "Description"
              }
              placeholder={
                postType === "feed"
                  ? "Share something anonymously..."
                  : postType === "event"
                    ? "Describe the event, who can attend, what to expect..."
                    : "Describe the item, when and where it was lost or found..."
              }
              multiline
              numberOfLines={5}
              style={{ height: 120, textAlignVertical: "top", paddingTop: 12 }}
              value={form.body}
              onChangeText={(v) => updateForm("body", v)}
            />

            {/* ── SHARED CONTACT NUMBER FIELD ── */}
            {postType !== "feed" && (
              <InputField
                label="Contact Number"
                placeholder="6XX XXX XXX"
                keyboardType="phone-pad"
                value={form.phoneNumber}
                onChangeText={(v) => updateForm("phoneNumber", v)}
              />
            )}

            {/* ── LOST & FOUND SPECIFIC ── */}
            {postType === "lost_found" && (
              <>
                <View className="mb-4">
                  <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                    Item Status
                  </Text>
                  <View className="flex-row gap-3">
                    {ITEM_STATUS.map((s) => (
                      <TouchableOpacity
                        key={s.id}
                        onPress={() => setItemStatus(s.id as ItemStatus)}
                        activeOpacity={0.8}
                        className="flex-1 py-3 rounded-xl items-center"
                        style={{
                          backgroundColor:
                            itemStatus === s.id
                              ? s.id === "lost"
                                ? "rgba(239,68,68,0.15)"
                                : "rgba(34,197,94,0.15)"
                              : "#0d0d0d",
                          borderWidth: 1.5,
                          borderColor:
                            itemStatus === s.id
                              ? s.id === "lost"
                                ? "#ef4444"
                                : "#22c55e"
                              : "#1a1a1a",
                        }}
                      >
                        <Text
                          className="font-black text-sm"
                          style={{
                            color:
                              itemStatus === s.id
                                ? s.id === "lost"
                                  ? "#ef4444"
                                  : "#22c55e"
                                : "#52525b",
                          }}
                        >
                          {s.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <InputField
                  label="Last Seen Location"
                  placeholder="e.g. Library, Block A corridor..."
                  value={form.lastSeenAt}
                  onChangeText={(v) => updateForm("lastSeenAt", v)}
                />

                <InputField
                  label="Collection Point"
                  placeholder="Where can it be returned or collected?"
                  value={form.collectAt}
                  onChangeText={(v) => updateForm("collectAt", v)}
                />

                <View className="mb-4 mt-1">
                  <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                    Attach Images
                  </Text>
                  <View className="flex-row gap-3">
                    <TouchableOpacity
                      className="flex-1 h-[50px] rounded-xl border border-zinc-800 flex-row items-center justify-center gap-2"
                      style={{ backgroundColor: "#0d0d0d" }}
                      activeOpacity={0.8}
                    >
                      <ImageIcon color="white" size={18} />
                      <Text className="text-white font-semibold text-sm">
                        Gallery
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="flex-1 h-[50px] rounded-xl border border-zinc-800 flex-row items-center justify-center gap-2"
                      style={{ backgroundColor: "#0d0d0d" }}
                      activeOpacity={0.8}
                    >
                      <Camera color="white" size={18} />
                      <Text className="text-white font-semibold text-sm">
                        Camera
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}

            {/* ── EVENT SPECIFIC ── */}
            {postType === "event" && (
              <>
                {/* EVENT CATEGORY DROPDOWN/SELECTOR */}
                <View className="mb-4">
                  <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                    Event Category
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="flex-row gap-2"
                  >
                    {EVENT_CATEGORIES.map((cat) => (
                      <TouchableOpacity
                        key={cat}
                        onPress={() => {
                          form.eventCategory = cat;
                          setEventCategory(cat);
                        }}
                        activeOpacity={0.8}
                        className="px-5 py-2.5 rounded-full mr-2"
                        style={{
                          backgroundColor:
                            eventCategory === cat ? COLORS.accent : "#0d0d0d",
                          borderWidth: 1,
                          borderColor:
                            eventCategory === cat ? COLORS.accent : "#1a1a1a",
                        }}
                      >
                        <Text
                          className="font-bold text-xs"
                          style={{
                            color: eventCategory === cat ? "black" : "#a1a1aa",
                          }}
                        >
                          {cat}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View className="mb-4">
                  <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                    Entry Type
                  </Text>
                  <View className="flex-row gap-3">
                    <TouchableOpacity
                      onPress={() => updateForm("isFree", true)}
                      activeOpacity={0.8}
                      className="flex-1 py-3 rounded-xl items-center flex-row justify-center gap-2"
                      style={{
                        backgroundColor: form.isFree
                          ? "rgba(34,197,94,0.15)"
                          : "#0d0d0d",
                        borderWidth: 1.5,
                        borderColor: form.isFree ? "#22c55e" : "#1a1a1a",
                      }}
                    >
                      <Ticket
                        size={16}
                        color={form.isFree ? "#22c55e" : "#52525b"}
                      />
                      <Text
                        className="font-black text-sm"
                        style={{ color: form.isFree ? "#22c55e" : "#52525b" }}
                      >
                        Free
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => updateForm("isFree", false)}
                      activeOpacity={0.8}
                      className="flex-1 py-3 rounded-xl items-center flex-row justify-center gap-2"
                      style={{
                        backgroundColor: !form.isFree
                          ? "rgba(239,68,68,0.15)"
                          : "#0d0d0d",
                        borderWidth: 1.5,
                        borderColor: !form.isFree ? "#ef4444" : "#1a1a1a",
                      }}
                    >
                      <Banknote
                        size={16}
                        color={!form.isFree ? "#ef4444" : "#52525b"}
                      />
                      <Text
                        className="font-black text-sm"
                        style={{ color: !form.isFree ? "#ef4444" : "#52525b" }}
                      >
                        Paid
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {!form.isFree && (
                  <InputField
                    label="Price (XAF)"
                    placeholder="Enter amount..."
                    keyboardType="numeric"
                    value={form.price}
                    onChangeText={(v) => updateForm("price", v)}
                  />
                )}

                <View className="mb-4">
                  <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                    Event Date
                  </Text>
                  <View
                    className="rounded-2xl overflow-hidden p-2"
                    style={{
                      backgroundColor: "#0d0d0d",
                      borderWidth: 1,
                      borderColor: "#1a1a1a",
                    }}
                  >
                    <DatePicker
                      minDate={new Date().toISOString().split("T")[0]}
                      onDayPress={(day) => {
                        setSelectedDate(day.dateString);
                        updateForm("eventStartAt", day.dateString);
                      }}
                      markedDates={{
                        [selectedDate]: {
                          selected: true,
                          disableTouchEvent: true,
                          selectedColor: COLORS.accent,
                          selectedTextColor: "black",
                        },
                      }}
                      theme={{
                        backgroundColor: "#0d0d0d",
                        calendarBackground: "#0d0d0d",
                        textSectionTitleColor: "#52525b",
                        selectedDayBackgroundColor: COLORS.accent,
                        selectedDayTextColor: "#000000",
                        todayTextColor: COLORS.accent,
                        dayTextColor: "#d4d4d8",
                        textDisabledColor: "#27272a",
                        dotColor: COLORS.accent,
                        selectedDotColor: "#000",
                        arrowColor: "white",
                        disabledArrowColor: "#27272a",
                        monthTextColor: "white",
                        indicatorColor: "white",
                        textDayFontWeight: "600",
                        textMonthFontWeight: "800",
                        textDayHeaderFontWeight: "700",
                        textDayFontSize: 14,
                        textMonthFontSize: 15,
                        textDayHeaderFontSize: 11,
                      }}
                    />
                  </View>

                  {selectedDate !== "" && (
                    <View
                      className="flex-row items-center gap-2 mt-2 px-3 py-2 rounded-xl"
                      style={{ backgroundColor: COLORS.accent + "15" }}
                    >
                      <Calendar size={12} color={COLORS.accent} />
                      <Text
                        className="text-[11px] font-bold"
                        style={{ color: COLORS.accent }}
                      >
                        Selected: {selectedDate}
                      </Text>
                    </View>
                  )}
                </View>

                <InputField
                  label="Venue / Location Name"
                  placeholder="e.g. Main Auditorium, Block C Room 12"
                  value={form.eventLocation}
                  onChangeText={(v) => updateForm("eventLocation", v)}
                />

                <View className="mb-4">
                  <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                    GPS Coordinates
                  </Text>
                  <TouchableOpacity
                    onPress={() => sheetRef.current?.snapToIndex(2)}
                    activeOpacity={0.8}
                    className="flex-row items-center gap-3 px-4 h-14 rounded-xl"
                    style={{
                      backgroundColor: "#0d0d0d",
                      borderWidth: 1,
                      borderColor:
                        form.coords.lat !== 0 ? COLORS.accent : "#1a1a1a",
                    }}
                  >
                    <MapPin
                      size={18}
                      color={form.coords.lat !== 0 ? COLORS.accent : "#52525b"}
                    />
                    <Text
                      className="text-sm font-semibold"
                      style={{
                        color:
                          form.coords.lat !== 0 ? COLORS.accent : "#52525b",
                      }}
                    >
                      {form.coords.lat !== 0
                        ? `${form.coords.lat.toFixed(5)}, ${form.coords.lng.toFixed(5)}`
                        : "Tap to pin location on map"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="mb-4">
                  <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                    Event Images
                  </Text>
                  <TouchableOpacity
                    className="h-[50px] rounded-xl border border-zinc-800 flex-row items-center justify-center gap-2"
                    style={{ backgroundColor: "#0d0d0d" }}
                    activeOpacity={0.8}
                  >
                    <ImageIcon color="white" size={18} />
                    <Text className="text-white font-semibold text-sm">
                      Add from Gallery
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* ── FEED MEDIA ── */}
            {postType === "feed" && (
              <View className="mb-4 mt-1">
                <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                  Attach Image (optional)
                </Text>
                <TouchableOpacity
                  className="h-[50px] rounded-xl border border-zinc-800 flex-row items-center justify-center gap-2"
                  style={{ backgroundColor: "#0d0d0d" }}
                  activeOpacity={0.8}
                >
                  <ImageIcon color="white" size={18} />
                  <Text className="text-white font-semibold text-sm">
                    Add from Gallery
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {errors.length > 0 &&
              errors.map((err, idx) => (
                <Text
                  key={idx}
                  className="text-xs font-bold text-red-500 tracking-wider my-1"
                >
                  {err}
                </Text>
              ))}

            <Button
              disabled={isPending}
              loading={isPending}
              onPress={handlePost}
              style={{ marginTop: 8 }}
            >
              <View className="flex-row items-center gap-2">
                <activeType.icon size={18} color="black" />
                <Text className="text-lg font-black text-black">
                  Publish{" "}
                  {postType === "feed"
                    ? "Anonymously"
                    : postType === "event"
                      ? "Event"
                      : "Report"}
                </Text>
              </View>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomSheet
        index={-1}
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "#0a0a0a" }}
        handleIndicatorStyle={{ backgroundColor: "#27272a" }}
      >
        <BottomSheetView style={{ flex: 1, paddingHorizontal: 16 }}>
          <View className="flex-row items-center justify-between my-3">
            <View>
              <Text className="text-white text-lg font-black">
                Pin Location
              </Text>
              <Text className="text-zinc-500 text-xs font-semibold">
                Long press on the map to select
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => sheetRef.current?.close()}
              className="size-9 bg-zinc-800 border border-zinc-700 rounded-full items-center justify-center"
            >
              <X size={16} color="white" />
            </TouchableOpacity>
          </View>

          <MapView
            mapType="hybrid"
            initialRegion={iutRegion}
            onLongPress={(e) => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              updateForm("coords", { lat: latitude, lng: longitude });
            }}
            style={{ height: 280, width: "100%", borderRadius: 16 }}
          />

          <View className="mt-4 flex-row gap-3">
            <View
              className="flex-1 px-4 py-3 rounded-xl"
              style={{
                backgroundColor: "#0d0d0d",
                borderWidth: 1,
                borderColor: "#1a1a1a",
              }}
            >
              <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">
                Latitude
              </Text>
              <Text className="text-white font-bold text-sm">
                {form.coords.lat !== 0 ? form.coords.lat.toFixed(6) : "Not set"}
              </Text>
            </View>
            <View
              className="flex-1 px-4 py-3 rounded-xl"
              style={{
                backgroundColor: "#0d0d0d",
                borderWidth: 1,
                borderColor: "#1a1a1a",
              }}
            >
              <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">
                Longitude
              </Text>
              <Text className="text-white font-bold text-sm">
                {form.coords.lng !== 0 ? form.coords.lng.toFixed(6) : "Not set"}
              </Text>
            </View>
          </View>

          {form.coords.lat !== 0 && (
            <TouchableOpacity
              onPress={() => sheetRef.current?.close()}
              className="mt-4 py-4 rounded-2xl items-center flex-row justify-center gap-2"
              style={{ backgroundColor: COLORS.accent }}
            >
              <MapPin size={16} color="black" />
              <Text className="text-black font-black text-sm">
                Confirm Location
              </Text>
            </TouchableOpacity>
          )}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default CreatePostScreen;
