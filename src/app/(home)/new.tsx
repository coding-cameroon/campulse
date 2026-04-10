import { iutRegion } from "$/data/map";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { COLORS } from "@/utils/colors";
import { useUser } from "@clerk/expo";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import {
  Calendar,
  Camera,
  ChevronDown,
  ChevronUp,
  Ghost,
  Image as ImageIcon,
  MapPin,
  Megaphone,
  Search,
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
  { id: "announcement", label: "Announcement", icon: Megaphone },
  { id: "lost_found", label: "Lost & Found", icon: Search },
  { id: "events", label: "Campus Event", icon: Calendar },
  { id: "anonymous_feed", label: "Anonymous Feed", icon: Ghost },
];

const CreatePostScreen = () => {
  const insets = useSafeAreaInsets();
  const [isExpanded, setIsExpanded] = useState(true);
  const [postType, setPostType] = useState("anonymous_feed");
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState<string>("");

  const [form, setForm] = useState({
    name: "",
    desc: "",
    contact: "",
    locationName: "",
    eventDate: "",
    source: "",
    coords: { lat: 0, long: 0 },
  });

  const { user } = useUser();

  const toggleAccordion = () => setIsExpanded(!isExpanded);

  const handleSelectType = (id: string) => {
    setPostType(id);
    setIsExpanded(false);
  };

  const handlePost = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const renderMediaActions = (allowCamera: boolean) => (
    <View className="flex-row gap-3 mb-6 mt-2.5">
      <TouchableOpacity
        className="flex-1 h-[50px] bg-[#121212] rounded-xl border border-[#333] flex-row items-center justify-center gap-2"
        activeOpacity={0.8}
      >
        <ImageIcon color={COLORS.light} size={20} />
        <Text className="text-white font-semibold">Gallery</Text>
      </TouchableOpacity>

      {allowCamera && (
        <TouchableOpacity
          className="flex-1 h-[50px] bg-[#121212] rounded-xl border border-[#333] flex-row items-center justify-center gap-2"
          activeOpacity={0.8}
        >
          <Camera color={COLORS.light} size={20} />
          <Text className="text-white font-semibold">Camera</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const snapPoints = useMemo(() => ["25%", "50%", "70%", "90%"], []);
  const sheetRef = useRef<BottomSheet>(null);
  const onOpenSheet = () => {
    sheetRef.current?.snapToIndex(2);
  };
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.7}
      />
    ),
    [],
  );

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
            paddingBottom: insets.bottom + 40,
            paddingHorizontal: 18,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* --- TOP HEADER --- */}
          <View className="flex-row justify-between items-center mb-6 mt-2.5 border-b-[0.5px] border-[#333] pb-4">
            <Text className="text-white text-4xl font-[800]">New Post</Text>
            <TouchableOpacity
              className="size-14 flex rounded-full bg-[#1A1A1A] justify-center items-center border border-[#333]"
              activeOpacity={0.7}
              onPress={() => router.push("/user/profile")}
            >
              <Image
                source={{ uri: user?.imageUrl }}
                style={{ width: 37, height: 37, borderRadius: 50 }}
              />
            </TouchableOpacity>
          </View>

          {/* --- ACCORDION SELECTOR --- */}
          <View className="bg-[#121212] rounded-2xl border border-[#222] overflow-hidden mb-6">
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row justify-between items-center p-4"
              onPress={toggleAccordion}
            >
              <View className="gap-1">
                <Text className="text-[10px] font-bold tracking-widest uppercase text-white/50">
                  POST TYPE
                </Text>
                <Text className="text-white text-lg font-bold">
                  {POST_TYPES.find((t) => t.id === postType)?.label}
                </Text>
              </View>
              {isExpanded ? (
                <ChevronUp color={COLORS.gray} />
              ) : (
                <ChevronDown color={COLORS.gray} />
              )}
            </TouchableOpacity>

            {isExpanded && (
              <View className="flex-row flex-wrap p-3 gap-2 border-t border-[#222]">
                {POST_TYPES.map((item) => {
                  const isActive = postType === item.id;
                  return (
                    <TouchableOpacity
                      key={item.id}
                      className={`flex-1 min-w-[45%] p-4 rounded-xl items-center gap-2 ${isActive ? "bg-white" : "bg-[#1A1A1A]"}`}
                      onPress={() => handleSelectType(item.id)}
                    >
                      <item.icon
                        color={isActive ? "black" : COLORS.light}
                        size={22}
                      />
                      <Text
                        className={`text-[12px] font-semibold ${isActive ? "text-black" : "text-white"}`}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>

          {/* --- FORM FIELDS --- */}
          <View className="gap-1">
            <InputField
              label="Title"
              placeholder="What's happening?"
              value={form.name}
              onChangeText={(v) => setForm({ ...form, name: v })}
            />

            <InputField
              label="Description"
              placeholder="Provide more details..."
              multiline
              numberOfLines={4}
              style={{ height: 100, textAlignVertical: "top", paddingTop: 12 }}
              value={form.desc}
              onChangeText={(v) => setForm({ ...form, desc: v })}
            />

            {postType === "announcement" && (
              <InputField
                label="Source"
                placeholder="e.g. Student Union, Registrar's Office"
                value={form.source}
                onChangeText={(v) => setForm({ ...form, source: v })}
              />
            )}

            {postType === "lost_found" && (
              <>
                <InputField
                  label="Contact Details"
                  placeholder="Phone or Social handle"
                  value={form.contact}
                  onChangeText={(v) => setForm({ ...form, contact: v })}
                />
                <InputField
                  label="Last Seen Location"
                  placeholder="e.g. Faculty of Science"
                  value={form.locationName}
                  onChangeText={(v) => setForm({ ...form, locationName: v })}
                />
                {renderMediaActions(true)}
              </>
            )}

            {postType === "events" && (
              <>
                <Text className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-2 ml-1">
                  SELECT EVENT DATE
                </Text>
                <View className="bg-[#121212] rounded-2xl border border-[#222] overflow-hidden mb-6 p-2">
                  <DatePicker
                    minDate={new Date().toISOString().split("T")[0]}
                    onDayPress={(day) => {
                      setSelected(day.dateString);
                      setForm({ ...form, eventDate: day.dateString });
                    }}
                    markedDates={{
                      [selected]: {
                        selected: true,
                        disableTouchEvent: true,
                        selectedColor: COLORS.accent || "white",
                        selectedTextColor: "black",
                      },
                    }}
                    theme={{
                      backgroundColor: "#121212",
                      calendarBackground: "#121212",
                      textSectionTitleColor: "#b6c1cd",
                      selectedDayBackgroundColor: COLORS.accent || "white",
                      selectedDayTextColor: "#000000",
                      todayTextColor: COLORS.accent || "white",
                      dayTextColor: "#d9e1e8",
                      textDisabledColor: "#444",
                      dotColor: COLORS.accent || "white",
                      selectedDotColor: "#000",
                      arrowColor: "white",
                      disabledArrowColor: "#222",
                      monthTextColor: "white",
                      indicatorColor: "white",
                      textDayFontWeight: "600",
                      textMonthFontWeight: "bold",
                      textDayHeaderFontWeight: "500",
                      textDayFontSize: 14,
                      textMonthFontSize: 16,
                      textDayHeaderFontSize: 12,
                    }}
                  />
                </View>

                <InputField
                  label="Venue / Venue Name"
                  placeholder="e.g. Main Auditorium"
                  value={form.locationName}
                  onChangeText={(v) => setForm({ ...form, locationName: v })}
                />
                <View className="bg-[#121212] p-4 rounded-xl border border-[#333] my-3">
                  <Text className="text-white text-[12px] font-bold mb-3 uppercase">
                    LOCATION COORDINATES (GPS)
                  </Text>
                  <TouchableOpacity
                    className="h-14 bg-black rounded-lg flex-row items-center px-4 gap-3 border border-[#222]"
                    activeOpacity={0.8}
                    onPress={onOpenSheet}
                  >
                    <MapPin color={COLORS.gray} size={20} />
                    <Text className="text-gray text-[14px]">
                      {form.coords.lat
                        ? `${form.coords.lat.toFixed(4)}, ${form.coords.long.toFixed(4)}`
                        : "Open Map to set location"}
                    </Text>
                  </TouchableOpacity>
                  <Button style={{ backgroundColor: "#1A1A1A", marginTop: 12 }}>
                    <Text className="text-white font-semibold">
                      Use Current Location
                    </Text>
                  </Button>
                </View>
                {renderMediaActions(false)}
              </>
            )}

            {(postType === "announcement" || postType === "anonymous_feed") &&
              renderMediaActions(false)}

            <Button loading={loading} onPress={handlePost} className="mt-2.5">
              <Text className="text-lg font-bold text-black">Publish Post</Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomSheet
        index={-1}
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "#111" }}
        handleIndicatorStyle={{ backgroundColor: "#fff" }}
      >
        <BottomSheetView style={{ flex: 1, paddingHorizontal: 10 }}>
          <View className="flex-row items-center justify-between px-2 my-2">
            <Text className="text-xl font-bold tracking-wide text-light">
              Select the location
            </Text>
            <TouchableOpacity
              onPress={() => sheetRef.current?.close()}
              className="size-8 bg-dark-2 border-[0.7px] border-dark-1 rounded-full items-center justify-center"
            >
              <X size={17} color={"white"} />
            </TouchableOpacity>
          </View>

          {/* MAP */}
          <View className="w-full items-center mt-3">
            <MapView
              mapType="hybrid"
              initialRegion={iutRegion}
              onLongPress={(e) => {
                const { latitude, longitude } = e.nativeEvent.coordinate;

                setForm((prev) => ({
                  ...prev,
                  coords: {
                    lat: latitude,
                    long: longitude,
                  },
                }));
              }}
              style={{ height: 300, width: "97%", borderRadius: 20 }}
            />
          </View>

          {/* COORDINATES */}
          <View className="flex mt-8">
            <Text className="text-lg font-bold text-light ml-1 mb-3">
              Selected coordinates
            </Text>

            <View className="px-2 mt-3">
              <Text className="font-semibold text-xs text-light uppercase tracking-widest mb-2">
                Latitute
              </Text>

              <View className="flex flex-row items-center justify-start h-[50px] bg-[#121212] border border-[#333] rounded-lg px-[10px]">
                <Text className="text-md text-light tracking-widest">
                  {form.coords.lat || "0.00"}
                </Text>
              </View>
            </View>

            <View className="px-2 mt-6">
              <Text className="font-semibold text-xs text-light uppercase tracking-widest mb-2">
                longitude
              </Text>

              <View className="flex flex-row items-center justify-start h-[50px] bg-[#121212] border border-[#333] rounded-lg px-[10px]">
                <Text className="text-md text-light tracking-widest">
                  {form.coords.long || "0.00"}
                </Text>
              </View>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default CreatePostScreen;
