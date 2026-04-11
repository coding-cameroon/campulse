import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import dayjs from "dayjs";
import {
  CalendarDays,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Ticket,
  X,
} from "lucide-react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { events } from "$/data/event";
import CommentsBottomSheet from "@/components/CustomBottomSheet";
import EmptyState from "@/components/EmptyListComponent";
import { EventCard } from "@/components/EventCard";
import SimpleImageAlert from "@/components/ImageOverLay";
import InputField from "@/components/InputField";
import { COLORS } from "@/utils/colors";
import { CampusEvent, EventCategory } from "../../../types";

export default function EventsScreen() {
  const insets = useSafeAreaInsets();

  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<EventCategory | "All">("All");
  const [searchText, setSearchText] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<CampusEvent | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [imageAlertVisible, setImageAlertVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // ✅ Comments state lives at screen level
  const [activeCommentEventId, setActiveCommentEventId] = useState<
    string | null
  >(null);
  const [commentsByEvent, setCommentsByEvent] = useState<Record<string, any[]>>(
    {},
  );

  const detailSheetRef = useRef<BottomSheet>(null);
  const commentsSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["40%", "80%"], []);
  const commentSnapPoints = useMemo(() => ["75%"], []);

  const categories: (EventCategory | "All")[] = [
    "All",
    "Academic",
    "Tech",
    "Social",
    "Career",
    "Sports",
  ];

  const filteredEvents = useMemo(() => {
    let result = events;
    if (activeTab !== "All") {
      result = result.filter((e) => e.category === activeTab);
    }
    if (searchText) {
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(searchText.toLowerCase()) ||
          e.location.toLowerCase().includes(searchText.toLowerCase()),
      );
    }
    return result;
  }, [activeTab, searchText]);

  const handlePresentModal = useCallback((event: CampusEvent) => {
    setSelectedEvent(event);
    setSheetOpen(true);
    detailSheetRef.current?.snapToIndex(1);
  }, []);

  const handleCloseSheet = () => {
    detailSheetRef.current?.close();
  };

  // ✅ Opens the comments sheet at screen level — always works
  const handleCommentPress = useCallback((eventId: string) => {
    setActiveCommentEventId(eventId);
    commentsSheetRef.current?.expand();
  }, []);

  // ✅ Adds comment to the correct event's list
  const handleSendComment = async (text: string) => {
    if (!activeCommentEventId) return;
    const newComment = {
      _id: Date.now().toString(),
      content: text,
      author: { fullName: "You", avatarUrl: null },
      createdAt: new Date().toISOString(),
    };
    setCommentsByEvent((prev: any) => ({
      ...prev,
      [activeCommentEventId]: [
        ...(prev[activeCommentEventId] || []),
        newComment,
      ],
    }));
  };

  const handleImagePress = (uri: string) => {
    setSelectedImage(uri);
    setImageAlertVisible(true);
  };

  const handleImageAlertClose = () => {
    setImageAlertVisible(false);
    setSelectedImage(null);
  };

  const renderDetailBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        disappearsOnIndex={0}
        opacity={0.75}
        pressBehavior="close"
      />
    ),
    [],
  );

  const openWhatsApp = (phoneNumber: string) => {
    if (!selectedEvent) return;
    const cleanNumber = phoneNumber.replace(/\s/g, "");
    const message = `Hello! I'm interested in the event: *${selectedEvent.title}* 🗓️\n📍 Location: ${selectedEvent.location}\n💰 Entry: ${selectedEvent.isFree ? "Free" : `${selectedEvent.price} CFA`}`;
    const url = `whatsapp://send?phone=${cleanNumber}&text=${encodeURIComponent(message)}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) Linking.openURL(url);
      else Alert.alert("Error", "WhatsApp is not installed on this device");
    });
  };

  // Active event's comments
  const activeComments = activeCommentEventId
    ? commentsByEvent[activeCommentEventId] || []
    : [];

  return (
    <>
      {/* ── IMAGE VIEWER ── */}
      {selectedImage && (
        <SimpleImageAlert
          visible={imageAlertVisible}
          onClose={handleImageAlertClose}
          imageSource={{ uri: selectedImage }}
        />
      )}

      <View className="flex-1 bg-black">
        {/* ── HEADER ── */}
        <View
          style={{ paddingTop: insets.top + 10 }}
          className="px-4 pb-4 bg-black z-10"
        >
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-zinc-600 font-bold uppercase tracking-widest text-xs">
                IUT Douala
              </Text>
              <Text className="text-white text-5xl font-black mt-1">
                Events
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setIsSearching(!isSearching);
                if (isSearching) setSearchText("");
              }}
              className="bg-zinc-900 rounded-full size-[42px] items-center justify-center border border-zinc-800"
            >
              {isSearching ? (
                <X color="white" size={18} />
              ) : (
                <Search color="white" size={18} />
              )}
            </TouchableOpacity>
          </View>

          {isSearching ? (
            <View className="mb-4">
              <InputField
                autoFocus
                placeholder="Search for an event..."
                value={searchText}
                onChangeText={setSearchText}
                style={{
                  borderRadius: 60,
                  height: 46,
                  backgroundColor: "#111",
                }}
              />
            </View>
          ) : (
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setActiveTab(item)}
                  className="mr-2 px-5 py-2.5 rounded-full border"
                  style={{
                    backgroundColor:
                      activeTab === item ? COLORS.accent : "transparent",
                    borderColor: activeTab === item ? COLORS.accent : "#27272a",
                  }}
                >
                  <Text
                    className="font-bold text-xs"
                    style={{
                      color: activeTab === item ? "#000" : "#71717a",
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        {/* ── EVENT LIST ── */}
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <EventCard
              event={item}
              onPress={() => handlePresentModal(item)}
              onCommentPress={handleCommentPress}
              commentCount={commentsByEvent[item._id]?.length || 0}
            />
          )}
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={EmptyState}
        />
      </View>

      {/* ── EVENT DETAIL SHEET ── */}
      <BottomSheet
        index={-1}
        ref={detailSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
        handleComponent={null}
        backdropComponent={renderDetailBackdrop}
        backgroundStyle={{ backgroundColor: COLORS["dark-3"] }}
        onClose={() => {
          setSheetOpen(false);
          setSelectedEvent(null);
        }}
      >
        <BottomSheetView style={{ flex: 1 }}>
          {selectedEvent && (
            <View className="flex-1">
              {/* Sheet Header */}
              <View className="px-5 pt-5 pb-4 border-b border-zinc-900">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 flex-row items-center gap-3 pr-3">
                    <View
                      className="size-12 rounded-2xl items-center justify-center"
                      style={{ backgroundColor: COLORS.accent }}
                    >
                      <CalendarDays color="#000" size={22} />
                    </View>
                    <View className="flex-1">
                      <Text
                        className="text-white text-lg font-black leading-tight"
                        numberOfLines={1}
                      >
                        {selectedEvent.title}
                      </Text>
                      <Text className="text-zinc-500 text-[11px] uppercase font-bold tracking-wide mt-0.5">
                        {selectedEvent.category} ·{" "}
                        {selectedEvent.author.fullName}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={handleCloseSheet}
                    className="bg-zinc-800 size-10 items-center justify-center rounded-full border border-zinc-700"
                  >
                    <X color="white" size={18} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Sheet Body */}
              <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40, paddingTop: 24 }}
              >
                {/* Info grid */}
                <View className="flex-row flex-wrap gap-y-5">
                  <View style={{ width: "50%" }}>
                    <View className="flex-row items-center gap-1.5 mb-1">
                      <Clock size={14} color="#52525b" />
                      <Text className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">
                        Date & Time
                      </Text>
                    </View>
                    <Text
                      className="text-zinc-100 font-semibold text-sm"
                      numberOfLines={1}
                    >
                      {dayjs(selectedEvent.time).format("MMM DD, hh:mm A")}
                    </Text>
                  </View>

                  <View style={{ width: "50%" }}>
                    <View className="flex-row items-center gap-1.5 mb-1">
                      <MapPin size={14} color="#52525b" />
                      <Text className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">
                        Location
                      </Text>
                    </View>
                    <Text
                      className="text-zinc-100 font-semibold text-sm"
                      numberOfLines={1}
                    >
                      {selectedEvent.location}
                    </Text>
                  </View>

                  <View style={{ width: "50%" }}>
                    <View className="flex-row items-center gap-1.5 mb-1">
                      <Ticket size={14} color="#52525b" />
                      <Text className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">
                        Entry Fee
                      </Text>
                    </View>
                    <View
                      className="self-start px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: selectedEvent.isFree
                          ? "rgba(34,197,94,0.12)"
                          : "rgba(239,68,68,0.12)",
                      }}
                    >
                      <Text
                        className="text-xs font-black"
                        style={{
                          color: selectedEvent.isFree ? "#22c55e" : "#ef4444",
                        }}
                      >
                        {selectedEvent.isFree
                          ? "Free"
                          : `${selectedEvent.price} CFA`}
                      </Text>
                    </View>
                  </View>

                  <View style={{ width: "50%" }}>
                    <View className="flex-row items-center gap-1.5 mb-1">
                      <Phone size={14} color="#52525b" />
                      <Text className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">
                        Contact info
                      </Text>
                    </View>
                    <Text
                      className="text-zinc-100 font-semibold text-sm"
                      numberOfLines={1}
                    >
                      {selectedEvent.phoneNumber}
                    </Text>
                  </View>
                </View>

                <View className="h-px bg-zinc-900 my-6" />

                <View>
                  <Text className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mb-3">
                    About this event
                  </Text>
                  <Text className="text-zinc-300 text-[15px] leading-6 font-medium">
                    {selectedEvent.description}
                  </Text>
                </View>

                {selectedEvent.images.length > 0 && (
                  <View className="mt-6">
                    <Text className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mb-3">
                      Gallery
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      {selectedEvent.images.map((img, index) => (
                        <TouchableOpacity
                          key={`${img}-${index}`}
                          onPress={() => handleImagePress(img)}
                          activeOpacity={0.85}
                          className="mr-3"
                        >
                          <Image
                            source={{ uri: img }}
                            style={{
                              width: 180,
                              height: 180,
                              borderRadius: 16,
                              backgroundColor: "#18181b",
                            }}
                            resizeMode="cover"
                          />
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}

                <TouchableOpacity
                  onPress={() => openWhatsApp(selectedEvent.phoneNumber)}
                  activeOpacity={0.85}
                  className="flex-row items-center justify-center py-4 rounded-2xl mt-8 gap-2 border-[0.5px] border-[#22c55e]"
                  style={{ backgroundColor: "rgba(34,197,94,0.12)" }}
                >
                  <MessageCircle color="#22c55e" size={20} />
                  <Text className="text-[#22c55e] font-black text-base tracking-wide">
                    Contact Organizer
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}
        </BottomSheetView>
      </BottomSheet>

      {/* ── COMMENTS SHEET — screen level, always reachable ── */}
      <CommentsBottomSheet
        ref={commentsSheetRef}
        comments={activeComments}
        onSendComment={handleSendComment}
        onClose={() => setActiveCommentEventId(null)}
      />
    </>
  );
}
